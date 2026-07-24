/*
 * LONG CHAU F12 REQUEST-ONLY ORDER PANEL
 *
 * Dán toàn bộ file vào Console F12 trên nhathuoclongchau.com.vn.
 * Bot không mở giỏ hàng, không mở tab worker và không tự chuyển trang.
 * Luồng: dán URL -> chọn đơn vị -> chờ giờ/giá -> gọi API tạo đơn.
 *
 * Dừng: LC_PANEL_STOP()
 * Mở lại bảng: LC_PANEL_SHOW()
 */

(async () => {
  "use strict";

  const APP_KEY = "__LC_F12_REQUEST_PANEL__";
  const ROOT_ID = "lc-f12-request-panel";
  const BASE_URL = "https://nhathuoclongchau.com.vn";
  const API_ROOT =
    "https://api.nhathuoclongchau.com.vn/lccus/ecom-prod";
  const STORE_FRONT = `${API_ROOT}/store-front`;
  const CUSTOMER_API = `${API_ROOT}/customer-api`;
  const API_TIMEOUT_MS = 8000;

  const PAYMENT_LABELS = Object.freeze({
    cash_on_delivery: "Thanh toán tiền mặt khi nhận hàng",
    bank_transfer_qr: "Thanh toán bằng chuyển khoản (QR Code)",
    momo: "Thanh toán bằng ví MoMo",
    zalopay: "Thanh toán bằng ví Zalopay",
    international_card:
      "Thanh toán bằng thẻ quốc tế (Visa, Master...), Apple Pay",
    napas: "Thanh toán bằng thẻ ATM nội địa, NAPAS",
    vnpay: "Thanh toán bằng cổng VNPay",
  });

  const PAYMENT_MATCHERS = Object.freeze({
    cash_on_delivery: ["tien mat khi nhan hang", "cash on delivery"],
    bank_transfer_qr: ["chuyen khoan", "qr code"],
    momo: ["momo"],
    zalopay: ["zalopay", "zalo pay"],
    international_card: ["visa", "master", "apple pay", "the quoc te"],
    napas: ["napas", "atm noi dia"],
    vnpay: ["vnpay", "vn pay"],
  });

  window.__LC_F12_ORDER_PANEL__?.destroy?.();
  document.getElementById("lc-f12-order-panel")?.remove();
  window[APP_KEY]?.destroy?.();
  document.getElementById(ROOT_ID)?.remove();

  const state = {
    items: [],
    preview: null,
    selectedUnitCode: null,
    running: false,
    stopped: false,
    abortController: null,
    account: null,
    orderResults: [],
    ordersCreated: 0,
    priceChecksUsed: 0,
    precheckCompleted: false,
    settings: {
      startTime: "08:00:00",
      precheckSeconds: 2,
      delayCheckMs: 1000,
      checkoutRetries: 3,
      totalAttempts: 3600,
      orderCopies: 3,
      paymentMethod: "momo",
      submitRealOrders: false,
      maxExtraPerOrderVnd: 150000,
    },
  };

  function stoppedError() {
    const error = new Error("Bot đã dừng.");
    error.name = "AbortError";
    return error;
  }

  function sleep(ms) {
    return new Promise((resolve, reject) => {
      const signal =
        state.running && state.abortController
          ? state.abortController.signal
          : null;
      if (signal?.aborted) {
        reject(stoppedError());
        return;
      }
      let timer;
      const onAbort = () => {
        clearTimeout(timer);
        reject(stoppedError());
      };
      timer = setTimeout(() => {
        signal?.removeEventListener("abort", onAbort);
        resolve();
      }, Math.max(0, ms));
      signal?.addEventListener("abort", onAbort, { once: true });
    });
  }

  async function fetchWithTimeout(url, options = {}, timeoutMs = API_TIMEOUT_MS) {
    const controller = new AbortController();
    const upstreamSignal = options.signal;
    const onUpstreamAbort = () => controller.abort(upstreamSignal.reason);
    if (upstreamSignal?.aborted) {
      controller.abort(upstreamSignal.reason);
    } else {
      upstreamSignal?.addEventListener("abort", onUpstreamAbort, {
        once: true,
      });
    }
    const timer = setTimeout(() => controller.abort("request-timeout"), timeoutMs);
    try {
      return await fetch(url, {
        ...options,
        signal: controller.signal,
      });
    } catch (cause) {
      if (
        controller.signal.aborted &&
        !upstreamSignal?.aborted &&
        controller.signal.reason === "request-timeout"
      ) {
        const error = new Error(`Request quá thời gian ${timeoutMs}ms.`);
        error.requestTimeout = true;
        throw error;
      }
      throw cause;
    } finally {
      clearTimeout(timer);
      upstreamSignal?.removeEventListener("abort", onUpstreamAbort);
    }
  }

  function fail(message) {
    throw new Error(message);
  }

  function normalizeText(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function normalizePhone(value) {
    const phone = String(value ?? "").replace(/\s+/g, "");
    if (phone.startsWith("+84")) return `0${phone.slice(3)}`;
    if (phone.startsWith("84")) return `0${phone.slice(2)}`;
    return phone;
  }

  function formatVnd(value) {
    return `${Number(value).toLocaleString("vi-VN")}đ`;
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function appendLog(message, tone = "info") {
    const log = document.getElementById(`${ROOT_ID}-log`);
    if (log) {
      const line = createElement("div", `lc-log-${tone}`);
      line.textContent = `[${new Date().toLocaleTimeString("vi-VN")}] ${message}`;
      log.appendChild(line);
      log.scrollTop = log.scrollHeight;
    }
    console.log(`[Long Châu Request Bot] ${message}`);
  }

  function setStatus(message, tone = "info") {
    const status = document.getElementById(`${ROOT_ID}-status`);
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
  }

  function switchTab(tabName) {
    document.querySelectorAll(`#${ROOT_ID} [data-lc-tab]`).forEach((button) => {
      button.classList.toggle("is-active", button.dataset.lcTab === tabName);
    });
    document.querySelectorAll(`#${ROOT_ID} [data-lc-page]`).forEach((page) => {
      page.hidden = page.dataset.lcPage !== tabName;
    });
  }

  function mountUi() {
    const root = document.createElement("div");
    root.id = ROOT_ID;
    root.innerHTML = `
      <style>
        #${ROOT_ID} {
          position: fixed; inset: 0; z-index: 2147483646;
          background: rgba(15, 23, 42, .58);
          display: flex; align-items: center; justify-content: center;
          font: 14px/1.45 Arial, sans-serif; color: #172033;
        }
        #${ROOT_ID} * { box-sizing: border-box; }
        #${ROOT_ID} .lc-modal {
          width: min(980px, calc(100vw - 28px));
          height: min(820px, calc(100vh - 28px));
          background: #fff; border-radius: 16px; overflow: hidden;
          box-shadow: 0 22px 70px rgba(0,0,0,.36);
          display: grid; grid-template-rows: 58px auto 1fr 170px;
        }
        #${ROOT_ID} .lc-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 18px; color: #fff;
          background: linear-gradient(90deg,#0b5ed7,#1976ed);
          font-size: 17px;
        }
        #${ROOT_ID} .lc-close {
          border: 0; background: transparent; color: #fff;
          font-size: 28px; cursor: pointer;
        }
        #${ROOT_ID} .lc-tabs {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 8px; padding: 12px 14px 0;
        }
        #${ROOT_ID} .lc-tab {
          border: 1px solid #cbd5e1; border-radius: 9px;
          background: #f8fafc; color: #475569;
          padding: 9px; cursor: pointer;
        }
        #${ROOT_ID} .lc-tab.is-active {
          border-color: #ff6a2a; color: #f4511e; background: #fff7ed;
        }
        #${ROOT_ID} .lc-body { overflow: auto; padding: 14px; }
        #${ROOT_ID} .lc-row { display: flex; gap: 10px; }
        #${ROOT_ID} input, #${ROOT_ID} select {
          width: 100%; border: 1px solid #cbd5e1; border-radius: 9px;
          padding: 10px 11px; background: #fff; color: #172033;
        }
        #${ROOT_ID} button { font: inherit; }
        #${ROOT_ID} .lc-url { flex: 1; }
        #${ROOT_ID} .lc-primary, #${ROOT_ID} .lc-danger {
          border: 0; border-radius: 9px; padding: 10px 16px;
          color: #fff; cursor: pointer;
        }
        #${ROOT_ID} .lc-primary { background: #ff5317; }
        #${ROOT_ID} .lc-danger { background: #b42318; }
        #${ROOT_ID} button:disabled { opacity: .5; cursor: not-allowed; }
        #${ROOT_ID} .lc-card {
          margin-top: 12px; border: 1px solid #e2e8f0;
          border-radius: 12px; padding: 14px; background: #fff;
        }
        #${ROOT_ID} .lc-product {
          display: grid; grid-template-columns: 190px 1fr; gap: 18px;
        }
        #${ROOT_ID} .lc-product img {
          width: 190px; height: 190px; object-fit: contain;
          border: 1px solid #e2e8f0; border-radius: 10px;
        }
        #${ROOT_ID} .lc-title { font-size: 16px; font-weight: 700; }
        #${ROOT_ID} .lc-units { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
        #${ROOT_ID} .lc-unit {
          border: 1px solid #cbd5e1; border-radius: 9px;
          padding: 8px 10px; background: #fff; cursor: pointer;
        }
        #${ROOT_ID} .lc-unit.is-selected {
          border-color: #1976ed; color: #0b5ed7; background: #eff6ff;
        }
        #${ROOT_ID} .lc-grid {
          display: grid; grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 12px; margin-top: 12px;
        }
        #${ROOT_ID} label { display: block; color: #475569; }
        #${ROOT_ID} label input, #${ROOT_ID} label select { margin-top: 5px; }
        #${ROOT_ID} .lc-order-item {
          display: grid; grid-template-columns: 64px 1fr auto auto;
          gap: 12px; align-items: center; padding: 10px;
          border: 1px solid #e2e8f0; border-radius: 11px; margin-bottom: 9px;
        }
        #${ROOT_ID} .lc-order-item img {
          width: 64px; height: 64px; object-fit: contain;
        }
        #${ROOT_ID} .lc-empty {
          padding: 28px; text-align: center; color: #64748b;
        }
        #${ROOT_ID} .lc-note {
          padding: 11px 13px; border-radius: 9px;
          color: #9a3412; background: #fff7ed;
        }
        #${ROOT_ID} .lc-start-wrap {
          display: flex; gap: 10px; margin-top: 12px;
        }
        #${ROOT_ID} .lc-start { flex: 1; background: #16a34a; }
        #${ROOT_ID} .lc-result {
          margin-top: 9px; border: 1px solid #bbf7d0;
          border-radius: 9px; padding: 10px; background: #f0fdf4;
        }
        #${ROOT_ID} .lc-result a {
          display: inline-block; margin-top: 6px; color: #0b5ed7; font-weight: 700;
        }
        #${ROOT_ID} .lc-footer {
          border-top: 1px solid #e2e8f0; background: #111827; color: #d1d5db;
          display: grid; grid-template-rows: 38px 1fr; min-height: 0;
        }
        #${ROOT_ID} .lc-footer-head {
          padding: 0 14px; display: flex; align-items: center;
          justify-content: space-between; color: #fff; border-bottom: 1px solid #374151;
        }
        #${ROOT_ID}-log {
          overflow: auto; padding: 8px 14px; font: 12px/1.55 Consolas, monospace;
        }
        #${ROOT_ID} .lc-log-ok { color: #86efac; }
        #${ROOT_ID} .lc-log-error { color: #fca5a5; }
        #${ROOT_ID} .lc-log-warn { color: #fde047; }
        @media (max-width: 720px) {
          #${ROOT_ID} .lc-grid { grid-template-columns: 1fr; }
          #${ROOT_ID} .lc-product { grid-template-columns: 100px 1fr; }
          #${ROOT_ID} .lc-product img { width: 100px; height: 100px; }
          #${ROOT_ID} .lc-order-item { grid-template-columns: 54px 1fr; }
        }
      </style>
      <section class="lc-modal">
        <header class="lc-header">
          <strong>Long Châu — Request-only Bot</strong>
          <button class="lc-close" id="${ROOT_ID}-close" title="Thu nhỏ">×</button>
        </header>
        <nav class="lc-tabs">
          <button class="lc-tab is-active" data-lc-tab="link">Dán link</button>
          <button class="lc-tab" data-lc-tab="order">Đơn hàng <span id="${ROOT_ID}-count">0</span></button>
          <button class="lc-tab" data-lc-tab="settings">Cài đặt</button>
        </nav>
        <main class="lc-body">
          <section data-lc-page="link">
            <div class="lc-row">
              <input id="${ROOT_ID}-url" class="lc-url" type="url" />
              <button class="lc-primary" id="${ROOT_ID}-check">Kiểm tra</button>
            </div>
            <div id="${ROOT_ID}-preview">
              <div class="lc-empty">Dán URL sản phẩm rồi bấm Kiểm tra.</div>
            </div>
          </section>
          <section data-lc-page="order" hidden>
            <div id="${ROOT_ID}-orders"></div>
            <div id="${ROOT_ID}-results"></div>
            <div class="lc-start-wrap">
              <button class="lc-danger" id="${ROOT_ID}-stop" disabled>Dừng</button>
              <button class="lc-primary lc-start" id="${ROOT_ID}-start">▶ Bắt đầu</button>
            </div>
          </section>
          <section data-lc-page="settings" hidden>
            <div class="lc-note">
              Bot chỉ gửi request API. Không mở giỏ, không mở tab worker, không
              tự chuyển trang. Mã đơn/link thanh toán sẽ hiện trong bảng để bạn
              tự mở và thanh toán sau.
            </div>
            <div class="lc-grid">
              <label>Giờ bắt đầu
                <input id="${ROOT_ID}-time" value="08:00:00" />
              </label>
              <label>Kiểm tra sớm trước giờ (giây)
                <input id="${ROOT_ID}-precheck" type="number" min="0" max="10" value="2" />
              </label>
              <label>Delay check (ms)
                <input id="${ROOT_ID}-delay" type="number" min="10" max="60000" value="1000" />
                <small>Cho phép từ 10ms. Dưới 100ms dễ bị giới hạn request/HTTP 429.</small>
              </label>
              <label>Số lần thử đặt lại
                <input id="${ROOT_ID}-retries" type="number" min="0" max="20" value="3" />
                <small>Thử checkout lại khi giỏ, kho, giá hoặc phương thức thanh toán lỗi.</small>
              </label>
              <label>Tổng số lần thử
                <input id="${ROOT_ID}-attempts" type="number" min="1" max="100000" value="3600" />
                <small>Tổng lượt request kiểm tra giá trước khi dừng.</small>
              </label>
              <label>Số đơn giống nhau
                <input id="${ROOT_ID}-copies" type="number" min="1" max="20" value="3" />
              </label>
              <label>Phương thức thanh toán
                <select id="${ROOT_ID}-payment">
                  <option value="momo">MoMo</option>
                  <option value="bank_transfer_qr">Chuyển khoản QR</option>
                  <option value="vnpay">VNPay</option>
                  <option value="zalopay">ZaloPay</option>
                  <option value="napas">Napas</option>
                  <option value="international_card">Thẻ quốc tế / Apple Pay</option>
                  <option value="cash_on_delivery">Tiền mặt khi nhận hàng</option>
                </select>
              </label>
              <label>Phần chênh tối đa mỗi đơn (VND)
                <input id="${ROOT_ID}-extra" type="number" min="0" value="150000" />
              </label>
              <label style="display:flex;align-items:center;gap:8px;margin-top:18px">
                <input id="${ROOT_ID}-submit" type="checkbox" style="width:auto;margin:0" />
                CHO PHÉP TẠO ĐƠN THẬT
              </label>
              <div class="lc-note">
                Bỏ chọn: chỉ canh giờ, kiểm tra giá và tài khoản, không tạo giỏ
                hoặc đơn. Bật chọn: khi đúng giờ và đúng giá, bot sẽ gửi API
                checkout và tạo số đơn thật đã cấu hình.
              </div>
            </div>
          </section>
        </main>
        <footer class="lc-footer">
          <div class="lc-footer-head">
            <strong>Nhật ký request</strong>
            <span id="${ROOT_ID}-status">Sẵn sàng</span>
          </div>
          <div id="${ROOT_ID}-log"></div>
        </footer>
      </section>
    `;
    document.body.appendChild(root);

    document.getElementById(`${ROOT_ID}-url`).value =
      location.hostname === "nhathuoclongchau.com.vn" &&
      location.pathname.endsWith(".html")
        ? location.href.split("?")[0].split("#")[0]
        : "";

    root.querySelectorAll("[data-lc-tab]").forEach((button) => {
      button.addEventListener("click", () => switchTab(button.dataset.lcTab));
    });
    document.getElementById(`${ROOT_ID}-close`).addEventListener("click", () => {
      root.style.display = "none";
      console.log("Mở lại bảng bằng LC_PANEL_SHOW()");
    });
    document
      .getElementById(`${ROOT_ID}-check`)
      .addEventListener("click", checkUrlFromUi);
    document
      .getElementById(`${ROOT_ID}-start`)
      .addEventListener("click", startFromUi);
    document
      .getElementById(`${ROOT_ID}-stop`)
      .addEventListener("click", stopBot);
    appendLog("Bảng request-only đã sẵn sàng.", "ok");
  }

  function readSettings() {
    const settings = {
      startTime: document.getElementById(`${ROOT_ID}-time`).value.trim(),
      precheckSeconds: Number(
        document.getElementById(`${ROOT_ID}-precheck`).value,
      ),
      delayCheckMs: Number(
        document.getElementById(`${ROOT_ID}-delay`).value,
      ),
      checkoutRetries: Number(
        document.getElementById(`${ROOT_ID}-retries`).value,
      ),
      totalAttempts: Number(
        document.getElementById(`${ROOT_ID}-attempts`).value,
      ),
      orderCopies: Number(
        document.getElementById(`${ROOT_ID}-copies`).value,
      ),
      paymentMethod: document.getElementById(`${ROOT_ID}-payment`).value,
      submitRealOrders: document.getElementById(`${ROOT_ID}-submit`).checked,
      maxExtraPerOrderVnd: Number(
        document.getElementById(`${ROOT_ID}-extra`).value,
      ),
    };

    if (!/^\d{2}:\d{2}:\d{2}$/.test(settings.startTime)) {
      fail("Giờ bắt đầu phải có dạng HH:mm:ss.");
    }
    const [hour, minute, second] = settings.startTime.split(":").map(Number);
    if (
      hour > 23 ||
      minute > 59 ||
      second > 59 ||
      [hour, minute, second].some(Number.isNaN)
    ) {
      fail("Giờ bắt đầu không hợp lệ.");
    }
    if (
      !Number.isInteger(settings.orderCopies) ||
      settings.orderCopies < 1 ||
      settings.orderCopies > 20
    ) {
      fail("Số đơn chỉ được từ 1 đến 20.");
    }
    if (
      !Number.isInteger(settings.precheckSeconds) ||
      settings.precheckSeconds < 0 ||
      settings.precheckSeconds > 10
    ) {
      fail("Thời gian kiểm tra sớm chỉ được từ 0 đến 10 giây.");
    }
    if (
      !Number.isInteger(settings.delayCheckMs) ||
      settings.delayCheckMs < 10 ||
      settings.delayCheckMs > 60000
    ) {
      fail("Delay check chỉ được từ 10 đến 60000 ms.");
    }
    if (
      !Number.isInteger(settings.checkoutRetries) ||
      settings.checkoutRetries < 0 ||
      settings.checkoutRetries > 20
    ) {
      fail("Số lần thử đặt lại chỉ được từ 0 đến 20.");
    }
    if (
      !Number.isInteger(settings.totalAttempts) ||
      settings.totalAttempts < 1 ||
      settings.totalAttempts > 100000
    ) {
      fail("Tổng số lần thử chỉ được từ 1 đến 100000.");
    }
    if (
      !Number.isFinite(settings.maxExtraPerOrderVnd) ||
      settings.maxExtraPerOrderVnd < 0
    ) {
      fail("Phần chênh tối đa không hợp lệ.");
    }
    return settings;
  }

  function unwrapPayload(value) {
    let current = value;
    for (let index = 0; index < 2; index += 1) {
      if (
        current &&
        typeof current === "object" &&
        !Array.isArray(current) &&
        current.data !== undefined &&
        !current.customerId &&
        !current.sessionId &&
        !current.listCart &&
        !current.providers
      ) {
        current = current.data;
        continue;
      }
      break;
    }
    return current;
  }

  function asArray(value) {
    const unwrapped = unwrapPayload(value);
    if (Array.isArray(unwrapped)) return unwrapped;
    if (Array.isArray(unwrapped?.items)) return unwrapped.items;
    if (Array.isArray(unwrapped?.results)) return unwrapped.results;
    if (Array.isArray(unwrapped?.addresses)) return unwrapped.addresses;
    return [];
  }

  async function apiJson(
    urlText,
    method = "GET",
    body,
    { auth = false, query = null, silent = false } = {},
  ) {
    if (state.stopped && state.running) fail("Bot đã dừng.");
    const url = new URL(urlText);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      }
    }
    const headers = {
      Accept: "application/json",
      "X-Channel": "EStore",
      "order-channel": "1",
    };
    if (body !== undefined) headers["content-type"] = "application/json";
    if (auth) {
      const token = localStorage.getItem("access_token") || "";
      if (!token) fail("Bạn chưa đăng nhập tài khoản Long Châu.");
      headers.Authorization = `Bearer ${token.replace(/^Bearer\s+/i, "")}`;
    }
    if (!silent) appendLog(`[API] ${method} ${url.pathname}`);
    const response = await fetchWithTimeout(url, {
      method,
      credentials: "include",
      cache: "no-store",
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: state.running ? state.abortController?.signal : undefined,
    });
    const text = await response.text();
    let payload = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = text;
    }
    if (!response.ok) {
      const detail =
        payload?.message ||
        payload?.error_description ||
        payload?.error ||
        `HTTP ${response.status}`;
      const code = payload?.errorCode ? ` (${payload.errorCode})` : "";
      const error = new Error(`${detail}${code}`);
      error.httpStatus = response.status;
      error.errorCode = payload?.errorCode || "";
      const retryAfter = response.headers.get("retry-after");
      const retryAfterSeconds = Number(retryAfter);
      if (Number.isFinite(retryAfterSeconds) && retryAfterSeconds >= 0) {
        error.retryAfterMs = retryAfterSeconds * 1000;
      }
      throw error;
    }
    return payload;
  }

  function getWebpackRequire() {
    let webpackRequire = null;
    try {
      window.webpackChunk_N_E?.push([
        [Date.now()],
        {},
        (requireFunction) => {
          webpackRequire = requireFunction;
        },
      ]);
    } catch {
      return null;
    }
    return webpackRequire;
  }

  async function loadAccount() {
    let token = localStorage.getItem("access_token") || "";
    if (!token) {
      fail("Bạn chưa đăng nhập. Hãy đăng nhập Long Châu trên chính tab này.");
    }

    let customer;
    let addresses;
    let customerApi = null;
    const webpackRequire = getWebpackRequire();
    try {
      customerApi = webpackRequire?.(25409);
      if (!customerApi?.dl || !customerApi?.F2) throw new Error("module unavailable");
      appendLog("[API] Đọc tài khoản và sổ địa chỉ đã lưu");
      customer = await customerApi.dl(token);
      addresses = await customerApi.F2();
    } catch {
      token = localStorage.getItem("access_token") || token;
      customer = await apiJson(
        `${CUSTOMER_API}/v3/token/customers`,
        "GET",
        undefined,
        { auth: true },
      );
      addresses = await apiJson(
        `${CUSTOMER_API}/v3/token/addresses`,
        "GET",
        undefined,
        { auth: true },
      );
    }

    customer = unwrapPayload(customer);
    addresses = asArray(addresses);
    if (!customer?.customerId || !customer?.profile) {
      fail("Không đọc được hồ sơ tài khoản. Hãy đăng nhập lại.");
    }
    if (addresses.length === 0) {
      fail("Tài khoản chưa có địa chỉ giao hàng đã lưu.");
    }
    const address =
      addresses.find((entry) => entry.isPrimary) || addresses[0];
    if (
      !address?.customerAddressId ||
      !address?.provinceCode ||
      !address?.wardCode ||
      !address?.address
    ) {
      fail("Địa chỉ mặc định chưa đủ mã tỉnh/phường hoặc số nhà.");
    }
    const phone = normalizePhone(customer.profile.mobilePhone);
    const receiverPhone = normalizePhone(address.mobilePhone);
    if (!/^0\d{9}$/.test(phone) || !/^0\d{9}$/.test(receiverPhone)) {
      fail("Số điện thoại trong hồ sơ/địa chỉ không hợp lệ.");
    }

    let privacyPolicies = [];
    try {
      const consentResponse = customerApi?.ux
        ? await customerApi.ux({ phoneNumber: phone })
        : await apiJson(
            `${CUSTOMER_API}/v3/consents`,
            "POST",
            {},
            {
              query: { phoneNumber: phone, type: "DataPrivacy" },
            },
          );
      const consentPayload = unwrapPayload(consentResponse);
      privacyPolicies = Array.isArray(consentPayload?.policies)
        ? consentPayload.policies
        : [];
    } catch (error) {
      appendLog(
        `Không đọc được trạng thái quyền riêng tư; đơn sẽ không tự bật lựa chọn mới (${error.message}).`,
        "warn",
      );
    }

    appendLog("Đã xác nhận tài khoản và địa chỉ mặc định.", "ok");
    return {
      customer,
      address,
      phone,
      receiverPhone,
      privacyPolicies,
    };
  }

  async function fetchProduct(urlText) {
    const url = new URL(urlText);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "nhathuoclongchau.com.vn" ||
      !url.pathname.endsWith(".html")
    ) {
      fail("URL phải là trang chi tiết sản phẩm Long Châu.");
    }
    url.searchParams.set("_lc_request_panel", String(Date.now()));
    const response = await fetchWithTimeout(url, {
      credentials: "include",
      cache: "no-store",
      headers: { Accept: "text/html" },
    }, 15000);
    if (!response.ok) {
      fail(`Không đọc được sản phẩm: HTTP ${response.status}.`);
    }
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const dataText = doc.getElementById("__NEXT_DATA__")?.textContent;
    if (!dataText) fail("Trang không trả về dữ liệu sản phẩm.");
    const nextData = JSON.parse(dataText);
    const props = nextData?.props?.pageProps;
    const product = props?.product;
    if (!product?.prices?.length) {
      fail("Sản phẩm không có đơn vị bán hợp lệ.");
    }
    const promotions = asArray(props.initPromotionPrices);
    const units = product.prices.map((unit) => {
      const promotion = promotions.find(
        (entry) =>
          Number(entry.unitCode) === Number(unit.measureUnitCode),
      );
      return {
        code: Number(unit.measureUnitCode),
        label: unit.measureUnitName,
        listPrice: Number(unit.price),
        finalPrice: Number(promotion?.finalPrice ?? unit.price),
        specification: unit.productSpecs ?? "",
        inStock: unit.isInventory !== false,
      };
    });
    return {
      url: `${url.origin}${url.pathname}`,
      pathname: url.pathname,
      title:
        product.webName ||
        product.headingText ||
        doc.querySelector("h1")?.textContent?.trim() ||
        "Sản phẩm Long Châu",
      image:
        product.primaryImage?.url ||
        product.secondaryImages?.[0]?.url ||
        "",
      sku: String(product.sku || product.itemCode || ""),
      units,
    };
  }

  async function checkUrlFromUi() {
    const button = document.getElementById(`${ROOT_ID}-check`);
    try {
      button.disabled = true;
      setStatus("Đang đọc sản phẩm...");
      const url = document.getElementById(`${ROOT_ID}-url`).value.trim();
      const product = await fetchProduct(url);
      if (!product.sku) fail("Không đọc được SKU sản phẩm.");
      state.preview = product;
      state.selectedUnitCode =
        product.units.find((unit) => normalizeText(unit.label) === "thung")
          ?.code ?? product.units[0].code;
      renderPreview();
      setStatus("Đã tải sản phẩm", "ok");
      appendLog(`Đã tải SKU ${product.sku}: ${product.title}`, "ok");
    } catch (error) {
      setStatus(error.message, "error");
      appendLog(error.message, "error");
    } finally {
      button.disabled = false;
    }
  }

  function renderPreview() {
    const host = document.getElementById(`${ROOT_ID}-preview`);
    host.replaceChildren();
    const product = state.preview;
    if (!product) {
      host.appendChild(createElement("div", "lc-empty", "Chưa có sản phẩm."));
      return;
    }

    const card = createElement("div", "lc-card lc-product");
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;
    card.appendChild(image);

    const detail = document.createElement("div");
    detail.appendChild(createElement("div", "lc-title", product.title));
    detail.appendChild(createElement("div", "", `SKU: ${product.sku}`));
    detail.appendChild(createElement("div", "", "Chọn đơn vị tính"));
    const units = createElement("div", "lc-units");
    for (const unit of product.units) {
      const button = createElement(
        "button",
        `lc-unit${unit.code === state.selectedUnitCode ? " is-selected" : ""}`,
        `${unit.label} — ${formatVnd(unit.finalPrice)}`,
      );
      button.type = "button";
      button.disabled = !unit.inStock;
      button.title = unit.specification;
      button.addEventListener("click", () => {
        state.selectedUnitCode = unit.code;
        renderPreview();
      });
      units.appendChild(button);
    }
    detail.appendChild(units);

    const selected = product.units.find(
      (unit) => unit.code === state.selectedUnitCode,
    );
    const fields = createElement("div", "lc-grid");
    const priceLabel = document.createElement("label");
    priceLabel.textContent = "Chỉ mua khi giá chính xác (VND)";
    const target = document.createElement("input");
    target.id = `${ROOT_ID}-target`;
    target.type = "number";
    target.min = "1";
    target.value =
      selected && normalizeText(selected.label) === "thung"
        ? "912000"
        : String(selected?.finalPrice ?? "");
    priceLabel.appendChild(target);
    fields.appendChild(priceLabel);

    const qtyLabel = document.createElement("label");
    qtyLabel.textContent = "Số lượng mỗi đơn";
    const quantity = document.createElement("input");
    quantity.id = `${ROOT_ID}-qty`;
    quantity.type = "number";
    quantity.min = "1";
    quantity.max = "99";
    quantity.value = "1";
    qtyLabel.appendChild(quantity);
    fields.appendChild(qtyLabel);
    detail.appendChild(fields);

    const add = createElement("button", "lc-primary", "+ Thêm vào đơn");
    add.type = "button";
    add.style.marginTop = "12px";
    add.addEventListener("click", addPreviewToOrder);
    detail.appendChild(add);
    card.appendChild(detail);
    host.appendChild(card);
  }

  function addPreviewToOrder() {
    try {
      const product = state.preview;
      const unit = product?.units.find(
        (entry) => entry.code === state.selectedUnitCode,
      );
      if (!product || !unit) fail("Hãy chọn sản phẩm và đơn vị.");
      const targetPrice = Number(
        document.getElementById(`${ROOT_ID}-target`).value,
      );
      const quantity = Number(
        document.getElementById(`${ROOT_ID}-qty`).value,
      );
      if (!Number.isInteger(targetPrice) || targetPrice <= 0) {
        fail("Giá mục tiêu phải là số nguyên VND lớn hơn 0.");
      }
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        fail("Số lượng phải từ 1 đến 99.");
      }
      const item = {
        ...product,
        unitCode: unit.code,
        unitLabel: unit.label,
        listPrice: unit.listPrice,
        observedPrice: unit.finalPrice,
        targetPrice,
        quantity,
      };
      const duplicate = state.items.findIndex(
        (entry) =>
          entry.url === item.url && entry.unitCode === item.unitCode,
      );
      if (duplicate >= 0) state.items[duplicate] = item;
      else state.items.push(item);
      renderOrders();
      appendLog(
        `Đã thêm ${item.unitLabel}: mục tiêu ${formatVnd(item.targetPrice)}`,
        "ok",
      );
      switchTab("order");
    } catch (error) {
      setStatus(error.message, "error");
      appendLog(error.message, "error");
    }
  }

  function renderOrders() {
    document.getElementById(`${ROOT_ID}-count`).textContent =
      String(state.items.length);
    const host = document.getElementById(`${ROOT_ID}-orders`);
    host.replaceChildren();
    if (state.items.length === 0) {
      host.appendChild(
        createElement(
          "div",
          "lc-empty",
          "Chưa có sản phẩm. Qua tab Dán link để thêm.",
        ),
      );
      return;
    }
    for (const [index, item] of state.items.entries()) {
      const row = createElement("div", "lc-order-item");
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.title;
      row.appendChild(image);
      const detail = document.createElement("div");
      detail.appendChild(createElement("strong", "", item.title));
      detail.appendChild(
        createElement(
          "div",
          "",
          `${item.unitLabel} · ${item.quantity} × ${formatVnd(item.targetPrice)}`,
        ),
      );
      detail.appendChild(createElement("small", "", `SKU ${item.sku}`));
      row.appendChild(detail);
      row.appendChild(
        createElement("div", "", formatVnd(item.targetPrice * item.quantity)),
      );
      const remove = createElement("button", "lc-danger", "Xóa");
      remove.disabled = state.running;
      remove.addEventListener("click", () => {
        state.items.splice(index, 1);
        renderOrders();
      });
      row.appendChild(remove);
      host.appendChild(row);
    }
    const total = state.items.reduce(
      (sum, item) => sum + item.targetPrice * item.quantity,
      0,
    );
    const totalLine = createElement("div", "lc-card");
    totalLine.style.textAlign = "right";
    totalLine.appendChild(
      createElement(
        "strong",
        "",
        `Tiền hàng mục tiêu mỗi đơn: ${formatVnd(total)}`,
      ),
    );
    host.appendChild(totalLine);
  }

  function renderResults() {
    const host = document.getElementById(`${ROOT_ID}-results`);
    host.replaceChildren();
    for (const result of state.orderResults) {
      const card = createElement("div", "lc-result");
      card.appendChild(
        createElement(
          "strong",
          "",
          `Đơn ${result.number}: ${result.orderCode || "đã tạo"}`,
        ),
      );
      if (result.paymentUrl) {
        const link = document.createElement("a");
        link.href = result.paymentUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Tự mở trang thanh toán";
        card.appendChild(document.createElement("br"));
        card.appendChild(link);
      } else {
        card.appendChild(
          createElement("div", "", "Không có link thanh toán trực tuyến."),
        );
      }
      host.appendChild(card);
    }
  }

  function resolveSchedule(settings) {
    const [hour, minute, second] = settings.startTime.split(":").map(Number);
    const now = new Date();
    const target = new Date(now);
    target.setHours(hour, minute, second, 0);
    if (now.getTime() > target.getTime() + 60_000) {
      target.setDate(target.getDate() + 1);
    }
    return {
      target,
      precheckAt: new Date(
        target.getTime() - settings.precheckSeconds * 1000,
      ),
    };
  }

  async function waitUntil(epochMs, label) {
    let last = null;
    while (Date.now() < epochMs) {
      if (state.stopped) fail("Bot đã dừng.");
      const seconds = Math.ceil((epochMs - Date.now()) / 1000);
      if (seconds !== last && (seconds <= 10 || seconds % 10 === 0)) {
        last = seconds;
        setStatus(`${label}: còn ${seconds} giây`);
      }
      await sleep(Math.min(1000, Math.max(1, epochMs - Date.now())));
    }
  }

  async function requestPriceObservations() {
    const prices = await apiJson(
      `${STORE_FRONT}/v3/promotions/price`,
      "POST",
      state.items.map((item) => ({
        itemCode: item.sku,
        unitCode: item.unitCode,
        price: item.listPrice,
      })),
      { silent: true },
    );
    const priceRows = asArray(prices);
    return state.items.map((item) => {
      const promotion = priceRows.find(
        (entry) =>
          String(entry.itemCode) === String(item.sku) &&
          Number(entry.unitCode) === Number(item.unitCode),
      );
      return {
        unitLabel: item.unitLabel,
        price: Number(promotion?.finalPrice ?? item.listPrice),
        target: item.targetPrice,
      };
    });
  }

  function observationSignature(observations) {
    return observations
      .map((entry) => `${entry.unitLabel}:${entry.price}`)
      .join("|");
  }

  function describeObservations(observations, prefix = "") {
    return `${prefix}${observations
      .map(
        (entry) =>
          `${entry.unitLabel} ${formatVnd(entry.price)} / mục tiêu ${formatVnd(entry.target)}`,
      )
      .join(" · ")}`;
  }

  function retryDelayMs(error) {
    if (Number.isFinite(error?.retryAfterMs)) {
      return Math.max(state.settings.delayCheckMs, error.retryAfterMs);
    }
    if (error?.httpStatus === 429) {
      return Math.max(state.settings.delayCheckMs, 1000);
    }
    return state.settings.delayCheckMs;
  }

  async function pollPriceGate(schedule) {
    if (!state.precheckCompleted) {
      await waitUntil(schedule.precheckAt.getTime(), "Chờ lượt kiểm tra sớm");
      const canPrecheck =
        state.settings.precheckSeconds > 0 &&
        Date.now() < schedule.target.getTime();
      if (canPrecheck) {
        appendLog(
          `Bắt đầu precheck trước giờ ${state.settings.precheckSeconds} giây. Lượt này không tính vào Tổng số lần thử.`,
          "ok",
        );
        try {
          const precheck = await requestPriceObservations();
          appendLog(describeObservations(precheck, "Precheck: "), "warn");
        } catch (error) {
          appendLog(`Precheck lỗi tạm thời: ${error.message}`, "warn");
        }
      }
      state.precheckCompleted = true;
    }
    await waitUntil(schedule.target.getTime(), "Chờ đúng giờ mua");

    let lastSignature = "";
    let lastError = "";
    while (state.priceChecksUsed < state.settings.totalAttempts) {
      if (state.stopped) fail("Bot đã dừng.");
      state.priceChecksUsed += 1;
      const attempt = state.priceChecksUsed;
      let delayMs = state.settings.delayCheckMs;
      try {
        const observations = await requestPriceObservations();
        const signature = observationSignature(observations);
        if (signature !== lastSignature) {
          lastSignature = signature;
          appendLog(describeObservations(observations), "warn");
        }
        const targetMatched = observations.every(
          (entry) => entry.price === entry.target,
        );
        if (targetMatched) {
          appendLog(
            `Tất cả giá mục tiêu đã khớp ở lần ${attempt}/${state.settings.totalAttempts}.`,
            "ok",
          );
          return observations;
        }
        setStatus(`Check giá ${attempt}/${state.settings.totalAttempts}`);
      } catch (error) {
        if (state.stopped) throw error;
        delayMs = retryDelayMs(error);
        if (error.message !== lastError) {
          lastError = error.message;
          appendLog(
            `Request giá lỗi tạm thời: ${error.message}. Chờ ${delayMs}ms.`,
            "warn",
          );
        }
      }
      if (state.priceChecksUsed < state.settings.totalAttempts) {
        await sleep(delayMs);
      }
    }
    fail(
      `Đã hết ${state.settings.totalAttempts} lần thử nhưng giá mục tiêu chưa khớp.`,
    );
  }

  function cartEntries(cart) {
    return [
      ...(Array.isArray(cart?.listCart) ? cart.listCart : []),
      ...(Array.isArray(cart?.listCartCustomer)
        ? cart.listCartCustomer
        : []),
    ];
  }

  function selectedProductRows(cart) {
    return cartEntries(cart).filter(
      (entry) => Number(entry.itemType) === 1 && entry.isSelected === true,
    );
  }

  function validateCartTargets(cart) {
    const rows = selectedProductRows(cart);
    if (rows.length !== state.items.length) {
      fail(
        `Giỏ API có ${rows.length} sản phẩm được chọn, khác ${state.items.length} sản phẩm cấu hình. Bot dừng để tránh mua lẫn.`,
      );
    }
    for (const item of state.items) {
      const row = rows.find(
        (entry) =>
          String(entry.itemCart) === String(item.sku) &&
          Number(entry.unitCode) === Number(item.unitCode),
      );
      if (!row) {
        fail(`Giỏ API thiếu SKU ${item.sku}, đơn vị ${item.unitLabel}.`);
      }
      if (Number(row.quantity) !== Number(item.quantity)) {
        fail(`Số lượng SKU ${item.sku} trong giỏ không đúng cấu hình.`);
      }
      const livePrice = Number(
        row.detailCalculatorPriceInfo?.priceAfterDiscount ??
          row.detailCalculatorPriceInfo?.price ??
          0,
      );
      if (livePrice !== item.targetPrice) {
        fail(
          `Giá giỏ của ${item.unitLabel} là ${formatVnd(livePrice)}, không còn đúng ${formatVnd(item.targetPrice)}.`,
        );
      }
    }
    return rows;
  }

  async function createSession() {
    const response = unwrapPayload(
      await apiJson(`${STORE_FRONT}/v3/cart/session`, "POST", {
        shopCode: "50001",
      }),
    );
    const sessionId =
      typeof response === "string" ? response : response?.sessionId;
    if (!sessionId) fail("API không trả về cart session.");
    return sessionId;
  }

  async function getCart(sessionId, account, shipmentPrice = 0) {
    return unwrapPayload(
      await apiJson(`${STORE_FRONT}/v3/cart`, "GET", undefined, {
        query: {
          channelCode: 1,
          sessionId,
          shopCode: "",
          shipmentPrice,
          customerId: account.customer.customerId,
          phoneNumber: account.phone,
        },
      }),
    );
  }

  function toPlanningLine(entry) {
    const productInfo = entry.productInfo || {};
    const packageInfo = (productInfo.packageDetails || []).find(
      (unit) => Number(unit.unitCode) === Number(entry.unitCode),
    );
    return {
      id: entry.itemCart,
      name: productInfo.webName || productInfo.name || "",
      unit: entry.unitCode,
      quantity: entry.quantity,
      typeSpecial: productInfo.typeSpecial ?? null,
      isCheckInventory: Boolean(productInfo.isInventoryControl),
      price: Number(
        packageInfo?.price ??
          entry.detailCalculatorPriceInfo?.price ??
          entry.detailCalculatorPriceInfo?.priceAfterDiscount ??
          0,
      ),
      itemType: entry.itemType,
      productTypeId: entry.productTypeId,
      whsCode: entry.whsCode,
    };
  }

  function planningProducts(cart) {
    const selectedRows = selectedProductRows(cart);
    const promotionRows = cartEntries(cart).filter(
      (entry) => Number(entry.itemType) !== 1 && entry.isSelected === true,
    );
    const giftRows = selectedRows.flatMap((entry) =>
      (entry.listSuggestPromotion || []).flatMap((promotion) =>
        (promotion.giftProduct || []).map((gift) => ({
          id: gift.itemCode,
          name: gift.webName || gift.name || "",
          unit: gift.unitCode,
          quantity: gift.quantity,
          price: 0,
          typeSpecial: null,
          isCheckInventory: Boolean(gift.isInventoryControl),
          itemType: gift.itemType,
          productTypeId: gift.productTypeId,
          whsCode: gift.whsCode,
        })),
      ),
    );
    return [
      ...selectedRows.map(toPlanningLine),
      ...promotionRows.map(toPlanningLine),
      ...giftRows,
    ];
  }

  async function planDelivery(cart, sessionId, account) {
    const address = account.address;
    const payload = {
      product: planningProducts(cart),
      orderDoctotal: Number(
        cart.calculatorPriceInfo?.principalAmount ?? 0,
      ),
      orderChannel: 1,
      shopCodeException: cart.policy?.shopException || [],
      receiverName: address.name || account.customer.profile.fullName || "",
      receiverPhone: account.receiverPhone,
      cityCode: address.provinceCode,
      wardCode: address.wardCode,
      receiverFullAddress: [
        address.address,
        address.wardName || "",
        address.provinceName || "",
      ]
        .filter(Boolean)
        .join(", "),
      legacyReceiverFullAddress: address.legacyAddress?.fullAddress || "",
      sessionId,
    };
    const planning = unwrapPayload(
      await apiJson(
        `${STORE_FRONT}/v3/order-promising/delivery/planning`,
        "POST",
        payload,
      ),
    );
    const providers = Array.isArray(planning?.providers)
      ? planning.providers
      : [];
    if (!planning?.shopSender || providers.length === 0) {
      fail("Long Châu không trả về cửa hàng/khung giờ có thể giao.");
    }
    const provider = [...providers].sort(
      (left, right) =>
        Number(left.priority ?? Number.MAX_SAFE_INTEGER) -
        Number(right.priority ?? Number.MAX_SAFE_INTEGER),
    )[0];
    if (
      !provider?.planningId ||
      !provider?.toDeliveryTime ||
      !Number.isFinite(Number(provider?.feeFrt))
    ) {
      fail("Dữ liệu kế hoạch giao hàng không đầy đủ.");
    }
    return { planning, provider };
  }

  async function getPaymentMethod(cart) {
    const details = selectedProductRows(cart).map((entry) => {
      const detail = entry.detailCalculatorPriceInfo || {};
      return {
        itemCode: detail.itemCode || entry.itemCart,
        quantity: detail.quantity ?? entry.quantity,
        unit: detail.unitCode ?? entry.unitCode,
        unitName: detail.unitName || "",
        name: detail.itemName || entry.productInfo?.name || "",
        price: Number(detail.priceAfterDiscount ?? detail.price ?? 0),
        isHotItem: Boolean(detail.isHot),
        isPromotion: Boolean(detail.isPromotion),
        whsCode: detail.whsCode,
        whsName: detail.whsName,
      };
    });
    const methods = asArray(
      await apiJson(`${STORE_FRONT}/v5/payment/methods`, "POST", {
        details,
      }),
    ).filter((entry) => entry.status !== false);
    const matchers = PAYMENT_MATCHERS[state.settings.paymentMethod] || [];
    const method = methods.find((entry) => {
      const text = normalizeText(
        `${entry.name || ""} ${entry.vendorCode || ""} ${entry.vendorId || ""}`,
      );
      return matchers.some((matcher) => text.includes(matcher));
    });
    if (!method?.id) {
      const available = methods.map((entry) => entry.name).filter(Boolean);
      fail(
        `Không tìm thấy phương thức "${PAYMENT_LABELS[state.settings.paymentMethod]}". Có: ${available.join(", ") || "không có"}.`,
      );
    }
    return method;
  }

  function buildOrderPayload(
    cart,
    sessionId,
    account,
    planning,
    provider,
    paymentMethod,
  ) {
    const price = cart.calculatorPriceInfo || {};
    const customer = account.customer;
    const profile = customer.profile || {};
    const address = account.address;
    const payload = {
      orderChannel: 1,
      pricing: {
        totalBill: Number(price.totalBill ?? 0),
        totalDiscount: Number(price.totalDiscount ?? 0),
        total: Number(price.total ?? 0),
        totalVoucherPrice: Number(price.totalVoucherPrice ?? 0),
      },
      shipment: {
        method: 1,
        planningId: provider.planningId,
        scheduleReceivedTime: provider.toDeliveryTime,
        fee: Number(price.shipmentFee ?? provider.feeFrt ?? 0),
        shop: planning.shopSender,
      },
      payment: {
        method: paymentMethod.id,
        vendor: "",
        vendorCode: paymentMethod.vendorCode ?? "0",
      },
      cart: { sessionId, note: "" },
      customer: {
        id: customer.customerId,
        fullName: profile.fullName || "",
        phoneNumber: account.phone,
        email: profile.email || "",
        gender: profile.gender ?? 2,
      },
      receiver: {
        fullName: address.name || profile.fullName || "",
        phoneNumber: account.receiverPhone,
        gender: 2,
        address: {
          id: address.customerAddressId,
          provinceCode: address.provinceCode,
          wardCode: address.wardCode,
          address: address.address,
          fullAddress: "",
          legacyAddressInfo: {
            legacyProvinceCode:
              address.legacyAddress?.provinceCode || "",
            legacyDistrictCode:
              address.legacyAddress?.districtCode || "",
            legacyWardCode: address.legacyAddress?.wardCode || "",
          },
        },
      },
      options: { hideProduct: false },
      otcForm: [],
    };

    const policies = account.privacyPolicies || [];
    if (policies.length > 0) {
      const accepted = (code) =>
        Boolean(
          policies.find(
            (policy) =>
              (policy.code || policy.policyCode) === code,
          )?.isAccepted,
        );
      payload.consents = {
        loyaltyPointAccepted: accepted("LOYALTY_POINTS"),
        customerSupportAccepted: accepted("CUSTOMER_SUPPORT"),
        marketingNotificationAccepted: accepted("MARKETING_NOTIFICATION"),
      };
    }

    return payload;
  }

  function safePaymentUrl(result) {
    const direct = result?.paymentLink;
    if (typeof direct === "string" && direct.trim()) {
      try {
        const url = new URL(direct.trim(), BASE_URL);
        if (url.protocol === "https:") return url.href;
      } catch {
        // Dùng đường dẫn thanh toán dự phòng ở dưới.
      }
    }
    if (
      state.settings.paymentMethod !== "cash_on_delivery" &&
      result?.orderCode
    ) {
      return `${BASE_URL}/don-hang/thanh-toan/${encodeURIComponent(result.orderCode)}`;
    }
    return null;
  }

  async function executeOrder(orderNumber) {
    appendLog(`Bắt đầu request đơn ${orderNumber}.`);
    const sessionId = await createSession();
    for (const item of state.items) {
      await apiJson(`${STORE_FRONT}/v3/cart`, "POST", {
        cartItem: {
          itemCart: item.sku,
          quantity: item.quantity,
          unitCode: item.unitCode,
        },
        isCustomerToCart: false,
        customerId: state.account.customer.customerId,
        phoneNumber: state.account.phone,
        sessionId,
      });
    }

    let cart = await getCart(sessionId, state.account, 0);
    validateCartTargets(cart);
    const { planning, provider } = await planDelivery(
      cart,
      sessionId,
      state.account,
    );
    cart = await getCart(
      sessionId,
      state.account,
      Number(provider.feeFrt),
    );
    validateCartTargets(cart);

    const targetGoods = state.items.reduce(
      (sum, item) => sum + item.targetPrice * item.quantity,
      0,
    );
    const total = Number(
      cart.calculatorPriceInfo?.estimatedPrice ??
        cart.calculatorPriceInfo?.totalBill ??
        0,
    );
    const maxTotal = targetGoods + state.settings.maxExtraPerOrderVnd;
    if (!Number.isFinite(total) || total <= 0) {
      fail("API không trả về tổng thanh toán hợp lệ.");
    }
    if (total > maxTotal) {
      fail(
        `Tổng API ${formatVnd(total)} vượt trần ${formatVnd(maxTotal)}. Bot dừng.`,
      );
    }
    const paymentMethod = await getPaymentMethod(cart);
    const orderPayload = buildOrderPayload(
      cart,
      sessionId,
      state.account,
      planning,
      provider,
      paymentMethod,
    );
    let rawResult;
    try {
      rawResult = await apiJson(
        `${STORE_FRONT}/v3/order`,
        "POST",
        orderPayload,
      );
    } catch (cause) {
      const error = new Error(
        `Request tạo đơn không thành công hoặc phản hồi không rõ: ${cause.message}`,
      );
      error.orderSubmissionStarted = true;
      error.cause = cause;
      throw error;
    }
    const result = unwrapPayload(rawResult) || {};
    if (!result.orderCode && !result.paymentLink && !result.transferInfo) {
      const error = new Error(
        "API tạo đơn không trả về mã đơn/link thanh toán; dừng để tránh trùng.",
      );
      error.orderSubmissionStarted = true;
      throw error;
    }
    const savedResult = {
      number: orderNumber,
      orderCode: result.orderCode || "",
      paymentUrl: safePaymentUrl(result),
      raw: result,
    };
    state.orderResults.push(savedResult);
    state.ordersCreated += 1;
    renderResults();
    appendLog(
      `Đơn ${orderNumber} đã tạo: ${savedResult.orderCode || "không có mã hiển thị"}. Không mở tab thanh toán.`,
      "ok",
    );
    return savedResult;
  }

  async function executeOrderWithRetry(orderNumber) {
    const maxAttempts = state.settings.checkoutRetries + 1;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      if (state.stopped) fail("Bot đã dừng.");
      try {
        if (attempt > 1) {
          appendLog(
            `Đơn ${orderNumber}: thử đặt lại ${attempt - 1}/${state.settings.checkoutRetries}.`,
            "warn",
          );
        }
        return await executeOrder(orderNumber);
      } catch (error) {
        if (state.stopped) throw error;
        if (error.orderSubmissionStarted) {
          appendLog(
            `Đơn ${orderNumber}: request tạo đơn đã được gửi nhưng phản hồi không chắc chắn. Không tự gửi lại để tránh trùng đơn.`,
            "error",
          );
          throw error;
        }
        if (attempt >= maxAttempts) {
          const exhausted = new Error(
            `Đơn ${orderNumber} thất bại sau ${maxAttempts} lượt checkout: ${error.message}`,
          );
          exhausted.checkoutRetryExhausted = true;
          throw exhausted;
        }
        const delayMs = retryDelayMs(error);
        appendLog(
          `Đơn ${orderNumber} checkout lỗi: ${error.message}. Thử lại sau ${delayMs}ms.`,
          "warn",
        );
        await sleep(delayMs);
      }
    }
    fail(`Không thể hoàn tất đơn ${orderNumber}.`);
  }

  async function runAutomation() {
    const schedule = resolveSchedule(state.settings);
    state.account = await loadAccount();
    appendLog(
      `Đã lên lịch ${schedule.target.toLocaleString("vi-VN")}; kiểm tra tối đa ${state.settings.totalAttempts} lần, delay ${state.settings.delayCheckMs}ms.`,
      "ok",
    );
    setStatus(`Đang chờ ${schedule.target.toLocaleTimeString("vi-VN")}`);

    if (!state.settings.submitRealOrders) {
      await pollPriceGate(schedule);
      setStatus("Kiểm tra thử đạt: chưa thêm giỏ, chưa tạo đơn", "ok");
      appendLog(
        "Chạy thử xong. Giá và tài khoản hợp lệ; chưa gửi request thêm giỏ/tạo đơn.",
        "ok",
      );
      return;
    }

    for (
      let orderNumber = 1;
      orderNumber <= state.settings.orderCopies;
      orderNumber += 1
    ) {
      let completed = false;
      while (!completed) {
        if (state.stopped) fail("Bot đã dừng.");
        await pollPriceGate(schedule);
        setStatus(
          `Giá đã khớp — đang checkout đơn ${orderNumber}/${state.settings.orderCopies}`,
          "ok",
        );
        try {
          await executeOrderWithRetry(orderNumber);
          completed = true;
        } catch (error) {
          const canResumeWatching =
            error.checkoutRetryExhausted &&
            state.priceChecksUsed < state.settings.totalAttempts;
          if (!canResumeWatching) throw error;
          appendLog(
            `Đơn ${orderNumber} chưa checkout được. Quay lại canh giá/kho; còn ${state.settings.totalAttempts - state.priceChecksUsed} lần thử.`,
            "warn",
          );
          await sleep(state.settings.delayCheckMs);
        }
      }
      if (orderNumber < state.settings.orderCopies) {
        await sleep(state.settings.delayCheckMs);
      }
    }
    setStatus(
      `Đã tạo đủ ${state.ordersCreated} đơn; link nằm trong bảng`,
      "ok",
    );
  }

  async function startFromUi() {
    try {
      if (state.running) fail("Bot đang chạy.");
      if (state.items.length === 0) {
        fail("Đơn hàng chưa có sản phẩm.");
      }
      state.settings = readSettings();
      if (
        state.settings.submitRealOrders &&
        state.settings.totalAttempts < state.settings.orderCopies
      ) {
        fail(
          "Tổng số lần thử phải ít nhất bằng số đơn để mỗi đơn được kiểm tra lại giá.",
        );
      }
      if (state.settings.submitRealOrders) {
        const productText = state.items
          .map(
            (item) =>
              `${item.quantity} ${item.unitLabel} — ${item.title} — ${formatVnd(item.targetPrice)}`,
          )
          .join("\n");
        const confirmed = window.confirm(
          [
            `Sẽ gửi API tạo ${state.settings.orderCopies} đơn THẬT.`,
            productText,
            `Thanh toán: ${PAYMENT_LABELS[state.settings.paymentMethod]}.`,
            `Check giá: ${state.settings.totalAttempts} lần, delay ${state.settings.delayCheckMs}ms, sớm ${state.settings.precheckSeconds}s.`,
            `Mỗi đơn được thử đặt lại tối đa ${state.settings.checkoutRetries} lần trước khi gửi request tạo đơn.`,
            "Bot không mở tab. Mã đơn/link thanh toán chỉ hiện trong bảng để bạn tự mở.",
            "Tiếp tục?",
          ].join("\n\n"),
        );
        if (!confirmed) return;
      }
      state.running = true;
      state.stopped = false;
      state.abortController = new AbortController();
      state.ordersCreated = 0;
      state.orderResults = [];
      state.priceChecksUsed = 0;
      state.precheckCompleted = false;
      renderResults();
      document.getElementById(`${ROOT_ID}-start`).disabled = true;
      document.getElementById(`${ROOT_ID}-stop`).disabled = false;
      renderOrders();
      await runAutomation();
    } catch (error) {
      if (!state.stopped) {
        setStatus(error.message, "error");
        appendLog(error.message, "error");
      }
    } finally {
      state.running = false;
      state.abortController = null;
      const startButton = document.getElementById(`${ROOT_ID}-start`);
      const stopButton = document.getElementById(`${ROOT_ID}-stop`);
      if (startButton) startButton.disabled = false;
      if (stopButton) stopButton.disabled = true;
      if (document.getElementById(ROOT_ID)) renderOrders();
    }
  }

  function stopBot() {
    state.stopped = true;
    state.abortController?.abort();
    setStatus("Đã dừng", "error");
    appendLog(
      "Đã dừng bot. Các đơn đã tạo trước thời điểm dừng vẫn giữ nguyên.",
      "warn",
    );
  }

  function destroy() {
    stopBot();
    document.getElementById(ROOT_ID)?.remove();
    delete window[APP_KEY];
  }

  window.LC_PANEL_STOP = stopBot;
  window.LC_PANEL_SHOW = () => {
    const root = document.getElementById(ROOT_ID);
    if (root) root.style.display = "flex";
  };
  window[APP_KEY] = { state, stop: stopBot, destroy };

  mountUi();
  renderOrders();
  renderResults();
})();
