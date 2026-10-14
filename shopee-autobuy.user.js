// ==UserScript==
// @name         Shopee Auto Buy - Precision Timer
// @namespace    https://shopee.vn/
// @version      1.0.0
// @description  Auto checkout lúc 0h00p00s, đặt hàng lúc 0h00p01s. Đồng bộ giờ Shopee Server (NTP), giữ ấm kết nối, tự động đặt đơn.
// @author       AutoShopeeBuy
// @match        https://shopee.vn/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

/**
 * ============================================================================
 * SHOPEE AUTO BUY - PRECISION TIMER v1.0.0
 * ============================================================================
 *
 * LUỒNG HOẠT ĐỘNG:
 *   1. Kiểm tra đăng nhập Shopee
 *   2. Đồng bộ giờ Server Shopee (NTP Millisecond Sync)
 *   3. Đếm ngược tới giờ G (mặc định 00:00:00)
 *   4. Giữ ấm kết nối (Pre-warm socket) 3s trước giờ G
 *   5. Đúng 00:00:00 → Gọi checkout/get
 *   6. Đúng 00:00:01 → Gọi checkout/place_order
 *   7. Retry tối đa 5 lần nếu thất bại
 *
 * CÁCH SỬ DỤNG:
 *   - Mở shopee.vn, vào trang giỏ hàng hoặc trang checkout
 *   - Chọn sẵn sản phẩm muốn mua trong giỏ hàng
 *   - Chọn sẵn địa chỉ giao hàng & phương thức thanh toán
 *   - Dán script vào Console (F12) hoặc cài qua Tampermonkey
 *   - Bấm nút "⚡ Săn Đơn" → Cấu hình giờ G → Bấm "Bắt đầu"
 *
 * ============================================================================
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // CẤU HÌNH MẶC ĐỊNH
  // ═══════════════════════════════════════════════════════════════════════════

  const CONFIG = {
    // Thời điểm GET CHECKOUT (giờ:phút:giây)
    CHECKOUT_HOUR: 0,
    CHECKOUT_MINUTE: 0,
    CHECKOUT_SECOND: 0,

    // Thời điểm PLACE ORDER (giờ:phút:giây)
    ORDER_HOUR: 0,
    ORDER_MINUTE: 0,
    ORDER_SECOND: 1,

    // Số lần retry tối đa khi checkout/place_order thất bại
    MAX_RETRIES: 5,

    // Khoảng cách giữa các lần retry (ms)
    RETRY_DELAY_MS: 300,

    // Giữ ấm kết nối trước giờ G bao nhiêu giây
    PREWARM_BEFORE_SECONDS: 3,

    // API Endpoints
    API: {
      ACCOUNT_INFO: 'https://shopee.vn/api/v4/account/basic/get_account_info',
      CART_GET: 'https://shopee.vn/api/v4/cart/get',
      CHECKOUT_GET: 'https://shopee.vn/api/v4/checkout/get',
      PLACE_ORDER: 'https://shopee.vn/api/v4/checkout/place_order',
    },
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // TRÁNH NẠP TRÙNG
  // ═══════════════════════════════════════════════════════════════════════════

  if (window.__SHOPEE_AUTOBUY_V1_LOADED__) {
    log('⚠️ Script đã được nạp. Bỏ qua.');
    return;
  }
  window.__SHOPEE_AUTOBUY_V1_LOADED__ = true;

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════

  const state = {
    serverOffsetMs: 0,       // Độ lệch giữa giờ máy và giờ server Shopee
    isRunning: false,        // Đang chạy đếm ngược hay không
    isStopped: false,        // Đã bị dừng bởi user
    checkoutData: null,      // Dữ liệu trả về từ checkout/get
    orderResult: null,       // Kết quả place_order
    countdownTimer: null,    // ID của setInterval đếm ngược
    logs: [],                // Log lịch sử
    settings: { ...CONFIG }, // Cấu hình có thể thay đổi
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // UTILITIES
  // ═══════════════════════════════════════════════════════════════════════════

  function log(msg, type = 'info') {
    const ts = new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      fractionalSecondDigits: 3,
    });
    const entry = `[${ts}] ${msg}`;
    state.logs.push({ time: ts, msg, type });
    if (type === 'error') console.error('[AutoBuy]', entry);
    else if (type === 'warn') console.warn('[AutoBuy]', entry);
    else if (type === 'success') console.log('%c[AutoBuy] ' + entry, 'color: #00c853; font-weight: bold');
    else console.log('[AutoBuy]', entry);
    updateLogUI();
  }

  /** Trả về thời gian server Shopee đã bù offset */
  function serverNow() {
    return Date.now() + state.serverOffsetMs;
  }

  /** Sleep async */
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /** Kiểm tra mobile hay PC */
  function isMobile() {
    return /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(navigator.userAgent);
  }

  /** Header chuẩn cho Shopee API */
  function getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-source': isMobile() ? 'rweb' : 'pc',
      'x-shopee-language': 'vi',
      'x-requested-with': 'XMLHttpRequest',
    };
  }

  /** Lấy CSRF token từ cookie */
  function getCsrfToken() {
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    return match ? match[1] : '';
  }

  /** Format thời gian đếm ngược */
  function formatCountdown(ms) {
    if (ms <= 0) return '00:00:00.000';
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const mi = ms % 1000;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(mi).padStart(3, '0')}`;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 1: ĐỒNG BỘ GIỜ SERVER SHOPEE (NTP SYNC)
  // ═══════════════════════════════════════════════════════════════════════════

  async function syncServerTime() {
    log('🔄 Đang đồng bộ giờ Server Shopee...');
    try {
      const samples = [];
      // Lấy 3 mẫu để tính trung bình
      for (let i = 0; i < 3; i++) {
        const t0 = performance.now();
        const res = await fetch('https://shopee.vn/api/v4/pages/get_homepage_category_list', {
          method: 'HEAD',
          cache: 'no-store',
        });
        const t1 = performance.now();
        const dateHeader = res.headers.get('date');
        if (dateHeader) {
          const serverTs = new Date(dateHeader).getTime();
          const roundTrip = t1 - t0;
          const clientTs = Date.now();
          const offset = (serverTs + Math.round(roundTrip / 2)) - clientTs;
          samples.push(offset);
        }
        if (i < 2) await sleep(200);
      }

      if (samples.length > 0) {
        // Lấy trung vị (median) để loại outlier
        samples.sort((a, b) => a - b);
        state.serverOffsetMs = samples[Math.floor(samples.length / 2)];
        log(`✅ Đồng bộ thành công! Offset: ${state.serverOffsetMs}ms (${samples.length} mẫu)`, 'success');
      } else {
        log('⚠️ Không đọc được header Date từ Shopee. Dùng giờ máy.', 'warn');
      }
    } catch (err) {
      log('❌ Lỗi đồng bộ giờ: ' + err.message, 'error');
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 2: KIỂM TRA ĐĂNG NHẬP
  // ═══════════════════════════════════════════════════════════════════════════

  async function checkLogin() {
    log('🔐 Kiểm tra trạng thái đăng nhập...');
    try {
      const res = await fetch(CONFIG.API.ACCOUNT_INFO, {
        method: 'GET',
        headers: getHeaders(),
        credentials: 'include',
      });
      const data = await res.json();
      if (data && data.error === 0 && data.data) {
        const username = data.data.username || data.data.email || data.data.phone || 'User';
        log(`✅ Đã đăng nhập: ${username}`, 'success');
        return true;
      }
      log('❌ Chưa đăng nhập Shopee!', 'error');
      return false;
    } catch (err) {
      log('❌ Lỗi kiểm tra đăng nhập: ' + err.message, 'error');
      return false;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 3: GIỮ ẤM KẾT NỐI (PRE-WARM SOCKET)
  // ═══════════════════════════════════════════════════════════════════════════

  function prewarmConnections() {
    log('🔥 Giữ ấm kết nối TCP/TLS...');
    try {
      // Gửi HEAD request nhẹ để giữ socket sống
      fetch(CONFIG.API.CART_GET, { method: 'HEAD', cache: 'no-store', credentials: 'include' }).catch(() => {});
      fetch(CONFIG.API.CHECKOUT_GET, { method: 'HEAD', cache: 'no-store', credentials: 'include' }).catch(() => {});
      fetch(CONFIG.API.PLACE_ORDER, { method: 'HEAD', cache: 'no-store', credentials: 'include' }).catch(() => {});
    } catch (_) {}
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 4: CHECKOUT/GET - LẤY THÔNG TIN THANH TOÁN
  // ═══════════════════════════════════════════════════════════════════════════

  async function executeCheckoutGet() {
    log('📦 [1/2] Gọi checkout/get - Lấy thông tin thanh toán...');

    for (let attempt = 1; attempt <= state.settings.MAX_RETRIES; attempt++) {
      try {
        const csrfToken = getCsrfToken();
        const res = await fetch(CONFIG.API.CHECKOUT_GET, {
          method: 'POST',
          headers: {
            ...getHeaders(),
            ...(csrfToken ? { 'x-csrftoken': csrfToken } : {}),
          },
          credentials: 'include',
          body: JSON.stringify({
            // Shopee sẽ tự lấy thông tin từ session/cart hiện tại
            // nếu user đã vào trang checkout trước đó
            timestamp: Math.floor(serverNow() / 1000),
          }),
        });

        const data = await res.json();

        if (data && (data.error === 0 || !data.error)) {
          state.checkoutData = data;
          log(`✅ [1/2] checkout/get thành công! (lần ${attempt})`, 'success');
          return data;
        }

        log(`⚠️ checkout/get trả về error: ${JSON.stringify(data?.error)} (lần ${attempt}/${state.settings.MAX_RETRIES})`, 'warn');
      } catch (err) {
        log(`❌ checkout/get lỗi: ${err.message} (lần ${attempt}/${state.settings.MAX_RETRIES})`, 'error');
      }

      if (attempt < state.settings.MAX_RETRIES) {
        await sleep(state.settings.RETRY_DELAY_MS);
      }
    }

    log('❌ checkout/get thất bại sau tất cả các lần thử!', 'error');
    return null;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 5: CHECKOUT/PLACE_ORDER - ĐẶT HÀNG
  // ═══════════════════════════════════════════════════════════════════════════

  async function executePlaceOrder() {
    log('🛒 [2/2] Gọi checkout/place_order - Đặt hàng...');

    if (!state.checkoutData) {
      log('❌ Không có dữ liệu checkout! Hủy đặt hàng.', 'error');
      return null;
    }

    for (let attempt = 1; attempt <= state.settings.MAX_RETRIES; attempt++) {
      try {
        const csrfToken = getCsrfToken();

        // Xây dựng payload từ checkout data
        const payload = buildPlaceOrderPayload(state.checkoutData);

        const res = await fetch(CONFIG.API.PLACE_ORDER, {
          method: 'POST',
          headers: {
            ...getHeaders(),
            ...(csrfToken ? { 'x-csrftoken': csrfToken } : {}),
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (data && (data.error === 0 || !data.error)) {
          state.orderResult = data;
          log(`🎉🎉🎉 ĐẶT HÀNG THÀNH CÔNG! (lần ${attempt})`, 'success');
          showOrderSuccess(data);
          return data;
        }

        const errorMsg = data?.error_msg || data?.error || 'Unknown error';
        log(`⚠️ place_order error: ${errorMsg} (lần ${attempt}/${state.settings.MAX_RETRIES})`, 'warn');
      } catch (err) {
        log(`❌ place_order lỗi: ${err.message} (lần ${attempt}/${state.settings.MAX_RETRIES})`, 'error');
      }

      if (attempt < state.settings.MAX_RETRIES) {
        await sleep(state.settings.RETRY_DELAY_MS);
      }
    }

    log('❌ place_order thất bại sau tất cả các lần thử!', 'error');
    return null;
  }

  /**
   * Xây dựng payload cho place_order từ dữ liệu checkout/get
   * Payload sẽ chuyển tiếp toàn bộ thông tin Shopee đã chuẩn bị sẵn
   */
  function buildPlaceOrderPayload(checkoutData) {
    // Shopee checkout/get trả về cấu trúc có shoporders, payment_channel, etc.
    // Ta chuyển tiếp nguyên vẹn vì Shopee đã tính toán sẵn shipping, voucher, etc.
    const payload = {
      timestamp: Math.floor(serverNow() / 1000),
    };

    // Chuyển tiếp các trường quan trọng từ checkout response
    if (checkoutData.checkout_price_data) {
      payload.checkout_price_data = checkoutData.checkout_price_data;
    }
    if (checkoutData.shoporders) {
      payload.shoporders = checkoutData.shoporders;
    }
    if (checkoutData.selected_payment_channel_data) {
      payload.selected_payment_channel_data = checkoutData.selected_payment_channel_data;
    }
    if (checkoutData.promotion_data) {
      payload.promotion_data = checkoutData.promotion_data;
    }
    if (checkoutData.dropshipping_info) {
      payload.dropshipping_info = checkoutData.dropshipping_info;
    }
    if (checkoutData.shipping_orders) {
      payload.shipping_orders = checkoutData.shipping_orders;
    }
    if (checkoutData.buyer_txn_fee_info) {
      payload.buyer_txn_fee_info = checkoutData.buyer_txn_fee_info;
    }
    if (checkoutData.disabled_checkout_info) {
      payload.disabled_checkout_info = checkoutData.disabled_checkout_info;
    }
    if (checkoutData.buyer_info) {
      payload.buyer_info = checkoutData.buyer_info;
    }
    if (checkoutData.client_id) {
      payload.client_id = checkoutData.client_id;
    }
    if (checkoutData.cart_type) {
      payload.cart_type = checkoutData.cart_type;
    }
    if (checkoutData.tax_info) {
      payload.tax_info = checkoutData.tax_info;
    }
    if (checkoutData.order_update_info) {
      payload.order_update_info = checkoutData.order_update_info;
    }

    return payload;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 6: ENGINE CHÍNH - ĐẾM NGƯỢC & THỰC THI
  // ═══════════════════════════════════════════════════════════════════════════

  async function startEngine() {
    if (state.isRunning) {
      log('⚠️ Engine đang chạy rồi!', 'warn');
      return;
    }

    state.isRunning = true;
    state.isStopped = false;
    state.checkoutData = null;
    state.orderResult = null;
    updateButtonState();

    // Bước 1: Kiểm tra đăng nhập
    const isLoggedIn = await checkLogin();
    if (!isLoggedIn) {
      log('❌ Cần đăng nhập Shopee trước! Chuyển tới trang đăng nhập...', 'error');
      state.isRunning = false;
      updateButtonState();
      window.open('https://shopee.vn/buyer/login', '_blank');
      return;
    }

    // Bước 2: Đồng bộ giờ server
    await syncServerTime();

    // Bước 3: Tính thời điểm mục tiêu
    const now = new Date(serverNow());
    let checkoutTarget = new Date(now);
    checkoutTarget.setHours(state.settings.CHECKOUT_HOUR, state.settings.CHECKOUT_MINUTE, state.settings.CHECKOUT_SECOND, 0);

    // Nếu thời điểm đã qua, nhắm tới ngày mai
    if (checkoutTarget.getTime() <= serverNow()) {
      checkoutTarget.setDate(checkoutTarget.getDate() + 1);
    }

    let orderTarget = new Date(checkoutTarget);
    orderTarget.setHours(state.settings.ORDER_HOUR, state.settings.ORDER_MINUTE, state.settings.ORDER_SECOND, 0);
    if (orderTarget.getTime() <= checkoutTarget.getTime()) {
      orderTarget.setDate(orderTarget.getDate() + 1);
    }

    const checkoutTs = checkoutTarget.getTime();
    const orderTs = orderTarget.getTime();

    log(`🎯 Giờ G checkout: ${checkoutTarget.toLocaleString('vi-VN')}`);
    log(`🎯 Giờ G đặt hàng: ${orderTarget.toLocaleString('vi-VN')}`);
    log(`⏳ Bắt đầu đếm ngược...`);

    let prewarmed = false;
    let checkoutDone = false;
    let orderDone = false;

    // Bước 4: Vòng lặp đếm ngược chính xác
    state.countdownTimer = setInterval(async () => {
      if (state.isStopped) {
        clearInterval(state.countdownTimer);
        state.isRunning = false;
        log('🛑 Đã dừng bởi người dùng.', 'warn');
        updateButtonState();
        return;
      }

      const currentTime = serverNow();
      const msToCheckout = checkoutTs - currentTime;
      const msToOrder = orderTs - currentTime;

      // Cập nhật UI đếm ngược
      updateCountdownUI(msToCheckout, msToOrder, checkoutDone, orderDone);

      // Pre-warm 3 giây trước
      if (!prewarmed && msToCheckout <= state.settings.PREWARM_BEFORE_SECONDS * 1000 && msToCheckout > 0) {
        prewarmed = true;
        prewarmConnections();
      }

      // CHECKOUT/GET đúng giờ
      if (!checkoutDone && msToCheckout <= 0) {
        checkoutDone = true;
        log(`⚡ ĐÃ TỚI GIỜ CHECKOUT! Delta: ${msToCheckout}ms`);
        executeCheckoutGet(); // Fire & không await để không block timer
      }

      // PLACE_ORDER đúng giờ
      if (!orderDone && checkoutDone && msToOrder <= 0) {
        orderDone = true;
        log(`⚡ ĐÃ TỚI GIỜ ĐẶT HÀNG! Delta: ${msToOrder}ms`);

        // Chờ checkoutData sẵn sàng (tối đa 2s)
        let waited = 0;
        while (!state.checkoutData && waited < 2000) {
          await sleep(50);
          waited += 50;
        }

        if (state.checkoutData) {
          await executePlaceOrder();
        } else {
          log('❌ Chưa có dữ liệu checkout! Thử gọi lại checkout trước...', 'error');
          const data = await executeCheckoutGet();
          if (data) {
            await executePlaceOrder();
          }
        }

        // Dừng engine
        clearInterval(state.countdownTimer);
        state.isRunning = false;
        updateButtonState();
      }

    }, 50); // Tick 50ms cho độ chính xác cao
  }

  function stopEngine() {
    state.isStopped = true;
    log('🛑 Yêu cầu dừng...', 'warn');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 7: GIAO DIỆN NGƯỜI DÙNG (UI)
  // ═══════════════════════════════════════════════════════════════════════════

  function createUI() {
    // Xóa UI cũ nếu có
    const old = document.getElementById('autobuy-panel');
    if (old) old.remove();
    const oldBtn = document.getElementById('autobuy-float-btn');
    if (oldBtn) oldBtn.remove();

    // CSS
    const style = document.createElement('style');
    style.id = 'autobuy-styles';
    style.textContent = `
      #autobuy-float-btn {
        position: fixed; bottom: 80px; right: 24px; z-index: 99999;
        background: linear-gradient(135deg, #ee4d2d 0%, #ff6433 100%);
        color: #fff; padding: 11px 20px; border-radius: 50px; cursor: pointer;
        font: 700 13.5px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        box-shadow: 0 4px 16px rgba(238,77,45,.5); user-select: none;
        display: flex; align-items: center; gap: 7px;
        transition: transform .15s, box-shadow .15s;
        border: 1px solid rgba(255,255,255,.25);
      }
      #autobuy-float-btn:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 6px 22px rgba(238,77,45,.65); }

      #autobuy-panel {
        display: none; position: fixed; bottom: 135px; right: 24px; z-index: 99999;
        width: 420px; max-height: 80vh; background: #1a1a1a; color: #eee;
        border-radius: 14px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        box-shadow: 0 8px 40px rgba(0,0,0,.7); border: 1px solid #333;
        display: flex; flex-direction: column;
      }
      #autobuy-panel.open { display: flex; }

      .ab-header {
        background: linear-gradient(135deg, #ee4d2d, #ff6433); padding: 14px 18px;
        display: flex; justify-content: space-between; align-items: center;
      }
      .ab-header h3 { margin: 0; font-size: 16px; color: #fff; }
      .ab-close { background: none; border: none; color: #fff; font-size: 22px; cursor: pointer; line-height: 1; }

      .ab-body { padding: 14px 18px; overflow-y: auto; flex: 1; }

      .ab-section { margin-bottom: 14px; }
      .ab-section-title { font-size: 12px; color: #ff9977; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; letter-spacing: .5px; }

      .ab-row { display: flex; gap: 8px; margin-bottom: 8px; align-items: center; }
      .ab-label { font-size: 13px; color: #bbb; min-width: 110px; }
      .ab-input {
        flex: 1; height: 34px; background: #2a2a2a; border: 1px solid #444; border-radius: 7px;
        color: #fff; padding: 0 10px; font-size: 13px; outline: none; text-align: center;
      }
      .ab-input:focus { border-color: #ee4d2d; }

      .ab-countdown {
        text-align: center; padding: 12px; background: #111; border-radius: 10px;
        font: 700 32px monospace; color: #00ff90; letter-spacing: 2px; margin-bottom: 10px;
      }
      .ab-countdown-label { text-align: center; font-size: 11px; color: #888; margin-bottom: 4px; }
      .ab-status { text-align: center; font-size: 12px; color: #ffaa00; margin-bottom: 10px; min-height: 16px; }

      .ab-btn {
        width: 100%; height: 40px; border: none; border-radius: 8px; font-size: 14px;
        font-weight: 700; cursor: pointer; transition: transform .12s, opacity .12s;
      }
      .ab-btn:hover { transform: scale(1.02); }
      .ab-btn:active { transform: scale(.98); }
      .ab-btn-start { background: linear-gradient(135deg, #00c853, #00e676); color: #000; }
      .ab-btn-stop { background: linear-gradient(135deg, #ff1744, #ff5252); color: #fff; }
      .ab-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }

      .ab-logs {
        max-height: 180px; overflow-y: auto; background: #111; border-radius: 8px;
        padding: 8px; font-size: 11px; line-height: 1.5;
      }
      .ab-log-entry { padding: 2px 0; border-bottom: 1px solid #222; word-break: break-all; }
      .ab-log-entry.error { color: #ff5252; }
      .ab-log-entry.warn { color: #ffc107; }
      .ab-log-entry.success { color: #00e676; }
      .ab-log-entry.info { color: #90a4ae; }

      .ab-offset-badge {
        display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px;
        background: #333; color: #00e676; margin-left: 6px;
      }

      @media (max-width: 480px) {
        #autobuy-panel { width: calc(100vw - 20px); right: 10px; bottom: 120px; max-height: 70vh; }
        #autobuy-float-btn { right: 12px; bottom: 60px; }
      }
    `;
    document.head.appendChild(style);

    // Floating button
    const floatBtn = document.createElement('div');
    floatBtn.id = 'autobuy-float-btn';
    floatBtn.innerHTML = '⚡ Săn Đơn';
    floatBtn.addEventListener('click', togglePanel);
    document.body.appendChild(floatBtn);

    // Panel
    const panel = document.createElement('div');
    panel.id = 'autobuy-panel';
    panel.innerHTML = `
      <div class="ab-header">
        <h3>⚡ Shopee Auto Buy</h3>
        <button class="ab-close" id="ab-close-btn">&times;</button>
      </div>
      <div class="ab-body">
        <div class="ab-section">
          <div class="ab-section-title">⏰ Giờ Checkout (GET)</div>
          <div class="ab-row">
            <span class="ab-label">Giờ : Phút : Giây</span>
            <input class="ab-input" id="ab-ck-h" type="number" min="0" max="23" value="${CONFIG.CHECKOUT_HOUR}" style="width:55px;flex:none">
            <span style="color:#666">:</span>
            <input class="ab-input" id="ab-ck-m" type="number" min="0" max="59" value="${CONFIG.CHECKOUT_MINUTE}" style="width:55px;flex:none">
            <span style="color:#666">:</span>
            <input class="ab-input" id="ab-ck-s" type="number" min="0" max="59" value="${CONFIG.CHECKOUT_SECOND}" style="width:55px;flex:none">
          </div>
        </div>

        <div class="ab-section">
          <div class="ab-section-title">🛒 Giờ Đặt Hàng (PLACE ORDER)</div>
          <div class="ab-row">
            <span class="ab-label">Giờ : Phút : Giây</span>
            <input class="ab-input" id="ab-od-h" type="number" min="0" max="23" value="${CONFIG.ORDER_HOUR}" style="width:55px;flex:none">
            <span style="color:#666">:</span>
            <input class="ab-input" id="ab-od-m" type="number" min="0" max="59" value="${CONFIG.ORDER_MINUTE}" style="width:55px;flex:none">
            <span style="color:#666">:</span>
            <input class="ab-input" id="ab-od-s" type="number" min="0" max="59" value="${CONFIG.ORDER_SECOND}" style="width:55px;flex:none">
          </div>
        </div>

        <div class="ab-section">
          <div class="ab-section-title">⚙️ Tùy chọn</div>
          <div class="ab-row">
            <span class="ab-label">Max retry</span>
            <input class="ab-input" id="ab-retries" type="number" min="1" max="20" value="${CONFIG.MAX_RETRIES}" style="width:80px;flex:none">
            <span class="ab-label" style="min-width:auto">Delay (ms)</span>
            <input class="ab-input" id="ab-delay" type="number" min="50" max="5000" value="${CONFIG.RETRY_DELAY_MS}" style="width:80px;flex:none">
          </div>
        </div>

        <div class="ab-countdown-label">Đếm ngược tới Checkout</div>
        <div class="ab-countdown" id="ab-countdown">--:--:--.---</div>
        <div class="ab-status" id="ab-status">Sẵn sàng. Nhấn "Bắt đầu" để khởi chạy.</div>

        <button class="ab-btn ab-btn-start" id="ab-start-btn">🚀 Bắt đầu</button>

        <div class="ab-section" style="margin-top:14px">
          <div class="ab-section-title">📋 Log hoạt động</div>
          <div class="ab-logs" id="ab-logs">
            <div class="ab-log-entry info" style="color:#666">Chưa có log. Nhấn "Bắt đầu" để bắt đầu.</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    // Events
    document.getElementById('ab-close-btn').addEventListener('click', togglePanel);
    document.getElementById('ab-start-btn').addEventListener('click', onStartStop);
  }

  function togglePanel() {
    const panel = document.getElementById('autobuy-panel');
    panel.classList.toggle('open');
  }

  function onStartStop() {
    if (state.isRunning) {
      stopEngine();
    } else {
      // Đọc cấu hình từ UI
      state.settings.CHECKOUT_HOUR = parseInt(document.getElementById('ab-ck-h').value) || 0;
      state.settings.CHECKOUT_MINUTE = parseInt(document.getElementById('ab-ck-m').value) || 0;
      state.settings.CHECKOUT_SECOND = parseInt(document.getElementById('ab-ck-s').value) || 0;
      state.settings.ORDER_HOUR = parseInt(document.getElementById('ab-od-h').value) || 0;
      state.settings.ORDER_MINUTE = parseInt(document.getElementById('ab-od-m').value) || 0;
      state.settings.ORDER_SECOND = parseInt(document.getElementById('ab-od-s').value) || 0;
      state.settings.MAX_RETRIES = parseInt(document.getElementById('ab-retries').value) || 5;
      state.settings.RETRY_DELAY_MS = parseInt(document.getElementById('ab-delay').value) || 300;
      state.logs = [];
      startEngine();
    }
  }

  function updateButtonState() {
    const btn = document.getElementById('ab-start-btn');
    if (!btn) return;
    if (state.isRunning) {
      btn.textContent = '🛑 Dừng';
      btn.className = 'ab-btn ab-btn-stop';
    } else {
      btn.textContent = '🚀 Bắt đầu';
      btn.className = 'ab-btn ab-btn-start';
    }
  }

  function updateCountdownUI(msToCheckout, msToOrder, checkoutDone, orderDone) {
    const cdEl = document.getElementById('ab-countdown');
    const lblEl = document.querySelector('.ab-countdown-label');
    const statusEl = document.getElementById('ab-status');
    if (!cdEl) return;

    if (!checkoutDone) {
      lblEl.textContent = 'Đếm ngược tới Checkout (GET)';
      cdEl.textContent = formatCountdown(Math.max(0, msToCheckout));
      cdEl.style.color = msToCheckout <= 5000 ? '#ff4444' : '#00ff90';
      statusEl.textContent = msToCheckout <= 3000 ? '🔥 SẮP TỚI GIỜ!' : '⏳ Đang đếm ngược...';
    } else if (!orderDone) {
      lblEl.textContent = 'Đếm ngược tới Đặt Hàng (PLACE ORDER)';
      cdEl.textContent = formatCountdown(Math.max(0, msToOrder));
      cdEl.style.color = '#ffaa00';
      statusEl.textContent = '📦 Đã checkout! Chờ đặt hàng...';
    } else {
      cdEl.textContent = '00:00:00.000';
      cdEl.style.color = state.orderResult ? '#00ff90' : '#ff4444';
      lblEl.textContent = state.orderResult ? '🎉 HOÀN THÀNH!' : '❌ THẤT BẠI';
      statusEl.textContent = state.orderResult ? 'Đơn hàng đã được đặt thành công!' : 'Đặt hàng thất bại. Kiểm tra log.';
    }
  }

  function updateLogUI() {
    const logsEl = document.getElementById('ab-logs');
    if (!logsEl) return;

    // Chỉ hiển thị 100 log gần nhất
    const recent = state.logs.slice(-100);
    logsEl.innerHTML = recent.map(l =>
      `<div class="ab-log-entry ${l.type}">[${l.time}] ${l.msg}</div>`
    ).join('');

    // Auto scroll xuống dưới
    logsEl.scrollTop = logsEl.scrollHeight;
  }

  function showOrderSuccess(data) {
    const statusEl = document.getElementById('ab-status');
    if (statusEl) {
      statusEl.innerHTML = '🎉🎉🎉 <b style="color:#00e676">ĐẶT HÀNG THÀNH CÔNG!</b>';
    }
    // Hiện thông báo hệ thống
    if (Notification.permission === 'granted') {
      new Notification('🎉 Shopee Auto Buy', { body: 'Đặt hàng thành công!' });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // KHỞI TẠO
  // ═══════════════════════════════════════════════════════════════════════════

  function init() {
    // Yêu cầu quyền thông báo
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Tạo UI
    createUI();

    // Log
    log('✅ Shopee Auto Buy v1.0.0 đã sẵn sàng!', 'success');
    log('📌 Mặc định: Checkout lúc 00:00:00, Đặt hàng lúc 00:00:01');
    log('📌 Hãy chọn sẵn sản phẩm trong giỏ hàng & vào trang checkout trước.');
  }

  // Chờ DOM ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

})();
