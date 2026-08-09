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
  const CHECKOUT_PROBE_MAX_AGE_MS = 120000;
  const CHECKOUT_WARMUP_SECONDS = 30;
  const SLOW_REQUEST_THRESHOLD_MS = 750;
  const WALLET_VOUCHER_REFRESH_MS = 5000;
  const VOUCHER_APPLY_RETRY_MS = 3000;
  const ENSURE_TARGET_SKU = "00503063";
  const ENSURE_TARGET_UNIT = "thung";
  const ENSURE_TARGET_PRICE_VND = 912000;

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
    targetCheckoutRefreshed: false,
    checkoutProbe: null,
    walletVoucherCodes: [],
    walletVoucherFetchedAt: 0,
    lastWalletVoucherError: "",
    lastVoucherStatusSignature: "",
    lastCheckoutContextSignature: "",
    lastSlowRequestLogAt: {},
    settings: {
      startTime: "08:00:00",
      precheckSeconds: 2,
      delayCheckMs: 1000,
      checkoutRetries: 3,
      totalAttempts: 3600,
      orderCopies: 3,
      paymentMethod: "momo",
      autoApplyWalletVouchers: true,
      voucherCodes: [],
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

  async function fetchTextWithTimeout(
    url,
    options = {},
    timeoutMs = API_TIMEOUT_MS,
  ) {
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
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      const text = await response.text();
      return { response, text };
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

  function failPolicy(message, fatal = false) {
    const error = new Error(message);
    error.fatalPolicy = fatal;
    throw error;
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
              tự chuyển trang. Bot tạo checkout hoàn chỉnh với địa chỉ, giao
              hàng và ưu đãi/voucher rồi mới so giá cuối; mã đơn/link thanh toán
              sẽ hiện trong bảng để bạn tự mở và thanh toán sau. Bot không phụ
              thuộc nút “Mua/Gọi tư vấn viên” đang hiển thị trên giao diện,
              nhưng sẽ dừng nếu backend thật sự trả về yêu cầu tư vấn dược sĩ.
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
                <small>Tổng lượt request kiểm tra giá checkout trước khi dừng.</small>
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
              <label>Mã voucher cố định (không bắt buộc)
                <input id="${ROOT_ID}-voucher" placeholder="Mã1, Mã2" />
                <small>Nhiều mã cách nhau bằng dấu phẩy.</small>
              </label>
              <label style="display:flex;align-items:center;gap:8px;margin-top:18px">
                <input id="${ROOT_ID}-wallet-vouchers" type="checkbox" checked style="width:auto;margin:0" />
                Tự thử voucher hợp lệ trong ví
              </label>
              <label>Phí giao/phụ phí tối đa mỗi đơn (VND)
                <input id="${ROOT_ID}-extra" type="number" min="0" value="150000" />
                <small>Không làm tăng trần giá hàng; chỉ giới hạn khoản ngoài tiền sản phẩm.</small>
              </label>
              <label style="display:flex;align-items:center;gap:8px;margin-top:18px">
                <input id="${ROOT_ID}-submit" type="checkbox" style="width:auto;margin:0" />
                CHO PHÉP TẠO ĐƠN THẬT
              </label>
              <div class="lc-note">
                Bỏ chọn: tạo checkout thử để đọc giá cuối sau ưu đãi nhưng không
                tạo đơn. Bật chọn: khi đúng giờ và tổng giá hàng checkout không
                vượt giá trần, bot sẽ gửi API tạo số đơn thật đã cấu hình.
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
      autoApplyWalletVouchers: document.getElementById(
        `${ROOT_ID}-wallet-vouchers`,
      ).checked,
      voucherCodes: document
        .getElementById(`${ROOT_ID}-voucher`)
        .value.split(",")
        .map((value) => value.trim().toUpperCase())
        .filter(Boolean)
        .filter((value, index, values) => values.indexOf(value) === index),
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
      settings.voucherCodes.length > 10 ||
      settings.voucherCodes.some((code) => code.length > 64)
    ) {
      fail("Chỉ nhập tối đa 10 mã voucher, mỗi mã không quá 64 ký tự.");
    }
    if (
      !Number.isFinite(settings.maxExtraPerOrderVnd) ||
      settings.maxExtraPerOrderVnd < 0
    ) {
      fail("Phí giao/phụ phí tối đa không hợp lệ.");
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
    if (Array.isArray(unwrapped?.vouchers)) return unwrapped.vouchers;
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
    const requestStartedAt = Date.now();
    let response;
    let text;
    try {
      ({ response, text } = await fetchTextWithTimeout(url, {
        method,
        credentials: "include",
        cache: "no-store",
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: state.running ? state.abortController?.signal : undefined,
      }));
    } catch (error) {
      const elapsedMs = Date.now() - requestStartedAt;
      if (!state.stopped) {
        appendLog(
          `[API lỗi/chậm] ${method} ${url.pathname}: ${elapsedMs}ms — ${error.message}`,
          "warn",
        );
      }
      throw error;
    }
    const elapsedMs = Date.now() - requestStartedAt;
    if (elapsedMs >= SLOW_REQUEST_THRESHOLD_MS) {
      const metricKey = `${method} ${url.pathname}`;
      const now = Date.now();
      if (now - Number(state.lastSlowRequestLogAt[metricKey] || 0) >= 5000) {
        state.lastSlowRequestLogAt[metricKey] = now;
        appendLog(
          `[API chậm] ${metricKey}: ${elapsedMs}ms (HTTP ${response.status}).`,
          "warn",
        );
      }
    }
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
      } else if (retryAfter) {
        const retryAt = Date.parse(retryAfter);
        if (Number.isFinite(retryAt)) {
          error.retryAfterMs = Math.max(0, retryAt - Date.now());
        }
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

  function getVoucherApi() {
    const webpackRequire = getWebpackRequire();
    if (!webpackRequire) return null;
    try {
      const knownModule = webpackRequire(37474);
      if (knownModule?.D$ && knownModule?.uZ) return knownModule;
    } catch {
      // Tìm theo exports nếu mã module thay đổi ở bản build mới.
    }
    for (const moduleRecord of Object.values(webpackRequire.c || {})) {
      const candidate = moduleRecord?.exports;
      if (candidate?.D$ && candidate?.uZ) return candidate;
    }
    return null;
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

    appendLog(
      `Đã xác nhận tài khoản ****${phone.slice(-4)} và địa chỉ mặc định.`,
      "ok",
    );
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
    const { response, text: html } = await fetchTextWithTimeout(url, {
      credentials: "include",
      cache: "no-store",
      headers: { Accept: "text/html" },
    }, 15000);
    if (!response.ok) {
      fail(`Không đọc được sản phẩm: HTTP ${response.status}.`);
    }
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
      const isBlockedEnsureUnit =
        product.sku === ENSURE_TARGET_SKU &&
        normalizeText(unit.label) !== ENSURE_TARGET_UNIT;
      const button = createElement(
        "button",
        `lc-unit${unit.code === state.selectedUnitCode ? " is-selected" : ""}`,
        `${unit.label} — ${formatVnd(unit.finalPrice)}`,
      );
      button.type = "button";
      button.disabled = isBlockedEnsureUnit;
      button.title = isBlockedEnsureUnit
        ? "Cấu hình Ensure này chỉ cho phép đơn vị Thùng."
        : unit.inStock
          ? unit.specification
          : `${unit.specification} — đang hết hàng, vẫn có thể cấu hình để canh lại kho.`;
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
    priceLabel.textContent =
      "Giá trần mỗi đơn vị sau ưu đãi/voucher (VND)";
    const target = document.createElement("input");
    target.id = `${ROOT_ID}-target`;
    target.type = "number";
    target.min = "1";
    target.value =
      selected &&
      product.sku === ENSURE_TARGET_SKU &&
      normalizeText(selected.label) === ENSURE_TARGET_UNIT
        ? String(ENSURE_TARGET_PRICE_VND)
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
      if (
        product.sku === ENSURE_TARGET_SKU &&
        normalizeText(unit.label) !== ENSURE_TARGET_UNIT
      ) {
        fail("SKU Ensure 00503063 chỉ được cấu hình với đơn vị Thùng.");
      }
      const targetPrice = Number(
        document.getElementById(`${ROOT_ID}-target`).value,
      );
      const quantity = Number(
        document.getElementById(`${ROOT_ID}-qty`).value,
      );
      if (!Number.isInteger(targetPrice) || targetPrice <= 0) {
        fail("Giá trần phải là số nguyên VND lớn hơn 0.");
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
        `Đã thêm ${item.unitLabel}: chỉ mua khi không vượt ${formatVnd(item.targetPrice)}`,
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
          `${item.unitLabel} · ${item.quantity} × trần ${formatVnd(item.targetPrice)}`,
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
        `Trần tiền hàng mỗi đơn: ${formatVnd(total)}`,
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
      if (result.warning) {
        const warning = createElement("div", "", result.warning);
        warning.style.color = "#b42318";
        warning.style.fontWeight = "700";
        warning.style.marginTop = "6px";
        card.appendChild(warning);
      }
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

  function targetGoodsTotal() {
    return state.items.reduce(
      (sum, item) => sum + item.targetPrice * item.quantity,
      0,
    );
  }

  function validateConfiguredOrder() {
    const ensureItems = state.items.filter(
      (item) => String(item.sku) === ENSURE_TARGET_SKU,
    );
    if (ensureItems.length === 0) return;
    if (state.items.length !== 1 || ensureItems.length !== 1) {
      fail(
        "Cấu hình Ensure 00503063 phải là sản phẩm duy nhất trong mỗi đơn để kiểm tra chính xác 912.000đ/Thùng.",
      );
    }
    const item = ensureItems[0];
    if (normalizeText(item.unitLabel) !== ENSURE_TARGET_UNIT) {
      fail("SKU Ensure 00503063 chỉ được mua theo đơn vị Thùng.");
    }
    if (Number(item.targetPrice) !== ENSURE_TARGET_PRICE_VND) {
      fail("Giá trần của Ensure Thùng phải là 912.000đ.");
    }
  }

  function checkoutObservation(cart) {
    const price = cart?.calculatorPriceInfo || {};
    const shipmentFee = Number(price.shipmentFee ?? 0);
    const estimatedPrice = Number(
      price.estimatedPrice ?? price.totalBill ?? NaN,
    );
    const goodsTotal = estimatedPrice - shipmentFee;
    const directDiscount = Number(price.totalDiscount ?? 0);
    const voucherDiscount = Number(price.totalVoucherPrice ?? 0);
    const principalAmount = Number(
      price.principalAmount ??
        goodsTotal + directDiscount + voucherDiscount,
    );
    const targetTotal = targetGoodsTotal();
    return {
      goodsTotal,
      targetGoodsTotal: targetTotal,
      shipmentFee,
      estimatedPrice,
      principalAmount,
      directDiscount,
      voucherDiscount,
      missingDiscount: Math.max(0, goodsTotal - targetTotal),
      effectiveUnitPrice:
        state.items.length === 1 && Number(state.items[0]?.quantity) > 0
          ? goodsTotal / Number(state.items[0].quantity)
          : NaN,
    };
  }

  function checkoutPriceAccepted(observation) {
    return (
      Number.isFinite(observation.goodsTotal) &&
      observation.goodsTotal > 0 &&
      observation.goodsTotal <= observation.targetGoodsTotal
    );
  }

  function describeCheckout(observation, prefix = "") {
    const unitText = Number.isFinite(observation.effectiveUnitPrice)
      ? ` · hiệu dụng ${formatVnd(observation.effectiveUnitPrice)}/đơn vị`
      : "";
    const principalText = Number.isFinite(observation.principalAmount)
      ? ` · giá gốc ${formatVnd(observation.principalAmount)}`
      : "";
    const missingText =
      observation.missingDiscount > 0
        ? ` · còn thiếu ưu đãi ${formatVnd(observation.missingDiscount)}`
        : "";
    return (
      `${prefix}giá hàng sau ưu đãi ${formatVnd(observation.goodsTotal)}` +
      ` / trần ${formatVnd(observation.targetGoodsTotal)}` +
      unitText +
      principalText +
      ` · giảm trực tiếp ${formatVnd(observation.directDiscount)}` +
      ` · voucher ${formatVnd(observation.voucherDiscount)}` +
      missingText +
      ` · phí giao ${formatVnd(observation.shipmentFee)}`
    );
  }

  function checkoutSignature(observation) {
    return [
      observation.goodsTotal,
      observation.principalAmount,
      observation.directDiscount,
      observation.voucherDiscount,
      observation.missingDiscount,
      observation.shipmentFee,
    ].join("|");
  }

  function checkoutPromotionLabels(cart) {
    const labels = [];
    const addFrom = (value) => {
      if (!value || typeof value !== "object") return;
      for (const key of [
        "promotionCode",
        "promotionId",
        "programCode",
        "programId",
        "promotionName",
        "programName",
        "seriesCode",
      ]) {
        const text = String(value[key] ?? "").trim();
        if (text) labels.push(text);
      }
    };
    for (const row of selectedProductRows(cart)) {
      addFrom(row.detailCalculatorPriceInfo);
      for (const promotion of row.listSuggestPromotion || []) {
        addFrom(promotion);
      }
    }
    for (const voucher of cart?.vouchers || []) addFrom(voucher);
    return [...new Set(labels)].slice(0, 6);
  }

  function logCheckoutContext(probe) {
    const shop = probe?.planning?.shopSender || {};
    const shopCode =
      shop.shopCode || shop.code || shop.id || shop.shopId || "không rõ";
    const warehouses = [
      ...new Set(
        selectedProductRows(probe.cart)
          .map((row) => row.whsCode || row.detailCalculatorPriceInfo?.whsCode)
          .filter(Boolean),
      ),
    ];
    const promotions = checkoutPromotionLabels(probe.cart);
    const signature = JSON.stringify([shopCode, warehouses, promotions]);
    if (signature === state.lastCheckoutContextSignature) return;
    state.lastCheckoutContextSignature = signature;
    appendLog(
      `Checkout backend: shop ${shopCode}; kho ${warehouses.join(", ") || "không rõ"}; mã ưu đãi ${promotions.join(", ") || "không trả về"}.`,
      "warn",
    );
  }

  function walletCartItems(cart) {
    return selectedProductRows(cart).map((entry) => {
      const detail = entry.detailCalculatorPriceInfo || {};
      const product = entry.productInfo || {};
      return {
        price: Number(detail.price ?? 0),
        itemCode: detail.itemCode || entry.itemCart,
        unitCode: detail.unitCode ?? entry.unitCode,
        quantity: detail.quantity ?? entry.quantity,
        isPrescription: Boolean(product.isPrescription),
        whsCode: entry.whsCode,
        isChronic: Boolean(product.isChronicIllness),
        categories: product.categories || [],
      };
    });
  }

  function logVoucherStatus(cart) {
    const vouchers = Array.isArray(cart?.vouchers) ? cart.vouchers : [];
    const codes = [
      ...new Set(
        vouchers
          .map((voucher) =>
            String(
              voucher?.seriesCode ||
                voucher?.voucherCode ||
                voucher?.code ||
                "",
            )
              .trim()
              .toUpperCase(),
          )
          .filter(Boolean),
      ),
    ];
    const discount = Number(
      cart?.calculatorPriceInfo?.totalVoucherPrice ?? 0,
    );
    const signature = JSON.stringify([codes, discount]);
    if (signature === state.lastVoucherStatusSignature) return;
    state.lastVoucherStatusSignature = signature;
    if (codes.length > 0 || discount > 0) {
      appendLog(
        `Voucher checkout đã áp: ${codes.join(", ") || "backend không trả mã"}; giảm ${formatVnd(discount)}.`,
        "ok",
      );
      return;
    }
    appendLog("Voucher checkout: chưa có mã nào được áp; giảm 0đ.", "warn");
  }

  async function refreshWalletVoucherCodes(cart, force = false) {
    if (!state.settings.autoApplyWalletVouchers) return [];
    const refreshIntervalMs = Math.max(
      state.settings.delayCheckMs,
      WALLET_VOUCHER_REFRESH_MS,
    );
    if (
      !force &&
      Date.now() - state.walletVoucherFetchedAt < refreshIntervalMs
    ) {
      return state.walletVoucherCodes;
    }
    state.walletVoucherFetchedAt = Date.now();
    try {
      const response = unwrapPayload(
        await apiJson(
          `${STORE_FRONT}/v3/token/cart/vouchers`,
          "POST",
          { cartItems: walletCartItems(cart) },
          { auth: true, silent: true },
        ),
      );
      const vouchers = Array.isArray(response?.vouchers)
        ? response.vouchers
        : asArray(response);
      state.walletVoucherCodes = vouchers
        .filter((voucher) => voucher.isValidForCart === true)
        .map((voucher) => String(voucher.seriesCode || "").trim().toUpperCase())
        .filter(Boolean);
      state.lastWalletVoucherError = "";
    } catch (error) {
      if (error.message !== state.lastWalletVoucherError) {
        state.lastWalletVoucherError = error.message;
        appendLog(`Không đọc được voucher trong ví: ${error.message}`, "warn");
      }
    }
    return state.walletVoucherCodes;
  }

  async function applyVoucherCodes(probe, codes) {
    const cart = probe.cart;
    const existingVouchers = Array.isArray(cart?.vouchers)
      ? cart.vouchers
      : [];
    const existingCodes = new Set(
      existingVouchers.map((voucher) =>
        String(voucher.seriesCode || "").trim().toUpperCase(),
      ),
    );
    const pendingCodes = codes.filter((code) => !existingCodes.has(code));
    if (pendingCodes.length === 0) return cart;

    const voucherApi = getVoucherApi();
    if (!voucherApi?.D$ || !voucherApi?.uZ) {
      fail("Module voucher của Long Châu chưa sẵn sàng.");
    }
    const token = (localStorage.getItem("access_token") || "").replace(
      /^Bearer\s+/i,
      "",
    );
    if (!token) fail("Không có access token để kiểm tra voucher.");

    const itemCodes = selectedProductRows(cart).map(
      (entry) => entry.itemCart,
    );
    const verified = asArray(
      await voucherApi.D$(
        {
          vouchers: pendingCodes.map((seriesCode) => ({
            seriesCode,
            shopCode: "",
            phone: state.account.phone,
            itemCode: itemCodes,
          })),
          groupVouchers: existingVouchers.map((voucher) => ({
            seriesCode: voucher.seriesCode,
            shopCode: "",
            phone: state.account.phone,
            itemCode: itemCodes,
          })),
        },
        token,
      ),
    );
    const voucherDetails = verified
      .map((voucher) => voucher.detail)
      .filter(Boolean);
    if (voucherDetails.length === 0) return cart;

    return unwrapPayload(
      await voucherApi.uZ(
        {
          sessionId: probe.sessionId,
          customerId: state.account.customer.customerId,
          phoneNumber: state.account.phone,
          voucherDetails,
        },
        token,
      ),
    );
  }

  async function maybeApplyVouchers(probe, forceWalletRefresh = false) {
    const retryIntervalMs = Math.max(
      state.settings.delayCheckMs,
      VOUCHER_APPLY_RETRY_MS,
    );
    if (Date.now() < (probe.nextVoucherAttemptAt || 0)) return probe.cart;
    probe.nextVoucherAttemptAt = Number.POSITIVE_INFINITY;
    try {
      const walletCodes = await refreshWalletVoucherCodes(
        probe.cart,
        forceWalletRefresh,
      );
      const codes = [
        ...new Set([...state.settings.voucherCodes, ...walletCodes]),
      ];
      if (codes.length === 0) {
        logVoucherStatus(probe.cart);
        return probe.cart;
      }
      try {
        probe.cart = await applyVoucherCodes(probe, codes);
        probe.lastVoucherError = "";
      } catch (error) {
        if (error.message !== probe.lastVoucherError) {
          probe.lastVoucherError = error.message;
          appendLog(`Voucher chưa áp dụng được: ${error.message}`, "warn");
        }
      }
      logVoucherStatus(probe.cart);
      return probe.cart;
    } finally {
      probe.nextVoucherAttemptAt = Date.now() + retryIntervalMs;
    }
  }

  async function addConfiguredItems(sessionId) {
    for (const item of state.items) {
      await apiJson(
        `${STORE_FRONT}/v3/cart`,
        "POST",
        {
          cartItem: {
            itemCart: item.sku,
            quantity: item.quantity,
            unitCode: item.unitCode,
          },
          isCustomerToCart: false,
          customerId: state.account.customer.customerId,
          phoneNumber: state.account.phone,
          sessionId,
        },
        { silent: true },
      );
    }
  }

  async function createCheckoutProbe() {
    const sessionId = await createSession(true);
    await addConfiguredItems(sessionId);
    const probe = {
      sessionId,
      cart: await getCart(sessionId, state.account, 0, true),
      planning: null,
      provider: null,
      paymentMethod: null,
      createdAt: Date.now(),
      nextVoucherAttemptAt: 0,
      lastVoucherError: "",
    };
    validateCartContents(probe.cart);
    await maybeApplyVouchers(probe, true);
    validateCartContents(probe.cart);
    const delivery = await planDelivery(
      probe.cart,
      sessionId,
      state.account,
      true,
    );
    probe.planning = delivery.planning;
    probe.provider = delivery.provider;
    probe.cart = await getCart(
      sessionId,
      state.account,
      Number(probe.provider.feeFrt),
      true,
    );
    validateCartContents(probe.cart);
    probe.nextVoucherAttemptAt = 0;
    await maybeApplyVouchers(probe);
    validateCartContents(probe.cart);
    probe.paymentMethod = await getPaymentMethod(probe.cart, true);
    logCheckoutContext(probe);
    return probe;
  }

  async function refreshCheckoutProbe({ applyVouchers = true } = {}) {
    if (
      state.checkoutProbe &&
      Date.now() - state.checkoutProbe.createdAt >
        CHECKOUT_PROBE_MAX_AGE_MS
    ) {
      appendLog("Làm mới checkout thử để tránh session/khung giao hết hạn.");
      state.checkoutProbe = null;
    }
    if (!state.checkoutProbe) {
      state.checkoutProbe = await createCheckoutProbe();
    } else {
      state.checkoutProbe.cart = await getCart(
        state.checkoutProbe.sessionId,
        state.account,
        Number(state.checkoutProbe.provider?.feeFrt ?? 0),
        true,
      );
      validateCartContents(state.checkoutProbe.cart);
      if (applyVouchers) {
        await maybeApplyVouchers(state.checkoutProbe);
        validateCartContents(state.checkoutProbe.cart);
      }
      logCheckoutContext(state.checkoutProbe);
    }
    return state.checkoutProbe;
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
      const warmupAt = new Date(
        schedule.target.getTime() -
          Math.max(
            CHECKOUT_WARMUP_SECONDS,
            state.settings.precheckSeconds,
          ) *
            1000,
      );
      await waitUntil(warmupAt.getTime(), "Chờ chuẩn bị checkout");
      if (Date.now() < schedule.target.getTime()) {
        appendLog(
          `Chuẩn bị checkout hoàn chỉnh trước giờ ${CHECKOUT_WARMUP_SECONDS} giây; chưa gửi đơn.`,
          "ok",
        );
        try {
          await refreshCheckoutProbe();
        } catch (error) {
          if (error?.fatalPolicy) throw error;
          state.checkoutProbe = null;
          appendLog(`Chuẩn bị checkout lỗi: ${error.message}`, "warn");
        }
      }
      await waitUntil(schedule.precheckAt.getTime(), "Chờ lượt kiểm tra sớm");
      const canPrecheck =
        state.settings.precheckSeconds > 0 &&
        Date.now() < schedule.target.getTime();
      if (canPrecheck) {
        appendLog(
          `Bắt đầu tạo checkout thử trước giờ ${state.settings.precheckSeconds} giây. Chưa gửi đơn và lượt này không tính vào Tổng số lần thử.`,
          "ok",
        );
        try {
          const precheck = await refreshCheckoutProbe();
          appendLog(
            describeCheckout(
              checkoutObservation(precheck.cart),
              "Precheck checkout: ",
            ),
            "warn",
          );
        } catch (error) {
          state.checkoutProbe = null;
          appendLog(`Precheck checkout lỗi: ${error.message}`, "warn");
        }
      }
      state.precheckCompleted = true;
    }
    await waitUntil(schedule.target.getTime(), "Chờ đúng giờ mua");
    if (!state.targetCheckoutRefreshed) {
      state.targetCheckoutRefreshed = true;
      if (state.checkoutProbe) {
        const warmedObservation = checkoutObservation(
          state.checkoutProbe.cart,
        );
        if (!checkoutPriceAccepted(warmedObservation)) {
          appendLog(
            "Checkout làm nóng trước giờ chưa đạt giá mục tiêu; tạo cart session mới tại mốc mua để backend tính lại ưu đãi/voucher vừa mở.",
            "warn",
          );
          state.checkoutProbe = null;
          state.walletVoucherCodes = [];
          state.walletVoucherFetchedAt = 0;
          state.lastVoucherStatusSignature = "";
        }
      }
    }
    appendLog(
      `Đã tới mốc mua; bắt đầu request giá. Checkout đã chuẩn bị được ${state.checkoutProbe ? Date.now() - state.checkoutProbe.createdAt : 0}ms.`,
      "ok",
    );

    let lastSignature = "";
    let lastError = "";
    let lastObservation = null;
    while (state.priceChecksUsed < state.settings.totalAttempts) {
      if (state.stopped) fail("Bot đã dừng.");
      state.priceChecksUsed += 1;
      const attempt = state.priceChecksUsed;
      let delayMs = state.settings.delayCheckMs;
      try {
        const probe = await refreshCheckoutProbe({ applyVouchers: false });
        let observation = checkoutObservation(probe.cart);
        if (!checkoutPriceAccepted(observation)) {
          await maybeApplyVouchers(probe);
          validateCartContents(probe.cart);
          observation = checkoutObservation(probe.cart);
        }
        lastObservation = observation;
        const signature = checkoutSignature(observation);
        if (signature !== lastSignature) {
          lastSignature = signature;
          appendLog(describeCheckout(observation), "warn");
        }
        const targetMatched = checkoutPriceAccepted(observation);
        if (targetMatched) {
          const elapsedFromTargetMs = Math.max(
            0,
            Date.now() - schedule.target.getTime(),
          );
          appendLog(
            `Giá checkout sau ưu đãi đã đạt trần ở lần ${attempt}/${state.settings.totalAttempts}, sau ${elapsedFromTargetMs}ms từ mốc mua.`,
            "ok",
          );
          state.checkoutProbe = null;
          return probe;
        }
        setStatus(
          `Check checkout ${attempt}/${state.settings.totalAttempts}: ${formatVnd(observation.goodsTotal)}`,
        );
      } catch (error) {
        if (state.stopped || error?.fatalPolicy) throw error;
        state.checkoutProbe = null;
        delayMs = retryDelayMs(error);
        if (error.message !== lastError) {
          lastError = error.message;
          appendLog(
            `Checkout thử lỗi: ${error.message}. Tạo session mới sau ${delayMs}ms.`,
            "warn",
          );
        }
      }
      if (state.priceChecksUsed < state.settings.totalAttempts) {
        await sleep(delayMs);
      }
    }
    const finalDetail = lastObservation
      ? ` Giá cuối ${formatVnd(lastObservation.goodsTotal)}, còn thiếu ưu đãi ${formatVnd(lastObservation.missingDiscount)} để đạt trần.`
      : "";
    fail(
      `Đã hết ${state.settings.totalAttempts} lần thử nhưng backend chưa áp đủ ưu đãi cho tài khoản này.${finalDetail}`,
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

  function validateCartContents(cart) {
    const rows = selectedProductRows(cart);
    const cartPolicyType = Number(cart?.policy?.cart?.type ?? 0);
    if (![0, 1].includes(cartPolicyType)) {
      const message =
        cart?.policy?.cart?.message ||
        (cartPolicyType === 2
          ? "Backend Long Châu yêu cầu tư vấn dược sĩ."
          : "Backend Long Châu chưa cho phép checkout.");
      failPolicy(message, true);
    }
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
      const itemPolicyType = Number(row?.policy?.type ?? 0);
      if (itemPolicyType !== 0) {
        failPolicy(
          row?.policy?.message ||
            `SKU ${item.sku} đang bị giới hạn, hết kho hoặc cần tư vấn.`,
          ![2, 5].includes(itemPolicyType),
        );
      }
    }
    return rows;
  }

  function validateCheckoutTarget(cart) {
    const observation = checkoutObservation(cart);
    if (
      !Number.isFinite(observation.goodsTotal) ||
      observation.goodsTotal <= 0
    ) {
      fail("Checkout không trả về giá hàng cuối cùng hợp lệ.");
    }
    if (!checkoutPriceAccepted(observation)) {
      fail(
        `Giá checkout sau ưu đãi là ${formatVnd(observation.goodsTotal)}, vượt trần ${formatVnd(observation.targetGoodsTotal)}.`,
      );
    }
    return observation;
  }

  async function createSession(silent = false) {
    const response = unwrapPayload(
      await apiJson(
        `${STORE_FRONT}/v3/cart/session`,
        "POST",
        { shopCode: "50001" },
        { silent },
      ),
    );
    const sessionId =
      typeof response === "string" ? response : response?.sessionId;
    if (!sessionId) fail("API không trả về cart session.");
    return sessionId;
  }

  async function getCart(
    sessionId,
    account,
    shipmentPrice = 0,
    silent = false,
  ) {
    return unwrapPayload(
      await apiJson(`${STORE_FRONT}/v3/cart`, "GET", undefined, {
        silent,
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

  async function planDelivery(cart, sessionId, account, silent = false) {
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
        { silent },
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

  async function getPaymentMethod(cart, silent = false) {
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
      await apiJson(
        `${STORE_FRONT}/v5/payment/methods`,
        "POST",
        { details },
        { silent },
      ),
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

  function mergeOrderResult(rawResult) {
    const envelope =
      rawResult && typeof rawResult === "object" && !Array.isArray(rawResult)
        ? rawResult
        : {};
    const payload = unwrapPayload(rawResult);
    return payload && typeof payload === "object" && !Array.isArray(payload)
      ? { ...envelope, ...payload }
      : { ...envelope };
  }

  function orderResponseMessages(rawResult, result) {
    const messages = [];
    const add = (value) => {
      if (Array.isArray(value)) {
        value.forEach(add);
        return;
      }
      if (value && typeof value === "object") {
        add(value.message);
        add(value.description);
        add(value.title);
        return;
      }
      const text = String(value ?? "").trim();
      if (text) messages.push(text);
    };
    for (const source of [rawResult, rawResult?.data, result]) {
      if (!source || typeof source !== "object") continue;
      add(source.message);
      add(source.messages);
      add(source.notification);
      add(source.description);
      add(source.errorMessage);
    }
    return [...new Set(messages)];
  }

  function orderNeedsManualReview(rawResult, result, messages) {
    const sources = [rawResult, rawResult?.data, result].filter(
      (value) => value && typeof value === "object",
    );
    const booleanFlags = [
      "requiresPharmacistAdvice",
      "requirePharmacistAdvice",
      "needPharmacistAdvice",
      "needsConsultation",
      "isConsultation",
      "isAdviceOrder",
    ];
    if (
      sources.some((source) =>
        booleanFlags.some((key) => source[key] === true),
      )
    ) {
      return true;
    }
    const statusText = normalizeText(
      sources
        .flatMap((source) => [
          source.status,
          source.orderStatus,
          source.state,
          source.statusName,
        ])
        .filter(Boolean)
        .join(" "),
    );
    const messageText = normalizeText(messages.join(" "));
    const reviewPatterns = [
      "tu van",
      "duoc si",
      "het hang",
      "chi ban khi co chi dinh",
      "cho xu ly thu cong",
      "manual review",
      "pharmacist",
      "consultation",
    ];
    return reviewPatterns.some(
      (pattern) =>
        statusText.includes(pattern) || messageText.includes(pattern),
    );
  }

  function safePaymentUrl(result) {
    const candidates = [
      result?.paymentLink,
      result?.paymentUrl,
      result?.redirectUrl,
      result?.checkoutUrl,
      result?.transferInfo?.paymentLink,
      result?.transferInfo?.paymentUrl,
    ];
    for (const direct of candidates) {
      if (typeof direct !== "string" || !direct.trim()) continue;
      try {
        const url = new URL(direct.trim(), BASE_URL);
        if (url.protocol === "https:") return url.href;
      } catch {
        // Bỏ qua URL không hợp lệ do backend trả về.
      }
    }
    return null;
  }

  async function executeOrder(orderNumber, preparedCheckout = null) {
    appendLog(`Bắt đầu request đơn ${orderNumber}.`);
    const checkout = preparedCheckout || (await createCheckoutProbe());
    const sessionId = checkout.sessionId;
    let cart = checkout.cart;
    validateCartContents(cart);
    validateCheckoutTarget(cart);
    let planning = checkout.planning;
    let provider = checkout.provider;
    if (!planning || !provider) {
      const delivery = await planDelivery(cart, sessionId, state.account);
      planning = delivery.planning;
      provider = delivery.provider;
    }
    cart = await getCart(
      sessionId,
      state.account,
      Number(provider.feeFrt),
    );
    validateCartContents(cart);
    checkout.cart = cart;
    if (!checkoutPriceAccepted(checkoutObservation(cart))) {
      checkout.nextVoucherAttemptAt = 0;
      await maybeApplyVouchers(checkout);
      cart = checkout.cart;
      validateCartContents(cart);
    }
    validateCheckoutTarget(cart);

    const targetGoods = targetGoodsTotal();
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
    const paymentMethod =
      checkout.paymentMethod || (await getPaymentMethod(cart));
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
    const result = mergeOrderResult(rawResult);
    const responseMessages = orderResponseMessages(rawResult, result);
    const paymentUrl = safePaymentUrl(result);
    if (!result.orderCode && !paymentUrl && !result.transferInfo) {
      const error = new Error(
        "API tạo đơn không trả về mã đơn/link thanh toán; dừng để tránh trùng.",
      );
      error.orderSubmissionStarted = true;
      throw error;
    }
    const needsManualReview = orderNeedsManualReview(
      rawResult,
      result,
      responseMessages,
    );
    const orderCode = String(result.orderCode || "").trim();
    if (
      orderCode &&
      state.orderResults.some(
        (entry) => String(entry.orderCode || "").trim() === orderCode,
      )
    ) {
      const error = new Error(
        `Backend trả lặp mã đơn ${orderCode}; bot dừng để không báo nhầm hoặc tạo thêm đơn trùng.`,
      );
      error.orderSubmissionStarted = true;
      error.orderRecorded = true;
      throw error;
    }
    const missingOnlinePayment =
      state.settings.paymentMethod !== "cash_on_delivery" &&
      !paymentUrl &&
      !result.transferInfo;
    const warningParts = [];
    if (needsManualReview) {
      warningParts.push(
        responseMessages.join(" · ") ||
          "Backend đánh dấu đơn cần tư vấn hoặc xử lý thủ công.",
      );
    }
    if (missingOnlinePayment) {
      warningParts.push("Backend không trả link/thông tin thanh toán online.");
    }
    const savedResult = {
      number: orderNumber,
      orderCode,
      paymentUrl,
      warning: warningParts.join(" "),
      raw: result,
    };
    state.orderResults.push(savedResult);
    state.ordersCreated += 1;
    renderResults();
    appendLog(
      `Đơn ${orderNumber} đã tạo: ${savedResult.orderCode || "không có mã hiển thị"}. Không mở tab thanh toán.`,
      "ok",
    );
    if (warningParts.length > 0) {
      const error = new Error(
        `Đơn ${orderNumber} đã có mã ${savedResult.orderCode || "không rõ"} nhưng chưa sẵn sàng thanh toán: ${warningParts.join(" ")} Bot dừng các đơn tiếp theo để tránh tạo hàng loạt đơn chờ xử lý.`,
      );
      error.orderSubmissionStarted = true;
      error.orderRecorded = true;
      throw error;
    }
    return savedResult;
  }

  async function executeOrderWithRetry(
    orderNumber,
    preparedCheckout = null,
  ) {
    const maxAttempts = state.settings.checkoutRetries + 1;
    let checkout = preparedCheckout;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      if (state.stopped) fail("Bot đã dừng.");
      try {
        if (attempt > 1) {
          appendLog(
            `Đơn ${orderNumber}: thử đặt lại ${attempt - 1}/${state.settings.checkoutRetries}.`,
            "warn",
          );
        }
        const result = await executeOrder(orderNumber, checkout);
        checkout = null;
        return result;
      } catch (error) {
        checkout = null;
        if (state.stopped || error?.fatalPolicy) throw error;
        if (error.orderSubmissionStarted) {
          if (!error.orderRecorded) {
            appendLog(
              `Đơn ${orderNumber}: request tạo đơn đã được gửi nhưng phản hồi không chắc chắn. Không tự gửi lại để tránh trùng đơn.`,
              "error",
            );
          }
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
      setStatus("Checkout thử đạt: chưa tạo đơn", "ok");
      appendLog(
        "Chạy thử xong. Giá cuối sau ưu đãi/voucher không vượt trần; không gửi request tạo đơn.",
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
        const preparedCheckout = await pollPriceGate(schedule);
        setStatus(
          `Giá checkout đã đạt trần — đang tạo đơn ${orderNumber}/${state.settings.orderCopies}`,
          "ok",
        );
        try {
          await executeOrderWithRetry(orderNumber, preparedCheckout);
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
      validateConfiguredOrder();
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
            `Trần giá hàng checkout mỗi đơn: ${formatVnd(targetGoodsTotal())}.`,
            `Phí giao/phụ phí cho phép tối đa: ${formatVnd(state.settings.maxExtraPerOrderVnd)}.`,
            `Thanh toán: ${PAYMENT_LABELS[state.settings.paymentMethod]}.`,
            `Voucher cố định: ${state.settings.voucherCodes.join(", ") || "không có"}; tự thử ví: ${state.settings.autoApplyWalletVouchers ? "có" : "không"}.`,
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
      state.targetCheckoutRefreshed = false;
      state.checkoutProbe = null;
      state.walletVoucherCodes = [];
      state.walletVoucherFetchedAt = 0;
      state.lastWalletVoucherError = "";
      state.lastVoucherStatusSignature = "";
      state.lastCheckoutContextSignature = "";
      state.lastSlowRequestLogAt = {};
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
      state.checkoutProbe = null;
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
