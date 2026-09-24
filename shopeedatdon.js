// ==UserScript==
// @name         Shopee Đặt Đơn Tự Động (Ultra Clean Core v6.0)
// @namespace    https://shopee.vn/
// @version      6.0
// @description  Hệ thống Đặt đơn tự động Shopee siêu tốc, sạch 100%, không rối mã, hỗ trợ săn từ Giỏ hàng & Trang sản phẩm, đồng bộ NTP mili-giây, Web Worker đếm giờ G, Smart Fast-Retry, Passive Payment Hook, Glassmorphism Mini HUD.
// @author       DZUx
// @match        https://shopee.vn/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

/**
 * ==============================================================================
 * SHOPEE ULTRA AUTO-ORDER CORE ENGINE v6.0 (CLEAN DEOBFUSCATED EDITION)
 * ==============================================================================
 * 100% Sạch - Không mã hóa (Unobfuscated) - Không bẫy Anti-Devtools - Không link Affiliate.
 *
 * CÁC TÍNH NĂNG CỐT LÕI:
 * 1. [Zero-Latency Passive Tap]: Tự động bắt gói tin /api/v4/checkout/get nạp danh sách Thẻ & Ví vào Dropdown.
 * 2. [Hybrid Hunt Modes]: Hỗ trợ cả 2 chế độ:
 *    - Mode Giỏ Hàng: Tự động quét các sản phẩm đã tick chọn trong giỏ hàng.
 *    - Mode Trang Sản Phẩm: Tự động nhận diện phân loại/model và đặt mua trực tiếp.
 * 3. [NTP Server Time Sync]: Đồng bộ giờ máy chủ Shopee mili-giây qua HEAD /api/v4/pdp/get_pc.
 * 4. [HTTP/2 TCP/TLS Socket Pre-warming]: Giữ ấm kết nối 2.5s trước giờ G để triệt tiêu độ trễ mạng.
 * 5. [Web Worker Precision Timer]: Đếm nhịp 8ms ngầm, không bị trình duyệt bóp lag khi ẩn tab.
 * 6. [Smart Fast-Retry Loop]: Thử lại 10-50 lần với độ trễ <100ms khi kho chưa mở hoặc cập nhật giá.
 * 7. [Smart Price Ceiling Guard]: Tách tiền hàng và phí ship để chống gian thương tăng giá ảo.
 * 8. [Multi-Tier Voucher Engine]: Tự động áp mã tốt nhất ví sàn + hỗ trợ nhập mã Shop/Platform + Dùng xu.
 * 9. [Glassmorphism Floating HUD]: Bảng điều khiển viền mờ 4 tab (Săn Sale, Thanh Toán, Cài Đặt, Nhật Ký).
 * 10. [Web Audio Chimes & Telegram Notifier]: Âm thanh trực quan + gửi thông báo đơn hàng / captcha về Telegram.
 * ==============================================================================
 */

(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  // Tránh nạp trùng lặp engine
  if (window.__SHOPEE_ULTRA_AUTOBUY_V6__) {
    console.warn('[Shopee AutoBuy] Script v6.0 đã khởi chạy trên trang này!');
    if (window.ShopeeAutoOrder && window.ShopeeAutoOrder.toggleUI) {
      window.ShopeeAutoOrder.toggleUI(true);
    }
    return;
  }
  window.__SHOPEE_ULTRA_AUTOBUY_V6__ = true;

  // --- 0. BỘ LẮNG NGHE CHECKOUT THỤ ĐỘNG (ZERO-LATENCY PASSIVE HOOK) ---
  (function initPassiveCheckoutHook() {
    if (window.__PASSIVE_CHECKOUT_TAP__) return;
    window.__PASSIVE_CHECKOUT_TAP__ = true;

    const _origFetch = window.fetch;
    if (!_origFetch) return;

    window.fetch = function (...args) {
      const p = _origFetch.apply(this, args);
      p.then(function (res) {
        try {
          const url = typeof args[0] === 'string' ? args[0] : (args[0] && args[0].url ? args[0].url : '');
          if (url && url.indexOf('/api/v4/checkout/get') !== -1 && res && res.ok) {
            res.clone().json().then(function (data) {
              if (data && (!data.error || Number(data.error) === 0)) {
                try {
                  localStorage.setItem('__LAST_CHECKOUT_GET_DATA__', JSON.stringify(data));
                } catch (_) {}

                // Trích xuất danh sách thẻ ngân hàng và kênh thanh toán
                const cards = PaymentEngine.extractCardsFromCheckout(data);
                if (cards.length > 0) {
                  try {
                    localStorage.setItem('__AO_SAVED_CARDS__', JSON.stringify(cards));
                  } catch (_) {}
                }

                if (typeof window.refreshPaymentOptionsFromCheckout === 'function') {
                  window.refreshPaymentOptionsFromCheckout(data);
                }
              }
            }).catch(function () {});
          }
        } catch (_) {}
      }).catch(function () {});
      return p;
    };
  })();

  // Vô hiệu hóa bẫy devtool nếu có từ Shopee hoặc bên thứ ba
  window.DisableDevtool = function () {
    return { isRunning: false, stop: function () {}, isDevToolOpened: function () { return false; } };
  };

  // --- 1. STATE & LOCALSTORAGE MANAGEMENT ---
  const State = {
    isRunning: false,
    mode: localStorage.getItem('__AO_MODE__') || 'cart', // 'cart' hoặc 'pdp'
    timerId: null,
    worker: null,
    serverOffsetMs: 0,
    oneWayLatencyMs: 0,
    lastTimeSync: 0,
    maxBuyPrice: parseFloat(localStorage.getItem('__AO_MAX_PRICE__') || '0') || 0,
    scheduledTime: null, // timestamp giờ G (ms)
    leadTimeMs: parseInt(localStorage.getItem('__AO_LEAD_TIME__') || '35', 10), // Bù trước giờ G (ms)
    maxRetries: parseInt(localStorage.getItem('__AO_MAX_RETRIES__') || '25', 10),
    retryDelay: parseInt(localStorage.getItem('__AO_RETRY_DELAY__') || '80', 10),
    paymentMethod: localStorage.getItem('__AO_PAYMENT_METHOD__') || 'credit_card',
    cardChannelItemId: localStorage.getItem('__AO_CARD_CHANNEL_ITEM_ID__') || '',
    shopVoucherCode: localStorage.getItem('__AO_VOUCHER_CODE__') || '',
    platformVoucherCode: localStorage.getItem('__AO_PLATFORM_VOUCHER__') || '',
    useCoins: localStorage.getItem('__AO_USE_COINS__') === 'true',
    autoBestVouchers: localStorage.getItem('__AO_AUTO_BEST_VOUCHERS__') !== 'false',
    telegramToken: localStorage.getItem('__AO_TG_TOKEN__') || '',
    telegramChatId: localStorage.getItem('__AO_TG_CHAT_ID__') || '',
    telegramEnabled: localStorage.getItem('__AO_TG_ENABLED__') === 'true',
    pdpData: {
      shopid: 0,
      itemid: 0,
      modelid: 0,
      quantity: 1,
      name: '',
      models: [],
      price: 0,
    },
  };

  const Endpoints = {
    pdpPing: 'https://shopee.vn/api/v4/pdp/get_pc',
    cartGet: 'https://shopee.vn/api/v4/cart/get',
    addToCart: 'https://shopee.vn/api/v4/cart/add_to_cart',
    checkoutGet: 'https://shopee.vn/api/v4/checkout/get',
    placeOrder: 'https://shopee.vn/api/v4/checkout/place_order',
    paymentChannelList: 'https://shopee.vn/api/v2/payment_info/get_channel_list',
    telegramApi: 'https://api.telegram.org/bot',
  };

  // --- 2. AUDIO CHIMES & VISUAL LOGGER ---
  const AudioChimes = {
    play(type = 'success') {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'success') {
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.12);
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.35);
        } else if (type === 'price_limit' || type === 'error') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(320, ctx.currentTime);
          osc.frequency.setValueAtTime(160, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.35, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.45);
        } else if (type === 'captcha') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(580, ctx.currentTime);
          osc.frequency.setValueAtTime(290, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.4, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.4);
        }
      } catch (_) {}
    },
  };

  const Logger = {
    add(message, level = 'info') {
      const now = new Date().toLocaleTimeString('vi-VN', { hour12: false, fractionalSecondDigits: 3 });
      const fullMsg = `[${now}] ${message}`;

      if (level === 'error') console.error('[AutoBuy]', fullMsg);
      else if (level === 'warn') console.warn('[AutoBuy]', fullMsg);
      else if (level === 'success') console.log('%c[AutoBuy] ' + fullMsg, 'color:#22c55e;font-weight:bold;');
      else console.log('[AutoBuy]', fullMsg);

      const logBox = document.getElementById('ao-log-content');
      if (logBox) {
        const line = document.createElement('div');
        line.className = `ao-log-line ao-log-${level}`;
        line.textContent = fullMsg;
        logBox.appendChild(line);
        const autoScroll = document.getElementById('ao-autoscroll-chk');
        if (!autoScroll || autoScroll.checked) {
          logBox.scrollTop = logBox.scrollHeight;
        }
      }
    },
    clear() {
      const logBox = document.getElementById('ao-log-content');
      if (logBox) logBox.innerHTML = '';
    }
  };

  // --- 3. TIME SYNC & NETWORK PRE-WARMING ---
  const NetworkEngine = {
    async syncServerTime() {
      try {
        const t0 = performance.now();
        const res = await fetch(Endpoints.pdpPing, {
          method: 'HEAD',
          cache: 'no-store',
          headers: { 'x-shopee-language': 'vi' },
          keepalive: true,
        });
        const t1 = performance.now();
        const serverDateStr = res.headers.get('date');
        if (serverDateStr) {
          const serverMs = Date.parse(serverDateStr);
          const rtt = Math.max(0, t1 - t0);
          const oneWay = Math.round(rtt / 2);
          State.oneWayLatencyMs = oneWay;
          State.serverOffsetMs = Math.round(serverMs + oneWay - Date.now());
          State.lastTimeSync = Date.now();
          Logger.add(`Đồng bộ giờ Shopee Server: lệch ${State.serverOffsetMs}ms (RTT: ${Math.round(rtt)}ms | Latency: ${oneWay}ms)`, 'info');
        }
      } catch (err) {
        Logger.add(`Lỗi đồng bộ giờ server: ${err.message}`, 'warn');
      }
    },

    getServerTime() {
      return Date.now() + State.serverOffsetMs;
    },

    async preWarmSockets() {
      try {
        const headers = { 'x-shopee-language': 'vi' };
        await Promise.allSettled([
          fetch(Endpoints.cartGet, { method: 'HEAD', cache: 'no-store', headers, keepalive: true }),
          fetch(Endpoints.checkoutGet, { method: 'HEAD', cache: 'no-store', headers, keepalive: true }),
          fetch(Endpoints.placeOrder, { method: 'HEAD', cache: 'no-store', headers, keepalive: true }),
        ]);
        Logger.add('🔥 Đã kích hoạt TCP/TLS Pre-warming socket HTTP/2 trước giờ G', 'info');
      } catch (_) {}
    },
  };

  // Khởi động đồng bộ giờ Shopee
  NetworkEngine.syncServerTime();
  setInterval(() => NetworkEngine.syncServerTime(), 35000);

  // --- 4. WEB WORKER HIGH-PRECISION TIMER ---
  const PrecisionTimer = {
    start(targetServerTimestamp, onTick, onTrigger) {
      this.stop();
      let prewarmed = false;

      const check = () => {
        if (!State.isRunning) {
          PrecisionTimer.stop();
          return;
        }

        const nowServer = NetworkEngine.getServerTime();
        const remaining = targetServerTimestamp - nowServer;

        // Bật Pre-warming socket trước giờ G 2.5 giây
        if (remaining <= 2500 && !prewarmed) {
          prewarmed = true;
          NetworkEngine.preWarmSockets();
        }

        if (onTick) onTick(remaining, nowServer);

        // Bù độ trễ mạng 1 chiều + leadTime
        const triggerThreshold = State.oneWayLatencyMs + State.leadTimeMs;
        if (remaining <= triggerThreshold) {
          PrecisionTimer.stop();
          onTrigger();
        }
      };

      try {
        const workerBlob = new Blob([
          `let t = null;
          self.onmessage = function(e) {
            if (e.data === 'START') {
              if (t) clearInterval(t);
              t = setInterval(() => self.postMessage('TICK'), 8);
            } else if (e.data === 'STOP') {
              if (t) clearInterval(t);
              t = null;
            }
          };`,
        ], { type: 'application/javascript' });

        const workerUrl = URL.createObjectURL(workerBlob);
        State.worker = new Worker(workerUrl);
        State.worker.onmessage = () => check();
        State.worker.postMessage('START');
      } catch (_) {
        State.timerId = setInterval(check, 8);
      }
    },

    stop() {
      if (State.worker) {
        try {
          State.worker.postMessage('STOP');
          State.worker.terminate();
        } catch (_) {}
        State.worker = null;
      }
      if (State.timerId) {
        clearInterval(State.timerId);
        State.timerId = null;
      }
    },
  };

  // --- 5. PAYMENT CHANNELS & CARDS ENGINE ---
  const PaymentEngine = {
    extractCardsFromCheckout(data) {
      const cards = [];
      const visited = new Set();
      function scan(node) {
        if (!node || typeof node !== 'object') return;
        if (visited.has(node)) return;
        visited.add(node);
        if (Array.isArray(node.channel_item_list) && node.channel_item_list.length > 0) {
          for (const item of node.channel_item_list) {
            if (item && item.channel_item_id) {
              const cardId = String(item.channel_item_id);
              const bank = item.bank_name || item.name || item.card_brand || 'Thẻ đã liên kết';
              const cardNum = item.card_number || item.mask_card_number || item.last_digits || '';
              const label = `${bank} ${cardNum} (ID: ${cardId})`.trim();
              cards.push({ id: cardId, label, bank, cardNum, raw: item });
            }
          }
        }
        if (Array.isArray(node.channels)) {
          for (const ch of node.channels) scan(ch);
        }
        if (node.payment_channel_info) scan(node.payment_channel_info);
        if (node.candidate_payment_channels) scan(node.candidate_payment_channels);
      }
      scan(data);

      const unique = [];
      const seen = new Set();
      for (const c of cards) {
        if (!seen.has(c.id)) {
          seen.add(c.id);
          unique.push(c);
        }
      }
      return unique;
    },

    buildPaymentChannelData(method, cardId) {
      const savedCardId = cardId || State.cardChannelItemId || (typeof localStorage !== 'undefined' ? localStorage.getItem('__AO_CARD_CHANNEL_ITEM_ID__') : '') || '';
      const parsedCardId = savedCardId ? (Number(savedCardId) || savedCardId) : 9000000000000000;

      if (method === 'credit_card' || method === 'card') {
        return {
          channel_id: 5003320,
          channel_item_option_info: {
            channel_item_id: parsedCardId,
            credit_card_data: { card_number: '', expiry_date: '', bank_name: 'Thẻ đã liên kết' },
          },
          version: 2,
        };
      } else if (method === 'shopeepay') {
        return {
          channel_id: 5003310,
          channel_item_option_info: {},
          version: 2,
        };
      } else if (method === 'spaylater') {
        return {
          channel_id: 5003330,
          channel_item_option_info: {},
          version: 2,
        };
      } else if (method === 'gpay') {
        return { channel_id: 5009500, channel_item_option_info: {}, version: 2 };
      } else {
        // Mặc định COD: Thanh toán khi nhận hàng
        return {
          version: 1,
          payment_channelid: 59000,
          option_info: '',
          text_info: {},
          ros_opt_in: false,
          name: 'Thanh toán khi nhận hàng',
          support_advance_booking: true,
          combined_payments_info: { base_payable: 0, total_payable: 0, price_breakdown: [], splits: [] },
        };
      }
    },

    async scanSavedCards() {
      let foundCards = [];
      try {
        const cached = localStorage.getItem('__AO_SAVED_CARDS__');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) foundCards = parsed;
        }
      } catch (_) {}

      // Quét trực tiếp từ giỏ hàng nếu chưa có cache
      if (foundCards.length === 0) {
        try {
          const cartRes = await fetch(Endpoints.cartGet, { credentials: 'include' });
          if (cartRes.ok) {
            const cartData = await cartRes.json();
            const shopOrdersData = cartData?.data?.cart_types?.[0]?.shop_orders || [];
            if (shopOrdersData.length > 0) {
              const shop = shopOrdersData[0];
              const itm = (shop.items || [])[0];
              if (itm) {
                const payload = {
                  shoporders: [{ shopid: shop.shopid, items: [{ itemid: itm.itemid, modelid: itm.modelid, quantity: 1, shopid: shop.shopid }] }],
                  selected_payment_channel_data: { channel_id: 5003320, version: 2, channel_item_option_info: {} }
                };
                const cRes = await fetch(Endpoints.checkoutGet, {
                  method: 'POST',
                  headers: ShopeeApiHelper.buildHeaders(),
                  credentials: 'include',
                  body: JSON.stringify(payload)
                });
                if (cRes.ok) {
                  const cData = await cRes.json();
                  foundCards = PaymentEngine.extractCardsFromCheckout(cData);
                }
              }
            }
          }
        } catch (_) {}
      }

      if (foundCards.length === 0) {
        try {
          const pRes = await fetch(Endpoints.paymentChannelList, { credentials: 'include' });
          if (pRes.ok) {
            const pData = await pRes.json();
            foundCards = PaymentEngine.extractCardsFromCheckout(pData);
          }
        } catch (_) {}
      }

      if (foundCards.length > 0) {
        localStorage.setItem('__AO_SAVED_CARDS__', JSON.stringify(foundCards));
      }
      return foundCards;
    }
  };

  // --- 6. SHOPEE AUTH & COOKIE HELPERS ---
  const ShopeeApiHelper = {
    getCsrfToken() {
      const match = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
      return match ? match[1] : '';
    },

    getApiSource() {
      return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ? 'rweb' : 'pc';
    },

    getFingerprint() {
      return (
        window.device_sz_fingerprint ||
        window.__sz_fingerprint ||
        'sz_fp_' + Math.random().toString(36).slice(2)
      );
    },

    buildHeaders() {
      return {
        'content-type': 'application/json',
        'priority': 'u=1, i',
        'x-api-source': this.getApiSource(),
        'x-csrftoken': this.getCsrfToken(),
        'x-shopee-language': 'vi',
      };
    },

    extractOrderPrices(data) {
      if (!data) return { itemPriceVND: 0, totalPayableVND: 0, shippingFeeVND: 0 };
      let itemPrice = 0;
      let shippingFee = 0;
      let totalPayable = 0;

      if (Array.isArray(data.shoporders) && data.shoporders.length > 0) {
        for (const so of data.shoporders) {
          const subTotal = Number(so.order_total_without_shipping || so.merchandise_subtotal || 0);
          const fee = Number(so.shipping_fee || 0);
          shippingFee += fee;
          if (subTotal > 0) {
            itemPrice += subTotal;
          } else if (Array.isArray(so.items)) {
            const sum = so.items.reduce(
              (acc, it) => acc + (Number(it.item_price || it.price || 0) * (Number(it.quantity) || 1)),
              0
            );
            itemPrice += sum;
          }
        }
      }

      if (data.payment_channel_info && data.payment_channel_info.total_payable) {
        totalPayable = Number(data.payment_channel_info.total_payable);
      } else if (data.total_payable) {
        totalPayable = Number(data.total_payable);
      } else {
        totalPayable = itemPrice + shippingFee;
      }

      // Chuẩn hóa micro-currency
      if (itemPrice > 500000000) itemPrice = Math.round(itemPrice / 100000);
      if (shippingFee > 500000000) shippingFee = Math.round(shippingFee / 100000);
      if (totalPayable > 500000000) totalPayable = Math.round(totalPayable / 100000);

      if (itemPrice === 0 && totalPayable > 0) itemPrice = totalPayable;
      return { itemPriceVND: itemPrice, totalPayableVND: totalPayable, shippingFeeVND: shippingFee };
    },

    async notifyTelegram(orderData) {
      if (!State.telegramEnabled || !State.telegramToken || !State.telegramChatId) return;
      try {
        const orderIds = Array.isArray(orderData?.orderids)
          ? orderData.orderids.map(id => `<a href="https://shopee.vn/user/purchase/order/${id}">${id}</a>`).join(', ')
          : 'N/A';
        const total = orderData?.total_payable
          ? (orderData.total_payable > 500000000 ? Math.round(orderData.total_payable / 100000) : orderData.total_payable).toLocaleString('vi-VN') + 'đ'
          : 'Xem trên Shopee';

        const text = `🎉 <b>ĐẶT HÀNG SHOPEE THÀNH CÔNG!</b>\n\n` +
                     `📦 <b>Mã Đơn Hàng:</b> ${orderIds}\n` +
                     `💰 <b>Tổng Thanh Toán:</b> ${total}\n` +
                     `⏰ <b>Thời Gian:</b> ${new Date().toLocaleTimeString('vi-VN')}\n\n` +
                     `🚀 <i>Shopee Ultra Auto-Order v6.0</i>`;

        await fetch(`${Endpoints.telegramApi}${State.telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            chat_id: State.telegramChatId,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
        });
        Logger.add('Đã gửi thông báo đơn hàng về Telegram!', 'success');
      } catch (err) {
        Logger.add(`Lỗi gửi Telegram: ${err.message}`, 'warn');
      }
    },

    async notifyTelegramCaptcha() {
      if (!State.telegramEnabled || !State.telegramToken || !State.telegramChatId) return;
      try {
        const text = `🚨 <b>CẢNH BÁO CAPTCHA SHOPEE!</b>\n\n` +
                     `⚠️ Shopee vừa yêu cầu giải Captcha khi gửi đơn.\n` +
                     `👉 Hãy vào lại tab trình duyệt Shopee để xác thực Captcha ngay!\n` +
                     `⏰ <b>Thời gian:</b> ${new Date().toLocaleTimeString('vi-VN')}`;
        await fetch(`${Endpoints.telegramApi}${State.telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ chat_id: State.telegramChatId, text, parse_mode: 'HTML' }),
        });
      } catch (_) {}
    }
  };

  // --- 7. PDP (PRODUCT DETAIL PAGE) SCANNER ---
  const PdpScanner = {
    detectPDP() {
      const path = location.pathname;
      const match = path.match(/-i\.(\d+)\.(\d+)/) || path.match(/\/product\/(\d+)\/(\d+)/);
      if (match) {
        return { shopid: Number(match[1]), itemid: Number(match[2]) };
      }
      return null;
    },

    async loadProductDetails() {
      const pdp = this.detectPDP();
      if (!pdp) return null;

      try {
        const url = `${Endpoints.pdpPing}?item_id=${pdp.itemid}&shop_id=${pdp.shopid}`;
        const res = await fetch(url, { headers: ShopeeApiHelper.buildHeaders() });
        if (!res.ok) return null;
        const json = await res.json();
        const item = json?.data?.item;
        if (!item) return null;

        State.pdpData.shopid = pdp.shopid;
        State.pdpData.itemid = pdp.itemid;
        State.pdpData.name = item.title || item.name || 'Sản phẩm Shopee';
        State.pdpData.models = (item.models || []).map(m => ({
          modelid: Number(m.modelid),
          name: m.name,
          price: m.price ? Math.round(Number(m.price) / 100000) : 0,
          stock: m.stock,
        }));

        if (State.pdpData.models.length > 0 && !State.pdpData.modelid) {
          State.pdpData.modelid = State.pdpData.models[0].modelid;
        }

        return State.pdpData;
      } catch (e) {
        Logger.add(`Lỗi đọc thông tin sản phẩm PDP: ${e.message}`, 'warn');
        return null;
      }
    }
  };

  // --- 8. ORDER PIPELINE & SMART RETRY LOOP ---
  const OrderPipeline = {
    async getCartSelectedItems() {
      try {
        const res = await fetch(Endpoints.cartGet, {
          method: 'POST',
          headers: ShopeeApiHelper.buildHeaders(),
          credentials: 'include',
          body: JSON.stringify({
            pre_selected_item_list: [],
            updated_time_filter: { start_time: 0 },
            cart_state: {},
            version_list: [10040779],
          }),
        });
        const data = await res.json();
        const items = [];

        if (data?.data?.shop_orders) {
          for (const shop of data.data.shop_orders) {
            const shopid = Number(shop.shopid);
            for (const it of (shop.items || [])) {
              items.push({
                shopid,
                itemid: Number(it.itemid),
                modelid: Number(it.modelid),
                quantity: Number(it.quantity) || 1,
                add_on_deal_id: Number(it.add_on_deal_id) || 0,
                is_add_on_sub_item: it.is_add_on_sub_item === true,
                item_group_id: it.item_group_id || null,
              });
            }
          }
        }
        return items;
      } catch (err) {
        Logger.add(`Không thể đọc giỏ hàng: ${err.message}`, 'error');
        return [];
      }
    },

    async fetchCheckoutPreview(targetItems) {
      const groupedOrders = {};
      for (const item of targetItems) {
        if (!groupedOrders[item.shopid]) {
          groupedOrders[item.shopid] = {
            shop: { shopid: item.shopid },
            items: [],
          };
        }
        groupedOrders[item.shopid].items.push({
          itemid: item.itemid,
          modelid: item.modelid,
          quantity: item.quantity,
          add_on_deal_id: item.add_on_deal_id || 0,
          is_add_on_sub_item: item.is_add_on_sub_item,
          item_group_id: item.item_group_id,
          insurances: [],
        });
      }

      const shopOrdersArray = Object.values(groupedOrders);
      const shopVouchers = [];
      if (State.shopVoucherCode && shopOrdersArray.length > 0) {
        shopVouchers.push({
          shopid: shopOrdersArray[0].shop.shopid,
          voucher_code: State.shopVoucherCode.trim().toUpperCase(),
        });
      }

      const platformVouchers = [];
      if (State.platformVoucherCode) {
        platformVouchers.push({
          voucher_code: State.platformVoucherCode.trim().toUpperCase(),
        });
      }

      const paymentData = PaymentEngine.buildPaymentChannelData(State.paymentMethod, State.cardChannelItemId);

      const checkoutPayload = {
        shoporders: shopOrdersArray,
        cart_type: 1,
        client_id: 5,
        _cft: [18446744073709551615, 18446744073709551615, 18446744073709551615],
        selected_payment_channel_data: paymentData,
        promotion_data: {
          use_coins: State.useCoins,
          free_shipping_voucher_info: { free_shipping_voucher_id: 0 },
          platform_vouchers: platformVouchers,
          shop_vouchers: shopVouchers,
          check_shop_voucher_entrances: true,
          auto_apply_platform_voucher: State.autoBestVouchers,
          auto_apply_shop_voucher: State.autoBestVouchers && shopVouchers.length === 0,
        },
        device_info: {
          device_id: '',
          device_fingerprint: '',
          tongdun_blackbox: '',
          buyer_payment_info: {},
          timezone_offset_in_minutes: 420,
          device_sz_fingerprint: ShopeeApiHelper.getFingerprint(),
        },
        tax_info: { tax_id: '' },
        checkout_session_id: `session-${Date.now()}`,
        timestamp: Math.floor(NetworkEngine.getServerTime() / 1000),
      };

      const res = await fetch(Endpoints.checkoutGet, {
        method: 'POST',
        headers: ShopeeApiHelper.buildHeaders(),
        credentials: 'include',
        body: JSON.stringify(checkoutPayload),
        keepalive: true,
      });

      const data = await res.json();
      return { ok: res.ok, data, requestPayload: checkoutPayload };
    },

    async executePlaceOrder(checkoutData, originalPayload) {
      const nowSec = Math.floor(NetworkEngine.getServerTime() / 1000);
      const sessionId = checkoutData.checkout_session_id || originalPayload.checkout_session_id;

      // Buộc áp dụng phương thức thanh toán đã chọn
      const forcedPaymentData = PaymentEngine.buildPaymentChannelData(State.paymentMethod, State.cardChannelItemId);

      const placeOrderPayload = {
        ...checkoutData,
        timestamp: nowSec,
        checkout_session_id: `${String(sessionId).split('-')[0] || 'session'}-${Date.now()}`,
        shoporders: checkoutData.shoporders || originalPayload.shoporders,
        selected_payment_channel_data: forcedPaymentData,
        promotion_data: checkoutData.promotion_data || {},
        shipping_orders: checkoutData.shipping_orders || [],
        shipping_order_groups: checkoutData.shipping_order_groups || [],
        display_meta_data: checkoutData.display_meta_data || {},
        fsv_selection_infos: checkoutData.fsv_selection_infos || [],
        buyer_info: checkoutData.buyer_info || {},
        client_event_info: checkoutData.client_event_info || {},
        captcha_id: checkoutData.captcha_id || '',
        captcha_version: 1,
        can_checkout: true,
        __raw: checkoutData.__raw || { _MDAP_DATA_ID_: Date.now().toString() },
        _cft: checkoutData._cft || [18446744073709551615, 18446744073709551615, 18446744073709551615],
        device_info: {
          device_sz_fingerprint: ShopeeApiHelper.getFingerprint(),
        },
      };

      const res = await fetch(Endpoints.placeOrder, {
        method: 'POST',
        headers: ShopeeApiHelper.buildHeaders(),
        credentials: 'include',
        body: JSON.stringify(placeOrderPayload),
        keepalive: true,
      });

      const data = await res.json();
      return { ok: res.ok, data };
    },

    async runFastRetryPipeline() {
      if (!State.isRunning) return;

      Logger.add(`🚀 BẮT ĐẦU CHỐT ĐƠN (${State.mode === 'pdp' ? 'Trang Sản Phẩm' : 'Giỏ Hàng'})...`, 'info');

      let items = [];
      if (State.mode === 'pdp') {
        if (!State.pdpData.shopid || !State.pdpData.itemid) {
          await PdpScanner.loadProductDetails();
        }
        if (State.pdpData.shopid && State.pdpData.itemid) {
          items.push({
            shopid: State.pdpData.shopid,
            itemid: State.pdpData.itemid,
            modelid: State.pdpData.modelid || 0,
            quantity: State.pdpData.quantity || 1,
          });
        }
      } else {
        items = await this.getCartSelectedItems();
      }

      if (!items || items.length === 0) {
        Logger.add('❌ Không tìm thấy sản phẩm nào để đặt hàng! Hãy kiểm tra giỏ hàng hoặc chọn phân loại.', 'error');
        AudioChimes.play('error');
        ShopeeAutoOrder.stop();
        return;
      }

      Logger.add(`Đang tiến hành checkout cho ${items.length} món hàng...`, 'info');

      let attempt = 0;
      const sleep = ms => new Promise(r => setTimeout(r, ms));

      while (State.isRunning && attempt < State.maxRetries) {
        attempt++;
        Logger.add(`⚡ [Lần ${attempt}/${State.maxRetries}] Đang gửi yêu cầu Preview đơn hàng...`, 'info');

        const previewRes = await this.fetchCheckoutPreview(items);
        if (!previewRes.ok || !previewRes.data || (previewRes.data.error && Number(previewRes.data.error) !== 0)) {
          const errMsg = previewRes.data?.error_msg || previewRes.data?.message || 'Lỗi preview đơn hàng';
          Logger.add(`⚠️ Lần ${attempt} Preview thất bại: ${errMsg}`, 'warn');

          if (previewRes.data?.error === 562056 || String(errMsg).toLowerCase().includes('captcha')) {
            Logger.add('🚨 PHÁT HIỆN CAPTCHA SHOPEE! Hãy giải captcha trên trang rồi chạy lại.', 'error');
            AudioChimes.play('captcha');
            ShopeeApiHelper.notifyTelegramCaptcha();
            ShopeeAutoOrder.stop();
            return;
          }

          await sleep(State.retryDelay);
          continue;
        }

        const checkoutData = previewRes.data;

        // Chặn giá trần thông minh
        const { itemPriceVND, totalPayableVND, shippingFeeVND } = ShopeeApiHelper.extractOrderPrices(checkoutData);
        Logger.add(
          `💰 Giá: Tiền hàng ${itemPriceVND.toLocaleString('vi-VN')}đ | Phí ship ${shippingFeeVND.toLocaleString('vi-VN')}đ | Tổng ${totalPayableVND.toLocaleString('vi-VN')}đ`,
          'info'
        );

        if (State.maxBuyPrice > 0 && itemPriceVND > State.maxBuyPrice) {
          Logger.add(
            `🚨 [CHẶN GIÁ TRẦN] Tiền hàng (${itemPriceVND.toLocaleString('vi-VN')}đ) VƯỢT QUÁ giá tối đa cho phép (${State.maxBuyPrice.toLocaleString('vi-VN')}đ). ĐÃ HỦY ĐƠN ĐỂ BẢO VỆ TÀI KHOẢN!`,
            'error'
          );
          AudioChimes.play('price_limit');
          ShopeeAutoOrder.stop();
          return;
        }

        // Bắn lệnh chốt đơn
        Logger.add(`⚡ [Lần ${attempt}/${State.maxRetries}] BẮN LỆNH TẠO ĐƠN (/api/v4/checkout/place_order)...`, 'info');
        const placeRes = await this.executePlaceOrder(checkoutData, previewRes.requestPayload);
        const placeData = placeRes.data;

        if (placeRes.ok && placeData && (!placeData.error || Number(placeData.error) === 0 || (placeData.checkoutid && placeData.orderids))) {
          const orderIdStr = placeData.orderids ? placeData.orderids.join(', ') : placeData.checkoutid;
          Logger.add(`🎉🎉🎉 ĐẶT HÀNG THÀNH CÔNG! ORDER ID: ${orderIdStr}`, 'success');
          AudioChimes.play('success');
          ShopeeApiHelper.notifyTelegram(placeData);
          ShopeeAutoOrder.stop();
          return;
        }

        const placeErr = placeData?.error_msg || placeData?.message || 'Lỗi đặt đơn chưa rõ';
        Logger.add(`❌ Lần ${attempt} Đặt đơn thất bại: ${placeErr} (Code: ${placeData?.error})`, 'warn');

        if (placeData?.error === 562056 || String(placeErr).toLowerCase().includes('captcha')) {
          Logger.add('🚨 BỊ CHẶN CAPTCHA SHOPEE! Dừng tiến trình để bạn giải tay.', 'error');
          AudioChimes.play('captcha');
          ShopeeApiHelper.notifyTelegramCaptcha();
          ShopeeAutoOrder.stop();
          return;
        }

        await sleep(State.retryDelay);
      }

      if (State.isRunning) {
        Logger.add(`Đã thử hết ${State.maxRetries} lần nhưng chưa chốt được đơn.`, 'warn');
        ShopeeAutoOrder.stop();
      }
    }
  };

  // --- 9. PUBLIC CONTROLLER API ---
  const ShopeeAutoOrder = {
    start() {
      if (State.isRunning) {
        Logger.add('Auto-Order đang chạy rồi!', 'warn');
        return;
      }

      State.isRunning = true;
      const startBtn = document.getElementById('ao-btn-start');
      if (startBtn) {
        startBtn.textContent = '⏹️ ĐANG CHẠY... (BẤM ĐỂ DỪNG)';
        startBtn.classList.add('ao-btn-running');
      }

      if (State.scheduledTime && State.scheduledTime > NetworkEngine.getServerTime()) {
        const targetDate = new Date(State.scheduledTime);
        Logger.add(`⏰ Đã kích hoạt hẹn giờ săn sale lúc: ${targetDate.toLocaleTimeString('vi-VN', { hour12: false, fractionalSecondDigits: 3 })}`, 'info');

        PrecisionTimer.start(
          State.scheduledTime,
          (remainingMs) => {
            const timeSpan = document.getElementById('ao-countdown-display');
            if (timeSpan) {
              if (remainingMs > 0) {
                const s = Math.floor(remainingMs / 1000);
                const ms = remainingMs % 1000;
                timeSpan.textContent = `Còn: ${s}s ${ms.toString().padStart(3, '0')}ms`;
              } else {
                timeSpan.textContent = `⚡ Đang bắn lệnh...`;
              }
            }
          },
          () => {
            Logger.add('🎯 ĐẾN GIỜ G! BẮN LỆNH ĐẶT ĐƠN NGAY LẬP TỨC!', 'success');
            OrderPipeline.runFastRetryPipeline();
          }
        );
      } else {
        Logger.add('Kích hoạt đặt đơn NGAY LẬP TỨC!', 'info');
        OrderPipeline.runFastRetryPipeline();
      }
    },

    stop() {
      State.isRunning = false;
      PrecisionTimer.stop();
      const startBtn = document.getElementById('ao-btn-start');
      if (startBtn) {
        startBtn.textContent = '🚀 BẮT ĐẦU SĂN SALE';
        startBtn.classList.remove('ao-btn-running');
      }
      const timeSpan = document.getElementById('ao-countdown-display');
      if (timeSpan) timeSpan.textContent = 'Sẵn sàng';
      Logger.add('Đã dừng tiến trình Auto-Order.', 'warn');
    },

    toggleUI(show) {
      const container = document.getElementById('shopee-auto-order-hud');
      const badge = document.getElementById('shopee-auto-order-float-btn');
      const isVisible = container ? container.style.display !== 'none' : false;
      const target = (typeof show === 'boolean') ? show : !isVisible;

      if (container) container.style.display = target ? 'flex' : 'none';
      if (badge) badge.style.display = target ? 'none' : 'flex';
    },
  };

  window.ShopeeAutoOrder = ShopeeAutoOrder;

  // --- 10. GLASSMORPHISM FLOATING MINI HUD UI (4 TABS) ---
  const renderHUD = () => {
    if (document.getElementById('shopee-auto-order-hud')) return;

    const style = document.createElement('style');
    style.textContent = `
      #shopee-auto-order-hud {
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 410px;
        max-width: 95vw;
        background: rgba(15, 18, 28, 0.92);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 16px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55), 0 0 1px rgba(255, 255, 255, 0.2);
        color: #f1f5f9;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        z-index: 999999999;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        user-select: none;
      }
      #shopee-auto-order-float-btn {
        position: fixed;
        bottom: 25px;
        right: 25px;
        z-index: 999999998;
        background: linear-gradient(135deg, #ee4d2d, #ff6b35);
        color: #fff;
        padding: 10px 18px;
        border-radius: 30px;
        font-weight: 700;
        font-size: 13px;
        box-shadow: 0 6px 20px rgba(238, 77, 45, 0.45);
        cursor: pointer;
        display: none;
        align-items: center;
        gap: 6px;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      #shopee-auto-order-float-btn:hover {
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 8px 25px rgba(238, 77, 45, 0.6);
      }
      .ao-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 11px 16px;
        background: linear-gradient(135deg, rgba(238, 77, 45, 0.22), rgba(255, 107, 53, 0.08));
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        cursor: grab;
      }
      .ao-header:active { cursor: grabbing; }
      .ao-header-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 700;
        font-size: 13.5px;
        color: #ff7043;
      }
      .ao-header-actions { display: flex; gap: 8px; align-items: center; }
      .ao-icon-btn {
        background: none;
        border: none;
        color: #94a3b8;
        font-size: 16px;
        cursor: pointer;
        padding: 2px 4px;
        transition: color 0.2s;
      }
      .ao-icon-btn:hover { color: #fff; }
      .ao-tabs-nav {
        display: flex;
        background: rgba(0, 0, 0, 0.35);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      .ao-tab-item {
        flex: 1;
        padding: 8px 4px;
        text-align: center;
        font-size: 11.5px;
        font-weight: 600;
        color: #94a3b8;
        cursor: pointer;
        transition: all 0.2s;
        border-bottom: 2px solid transparent;
      }
      .ao-tab-item:hover { color: #f1f5f9; background: rgba(255, 255, 255, 0.03); }
      .ao-tab-item.active {
        color: #ff7043;
        border-bottom-color: #ee4d2d;
        background: rgba(238, 77, 45, 0.08);
      }
      .ao-tab-pane {
        display: none;
        padding: 13px 16px;
        flex-direction: column;
        gap: 11px;
        font-size: 12px;
        max-height: 380px;
        overflow-y: auto;
      }
      .ao-tab-pane.active { display: flex; }
      .ao-status-banner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(0, 0, 0, 0.4);
        padding: 7px 11px;
        border-radius: 8px;
        font-size: 11.5px;
        color: #38bdf8;
        border: 1px solid rgba(56, 189, 248, 0.15);
      }
      .ao-input-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .ao-input-group label {
        color: #cbd5e1;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11.5px;
      }
      .ao-input {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 8px;
        padding: 6px 10px;
        color: #fff;
        font-size: 12.5px;
        outline: none;
        transition: border-color 0.2s, background 0.2s;
        box-sizing: border-box;
      }
      .ao-input:focus {
        border-color: #ff7043;
        background: rgba(255, 255, 255, 0.09);
      }
      select.ao-input {
        background-color: #1a1e2b;
        color: #f1f5f9;
      }
      .ao-row { display: flex; gap: 9px; }
      .ao-btn-primary {
        background: linear-gradient(135deg, #ee4d2d, #ff5722);
        color: #fff;
        border: none;
        border-radius: 9px;
        padding: 10px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 4px 14px rgba(238, 77, 45, 0.35);
      }
      .ao-btn-primary:hover {
        opacity: 0.95;
        transform: translateY(-1px);
      }
      .ao-btn-running {
        background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
        animation: ao-pulse 1.4s infinite;
      }
      @keyframes ao-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.72; }
      }
      .ao-btn-secondary {
        background: rgba(255, 255, 255, 0.08);
        color: #cbd5e1;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 8px;
        padding: 6px 12px;
        font-size: 11.5px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
      }
      .ao-btn-secondary:hover {
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
      }
      .ao-log-box {
        background: rgba(0, 0, 0, 0.55);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        height: 180px;
        overflow-y: auto;
        padding: 8px;
        font-family: Consolas, monospace;
        font-size: 10.5px;
        display: flex;
        flex-direction: column;
        gap: 3px;
        user-select: text;
      }
      .ao-log-line { word-break: break-word; line-height: 1.35; }
      .ao-log-info { color: #93c5fd; }
      .ao-log-warn { color: #fbbf24; }
      .ao-log-error { color: #f87171; font-weight: bold; }
      .ao-log-success { color: #4ade80; font-weight: bold; }
      .ao-mode-switch {
        display: flex;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        padding: 3px;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      .ao-mode-btn {
        flex: 1;
        text-align: center;
        padding: 5px;
        font-size: 11.5px;
        font-weight: 600;
        border-radius: 6px;
        cursor: pointer;
        color: #94a3b8;
        transition: all 0.2s;
      }
      .ao-mode-btn.active {
        background: #ee4d2d;
        color: #fff;
      }
      .ao-checkbox-label {
        display: flex;
        align-items: center;
        gap: 7px;
        cursor: pointer;
        font-size: 11.5px;
        color: #e2e8f0;
      }
    `;
    document.head.appendChild(style);

    const hud = document.createElement('div');
    hud.id = 'shopee-auto-order-hud';
    hud.innerHTML = `
      <div class="ao-header" id="ao-drag-handle">
        <div class="ao-header-title">
          <span>⚡</span>
          <span>Shopee AutoBuy Ultra v6.0</span>
        </div>
        <div class="ao-header-actions">
          <button class="ao-icon-btn" id="ao-btn-minimize" title="Thu nhỏ">_</button>
          <button class="ao-icon-btn" id="ao-btn-close" title="Ẩn UI">&times;</button>
        </div>
      </div>

      <div class="ao-tabs-nav">
        <div class="ao-tab-item active" data-tab="tab-sale">🎯 Săn Sale</div>
        <div class="ao-tab-item" data-tab="tab-payment">💳 Thanh Toán & Mã</div>
        <div class="ao-tab-item" data-tab="tab-settings">⚙️ Cài Đặt</div>
        <div class="ao-tab-item" data-tab="tab-log">📜 Nhật Ký</div>
      </div>

      <!-- TAB 1: SĂN SALE -->
      <div class="ao-tab-pane active" id="tab-sale">
        <div class="ao-status-banner">
          <span id="ao-server-clock">Shopee: Đang đồng bộ...</span>
          <span id="ao-countdown-display" style="font-weight:700;">Sẵn sàng</span>
        </div>

        <div class="ao-mode-switch">
          <div class="ao-mode-btn ${State.mode === 'cart' ? 'active' : ''}" id="ao-mode-cart">🛒 Săn Từ Giỏ Hàng</div>
          <div class="ao-mode-btn ${State.mode === 'pdp' ? 'active' : ''}" id="ao-mode-pdp">📦 Săn Trang Sản Phẩm</div>
        </div>

        <!-- PDP Controls Container (chỉ hiện khi chọn mode PDP) -->
        <div id="ao-pdp-section" style="display:${State.mode === 'pdp' ? 'flex' : 'none'}; flex-direction:column; gap:8px; background:rgba(0,0,0,0.25); padding:9px; border-radius:8px; border:1px dashed rgba(255,255,255,0.1);">
          <div style="font-size:11px; color:#38bdf8; font-weight:600;" id="ao-pdp-prod-name">🔍 Đang quét sản phẩm trên trang...</div>
          <div class="ao-input-group">
            <label>Phân loại (Model):</label>
            <select class="ao-input" id="ao-pdp-model-select">
              <option value="0">Mặc định / Không có phân loại</option>
            </select>
          </div>
          <div class="ao-row">
            <div class="ao-input-group" style="flex:1;">
              <label>Số lượng:</label>
              <input type="number" class="ao-input" id="ao-pdp-quantity" min="1" value="1">
            </div>
            <div style="display:flex; align-items:flex-end;">
              <button class="ao-btn-secondary" id="ao-btn-reload-pdp">🔄 Tải lại trang</button>
            </div>
          </div>
        </div>

        <div class="ao-row">
          <div class="ao-input-group" style="flex:1.4;">
            <label>⏰ Giờ G (HH:mm:ss):</label>
            <input type="text" class="ao-input" id="ao-input-time" placeholder="00:00:00 (để trống = mua ngay)">
          </div>
          <div class="ao-input-group" style="flex:1;">
            <label title="Trừ hao độ trễ để bắn chạm đúng giờ G">Bù trễ (ms):</label>
            <input type="number" class="ao-input" id="ao-input-lead-time" value="${State.leadTimeMs}">
          </div>
        </div>

        <button class="ao-btn-primary" id="ao-btn-start">🚀 BẮT ĐẦU SĂN SALE</button>
      </div>

      <!-- TAB 2: THANH TOÁN & VOUCHER -->
      <div class="ao-tab-pane" id="tab-payment">
        <div class="ao-input-group">
          <label>
            <span>💳 Phương thức thanh toán:</span>
            <button type="button" class="ao-btn-secondary" id="ao-btn-scan-cards" style="padding:2px 8px; font-size:10.5px;">🔄 Quét Thẻ</button>
          </label>
          <select class="ao-input" id="ao-select-payment-method">
            <option value="credit_card">💳 Thẻ Tín Dụng / Ghi Nợ (Đã liên kết)</option>
            <option value="shopeepay">🧡 Ví ShopeePay</option>
            <option value="spaylater">⚡ SPayLater</option>
            <option value="cod">💵 Thanh toán khi nhận hàng (COD)</option>
            <option value="gpay">🌐 Google Pay</option>
          </select>
        </div>

        <!-- Thẻ tín dụng dropdown container -->
        <div class="ao-input-group" id="ao-card-select-container">
          <label>Chọn Thẻ Đã Liên Kết:</label>
          <select class="ao-input" id="ao-select-saved-card">
            <option value="">-- Chọn thẻ trong danh sách --</option>
          </select>
          <input type="text" class="ao-input" id="ao-input-card-id" placeholder="ID thẻ thủ công (nếu có)" value="${State.cardChannelItemId}" style="margin-top:4px;">
        </div>

        <div class="ao-row">
          <div class="ao-input-group" style="flex:1;">
            <label>🎟️ Mã Voucher Shop:</label>
            <input type="text" class="ao-input" id="ao-input-voucher-shop" placeholder="Nhập mã shop..." value="${State.shopVoucherCode}">
          </div>
          <div class="ao-input-group" style="flex:1;">
            <label>🎟️ Mã Sàn Shopee:</label>
            <input type="text" class="ao-input" id="ao-input-voucher-platform" placeholder="Nhập mã sàn..." value="${State.platformVoucherCode}">
          </div>
        </div>

        <div class="ao-row" style="align-items:center; justify-content:space-between;">
          <label class="ao-checkbox-label">
            <input type="checkbox" id="ao-chk-auto-vouchers" ${State.autoBestVouchers ? 'checked' : ''}>
            <span>Tự động tối ưu Voucher ví</span>
          </label>
          <label class="ao-checkbox-label">
            <input type="checkbox" id="ao-chk-use-coins" ${State.useCoins ? 'checked' : ''}>
            <span>🪙 Dùng Xu Shopee</span>
          </label>
        </div>

        <div class="ao-input-group">
          <label>
            <span>💰 Giá tối đa cho phép (VNĐ):</span>
            <span style="color:#94a3b8; font-size:10px;">(0 = mua mọi giá)</span>
          </label>
          <input type="number" class="ao-input" id="ao-input-max-price" placeholder="Ví dụ: 200000" value="${State.maxBuyPrice || ''}">
        </div>
      </div>

      <!-- TAB 3: CÀI ĐẶT NÂNG CAO -->
      <div class="ao-tab-pane" id="tab-settings">
        <div class="ao-row">
          <div class="ao-input-group" style="flex:1;">
            <label>Số lần thử lại:</label>
            <input type="number" class="ao-input" id="ao-input-max-retries" min="1" max="100" value="${State.maxRetries}">
          </div>
          <div class="ao-input-group" style="flex:1;">
            <label>Delay thử lại (ms):</label>
            <input type="number" class="ao-input" id="ao-input-retry-delay" min="20" max="1000" value="${State.retryDelay}">
          </div>
        </div>

        <div style="height:1px; background:rgba(255,255,255,0.08); margin:4px 0;"></div>

        <div class="ao-input-group">
          <label class="ao-checkbox-label">
            <input type="checkbox" id="ao-chk-telegram" ${State.telegramEnabled ? 'checked' : ''}>
            <span>📲 Bật thông báo đơn hàng & Captcha qua Telegram</span>
          </label>
        </div>

        <div class="ao-input-group">
          <label>Telegram Bot Token:</label>
          <input type="text" class="ao-input" id="ao-input-tg-token" placeholder="123456789:ABCDef..." value="${State.telegramToken}">
        </div>

        <div class="ao-input-group">
          <label>Telegram Chat ID:</label>
          <input type="text" class="ao-input" id="ao-input-tg-chat" placeholder="Ví dụ: 987654321" value="${State.telegramChatId}">
        </div>

        <button type="button" class="ao-btn-secondary" id="ao-btn-test-tg">📨 Gửi tin nhắn thử nghiệm Telegram</button>
      </div>

      <!-- TAB 4: NHẬT KÝ LIVE -->
      <div class="ao-tab-pane" id="tab-log">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <label class="ao-checkbox-label">
            <input type="checkbox" id="ao-autoscroll-chk" checked>
            <span>Tự cuộn</span>
          </label>
          <button class="ao-btn-secondary" id="ao-btn-clear-log" style="padding:2px 8px; font-size:10px;">🗑️ Xóa log</button>
        </div>
        <div class="ao-log-box" id="ao-log-content">
          <div class="ao-log-line ao-log-info">[Sẵn sàng] Shopee AutoBuy Ultra v6.0 đã nạp thành công!</div>
        </div>
      </div>
    `;
    document.body.appendChild(hud);

    // Nút nổi mở lại UI khi thu nhỏ
    const floatBtn = document.createElement('div');
    floatBtn.id = 'shopee-auto-order-float-btn';
    floatBtn.innerHTML = '<span>⚡</span><span>Shopee AutoBuy v6.0</span>';
    document.body.appendChild(floatBtn);
    floatBtn.onclick = () => ShopeeAutoOrder.toggleUI(true);

    // Đồng hồ server Shopee thời gian thực
    setInterval(() => {
      const clockEl = document.getElementById('ao-server-clock');
      if (clockEl) {
        const d = new Date(NetworkEngine.getServerTime());
        clockEl.textContent = `Shopee: ${d.toLocaleTimeString('vi-VN', { hour12: false, fractionalSecondDigits: 3 })}`;
      }
    }, 40);

    // Tab Navigation
    hud.querySelectorAll('.ao-tab-item').forEach(tab => {
      tab.onclick = () => {
        hud.querySelectorAll('.ao-tab-item').forEach(t => t.classList.remove('active'));
        hud.querySelectorAll('.ao-tab-pane').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const targetPane = document.getElementById(tab.getAttribute('data-tab'));
        if (targetPane) targetPane.classList.add('active');
      };
    });

    // Chuyển đổi Mode Cart vs PDP
    const modeCartBtn = document.getElementById('ao-mode-cart');
    const modePdpBtn = document.getElementById('ao-mode-pdp');
    const pdpSection = document.getElementById('ao-pdp-section');

    modeCartBtn.onclick = () => {
      State.mode = 'cart';
      localStorage.setItem('__AO_MODE__', 'cart');
      modeCartBtn.classList.add('active');
      modePdpBtn.classList.remove('active');
      pdpSection.style.display = 'none';
      Logger.add('Đã chuyển sang chế độ: SĂN TỪ GIỎ HÀNG', 'info');
    };

    modePdpBtn.onclick = () => {
      State.mode = 'pdp';
      localStorage.setItem('__AO_MODE__', 'pdp');
      modePdpBtn.classList.add('active');
      modeCartBtn.classList.remove('active');
      pdpSection.style.display = 'flex';
      Logger.add('Đã chuyển sang chế độ: SĂN TRANG CHI TIẾT SẢN PHẨM', 'info');
      refreshPDPInfo();
    };

    // Tự động nhận diện nếu đang ở trang PDP
    if (PdpScanner.detectPDP()) {
      modePdpBtn.click();
    }

    async function refreshPDPInfo() {
      const nameEl = document.getElementById('ao-pdp-prod-name');
      const selectEl = document.getElementById('ao-pdp-model-select');
      if (nameEl) nameEl.textContent = '⏳ Đang quét sản phẩm...';

      const data = await PdpScanner.loadProductDetails();
      if (!data) {
        if (nameEl) nameEl.textContent = '⚠️ Không phải trang sản phẩm hoặc Shopee yêu cầu đăng nhập.';
        return;
      }

      if (nameEl) nameEl.textContent = `📦 ${data.name.slice(0, 48)}...`;
      if (selectEl) {
        selectEl.innerHTML = '';
        if (data.models.length === 0) {
          selectEl.innerHTML = '<option value="0">Mặc định (Sản phẩm không có phân loại)</option>';
        } else {
          data.models.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.modelid;
            opt.textContent = `${m.name} - ${m.price.toLocaleString('vi-VN')}đ (Kho: ${m.stock})`;
            selectEl.appendChild(opt);
          });
          State.pdpData.modelid = Number(selectEl.value);
        }
      }
    }

    document.getElementById('ao-btn-reload-pdp').onclick = refreshPDPInfo;

    document.getElementById('ao-pdp-model-select').onchange = (e) => {
      State.pdpData.modelid = Number(e.target.value) || 0;
    };

    document.getElementById('ao-pdp-quantity').onchange = (e) => {
      State.pdpData.quantity = Math.max(1, parseInt(e.target.value, 10) || 1);
    };

    // Payment Listeners & Card Dropdown
    const paySelect = document.getElementById('ao-select-payment-method');
    const cardContainer = document.getElementById('ao-card-select-container');
    const savedCardSelect = document.getElementById('ao-select-saved-card');
    const cardIdInput = document.getElementById('ao-input-card-id');

    paySelect.value = State.paymentMethod;
    cardContainer.style.display = (State.paymentMethod === 'credit_card') ? 'flex' : 'none';

    paySelect.onchange = (e) => {
      State.paymentMethod = e.target.value;
      localStorage.setItem('__AO_PAYMENT_METHOD__', State.paymentMethod);
      cardContainer.style.display = (State.paymentMethod === 'credit_card') ? 'flex' : 'none';
      Logger.add(`Phương thức thanh toán: ${paySelect.options[paySelect.selectedIndex].text}`, 'info');
    };

    function populateCardDropdown(cards) {
      if (!savedCardSelect) return;
      savedCardSelect.innerHTML = '<option value="">-- Chọn thẻ trong danh sách --</option>';
      cards.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.label;
        if (c.id === State.cardChannelItemId) opt.selected = true;
        savedCardSelect.appendChild(opt);
      });
    }

    // Nạp thẻ từ cache
    try {
      const cached = localStorage.getItem('__AO_SAVED_CARDS__');
      if (cached) populateCardDropdown(JSON.parse(cached));
    } catch (_) {}

    document.getElementById('ao-btn-scan-cards').onclick = async () => {
      Logger.add('⏳ Đang quét danh sách thẻ liên kết từ Shopee...', 'info');
      const cards = await PaymentEngine.scanSavedCards();
      if (cards.length > 0) {
        populateCardDropdown(cards);
        Logger.add(`Tìm thấy ${cards.length} thẻ ngân hàng đã liên kết!`, 'success');
      } else {
        Logger.add('Chưa tìm thấy thẻ nào. Hãy vào trang Checkout Shopee để hệ thống tự động bắt thẻ.', 'warn');
      }
    };

    savedCardSelect.onchange = (e) => {
      if (e.target.value) {
        State.cardChannelItemId = e.target.value;
        cardIdInput.value = State.cardChannelItemId;
        localStorage.setItem('__AO_CARD_CHANNEL_ITEM_ID__', State.cardChannelItemId);
        Logger.add(`Đã chọn Thẻ ID: ${State.cardChannelItemId}`, 'info');
      }
    };

    cardIdInput.onchange = (e) => {
      State.cardChannelItemId = e.target.value.trim();
      localStorage.setItem('__AO_CARD_CHANNEL_ITEM_ID__', State.cardChannelItemId);
    };

    // Vouchers & Giá trần Listeners
    document.getElementById('ao-input-voucher-shop').onchange = (e) => {
      State.shopVoucherCode = e.target.value.trim().toUpperCase();
      localStorage.setItem('__AO_VOUCHER_CODE__', State.shopVoucherCode);
    };

    document.getElementById('ao-input-voucher-platform').onchange = (e) => {
      State.platformVoucherCode = e.target.value.trim().toUpperCase();
      localStorage.setItem('__AO_PLATFORM_VOUCHER__', State.platformVoucherCode);
    };

    document.getElementById('ao-chk-auto-vouchers').onchange = (e) => {
      State.autoBestVouchers = e.target.checked;
      localStorage.setItem('__AO_AUTO_BEST_VOUCHERS__', String(State.autoBestVouchers));
    };

    document.getElementById('ao-chk-use-coins').onchange = (e) => {
      State.useCoins = e.target.checked;
      localStorage.setItem('__AO_USE_COINS__', String(State.useCoins));
    };

    document.getElementById('ao-input-max-price').onchange = (e) => {
      State.maxBuyPrice = parseFloat(e.target.value) || 0;
      localStorage.setItem('__AO_MAX_PRICE__', String(State.maxBuyPrice));
      Logger.add(`Đã đặt giá trần: ${State.maxBuyPrice.toLocaleString('vi-VN')}đ`);
    };

    document.getElementById('ao-input-lead-time').onchange = (e) => {
      State.leadTimeMs = parseInt(e.target.value, 10) || 0;
      localStorage.setItem('__AO_LEAD_TIME__', String(State.leadTimeMs));
    };

    document.getElementById('ao-input-max-retries').onchange = (e) => {
      State.maxRetries = parseInt(e.target.value, 10) || 25;
      localStorage.setItem('__AO_MAX_RETRIES__', String(State.maxRetries));
    };

    document.getElementById('ao-input-retry-delay').onchange = (e) => {
      State.retryDelay = parseInt(e.target.value, 10) || 80;
      localStorage.setItem('__AO_RETRY_DELAY__', String(State.retryDelay));
    };

    // Telegram Listeners
    document.getElementById('ao-chk-telegram').onchange = (e) => {
      State.telegramEnabled = e.target.checked;
      localStorage.setItem('__AO_TG_ENABLED__', String(State.telegramEnabled));
    };

    document.getElementById('ao-input-tg-token').onchange = (e) => {
      State.telegramToken = e.target.value.trim();
      localStorage.setItem('__AO_TG_TOKEN__', State.telegramToken);
    };

    document.getElementById('ao-input-tg-chat').onchange = (e) => {
      State.telegramChatId = e.target.value.trim();
      localStorage.setItem('__AO_TG_CHAT_ID__', State.telegramChatId);
    };

    document.getElementById('ao-btn-test-tg').onclick = async () => {
      if (!State.telegramToken || !State.telegramChatId) {
        alert('Vui lòng điền đầy đủ Telegram Token và Chat ID trước!');
        return;
      }
      Logger.add('Đang gửi tin nhắn thử nghiệm Telegram...', 'info');
      try {
        const text = `🔔 <b>KIỂM TRA KẾT NỐI THÀNH CÔNG!</b>\n\nShopee Auto-Order v6.0 đã kết nối tốt với Telegram của bạn.\n⏰ Giờ Shopee: ${new Date(NetworkEngine.getServerTime()).toLocaleTimeString('vi-VN')}`;
        const res = await fetch(`${Endpoints.telegramApi}${State.telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ chat_id: State.telegramChatId, text, parse_mode: 'HTML' }),
        });
        const j = await res.json();
        if (j.ok) Logger.add('Tin nhắn Telegram gửi thành công!', 'success');
        else Logger.add(`Telegram báo lỗi: ${j.description}`, 'error');
      } catch (err) {
        Logger.add(`Lỗi kết nối Telegram: ${err.message}`, 'error');
      }
    };

    // Nút Bắt đầu / Dừng
    document.getElementById('ao-btn-start').onclick = () => {
      if (State.isRunning) {
        ShopeeAutoOrder.stop();
        return;
      }

      const timeStr = document.getElementById('ao-input-time').value.trim();
      if (timeStr) {
        const parts = timeStr.split(':');
        if (parts.length >= 2) {
          const nowServer = new Date(NetworkEngine.getServerTime());
          const target = new Date(nowServer);
          target.setHours(parseInt(parts[0], 10) || 0);
          target.setMinutes(parseInt(parts[1], 10) || 0);
          const secParts = (parts[2] || '0').split('.');
          target.setSeconds(parseInt(secParts[0], 10) || 0);
          target.setMilliseconds(parseInt(secParts[1], 10) || 0);

          if (target.getTime() <= nowServer.getTime() - 2000) {
            target.setDate(target.getDate() + 1);
          }
          State.scheduledTime = target.getTime();
        } else {
          State.scheduledTime = null;
        }
      } else {
        State.scheduledTime = null;
      }

      ShopeeAutoOrder.start();
    };

    // Close & Minimize
    document.getElementById('ao-btn-close').onclick = () => ShopeeAutoOrder.toggleUI(false);
    document.getElementById('ao-btn-minimize').onclick = () => ShopeeAutoOrder.toggleUI(false);
    document.getElementById('ao-btn-clear-log').onclick = () => Logger.clear();

    // Hỗ trợ kéo thả HUD
    (function makeDraggable() {
      const handle = document.getElementById('ao-drag-handle');
      let isDragging = false;
      let startX, startY, origLeft, origTop;

      handle.onmousedown = (e) => {
        if (e.target.tagName === 'BUTTON') return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = hud.getBoundingClientRect();
        origLeft = rect.left;
        origTop = rect.top;
        hud.style.bottom = 'auto';
        hud.style.right = 'auto';
        hud.style.left = `${origLeft}px`;
        hud.style.top = `${origTop}px`;
        e.preventDefault();
      };

      document.onmousemove = (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        hud.style.left = `${origLeft + dx}px`;
        hud.style.top = `${origTop + dy}px`;
      };

      document.onmouseup = () => {
        isDragging = false;
      };
    })();

    // Hàm callback toàn cục để passive hook tự nạp thẻ vào UI
    window.refreshPaymentOptionsFromCheckout = function (data) {
      const cards = PaymentEngine.extractCardsFromCheckout(data);
      if (cards.length > 0) {
        populateCardDropdown(cards);
        Logger.add(`⚡ Passive Hook: Tự động cập nhật ${cards.length} thẻ từ gói tin Checkout!`, 'success');
      }
    };
  };

  // Khởi động hiển thị HUD
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHUD);
  } else {
    renderHUD();
  }

  Logger.add('⚡ Shopee Ultra AutoBuy Core v6.0 sẵn sàng phục vụ!', 'success');
})();
