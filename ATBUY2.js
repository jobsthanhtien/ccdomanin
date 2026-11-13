/**
 * Shopee Auto-Order FULL + Voucher Auto (Extracted from Shopee ANM v26.11.05)
 * - Unhidden mode: "full" (Voucher Shop, Voucher Shopee, Banner Smart/Test Mode)
 * - Includes dependencies: client detection, cleanAffiliateLink, PiP log/monitor,
 *   background keep-alive, login verification, showToast + CSS, showCaptchaErrorModal.
 * - Anti-DevTools (DisableDevtool) removed; affiliate ad popup bypassed.
 */
(function () {
  'use strict';

  const _0x519b60 = new Set(["shopee.vn", "www.shopee.vn"]);
  if (!_0x519b60.has(location.hostname.toLowerCase())) {
    console.warn("[Shopee Auto-Order Full] Script chỉ chạy trên shopee.vn.");
    return;
  }
  if (location.href.includes("shopee.vn/buyer/login")) return;
  window.shopeeVoucherUnlocked = true;
  window.isMobileWebClient = () => /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(navigator.userAgent);
  window.getApiSourceHeaderValue = () => window.isMobileWebClient() ? "rweb" : 'pc';
  window.cleanAffiliateLink = _0x52655a => {
    if (typeof _0x52655a !== "string" || !_0x52655a) return _0x52655a;
    try {
      const _0x39d4e2 = new URL(_0x52655a, window.location.href),
        _0x1a0156 = ["mmp_pid", "affiliate_id", "utm_source", "utm_medium", "utm_campaign", "utm_content", "af_siteid", "pid", "af_click_lookback", "af_viewthrough_lookback", "is_retargeting", "af_reengagement_window"];
      return _0x1a0156.forEach(_0x261c08 => _0x39d4e2.searchParams["delete"](_0x261c08)), _0x39d4e2.toString();
    } catch (_0x5d2274) {
      return _0x52655a;
    }
  };
  const _0x123fb8 = (_0x14773a, _0xa93443, _0x2b38bc) => {
    try {
      Object.defineProperty(_0x14773a, _0xa93443, {
        'get': () => _0x2b38bc,
        'configurable': true
      });
    } catch (_0x14aa35) {}
  };
  _0x123fb8(document, "hidden", false);
  _0x123fb8(document, "visibilityState", "visible");
  document.addEventListener("visibilitychange", _0x36f6bc => {
    _0x36f6bc.stopImmediatePropagation();
    _0x36f6bc.stopPropagation();
  }, true);
  window.addEventListener("blur", _0x503914 => _0x503914.stopImmediatePropagation(), true);
  window.addEventListener("focus", _0x38425e => _0x38425e.stopImmediatePropagation(), true);
  const _0x5a45ac = window.setTimeout;
  window.setTimeout = function (_0x3bfdae, _0x5e4a1b) {
    if (typeof _0x3bfdae === "function" && _0x5e4a1b > 300000) return _0x5a45ac(_0x3bfdae, _0x5e4a1b);
    return _0x5a45ac(...arguments);
  };
  window.VOUCHER_SCRIPT_RUNNING = false;
  window.VOUCHER_SCRIPT_LOADED = false;
  window.CURRENT_EXECUTION = false;
  window.SS4_RUNNING = false;
  window.SS5_RUNNING = false;
  let _0x122cd8 = null,
    _0x95429d = null,
    _0xf8c251 = null,
    _0x1af23a = null,
    _0x27e7aa = false,
    _0x220947 = null,
    _0x5b408f = null,
    _0x232762 = null,
    _0x59f2eb,
    _0x230818 = '',
    _0x368dd9 = true,
    _0x3f513b = false;
  function _0x349ac8() {
    const _0x3e9777 = Number.parseInt(window.pipMaxLines, 10);
    if (!Number.isFinite(_0x3e9777)) return 12;
    return Math.min(20, Math.max(1, _0x3e9777));
  }
  function _0xb3b206() {
    if (!_0x1af23a) return;
    _0x1af23a.fillStyle = "#1a1a1a";
    _0x1af23a.fillRect(0, 0, 320, 180);
    if (_0x368dd9) {
      _0x1af23a.fillStyle = "#111";
      _0x1af23a.fillRect(0, 0, 320, 180);
      const _0x5622c9 = new Date(),
        _0x2b0b0e = _0x5622c9.toLocaleTimeString("en-GB", {
          'hour12': false,
          'hour': "2-digit",
          'minute': "2-digit",
          'second': "2-digit"
        });
      _0x1af23a.fillStyle = "#00ff90";
      _0x1af23a.font = "bold 45px monospace";
      _0x1af23a.textAlign = "center";
      _0x1af23a.fillText(_0x2b0b0e, 160, 115);
    } else {
      _0x1af23a.fillStyle = "#111";
      _0x1af23a.fillRect(0, 0, 320, 180);
      _0x1af23a.fillStyle = "#fff";
      let _0x10be29 = _0x230818 || "Chờ dữ liệu log...";
      _0x10be29 = _0xec1c16(_0x10be29);
      let _0x50a35e = 10,
        _0x2665a3 = 11;
      _0x1af23a.font = _0x50a35e + "px sans-serif";
      _0x1af23a.textAlign = "left";
      let _0x3d9b70 = _0x10be29.replace(/\r/g, '').split('\x0a');
      const _0x215762 = _0x349ac8();
      if (_0x3d9b70.length > _0x215762) _0x3d9b70 = _0x3d9b70.slice(-_0x215762);
      while (_0x3d9b70.length > 0 && !_0x3d9b70[0].trim()) _0x3d9b70.shift();
      while (_0x3d9b70.length > 0 && !_0x3d9b70[_0x3d9b70.length - 1].trim()) _0x3d9b70.pop();
      if (_0x3d9b70.length === 0) _0x3d9b70 = ["Chờ dữ liệu log..."];
      let _0x1164a1 = _0x3d9b70.length;
      const _0x4b22d9 = Math.max(0, _0x215762 - _0x1164a1),
        _0x2f55c1 = Math.floor(_0x4b22d9 / 2),
        _0x11fb88 = Math.round((180 - _0x215762 * _0x2665a3) / 2);
      let _0x2ab1b1 = _0x11fb88 + _0x2f55c1 * _0x2665a3;
      for (let _0x46799a = 0; _0x46799a < _0x1164a1; _0x46799a++) {
        const _0x13b98b = _0x3d9b70[_0x46799a];
        _0x1af23a.fillText(_0x13b98b, 10, _0x2ab1b1 + _0x46799a * _0x2665a3);
      }
    }
  }
  function _0x1bdef4(_0x4ab79d, _0x3a22d9, _0x2b14c6) {
    const _0x3e09df = _0x3a22d9.split('\x0a'),
      _0x127734 = [];
    return _0x3e09df.forEach(_0x1f913d => {
      const _0xd48795 = _0x1f913d.trim().split('\x20');
      let _0x315bf5 = '';
      for (let _0x4d929a = 0; _0x4d929a < _0xd48795.length; _0x4d929a++) {
        let _0x5dbc32 = _0x315bf5 ? _0x315bf5 + '\x20' + _0xd48795[_0x4d929a] : _0xd48795[_0x4d929a],
          _0x39c344 = _0x4ab79d.measureText(_0x5dbc32).width;
        _0x39c344 > _0x2b14c6 && _0x315bf5 ? (_0x127734.push(_0x315bf5), _0x315bf5 = _0xd48795[_0x4d929a]) : _0x315bf5 = _0x5dbc32;
      }
      if (_0x315bf5) _0x127734.push(_0x315bf5);
    }), _0x127734;
  }
  function _0x553dbc(_0x285b2a) {
    _0x230818 = _0x1b3cbc(_0x285b2a);
    _0x368dd9 = false;
    _0xb3b206();
    _0x220947 && (clearInterval(_0x220947), _0x220947 = null);
  }
  function _0xec1c16(_0x171695) {
    let _0x2f5cfd = document.createElement("div");
    return _0x2f5cfd.innerHTML = _0x171695, _0x2f5cfd.textContent || _0x2f5cfd.innerText || '';
  }
  function _0x5f4a55(_0x46e26d) {
    const _0xe869d = String(_0x46e26d || '').trim();
    if (_0xe869d.length <= 5) return _0xe869d;
    return _0xe869d.slice(0, 2) + "***" + _0xe869d.slice(-3);
  }
  function _0x1b3cbc(_0x431e44) {
    if (window.pipDisableMask === true) return _0x431e44;
    if (typeof _0x431e44 !== "string" || !_0x431e44) return _0x431e44;
    return _0x431e44.split('\x0a').map(_0x4eeb5f => _0x4eeb5f.replace(/([A-Z0-9]{6,})(?=\s*-\s)/g, _0x4ef9ac => _0x5f4a55(_0x4ef9ac))).join('\x0a');
  }
  function _0x39008e(_0x3bf58d, _0x2b55c2) {
    const _0x555834 = _0x2b55c2 ? ':\x20' + (_0x2b55c2.name || "Error") + " - " + (_0x2b55c2.message || String(_0x2b55c2)) : '';
    console[_0x2b55c2 ? "error" : "info"]("[PIP] " + _0x3bf58d + _0x555834, _0x2b55c2 || '');
  }
  function _0x587637(_0x30a0f3) {
    if (_0x30a0f3 === true) return true;
    if (_0x30a0f3 === false) return false;
    return !(window.pipLogs && window.pipLogs.length > 0);
  }
  function _0x2f9fcf() {
    if (_0x220947) clearInterval(_0x220947);
    _0x220947 = null;
  }
  function _0x1f5f5e(_0x1906be = _0xf8c251) {
    if (!_0x1906be) return;
    const _0x2f8953 = _0x1906be.srcObject;
    _0x2f8953 && typeof _0x2f8953.getTracks === "function" && _0x2f8953.getTracks().forEach(_0xfa9b2c => _0xfa9b2c.stop());
    _0x1906be.srcObject = null;
    _0x1906be.remove();
    if (_0x1906be === _0xf8c251) {
      _0x2f9fcf();
      _0x122cd8 = null;
      _0x5b408f = null;
      _0xf8c251 = null;
      _0x95429d = null;
      _0x1af23a = null;
      _0x27e7aa = false;
      _0x232762 = null;
      _0x59f2eb = undefined;
    }
  }
  async function _0x2fd3aa() {
    const _0x6109e3 = _0xf8c251;
    if (!_0x6109e3) return;
    try {
      if (document.pictureInPictureElement === _0x6109e3 && typeof document.exitPictureInPicture === "function") await document.exitPictureInPicture();else typeof _0x6109e3.webkitSetPresentationMode === "function" && _0x6109e3.webkitPresentationMode === "picture-in-picture" && _0x6109e3.webkitSetPresentationMode("inline");
    } catch (_0x39ece9) {
      _0x39008e("Không thể đóng PiP bằng API", _0x39ece9);
    } finally {
      _0x1f5f5e(_0x6109e3);
    }
  }
  function _0xd8c00b(_0x1c472b, _0x175241 = 5000) {
    const _0x4bf27c = {
      'GOVfY': "3|0|2|1|4",
      'JvlGD': "loadedmetadata",
      'CSpfw': "error",
      'vAKKh': "loadeddata",
      'uqJZP': function (_0x12857d, _0x140025) {
        return _0x12857d(_0x140025);
      },
      'qBAYH': function (_0xc1e252) {
        return _0xc1e252();
      },
      'HReez': function (_0x5bd073, _0x4f0ffa, _0x29c5c9) {
        return _0x5bd073(_0x4f0ffa, _0x29c5c9);
      },
      'OgOWR': function (_0xd6e2ba, _0x3e46f3) {
        return _0xd6e2ba >= _0x3e46f3;
      },
      'XTitE': function (_0x4c9df5, _0x3e92c0) {
        return _0x4c9df5 > _0x3e92c0;
      }
    };
    if (_0x1c472b.readyState >= HTMLMediaElement.HAVE_METADATA && _0x1c472b.videoWidth > 0 && _0x1c472b.videoHeight > 0) return Promise.resolve();
    return new Promise((_0x1ae7ac, _0x316c1d) => {
      const _0x36ebd9 = {
          'WIqUW': "3|0|2|1|4",
          'PYwXM': "loadedmetadata",
          'DxDgN': "error",
          'CVUVF': "loadeddata",
          'MGwLp': function (_0x141071, _0x3894a6) {
            return _0x4bf27c.uqJZP(_0x141071, _0x3894a6);
          },
          'zhuvq': function (_0x1360e8, _0x2e69d7) {
            return _0x4bf27c.uqJZP(_0x1360e8, _0x2e69d7);
          },
          'MRKYk': function (_0x43d8a7) {
            return _0x4bf27c.qBAYH(_0x43d8a7);
          }
        },
        _0x1e868e = _0x4bf27c.HReez(setTimeout, () => _0x1ae6a5(new Error("Hết thời gian chờ video sẵn sàng (" + _0x175241 + "ms)")), _0x175241),
        _0x34be2e = () => _0x1ae6a5(),
        _0x321bac = () => _0x1ae6a5(_0x1c472b.error || new Error("Video báo lỗi khi tải MediaStream")),
        _0x1ae6a5 = _0x2aa9e8 => {
          _0x36ebd9.MGwLp(clearTimeout, _0x1e868e);
          _0x1c472b.removeEventListener("loadedmetadata", _0x34be2e);
          _0x1c472b.removeEventListener("loadeddata", _0x34be2e);
          _0x1c472b.removeEventListener("error", _0x321bac);
          _0x2aa9e8 ? _0x36ebd9.zhuvq(_0x316c1d, _0x2aa9e8) : _0x36ebd9.MRKYk(_0x1ae7ac);
        };
      _0x1c472b.addEventListener("loadedmetadata", _0x34be2e, {
        'once': true
      });
      _0x1c472b.addEventListener("loadeddata", _0x34be2e, {
        'once': true
      });
      _0x1c472b.addEventListener("error", _0x321bac, {
        'once': true
      });
      if (_0x4bf27c.OgOWR(_0x1c472b.readyState, HTMLMediaElement.HAVE_METADATA) && _0x4bf27c.XTitE(_0x1c472b.videoWidth, 0) && _0x4bf27c.XTitE(_0x1c472b.videoHeight, 0)) _0x4bf27c.qBAYH(_0x1ae6a5);
    });
  }
  function _0x4e2e5a(_0x4b44e9, _0x11593f, _0x5e17c1 = 5000) {
    const _0x550ff4 = {
      'pMZlM': function (_0x3e953f, _0x1368b3) {
        return _0x3e953f(_0x1368b3);
      },
      'VItbL': function (_0x31b9a1, _0x2e184a) {
        return _0x31b9a1(_0x2e184a);
      },
      'yAjDA': function (_0x53842f, _0x2467b3, _0x430fb7) {
        return _0x53842f(_0x2467b3, _0x430fb7);
      }
    };
    return new Promise((_0x2e5c39, _0x22b5a1) => {
      const _0x39c293 = {
          'lQvCt': function (_0x1049b9, _0x5ec9d0) {
            return _0x550ff4.VItbL(_0x1049b9, _0x5ec9d0);
          }
        },
        _0x193601 = _0x550ff4.yAjDA(setTimeout, () => _0x22b5a1(new Error("Hết thời gian chờ " + _0x11593f + '\x20(' + _0x5e17c1 + "ms)")), _0x5e17c1);
      Promise.resolve(_0x4b44e9).then(_0x535bf1 => {
        _0x550ff4.pMZlM(clearTimeout, _0x193601);
        _0x550ff4.pMZlM(_0x2e5c39, _0x535bf1);
      }, _0x2a165e => {
        _0x39c293.lQvCt(clearTimeout, _0x193601);
        _0x39c293.lQvCt(_0x22b5a1, _0x2a165e);
      });
    });
  }
  function _0x2fda61(_0x228687, _0xb55978 = 1500) {
    const _0x30c5e8 = {
      'KmrWt': function (_0xfc7c2f, _0x113699) {
        return _0xfc7c2f === _0x113699;
      },
      'BXJac': "picture-in-picture",
      'XbcMY': function (_0x431176) {
        return _0x431176();
      },
      'DUEjH': function (_0x5b0838, _0x522017) {
        return _0x5b0838(_0x522017);
      },
      'KAqdB': "webkitpresentationmodechanged",
      'GYYqK': function (_0x1a3db7, _0x35d8a8) {
        return _0x1a3db7(_0x35d8a8);
      }
    };
    if (_0x228687.webkitPresentationMode === "picture-in-picture") return Promise.resolve();
    return new Promise((_0x3377cb, _0x30e856) => {
      const _0x461f6d = setTimeout(() => _0xbbbc1e(new Error("WebKit không báo trạng thái PiP sau " + _0xb55978 + 'ms')), _0xb55978),
        _0x6a788e = () => {
          if (_0x30c5e8.KmrWt(_0x228687.webkitPresentationMode, "picture-in-picture")) _0x30c5e8.XbcMY(_0xbbbc1e);
        },
        _0xbbbc1e = _0x4e5681 => {
          _0x30c5e8.DUEjH(clearTimeout, _0x461f6d);
          _0x228687.removeEventListener("webkitpresentationmodechanged", _0x6a788e);
          _0x4e5681 ? _0x30c5e8.GYYqK(_0x30e856, _0x4e5681) : _0x30c5e8.XbcMY(_0x3377cb);
        };
      _0x228687.addEventListener("webkitpresentationmodechanged", _0x6a788e);
      if (_0x228687.webkitPresentationMode === "picture-in-picture") _0xbbbc1e();
    });
  }
  function _0xc47984(_0x4c2166) {
    const _0x2c3fbb = {
        'YdjYH': function (_0x22d99d, _0x20103e) {
          return _0x22d99d(_0x20103e);
        }
      },
      _0x14c828 = _0x587637(_0x4c2166);
    if (_0x232762 && _0x59f2eb === _0x14c828 && _0xf8c251) return _0x232762;
    if (_0xf8c251 && !_0x27e7aa) _0x1f5f5e(_0xf8c251);
    if (_0x27e7aa) return Promise.resolve(_0xf8c251);
    if (!HTMLCanvasElement.prototype.captureStream) return Promise.reject(new Error("Trình duyệt không hỗ trợ canvas.captureStream()"));
    _0x368dd9 = _0x14c828;
    if (!_0x368dd9) _0x230818 = window.pipLogs?.["length"] ? window.pipLogs.join('\x0a') : "Chờ dữ liệu log...";
    _0x95429d = document.createElement("canvas");
    _0x95429d.width = 320;
    _0x95429d.height = 180;
    _0x1af23a = _0x95429d.getContext('2d');
    _0xb3b206();
    const _0x3645f0 = document.createElement("video"),
      _0x20b754 = typeof _0x3645f0.webkitSupportsPresentationMode === "function" && typeof _0x3645f0.webkitSetPresentationMode === "function";
    _0x5b408f = _0x95429d.captureStream(30);
    _0xf8c251 = _0x3645f0;
    _0x59f2eb = _0x14c828;
    _0x3645f0.muted = true;
    _0x3645f0.defaultMuted = true;
    _0x3645f0.playsInline = true;
    _0x3645f0.setAttribute("playsinline", '');
    _0x3645f0.setAttribute("webkit-playsinline", '');
    _0x3645f0.autoplay = true;
    _0x3645f0.style.cssText = _0x20b754 ? "position:fixed;bottom:0;right:0;width:2px;height:2px;opacity:0.01;pointer-events:none;z-index:-1;" : "position:fixed;bottom:-300px;right:-300px;width:1px;height:1px;opacity:0;pointer-events:none;";
    const _0x30a298 = _0xd8c00b(_0x3645f0);
    _0x3645f0.srcObject = _0x5b408f;
    document.body.appendChild(_0x3645f0);
    const _0x3be8b9 = _0x4e2e5a(_0x3645f0.play(), "video.play()");
    return _0x232762 = Promise.all([_0x30a298, _0x3be8b9]).then(() => {
      return _0x2c3fbb.YdjYH(_0x39008e, "Video sẵn sàng; readyState=" + _0x3645f0.readyState + ", size=" + _0x3645f0.videoWidth + 'x' + _0x3645f0.videoHeight), _0x3645f0;
    }), _0x232762["catch"](_0x5479f3 => _0x39008e("Chuẩn bị video PiP thất bại", _0x5479f3)), _0x232762;
  }
  async function _0x7d526d(_0x1ed97e) {
    const _0x153758 = {
      'dDuhU': function (_0x51243a, _0x547155) {
        return _0x51243a === _0x547155;
      },
      'JgPNx': function (_0x2403aa, _0x46e1ba) {
        return _0x2403aa(_0x46e1ba);
      },
      'mubHs': "Sự kiện enterpictureinpicture",
      'FmcZp': "picture-in-picture",
      'HcJpa': function (_0x14acfe, _0x310ea8) {
        return _0x14acfe === _0x310ea8;
      }
    };
    if (_0x27e7aa) {
      _0x39008e("PiP đã hoạt động; không tạo instance thứ hai");
      return;
    }
    try {
      const _0x19d479 = _0x587637(_0x1ed97e);
      _0x368dd9 = _0x19d479;
      if (!_0x19d479) _0x230818 = window.pipLogs?.["length"] ? window.pipLogs.join('\x0a') : "Chờ dữ liệu log...";
      _0xb3b206();
      const _0x5c41be = _0xf8c251 && _0x59f2eb === _0x19d479 ? _0xf8c251 : null,
        _0x4fd771 = _0x5c41be ? _0x232762 : _0xc47984(_0x1ed97e),
        _0x4ab401 = _0x5c41be || _0xf8c251,
        _0x2340d9 = _0x4ab401?.["play"]();
      if (!_0x4ab401 || !_0x4fd771) throw new Error("Không thể tạo video PiP");
      const _0x1c7737 = document.pictureInPictureEnabled !== false && typeof _0x4ab401.requestPictureInPicture === "function",
        _0x88ea2a = typeof _0x4ab401.webkitSupportsPresentationMode === "function" && typeof _0x4ab401.webkitSetPresentationMode === "function" && _0x4ab401.webkitSupportsPresentationMode("picture-in-picture");
      if (!_0x1c7737 && !_0x88ea2a) throw new Error("Trình duyệt/thiết bị không hỗ trợ API Picture-in-Picture cho video này");
      await _0x4fd771;
      if (_0x2340d9) await _0x4e2e5a(_0x2340d9, "video.play()");
      _0x39008e("User activation trước khi gọi PiP: " + (navigator.userActivation?.["isActive"] ?? "không xác định"));
      _0x4ab401.addEventListener("enterpictureinpicture", () => {
        if (_0x153758.dDuhU(_0xf8c251, _0x4ab401)) _0x27e7aa = true;
        _0x153758.JgPNx(_0x39008e, "Sự kiện enterpictureinpicture");
      });
      _0x4ab401.addEventListener("leavepictureinpicture", () => {
        _0x39008e("Sự kiện leavepictureinpicture");
        if (_0xf8c251 === _0x4ab401) _0x1f5f5e(_0x4ab401);
      });
      _0x4ab401.addEventListener("webkitpresentationmodechanged", () => {
        const _0x154b5b = _0x153758.dDuhU(_0x4ab401.webkitPresentationMode, "picture-in-picture");
        _0x27e7aa = _0x154b5b;
        _0x153758.JgPNx(_0x39008e, "webkitPresentationMode=" + _0x4ab401.webkitPresentationMode);
        if (!_0x154b5b && _0x153758.HcJpa(_0xf8c251, _0x4ab401)) _0x153758.JgPNx(_0x1f5f5e, _0x4ab401);
      });
      if (_0x88ea2a) {
        _0x4ab401.webkitSetPresentationMode("picture-in-picture");
        await _0x2fda61(_0x4ab401);
        _0x27e7aa = true;
        _0x122cd8 = null;
        _0x39008e("Mở PiP thành công bằng WebKit API");
      } else {
        _0x122cd8 = await _0x4e2e5a(_0x4ab401.requestPictureInPicture(), "requestPictureInPicture()");
        _0x27e7aa = document.pictureInPictureElement === _0x4ab401 || !!_0x122cd8;
        _0x39008e("Mở PiP thành công bằng Standard API");
      }
      if (_0x368dd9) _0x220947 = setInterval(_0xb3b206, 10);
    } catch (_0x365226) {
      _0x27e7aa = false;
      _0x39008e("Không thể mở PiP", _0x365226);
      _0x1f5f5e(_0xf8c251);
      alert("Không thể mở Picture-in-Picture.\n" + (_0x365226.name || "Error") + ':\x20' + (_0x365226.message || String(_0x365226)));
    }
  }
  function _0x1aa052(_0x36fe0a) {
    const _0x1f07b4 = {
      'Lzdxb': "custom-pip-confirm",
      'KQNNL': function (_0x3ab162, _0x285d9f) {
        return _0x3ab162(_0x285d9f);
      }
    };
    if (document.getElementById("custom-pip-confirm")) return;
    const _0x337bca = _0x36fe0a === "main" || typeof _0x36fe0a === "string" || _0x36fe0a === true ? true : undefined;
    if (!_0x27e7aa) _0xc47984(_0x337bca)["catch"](_0x33d2ff => _0x39008e("Không thể chuẩn bị PiP trước khi xác nhận", _0x33d2ff));
    const _0x173286 = "\n            <div id=\"custom-pip-confirm\" style=\"position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.35);z-index:2147483600;display:flex;align-items:center;justify-content:center;\">\n                <div style=\"background:#fff;border-radius:10px;padding:24px 20px;max-width:360px;width:92%;box-shadow:0 8px 32px rgba(0,0,0,0.19);text-align:center;font-family:sans-serif;\">\n                    <h3 style=\"color:#009966;margin:0 0 18px 0;font-size:22px;font-weight:700;\">Kích hoạt PiP mode</h3>\n                    <div style=\"font-size:15px;color:#444;margin-bottom:26px;\">\n                        PiP mode để theo dõi tiến trình chạy. Khả năng hỗ trợ phụ thuộc vào thiết bị và trình duyệt.\n                    </div>\n                    <div style=\"display:flex;gap:16px;justify-content:center;\">\n                        <button id=\"pip-cancel-btn\" style=\"flex:0 0 40%;padding:10px 0;background:#eee;color:#444;border:none;border-radius:5px;font-weight:bold;cursor:pointer;\">Hủy</button>\n                        <button id=\"pip-ok-btn\" style=\"flex:0 0 40%;padding:10px 0;background:#1abd6c;color:white;border:none;border-radius:5px;font-weight:bold;cursor:pointer;\">Đồng ý</button>\n                    </div>\n                </div>\n            </div>\n        ",
      _0x42152e = document.createElement("div");
    _0x42152e.innerHTML = _0x173286;
    document.body.appendChild(_0x42152e.firstElementChild);
    document.getElementById("pip-ok-btn").onclick = function () {
      document.getElementById("custom-pip-confirm").remove();
      if (_0x36fe0a === "main") {
        window.pipLogs = [];
        _0x7d526d(true);
      } else {
        if (typeof _0x36fe0a === "string") {
          if (typeof window.clearPiPLogs === "function") window.clearPiPLogs(_0x36fe0a);
          _0x7d526d(true);
        } else _0x36fe0a === true ? _0x7d526d(true) : _0x7d526d();
      }
    };
    document.getElementById("pip-cancel-btn").onclick = function () {
      document.getElementById("custom-pip-confirm").remove();
      if (!_0x27e7aa) _0x1f07b4.KQNNL(_0x1f5f5e, _0xf8c251);
    };
  }
  window.showPiPModeMenu = _0x1aa052;
  window.updatePiPLog = _0x553dbc;
  window.closePiPMode = _0x2fd3aa;
  window.pipLogs = [];
  window.addLogToPiP = function (_0xa71ab2) {
    if (typeof window.updatePiPLog !== "function") return;
    let _0x1b7a39 = typeof _0xa71ab2 === "string" ? _0xa71ab2.replace(/<[^>]*>?/gm, '').trim() : String(_0xa71ab2);
    window.pipLogs.push(_0x1b7a39);
    const _0x2fafb2 = _0x349ac8();
    if (window.pipLogs.length > _0x2fafb2) window.pipLogs.shift();
    window.updatePiPLog(window.pipLogs.join('\x0a'));
  };
  window.setPiPLogs = function (_0x147f63) {
    if (!Array.isArray(_0x147f63)) return;
    window.pipLogs = _0x147f63.map(_0x385250 => typeof _0x385250 === "string" ? _0x385250.replace(/<[^>]*>?/gm, '').trim() : String(_0x385250));
    const _0xc1fc3d = _0x349ac8();
    if (window.pipLogs.length > _0xc1fc3d) window.pipLogs = window.pipLogs.slice(-_0xc1fc3d);
    typeof window.updatePiPLog === "function" && window.updatePiPLog(window.pipLogs.join('\x0a'));
  };
  window.clearPiPLogs = function (_0x43f954) {
    window.pipLogs = [];
    _0x368dd9 = false;
    if (_0x43f954) window.addLogToPiP("Đang chạy: " + _0x43f954 + "...");else {
      if (typeof window.updatePiPLog === "function") window.updatePiPLog('');
    }
  };
  try {
    let _0x49c59c = new AudioContext(),
      _0x27fa60 = _0x49c59c.createOscillator(),
      _0x141076 = _0x49c59c.createGain();
    _0x27fa60.connect(_0x141076);
    _0x141076.connect(_0x49c59c.destination);
    _0x141076.gain.value = 0.002;
    _0x27fa60.frequency.value = 70;
    _0x27fa60.start();
  } catch (_audioErr) {}
  async function _0x3632a5() {
    try {
      const _0x41b799 = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/)?.[1] || '',
        _0x2b257e = await fetch("https://shopee.vn/api/v4/account/basic/get_account_info", {
          'headers': {
            'accept': "application/json",
            'accept-language': "en-US,en;q=0.9",
            'content-type': "application/json",
            'x-api-source': 'pc',
            'x-csrftoken': _0x41b799,
            'x-sz-sdk-version': "1.12.40"
          },
          'method': "GET",
          'mode': "cors",
          'credentials': "include"
        }),
        _0x101a4c = await _0x2b257e.json(),
        _0x3e315f = _0x101a4c.data || {};
      if (_0x3e315f.userid && typeof _0x3e315f.userid === "number" && _0x3e315f.userid > 0) return window.current_user_id = _0x3e315f.userid, window.current_shop_id = _0x3e315f.shopid || null, {
        'isLoggedIn': true,
        'userData': _0x3e315f.userid,
        'current_user_id': _0x3e315f.userid,
        'current_shop_id': _0x3e315f.shopid || null
      };
      return {
        'isLoggedIn': false,
        'error': _0x101a4c.error_msg || "Chưa đăng nhập"
      };
    } catch (_0x5d2bc8) {
      return {
        'isLoggedIn': false,
        'error': "Không thể kiểm tra trạng thái đăng nhập"
      };
    }
  }
  function _0x3f3ca5() {
    const _0x1828ff = "\n            <div class=\"login-overlay\" id=\"loginOverlay\">\n                <div class=\"login-modal\">\n                    <div class=\"login-header\">\n                        <h3><i class=\"fas fa-sign-in-alt me-2\"></i>Yêu Cầu Đăng Nhập</h3>\n                    </div>\n                    <div class=\"login-body\">\n                        <div class=\"login-icon\">\n                            <i class=\"fas fa-user-circle\"></i>\n                        </div>\n                        <h4>Bạn cần đăng nhập để sử dụng</h4>\n                        <p>Vui lòng đăng nhập vào tài khoản Shopee để tiếp tục sử dụng ứng dụng.</p>\n                        \n                        <div class=\"countdown-container\">\n                            <div class=\"countdown-circle\">\n                                <span id=\"countdownNumber\">30</span>\n                            </div>\n                            <p>Tự động chuyển hướng sau <span id=\"countdownText\">30</span> giây</p>\n                        </div>\n                        \n                        <div class=\"login-buttons\">\n                            <button class=\"login-btn\" onclick=\"redirectToLogin()\">\n                                <i class=\"fas fa-sign-in-alt me-2\"></i>Đăng Nhập Ngay\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ",
      _0x32832a = "\n            <style id=\"loginModalCSS\">\n                .login-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); display: flex; justify-content: center; align-items: center; z-index: 999999; animation: fadeIn 0.3s ease; }\n                .login-modal { background: white; border-radius: 16px; padding: 0; width: 90%; max-width: 450px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); animation: slideInUp 0.3s ease; overflow: hidden; }\n                .login-header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 20px; text-align: center; }\n                .login-header h3 { margin: 0; font-size: 18px; font-weight: 600; }\n                .login-body { padding: 30px 20px; text-align: center; }\n                .login-icon { font-size: 60px; color: #ff6b6b; margin-bottom: 20px; }\n                .login-body h4 { color: #333; margin-bottom: 10px; font-size: 20px; font-weight: 600; }\n                .login-body p { color: #666; margin-bottom: 25px; line-height: 1.5; }\n                .countdown-container { margin: 25px 0; }\n                .countdown-circle { width: 80px; height: 80px; border: 4px solid #ff6b6b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 24px; font-weight: bold; color: #ff6b6b; background: rgba(255, 107, 107, 0.1); animation: pulse 2s infinite; }\n                .countdown-container p { color: #666; font-size: 14px; margin: 0; }\n                .login-buttons { display: flex; flex-direction: column; gap: 12px; margin-top: 25px; }\n                .login-btn { background: linear-gradient(135deg, #ff6b6b, #ee5a24); color: white; border: none; padding: 14px 20px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }\n                .login-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4); }\n                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }\n                @keyframes slideInUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }\n                @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }\n                @media (max-width: 480px) { .login-modal { width: 95%; margin: 20px; } .login-body { padding: 25px 15px; } .countdown-circle { width: 70px; height: 70px; font-size: 20px; } }\n            </style>\n        ";
    document.head.insertAdjacentHTML("beforeend", _0x32832a);
    document.body.insertAdjacentHTML("beforeend", _0x1828ff);
    _0x201d1b();
  }
  function _0x201d1b() {
    let _0x40ffd4 = 30;
    const _0x490d0e = document.getElementById("countdownNumber"),
      _0x330e06 = document.getElementById("countdownText"),
      _0x5b03bc = setInterval(() => {
        _0x40ffd4--;
        if (_0x490d0e) _0x490d0e.textContent = _0x40ffd4;
        if (_0x330e06) _0x330e06.textContent = _0x40ffd4;
        _0x40ffd4 <= 0 && (clearInterval(_0x5b03bc), redirectToLogin());
      }, 1000);
  }
  window.redirectToLogin = function () {
    window.location.href = "https://shopee.vn/buyer/login?from=https%3A%2F%2Fshopee.vn%2Fuser%2Fvoucher-wallet%2F%3Ftype%3D0&next=https%3A%2F%2Fshopee.vn%2Fuser%2Fvoucher-wallet%2F%3Ftype%3D0";
  };
  function _0x1fb475() {
    const _0x40fec = document.getElementById("loginOverlay"),
      _0x392c4a = document.getElementById("loginModalCSS");
    if (_0x40fec) _0x40fec.remove();
    if (_0x392c4a) _0x392c4a.remove();
  }
  window.showToast = function (_0x39d544, _0x293cd0 = "error", _0xb80b6e = null, _0x482e05 = 5000) {
    if (!_0xb80b6e) {
      const _0x4fc83d = {
        'error': "❌ Lỗi",
        'warning': "⚠️ Cảnh báo",
        'success': "✅ Thành công",
        'info': "ℹ️ Thông báo"
      };
      _0xb80b6e = _0x4fc83d[_0x293cd0] || _0x4fc83d.info;
    }
    const _0x107922 = {
        'error': '❌',
        'warning': '⚠️',
        'success': '✅',
        'info': 'ℹ️'
      },
      _0x9bdf00 = "\n            <div class=\"custom-toast " + _0x293cd0 + "\">\n                <div class=\"custom-toast-icon\">" + _0x107922[_0x293cd0] + "</div>\n                <div class=\"custom-toast-content\">\n                    <div class=\"custom-toast-title\">" + _0xb80b6e + "</div>\n                    <div class=\"custom-toast-message\">" + _0x39d544 + "</div>\n                </div>\n                <button class=\"custom-toast-close\" onclick=\"this.parentElement.remove()\">×</button>\n            </div>\n        ",
      _0x7313a2 = document.createElement("div");
    _0x7313a2.innerHTML = _0x9bdf00;
    const _0x35645f = _0x7313a2.firstElementChild;
    return document.body.appendChild(_0x35645f), _0x482e05 > 0 && setTimeout(() => {
      _0x35645f.classList.add("hiding");
      setTimeout(() => {
        _0x35645f.parentElement && _0x35645f.remove();
      }, 300);
    }, _0x482e05), _0x35645f;
  };
  window.affiliate_popup = function () {
    return Promise.resolve(true);
  };
  window.showCaptchaErrorModal = function () {
    const _0xd5d4ed = {
        'eenue': "3|1|2|6|0|5|4",
        'sVZjS': function (_0xa6b348, _0x23258e) {
          return _0xa6b348 === _0x23258e;
        },
        'IIkLQ': "function",
        'JdXEg': function (_0x387e4d) {
          return _0x387e4d();
        },
        'ftVFu': function (_0x1468ec, _0xa76b36) {
          return _0x1468ec === _0xa76b36;
        },
        'lJpHJ': function (_0x4861b0, _0x57627d) {
          return _0x4861b0 === _0x57627d;
        },
        'NFCPQ': function (_0x246c73, _0x49063e) {
          return _0x246c73(_0x49063e);
        },
        'sriMT': "captcha-error-modal",
        'HFKBo': "opacity 0.3s",
        'gPnUr': function (_0xbf502, _0x1b5f20, _0x4ed9fa) {
          return _0xbf502(_0x1b5f20, _0x4ed9fa);
        },
        'DoJvZ': function (_0x37dd57, _0x19c53f) {
          return _0x37dd57 <= _0x19c53f;
        }
      },
      _0x3412e6 = document.getElementById("captcha-error-modal");
    if (_0x3412e6) _0x3412e6.remove();
    const _0x3b0997 = "\n            <div id=\"captcha-error-modal\" class=\"captcha-error-overlay\">\n                <div class=\"captcha-error-content\">\n                    <div class=\"captcha-error-icon\">⚠️</div>\n                    <h3>Yêu cầu xác minh Captcha</h3>\n                    <p>Bạn cần verify captcha và chạy lại code.</p>\n                    <p class=\"captcha-subtext\">Giao diện tự đóng sau <span id=\"captcha-countdown\">4</span> giây</p>\n                    <button id=\"captcha-error-ok-btn\" class=\"captcha-error-btn\">Đã hiểu & Đóng ngay</button>\n                </div>\n            </div>\n        ",
      _0x23a18a = "\n            <style id=\"captcha-error-style\">\n                .captcha-error-overlay {\n                    position: fixed;\n                    top: 0;\n                    left: 0;\n                    width: 100%;\n                    height: 100%;\n                    background: rgba(0, 0, 0, 0.85);\n                    backdrop-filter: blur(5px);\n                    display: flex;\n                    justify-content: center;\n                    align-items: center;\n                    z-index: 1000000;\n                    animation: fadeIn 0.3s ease;\n                }\n                .captcha-error-content {\n                    background: #fff;\n                    border-radius: 16px;\n                    padding: 30px;\n                    width: 90%;\n                    max-width: 400px;\n                    text-align: center;\n                    box-shadow: 0 15px 50px rgba(0,0,0,0.5);\n                    animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n                    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n                }\n                .captcha-error-icon {\n                    font-size: 50px;\n                    margin-bottom: 20px;\n                    animation: bounce 1s infinite;\n                }\n                .captcha-error-content h3 {\n                    margin: 0 0 10px;\n                    color: #333;\n                    font-size: 22px;\n                    font-weight: 700;\n                }\n                .captcha-error-content p {\n                    margin: 0 0 5px;\n                    color: #555;\n                    font-size: 16px;\n                    line-height: 1.5;\n                }\n                .captcha-error-content .captcha-subtext {\n                    font-size: 14px;\n                    color: #888;\n                    margin-bottom: 25px;\n                }\n                .captcha-error-btn {\n                    background: linear-gradient(135deg, #ff6b35, #ff4757);\n                    color: white;\n                    border: none;\n                    padding: 12px 30px;\n                    border-radius: 8px;\n                    font-size: 16px;\n                    font-weight: 600;\n                    cursor: pointer;\n                    transition: transform 0.2s, box-shadow 0.2s;\n                    width: 100%;\n                }\n                .captcha-error-btn:hover {\n                    transform: translateY(-2px);\n                    box-shadow: 0 5px 15px rgba(255, 71, 87, 0.4);\n                }\n                @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }\n                @keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-10px);} 60% {transform: translateY(-5px);} } \n            </style>\n        ";
    !document.getElementById("captcha-error-style") && document.head.insertAdjacentHTML("beforeend", _0x23a18a);
    document.body.insertAdjacentHTML("beforeend", _0x3b0997);
    let _0x21a492 = 5;
    const _0x1a027d = document.getElementById("captcha-countdown");
    let _0x11abfd = false;
    const _0x15b331 = () => {
        if (_0xd5d4ed.sVZjS(typeof window.closeMobileModal, "function")) window.closeMobileModal();
        if (_0xd5d4ed.sVZjS(typeof window.closeDealPopup, "function")) window.closeDealPopup();
        if (_0xd5d4ed.ftVFu(typeof window.closeFlashsaleModal, "function")) window.closeFlashsaleModal();
        if (_0xd5d4ed.lJpHJ(typeof window.closeTimeChangeModal, "function")) window.closeTimeChangeModal();
        if (_0xd5d4ed.sVZjS(typeof closeModal, "function")) _0xd5d4ed.JdXEg(closeModal);
        if (_0xd5d4ed.sVZjS(typeof window.closeMultiVoucherChecker, "function")) window.closeMultiVoucherChecker();
        if (_0xd5d4ed.ftVFu(typeof window.closeAutoBuyModal, "function")) window.closeAutoBuyModal();
      },
      _0x132250 = () => {
        if (_0x11abfd) return;
        _0x11abfd = true;
        _0xd5d4ed.NFCPQ(clearInterval, _0x808f36);
        const _0x21e825 = document.getElementById("captcha-error-modal");
        _0x21e825 && (_0x21e825.style.transition = "opacity 0.3s", _0x21e825.style.opacity = '0', _0xd5d4ed.gPnUr(setTimeout, () => _0x21e825.remove(), 300));
        _0xd5d4ed.JdXEg(_0x15b331);
      },
      _0x2cac20 = document.getElementById("captcha-error-ok-btn");
    _0x2cac20.onclick = _0x132250;
    const _0x808f36 = setInterval(() => {
      _0x21a492--;
      if (_0x1a027d) _0x1a027d.textContent = _0x21a492;
      _0xd5d4ed.DoJvZ(_0x21a492, 0) && _0xd5d4ed.JdXEg(_0x132250);
    }, 1000);
  };
  function _0x1ab171() {
    const _0x237b03 = document.getElementById("anm-font-awesome");
    if (_0x237b03) return;
    const _0x198225 = document.querySelector("link[href*=\"font-awesome\"]");
    if (_0x198225) {
      _0x198225.id = "anm-font-awesome";
      return;
    }
    const _0x138555 = document.createElement("link");
    _0x138555.id = "anm-font-awesome";
    _0x138555.rel = "stylesheet";
    _0x138555.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
    document.head.appendChild(_0x138555);
  }
  function _injectAutoOrderToastStyles() {
    if (document.getElementById("modal-init-style") || document.getElementById("shopee-auto-order-toast-style")) return;
    const style = document.createElement("style");
    style.id = "shopee-auto-order-toast-style";
    style.textContent = `
/* Custom Toast Notification System */
                .custom-toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
                    color: #f5f5f5;
                    padding: 16px 24px;
                    border-radius: 12px;
                    border-left: 4px solid #ff6b35;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 107, 53, 0.3);
                    z-index: 999999;
                    min-width: 320px;
                    max-width: 450px;
                    animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    backdrop-filter: blur(10px);
                }

                .custom-toast.error {
                    border-left-color: #dc3545;
                }

                .custom-toast.warning {
                    border-left-color: #ffc107;
                }

                .custom-toast.success {
                    border-left-color: #28a745;
                }

                .custom-toast.info {
                    border-left-color: #17a2b8;
                }

                .custom-toast-icon {
                    font-size: 24px;
                    line-height: 1;
                    flex-shrink: 0;
                }

                .custom-toast.error .custom-toast-icon { color: #dc3545; }
                .custom-toast.warning .custom-toast-icon { color: #ffc107; }
                .custom-toast.success .custom-toast-icon { color: #28a745; }
                .custom-toast.info .custom-toast-icon { color: #17a2b8; }

                .custom-toast-content {
                    flex: 1;
                }

                .custom-toast-title {
                    font-weight: 700;
                    font-size: 15px;
                    margin-bottom: 4px;
                    color: #fff;
                }

                .custom-toast-message {
                    font-size: 13px;
                    color: #ccc;
                    line-height: 1.4;
                }

                .custom-toast-close {
                    background: none;
                    border: none;
                    color: #aaa;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }

                .custom-toast-close:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                }

                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }

                .custom-toast.hiding {
                    animation: slideOutRight 0.3s ease forwards;
                }
@media (max-width: 768px) {
    .custom-toast {
        top: 10px;
        right: 10px;
        left: 10px;
        min-width: unset;
        max-width: unset;
    }
    @keyframes slideInRight {
        from { transform: translateY(-100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-100px); opacity: 0; }
    }
}
`;
    document.head.appendChild(style);
  }
  window.shopeeAutoOrder = async function (_0x24378a = "full") {
    const _0x59e2f9 = {
      'HRVsS': function (_0x2e3ea1, _0x13b42e) {
        return _0x2e3ea1(_0x13b42e);
      },
      'bqjHV': function (_0x26518f, _0x11b2ce) {
        return _0x26518f ?? _0x11b2ce;
      },
      'UOfti': "voucherCode",
      'CURyR': "vouchercode",
      'fLisr': "promotionId",
      'UALAG': "promotionid",
      'KiPzq': function (_0x254964, _0x159778) {
        return _0x254964(_0x159778);
      },
      'fRMPy': function (_0x51d78e, _0x3c6fbc) {
        return _0x51d78e(_0x3c6fbc);
      },
      'yjBIv': function (_0x1d95f9, _0x437b9a) {
        return _0x1d95f9 || _0x437b9a;
      },
      'gXmGj': function (_0x2e76c9, _0x21a846) {
        return _0x2e76c9(_0x21a846);
      },
      'BFFre': function (_0x113642, _0x1fc6c0) {
        return _0x113642(_0x1fc6c0);
      },
      'KmpUv': function (_0x13b92b, _0x1e09fc) {
        return _0x13b92b(_0x1e09fc);
      },
      'dFSoF': "http",
      'lsfyP': "evcode",
      'KUvHx': function (_0x2770f2, _0x4f3845) {
        return _0x2770f2(_0x4f3845);
      },
      'otWka': "signature",
      'wNHeX': function (_0x550728, _0x490782) {
        return _0x550728(_0x490782);
      },
      'Pcurn': function (_0x3ffc76, _0x2e8fea) {
        return _0x3ffc76 || _0x2e8fea;
      },
      'bJqVk': function (_0x1ad840, _0x3e8105) {
        return _0x1ad840 === _0x3e8105;
      },
      'XRkzz': "shopid_all",
      'YgRjp': "both",
      'ZCwOy': "object",
      'fKqah': function (_0x186c59, _0x531b34) {
        return _0x186c59 + _0x531b34;
      },
      'YmASp': function (_0x3ee74a, _0x4740f6) {
        return _0x3ee74a(_0x4740f6);
      },
      'pnnZe': function (_0x30353a, _0x4208e8) {
        return _0x30353a(_0x4208e8);
      },
      'qxkTr': function (_0xae217f, _0x12c44f) {
        return _0xae217f(_0x12c44f);
      },
      'YzbrU': function (_0x5d89a3, _0x11b852) {
        return _0x5d89a3 !== _0x11b852;
      },
      'hKWQu': "function",
      'ZdDpa': "autobuy-log-container",
      'NrqJp': "Đặt đơn tự động: chưa có log...",
      'AfrPm': function (_0x3ed6f2, _0x304d3c) {
        return _0x3ed6f2 !== _0x304d3c;
      },
      'UiyvC': function (_0x15ad51) {
        return _0x15ad51();
      },
      'HsSPZ': function (_0x2e9e30, _0x28fc05) {
        return _0x2e9e30 === _0x28fc05;
      },
      'IuWLe': "Không tìm thấy PiP mode",
      'fvskq': "autobuy-log-section",
      'HKbAV': "none",
      'uSbhK': "flex",
      'zTQDn': "error",
      'tHGNk': "#ff4d4f",
      'EvSWO': "success",
      'ylHyH': "#52c41a",
      'ViCYO': "rgb(171 167 3)",
      'ZzZsU': "div",
      'cksIy': "4px",
      'oDLOJ': "monospace",
      'cxRnf': "12px",
      'xxltC': "break-word",
      'notAV': "anywhere",
      'SCZho': "pre-wrap",
      'Dehxo': function (_0x582b12, _0xc890a6) {
        return _0x582b12(_0xc890a6);
      },
      'mrJsw': function (_0xd4c43f, _0x53191c) {
        return _0xd4c43f(_0x53191c);
      },
      'IXMhe': "Không rõ sản phẩm",
      'TsQDr': function (_0x35712d, _0x4e2fc9) {
        return _0x35712d > _0x4e2fc9;
      },
      'sVSWy': function (_0x53db5e) {
        return _0x53db5e();
      },
      'sSrGB': function (_0x179600, _0x456ba8) {
        return _0x179600(_0x456ba8);
      },
      'SxuHQ': function (_0x34139d, _0x2e0dfd) {
        return _0x34139d(_0x2e0dfd);
      },
      'IhWDE': "[Telegram] Thiếu token/chat_id. Kiểm tra lại cài đặt nâng cao.",
      'zQXNd': function (_0x301f22, _0x319685) {
        return _0x301f22(_0x319685);
      },
      'veTqC': "Unknown",
      'PpLRJ': function (_0x493e99, _0x16c588) {
        return _0x493e99(_0x16c588);
      },
      'FVyJx': function (_0x4b13a6, _0xdcdd10) {
        return _0x4b13a6(_0xdcdd10);
      },
      'oNdwL': function (_0x27aada, _0x54a444, _0x3fc415) {
        return _0x27aada(_0x54a444, _0x3fc415);
      },
      'lcUQH': "POST",
      'EyOxb': "application/json",
      'HFdgO': "HTML",
      'oGVZO': "Telegram",
      'YZrsb': "[Telegram] Đã gửi thông báo thành công.",
      'mMnBQ': "Unknown error",
      'tRLYl': "_blank",
      'dnQMf': function (_0x3bdb6b, _0xa60982) {
        return _0x3bdb6b === _0xa60982;
      },
      'yIMbq': "undefined",
      'heINL': function (_0x50944e, _0x363688) {
        return _0x50944e !== _0x363688;
      },
      'rZfim': "granted",
      'qnAhK': function (_0x1cd3e0) {
        return _0x1cd3e0();
      },
      'UqdXY': "Thành công",
      'HbbzC': "🎉 ĐẶT HÀNG THÀNH CÔNG!",
      'DBaYh': "https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/icon_favicon_1_32.png",
      'bnsIG': "[Browser Notification] Error:",
      'LBsCI': function (_0x3bc7b9, _0x4a27f2) {
        return _0x3bc7b9(_0x4a27f2);
      },
      'AEnAF': function (_0x4f486a, _0x2c3776) {
        return _0x4f486a(_0x2c3776);
      },
      'nvTbM': function (_0x27aa99, _0x355f04, _0x4a88b6) {
        return _0x27aa99(_0x355f04, _0x4a88b6);
      },
      'EWMJB': function (_0x1616b1, _0x1bfd8b, _0x58ea1a) {
        return _0x1616b1(_0x1bfd8b, _0x58ea1a);
      },
      'peYLf': function (_0x4605bb, _0x3f7999) {
        return _0x4605bb(_0x3f7999);
      },
      'BVJwJ': function (_0x581d3a, _0x389561) {
        return _0x581d3a(_0x389561);
      },
      'lSyne': function (_0x69fc96, _0x3eb91d) {
        return _0x69fc96(_0x3eb91d);
      },
      'mqTPj': "Hình thức thanh toán khác",
      'HMsVB': function (_0x31a29e, _0x7e70ad) {
        return _0x31a29e === _0x7e70ad;
      },
      'oyGVH': "giro",
      'zvLWR': "credit",
      'bUfck': function (_0x6167bb, _0x5ad9ba) {
        return _0x6167bb === _0x5ad9ba;
      },
      'KgdjA': "napas",
      'tEhVT': "wallet",
      'SiBVb': function (_0x24f842, _0x2e5852) {
        return _0x24f842(_0x2e5852);
      },
      'riynD': "số dư ví shopeepay",
      'fIPze': function (_0x337b59, _0x306211) {
        return _0x337b59 !== _0x306211;
      },
      'eFPVL': function (_0x4c6c97, _0x49be44) {
        return _0x4c6c97 / _0x49be44;
      },
      'vGzjQ': "vi-VN",
      'WfYIi': function (_0x284725, _0x15e6b9, _0x3221e0, _0x38074b) {
        return _0x284725(_0x15e6b9, _0x3221e0, _0x38074b);
      },
      'ERvYK': function (_0xe8f25e) {
        return _0xe8f25e();
      },
      'isScj': function (_0x13ebed) {
        return _0x13ebed();
      },
      'AaQDV': ".payment-select-container",
      'bjErZ': "payment-options-dropdown",
      'oVVpF': function (_0x4f4efa, _0x2fdb47) {
        return _0x4f4efa === _0x2fdb47;
      },
      'vUaii': "block",
      'uIgSU': "active",
      'VxMew': function (_0x5cd7f1, _0x6f58b1) {
        return _0x5cd7f1(_0x6f58b1);
      },
      'inFvB': function (_0x123b21, _0x314907) {
        return _0x123b21 === _0x314907;
      },
      'Omrwb': "card",
      'BpkXr': "gpay",
      'KwqkR': function (_0x486530, _0x262251) {
        return _0x486530 === _0x262251;
      },
      'QzrDA': "Napas",
      'VMHqv': function (_0x55e3c3, _0x135440) {
        return _0x55e3c3 === _0x135440;
      },
      'JwmCB': "Google Pay",
      'cUGDN': "Thanh toán khi nhận hàng",
      'RVkFg': function (_0x2dcabc, _0x4c89d6) {
        return _0x2dcabc(_0x4c89d6);
      },
      'mtVKg': function (_0x117acd, _0x5972ce) {
        return _0x117acd <= _0x5972ce;
      },
      'UsfuG': function (_0x33daa9, _0x56ac51) {
        return _0x33daa9 <= _0x56ac51;
      },
      'pzAlI': function (_0x44304b, _0x2db33c) {
        return _0x44304b instanceof _0x2db33c;
      },
      'AuZrK': function (_0x2c1e7f, _0x4a03ff) {
        return _0x2c1e7f(_0x4a03ff);
      },
      'IktKK': function (_0x2868bf, _0x1d2257) {
        return _0x2868bf(_0x1d2257);
      },
      'VidcC': "Có lỗi xảy ra.",
      'TQNYj': function (_0xef362e, _0x4b4d3c) {
        return _0xef362e === _0x4b4d3c;
      },
      'szPlK': function (_0x1bb0bb, _0x498004) {
        return _0x1bb0bb(_0x498004);
      },
      'lPldD': "error_redirect_to_kyc",
      'gNNcu': "Cập nhật thông tin cá nhân",
      'qWHRh': function (_0x26b3fc, _0x1b1d8a) {
        return _0x26b3fc || _0x1b1d8a;
      },
      'APGqI': "Bạn cần cập nhật thông tin cá nhân để tiếp tục đặt hàng.",
      'GreRL': function (_0x1541c5, _0x16a21a) {
        return _0x1541c5 || _0x16a21a;
      },
      'jFBss': "Có lỗi xảy ra khi đặt hàng.",
      'VWyFX': function (_0x111a14, _0x1aa909) {
        return _0x111a14(_0x1aa909);
      },
      'RSUuY': function (_0x12724c, _0x329750) {
        return _0x12724c(_0x329750);
      },
      'eHSCF': "Voucher Shopee không hợp lệ.",
      'vqviC': " Thường do user chưa lưu voucher này. Hệ thống sẽ lưu mã cho bạn trước khi đặt.",
      'YBNAN': function (_0x4adc81, _0x359b66) {
        return _0x4adc81 === _0x359b66;
      },
      'FVDwH': "Đã dừng bởi người dùng",
      'YftQn': "stop",
      'qUSGj': "Đã dừng bởi người dùng.",
      'AsVJi': "CAPTCHA_REQUIRED",
      'IFimu': function (_0x35ba65, _0x83fdc7) {
        return _0x35ba65 === _0x83fdc7;
      },
      'EcEQZ': function (_0x13e185, _0x2f3f77) {
        return _0x13e185(_0x2f3f77);
      },
      'JLftq': function (_0x4b7f82, _0x4587a7) {
        return _0x4b7f82(_0x4587a7);
      },
      'tVZfn': "Cần xác minh captcha.",
      'BgaJE': function (_0x4a3a42, _0x557360) {
        return _0x4a3a42 === _0x557360;
      },
      'bRxht': "PLATFORM_VOUCHER_INVALID",
      'xWWzk': "next_voucher",
      'ykxKj': "Voucher Shopee không áp dụng được.",
      'ecxMV': function (_0x3902f2, _0x28d454) {
        return _0x3902f2 === _0x28d454;
      },
      'gtFyx': "checkout",
      'agYGD': function (_0x226390, _0x3106b0, _0x510cd7) {
        return _0x226390(_0x3106b0, _0x510cd7);
      },
      'NGwcB': "Không thể lấy thông tin thanh toán.",
      'IcwXD': function (_0x29adb4, _0x39e043) {
        return _0x29adb4 === _0x39e043;
      },
      'NgdKD': "unknown",
      'IDZJQ': function (_0x204762, _0x293585, _0x4935a5) {
        return _0x204762(_0x293585, _0x4935a5);
      },
      'JIkSR': "Mất kết nối sau khi gửi yêu cầu đặt hàng.",
      'jsjzT': "Response đặt hàng không đủ dữ liệu để xác định đơn đã được tạo hay chưa.",
      'FaKWc': function (_0x2180e4, _0x402d3c) {
        return _0x2180e4 !== _0x402d3c;
      },
      'rbcHk': function (_0x316b56, _0x1de67f, _0xd1104e) {
        return _0x316b56(_0x1de67f, _0xd1104e);
      },
      'wWKcQ': "Shopee từ chối yêu cầu đặt hàng.",
      'eqcsy': "Lỗi đặt hàng không thuộc nhóm được phép thử tiếp.",
      'YHCHo': "disabled",
      'jBLZf': "manual_by_shop",
      'NhFxV': "single_verified",
      'uqjGu': "auto",
      'YRYWR': function (_0x222bb4, _0x1a581b) {
        return _0x222bb4(_0x1a581b);
      },
      'FfFJd': function (_0x56ca7a, _0x34c88d) {
        return _0x56ca7a / _0x34c88d;
      },
      'YXxEy': ".voucher-auto-rule-row",
      'LerEB': "rule-1",
      'uNHRz': "voucher-auto-rule-discount",
      'XPJJV': function (_0x2d05d8, _0x3eb0ae) {
        return _0x2d05d8(_0x3eb0ae);
      },
      'Rpomz': "voucher-auto-rule-percent",
      'ixHqR': "voucher-auto-rule-minspend",
      'KkGoE': function (_0x3cbeb6, _0x4f0d0c) {
        return _0x3cbeb6(_0x4f0d0c);
      },
      'opkmg': function (_0x4e0f39, _0x12fe67, _0x3204a7) {
        return _0x4e0f39(_0x12fe67, _0x3204a7);
      },
      'sULvR': "unshort",
      'acwcs': function (_0x96d39f, _0x49166d, _0x55733f) {
        return _0x96d39f(_0x49166d, _0x55733f);
      },
      'ISoqJ': "VoucherAuto/expand_short_url",
      'nSUAD': function (_0x171bde, _0x4ebc61) {
        return _0x171bde(_0x4ebc61);
      },
      'HxBIz': function (_0x2e8560, _0x8c53ec, _0x118d2d) {
        return _0x2e8560(_0x8c53ec, _0x118d2d);
      },
      'wUrua': "GET",
      'aoKVO': "cors",
      'xEaSB': "include",
      'XGVvD': function (_0x566e7c, _0x27bcaa, _0x51704b) {
        return _0x566e7c(_0x27bcaa, _0x51704b);
      },
      'OaTjd': "VoucherAuto/voucher_list",
      'ujOmT': function (_0x398d10, _0x306142) {
        return _0x398d10(_0x306142);
      },
      'MTbug': "Không tải được voucher shop.",
      'XOBOr': function (_0x12b677, _0x31c3c8) {
        return _0x12b677(_0x31c3c8);
      },
      'Ydbjv': "[VoucherAuto][TEST] Clearing baseline promotion IDs.",
      'ooPuz': function (_0x573267, _0x317fbb, _0x1c4eb3) {
        return _0x573267(_0x317fbb, _0x1c4eb3);
      },
      'ziyAa': "[TEST] Baseline IDs cleared",
      'IZSvs': function (_0x6b367c, _0x3937c8) {
        return _0x6b367c(_0x3937c8);
      },
      'igBaR': function (_0x29f7fa, _0x43bae1) {
        return _0x29f7fa(_0x43bae1);
      },
      'XPHJH': function (_0x155db4, _0x1198ac) {
        return _0x155db4(_0x1198ac);
      },
      'RmlKz': function (_0x57dba0, _0x36d98e) {
        return _0x57dba0 > _0x36d98e;
      },
      'DyNSF': function (_0x21007c, _0x2bd290) {
        return _0x21007c(_0x2bd290);
      },
      'xdnOs': function (_0xa5f5c7, _0x14807c) {
        return _0xa5f5c7(_0x14807c);
      },
      'ABrRL': "percentage",
      'wbiJK': "fixed",
      'DkRUT': function (_0x21ee14, _0x5337c9) {
        return _0x21ee14 > _0x5337c9;
      },
      'hKqiC': function (_0x12c1af, _0x39cfb8) {
        return _0x12c1af * _0x39cfb8;
      },
      'bjCdi': function (_0x3bf7b7, _0x1175a4) {
        return _0x3bf7b7(_0x1175a4);
      },
      'sNDql': function (_0x5d3146, _0x7bbd00) {
        return _0x5d3146(_0x7bbd00);
      },
      'VVzXu': function (_0x51872c, _0x1ef5eb) {
        return _0x51872c >= _0x1ef5eb;
      },
      'chinz': function (_0x4dbb25, _0x4e9508) {
        return _0x4dbb25 - _0x4e9508;
      },
      'AABwv': function (_0x220ddb, _0x5bc1f7) {
        return _0x220ddb + _0x5bc1f7;
      },
      'ttKQK': function (_0x23aa70, _0x1a68f0) {
        return _0x23aa70 - _0x1a68f0;
      },
      'LLXhw': function (_0x502d8b, _0x296b67) {
        return _0x502d8b(_0x296b67);
      },
      'Nywoq': function (_0x32e84d, _0x58b460) {
        return _0x32e84d - _0x58b460;
      },
      'oCxSY': function (_0x399665, _0x15a07f) {
        return _0x399665(_0x15a07f);
      },
      'nPAdl': function (_0xda5f72, _0x4258c9) {
        return _0xda5f72 <= _0x4258c9;
      },
      'inMJT': "sales",
      'BfXPd': function (_0x524c12, _0x165f74) {
        return _0x524c12(_0x165f74);
      },
      'IKfKi': "desc",
      'udUlC': "fe.vlp.rcmd",
      'jblgN': function (_0x317e85) {
        return _0x317e85();
      },
      'RuhUY': "VoucherAuto/VLP",
      'QvxuS': function (_0x56e9a4, _0x357aff) {
        return _0x56e9a4(_0x357aff);
      },
      'ptGMA': function (_0x14bb33, _0x5b2599) {
        return _0x14bb33 === _0x5b2599;
      },
      'VZBWK': "Voucher đã được phát hiện nhưng VLP không trả về sản phẩm khả dụng.",
      'wLyid': function (_0x2b77b5, _0x316bd4) {
        return _0x2b77b5(_0x316bd4);
      },
      'iqvAi': "Promotion chưa sẵn sàng.",
      'eoyTc': function (_0x92515e, _0x20fe38) {
        return _0x92515e || _0x20fe38;
      },
      'PhsmZ': "VLP promotion error quá số lần retry.",
      'pEfuU': function (_0x21a00b, _0x4de9ec) {
        return _0x21a00b(_0x4de9ec);
      },
      'xzIcc': function (_0x1cfce6, _0x22b350) {
        return _0x1cfce6(_0x22b350);
      },
      'cBLJa': function (_0x1d34a2, _0x2c87c3) {
        return _0x1d34a2(_0x2c87c3);
      },
      'rugUi': function (_0x38a6b1, _0x210091) {
        return _0x38a6b1 === _0x210091;
      },
      'RJCSy': function (_0x460805, _0x2087a0) {
        return _0x460805 <= _0x2087a0;
      },
      'PRpJM': function (_0x370628, _0x3007b4) {
        return _0x370628 < _0x3007b4;
      },
      'TlPQc': function (_0x5eca8f, _0x4de2c0) {
        return _0x5eca8f === _0x4de2c0;
      },
      'Dlemf': function (_0x1bf9c6, _0x106d4d, _0x4c95cb) {
        return _0x1bf9c6(_0x106d4d, _0x4c95cb);
      },
      'KSOlW': function (_0x5070c6, _0xecaf56) {
        return _0x5070c6 < _0xecaf56;
      },
      'MtuYf': function (_0x5a7497, _0x99dcd6, _0x18eec4) {
        return _0x5a7497(_0x99dcd6, _0x18eec4);
      },
      'ziSsH': function (_0x30924b, _0x1faddc) {
        return _0x30924b < _0x1faddc;
      },
      'sAFNa': function (_0x308ec4, _0x5faef) {
        return _0x308ec4 - _0x5faef;
      },
      'TSDSh': function (_0x4a0acc, _0x4ad798) {
        return _0x4a0acc === _0x4ad798;
      },
      'rzQUz': function (_0x2c82fe, _0x432c43) {
        return _0x2c82fe + _0x432c43;
      },
      'DfJFw': function (_0x30361a, _0x160234) {
        return _0x30361a * _0x160234;
      },
      'uGUKb': function (_0x5c798a, _0x4109f6) {
        return _0x5c798a(_0x4109f6);
      },
      'mLCBL': function (_0x383578, _0x1057b3) {
        return _0x383578 > _0x1057b3;
      },
      'BLOyp': function (_0x48c354, _0x567ea5) {
        return _0x48c354 > _0x567ea5;
      },
      'rduIt': function (_0x9d725, _0x1a7ce0) {
        return _0x9d725 < _0x1a7ce0;
      },
      'ONBjE': function (_0x48ce5a, _0x3d4eba) {
        return _0x48ce5a <= _0x3d4eba;
      },
      'pRrYY': function (_0x4288a6, _0x21ff3d, _0x5a7875) {
        return _0x4288a6(_0x21ff3d, _0x5a7875);
      },
      'TAkfc': function (_0x2da4bf, _0x4fc54a, _0x2c5182, _0xad592e) {
        return _0x2da4bf(_0x4fc54a, _0x2c5182, _0xad592e);
      },
      'KXhut': function (_0x384293, _0x231f36) {
        return _0x384293(_0x231f36);
      },
      'XvOGZ': function (_0xb84991, _0x15645f) {
        return _0xb84991(_0x15645f);
      },
      'EGMSB': function (_0x1fb044, _0x1ae0b5) {
        return _0x1fb044(_0x1ae0b5);
      },
      'rVZce': function (_0x67cd1c, _0xd417fc) {
        return _0x67cd1c(_0xd417fc);
      },
      'eMezw': function (_0x1ddf47, _0x4e4488) {
        return _0x1ddf47(_0x4e4488);
      },
      'vsKIo': function (_0x122f3e, _0x2198d9) {
        return _0x122f3e === _0x2198d9;
      },
      'UiqRT': function (_0x3d7c3e, _0x22e73e, _0x4e6da4) {
        return _0x3d7c3e(_0x22e73e, _0x4e6da4);
      },
      'elWlQ': function (_0x3e4297) {
        return _0x3e4297();
      },
      'qZPrU': function (_0x246200, _0x2743ce) {
        return _0x246200(_0x2743ce);
      },
      'EUXfU': function (_0xc1100d, _0x124fd0) {
        return _0xc1100d - _0x124fd0;
      },
      'bClhZ': function (_0x203504, _0x466784, _0x3536f1) {
        return _0x203504(_0x466784, _0x3536f1);
      },
      'NZgHe': function (_0x388b6e, _0x5327d4) {
        return _0x388b6e(_0x5327d4);
      },
      'pacCI': function (_0x5ee0cf, _0x2eed06) {
        return _0x5ee0cf(_0x2eed06);
      },
      'pmCKC': "N/A",
      'lftft': function (_0x8f1c23, _0x3704e9) {
        return _0x8f1c23 === _0x3704e9;
      },
      'OGmCk': "SUCCESS",
      'OlNnE': function (_0x113b31, _0x4f7d06) {
        return _0x113b31(_0x4f7d06);
      },
      'cDWad': function (_0x4b5fb3, _0x13f270) {
        return _0x4b5fb3 > _0x13f270;
      },
      'fXldM': "EXPIRED",
      'clZcY': "EXECUTING_PRIMARY",
      'KAuMO': function (_0x2c5717, _0x157136, _0x5ed4be, _0x3b0655, _0x1568de) {
        return _0x2c5717(_0x157136, _0x5ed4be, _0x3b0655, _0x1568de);
      },
      'UvJit': "PRIMARY",
      'jaltR': "EXECUTING_BACKUP",
      'vvFgo': "BACKUP",
      'tWqGW': function (_0xe333f, _0x3167be, _0x181284, _0x5c190d, _0x59a3ef) {
        return _0xe333f(_0x3167be, _0x181284, _0x5c190d, _0x59a3ef);
      },
      'QzXOJ': function (_0x262d21, _0x7ae58e) {
        return _0x262d21 !== _0x7ae58e;
      },
      'DHJqA': "FAILED",
      'jtTYh': function (_0x1f961b, _0x4d202c, _0x4166e9) {
        return _0x1f961b(_0x4d202c, _0x4166e9);
      },
      'XwudW': function (_0x19364a, _0x3c59b8) {
        return _0x19364a(_0x3c59b8);
      },
      'QsCLv': function (_0x317756, _0x4777ff) {
        return _0x317756(_0x4777ff);
      },
      'uBCwn': function (_0x3e250c, _0x321141, _0x148819) {
        return _0x3e250c(_0x321141, _0x148819);
      },
      'JRGWn': "https://shopee.vn/api/v4/cart/cart_panel/get_rw",
      'VGqVO': "https://shopee.vn/api/v4/cart/cart_panel/get_pc",
      'olcII': function (_0x7f4dcf, _0x3be16f) {
        return _0x7f4dcf == _0x3be16f;
      },
      'Hftfk': "Cần xác minh captcha! Vui lòng refresh trang và thử lại.",
      'RHZSK': function (_0xf4b506, _0x4e10fd) {
        return _0xf4b506 === _0x4e10fd;
      },
      'ADyfC': function (_0x588b6d, _0x2244bd) {
        return _0x588b6d === _0x2244bd;
      },
      'ZzIPM': function (_0x4c84f1, _0x16541e) {
        return _0x4c84f1 > _0x16541e;
      },
      'PdJiF': "Mặc định",
      'BpDRX': "Error fetching stocks:",
      'UsCzy': function (_0x3b6520, _0x91745d) {
        return _0x3b6520 * _0x91745d;
      },
      'BSiMD': function (_0x2ddb31, _0x29290f) {
        return _0x2ddb31(_0x29290f);
      },
      'XxGRG': function (_0x57ee99, _0x5c40d1) {
        return _0x57ee99(_0x5c40d1);
      },
      'dlqjn': function (_0x58faf6, _0x43308a) {
        return _0x58faf6(_0x43308a);
      },
      'vWwOG': function (_0x2b7a99, _0x598e75) {
        return _0x2b7a99(_0x598e75);
      },
      'zNkXO': function (_0x5c90e6, _0x3b4b48) {
        return _0x5c90e6(_0x3b4b48);
      },
      'xsQNw': function (_0x2bc8d7, _0x509236) {
        return _0x2bc8d7(_0x509236);
      },
      'KUTAb': " [Lọc sp]",
      'SAXtP': " [Toàn shop]",
      'otlDx': function (_0x4d6c2d, _0x14db2b) {
        return _0x4d6c2d <= _0x14db2b;
      },
      'IdruR': function (_0x23d42a, _0x544ca3) {
        return _0x23d42a / _0x544ca3;
      },
      'WzvWZ': function (_0x17c829, _0x4a80c2) {
        return _0x17c829(_0x4a80c2);
      },
      'WOMQa': function (_0x2dc1c8, _0x4e94e1) {
        return _0x2dc1c8 || _0x4e94e1;
      },
      'EOyHu': "no-shop",
      'sfKiv': "single-fallback",
      'noWKh': function (_0x56fe25) {
        return _0x56fe25();
      },
      'NSZRD': function (_0x39e4ab) {
        return _0x39e4ab();
      },
      'wgrXn': function (_0x39d419, _0x4fb2a9) {
        return _0x39d419(_0x4fb2a9);
      },
      'zjvuU': function (_0x1179ea, _0x2ddf28) {
        return _0x1179ea(_0x2ddf28);
      },
      'EBQtB': function (_0x216727, _0x32a5f2) {
        return _0x216727(_0x32a5f2);
      },
      'ISuKL': function (_0x17bb87, _0x386be2) {
        return _0x17bb87(_0x386be2);
      },
      'sUEEI': ".model-option-btn.selected, .mobile-model-btn.selected",
      'aiBDS': function (_0x276257, _0x5098d5) {
        return _0x276257(_0x5098d5);
      },
      'GkrAt': function (_0x1eba87, _0x445cb3) {
        return _0x1eba87(_0x445cb3);
      },
      'hkhfA': function (_0x549a7b, _0xb293fc) {
        return _0x549a7b(_0xb293fc);
      },
      'DCoVJ': function (_0x565485, _0x4f111f) {
        return _0x565485 > _0x4f111f;
      },
      'hjref': function (_0x328478, _0x409fdd) {
        return _0x328478 > _0x409fdd;
      },
      'HBVlW': function (_0x3405d7, _0x21077e) {
        return _0x3405d7(_0x21077e);
      },
      'VxxRx': "recommend",
      'zcZqP': function (_0x25275f, _0x358184) {
        return _0x25275f(_0x358184);
      },
      'yMcgR': function (_0x495131, _0x280edc) {
        return _0x495131(_0x280edc);
      },
      'bpFAK': "setting-shop-voucher-code",
      'DRtMu': "Đã bật chế độ tự động áp dụng mã tốt nhất ngoài list.",
      'RfQhX': "setting-shop-voucher-shop-select",
      'yDtQN': "<option value=\"0\">Chưa có shop trong đơn</option>",
      'CBEKe': function (_0x1084e2, _0x2218d8) {
        return _0x1084e2(_0x2218d8);
      },
      'sVLer': function (_0x42277f, _0x4755f5) {
        return _0x42277f(_0x4755f5);
      },
      'FiAOV': function (_0x49610b, _0x509d03) {
        return _0x49610b(_0x509d03);
      },
      'uiZeL': function (_0x41cd8d, _0x1e5ef6) {
        return _0x41cd8d || _0x1e5ef6;
      },
      'brgcC': function (_0x47e284, _0x45eef3) {
        return _0x47e284 || _0x45eef3;
      },
      'ZwvxU': function (_0x3139a, _0x48915f) {
        return _0x3139a(_0x48915f);
      },
      'KUuzV': function (_0x330941, _0x5374d6) {
        return _0x330941 === _0x5374d6;
      },
      'SMjXI': "#15803d",
      'dTMmH': "#d97706",
      'AoxBT': "#dc2626",
      'KwXKV': "setting-shop-voucher-select",
      'CykWg': "shop-voucher-picker-status",
      'HipwA': "state-loading",
      'RCCJd': "state-success",
      'ISait': "state-empty",
      'mCenj': "state-error",
      'XWhCt': "<option value=\"\">Đang tải danh sách voucher shop...</option>",
      'tROaN': function (_0x51588a, _0x21e7bc) {
        return _0x51588a(_0x21e7bc);
      },
      'kDQDa': function (_0x3f2306, _0x552160) {
        return _0x3f2306(_0x552160);
      },
      'GymOw': "∅ Không dùng voucher",
      'tUItJ': function (_0x4ec64d, _0x21cba7) {
        return _0x4ec64d > _0x21cba7;
      },
      'QJkoi': function (_0x186663, _0x29dc14) {
        return _0x186663(_0x29dc14);
      },
      'nbLNv': function (_0x47cd23, _0x36bc35) {
        return _0x47cd23 === _0x36bc35;
      },
      'HBUeS': " selected",
      'JZGaV': function (_0x51225a, _0x1723f8) {
        return _0x51225a(_0x1723f8);
      },
      'IbqRj': "option[data-valid]",
      'GhhQQ': function (_0x337741, _0x497474) {
        return _0x337741(_0x497474);
      },
      'LPIbB': function (_0x37aa1b) {
        return _0x37aa1b();
      },
      'wfGkL': function (_0x1f96b8, _0x6facb) {
        return _0x1f96b8(_0x6facb);
      },
      'wlZWe': function (_0x530ea9, _0x4b3905) {
        return _0x530ea9(_0x4b3905);
      },
      'EfVtp': function (_0x5d6310, _0x2b19ec) {
        return _0x5d6310(_0x2b19ec);
      },
      'inKZd': function (_0x48762b, _0x23d11d) {
        return _0x48762b(_0x23d11d);
      },
      'iHQvN': function (_0x54c512, _0x5b8a75) {
        return _0x54c512(_0x5b8a75);
      },
      'weKaQ': function (_0x3b8ed4, _0x5ebfc6) {
        return _0x3b8ed4 > _0x5ebfc6;
      },
      'FSrmr': "không rõ",
      'uOGOS': "Chưa xác minh theo giỏ hiện tại.",
      'AxkUW': function (_0xe40d54) {
        return _0xe40d54();
      },
      'Yxunw': function (_0x3ed7a4, _0x325bed) {
        return _0x3ed7a4 > _0x325bed;
      },
      'MDvNL': function (_0x5a4d3d) {
        return _0x5a4d3d();
      },
      'kQzpw': function (_0x42a4d5) {
        return _0x42a4d5();
      },
      'EMWDX': "https://shopee.vn/api/v2/voucher_wallet/get_recommend_shop_vouchers",
      'MBrWy': "en-US,en;q=0.9,vi;q=0.8",
      'ACiiJ': "shop_voucher/list",
      'cHLrw': "Không tải được danh sách voucher shop.",
      'NqIZG': function (_0x109eae, _0x46a6e9, _0x879b90) {
        return _0x109eae(_0x46a6e9, _0x879b90);
      },
      'tRpre': "shop_voucher/list_all",
      'PlNkI': function (_0x48e340) {
        return _0x48e340();
      },
      'JgYWa': "Không tìm thấy voucher shop.",
      'WnlPI': "shop-voucher-validate-result",
      'JzfMn': function (_0x4f3697, _0x535c13) {
        return _0x4f3697(_0x535c13);
      },
      'rvwEi': "Xác minh thất bại.",
      'Dzybl': function (_0x1d84ee, _0x4e94dd) {
        return _0x1d84ee(_0x4e94dd);
      },
      'ifJpC': function (_0x35cb5c, _0x111a80) {
        return _0x35cb5c(_0x111a80);
      },
      'kcjpz': function (_0x532e8a, _0x2aea42) {
        return _0x532e8a(_0x2aea42);
      },
      'nNpwd': function (_0x54a730, _0x5ec656) {
        return _0x54a730(_0x5ec656);
      },
      'jJrnq': function (_0xf52d55, _0x222264) {
        return _0xf52d55(_0x222264);
      },
      'Tocgf': "Chưa xác minh theo sản phẩm hiện tại",
      'YnvWH': function (_0x2a7a24, _0xb253f2) {
        return _0x2a7a24(_0xb253f2);
      },
      'hKQxq': "Trình duyệt không hỗ trợ clipboard API.",
      'HvyTO': function (_0x52c42f, _0x3a3052) {
        return _0x52c42f(_0x3a3052);
      },
      'lMdSK': "Clipboard không chứa mã voucher hợp lệ.",
      'AtcwT': function (_0x490c3b) {
        return _0x490c3b();
      },
      'XVhIY': function (_0x2951ad, _0x291bfa) {
        return _0x2951ad(_0x291bfa);
      },
      'YNdau': function (_0x331b4c, _0x1316a9) {
        return _0x331b4c > _0x1316a9;
      },
      'nKwYF': function (_0xad7f43, _0x4a8a48) {
        return _0xad7f43(_0x4a8a48);
      },
      'NypLX': function (_0x53a988, _0x46179, _0x35ed9f) {
        return _0x53a988(_0x46179, _0x35ed9f);
      },
      'igmjB': function (_0x208f14) {
        return _0x208f14();
      },
      'YSKxs': function (_0x4f9cc1, _0x5650f6) {
        return _0x4f9cc1 !== _0x5650f6;
      },
      'Fnbue': "Enter",
      'LnETj': function (_0x264381, _0x5b43cd) {
        return _0x264381 === _0x5b43cd;
      },
      'rZBgo': "setting-enable-platform-voucher",
      'pQIWD': "platform-voucher-inputs",
      'uAmuK': "0|3|1|4|2",
      'xTsxw': function (_0x30f5c6) {
        return _0x30f5c6();
      },
      'CZvrQ': function (_0x4a01f8) {
        return _0x4a01f8?.();
      },
      'nXoWF': function (_0x5de1cd, _0x4fd422, _0x270de2) {
        return _0x5de1cd(_0x4fd422, _0x270de2);
      },
      'wwzGE': "setting-platform-voucher-source",
      'xBwoQ': function (_0x5efa25, _0x2843fd) {
        return _0x5efa25 - _0x2843fd;
      },
      'UHteM': "READY",
      'Peear': function (_0x50038a, _0x2dcb94) {
        return _0x50038a(_0x2dcb94);
      },
      'izmNJ': function (_0x6f7a9, _0x12eb5d) {
        return _0x6f7a9 % _0x12eb5d;
      },
      'SLGyl': ".platform-voucher-suggestion",
      'SIOyu': function (_0x532bd8, _0x238bb1) {
        return _0x532bd8(_0x238bb1);
      },
      'BPOXq': function (_0x1c2b63) {
        return _0x1c2b63();
      },
      'qrpBv': function (_0x420114, _0x46e768) {
        return _0x420114 === _0x46e768;
      },
      'PYeqE': "LOADING",
      'ewrfH': function (_0x240530, _0x21c8d4, _0x71f1be) {
        return _0x240530(_0x21c8d4, _0x71f1be);
      },
      'IRLWj': "loading",
      'zRpzb': "Đang tải dữ liệu...",
      'eYrac': function (_0x373c07, _0x1fae17) {
        return _0x373c07 === _0x1fae17;
      },
      'KqfEi': function (_0x3d9a6e, _0x58f5a9, _0x31f6d9) {
        return _0x3d9a6e(_0x58f5a9, _0x31f6d9);
      },
      'ztyFm': "Kho mã tải thất bại. Chỉ hỗ trợ nhập link voucher. Đóng và mở lại mục Đặt đơn để tải lại dữ liệu.",
      'PKpjm': "https://shopee.vn/api/v2/voucher_wallet/get_user_voucher_list",
      'SkHLv': "XMLHttpRequest",
      'ssJPn': "voucher_microsite_link",
      'TbSVC': function (_0x35941b, _0x4cbbd2, _0x284175) {
        return _0x35941b(_0x4cbbd2, _0x284175);
      },
      'zthHl': function (_0x2ae7a3, _0x285264) {
        return _0x2ae7a3(_0x285264);
      },
      'ApDKA': function (_0x5a9871, _0x4a99b3) {
        return _0x5a9871 !== _0x4a99b3;
      },
      'Gryfq': "warning",
      'ftUmi': function (_0x10c06e) {
        return _0x10c06e();
      },
      'DXpSR': function (_0x59da1b, _0x331b1d) {
        return _0x59da1b(_0x331b1d);
      },
      'mjfdd': "wallet_cache",
      'eeVkR': function (_0x1743fd) {
        return _0x1743fd();
      },
      'THbbW': "setting-platform-voucher-input",
      'pibVW': function (_0x27e99a, _0x51f027) {
        return _0x27e99a === _0x51f027;
      },
      'ZSfmT': "banner",
      'oDble': function (_0x1627f0, _0x4dc538) {
        return _0x1627f0 === _0x4dc538;
      },
      'uTmpI': "setting-platform-voucher-paste-btn",
      'jUrny': function (_0x5f1796, _0x4fe7aa) {
        return _0x5f1796 === _0x4fe7aa;
      },
      'rViOx': "Nhập link hoặc tên voucher Shopee...",
      'qhVuW': function (_0x1b6509, _0x31a8f8) {
        return _0x1b6509 === _0x31a8f8;
      },
      'UxPUH': function (_0x23ae69) {
        return _0x23ae69();
      },
      'eWMhK': function (_0x4a9c5d, _0xc0d8c) {
        return _0x4a9c5d === _0xc0d8c;
      },
      'Xbgoe': function (_0x1fdfce, _0x30cce9, _0x26932d) {
        return _0x1fdfce(_0x30cce9, _0x26932d);
      },
      'jIIGB': function (_0xc3f20a, _0xc7f8bc, _0x183d92, _0x635404) {
        return _0xc3f20a(_0xc7f8bc, _0x183d92, _0x635404);
      },
      'hPAGq': function (_0x1790b0, _0x259f82) {
        return _0x1790b0 !== _0x259f82;
      },
      'tklqV': function (_0x744d1c, _0x844ac9) {
        return _0x744d1c === _0x844ac9;
      },
      'PYAuO': "5|3|2|0|1|4",
      'touEL': "AbortError",
      'WybNU': "Quá thời gian 20 giây.",
      'wYfVK': function (_0x68c4f1) {
        return _0x68c4f1();
      },
      'TBlXN': "voucher_checker",
      'HCiWM': function (_0x4ae264, _0x4a8a4e) {
        return _0x4ae264(_0x4a8a4e);
      },
      'RItlx': "Thiếu tên voucher Shopee.",
      'dNZtz': function (_0x37e66b) {
        return _0x37e66b();
      },
      'kVkKL': function (_0x38cb2a, _0x54c4e1, _0x46e7d7) {
        return _0x38cb2a(_0x54c4e1, _0x46e7d7);
      },
      'ZWboi': "https://shopee.vn/api/v2/voucher_wallet/save_voucher",
      'CnbhF': "platform_voucher/save_voucher",
      'AqHoo': "Shopee chặn lưu voucher, dừng đặt đơn.",
      'zLjvF': "Bạn dính lỗi spam, vui lòng thử lại sau ít nhất 15 phút.",
      'lCgOH': function (_0xd951fd, _0x18d048) {
        return _0xd951fd === _0x18d048;
      },
      'yCMXR': function (_0x31f1cd, _0x9418dd) {
        return _0x31f1cd === _0x9418dd;
      },
      'jeAay': function (_0x9c4318, _0xf16019) {
        return _0x9c4318(_0xf16019);
      },
      'ALAgi': function (_0x4b7dab, _0x3b92b3) {
        return _0x4b7dab(_0x3b92b3);
      },
      'VbcvB': "save_voucher",
      'BIykD': "Voucher đã lưu trước đó.",
      'RnCvj': "Lưu voucher thành công.",
      'MoPaD': function (_0x4ac119, _0x21f2a0) {
        return _0x4ac119 != _0x21f2a0;
      },
      'diKIG': "Chưa lưu được voucher Shopee.",
      'qvTPP': function (_0x116258, _0x4e0dc8) {
        return _0x116258(_0x4e0dc8);
      },
      'qtzra': "lưu thành công",
      'PgEyD': function (_0x3d42b3, _0x18f6fc) {
        return _0x3d42b3(_0x18f6fc);
      },
      'UptFa': function (_0x5208a5, _0x17772e) {
        return _0x5208a5 || _0x17772e;
      },
      'BjABn': "Không lưu được voucher Shopee.",
      'tHMsd': function (_0x2946c1, _0x40d697) {
        return _0x2946c1(_0x40d697);
      },
      'VujjD': function (_0x15eb25, _0x51efdf) {
        return _0x15eb25(_0x51efdf);
      },
      'BRaSi': function (_0x364461, _0x4c0f84) {
        return _0x364461(_0x4c0f84);
      },
      'yQPmx': "no-store",
      'mebEr': "no-cache",
      'sRutA': function (_0x218e24, _0xeec287, _0x41f78c) {
        return _0x218e24(_0xeec287, _0x41f78c);
      },
      'yCzqa': "SS6/banner",
      'ZCOtr': "Không tải được banner.",
      'aomAe': function (_0x4110cd, _0x1494df) {
        return _0x4110cd(_0x1494df);
      },
      'KgFGw': function (_0x1fac4b, _0x308aac) {
        return _0x1fac4b(_0x308aac);
      },
      'jOHbN': function (_0x17eb15) {
        return _0x17eb15();
      },
      'UDCNW': function (_0xbdb293, _0x5091df, _0x2a437b) {
        return _0xbdb293(_0x5091df, _0x2a437b);
      },
      'lWCXw': "https://shopee.vn/api/v1/microsite/get_vouchers_by_collections",
      'GPvTU': "SS6/banner_vouchers",
      'WGASZ': "Không tải được voucher trên banner.",
      'iWfVc': function (_0x2fe4dc, _0x4ea81a) {
        return _0x2fe4dc * _0x4ea81a;
      },
      'aqHKg': function (_0x2c11cc, _0x15129f) {
        return _0x2c11cc >= _0x15129f;
      },
      'Nkxpe': function (_0x845168, _0x3b07b5) {
        return _0x845168 + _0x3b07b5;
      },
      'yltgY': function (_0xad924f, _0x50c060) {
        return _0xad924f === _0x50c060;
      },
      'qdLJW': function (_0x368ad1, _0x1160ac) {
        return _0x368ad1 / _0x1160ac;
      },
      'bWUTv': function (_0x3a6b8c, _0x45a8d6) {
        return _0x3a6b8c % _0x45a8d6;
      },
      'ZeAeh': function (_0x6cf695, _0x38ab9d) {
        return _0x6cf695(_0x38ab9d);
      },
      'OqdKK': function (_0x3200c9, _0x4fdaef) {
        return _0x3200c9(_0x4fdaef);
      },
      'oJmXx': function (_0x1dff18) {
        return _0x1dff18();
      },
      'uPEEr': function (_0x4e56f7, _0x4c262e) {
        return _0x4e56f7 / _0x4c262e;
      },
      'LxCDg': function (_0x4c9322) {
        return _0x4c9322();
      },
      'eKLqB': "span",
      'AZITQ': "#999",
      'GiRqu': "platform-banner-status",
      'ZSRvu': function (_0x3e1f5f, _0x16b630) {
        return _0x3e1f5f(_0x16b630);
      },
      'fKuuT': function (_0x1e701a, _0x13b836) {
        return _0x1e701a(_0x13b836);
      },
      'SQZbt': "❌ Banner không còn thay đổi.",
      'EaKeI': "7px",
      'ynctv': "scanning",
      'NJErT': "Đang quét banner...",
      'FnWsI': function (_0x2f42a8, _0x512d99) {
        return _0x2f42a8 === _0x512d99;
      },
      'AyZtK': "completed",
      'WdiNZ': "Đã hoàn tất quét banner.",
      'oeaTG': function (_0x989b2f, _0x4efc64) {
        return _0x989b2f === _0x4efc64;
      },
      'lLERd': "stopped",
      'JOirx': "Đã dừng.",
      'URhQW': "Không thể tiếp tục quét banner.",
      'VPAbJ': function (_0x382cef, _0x3700df) {
        return _0x382cef !== _0x3700df;
      },
      'nQaLB': function (_0x4b610d, _0x29928f) {
        return _0x4b610d === _0x29928f;
      },
      'oDRXn': "test",
      'FvCYl': "smart",
      'SSlwm': "input[name=\"platform-banner-mode\"][value=\"smart\"]",
      'LwRhv': "idle",
      'JjpYQ': function (_0x3ea9f4, _0x3a4a8a) {
        return _0x3ea9f4 === _0x3a4a8a;
      },
      'nCMXY': "waiting",
      'aKOwb': "Đã dừng SS6.",
      'ZvFIx': "Không có dữ liệu banner để chạy SS6.",
      'rKMDS': function (_0x164272, _0x3d04b7) {
        return _0x164272 - _0x3d04b7;
      },
      'sZpxX': function (_0x2dba47, _0x200425) {
        return _0x2dba47(_0x200425);
      },
      'alWHs': function (_0x5d2414, _0x446de1) {
        return _0x5d2414 * _0x446de1;
      },
      'tdcrz': function (_0x432827, _0x5ac14f) {
        return _0x432827(_0x5ac14f);
      },
      'MXGrH': function (_0x5b616c, _0x138c22) {
        return _0x5b616c - _0x138c22;
      },
      'rtWSm': function (_0x369f5e) {
        return _0x369f5e();
      },
      'eSQUS': "Smart Mode: Banner không còn lịch thay đổi, bắt đầu quét ngay mỗi 3 giây.",
      'ltlIn': function (_0x30fc48) {
        return _0x30fc48();
      },
      'pRSlJ': function (_0x267d10, _0x47d7ed) {
        return _0x267d10 <= _0x47d7ed;
      },
      'ZAkLC': function (_0x41a859, _0x25e6f0) {
        return _0x41a859(_0x25e6f0);
      },
      'Heqjk': function (_0x4879be, _0x4f5216) {
        return _0x4879be === _0x4f5216;
      },
      'FJRti': "number",
      'FzWiE': "SS6 không trả về voucher Shopee hợp lệ (shop_id = 0, error 0/5, đủ promotionid và voucher_code).",
      'UifaM': "autobuy-toggle-log-btn",
      'WkvpQ': "Ẩn log",
      'GsNSS': "Hiện log",
      'ZDJWo': "fa-eye",
      'CqxPH': "fa-eye-slash",
      'zgiFQ': "autobuy-image-preview-modal",
      'RJfOO': "autobuy-image-preview-img",
      'TvIEB': "7|2|0|4|6|1|5|3",
      'JYnZQ': "autobuy-source-tab-order",
      'CXfxx': function (_0xbe58a9, _0x4a735d) {
        return _0xbe58a9 === _0x4a735d;
      },
      'vasfZ': "order",
      'wUnLO': "autobuy-order-pane",
      'ztpOt': "autobuy-source-tab-url",
      'nsfZS': function (_0x1b00cf, _0x2773b5) {
        return _0x1b00cf === _0x2773b5;
      },
      'QlDjp': "url",
      'fscMu': "cart",
      'VaStZ': "autobuy-cart-pane",
      'TECcG': function (_0x590f79, _0x5dfeba) {
        return _0x590f79 === _0x5dfeba;
      },
      'wBONV': "autobuy-voucher-pane",
      'lmwkl': function (_0x2f88a6, _0x23ab43) {
        return _0x2f88a6 === _0x23ab43;
      },
      'QVvlm': "voucher",
      'MuKZb': "autobuy-url-pane",
      'EOziP': function (_0x51d355, _0x176fb2) {
        return _0x51d355 === _0x176fb2;
      },
      'Fizrs': "autobuy-source-tab-cart",
      'gHgeE': function (_0x441b96, _0x5d4699) {
        return _0x441b96 === _0x5d4699;
      },
      'FqHYV': ".autobuy-modal-container",
      'nBYZa': "autobuy-mode-title",
      'dCMqQ': "voucher-auto-only",
      'AfKYb': "<i class=\"fas fa-ticket-alt\"></i> Voucher tự động",
      'YEoVS': "<i class=\"fas fa-shopping-cart\"></i> Đặt đơn tự động",
      'QdSGm': function (_0x15f8a7, _0x1290b2) {
        return _0x15f8a7(_0x1290b2);
      },
      'kTKcG': function (_0x36082b, _0x4eb4b3) {
        return _0x36082b === _0x4eb4b3;
      },
      'GveTg': ".voucher-payment-select-container",
      'BHcpk': "voucher-payment-options-dropdown",
      'cRmOF': "voucher-setting-payment-method",
      'fSxQI': "change",
      'EusPG': function (_0x4fc811) {
        return _0x4fc811();
      },
      'kxHCI': function (_0x598caf) {
        return _0x598caf();
      },
      'RxPdL': "voucher-setting-use-schedule",
      'PHztB': "voucher-schedule-inputs",
      'eVtgT': "voucher-auto-rules",
      'xSVOV': "voucher-auto-rule-row",
      'FqYKz': "voucher-auto-shop-input",
      'WAxhV': function (_0xe10273, _0x5153bc) {
        return _0xe10273(_0x5153bc);
      },
      'AGtfv': "Kiểm tra thông tin shop...",
      'ZXeyu': function (_0x10f8b3, _0x24ac10) {
        return _0x10f8b3(_0x24ac10);
      },
      'DQDVA': "Shop API không trả shopid hợp lệ.",
      'MAsHM': "voucher-auto-shop-card",
      'HevBn': function (_0x33ebac, _0x4f8bb5) {
        return _0x33ebac(_0x4f8bb5);
      },
      'nGCdU': "Shop",
      'lunBT': function (_0x28d3f1, _0x5fb585) {
        return _0x28d3f1(_0x5fb585);
      },
      'RoWqc': function (_0x36c7ea, _0x41236e) {
        return _0x36c7ea(_0x41236e);
      },
      'SVrME': function (_0x12cc99, _0x234f32) {
        return _0x12cc99(_0x234f32);
      },
      'ombXs': function (_0x498593, _0x14446c) {
        return _0x498593 <= _0x14446c;
      },
      'FZddP': "autobuy-cart-load-more-btn",
      'XCSmK': "⟳ Đang tải...",
      'bGhHQ': "https://shopee.vn/api/v4/cart/get",
      'HTddP': "Không thể tải thêm sản phẩm.",
      'furfi': "cart/get:more",
      'PwzMM': "Lỗi tải thêm sản phẩm giỏ.",
      'UyaWR': "⟳ Tải thêm sản phẩm",
      'TJQaf': "[AUTO_ORDER][ORDER_SUMMARY]",
      'KAOzr': "[AUTO_ORDER][ORDER_SUMMARY][ERROR]",
      'oqwdD': function (_0x10144b) {
        return _0x10144b();
      },
      'mDuqV': "Không tìm thấy sản phẩm trong giỏ.",
      'HGeNi': function (_0x260dca, _0x3af17c) {
        return _0x260dca(_0x3af17c);
      },
      'UWoZq': function (_0x2cf7ef, _0x5109b5) {
        return _0x2cf7ef(_0x5109b5);
      },
      'AdZyq': function (_0x3cb6ed, _0x525125) {
        return _0x3cb6ed(_0x525125);
      },
      'Ppwbd': "remove_gift_from_order",
      'sPSjF': "Đã xóa quà tặng khỏi danh sách đơn.",
      'Gobkv': function (_0x139353, _0x2ddf6d) {
        return _0x139353 / _0x2ddf6d;
      },
      'Wigbk': function (_0xf41e55, _0x9e13ec) {
        return _0xf41e55(_0x9e13ec);
      },
      'rHOzx': function (_0x33caf7, _0x13add6) {
        return _0x33caf7(_0x13add6);
      },
      'hgTGz': function (_0x5a72cc, _0x280707) {
        return _0x5a72cc >= _0x280707;
      },
      'BxHCo': "Dữ liệu nhóm add_on_deal không hợp lệ.",
      'vowPj': function (_0x13f692, _0x372345) {
        return _0x13f692 > _0x372345;
      },
      'BTjTL': "add_cart_item_to_order",
      'OjAZi': function (_0x5d5da6, _0x2c9f8c) {
        return _0x5d5da6(_0x2c9f8c);
      },
      'xLHxa': function (_0x38c160, _0x438277) {
        return _0x38c160 > _0x438277;
      },
      'PrhqX': function (_0x3180d9, _0x121ac2) {
        return _0x3180d9(_0x121ac2);
      },
      'fuxdn': function (_0x361fdc, _0x4ebdc2) {
        return _0x361fdc(_0x4ebdc2);
      },
      'nIZbX': function (_0x2312a3, _0x14376e) {
        return _0x2312a3(_0x14376e);
      },
      'VvyqA': " order-item-row-gift",
      'KmlvF': " order-item-row-oos",
      'oayzm': "<div class=\"order-item-stock\" style=\"color:#dc2626;font-weight:700;\">⚠️ Hết hàng</div>",
      'YnWuD': function (_0x3588fe, _0x126fc5) {
        return _0x3588fe > _0x126fc5;
      },
      'ALKVx': function (_0xcd8868, _0x3bf54c) {
        return _0xcd8868(_0x3bf54c);
      },
      'GtHmj': "Không đủ điều kiện áp dụng",
      'dlHUg': function (_0xe2173a, _0x2fa71e) {
        return _0xe2173a(_0x2fa71e);
      },
      'BtnIN': "Đã áp dụng",
      'TppuM': function (_0x49e383, _0x5bd0df) {
        return _0x49e383(_0x5bd0df);
      },
      'Refsh': "order-items-list",
      'laGXf': "order-items-count",
      'fpNyc': "autobuy-order-badge",
      'ELNsO': "<div class=\"order-item-empty\">Chưa có sản phẩm trong danh sách đơn.</div>",
      'PmMTz': function (_0x1ae2f3, _0x4905cc) {
        return _0x1ae2f3 > _0x4905cc;
      },
      'EfGvP': function (_0x5a354f, _0x5b8feb) {
        return _0x5a354f(_0x5b8feb);
      },
      'eLLZN': function (_0x595976, _0x1907cd) {
        return _0x595976 > _0x1907cd;
      },
      'louGu': function (_0x4645f5, _0x22b147) {
        return _0x4645f5 / _0x22b147;
      },
      'FoOqM': function (_0x51f76e, _0xb0c35c) {
        return _0x51f76e > _0xb0c35c;
      },
      'rgQVf': function (_0x458fa8, _0x5e1b6e) {
        return _0x458fa8 - _0x5e1b6e;
      },
      'ZiuCn': function (_0x14fa01, _0x271fd7) {
        return _0x14fa01 + _0x271fd7;
      },
      'KoCCz': function (_0x335c28) {
        return _0x335c28();
      },
      'UvXfb': function (_0x523c95) {
        return _0x523c95();
      },
      'bkrJX': function (_0x13385f) {
        return _0x13385f();
      },
      'YzKxP': function (_0x10e306, _0x27afb1) {
        return _0x10e306(_0x27afb1);
      },
      'PsSUa': function (_0x54c6b9, _0x5757df, _0x27aa8c) {
        return _0x54c6b9(_0x5757df, _0x27aa8c);
      },
      'EIlCI': function (_0x514d0e) {
        return _0x514d0e();
      },
      'MpGkc': function (_0x5bb6cb, _0x1abfda) {
        return _0x5bb6cb === _0x1abfda;
      },
      'etrTD': "https://shopee.vn/api/v4/checkout/get",
      'eOwLW': function (_0xffd0b8, _0x4172aa, _0x10e8c5) {
        return _0xffd0b8(_0x4172aa, _0x10e8c5);
      },
      'ruDZG': "checkout/get:preview",
      'BMWUa': function (_0x972db, _0x151de7, _0x540f3f) {
        return _0x972db(_0x151de7, _0x540f3f);
      },
      'FiEuA': "Không tải được thông tin đơn hàng.",
      'OZdGA': "Lỗi kết nối.",
      'HsPTl': function (_0x255ee1) {
        return _0x255ee1();
      },
      'pHulF': function (_0x3fb699, _0x21233e) {
        return _0x3fb699(_0x21233e);
      },
      'HJJNd': function (_0x351b0b, _0x59da45) {
        return _0x351b0b(_0x59da45);
      },
      'fTiZO': function (_0x173ff9, _0x203f06) {
        return _0x173ff9(_0x203f06);
      },
      'IYncv': function (_0x2fdf48, _0x13b6d6) {
        return _0x2fdf48 > _0x13b6d6;
      },
      'ZwCLF': function (_0xb2bb4a, _0x2672c2) {
        return _0xb2bb4a !== _0x2672c2;
      },
      'xmIOb': function (_0x70305a) {
        return _0x70305a?.();
      },
      'ZHTlO': "autobuy-url-input",
      'BIKsN': "Lỗi đọc clipboard: ",
      'ktGpb': function (_0x4fcf13, _0x3810e7) {
        return _0x4fcf13 === _0x3810e7;
      },
      'ZKYzg': function (_0x1eaa7a, _0x178c98) {
        return _0x1eaa7a(_0x178c98);
      },
      'uixzp': "Trình duyệt của bạn không hỗ trợ tính năng Web Notifications!",
      'lbuZZ': "denied",
      'mKPEC': "Quyền thông báo đang bị chặn. Vui lòng vào Cài đặt trang web trên trình duyệt để Cho phép thông báo!",
      'GxPAo': function (_0x32909b, _0x34ffef) {
        return _0x32909b !== _0x34ffef;
      },
      'iQdGo': function (_0x155a61, _0x510068) {
        return _0x155a61 !== _0x510068;
      },
      'cnVnn': "Shopee Tool",
      'ALcuY': "Đã bật thông báo đặt hàng thành công!",
      'cVmAI': "advanced-settings-modal",
      'tHzXt': function (_0x1b735a, _0x2fd50e) {
        return _0x1b735a === _0x2fd50e;
      },
      'lTrVP': "hidden",
      'DWucq': ".advanced-modal-body",
      'mXaSG': "wheel",
      'bmDVf': "setting-delay",
      'zFzwU': "setting-max-retries",
      'AnWjd': "setting-post-cart-retries",
      'gAXqK': "max-retries-help",
      'kEnOL': "setting-enable-shop-voucher",
      'lBgkB': function (_0xd0669b) {
        return _0xd0669b();
      },
      'hrlvy': function (_0x2e4b74, _0x15473c) {
        return _0x2e4b74(_0x15473c);
      },
      'qxazr': "0|5|2|4|6|1|3",
      'lLRwa': "shopee-voucher-setting-group",
      'VFwDL': "setting-platform-banner-slug",
      'BjiIN': "3|5|1|8|0|2|9|4|11|6|10|7",
      'DXmAg': "setting-wait-price",
      'vLIEW': "setting-only-add-to-cart",
      'QiTyO': "setting-use-coins",
      'FSiTb': function (_0x156dae, _0x54b5a7) {
        return _0x156dae === _0x54b5a7;
      },
      'BLqeO': "price-check-cart",
      'wZIOU': function (_0x1d8719, _0x1f7680) {
        return _0x1d8719 === _0x1f7680;
      },
      'YrdFM': "product",
      'UlpRV': "price-check-product",
      'yNBAr': "price-check-checkout",
      'vcvxQ': "setting-skip-cart",
      'lIdWZ': "setting-use-schedule",
      'wicsw': function (_0x2ddd56) {
        return _0x2ddd56();
      },
      'IEzOc': function (_0x2f5dce) {
        return _0x2f5dce();
      },
      'yLuWh': "schedule-hour",
      'gPhnj': "schedule-minute",
      'DegNu': "schedule-second",
      'pbaBC': function (_0x849835, _0x28e68b) {
        return _0x849835(_0x28e68b);
      },
      'CElDD': function (_0x4e7930, _0x505912) {
        return _0x4e7930(_0x505912);
      },
      'ByiZK': "setting-enable-telegram",
      'RrelJ': "setting-telegram-token",
      'xtJXD': "setting-telegram-chatid",
      'NopNG': "setting-enable-browser-notification",
      'tnhNX': function (_0x416472, _0x45d6c6) {
        return _0x416472 !== _0x45d6c6;
      },
      'RppXh': function (_0x3bc903, _0x568cad) {
        return _0x3bc903 === _0x568cad;
      },
      'cIYYj': function (_0x5b95cf) {
        return _0x5b95cf();
      },
      'SEJGP': "advanced-settings-help-modal",
      'NQRCi': function (_0x2be0db, _0xd00fa6) {
        return _0x2be0db !== _0xd00fa6;
      },
      'FZeWp': "schedule-inputs",
      'vhXZN': "telegram-inputs",
      'xAjqs': function (_0x37aa97, _0x495c5e) {
        return _0x37aa97(_0x495c5e);
      },
      'JVpYT': function (_0x16cefc, _0x21c945, _0x1518a6, _0x4ba6d9, _0x5afb72) {
        return _0x16cefc(_0x21c945, _0x1518a6, _0x4ba6d9, _0x5afb72);
      },
      'OswhO': function (_0x4fa095, _0x381aae, _0xd967d3, _0x44ff46, _0x2878b1) {
        return _0x4fa095(_0x381aae, _0xd967d3, _0x44ff46, _0x2878b1);
      },
      'BPnnm': function (_0x49c1b0) {
        return _0x49c1b0();
      },
      'qjUdA': function (_0x21f1ae, _0x519bd4) {
        return _0x21f1ae === _0x519bd4;
      },
      'PMKqT': "input[name=\"platform-banner-mode\"]:checked",
      'fOvPg': function (_0x1d3f25, _0x28fdb3) {
        return _0x1d3f25 === _0x28fdb3;
      },
      'nZsRw': function (_0x836d2b, _0xc49902) {
        return _0x836d2b === _0xc49902;
      },
      'bfJjR': "4|2|1|3|0",
      'xaZPC': function (_0x43ccbd, _0x529b3d) {
        return _0x43ccbd(_0x529b3d);
      },
      'vGJNT': function (_0x24b7fa, _0x44cf8e) {
        return _0x24b7fa(_0x44cf8e);
      },
      'oVIid': function (_0xd2d4e, _0x38c2e5) {
        return _0xd2d4e(_0x38c2e5);
      },
      'DogHc': function (_0x3d0ec7, _0x446efc) {
        return _0x3d0ec7(_0x446efc);
      },
      'PXQwr': function (_0xc52440, _0x5d36d9) {
        return _0xc52440(_0x5d36d9);
      },
      'rPjyy': "Voucher Shopee đã bật nên bắt buộc nhập link hoặc tên voucher.",
      'BoyMb': function (_0x5c2d1b) {
        return _0x5c2d1b();
      },
      'ZJwAa': function (_0x10bd47, _0x151bb6) {
        return _0x10bd47 === _0x151bb6;
      },
      'Qhivj': "Kho voucher Shopee đang tải. Vui lòng chờ hoàn tất.",
      'yamgc': "Không phát hiện ra link mã, bạn cần kiểm tra lại trước khi bấm bắt đầu!!!",
      'OFnHn': function (_0x3a8397) {
        return _0x3a8397();
      },
      'iYgSY': function (_0x3a0f4a, _0x1c2b68) {
        return _0x3a0f4a !== _0x1c2b68;
      },
      'AeyrU': "Voucher Shopee đang kiểm tra. Vui lòng chờ quét xong rồi bấm lưu lại.",
      'DRnpY': function (_0x461165, _0x500b43) {
        return _0x461165 === _0x500b43;
      },
      'oijUf': "Banner chưa tải xong. Vui lòng chọn lại banner và chờ thông tin hiển thị.",
      'sPZtK': function (_0x14a042, _0x1c6c2c) {
        return _0x14a042 === _0x1c6c2c;
      },
      'dZwgd': "Test Mode",
      'xTzeg': "Lưu mới — Tự động thông minh",
      'gVkem': "8|6|7|2|0|1|5|4|3",
      'PpPEj': "setting-payment-method",
      'KFzHd': function (_0x442c1c) {
        return _0x442c1c();
      },
      'apdsy': function (_0x4ade3f, _0x267ace, _0x1a3e53, _0x52177f, _0x26daec) {
        return _0x4ade3f(_0x267ace, _0x1a3e53, _0x52177f, _0x26daec);
      },
      'hiUoH': function (_0x2058e2, _0x4287b6, _0x1dee59, _0x39abe8, _0x598049) {
        return _0x2058e2(_0x4287b6, _0x1dee59, _0x39abe8, _0x598049);
      },
      'UcMdk': function (_0x17c51f, _0x4401c6) {
        return _0x17c51f(_0x4401c6);
      },
      'bjWuz': "Auto ngoài list",
      'EbGDO': "Bật",
      'LemsS': "Tắt",
      'SetSh': "Tiền mặt",
      'eHIcu': function (_0xe376a3) {
        return _0xe376a3();
      },
      'wuqKV': function (_0x120e2d) {
        return _0x120e2d();
      },
      'lROWd': function (_0x14cd32, _0xf12880) {
        return _0x14cd32 + _0xf12880;
      },
      'UUQNt': function (_0x43d5ec, _0x463345) {
        return _0x43d5ec / _0x463345;
      },
      'bdtKJ': function (_0x27c762, _0x5e2098) {
        return _0x27c762 + _0x5e2098;
      },
      'abPTi': function (_0x295ec1, _0x4456ba) {
        return _0x295ec1 + _0x4456ba;
      },
      'Ymwbj': function (_0xc28285, _0x187e25, _0xce485b, _0xc5316a) {
        return _0xc28285(_0x187e25, _0xce485b, _0xc5316a);
      },
      'gHoYE': "&quot;",
      'pgMAO': function (_0x39e1cb, _0x2763bc) {
        return _0x39e1cb === _0x2763bc;
      },
      'xtfCP': "selected",
      'muCUC': "autobuy-content",
      'EGgdV': "Vui lòng nhập URL sản phẩm!",
      'bikdr': "<div style=\"text-align:center; padding:30px;\"><p>Đang tải dữ liệu...</p></div>",
      'nprvN': function (_0x409c5d, _0x4819ee) {
        return _0x409c5d(_0x4819ee);
      },
      'JFclv': "URL không hợp lệ hoặc không phải Shopee.",
      'FJTYa': "Không tìm thấy thông tin sản phẩm.",
      'KJaSD': function (_0x305149, _0x45c62c) {
        return _0x305149(_0x45c62c);
      },
      'QabTp': "get_rw",
      'GzSaP': "get_pc",
      'TrjQT': "pdp/get",
      'BhFxq': "Không thể lấy dữ liệu từ link.",
      'lfuEL': "Sản phẩm không có phân loại hàng.",
      'Dgnyw': "Đang lấy thông tin kho hàng...",
      'AEqjH': function (_0x6cd3bd) {
        return _0x6cd3bd();
      },
      'INAvI': function (_0x2143d0, _0x306f28, _0xfe2596, _0x3c6bec, _0x25ba27) {
        return _0x2143d0(_0x306f28, _0xfe2596, _0x3c6bec, _0x25ba27);
      },
      'TUDDh': "Đã lấy xong thông tin kho hàng",
      'VnsfA': function (_0x1d58fa, _0x3f1f9b) {
        return _0x1d58fa(_0x3f1f9b);
      },
      'OsJJg': function (_0x101599, _0x5c142e) {
        return _0x101599 > _0x5c142e;
      },
      'ZLeKv': function (_0x1c6569, _0x3cf018) {
        return _0x1c6569(_0x3cf018);
      },
      'bbpbX': function (_0x4d59bd, _0x37efa7) {
        return _0x4d59bd(_0x37efa7);
      },
      'muEMs': function (_0x2b9ff6, _0x10601e) {
        return _0x2b9ff6 > _0x10601e;
      },
      'VXJJn': function (_0xe30253, _0x50f867) {
        return _0xe30253(_0x50f867);
      },
      'IZyhR': "https://down-vn.img.susercontent.com/file/",
      'cxarK': function (_0x177342, _0x361971) {
        return _0x177342 / _0x361971;
      },
      'HVOsu': function (_0x5be476, _0x4b83d4) {
        return _0x5be476 > _0x4b83d4;
      },
      'dvvfI': function (_0x17452d, _0x23a3ad) {
        return _0x17452d * _0x23a3ad;
      },
      'CVvac': function (_0x482bb8, _0x54b744) {
        return _0x482bb8 - _0x54b744;
      },
      'LeANL': function (_0x2c0564, _0x22f9cb) {
        return _0x2c0564 / _0x22f9cb;
      },
      'bCphr': function (_0x32235f, _0x596ba3) {
        return _0x32235f(_0x596ba3);
      },
      'AiqeS': "out-of-stock",
      'YKOAI': function (_0x5ebe12, _0x500be3) {
        return _0x5ebe12(_0x500be3);
      },
      'xnxLQ': function (_0x3d99ae) {
        return _0x3d99ae();
      },
      'ADlTx': "Vui lòng kiểm tra sản phẩm và thêm vào danh sách đơn.",
      'KYPgd': function (_0xfb70de, _0x5b1d44) {
        return _0xfb70de(_0x5b1d44);
      },
      'xTLcO': function (_0x3b2a9e, _0x1d4e86) {
        return _0x3b2a9e > _0x1d4e86;
      },
      'JAxbl': function (_0xcc5425, _0x15e59a) {
        return _0xcc5425 === _0x15e59a;
      },
      'HKwfZ': function (_0x77353a, _0x138b41) {
        return _0x77353a(_0x138b41);
      },
      'GwEhN': function (_0x1c70ab, _0x3966cd) {
        return _0x1c70ab(_0x3966cd);
      },
      'ACWtq': "Voucher shop chưa xác minh. Vào Nâng cao để xác minh mã.",
      'wBAif': function (_0x47e859, _0x2a1ff9, _0x586d21, _0x4aa0d4) {
        return _0x47e859(_0x2a1ff9, _0x586d21, _0x4aa0d4);
      },
      'garmj': "Thiếu voucher shop",
      'uATwt': "Bạn đã bật Voucher shop nhưng chưa xác minh. Vui lòng mở Nâng cao và bấm Xác minh trước khi đặt đơn.",
      'qhxYs': function (_0x438175, _0x14596b) {
        return _0x438175(_0x14596b);
      },
      'kZaaY': "Mã voucher đã thay đổi, cần xác minh lại.",
      'LHDUO': function (_0x377527, _0x122bc2, _0x5342d2, _0x59a379) {
        return _0x377527(_0x122bc2, _0x5342d2, _0x59a379);
      },
      'bWqnP': "Voucher không khớp",
      'Glhnq': "Mã voucher hiện tại khác với mã đã xác minh. Vui lòng xác minh lại trong Nâng cao.",
      'Ndfbs': function (_0x57132b, _0x404dbd) {
        return _0x57132b !== _0x404dbd;
      },
      'Vihfh': "Voucher shop không thuộc shop của sản phẩm đang chọn.",
      'zAXiD': "Sai shop voucher",
      'feOBU': "Voucher đã xác minh không thuộc shop của sản phẩm hiện tại. Vui lòng xác minh lại voucher đúng shop.",
      'XWWAu': function (_0x3c56ec, _0x3664bc) {
        return _0x3c56ec !== _0x3664bc;
      },
      'zYNNE': "Voucher chưa xác minh cho đúng sản phẩm/phân loại hiện tại.",
      'tQyIv': "Cần xác minh lại voucher",
      'xYbaa': "Bạn đã đổi sản phẩm hoặc phân loại. Vui lòng xác minh lại voucher shop trước khi đặt đơn.",
      'NyTUk': "không áp dụng cho sản phẩm hiện tại",
      'BmPgn': "Voucher shop: bật chế độ tự động áp dụng mã tốt nhất ngoài list preload.",
      'WmfXo': function (_0x100558, _0x234c2b) {
        return _0x100558 > _0x234c2b;
      },
      'eBhij': function (_0x24e96b, _0x550d90) {
        return _0x24e96b === _0x550d90;
      },
      'ynMBD': "Kho voucher Shopee vẫn đang tải.",
      'pBmZM': "Đang tải kho voucher",
      'kFwaa': "Vui lòng chờ kho voucher tải xong rồi bắt đầu.",
      'brSMY': function (_0x18c7e2, _0x499f99) {
        return _0x18c7e2 === _0x499f99;
      },
      'ygseE': "Voucher Shopee đã bật nhưng chưa nhập link hoặc tên mã.",
      'izXpV': "Thiếu voucher Shopee",
      'mSAHj': "Bạn đã bật Voucher Shopee nên cần nhập link hoặc tên voucher trong Nâng cao.",
      'guqMx': function (_0x53cfab, _0x5591d8) {
        return _0x53cfab === _0x5591d8;
      },
      'XZSkI': "Voucher Shopee hiện chỉ nhận link vì không tìm thấy mã đã lưu trong ví.",
      'PcaoX': function (_0x3806c7, _0x1c7893, _0x5aecd1, _0x1a5b35) {
        return _0x3806c7(_0x1c7893, _0x5aecd1, _0x1a5b35);
      },
      'QbbaV': "Cần link voucher Shopee",
      'MCfnU': "Hệ thống không tìm thấy mã đã lưu trong ví. Vui lòng nhập link voucher Shopee.",
      'WipeS': "Chưa tải được dữ liệu banner SS6.",
      'ZnmPo': function (_0x36f15f, _0x5c7be5, _0x508b8e, _0x4a61e3) {
        return _0x36f15f(_0x5c7be5, _0x508b8e, _0x4a61e3);
      },
      'JJuqt': "Thiếu dữ liệu banner",
      'xFKFx': "Vui lòng mở Nâng cao, chọn banner và chờ tải xong.",
      'NghrK': function (_0x4eba58, _0x130dec) {
        return _0x4eba58(_0x130dec);
      },
      'mdFyy': "btn-start-autobuy",
      'fzRqC': "btn-stop-autobuy",
      'NLexN': "btn-advanced",
      'fetXR': "mobile-btn-start",
      'mXwWM': "mobile-btn-stop",
      'YDujg': "mobile-btn-advanced",
      'rjrEe': function (_0x579bee) {
        return _0x579bee();
      },
      'HKnGM': "--- BẮT ĐẦU QUY TRÌNH AUTO BUY ---",
      'zBhAD': function (_0x3ee984, _0x388b1c) {
        return _0x3ee984(_0x388b1c);
      },
      'XYrgs': function (_0x11154b, _0x47f708) {
        return _0x11154b === _0x47f708;
      },
      'CHmFf': function (_0x4c7051, _0x3990c6) {
        return _0x4c7051 === _0x3990c6;
      },
      'JMwkv': function (_0x2c029f, _0x3d62be) {
        return _0x2c029f === _0x3d62be;
      },
      'WKagw': function (_0x355c03, _0x362dbe) {
        return _0x355c03 > _0x362dbe;
      },
      'VjNdI': function (_0x280995, _0x2a96c7) {
        return _0x280995 * _0x2a96c7;
      },
      'mrYPX': function (_0x546622, _0x4064da) {
        return _0x546622 * _0x4064da;
      },
      'xmoJC': function (_0x24c9fa, _0x32e475) {
        return _0x24c9fa - _0x32e475;
      },
      'TlzDW': function (_0x513962, _0x26b599) {
        return _0x513962 > _0x26b599;
      },
      'JYuuS': function (_0x2da8bb, _0xc86fd7) {
        return _0x2da8bb(_0xc86fd7);
      },
      'PfSff': function (_0x12e071, _0x1abb13) {
        return _0x12e071(_0x1abb13);
      },
      'jzcKb': "scheduled",
      'QxZgr': function (_0x555b4, _0x589d7f) {
        return _0x555b4 / _0x589d7f;
      },
      'UDpFD': "instant",
      'YfxKr': function (_0x243e7c, _0x3a4d3c) {
        return _0x243e7c - _0x3a4d3c;
      },
      'JwSLt': function (_0x394b19, _0x529846) {
        return _0x394b19(_0x529846);
      },
      'kYvEe': function (_0x1d62ff, _0x3f873c) {
        return _0x1d62ff < _0x3f873c;
      },
      'ZiHmW': function (_0x272bd5, _0x241372) {
        return _0x272bd5 / _0x241372;
      },
      'UsVmY': function (_0x4e59b0, _0x379392) {
        return _0x4e59b0 - _0x379392;
      },
      'HsIUk': function (_0x279483, _0x411cd6) {
        return _0x279483(_0x411cd6);
      },
      'rBlzq': function (_0xf8f516) {
        return _0xf8f516();
      },
      'BdDfx': function (_0x5ba478) {
        return _0x5ba478();
      },
      'CMPJG': "1|2|0|4|3",
      'UCiOv': "Không lấy được voucher banner",
      'YzBpK': function (_0x595a80) {
        return _0x595a80();
      },
      'gYxIq': function (_0x335c79, _0x1da4c5, _0x2db40b) {
        return _0x335c79(_0x1da4c5, _0x2db40b);
      },
      'LsomA': function (_0x3e0c40, _0x365612) {
        return _0x3e0c40 || _0x365612;
      },
      'oaZKk': function (_0x4ab818, _0x9b553f) {
        return _0x4ab818 === _0x9b553f;
      },
      'jhinb': function (_0x43a0e4, _0x24923f) {
        return _0x43a0e4 > _0x24923f;
      },
      'zvgnS': function (_0x228ee3, _0x98ddad) {
        return _0x228ee3 > _0x98ddad;
      },
      'XsGqg': function (_0x244924) {
        return _0x244924();
      },
      'gkJdr': function (_0x48d014, _0x11d481) {
        return _0x48d014 !== _0x11d481;
      },
      'hkevd': "boolean",
      'XVsge': "[2/2] Đặt hàng...",
      'ZoBFW': "Dữ liệu checkout lỗi, hủy đặt hàng.",
      'rJvVc': "Invalid checkout info",
      'UekGt': function (_0x505773, _0x1e102c) {
        return _0x505773(_0x1e102c);
      },
      'SBjcj': function (_0x55b418, _0x3e0745) {
        return _0x55b418(_0x3e0745);
      },
      'UKqNS': function (_0x8af5ca, _0x30a3fc) {
        return _0x8af5ca(_0x30a3fc);
      },
      'PKpJX': function (_0x3173ba, _0x235dce) {
        return _0x3173ba === _0x235dce;
      },
      'AeIjk': function (_0x4dbc4c, _0x38326d) {
        return _0x4dbc4c(_0x38326d);
      },
      'wVdrH': function (_0x5bc67d, _0x5c31b8) {
        return _0x5bc67d(_0x5c31b8);
      },
      'baUwz': function (_0x1eb6be, _0x38e741) {
        return _0x1eb6be === _0x38e741;
      },
      'Gltpr': function (_0x4bfb39) {
        return _0x4bfb39();
      },
      'mOfQq': function (_0x46d4bf, _0x6ed089, _0x16dec7) {
        return _0x46d4bf(_0x6ed089, _0x16dec7);
      },
      'hItze': "https://shopee.vn/api/v4/checkout/place_order",
      'CdqQb': function (_0x4c5c11) {
        return _0x4c5c11();
      },
      'ptRaS': function (_0x2663c0, _0x558e74, _0x2b603e) {
        return _0x2663c0(_0x558e74, _0x2b603e);
      },
      'kZiqj': "checkout/place_order",
      'FaEuH': "3|2|0|1|4",
      'XejXP': function (_0x13491c, _0x3a8c6b) {
        return _0x13491c(_0x3a8c6b);
      },
      'vxghW': function (_0x3aecd2, _0x44b333) {
        return _0x3aecd2(_0x44b333);
      },
      'VLZLe': function (_0x1fdd08, _0x5e443c, _0x170415, _0xe91c10, _0x2fbd8b) {
        return _0x1fdd08(_0x5e443c, _0x170415, _0xe91c10, _0x2fbd8b);
      },
      'JrPjI': "Đặt hàng thành công!",
      'TRQzx': function (_0x3fd9d4) {
        return _0x3fd9d4();
      },
      'CvCoH': "2|1|3|4|0|5",
      'vAcTS': function (_0xf0d23f, _0x565d39, _0x59fad8, _0x483124) {
        return _0xf0d23f(_0x565d39, _0x59fad8, _0x483124);
      },
      'KxMNw': "Thêm giỏ thành công",
      'GSyec': "Đã thêm sản phẩm vào giỏ. Không thực hiện đặt hàng.",
      'clRzQ': function (_0x5da878, _0x2b0385) {
        return _0x5da878(_0x2b0385);
      },
      'coXMZ': "Đã thêm giỏ thành công. Dừng theo chế độ hiện tại.",
      'WrEEa': "Chưa khởi tạo xử lý Voucher Shopee. Vui lòng mở lại công cụ.",
      'ycRoL': "Đã dừng chờ giá.",
      'ZqkAL': function (_0x576264) {
        return _0x576264();
      },
      'KeAyZ': function (_0x54451b, _0x4d5c90) {
        return _0x54451b(_0x4d5c90);
      },
      'wWaLj': "Đã dừng trước khi checkout.",
      'cgeOp': function (_0x4ddbbd, _0x3fd79c) {
        return _0x4ddbbd > _0x3fd79c;
      },
      'uZATL': function (_0x50e93b, _0x37568b) {
        return _0x50e93b !== _0x37568b;
      },
      'oDrZR': "AutoOrder chưa khởi tạo hàm áp dụng voucher.",
      'enHkO': function (_0x3c7207, _0x15aadf, _0x28b54b) {
        return _0x3c7207(_0x15aadf, _0x28b54b);
      },
      'zOOCU': function (_0x38b097, _0x2aa673, _0x225b66, _0x5d1d1f) {
        return _0x38b097(_0x2aa673, _0x225b66, _0x5d1d1f);
      },
      'exyGf': function (_0x17a851, _0x5044a9) {
        return _0x17a851 - _0x5044a9;
      },
      'apgaq': function (_0x1494b1, _0x1a905d) {
        return _0x1494b1(_0x1a905d);
      },
      'ibPWZ': function (_0x506852, _0x32691b) {
        return _0x506852 === _0x32691b;
      },
      'AkOyh': function (_0x495b3d, _0x46bea5) {
        return _0x495b3d(_0x46bea5);
      },
      'XNyKD': function (_0x4bd4d5, _0x2b21f4) {
        return _0x4bd4d5 === _0x2b21f4;
      },
      'cIbVc': "place_order",
      'fcfON': function (_0x14b970, _0x15bd0c) {
        return _0x14b970 === _0x15bd0c;
      },
      'lNXov': function (_0x2f9e53, _0x917f4f) {
        return _0x2f9e53(_0x917f4f);
      },
      'QCHUa': "Kết quả giao dịch chưa rõ",
      'bkIZF': "Quy trình bị dừng",
      'HYLGb': function (_0x53e209, _0x1e6089, _0xdf0505, _0x46430f) {
        return _0x53e209(_0x1e6089, _0xdf0505, _0x46430f);
      },
      'cEDDH': "Đặt hàng thất bại",
      'AtVjR': function (_0xc96aee, _0x61c52f) {
        return _0xc96aee || _0x61c52f;
      },
      'kUHkJ': "Đã hết số vòng thử với toàn bộ voucher banner.",
      'FbmuM': function (_0x3cb71f, _0xac2da9) {
        return _0x3cb71f < _0xac2da9;
      },
      'fKCzP': function (_0xf653fb, _0x2d7657, _0x1a8823) {
        return _0xf653fb(_0x2d7657, _0x1a8823);
      },
      'tEvVx': "Không tìm thấy voucher mới ngoài list preload ban đầu.",
      'OpNPB': "Auto voucher thất bại",
      'RKwet': "Đã tìm thấy mã mới ngoài list. Chuyển sang đặt hàng với tối đa 12 lần thử.",
      'heKhD': function (_0xf5d09d, _0x2e6c98) {
        return _0xf5d09d < _0x2e6c98;
      },
      'rLksR': "Không thể lấy thông tin thanh toán. Vui lòng thử lại.",
      'VpWAz': function (_0x2ab934, _0x54b1b1, _0x5822d2) {
        return _0x2ab934(_0x54b1b1, _0x5822d2);
      },
      'VgqRx': function (_0x15d8d7, _0x3e7a4d) {
        return _0x15d8d7 !== _0x3e7a4d;
      },
      'yanNx': function (_0x18c16f, _0x53bce1) {
        return _0x18c16f === _0x53bce1;
      },
      'Chcmp': "[Get Checkout] Thất bại",
      'PqUOW': "❌ Đặt hàng thất bại",
      'jpYDV': "Dừng quy trình do lỗi lấy thông tin thanh toán.",
      'WWDig': function (_0x3df5de, _0x3fff01, _0x30cda3, _0x32fe2e) {
        return _0x3df5de(_0x3fff01, _0x30cda3, _0x32fe2e);
      },
      'PJOBq': "Lỗi thanh toán",
      'BecAl': function (_0x54c0c5, _0x286fbf, _0x5030e9, _0x6efe39) {
        return _0x54c0c5(_0x286fbf, _0x5030e9, _0x6efe39);
      },
      'SANsz': "Đặt hàng thất bại!",
      'owhCW': "lấy checkout",
      'FKFMS': "đặt hàng",
      'Qqiks': "Đã dừng trước khi hoàn tất checkout/đặt hàng.",
      'jCopk': function (_0x339f85, _0x67523d) {
        return _0x339f85 !== _0x67523d;
      },
      'YUXSP': "Vui lòng xác minh captcha",
      'GQfUt': function (_0x36b3b4, _0x5e56d7, _0x988c08, _0x3db566) {
        return _0x36b3b4(_0x5e56d7, _0x988c08, _0x3db566);
      },
      'ouIyU': function (_0x241a39) {
        return _0x241a39();
      }
    };
    document.getElementById("shopee-autobuy-modal-overlay") && typeof window.closeAutoBuyModal === "function" && window.closeAutoBuyModal();
    const _0xd28b33 = _0x24378a === "full",
      _0x1ecce3 = _0x24378a === "full",
      _0xae0156 = true,
      _0x5acbd4 = {
        'always_show_voucher_shopee': true,
        'shopid': null,
        'itemid': null,
        'modelid': null,
        'userid': window.current_user_id,
        'quantity': 0x1,
        'max_retries': 0x64,
        'voucher_auto_scan_limit': 0x64,
        'post_cart_retry_limit': 0x50,
        'retry_delay': 0xc8,
        'isRunning': false,
        'skipAddToCart': true,
        'waitForPriceChange': false,
        'onlyAddToCart': false,
        'priceCheckMode': "checkout",
        'currentModelPrice': 0x0,
        'scheduledTime': null,
        'useSchedule': false,
        'paymentMethod': "cash",
        'paymentOptions': [],
        'selectedPaymentOption': null,
        'telegramEnabled': false,
        'telegramToken': '',
        'telegramChatId': '',
        'browserNotificationEnabled': false,
        'shopVoucherEnabled': false,
        'shopVoucherCode': '',
        'shopVoucherData': null,
        'shopVoucherAutoBestOutsideList': false,
        'platformVoucherEnabled': false,
        'platformVoucherCode': '',
        'platformVoucherPromotionId': '',
        'platformVoucherInput': '',
        'platformVoucherResolved': null,
        'platformVoucherSavedInWallet': false,
        'platformVoucherWalletChecked': false,
        'platformVoucherMetadataChecked': false,
        'platformVoucherForceLinkOnly': false,
        'platformVoucherSource': "wallet",
        'platformVoucherBannerMode': "smart",
        'platformVoucherBannerSlug': "kol-affiliate",
        'platformVoucherBannerData': null,
        'platformVoucherQueue': [],
        'platformVoucherFromSS6': false,
        'orderItems': [],
        'selectedVoucherShopId': 0x0,
        'shopVoucherByShop': {},
        'shopInfoById': {},
        'use_coins': false
      },
      _0xd20b6f = "shopee_place_order_settings_v1",
      _0x479f81 = false,
      _0x22371f = 120000,
      _0x3b30d0 = 10000,
      _0x44378f = 50,
      _0x1cd8e4 = 5,
      _0x424007 = 10,
      _0x9fac82 = 3,
      _0x7b6556 = "__AUTO_BEST_OUTSIDE_LIST__";
    let _0x12ea26 = {},
      _0xbb2033 = {
        'loading': false,
        'error': '',
        'loadedForShopId': 0x0,
        'vouchers': [],
        'updatedAt': 0x0
      },
      _0x446229 = null,
      _0x4e4248 = 0,
      _0xc66413 = "order",
      _0x2c3348 = new Set(),
      _0x4f6351 = [],
      _0x120c37 = null,
      _0x5b0961 = false;
    const _0x2987c4 = {
        'id': Date.now() + '-' + Math.random().toString(36).slice(2),
        'status': _0x1ecce3 ? "LOADING" : "DISABLED",
        'records': [],
        'byCode': new Map(),
        'byPromotionId': new Map(),
        'controller': _0x1ecce3 ? new AbortController() : null,
        'timeoutId': null,
        'promise': null,
        'closed': false,
        'error': ''
      },
      _0x4d2c49 = {
        'controller': null,
        'stopped': false,
        'loaded': null,
        'uiTimer': null,
        'uiState': "idle",
        'logCountdownEl': null,
        'logCountdownLastSecond': null
      },
      _0x563a6d = () => document.getElementById("shopee-autobuy-modal-overlay")?.["dataset"]?.["autoOrderSessionId"] === _0x2987c4.id,
      _0x4a062c = (_0x1d29d0, _0xd224b, _0x571f3a, _0x5113f9) => {
        const _0x4e567e = parseInt(_0x1d29d0, 10);
        if (!Number.isFinite(_0x4e567e)) return _0x5113f9;
        return Math.min(_0x571f3a, Math.max(_0xd224b, _0x4e567e));
      },
      _0x33c49a = _0xf6cb2c => {
        const _0x448c42 = String(_0xf6cb2c ?? '').trim().split(/\s+/).filter(Boolean)[0];
        if (!_0x448c42) return '';
        return _0x448c42.replace(/\s+/g, '').toUpperCase();
      },
      _0x39429a = _0x25d063 => {
        const _0x34a648 = _0x59e2f9.HRVsS(String, _0x25d063 ?? '').trim();
        if (!_0x34a648) return '';
        try {
          const _0x21e14d = new URL(_0x34a648),
            _0x4f0e91 = _0x21e14d.searchParams.get("voucherCode") || _0x21e14d.searchParams.get("vouchercode") || '';
          if (_0x4f0e91) return _0x59e2f9.HRVsS(_0x33c49a, _0x4f0e91);
        } catch (_0x4f1b89) {}
        const _0x4e81b3 = _0x34a648.match(/\b(?:voucherCode|vouchercode)=([^&\s]+)/i);
        if (_0x4e81b3) return _0x59e2f9.HRVsS(_0x33c49a, _0x4e81b3[1]);
        return _0x59e2f9.HRVsS(_0x33c49a, _0x34a648);
      },
      _0x1a7978 = _0x2e230a => {
        const _0x5d09e2 = {
            'wbedI': function (_0x4def56, _0x10a096) {
              return _0x59e2f9.HRVsS(_0x4def56, _0x10a096);
            },
            'DGMAW': function (_0x95f76a, _0x1a4a31) {
              return _0x95f76a ?? _0x1a4a31;
            }
          },
          _0x3db0bc = _0x59e2f9.HRVsS(String, _0x2e230a ?? '').trim();
        if (!_0x3db0bc) return '';
        const _0x398f6f = _0x87b1ef => {
          const _0x582df5 = _0x5d09e2.wbedI(String, _0x87b1ef ?? '').trim().match(/^\d+$/);
          if (!_0x582df5) return '';
          return _0x582df5[0].replace(/^0+(?=\d)/, '');
        };
        try {
          const _0x582247 = new URL(_0x3db0bc),
            _0xbb369f = _0x582247.searchParams.get("promotionId") || _0x582247.searchParams.get("promotionid") || '';
          if (_0xbb369f) return _0x59e2f9.HRVsS(_0x398f6f, _0xbb369f);
        } catch (_0x33c57c) {}
        const _0x3647d7 = _0x3db0bc.match(/\b(?:promotionId|promotionid)=([0-9]+)/i);
        if (_0x3647d7) return _0x59e2f9.KiPzq(_0x398f6f, _0x3647d7[1]);
        const _0x59ca67 = _0x3db0bc.match(/\d{6,}/);
        return _0x59ca67 ? _0x59e2f9.KiPzq(_0x398f6f, _0x59ca67[0]) : '';
      },
      _0x47fe84 = _0x3f8d81 => _0x1a7978(String(_0x3f8d81 ?? '')),
      _0xc88930 = _0x25d448 => {
        const _0x2f85a2 = _0x47fe84(_0x25d448);
        if (!_0x2f85a2) return 0;
        const _0x42204a = Number(_0x2f85a2);
        return Number.isSafeInteger(_0x42204a) ? _0x42204a : _0x2f85a2;
      },
      _0x148888 = _0x1ee582 => {
        const _0x5412a6 = _0x59e2f9.fRMPy(String, _0x1ee582 || '').trim();
        if (!_0x5412a6) return '';
        try {
          return _0x59e2f9.KiPzq(decodeURIComponent, _0x59e2f9.gXmGj(escape, _0x59e2f9.HRVsS(atob, _0x5412a6)));
        } catch (_0x414679) {
          try {
            return _0x59e2f9.BFFre(atob, _0x5412a6);
          } catch (_0x4b0ac2) {
            return '';
          }
        }
      },
      _0x45e09d = _0xae65f8 => {
        const _0x53cfda = _0x59e2f9.KmpUv(String, _0xae65f8 || '').trim();
        if (!_0x53cfda) return {
          'raw': _0x53cfda,
          'isLink': false,
          'voucherCode': '',
          'promotionid': '',
          'signature': ''
        };
        let _0x4b1e17 = null;
        try {
          _0x4b1e17 = new URL(_0x53cfda);
        } catch (_0x16348c) {
          try {
            _0x4b1e17 = new URL(_0x53cfda.startsWith("http") ? _0x53cfda : "https://" + _0x53cfda);
          } catch (_0x457a6b) {
            _0x4b1e17 = null;
          }
        }
        if (_0x4b1e17 && /(^|\.)shopee\.vn$/i.test(_0x4b1e17.hostname)) {
          const _0x3508a7 = _0x4b1e17.searchParams,
            _0x2b831a = _0x3508a7.get("evcode") || '',
            _0x53692d = _0x2b831a ? _0x59e2f9.KmpUv(_0x148888, _0x2b831a) : '',
            _0x54de78 = _0x59e2f9.KUvHx(_0x39429a, _0x3508a7.get("voucherCode") || _0x3508a7.get("vouchercode") || _0x53692d || ''),
            _0x2a95ea = _0x59e2f9.KmpUv(_0x1a7978, _0x3508a7.get("promotionId") || _0x3508a7.get("promotionid") || ''),
            _0x2fcdf4 = _0x59e2f9.KmpUv(String, _0x3508a7.get("signature") || '').trim();
          return {
            'raw': _0x53cfda,
            'isLink': true,
            'voucherCode': _0x54de78,
            'promotionid': _0x2a95ea,
            'signature': _0x2fcdf4
          };
        }
        return {
          'raw': _0x53cfda,
          'isLink': false,
          'voucherCode': _0x59e2f9.HRVsS(_0x39429a, _0x53cfda),
          'promotionid': _0x59e2f9.gXmGj(_0x1a7978, _0x53cfda),
          'signature': ''
        };
      },
      _0x4d8b8c = () => _0x45e09d(_0x5acbd4.platformVoucherInput).voucherCode,
      _0x289f9d = _0x1949f8 => {
        const _0xc26cc6 = _0x59e2f9.wNHeX(String, _0x1949f8 || '').toUpperCase(),
          _0x5c87f8 = _0xc26cc6.match(/^([A-Z]+)-(\d{9,})$/);
        if (!_0x5c87f8) return _0xc26cc6;
        const _0x5b3478 = _0x5c87f8[1],
          _0x7bad5 = _0x5c87f8[2],
          _0x35d521 = _0x7bad5.slice(-3);
        return _0x5b3478 + "-..." + _0x35d521;
      },
      _0x486ef5 = _0xb1e843 => {
        if (_0x59e2f9.bJqVk(_0xb1e843, "shopid_all")) return '🕒';
        if (_0x59e2f9.bJqVk(_0xb1e843, "both")) return '🧩';
        return '🎯';
      },
      _0x1ca816 = () => {
        return _0x12ea26 && _0x59e2f9.bJqVk(typeof _0x12ea26, "object") ? _0x12ea26 : {};
      },
      _0x40f863 = _0x43f567 => {
        _0x12ea26 = _0x43f567 && typeof _0x43f567 === "object" ? {
          ..._0x43f567
        } : {};
      },
      _0x50f245 = () => {
        _0x12ea26 = {};
      },
      _0x56ae8b = () => {
        try {
          const _0x44e24c = localStorage.getItem(_0xd20b6f);
          if (_0x44e24c) {
            const _0x321ab = JSON.parse(_0x44e24c);
            if (_0x321ab.retry_delay) _0x5acbd4.retry_delay = _0x321ab.retry_delay;
            _0x321ab.max_retries !== undefined && _0x321ab.max_retries !== null && (_0x5acbd4.max_retries = _0x4a062c(_0x321ab.max_retries, 1, 999999, _0x5acbd4.max_retries));
            _0x321ab.voucher_auto_scan_limit !== undefined && _0x321ab.voucher_auto_scan_limit !== null && (_0x5acbd4.voucher_auto_scan_limit = _0x4a062c(_0x321ab.voucher_auto_scan_limit, 1, 999999, _0x5acbd4.voucher_auto_scan_limit));
            _0x321ab.post_cart_retry_limit !== undefined && _0x321ab.post_cart_retry_limit !== null && (_0x5acbd4.post_cart_retry_limit = _0x4a062c(_0x321ab.post_cart_retry_limit, 3, 333, _0x5acbd4.post_cart_retry_limit));
            if (typeof _0x321ab.skipAddToCart === "boolean") _0x5acbd4.skipAddToCart = _0x321ab.skipAddToCart;
            if (typeof _0x321ab.waitForPriceChange === "boolean") _0x5acbd4.waitForPriceChange = _0x321ab.waitForPriceChange;
            if (typeof _0x321ab.onlyAddToCart === "boolean") _0x5acbd4.onlyAddToCart = _0x321ab.onlyAddToCart;
            if (typeof _0x321ab.use_coins === "boolean") _0x5acbd4.use_coins = _0x321ab.use_coins;
            if (typeof _0x321ab.useSchedule === "boolean") _0x5acbd4.useSchedule = _0x321ab.useSchedule;
            if (typeof _0x321ab.priceCheckMode === "string") {
              const _0x5c7123 = String(_0x321ab.priceCheckMode || '').trim();
              ["checkout", "cart", "product"].includes(_0x5c7123) && (_0x5acbd4.priceCheckMode = _0x5c7123);
            }
            if (_0x321ab.paymentMethod) _0x5acbd4.paymentMethod = _0x321ab.paymentMethod;
            if (typeof _0x321ab.telegramEnabled === "boolean") _0x5acbd4.telegramEnabled = _0x321ab.telegramEnabled;
            if (typeof _0x321ab.telegramToken === "string") _0x5acbd4.telegramToken = _0x321ab.telegramToken;
            if (typeof _0x321ab.telegramChatId === "string") _0x5acbd4.telegramChatId = _0x321ab.telegramChatId;
            if (typeof _0x321ab.browserNotificationEnabled === "boolean") _0x5acbd4.browserNotificationEnabled = _0x321ab.browserNotificationEnabled;
            _0x5acbd4.onlyAddToCart && _0x5acbd4.waitForPriceChange && (_0x5acbd4.waitForPriceChange = false);
            if (typeof _0x321ab.platformVoucherEnabled === "boolean") _0x5acbd4.platformVoucherEnabled = _0x321ab.platformVoucherEnabled;
            if (typeof _0x321ab.platformVoucherCode === "string") _0x5acbd4.platformVoucherCode = _0x39429a(_0x321ab.platformVoucherCode);
            if (_0x321ab.platformVoucherPromotionId !== undefined) _0x5acbd4.platformVoucherPromotionId = _0x1a7978(_0x321ab.platformVoucherPromotionId);
            if (typeof _0x321ab.platformVoucherInput === "string") _0x5acbd4.platformVoucherInput = String(_0x321ab.platformVoucherInput || '').trim();else (_0x321ab.platformVoucherCode || _0x321ab.platformVoucherPromotionId) && (_0x5acbd4.platformVoucherInput = String(_0x321ab.platformVoucherCode || '').trim());
            console.log("[Đặt đơn] Đã tải cài đặt từ storage");
          }
        } catch (_0xd068ba) {
          console.warn("[Đặt đơn] Lỗi tải settings:", _0xd068ba);
        }
      },
      _0x171089 = () => {
        try {
          const _0x55fddc = {
            'retry_delay': _0x5acbd4.retry_delay,
            'max_retries': _0x5acbd4.max_retries,
            'voucher_auto_scan_limit': _0x5acbd4.voucher_auto_scan_limit,
            'post_cart_retry_limit': _0x5acbd4.post_cart_retry_limit,
            'skipAddToCart': _0x5acbd4.skipAddToCart,
            'waitForPriceChange': _0x5acbd4.waitForPriceChange,
            'onlyAddToCart': _0x5acbd4.onlyAddToCart,
            'use_coins': !!_0x5acbd4.use_coins,
            'useSchedule': _0x5acbd4.useSchedule,
            'priceCheckMode': _0x5acbd4.priceCheckMode || "checkout",
            'paymentMethod': _0x5acbd4.paymentMethod,
            'telegramEnabled': _0x5acbd4.telegramEnabled || false,
            'telegramToken': _0x5acbd4.telegramToken || '',
            'telegramChatId': _0x5acbd4.telegramChatId || '',
            'browserNotificationEnabled': _0x5acbd4.browserNotificationEnabled || false,
            'platformVoucherEnabled': _0x5acbd4.platformVoucherEnabled || false,
            'platformVoucherCode': _0x5acbd4.platformVoucherCode || '',
            'platformVoucherPromotionId': _0x5acbd4.platformVoucherPromotionId || '',
            'platformVoucherInput': _0x5acbd4.platformVoucherInput || ''
          };
          localStorage.setItem(_0xd20b6f, JSON.stringify(_0x55fddc));
          console.log("[Đặt đơn] Đã lưu cài đặt vào storage");
        } catch (_0x34d889) {
          console.warn("[Đặt đơn] Lỗi lưu settings:", _0x34d889);
        }
      };
    _0x56ae8b();
    !_0xae0156 && (_0x5acbd4.platformVoucherBannerMode = "smart");
    _0x5acbd4.skipAddToCart = true;
    !_0xd28b33 && (_0x5acbd4.shopVoucherEnabled = false, _0x5acbd4.shopVoucherCode = '', _0x5acbd4.shopVoucherData = null, _0x5acbd4.shopVoucherAutoBestOutsideList = false);
    if (!_0x1ecce3) {
      _0x5acbd4.platformVoucherEnabled = false;
      _0x5acbd4.platformVoucherCode = '';
      _0x5acbd4.platformVoucherPromotionId = '';
      _0x5acbd4.platformVoucherInput = '';
      _0x5acbd4.platformVoucherResolved = null;
      _0x5acbd4.platformVoucherSavedInWallet = false;
      _0x5acbd4.platformVoucherWalletChecked = false;
      _0x5acbd4.platformVoucherMetadataChecked = false;
      _0x5acbd4.platformVoucherForceLinkOnly = false;
    }
    const _0x1f795e = _0x31e35b => new Promise(_0x547fb7 => setTimeout(_0x547fb7, _0x31e35b)),
      _0x4d4c36 = () => {
        const _0x126381 = {
            'yLzSf': "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            'JNCAh': function (_0x166465, _0x2679fe) {
              return _0x166465 < _0x2679fe;
            },
            'RvqoW': function (_0x3ab546, _0x2c5bc1) {
              return _0x3ab546 * _0x2c5bc1;
            }
          },
          _0x22ade = document.cookie.split(';\x20').reduce((_0x5469f6, _0x3e9df3) => {
            const [_0x1b7503, _0x32f4cd] = _0x3e9df3.split('=');
            return _0x5469f6[_0x1b7503] = _0x32f4cd, _0x5469f6;
          }, {}),
          _0x323ad6 = () => {
            const _0x48405c = _0x449bb6 => {
                const _0x3e3ec5 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let _0x231a57 = '';
                for (let _0x39696f = 0; _0x126381.JNCAh(_0x39696f, _0x449bb6); _0x39696f++) {
                  _0x231a57 += _0x3e3ec5.charAt(Math.floor(_0x126381.RvqoW(Math.random(), _0x3e3ec5.length)));
                }
                return _0x231a57;
              },
              _0x17c4d2 = '08',
              _0x1cc514 = '03',
              _0x36ebef = _0x59e2f9.fKqah('6i', _0x59e2f9.YmASp(_0x48405c, 10)),
              _0x4fed15 = _0x59e2f9.pnnZe(_0x48405c, 64),
              _0x5d57b7 = _0x59e2f9.qxkTr(_0x48405c, 32);
            return [_0x36ebef, _0x4fed15, _0x5d57b7, _0x17c4d2, _0x1cc514].join('|');
          };
        return {
          'csrf': _0x22ade.csrftoken || "WEbgLkj91xsBhQKkntiAkpucfaJmUUoJ",
          'fingerprint': _0x323ad6()
        };
      },
      _0x3606fc = (_0x4506ac = new Date()) => {
        const _0x45ce6e = _0x4506ac instanceof Date ? _0x4506ac : new Date(_0x4506ac),
          _0x2cd0de = Number.isFinite(_0x45ce6e.getTime()) ? _0x45ce6e : new Date(),
          _0xfdc036 = _0x5630cc => String(_0x5630cc).padStart(2, '0');
        return _0xfdc036(_0x2cd0de.getHours()) + ':' + _0xfdc036(_0x2cd0de.getMinutes()) + ':' + _0xfdc036(_0x2cd0de.getSeconds());
      };
    let _0x351de6 = null,
      _0x1faeff = null,
      _0x1d88f8 = false;
    const _0x4bcdbe = () => {
        if (!_0x1d88f8 || _0x59e2f9.YzbrU(typeof window.setPiPLogs, "function")) return false;
        const _0x135b7f = document.getElementById("autobuy-log-container");
        if (!_0x135b7f) return false;
        const _0x4c5aa5 = _0x59e2f9.qxkTr(String, _0x135b7f.innerText || '').replace(/\r/g, '').split('\x0a').map(_0x1ee979 => _0x1ee979.trimEnd()).filter(_0x150153 => _0x150153.trim());
        return window.pipDisableMask = true, window.setPiPLogs(_0x4c5aa5.length ? _0x4c5aa5 : ["Đặt đơn tự động: chưa có log..."]), true;
      },
      _0x1f5362 = () => {
        const _0x3c5f48 = document.getElementById("autobuy-log-container");
        if (!_0x3c5f48 || _0x59e2f9.AfrPm(typeof MutationObserver, "function")) return;
        if (_0x59e2f9.bJqVk(_0x1faeff, _0x3c5f48) && _0x351de6) return;
        _0x351de6?.["disconnect"]();
        _0x1faeff = _0x3c5f48;
        _0x351de6 = new MutationObserver(() => _0x4bcdbe());
        _0x351de6.observe(_0x3c5f48, {
          'childList': true,
          'subtree': true,
          'characterData': true
        });
      },
      _0x38e7d6 = () => {
        _0x351de6?.["disconnect"]();
        _0x351de6 = null;
        _0x1faeff = null;
        _0x1d88f8 = false;
        window.pipDisableMask = false;
      };
    window.openAutoBuyPiP = () => {
      _0x1d88f8 = true;
      _0x59e2f9.UiyvC(_0x1f5362);
      _0x59e2f9.UiyvC(_0x4bcdbe);
      _0x59e2f9.HsSPZ(typeof window.showPiPModeMenu, "function") ? window.showPiPModeMenu() : (_0x1d88f8 = false, _0x59e2f9.BFFre(alert, "Không tìm thấy PiP mode"));
    };
    const _0x1d9aeb = {
        'log': (_0x23ae0f, _0x1846b4 = "info") => {
          console.log('[' + _0x1846b4.toUpperCase() + ']\x20' + _0x23ae0f);
          const _0x2e1db7 = document.getElementById("autobuy-log-section"),
            _0x244b54 = document.getElementById("autobuy-log-container");
          if (_0x2e1db7 && _0x244b54) {
            _0x2e1db7.style.display = _0x59e2f9.bJqVk(window._autoBuyLogVisible, false) ? "none" : "flex";
            const _0x443f91 = _0x59e2f9.UiyvC(_0x3606fc),
              _0x198fbd = _0x59e2f9.HsSPZ(_0x1846b4, "error") ? "#ff4d4f" : _0x59e2f9.HsSPZ(_0x1846b4, "success") ? "#52c41a" : "rgb(171 167 3)",
              _0x3730a9 = document.createElement("div");
            _0x3730a9.style.marginBottom = "4px";
            _0x3730a9.style.fontFamily = "monospace";
            _0x3730a9.style.fontSize = "12px";
            _0x3730a9.style.color = _0x198fbd;
            _0x3730a9.style.wordBreak = "break-word";
            _0x3730a9.style.overflowWrap = "anywhere";
            _0x3730a9.style.whiteSpace = "pre-wrap";
            _0x3730a9.innerHTML = "<span style=\"color: #999\">[" + _0x443f91 + "]</span> " + _0x23ae0f;
            _0x244b54.appendChild(_0x3730a9);
            _0x244b54.scrollTop = _0x244b54.scrollHeight;
          }
        },
        'error': _0x5d91be => _0x1d9aeb.log(_0x5d91be, "error"),
        'success': _0x2af492 => _0x1d9aeb.log(_0x2af492, "success"),
        'info': _0x3e56c4 => _0x1d9aeb.log(_0x3e56c4, "info")
      },
      _0x2d1992 = (_0x139417, _0x3bdafa = "API") => {
        if (Number(_0x139417?.["error"]) !== 90309999) return;
        _0x1d9aeb.error('[' + _0x3bdafa + "] Cần xác minh captcha! Vui lòng refresh trang và thử lại.");
        typeof window.showCaptchaErrorModal === "function" && window.showCaptchaErrorModal();
        throw new Error("CAPTCHA_REQUIRED");
      },
      _0x47f96e = _0x25b007 => String(_0x25b007 || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"),
      _0x352574 = () => {
        const _0x3d0311 = Array.isArray(_0x5acbd4?.["orderItems"]) ? _0x5acbd4.orderItems : [],
          _0x1fb68d = _0x3d0311[0] || null,
          _0x2e4a46 = _0x1fb68d ? _0x59e2f9.Dehxo(_0x5902a5, _0x1fb68d) : null,
          _0x423f2b = {
            'itemTitle': _0x59e2f9.mrJsw(String, _0x2e4a46?.["itemTitle"] || _0x1fb68d?.["itemTitle"] || _0x1fb68d?.["name"] || _0x1fb68d?.["title"] || '').trim(),
            'variantName': _0x59e2f9.mrJsw(String, _0x2e4a46?.["variantName"] || _0x1fb68d?.["variantName"] || _0x1fb68d?.["model_name"] || _0x1fb68d?.["modelName"] || '').trim()
          },
          _0x3f5ffd = window.currentProductData?.["item"] || {},
          _0x50b472 = Array.isArray(window.currentProductData?.["models"]) ? window.currentProductData.models : [],
          _0x154f00 = _0x50b472.find(_0x16d8d9 => Number(_0x16d8d9?.["model_id"]) === Number(window.selectedModelId)),
          _0x54688e = _0x423f2b.itemTitle || _0x59e2f9.qxkTr(String, _0x3f5ffd?.["title"] || '').trim() || "Không rõ sản phẩm",
          _0x14419d = _0x423f2b.variantName || _0x59e2f9.qxkTr(String, _0x154f00?.["name"] || '').trim();
        return {
          'itemTitle': _0x54688e,
          'variantName': _0x14419d
        };
      },
      _0x543e86 = (_0x5b8f0c = new Date()) => {
        const _0x49c851 = _0x5b8f0c instanceof Date ? _0x5b8f0c : new Date(_0x5b8f0c),
          _0x45f9bf = _0x453533 => String(_0x453533).padStart(2, '0');
        return _0x45f9bf(_0x49c851.getHours()) + ':' + _0x45f9bf(_0x49c851.getMinutes()) + ':' + _0x45f9bf(_0x49c851.getSeconds()) + " | " + _0x49c851.getDate() + '/' + (_0x49c851.getMonth() + 1) + '/' + _0x49c851.getFullYear();
      },
      _0x4f90cc = 5,
      _0x112c7e = _0x20c36a => new Set((Array.isArray(_0x20c36a) ? _0x20c36a : []).map(_0x26a477 => Number(_0x26a477?.["shopid"] || 0)).filter(_0x4f0efc => _0x4f0efc > 0)).size,
      _0x116d1e = (_0x2b3d25, _0x2f5b48, _0xea766b) => (Number(_0x2b3d25) || 0) + '_' + (Number(_0x2f5b48) || 0) + '_' + (Number(_0xea766b) || 0),
      _0x4f80b4 = (_0x212e8c, _0x391bf8, _0x2fac45, _0x1cd0b6, _0x30bcc7) => _0x116d1e(_0x212e8c, _0x391bf8, _0x2fac45) + '_' + (Number(_0x1cd0b6) || 0) + '_' + (_0x30bcc7 ? 1 : 0),
      _0x1ad3eb = (_0x2ac1a4, _0x3b026c, _0x4cb275, _0x151c86, _0x248752) => _0x116d1e(_0x2ac1a4, _0x3b026c, _0x4cb275) + '_' + (Number(_0x151c86) || 0) + '_' + (_0x248752 ? 1 : 0),
      _0x5902a5 = _0x37d725 => {
        const _0x1a7fb1 = Number(_0x37d725?.["shopid"] || _0x37d725?.["shopId"] || 0),
          _0x45525d = Number(_0x37d725?.["itemid"] || _0x37d725?.["itemId"] || 0),
          _0xa4d853 = Number(_0x37d725?.["modelid"] || _0x37d725?.["modelId"] || 0),
          _0x3178f3 = Math.min(20, Math.max(1, Number(_0x37d725?.["quantity"] || 1) || 1));
        if (!_0x1a7fb1 || !_0x45525d || !_0xa4d853) return null;
        return {
          'key': _0x4f80b4(_0x1a7fb1, _0x45525d, _0xa4d853, Number(_0x37d725?.["addOnDealId"] || 0), _0x37d725?.["isAddOnSubItem"] === true),
          'shopid': _0x1a7fb1,
          'itemid': _0x45525d,
          'modelid': _0xa4d853,
          'quantity': _0x3178f3,
          'itemTitle': String(_0x37d725?.["itemTitle"] || _0x37d725?.["title"] || '').trim(),
          'variantName': String(_0x37d725?.["variantName"] || _0x37d725?.["modelName"] || '').trim(),
          'shopName': String(_0x37d725?.["shopName"] || '').trim(),
          'image': String(_0x37d725?.["image"] || '').trim(),
          'price': Number(_0x37d725?.["price"] || 0),
          'priceBeforeDiscount': Number(_0x37d725?.["priceBeforeDiscount"] || 0),
          'stock': Number(_0x37d725?.["stock"] || 0),
          'isAddOnSubItem': _0x37d725?.["isAddOnSubItem"] === true,
          'addOnDealId': Number(_0x37d725?.["addOnDealId"] || 0),
          'addOnDealInfo': _0x37d725?.["addOnDealInfo"] || null,
          'addOnDealGroupKey': String(_0x37d725?.["addOnDealGroupKey"] || '')
        };
      },
      _0xac78c7 = () => {
        const _0x39c8f3 = window.currentProductData,
          _0x3e5c91 = Array.isArray(_0x39c8f3?.["models"]) ? _0x39c8f3.models : [],
          _0xff6b0d = _0x3e5c91.find(_0x5a1ffd => Number(_0x5a1ffd?.["model_id"]) === Number(window.selectedModelId));
        if (!_0x39c8f3?.["shopId"] || !_0x39c8f3?.["itemId"] || !_0xff6b0d?.["model_id"]) return null;
        const _0x40b6f2 = 1;
        return _0x5902a5({
          'shopid': _0x39c8f3.shopId,
          'itemid': _0x39c8f3.itemId,
          'modelid': _0xff6b0d.model_id,
          'quantity': _0x40b6f2,
          'itemTitle': _0x39c8f3?.["item"]?.["title"] || '',
          'variantName': _0xff6b0d?.["name"] || '',
          'shopName': String(_0x39c8f3?.["item"]?.["shop_name"] || _0x39c8f3?.["item"]?.["shop_info"]?.["shop_name"] || '').trim(),
          'image': _0x39c8f3?.["item"]?.["image"] ? "https://down-vn.img.susercontent.com/file/" + _0x39c8f3.item.image : '',
          'price': Number(_0xff6b0d?.["price"] || 0) / 100000,
          'priceBeforeDiscount': Number(_0xff6b0d?.["price_before_discount"] || 0) / 100000,
          'stock': Number(window.modelStocks?.[_0xff6b0d.model_id]?.["stock"] || 0)
        });
      },
      _0x1c3fbd = () => {
        const _0x27bb10 = Array.isArray(_0x5acbd4.orderItems) ? _0x5acbd4.orderItems.map(_0x5ead62 => _0x5902a5(_0x5ead62)).filter(Boolean) : [];
        if (_0x59e2f9.TsQDr(_0x27bb10.length, 0)) return _0x27bb10;
        const _0x56724c = _0x59e2f9.sVSWy(_0xac78c7);
        return _0x56724c ? [_0x56724c] : [];
      },
      _0x26b881 = () => {
        const _0x448cf5 = _0x1c3fbd(),
          _0x56284c = new Map();
        _0x448cf5.forEach(_0x58b3e5 => {
          const _0x3b74f1 = _0x59e2f9.sSrGB(Number, _0x58b3e5.shopid || 0);
          if (!_0x3b74f1 || _0x56284c.has(_0x3b74f1)) return;
          _0x56284c.set(_0x3b74f1, {
            'shopId': _0x3b74f1,
            'shopName': _0x59e2f9.HRVsS(String, _0x58b3e5?.["shopName"] || '').trim() || _0x59e2f9.SxuHQ(String, _0x5acbd4.shopInfoById?.[_0x3b74f1]?.["shopName"] || '').trim() || "Shop " + _0x3b74f1
          });
        });
        const _0x580c27 = Number(window.currentProductData?.["shopId"] || 0);
        return _0x580c27 && !_0x56284c.has(_0x580c27) && _0x56284c.set(_0x580c27, {
          'shopId': _0x580c27,
          'shopName': String(_0x5acbd4.shopInfoById?.[_0x580c27]?.["shopName"] || '').trim() || "Shop " + _0x580c27
        }), Array.from(_0x56284c.values());
      },
      _0x5a442b = _0x45f4bc => {
        const _0x46c63b = String(_0x45f4bc || '').trim();
        return _0x46c63b ? "https://shopee.vn/user/purchase/checkout/" + encodeURIComponent(_0x46c63b) : '';
      },
      _0x989e7d = async _0x5171e5 => {
        if (!_0x5acbd4.telegramEnabled) return;
        if (!_0x5acbd4.telegramToken || !_0x5acbd4.telegramChatId) {
          _0x1d9aeb.error("[Telegram] Thiếu token/chat_id. Kiểm tra lại cài đặt nâng cao.");
          return;
        }
        try {
          const {
              itemTitle: _0x970fdb,
              variantName: _0xef4212
            } = _0x59e2f9.sVSWy(_0x352574),
            _0x2fc669 = Array.isArray(_0x5171e5?.["orderids"]) ? _0x5171e5.orderids.filter(Boolean).map(_0x5cea41 => String(_0x5cea41)) : [],
            _0x312f0d = _0x59e2f9.zQXNd(_0x5a442b, _0x5171e5?.["checkoutid"]),
            _0x10bc7f = _0x2fc669.length ? _0x2fc669.map(_0x45ab16 => _0x312f0d ? "<a href=\"" + _0x47f96e(_0x312f0d) + '\x22>' + _0x47f96e(_0x45ab16) + "</a>" : _0x47f96e(_0x45ab16)).join(',\x20') : "Unknown",
            _0x13a33 = _0x59e2f9.qxkTr(_0x543e86, new Date()),
            _0x343edb = _0xef4212 ? "\n\n🛍️ Phân loại: " + _0x59e2f9.PpLRJ(_0x47f96e, _0xef4212) : '',
            _0x454fa3 = "🎉 Đặt đơn thành công!\n\n🛒 Sản phẩm: " + _0x59e2f9.FVyJx(_0x47f96e, _0x970fdb) + _0x343edb + "\n\n🧾 Order ID: " + _0x10bc7f + "\n\n⏰ Thời gian: " + _0x59e2f9.BFFre(_0x47f96e, _0x13a33),
            _0x5144dc = await _0x59e2f9.oNdwL(fetch, "https://api.telegram.org/bot" + _0x5acbd4.telegramToken + "/sendMessage", {
              'method': "POST",
              'headers': {
                'content-type': "application/json"
              },
              'body': JSON.stringify({
                'chat_id': _0x5acbd4.telegramChatId,
                'text': _0x454fa3,
                'parse_mode': "HTML",
                'disable_web_page_preview': true
              })
            }),
            _0x786f02 = await _0x5144dc.json();
          _0x59e2f9.oNdwL(_0x2d1992, _0x786f02, "Telegram");
          _0x786f02?.['ok'] ? _0x1d9aeb.success("[Telegram] Đã gửi thông báo thành công.") : _0x1d9aeb.error("[Telegram] Gửi thất bại: " + (_0x786f02?.["description"] || "Unknown error"));
        } catch (_0x4acbd5) {
          _0x1d9aeb.error("[Telegram] Lỗi gửi thông báo: " + _0x4acbd5.message);
        }
      },
      _0x94481e = _0x5a7091 => {
        if (!_0x5acbd4.browserNotificationEnabled) return;
        if (_0x59e2f9.dnQMf(typeof Notification, "undefined") || _0x59e2f9.heINL(Notification.permission, "granted")) return;
        try {
          const {
              itemTitle: _0x455367,
              variantName: _0x356a20
            } = _0x59e2f9.qnAhK(_0x352574),
            _0x295509 = Array.isArray(_0x5a7091?.["orderids"]) ? _0x5a7091.orderids.filter(Boolean).map(_0x3a3723 => String(_0x3a3723)) : [],
            _0x2ba16a = _0x356a20 ? "\n🛍️ Phân loại: " + _0x356a20 : '',
            _0x2f41f8 = "🛒 Sản phẩm: " + _0x455367 + _0x2ba16a + "\n🧾 Order ID: " + (_0x295509.join(',\x20') || "Thành công") + "\n⏰ Thời gian: " + new Date().toLocaleTimeString(),
            _0x1d3a37 = new Notification("🎉 ĐẶT HÀNG THÀNH CÔNG!", {
              'body': _0x2f41f8,
              'icon': "https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/icon_favicon_1_32.png",
              'requireInteraction': true
            });
          _0x1d3a37.onclick = function () {
            window.focus();
            const _0x335297 = _0x59e2f9.HRVsS(_0x5a442b, _0x5a7091?.["checkoutid"]);
            if (_0x335297) window.open(_0x335297, "_blank");
            this.close();
          };
        } catch (_0x4db16a) {
          console.error("[Browser Notification] Error:", _0x4db16a);
        }
      },
      _0x3df333 = async () => {
        if (!_0x5acbd4.telegramEnabled) return;
        if (!_0x5acbd4.telegramToken || !_0x5acbd4.telegramChatId) {
          _0x1d9aeb.error("[Telegram] Thiếu token/chat_id. Kiểm tra lại cài đặt nâng cao.");
          return;
        }
        try {
          const {
              itemTitle: _0x5cd82f,
              variantName: _0x4da6b0
            } = _0x59e2f9.sVSWy(_0x352574),
            _0x3ab4e8 = _0x59e2f9.LBsCI(_0x543e86, new Date()),
            _0x2a3995 = _0x4da6b0 ? "\n\n🛍️ Phân loại: " + _0x59e2f9.SxuHQ(_0x47f96e, _0x4da6b0) : '',
            _0x3b8b20 = "✅ Thêm giỏ thành công!\n\n🛒 Sản phẩm: " + _0x59e2f9.gXmGj(_0x47f96e, _0x5cd82f) + _0x2a3995 + "\n\n⏰ Thời gian: " + _0x59e2f9.AEnAF(_0x47f96e, _0x3ab4e8),
            _0x2f0c2e = await _0x59e2f9.nvTbM(fetch, "https://api.telegram.org/bot" + _0x5acbd4.telegramToken + "/sendMessage", {
              'method': "POST",
              'headers': {
                'content-type': "application/json"
              },
              'body': JSON.stringify({
                'chat_id': _0x5acbd4.telegramChatId,
                'text': _0x3b8b20,
                'parse_mode': "HTML",
                'disable_web_page_preview': true
              })
            }),
            _0x51857d = await _0x2f0c2e.json();
          _0x59e2f9.EWMJB(_0x2d1992, _0x51857d, "Telegram");
          _0x51857d?.['ok'] ? _0x1d9aeb.success("[Telegram] Đã gửi thông báo thành công.") : _0x1d9aeb.error("[Telegram] Gửi thất bại: " + (_0x51857d?.["description"] || "Unknown error"));
        } catch (_0x5dd9bd) {
          _0x1d9aeb.error("[Telegram] Lỗi gửi thông báo: " + _0x5dd9bd.message);
        }
      },
      _0x35705e = () => ({
        'version': 0x1,
        'payment_channelid': 0xe678,
        'option_info': '',
        'text_info': {},
        'ros_opt_in': false,
        'name': "Thanh toán khi nhận hàng",
        'support_advance_booking': true,
        'combined_payments_info': {
          'base_payable': 0x0,
          'total_payable': 0x0,
          'price_breakdown': [],
          'splits': []
        }
      }),
      _0x4bc337 = () => ({
        'channel_id': 0x4c5838,
        'channel_item_option_info': {
          'channel_item_id': 0x1ff973cafa8000,
          'credit_card_data': {
            'card_number': '',
            'expiry_date': '',
            'bank_name': "Thẻ mới"
          }
        },
        'version': 0x2
      }),
      _0x327d49 = () => ({
        'channel_id': 0x4c705c,
        'channel_item_option_info': {},
        'version': 0x2
      }),
      _0x5161ca = () => [{
        'id': "cash",
        'method': "cash",
        'icon': '💵',
        'name': "Thanh toán khi nhận hàng",
        'detail': '',
        'enabled': true,
        'rank': 0x32,
        'paymentData': _0x35705e()
      }, {
        'id': "card",
        'method': "card",
        'icon': '💳',
        'name': "Thẻ nội địa NAPAS",
        'detail': "Thẻ mới",
        'enabled': true,
        'rank': 0x28,
        'paymentData': _0x4bc337()
      }, {
        'id': "gpay",
        'method': "gpay",
        'icon': '🇬',
        'name': "Google Pay",
        'detail': '',
        'enabled': true,
        'rank': 0x3c,
        'paymentData': _0x327d49()
      }];
    _0x5acbd4.paymentOptions = _0x5161ca();
    _0x5acbd4.selectedPaymentOption = _0x5acbd4.paymentOptions[0];
    const _0x98562e = _0x2a6931 => {
        if (_0x2a6931 === "card") return "card";
        if (_0x2a6931 === "gpay") return "gpay";
        return "cash";
      },
      _0x368cd6 = (_0x306734 = {}) => {
        const _0x171338 = _0x306734.channel_item_data || {};
        return {
          'channel_item_id': _0x59e2f9.peYLf(Number, _0x306734.channel_item_id || _0x306734.bank_account_id || 0),
          'credit_card_data': {
            'bank_id': _0x59e2f9.BVJwJ(Number, _0x306734.bank_id || _0x171338.bank_id || 0),
            'bank_name': _0x59e2f9.mrJsw(String, _0x306734.bank_name || _0x306734.display_name || _0x171338.bank_name || ''),
            'card_number': _0x59e2f9.lSyne(String, _0x306734.card_number || _0x171338.card_number || ''),
            'expiry_date': _0x59e2f9.zQXNd(String, _0x306734.expiry_date || _0x171338.expiry_date || '')
          }
        };
      },
      _0x2989bf = (_0x28f83c, _0x562431 = null) => {
        if (!_0x28f83c || typeof _0x28f83c !== "object") return _0x35705e();
        const _0x4bc713 = Number(_0x28f83c.channel_id || 0),
          _0x40d04a = Number(_0x28f83c.version || 1);
        if (_0x28f83c?.["groups"]?.["cod"] || _0x4bc713 === 59000 || _0x28f83c.channelid === 59000) return _0x35705e();
        const _0x55cd06 = {
          'channel_id': _0x4bc713,
          'channel_item_option_info': _0x562431 ? _0x368cd6(_0x562431) : _0x368cd6(_0x28f83c.selected_channel_item || {}),
          'version': _0x40d04a
        };
        return Number(_0x28f83c.be_channel_id || 0) > 0 && (_0x55cd06.be_channel_id = Number(_0x28f83c.be_channel_id)), _0x55cd06;
      },
      _0x418821 = (_0x22a75d, _0x6e0a92 = null) => String(_0x6e0a92?.["disabled_reason"] || _0x22a75d?.["disabled_reason"] || _0x22a75d?.["preselect_disabled_reason"] || _0x22a75d?.["selected_channel_item"]?.["error_message"] || '').trim(),
      _0x5ddb79 = (_0x47807e, _0x579d33 = null) => _0x47807e?.["enabled"] !== false && _0x47807e?.["preselect_disabled"] !== true && (!_0x579d33 || _0x579d33.enabled !== false) && !_0x418821(_0x47807e, _0x579d33),
      _0x3a0b40 = _0x2e22b0 => {
        const _0x2f5d83 = String(_0x2e22b0?.["name"] || '').toLowerCase(),
          _0x253b49 = _0x2e22b0?.["groups"] || {},
          _0x534fee = Number(_0x2e22b0?.["channel_id"] || _0x2e22b0?.["channelid"] || 0);
        if (_0x253b49.wallet || _0x534fee === 5001800 || _0x2f5d83.includes("số dư ví")) return {
          'type': "wallet",
          'method': "wallet",
          'icon': '👛',
          'rank': 0xa
        };
        if (_0x253b49.bank_account || _0x534fee === 5002900 || _0x2f5d83.includes("ngân hàng liên kết")) return {
          'type': "giro",
          'method': "giro",
          'icon': '🏦',
          'rank': 0x14
        };
        if (_0x253b49.credit_card || _0x534fee === 5004000 || _0x2f5d83.includes("tín dụng") || _0x2f5d83.includes("ghi nợ")) return {
          'type': "credit",
          'method': "credit",
          'icon': '💳',
          'rank': 0x1e
        };
        if (_0x534fee === 5003320 || _0x2f5d83.includes("napas")) return {
          'type': "napas",
          'method': "card",
          'icon': '💳',
          'rank': 0x28
        };
        if (_0x253b49.cod || _0x534fee === 59000 || _0x2e22b0?.["channelid"] === 59000) return {
          'type': "cod",
          'method': "cash",
          'icon': '💵',
          'rank': 0x32
        };
        if (_0x534fee === 5009500 || _0x2f5d83.includes("google pay")) return {
          'type': "gpay",
          'method': "gpay",
          'icon': '🇬',
          'rank': 0x3c
        };
        if (_0x2f5d83.includes('qr')) return {
          'type': "other",
          'method': "other",
          'icon': '🔳',
          'rank': 0x46
        };
        if (_0x253b49.installment || _0x2f5d83.includes("trả góp")) return {
          'type': "other",
          'method': "other",
          'icon': '💳',
          'rank': 0x46
        };
        return {
          'type': "other",
          'method': "other",
          'icon': '💰',
          'rank': 0x46
        };
      },
      _0xd2bcc5 = _0x37db6f => {
        const _0x5d259b = {
            'AZLMA': function (_0x3cac13, _0x5a320f, _0x28ebdb) {
              return _0x59e2f9.EWMJB(_0x3cac13, _0x5a320f, _0x28ebdb);
            },
            'ooHSq': function (_0x4240a5, _0x57b217) {
              return _0x59e2f9.lSyne(_0x4240a5, _0x57b217);
            },
            'WgdCK': function (_0xa2198a, _0x55cc83) {
              return _0xa2198a || _0x55cc83;
            },
            'xNBIs': function (_0xbca474, _0x1bbae7) {
              return _0x59e2f9.fKqah(_0xbca474, _0x1bbae7);
            },
            'gPQEf': function (_0x221368, _0x3ce81a, _0x89dd3b) {
              return _0x59e2f9.EWMJB(_0x221368, _0x3ce81a, _0x89dd3b);
            },
            'LMDxL': "Hình thức thanh toán khác",
            'PbRPw': function (_0x45656a, _0x30de88) {
              return _0x59e2f9.HMsVB(_0x45656a, _0x30de88);
            },
            'fSMvF': "giro",
            'wBZtd': "credit",
            'YxyyU': function (_0x1e6ae7, _0x439904) {
              return _0x59e2f9.bUfck(_0x1e6ae7, _0x439904);
            },
            'haMKq': "napas",
            'uTpVB': "wallet",
            'RTzhD': function (_0x2fe78c, _0x4becb6) {
              return _0x59e2f9.KUvHx(_0x2fe78c, _0x4becb6);
            },
            'cXdXU': function (_0x4d2ab7, _0x39ec60) {
              return _0x59e2f9.SiBVb(_0x4d2ab7, _0x39ec60);
            },
            'RmHnL': "số dư ví shopeepay",
            'gvgYU': function (_0x2bd803, _0x56631d) {
              return _0x59e2f9.fIPze(_0x2bd803, _0x56631d);
            },
            'MdGmC': function (_0x1b147e, _0x2b8212) {
              return _0x59e2f9.eFPVL(_0x1b147e, _0x2b8212);
            },
            'AYNbG': "vi-VN",
            'ispQS': function (_0x239122, _0x4428f1, _0x2d7b85, _0x3c6bc5) {
              return _0x59e2f9.WfYIi(_0x239122, _0x4428f1, _0x2d7b85, _0x3c6bc5);
            }
          },
          _0x3259e0 = Array.isArray(_0x37db6f?.["payment_channel_info"]?.["channels"]) ? _0x37db6f.payment_channel_info.channels : [],
          _0x52004f = [];
        return _0x3259e0.forEach((_0x3157b5, _0x369cae) => {
          const _0x10f163 = _0x5d259b.ooHSq(_0x3a0b40, _0x3157b5),
            _0x20be51 = _0x5d259b.ooHSq(String, _0x3157b5?.["name"] || "Hình thức thanh toán khác"),
            _0x4477a7 = (_0x4cea11, _0x304c0e, _0x3da3ca) => {
              const _0x1b13dc = _0x5d259b.AZLMA(_0x5ddb79, _0x3157b5, _0x4cea11),
                _0x1f93b6 = _0x5d259b.AZLMA(_0x418821, _0x3157b5, _0x4cea11);
              _0x52004f.push({
                'id': _0x10f163.method + ':' + _0x5d259b.ooHSq(Number, _0x3157b5.channel_id || _0x3157b5.channelid || 0) + ':' + (_0x4cea11?.["channel_item_id"] || _0x4cea11?.["bank_account_id"] || _0x304c0e || 0) + ':' + _0x369cae,
                'method': _0x10f163.method,
                'icon': _0x10f163.icon,
                'name': _0x20be51,
                'detail': _0x5d259b.ooHSq(String, _0x3da3ca || '').trim(),
                'enabled': _0x1b13dc,
                'disabledReason': _0x1f93b6,
                'rank': _0x1b13dc ? _0x10f163.rank : _0x5d259b.xNBIs(900, _0x10f163.rank),
                'paymentData': _0x5d259b.gPQEf(_0x2989bf, _0x3157b5, _0x4cea11)
              });
            };
          if (_0x5d259b.PbRPw(_0x10f163.type, "giro") && Array.isArray(_0x3157b5.bank_accounts) && _0x3157b5.bank_accounts.length) {
            _0x3157b5.bank_accounts.forEach((_0x5e5456, _0x4f1492) => _0x4477a7(_0x5e5456, _0x4f1492, '' + (_0x5e5456.bank_name || _0x5e5456.display_name || "Ngân hàng") + (_0x5e5456.bank_account_number ? " | " + _0x5e5456.bank_account_number : '')));
            return;
          }
          if ((_0x5d259b.PbRPw(_0x10f163.type, "credit") || _0x5d259b.YxyyU(_0x10f163.type, "napas")) && Array.isArray(_0x3157b5.cards) && _0x3157b5.cards.length) {
            _0x3157b5.cards.forEach((_0x175e69, _0x474102) => _0x4477a7(_0x175e69, _0x474102, '' + (_0x175e69.bank_name || "Thẻ") + (_0x175e69.card_number ? " | " + _0x175e69.card_number : '')));
            return;
          }
          let _0x558b3e = '';
          _0x5d259b.YxyyU(_0x10f163.type, "wallet") && (_0x558b3e = _0x5d259b.ooHSq(_0x418821, _0x3157b5) || '');
          if (_0x5d259b.YxyyU(_0x5d259b.RTzhD(Number, _0x3157b5?.["channel_id"] || _0x3157b5?.["channelid"] || 0), 5001800) || _0x5d259b.cXdXU(String, _0x3157b5?.["name"] || '').toLowerCase().includes("số dư ví shopeepay")) {
            const _0x26b372 = _0x5d259b.cXdXU(Number, _0x3157b5?.["balance"]);
            if (_0x5d259b.gvgYU(_0x3157b5?.["balance"], undefined) && !_0x5d259b.RTzhD(isNaN, _0x26b372)) {
              const _0x54c5df = "Số dư: " + Math.floor(_0x5d259b.MdGmC(_0x26b372, 100000)).toLocaleString("vi-VN") + '\x20đ';
              _0x558b3e = _0x558b3e ? _0x54c5df + " - " + _0x558b3e : _0x54c5df;
            }
          }
          _0x5d259b.ispQS(_0x4477a7, null, 0, _0x558b3e);
        }), _0x52004f.length ? _0x52004f.sort((_0x599e85, _0x57a109) => _0x599e85.rank - _0x57a109.rank) : _0x59e2f9.UiyvC(_0x5161ca);
      },
      _0x42d4ea = _0x2ee8c0 => {
        const _0x219fd9 = _0x59e2f9.PpLRJ(_0xd2bcc5, _0x2ee8c0),
          _0x1092fc = _0x5acbd4.selectedPaymentOption?.['id'] || _0x5acbd4.paymentMethod,
          _0x5c56f0 = _0x219fd9.find(_0xf44b0e => _0xf44b0e.enabled && _0xf44b0e.id === _0x1092fc) || _0x219fd9.find(_0x21fe79 => _0x21fe79.enabled && _0x98562e(_0x21fe79.method) === _0x98562e(_0x5acbd4.paymentMethod)) || _0x219fd9.find(_0x5810e4 => _0x5810e4.enabled) || _0x219fd9[0];
        _0x5acbd4.paymentOptions = _0x219fd9;
        _0x5acbd4.selectedPaymentOption = _0x5c56f0;
        _0x5acbd4.paymentMethod = _0x5c56f0?.["method"] || _0x59e2f9.FVyJx(_0x98562e, _0x5acbd4.paymentMethod);
        _0x59e2f9.ERvYK(_0x200646);
      },
      _0x43cf18 = () => {
        const _0xaf0df4 = _0x5acbd4.selectedPaymentOption || _0x5acbd4.paymentOptions?.["find"](_0x2c5395 => _0x2c5395.id === _0x5acbd4.paymentMethod);
        if (_0xaf0df4?.["paymentData"]) return _0xaf0df4.paymentData;
        return _0xdb46af(_0x5acbd4.paymentMethod);
      },
      _0x200646 = () => {
        const _0x808071 = {
            'yHcrk': function (_0x49b4ca, _0x13da82) {
              return _0x49b4ca(_0x13da82);
            },
            'lrGOs': " disabled",
            'WcOQt': function (_0x27a7a3, _0x44ab13) {
              return _0x27a7a3(_0x44ab13);
            },
            'zBWoh': function (_0x40de8d, _0x3c9d6c) {
              return _0x40de8d(_0x3c9d6c);
            }
          },
          _0x4d9cdd = document.getElementById("setting-payment-method"),
          _0x3efab6 = document.getElementById("payment-method-info");
        if (!_0x4d9cdd) return;
        const _0x26cf95 = Array.isArray(_0x5acbd4.paymentOptions) && _0x5acbd4.paymentOptions.length ? _0x5acbd4.paymentOptions : _0x5161ca();
        _0x4d9cdd.innerHTML = _0x26cf95.map(_0x1da123 => {
          const _0x47e33c = _0x1da123.detail || (!_0x1da123.enabled ? _0x1da123.disabledReason : ''),
            _0x90c143 = (_0x1da123.icon || '💰') + '\x20' + _0x1da123.name + (_0x47e33c ? " - " + _0x47e33c : '');
          return "<option value=\"" + _0x808071.yHcrk(_0x47f96e, _0x1da123.id) + '\x22' + (_0x1da123.enabled ? '' : " disabled") + '>' + _0x808071.WcOQt(_0x47f96e, _0x90c143) + "</option>";
        }).join('');
        const _0x36f210 = _0x26cf95.find(_0x32b0a9 => _0x32b0a9.id === _0x5acbd4.selectedPaymentOption?.['id']) || _0x26cf95.find(_0x204048 => _0x204048.enabled) || _0x26cf95[0];
        if (_0x36f210) _0x4d9cdd.value = _0x36f210.id;
        const _0x152805 = document.getElementById("payment-options-dropdown"),
          _0x383664 = document.querySelector(".payment-select-trigger-text");
        _0x152805 && (_0x152805.innerHTML = _0x26cf95.map(_0xbaaaa0 => {
          const _0x5228ae = _0xbaaaa0.detail || (!_0xbaaaa0.enabled ? _0xbaaaa0.disabledReason : ''),
            _0x4230df = !!_0x5228ae,
            _0x328096 = _0xbaaaa0.enabled ? '' : " disabled",
            _0x3f3db5 = _0xbaaaa0.enabled ? " onclick=\"selectPaymentOption('" + _0x808071.yHcrk(_0x47f96e, _0xbaaaa0.id) + "')\"" : '';
          return "\n              <div class=\"payment-option-item" + _0x328096 + '\x22' + _0x3f3db5 + ">\n                <div class=\"payment-option-row1\">\n                  <span class=\"payment-option-icon\">" + (_0xbaaaa0.icon || '💰') + "</span>\n                  <span class=\"payment-option-name\">" + _0x808071.yHcrk(_0x47f96e, _0xbaaaa0.name) + "</span>\n                </div>\n                " + (_0x4230df ? "<div class=\"payment-option-row2\">" + _0x808071.zBWoh(_0x47f96e, _0x5228ae) + "</div>" : '') + "\n              </div>\n            ";
        }).join(''));
        _0x383664 && _0x36f210 && (_0x383664.innerHTML = "<span class=\"payment-option-icon\">" + (_0x36f210.icon || '💰') + "</span> <span style=\"font-weight:500;\">" + _0x47f96e(_0x36f210.name) + "</span>");
        if (_0x3efab6 && _0x36f210) {
          const _0x12ab4b = _0x36f210.enabled ? _0x36f210.detail : _0x36f210.disabledReason || "Phương thức này đang bị tắt.";
          _0x3efab6.textContent = _0x12ab4b || '';
          _0x3efab6.className = ("payment-method-info " + (_0x36f210.enabled ? '' : "error")).trim();
          _0x3efab6.style.display = _0x12ab4b ? "block" : "none";
        }
      };
    window.handlePaymentMethodChange = _0xb444ab => {
      const _0x510beb = Array.isArray(_0x5acbd4.paymentOptions) ? _0x5acbd4.paymentOptions : [],
        _0x37b9f9 = _0x510beb.find(_0x53d186 => _0x53d186.id === _0xb444ab?.["value"]);
      if (!_0x37b9f9 || !_0x37b9f9.enabled) {
        _0x59e2f9.isScj(_0x200646);
        return;
      }
      _0x5acbd4.selectedPaymentOption = _0x37b9f9;
      _0x5acbd4.paymentMethod = _0x37b9f9.method;
      _0x59e2f9.qnAhK(_0x200646);
    };
    window.togglePaymentDropdown = _0x27757f => {
      _0x27757f.stopPropagation();
      const _0x318d38 = document.querySelector(".payment-select-container"),
        _0x174873 = document.getElementById("payment-options-dropdown");
      if (_0x174873) {
        const _0x30b177 = _0x59e2f9.oVVpF(_0x174873.style.display, "none");
        _0x174873.style.display = _0x30b177 ? "block" : "none";
        _0x30b177 ? _0x318d38.classList.add("active") : _0x318d38.classList.remove("active");
      }
    };
    window.selectPaymentOption = _0x48572b => {
      const _0x225e33 = document.getElementById("setting-payment-method");
      _0x225e33 && (_0x225e33.value = _0x48572b, _0x225e33.dispatchEvent(new Event("change")));
      const _0x422372 = document.getElementById("payment-options-dropdown"),
        _0x52022a = document.querySelector(".payment-select-container");
      if (_0x422372) _0x422372.style.display = "none";
      if (_0x52022a) _0x52022a.classList.remove("active");
    };
    document.addEventListener("click", _0x29ba1b => {
      const _0x3d60a7 = document.getElementById("payment-options-dropdown"),
        _0x142dd2 = document.querySelector(".payment-select-container");
      _0x3d60a7 && _0x142dd2 && !_0x142dd2.contains(_0x29ba1b.target) && (_0x3d60a7.style.display = "none", _0x142dd2.classList.remove("active"));
    });
    window.refreshPaymentOptionsFromCheckout = _0x12a7af => {
      _0x59e2f9.VxMew(_0x42d4ea, _0x12a7af);
    };
    const _0x5d1fee = () => {
        _0x5acbd4.paymentOptions = _0x59e2f9.qnAhK(_0x5161ca);
        const _0x1ce6ce = _0x5acbd4.paymentOptions.find(_0x18fb9e => _0x98562e(_0x18fb9e.method) === _0x98562e(_0x5acbd4.paymentMethod)) || _0x5acbd4.paymentOptions[0];
        _0x5acbd4.selectedPaymentOption = _0x1ce6ce;
        _0x5acbd4.paymentMethod = _0x1ce6ce.method;
        _0x59e2f9.ERvYK(_0x200646);
      },
      _0xdb46af = _0x4ae0e7 => {
        if (_0x59e2f9.inFvB(_0x4ae0e7, "card")) return _0x59e2f9.qnAhK(_0x4bc337);else return _0x59e2f9.HMsVB(_0x4ae0e7, "gpay") ? _0x59e2f9.isScj(_0x327d49) : _0x59e2f9.UiyvC(_0x35705e);
      },
      _0x29869a = _0xd0e977 => {
        if (_0x59e2f9.KwqkR(_0xd0e977, "card")) return {
          'version': 0x2,
          'option_info': '',
          'channel_id': 0x4c5838,
          'text_info': {},
          'ros_opt_in': false,
          'name': "Napas",
          'support_advance_booking': true,
          'combined_payments_info': {
            'base_payable': 0x0,
            'total_payable': 0x0,
            'price_breakdown': [],
            'splits': []
          }
        };else return _0x59e2f9.VMHqv(_0xd0e977, "gpay") ? {
          'version': 0x2,
          'option_info': '',
          'channel_id': 0x4c705c,
          'text_info': {},
          'ros_opt_in': false,
          'name': "Google Pay",
          'support_advance_booking': true,
          'combined_payments_info': {
            'base_payable': 0x0,
            'total_payable': 0x0,
            'price_breakdown': [],
            'splits': []
          }
        } : {
          'version': 0x1,
          'payment_channelid': 0xe678,
          'option_info': '',
          'text_info': {},
          'ros_opt_in': false,
          'name': "Thanh toán khi nhận hàng",
          'support_advance_booking': true,
          'combined_payments_info': {
            'base_payable': 0x0,
            'total_payable': 0x0,
            'price_breakdown': [],
            'splits': []
          }
        };
      },
      _0x42fe82 = () => {
        const _0x4e89cf = Date.now(),
          _0x25b6c2 = Math.floor(_0x59e2f9.eFPVL(_0x4e89cf, 1000)),
          _0x48ecbc = window.current_user_id || _0x5acbd4.userid,
          _0x2e5933 = _0x48ecbc + '-' + _0x4e89cf,
          _0x3e9017 = _0x59e2f9.BFFre(_0xdb46af, _0x5acbd4.paymentMethod),
          _0x21b3ea = _0x59e2f9.qnAhK(_0x43cf18);
        return {
          'timestamp': _0x25b6c2,
          'checkout_session_id': _0x2e5933,
          'selected_payment_channel_data': _0x21b3ea || _0x3e9017
        };
      },
      _0x29a545 = window.isMobileWebClient,
      _0x4cbd05 = () => _0x29a545() ? "rweb" : 'pc',
      _0x3c84d4 = () => {
        if (!_0x5acbd4.platformVoucherEnabled) return [];
        const _0x2736cf = _0x5acbd4.platformVoucherResolved && typeof _0x5acbd4.platformVoucherResolved === "object" ? _0x5acbd4.platformVoucherResolved : null,
          _0x12ffcb = !!String(_0x5acbd4.platformVoucherInput || '').trim(),
          _0x32f9c2 = _0x39429a(_0x2736cf?.["voucherCode"] || (!_0x12ffcb ? _0x5acbd4.platformVoucherCode : '')),
          _0xc6653a = _0x47fe84(_0x2736cf?.["promotionid"] || (!_0x12ffcb ? _0x1a7978(_0x5acbd4.platformVoucherPromotionId) : ''));
        if (!_0x32f9c2 || !_0xc6653a) return [];
        return [{
          'voucher_code': _0x32f9c2,
          'promotionid': _0xc88930(_0xc6653a)
        }];
      },
      _0x39e53d = () => {
        if (!_0x5acbd4.shopVoucherEnabled) return null;
        if (_0x5acbd4.shopVoucherAutoBestOutsideList) return null;
        const _0x1d6565 = _0x59e2f9.qxkTr(Number, _0x5acbd4.selectedVoucherShopId || _0x5acbd4.shopid || 0),
          _0x13af7d = _0x5acbd4.shopVoucherByShop && _0x5acbd4.shopVoucherByShop[_0x1d6565] || _0x5acbd4.shopVoucherData,
          _0x440289 = _0x59e2f9.RVkFg(_0x33c49a, _0x13af7d?.["voucherCode"] || _0x5acbd4.shopVoucherCode);
        if (_0x13af7d?.["validationSkipForCheckout"]) return null;
        const _0x385ff2 = _0x59e2f9.zQXNd(Number, _0x13af7d?.["promotionid"]),
          _0x35343e = _0x59e2f9.RVkFg(Number, _0x13af7d?.["shopId"] || _0x1d6565 || _0x5acbd4.shopid);
        if (!_0x440289 || !Number.isFinite(_0x385ff2) || _0x59e2f9.mtVKg(_0x385ff2, 0)) return null;
        if (!Number.isFinite(_0x35343e) || _0x59e2f9.UsfuG(_0x35343e, 0)) return null;
        return {
          'shopid': _0x35343e,
          'promotionid': _0x385ff2,
          'voucher_code': _0x440289
        };
      },
      _0x24acbd = () => {
        const _0x352ecb = Array.isArray(_0xbb2033.vouchers) ? _0xbb2033.vouchers : [];
        return new Set(_0x352ecb.map(_0x8dd51e => _0x33c49a(_0x8dd51e.voucherCode)).filter(Boolean));
      },
      _0x6173b0 = _0x715b80 => {
        const _0x399dbe = _0x59e2f9.pzAlI(_0x715b80, Date) ? _0x715b80 : new Date(_0x715b80);
        if (!_0x59e2f9.pzAlI(_0x399dbe, Date) || Number.isNaN(_0x399dbe.getTime())) return '';
        return _0x399dbe.toLocaleString("vi-VN", {
          'hour12': false
        });
      },
      _0x4eb09d = _0x46b5f9 => {
        const _0xf8d1f0 = _0x4a062c(_0x46b5f9, 0, 59, 58);
        if (_0x5acbd4.shopVoucherAutoBestOutsideList) return Math.min(_0xf8d1f0, 56);
        return _0xf8d1f0;
      },
      _0x3dac5a = (_0x317eb5, _0x5614b8) => {
        const _0x44e4db = _0x59e2f9.AuZrK(String, _0x317eb5?.["error_action"]?.["title"] || '').trim(),
          _0x4bf6d4 = _0x59e2f9.fRMPy(String, _0x317eb5?.["error_action"]?.["message"] || _0x317eb5?.["error_action"]?.["default_message"] || '').trim(),
          _0x493841 = _0x59e2f9.IktKK(String, _0x317eb5?.["error_msg"] || _0x317eb5?.["error"] || _0x5614b8 || "Có lỗi xảy ra.").trim(),
          _0x3daa8a = _0x59e2f9.TQNYj(_0x59e2f9.szPlK(String, _0x317eb5?.["error"] || '').trim(), "error_redirect_to_kyc") || _0x59e2f9.oVVpF(_0x59e2f9.IktKK(Number, _0x317eb5?.["error_action"]?.["type"] || 0), 22);
        if (_0x3daa8a) {
          const _0x167275 = _0x44e4db || "Cập nhật thông tin cá nhân",
            _0x15ca1c = _0x4bf6d4 || "Bạn cần cập nhật thông tin cá nhân để tiếp tục đặt hàng.",
            _0x1c062d = _0x493841 || _0x59e2f9.AEnAF(String, _0x5614b8 || "Có lỗi xảy ra khi đặt hàng.");
          return "🪪 " + _0x167275 + ":<br>📌 " + _0x15ca1c + "<br>⚠️ " + _0x1c062d;
        }
        if (_0x44e4db && _0x493841) return _0x44e4db + " - " + _0x493841;
        if (_0x44e4db) return _0x44e4db;
        if (_0x493841) return _0x493841;
        return _0x59e2f9.BVJwJ(String, _0x5614b8 || "Có lỗi xảy ra.");
      },
      _0x5a3b9d = new Set([1, 5, 6, 14, 112]),
      _0x20ba2b = _0x3a2715 => {
        const _0x22db44 = Array.isArray(_0x3a2715?.["promotion_data"]?.["platform_vouchers"]) ? _0x3a2715.promotion_data.platform_vouchers : [],
          _0x4bd6d7 = _0x22db44.find(_0x1991f5 => _0x5a3b9d.has(Number(_0x1991f5?.["invalid_message_code"] || 0)));
        if (!_0x4bd6d7) return null;
        const _0x20efab = _0x59e2f9.fRMPy(Number, _0x4bd6d7.invalid_message_code || 0),
          _0x5c0904 = _0x59e2f9.VWyFX(_0x39429a, _0x4bd6d7.voucher_code || _0x4bd6d7.applied_voucher_code || _0x3a2715?.["promotion_data"]?.["voucher_code"] || ''),
          _0x57b715 = _0x59e2f9.RSUuY(String, _0x4bd6d7.invalid_message || _0x3a2715?.["promotion_data"]?.["invalid_message"] || "Voucher Shopee không hợp lệ.").trim(),
          _0x40c9cb = _0x59e2f9.bJqVk(_0x20efab, 112) ? " Thường do user chưa lưu voucher này. Hệ thống sẽ lưu mã cho bạn trước khi đặt." : '';
        return {
          'invalidCode': _0x20efab,
          'voucherCode': _0x5c0904,
          'message': _0x57b715,
          'displayMessage': "Voucher Shopee" + (_0x5c0904 ? '\x20(' + _0x5c0904 + ')' : '') + " lỗi " + _0x20efab + ':\x20' + _0x57b715 + _0x40c9cb
        };
      },
      _0x5301d9 = (_0xc046f5, _0x36fdc2 = "checkout/get") => {
        const _0x2f80e4 = _0x20ba2b(_0xc046f5);
        if (!_0x2f80e4) return;
        _0x1d9aeb.error('[' + _0x36fdc2 + ']\x20' + _0x2f80e4.displayMessage);
        const _0x344917 = new Error(_0x2f80e4.displayMessage);
        _0x344917.code = "PLATFORM_VOUCHER_INVALID";
        _0x344917.platformVoucherError = _0x2f80e4;
        throw _0x344917;
      },
      _0x34e592 = ({
        stage: _0x29c568,
        result = null,
        error = null
      }) => {
        if (!_0x5acbd4.isRunning || _0x59e2f9.YBNAN(error?.["message"], "Đã dừng bởi người dùng")) return {
          'action': "stop",
          'message': "Đã dừng bởi người dùng."
        };
        if (_0x59e2f9.VMHqv(error?.["message"], "CAPTCHA_REQUIRED") || _0x59e2f9.VMHqv(result?.["__placeOrderCaptcha"], true) || _0x59e2f9.IFimu(_0x59e2f9.EcEQZ(Number, result?.["error"]), 90309999) || _0x59e2f9.oVVpF(_0x59e2f9.JLftq(Number, error?.["code"]), 90309999)) return {
          'action': "stop",
          'message': "Cần xác minh captcha.",
          'captcha': true
        };
        const _0x332a1e = error?.["platformVoucherError"] || _0x59e2f9.PpLRJ(_0x20ba2b, result);
        if (_0x59e2f9.BgaJE(error?.["code"], "PLATFORM_VOUCHER_INVALID") || _0x332a1e) return {
          'action': "next_voucher",
          'message': _0x332a1e?.["displayMessage"] || error?.["message"] || "Voucher Shopee không áp dụng được."
        };
        if (_0x59e2f9.ecxMV(_0x29c568, "checkout")) return {
          'action': "next_voucher",
          'message': error?.["message"] || _0x59e2f9.agYGD(_0x3dac5a, result, "Không thể lấy thông tin thanh toán.")
        };
        if (error || _0x59e2f9.IcwXD(result?.["__placeOrderTransportError"], true) || _0x59e2f9.heINL(result?.["__placeOrderResponseReceived"], true)) return {
          'action': "unknown",
          'message': error?.["message"] || _0x59e2f9.IDZJQ(_0x3dac5a, result, "Mất kết nối sau khi gửi yêu cầu đặt hàng.")
        };
        if (!Object.prototype.hasOwnProperty.call(result, "error") || _0x59e2f9.IcwXD(result.error, null) || _0x59e2f9.ecxMV(result.error, '')) return {
          'action': "unknown",
          'message': "Response đặt hàng không đủ dữ liệu để xác định đơn đã được tạo hay chưa."
        };
        const _0x7ab4c7 = _0x59e2f9.gXmGj(Number, result.error);
        if (Number.isFinite(_0x7ab4c7) && _0x59e2f9.FaKWc(_0x7ab4c7, 0)) return {
          'action': "next_voucher",
          'message': _0x59e2f9.rbcHk(_0x3dac5a, result, "Shopee từ chối yêu cầu đặt hàng.")
        };
        return {
          'action': "stop",
          'message': _0x59e2f9.rbcHk(_0x3dac5a, result, "Lỗi đặt hàng không thuộc nhóm được phép thử tiếp.")
        };
      },
      _0x3b5c82 = (_0xf7c4b, _0x845fee = 0) => {
        const _0x2f66e4 = {
          'yCsLZ': function (_0x4fdfdf, _0x389830) {
            return _0x59e2f9.fRMPy(_0x4fdfdf, _0x389830);
          },
          'JcGQL': function (_0x264a16, _0x1043e3) {
            return _0x59e2f9.gXmGj(_0x264a16, _0x1043e3);
          },
          'FftpB': function (_0x3a77c6, _0x590b14) {
            return _0x59e2f9.UsfuG(_0x3a77c6, _0x590b14);
          }
        };
        if (!_0x5acbd4.shopVoucherEnabled) return {
          'shopVouchers': [],
          'autoApplyShopVoucher': true,
          'source': "disabled"
        };
        const _0x5e881a = _0x5acbd4.shopVoucherByShop || {},
          _0x1aa175 = (Array.isArray(_0xf7c4b) ? _0xf7c4b : []).map(_0x515e95 => Number(_0x515e95?.["shopid"] || 0)).filter(_0x2646b4 => Number.isFinite(_0x2646b4) && _0x2646b4 > 0),
          _0x581b4b = Object.keys(_0x5e881a).map(Number).filter(_0x3cdb41 => Number.isFinite(_0x3cdb41) && _0x3cdb41 > 0 && _0x5e881a[_0x3cdb41] !== null),
          _0x3dba4a = Array.from(new Set([..._0x1aa175, ..._0x581b4b])),
          _0x3d6c7f = _0x3dba4a.map(_0x5c2dc5 => {
            const _0x2e0a4 = _0x5e881a[_0x5c2dc5];
            if (!_0x2e0a4 || _0x2e0a4.validationSkipForCheckout) return null;
            const _0x123b6c = _0x2f66e4.yCsLZ(_0x33c49a, _0x2e0a4.voucherCode),
              _0x5e6f86 = _0x2f66e4.JcGQL(Number, _0x2e0a4.promotionid || 0);
            if (!_0x123b6c || _0x2f66e4.FftpB(_0x5e6f86, 0)) return null;
            return {
              'shopid': _0x2f66e4.JcGQL(Number, _0x5c2dc5),
              'promotionid': _0x5e6f86,
              'voucher_code': _0x123b6c
            };
          }).filter(Boolean);
        if (_0x59e2f9.TsQDr(_0x3d6c7f.length, 0)) return {
          'shopVouchers': _0x3d6c7f,
          'autoApplyShopVoucher': false,
          'source': "manual_by_shop"
        };
        const _0x2a64aa = _0x59e2f9.sVSWy(_0x39e53d);
        if (_0x2a64aa) return {
          'shopVouchers': [_0x2a64aa],
          'autoApplyShopVoucher': false,
          'source': "single_verified"
        };
        return {
          'shopVouchers': [],
          'autoApplyShopVoucher': true,
          'source': "auto"
        };
      },
      _0x59a8ac = _0x4f88e8 => {
        const _0x2b086d = new Map();
        return (Array.isArray(_0x4f88e8) ? _0x4f88e8 : []).forEach(_0x3c595c => {
          const _0x32b709 = _0x59e2f9.wNHeX(_0x5902a5, _0x3c595c);
          if (!_0x32b709) return;
          !_0x2b086d.has(_0x32b709.shopid) && _0x2b086d.set(_0x32b709.shopid, []);
          _0x2b086d.get(_0x32b709.shopid).push({
            'itemid': _0x32b709.itemid,
            'modelid': _0x32b709.modelid,
            'quantity': _0x32b709.quantity,
            'add_on_deal_id': _0x59e2f9.mrJsw(Number, _0x32b709.addOnDealId || 0),
            'is_add_on_sub_item': _0x59e2f9.oVVpF(_0x32b709.isAddOnSubItem, true),
            'item_group_id': _0x59e2f9.TsQDr(_0x59e2f9.YRYWR(Number, _0x32b709.addOnDealId || 0), 0) ? _0x59e2f9.pnnZe(String, _0x59e2f9.gXmGj(Number, _0x32b709.addOnDealId || 0)) : null,
            'insurances': []
          });
        }), Array.from(_0x2b086d.entries()).map(([_0x5b442e, _0x4b7a77]) => ({
          'shop': {
            'shopid': _0x5b442e
          },
          'items': _0x4b7a77
        }));
      },
      _0x7bee6c = _0x5acc33 => {
        const _0x4d949e = _0x59e2f9.fRMPy(Number, _0x5acc33 || 0);
        if (!Number.isFinite(_0x4d949e) || _0x59e2f9.mtVKg(_0x4d949e, 0)) return 0;
        return Math.round(_0x59e2f9.FfFJd(_0x4d949e, 100000));
      },
      _0x3eda96 = (_0x360ce4, _0xcacce7 = "info") => _0x1d9aeb.log("[VoucherAuto] " + _0x360ce4, _0xcacce7),
      _0x237fab = _0x3c8c79 => {
        const _0x29f813 = String(_0x3c8c79 || '').trim();
        if (!_0x29f813) return '';
        return /^https?:\/\//i.test(_0x29f813) ? _0x29f813 : "https://" + _0x29f813;
      },
      _0x21bf57 = (_0x47a3c8, _0x1a4590 = 0) => ({
        'id': _0x47a3c8?.["dataset"]?.["ruleId"] || "rule-" + (_0x1a4590 + 1),
        'label': "Rule #" + (_0x1a4590 + 1),
        'minDiscount': Number(_0x47a3c8?.["querySelector"](".voucher-auto-rule-discount")?.["value"] || 0),
        'minPercent': Number(_0x47a3c8?.["querySelector"](".voucher-auto-rule-percent")?.["value"] || 0),
        'minMinSpend': Number(_0x47a3c8?.["querySelector"](".voucher-auto-rule-minspend")?.["value"] || 0)
      }),
      _0x4c76f2 = () => {
        const _0x1e8990 = Array.from(document.querySelectorAll(".voucher-auto-rule-row"));
        if (_0x1e8990.length) return _0x1e8990.map(_0x21bf57);
        return [{
          'id': "rule-1",
          'label': '',
          'minDiscount': _0x59e2f9.fRMPy(Number, document.getElementById("voucher-auto-rule-discount")?.["value"] || 0),
          'minPercent': _0x59e2f9.XPJJV(Number, document.getElementById("voucher-auto-rule-percent")?.["value"] || 0),
          'minMinSpend': _0x59e2f9.LBsCI(Number, document.getElementById("voucher-auto-rule-minspend")?.["value"] || 0)
        }];
      };
    async function _0x362bf0(_0x4fa0a2) {
      const _0xc384ec = _0x59e2f9.KkGoE(_0x237fab, _0x4fa0a2);
      if (!_0xc384ec) return '';
      const _0x230bd1 = await _0x59e2f9.opkmg(fetch, "https://5anm.net" + "/api/shopee", {
        'method': "POST",
        'headers': {
          'Content-Type': "application/json"
        },
        'body': JSON.stringify({
          'type': "unshort",
          'url': _0xc384ec
        })
      });
      if (!_0x230bd1.ok) throw new Error("Không thể mở rộng link rút gọn (HTTP " + _0x230bd1.status + ').');
      const _0x1dff61 = await _0x230bd1.json();
      _0x59e2f9.acwcs(_0x2d1992, _0x1dff61, "VoucherAuto/expand_short_url");
      if (_0x1dff61?.["success"] && _0x1dff61?.["expanded_url"]) return _0x59e2f9.nSUAD(String, _0x1dff61.expanded_url);
      return '';
    }
    const _0x50c904 = _0x362bf0;
    async function _0x1f1228(_0x578ba5) {
      let _0x2f9305 = _0x237fab(_0x578ba5);
      if (!_0x2f9305) throw new Error("Vui lòng nhập link shop.");
      const _0x3809e9 = /(^https?:\/\/)?(s\.shopee\.vn|shp\.ee)\b/i.test(_0x2f9305);
      if (_0x3809e9 || !/shopee\.vn/i.test(_0x2f9305)) {
        _0x2f9305 = await _0x362bf0(_0x2f9305);
        if (!_0x2f9305) throw new Error("Không thể mở rộng link rút gọn.");
      }
      let _0x1d1cf4;
      try {
        _0x1d1cf4 = new URL(_0x2f9305);
      } catch (_0x23d077) {
        throw new Error("Link shop không hợp lệ.");
      }
      if (!/(^|\.)shopee\.vn$/i.test(_0x1d1cf4.hostname)) throw new Error("Link sau xử lý không phải Shopee.vn.");
      _0x1d1cf4.search = '';
      _0x1d1cf4.hash = '';
      const _0x3c9463 = decodeURIComponent(_0x1d1cf4.pathname || '').replace(/^\/+|\/+$/g, '').trim();
      if (!_0x3c9463 || /^(search|m|voucher|buyer|cart|checkout|user|product)$/i.test(_0x3c9463) || /^shopee-search/i.test(_0x3c9463)) throw new Error("URL không đại diện cho một shop hợp lệ.");
      let _0x470dd7 = {};
      const _0x2e1cdb = _0x3c9463.match(/^shop\/(\d+)$/i);
      if (_0x2e1cdb) _0x470dd7.shopid = Number(_0x2e1cdb[1]);else {
        if (!_0x3c9463.includes('/') && !/-i\.\d+\.\d+$/i.test(_0x3c9463)) _0x470dd7.username = _0x3c9463;else throw new Error("Chỉ hỗ trợ link shop.");
      }
      const _0xae6f12 = _0x4d4c36(),
        _0x2a15c3 = await fetch("https://shopee.vn/api/v4/shop/get_shop_base_v2", {
          'method': "POST",
          'headers': {
            'accept': "application/json",
            'content-type': "application/json",
            'x-api-source': _0x4cbd05(),
            'x-csrftoken': _0xae6f12.csrf,
            'x-shopee-language': 'vi'
          },
          'body': JSON.stringify(_0x470dd7),
          'mode': "cors",
          'credentials': "include"
        }),
        _0x5215ac = await _0x2a15c3.json();
      _0x2d1992(_0x5215ac, "VoucherAuto/shop");
      if (Number(_0x5215ac?.["error"]) === 1000000) throw new Error("Shop không hợp lệ hoặc không tồn tại.");
      if (Number(_0x5215ac?.["error"]) !== 0) throw new Error(_0x5215ac?.["error_msg"] || "Không resolve được shop.");
      const _0x172cf1 = _0x5215ac?.["data"] || {},
        _0x43fa33 = String(_0x172cf1?.["account"]?.["portrait"] || _0x172cf1?.["portrait"] || '');
      return {
        'shopid': Number(_0x172cf1.shopid || 0),
        'userid': Number(_0x172cf1.userid || 0),
        'name': String(_0x172cf1.name || ''),
        'username': String(_0x172cf1.account?.["username"] || _0x172cf1.username || ''),
        'portrait': _0x43fa33,
        'avatarUrl': _0x43fa33 ? /^https?:\/\//i.test(_0x43fa33) ? _0x43fa33 : "https://down-vn.img.susercontent.com/file/" + _0x43fa33 : '',
        'itemCount': Number(_0x172cf1.item_count || 0),
        'isOfficial': !!_0x172cf1.is_official_shop
      };
    }
    async function _0x47259f(_0x2fa06b) {
      const _0xc66b93 = _0x59e2f9.isScj(_0x4d4c36),
        _0x51322f = await _0x59e2f9.HxBIz(fetch, "https://shopee.vn/api/v2/voucher_wallet/get_shop_vouchers_by_shopid?shopid=" + _0x59e2f9.KkGoE(encodeURIComponent, _0x2fa06b), {
          'method': "GET",
          'headers': {
            'accept': "application/json",
            'x-api-source': _0x59e2f9.qnAhK(_0x4cbd05),
            'x-csrftoken': _0xc66b93.csrf,
            'x-shopee-language': 'vi'
          },
          'mode': "cors",
          'credentials': "include"
        }),
        _0x5863f7 = await _0x51322f.json();
      _0x59e2f9.XGVvD(_0x2d1992, _0x5863f7, "VoucherAuto/voucher_list");
      if (_0x59e2f9.fIPze(_0x59e2f9.ujOmT(Number, _0x5863f7?.["error"] || 0), 0)) throw new Error(_0x5863f7?.["error_msg"] || "Không tải được voucher shop.");
      return Array.isArray(_0x5863f7?.["data"]?.["voucher_list"]) ? _0x5863f7.data.voucher_list : [];
    }
    async function _0x19deb0(_0x3cb378) {
      const _0x54e6ed = await _0x59e2f9.XOBOr(_0x47259f, _0x3cb378);
      return _0x2c3348 = new Set(_0x54e6ed.map(_0x264e00 => _0x264e00?.["promotionid"]).filter(_0x29fdd => _0x29fdd != null).map(String)), _0x5b0961 = true, _0x59e2f9.YRYWR(_0x3eda96, "Baseline vouchers=" + _0x54e6ed.length), _0x479f81 && (console.warn("[VoucherAuto][TEST] Clearing baseline promotion IDs."), _0x59e2f9.ooPuz(_0x3eda96, "[TEST] Baseline IDs cleared", "error"), _0x2c3348.clear()), _0x54e6ed;
    }
    async function _0x319ef3(_0x248a6c, _0x139ffe) {
      const _0x7fca40 = await fetch("https://shopee.vn/api/v2/voucher_wallet/save_shop_voucher_by_voucher_code", {
          'headers': {
            'accept': "application/json",
            'accept-language': "en-US,en;q=0.9,vi;q=0.8,ar;q=0.7,id;q=0.6",
            'content-type': "application/json"
          },
          'referrer': "https://shopee.vn/cart/",
          'body': JSON.stringify({
            'voucher_code': _0x248a6c,
            'shop_ids': [parseInt(_0x139ffe, 10)]
          }),
          'method': "POST",
          'mode': "cors",
          'credentials': "include"
        }),
        _0x562804 = await _0x7fca40.json();
      _0x2d1992(_0x562804, "shop_voucher/save");
      const _0x334f11 = _0x562804?.["data"]?.["voucher"];
      if (_0x562804?.["error"] !== 0 || !_0x334f11 || Number(_0x334f11.promotionid) === 0) throw new Error(_0x562804?.["error_msg"] || "Không tìm thấy mã shop hiện tại");
      return _0x334f11;
    }
    function _0x1b6560({
      discountPercentage: _0xd7665,
      discountValue: _0x5d21b8,
      minSpend: _0x343f3c
    }) {
      const _0x2675e = Number(_0xd7665) || 0,
        _0x56f086 = Number(_0x5d21b8) || 0,
        _0x155e28 = Number(_0x343f3c) || 0;
      if (_0x2675e <= 0) {
        if (_0x56f086 <= 0) return 0;
        if (_0x155e28 <= 0) return 100;
        return Math.min(100, _0x56f086 / _0x155e28 * 100);
      }
      if (_0x155e28 <= 0 || _0x56f086 <= 0) return Math.min(100, _0x2675e);
      const _0x1d4f96 = _0x56f086 / _0x155e28 * 100;
      return Math.min(100, _0x2675e, _0x1d4f96);
    }
    function _0x4e3f5f(_0x534268) {
      const _0x51f71a = _0x59e2f9.IZSvs(_0x7bee6c, _0x534268?.["min_spend"] || _0x534268?.["min_spend_amount"]),
        _0x4e1252 = _0x59e2f9.nSUAD(_0x7bee6c, _0x534268?.["reward_value"] || _0x534268?.["discount_value"]),
        _0x458481 = _0x59e2f9.igBaR(Number, _0x534268?.["reward_percentage"] || _0x534268?.["discount_percentage"] || 0),
        _0x1be3ff = _0x59e2f9.XPHJH(_0x7bee6c, _0x534268?.["reward_cap"] || _0x534268?.["discount_cap"] || _0x534268?.["max_value"]),
        _0x2cae3b = Math.max(_0x4e1252, _0x1be3ff, _0x59e2f9.wNHeX(_0x7bee6c, _0x534268?.["max_discount_value"])),
        _0x163f85 = _0x59e2f9.RmlKz(_0x458481, 0) ? _0x1be3ff || _0x4e1252 || _0x2cae3b : _0x4e1252 || _0x2cae3b,
        _0x2e8f40 = _0x59e2f9.DyNSF(_0x1b6560, {
          'discountPercentage': _0x458481,
          'discountValue': _0x163f85,
          'minSpend': _0x51f71a
        });
      return {
        'promotionId': _0x59e2f9.IktKK(String, _0x534268?.["promotionid"] || ''),
        'voucherCode': _0x59e2f9.xdnOs(_0x33c49a, _0x534268?.["voucher_code"] || _0x534268?.["voucherCode"] || ''),
        'minSpend': _0x51f71a,
        'discountType': _0x59e2f9.RmlKz(_0x458481, 0) ? "percentage" : "fixed",
        'discountValue': _0x163f85,
        'discountPercentage': _0x458481,
        'discountCap': _0x1be3ff || (_0x59e2f9.DkRUT(_0x458481, 0) ? _0x163f85 : 0),
        'rewardValue': _0x4e1252,
        'rewardPercentage': _0x458481,
        'rewardCap': _0x1be3ff,
        'maxDiscountValue': _0x2cae3b,
        'trueDiscountPercentage': _0x2e8f40,
        'effectiveDiscountPercent': _0x2e8f40,
        'startTime': _0x59e2f9.hKqiC(_0x59e2f9.bjCdi(Number, _0x534268?.["start_time"] || 0), 1000),
        'endTime': _0x59e2f9.hKqiC(_0x59e2f9.wNHeX(Number, _0x534268?.["end_time"] || 0), 1000),
        'productLimit': _0x534268?.["product_limit"],
        'remainingUsageLimit': _0x534268?.["remaining_usage_limit"],
        'raw': _0x534268
      };
    }
    function _0x34868c(_0x5cbaa8, _0x2b4dac = Date.now()) {
      const _0x425964 = _0x59e2f9.sNDql(Number, _0x5cbaa8?.["startTime"] || 0);
      if (!_0x425964) return true;
      return _0x59e2f9.VVzXu(_0x425964, _0x59e2f9.chinz(_0x2b4dac, _0x3b30d0)) && _0x59e2f9.UsfuG(_0x425964, _0x59e2f9.AABwv(_0x2b4dac, _0x22371f));
    }
    function _0x37b549(_0xc32553, _0x48809b) {
      if (Number(_0x48809b.minDiscount || 0) > 0) {
        const _0x2bacec = Math.max(Number(_0xc32553.maxDiscountValue || 0), Number(_0xc32553.discountValue || 0));
        if (_0x2bacec < Number(_0x48809b.minDiscount)) return false;
      }
      if (Number(_0x48809b.minPercent || 0) > 0 && Number(_0xc32553.effectiveDiscountPercent || 0) < Number(_0x48809b.minPercent)) return false;
      const _0x2e8e77 = Number(_0x48809b.minMinSpend ?? _0x48809b.maxMinSpend ?? 0);
      if (_0x2e8e77 > 0 && Number(_0xc32553.minSpend || 0) < _0x2e8e77) return false;
      return true;
    }
    function _0x34f872(_0x19ac98, _0xb01f16) {
      const _0x363a6f = Array.isArray(_0xb01f16) && _0xb01f16.length ? _0xb01f16 : [{}];
      return _0x363a6f.find(_0x283ba1 => _0x37b549(_0x19ac98, _0x283ba1)) || null;
    }
    function _0x2f33ab(_0x4641cf, _0x58fd44) {
      const _0xec9274 = _0x59e2f9.ttKQK(_0x59e2f9.LLXhw(Number, _0x58fd44?.["maxDiscountValue"] || 0), _0x59e2f9.KiPzq(Number, _0x4641cf?.["maxDiscountValue"] || 0));
      if (_0x59e2f9.FaKWc(_0xec9274, 0)) return _0xec9274;
      return _0x59e2f9.Nywoq(_0x59e2f9.oCxSY(Number, _0x58fd44?.["voucher"]?.["effectiveDiscountPercent"] || 0), _0x59e2f9.RVkFg(Number, _0x4641cf?.["voucher"]?.["effectiveDiscountPercent"] || 0));
    }
    async function _0x5bbef8(_0x230aa6) {
      let _0x1e0639 = null;
      for (let _0x2bb6cd = 1; _0x59e2f9.nPAdl(_0x2bb6cd, _0x1cd8e4); _0x2bb6cd++) {
        const _0x269625 = new URLSearchParams({
            'by': "sales",
            'item_aggregator': '1',
            'limit': _0x59e2f9.BfXPd(String, _0x44378f),
            'offset': '0',
            'order': "desc",
            'prediction_type': '1',
            'promotion_id': _0x59e2f9.zQXNd(String, _0x230aa6),
            'use_case': "fe.vlp.rcmd"
          }),
          _0x24539d = await _0x59e2f9.XGVvD(fetch, "https://shopee.vn/api/v4/mpi/rcmd/vlp_item?" + _0x269625.toString(), {
            'method': "GET",
            'headers': {
              'accept': "application/json",
              'x-api-source': _0x59e2f9.jblgN(_0x4cbd05),
              'x-shopee-language': 'vi'
            },
            'mode': "cors",
            'credentials': "include"
          }),
          _0x119564 = await _0x24539d.json();
        _0x59e2f9.nvTbM(_0x2d1992, _0x119564, "VoucherAuto/VLP");
        if (_0x59e2f9.inFvB(_0x59e2f9.QvxuS(Number, _0x119564?.["error"] || 0), 0)) {
          const _0x1dc647 = _0x119564?.["data"]?.["item_cards"]?.["item_cards"];
          if (!Array.isArray(_0x1dc647) || _0x59e2f9.ptGMA(_0x1dc647.length, 0)) throw new Error("Voucher đã được phát hiện nhưng VLP không trả về sản phẩm khả dụng.");
          return _0x1dc647;
        }
        if (_0x59e2f9.YzbrU(_0x59e2f9.wLyid(Number, _0x119564?.["error"]), 165100024)) {
          _0x59e2f9.XGVvD(_0x3eda96, "VLP lỗi promotion=" + _0x230aa6 + " error=" + _0x119564?.["error"] + '\x20' + (_0x119564?.["error_msg"] || ''), "error");
          throw new Error(_0x119564?.["error_msg"] || "VLP error " + _0x119564?.["error"]);
        }
        _0x1e0639 = _0x119564?.["error_msg"] || "Promotion chưa sẵn sàng.";
        await _0x59e2f9.peYLf(_0x1f795e, _0x5acbd4.retry_delay);
      }
      throw new Error(_0x1e0639 || "VLP promotion error quá số lần retry.");
    }
    function _0x52f11b(_0x11eacb) {
      return (Array.isArray(_0x11eacb) ? _0x11eacb : []).slice(0, _0x44378f).map((_0x66e377, _0x4de18d) => {
        const _0x332d91 = _0x66e377?.["item_data"] || {},
          _0x455f99 = _0x332d91?.["item_card_display_price"] || {},
          _0x4bcf46 = _0x59e2f9.EcEQZ(_0x7bee6c, _0x455f99.applied_product_promo_price),
          _0x22f1b3 = _0x59e2f9.TsQDr(_0x4bcf46, 0) ? _0x4bcf46 : _0x59e2f9.pEfuU(_0x7bee6c, _0x455f99.price);
        return {
          'itemId': _0x59e2f9.HRVsS(Number, _0x332d91.itemid || 0),
          'shopId': _0x59e2f9.xzIcc(Number, _0x332d91.shopid || 0),
          'modelId': _0x59e2f9.cBLJa(Number, _0x455f99.model_id || 0),
          'price': _0x22f1b3,
          'displayPrice': _0x59e2f9.SiBVb(_0x7bee6c, _0x455f99.price),
          'appliedProductPromoPrice': _0x4bcf46,
          'name': _0x59e2f9.VxMew(String, _0x332d91.name || _0x332d91.title || ''),
          'image': _0x332d91.image ? "https://down-vn.img.susercontent.com/file/" + _0x332d91.image : '',
          'isSoldOut': _0x59e2f9.rugUi(_0x332d91.is_sold_out, true) || _0x59e2f9.RJCSy(_0x59e2f9.AuZrK(Number, _0x332d91.stock || 1), 0),
          'salesRank': _0x4de18d,
          'raw': _0x66e377
        };
      }).filter(_0x5c7135 => _0x5c7135.itemId && _0x5c7135.shopId && _0x5c7135.modelId && _0x5c7135.price > 0 && !_0x5c7135.isSoldOut);
    }
    function _0x4cf8ad(_0x16dde5, _0x4cface) {
      if (Number(_0x4cface || 0) <= 0) return 0;
      let _0x2cf210 = 0;
      if (_0x16dde5.discountType === "percentage") {
        _0x2cf210 = _0x4cface * Number(_0x16dde5.discountPercentage || 0) / 100;
        const _0xe9b0a5 = Number(_0x16dde5.discountCap || _0x16dde5.maxDiscountValue || 0);
        if (_0xe9b0a5 > 0) _0x2cf210 = Math.min(_0x2cf210, _0xe9b0a5);
      } else _0x2cf210 = Number(_0x16dde5.discountValue || _0x16dde5.maxDiscountValue || 0);
      return Math.min(Math.round(_0x2cf210), _0x4cface);
    }
    function _0x30bbac(_0x3292af, _0x5d2c38) {
      const _0x468d6e = _0x3292af.filter(_0x543199 => Number(_0x543199.quantity || 0) > 0),
        _0xf2e750 = _0x468d6e.reduce((_0x381720, _0x44ce8e) => _0x381720 + Number(_0x44ce8e.price || 0) * Number(_0x44ce8e.quantity || 0), 0);
      if (_0xf2e750 < Number(_0x5d2c38.minSpend || 0)) return null;
      const _0xc3ef83 = _0x4cf8ad(_0x5d2c38, _0xf2e750);
      return {
        'items': _0x468d6e.map(_0x39a849 => ({
          'shopid': _0x39a849.shopId,
          'itemid': _0x39a849.itemId,
          'modelid': _0x39a849.modelId,
          'quantity': _0x39a849.quantity,
          'itemTitle': _0x39a849.name,
          'variantName': '',
          'shopName': _0x120c37?.["name"] || '',
          'image': _0x39a849.image,
          'price': _0x39a849.price,
          'stock': Math.max(_0x39a849.quantity, 1)
        })),
        'subtotal': _0xf2e750,
        'expectedDiscount': _0xc3ef83,
        'expectedPayable': _0xf2e750 - _0xc3ef83,
        'payable': _0xf2e750 - _0xc3ef83,
        'distinctItems': _0x468d6e.length,
        'totalQuantity': _0x468d6e.reduce((_0x1b8235, _0x2b8e62) => _0x1b8235 + _0x2b8e62.quantity, 0),
        'salesSignature': _0x468d6e.map(_0x241870 => _0x241870.salesRank).sort((_0x3c5817, _0x3f92d2) => _0x3c5817 - _0x3f92d2),
        'compositionKey': _0x468d6e.map(_0x28ecf0 => _0x28ecf0.itemId + ':' + _0x28ecf0.modelId + ':' + _0x28ecf0.quantity).sort().join('|')
      };
    }
    function _0x29cf1a(_0x24fddd, _0x2b08ff) {
      const _0x3909d9 = _0x24fddd.salesSignature || [],
        _0x32904d = _0x2b08ff.salesSignature || [],
        _0x29eabc = Math.max(_0x3909d9.length, _0x32904d.length);
      for (let _0x3c0b36 = 0; _0x59e2f9.PRpJM(_0x3c0b36, _0x29eabc); _0x3c0b36++) {
        const _0x13d1af = _0x3909d9[_0x3c0b36] ?? 9999,
          _0x26f2cc = _0x32904d[_0x3c0b36] ?? 9999;
        if (_0x59e2f9.FaKWc(_0x13d1af, _0x26f2cc)) return _0x59e2f9.Nywoq(_0x13d1af, _0x26f2cc);
      }
      return 0;
    }
    function _0x485280(_0xa6e4b2, _0x274ee0) {
      if (_0xa6e4b2.payable !== _0x274ee0.payable) return _0xa6e4b2.payable - _0x274ee0.payable;
      if (_0xa6e4b2.subtotal !== _0x274ee0.subtotal) return _0x274ee0.subtotal - _0xa6e4b2.subtotal;
      const _0x18751d = _0x29cf1a(_0xa6e4b2, _0x274ee0);
      if (_0xa6e4b2.totalQuantity !== _0x274ee0.totalQuantity) return _0x274ee0.totalQuantity - _0xa6e4b2.totalQuantity;
      return _0x29cf1a(_0xa6e4b2, _0x274ee0);
    }
    function _0x3f82af(_0x5479b7, _0x176406) {
      const _0x4486f9 = {
          'dHABh': function (_0x513d35, _0xe526e7) {
            return _0x59e2f9.DkRUT(_0x513d35, _0xe526e7);
          },
          'IYJRs': function (_0x5588d8, _0x2f7446) {
            return _0x59e2f9.VVzXu(_0x5588d8, _0x2f7446);
          },
          'OuUyz': function (_0x1e028e, _0x4258a0) {
            return _0x59e2f9.sAFNa(_0x1e028e, _0x4258a0);
          },
          'ZAWWK': function (_0x4c8391, _0x3a4921) {
            return _0x59e2f9.TSDSh(_0x4c8391, _0x3a4921);
          },
          'PliAS': function (_0x215f29, _0x5c6b31) {
            return _0x59e2f9.PRpJM(_0x215f29, _0x5c6b31);
          },
          'nVbrt': function (_0x780034, _0x5b3f9c) {
            return _0x59e2f9.UsfuG(_0x780034, _0x5b3f9c);
          },
          'aVmah': function (_0x49ea99, _0x26d8d8) {
            return _0x59e2f9.rzQUz(_0x49ea99, _0x26d8d8);
          },
          'JBEVI': function (_0x1af3ee, _0x4d0034) {
            return _0x59e2f9.DfJFw(_0x1af3ee, _0x4d0034);
          },
          'ZzxSe': function (_0xf21270, _0x2f64b3) {
            return _0x59e2f9.VVzXu(_0xf21270, _0x2f64b3);
          },
          'vxFMZ': function (_0x2924b5, _0x40a0a1, _0x552dad) {
            return _0x59e2f9.oNdwL(_0x2924b5, _0x40a0a1, _0x552dad);
          },
          'iWlyl': function (_0x562665, _0x53161e) {
            return _0x59e2f9.uGUKb(_0x562665, _0x53161e);
          },
          'xkwWH': function (_0x3d0f46, _0x3b1b53) {
            return _0x59e2f9.mLCBL(_0x3d0f46, _0x3b1b53);
          },
          'oTmmR': function (_0x510c61, _0x28894a) {
            return _0x59e2f9.BLOyp(_0x510c61, _0x28894a);
          },
          'nadwd': function (_0x129076, _0x3bb3bf, _0x573d15, _0x3dc346) {
            return _0x59e2f9.WfYIi(_0x129076, _0x3bb3bf, _0x573d15, _0x3dc346);
          }
        },
        _0x313339 = (Array.isArray(_0x176406) ? _0x176406 : []).slice(0, _0x44378f);
      if (!_0x313339.length) return {
        'primary': null,
        'backup': null
      };
      const _0x5a58ef = _0x59e2f9.xzIcc(Number, _0x5479b7.minSpend || 0),
        _0x147f7b = _0x59e2f9.XPHJH(Number, _0x5479b7.maxDiscountValue || _0x5479b7.discountValue || 0);
      let _0x518d23 = null,
        _0x30f1d1 = null;
      function _0x3747a6(_0x315a41) {
        if (!_0x315a41) return;
        if (!_0x518d23) {
          _0x518d23 = _0x315a41;
          return;
        }
        if (_0x59e2f9.TlPQc(_0x315a41.compositionKey, _0x518d23.compositionKey)) return;
        const _0xcebf03 = _0x59e2f9.Dlemf(_0x485280, _0x315a41, _0x518d23);
        if (_0x59e2f9.KSOlW(_0xcebf03, 0)) {
          _0x30f1d1 = _0x518d23;
          _0x518d23 = _0x315a41;
          return;
        }
        if (!_0x30f1d1) {
          _0x30f1d1 = _0x315a41;
          return;
        }
        if (_0x59e2f9.YBNAN(_0x315a41.compositionKey, _0x30f1d1.compositionKey)) return;
        const _0x182a95 = _0x59e2f9.MtuYf(_0x485280, _0x315a41, _0x30f1d1);
        _0x59e2f9.ziSsH(_0x182a95, 0) && (_0x30f1d1 = _0x315a41);
      }
      for (let _0x3a11c3 = 0; _0x59e2f9.rduIt(_0x3a11c3, _0x313339.length); _0x3a11c3++) {
        for (let _0x262b7e = 1; _0x59e2f9.ONBjE(_0x262b7e, _0x9fac82); _0x262b7e++) {
          _0x59e2f9.lSyne(_0x3747a6, _0x59e2f9.pRrYY(_0x30bbac, [{
            ..._0x313339[_0x3a11c3],
            'quantity': _0x262b7e
          }], _0x5479b7));
        }
      }
      let _0x2ceb0b = 0;
      const _0x5807db = _0x147f7b;
      function _0x33eb7a(_0x1b12d5, _0x5e6a55, _0x506373) {
        _0x2ceb0b++;
        if (_0x4486f9.dHABh(_0x2ceb0b, 30000)) return;
        const _0x1f45b1 = _0x30f1d1 || _0x518d23;
        if (_0x1f45b1 && _0x4486f9.dHABh(_0x1f45b1.payable, 0)) {
          if (_0x4486f9.IYJRs(_0x4486f9.OuUyz(_0x506373, _0x147f7b), _0x1f45b1.payable)) return;
        } else {
          if (_0x518d23 && _0x4486f9.ZAWWK(_0x518d23.payable, 0) && _0x30f1d1 && _0x4486f9.ZAWWK(_0x30f1d1.payable, 0)) {
            if (_0x4486f9.dHABh(_0x506373, _0x5807db)) return;
          }
        }
        for (let _0x5e233a = _0x1b12d5; _0x4486f9.PliAS(_0x5e233a, _0x313339.length); _0x5e233a++) {
          if (_0x4486f9.dHABh(_0x2ceb0b, 30000)) break;
          const _0x2f8b0a = _0x313339[_0x5e233a];
          for (let _0x10de66 = 1; _0x4486f9.nVbrt(_0x10de66, _0x9fac82); _0x10de66++) {
            const _0x28de78 = _0x4486f9.aVmah(_0x506373, _0x4486f9.JBEVI(_0x2f8b0a.price, _0x10de66));
            if (_0x4486f9.ZzxSe(_0x28de78, _0x5a58ef)) {
              const _0x90e08 = _0x4486f9.vxFMZ(_0x30bbac, [..._0x5e6a55, {
                ..._0x2f8b0a,
                'quantity': _0x10de66
              }], _0x5479b7);
              _0x4486f9.iWlyl(_0x3747a6, _0x90e08);
              if (_0x4486f9.xkwWH(_0x90e08.payable, 0) || _0x4486f9.IYJRs(_0x28de78, _0x5807db)) break;
            } else {
              const _0x5e0936 = _0x30f1d1 || _0x518d23;
              if (_0x5e0936 && _0x4486f9.oTmmR(_0x5e0936.payable, 0) && _0x4486f9.IYJRs(_0x4486f9.OuUyz(_0x28de78, _0x147f7b), _0x5e0936.payable)) break;
              _0x5e6a55.push({
                ..._0x2f8b0a,
                'quantity': _0x10de66
              });
              _0x4486f9.nadwd(_0x33eb7a, _0x4486f9.aVmah(_0x5e233a, 1), _0x5e6a55, _0x28de78);
              _0x5e6a55.pop();
            }
          }
        }
      }
      return _0x59e2f9.TAkfc(_0x33eb7a, 0, [], 0), {
        'primary': _0x518d23,
        'backup': _0x30f1d1
      };
    }
    async function _0xea9bde(_0x326edc) {
      if (!_0x5acbd4.isRunning) return;
      _0x326edc.status = "PREPARING";
      const _0x1675ad = await _0x5bbef8(_0x326edc.promotionId);
      _0x326edc.vlpItems = _0x52f11b(_0x1675ad);
      _0x3eda96("Số sản phẩm áp đc mã items=" + _0x326edc.vlpItems.length);
      if (!_0x326edc.vlpItems.length) {
        _0x326edc.status = "FAILED";
        _0x326edc.error = "VLP không có sản phẩm hợp lệ.";
        return;
      }
      const _0x5d5ae1 = _0x3f82af(_0x326edc.voucher, _0x326edc.vlpItems);
      _0x326edc.primaryCart = _0x5d5ae1.primary;
      _0x326edc.backupCart = _0x5d5ae1.backup;
      if (!_0x326edc.primaryCart) {
        _0x326edc.status = "FAILED";
        _0x326edc.error = "Không tìm được giỏ đạt điều kiện min_spend.";
        return;
      }
      _0x326edc.status = _0x326edc.startTime > Date.now() ? "WAITING_START" : "READY";
      _0x3eda96("PRIMARY subtotal=" + _0x326edc.primaryCart.subtotal + " payable=" + _0x326edc.primaryCart.expectedPayable);
      _0x326edc.backupCart ? _0x3eda96("BACKUP subtotal=" + _0x326edc.backupCart.subtotal + " payable=" + _0x326edc.backupCart.expectedPayable) : _0x3eda96("BACKUP none");
    }
    async function _0xd783c3(_0x2975b2 = 1) {
      const _0x3f2dfe = await _0x47259f(_0x120c37.shopid);
      _0x3eda96("Scan #" + _0x2975b2 + ". Total vouchers = " + _0x3f2dfe.length);
      const _0x35d620 = _0x3f2dfe.filter(_0x42dc7e => _0x42dc7e?.["promotionid"] != null && !_0x2c3348.has(String(_0x42dc7e.promotionid)));
      if (!_0x35d620.length) return false;
      _0x3eda96("Phát hiện " + _0x35d620.length + " vouchers mới!");
      for (const _0x27a196 of _0x35d620) {
        _0x2c3348.add(String(_0x27a196.promotionid));
      }
      const _0xb8d45e = _0x4c76f2(),
        _0x58b400 = [];
      for (const _0x3f1bc9 of _0x35d620) {
        const _0x399214 = String(_0x3f1bc9.promotionid),
          _0x536459 = _0x4e3f5f(_0x3f1bc9);
        if (_0x536459.endTime && Date.now() > _0x536459.endTime) continue;
        const _0x3c0b16 = _0x34f872(_0x536459, _0xb8d45e);
        if (!_0x3c0b16) continue;
        _0x3eda96("code=" + (_0x536459.voucherCode || "N/A") + ", promotion=" + _0x399214 + '\x20' + (_0x3c0b16.label || "Rule") + "=MATCH (discount=" + _0x536459.maxDiscountValue + ", percent=" + _0x536459.effectiveDiscountPercent + '%)');
        _0x58b400.push({
          'promotionId': _0x399214,
          'voucherCode': _0x536459.voucherCode,
          'startTime': _0x536459.startTime,
          'endTime': _0x536459.endTime,
          'maxDiscountValue': _0x536459.maxDiscountValue,
          'voucher': _0x536459,
          'vlpItems': [],
          'primaryCart': null,
          'backupCart': null,
          'matchedRule': _0x3c0b16,
          'status': "MATCHED",
          'attempts': 0x0,
          'raw': _0x3f1bc9
        });
      }
      if (!_0x58b400.length) return _0x3eda96("Đã thay đổi banner nhưng không có voucher phù hợp", "warning"), true;
      _0x58b400.sort(_0x2f33ab);
      _0x4f6351 = _0x58b400;
      for (const _0x577834 of _0x58b400) {
        if (!_0x5acbd4.isRunning) break;
        if (_0x577834.endTime && Date.now() > _0x577834.endTime) {
          _0x577834.status = "EXPIRED";
          _0x3eda96("code=" + (_0x577834.voucherCode || _0x577834.promotionId) + " đã hết hạn.");
          continue;
        }
        _0x3eda96("Xử lý đặt đơn code=" + (_0x577834.voucherCode || _0x577834.promotionId) + "...");
        try {
          await _0xea9bde(_0x577834);
        } catch (_0x575d11) {
          _0x577834.status = "FAILED";
          _0x577834.error = _0x575d11.message;
          _0x3eda96("code=" + (_0x577834.voucherCode || _0x577834.promotionId) + " prepare failed: " + _0x575d11.message, "error");
          continue;
        }
        if (!_0x577834.primaryCart) {
          _0x577834.status = "FAILED";
          _0x3eda96("code=" + (_0x577834.voucherCode || _0x577834.promotionId) + " không tìm được giỏ hàng đạt điều kiện min_spend.", "error");
          continue;
        }
        if (_0x577834.startTime > Date.now()) {
          _0x3eda96("Chờ voucher code=" + (_0x577834.voucherCode || _0x577834.promotionId) + " bắt đầu lúc " + _0x6173b0(new Date(_0x577834.startTime)) + "...");
          while (_0x5acbd4.isRunning && Date.now() < _0x577834.startTime) {
            await _0x1f795e(200);
          }
          if (!_0x5acbd4.isRunning) break;
        }
        try {
          const _0x5e3d09 = _0x120c37?.["shopid"] || _0x577834.raw?.["shopid"] || _0x577834.vlpItems[0] && _0x577834.vlpItems[0].shopId,
            _0x5c29e0 = await _0x319ef3(_0x577834.voucherCode, _0x5e3d09);
          if (_0x5c29e0?.["promotionid"]) {
            _0x577834.promotionId = String(_0x5c29e0.promotionid);
            if (_0x577834.voucher) _0x577834.voucher.promotionId = _0x577834.promotionId;
          }
          if (_0x5c29e0?.["voucher_code"]) {
            _0x577834.voucherCode = _0x5c29e0.voucher_code;
            if (_0x577834.voucher) _0x577834.voucher.voucherCode = _0x577834.voucherCode;
          }
        } catch (_0x27cb93) {
          _0x577834.status = "FAILED";
          _0x577834.error = _0x27cb93.message;
          _0x3eda96("Save voucher " + _0x577834.voucherCode + " thất bại: " + _0x27cb93.message, "error");
          continue;
        }
        _0x577834.status = "EXECUTING_PRIMARY";
        const _0x1ac19e = await _0x59b165(_0x577834, _0x577834.primaryCart, "PRIMARY", _0x424007);
        if (_0x1ac19e) {
          _0x3eda96("code=" + (_0x577834.voucherCode || _0x577834.promotionId) + " đặt đơn PRIMARY thành công!", "success");
          continue;
        }
        if (_0x577834.backupCart && _0x5acbd4.isRunning) {
          _0x577834.status = "EXECUTING_BACKUP";
          const _0x798577 = await _0x59b165(_0x577834, _0x577834.backupCart, "BACKUP", Math.max(1, Number(_0x5acbd4.post_cart_retry_limit || 1)));
          if (_0x798577) {
            _0x3eda96("code=" + (_0x577834.voucherCode || _0x577834.promotionId) + " đặt đơn BACKUP thành công!", "success");
            continue;
          }
        } else {
          if (_0x5acbd4.isRunning) {
            const _0x8314ec = Math.max(0, Number(_0x5acbd4.post_cart_retry_limit || 0) - _0x424007);
            if (_0x8314ec > 0) {
              _0x577834.status = "EXECUTING_PRIMARY";
              const _0x2445b9 = await _0x59b165(_0x577834, _0x577834.primaryCart, "PRIMARY", _0x8314ec);
              if (_0x2445b9) {
                _0x3eda96("code=" + (_0x577834.voucherCode || _0x577834.promotionId) + " đặt đơn PRIMARY retry thành công!", "success");
                continue;
              }
            }
          }
        }
        _0x577834.status !== "SUCCESS" && (_0x577834.status = "FAILED", _0x3eda96("code=" + (_0x577834.voucherCode || _0x577834.promotionId) + " FAILED", "error"));
      }
      return true;
    }
    function _0x1c4e82() {
      const _0x2ba1ef = {
          'XCWxJ': function (_0x25c31d, _0x44dced) {
            return _0x25c31d > _0x44dced;
          },
          'RNTCB': "EXPIRED",
          'Vsbhf': function (_0x1446ef, _0x307e92) {
            return _0x1446ef === _0x307e92;
          },
          'NlKlL': "WAITING_START",
          'wctTM': function (_0x3d9cb0, _0x13781b) {
            return _0x3d9cb0 <= _0x13781b;
          },
          'LgwOJ': function (_0xb001ac, _0x45c440) {
            return _0xb001ac + _0x45c440;
          },
          'ByFCO': "READY"
        },
        _0x58d3d6 = Date.now();
      return _0x4f6351.forEach(_0x527fbc => {
        if (_0x527fbc.endTime && _0x2ba1ef.XCWxJ(_0x58d3d6, _0x527fbc.endTime)) _0x527fbc.status = "EXPIRED";
        _0x2ba1ef.Vsbhf(_0x527fbc.status, "WAITING_START") && _0x2ba1ef.wctTM(_0x527fbc.startTime, _0x2ba1ef.LgwOJ(_0x58d3d6, _0x3b30d0)) && (_0x527fbc.status = "READY");
      }), _0x4f6351.filter(_0x32c67c => _0x32c67c.status === "READY" && _0x32c67c.primaryCart).sort(_0x2f33ab);
    }
    function _0x3ca330(_0x1e8196, _0x24aac0) {
      _0x5acbd4.orderItems = _0x24aac0.items.map(_0x4a0b69 => _0x5902a5(_0x4a0b69)).filter(Boolean);
      const _0x4d9de9 = _0x5acbd4.orderItems[0];
      _0x5acbd4.shopid = _0x59e2f9.HRVsS(Number, _0x4d9de9?.["shopid"] || 0);
      _0x5acbd4.itemid = _0x59e2f9.JLftq(Number, _0x4d9de9?.["itemid"] || 0);
      _0x5acbd4.modelid = _0x59e2f9.KXhut(Number, _0x4d9de9?.["modelid"] || 0);
      _0x5acbd4.shopVoucherEnabled = true;
      _0x5acbd4.shopVoucherAutoBestOutsideList = false;
      _0x5acbd4.selectedVoucherShopId = _0x59e2f9.XvOGZ(Number, _0x120c37?.["shopid"] || _0x5acbd4.shopid || 0);
      _0x5acbd4.shopVoucherCode = _0x1e8196.voucherCode;
      _0x5acbd4.shopVoucherData = {
        'voucherCode': _0x1e8196.voucherCode,
        'promotionid': _0x59e2f9.AEnAF(Number, _0x1e8196.promotionId),
        'shopId': _0x5acbd4.selectedVoucherShopId,
        'validationSkipForCheckout': false
      };
      _0x5acbd4.shopVoucherByShop = {
        ..._0x5acbd4.shopVoucherByShop,
        [_0x5acbd4.selectedVoucherShopId]: _0x5acbd4.shopVoucherData
      };
      window.renderOrderItemList?.();
    }
    function _0x2a3a44(_0xe3f6, _0x468a89) {
      const _0x205fed = {
          'bEwYC': function (_0x49c675, _0x5dbcb2) {
            return _0x59e2f9.Dehxo(_0x49c675, _0x5dbcb2);
          },
          'WkFgU': function (_0x58acdd, _0x57e7bc) {
            return _0x59e2f9.EGMSB(_0x58acdd, _0x57e7bc);
          },
          'haBeC': function (_0x2c0070, _0x4083c1) {
            return _0x59e2f9.rVZce(_0x2c0070, _0x4083c1);
          },
          'LDiri': function (_0x2247cc, _0x5ea504) {
            return _0x59e2f9.IFimu(_0x2247cc, _0x5ea504);
          }
        },
        _0x29965f = _0x59e2f9.sSrGB(Number, _0x468a89.promotionId),
        _0x1ebc17 = _0x59e2f9.eMezw(_0x33c49a, _0x468a89.voucherCode),
        _0x460b8b = Array.isArray(_0xe3f6?.["promotion_data"]?.["shop_vouchers"]) ? _0xe3f6.promotion_data.shop_vouchers : [];
      return _0x460b8b.some(_0x6f2db7 => {
        const _0x59f717 = _0x205fed.bEwYC(Number, _0x6f2db7?.["invalid_message_code"] || 0),
          _0x296c79 = _0x205fed.WkFgU(Number, _0x6f2db7?.["promotionid"] || _0x6f2db7?.["promotion_id"] || 0),
          _0xd14d1b = _0x205fed.haBeC(_0x33c49a, _0x6f2db7?.["voucher_code"] || '');
        return _0x205fed.LDiri(_0x59f717, 0) && (_0x205fed.LDiri(_0x296c79, _0x29965f) || _0x1ebc17 && _0x205fed.LDiri(_0xd14d1b, _0x1ebc17));
      });
    }
    async function _0x59b165(_0x39e409, _0x1e9d5c, _0x4b5abf, _0x57cfd4) {
      const _0x3d7fc7 = {
        'GWBJg': function (_0x23ddcf, _0x4a69f8) {
          return _0x59e2f9.XPJJV(_0x23ddcf, _0x4a69f8);
        },
        'PPWMs': function (_0x122f5, _0x17099c) {
          return _0x59e2f9.vsKIo(_0x122f5, _0x17099c);
        },
        'LqdON': function (_0x3f15ff, _0xb73f26) {
          return _0x59e2f9.IFimu(_0x3f15ff, _0xb73f26);
        }
      };
      _0x59e2f9.UiqRT(_0x3ca330, _0x39e409, _0x1e9d5c);
      const _0x373c89 = _0x59e2f9.elWlQ(_0x4d4c36);
      for (let _0x55082c = 1; _0x5acbd4.isRunning && _0x59e2f9.RJCSy(_0x55082c, _0x57cfd4); _0x55082c++) {
        _0x39e409.attempts += 1;
        _0x59e2f9.qZPrU(_0x3eda96, "Executing " + _0x4b5abf + " attempt=" + _0x55082c);
        const _0x29c52d = await _0x59e2f9.WfYIi(_0x2b233c, _0x373c89, null, _0x59e2f9.EUXfU(_0x55082c, 1));
        if (!_0x29c52d || _0x29c52d.error) {
          _0x59e2f9.bClhZ(_0x3eda96, _0x4b5abf + " lấy thông tin thanh toán thất bại, retry...", "error");
          await _0x59e2f9.NZgHe(_0x1f795e, _0x5acbd4.retry_delay);
          continue;
        }
        if (!_0x59e2f9.ooPuz(_0x2a3a44, _0x29c52d, _0x39e409)) {
          const _0x512e1a = Array.isArray(_0x29c52d?.["promotion_data"]?.["shop_vouchers"]) ? _0x29c52d.promotion_data.shop_vouchers : [],
            _0x245c5a = _0x59e2f9.pacCI(Number, _0x39e409.promotionId),
            _0x44dacc = _0x59e2f9.KiPzq(_0x33c49a, _0x39e409.voucherCode),
            _0x341070 = _0x512e1a.find(_0x15df88 => {
              const _0x5464a4 = _0x3d7fc7.GWBJg(Number, _0x15df88?.["promotionid"] || _0x15df88?.["promotion_id"] || 0),
                _0x499659 = _0x3d7fc7.GWBJg(_0x33c49a, _0x15df88?.["voucher_code"] || '');
              return _0x245c5a && _0x3d7fc7.PPWMs(_0x5464a4, _0x245c5a) || _0x44dacc && _0x3d7fc7.LqdON(_0x499659, _0x44dacc);
            }),
            _0x117f5d = _0x341070 ? _0x59e2f9.xdnOs(Number, _0x341070.invalid_message_code ?? 0) : "N/A";
          _0x59e2f9.bClhZ(_0x3eda96, _0x4b5abf + " voucher chưa apply (code=" + (_0x44dacc || _0x39e409.voucherCode) + ", invalid=" + _0x117f5d + "), retry...", "error");
          await _0x59e2f9.KXhut(_0x1f795e, _0x5acbd4.retry_delay);
          continue;
        }
        const _0x25eb70 = await _0x59e2f9.XGVvD(_0x5d7ac0, _0x373c89, _0x29c52d);
        if (_0x25eb70 && (_0x59e2f9.lftft(_0x25eb70.error, 0) || _0x25eb70.checkoutid && _0x25eb70.orderids)) return _0x39e409.status = "SUCCESS", true;
        await _0x59e2f9.OlNnE(_0x1f795e, _0x5acbd4.retry_delay);
      }
      return false;
    }
    async function _0x4ebe3a() {
      const _0x3ce6df = _0x59e2f9.jblgN(_0x1c4e82);
      for (const _0x4dcda6 of _0x3ce6df) {
        if (!_0x5acbd4.isRunning) return;
        if (_0x4dcda6.endTime && _0x59e2f9.cDWad(Date.now(), _0x4dcda6.endTime)) {
          _0x4dcda6.status = "EXPIRED";
          continue;
        }
        _0x4dcda6.status = "EXECUTING_PRIMARY";
        const _0x31fd83 = await _0x59e2f9.KAuMO(_0x59b165, _0x4dcda6, _0x4dcda6.primaryCart, "PRIMARY", _0x424007);
        if (_0x31fd83) continue;
        if (_0x4dcda6.backupCart && _0x5acbd4.isRunning) {
          _0x4dcda6.status = "EXECUTING_BACKUP";
          const _0x338642 = await _0x59e2f9.KAuMO(_0x59b165, _0x4dcda6, _0x4dcda6.backupCart, "BACKUP", Math.max(1, _0x59e2f9.XvOGZ(Number, _0x5acbd4.post_cart_retry_limit || 1)));
          if (_0x338642) continue;
        } else {
          if (_0x5acbd4.isRunning) {
            const _0x241a27 = Math.max(0, _0x59e2f9.EUXfU(_0x59e2f9.zQXNd(Number, _0x5acbd4.post_cart_retry_limit || 0), _0x424007));
            if (_0x59e2f9.TsQDr(_0x241a27, 0)) {
              _0x4dcda6.status = "EXECUTING_PRIMARY";
              const _0x14f6cd = await _0x59e2f9.tWqGW(_0x59b165, _0x4dcda6, _0x4dcda6.primaryCart, "PRIMARY", _0x241a27);
              if (_0x14f6cd) continue;
            }
          }
        }
        _0x59e2f9.QzXOJ(_0x4dcda6.status, "SUCCESS") && (_0x4dcda6.status = "FAILED", _0x59e2f9.jtTYh(_0x3eda96, "promotion=" + _0x4dcda6.promotionId + " FAILED", "error"));
      }
    }
    const _0x2af69d = _0x238572 => {
        const _0xa5e93e = 17365130000;
        if (!window.isMobileWebClient()) return window.cleanAffiliateLink(_0x238572);
        const _0x53dfde = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if (!_0x238572.includes("shopee.vn")) return console.warn("❌ Link không phải từ Shopee!"), _0x238572;
        let _0x13f011 = _0x238572;
        !_0x13f011.includes("/universal-link") && (_0x13f011 = _0x13f011.replace("shopee.vn", "shopee.vn/universal-link"));
        const _0x47705c = new Date(),
          _0x57aefa = _0x53dfde[_0x47705c.getMonth()],
          _0x2a459f = "toolanm",
          _0x54e2aa = "mmp_pid=an_" + _0xa5e93e + "&affiliate_id=" + _0xa5e93e + "&utm_source=an_" + _0xa5e93e + "&utm_medium=affiliates&utm_campaign=" + _0x57aefa + "&utm_content=" + _0x2a459f + "&af_siteid=an_" + _0xa5e93e + "&pid=affiliates&af_click_lookback=7d&af_viewthrough_lookback=1d&is_retargeting=true&af_reengagement_window=7d",
          _0x260e13 = _0x13f011.includes('?'),
          _0x453282 = '' + _0x13f011 + (_0x260e13 ? '&' : '?') + _0x54e2aa,
          _0x7292f3 = encodeURIComponent(_0x453282);
        return "https://s.shopee.vn/an_redir?origin_link=" + _0x7292f3;
      },
      _0xb3b2de = (_0x5c3298, _0x1743ac, _0x571fbb, _0xdefc9e = null) => {
        const _0x497c59 = document.getElementById("autobuy-result-modal");
        if (_0x497c59) _0x497c59.remove();
        const _0x3d259d = {
            'success': {
              'icon': '✅',
              'gradient': "linear-gradient(135deg, #52c41a, #389e0d)",
              'btnText': "Xem đơn hàng",
              'showOrderBtn': true
            },
            'error': {
              'icon': '❌',
              'gradient': "linear-gradient(135deg, #ff4d4f, #cf1322)",
              'btnText': "Đồng ý",
              'showOrderBtn': false
            },
            'warning': {
              'icon': '⚠️',
              'gradient': "linear-gradient(135deg, #faad14, #d48806)",
              'btnText': "Đồng ý",
              'showOrderBtn': false
            }
          },
          _0x148747 = _0x3d259d[_0x5c3298] || _0x3d259d.error,
          _0x1eea4b = _0x5a442b(_0xdefc9e),
          _0x7dad10 = "\n                <div id=\"autobuy-result-modal\" class=\"autobuy-result-overlay\">\n                    <div class=\"autobuy-result-content\">\n                        <button class=\"autobuy-result-close\" onclick=\"document.getElementById('autobuy-result-modal').remove();\">×</button>\n                        <div class=\"autobuy-result-icon\">" + _0x148747.icon + "</div>\n                        <h3 class=\"autobuy-result-title\">" + _0x1743ac + "</h3>\n                        <p class=\"autobuy-result-message\">" + _0x571fbb + "</p>\n                        <div class=\"autobuy-result-buttons\">\n                            " + (_0x148747.showOrderBtn && _0xdefc9e ? "\n                                <button class=\"autobuy-result-btn autobuy-result-btn-success\" onclick=\"window.open('" + _0x1eea4b + "', '_blank'); document.getElementById('autobuy-result-modal').remove();\">\n                                    📦 Xem đơn hàng\n                                </button>\n                            " : "\n                                <button class=\"autobuy-result-btn autobuy-result-btn-primary\" onclick=\"document.getElementById('autobuy-result-modal').remove();\">\n                                    ✓ Đồng ý\n                                </button>\n                            ") + "\n                        </div>\n                    </div>\n                </div>\n            ",
          _0x23f229 = "\n                <style id=\"autobuy-result-style\">\n                    .autobuy-result-overlay {\n                        position: fixed;\n                        top: 0;\n                        left: 0;\n                        width: 100%;\n                        height: 100%;\n                        background: rgba(0, 0, 0, 0.85);\n                        backdrop-filter: blur(5px);\n                        display: flex;\n                        justify-content: center;\n                        align-items: center;\n                        z-index: 1000001;\n                        animation: autobuy-fadeIn 0.3s ease;\n                    }\n                    .autobuy-result-content {\n                        background: #fff;\n                        border-radius: 16px;\n                        padding: 30px;\n                        width: 90%;\n                        max-width: 420px;\n                        text-align: center;\n                        box-shadow: 0 15px 50px rgba(0,0,0,0.5);\n                        animation: autobuy-scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n                        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n                        position: relative;\n                    }\n                    .autobuy-result-close {\n                        position: absolute;\n                        top: 12px;\n                        right: 12px;\n                        width: 28px;\n                        height: 28px;\n                        border: none;\n                        background: #f0f0f0;\n                        border-radius: 50%;\n                        font-size: 20px;\n                        color: #666;\n                        cursor: pointer;\n                        display: flex;\n                        align-items: center;\n                        justify-content: center;\n                        line-height: 1;\n                        transition: all 0.2s;\n                    }\n                    .autobuy-result-close:hover {\n                        background: #e0e0e0;\n                        color: #333;\n                    }\n                    .autobuy-result-icon {\n                        font-size: 60px;\n                        margin-bottom: 20px;\n                        animation: autobuy-bounce 0.6s ease;\n                    }\n                    .autobuy-result-title {\n                        margin: 0 0 12px;\n                        color: #333;\n                        font-size: 22px;\n                        font-weight: 700;\n                    }\n                    .autobuy-result-message {\n                        margin: 0 0 25px;\n                        color: #666;\n                        font-size: 15px;\n                        line-height: 1.6;\n                    }\n                    .autobuy-result-buttons {\n                        display: flex;\n                        justify-content: center;\n                    }\n                    .autobuy-result-btn {\n                        padding: 14px 32px;\n                        border-radius: 8px;\n                        font-size: 15px;\n                        font-weight: 600;\n                        cursor: pointer;\n                        transition: transform 0.2s, box-shadow 0.2s;\n                        border: none;\n                        min-width: 160px;\n                    }\n                    .autobuy-result-btn-primary {\n                        background: linear-gradient(135deg, #ff6b35, #ff4757);\n                        color: white;\n                    }\n                    .autobuy-result-btn-primary:hover {\n                        transform: translateY(-2px);\n                        box-shadow: 0 5px 15px rgba(255, 71, 87, 0.4);\n                    }\n                    .autobuy-result-btn-success {\n                        background: linear-gradient(135deg, #52c41a, #389e0d);\n                        color: white;\n                    }\n                    .autobuy-result-btn-success:hover {\n                        transform: translateY(-2px);\n                        box-shadow: 0 5px 15px rgba(82, 196, 26, 0.4);\n                    }\n                    .autobuy-result-btn-secondary {\n                        background: #f0f0f0;\n                        color: #333;\n                        border: 1px solid #ddd;\n                    }\n                    .autobuy-result-btn-secondary:hover {\n                        background: #e0e0e0;\n                    }\n                    @keyframes autobuy-fadeIn { from { opacity: 0; } to { opacity: 1; } }\n                    @keyframes autobuy-scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }\n                    @keyframes autobuy-bounce { \n                        0%, 20%, 50%, 80%, 100% { transform: translateY(0); } \n                        40% { transform: translateY(-15px); } \n                        60% { transform: translateY(-8px); } \n                    }\n                    \n                    @media screen and (max-width: 600px) {\n                        .autobuy-result-content { padding: 25px 20px; }\n                        .autobuy-result-icon { font-size: 50px; }\n                        .autobuy-result-title { font-size: 18px; }\n                        .autobuy-result-message { font-size: 14px; }\n                        .autobuy-result-btn { padding: 10px 20px; font-size: 14px; min-width: 100px; }\n                    }\n                </style>\n            ";
        !document.getElementById("autobuy-result-style") && document.head.insertAdjacentHTML("beforeend", _0x23f229);
        document.body.insertAdjacentHTML("beforeend", _0x7dad10);
      };
    async function _0x47972e(_0x5e404d, _0x5af9c2, _0x3f3f90, _0x2f4241) {
      try {
        const _0x4a5957 = JSON.stringify({
            'item_id': _0x59e2f9.XwudW(parseInt, _0x5af9c2),
            'shop_id': _0x59e2f9.KUvHx(parseInt, _0x5e404d),
            'model_id': _0x59e2f9.QsCLv(parseInt, _0x3f3f90),
            'selected_tiers': null,
            'quantity': 0x1,
            'method': 0x1,
            'selected_spl': null,
            'enable_quick_checkout': false,
            '_pft': 0x0,
            'tz_offset_in_minutes': 0x1a4
          }),
          _0x14f48e = await _0x59e2f9.uBCwn(fetch, /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(navigator.userAgent) ? "https://shopee.vn/api/v4/cart/cart_panel/get_rw" : "https://shopee.vn/api/v4/cart/cart_panel/get_pc", {
            'headers': {
              'accept': "application/json",
              'content-type': "application/json",
              'x-csrftoken': _0x2f4241
            },
            'body': _0x4a5957,
            'method': "POST",
            'mode': "cors",
            'credentials': "include"
          }),
          _0x2f9739 = await _0x14f48e.json();
        if (_0x59e2f9.olcII(_0x2f9739.error, 90309999)) {
          _0x1d9aeb.error("Cần xác minh captcha! Vui lòng refresh trang và thử lại.");
          if (_0x59e2f9.RHZSK(typeof window.showCaptchaErrorModal, "function")) window.showCaptchaErrorModal();
          return {
            'error': 0x562056f
          };
        }
        if (_0x59e2f9.ADyfC(_0x2f9739.error, null) && _0x2f9739.data && _0x2f9739.data.item) {
          const _0x541f69 = _0x2f9739.data.item,
            _0x131fac = {};
          return _0x541f69.models && _0x59e2f9.ZzIPM(_0x541f69.models.length, 0) ? _0x541f69.models.forEach(_0x12a0e7 => {
            _0x131fac[_0x12a0e7.model_id] = {
              'stock': _0x12a0e7.stock || 0,
              'price': _0x12a0e7.price || 0,
              'name': _0x12a0e7.name || ''
            };
          }) : _0x131fac[_0x5af9c2] = {
            'stock': _0x541f69.stock || 0,
            'price': _0x541f69.price?.["single_value"] || 0,
            'name': "Mặc định"
          }, _0x131fac;
        }
        return {};
      } catch (_0x1518e6) {
        return console.error("Error fetching stocks:", _0x1518e6), {};
      }
    }
    window.shopeeAutoBuyUI = async function () {
      const _0x54a97b = {
        'CBGVx': function (_0x552259, _0x198512) {
          return _0x552259(_0x198512);
        },
        'qaKNp': "shopee.vn",
        'ArnLe': "s.shopee.vn",
        'gHaPa': "shp.ee",
        'pSNyX': "Error expanding URL:",
        'PGPcQ': function (_0xe6a4f4, _0x30f313) {
          return _0xe6a4f4 !== _0x30f313;
        },
        'zVyFl': function (_0xfc98f9, _0x2bf8d6) {
          return _0xfc98f9 - _0x2bf8d6;
        },
        'YapFl': function (_0x2288d2, _0x2844b4) {
          return _0x2288d2 !== _0x2844b4;
        },
        'EZKgv': function (_0x35f6ce, _0x2f2ab9) {
          return _0x35f6ce - _0x2f2ab9;
        },
        'hYQKI': "setting-shop-voucher-shop-select",
        'CnWBi': function (_0x173cd6, _0x5637b5) {
          return _0x173cd6 > _0x5637b5;
        },
        'sbNHa': function (_0x4346cb, _0x44796b) {
          return _0x4346cb(_0x44796b);
        },
        'TRaeN': function (_0x4715bf, _0x384f19) {
          return _0x4715bf > _0x384f19;
        },
        'OqCbt': function (_0xc68fd5, _0x402bad) {
          return _0xc68fd5(_0x402bad);
        },
        'UypRi': function (_0x52d2d0, _0x41c4af) {
          return _0x52d2d0 === _0x41c4af;
        },
        'zvdDC': function (_0x1ba9b6, _0x36e2de) {
          return _0x1ba9b6(_0x36e2de);
        },
        'SgMbi': function (_0x19422b) {
          return _0x19422b();
        },
        'fcsxv': function (_0x55e010) {
          return _0x55e010();
        },
        'GHYLh': function (_0xac9263, _0x195ad4) {
          return _0xac9263(_0x195ad4);
        },
        'vdYbh': "Thanh toán khi nhận hàng",
        'DDMzx': "Mã hợp lệ cho đơn hàng.",
        'nTyRh': function (_0x4ed7df, _0x49030f) {
          return _0x4ed7df === _0x49030f;
        },
        'aGGCS': function (_0x42a650, _0x59f587) {
          return _0x42a650(_0x59f587);
        },
        'MeSvG': function (_0x320c21, _0x5b8d23) {
          return _0x320c21 - _0x5b8d23;
        },
        'QyqyY': function (_0x54ff44, _0x126e2f) {
          return _0x54ff44(_0x126e2f);
        },
        'HHMIg': function (_0x235814, _0x4a65ed) {
          return _0x235814 || _0x4a65ed;
        },
        'BmSch': "Không rõ trạng thái xác minh voucher.",
        'yROcP': "object",
        'zedUy': function (_0x44b84d, _0x1a9c7d) {
          return _0x44b84d <= _0x1a9c7d;
        },
        'AccgI': function (_0x578b8c, _0x2ce7c8) {
          return _0x578b8c(_0x2ce7c8);
        },
        'PySVN': function (_0x354288, _0x5ee1f9) {
          return _0x354288(_0x5ee1f9);
        },
        'eNqKh': function (_0x223879, _0x28917a) {
          return _0x223879(_0x28917a);
        },
        'FwTCW': function (_0xc4813f, _0x302c6c) {
          return _0xc4813f(_0x302c6c);
        },
        'EUXaR': function (_0x5b0b13, _0x52030e) {
          return _0x5b0b13(_0x52030e);
        },
        'CwAjP': function (_0x5a07c8, _0x4ad6af) {
          return _0x5a07c8(_0x4ad6af);
        },
        'IrDuR': function (_0x3a5ae8, _0x280595) {
          return _0x3a5ae8(_0x280595);
        },
        'GEGqP': function (_0x4b09f2, _0x2c97c0) {
          return _0x4b09f2(_0x2c97c0);
        },
        'VKGfJ': function (_0x5c93b7, _0x1dd4ed) {
          return _0x5c93b7(_0x1dd4ed);
        },
        'BzsKh': function (_0x255a65, _0xa39610) {
          return _0x255a65(_0xa39610);
        },
        'sbdrI': function (_0x33d193, _0x5b4df1) {
          return _0x33d193(_0x5b4df1);
        },
        'HZwsC': function (_0x4ce3d5, _0x215464) {
          return _0x4ce3d5(_0x215464);
        },
        'JZZsB': " selected",
        'ZwiJT': function (_0x2a2382, _0x14dd1c) {
          return _0x2a2382(_0x14dd1c);
        },
        'ynNAM': function (_0x47ad5c, _0x4d1776) {
          return _0x47ad5c - _0x4d1776;
        },
        'MhIkz': function (_0x5d191c, _0x58ac3d) {
          return _0x5d191c(_0x58ac3d);
        },
        'WBUmf': function (_0x2d3c18, _0x19b4af) {
          return _0x2d3c18 + _0x19b4af;
        },
        'Ghqcu': function (_0x38d694, _0x5af101) {
          return _0x38d694(_0x5af101);
        },
        'QSrzd': function (_0x26683f, _0x471c65) {
          return _0x26683f === _0x471c65;
        },
        'MpCKI': function (_0x35d097, _0x2a68b0, _0x5c4f0f) {
          return _0x35d097(_0x2a68b0, _0x5c4f0f);
        },
        'iqBiI': function (_0x60c575) {
          return _0x60c575();
        },
        'ccNQG': function (_0x268c42, _0x2a7d69) {
          return _0x268c42(_0x2a7d69);
        },
        'Eirts': function (_0x580704, _0x331b26) {
          return _0x580704 !== _0x331b26;
        },
        'KyqgY': "setting-shop-voucher-code",
        'sgunJ': function (_0x54d1d9) {
          return _0x54d1d9();
        },
        'DqPnx': function (_0xbe9fb0, _0x35ca9d) {
          return _0xbe9fb0(_0x35ca9d);
        },
        'CasRM': "Đang xác minh theo sản phẩm đang chọn...",
        'XSSnX': "setting-enable-shop-voucher",
        'IFaUe': "shop-voucher-inputs",
        'PeLPv': "block",
        'vPpVq': "none",
        'oSDOy': function (_0x2b5bde, _0x41f83d) {
          return _0x2b5bde(_0x41f83d);
        },
        'BYliJ': function (_0x375f1f) {
          return _0x375f1f();
        },
        'URErO': "2|3|0|1|5|4",
        'tCqTH': "platform-voucher-status",
        'OeMNr': function (_0x5344ca, _0x1902d2) {
          return _0x5344ca || _0x1902d2;
        },
        'Hshku': function (_0x3d799e, _0x137bce) {
          return _0x3d799e(_0x137bce);
        },
        'cNFCd': function (_0x4113f0, _0x36fa5d) {
          return _0x4113f0(_0x36fa5d);
        },
        'MQwGm': ".btn-save-settings",
        'VjnhZ': "setting-enable-platform-voucher",
        'WKnjM': function (_0x27414e, _0x3fc291) {
          return _0x27414e === _0x3fc291;
        },
        'DNVYM': "banner",
        'JmRBb': "setting-platform-voucher-source",
        'EASfO': "Vui lòng chờ tải thông tin banner.",
        'bLqbP': function (_0xf18401, _0x1499ae) {
          return _0xf18401(_0x1499ae);
        },
        'jSeQR': "setting-platform-voucher-input",
        'ldrmh': "FAILED",
        'CLHSP': "Bật Voucher Shopee thì bắt buộc nhập link hoặc tên voucher.",
        'itafG': "Kho mã tải thất bại nên chỉ hỗ trợ link voucher.",
        'orsAq': function (_0x5efa3b, _0x276609) {
          return _0x5efa3b(_0x276609);
        },
        'ERBKC': "2|4|1|3|0",
        'mMKqn': function (_0x1acb88) {
          return _0x1acb88();
        },
        'MaNti': function (_0x181f54, _0xab4050) {
          return _0x181f54 - _0xab4050;
        },
        'oDvTE': function (_0x437b5e, _0xd33064) {
          return _0x437b5e < _0xd33064;
        },
        'HNwZR': function (_0x42ce6f, _0x53eeff) {
          return _0x42ce6f - _0x53eeff;
        },
        'IIHnt': "auto",
        'ymkQW': function (_0x264fe5, _0x1c92b8) {
          return _0x264fe5 + _0x1c92b8;
        },
        'csQfN': function (_0xcb3219, _0x89afff) {
          return _0xcb3219 + _0x89afff;
        },
        'UkMMo': "active",
        'SgFLf': "nearest",
        'aaBgG': function (_0x2f13a0, _0x5d83cd) {
          return _0x2f13a0(_0x5d83cd);
        },
        'nSmfV': function (_0x514b1c) {
          return _0x514b1c();
        },
        'ofBxA': "mouse",
        'DjmQT': function (_0x4e6f48, _0x2749d8) {
          return _0x4e6f48(_0x2749d8);
        },
        'MPNsf': function (_0x506797, _0x1fd8b3) {
          return _0x506797(_0x1fd8b3);
        },
        'pZRpX': "button",
        'qTpwo': "platform-voucher-suggestion",
        'DuBwz': "role",
        'eOZaV': "option",
        'WgErM': "span",
        'Mmfuo': "platform-voucher-suggestion-code",
        'fIhEd': "platform-voucher-suggestion-name",
        'mCjyP': "platform-voucher-suggestion-id",
        'IvsbT': "pointerdown",
        'mdDyo': "click",
        'bhPpP': "mousemove",
        'PXZTT': function (_0x85a69e, _0x5ecb7d) {
          return _0x85a69e !== _0x5ecb7d;
        },
        'QVQMC': "READY",
        'hNqWH': function (_0x5dfffd) {
          return _0x5dfffd();
        },
        'CPuFP': function (_0x56471c, _0x1a8be2) {
          return _0x56471c(_0x1a8be2);
        },
        'WEBNb': function (_0xbb753f) {
          return _0xbb753f();
        },
        'lbXyo': "div",
        'XbzlS': "platform-voucher-autocomplete",
        'ZYuOP': "listbox",
        'ZCsyA': function (_0x20a89d) {
          return _0x20a89d();
        },
        'yRFhW': "Escape",
        'kujrQ': function (_0x35433a, _0x3194b2) {
          return _0x35433a === _0x3194b2;
        },
        'SXExZ': "ArrowDown",
        'CjzLF': "ArrowUp",
        'zSJfF': function (_0x7713fd, _0x364d30) {
          return _0x7713fd > _0x364d30;
        },
        'pmprO': function (_0x2f1793, _0xc1a4dd) {
          return _0x2f1793 + _0xc1a4dd;
        },
        'hMHqo': "Enter",
        'YfJLN': function (_0x334e07, _0x40f954) {
          return _0x334e07 >= _0x40f954;
        },
        'QHNjT': function (_0x3d4d4a, _0x30701f) {
          return _0x3d4d4a(_0x30701f);
        },
        'lynQS': function (_0xc269a3, _0x16768c) {
          return _0xc269a3 !== _0x16768c;
        },
        'NiuqA': "focus",
        'vCYdP': "keydown",
        'FRuUZ': "resize",
        'upeOW': "scroll",
        'cLeDj': "Trình duyệt từ chối quyền truy cập.",
        'hrefD': function (_0x980db0, _0x4d67aa) {
          return _0x980db0(_0x4d67aa);
        },
        'TfUXS': function (_0x2ef3ef, _0x10f570) {
          return _0x2ef3ef !== _0x10f570;
        },
        'JVuvz': function (_0x2264a4, _0x11044b) {
          return _0x2264a4(_0x11044b);
        },
        'ZLJav': function (_0x386871, _0x155c18) {
          return _0x386871(_0x155c18);
        },
        'pbqfD': function (_0xc67b34, _0x157fe6) {
          return _0xc67b34 === _0x157fe6;
        },
        'bHyvj': function (_0x29b3a9, _0x314ebc) {
          return _0x29b3a9(_0x314ebc);
        },
        'jTKxu': function (_0x482bd1, _0xb28cee) {
          return _0x482bd1 === _0xb28cee;
        },
        'biUOP': function (_0x6bcc1c, _0x2d24bf) {
          return _0x6bcc1c(_0x2d24bf);
        },
        'HFbEQ': function (_0x57f0ed, _0x2b12a8) {
          return _0x57f0ed(_0x2b12a8);
        },
        'JUpaE': function (_0x4b2029, _0x56c227, _0x57d439) {
          return _0x4b2029(_0x56c227, _0x57d439);
        },
        'FQQHZ': "error",
        'nnUhI': "❌ Bắt buộc nhập link hoặc tên voucher Shopee.",
        'PNpur': function (_0x356504) {
          return _0x356504();
        },
        'NHKZh': "❌ Không đọc được voucherCode hoặc promotionId từ input.",
        'SSWVp': function (_0xf6581a) {
          return _0xf6581a();
        },
        'TBqYi': function (_0x325aea, _0xbfaa37) {
          return _0x325aea === _0xbfaa37;
        },
        'zEUIc': "LOADING",
        'rMBLi': function (_0x3fbee1, _0x19ba6e, _0x220d28) {
          return _0x3fbee1(_0x19ba6e, _0x220d28);
        },
        'cHEnp': "loading",
        'wfljl': "Đang tải dữ liệu...",
        'Sradq': "Kho mã tải thất bại. Chỉ hỗ trợ nhập link voucher. Đóng và mở lại mục Đặt đơn để tải lại dữ liệu.",
        'fTSqF': function (_0x495808, _0x19093d) {
          return _0x495808(_0x19093d);
        },
        'WWHFe': function (_0xef5853, _0x4cd703, _0x5ced06) {
          return _0xef5853(_0x4cd703, _0x5ced06);
        },
        'SavvI': function (_0x32a844, _0x56c07f, _0x43a37b) {
          return _0x32a844(_0x56c07f, _0x43a37b);
        },
        'mIImk': "input_link",
        'IetCZ': function (_0x5bd292) {
          return _0x5bd292();
        },
        'nNvWu': function (_0x1a7375, _0xec3029, _0x1c75b) {
          return _0x1a7375(_0xec3029, _0x1c75b);
        },
        'XTjpG': "Kho voucher chỉ tải một lần trong mỗi phiên. Hãy đóng và mở lại mục Đặt đơn để tải lại.",
        'iYWfW': function (_0x4afb24, _0xc29897, _0x1c5fcd) {
          return _0x4afb24(_0xc29897, _0x1c5fcd);
        },
        'Dgbog': "https://shopee.vn/api/v4/voucher_wallet/validate_platform_voucher_by_voucher_code",
        'FVRRR': "POST",
        'Mcgtu': "application/json",
        'PEYQo': "XMLHttpRequest",
        'DJrom': "cors",
        'dBjHd': "include",
        'FPhzW': function (_0x18b7fe, _0x5323a9, _0x277466) {
          return _0x18b7fe(_0x5323a9, _0x277466);
        },
        'eNpmB': "platform_voucher/validate_code",
        'kkiVX': function (_0x4daedf, _0x3b922b) {
          return _0x4daedf(_0x3b922b);
        },
        'MLScu': "validate_code",
        'laFaC': function (_0x3604bb, _0x244b0c) {
          return _0x3604bb(_0x244b0c);
        },
        'GuauG': function (_0x4ed1f1, _0x4b77d7) {
          return _0x4ed1f1(_0x4b77d7);
        },
        'MkmLP': "2|8|0|4|5|7|1|3|6",
        'vYvkO': function (_0x220b7d, _0x42b6d3) {
          return _0x220b7d >= _0x42b6d3;
        },
        'fCRJd': function (_0x4c78c2, _0xefc7c0) {
          return _0x4c78c2 < _0xefc7c0;
        },
        'EjPAH': function (_0x55200e, _0x5256ca) {
          return _0x55200e >= _0x5256ca;
        },
        'XYreV': function (_0x39edb5, _0x4f3e23) {
          return _0x39edb5 < _0x4f3e23;
        },
        'BfsVe': function (_0x2f07cd, _0x5d34a8) {
          return _0x2f07cd <= _0x5d34a8;
        },
        'LOToa': function (_0x22e84e, _0x133246) {
          return _0x22e84e >= _0x133246;
        },
        'AnJeG': function (_0x5c5726, _0x1de034) {
          return _0x5c5726 >= _0x1de034;
        },
        'CKlwv': function (_0x3cb778, _0x4981c4) {
          return _0x3cb778 < _0x4981c4;
        },
        'ovBFT': function (_0x2d1465, _0x399218) {
          return _0x2d1465 < _0x399218;
        },
        'XxODf': function (_0x100196, _0x3020d0) {
          return _0x100196 === _0x3020d0;
        },
        'hrTXK': function (_0x1ebe23, _0x388b29) {
          return _0x1ebe23(_0x388b29);
        },
        'CuUQA': function (_0x3797d6, _0x767e24) {
          return _0x3797d6(_0x767e24);
        },
        'dlllZ': "Link voucher Shopee thiếu promotionId hoặc voucherCode.",
        'DEDqJ': "https://shopee.vn/api/v2/voucher_wallet/save_vouchers",
        'xCzUz': "en-US,en;q=0.9,vi;q=0.8",
        'XHWbO': "platform_voucher/save_vouchers",
        'CJzuR': function (_0x4b12ec, _0x3e73bd) {
          return _0x4b12ec !== _0x3e73bd;
        },
        'OljuB': function (_0x227111, _0x448acc) {
          return _0x227111 !== _0x448acc;
        },
        'jFKNx': "Response lưu voucher thiếu trường error hợp lệ.",
        'SEXUC': function (_0x5c37bd, _0x36e06c) {
          return _0x5c37bd(_0x36e06c);
        },
        'vAPdA': function (_0x4c2661, _0x304a9c) {
          return _0x4c2661(_0x304a9c);
        },
        'DDJCl': "Shopee chặn lưu voucher, dừng đặt đơn.",
        'GusqG': function (_0x591092, _0x27d417) {
          return _0x591092 !== _0x27d417;
        },
        'tKzZi': "Không lưu được voucher Shopee.",
        'ztyxm': "Response lưu voucher không có kết quả cho voucher đã yêu cầu.",
        'drOsH': function (_0x888360, _0x49d0bb) {
          return _0x888360(_0x49d0bb);
        },
        'JaYIw': "Response lưu voucher không xác nhận đúng promotionId và voucherCode đã yêu cầu.",
        'eHaRL': function (_0x245b2c, _0x4b85e0) {
          return _0x245b2c(_0x4b85e0);
        },
        'nyeMa': "save_vouchers",
        'NcoCK': function (_0x305d8c, _0x5c2e81) {
          return _0x305d8c === _0x5c2e81;
        },
        'UDwnO': "Voucher đã lưu trước đó.",
        'JGrqD': "Lưu voucher thành công.",
        'LPBKm': "Chưa lưu được voucher Shopee.",
        'LaOGD': function (_0x101a8a, _0x4313d4) {
          return _0x101a8a(_0x4313d4);
        },
        'lhcsV': function (_0x5ce66f, _0x3d68d7) {
          return _0x5ce66f(_0x3d68d7);
        },
        'Zkwwh': function (_0x36feb8, _0x1acd73) {
          return _0x36feb8(_0x1acd73);
        },
        'ZQQuC': "resolved",
        'Cicim': function (_0x4415cc, _0x138004) {
          return _0x4415cc === _0x138004;
        },
        'pabnM': "Voucher Shopee đã bật nhưng chưa nhập link hoặc tên mã.",
        'Zeowf': function (_0x469396, _0x24e0ae) {
          return _0x469396(_0x24e0ae);
        },
        'RzCTG': function (_0xc1c411, _0x2520a0) {
          return _0xc1c411 === _0x2520a0;
        },
        'LetPg': "Kho voucher Shopee vẫn đang tải. Vui lòng chờ hoàn tất.",
        'VHsJu': "Kho mã tải thất bại. Chỉ hỗ trợ nhập link voucher.",
        'ZMNAt': function (_0x40faab, _0x1b7cce) {
          return _0x40faab === _0x1b7cce;
        },
        'nQVgj': function (_0x537e31, _0x2367aa) {
          return _0x537e31(_0x2367aa);
        },
        'LMEMM': function (_0x2a1009, _0x1af808, _0x300e46) {
          return _0x2a1009(_0x1af808, _0x300e46);
        },
        'vGyKD': function (_0x5add49, _0xaa2ab3, _0x234495) {
          return _0x5add49(_0xaa2ab3, _0x234495);
        },
        'GSRGt': function (_0x5cda22, _0x15066e) {
          return _0x5cda22(_0x15066e);
        },
        'fheDE': "Không đọc được tên voucher Shopee từ input.",
        'pESlk': function (_0x10d242, _0x21af27) {
          return _0x10d242(_0x21af27);
        },
        'zhwrB': "save_voucher",
        'RXVVS': "https://shopee.vn/api/v4/microsite/claim_voucher_by_collection_group_id",
        'SUyIo': "1.12.40",
        'ocsfN': "SS6/claim_banner",
        'mFXEa': function (_0x638d29, _0x346c12) {
          return _0x638d29(_0x346c12);
        },
        'xzSwV': function (_0x440a16, _0x5e5f27) {
          return _0x440a16 === _0x5e5f27;
        },
        'xTFTh': function (_0x2116c8, _0x210ad8) {
          return _0x2116c8 > _0x210ad8;
        },
        'xFkGk': function (_0x42a52b, _0x1a6241) {
          return _0x42a52b !== _0x1a6241;
        },
        'kVmoY': "ss6_banner",
        'LlHLx': function (_0x2079ea, _0x4272b6) {
          return _0x2079ea(_0x4272b6);
        },
        'FQnmH': function (_0x128678, _0x5b269e) {
          return _0x128678 === _0x5b269e;
        },
        'NbCiy': function (_0x553b3f, _0x295e36) {
          return _0x553b3f <= _0x295e36;
        },
        'CPuVP': function (_0x5d205a, _0x10d416) {
          return _0x5d205a > _0x10d416;
        },
        'DwBQU': function (_0x2115cd, _0x35ed5f) {
          return _0x2115cd < _0x35ed5f;
        },
        'VZfqy': function (_0xcd7a73, _0x3a3e4b) {
          return _0xcd7a73(_0x3a3e4b);
        },
        'hhNuF': function (_0x24b167, _0x2e51db) {
          return _0x24b167 * _0x2e51db;
        },
        'bDmWL': function (_0x19546d, _0xbb138b) {
          return _0x19546d(_0xbb138b);
        },
        'EkEBR': function (_0x276c1a, _0x30b4ec) {
          return _0x276c1a(_0x30b4ec);
        },
        'ffJqw': function (_0x5ad9dc, _0x453aa9) {
          return _0x5ad9dc(_0x453aa9);
        },
        'VEnNd': function (_0x30a772, _0x1d2d58) {
          return _0x30a772(_0x1d2d58);
        },
        'QYPJb': function (_0x19e02d, _0x39c307) {
          return _0x19e02d(_0x39c307);
        },
        'kinyW': "không xác định",
        'UebaD': function (_0x18581f, _0x26649e) {
          return _0x18581f(_0x26649e);
        },
        'KZrqi': function (_0x55f867, _0x12c684) {
          return _0x55f867(_0x12c684);
        },
        'mQDed': function (_0x59a411, _0x5798f1) {
          return _0x59a411(_0x5798f1);
        },
        'GppLk': "input[name=\"platform-banner-mode\"]:checked",
        'RmjIK': "smart",
        'rYNDn': function (_0x22978e, _0x2e6134) {
          return _0x22978e === _0x2e6134;
        },
        'gLiHN': function (_0x3d4345, _0x117559) {
          return _0x3d4345 === _0x117559;
        },
        'hioTq': function (_0x126d9f, _0x4548b1) {
          return _0x126d9f || _0x4548b1;
        },
        'kjPxY': "kol-affiliate",
        'oUXcc': "platform-banner-status",
        'reFEx': "platform-voucher-status loading",
        'NWzEA': "Đang tải thông tin banner...",
        'gdZTw': function (_0x521b77, _0x4bbd63, _0x539885) {
          return _0x521b77(_0x4bbd63, _0x539885);
        },
        'Aoitn': function (_0x15402e, _0x708b7a) {
          return _0x15402e(_0x708b7a);
        },
        'HsplL': function (_0x28283a, _0x255cb1, _0x4a21dd) {
          return _0x28283a(_0x255cb1, _0x4a21dd);
        },
        'KnzUB': function (_0x38f627, _0x19cbcf) {
          return _0x38f627(_0x19cbcf);
        },
        'FFhNb': "waiting",
        'iXTYZ': "idle",
        'ZySrU': function (_0x4c11f0) {
          return _0x4c11f0();
        },
        'XQlXd': "5|7|6|0|1|4|3|2",
        'PwCGy': "AbortError",
        'pottA': "platform-voucher-status error",
        'acJtd': "autobuy-schedule-section-header",
        'vltiF': "autobuy-schedule-setting-group",
        'mUdYG': function (_0x2c29de) {
          return _0x2c29de();
        },
        'JeHjz': function (_0x1020bd) {
          return _0x1020bd();
        },
        'FZpHu': function (_0x505f6a) {
          return _0x505f6a();
        },
        'JtSsC': "wallet",
        'cLCYe': function (_0x394df5) {
          return _0x394df5();
        },
        'RicEm': function (_0x426c9a, _0x2c8fa5) {
          return _0x426c9a === _0x2c8fa5;
        },
        'ZiyEl': "input[name=\"platform-banner-mode\"][value=\"smart\"]",
        'HgCSC': "platform-voucher-wallet-panel",
        'kLIuB': "platform-voucher-banner-panel",
        'TQjPZ': function (_0x5ab836, _0x3a6981) {
          return _0x5ab836 === _0x3a6981;
        },
        'xnOzd': "flex",
        'JmiOo': function (_0x345aba) {
          return _0x345aba();
        },
        'ADUjH': function (_0x23f13a, _0x413b63) {
          return _0x23f13a(_0x413b63);
        },
        'tOAoF': function (_0x1a1cc9, _0xeb79b, _0x3a62f4) {
          return _0x1a1cc9(_0xeb79b, _0x3a62f4);
        },
        'sYWPF': function (_0x54941c) {
          return _0x54941c();
        },
        'welQJ': function (_0x5ebc8f, _0x27ac7d) {
          return _0x5ebc8f(_0x27ac7d);
        },
        'ZVqDq': function (_0x368572, _0x2e5bcc) {
          return _0x368572(_0x2e5bcc);
        },
        'oycdh': function (_0x17992b) {
          return _0x17992b();
        },
        'sOIkO': function (_0x1289e9, _0x2e7551, _0x10dcde, _0x193305) {
          return _0x1289e9(_0x2e7551, _0x10dcde, _0x193305);
        },
        'AmPIb': function (_0x2a9633, _0x4173f3) {
          return _0x2a9633(_0x4173f3);
        },
        'xXSZT': function (_0x185d9b, _0x4b564f, _0x3465dc) {
          return _0x185d9b(_0x4b564f, _0x3465dc);
        },
        'MyIeK': "setting-shop-voucher-validate-btn",
        'saeih': function (_0x55d12c, _0x290903) {
          return _0x55d12c(_0x290903);
        },
        'fuOjZ': function (_0x30d449) {
          return _0x30d449();
        },
        'ydTNz': function (_0x132a06, _0x6e49b9) {
          return _0x132a06(_0x6e49b9);
        },
        'tqlxg': function (_0x5764b1) {
          return _0x5764b1();
        },
        'WyPgV': "Hãy bấm Kiểm tra sản phẩm và chọn phân loại trước khi xác minh voucher.",
        'cbcAG': function (_0x3100b6, _0x27b802) {
          return _0x3100b6(_0x27b802);
        },
        'sWxWA': function (_0x434887, _0x2b3984, _0x3c57af, _0x511b92) {
          return _0x434887(_0x2b3984, _0x3c57af, _0x511b92);
        },
        'ugnar': "5|3|4|0|2|6|1",
        'FYWid': "Đang xác minh...",
        'jBvAl': function (_0x18e468, _0x538496) {
          return _0x18e468 / _0x538496;
        },
        'HAHRl': function (_0x2e3d3b, _0x5e905c) {
          return _0x2e3d3b(_0x5e905c);
        },
        'PIuEt': "Không lấy được dữ liệu sản phẩm hiện tại để xác minh voucher.",
        'nKhXQ': "https://shopee.vn/api/v2/voucher_wallet/validate_shop_voucher_by_voucher_code",
        'vuYCy': function (_0x74b376) {
          return _0x74b376();
        },
        'iwaIA': "https://shopee.vn/checkout",
        'tNexn': "shop_voucher/validate",
        'xmNzA': function (_0x3b228f, _0x162ce0) {
          return _0x3b228f <= _0x162ce0;
        },
        'YQrDZ': "Vui lòng sử dụng trên app",
        'TzvuM': function (_0x6a3e2d, _0x2fd4e2) {
          return _0x6a3e2d === _0x2fd4e2;
        },
        'MXeip': function (_0x32b44d, _0x24bbca, _0x2f8798) {
          return _0x32b44d(_0x24bbca, _0x2f8798);
        },
        'CRrMj': function (_0xe0d722, _0x439b4f) {
          return _0xe0d722 !== _0x439b4f;
        },
        'XlJQk': "unknown",
        'QKwpI': function (_0x45d962, _0x17ab1f) {
          return _0x45d962(_0x17ab1f);
        },
        'pGnNz': function (_0x598b7e, _0x5e6cdf) {
          return _0x598b7e(_0x5e6cdf);
        },
        'tOdTk': function (_0x1ce190, _0xced541) {
          return _0x1ce190(_0xced541);
        },
        'GHLoJ': function (_0x27b519, _0x157a9a) {
          return _0x27b519 !== _0x157a9a;
        },
        'LhfKt': function (_0x140a95, _0xf4506f, _0x4eebb9) {
          return _0x140a95(_0xf4506f, _0x4eebb9);
        },
        'tAVda': "Xác minh",
        'ZYNgs': function (_0x3d963b) {
          return _0x3d963b();
        },
        'nOfax': function (_0x52ad54, _0x470d84) {
          return _0x52ad54(_0x470d84);
        },
        'FMJXP': "session_closed",
        'BXeZu': function (_0x17a11d, _0x3bf17c) {
          return _0x17a11d(_0x3bf17c);
        },
        'TTqaN': "stopped",
        'mSAbj': function (_0x13d3d4) {
          return _0x13d3d4();
        },
        'mAcMm': function (_0x537710, _0x225f62) {
          return _0x537710 !== _0x225f62;
        },
        'EfIwT': "autobuy-image-preview-modal",
        'titCt': "autobuy-image-preview-img",
        'BsHxw': function (_0x5e0de4, _0x2178ea) {
          return _0x5e0de4 !== _0x2178ea;
        },
        'euAbj': function (_0x19d503, _0x5a4ee4) {
          return _0x19d503(_0x5a4ee4);
        },
        'eyXIA': "autobuy-image-preview-close",
        'sqwka': "autobuy-log-container",
        'edXWr': "Chưa có log để copy.",
        'JdnGu': "Đã copy log.",
        'HIhVm': "Không thể copy log. Trình duyệt chặn clipboard.",
        'nFdLe': function (_0x48f430, _0x145921) {
          return _0x48f430(_0x145921);
        },
        'RRQNB': function (_0x37909c, _0x3b24d0) {
          return _0x37909c(_0x3b24d0);
        },
        'oqknm': function (_0x5531a6, _0x14a1b9) {
          return _0x5531a6(_0x14a1b9);
        },
        'apGjV': function (_0x59f1ec, _0x39d40c) {
          return _0x59f1ec(_0x39d40c);
        },
        'GKnll': function (_0x518742, _0x42a7ee) {
          return _0x518742 <= _0x42a7ee;
        },
        'jBfvM': function (_0x55a8b5, _0x371b66) {
          return _0x55a8b5(_0x371b66);
        },
        'blCAx': function (_0x296117, _0x486c09) {
          return _0x296117 / _0x486c09;
        },
        'oqZdY': function (_0x1469e3, _0x3b0c43) {
          return _0x1469e3(_0x3b0c43);
        },
        'mGChy': function (_0x3dd12c, _0x5dc12e) {
          return _0x3dd12c(_0x5dc12e);
        },
        'QofYs': function (_0x213bb4, _0x41e130) {
          return _0x213bb4 === _0x41e130;
        },
        'apJaD': function (_0xa68c6, _0x264de2) {
          return _0xa68c6(_0x264de2);
        },
        'GuuPa': function (_0x8d3174, _0x1b0a4d, _0x32d093, _0x597c7d, _0x3adbd4, _0x370ecc) {
          return _0x8d3174(_0x1b0a4d, _0x32d093, _0x597c7d, _0x3adbd4, _0x370ecc);
        },
        'ZGUVV': function (_0x37acda, _0x22ceba) {
          return _0x37acda > _0x22ceba;
        },
        'QCHRo': function (_0x2d96fe, _0x1409bc) {
          return _0x2d96fe(_0x1409bc);
        },
        'AjSxg': function (_0x34ad80, _0xb9df93) {
          return _0x34ad80(_0xb9df93);
        },
        'ZeybO': function (_0x2c2003, _0x273458) {
          return _0x2c2003 > _0x273458;
        },
        'xcLPo': function (_0x293dee, _0x37d82b) {
          return _0x293dee <= _0x37d82b;
        },
        'LXRFR': "autobuy-cart-item-oos",
        'Dsgzn': "autobuy-cart-item-gift",
        'UOpDU': "--:-- | --/--",
        'WFFed': "gift-remove-btn",
        'PcGGl': "fa-trash",
        'uEUDG': "fa-shopping-cart",
        'mXJnr': "Xóa",
        'dCdRk': "Thêm",
        'WbWcA': function (_0x45ddab, _0x1ec453) {
          return _0x45ddab(_0x1ec453);
        },
        'aVGGz': function (_0x15e49b, _0x2a3fe4) {
          return _0x15e49b(_0x2a3fe4);
        },
        'HAVKy': function (_0x26cd69, _0x4c4362) {
          return _0x26cd69 + _0x4c4362;
        },
        'vSQxt': function (_0x3c0619, _0x33edb7) {
          return _0x3c0619 === _0x33edb7;
        },
        'YBCXl': " style=\"display:none;\"",
        'bikII': "fas fa-chevron-up",
        'kVzcM': "fas fa-chevron-down",
        'frnLb': "autobuy-cart-list",
        'fIAje': "autobuy-cart-load-more-btn",
        'jfoLR': "<div class=\"autobuy-cart-empty\">Đang tải giỏ hàng...</div>",
        'FzGQq': "<div class=\"autobuy-cart-empty\">Giỏ hàng trống hoặc chưa có sản phẩm đủ điều kiện.</div>",
        'OJzdE': function (_0x179bc3, _0x123924) {
          return _0x179bc3(_0x123924);
        },
        'VoSsd': function (_0x494b41, _0x420742) {
          return _0x494b41 > _0x420742;
        },
        'jbmvm': function (_0x52d247, _0x454ab0) {
          return _0x52d247 === _0x454ab0;
        },
        'zMyWS': "url",
        'vXCgn': "order",
        'EijvZ': "cart",
        'XRqRg': function (_0x48bfa3, _0x5c01f8) {
          return _0x48bfa3 === _0x5c01f8;
        },
        'WPBRU': "voucher",
        'ZFmIc': function (_0xeec2f1, _0x2faef1) {
          return _0xeec2f1 === _0x2faef1;
        },
        'djeDO': function (_0x2b0613) {
          return _0x2b0613();
        },
        'DQDDc': " disabled",
        'uUbdk': "voucher-setting-payment-method",
        'LWnDx': "voucher-payment-method-info",
        'RCmhF': "voucher-payment-options-dropdown",
        'FTNzl': ".voucher-payment-select-trigger-text",
        'qWUWK': "cash",
        'zgIdh': "card",
        'kZZUp': "gpay",
        'UXjnG': function (_0x4feec2) {
          return _0x4feec2();
        },
        'BPWsP': function (_0x5290c2, _0x1619b9) {
          return _0x5290c2(_0x1619b9);
        },
        'tEHGg': "Phương thức này đang bị tắt.",
        'QIVQO': "voucher-setting-enable-telegram",
        'QAwgr': "voucher-telegram-inputs",
        'aQpEg': "voucher-auto-settings-modal",
        'YQYob': "hidden",
        'EhtlX': "voucher-setting-scan-limit",
        'FYhwu': "voucher-setting-post-cart-retries",
        'DLqrY': "voucher-setting-delay",
        'RhiCa': "voucher-setting-use-schedule",
        'PsRJp': "voucher-schedule-hour",
        'NASsA': "voucher-schedule-minute",
        'RLuFh': "voucher-schedule-second",
        'iLgVy': "voucher-setting-telegram-token",
        'cDWbg': "voucher-setting-telegram-chatid",
        'Aqmnp': function (_0xe0fe0) {
          return _0xe0fe0();
        },
        'QVhaC': function (_0x4be617, _0x41a1d2) {
          return _0x4be617 !== _0x41a1d2;
        },
        'BlLip': function (_0x23eef4, _0x3f754b, _0x32f66c, _0x1de75d, _0x3a6cd6) {
          return _0x23eef4(_0x3f754b, _0x32f66c, _0x1de75d, _0x3a6cd6);
        },
        'yMTiD': function (_0x23ebf8, _0x2c09d1, _0x226c3e, _0x5c864c, _0x474403) {
          return _0x23ebf8(_0x2c09d1, _0x226c3e, _0x5c864c, _0x474403);
        },
        'gsEdb': function (_0x4015b7, _0x453560, _0x3e7836, _0xd78af, _0x30fbb2) {
          return _0x4015b7(_0x453560, _0x3e7836, _0xd78af, _0x30fbb2);
        },
        'tropB': function (_0x1d9c16, _0x1b5419, _0x424adb, _0x27e8ad, _0x5a94d9) {
          return _0x1d9c16(_0x1b5419, _0x424adb, _0x27e8ad, _0x5a94d9);
        },
        'AZcPQ': function (_0x182ef9, _0x4f6f9b, _0x230b34, _0x1c3be2, _0x3fd054) {
          return _0x182ef9(_0x4f6f9b, _0x230b34, _0x1c3be2, _0x3fd054);
        },
        'pasHu': function (_0x514cfa, _0x3b4b31) {
          return _0x514cfa(_0x3b4b31);
        },
        'TsGpf': function (_0x1a33fc, _0x22887a) {
          return _0x1a33fc(_0x22887a);
        },
        'sMIBJ': "Bật",
        'zmhQn': "Tắt",
        'riBeP': function (_0x37d4d7) {
          return _0x37d4d7();
        },
        'drZXd': ".voucher-auto-rule-title",
        'nfVuf': function (_0x338325, _0x5c8e82) {
          return _0x338325 + _0x5c8e82;
        },
        'NCVlw': ".voucher-auto-rule-row",
        'qsNGN': "voucher-auto-rules",
        'HmfGw': function (_0x24864a, _0x33f601) {
          return _0x24864a <= _0x33f601;
        },
        'UpJLj': "voucher-auto-shop-input",
        'iiJXI': "Không thể đọc clipboard: ",
        'xQbyu': function (_0x808bae, _0x4deb23) {
          return _0x808bae > _0x4deb23;
        },
        'chaAL': function (_0x54727f, _0x490b97, _0x198b0c) {
          return _0x54727f(_0x490b97, _0x198b0c);
        },
        'JlUkx': "https://shopee.vn/api/v4/cart/get",
        'OJwbQ': "{\"pre_selected_item_list\":[],\"updated_time_filter\":{\"start_time\":0},\"cart_state\":{},\"version_list\":[10040779]}",
        'TkrQt': "Không thể tải giỏ hàng.",
        'ablSJ': function (_0x19fcdf, _0x23f9b1, _0x2479a8) {
          return _0x19fcdf(_0x23f9b1, _0x2479a8);
        },
        'KCsoj': "cart/get:first",
        'xufJm': function (_0x5c77e5) {
          return _0x5c77e5();
        },
        'ZbVrH': "Lỗi tải giỏ hàng.",
        'qoiAE': function (_0x480e3a, _0x168b42) {
          return _0x480e3a(_0x168b42);
        },
        'wHHRt': function (_0x2b9281, _0x1e8c40) {
          return _0x2b9281 || _0x1e8c40;
        },
        'tJlgP': function (_0x31c9ce, _0x565c2b) {
          return _0x31c9ce === _0x565c2b;
        },
        'YBRCV': "open",
        'eXwYp': function (_0x5178e0, _0x504d86) {
          return _0x5178e0 || _0x504d86;
        },
        'ltBOe': function (_0x9ecc44, _0x264076) {
          return _0x9ecc44 > _0x264076;
        },
        'qgxLC': function (_0xcc6a20) {
          return _0xcc6a20();
        },
        'FhEoy': "Vui lòng kiểm tra sản phẩm và chọn phân loại trước.",
        'WFayr': function (_0x12792e, _0x30df85) {
          return _0x12792e >= _0x30df85;
        },
        'BOpLM': "7|3|2|6|5|1|0|4",
        'mNHmY': function (_0x5df34f, _0x208088) {
          return _0x5df34f(_0x208088);
        },
        'KEQfm': function (_0xbb8cd, _0x5170fe) {
          return _0xbb8cd(_0x5170fe);
        },
        'nRUUv': "Đã cập nhật sản phẩm hiện tại trong danh sách đơn.",
        'elnIG': "update_current_item_in_order",
        'xaarv': function (_0x1cd901, _0x1e472b) {
          return _0x1cd901(_0x1e472b);
        },
        'kMXZH': function (_0x5a931a, _0xafc47a) {
          return _0x5a931a(_0xafc47a);
        },
        'rReWE': "add_current_item_to_order",
        'gdNPL': function (_0x57f0b9, _0x4e64a9) {
          return _0x57f0b9(_0x4e64a9);
        },
        'tjJrI': function (_0x192a16, _0x5bf426) {
          return _0x192a16(_0x5bf426);
        },
        'sEFxL': function (_0x48d022, _0x39cec5) {
          return _0x48d022 / _0x39cec5;
        },
        'YTyAs': function (_0x52a2b4, _0x2d843a) {
          return _0x52a2b4(_0x2d843a);
        },
        'PkwWs': function (_0x34237b, _0x555a4c) {
          return _0x34237b > _0x555a4c;
        },
        'xtjzz': function (_0x344e8b, _0x22024, _0x3369c3) {
          return _0x344e8b(_0x22024, _0x3369c3);
        },
        'nePny': function (_0xb3993c) {
          return _0xb3993c();
        },
        'IfUKL': function (_0x15ce61, _0x1ca97f) {
          return _0x15ce61(_0x1ca97f);
        },
        'HtSDi': function (_0x4eaa58, _0x58ad75) {
          return _0x4eaa58(_0x58ad75);
        },
        'UpRLh': "remove_item_from_order",
        'ZvbKY': function (_0x1ace11, _0x160d38) {
          return _0x1ace11(_0x160d38);
        },
        'UUowi': function (_0x2aeb46, _0x42f204) {
          return _0x2aeb46 > _0x42f204;
        },
        'AXnsF': function (_0x422368, _0x406fda) {
          return _0x422368 > _0x406fda;
        },
        'DfEAf': function (_0x203d86, _0x27e42c) {
          return _0x203d86(_0x27e42c);
        },
        'ZUrCq': function (_0x2dcc02, _0x4ec3a1) {
          return _0x2dcc02 !== _0x4ec3a1;
        },
        'QocFI': function (_0x1c240e, _0x235872) {
          return _0x1c240e > _0x235872;
        },
        'qnnYV': function (_0x22c305, _0x39a3c6) {
          return _0x22c305(_0x39a3c6);
        },
        'boroT': "update_order_item_quantity",
        'qIpTj': function (_0xc0b723, _0x3409fc) {
          return _0xc0b723(_0x3409fc);
        },
        'JuwKr': "max-retries-help",
        'uoWBn': function (_0x458172, _0x113f61) {
          return _0x458172 === _0x113f61;
        },
        'KXntm': "adv-tab-pane-order",
        'sfobp': "adv-tab-pane-config",
        'iFfbA': "adv-tab-btn-order",
        'SGDaO': "adv-tab-btn-config",
        'PseWk': "config",
        'XsLls': function (_0x251882, _0x447e04) {
          return _0x251882 !== _0x447e04;
        },
        'TfqRr': "payment-options-dropdown",
        'wTEWM': function (_0x167b1c, _0x4e8c3f) {
          return _0x167b1c === _0x4e8c3f;
        },
        'Sdeta': "advanced-settings-help-modal",
        'hjOyq': "#delay-help-item .checkmark-icon-svg",
        'lRGLw': function (_0x2b6531, _0x249fab) {
          return _0x2b6531 >= _0x249fab;
        },
        'SNjoF': "shopee-voucher-setting-group",
        'lylRz': function (_0xa14ac, _0xfb9f61) {
          return _0xa14ac === _0xfb9f61;
        },
        'yqLvA': "function",
        'xCquV': "setting-wait-price",
        'HcOGD': "setting-only-add-to-cart",
        'UrmJL': "price-check-mode-options",
        'AczhM': "input[name=\"price-check-mode\"]:checked",
        'yxeVK': "price-check-checkout",
        'SyHUs': "checkout",
        'tOYIF': function (_0x3ee9d3, _0x56e9b2) {
          return _0x3ee9d3 === _0x56e9b2;
        },
        'IRtnt': function (_0x283052, _0x26f13c) {
          return _0x283052 === _0x26f13c;
        },
        'mYEyZ': function (_0x4662aa, _0xff698b) {
          return _0x4662aa === _0xff698b;
        },
        'sAhpZ': "Hết kho",
        'KEOHP': function (_0x5bfe58, _0x28fd74) {
          return _0x5bfe58 > _0x28fd74;
        },
        'PCtrs': "5.000+",
        'iRCbF': "vi-VN",
        'cgOFa': function (_0xd2316b, _0x593a5d, _0xd7fa79, _0x227172) {
          return _0xd2316b(_0x593a5d, _0xd7fa79, _0x227172);
        },
        'oGzcF': "&quot;",
        'BMydy': "selected",
        'zFwbQ': ".model-option-btn, .mobile-model-btn",
        'ngrYR': function (_0xd4d98a, _0x5285d5) {
          return _0xd4d98a(_0x5285d5);
        },
        'nsPnY': "product-main-image",
        'mkUBt': "mobile-product-image",
        'hvDCq': function (_0x5414d9, _0x5bf5a2) {
          return _0x5414d9 / _0x5bf5a2;
        },
        'fWeFG': function (_0x2cf2f9, _0x1a52d0) {
          return _0x2cf2f9(_0x1a52d0);
        },
        'mWwLl': function (_0x10a9bb, _0x19d02d) {
          return _0x10a9bb(_0x19d02d);
        },
        'egrTV': function (_0x351c53, _0x487ab5) {
          return _0x351c53 * _0x487ab5;
        },
        'pKheV': function (_0x10d1f8, _0x1dfb87) {
          return _0x10d1f8 - _0x1dfb87;
        },
        'wKCaP': function (_0x3a89e2, _0x5407af) {
          return _0x3a89e2 / _0x5407af;
        },
        'ewfYP': "display-price",
        'dZjba': function (_0x311096, _0x322559) {
          return _0x311096(_0x322559);
        },
        'njLOV': "mobile-display-price",
        'WKABT': function (_0x328958, _0x141a38) {
          return _0x328958(_0x141a38);
        },
        'QeJpM': function (_0xc39441, _0x22a5df) {
          return _0xc39441(_0x22a5df);
        },
        'dWsGw': "display-stock",
        'pfSiv': function (_0x309382, _0x4256d4) {
          return _0x309382 + _0x4256d4;
        },
        'ZeWAq': "stock-value",
        'pGpFC': " out-of-stock",
        'ycpOZ': "mobile-display-stock",
        'gYxmz': function (_0x304c72, _0x2e06b9) {
          return _0x304c72 + _0x2e06b9;
        },
        'xsCTx': "mobile-stock",
        'vzoxx': "user_stopped",
        'VkvLG': function (_0x243b40) {
          return _0x243b40();
        },
        'ihmgg': function (_0x55e380) {
          return _0x55e380();
        },
        'suLqk': "btn-start-autobuy",
        'yXcxv': "btn-stop-autobuy",
        'KmVEh': "btn-advanced",
        'yOVkj': "mobile-btn-start",
        'IfFiO': "mobile-btn-stop",
        'nPNZv': "mobile-btn-advanced",
        'gUAyr': "voucher-btn-start",
        'RRGgX': "voucher-btn-stop",
        'taWhp': "voucher-btn-advanced",
        'faNib': "--- ĐÃ DỪNG QUY TRÌNH ---",
        'cutLT': "Chưa resolve shop/baseline thành công.",
        'EwmFE': function (_0x214b1e, _0x18b0f1) {
          return _0x214b1e === _0x18b0f1;
        },
        'Axgrf': "scheduled",
        'vZMWf': function (_0x4d2ee2, _0x2aafd4) {
          return _0x4d2ee2 / _0x2aafd4;
        },
        'AEmeW': "instant",
        'CzkXw': function (_0x1c3eb6, _0x3927a9) {
          return _0x1c3eb6(_0x3927a9);
        },
        'FlLPf': "Hoàn tất quy trình Voucher Auto.",
        'JXBol': "success",
        'lUQTj': "CAPTCHA_REQUIRED",
        'vHBYv': "Captcha terminal error. Dừng toàn bộ.",
        'HBOli': "3|0|1|2|4",
        'QpDBI': function (_0x14d46d) {
          return _0x14d46d();
        }
      };
      function _0x2ed629(_0x232b6a) {
        const _0x3be68e = [/^https?:\/\//i, /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, /s\.shopee\.vn/i];
        return _0x3be68e.some(_0x31d1c4 => _0x31d1c4.test(_0x232b6a));
      }
      async function _0x1cd22c(_0x231503) {
        let _0x13b5db = _0x54a97b.CBGVx(_0x237fab, _0x231503);
        if (!_0x13b5db) return null;
        if (_0x13b5db.includes("shopee.vn") && !_0x13b5db.includes("s.shopee.vn") && !_0x13b5db.includes("shp.ee")) return _0x13b5db;
        try {
          const _0x2575cc = await _0x54a97b.CBGVx(_0x50c904, _0x13b5db);
          return _0x2575cc?.["includes"]("shopee.vn") ? _0x2575cc : null;
        } catch (_0x5cd949) {
          return console.error("Error expanding URL:", _0x5cd949), null;
        }
      }
      function _0x530361(_0x34fa54) {
        const _0x3ff2d4 = _0x34fa54.split('?')[0],
          _0x472399 = [/\/product\/(\d+)\/(\d+)/i, /-i\.(\d+)\.(\d+)/i];
        for (const _0x58cf31 of _0x472399) {
          const _0x2c5fdf = _0x3ff2d4.match(_0x58cf31);
          if (_0x2c5fdf) return {
            'shopId': _0x2c5fdf[1],
            'itemId': _0x2c5fdf[2]
          };
        }
        return null;
      }
      const _0x33e297 = _0xb4394 => {
          if (!_0xb4394) return '';
          const _0x3ce5ab = new Date(_0x59e2f9.UsCzy(_0xb4394, 1000)),
            _0x19cb67 = _0x59e2f9.pacCI(String, _0x3ce5ab.getHours()).padStart(2, '0'),
            _0x546780 = _0x59e2f9.BSiMD(String, _0x3ce5ab.getMinutes()).padStart(2, '0'),
            _0x9bdbd = _0x59e2f9.XxGRG(String, _0x3ce5ab.getDate()).padStart(2, '0'),
            _0x5714ac = _0x59e2f9.pnnZe(String, _0x59e2f9.fKqah(_0x3ce5ab.getMonth(), 1)).padStart(2, '0');
          return _0x19cb67 + ':' + _0x546780 + " | " + _0x9bdbd + '/' + _0x5714ac;
        },
        _0x331216 = _0x16d406 => {
          const _0xcb7e0d = _0x59e2f9.RSUuY(Number, _0x16d406);
          if (!Number.isFinite(_0xcb7e0d)) return '0';
          const _0x42645d = _0x59e2f9.eFPVL(_0xcb7e0d, 100000000);
          return Number.isInteger(_0x42645d) ? _0x59e2f9.dlqjn(String, _0x42645d) : _0x59e2f9.XwudW(String, _0x42645d.toFixed(1));
        },
        _0x3322df = _0x10c1b2 => {
          let _0x4813dd = '';
          if (_0x10c1b2.discount_percentage) {
            const _0x3ea6d8 = _0x10c1b2.discount_percentage,
              _0x595c74 = _0x59e2f9.XwudW(_0x331216, _0x10c1b2.min_spend),
              _0x4aa4a9 = [_0x10c1b2.discount_cap, _0x10c1b2.max_value, _0x10c1b2.reward_cap].find(_0x2095af => _0x2095af !== null && _0x2095af !== undefined && _0x2095af !== ''),
              _0x666b04 = _0x59e2f9.vWwOG(Number, _0x4aa4a9);
            Number.isFinite(_0x666b04) && _0x59e2f9.ZzIPM(_0x666b04, 0) ? _0x4813dd = "giảm " + _0x3ea6d8 + "%, max " + _0x59e2f9.BFFre(_0x331216, _0x666b04) + "k từ " + _0x595c74 + 'k' : _0x4813dd = "giảm " + _0x3ea6d8 + "%, k giới hạn từ " + _0x595c74 + 'k';
          } else {
            if (_0x10c1b2.discount_value) {
              const _0xdb28e3 = _0x59e2f9.zNkXO(_0x331216, _0x10c1b2.discount_value),
                _0x3e5285 = _0x59e2f9.xsQNw(_0x331216, _0x10c1b2.min_spend);
              _0x4813dd = "giảm " + _0xdb28e3 + "k từ " + _0x3e5285 + 'k';
            }
          }
          return _0x4813dd && _0x59e2f9.AfrPm(_0x10c1b2.shop_id, 0) && (_0x4813dd += _0x10c1b2.product_limit ? " [Lọc sp]" : " [Toàn shop]"), _0x4813dd;
        },
        _0x7a7261 = {
          0x0: "Mã thỏa điều kiện áp dụng",
          0x1: "Đã lưu voucher này.",
          0x2: "Voucher không hợp lệ hoặc không còn hiệu lực",
          0x3: "Voucher này đã hết hạn sử dụng",
          0x4: "Voucher này đã hết lượt sử dụng",
          0x5: "Sản phẩm không áp đc mã này",
          0x6: "Thời gian dùng mã này chưa bắt đầu",
          0x7: "Đơn chưa đạt giá trị tối thiểu.",
          0x8: "Không thể tìm thấy mã voucher này",
          0xa: "Voucher này hiện chưa thể lưu",
          0xe: "Vui lòng sử dụng trên app",
          0x271d: "Vui lòng sử dụng trên app"
        },
        _0x14b168 = new Set([0, 6, 10]),
        _0x5a13d8 = _0x4e6987 => {
          const _0x1b3280 = _0x59e2f9.KUvHx(Number, _0x4e6987);
          if (!Number.isFinite(_0x1b3280) || _0x59e2f9.otlDx(_0x1b3280, 0)) return '0đ';
          return Math.round(_0x59e2f9.IdruR(_0x1b3280, 100000)).toLocaleString("vi-VN") + 'đ';
        },
        _0x403a15 = _0x593874 => {
          const _0x1bd543 = _0x59e2f9.WzvWZ(Number, _0x593874 || 0);
          if (!_0x1bd543) return "no-shop";
          const _0x2830ac = _0x59e2f9.isScj(_0x1c3fbd).filter(_0x29098b => Number(_0x29098b.shopid || 0) === _0x1bd543).map(_0x19ee9d => ({
            'itemid': Number(_0x19ee9d.itemid || 0),
            'modelid': Number(_0x19ee9d.modelid || 0),
            'quantity': Math.max(1, Number(_0x19ee9d.quantity || 1))
          })).filter(_0x5b591b => _0x5b591b.itemid > 0 && _0x5b591b.modelid > 0).sort((_0x23c747, _0x3efd7b) => {
            if (_0x54a97b.PGPcQ(_0x23c747.itemid, _0x3efd7b.itemid)) return _0x54a97b.zVyFl(_0x23c747.itemid, _0x3efd7b.itemid);
            if (_0x54a97b.YapFl(_0x23c747.modelid, _0x3efd7b.modelid)) return _0x54a97b.EZKgv(_0x23c747.modelid, _0x3efd7b.modelid);
            return _0x54a97b.zVyFl(_0x23c747.quantity, _0x3efd7b.quantity);
          });
          if (!_0x2830ac.length) return "single-fallback";
          return _0x2830ac.map(_0x189682 => _0x189682.itemid + ':' + _0x189682.modelid + ':' + _0x189682.quantity).join('|');
        },
        _0x4950e5 = (_0x52ba62, _0x21c0e0, _0x54f319 = '') => String(_0x52ba62) + '::' + String(_0x21c0e0).toUpperCase() + '::' + String(_0x54f319 || "single-fallback"),
        _0x44c35e = () => {
          const _0x8b468a = _0x54a97b.CBGVx(Number, document.getElementById("setting-shop-voucher-shop-select")?.["value"] || 0);
          if (_0x54a97b.CnWBi(_0x8b468a, 0)) return _0x8b468a;
          const _0x5bc152 = _0x54a97b.sbNHa(Number, _0x5acbd4.selectedVoucherShopId || 0);
          if (_0x54a97b.TRaeN(_0x5bc152, 0)) return _0x5bc152;
          return _0x54a97b.sbNHa(Number, window.currentProductData?.["shopId"] || 0);
        },
        _0x114f3b = () => {
          const _0x144d6d = _0x59e2f9.noWKh(_0x44c35e),
            _0x1f0d20 = _0x59e2f9.NSZRD(_0x1c3fbd),
            _0x769750 = _0x1f0d20.find(_0xdea423 => Number(_0xdea423.shopid) === Number(_0x144d6d));
          if (_0x769750) return {
            'hasProductContext': true,
            'shopId': _0x59e2f9.VWyFX(Number, _0x769750.shopid),
            'itemId': _0x59e2f9.wgrXn(Number, _0x769750.itemid),
            'modelId': _0x59e2f9.zjvuU(Number, _0x769750.modelid),
            'selectedModel': {
              'model_id': _0x59e2f9.EBQtB(Number, _0x769750.modelid),
              'name': _0x769750.variantName || ''
            },
            'item': {
              'title': _0x769750.itemTitle || '',
              'itemid': _0x59e2f9.ISuKL(Number, _0x769750.itemid),
              'categories': []
            }
          };
          const _0x500d3f = window.currentProductData,
            _0x120883 = Array.isArray(_0x500d3f?.["models"]) ? _0x500d3f.models : [],
            _0x26b0f0 = _0x59e2f9.zjvuU(Number, document.querySelector(".model-option-btn.selected, .mobile-model-btn.selected")?.["dataset"]?.["modelId"] || 0),
            _0x52ae6e = _0x59e2f9.aiBDS(Number, window.selectedModelId || 0),
            _0xa94b75 = _0x26b0f0 || _0x52ae6e,
            _0x5db492 = _0x120883.find(_0x4fe596 => Number(_0x4fe596?.["model_id"]) === _0xa94b75) || _0x120883[0],
            _0x2a284b = _0x59e2f9.GkrAt(Number, _0x144d6d || _0x500d3f?.["shopId"] || 0),
            _0x3bd037 = _0x59e2f9.xzIcc(Number, _0x500d3f?.["itemId"] || _0x500d3f?.["item"]?.["itemid"] || 0),
            _0x528c45 = _0x59e2f9.hkhfA(Number, _0x5db492?.["model_id"] || 0);
          return {
            'hasProductContext': Number.isFinite(_0x2a284b) && _0x59e2f9.TsQDr(_0x2a284b, 0) && Number.isFinite(_0x3bd037) && _0x59e2f9.DCoVJ(_0x3bd037, 0) && Number.isFinite(_0x528c45) && _0x59e2f9.hjref(_0x528c45, 0),
            'shopId': _0x2a284b,
            'itemId': _0x3bd037,
            'modelId': _0x528c45,
            'selectedModel': _0x5db492,
            'item': _0x500d3f?.["item"] || null
          };
        },
        _0x3e56c = (_0x435b18, _0x340e6e = 0) => {
          const _0x32a518 = {
              'myPlF': function (_0x518ff1, _0x460382) {
                return _0x54a97b.OqCbt(_0x518ff1, _0x460382);
              },
              'NQaTY': function (_0x28d375, _0x9d49b6) {
                return _0x54a97b.CBGVx(_0x28d375, _0x9d49b6);
              },
              'EFMAc': function (_0x2848b7, _0xbbe85f) {
                return _0x54a97b.UypRi(_0x2848b7, _0xbbe85f);
              },
              'UFZra': function (_0x186ea1, _0x59866a) {
                return _0x54a97b.CBGVx(_0x186ea1, _0x59866a);
              },
              'rkuiB': function (_0x525460, _0x33ebe3) {
                return _0x54a97b.CBGVx(_0x525460, _0x33ebe3);
              },
              'nWcGG': function (_0x3187ec, _0x1ce400) {
                return _0x54a97b.CBGVx(_0x3187ec, _0x1ce400);
              },
              'cBepJ': function (_0x1a12ae, _0x4aaf6e) {
                return _0x54a97b.zvdDC(_0x1a12ae, _0x4aaf6e);
              },
              'gXSDE': function (_0x6825e9, _0x550802) {
                return _0x54a97b.CBGVx(_0x6825e9, _0x550802);
              },
              'JQjdk': function (_0x41064c, _0x4f695e) {
                return _0x54a97b.OqCbt(_0x41064c, _0x4f695e);
              }
            },
            _0x14bfdb = _0x54a97b.SgMbi(_0x114f3b),
            _0x1bdc32 = _0x54a97b.zvdDC(Number, _0x340e6e || _0x14bfdb.shopId || 0);
          if (!_0x1bdc32) return null;
          const _0x16cd9a = window.currentProductData || null,
            _0xdaa0b0 = Array.isArray(_0x16cd9a?.["models"]) ? _0x16cd9a.models : [],
            _0x4f95f2 = _0x54a97b.fcsxv(_0x1c3fbd).filter(_0xdc7d16 => Number(_0xdc7d16.shopid || 0) === _0x1bdc32),
            _0xdad85 = _0x2ac811 => {
              const _0x1012ba = _0x32a518.myPlF(Number, _0x2ac811.itemid || 0),
                _0x1ad29b = _0x32a518.NQaTY(Number, _0x2ac811.modelid || 0);
              if (!_0x1012ba || !_0x1ad29b) return null;
              const _0x3cf97d = _0x32a518.EFMAc(_0x32a518.UFZra(Number, _0x16cd9a?.["shopId"] || 0), _0x1bdc32) ? _0xdaa0b0.find(_0x129a7f => Number(_0x129a7f?.["model_id"] || 0) === _0x1ad29b) : null,
                _0x1295af = _0x16cd9a?.["item"] || {},
                _0x2052f5 = Array.isArray(_0x1295af?.["categories"]) ? _0x1295af.categories.map(_0x555db0 => Number(_0x555db0?.["catid"] || _0x555db0?.["category_id"] || _0x555db0?.['id'] || 0)).filter(_0x331b99 => Number.isFinite(_0x331b99) && _0x331b99 > 0) : [],
                _0x1232d1 = _0x32a518.rkuiB(Number, _0x3cf97d?.["price"] || _0x1295af?.["price"]?.["single_value"] || 0),
                _0x5785da = _0x32a518.nWcGG(Number, _0x3cf97d?.["price_before_discount"] || _0x1232d1 || 0);
              return {
                'itemid': _0x1012ba,
                'modelid': _0x1ad29b,
                'shopid': _0x1bdc32,
                'quantity': Math.max(1, _0x32a518.cBepJ(Number, _0x2ac811.quantity || 1)),
                'insurances': [],
                'value_added_service_info': {
                  'installation_products': [],
                  'trade_in_products': [],
                  'warranty_products': []
                },
                'offerid': 0x0,
                'shippable': true,
                'non_shippable_err': '',
                'none_shippable_reason': '',
                'none_shippable_full_reason': '',
                'warning': '',
                'warning_type': 0x0,
                'strikethrough_price': _0x5785da,
                'price': _0x1232d1,
                'icons': null,
                'name': _0x32a518.UFZra(String, _0x2ac811.itemTitle || _0x1295af?.["title"] || ''),
                'name_tr': '',
                'model_name': _0x32a518.gXSDE(String, _0x2ac811.variantName || _0x3cf97d?.["name"] || ''),
                'model_name_tr': '',
                'add_on_deal_id': 0x0,
                'item_group_id': null,
                'is_add_on_sub_item': false,
                'addon_deal_sub_type': null,
                'add_on_deal_sub_display_mode': 0x0,
                'image': _0x32a518.JQjdk(String, _0x1295af?.["image"] || ''),
                'checkout': true,
                'categories': [{
                  'catids': _0x2052f5
                }],
                'is_pre_order': !!_0x1295af?.["is_pre_order"],
                'is_streaming_price': false,
                'is_spl_zero_interest': false,
                'spl_zero_interest_label': '',
                'is_prescription': false,
                'supports_free_returns': !!_0x1295af?.["supports_free_returns"],
                'free_return_eligible': !!_0x1295af?.["free_return_eligible"],
                'com_eligible': false,
                'labels': [],
                'channel_exclusive_info': {
                  'source_id': 0x0,
                  'token': '',
                  'is_live_stream': false,
                  'is_short_video': false,
                  'user_path_token': '',
                  'user_path_flag': 0x1
                },
                'stream_info': {
                  'streamer_id_live_stream': 0x0,
                  'streamer_id_short_video': 0x0
                },
                'spu_info': {
                  'itemid': 0x0,
                  'modelid': 0x0,
                  'shopid': 0x0,
                  'quantity': 0x0
                },
                'is_bom_item': false,
                'show_quantity_selector': false,
                'min_quantity': 0x0,
                'max_quantity': 0x0,
                'show_variation_selector': false,
                'models': null,
                'variations': null,
                'final_price_display_mode': 0x0,
                'user_path': 0x1
              };
            },
            _0x4b9d56 = _0x4f95f2.map(_0x4e317f => _0xdad85(_0x4e317f)).filter(Boolean);
          !_0x4b9d56.length && _0x14bfdb.hasProductContext && _0x4b9d56.push(_0x54a97b.GHYLh(_0xdad85, {
            'itemid': _0x14bfdb.itemId,
            'modelid': _0x14bfdb.modelId,
            'shopid': _0x1bdc32,
            'quantity': Math.max(1, _0x54a97b.CBGVx(Number, _0x5acbd4.quantity || 1)),
            'itemTitle': _0x14bfdb.item?.["title"] || '',
            'variantName': _0x14bfdb.selectedModel?.["name"] || ''
          }));
          if (!_0x4b9d56.length) return null;
          const _0x22a95d = {
            'version': 0x1,
            'payment_channelid': 0xe678,
            'option_info': '',
            'text_info': {},
            'ros_opt_in': false,
            'name': "Thanh toán khi nhận hàng",
            'support_advance_booking': true,
            'combined_payments_info': {
              'base_payable': 0x0,
              'total_payable': 0x0,
              'price_breakdown': [],
              'splits': []
            }
          };
          return {
            'voucher_code': _0x435b18,
            'shoporders': [{
              'shopid': _0x1bdc32,
              'extrainfo': {},
              'iteminfos': _0x4b9d56,
              'voucher_drawer_info': {
                'selected_logistic_channelid': 0x1389,
                'selected_masked_channelid': 0x0,
                'selected_meta_channel_id': 0x0
              }
            }],
            'has_redeem_coins': false,
            'selected_payment_channel_data': _0x22a95d,
            'shop_ids': [_0x1bdc32]
          };
        },
        _0x172bfe = (_0x1e7f1e, _0x18b8a9, _0x2e0343 = '') => {
          if (_0x54a97b.UypRi(_0x1e7f1e, 0)) return "Mã hợp lệ cho đơn hàng.";
          if (_0x54a97b.nTyRh(_0x1e7f1e, 7)) {
            const _0x1776ef = _0x54a97b.GHYLh(Number, _0x18b8a9?.["min_spend"] || 0),
              _0x94ef90 = _0x54a97b.aGGCS(Number, _0x18b8a9?.["current_spend"] || 0),
              _0x462908 = Math.max(0, _0x54a97b.MeSvG(_0x1776ef, _0x94ef90)),
              _0x316763 = _0x54a97b.QyqyY(_0x5a13d8, _0x462908);
            return "Giá trị tối thiểu của đơn chưa đạt đủ điều kiện. Bạn cần mua thêm " + _0x316763 + '.';
          }
          if (_0x7a7261[_0x1e7f1e]) return _0x7a7261[_0x1e7f1e];
          return _0x2e0343 || "Không rõ trạng thái xác minh voucher.";
        },
        _0x5488ea = _0x2d28f1 => {
          if (!_0x2d28f1 || _0x54a97b.YapFl(typeof _0x2d28f1, "object")) return null;
          const _0x1bf4d2 = _0x54a97b.GHYLh(_0x33c49a, _0x2d28f1.voucher_code || _0x2d28f1.voucherCode || ''),
            _0x5d8e4d = _0x54a97b.OqCbt(Number, _0x2d28f1.promotionid || _0x2d28f1.promotion_id || _0x2d28f1.voucherid || 0);
          if (!_0x1bf4d2 || !Number.isFinite(_0x5d8e4d) || _0x54a97b.zedUy(_0x5d8e4d, 0)) return null;
          const _0x5f0c1b = _0x2d28f1.icon_hash || _0x2d28f1.shop_logo || '',
            _0x523c5e = _0x5f0c1b ? /^https?:\/\//i.test(_0x54a97b.AccgI(String, _0x5f0c1b)) ? _0x54a97b.PySVN(String, _0x5f0c1b) : "https://down-vn.img.susercontent.com/file/" + _0x5f0c1b : '',
            _0x2732e5 = _0x54a97b.eNqKh(Number, _0x2d28f1.invalid_message_code || 0);
          return {
            'voucherCode': _0x1bf4d2,
            'promotionid': _0x5d8e4d,
            'signature': _0x54a97b.FwTCW(String, _0x2d28f1.signature || ''),
            'shopId': _0x54a97b.EUXaR(Number, _0x2d28f1.shop_id || _0x2d28f1.shopid || 0),
            'terms': _0x54a97b.FwTCW(_0x3322df, _0x2d28f1),
            'minSpend': _0x54a97b.EUXaR(Number, _0x2d28f1.min_spend || 0),
            'currentSpend': _0x54a97b.AccgI(Number, _0x2d28f1.current_spend || 0),
            'percentageUsed': _0x54a97b.FwTCW(Number, _0x2d28f1.percentage_used) || 0,
            'percentageClaimed': _0x54a97b.AccgI(Number, _0x2d28f1.percentage_claimed) || 0,
            'startTime': _0x54a97b.CwAjP(Number, _0x2d28f1.start_time) || 0,
            'startTimeShow': _0x54a97b.IrDuR(_0x33e297, _0x2d28f1.start_time),
            'endTime': _0x54a97b.GEGqP(Number, _0x2d28f1.end_time) || 0,
            'endTimeShow': _0x54a97b.VKGfJ(_0x33e297, _0x2d28f1.end_time),
            'iconHash': _0x523c5e,
            'iconText': _0x54a97b.BzsKh(String, _0x2d28f1.icon_text || _0x2d28f1.shop_name || ''),
            'invalidCode': Number.isFinite(_0x2732e5) ? _0x2732e5 : 0,
            'invalidMessage': _0x54a97b.sbNHa(String, _0x2d28f1.invalid_message || ''),
            'sourceVoucher': _0x2d28f1
          };
        },
        _0x3f30a9 = (_0x3691dd, _0x3c7690 = 0) => {
          const _0x14a516 = _0x59e2f9.JLftq(_0x5488ea, _0x3691dd);
          if (!_0x14a516) return null;
          const _0xd3b554 = _0x59e2f9.HBVlW(Number, _0x14a516.shopId || _0x3c7690 || 0),
            _0x17b1bc = _0x59e2f9.XPHJH(String, _0x3691dd?.["__source"] || "recommend"),
            _0x425817 = _0x14a516.voucherCode && _0x14a516.promotionid && _0x14a516.signature ? "https://shopee.vn/search?voucherCode=" + _0x14a516.voucherCode + "&promotionId=" + _0x14a516.promotionid + "&signature=" + _0x14a516.signature : '';
          return {
            'voucherCode': _0x14a516.voucherCode,
            'shopId': _0xd3b554 ? _0x59e2f9.zcZqP(String, _0xd3b554) : '',
            'promotionid': _0x14a516.promotionid,
            'signature': _0x14a516.signature,
            'terms': _0x14a516.terms || '',
            'minSpend': _0x14a516.minSpend,
            'currentSpend': _0x14a516.currentSpend,
            'percentageUsed': _0x14a516.percentageUsed,
            'percentageClaimed': _0x14a516.percentageClaimed,
            'startTime': _0x14a516.startTime,
            'startTimeShow': _0x14a516.startTimeShow,
            'endTime': _0x14a516.endTime,
            'endTimeShow': _0x14a516.endTimeShow,
            'iconHash': _0x14a516.iconHash,
            'iconText': _0x14a516.iconText,
            'voucherLink': _0x425817,
            'validationInvalidCode': _0x14a516.invalidCode,
            'validationMessage': _0x59e2f9.TAkfc(_0x172bfe, _0x14a516.invalidCode, _0x14a516.sourceVoucher, _0x14a516.invalidMessage),
            'validationSkipForCheckout': !_0x14b168.has(_0x14a516.invalidCode),
            'validatedAt': Date.now(),
            'fromRecommendation': true,
            'sourceType': _0x17b1bc,
            'sourceBadge': _0x59e2f9.yMcgR(_0x486ef5, _0x17b1bc)
          };
        },
        _0x4fc00b = (_0x3f687f, _0x21a2c7 = false) => {
          _0x5acbd4.shopVoucherAutoBestOutsideList = !!_0x3f687f;
          if (_0x5acbd4.shopVoucherAutoBestOutsideList) {
            _0x5acbd4.shopVoucherCode = '';
            _0x5acbd4.shopVoucherData = null;
            const _0x5aa48f = document.getElementById("setting-shop-voucher-code");
            if (_0x5aa48f) _0x5aa48f.value = '';
            _0x59e2f9.wgrXn(_0x86e9cc, null);
            _0x21a2c7 && _0x1d9aeb.info("Đã bật chế độ tự động áp dụng mã tốt nhất ngoài list.");
          } else _0x21a2c7 && _0x59e2f9.pEfuU(_0x86e9cc, null);
        },
        _0xb63af1 = () => {
          const _0x4d5e11 = document.getElementById("setting-shop-voucher-shop-select");
          if (!_0x4d5e11) return;
          const _0x404d7b = _0x59e2f9.qnAhK(_0x26b881);
          if (!_0x404d7b.length) {
            _0x4d5e11.innerHTML = "<option value=\"0\">Chưa có shop trong đơn</option>";
            _0x4d5e11.disabled = true;
            return;
          }
          _0x4d5e11.disabled = false;
          !_0x59e2f9.CBEKe(Number, _0x5acbd4.selectedVoucherShopId || 0) && (_0x5acbd4.selectedVoucherShopId = _0x59e2f9.sVLer(Number, _0x404d7b[0].shopId));
          _0x4d5e11.innerHTML = _0x404d7b.map(_0x176aa1 => {
            const _0x3b2690 = _0x54a97b.nTyRh(_0x54a97b.sbdrI(Number, _0x5acbd4.selectedVoucherShopId), _0x54a97b.HZwsC(Number, _0x176aa1.shopId)) ? " selected" : '';
            return "<option value=\"" + _0x176aa1.shopId + '\x22' + _0x3b2690 + '>' + _0x54a97b.ZwiJT(_0x47f96e, _0x176aa1.shopName) + "</option>";
          }).join('');
        };
      window.renderShopVoucherShopSelector = _0xb63af1;
      const _0x449694 = (_0x12f0f6, _0x3a3ec9) => {
          const _0xdfb2ee = _0x59e2f9.FiAOV(Number, _0x12f0f6 || 0),
            _0x556bd4 = _0x59e2f9.rVZce(String, _0x3a3ec9 || '').trim();
          if (!_0xdfb2ee || !_0x556bd4) return;
          if (/^shop\s+\d+$/i.test(_0x556bd4)) return;
          const _0xc2a2e4 = _0x59e2f9.ZwvxU(String, _0x5acbd4.shopInfoById?.[_0xdfb2ee]?.["shopName"] || '').trim();
          (!_0xc2a2e4 || /^shop\s+\d+$/i.test(_0xc2a2e4)) && (_0x5acbd4.shopInfoById[_0xdfb2ee] = {
            'shopName': _0x556bd4
          });
        },
        _0x6ceae1 = () => {
          const _0x55a5aa = {
              'WVAoV': function (_0x5af519, _0x1614d2) {
                return _0x59e2f9.KUuzV(_0x5af519, _0x1614d2);
              },
              'BFFgQ': "#15803d",
              'mxHrb': function (_0x36fb44, _0x5f4750) {
                return _0x59e2f9.rugUi(_0x36fb44, _0x5f4750);
              },
              'WLUOR': "#d97706",
              'kLrOu': "#dc2626"
            },
            _0x3a9fd5 = document.getElementById("setting-shop-voucher-select"),
            _0x1ebdd9 = document.getElementById("shop-voucher-picker-status");
          if (!_0x3a9fd5) return;
          _0x3a9fd5.classList.remove("state-loading", "state-success", "state-empty", "state-error");
          if (_0x1ebdd9) _0x1ebdd9.style.display = "none";
          if (_0xbb2033.loading) {
            _0x3a9fd5.innerHTML = "<option value=\"\">Đang tải danh sách voucher shop...</option>";
            _0x3a9fd5.disabled = true;
            _0x3a9fd5.classList.add("state-loading");
            return;
          }
          const _0x21d4c6 = Array.isArray(_0xbb2033.vouchers) ? _0xbb2033.vouchers : [],
            _0x40e68a = _0x59e2f9.tROaN(Number, _0x5acbd4.selectedVoucherShopId || 0),
            _0x4bd9d3 = _0x59e2f9.RmlKz(_0x40e68a, 0) ? _0x21d4c6.filter(_0x3d0b75 => Number(_0x3d0b75.shopId || 0) === _0x40e68a) : _0x21d4c6,
            _0x3fe247 = _0x5acbd4.shopVoucherByShop && _0x5acbd4.shopVoucherByShop[_0x40e68a] || null,
            _0xf75adb = _0x59e2f9.kDQDa(_0x33c49a, document.getElementById("setting-shop-voucher-code")?.["value"] || _0x3fe247?.["voucherCode"] || ''),
            _0x4a5226 = !!_0x5acbd4.shopVoucherAutoBestOutsideList,
            _0x4d7b95 = "∅ Không dùng voucher";
          let _0x382129 = false,
            _0x4b25a8 = '';
          if (_0xbb2033.error) {
            _0x382129 = true;
            _0x4b25a8 = "state-error";
          } else _0x59e2f9.tUItJ(_0x4bd9d3.length, 0) ? _0x4b25a8 = "state-success" : (_0x382129 = true, _0x4b25a8 = "state-empty");
          const _0x4f066a = _0x4bd9d3.some(_0x33b90f => _0x33b90f.voucherCode === _0xf75adb),
            _0x390c1d = _0x59e2f9.QJkoi(Number, _0x5acbd4.selectedVoucherShopId || 0),
            _0x5d3b0f = _0x59e2f9.hjref(_0x390c1d, 0) && _0x5acbd4.shopVoucherByShop && Object.prototype.hasOwnProperty.call(_0x5acbd4.shopVoucherByShop, _0x390c1d) && _0x59e2f9.nbLNv(_0x5acbd4.shopVoucherByShop[_0x390c1d], null),
            _0x5668c6 = !_0x4f066a && !_0x4a5226 || _0x5d3b0f ? " selected" : '';
          _0x59e2f9.BLOyp(_0x4bd9d3.length, 0) && _0x5d3b0f && (_0x4b25a8 = "state-empty");
          const _0x4ba271 = _0x16ad38 => {
              if (_0x54a97b.UypRi(_0x16ad38.validationInvalidCode, 0)) return 0;
              if (_0x54a97b.nTyRh(_0x16ad38.validationInvalidCode, 7)) return 1;
              return 2;
            },
            _0x2ce035 = [..._0x4bd9d3].sort((_0x2aeaa2, _0x29e391) => _0x4ba271(_0x2aeaa2) - _0x4ba271(_0x29e391)),
            _0x1760ba = ["<option value=\"\"" + _0x5668c6 + '>' + _0x59e2f9.JZGaV(_0x47f96e, _0x4d7b95) + "</option>", "<option value=\"" + _0x7b6556 + '\x22' + (_0x4a5226 ? " selected" : '') + ">⏰ Tự áp mã mới ngoài list dưới khung chỉ định</option>", ..._0x2ce035.map(_0x268235 => {
              const _0x58acf8 = _0x54a97b.IrDuR(String, _0x268235.terms || '').trim(),
                _0x3b8ffd = _0x58acf8 ? " - " + _0x58acf8 : '',
                _0x463573 = !_0x4a5226 && _0x54a97b.nTyRh(_0x268235.voucherCode, _0xf75adb) ? " selected" : '',
                _0x3ccd5f = _0x54a97b.nTyRh(_0x268235.validationInvalidCode, 0),
                _0x4a322f = _0x54a97b.nTyRh(_0x268235.validationInvalidCode, 7),
                _0x4c86f5 = _0x3ccd5f ? '✔\x20' : '✖\x20';
              let _0xd3e53 = '';
              if (_0x4a322f) {
                const _0x3faca7 = _0x54a97b.ynNAM(_0x268235.minSpend || 0, _0x268235.currentSpend || 0);
                _0x54a97b.CnWBi(_0x3faca7, 0) && (_0xd3e53 = " [+" + _0x54a97b.MhIkz(_0x331216, _0x3faca7) + 'k]');
              }
              const _0xcd9620 = _0x54a97b.QyqyY(String, _0x268235.sourceBadge || ''),
                _0x44d09d = (_0xcd9620 + '\x20' + _0x4c86f5 + _0x268235.voucherCode + _0x3b8ffd + _0xd3e53).trim();
              return _0x54a97b.WBUmf("<option value=\"" + _0x54a97b.QyqyY(_0x47f96e, _0x268235.voucherCode) + '\x22' + _0x463573 + " data-valid=\"" + (_0x3ccd5f ? '1' : _0x4a322f ? '2' : '0') + '\x22>', _0x54a97b.Ghqcu(_0x47f96e, _0x44d09d) + "</option>");
            })];
          _0x3a9fd5.innerHTML = _0x1760ba.join('');
          _0x3a9fd5.disabled = _0x382129;
          if (_0x4b25a8) _0x3a9fd5.classList.add(_0x4b25a8);
          _0x3a9fd5.querySelectorAll("option[data-valid]").forEach(_0x596d87 => {
            if (_0x55a5aa.WVAoV(_0x596d87.dataset.valid, '1')) _0x596d87.style.color = "#15803d";else {
              if (_0x55a5aa.mxHrb(_0x596d87.dataset.valid, '2')) _0x596d87.style.color = "#d97706";else _0x596d87.style.color = "#dc2626";
            }
          });
        },
        _0x5ad819 = _0xfbf1ae => {
          const _0x347f2c = _0x59e2f9.GhhQQ(_0x33c49a, _0xfbf1ae);
          if (!_0x347f2c) return null;
          const _0x240b05 = Array.isArray(_0xbb2033.vouchers) ? _0xbb2033.vouchers : [],
            _0x4eb650 = _0x59e2f9.YRYWR(Number, _0x5acbd4.selectedVoucherShopId || 0),
            _0x16f4f2 = _0x59e2f9.mLCBL(_0x4eb650, 0) ? _0x240b05.filter(_0x497bee => Number(_0x497bee.shopId || 0) === _0x4eb650) : _0x240b05;
          return _0x16f4f2.find(_0xb8f040 => _0x33c49a(_0xb8f040.voucherCode) === _0x347f2c) || null;
        };
      window.preloadShopVoucherRecommendations = async (_0x65e3d = false) => {
        const _0x2d5854 = {
          'zraVM': function (_0x130513) {
            return _0x59e2f9.LPIbB(_0x130513);
          },
          'TRMkr': function (_0x35513e, _0x558cc9) {
            return _0x59e2f9.wfGkL(_0x35513e, _0x558cc9);
          },
          'YGkVD': function (_0x4deb57, _0x1e18db, _0x4c2867) {
            return _0x59e2f9.oNdwL(_0x4deb57, _0x1e18db, _0x4c2867);
          },
          'mRZUf': function (_0x28bdc3, _0x4fab62, _0x5f1c12) {
            return _0x59e2f9.nvTbM(_0x28bdc3, _0x4fab62, _0x5f1c12);
          },
          'NVOQn': function (_0x17b028, _0x1fc1e3, _0x6fd1f2) {
            return _0x59e2f9.IDZJQ(_0x17b028, _0x1fc1e3, _0x6fd1f2);
          },
          'YpXYe': function (_0x6bc7c7, _0x157712) {
            return _0x59e2f9.KUuzV(_0x6bc7c7, _0x157712);
          },
          'itbfR': "recommend",
          'HBAjA': "both",
          'AeoGy': function (_0x5edc95, _0x21f11e) {
            return _0x59e2f9.wlZWe(_0x5edc95, _0x21f11e);
          },
          'tkYXn': function (_0x4d63f4, _0x1571f5) {
            return _0x59e2f9.IFimu(_0x4d63f4, _0x1571f5);
          },
          'ARJVI': function (_0x4f0dd8, _0x13be4e) {
            return _0x59e2f9.EfVtp(_0x4f0dd8, _0x13be4e);
          },
          'WGSfW': function (_0x957828, _0x35994a) {
            return _0x59e2f9.inKZd(_0x957828, _0x35994a);
          },
          'WCvvN': function (_0x526781, _0x2110bc) {
            return _0x59e2f9.iHQvN(_0x526781, _0x2110bc);
          },
          'zkLsW': function (_0x4f56c1, _0x54728f) {
            return _0x59e2f9.weKaQ(_0x4f56c1, _0x54728f);
          },
          'UEPPD': "không rõ",
          'fVTbG': "Chưa xác minh theo giỏ hiện tại.",
          'gTJsQ': function (_0x31cd91) {
            return _0x59e2f9.jblgN(_0x31cd91);
          },
          'LwkDV': function (_0x3792a3) {
            return _0x59e2f9.AxkUW(_0x3792a3);
          },
          'JZnCv': function (_0x2d7842, _0x53522b) {
            return _0x59e2f9.nSUAD(_0x2d7842, _0x53522b);
          },
          'LnTPE': function (_0x440316, _0x5bddee) {
            return _0x59e2f9.dlqjn(_0x440316, _0x5bddee);
          },
          'YuLKQ': function (_0x222cf8, _0xe1e643) {
            return _0x59e2f9.Yxunw(_0x222cf8, _0xe1e643);
          },
          'oqTKg': function (_0x388662) {
            return _0x59e2f9.MDvNL(_0x388662);
          },
          'ohkuq': function (_0x308340) {
            return _0x59e2f9.ERvYK(_0x308340);
          },
          'mGYzZ': function (_0xe4d140) {
            return _0x59e2f9.kQzpw(_0xe4d140);
          },
          'jUMjg': function (_0x530339, _0xdf98da) {
            return _0x59e2f9.wfGkL(_0x530339, _0xdf98da);
          },
          'UDZVY': function (_0x5a0651, _0x197583) {
            return _0x59e2f9.dlqjn(_0x5a0651, _0x197583);
          },
          'oSjVg': "Thanh toán khi nhận hàng",
          'emjVD': "https://shopee.vn/api/v2/voucher_wallet/get_recommend_shop_vouchers",
          'hsOHF': "POST",
          'etkPe': "application/json",
          'HvanI': "en-US,en;q=0.9,vi;q=0.8",
          'JhTnV': "cors",
          'fNJlc': "include",
          'AHUwY': function (_0x5c0a7f, _0x98160c, _0x54c4a4) {
            return _0x59e2f9.agYGD(_0x5c0a7f, _0x98160c, _0x54c4a4);
          },
          'VbtaK': "shop_voucher/list",
          'IEQDU': function (_0x2bb281, _0xf2db58) {
            return _0x59e2f9.FaKWc(_0x2bb281, _0xf2db58);
          },
          'KlBKo': "Không tải được danh sách voucher shop.",
          'WjKFH': function (_0x305a9b, _0x46ee46) {
            return _0x59e2f9.KiPzq(_0x305a9b, _0x46ee46);
          },
          'UYrVL': "GET",
          'gHXQG': function (_0x532a68, _0x5b6d1b, _0x4dfece) {
            return _0x59e2f9.NqIZG(_0x532a68, _0x5b6d1b, _0x4dfece);
          },
          'CmmhD': "shop_voucher/list_all",
          'pvvwB': function (_0x52ccb9, _0x1395e6) {
            return _0x59e2f9.ecxMV(_0x52ccb9, _0x1395e6);
          },
          'VIcQm': function (_0x1b3d46, _0x1f3593) {
            return _0x59e2f9.VxMew(_0x1b3d46, _0x1f3593);
          },
          'aLUnp': function (_0x108994, _0x46048d) {
            return _0x59e2f9.eFPVL(_0x108994, _0x46048d);
          },
          'drhjW': function (_0x57afd0) {
            return _0x59e2f9.PlNkI(_0x57afd0);
          },
          'KKjpw': "Không tìm thấy voucher shop."
        };
        if (_0x446229) return _0x446229;
        const _0x162019 = async () => {
          const _0x4b1c76 = {
            'GlmNe': function (_0x2bc53b, _0x20bc97) {
              return _0x2d5854.tkYXn(_0x2bc53b, _0x20bc97);
            },
            'lsrxX': function (_0x4c72a7, _0x56c433) {
              return _0x2d5854.AeoGy(_0x4c72a7, _0x56c433);
            },
            'zZDAd': function (_0x874491, _0x2788d7) {
              return _0x2d5854.ARJVI(_0x874491, _0x2788d7);
            },
            'jYPgR': function (_0x44904f, _0x4a57da) {
              return _0x2d5854.TRMkr(_0x44904f, _0x4a57da);
            },
            'prQDS': function (_0x2467fc, _0x4bd532) {
              return _0x2d5854.ARJVI(_0x2467fc, _0x4bd532);
            },
            'duwll': function (_0x4d1a3e, _0x361889) {
              return _0x2d5854.WGSfW(_0x4d1a3e, _0x361889);
            },
            'IWqcB': function (_0x102575, _0x2676fc) {
              return _0x2d5854.WCvvN(_0x102575, _0x2676fc);
            },
            'wvpLq': function (_0xe41c29, _0x9714da) {
              return _0x2d5854.zkLsW(_0xe41c29, _0x9714da);
            },
            'NAXZc': "không rõ",
            'RzOYQ': "Chưa xác minh theo giỏ hiện tại."
          };
          if (!_0xd28b33) return [];
          const _0x4f77aa = _0x2d5854.zraVM(_0x114f3b);
          if (!_0x4f77aa.hasProductContext) return _0xbb2033 = {
            'loading': false,
            'error': '',
            'loadedForShopId': 0x0,
            'vouchers': [],
            'updatedAt': Date.now()
          }, _0x2d5854.gTJsQ(_0x6ceae1), [];
          const _0x1391e4 = Array.from(new Set([..._0x2d5854.LwkDV(_0x26b881).map(_0x5006b2 => Number(_0x5006b2?.["shopId"] || 0)), _0x2d5854.JZnCv(Number, _0x4f77aa.shopId)].filter(_0x2f8e81 => _0x2f8e81 > 0))).sort((_0x1d55ae, _0x57dcd6) => _0x1d55ae - _0x57dcd6),
            _0x244f29 = _0x1391e4.join(',');
          if (!_0x65e3d && !_0xbb2033.loading && _0x2d5854.YpXYe(_0x2d5854.WCvvN(Number, _0xbb2033.loadedForShopId), _0x2d5854.LnTPE(Number, _0x4f77aa.shopId)) && _0x2d5854.tkYXn(_0xbb2033.loadedShopIdsKey, _0x244f29) && Array.isArray(_0xbb2033.vouchers) && _0x2d5854.YuLKQ(_0xbb2033.vouchers.length, 0)) return _0x2d5854.oqTKg(_0x6ceae1), _0xbb2033.vouchers;
          _0xbb2033 = {
            ..._0xbb2033,
            'loading': true,
            'error': '',
            'loadedForShopId': _0x2d5854.WGSfW(Number, _0x4f77aa.shopId) || 0,
            'loadedShopIdsKey': _0x244f29
          };
          _0x2d5854.oqTKg(_0x6ceae1);
          try {
            const _0x58b3cc = _0x2d5854.ohkuq(_0x4d4c36),
              _0x17fb7e = () => {
                const _0x4acfd1 = _0x2d5854.zraVM(_0x1c3fbd),
                  _0x4d6ffd = new Map();
                _0x4acfd1.forEach(_0x45c78a => {
                  const _0x43aa23 = {
                      'nDOPY': function (_0x58209f, _0x1de8be) {
                        return _0x4b1c76.GlmNe(_0x58209f, _0x1de8be);
                      },
                      'iTzGG': function (_0x3e194a, _0x4ab7a3) {
                        return _0x4b1c76.lsrxX(_0x3e194a, _0x4ab7a3);
                      }
                    },
                    _0x341aab = _0x4b1c76.zZDAd(Number, _0x45c78a.shopid || 0);
                  if (!_0x341aab) return;
                  if (!_0x4d6ffd.has(_0x341aab)) _0x4d6ffd.set(_0x341aab, []);
                  const _0x2582b8 = (() => {
                      const _0x53cbd4 = window.currentProductData;
                      if (_0x53cbd4 && _0x43aa23.nDOPY(_0x43aa23.iTzGG(Number, _0x53cbd4.shopId), _0x341aab)) {
                        const _0x176895 = Array.isArray(_0x53cbd4.models) ? _0x53cbd4.models.find(_0x271afe => Number(_0x271afe.model_id) === Number(_0x45c78a.modelid)) : null;
                        if (_0x176895) return _0x176895;
                      }
                      return null;
                    })(),
                    _0x4ad3cd = _0x4b1c76.jYPgR(Number, _0x2582b8?.["price"] || 0),
                    _0x16e803 = _0x4b1c76.prQDS(Number, _0x2582b8?.["price_before_discount"] || _0x4ad3cd || 0);
                  _0x4d6ffd.get(_0x341aab).push({
                    'itemid': _0x4b1c76.lsrxX(Number, _0x45c78a.itemid),
                    'modelid': _0x4b1c76.duwll(Number, _0x45c78a.modelid),
                    'shopid': _0x341aab,
                    'quantity': _0x4b1c76.zZDAd(Number, _0x45c78a.quantity || 1),
                    'shippable': true,
                    'price': _0x4ad3cd,
                    'strikethrough_price': _0x16e803,
                    'name': _0x4b1c76.IWqcB(String, _0x45c78a.itemTitle || ''),
                    'checkout': true
                  });
                });
                const _0x5f1eb2 = Array.from(_0x4d6ffd.entries()).map(([_0x31573f, _0x542579]) => {
                  const _0x119651 = _0x542579.reduce((_0x272abe, _0x3b6429) => _0x272abe + _0x3b6429.price * _0x3b6429.quantity, 0);
                  return {
                    'shopid': _0x31573f,
                    'iteminfos': _0x542579,
                    'order_total_without_shipping': _0x119651,
                    'order_total': _0x119651,
                    'shipping_fee': 0x0,
                    'selected_meta_channel_id': 0x0,
                    'voucher_drawer_info': {
                      'selected_logistic_channelid': 0x1389,
                      'selected_masked_channelid': 0x0,
                      'selected_meta_channel_id': 0x0
                    }
                  };
                });
                return _0x5f1eb2.length ? JSON.stringify(_0x5f1eb2) : null;
              },
              _0x46fbe9 = _0x2d5854.mGYzZ(_0x17fb7e),
              _0x37cf34 = {
                ...(_0x46fbe9 ? {
                  'orders': _0x46fbe9
                } : {}),
                'shopid': _0x2d5854.jUMjg(Number, _0x4f77aa.shopId),
                'shop_ids': [_0x2d5854.UDZVY(Number, _0x4f77aa.shopId)],
                'legacy_spm_channel_id': 0xe678,
                'check_voucher_payment_criteria': true,
                'selected_payment_channel_data': {
                  'version': 0x1,
                  'payment_channelid': 0xe678,
                  'option_info': '',
                  'text_info': {},
                  'ros_opt_in': false,
                  'name': "Thanh toán khi nhận hàng",
                  'support_advance_booking': true,
                  'combined_payments_info': {
                    'base_payable': 0x0,
                    'total_payable': 0x0,
                    'price_breakdown': [],
                    'splits': []
                  }
                },
                'sorting_flag': 0x8,
                'priority_promotion_ids': [],
                'has_redeem_coins': false,
                'platform_vouchers': [],
                'caller_source': 0x1,
                'cursor': null
              },
              _0xc840de = await _0x2d5854.NVOQn(fetch, "https://shopee.vn/api/v2/voucher_wallet/get_recommend_shop_vouchers", {
                'method': "POST",
                'headers': {
                  'accept': "application/json",
                  'accept-language': "en-US,en;q=0.9,vi;q=0.8",
                  'content-type': "application/json",
                  'x-csrftoken': _0x58b3cc.csrf
                },
                'body': JSON.stringify(_0x37cf34),
                'mode': "cors",
                'credentials': "include"
              }),
              _0x1cc9ab = await _0xc840de.json();
            _0x2d5854.AHUwY(_0x2d1992, _0x1cc9ab, "shop_voucher/list");
            if (_0x2d5854.IEQDU(_0x1cc9ab?.["error"], 0)) throw new Error(_0x1cc9ab?.["error_msg"] || "Không tải được danh sách voucher shop.");
            const _0x42853d = _0x2d5854.ARJVI(Number, _0x4f77aa.shopId || 0),
              _0x21b1dd = _0x2d5854.WjKFH(String, _0x1cc9ab?.["data"]?.["shop_name"] || _0x1cc9ab?.["shop_name"] || '').trim();
            _0x2d5854.mRZUf(_0x449694, _0x42853d, _0x21b1dd);
            const _0x560bc4 = [];
            Array.isArray(_0x1cc9ab?.["data"]?.["shop_vouchers"]) && _0x1cc9ab.data.shop_vouchers.forEach(_0x1d7df6 => _0x560bc4.push({
              'voucher': {
                ..._0x1d7df6,
                '__source': "recommend"
              },
              'fallbackShopId': _0x42853d
            }));
            Array.isArray(_0x1cc9ab?.["shop_voucher_lists"]) && _0x1cc9ab.shop_voucher_lists.forEach(_0x43d0d1 => {
              const _0xb36fd2 = _0x2d5854.TRMkr(Number, _0x43d0d1?.["shop_id"] || 0),
                _0x37c475 = _0x2d5854.TRMkr(String, _0x43d0d1?.["shop_name"] || '').trim();
              _0x2d5854.YGkVD(_0x449694, _0xb36fd2, _0x37c475);
              Array.isArray(_0x43d0d1?.["shop_vouchers"]) && _0x43d0d1.shop_vouchers.forEach(_0x4c6d43 => _0x560bc4.push({
                'voucher': {
                  ..._0x4c6d43,
                  '__source': "recommend"
                },
                'fallbackShopId': _0xb36fd2 || _0x42853d
              }));
            });
            try {
              const _0x4fdfec = await _0x2d5854.YGkVD(fetch, "https://shopee.vn/api/v4/voucher_wallet/get_shop_vouchers_by_shopid?shopid=" + _0x42853d, {
                  'method': "GET",
                  'headers': {
                    'accept': "application/json",
                    'accept-language': "en-US,en;q=0.9,vi;q=0.8",
                    'x-csrftoken': _0x58b3cc.csrf
                  },
                  'mode': "cors",
                  'credentials': "include"
                }),
                _0x54d873 = await _0x4fdfec.json();
              _0x2d5854.gHXQG(_0x2d1992, _0x54d873, "shop_voucher/list_all");
              if (_0x2d5854.pvvwB(_0x2d5854.VIcQm(Number, _0x54d873?.["error"] || 0), 0)) {
                const _0x23b8eb = Array.isArray(_0x54d873?.["data"]?.["voucher_list"]) ? _0x54d873.data.voucher_list : [];
                _0x23b8eb.forEach(_0xc2b7d9 => _0x560bc4.push({
                  'voucher': {
                    ..._0xc2b7d9,
                    '__source': "shopid_all"
                  },
                  'fallbackShopId': _0x42853d
                }));
              }
            } catch (_0x933d1f) {
              _0x1d9aeb.warn("Không tải được danh sách voucher shop mở rộng: " + (_0x933d1f?.["message"] || _0x933d1f));
            }
            const _0x3954ba = new Map();
            _0x560bc4.forEach(({
              voucher: _0x4a472b,
              fallbackShopId: _0x5b99e7
            }) => {
              const _0x30aa46 = _0x2d5854.TRMkr(Number, _0x4a472b?.["shop_id"] || _0x4a472b?.["shopid"] || 0),
                _0x121702 = _0x2d5854.TRMkr(String, _0x4a472b?.["shop_name"] || _0x4a472b?.["icon_text"] || '').trim();
              _0x2d5854.mRZUf(_0x449694, _0x30aa46, _0x121702);
              const _0xe1615d = _0x2d5854.NVOQn(_0x3f30a9, _0x4a472b, _0x5b99e7);
              if (!_0xe1615d) return;
              const _0x10b413 = _0xe1615d.promotionid + '::' + _0xe1615d.voucherCode;
              if (!_0x3954ba.has(_0x10b413)) {
                _0x3954ba.set(_0x10b413, _0xe1615d);
                return;
              }
              const _0x5a5e81 = _0x3954ba.get(_0x10b413);
              if (_0x2d5854.YpXYe(_0x5a5e81?.["sourceType"], "recommend")) {
                _0x5a5e81.sourceType = "both";
                _0x5a5e81.sourceBadge = _0x2d5854.TRMkr(_0x486ef5, "both");
                _0x3954ba.set(_0x10b413, _0x5a5e81);
                return;
              }
              if (_0x2d5854.YpXYe(_0xe1615d.sourceType, "recommend")) {
                _0xe1615d.sourceType = "both";
                _0xe1615d.sourceBadge = _0x2d5854.TRMkr(_0x486ef5, "both");
                _0x3954ba.set(_0x10b413, _0xe1615d);
                return;
              }
              _0x5a5e81.sourceType = "both";
              _0x5a5e81.sourceBadge = _0x2d5854.AeoGy(_0x486ef5, "both");
              _0x3954ba.set(_0x10b413, _0x5a5e81);
            });
            const _0x59ce87 = Array.from(_0x3954ba.values()),
              _0x502d7f = Math.floor(_0x2d5854.aLUnp(Date.now(), 1000));
            return _0x59ce87.forEach(_0x4069af => {
              if (!_0x4069af?.["voucherCode"]) return;
              _0x4b1c76.wvpLq(_0x4b1c76.IWqcB(Number, _0x4069af.startTime || 0), _0x502d7f) ? (_0x4069af.validationInvalidCode = 6, _0x4069af.validationMessage = "Mã chưa tới giờ mở (" + (_0x4069af.startTimeShow || "không rõ") + ').', _0x4069af.validationSkipForCheckout = false) : _0x4069af.validationMessage = _0x4069af.validationMessage || "Chưa xác minh theo giỏ hiện tại.";
            }), _0x59ce87.sort((_0x362789, _0x50914f) => (_0x50914f.startTime || 0) - (_0x362789.startTime || 0)), _0xbb2033 = {
              'loading': false,
              'error': '',
              'loadedForShopId': _0x2d5854.LnTPE(Number, _0x4f77aa.shopId) || 0,
              'loadedShopIdsKey': _0x244f29,
              'vouchers': _0x59ce87,
              'updatedAt': Date.now()
            }, _0x2d5854.gTJsQ(_0xb63af1), _0x2d5854.drhjW(_0x6ceae1), _0x1d9aeb.info(_0x2d5854.YuLKQ(_0x59ce87.length, 0) ? "Đã lấy " + _0x59ce87.length + " mã voucher shop." : "Không tìm thấy voucher shop."), _0x59ce87;
          } catch (_0x33444d) {
            return _0xbb2033 = {
              ..._0xbb2033,
              'loading': false,
              'error': "Lỗi tải voucher shop: " + _0x33444d.message,
              'vouchers': [],
              'updatedAt': Date.now()
            }, _0x2d5854.mGYzZ(_0x6ceae1), _0x1d9aeb.error("Lỗi preload voucher shop: " + _0x33444d.message), [];
          }
        };
        return _0x446229 = _0x59e2f9.ERvYK(_0x162019)["finally"](() => {
          _0x446229 = null;
        }), _0x446229;
      };
      const _0x86e9cc = (_0xfc99e4, _0x2f392f = false) => {
        const _0x5981fc = document.getElementById("shop-voucher-validate-result");
        if (!_0x5981fc) return;
        if (!_0xfc99e4) {
          _0x5981fc.style.display = "none";
          _0x5981fc.classList.remove("error");
          _0x5981fc.textContent = '';
          return;
        }
        _0x5981fc.style.display = "block";
        _0x5981fc.classList.toggle("error", !!_0x2f392f);
        if (_0x2f392f) {
          _0x5981fc.textContent = _0x59e2f9.JzfMn(String, _0xfc99e4.message || "Xác minh thất bại.");
          return;
        }
        const _0x3988ea = _0xfc99e4.iconHash ? "<img src=\"" + _0x59e2f9.Dzybl(_0x47f96e, _0xfc99e4.iconHash) + "\" class=\"voucher-shop-icon\" alt=\"Voucher icon\" onerror=\"this.style.display='none';\">" : '',
          _0x13f97a = _0xfc99e4.iconText ? "<div class=\"voucher-shop-icon-text\">" + _0x59e2f9.SiBVb(_0x47f96e, _0xfc99e4.iconText) + "</div>" : '',
          _0x5e6118 = _0x59e2f9.YRYWR(String, _0xfc99e4.voucherLink || (_0xfc99e4.voucherCode && _0xfc99e4.promotionid && _0xfc99e4.signature ? "https://shopee.vn/search?voucherCode=" + _0xfc99e4.voucherCode + "&promotionId=" + _0xfc99e4.promotionid + "&signature=" + _0xfc99e4.signature : '')),
          _0x472219 = _0xfc99e4.endTimeShow ? _0xfc99e4.startTimeShow + " - " + _0xfc99e4.endTimeShow : _0xfc99e4.startTimeShow,
          _0xcef2a8 = _0x5e6118 ? "<a href=\"" + _0x59e2f9.ifJpC(_0x47f96e, _0x5e6118) + "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"voucher-shop-left-link\">" + _0x3988ea + _0x13f97a + "</a>" : '' + _0x3988ea + _0x13f97a,
          _0xbbaa1e = _0x5e6118 ? "<a href=\"" + _0x59e2f9.nSUAD(_0x47f96e, _0x5e6118) + "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"voucher-shop-code-link\"><div class=\"voucher-shop-code\">" + _0x59e2f9.HBVlW(_0x47f96e, _0x59e2f9.peYLf(_0x289f9d, _0xfc99e4.voucherCode)) + "</div></a>" : "<div class=\"voucher-shop-code\">" + _0x59e2f9.RSUuY(_0x47f96e, _0x59e2f9.kcjpz(_0x289f9d, _0xfc99e4.voucherCode)) + "</div>";
        _0x5981fc.innerHTML = "\n          <div class=\"voucher-shop-card\">\n            <div class=\"voucher-shop-left\">\n              " + _0xcef2a8 + "\n            </div>\n            <div class=\"voucher-shop-right\">\n              " + _0xbbaa1e + "\n              <div class=\"voucher-shop-terms\">" + _0x59e2f9.qZPrU(_0x47f96e, _0xfc99e4.terms || '') + "</div>\n              <div class=\"voucher-shop-meta-row\">📊 Đã dùng: <span class=\"voucher-shop-meta-value\">" + _0x59e2f9.nNpwd(_0x47f96e, _0xfc99e4.percentageUsed) + "%</span></div>\n              <div class=\"voucher-shop-meta-row\">🔎 <span class=\"voucher-shop-meta-value\">" + _0x59e2f9.jJrnq(_0x47f96e, _0xfc99e4.validationMessage || "Chưa xác minh theo sản phẩm hiện tại") + "</span></div>\n              <div class=\"voucher-shop-meta-row voucher-shop-meta-time\">⏰ HSD: " + _0x59e2f9.RSUuY(_0x47f96e, _0x472219) + "</div>\n            </div>\n          </div>\n        ";
      };
      window.normalizeShopVoucherInput = _0x509544 => {
        if (!_0x509544) return;
        const _0x4a5d3b = _0x59e2f9.YnvWH(_0x33c49a, _0x509544.value);
        if (_0x59e2f9.QzXOJ(_0x509544.value, _0x4a5d3b)) _0x509544.value = _0x4a5d3b;
        if (_0x4a5d3b) _0x59e2f9.pRrYY(_0x4fc00b, false, false);
        _0x59e2f9.ERvYK(_0x6ceae1);
      };
      window.handleShopVoucherInputBlur = _0x90fd83 => {
        window.normalizeShopVoucherInput(_0x90fd83);
      };
      window.pasteShopVoucherCodeFromClipboard = async () => {
        const _0x5515d3 = document.getElementById("setting-shop-voucher-code");
        if (!_0x5515d3) return;
        try {
          if (!navigator?.["clipboard"]?.["readText"]) throw new Error("Trình duyệt không hỗ trợ clipboard API.");
          const _0x5aed38 = await navigator.clipboard.readText(),
            _0x4ad5cd = _0x59e2f9.HvyTO(_0x33c49a, _0x5aed38);
          if (!_0x4ad5cd) throw new Error("Clipboard không chứa mã voucher hợp lệ.");
          _0x5515d3.value = _0x4ad5cd;
          _0x59e2f9.AtcwT(_0x6ceae1);
          _0x1d9aeb.info("Đã dán mã voucher: " + _0x4ad5cd);
        } catch (_0x5dc1d8) {
          _0x1d9aeb.error("Không thể dán mã voucher: " + _0x5dc1d8.message);
        }
      };
      window.handleShopVoucherPickerChange = async _0x44b897 => {
        const _0x29be2c = _0x54a97b.BzsKh(String, _0x44b897?.["value"] || '');
        if (_0x54a97b.QSrzd(_0x29be2c, _0x7b6556)) {
          _0x54a97b.MpCKI(_0x4fc00b, true, true);
          _0x54a97b.iqBiI(_0x6ceae1);
          return;
        }
        _0x54a97b.MpCKI(_0x4fc00b, false, false);
        const _0x2e473f = _0x54a97b.ccNQG(_0x33c49a, _0x29be2c || '');
        if (!_0x2e473f) {
          const _0x2549da = _0x54a97b.EUXaR(Number, _0x5acbd4.selectedVoucherShopId || 0);
          _0x54a97b.TRaeN(_0x2549da, 0) && ((!_0x5acbd4.shopVoucherByShop || _0x54a97b.Eirts(typeof _0x5acbd4.shopVoucherByShop, "object")) && (_0x5acbd4.shopVoucherByShop = {}), _0x5acbd4.shopVoucherByShop[_0x2549da] = null, _0x1d9aeb.info("Đã bỏ chọn voucher cho shop " + _0x2549da + '.'));
          const _0x117967 = document.getElementById("setting-shop-voucher-code");
          if (_0x117967) _0x117967.value = '';
          _0x54a97b.MpCKI(_0x86e9cc, null, false);
          _0x54a97b.sgunJ(_0x6ceae1);
          return;
        }
        const _0x5d32ff = document.getElementById("setting-shop-voucher-code");
        if (_0x5d32ff) _0x5d32ff.value = _0x2e473f;
        const _0xedef9d = _0x54a97b.DqPnx(_0x5ad819, _0x2e473f);
        _0xedef9d && _0x54a97b.MpCKI(_0x86e9cc, {
          ..._0xedef9d,
          'validationMessage': "Đang xác minh theo sản phẩm đang chọn...",
          'validationSkipForCheckout': false
        }, false);
        await window.validateShopVoucherForAutoOrder();
      };
      window.handleShopVoucherShopChange = async _0x2c00cb => {
        const _0xe91e36 = _0x59e2f9.XVhIY(Number, _0x2c00cb?.["value"] || 0);
        _0x5acbd4.selectedVoucherShopId = _0x59e2f9.YNdau(_0xe91e36, 0) ? _0xe91e36 : 0;
        const _0x35eee0 = _0x5acbd4.shopVoucherByShop && _0x5acbd4.shopVoucherByShop[_0x5acbd4.selectedVoucherShopId] || null,
          _0x599f2 = document.getElementById("setting-shop-voucher-code");
        _0x599f2 && (_0x599f2.value = _0x59e2f9.nKwYF(_0x33c49a, _0x35eee0?.["voucherCode"] || ''));
        _0x59e2f9.NypLX(_0x86e9cc, _0x35eee0, false);
        await window.preloadShopVoucherRecommendations?.(true);
        _0x59e2f9.igmjB(_0x6ceae1);
      };
      window.handleShopVoucherInputKeyDown = _0x32f8fa => {
        if (_0x59e2f9.YSKxs(_0x32f8fa.key, "Enter")) return;
        _0x32f8fa.preventDefault();
        _0x59e2f9.LnETj(typeof window.validateShopVoucherForAutoOrder, "function") && window.validateShopVoucherForAutoOrder(true);
      };
      let _0x4fba00 = false;
      window.toggleShopVoucherInput = () => {
        const _0x1fa84a = !!document.getElementById("setting-enable-shop-voucher")?.["checked"],
          _0x401565 = document.getElementById("shop-voucher-inputs");
        if (_0x401565) _0x401565.style.display = _0x1fa84a ? "block" : "none";
        if (!_0x1fa84a) {
          _0x5acbd4.shopVoucherAutoBestOutsideList = false;
          _0x54a97b.GHYLh(_0x86e9cc, null);
        } else {
          _0x54a97b.sgunJ(_0xb63af1);
          const _0x331ada = _0x5acbd4.shopVoucherByShop && _0x5acbd4.shopVoucherByShop[_0x54a97b.GEGqP(Number, _0x5acbd4.selectedVoucherShopId || 0)] || null,
            _0x3022ff = document.getElementById("setting-shop-voucher-code");
          if (_0x3022ff) _0x3022ff.value = _0x54a97b.oSDOy(_0x33c49a, _0x331ada?.["voucherCode"] || '');
          _0x54a97b.BYliJ(_0x6ceae1);
          window.preloadShopVoucherRecommendations?.();
          window.tryRestoreShopVoucherValidationFromSession?.();
        }
        if (!_0x4fba00) {}
      };
      window.togglePlatformVoucherInput = () => {
        const _0x56b8b3 = !!document.getElementById("setting-enable-platform-voucher")?.["checked"],
          _0x44c37a = document.getElementById("platform-voucher-inputs");
        if (_0x44c37a) _0x44c37a.style.display = _0x56b8b3 ? "block" : "none";
        if (!_0x56b8b3) {
          _0x59e2f9.xTsxw(_0x56ecab);
          _0x5acbd4.platformVoucherForceLinkOnly = false;
          _0x59e2f9.PlNkI(_0x3050f8);
          _0x59e2f9.nXoWF(_0x22a8bc, '', '');
          _0x59e2f9.CZvrQ(_0x3ff617);
        }
        _0x59e2f9.kQzpw(_0x2184a0);
        if (_0x56b8b3) {
          const _0x1a9367 = document.getElementById("setting-platform-voucher-source");
          if (_0x1a9367) _0x1a9367.value = _0x5acbd4.platformVoucherSource;
          window.handlePlatformVoucherSourceChange?.(_0x1a9367 || {
            'value': _0x5acbd4.platformVoucherSource
          });
        }
      };
      const _0x3050f8 = () => {
          _0x5acbd4.platformVoucherResolved = null;
          _0x5acbd4.platformVoucherSavedInWallet = false;
          _0x5acbd4.platformVoucherWalletChecked = false;
          _0x5acbd4.platformVoucherMetadataChecked = false;
          _0x5acbd4.platformVoucherCode = '';
          _0x5acbd4.platformVoucherPromotionId = '';
        },
        _0x1e93a0 = () => {},
        _0x59d1a1 = _0xfdd894 => {
          return _0x2987c4;
        },
        _0x22a8bc = (_0x143d6b, _0x271f26, _0x1c4385 = {}) => {
          const _0x509914 = document.getElementById("platform-voucher-status");
          if (!_0x509914) return;
          _0x509914.className = ("platform-voucher-status " + (_0x143d6b || '')).trim();
          _0x509914.style.display = _0x271f26 ? "block" : "none";
          _0x509914.innerHTML = _0x54a97b.Hshku(_0x47f96e, _0x54a97b.cNFCd(String, _0x271f26 || ''));
        },
        _0x2184a0 = () => {
          const _0x58ead2 = document.querySelector(".btn-save-settings");
          if (!_0x58ead2) return;
          const _0x25cd1d = !!document.getElementById("setting-enable-platform-voucher")?.["checked"];
          if (!_0x25cd1d) {
            _0x58ead2.disabled = false;
            _0x58ead2.title = '';
            return;
          }
          if (_0x54a97b.WKnjM(_0x5acbd4.platformVoucherSource, "banner") || _0x54a97b.nTyRh(document.getElementById("setting-platform-voucher-source")?.["value"], "banner")) {
            _0x58ead2.disabled = !_0x5acbd4.platformVoucherBannerData;
            _0x58ead2.title = _0x5acbd4.platformVoucherBannerData ? '' : "Vui lòng chờ tải thông tin banner.";
            return;
          }
          const _0x49229e = _0x54a97b.bLqbP(String, document.getElementById("setting-platform-voucher-input")?.["value"] || '').trim(),
            _0x265fa1 = _0x54a97b.OqCbt(_0x45e09d, _0x49229e),
            _0x3a9869 = !!_0x49229e,
            _0x5dd3d5 = _0x54a97b.QSrzd(_0x2987c4.status, "FAILED") || !!_0x5acbd4.platformVoucherForceLinkOnly,
            _0x3085a0 = _0x3a9869 && (!_0x5dd3d5 || _0x265fa1.isLink);
          _0x58ead2.disabled = !_0x3085a0;
          _0x58ead2.title = !_0x3a9869 ? "Bật Voucher Shopee thì bắt buộc nhập link hoặc tên voucher." : _0x5dd3d5 && !_0x265fa1.isLink ? "Kho mã tải thất bại nên chỉ hỗ trợ link voucher." : '';
        };
      let _0x2afda3 = null;
      const _0x525d2f = {
          'timer': null,
          'dropdown': null,
          'results': [],
          'activeIndex': -1,
          'selectedRecord': null,
          'cleanup': []
        },
        _0xd449a7 = _0x23798b => String(_0x23798b?.["voucherName"] || _0x23798b?.["voucher_name"] || _0x23798b?.["voucherTitle"] || _0x23798b?.["voucher_title"] || _0x23798b?.["title"] || _0x23798b?.["name"] || '').trim(),
        _0x53333 = _0x404a71 => {
          const _0x5de856 = _0x54a97b.orsAq(String, _0x404a71 || '').trim();
          return /^https?:\/\//i.test(_0x5de856) || _0x54a97b.AccgI(_0x45e09d, _0x5de856).isLink;
        },
        _0x40d192 = _0x4050ac => {
          const _0x1c761b = {
            'CsroP': function (_0x590b29, _0x4e8f45) {
              return _0x59e2f9.xBwoQ(_0x590b29, _0x4e8f45);
            }
          };
          if (_0x59e2f9.fIPze(_0x2987c4.status, "READY")) return [];
          const _0x5e9d48 = _0x59e2f9.Peear(_0x39429a, _0x4050ac);
          if (!_0x5e9d48 || _0x59e2f9.FVyJx(_0x53333, _0x4050ac)) return [];
          const _0x5a28bf = new Set();
          return _0x2987c4.records.map((_0x57124e, _0x4beadc) => ({
            'record': _0x57124e,
            'walletIndex': _0x4beadc,
            'code': _0x39429a(_0x57124e?.["voucherCode"] || _0x57124e?.["voucher_code"]),
            'promotionid': _0x47fe84(_0x57124e?.["promotionid"] || _0x57124e?.["promotion_id"])
          })).filter(_0x57f41a => _0x57f41a.code && _0x57f41a.code.includes(_0x5e9d48)).sort((_0x948935, _0x1387e1) => {
            const _0x165935 = _0x948935.code.startsWith(_0x5e9d48) ? 0 : 1,
              _0x458a2c = _0x1387e1.code.startsWith(_0x5e9d48) ? 0 : 1;
            return _0x1c761b.CsroP(_0x165935, _0x458a2c) || _0x948935.code.localeCompare(_0x1387e1.code) || _0x1c761b.CsroP(_0x948935.walletIndex, _0x1387e1.walletIndex);
          }).filter(_0x35bcf0 => {
            const _0x7c3d39 = _0x35bcf0.code + '::' + _0x35bcf0.promotionid;
            if (_0x5a28bf.has(_0x7c3d39)) return false;
            return _0x5a28bf.add(_0x7c3d39), true;
          }).slice(0, 8).map(_0x457e25 => _0x457e25.record);
        },
        _0x56ecab = () => {
          _0x54a97b.zvdDC(clearTimeout, _0x525d2f.timer);
          _0x525d2f.timer = null;
          _0x525d2f.results = [];
          _0x525d2f.activeIndex = -1;
          _0x525d2f.dropdown && (_0x525d2f.dropdown.remove(), _0x525d2f.dropdown = null);
        },
        _0x78bac7 = () => {
          const _0x345a0e = document.getElementById("setting-platform-voucher-input"),
            _0x967026 = _0x525d2f.dropdown;
          if (!_0x345a0e || !_0x967026 || !document.body.contains(_0x345a0e)) {
            _0x54a97b.mMKqn(_0x56ecab);
            return;
          }
          const _0x10a90e = _0x345a0e.getBoundingClientRect(),
            _0x4dcfa4 = window.innerHeight || document.documentElement.clientHeight || 0,
            _0x2d6901 = 4,
            _0x5efdd4 = Math.max(0, _0x54a97b.EZKgv(_0x54a97b.MeSvG(_0x54a97b.MaNti(_0x4dcfa4, _0x10a90e.bottom), _0x2d6901), 8)),
            _0x572333 = Math.max(0, _0x54a97b.ynNAM(_0x54a97b.MaNti(_0x10a90e.top, _0x2d6901), 8)),
            _0x410eb5 = _0x54a97b.oDvTE(_0x5efdd4, 120) && _0x54a97b.TRaeN(_0x572333, _0x5efdd4),
            _0x5df8c5 = _0x410eb5 ? _0x572333 : _0x5efdd4,
            _0x5deffe = Math.min(288, Math.max(80, _0x5df8c5));
          _0x967026.style.left = Math.max(8, _0x10a90e.left) + 'px';
          _0x967026.style.width = Math.max(220, _0x10a90e.width) + 'px';
          _0x967026.style.maxWidth = Math.max(220, _0x54a97b.ynNAM(_0x54a97b.HNwZR(window.innerWidth, Math.max(8, _0x10a90e.left)), 8)) + 'px';
          _0x967026.style.maxHeight = _0x5deffe + 'px';
          _0x410eb5 ? (_0x967026.style.top = "auto", _0x967026.style.bottom = _0x54a97b.ymkQW(_0x54a97b.zVyFl(_0x4dcfa4, _0x10a90e.top), _0x2d6901) + 'px') : (_0x967026.style.top = _0x54a97b.csQfN(_0x10a90e.bottom, _0x2d6901) + 'px', _0x967026.style.bottom = "auto");
        },
        _0x249ce4 = _0x594d45 => {
          const _0x153cfc = _0x525d2f.dropdown,
            _0x34711f = _0x525d2f.results;
          if (!_0x153cfc || !_0x34711f.length) return;
          const _0x207d12 = _0x59e2f9.izmNJ(_0x59e2f9.AABwv(_0x59e2f9.izmNJ(_0x594d45, _0x34711f.length), _0x34711f.length), _0x34711f.length);
          _0x525d2f.activeIndex = _0x207d12;
          _0x153cfc.querySelectorAll(".platform-voucher-suggestion").forEach((_0x4be234, _0x22f96b) => {
            const _0x294474 = _0x54a97b.WKnjM(_0x22f96b, _0x207d12);
            _0x4be234.classList.toggle("active", _0x294474);
            if (_0x294474) _0x4be234.scrollIntoView({
              'block': "nearest"
            });
          });
        },
        _0x196857 = _0x2d33e2 => {
          const _0x426516 = document.getElementById("setting-platform-voucher-input");
          if (!_0x426516 || !_0x2d33e2) return;
          const _0x3a8796 = _0x54a97b.FwTCW(_0x39429a, _0x2d33e2.voucherCode || _0x2d33e2.voucher_code),
            _0x1865c2 = _0x54a97b.aaBgG(_0x47fe84, _0x2d33e2.promotionid || _0x2d33e2.promotion_id);
          if (!_0x3a8796 || !_0x1865c2) return;
          _0x426516.value = _0x3a8796;
          _0x5acbd4.platformVoucherInput = _0x3a8796;
          _0x525d2f.selectedRecord = _0x2d33e2;
          _0x426516.focus({
            'preventScroll': true
          });
          _0x54a97b.nSmfV(_0x56ecab);
          window.handlePlatformVoucherInputChange(_0x426516, {
            'selectedRecord': _0x2d33e2
          });
        },
        _0x1b2653 = _0x5daada => {
          const _0x260ccc = {
              'ugtib': function (_0x5e3c1f, _0x7ad670) {
                return _0x54a97b.QSrzd(_0x5e3c1f, _0x7ad670);
              },
              'LOAzB': "mouse",
              'gfVAE': function (_0x1dbfe8, _0x41c1d7) {
                return _0x54a97b.DjmQT(_0x1dbfe8, _0x41c1d7);
              },
              'jEgUX': function (_0x388261, _0x3011da) {
                return _0x54a97b.MPNsf(_0x388261, _0x3011da);
              },
              'Yhtjt': "button",
              'lqjkg': "platform-voucher-suggestion",
              'UsxLr': "role",
              'VtFCS': "option",
              'QrHTW': "span",
              'uxyQG': "platform-voucher-suggestion-code",
              'CmDCe': "platform-voucher-suggestion-name",
              'xhEmj': function (_0x226958, _0xa966b) {
                return _0x54a97b.TRaeN(_0x226958, _0xa966b);
              },
              'LoqNX': "platform-voucher-suggestion-id",
              'xtijg': "pointerdown",
              'snDLh': "click",
              'yxsPg': "mousemove"
            },
            _0x4df87a = _0x54a97b.bLqbP(String, _0x5daada?.["value"] || '').trim();
          if (!_0x4df87a || _0x54a97b.PXZTT(_0x2987c4.status, "READY") || _0x54a97b.ccNQG(_0x53333, _0x4df87a)) {
            _0x54a97b.hNqWH(_0x56ecab);
            return;
          }
          const _0x620f3b = _0x54a97b.CPuFP(_0x40d192, _0x4df87a);
          if (!_0x620f3b.length) {
            _0x54a97b.WEBNb(_0x56ecab);
            return;
          }
          _0x54a97b.BYliJ(_0x56ecab);
          const _0x513117 = _0x620f3b.reduce((_0x530ae6, _0x1a4afd) => {
              const _0x5554e6 = _0x54a97b.eNqKh(_0x39429a, _0x1a4afd?.["voucherCode"] || _0x1a4afd?.["voucher_code"]);
              return _0x530ae6.set(_0x5554e6, _0x54a97b.csQfN(_0x530ae6.get(_0x5554e6) || 0, 1)), _0x530ae6;
            }, new Map()),
            _0x33595f = document.createElement("div");
          _0x33595f.id = "platform-voucher-autocomplete";
          _0x33595f.className = "platform-voucher-autocomplete";
          _0x33595f.setAttribute("role", "listbox");
          _0x620f3b.forEach((_0x56d42f, _0x1b6063) => {
            const _0x30d3d0 = _0x260ccc.gfVAE(_0x39429a, _0x56d42f?.["voucherCode"] || _0x56d42f?.["voucher_code"]),
              _0x10018a = _0x260ccc.gfVAE(_0x47fe84, _0x56d42f?.["promotionid"] || _0x56d42f?.["promotion_id"]),
              _0x5bf773 = _0x260ccc.jEgUX(_0xd449a7, _0x56d42f),
              _0x1cbd76 = document.createElement("button");
            _0x1cbd76.type = "button";
            _0x1cbd76.className = "platform-voucher-suggestion";
            _0x1cbd76.setAttribute("role", "option");
            _0x1cbd76.dataset.index = _0x260ccc.gfVAE(String, _0x1b6063);
            const _0x3e34cd = document.createElement("span");
            _0x3e34cd.className = "platform-voucher-suggestion-code";
            _0x3e34cd.textContent = _0x30d3d0;
            _0x1cbd76.appendChild(_0x3e34cd);
            if (_0x5bf773) {
              const _0x2dca00 = document.createElement("span");
              _0x2dca00.className = "platform-voucher-suggestion-name";
              _0x2dca00.textContent = _0x5bf773;
              _0x1cbd76.appendChild(_0x2dca00);
            }
            if (_0x260ccc.xhEmj(_0x513117.get(_0x30d3d0) || 0, 1)) {
              const _0x220063 = document.createElement("span");
              _0x220063.className = "platform-voucher-suggestion-id";
              _0x220063.textContent = "promotionId: " + _0x10018a;
              _0x1cbd76.appendChild(_0x220063);
            }
            let _0x1fddc2 = false;
            _0x1cbd76.addEventListener("pointerdown", _0x423260 => {
              _0x260ccc.ugtib(_0x423260.pointerType, "mouse") && (_0x423260.preventDefault(), _0x1fddc2 = true, _0x260ccc.gfVAE(_0x196857, _0x56d42f));
            });
            _0x1cbd76.addEventListener("click", _0x4a37f9 => {
              _0x4a37f9.preventDefault();
              if (_0x1fddc2) return;
              _0x260ccc.gfVAE(_0x196857, _0x56d42f);
            });
            _0x1cbd76.addEventListener("mousemove", () => _0x249ce4(_0x1b6063));
            _0x33595f.appendChild(_0x1cbd76);
          });
          document.body.appendChild(_0x33595f);
          _0x525d2f.dropdown = _0x33595f;
          _0x525d2f.results = _0x620f3b;
          _0x54a97b.ZCsyA(_0x78bac7);
          _0x54a97b.DqPnx(_0x249ce4, 0);
        },
        _0x2e29fb = _0x308fc8 => {
          _0x59e2f9.SIOyu(clearTimeout, _0x525d2f.timer);
          if (!_0x308fc8?.["value"] || _0x59e2f9.fIPze(_0x2987c4.status, "READY") || _0x59e2f9.ISuKL(_0x53333, _0x308fc8.value)) {
            _0x59e2f9.AxkUW(_0x56ecab);
            return;
          }
          _0x525d2f.timer = _0x59e2f9.acwcs(setTimeout, () => _0x1b2653(_0x308fc8), 120);
        },
        _0x4071cb = () => {
          const _0x3b2f95 = {
              'mznoW': function (_0x18c53c, _0x42a2f2) {
                return _0x54a97b.lynQS(_0x18c53c, _0x42a2f2);
              },
              'rkrAK': function (_0x5557e2) {
                return _0x54a97b.BYliJ(_0x5557e2);
              }
            },
            _0x129beb = document.getElementById("setting-platform-voucher-input");
          if (!_0x129beb || _0x54a97b.kujrQ(_0x129beb.dataset.autocompleteReady, '1')) return;
          _0x129beb.dataset.autocompleteReady = '1';
          const _0x1b6314 = () => _0x2e29fb(_0x129beb),
            _0x2ba954 = _0x5bfba5 => {
              const _0x1fc2e5 = _0x525d2f.results;
              if (_0x54a97b.QSrzd(_0x5bfba5.key, "Escape")) {
                _0x54a97b.BYliJ(_0x56ecab);
                return;
              }
              if (!_0x525d2f.dropdown || !_0x1fc2e5.length) return;
              if (_0x54a97b.kujrQ(_0x5bfba5.key, "ArrowDown") || _0x54a97b.kujrQ(_0x5bfba5.key, "ArrowUp")) {
                _0x5bfba5.preventDefault();
                const _0x5c1991 = _0x54a97b.nTyRh(_0x5bfba5.key, "ArrowDown") ? 1 : -1,
                  _0x203a28 = _0x54a97b.oDvTE(_0x525d2f.activeIndex, 0) ? _0x54a97b.zSJfF(_0x5c1991, 0) ? -1 : 0 : _0x525d2f.activeIndex;
                _0x54a97b.AccgI(_0x249ce4, _0x54a97b.pmprO(_0x203a28, _0x5c1991));
              } else {
                if (_0x54a97b.UypRi(_0x5bfba5.key, "Enter")) {
                  _0x5bfba5.preventDefault();
                  const _0x42906e = _0x54a97b.YfJLN(_0x525d2f.activeIndex, 0) ? _0x525d2f.activeIndex : 0;
                  _0x54a97b.QHNjT(_0x196857, _0x1fc2e5[_0x42906e]);
                }
              }
            },
            _0x2807fe = _0x33c801 => {
              const _0x2ede2e = _0x525d2f.dropdown;
              if (_0x3b2f95.mznoW(_0x33c801.target, _0x129beb) && !_0x2ede2e?.["contains"](_0x33c801.target)) _0x3b2f95.rkrAK(_0x56ecab);
            },
            _0x54e216 = () => _0x78bac7();
          _0x129beb.addEventListener("focus", _0x1b6314);
          _0x129beb.addEventListener("click", _0x1b6314);
          _0x129beb.addEventListener("keydown", _0x2ba954);
          document.addEventListener("pointerdown", _0x2807fe);
          window.addEventListener("resize", _0x54e216);
          document.addEventListener("scroll", _0x54e216, true);
          _0x525d2f.cleanup.push(() => _0x129beb.removeEventListener("focus", _0x1b6314), () => _0x129beb.removeEventListener("click", _0x1b6314), () => _0x129beb.removeEventListener("keydown", _0x2ba954), () => document.removeEventListener("pointerdown", _0x2807fe), () => window.removeEventListener("resize", _0x54e216), () => document.removeEventListener("scroll", _0x54e216, true));
        },
        _0x2cff8b = () => {
          _0x59e2f9.sVSWy(_0x56ecab);
          _0x525d2f.selectedRecord = null;
          _0x525d2f.cleanup.splice(0).forEach(_0x48a56f => _0x48a56f());
        };
      window.pastePlatformVoucherFromClipboard = async () => {
        const _0x147a11 = document.getElementById("setting-platform-voucher-input");
        if (!_0x147a11 || _0x147a11.disabled) return;
        try {
          _0x147a11.value = _0x54a97b.DjmQT(String, await navigator.clipboard.readText()).trim();
          window.handlePlatformVoucherInputChange(_0x147a11);
          _0x147a11.focus({
            'preventScroll': true
          });
        } catch (_0x4cd790) {
          _0x1d9aeb.error("Không đọc được clipboard: " + (_0x4cd790?.["message"] || "Trình duyệt từ chối quyền truy cập."));
        }
      };
      window.handlePlatformVoucherInputChange = (_0x459416, _0x24ebe1 = {}) => {
        _0x5acbd4.platformVoucherInput = _0x59e2f9.GkrAt(String, _0x459416?.["value"] || '').trim();
        _0x525d2f.selectedRecord = _0x24ebe1.selectedRecord || null;
        const _0x5e7942 = _0x59e2f9.yMcgR(_0x45e09d, _0x5acbd4.platformVoucherInput);
        _0x59e2f9.BPOXq(_0x3050f8);
        if (_0x59e2f9.qrpBv(_0x2987c4.status, "LOADING")) _0x59e2f9.ewrfH(_0x22a8bc, "loading", "Đang tải dữ liệu...");else _0x59e2f9.eYrac(_0x2987c4.status, "FAILED") && !_0x5e7942.isLink ? (_0x5acbd4.platformVoucherForceLinkOnly = true, _0x59e2f9.KqfEi(_0x22a8bc, "error", "Kho mã tải thất bại. Chỉ hỗ trợ nhập link voucher. Đóng và mở lại mục Đặt đơn để tải lại dữ liệu.")) : (_0x5acbd4.platformVoucherForceLinkOnly = _0x59e2f9.IFimu(_0x2987c4.status, "FAILED"), window.scanPlatformVoucherWallet?.(false, {
          'log': false
        }));
        _0x59e2f9.AtcwT(_0x2184a0);
        if (!_0x24ebe1.selectedRecord) _0x59e2f9.CBEKe(_0x2e29fb, _0x459416);
      };
      const _0x2f8297 = (_0x227105 = false) => {
          _0x54a97b.BzsKh(clearTimeout, _0x2afda3);
          window.scanPlatformVoucherWallet?.(false, {
            'log': false
          });
        },
        _0x464459 = async (_0x3f2f4e, _0x9ceee0 = '', _0x2a88a4) => {
          const _0x4585ec = _0x59e2f9.AtcwT(_0x4d4c36),
            _0x136e7e = await _0x59e2f9.XGVvD(fetch, "https://shopee.vn/api/v2/voucher_wallet/get_user_voucher_list", {
              'method': "POST",
              'headers': {
                'accept': "application/json",
                'content-type': "application/json",
                'x-csrftoken': _0x4585ec.csrf,
                'x-requested-with': "XMLHttpRequest"
              },
              'body': JSON.stringify({
                'exclude_user_voucher_list_type': [9],
                'voucher_status': _0x3f2f4e,
                'user_voucher_list_type': 0x1,
                'voucher_sort_flag': 0x1,
                'cursor': _0x9ceee0 || '',
                'limit': 0x64,
                'addition': ["voucher_microsite_link"],
                'version': 0x6,
                'priority_voucher_list': null
              }),
              'mode': "cors",
              'credentials': "include",
              'signal': _0x2a88a4
            }),
            _0x61f85d = await _0x136e7e.json();
          _0x59e2f9.TbSVC(_0x2d1992, _0x61f85d, "platform_voucher_wallet:" + _0x3f2f4e);
          if (_0x61f85d?.["error"]) throw new Error(_0x61f85d?.["error_msg"] || "Không quét được ví voucher (" + _0x3f2f4e + ').');
          return {
            'vouchers': Array.isArray(_0x61f85d?.["data"]?.["user_voucher_list"]) ? _0x61f85d.data.user_voucher_list : [],
            'next': _0x61f85d?.["data"]?.["next"] || ''
          };
        },
        _0x37e0c0 = (_0x1e3636, _0xb34b48) => {
          const _0x438d2a = _0x59e2f9.nNpwd(_0x39429a, _0x1e3636?.["voucher_code"]),
            _0x2233e6 = _0x59e2f9.igBaR(_0x47fe84, _0x1e3636?.["promotionid"] || _0x1e3636?.["promotion_id"] || '');
          if (!_0x438d2a || !_0x2233e6) return null;
          const _0x3f1a26 = Array.isArray(_0x1e3636?.["customised_labels"]) ? _0x1e3636.customised_labels.map(_0x3d7a43 => String(_0x3d7a43?.["content"] || '').trim()).filter(Boolean).join('\x20').trim() : '',
            _0x4532d3 = _0x59e2f9.zthHl(String, _0x1e3636?.["voucher_name"] || _0x1e3636?.["voucher_title"] || _0x1e3636?.["title"] || _0x1e3636?.["name"] || _0x1e3636?.["display_name"] || _0x1e3636?.["voucher_basic_info"]?.["voucher_name"] || _0x1e3636?.["voucher_basic_info"]?.["voucher_title"] || _0x1e3636?.["voucher_basic_info"]?.["title"] || _0x3f1a26 || '').trim();
          return {
            'voucherCode': _0x438d2a,
            'voucher_code': _0x438d2a,
            'promotionid': _0x2233e6,
            'promotion_id': _0x2233e6,
            'signature': _0x59e2f9.BfXPd(String, _0x1e3636?.["signature"] || ''),
            'voucherName': _0x4532d3,
            'voucher_name': _0x4532d3,
            'source': _0xb34b48
          };
        },
        _0x5411da = (_0x2a95cc, _0x7d5652 = {}) => {
          if (!_0x2a95cc) return false;
          const _0x358bed = _0x59e2f9.ApDKA(_0x7d5652.savedInWallet, false),
            _0x4de25 = _0x2a95cc.voucherCode || _0x2a95cc.voucher_code || '',
            _0x2d5b8c = _0x2a95cc.promotionid || _0x2a95cc.promotion_id || '';
          return _0x5acbd4.platformVoucherResolved = _0x2a95cc, _0x5acbd4.platformVoucherCode = _0x4de25, _0x5acbd4.platformVoucherPromotionId = _0x59e2f9.LLXhw(String, _0x2d5b8c || ''), _0x5acbd4.platformVoucherSavedInWallet = _0x358bed, _0x5acbd4.platformVoucherForceLinkOnly = false, _0x59e2f9.jtTYh(_0x22a8bc, _0x358bed ? "success" : "warning", _0x358bed ? "✅ Phát hiện user đã lưu mã với promotionId là " + _0x2d5b8c : "❌ User chưa lưu mã, hệ thống sẽ tiến hành lưu trước khi đặt."), _0x7d5652.log && _0x1d9aeb.info(_0x7d5652.message || (_0x358bed ? "Voucher Shopee: User đã lưu mã " + _0x4de25 + ". Hệ thống sẽ bỏ qua việc lưu trước khi đặt đơn." : "Voucher Shopee: Tìm thấy voucher " + _0x4de25 + " / " + _0x2d5b8c)), _0x59e2f9.ftUmi(_0x2184a0), true;
        };
      window.applyResolvedPlatformVoucherForAutoOrder = _0x5411da;
      const _0x2c7d10 = _0x13d2ae => {
          if (!_0x13d2ae) return null;
          const _0x245b08 = _0x59e2f9.JZGaV(_0x39429a, _0x13d2ae.voucherCode || _0x13d2ae.voucher_code),
            _0x228c31 = _0x59e2f9.XxGRG(_0x47fe84, _0x13d2ae.promotionid || _0x13d2ae.promotion_id || '');
          if (!_0x245b08 || !_0x228c31) return null;
          const _0xfa0836 = {
              ..._0x13d2ae,
              'voucherCode': _0x245b08,
              'promotionid': _0x228c31,
              'signature': _0x59e2f9.DXpSR(String, _0x13d2ae.signature || ''),
              'source': _0x13d2ae.source || "wallet_cache"
            },
            _0x4940b8 = _0x2987c4.byPromotionId.get(_0x228c31);
          if (!_0x4940b8) _0x2987c4.records.push(_0xfa0836);else {
            const _0x4e9275 = _0x2987c4.records.findIndex(_0x17cee8 => _0x47fe84(_0x17cee8?.["promotionid"]) === _0x228c31);
            if (_0x59e2f9.VVzXu(_0x4e9275, 0)) _0x2987c4.records[_0x4e9275] = _0xfa0836;
          }
          _0x2987c4.byPromotionId.set(_0x228c31, _0xfa0836);
          const _0x402c2c = Array.isArray(_0x2987c4.byCode.get(_0x245b08)) ? _0x2987c4.byCode.get(_0x245b08).filter(_0x216a98 => _0x47fe84(_0x216a98?.["promotionid"]) !== _0x228c31) : [];
          return _0x402c2c.push(_0xfa0836), _0x2987c4.byCode.set(_0x245b08, _0x402c2c), _0xfa0836;
        },
        _0x2bdc01 = _0x1aec12 => {
          if (!_0x1aec12) return {
            'record': null,
            'ambiguous': false
          };
          const _0x1921d1 = _0x54a97b.orsAq(_0x47fe84, _0x1aec12.promotionid),
            _0x23b559 = _0x54a97b.hrefD(_0x39429a, _0x1aec12.voucherCode);
          if (_0x1921d1) {
            const _0x59acd0 = _0x2987c4.byPromotionId.get(_0x1921d1) || null;
            if (!_0x59acd0) return {
              'record': null,
              'ambiguous': false
            };
            if (_0x23b559 && _0x54a97b.TfUXS(_0x54a97b.DqPnx(_0x39429a, _0x59acd0.voucherCode), _0x23b559)) return {
              'record': null,
              'ambiguous': false,
              'identifierMismatch': true
            };
            return {
              'record': _0x59acd0,
              'ambiguous': false
            };
          }
          if (!_0x23b559) return {
            'record': null,
            'ambiguous': false
          };
          const _0x534d37 = _0x525d2f.selectedRecord,
            _0x416de6 = _0x54a97b.JVuvz(_0x47fe84, _0x534d37?.["promotionid"] || _0x534d37?.["promotion_id"]),
            _0x502387 = _0x54a97b.ZLJav(_0x39429a, _0x534d37?.["voucherCode"] || _0x534d37?.["voucher_code"]);
          if (_0x416de6 && _0x54a97b.WKnjM(_0x502387, _0x23b559)) {
            const _0x1a0f4f = _0x2987c4.byPromotionId.get(_0x416de6) || null;
            if (_0x1a0f4f && _0x54a97b.pbqfD(_0x54a97b.bHyvj(_0x39429a, _0x1a0f4f.voucherCode || _0x1a0f4f.voucher_code), _0x23b559)) return {
              'record': _0x1a0f4f,
              'ambiguous': false,
              'selectedPromotionId': _0x416de6
            };
          }
          const _0x2dbc80 = Array.isArray(_0x2987c4.byCode.get(_0x23b559)) ? _0x2987c4.byCode.get(_0x23b559) : [],
            _0xffea6 = _0x2dbc80.filter((_0x483515, _0x259cbb, _0x491247) => _0x259cbb === _0x491247.findIndex(_0x631214 => _0x47fe84(_0x631214?.["promotionid"]) === _0x47fe84(_0x483515?.["promotionid"])));
          if (_0x54a97b.jTKxu(_0xffea6.length, 1)) return {
            'record': _0xffea6[0],
            'ambiguous': false
          };
          return {
            'record': null,
            'ambiguous': _0x54a97b.CnWBi(_0xffea6.length, 1)
          };
        },
        _0x458f3f = () => {
          if (!_0x59e2f9.eeVkR(_0x563a6d)) return;
          const _0x57a74e = document.getElementById("setting-platform-voucher-input");
          if (!_0x57a74e) return;
          const _0x133625 = _0x59e2f9.pibVW(_0x5acbd4.platformVoucherSource, "banner");
          _0x57a74e.disabled = !_0x133625 && _0x59e2f9.oDble(_0x2987c4.status, "LOADING");
          const _0x4f7a69 = document.getElementById("setting-platform-voucher-paste-btn");
          if (_0x4f7a69) _0x4f7a69.disabled = _0x57a74e.disabled;
          _0x57a74e.placeholder = _0x59e2f9.jUrny(_0x2987c4.status, "LOADING") ? "Đang tải dữ liệu..." : "Nhập link hoặc tên voucher Shopee...";
          if (_0x59e2f9.qhVuW(_0x2987c4.status, "LOADING")) {
            _0x59e2f9.UxPUH(_0x56ecab);
            _0x59e2f9.pRrYY(_0x22a8bc, "loading", "Đang tải dữ liệu...");
          } else {
            if (_0x59e2f9.eWMhK(_0x2987c4.status, "FAILED")) {
              _0x59e2f9.UxPUH(_0x56ecab);
              _0x5acbd4.platformVoucherForceLinkOnly = true;
              _0x59e2f9.Xbgoe(_0x22a8bc, "error", "Kho mã tải thất bại. Chỉ hỗ trợ nhập link voucher. Đóng và mở lại mục Đặt đơn để tải lại dữ liệu.");
            } else !_0x59e2f9.GhhQQ(String, _0x57a74e.value || '').trim() && _0x59e2f9.acwcs(_0x22a8bc, "success", "Kho voucher đã sẵn sàng (" + _0x2987c4.records.length + " mã).");
          }
          _0x59e2f9.jblgN(_0x2184a0);
        },
        _0x129165 = async () => {
          const _0x26e9eb = {
            'VFfrM': function (_0x4574ca, _0x5dbe78, _0x5ce4d5, _0x25cb72) {
              return _0x59e2f9.jIIGB(_0x4574ca, _0x5dbe78, _0x5ce4d5, _0x25cb72);
            },
            'eiHjz': function (_0x4ec8e1, _0xd8b505) {
              return _0x59e2f9.hPAGq(_0x4ec8e1, _0xd8b505);
            },
            'rxEzN': function (_0x4534a0, _0x9fcfcf) {
              return _0x59e2f9.VWyFX(_0x4534a0, _0x9fcfcf);
            },
            'gGpol': function (_0x1ccc7f, _0x5cb93b) {
              return _0x59e2f9.TSDSh(_0x1ccc7f, _0x5cb93b);
            },
            'PxjPO': "READY",
            'LwjVP': function (_0x16ebe2, _0x1048bc) {
              return _0x59e2f9.tklqV(_0x16ebe2, _0x1048bc);
            },
            'fnxiU': "5|3|2|0|1|4",
            'SttfB': function (_0x4e26f4, _0x486dd3) {
              return _0x59e2f9.VMHqv(_0x4e26f4, _0x486dd3);
            },
            'pwUkU': "AbortError",
            'Oseaq': "Quá thời gian 20 giây.",
            'QhvGu': "FAILED",
            'FvNFM': function (_0x242352) {
              return _0x59e2f9.PlNkI(_0x242352);
            },
            'moyqG': "setting-platform-voucher-input"
          };
          if (!_0x1ecce3 || _0x2987c4.promise) return _0x2987c4.promise;
          const _0x280e35 = _0x2987c4.id,
            _0x5c13aa = _0x2987c4.controller;
          return _0x2987c4.status = "LOADING", _0x2987c4.timeoutId = _0x59e2f9.XGVvD(setTimeout, () => _0x5c13aa?.["abort"]("wallet_timeout"), 20000), _0x2987c4.promise = (async () => {
            try {
              for (const _0xc600e1 of [3, 2, 1]) {
                let _0x532e1d = '';
                do {
                  const _0x5c8da7 = await _0x26e9eb.VFfrM(_0x464459, _0xc600e1, _0x532e1d, _0x5c13aa.signal);
                  if (_0x2987c4.closed || _0x26e9eb.eiHjz(_0x2987c4.id, _0x280e35)) return;
                  _0x5c8da7.vouchers.forEach(_0x54dd6a => _0x2c7d10(_0x37e0c0(_0x54dd6a, "wallet_status_" + _0xc600e1)));
                  _0x532e1d = _0x26e9eb.rxEzN(String, _0x5c8da7.next || '');
                } while (_0x532e1d);
              }
              !_0x2987c4.closed && _0x26e9eb.gGpol(_0x2987c4.id, _0x280e35) && (_0x2987c4.status = "READY", _0x1d9aeb.success("Kho voucher đã tải xong: " + _0x2987c4.records.length + " mã."));
            } catch (_0x1eb417) {
              if (!_0x2987c4.closed && _0x26e9eb.LwjVP(_0x2987c4.id, _0x280e35)) {
                _0x2987c4.status = "FAILED";
                _0x2987c4.error = _0x26e9eb.SttfB(_0x1eb417?.["name"], "AbortError") ? "Quá thời gian 20 giây." : _0x1eb417.message;
                _0x2987c4.records = [];
                _0x2987c4.byCode.clear();
                _0x2987c4.byPromotionId.clear();
                _0x1d9aeb.error("Kho voucher Shopee tải thất bại: " + _0x2987c4.error);
              }
            } finally {
              _0x26e9eb.rxEzN(clearTimeout, _0x2987c4.timeoutId);
              _0x2987c4.timeoutId = null;
              !_0x2987c4.closed && (_0x26e9eb.FvNFM(_0x458f3f), _0x26e9eb.LwjVP(_0x2987c4.status, "READY") && _0x26e9eb.rxEzN(String, document.getElementById("setting-platform-voucher-input")?.["value"] || '').trim() && window.scanPlatformVoucherWallet?.(false, {
                'log': false
              }));
            }
          })(), _0x59e2f9.wYfVK(_0x458f3f), _0x2987c4.promise;
        };
      window.scanPlatformVoucherWallet = async (_0x2d22e1 = false, _0x4014af = {}) => {
        _0x54a97b.CBGVx(clearTimeout, _0x2afda3);
        const _0x3c32aa = !!document.getElementById("setting-enable-platform-voucher")?.["checked"];
        if (!_0x3c32aa) return null;
        const _0x3d90e9 = document.getElementById("setting-platform-voucher-input"),
          _0x71cf5f = _0x54a97b.biUOP(String, _0x3d90e9?.["value"] || _0x5acbd4.platformVoucherInput || '').trim();
        _0x5acbd4.platformVoucherInput = _0x71cf5f;
        const _0x2376e1 = _0x54a97b.zvdDC(_0x45e09d, _0x71cf5f),
          _0x1c06e2 = _0x54a97b.HFbEQ(_0x39429a, _0x2376e1.voucherCode),
          _0x1d60bc = _0x54a97b.oSDOy(_0x47fe84, _0x2376e1.promotionid);
        if (!_0x71cf5f) return _0x54a97b.sgunJ(_0x3050f8), _0x54a97b.JUpaE(_0x22a8bc, "error", "❌ Bắt buộc nhập link hoặc tên voucher Shopee."), _0x54a97b.PNpur(_0x2184a0), null;
        if (!_0x1c06e2 && !_0x1d60bc) return _0x54a97b.nSmfV(_0x3050f8), _0x54a97b.JUpaE(_0x22a8bc, "error", "❌ Không đọc được voucherCode hoặc promotionId từ input."), _0x54a97b.SSWVp(_0x2184a0), null;
        if (_0x54a97b.TBqYi(_0x2987c4.status, "LOADING")) return _0x54a97b.rMBLi(_0x22a8bc, "loading", "Đang tải dữ liệu..."), null;
        if (_0x54a97b.nTyRh(_0x2987c4.status, "FAILED")) return _0x5acbd4.platformVoucherForceLinkOnly = true, _0x54a97b.MpCKI(_0x22a8bc, "error", "Kho mã tải thất bại. Chỉ hỗ trợ nhập link voucher. Đóng và mở lại mục Đặt đơn để tải lại dữ liệu."), null;
        const _0x4b1695 = _0x54a97b.fTSqF(_0x2bdc01, _0x2376e1),
          _0x40f607 = _0x4b1695.record;
        _0x5acbd4.platformVoucherWalletChecked = true;
        _0x5acbd4.platformVoucherMetadataChecked = true;
        if (_0x40f607) return _0x54a97b.MpCKI(_0x5411da, _0x40f607, {
          'savedInWallet': true,
          'log': !!_0x4014af.log,
          'message': "Voucher Shopee: User đã lưu mã " + _0x40f607.voucherCode + ". Hệ thống sẽ bỏ qua việc lưu trước khi đặt đơn."
        }), _0x40f607;
        if (!_0x1c06e2) return _0x54a97b.WWHFe(_0x22a8bc, "error", "Không tìm thấy promotionId " + _0x1d60bc + " trong kho voucher hoặc bản ghi không đủ dữ liệu để Apply."), _0x54a97b.mMKqn(_0x2184a0), null;
        if (_0x2376e1.isLink && _0x54a97b.zSJfF(_0x2376e1.promotionid, 0)) _0x54a97b.SavvI(_0x5411da, {
          'voucherCode': _0x1c06e2,
          'promotionid': _0x2376e1.promotionid,
          'signature': _0x2376e1.signature,
          'source': "input_link"
        }, {
          'savedInWallet': false
        });else _0x4b1695.ambiguous ? _0x54a97b.WWHFe(_0x22a8bc, "error", "Có nhiều voucher cùng mã " + _0x1c06e2 + ". Vui lòng nhập link có promotionId để xác định chính xác.") : _0x54a97b.MpCKI(_0x22a8bc, "error", "Không tìm thấy mã " + _0x1c06e2 + " trong kho voucher đã tải.");
        return _0x54a97b.IetCZ(_0x2184a0), null;
      };
      window.retryPlatformVoucherWalletScan = () => {
        _0x54a97b.nNvWu(_0x22a8bc, "error", "Kho voucher chỉ tải một lần trong mỗi phiên. Hãy đóng và mở lại mục Đặt đơn để tải lại.");
      };
      const _0x197699 = async _0xcdbeb4 => {
          const _0x427efc = _0x59e2f9.QsCLv(_0x39429a, _0xcdbeb4);
          if (!_0x427efc) return null;
          try {
            const _0x202716 = await _0x59e2f9.pRrYY(fetch, "https://5anm.net" + "/api/shopee", {
              'method': "POST",
              'headers': {
                'content-type': "application/json"
              },
              'body': JSON.stringify({
                'type': "voucher_checker",
                'texts': [_0x427efc]
              })
            });
            if (!_0x202716.ok) return null;
            const _0x41e687 = await _0x202716.json(),
              _0x5b2ced = Array.isArray(_0x41e687?.["data"]) ? _0x41e687.data : [],
              _0xd7263a = _0x5b2ced.find(_0x46e81d => _0x46e81d?.["type"] === "url" && _0x46e81d?.["data"] && _0x39429a(_0x46e81d?.["input"] || _0x427efc) === _0x427efc);
            return _0xd7263a?.["data"] || null;
          } catch (_0x11646d) {
            return _0x1d9aeb.info("Voucher Shopee: không gọi được 5anm checker (" + _0x11646d.message + ').'), null;
          }
        },
        _0xbe6eb3 = async _0x5eb5df => {
          const _0x4ac438 = _0x54a97b.fTSqF(_0x39429a, _0x5eb5df);
          if (!_0x4ac438) return null;
          try {
            const _0x34403c = _0x54a97b.mMKqn(_0x4d4c36),
              _0x396e4b = await _0x54a97b.iYWfW(fetch, "https://shopee.vn/api/v4/voucher_wallet/validate_platform_voucher_by_voucher_code", {
                'method': "POST",
                'headers': {
                  'accept': "application/json",
                  'content-type': "application/json",
                  'x-csrftoken': _0x34403c.csrf,
                  'x-requested-with': "XMLHttpRequest",
                  'x-shopee-language': 'vi'
                },
                'body': JSON.stringify({
                  'voucher_code': _0x4ac438,
                  'shoporders': [{
                    'shopid': 0x2386b5d,
                    'iteminfos': [{
                      'itemid': 0x23490a97,
                      'modelid': 0xd16296c3b,
                      'quantity': 0x2,
                      'shopid': 0x2386b5d
                    }]
                  }]
                }),
                'mode': "cors",
                'credentials': "include"
              }),
              _0x3a0bc9 = await _0x396e4b.json();
            _0x54a97b.FPhzW(_0x2d1992, _0x3a0bc9, "platform_voucher/validate_code");
            const _0x3d1f61 = _0x3a0bc9?.["data"]?.["voucher"];
            if (_0x54a97b.PXZTT(_0x3a0bc9?.["error"], 0) || !_0x3d1f61) return null;
            return {
              'voucherCode': _0x54a97b.kkiVX(_0x39429a, _0x3d1f61.voucher_code || _0x4ac438),
              'promotionid': _0x54a97b.CPuFP(Number, _0x3d1f61.promotionid || _0x3d1f61.promotion_id || 0),
              'signature': _0x54a97b.fTSqF(String, _0x3d1f61.signature || ''),
              'source': "validate_code"
            };
          } catch (_0x4331fe) {
            return _0x1d9aeb.info("Voucher Shopee: validate code lỗi (" + _0x4331fe.message + ').'), null;
          }
        },
        _0x553145 = _0x2d08be => {
          const _0x485b66 = _0x54a97b.laFaC(_0x39429a, _0x2d08be?.["voucherCode"]),
            _0x385d31 = _0x54a97b.GuauG(_0x47fe84, _0x2d08be?.["promotionid"]),
            _0x34c9ac = _0x54a97b.aGGCS(String, _0x2d08be?.["signature"] || '').trim();
          if (!_0x485b66 || !_0x385d31) return null;
          return {
            'promotion_id': _0x54a97b.ZLJav(_0xc88930, _0x385d31),
            'voucher_code': _0x485b66,
            'signature': _0x34c9ac,
            'signature_source': 0x0
          };
        },
        _0x1f4250 = 110,
        _0xab414c = new Set([19, 90309999]),
        _0x167c60 = _0x2dc6e8 => {
          if (_0x54a97b.BfsVe(_0x2dc6e8, 7)) return 160;
          if (_0x54a97b.LOToa(_0x2dc6e8, 7) && _0x54a97b.ovBFT(_0x2dc6e8, 20)) return 230;
          if (_0x54a97b.vYvkO(_0x2dc6e8, 20) && _0x54a97b.fCRJd(_0x2dc6e8, 33)) return 420;
          if (_0x54a97b.YfJLN(_0x2dc6e8, 33) && _0x54a97b.XYreV(_0x2dc6e8, 50)) return 590;
          if (_0x54a97b.LOToa(_0x2dc6e8, 50) && _0x54a97b.XYreV(_0x2dc6e8, 60)) return 690;
          if (_0x54a97b.AnJeG(_0x2dc6e8, 60) && _0x54a97b.CKlwv(_0x2dc6e8, 70)) return 790;
          if (_0x54a97b.EjPAH(_0x2dc6e8, 70) && _0x54a97b.XYreV(_0x2dc6e8, 80)) return 890;
          if (_0x54a97b.vYvkO(_0x2dc6e8, 80) && _0x54a97b.oDvTE(_0x2dc6e8, 95)) return 1000;
          return 1300;
        },
        _0x3dc319 = _0x1ec695 => _0xab414c.has(Number(_0x1ec695 || 0)),
        _0x35dec5 = (_0x2c2974, _0x57d983) => ({
          'success': false,
          'retryable': false,
          'stopCode': Number(_0x2c2974 || 0),
          'message': _0x57d983 || "Không lưu được voucher Shopee (error=" + Number(_0x2c2974 || 0) + ').'
        }),
        _0x56c3c9 = async _0x2be45b => {
          const _0xe53a8 = {
              'JjCZi': function (_0x3d0452, _0x6cdc2e) {
                return _0x54a97b.YapFl(_0x3d0452, _0x6cdc2e);
              },
              'yPtCy': "object",
              'rKpsu': "error",
              'woNrE': function (_0x1ff4d6, _0x85cf61) {
                return _0x54a97b.XxODf(_0x1ff4d6, _0x85cf61);
              },
              'yqCdl': function (_0x1deba8, _0x2b1e8d) {
                return _0x54a97b.Eirts(_0x1deba8, _0x2b1e8d);
              },
              'gGWJd': function (_0x14c127, _0x1f9ff1) {
                return _0x54a97b.hrTXK(_0x14c127, _0x1f9ff1);
              },
              'djXxr': function (_0x2a8b97, _0x304f4c) {
                return _0x54a97b.ccNQG(_0x2a8b97, _0x304f4c);
              }
            },
            _0x159b53 = _0x54a97b.CuUQA(_0x553145, _0x2be45b);
          if (!_0x159b53) throw new Error("Link voucher Shopee thiếu promotionId hoặc voucherCode.");
          const _0x574955 = _0x54a97b.BYliJ(_0x4d4c36),
            _0x413de8 = await _0x54a97b.FPhzW(fetch, "https://shopee.vn/api/v2/voucher_wallet/save_vouchers", {
              'method': "POST",
              'headers': {
                'accept': "application/json",
                'accept-language': "en-US,en;q=0.9,vi;q=0.8",
                'content-type': "application/json",
                'x-csrftoken': _0x574955.csrf
              },
              'body': JSON.stringify({
                'voucher_identifiers': [_0x159b53],
                'need_user_voucher_status': true
              }),
              'mode': "cors",
              'credentials': "include"
            }),
            _0x120f77 = await _0x413de8.json();
          _0x54a97b.rMBLi(_0x2d1992, _0x120f77, "platform_voucher/save_vouchers");
          const _0x1ec367 = !!_0x120f77 && _0x54a97b.WKnjM(typeof _0x120f77, "object") && Object.prototype.hasOwnProperty.call(_0x120f77, "error") && _0x54a97b.CJzuR(_0x120f77.error, null) && _0x54a97b.OljuB(_0x120f77.error, '');
          if (!_0x1ec367 || !Number.isFinite(_0x54a97b.Ghqcu(Number, _0x120f77.error))) return {
            'success': false,
            'retryable': true,
            'message': "Response lưu voucher thiếu trường error hợp lệ."
          };
          const _0x28f29c = _0x54a97b.SEXUC(Number, _0x120f77.error);
          if (_0x54a97b.vAPdA(_0x3dc319, _0x28f29c)) return _0x54a97b.WWHFe(_0x35dec5, _0x28f29c, _0x120f77?.["error_msg"] || "Shopee chặn lưu voucher, dừng đặt đơn.");
          if (_0x54a97b.GusqG(_0x28f29c, 0)) return {
            'success': false,
            'retryable': true,
            'message': _0x120f77?.["error_msg"] || "Không lưu được voucher Shopee."
          };
          if (!Array.isArray(_0x120f77.responses) || _0x54a97b.jTKxu(_0x120f77.responses.length, 0)) return {
            'success': false,
            'retryable': true,
            'message': "Response lưu voucher không có kết quả cho voucher đã yêu cầu."
          };
          const _0x5266ed = _0x54a97b.drOsH(_0x47fe84, _0x159b53.promotion_id),
            _0x226e25 = _0x54a97b.laFaC(_0x39429a, _0x159b53.voucher_code),
            _0x22c3d1 = _0x120f77.responses.find(_0x474630 => Object.prototype.hasOwnProperty.call(_0x474630 || {}, "error") && _0x3dc319(Number(_0x474630.error)));
          if (_0x22c3d1) return _0x54a97b.WWHFe(_0x35dec5, _0x54a97b.VKGfJ(Number, _0x22c3d1.error), _0x22c3d1?.["error_msg"] || "Shopee chặn lưu voucher, dừng đặt đơn.");
          const _0x3731 = _0x120f77.responses.find(_0x378cff => {
            if (!_0x378cff || _0xe53a8.JjCZi(typeof _0x378cff, "object") || !Object.prototype.hasOwnProperty.call(_0x378cff, "error") || _0xe53a8.woNrE(_0x378cff.error, null) || _0xe53a8.woNrE(_0x378cff.error, '')) return false;
            const _0x41f62a = _0x378cff?.["data"]?.["voucher"];
            if (!_0x41f62a || _0xe53a8.yqCdl(typeof _0x41f62a, "object")) return false;
            return _0xe53a8.woNrE(_0xe53a8.gGWJd(_0x47fe84, _0x41f62a.promotionid || _0x41f62a.promotion_id), _0x5266ed) && _0xe53a8.woNrE(_0xe53a8.djXxr(_0x39429a, _0x41f62a.voucher_code), _0x226e25);
          });
          if (!_0x3731) return {
            'success': false,
            'retryable': true,
            'message': "Response lưu voucher không xác nhận đúng promotionId và voucherCode đã yêu cầu."
          };
          const _0x13a631 = _0x54a97b.eHaRL(Number, _0x3731.error),
            _0x55144b = _0x3731.data.voucher;
          if (_0x54a97b.UypRi(_0x13a631, 0) || _0x54a97b.QSrzd(_0x13a631, 5)) return {
            'success': true,
            'record': {
              'voucherCode': _0x226e25,
              'promotionid': _0x5266ed,
              'signature': _0x54a97b.aGGCS(String, _0x55144b.signature || _0x159b53.signature || ''),
              'source': "save_vouchers"
            },
            'message': _0x54a97b.NcoCK(_0x13a631, 5) ? "Voucher đã lưu trước đó." : "Lưu voucher thành công."
          };
          return {
            'success': false,
            'retryable': true,
            'message': _0x3731?.["error_msg"] || "Chưa lưu được voucher Shopee."
          };
        },
        _0x164f63 = async _0x23be6b => {
          const _0x17af71 = _0x59e2f9.HCiWM(_0x39429a, _0x23be6b);
          if (!_0x17af71) throw new Error("Thiếu tên voucher Shopee.");
          const _0x1d9378 = _0x59e2f9.dNZtz(_0x4d4c36),
            _0x38758a = await _0x59e2f9.kVkKL(fetch, "https://shopee.vn/api/v2/voucher_wallet/save_voucher", {
              'method': "POST",
              'headers': {
                'accept': "application/json",
                'accept-language': "en-US,en;q=0.9,vi;q=0.8",
                'content-type': "application/json",
                'x-csrftoken': _0x1d9378.csrf
              },
              'body': JSON.stringify({
                'voucher_code': _0x17af71,
                'need_user_voucher_status': true
              }),
              'mode': "cors",
              'credentials': "include"
            }),
            _0x30f795 = await _0x38758a.json();
          _0x59e2f9.opkmg(_0x2d1992, _0x30f795, "platform_voucher/save_voucher");
          const _0x2e50c8 = _0x59e2f9.wlZWe(Number, _0x30f795?.["error"] || 0);
          if (_0x59e2f9.KmpUv(_0x3dc319, _0x2e50c8)) return _0x59e2f9.EWMJB(_0x35dec5, _0x2e50c8, _0x30f795?.["error_msg"] || "Shopee chặn lưu voucher, dừng đặt đơn.");
          if (_0x59e2f9.RHZSK(_0x2e50c8, 76100003)) throw new Error("Bạn dính lỗi spam, vui lòng thử lại sau ít nhất 15 phút.");
          if (_0x59e2f9.lCgOH(_0x2e50c8, 0) || _0x59e2f9.yCMXR(_0x2e50c8, 5)) {
            const _0x2d80cb = _0x30f795?.["data"]?.["voucher"] || {},
              _0x5b300d = _0x59e2f9.jeAay(Number, _0x2d80cb?.["promotionid"] || 0),
              _0x1ee708 = _0x59e2f9.BFFre(_0x39429a, _0x2d80cb?.["voucher_code"] || _0x17af71);
            if (_0x59e2f9.TsQDr(_0x5b300d, 0) && _0x1ee708) return {
              'success': true,
              'record': {
                'voucherCode': _0x1ee708,
                'promotionid': _0x5b300d,
                'signature': _0x59e2f9.ALAgi(String, _0x2d80cb?.["signature"] || ''),
                'source': "save_voucher"
              },
              'message': _0x59e2f9.lCgOH(_0x2e50c8, 5) ? "Voucher đã lưu trước đó." : "Lưu voucher thành công."
            };
          }
          const _0x1ad334 = _0x30f795?.["data"]?.["invalid_message_code"];
          return {
            'success': false,
            'retryable': true,
            'message': _0x30f795?.["error_msg"] || _0x30f795?.["data"]?.["invalid_message"] || (_0x59e2f9.MoPaD(_0x1ad334, null) ? "Chưa lưu được voucher (invalid_message_code=" + _0x1ad334 + ').' : "Chưa lưu được voucher Shopee.")
          };
        },
        _0x316103 = async (_0x59eaef, _0x4c7b5a) => {
          const _0x180e85 = _0x1f4250;
          let _0x33a64b = '';
          for (let _0x35fbc7 = 1; _0x5acbd4.isRunning && _0x59e2f9.nPAdl(_0x35fbc7, _0x180e85); _0x35fbc7++) {
            const _0x3a57f9 = await _0x59e2f9.PlNkI(_0x59eaef);
            if (_0x3a57f9?.["success"] && _0x3a57f9.record) return _0x59e2f9.qvTPP(_0x2c7d10, _0x3a57f9.record), _0x59e2f9.IDZJQ(_0x5411da, _0x3a57f9.record, {
              'savedInWallet': true,
              'log': false
            }), _0x1d9aeb.success("Voucher Shopee: " + (_0x3a57f9.message || "lưu thành công") + '\x20(' + _0x35fbc7 + '/' + _0x180e85 + ').'), _0x3a57f9.record;
            const _0x46bcbf = _0x3a57f9?.["message"] || "Chưa lưu được voucher Shopee.";
            _0x1d9aeb.info("Voucher Shopee: " + _0x46bcbf + " Thử " + _0x35fbc7 + '/' + _0x180e85 + '.');
            _0x33a64b = _0x46bcbf;
            if (_0x59e2f9.yCMXR(_0x3a57f9?.["retryable"], false)) throw new Error(_0x46bcbf + " Dừng lưu voucher và dừng đặt đơn" + (_0x3a57f9.stopCode ? " (error=" + _0x3a57f9.stopCode + ')' : '') + '.');
            _0x59e2f9.ziSsH(_0x35fbc7, _0x180e85) && (await _0x59e2f9.ifJpC(_0x1f795e, _0x59e2f9.PgEyD(_0x167c60, _0x35fbc7)));
          }
          throw new Error(_0x33a64b || "Không lưu được voucher Shopee.");
        },
        _0x3478d9 = async (_0x28deb9, _0x4f43b7 = {}) => {
          const _0x2d5aad = {
              'SOcfC': function (_0x4b5bd6, _0x3c7b21, _0x1c968c) {
                return _0x54a97b.WWHFe(_0x4b5bd6, _0x3c7b21, _0x1c968c);
              }
            },
            _0xb1c734 = _0x54a97b.LaOGD(_0x45e09d, _0x28deb9),
            _0x3214a9 = _0x54a97b.HFbEQ(_0x39429a, _0xb1c734.voucherCode);
          if (!_0x3214a9) return null;
          if (_0x5acbd4.platformVoucherResolved && !_0x5acbd4.platformVoucherSavedInWallet) return _0x5acbd4.platformVoucherMetadataChecked = true, _0x5acbd4.platformVoucherResolved;
          const _0x23b49e = _0x354cc3 => {
            if (!_0x354cc3?.["voucherCode"] || !_0x354cc3?.["promotionid"]) return null;
            return _0x2d5aad.SOcfC(_0x5411da, _0x354cc3, {
              'savedInWallet': false,
              'log': !!_0x4f43b7.log,
              'message': "Voucher Shopee: Tìm thấy voucher " + _0x354cc3.voucherCode + " / " + _0x354cc3.promotionid
            }), _0x5acbd4.platformVoucherMetadataChecked = true, _0x354cc3;
          };
          if (_0xb1c734.isLink && _0xb1c734.voucherCode && _0x54a97b.zSJfF(_0xb1c734.promotionid, 0)) return _0x54a97b.CwAjP(_0x23b49e, {
            'voucherCode': _0xb1c734.voucherCode,
            'promotionid': _0xb1c734.promotionid,
            'signature': _0xb1c734.signature,
            'source': "input_link"
          });
          const _0x12a57b = await _0x54a97b.lhcsV(_0x197699, _0x3214a9);
          if (_0x12a57b) {
            const _0x4c36ef = _0x54a97b.Zkwwh(_0x45e09d, _0x12a57b);
            if (_0x4c36ef.voucherCode && _0x54a97b.TRaeN(_0x4c36ef.promotionid, 0)) return _0x54a97b.CPuFP(_0x23b49e, {
              'voucherCode': _0x4c36ef.voucherCode || _0x3214a9,
              'promotionid': _0x4c36ef.promotionid,
              'signature': _0x4c36ef.signature,
              'source': "resolved"
            });
          }
          const _0x4334e9 = await _0x54a97b.bLqbP(_0xbe6eb3, _0x3214a9);
          if (_0x4334e9?.["promotionid"]) return _0x54a97b.sbdrI(_0x23b49e, {
            ..._0x4334e9,
            'source': "resolved"
          });
          return _0x4f43b7.log && _0x1d9aeb.info("Voucher Shopee: Không thấy voucher " + _0x3214a9 + ". Mã sẽ đc tiến hành lưu trước khi đặt."), _0x5acbd4.platformVoucherMetadataChecked = true, null;
        },
        _0x190c0c = async () => {
          if (!_0x5acbd4.platformVoucherEnabled) return null;
          if (_0x54a97b.Cicim(_0x5acbd4.platformVoucherSource, "banner") && _0x5acbd4.platformVoucherFromSS6 && _0x5acbd4.platformVoucherResolved) return _0x5acbd4.platformVoucherResolved;
          const _0x6a37c9 = _0x54a97b.bHyvj(String, _0x5acbd4.platformVoucherInput || '').trim();
          if (!_0x6a37c9) throw new Error("Voucher Shopee đã bật nhưng chưa nhập link hoặc tên mã.");
          const _0x4cfa57 = _0x54a97b.Zeowf(_0x45e09d, _0x6a37c9);
          if (_0x54a97b.RzCTG(_0x2987c4.status, "LOADING")) throw new Error("Kho voucher Shopee vẫn đang tải. Vui lòng chờ hoàn tất.");
          if ((_0x54a97b.TBqYi(_0x2987c4.status, "FAILED") || _0x5acbd4.platformVoucherForceLinkOnly) && !_0x4cfa57.isLink) throw new Error("Kho mã tải thất bại. Chỉ hỗ trợ nhập link voucher.");
          const _0x4aba4d = _0x54a97b.ZMNAt(_0x2987c4.status, "READY") ? _0x54a97b.nQVgj(_0x2bdc01, _0x4cfa57) : {
              'record': null,
              'ambiguous': false
            },
            _0x31aa28 = _0x4aba4d.record;
          if (_0x31aa28) return _0x54a97b.LMEMM(_0x5411da, _0x31aa28, {
            'savedInWallet': true,
            'log': true
          }), _0x31aa28;
          if (_0x54a97b.jTKxu(_0x2987c4.status, "READY") && !_0x4cfa57.isLink) {
            if (_0x4aba4d.ambiguous) throw new Error("Có nhiều voucher cùng mã " + _0x54a97b.ccNQG(_0x39429a, _0x4cfa57.voucherCode) + ". Vui lòng nhập link có promotionId để xác định chính xác.");
            throw new Error("Không tìm thấy mã " + _0x54a97b.vAPdA(_0x39429a, _0x4cfa57.voucherCode) + " trong kho voucher đã tải.");
          }
          if (_0x5acbd4.platformVoucherResolved && _0x5acbd4.platformVoucherSavedInWallet) return _0x5acbd4.platformVoucherResolved;
          if (_0x5acbd4.platformVoucherResolved) return await _0x54a97b.vGyKD(_0x316103, () => _0x56c3c9(_0x5acbd4.platformVoucherResolved), "resolved");
          const _0x2d0c7c = _0x54a97b.GSRGt(_0x39429a, _0x4cfa57.voucherCode);
          if (!_0x2d0c7c) throw new Error("Không đọc được tên voucher Shopee từ input.");
          const _0x12bba6 = await _0x54a97b.pESlk(_0x3478d9, _0x6a37c9);
          if (_0x12bba6?.["promotionid"]) return await _0x54a97b.LMEMM(_0x316103, () => _0x56c3c9(_0x12bba6), "resolved");
          return await _0x54a97b.SavvI(_0x316103, () => _0x164f63(_0x2d0c7c), "save_voucher");
        };
      window.preparePlatformVoucherForCheckout = _0x190c0c;
      const _0x513910 = 200,
        _0x5e430c = 6,
        _0x42b554 = 3000,
        _0x4b2f94 = _0x59b1d8 => _0x59b1d8?.["meta"]?.["configuration"]?.["expire_at"] ?? _0x59b1d8?.["data"]?.["meta"]?.["configuration"]?.["expire_at"] ?? _0x59b1d8?.["page"]?.["meta"]?.["configurations"]?.["expire_at"] ?? _0x59b1d8?.["data"]?.["page"]?.["meta"]?.["configurations"]?.["expire_at"] ?? null,
        _0x211dc8 = _0x1836ee => {
          const _0x30b808 = {
              'mNAYC': function (_0x30e391, _0x310f1d) {
                return _0x59e2f9.PpLRJ(_0x30e391, _0x310f1d);
              },
              'byUHk': function (_0x500388, _0x549126) {
                return _0x500388 || _0x549126;
              },
              'pIEOu': function (_0x97c233, _0x11b023) {
                return _0x59e2f9.tHMsd(_0x97c233, _0x11b023);
              },
              'cfqMO': function (_0x7bb5a, _0xebe46d, _0xee1c0, _0x3a3f4a, _0x31c644) {
                return _0x59e2f9.tWqGW(_0x7bb5a, _0xebe46d, _0xee1c0, _0x3a3f4a, _0x31c644);
              }
            },
            _0xe93c84 = [],
            _0x3972cb = _0x59e2f9.VujjD(Number, _0x1836ee?.["data"]?.["page"]?.["meta"]?.["page_id"] || _0x1836ee?.["data"]?.["meta"]?.["page_id"] || _0x1836ee?.["meta"]?.["page_id"] || _0x1836ee?.["page"]?.["meta"]?.["page_id"] || 0) || 66938,
            _0x268697 = (_0x3a8652, _0x5be954, _0x3d4ed1 = {}, _0x3637c6 = {}) => {
              if (!_0x3a8652) return;
              _0xe93c84.push({
                'collection_id': _0x30b808.mNAYC(String, _0x3a8652),
                'component_id': _0x5be954 || 0,
                'component_type': 0x1,
                'limit': _0x30b808.mNAYC(Number, _0x3d4ed1.total_vouchers_display_number || _0x3d4ed1.total_items_display_number || _0x3d4ed1.display_voucher_quantity || _0x3637c6.limit || 50) || 50,
                'microsite_id': _0x3972cb,
                'offset': 0x0,
                'number_of_vouchers_per_row': _0x30b808.pIEOu(Number, _0x3d4ed1.number_of_vouchers_per_row || _0x3d4ed1.display_number_per_row || _0x3637c6.number_of_vouchers_per_row || 1) || 1
              });
            },
            _0x298a7c = _0x1836ee?.["data"]?.["layout"] || _0x1836ee?.["layout"];
          (_0x298a7c?.["component_list"] || []).forEach(_0x145650 => {
            try {
              const _0x39d1dd = JSON.parse(_0x145650.properties || '[]'),
                _0x36523b = _0x39d1dd.find(_0x2e9287 => _0x2e9287.key === "data")?.["value"] || {},
                _0x14ea51 = _0x39d1dd.find(_0x37d08 => _0x37d08.key === "style")?.["value"] || {};
              if (_0x36523b.voucher_collection_id) _0x30b808.cfqMO(_0x268697, _0x36523b.voucher_collection_id, _0x145650.id, _0x14ea51, _0x36523b);
            } catch (_0x3c87b3) {}
          });
          const _0x2c0c2d = _0x1836ee?.["data"]?.["page"]?.["data"] || _0x1836ee?.["page"]?.["data"] || [];
          return _0x2c0c2d.forEach(_0x1d6206 => _0x268697(_0x1d6206?.["configurations"]?.["data"]?.["voucher_collection_id"], _0x1d6206?.["configurations"]?.['id'], _0x1d6206?.["configurations"]?.["style"] || {}, _0x1d6206?.["configurations"]?.["data"] || {})), _0xe93c84.filter((_0x42571f, _0x33ab94, _0x39fa99) => _0x33ab94 === _0x39fa99.findIndex(_0xe04646 => _0xe04646.collection_id === _0x42571f.collection_id));
        },
        _0xd9d649 = async (_0x527f13, _0x269e8b) => {
          const _0x10175f = await _0x59e2f9.uBCwn(fetch, "https://shopee.vn/api/v4/pagebuilder/get_csr_page?page_url=" + _0x59e2f9.BRaSi(encodeURIComponent, _0x527f13) + "&platform=4&timestamp=" + Date.now(), {
              'method': "GET",
              'cache': "no-store",
              'headers': {
                'accept': "application/json",
                'accept-language': 'vi',
                'cache-control': "no-cache",
                'pragma': "no-cache"
              },
              'credentials': "include",
              'signal': _0x269e8b
            }),
            _0x14a5db = await _0x10175f.json();
          _0x59e2f9.sRutA(_0x2d1992, _0x14a5db, "SS6/banner");
          if (_0x59e2f9.FaKWc(_0x14a5db?.["error"], 0) || !(_0x14a5db.data || _0x14a5db.layout?.["component_list"] || _0x14a5db.page)) throw new Error(_0x14a5db?.["error_msg"] || "Không tải được banner.");
          return _0x14a5db;
        },
        _0x589aa1 = async (_0x1af51e, _0x45230f) => {
          const _0x4b27e6 = {
            'pCiXi': function (_0x20f689, _0x4e0b1a) {
              return _0x59e2f9.aomAe(_0x20f689, _0x4e0b1a);
            },
            'bfftp': function (_0x3186da, _0x411267) {
              return _0x59e2f9.DCoVJ(_0x3186da, _0x411267);
            },
            'FDGhk': function (_0x333e67, _0xd35c84) {
              return _0x59e2f9.KgFGw(_0x333e67, _0xd35c84);
            },
            'ZuFYo': function (_0x32b2f9, _0x101238) {
              return _0x59e2f9.YmASp(_0x32b2f9, _0x101238);
            }
          };
          if (!_0x1af51e.length) return [];
          const _0x43ae9e = _0x59e2f9.jOHbN(_0x4d4c36),
            _0x11dd00 = await _0x59e2f9.UDCNW(fetch, "https://shopee.vn/api/v1/microsite/get_vouchers_by_collections", {
              'method': "POST",
              'headers': {
                'accept': "application/json",
                'content-type': "application/json",
                'x-csrftoken': _0x43ae9e.csrf
              },
              'body': JSON.stringify({
                'voucher_collection_request_list': _0x1af51e
              }),
              'credentials': "include",
              'signal': _0x45230f
            }),
            _0x2283ca = await _0x11dd00.json();
          _0x59e2f9.jtTYh(_0x2d1992, _0x2283ca, "SS6/banner_vouchers");
          if (_0x2283ca?.["error"]) throw new Error(_0x2283ca?.["error_msg"] || "Không tải được voucher trên banner.");
          const _0x1b72bf = [];
          return (_0x2283ca?.["data"] || []).forEach(_0x2ea3a7 => {
            (_0x2ea3a7?.["vouchers"] || []).forEach(_0x39354c => {
              const _0x53d802 = _0x39354c?.["voucher"]?.["voucher_identifier"] || {},
                _0x168658 = _0x4b27e6.pCiXi(Number, _0x53d802.promotion_id || 0),
                _0x4010dc = _0x4b27e6.pCiXi(_0x39429a, _0x53d802.voucher_code);
              if (_0x4b27e6.bfftp(_0x168658, 0) && _0x4010dc) _0x1b72bf.push({
                'promotionid': _0x168658,
                'voucherCode': _0x4010dc,
                'signature': _0x4b27e6.FDGhk(String, _0x53d802.signature || ''),
                'collectionId': _0x4b27e6.ZuFYo(String, _0x2ea3a7.collection_id)
              });
            });
          }), _0x1b72bf;
        },
        _0x4ffd63 = async (_0x71f7d6, _0xa6b21f) => {
          const _0x350ebf = _0x54a97b.nSmfV(_0x4d4c36),
            _0x3ffb25 = await _0x54a97b.vGyKD(fetch, "https://shopee.vn/api/v4/microsite/claim_voucher_by_collection_group_id", {
              'method': "POST",
              'headers': {
                'accept': "application/json",
                'content-type': "application/json",
                'x-api-source': 'pc',
                'x-csrftoken': _0x350ebf.csrf,
                'x-sz-sdk-version': "1.12.40"
              },
              'body': JSON.stringify({
                'collection_id': _0x54a97b.aaBgG(String, _0x71f7d6.collection_id),
                'voucher_limit': _0x71f7d6.limit || 20,
                'component_type': _0x71f7d6.component_type || 1,
                'component_id': _0x71f7d6.component_id,
                'microsite_id': _0x71f7d6.microsite_id || 66938,
                'number_of_vouchers_per_row': _0x71f7d6.number_of_vouchers_per_row || 1
              }),
              'credentials': "include",
              'signal': _0xa6b21f
            }),
            _0x50b353 = await _0x3ffb25.json();
          _0x54a97b.vGyKD(_0x2d1992, _0x50b353, "SS6/claim_banner");
          if ([19, 90309999].includes(_0x54a97b.mFXEa(Number, _0x50b353?.["error"]))) throw new Error(_0x50b353?.["error_msg"] || "SS6 dừng do error=" + _0x50b353.error);
          return _0x50b353;
        },
        _0x5a1d8f = _0x40b652 => {
          const _0x10055f = {
              'aWYqF': function (_0x6a1845, _0x44a19d) {
                return _0x54a97b.CBGVx(_0x6a1845, _0x44a19d);
              },
              'WKYON': function (_0x33f2aa, _0x3234da) {
                return _0x54a97b.UypRi(_0x33f2aa, _0x3234da);
              },
              'PQNuM': function (_0x5b4c58, _0x45fdf1) {
                return _0x54a97b.hrefD(_0x5b4c58, _0x45fdf1);
              },
              'tuIhs': function (_0x17c8e1, _0x357143) {
                return _0x54a97b.Ghqcu(_0x17c8e1, _0x357143);
              },
              'duwne': function (_0x5998a0, _0x2dbfb5) {
                return _0x54a97b.xzSwV(_0x5998a0, _0x2dbfb5);
              },
              'CnrTJ': function (_0x5de14c, _0x41948f) {
                return _0x54a97b.xTFTh(_0x5de14c, _0x41948f);
              },
              'YJnrw': function (_0x3ccb4c, _0x122452) {
                return _0x54a97b.xzSwV(_0x3ccb4c, _0x122452);
              },
              'fyVPi': function (_0x178010, _0xa9c468) {
                return _0x54a97b.xFkGk(_0x178010, _0xa9c468);
              },
              'tSJLn': "ss6_banner"
            },
            _0x52f3ee = new Set(),
            _0x1b189c = new Set(),
            _0x2e6856 = [];
          return _0x40b652.forEach(_0x5346e7 => {
            const _0x35c640 = _0x10055f.aWYqF(Number, _0x5346e7?.["error"]),
              _0x127bf5 = _0x10055f.WKYON(_0x35c640, 5) && /(đã\s*(?:lưu|có|sở hữu)|already\s*(?:saved|owned))/i.test(_0x10055f.PQNuM(String, _0x5346e7?.["error_msg"] || '')),
              _0x51c4fa = _0x5346e7?.["data"]?.["voucher"] || _0x5346e7?.["voucher"] || null,
              _0x187c7a = _0x10055f.tuIhs(Number, _0x51c4fa?.["promotionid"] || _0x51c4fa?.["promotion_id"] || 0),
              _0x50db52 = _0x10055f.PQNuM(_0x39429a, _0x51c4fa?.["voucher_code"]);
            if (_0x10055f.duwne(_0x35c640, 0) || _0x127bf5) {
              const _0xc3fe0f = _0x10055f.CnrTJ(_0x187c7a, 0) ? "pid:" + _0x187c7a : _0x50db52 ? "code:" + _0x50db52 : _0x5346e7;
              _0x1b189c.add(_0xc3fe0f);
            }
            if (!(_0x10055f.YJnrw(_0x35c640, 0) || _0x127bf5) || _0x10055f.fyVPi(_0x10055f.tuIhs(Number, _0x51c4fa?.["shop_id"]), 0) || !_0x187c7a || !_0x50db52 || _0x52f3ee.has(_0x187c7a)) return;
            _0x52f3ee.add(_0x187c7a);
            _0x2e6856.push({
              'voucherCode': _0x50db52,
              'voucher_code': _0x50db52,
              'promotionid': _0x187c7a,
              'promotion_id': _0x187c7a,
              'signature': _0x10055f.aWYqF(String, _0x51c4fa?.["signature"] || ''),
              'source': "ss6_banner",
              'claimError': _0x35c640
            });
          }), _0x2e6856.totalSaved = _0x1b189c.size, _0x2e6856;
        },
        _0x558948 = async (_0x43d3ee, _0x22e080) => {
          const _0x3e46f5 = [];
          for (let _0x5952fd = 1; _0x54a97b.NbCiy(_0x5952fd, _0x5e430c) && _0x5acbd4.isRunning && !_0x4d2c49.stopped; _0x5952fd++) {
            const _0x30fb06 = [];
            for (const _0x414e16 of _0x43d3ee) {
              const _0x56401c = await _0x54a97b.FPhzW(_0x4ffd63, _0x414e16, _0x22e080),
                _0x979baf = Array.isArray(_0x56401c?.["responses"]) ? _0x56401c.responses : Array.isArray(_0x56401c?.["data"]?.["responses"]) ? _0x56401c.data.responses : [];
              _0x3e46f5.push(..._0x979baf);
              _0x30fb06.push(..._0x979baf);
            }
            if (_0x54a97b.CPuVP(_0x30fb06.length, 0) && _0x30fb06.every(_0xb78205 => {
              const _0x5be492 = _0x54a97b.LlHLx(Number, _0xb78205?.["error"]);
              return _0x54a97b.xzSwV(_0x5be492, 0) || _0x54a97b.FQnmH(_0x5be492, 5) && /(đã\s*(?:lưu|có|sở hữu)|already\s*(?:saved|owned))/i.test(_0x54a97b.JVuvz(String, _0xb78205?.["error_msg"] || ''));
            })) break;
            if (_0x54a97b.DwBQU(_0x5952fd, _0x5e430c)) await _0x54a97b.VZfqy(_0x1f795e, 230);
          }
          return _0x54a97b.hrefD(_0x5a1d8f, _0x3e46f5);
        },
        _0x23b286 = _0x154bef => {
          const _0x4ff448 = new Date(_0x54a97b.hhNuF(_0x54a97b.ZLJav(Number, _0x154bef), 1000));
          return _0x54a97b.bDmWL(String, _0x4ff448.getHours()).padStart(2, '0') + ':' + _0x54a97b.DjmQT(String, _0x4ff448.getMinutes()).padStart(2, '0') + ':' + _0x54a97b.EkEBR(String, _0x4ff448.getSeconds()).padStart(2, '0') + " | " + _0x54a97b.ffJqw(String, _0x4ff448.getDate()).padStart(2, '0') + '/' + _0x54a97b.eNqKh(String, _0x54a97b.ymkQW(_0x4ff448.getMonth(), 1)).padStart(2, '0');
        },
        _0x324350 = _0x561711 => {
          const _0xe87cdd = _0x54a97b.VEnNd(Number, _0x561711);
          return Number.isFinite(_0xe87cdd) && _0x54a97b.TRaeN(_0xe87cdd, 0) && Number.isFinite(new Date(_0x54a97b.hhNuF(_0xe87cdd, 1000)).getTime());
        },
        _0x1d8321 = (_0x24e3e3, _0x5a4c70 = Math.floor(Date.now() / 1000)) => {
          const _0x18539a = _0x59e2f9.szPlK(Number, _0x24e3e3);
          if (!_0x59e2f9.vWwOG(_0x324350, _0x18539a)) return false;
          const _0x3eb77e = new Date(_0x59e2f9.iWfVc(_0x18539a, 1000)).getSeconds(),
            _0x2341a2 = _0x59e2f9.aqHKg(_0x18539a, _0x5a4c70),
            _0x3ada9f = _0x2341a2 && _0x59e2f9.DkRUT(_0x59e2f9.Nkxpe(_0x5a4c70, 86380), _0x18539a);
          return _0x3ada9f && (_0x59e2f9.ptGMA(_0x3eb77e, 59) || _0x59e2f9.yltgY(_0x3eb77e, 0));
        },
        _0x2d818f = (_0xab193f, _0x1c246e = false) => {
          const _0x39e678 = new Date(_0x54a97b.QYPJb(Number, _0xab193f));
          if (!Number.isFinite(_0x39e678.getTime())) return "không xác định";
          const _0x5309ed = _0x54a97b.UebaD(String, _0x39e678.getHours()).padStart(2, '0') + ':' + _0x54a97b.KZrqi(String, _0x39e678.getMinutes()).padStart(2, '0') + ':' + _0x54a97b.mQDed(String, _0x39e678.getSeconds()).padStart(2, '0');
          return _0x1c246e ? _0x5309ed + '.' + _0x54a97b.LlHLx(String, _0x39e678.getMilliseconds()).padStart(3, '0') : _0x5309ed;
        },
        _0x397dfb = _0x119b9f => {
          const _0x15c1b7 = Math.max(0, Math.ceil(_0x59e2f9.eFPVL(_0x59e2f9.qZPrU(Number, _0x119b9f), 1000))),
            _0x39f7cc = Math.floor(_0x59e2f9.eFPVL(_0x15c1b7, 3600)),
            _0x5c9a44 = Math.floor(_0x59e2f9.qdLJW(_0x59e2f9.izmNJ(_0x15c1b7, 3600), 60)),
            _0x1dcf0d = _0x59e2f9.bWUTv(_0x15c1b7, 60);
          return _0x59e2f9.EBQtB(String, _0x39f7cc).padStart(2, '0') + ':' + _0x59e2f9.IZSvs(String, _0x5c9a44).padStart(2, '0') + ':' + _0x59e2f9.ZeAeh(String, _0x1dcf0d).padStart(2, '0');
        },
        _0x2892c9 = () => {
          _0x4d2c49.uiTimer && (_0x59e2f9.OqdKK(clearInterval, _0x4d2c49.uiTimer), _0x4d2c49.uiTimer = null);
        },
        _0xeba1ed = () => {
          _0x4d2c49.logCountdownEl?.["isConnected"] && _0x4d2c49.logCountdownEl.remove();
          _0x4d2c49.logCountdownEl = null;
          _0x4d2c49.logCountdownLastSecond = null;
        },
        _0x5c1eec = _0x3644d6 => {
          if (!_0x5acbd4.isRunning || _0x4d2c49.stopped) {
            _0x59e2f9.oJmXx(_0xeba1ed);
            return;
          }
          const _0x15b004 = Math.max(0, Math.ceil(_0x59e2f9.uPEEr(_0x59e2f9.sAFNa(_0x59e2f9.LBsCI(Number, _0x3644d6), Date.now()), 1000)));
          if (_0x59e2f9.otlDx(_0x15b004, 0)) {
            _0x59e2f9.isScj(_0xeba1ed);
            return;
          }
          if (_0x59e2f9.KUuzV(_0x4d2c49.logCountdownLastSecond, _0x15b004) && _0x4d2c49.logCountdownEl?.["isConnected"]) return;
          const _0x275016 = document.getElementById("autobuy-log-container");
          if (!_0x275016) return;
          if (!_0x4d2c49.logCountdownEl?.["isConnected"]) {
            const _0x115f1e = document.createElement("div");
            _0x115f1e.dataset.autoOrderBannerCountdown = '1';
            _0x115f1e.style.marginBottom = "4px";
            _0x115f1e.style.fontFamily = "monospace";
            _0x115f1e.style.fontSize = "12px";
            _0x115f1e.style.color = "rgb(171 167 3)";
            _0x115f1e.style.wordBreak = "break-word";
            _0x115f1e.style.overflowWrap = "anywhere";
            _0x115f1e.style.whiteSpace = "pre-wrap";
            _0x275016.appendChild(_0x115f1e);
            _0x4d2c49.logCountdownEl = _0x115f1e;
          }
          const _0x4fce10 = _0x59e2f9.LxCDg(_0x3606fc),
            _0x42a6a5 = document.createElement("span");
          _0x42a6a5.style.color = "#999";
          _0x42a6a5.textContent = '[' + _0x4fce10 + ']';
          _0x4d2c49.logCountdownEl.replaceChildren(_0x42a6a5, document.createTextNode(" Đếm ngược " + _0x15b004 + " giây chờ quét banner..."));
          _0x4d2c49.logCountdownLastSecond = _0x15b004;
          _0x275016.scrollTop = _0x275016.scrollHeight;
        },
        _0x426f5b = () => {
          const _0x32fe61 = document.getElementById("setting-enable-platform-voucher"),
            _0x597279 = document.getElementById("setting-platform-voucher-source"),
            _0x5162b9 = document.querySelector("input[name=\"platform-banner-mode\"]:checked"),
            _0x1388d5 = _0x32fe61 ? _0x32fe61.checked : _0x5acbd4.platformVoucherEnabled,
            _0x5d5ca2 = _0x597279 ? _0x597279.value : _0x5acbd4.platformVoucherSource,
            _0x459687 = _0xae0156 ? _0x5162b9 ? _0x5162b9.value : _0x5acbd4.platformVoucherBannerMode : "smart";
          return !!_0x1388d5 && _0x54a97b.rYNDn(_0x5d5ca2, "banner") && _0x54a97b.gLiHN(_0x459687, "smart");
        },
        _0x3ad248 = () => {
          const _0x535600 = document.getElementById("platform-banner-status");
          if (!_0x535600) return;
          if (!_0x59e2f9.BPOXq(_0x426f5b)) {
            _0x535600.style.display = "none";
            _0x535600.textContent = '';
            return;
          }
          const _0x1d82c1 = _0x4d2c49.loaded,
            _0x4590d2 = _0x59e2f9.ZSRvu(Number, _0x1d82c1?.["expireAt"]);
          if (!_0x1d82c1) return;
          const _0x2ffe90 = _0x59e2f9.fKuuT(_0x1d8321, _0x4590d2),
            _0x29c866 = document.createElement("div");
          _0x29c866.textContent = _0x2ffe90 ? "⏰ Banner sẽ thay đổi lúc " + _0x59e2f9.tROaN(_0x23b286, _0x4590d2) : "❌ Banner không còn thay đổi.";
          const _0x522f3b = document.createElement("div");
          _0x522f3b.style.marginTop = "7px";
          if (_0x59e2f9.RHZSK(_0x4d2c49.uiState, "scanning")) _0x522f3b.textContent = "Đang quét banner...";else {
            if (_0x59e2f9.FnWsI(_0x4d2c49.uiState, "completed")) _0x522f3b.textContent = "Đã hoàn tất quét banner.";else {
              if (_0x59e2f9.oeaTG(_0x4d2c49.uiState, "stopped")) _0x522f3b.textContent = "Đã dừng.";else {
                if (_0x59e2f9.nbLNv(_0x4d2c49.uiState, "error")) _0x522f3b.textContent = "Không thể tiếp tục quét banner.";
              }
            }
          }
          _0x535600.className = "platform-voucher-status " + (_0x59e2f9.nbLNv(_0x4d2c49.uiState, "error") || !_0x2ffe90 && _0x59e2f9.ApDKA(_0x4d2c49.uiState, "scanning") && _0x59e2f9.VPAbJ(_0x4d2c49.uiState, "completed") ? "error" : _0x59e2f9.nQaLB(_0x4d2c49.uiState, "completed") ? "success" : "loading");
          _0x535600.style.display = "block";
          if (_0x522f3b.textContent) _0x535600.replaceChildren(_0x29c866, _0x522f3b);else _0x535600.replaceChildren(_0x29c866);
        },
        _0x43ae40 = () => {
          _0x59e2f9.jblgN(_0x2892c9);
          _0x59e2f9.UiyvC(_0x3ad248);
        };
      window.loadAutoOrderBanner = async (_0x3d3acd = _0x5acbd4.platformVoucherBannerSlug) => {
        if (!_0x1ecce3) return null;
        _0x5acbd4.platformVoucherBannerSlug = _0x54a97b.laFaC(String, _0x3d3acd || "kol-affiliate");
        _0x4d2c49.controller?.["abort"]();
        const _0x2ac998 = new AbortController();
        _0x4d2c49.controller = _0x2ac998;
        _0x5acbd4.platformVoucherBannerData = null;
        _0x4d2c49.uiState = "loading";
        _0x54a97b.sgunJ(_0x2892c9);
        const _0x3d74cc = document.getElementById("platform-banner-status");
        _0x3d74cc && _0x54a97b.IetCZ(_0x426f5b) && (_0x3d74cc.className = "platform-voucher-status loading", _0x3d74cc.textContent = "Đang tải thông tin banner...", _0x3d74cc.style.display = "block");
        _0x54a97b.IetCZ(_0x2184a0);
        try {
          const _0x25b3f1 = await _0x54a97b.gdZTw(_0xd9d649, _0x5acbd4.platformVoucherBannerSlug, _0x2ac998.signal),
            _0x208a3c = _0x54a97b.Aoitn(_0x211dc8, _0x25b3f1),
            _0x24d08e = await _0x54a97b.HsplL(_0x589aa1, _0x208a3c, _0x2ac998.signal),
            _0x480994 = _0x54a97b.EkEBR(Number, _0x54a97b.KnzUB(_0x4b2f94, _0x25b3f1) || 0),
            _0x4edaa6 = {
              'slug': _0x5acbd4.platformVoucherBannerSlug,
              'page': _0x25b3f1,
              'collections': _0x208a3c,
              'vouchers': _0x24d08e,
              'expireAt': _0x480994
            };
          return _0x4d2c49.loaded = _0x4edaa6, _0x5acbd4.platformVoucherBannerData = _0x4edaa6, _0x4d2c49.uiState = _0x5acbd4.isRunning && _0x54a97b.TBqYi(_0x5acbd4.platformVoucherBannerMode, "smart") ? "waiting" : "idle", _0x54a97b.ZySrU(_0x43ae40), _0x54a97b.iqBiI(_0x2184a0), _0x4edaa6;
        } catch (_0x266b07) {
          if (_0x54a97b.Cicim(_0x266b07?.["name"], "AbortError")) return null;
          _0x3d74cc && (_0x3d74cc.className = "platform-voucher-status error", _0x3d74cc.textContent = "Không tải được banner: " + _0x266b07.message, _0x3d74cc.style.display = "block");
          _0x54a97b.SSWVp(_0x2892c9);
          _0x4d2c49.uiState = "error";
          _0x4d2c49.loaded = null;
          _0x5acbd4.platformVoucherBannerData = null;
          _0x54a97b.sgunJ(_0x2184a0);
          throw _0x266b07;
        }
      };
      const _0x3ff617 = () => {
        const _0x42555f = document.getElementById("autobuy-schedule-section-header"),
          _0x2e13be = document.getElementById("autobuy-schedule-setting-group"),
          _0x56be2d = _0x54a97b.mUdYG(_0x426f5b);
        if (_0x42555f) _0x42555f.style.display = _0x56be2d ? "none" : '';
        if (_0x2e13be) _0x2e13be.style.display = _0x56be2d ? "none" : '';
        !_0x56be2d && (_0x54a97b.JeHjz(_0x2892c9), _0x54a97b.FZpHu(_0x3ad248));
      };
      window.handlePlatformBannerModeChange = _0x1babe9 => {
        _0x5acbd4.platformVoucherBannerMode = _0xae0156 && _0x59e2f9.LnETj(_0x1babe9, "test") ? "test" : "smart";
        if (!_0xae0156) {
          const _0x42e1d1 = document.querySelector("input[name=\"platform-banner-mode\"][value=\"smart\"]");
          if (_0x42e1d1) _0x42e1d1.checked = true;
        }
        _0x4d2c49.uiState = "idle";
        _0x59e2f9.sVSWy(_0x3ff617);
        _0x59e2f9.AxkUW(_0x43ae40);
      };
      window.handlePlatformVoucherSourceChange = _0x346fcc => {
        _0x5acbd4.platformVoucherSource = _0x54a97b.kujrQ(_0x346fcc?.["value"], "banner") ? "banner" : "wallet";
        _0x54a97b.cLCYe(_0x56ecab);
        if (_0x54a97b.RicEm(_0x5acbd4.platformVoucherSource, "banner") && !_0xae0156) {
          _0x5acbd4.platformVoucherBannerMode = "smart";
          const _0x57e59c = document.querySelector("input[name=\"platform-banner-mode\"][value=\"smart\"]");
          if (_0x57e59c) _0x57e59c.checked = true;
        }
        _0x5acbd4.platformVoucherFromSS6 = false;
        _0x5acbd4.platformVoucherQueue = [];
        const _0x2ca818 = document.getElementById("platform-voucher-wallet-panel"),
          _0x467c40 = document.getElementById("platform-voucher-banner-panel");
        if (_0x2ca818) _0x2ca818.style.display = _0x54a97b.TQjPZ(_0x5acbd4.platformVoucherSource, "wallet") ? "block" : "none";
        if (_0x467c40) _0x467c40.style.display = _0x54a97b.ZMNAt(_0x5acbd4.platformVoucherSource, "banner") ? "flex" : "none";
        _0x54a97b.BYliJ(_0x3ff617);
        _0x54a97b.JmiOo(_0x43ae40);
        if (_0x54a97b.RzCTG(_0x5acbd4.platformVoucherSource, "banner")) window.loadAutoOrderBanner(_0x5acbd4.platformVoucherBannerSlug)["catch"](_0x5817bc => _0x1d9aeb.error("Banner SS6: " + _0x5817bc.message));else {
          _0x54a97b.SSWVp(_0x458f3f);
          if (_0x54a97b.ADUjH(String, document.getElementById("setting-platform-voucher-input")?.["value"] || '').trim()) window.scanPlatformVoucherWallet?.(false, {
            'log': false
          });
        }
        _0x54a97b.PNpur(_0x2184a0);
      };
      const _0x14cc55 = async () => {
        _0x4d2c49.stopped = false;
        _0x59e2f9.qnAhK(_0xeba1ed);
        if (!_0xae0156) _0x5acbd4.platformVoucherBannerMode = "smart";
        _0x4d2c49.uiState = _0x59e2f9.JjpYQ(_0x5acbd4.platformVoucherBannerMode, "smart") ? "waiting" : "idle";
        _0x4d2c49.controller?.["abort"]();
        _0x4d2c49.controller = new AbortController();
        const _0x1c96ac = _0x4d2c49.controller.signal;
        let _0xd4688f = await window.loadAutoOrderBanner(_0x5acbd4.platformVoucherBannerSlug);
        if (!_0xd4688f) {
          if (!_0x5acbd4.isRunning || _0x4d2c49.stopped) throw new DOMException("Đã dừng SS6.", "AbortError");
          throw new Error("Không có dữ liệu banner để chạy SS6.");
        }
        _0x4d2c49.controller = new AbortController();
        const _0xdb5452 = _0x4d2c49.controller.signal;
        let _0xa6fcd = _0xd4688f.collections;
        if (_0x59e2f9.TlPQc(_0x5acbd4.platformVoucherBannerMode, "smart")) {
          const _0x46d302 = _0x59e2f9.DyNSF(Number, _0xd4688f.expireAt || 0),
            _0x27dfc0 = _0x59e2f9.bjCdi(_0x1d8321, _0x46d302);
          if (_0x27dfc0) {
            const _0x48bd33 = _0x59e2f9.rKMDS(_0x59e2f9.iWfVc(_0x46d302, 1000), 2000);
            _0x4d2c49.uiState = "waiting";
            _0x59e2f9.AtcwT(_0x43ae40);
            _0x1d9aeb.info("Smart Mode: Banner đổi lúc " + _0x59e2f9.sZpxX(_0x2d818f, _0x59e2f9.alWHs(_0x46d302, 1000)) + " | Bắt đầu quét lúc " + _0x59e2f9.peYLf(_0x2d818f, _0x48bd33) + '.');
            _0x59e2f9.wNHeX(_0x5c1eec, _0x48bd33);
            while (_0x5acbd4.isRunning && !_0x4d2c49.stopped && _0x59e2f9.KSOlW(Date.now(), _0x48bd33)) {
              _0x59e2f9.tdcrz(_0x5c1eec, _0x48bd33);
              await _0x59e2f9.pnnZe(_0x1f795e, Math.min(500, Math.max(20, _0x59e2f9.MXGrH(_0x48bd33, Date.now()))));
            }
            _0x59e2f9.rtWSm(_0xeba1ed);
            if (!_0x5acbd4.isRunning || _0x4d2c49.stopped) throw new DOMException("Đã dừng SS6.", "AbortError");
          } else _0x1d9aeb.info("Smart Mode: Banner không còn lịch thay đổi, bắt đầu quét ngay mỗi 3 giây.");
          _0x4d2c49.uiState = "scanning";
          _0x59e2f9.ltlIn(_0x43ae40);
          _0x1d9aeb.info("Smart Mode: Bắt đầu quét banner lúc " + _0x59e2f9.jtTYh(_0x2d818f, Date.now(), true) + '.');
          const _0x117622 = new Set(_0xd4688f.collections.map(_0x40d6aa => String(_0x40d6aa.collection_id))),
            _0x596719 = new Set(_0xd4688f.vouchers.map(_0x1a9e97 => _0x47fe84(_0x1a9e97.promotionid)).filter(Boolean));
          _0xa6fcd = [];
          for (let _0xf63fbb = 1; _0x59e2f9.pRSlJ(_0xf63fbb, _0x513910) && _0x5acbd4.isRunning && !_0x4d2c49.stopped; _0xf63fbb++) {
            const _0xff6cf5 = await _0x59e2f9.Dlemf(_0xd9d649, _0xd4688f.slug, _0xdb5452),
              _0x414c93 = _0x59e2f9.JLftq(_0x211dc8, _0xff6cf5),
              _0x4ee838 = _0x414c93.filter(_0x1c418e => !_0x117622.has(String(_0x1c418e.collection_id)));
            if (_0x4ee838.length) {
              _0xa6fcd = _0x4ee838;
              _0x1d9aeb.info("Phát hiện voucher mới: " + _0x4ee838.length + " list mới.");
              break;
            }
            if (!_0x27dfc0 || _0x59e2f9.VVzXu(Date.now(), _0x59e2f9.alWHs(_0x46d302, 1000))) {
              const _0x100610 = await _0x59e2f9.NypLX(_0x589aa1, _0x414c93, _0xdb5452),
                _0x15069b = new Set(_0x100610.filter(_0x163ceb => !_0x596719.has(_0x47fe84(_0x163ceb.promotionid))).map(_0x48bca2 => _0x48bca2.collectionId));
              if (_0x15069b.size) {
                _0xa6fcd = _0x414c93.filter(_0xab05a2 => _0x15069b.has(String(_0xab05a2.collection_id)));
                _0x1d9aeb.info("Phát hiện voucher mới trong " + _0xa6fcd.length + " list hiện có.");
                break;
              }
            }
            await _0x59e2f9.ZAkLC(_0x1f795e, _0x27dfc0 ? 240 : _0x42b554);
          }
          if (!_0xa6fcd.length) throw new Error("Không phát hiện voucher mới sau " + _0x513910 + " lần quét.");
        } else _0x1d9aeb.info("Test Mode: dùng voucher hiện có trên banner " + _0xd4688f.slug + '.');
        const _0x17bc46 = await _0x59e2f9.jtTYh(_0x558948, _0xa6fcd, _0xdb5452);
        if (!_0x5acbd4.isRunning || _0x4d2c49.stopped || !_0x59e2f9.wYfVK(_0x563a6d)) throw new DOMException("Đã dừng SS6.", "AbortError");
        _0x4d2c49.controller = null;
        _0x4d2c49.stopped = true;
        _0x4d2c49.uiState = "completed";
        _0x59e2f9.ERvYK(_0x43ae40);
        const _0x1e5edd = _0x59e2f9.Heqjk(typeof _0x17bc46?.["totalSaved"], "number") ? _0x17bc46.totalSaved : _0x17bc46.length;
        _0x1d9aeb.info("Lưu hoàn tất: " + _0x1e5edd + " voucher => Tổng " + _0x17bc46.length + " mã hợp lệ");
        if (!_0x17bc46.length) throw new Error("SS6 không trả về voucher Shopee hợp lệ (shop_id = 0, error 0/5, đủ promotionid và voucher_code).");
        return _0x5acbd4.platformVoucherQueue = _0x17bc46, _0x5acbd4.platformVoucherFromSS6 = true, _0x5acbd4.platformVoucherEnabled = true, _0x17bc46.forEach(_0x2c7d10), _0x59e2f9.nXoWF(_0x5411da, _0x17bc46[0], {
          'savedInWallet': true,
          'log': false
        }), _0x1d9aeb.success("Chuyển " + _0x17bc46.length + " voucher sang AutoOrder."), _0x17bc46;
      };
      window.tryRestoreShopVoucherValidationFromSession = async () => {
        const _0x5da8db = !!document.getElementById("setting-enable-shop-voucher")?.["checked"];
        if (!_0x5da8db) return;
        if (_0x5acbd4.shopVoucherAutoBestOutsideList) {
          _0x54a97b.tOAoF(_0x4fc00b, true, false);
          _0x54a97b.sYWPF(_0x6ceae1);
          return;
        }
        const _0x4a32c7 = document.getElementById("setting-shop-voucher-code");
        if (!_0x4a32c7) return;
        const _0x1b6563 = _0x54a97b.welQJ(_0x33c49a, _0x4a32c7.value);
        if (!_0x1b6563) {
          _0x54a97b.ZVqDq(_0x86e9cc, null);
          return;
        }
        _0x4a32c7.value = _0x1b6563;
        const _0x49e7e4 = _0x54a97b.SgMbi(_0x114f3b);
        if (!_0x49e7e4.hasProductContext) return;
        const _0x551bc2 = _0x54a97b.oycdh(_0x1ca816),
          _0x10b06b = _0x54a97b.eNqKh(_0x403a15, _0x49e7e4.shopId),
          _0x14fb1b = _0x54a97b.sOIkO(_0x4950e5, _0x49e7e4.shopId, _0x1b6563, _0x10b06b),
          _0x4a4451 = _0x551bc2[_0x14fb1b];
        _0x4a4451 && _0x4a4451.voucherCode && _0x4a4451.terms && (_0x5acbd4.shopVoucherData = _0x4a4451, (!_0x5acbd4.shopVoucherByShop || _0x54a97b.Eirts(typeof _0x5acbd4.shopVoucherByShop, "object")) && (_0x5acbd4.shopVoucherByShop = {}), _0x5acbd4.shopVoucherByShop[_0x54a97b.AmPIb(Number, _0x49e7e4.shopId)] = _0x4a4451, _0x54a97b.xXSZT(_0x86e9cc, _0x4a4451, false));
      };
      window.validateShopVoucherForAutoOrder = async (_0x506b1f = false) => {
        const _0x4efab7 = document.getElementById("setting-shop-voucher-code"),
          _0x185c96 = document.getElementById("setting-shop-voucher-validate-btn");
        if (!_0x4efab7) return;
        if (_0x5acbd4.shopVoucherAutoBestOutsideList) {
          _0x54a97b.saeih(_0x86e9cc, null);
          return;
        }
        const _0x1b5c1d = _0x54a97b.Aoitn(_0x33c49a, _0x4efab7.value);
        _0x4efab7.value = _0x1b5c1d;
        _0x54a97b.fuOjZ(_0x6ceae1);
        if (!_0x1b5c1d) {
          _0x54a97b.ydTNz(_0x86e9cc, null);
          return;
        }
        const _0x1630e1 = _0x54a97b.tqlxg(_0x114f3b);
        if (!_0x1630e1.hasProductContext) {
          _0x54a97b.nNvWu(_0x86e9cc, {
            'message': "Hãy bấm Kiểm tra sản phẩm và chọn phân loại trước khi xác minh voucher."
          }, true);
          return;
        }
        const _0x1536b1 = _0x54a97b.CuUQA(String, _0x1630e1.shopId),
          _0x4a4c17 = _0x54a97b.sYWPF(_0x1ca816),
          _0x68617e = _0x54a97b.cbcAG(_0x403a15, _0x1630e1.shopId),
          _0x3faa42 = _0x54a97b.sWxWA(_0x4950e5, _0x1630e1.shopId, _0x1b5c1d, _0x68617e),
          _0x1cca05 = _0x4a4c17[_0x3faa42];
        if (!_0x506b1f && _0x1cca05 && _0x54a97b.rYNDn(_0x54a97b.BzsKh(_0x33c49a, _0x1cca05.voucherCode), _0x1b5c1d)) {
          _0x5acbd4.shopVoucherCode = _0x1b5c1d;
          _0x5acbd4.shopVoucherData = _0x1cca05;
          (!_0x5acbd4.shopVoucherByShop || _0x54a97b.PGPcQ(typeof _0x5acbd4.shopVoucherByShop, "object")) && (_0x5acbd4.shopVoucherByShop = {});
          _0x5acbd4.shopVoucherByShop[_0x54a97b.Ghqcu(Number, _0x1630e1.shopId)] = _0x1cca05;
          _0x54a97b.xXSZT(_0x86e9cc, _0x1cca05, false);
          _0x1d9aeb.info("Dùng cache xác minh voucher " + _0x1b5c1d + " cho shop " + _0x1630e1.shopId + '.');
          return;
        }
        try {
          _0x185c96 && (_0x185c96.disabled = true, _0x185c96.textContent = "Đang xác minh...");
          const _0x4bfdb3 = await _0x54a97b.JUpaE(_0x319ef3, _0x1b5c1d, _0x1536b1),
            _0x1faa6f = Math.floor(_0x54a97b.jBvAl(Date.now(), 1000));
          let _0x1b0477 = 0,
            _0x5f556c = "Mã hợp lệ cho đơn hàng.",
            _0x3fd4b7 = false;
          const _0x2a58d8 = _0x54a97b.CPuVP(_0x54a97b.HAHRl(Number, _0x4bfdb3.start_time || 0), _0x1faa6f);
          if (_0x2a58d8) {
            _0x1b0477 = 6;
            _0x5f556c = _0x54a97b.gdZTw(_0x172bfe, _0x1b0477, _0x4bfdb3);
          } else {
            const _0x2e973f = _0x54a97b.FPhzW(_0x3e56c, _0x1b5c1d, _0x1630e1.shopId);
            if (!_0x2e973f) throw new Error("Không lấy được dữ liệu sản phẩm hiện tại để xác minh voucher.");
            const _0x16ce69 = _0x54a97b.iqBiI(_0x4d4c36),
              _0x2ef2ba = await _0x54a97b.FPhzW(fetch, "https://shopee.vn/api/v2/voucher_wallet/validate_shop_voucher_by_voucher_code", {
                'headers': {
                  'accept': "application/json",
                  'accept-language': "en-US,en;q=0.9,vi;q=0.8",
                  'content-type': "application/json",
                  'x-api-source': _0x54a97b.vuYCy(_0x4cbd05),
                  'x-csrftoken': _0x16ce69.csrf,
                  'x-requested-with': "XMLHttpRequest",
                  'x-shopee-language': 'vi'
                },
                'referrer': "https://shopee.vn/checkout",
                'body': JSON.stringify(_0x2e973f),
                'method': "POST",
                'mode': "cors",
                'credentials': "include"
              }),
              _0xe468de = await _0x2ef2ba.json();
            _0x54a97b.xXSZT(_0x2d1992, _0xe468de, "shop_voucher/validate");
            if (_0x54a97b.UypRi(_0xe468de?.["error"], 10013) && _0x54a97b.xmNzA(_0x54a97b.GuauG(Number, _0x4bfdb3.start_time || 0), _0x1faa6f)) {
              _0x1b0477 = 10013;
              _0x5f556c = "Vui lòng sử dụng trên app";
            } else {
              if (_0x54a97b.TzvuM(_0xe468de?.["error"], 10013) && !_0xe468de?.["data"]) {
                _0x1b0477 = 6;
                _0x5f556c = _0x54a97b.MXeip(_0x172bfe, _0x1b0477, _0x4bfdb3);
              } else {
                if (_0x54a97b.CRrMj(_0xe468de?.["error"], 0)) throw new Error(_0xe468de?.["error_msg"] || "Lỗi xác minh mã (" + (_0xe468de?.["error"] || "unknown") + ')');else {
                  const _0x10349e = _0xe468de?.["data"]?.["voucher"] || {},
                    _0x522c40 = _0x54a97b.QKwpI(Number, _0x10349e.invalid_message_code);
                  _0x1b0477 = Number.isFinite(_0x522c40) ? _0x522c40 : 0;
                  _0x5f556c = _0x54a97b.sOIkO(_0x172bfe, _0x1b0477, _0x10349e, _0x10349e?.["invalid_message"] || '');
                }
              }
            }
          }
          _0x3fd4b7 = !_0x14b168.has(_0x1b0477);
          const _0x49a01c = {
            'voucherCode': _0x1b5c1d,
            'shopId': _0x54a97b.pGnNz(String, _0x1536b1),
            'itemId': _0x1630e1.itemId,
            'modelId': _0x1630e1.modelId,
            'promotionid': _0x4bfdb3.promotionid,
            'signature': _0x4bfdb3.signature || '',
            'terms': _0x54a97b.tOdTk(_0x3322df, _0x4bfdb3),
            'percentageUsed': _0x54a97b.DqPnx(Number, _0x4bfdb3.percentage_used) || 0,
            'percentageClaimed': _0x54a97b.CwAjP(Number, _0x4bfdb3.percentage_claimed) || 0,
            'startTime': _0x54a97b.QKwpI(Number, _0x4bfdb3.start_time) || 0,
            'startTimeShow': _0x54a97b.HFbEQ(_0x33e297, _0x4bfdb3.start_time),
            'endTime': _0x54a97b.sbNHa(Number, _0x4bfdb3.end_time) || 0,
            'endTimeShow': _0x54a97b.vAPdA(_0x33e297, _0x4bfdb3.end_time),
            'iconHash': (() => {
              const _0x579105 = _0x4bfdb3.icon_hash || _0x4bfdb3.shop_logo || '';
              if (!_0x579105) return '';
              if (/^https?:\/\//i.test(_0x579105)) return _0x579105;
              return "https://down-vn.img.susercontent.com/file/" + _0x579105;
            })(),
            'iconText': _0x4bfdb3.icon_text || _0x4bfdb3.shop_name || '',
            'voucherLink': _0x1b5c1d && _0x4bfdb3.promotionid && _0x4bfdb3.signature ? "https://shopee.vn/search?voucherCode=" + _0x1b5c1d + "&promotionId=" + _0x4bfdb3.promotionid + "&signature=" + _0x4bfdb3.signature : '',
            'validationInvalidCode': _0x1b0477,
            'validationMessage': _0x5f556c,
            'validationSkipForCheckout': _0x3fd4b7,
            'validatedAt': Date.now()
          };
          _0x4a4c17[_0x3faa42] = _0x49a01c;
          _0x54a97b.HAHRl(_0x40f863, _0x4a4c17);
          _0x5acbd4.shopVoucherCode = _0x1b5c1d;
          _0x5acbd4.shopVoucherData = _0x49a01c;
          (!_0x5acbd4.shopVoucherByShop || _0x54a97b.GHLoJ(typeof _0x5acbd4.shopVoucherByShop, "object")) && (_0x5acbd4.shopVoucherByShop = {});
          _0x5acbd4.shopVoucherByShop[_0x54a97b.zvdDC(Number, _0x1630e1.shopId)] = _0x49a01c;
          _0x54a97b.LhfKt(_0x86e9cc, _0x49a01c, false);
          _0x1d9aeb.success("Đã xác minh voucher shop " + _0x1b5c1d + " thành công.");
          _0x49a01c.validationSkipForCheckout ? _0x1d9aeb.info("Voucher " + _0x1b5c1d + " không áp cho sản phẩm hiện tại - hệ thống sẽ bỏ qua mã này khi checkout.") : _0x1d9aeb.info("Xác minh: " + _0x49a01c.validationMessage);
        } catch (_0x4ba2e2) {
          _0x54a97b.LMEMM(_0x86e9cc, {
            'message': '' + _0x4ba2e2.message
          }, true);
          _0x1d9aeb.error("Xác minh voucher shop lỗi: " + _0x4ba2e2.message);
        } finally {
          _0x185c96 && (_0x185c96.disabled = false, _0x185c96.textContent = "Xác minh");
        }
      };
      const _0x1e1a52 = "shopee-autobuy-modal-overlay";
      if (document.getElementById(_0x1e1a52)) document.getElementById(_0x1e1a52).remove();
      const _0x40c0e1 = document.createElement("div");
      _0x40c0e1.id = _0x1e1a52;
      _0x40c0e1.dataset.autoOrderSessionId = _0x2987c4.id;
      _0x40c0e1.innerHTML = "\n                <div class=\"autobuy-modal-backdrop\">\n                    <div class=\"autobuy-modal-container\">\n                        <div class=\"autobuy-modal-header\">\n                            <h2 id=\"autobuy-mode-title\" onclick=\"toggleAutoBuyMode()\" style=\"cursor:pointer;\"><i class=\"fas fa-shopping-cart\"></i> Check kho tự động</h2>\n                            <div class=\"autobuy-header-actions\">\n                                <button class=\"autobuy-header-icon-btn\" id=\"autobuy-pip-btn\" onclick=\"openAutoBuyPiP()\" title=\"Mở log trong PiP\"><i class=\"fas fa-desktop\"></i></button>\n                                <button class=\"autobuy-header-icon-btn\" id=\"autobuy-toggle-log-btn\" onclick=\"toggleAutoBuyLogSection()\" title=\"Ẩn log\"><i class=\"fas fa-eye\"></i></button>\n                                <button class=\"autobuy-close-btn\" onclick=\"closeAutoBuyModal()\">×</button>\n                            </div>\n                        </div>\n                        \n                        <div class=\"autobuy-modal-body\">\n                            <div class=\"autobuy-input-section\">\n                                <div class=\"autobuy-source-tabs\">\n                                    <button class=\"autobuy-source-tab active\" id=\"autobuy-source-tab-cart\" onclick=\"switchAutoBuyInputTab('cart')\">\n                                        <i class=\"fas fa-shopping-cart\"></i> Giỏ hàng\n                                    </button>\n                                    <button class=\"autobuy-source-tab\" id=\"autobuy-source-tab-url\" onclick=\"switchAutoBuyInputTab('url')\">\n                                        <i class=\"fas fa-link\"></i> Dán link\n                                    </button>\n                                    <button class=\"autobuy-source-tab\" id=\"autobuy-source-tab-order\" onclick=\"switchAutoBuyInputTab('order')\">\n                                        <i class=\"fas fa-list\"></i> Đơn hàng\n                                        <span id=\"autobuy-order-badge\" class=\"autobuy-order-badge\">0</span>\n                                    </button>\n                                </div>\n\n                                <div id=\"autobuy-cart-pane\" class=\"autobuy-source-pane active\">\n                                    <div id=\"autobuy-cart-list\" class=\"autobuy-cart-list\">\n                                        <div class=\"autobuy-cart-empty\">Đang tải giỏ hàng...</div>\n                                    </div>\n                                    <button class=\"autobuy-load-more-btn\" id=\"autobuy-cart-load-more-btn\" onclick=\"loadMoreAutoBuyCartShops()\" style=\"display:none;\">⟳ Tải thêm sản phẩm</button>\n                                </div>\n\n                                <div id=\"autobuy-url-pane\" class=\"autobuy-source-pane\">\n                                    <div class=\"autobuy-input-group\">\n                                        <input type=\"text\" id=\"autobuy-url-input\" placeholder=\"Nhập URL sản phẩm Shopee...\" autocomplete=\"off\">\n                                        <button class=\"autobuy-clear-btn\" onclick=\"clearAutoBuyInput()\" title=\"Xóa\">×</button>\n                                    </div>\n                                    <div class=\"autobuy-action-buttons\">\n                                        <button class=\"autobuy-btn secondary\" onclick=\"pasteFromClipboardAutoBuy()\">Dán Link</button>\n                                        <button class=\"autobuy-btn primary\" onclick=\"startCheckProduct()\">Kiểm tra</button>\n                                    </div>\n                                    <div id=\"autobuy-content\" class=\"autobuy-content-area\">\n                                        <div class=\"autobuy-empty-state\">\n                                            <h3>Sẵn sàng kiểm tra link</h3>\n                                            <p>Nhập URL và nhấn kiểm tra. Kết quả sẽ thêm vào log.</p>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div id=\"autobuy-order-pane\" class=\"autobuy-source-pane\">\n                                    <div class=\"order-items-panel\">\n                                        <div class=\"order-items-header\">\n                                            <div class=\"order-items-title\">Danh sách sản phẩm đơn</div>\n                                            <div class=\"order-items-count\" id=\"order-items-count\">0/" + _0x4f90cc + "</div>\n                                        </div>\n                                        <div id=\"order-items-list\"></div>\n                                        <div class=\"autobuy-order-actions\">\n                                            <button class=\"btn-advanced\" id=\"btn-advanced\" onclick=\"openAdvancedSettings()\">⚙️ Nâng cao</button>\n                                            <button class=\"btn-start-autobuy\" id=\"btn-start-autobuy\" onclick=\"startAutoBuyProcess()\">▶ Bắt đầu</button>\n                                            <button class=\"btn-stop-autobuy\" id=\"btn-stop-autobuy\" onclick=\"stopAutoBuyProcess()\" style=\"display: none;\">⏹ Dừng</button>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div id=\"autobuy-voucher-pane\" class=\"autobuy-source-pane\">\n                                    <div class=\"voucher-auto-panel\">\n                                        " + (_0x479f81 ? "<div class=\"voucher-auto-test-warning\">⚠ TEST MODE<br>Voucher hiện có sẽ được coi là voucher mới. Nếu Rule phù hợp, hệ thống CÓ THỂ ĐẶT ĐƠN THẬT.</div>" : '') + "\n                                        <div class=\"autobuy-input-group\">\n                                            <input type=\"text\" id=\"voucher-auto-shop-input\" placeholder=\"Link shop trên Shopee\" autocomplete=\"off\">\n                                            <button class=\"autobuy-clear-btn\" onclick=\"document.getElementById('voucher-auto-shop-input').value=''\" title=\"Xóa\">×</button>\n                                        </div>\n                                        <div class=\"autobuy-action-buttons\">\n                                            <button class=\"autobuy-btn secondary\" onclick=\"pasteVoucherAutoShopFromClipboard()\">Dán Link</button>\n                                            <button class=\"autobuy-btn primary\" onclick=\"resolveVoucherAutoShopFromUi()\">Lấy dữ liệu</button>\n                                        </div>\n                                        <div id=\"voucher-auto-shop-card\" class=\"voucher-auto-shop-card\" style=\"display:none;\"></div>\n                                        <div class=\"voucher-auto-rule-card\">\n                                            <div class=\"order-items-title\">ĐIỀU KIỆN VOUCHER</div>\n                                            <div class=\"voucher-auto-rule-note\">Đơn vị: đ. Đừng nhầm lẫn nghìn đồng!</div>\n                                            <div id=\"voucher-auto-rules\">\n                                                <div class=\"voucher-auto-rule-row\" data-rule-id=\"rule-1\">\n                                                    <div class=\"voucher-auto-rule-grid\">\n                                                        <label>Giá giảm tối thiểu (đ)<input type=\"number\" class=\"voucher-auto-rule-discount\" id=\"voucher-auto-rule-discount\" value=\"0\" min=\"0\" step=\"1000\"></label>\n                                                        <label>% giảm tối thiểu<input type=\"number\" class=\"voucher-auto-rule-percent\" id=\"voucher-auto-rule-percent\" value=\"0\" min=\"0\" max=\"100\" step=\"1\"></label>\n                                                        <label>Đơn tối thiểu từ (đ)<input type=\"number\" class=\"voucher-auto-rule-minspend\" id=\"voucher-auto-rule-minspend\" value=\"0\" min=\"0\" step=\"1000\"></label>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"autobuy-order-actions\">\n                                            <button class=\"btn-advanced\" id=\"voucher-btn-advanced\" onclick=\"openVoucherAutoSettings()\">⚙️ Cài đặt</button>\n                                            <button class=\"btn-start-autobuy\" id=\"voucher-btn-start\" onclick=\"startVoucherAutoProcess()\">▶ BẮT ĐẦU</button>\n                                            <button class=\"btn-stop-autobuy\" id=\"voucher-btn-stop\" onclick=\"stopAutoBuyProcess()\" style=\"display:none;\">⏹ Dừng</button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div id=\"autobuy-log-section\" class=\"autobuy-log-section\" style=\"display: flex;\">\n                                <div class=\"autobuy-log-header\">\n                                    <span>Nhật ký hoạt động</span>\n                                    <span class=\"autobuy-log-actions\">\n                                        <button class=\"autobuy-log-icon-btn\" type=\"button\" onclick=\"copyLogs()\" title=\"Copy log\">📋</button>\n                                        <button class=\"autobuy-log-icon-btn\" type=\"button\" onclick=\"toggleAutoBuyLogSection()\" title=\"Ẩn log\"><i class=\"fas fa-eye-slash\"></i></button>\n                                    </span>\n                                </div>\n                                <div id=\"autobuy-log-container\" class=\"autobuy-log-container\"></div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div id=\"autobuy-image-preview-modal\" class=\"autobuy-image-preview-modal\" style=\"display:none;\" onclick=\"closeAutoBuyImagePreview(event)\">\n                    <div class=\"autobuy-image-preview-content\">\n                        <button class=\"autobuy-image-preview-close\" type=\"button\" onclick=\"closeAutoBuyImagePreview(event)\">×</button>\n                        <img id=\"autobuy-image-preview-img\" class=\"autobuy-image-preview-img\" src=\"\" alt=\"\">\n                    </div>\n                </div>\n                \n                <!-- Advanced Settings Modal -->\n                <div id=\"advanced-settings-modal\" class=\"advanced-modal\" style=\"display: none;\">\n                    <div class=\"advanced-modal-content\">\n                        <div class=\"advanced-modal-header\">\n                            <h3 style=\"display:flex;align-items:center;gap:8px;\">⚙️ Cài đặt nâng cao <button type=\"button\" class=\"advanced-help-icon-btn\" onclick=\"openAdvancedSettingsHelpModal()\" title=\"Giải thích cài đặt\">?</button></h3>\n                            <button class=\"advanced-close-btn\" onclick=\"closeAdvancedSettings()\">×</button>\n                        </div>\n\n                        <!-- 2 Tab Bar -->\n                        <div class=\"advanced-tab-navigation\">\n                            <button type=\"button\" class=\"advanced-tab-btn active\" id=\"adv-tab-btn-order\" onclick=\"switchAdvancedTab('order')\">\n                                🛒 Đơn hàng\n                            </button>\n                            <button type=\"button\" class=\"advanced-tab-btn\" id=\"adv-tab-btn-config\" onclick=\"switchAdvancedTab('config')\">\n                                ⚙️ Cấu hình\n                            </button>\n                        </div>\n\n                        <div class=\"advanced-modal-body\">\n                            <!-- TAB 1: ĐƠN HÀNG -->\n                            <div id=\"adv-tab-pane-order\" class=\"advanced-tab-pane\">\n                                <!-- Mã giảm giá hiện tại -->\n                                <div class=\"setting-section-header\" id=\"voucher-settings-section-header\" style=\"" + (_0xd28b33 || _0x1ecce3 ? '' : "display: none;") + "\">\n                                    <span class=\"setting-section-icon\">🎟️</span>\n                                    <span class=\"setting-section-title\">Mã giảm giá hiện tại</span>\n                                </div>\n\n                                <div class=\"setting-group setting-card-block\" style=\"" + (_0xd28b33 ? '' : "display: none;") + "\">\n                                    <label class=\"setting-checkbox\">\n                                        <input type=\"checkbox\" id=\"setting-enable-shop-voucher\" onchange=\"toggleShopVoucherInput()\">\n                                        <span class=\"checkmark\"></span>\n                                        <div class=\"setting-checkbox-content\">\n                                            <span class=\"setting-title\">Voucher Shop</span>\n                                            <span class=\"setting-desc\">Nhập hoặc chọn mã voucher shop để áp dụng vào đơn.<br><small style=\"color:#ee4d2d;font-weight:600;\">Tự áp tốt nhất: Mã chưa hiển thị + Hẹn giờ thực thi phút 59:56.</small></span>\n                                        </div>\n                                    </label>\n                                    <div id=\"shop-voucher-inputs\" class=\"schedule-inputs\" style=\"display: none;\">\n                                        <div class=\"voucher-shop-picker-row\">\n                                            <select id=\"setting-shop-voucher-shop-select\" class=\"setting-input voucher-shop-select\" onchange=\"handleShopVoucherShopChange(this)\">\n                                                <option value=\"0\">Chọn shop cần nhập voucher...</option>\n                                            </select>\n                                        </div>\n                                        <div class=\"voucher-shop-input-row\">\n                                            <button type=\"button\" class=\"voucher-shop-paste-btn\" id=\"setting-shop-voucher-paste-btn\" title=\"Dán mã từ clipboard\" onclick=\"pasteShopVoucherCodeFromClipboard()\">📋</button>\n                                            <input type=\"text\" id=\"setting-shop-voucher-code\" class=\"setting-input\" placeholder=\"Nhập mã voucher shop...\" oninput=\"normalizeShopVoucherInput(this)\" onblur=\"handleShopVoucherInputBlur(this)\" onkeydown=\"handleShopVoucherInputKeyDown(event)\">\n                                            <button type=\"button\" class=\"voucher-shop-validate-btn\" id=\"setting-shop-voucher-validate-btn\" onclick=\"validateShopVoucherForAutoOrder(true)\">Xác minh</button>\n                                        </div>\n                                        <div class=\"voucher-shop-picker-row\">\n                                            <select id=\"setting-shop-voucher-select\" class=\"setting-input voucher-shop-select\" onchange=\"handleShopVoucherPickerChange(this)\">\n                                                <option value=\"\">Chọn mã voucher có sẵn từ shop...</option>\n                                                <option value=\"__AUTO_BEST_OUTSIDE_LIST__\">Tự động áp dụng mã tốt nhất ngoài list</option>\n                                            </select>\n                                            <div id=\"shop-voucher-picker-status\" class=\"voucher-shop-picker-status\">Danh sách mã sẽ tự tải sau khi kiểm tra sản phẩm.</div>\n                                        </div>\n                                        <div id=\"shop-voucher-validate-result\" class=\"voucher-shop-result\" style=\"display: none;\"></div>\n                                    </div>\n                                </div>\n\n                                <div class=\"setting-group setting-card-block\" id=\"shopee-voucher-setting-group\" style=\"" + (_0x5acbd4.always_show_voucher_shopee || _0x1ecce3 && window.shopeeVoucherUnlocked ? '' : "display: none;") + "\">\n                                    <label class=\"setting-checkbox\">\n                                        <input type=\"checkbox\" id=\"setting-enable-platform-voucher\" onchange=\"togglePlatformVoucherInput()\">\n                                        <span class=\"checkmark\"></span>\n                                        <div class=\"setting-checkbox-content\">\n                                            <span class=\"setting-title\">Voucher Shopee</span>\n                                            <span class=\"setting-desc\">Nhập link hoặc tên voucher Shopee. Hệ thống tự kiểm tra ví, nếu chưa lưu sẽ lưu mã trước khi đặt.</span>\n                                        </div>\n                                    </label>\n                                    <div id=\"platform-voucher-inputs\" class=\"schedule-inputs\" style=\"display: none;\">\n                                        <div style=\"display:flex;flex-direction:column;gap:10px;\">\n                                            <select id=\"setting-platform-voucher-source\" class=\"setting-input\" onchange=\"handlePlatformVoucherSourceChange(this)\">\n                                                <option value=\"wallet\">Nhập mã / link voucher</option>\n                                                <option value=\"banner\">Lấy voucher từ banner</option>\n                                            </select>\n                                            <div id=\"platform-voucher-wallet-panel\">\n                                                <div class=\"platform-voucher-input-row\">\n                                                    <input type=\"text\" id=\"setting-platform-voucher-input\" class=\"setting-input\" placeholder=\"Đang tải dữ liệu...\" autocomplete=\"off\" aria-autocomplete=\"list\" aria-controls=\"platform-voucher-autocomplete\" disabled oninput=\"handlePlatformVoucherInputChange(this)\">\n                                                    <button type=\"button\" class=\"platform-voucher-paste-btn\" id=\"setting-platform-voucher-paste-btn\" title=\"Dán mã hoặc link từ clipboard\" aria-label=\"Dán mã hoặc link voucher Shopee\" onclick=\"pastePlatformVoucherFromClipboard()\" disabled>📋</button>\n                                                </div>\n                                                <div id=\"platform-voucher-status\" class=\"platform-voucher-status\" style=\"display:block;\">Đang tải dữ liệu...</div>\n                                            </div>\n                                            <div id=\"platform-voucher-banner-panel\" style=\"display:none;flex-direction:column;gap:8px;\">\n                                                <select id=\"setting-platform-banner-slug\" class=\"setting-input\" onchange=\"loadAutoOrderBanner(this.value)\">\n                                                    <option value=\"kol-affiliate\">kol-affiliate</option>\n                                                    <option value=\"goi-ShopeeVIP\">goi-ShopeeVIP</option>\n                                                    <option value=\"YouTube-Shopping-Voucher\">Youtube</option>\n                                                    <option value=\"shopee-mart\">shopee-mart</option>\n                                                    <option value=\"USIZQ226\">USIZQ226</option>\n                                                    <option value=\"sandealquocte\">sandealquocte</option>\n                                                    <option value=\"sieuhoihanquoc\">sieuhoihanquoc</option>\n                                                    <option value=\"VoucherXtra\">VoucherXtra</option>\n                                                    <option value=\"ma-giam-gia\">ma-giam-gia</option>\n                                                </select>\n                                                <div id=\"platform-banner-mode-selector\" style=\"" + (_0xae0156 ? "display:flex;" : "display:none;") + "flex-direction:column;gap:8px;\">\n                                                    <label style=\"display:flex;gap:7px;align-items:flex-start;\"><input type=\"radio\" name=\"platform-banner-mode\" value=\"smart\" checked onchange=\"handlePlatformBannerModeChange(this.value)\"><span><b>Lưu mới — Tự động thông minh</b><br><small>Chờ banner thay đổi, lưu mã mới rồi đặt hàng ngay.</small></span></label>\n                                                    <label style=\"display:flex;gap:7px;align-items:flex-start;\"><input type=\"radio\" name=\"platform-banner-mode\" value=\"test\" onchange=\"handlePlatformBannerModeChange(this.value)\"><span><b>Test Mode — Dùng mã hiện có trên banner</b><br><small>Lưu thật và đặt hàng thật; có thể dùng hẹn giờ hiện tại.</small></span></label>\n                                                </div>\n                                                <div id=\"platform-banner-status\" class=\"platform-voucher-status loading\" style=\"display:none;\"></div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <!-- Điều kiện đặt hàng -->\n                                <div class=\"setting-section-header\">\n                                    <span class=\"setting-section-icon\">🎯</span>\n                                    <span class=\"setting-section-title\">Điều kiện đặt hàng</span>\n                                </div>\n\n                                <div class=\"setting-group setting-card-block\">\n                                    <label class=\"setting-checkbox\">\n                                        <input type=\"checkbox\" id=\"setting-wait-price\" onchange=\"togglePriceCheckModeOptions()\">\n                                        <span class=\"checkmark\"></span>\n                                        <div class=\"setting-checkbox-content\">\n                                            <span class=\"setting-title\">Đặt khi giá thay đổi</span>\n                                            <span class=\"setting-desc\">Chỉ đặt đơn khi giá phân loại giảm so với giá hiện tại.</span>\n                                        </div>\n                                    </label>\n                                    <div id=\"price-check-mode-options\" class=\"schedule-inputs\" style=\"display: none; margin-top: 8px;\">\n                                        <label class=\"price-check-option\" style=\"display:flex;align-items:flex-start;gap:8px;padding:8px 0;\">\n                                            <input type=\"radio\" name=\"price-check-mode\" id=\"price-check-checkout\" value=\"checkout\" checked>\n                                            <span>\n                                                <span class=\"setting-title\">Kiểm tra theo checkout</span>\n                                                <span class=\"setting-desc\">🤔 Có thể delay tới 1-2s. Áp dụng tốt nhất nếu kho đang HẾT HÀNG.</span>\n                                            </span>\n                                        </label>\n                                        <label class=\"price-check-option\" style=\"display:flex;align-items:flex-start;gap:8px;padding:8px 0;\">\n                                            <input type=\"radio\" name=\"price-check-mode\" id=\"price-check-cart\" value=\"cart\">\n                                            <span>\n                                                <span class=\"setting-title\">Kiểm tra theo giỏ hàng</span>\n                                                <span class=\"setting-desc\">✅ Sản phẩm cần chắc chắn phải có trong giỏ user và phải trong top 3 shop trên cùng. Đổi số lượng trong giỏ trên app hoặc thêm sản phẩm bất kì từ shop để sản phẩm đổi vị trí.</span>\n                                            </span>\n                                        </label>\n                                        <label class=\"price-check-option\" style=\"display:flex;align-items:flex-start;gap:8px;padding:8px 0;\">\n                                            <input type=\"radio\" name=\"price-check-mode\" id=\"price-check-product\" value=\"product\">\n                                            <span>\n                                                <span class=\"setting-title\">Kiểm tra theo dữ liệu sản phẩm</span>\n                                                <span class=\"setting-desc\">⚠️ Sẽ bị dính error sau 5-10 lần. Chỉ dùng với chế độ hẹn giờ phút 59 giây 59. Không khuyên dùng.</span>\n                                            </span>\n                                        </label>\n                                    </div>\n                                </div>\n\n                                <div class=\"setting-group setting-card-block\">\n                                    <label class=\"setting-checkbox\">\n                                        <input type=\"checkbox\" id=\"setting-use-coins\">\n                                        <span class=\"checkmark\"></span>\n                                        <div class=\"setting-checkbox-content\">\n                                            <span class=\"setting-title\">Sử dụng xu</span>\n                                            <span class=\"setting-desc\">Dùng Shopee Xu để giảm trực tiếp vào đơn hàng.</span>\n                                        </div>\n                                    </label>\n                                </div>\n                                \n                                <div class=\"setting-group\" style=\"display: none;\">\n                                    <label class=\"setting-checkbox\">\n                                        <input type=\"checkbox\" id=\"setting-skip-cart\" checked>\n                                        <span class=\"checkmark\"></span>\n                                        <div>\n                                            <span class=\"setting-title\">Sản phẩm đã có trong giỏ</span>\n                                            <span class=\"setting-desc\">Bỏ qua bước thêm giỏ, chuyển thẳng tới checkout và đặt đơn.</span>\n                                        </div>\n                                    </label>\n                                </div>\n\n                                <!-- Hẹn giờ thực thi -->\n                                <div class=\"setting-section-header\" id=\"autobuy-schedule-section-header\">\n                                    <span class=\"setting-section-icon\">⏰</span>\n                                    <span class=\"setting-section-title\">Hẹn giờ thực thi</span>\n                                </div>\n                                \n                                <div class=\"setting-group setting-card-block\" id=\"autobuy-schedule-setting-group\">\n                                    <label class=\"setting-checkbox\">\n                                        <input type=\"checkbox\" id=\"setting-use-schedule\" onchange=\"toggleScheduleInputs()\">\n                                        <span class=\"checkmark\"></span>\n                                        <div class=\"setting-checkbox-content\">\n                                            <span class=\"setting-title\">Hẹn giờ thực thi</span>\n                                            <span class=\"setting-desc\">Tự động bắt đầu vào thời gian đã định.</span>\n                                        </div>\n                                    </label>\n                                    <div id=\"schedule-inputs\" class=\"schedule-inputs\" style=\"display: none;\">\n                                        <div class=\"time-picker\">\n                                            <div class=\"time-field\">\n                                                <label>Giờ</label>\n                                                <input type=\"number\" id=\"schedule-hour\" min=\"0\" max=\"23\" value=\"" + new Date().getHours() + "\">\n                                            </div>\n                                            <span class=\"time-sep\">:</span>\n                                            <div class=\"time-field\">\n                                                <label>Phút</label>\n                                                <input type=\"number\" id=\"schedule-minute\" min=\"0\" max=\"59\" value=\"59\">\n                                            </div>\n                                            <span class=\"time-sep\">:</span>\n                                            <div class=\"time-field\">\n                                                <label>Giây</label>\n                                                <input type=\"number\" id=\"schedule-second\" min=\"0\" max=\"59\" value=\"58\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <!-- Phương thức thanh toán -->\n                                <div class=\"setting-section-header\">\n                                    <span class=\"setting-section-icon\">💳</span>\n                                    <span class=\"setting-section-title\">Phương thức thanh toán</span>\n                                </div>\n\n                                <div class=\"setting-group setting-card-block\">\n                                    <label class=\"setting-title\" style=\"margin-bottom: 6px;\">Phương thức thanh toán mặc định</label>\n                                    <div class=\"payment-select-container\">\n                                        <div class=\"payment-select-trigger\" onclick=\"togglePaymentDropdown(event)\">\n                                            <span class=\"payment-select-trigger-text\">Chọn hình thức thanh toán</span>\n                                            <span class=\"payment-select-arrow\">▼</span>\n                                        </div>\n                                        <div class=\"payment-options-dropdown\" id=\"payment-options-dropdown\" style=\"display: none;\">\n                                            <!-- Custom options rendered here -->\n                                        </div>\n                                    </div>\n                                    <select id=\"setting-payment-method\" style=\"display:none;\" onchange=\"handlePaymentMethodChange(this)\"></select>\n                                    <div id=\"payment-method-info\" class=\"payment-method-info\" style=\"display:none;\"></div>\n                                </div>\n                            </div>\n\n                            <!-- TAB 2: CẤU HÌNH -->\n                            <div id=\"adv-tab-pane-config\" class=\"advanced-tab-pane\" style=\"display: none;\">\n                                <!-- Tốc độ & Số lần thử -->\n                                <div class=\"setting-section-header\">\n                                    <span class=\"setting-section-icon\">⚡</span>\n                                    <span class=\"setting-section-title\">Tốc độ & Số lần thử</span>\n                                </div>\n                                <div class=\"setting-grid-3\">\n                                    <div class=\"setting-group setting-card-field\">\n                                        <label class=\"setting-label\">\n                                            <span class=\"setting-title\">Delay check</span>\n                                            <span class=\"setting-badge\">ms</span>\n                                        </label>\n                                        <input type=\"number\" id=\"setting-delay\" class=\"setting-input\" value=\"200\" min=\"50\" max=\"3600000\" step=\"50\">\n                                        <span class=\"setting-desc\">Nghỉ giữa các lệnh (1000ms = 1s)</span>\n                                    </div>\n\n                                    <div class=\"setting-group setting-card-field\">\n                                        <label class=\"setting-label\">\n                                            <div class=\"setting-title-row\">\n                                                <span class=\"setting-title\">Thử thêm giỏ</span>\n                                                <span class=\"info-icon\" onclick=\"toggleMaxRetriesHelp()\" title=\"Xem hướng dẫn\">i</span>\n                                            </div>\n                                            <span class=\"setting-badge\">lần</span>\n                                        </label>\n                                        <input type=\"number\" id=\"setting-max-retries\" class=\"setting-input\" value=\"100\" min=\"1\" step=\"1\">\n                                        <span class=\"setting-desc\">Dùng canh back kho dài hạn</span>\n                                    </div>\n\n                                    <div class=\"setting-group setting-card-field\">\n                                        <label class=\"setting-label\">\n                                            <span class=\"setting-title\">Thử đặt lại</span>\n                                            <span class=\"setting-badge\">lần</span>\n                                        </label>\n                                        <input type=\"number\" id=\"setting-post-cart-retries\" class=\"setting-input\" value=\"80\" min=\"3\" max=\"333\" step=\"1\">\n                                        <span class=\"setting-desc\">Khi lỗi, hết kho, chưa đổi giá</span>\n                                    </div>\n                                </div>\n                                <div id=\"max-retries-help\" class=\"setting-help\" style=\"display: none;\">\n                                    <div style=\"font-weight: 700; margin-bottom: 6px;\">Dành cho ai spam canh back kho & dùng máy tính:</div>\n                                    <ul style=\"margin: 0; padding-left: 18px;\">\n                                        <li>Chỉnh lượt thử tùy ý. Set bao nhiêu cũng được. Tự tính toán cho cá nhân.</li>\n                                        <li>Delay check chỉnh lên 20s - 60s (tương ứng 20.000ms - 60.000ms) 1 lần tránh spam liên tục tới server dẫn tới hạn chế tài khoản.</li>\n                                        <li>Ví dụ mỗi 20 giây check giỏ 1 lần, lượt thử 2200 lần =&gt; Tổng 12h.</li>\n                                        <li>Tính năng này chỉ thêm giỏ chứ không cho việc đặt đơn. Đặt đơn không cần thêm giỏ.</li>\n                                    </ul>\n                                </div>\n\n                                <!-- Chỉ thêm giỏ, không đặt hàng -->\n                                <div class=\"setting-section-header\">\n                                    <span class=\"setting-section-icon\">🛒</span>\n                                    <span class=\"setting-section-title\">Chế độ giỏ hàng</span>\n                                </div>\n\n                                <div class=\"setting-group setting-card-block\">\n                                    <label class=\"setting-checkbox\">\n                                        <input type=\"checkbox\" id=\"setting-only-add-to-cart\" onchange=\"toggleOnlyAddToCartOption()\">\n                                        <span class=\"checkmark\"></span>\n                                        <div class=\"setting-checkbox-content\">\n                                            <span class=\"setting-title\">Chỉ thêm giỏ. Không đặt hàng</span>\n                                            <span class=\"setting-desc\">Chỉ thêm giỏ theo delay hiện tại. Thành công là dừng.</span>\n                                        </div>\n                                    </label>\n                                </div>\n\n                                <!-- Thông báo -->\n                                <div class=\"setting-section-header\">\n                                    <span class=\"setting-section-icon\">🔔</span>\n                                    <span class=\"setting-section-title\">Thông báo</span>\n                                </div>\n\n                                <div class=\"setting-group setting-card-block\">\n                                    <label class=\"setting-checkbox\">\n                                        <input type=\"checkbox\" id=\"setting-enable-telegram\" onchange=\"toggleTelegramInputs()\">\n                                        <span class=\"checkmark\"></span>\n                                        <div class=\"setting-checkbox-content\">\n                                            <span class=\"setting-title\">Thông báo Telegram khi thành công</span>\n                                            <span class=\"setting-desc\">Bật để gửi tự động vào bot Telegram.</span>\n                                        </div>\n                                    </label>\n                                    <div id=\"telegram-inputs\" class=\"schedule-inputs\" style=\"display: none;\">\n                                        <div style=\"display:flex;flex-direction:column;gap:8px;\">\n                                            <input type=\"text\" id=\"setting-telegram-token\" class=\"setting-input\" placeholder=\"Bot Token (vd: 123456:ABC...)\">\n                                            <input type=\"text\" id=\"setting-telegram-chatid\" class=\"setting-input\" placeholder=\"Chat ID / Channel ID (vd: -100xxxxxxxxxx)\">\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class=\"setting-group setting-card-block\">\n                                    <label class=\"setting-checkbox\">\n                                        <input type=\"checkbox\" id=\"setting-enable-browser-notification\" onchange=\"toggleBrowserNotification(this)\">\n                                        <span class=\"checkmark\"></span>\n                                        <div class=\"setting-checkbox-content\">\n                                            <span class=\"setting-title\">Thông báo trình duyệt khi thành công</span>\n                                            <span class=\"setting-desc\">Gửi thông báo Windows / Trình duyệt khi đặt đơn thành công.</span>\n                                        </div>\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"advanced-modal-footer\">\n                            <button class=\"btn-save-settings\" onclick=\"saveAdvancedSettings()\">Lưu cài đặt</button>\n                        </div>\n                    </div>\n                </div>\n<div id=\"advanced-settings-help-modal\" class=\"advanced-help-modal\" style=\"display:none;\" onclick=\"closeAdvancedSettingsHelpModal(event)\">\n                    <div class=\"advanced-help-modal-content\" onclick=\"event.stopPropagation()\">\n                        <div class=\"advanced-help-modal-header\">\n                            <h3>Hướng dẫn cài đặt nâng cao</h3>\n                            <button class=\"advanced-close-btn\" onclick=\"closeAdvancedSettingsHelpModal(event)\">×</button>\n                        </div>\n                        <div class=\"advanced-help-modal-body\">\n                            <div class=\"advanced-help-item\"><strong>⚠️</strong> Lạm dụng có thể dẫn tới hạn chế tài khoản. Cân nhắc kĩ khi sử dụng.</div>\n                            <div class=\"advanced-help-item\" id=\"delay-help-item\" onclick=\"handleDelayHelpClick(event)\" style=\"cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 8px;\">\n                                <span><strong>🔰 Delay:</strong> Thời gian giữa các lệnh gửi. Set càng cao thì càng khó bị đánh spam. Set càng thấp kết hợp hẹn thời gian canh sale sẽ tối ưu nhất khi săn sale. Không nên set dưới 150ms.</span>\n                                <svg class=\"checkmark-icon-svg\" style=\"display: none; fill: #52c41a; width: 16px; height: 16px; flex-shrink: 0;\" viewBox=\"0 0 24 24\"><path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/></svg>\n                            </div>\n                            <div class=\"advanced-help-item\"><strong>🔰 Số lần thử:</strong> Tổng các lần kiểm tra theo điều kiện (voucher, đổi giá, back kho) trước khi dừng.</div>\n                            <div class=\"advanced-help-item\"><strong>🔰 Số lần thử đặt lại:</strong> Tổng các lần thử đặt đơn lại trước khi dừng. Khác với bên trên vì cái này là bước cuối đặt đơn. Còn trên là lấy thông tin đơn.</div>\n                            <div class=\"advanced-help-item\"><strong>🔰 Đặt khi giá thay đổi:</strong> Như tên, bao giờ đổi giá thì đơn mới đc tiến hành đặt hàng. Nếu canh back kho thì nên dùng \"Kiểm tra theo checkout\". Nếu săn sale thì nên dùng \"Kiểm tra theo giỏ hàng\".</div>\n                            <div class=\"advanced-help-item\"><strong>🔰 Kiểm tra theo checkout:</strong> Là kiểm tra theo thông tin đơn hàng, giá thay đổi thì đặt đơn.</div>\n                            <div class=\"advanced-help-item\"><strong>🔰 Kiểm tra theo giỏ hàng:</strong> Là kiểm tra theo thông tin trong giỏ hàng của user. Chỉ áp dụng top 3 shop đầu tiên trong giỏ. Thay đổi số lượng hoặc thêm giỏ sản phẩm khác của shop để shop đó được lên top trên. Nhanh nhất nhưng BẮT BUỘC sản phẩm phải có trong giỏ không quan trọng kho còn hay hết.</div>\n                            <div class=\"advanced-help-item\"><strong>🔰 Kiểm tra theo dữ lệu sản phẩm:</strong> Là 1 lệnh vô cùng nhạy cảm và cực kì dễ bị đánh spam dẫn tới hạn chế tài khoản. Chỉ sử dụng nếu delay ít nhất từ 5 phút trở lên. Cân nhắc thật kĩ khi dùng.</div>\n                            <div class=\"advanced-help-item\"><strong>🔰 Hẹn giờ thực thi:</strong> Để tránh spam liên tục dẫn tới hạn chế thì bạn nên set để canh đúng thời gian đã định mới tiến hành gọi lệnh.</div>\n                            <div class=\"advanced-help-item\"><strong>🔰 Thông báo với Telegram:</strong> Để canh back kho hoặc thông báo đơn hàng khi đã đc đặt. Hiện back kho tức là tự đặt hàng. Sau đó có thể hủy đặt lại áp mã tùy ý.</div>\n                        </div>\n                    </div>\n                </div>\n                <div id=\"voucher-auto-settings-modal\" class=\"advanced-modal\" style=\"display:none;\">\n                    <div class=\"advanced-modal-content\">\n                        <div class=\"advanced-modal-header\">\n                            <h3>⚙️ Cài đặt Voucher tự động</h3>\n                            <button class=\"advanced-close-btn\" onclick=\"closeVoucherAutoSettings()\">×</button>\n                        </div>\n                        <div class=\"advanced-modal-body\">\n                            <div class=\"setting-group\">\n                                <label class=\"setting-label\">\n                                    <span class=\"setting-title\">Số lần quét voucher</span>\n                                    <span class=\"setting-desc\">Số lượt gọi API voucher để phát hiện promotionId mới.</span>\n                                </label>\n                                <input type=\"number\" id=\"voucher-setting-scan-limit\" class=\"setting-input\" value=\"100\" min=\"1\" step=\"1\">\n                            </div>\n                            <div class=\"setting-group\">\n                                <label class=\"setting-label\">\n                                    <span class=\"setting-title\">Retry checkout / đặt đơn</span>\n                                    <span class=\"setting-desc\">Ngân sách retry sau 3 lần thử nhanh PRIMARY.</span>\n                                </label>\n                                <input type=\"number\" id=\"voucher-setting-post-cart-retries\" class=\"setting-input\" value=\"80\" min=\"3\" max=\"333\" step=\"1\">\n                            </div>\n                            <div class=\"setting-group\">\n                                <label class=\"setting-label\">\n                                    <span class=\"setting-title\">Retry delay (ms)</span>\n                                    <span class=\"setting-desc\">Khoảng nghỉ giữa các lần scan/retry.</span>\n                                </label>\n                                <input type=\"number\" id=\"voucher-setting-delay\" class=\"setting-input\" value=\"200\" min=\"50\" max=\"3600000\" step=\"50\">\n                            </div>\n                            <div class=\"setting-group\">\n                                <label class=\"setting-checkbox\">\n                                    <input type=\"checkbox\" id=\"voucher-setting-use-schedule\" onchange=\"toggleVoucherAutoScheduleInputs()\">\n                                    <span class=\"checkmark\"></span>\n                                    <div>\n                                        <span class=\"setting-title\">Hẹn giờ bắt đầu quét</span>\n                                        <span class=\"setting-desc\">Hẹn giờ thực thi khi tới giờ.</span>\n                                    </div>\n                                </label>\n                                <div id=\"voucher-schedule-inputs\" class=\"schedule-inputs\" style=\"display:none;\">\n                                    <div class=\"time-picker\">\n                                        <div class=\"time-field\">\n                                            <label>Giờ</label>\n                                            <input type=\"number\" id=\"voucher-schedule-hour\" min=\"0\" max=\"23\" value=\"" + new Date().getHours() + "\">\n                                        </div>\n                                        <span class=\"time-sep\">:</span>\n                                        <div class=\"time-field\">\n                                            <label>Phút</label>\n                                            <input type=\"number\" id=\"voucher-schedule-minute\" min=\"0\" max=\"59\" value=\"59\">\n                                        </div>\n                                        <span class=\"time-sep\">:</span>\n                                        <div class=\"time-field\">\n                                            <label>Giây</label>\n                                            <input type=\"number\" id=\"voucher-schedule-second\" min=\"0\" max=\"59\" value=\"58\">\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"setting-group\">\n                                <label class=\"setting-checkbox\">\n                                    <input type=\"checkbox\" id=\"voucher-setting-enable-telegram\" onchange=\"toggleVoucherAutoTelegramInputs()\">\n                                    <span class=\"checkmark\"></span>\n                                    <div>\n                                        <span class=\"setting-title\">Thông báo Telegram khi thành công</span>\n                                        <span class=\"setting-desc\">Dùng chung bot token/chat id đang lưu trong công cụ.</span>\n                                    </div>\n                                </label>\n                                <div id=\"voucher-telegram-inputs\" class=\"schedule-inputs\" style=\"display:none;\">\n                                    <div style=\"display:flex;flex-direction:column;gap:8px;\">\n                                        <input type=\"text\" id=\"voucher-setting-telegram-token\" class=\"setting-input\" placeholder=\"Bot Token\">\n                                        <input type=\"text\" id=\"voucher-setting-telegram-chatid\" class=\"setting-input\" placeholder=\"Chat ID / Channel ID\">\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"setting-group\">\n                                <label class=\"setting-title\">Hình thức thanh toán</label>\n                                <div class=\"payment-select-container voucher-payment-select-container\">\n                                    <div class=\"payment-select-trigger\" onclick=\"toggleVoucherPaymentDropdown(event)\">\n                                        <span class=\"payment-select-trigger-text voucher-payment-select-trigger-text\">Chọn hình thức thanh toán</span>\n                                        <span class=\"payment-select-arrow\">▼</span>\n                                    </div>\n                                    <div class=\"payment-options-dropdown\" id=\"voucher-payment-options-dropdown\" style=\"display:none;\"></div>\n                                </div>\n                                <select id=\"voucher-setting-payment-method\" style=\"display:none;\" onchange=\"handleVoucherPaymentMethodChange(this)\"></select>\n                                <div id=\"voucher-payment-method-info\" class=\"payment-method-info\" style=\"display:none;\"></div>\n                            </div>\n                        </div>\n                        <div class=\"advanced-modal-footer\">\n                            <button class=\"btn-save-settings\" onclick=\"saveVoucherAutoSettings()\">Lưu cài đặt</button>\n                        </div>\n                    </div>\n                </div>\n            ";
      const _0x1fd17c = "\n                <style id=\"shopee-autobuy-styles\">\n                    #shopee-autobuy-modal-overlay {\n                        position: fixed; top: 0; left: 0; width: 100%; height: 100%;\n                        background: rgba(0, 0, 0, 0.7); z-index: 99999;\n                        display: flex; align-items: center; justify-content: center;\n                        backdrop-filter: blur(5px); animation: fadeIn 0.3s ease;\n                        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n                    }\n                    \n                    /* Custom Payment Select Dropdown */\n                    .payment-select-container {\n                        position: relative;\n                        width: 100%;\n                        margin-top: 8px;\n                        font-family: inherit;\n                        box-sizing: border-box;\n                    }\n                    \n                    .payment-select-trigger {\n                        display: flex;\n                        justify-content: space-between;\n                        align-items: center;\n                        padding: 10px 12px;\n                        background: #fff;\n                        border: 1px solid #ddd;\n                        border-radius: 6px;\n                        color: #333;\n                        cursor: pointer;\n                        font-size: 14px;\n                        user-select: none;\n                        transition: border-color 0.2s, box-shadow 0.2s;\n                        box-sizing: border-box;\n                    }\n                    \n                    .payment-select-trigger:hover {\n                        border-color: #ff4500;\n                    }\n                    \n                    .payment-select-container.active .payment-select-trigger {\n                        border-color: #ff4500;\n                        box-shadow: 0 0 0 2px rgba(255, 69, 0, 0.2);\n                    }\n                    \n                    .payment-select-trigger-text {\n                        display: flex;\n                        align-items: center;\n                        gap: 8px;\n                    }\n                    \n                    .payment-select-arrow {\n                        font-size: 10px;\n                        color: #888;\n                        transition: transform 0.2s ease;\n                    }\n                    \n                    .payment-select-container.active .payment-select-arrow {\n                        transform: rotate(180deg);\n                    }\n                    \n                    .payment-options-dropdown {\n                        position: absolute;\n                        top: calc(100% + 4px);\n                        left: 0;\n                        width: 100%;\n                        max-height: 250px;\n                        overflow-y: auto;\n                        background: #fff;\n                        border: 1px solid #ccc;\n                        border-radius: 6px;\n                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);\n                        z-index: 10000;\n                        box-sizing: border-box;\n                    }\n                    \n                    /* Custom Option Item */\n                    .payment-option-item {\n                        display: flex;\n                        flex-direction: column;\n                        padding: 10px 12px;\n                        cursor: pointer;\n                        transition: background 0.15s, color 0.15s;\n                        border-bottom: 1px solid #f0f0f0;\n                        box-sizing: border-box;\n                    }\n                    \n                    .payment-option-item:last-child {\n                        border-bottom: none;\n                    }\n                    \n                    .payment-option-item.disabled {\n                        cursor: not-allowed;\n                        background: #fdfdfd;\n                    }\n                    \n                    .payment-option-item:not(.disabled):hover {\n                        background: #ff4500;\n                        color: #fff;\n                    }\n                    \n                    /* Row 1: Icon + Payment Name */\n                    .payment-option-row1 {\n                        display: flex;\n                        align-items: center;\n                        gap: 8px;\n                        font-weight: 500;\n                        font-size: 14px;\n                    }\n                    \n                    .payment-option-icon {\n                        font-size: 16px;\n                        display: inline-block;\n                        width: 20px;\n                        text-align: center;\n                        flex-shrink: 0;\n                    }\n                    \n                    .payment-option-name {\n                        flex-grow: 1;\n                    }\n                    \n                    .payment-option-item.disabled .payment-option-name {\n                        text-decoration: line-through;\n                        opacity: 0.75;\n                    }\n                    \n                    /* Row 2: Detail / Disabled Reason */\n                    .payment-option-row2 {\n                        margin-left: 28px; /* Indent under the name (icon size 20px + gap 8px) */\n                        font-size: 12px;\n                        color: #666;\n                        white-space: normal; /* Wrap text */\n                        word-break: break-word;\n                        margin-top: 4px;\n                        line-height: 1.4;\n                    }\n                    \n                    .payment-option-item:not(.disabled):hover .payment-option-row2 {\n                        color: #ffe5db;\n                    }\n                    \n                    .payment-option-item.disabled .payment-option-row2 {\n                        color: #ff4d4f; /* Make disabled reason stand out */\n                    }\n                    .payment-method-info {\n                        margin-top: 6px; color: #666; font-size: 12px; font-style: italic;\n                        line-height: 1.35;\n                    }\n                    .payment-method-info.error { color: #d93025; }\n                    .autobuy-modal-container {\n                        background: #f8f9fa; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.4);\n                        width: 950px; max-width: 950px; min-height: 95vh; max-height: 95vh; overflow: hidden;\n                        min-width: 500px;\n                        display: flex; flex-direction: column; animation: slideIn 0.3s ease;\n                    }\n                    .autobuy-modal-header {\n                        background: linear-gradient(135deg, #ff4500, #ff7337); color: white;\n                        padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;\n                    }\n                    .autobuy-modal-header h2 { margin: 0; font-size: 1.2rem; font-weight: 700; }\n                    .autobuy-header-actions { display: inline-flex; align-items: center; gap: 6px; }\n                    .autobuy-header-icon-btn {\n                        background: transparent; border: 1px solid rgba(255,255,255,0.55); color: #fff;\n                        width: 28px; height: 28px; border-radius: 8px; cursor: pointer;\n                        display: inline-flex; align-items: center; justify-content: center; font-size: 13px;\n                    }\n                    .autobuy-header-icon-btn:hover { border-color: #fff; background: rgba(255,255,255,0.12); }\n                    .autobuy-close-btn {\n                        background: transparent; border: none; color: white; font-size: 28px;\n                        cursor: pointer; line-height: 1; opacity: 0.8; transition: opacity 0.2s;\n                    }\n                    .autobuy-close-btn:hover { opacity: 1; }\n                    .autobuy-modal-body { overflow: hidden; padding: 12px; display: flex; flex-direction: column; gap: 10px; flex: 1; min-height: 0; }\n                    \n                    .autobuy-input-section { background: white; padding: 12px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); flex: 1; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }\n                    .autobuy-source-tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-bottom: 12px; width: 100%; }\n                    .autobuy-source-tab {\n                        width: 100%; border: 1px solid #d9d9d9; border-radius: 8px; background: #f7f7f7;\n                        color: #666; padding: 8px 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;\n                    }\n                    .autobuy-source-tab.active { background: #fff3ee; color: #ff4500; border-color: #ffb08c; }\n                    .autobuy-order-badge {\n                        display: inline-flex; min-width: 18px; height: 18px; border-radius: 999px;\n                        align-items: center; justify-content: center; font-size: 11px; font-weight: 700;\n                        background: #ff4d4f; color: #fff; margin-left: 6px; padding: 0 4px;\n                    }\n                    .autobuy-source-pane { display: none !important; min-height: 0; }\n                    .autobuy-source-pane.active { display: flex !important; flex-direction: column; min-height: 0; flex: 1 1 0; overflow-y: auto; background: #fff; }\n                    #autobuy-cart-pane.active { display: flex !important; flex-direction: column; min-height: 0; flex: 1 1 0; overflow: hidden; }\n                    #autobuy-order-pane.active { display: flex !important; flex-direction: column; min-height: 0; flex: 1 1 0; overflow: hidden; }\n                    .autobuy-cart-list {\n                        flex: 1; min-height: 0; overflow-y: auto; border: 1px solid #eee; border-radius: 10px; padding: 10px; background: #fff;\n                        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif;\n                    }\n                    .autobuy-cart-empty { text-align: center; color: #999; font-size: 12px; padding: 14px 8px; }\n                    .autobuy-cart-shop { margin-bottom: 12px; border-radius: 14px; border: 1px solid #ececec; overflow: hidden; }\n                    .autobuy-cart-shop:nth-child(odd) .autobuy-cart-shop-head { background: #f3f0cf; }\n                    .autobuy-cart-shop:nth-child(even) .autobuy-cart-shop-head { background: #dfe8f6; }\n                    .autobuy-cart-shop-head { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; cursor: pointer; }\n                    .autobuy-cart-shop-avatar { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; background: #e5e7eb; }\n                    .autobuy-cart-shop-name { font-size: 16px; font-weight: 700; color: #28323f; }\n                    .autobuy-cart-shop-count { font-size: 12px; color: #596273; margin-top: 3px; }\n                    .autobuy-cart-shop-items { padding: 10px; background: #fff; border-top: 1px solid rgba(0,0,0,0.04); }\n                    .autobuy-cart-item { display: grid; grid-template-columns: 82px 1fr auto; gap: 12px; background: #f4f4f4; border-radius: 12px; padding: 12px; margin-bottom: 8px; align-items: start; }\n                    .autobuy-cart-item:last-child { margin-bottom: 0; }\n                    .autobuy-cart-item-img { width: 82px; height: 82px; object-fit: cover; border-radius: 8px; background: #eee; margin-top: 2px; cursor: zoom-in; }\n                    .autobuy-cart-item-main { flex: 1; min-width: 0; }\n                    .autobuy-cart-item-title { font-size: 15px; font-weight: 600; color: #2e3440; line-height: 1.75; margin-bottom: 4px; }\n                    .autobuy-cart-item-title-link { color: inherit; text-decoration: none; }\n                    .autobuy-cart-item-title-link:hover { color: #ff4500; text-decoration: underline; }\n                    .autobuy-cart-item-meta { display:flex; align-items:baseline; gap:8px; font-size: 12px; color: #697386; line-height: 1.75; white-space: nowrap; }\n                    .autobuy-cart-item-label { width: 74px; min-width: 74px; color: #6b7280; font-weight: 500; }\n                    .autobuy-cart-item-value { color: #374151; font-weight: 600; }\n                    .autobuy-cart-item-old { color: #9ca3af; text-decoration: line-through; font-size: 11px; font-weight: 500; }\n                    .autobuy-cart-item-variant { display:inline-block; background:#d1fae5; border:1px solid #86efac; color:#047857; border-radius:6px; padding:1px 8px; font-size:11px; line-height: 1.45; max-width: fit-content; vertical-align: middle; }\n                    .autobuy-cart-item-add { border: none; background: #ff4500; color: #fff; border-radius: 10px; padding: 8px 12px; font-size: 12px; font-weight: 700; cursor: pointer; white-space: nowrap; align-self: center; }\n                    .autobuy-cart-item-add.gift-remove-btn { background: #fff; color: #ef4444; border: 1px solid #ef4444; }\n                    .autobuy-cart-item-gift { margin-left: 48px; border: 1px dashed #fecaca; }\n                    .autobuy-gift-tag { display: inline-block; border: 1px solid #f97316; color: #f97316; border-radius: 4px; font-size: 10px; padding: 0 4px; margin-right: 4px; line-height: 1.4; vertical-align: middle; }\n                    .autobuy-cart-item-oos { background: #fff1f2; }\n                    .autobuy-image-preview-modal {\n                        position: fixed; inset: 0; background: rgba(0,0,0,0.72); z-index: 120000;\n                        display: none; align-items: center; justify-content: center; padding: 20px;\n                    }\n                    .autobuy-image-preview-content { position: relative; max-width: min(92vw, 900px); max-height: 88vh; }\n                    .autobuy-image-preview-img { max-width: 100%; max-height: 88vh; border-radius: 12px; display: block; object-fit: contain; background: #111827; }\n                    .autobuy-image-preview-close {\n                        position: absolute; top: -12px; right: -12px; width: 34px; height: 34px;\n                        border: none; border-radius: 50%; background: #fff; color: #111827;\n                        font-size: 22px; cursor: pointer; line-height: 1;\n                    }\n                    .autobuy-load-more-btn { width: 100%; margin-top: 8px; border: none; border-radius: 10px; padding: 10px 12px; background: linear-gradient(135deg,#5f6eea,#8b5cf6); color:#fff; font-weight:700; cursor:pointer; }\n                    .autobuy-order-actions { margin-top: 10px; display: flex; gap: 8px; }\n                    .autobuy-order-actions .btn-advanced { flex: 0 0 auto; }\n                    .autobuy-order-actions .btn-start-autobuy,\n                    .autobuy-order-actions .btn-stop-autobuy { flex: 1; }\n                    .autobuy-input-group {\n                        display: flex; align-items: center; background: #f0f2f5;\n                        border: 1px solid #d9d9d9; border-radius: 8px; padding: 0 12px;\n                        margin-bottom: 12px; transition: all 0.2s;\n                    }\n                    .autobuy-input-group:focus-within { border-color: #ff4500; background: white; box-shadow: 0 0 0 2px rgba(255, 69, 0, 0.1); }\n                    .autobuy-input-group input {\n                        flex: 1; border: none; background: transparent; padding: 10px 0;\n                        font-size: 13px; outline: none;\n                    }\n                    .autobuy-clear-btn { background: none; border: none; color: #999; font-size: 18px; cursor: pointer; padding: 0 5px; }\n                    .autobuy-action-buttons { display: flex; gap: 10px; flex-wrap: nowrap; }\n                    .autobuy-btn {\n                        flex: 1; border: none; padding: 10px; border-radius: 6px;\n                        font-weight: 600; cursor: pointer; display: flex; align-items: center;\n                        justify-content: center; gap: 8px; transition: all 0.2s; font-size: 13px;\n                    }\n                    .autobuy-btn.primary { background: #ff4500; color: white; }\n                    .autobuy-btn.primary:hover { background: #d63a00; }\n                    .autobuy-btn.secondary { background: #e6f7ff; color: #1890ff; }\n                    .autobuy-btn.secondary:hover { background: #bae7ff; }\n\n                    .voucher-auto-panel { display:flex; flex-direction:column; gap:12px; padding:2px; flex:1 1 0; min-height:0; }\n                    .voucher-auto-test-warning { background:#fff1f0; border:1px solid #ffccc7; color:#a8071a; border-radius:8px; padding:10px 12px; font-size:13px; font-weight:700; line-height:1.45; }\n                    .voucher-auto-shop-card { border:1px solid #e5e7eb; border-radius:8px; padding:12px; background:#f8fafc; font-size:13px; color:#1f2937; }\n                    .voucher-auto-shop-main { display:grid; grid-template-columns:54px 1fr; gap:12px; align-items:center; }\n                    .voucher-auto-shop-avatar { width:54px; height:54px; border-radius:50%; object-fit:cover; background:#e5e7eb; }\n                    .voucher-auto-shop-name { font-weight:800; font-size:15px; color:#111827; }\n                    .voucher-auto-shop-meta { color:#4b5563; margin-top:3px; line-height:1.45; }\n                    .voucher-auto-rule-card { border-top:1px dashed #d1d5db; padding-top:12px; }\n                    .voucher-auto-rule-note { margin-top:4px; font-size:12px; line-height:1.4; color:#dc2626; font-weight:700; }\n                    .voucher-auto-rule-title { display:flex; align-items:center; justify-content:space-between; font-size:12px; color:#4b5563; font-weight:700; margin-top:4px; }\n                    .voucher-auto-rule-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; margin-top:10px; }\n                    .voucher-auto-rule-grid label { display:flex; flex-direction:column; gap:5px; font-size:12px; color:#4b5563; font-weight:600; }\n                    .voucher-auto-rule-grid input { border:1px solid #d1d5db; border-radius:6px; padding:8px 10px; font-size:13px; }\n                    .autobuy-modal-container.voucher-auto-only .autobuy-source-tabs { display:none; }\n                    .autobuy-modal-container.voucher-auto-only #autobuy-cart-pane,\n                    .autobuy-modal-container.voucher-auto-only #autobuy-url-pane,\n                    .autobuy-modal-container.voucher-auto-only #autobuy-order-pane { display:none !important; }\n                    .autobuy-modal-container.voucher-auto-only #autobuy-voucher-pane { display:flex !important; flex-direction:column; min-height:0; flex:1 1 0; overflow-y:auto; }\n                    .autobuy-modal-container.voucher-auto-only .voucher-auto-panel > .autobuy-order-actions { margin-top:auto; padding-top:12px; }\n\n                    .autobuy-content-area { background: white; border-radius: 10px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); flex-shrink: 0; }\n                    .autobuy-empty-state { text-align: center; padding: 30px; color: #bfbfbf; }\n                    \n                    /* Product Card Layout - Desktop: Image left, content right */\n                    .product-card-container { display: flex; gap: 15px; }\n                    .product-card-left { flex-shrink: 0; width: 190px; }\n                    .product-main-img { width: 180px; height: 180px; border-radius: 8px; object-fit: cover; border: 1px solid #eee; }\n                    .product-card-right { flex: 1; display: flex; flex-direction: column; min-width: 0; }\n                    .product-card-title {\n                        font-size: 14px; font-weight: 600; color: #333; line-height: 1.4; margin: 0 0 10px 0;\n                        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;\n                    }\n                    \n                    /* Price & Stock Section */\n                    .product-info-row { display: flex; gap: 20px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; margin-bottom: 8px; flex-wrap: wrap; }\n                    .info-block { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }\n                    .info-label { font-size: 13px; color: #666; }\n                    .price-value { font-size: 15px; font-weight: 700; color: #ee4d2d; }\n                    .price-original { font-size: 12px; color: #999; text-decoration: line-through; }\n                    .price-discount { background: #ee4d2d; color: white; font-size: 10px; padding: 2px 5px; border-radius: 3px; font-weight: 600; }\n                    .stock-value { font-size: 14px; font-weight: 600; color: #52c41a; }\n                    .stock-value.out-of-stock { color: #ff4d4f; }\n                    \n                    /* Model Selection */\n                    .model-section { margin-top: 8px; overflow-y: auto; max-height: 120px; flex: 1; }\n                    .model-section-title { font-size: 13px; color: #666; margin-bottom: 8px; font-weight: 600; }\n                    .model-options { display: flex; flex-wrap: wrap; gap: 6px; }\n                    .model-option-btn {\n                        display: flex; align-items: center; gap: 5px; padding: 5px 8px;\n                        border: 1px solid #ddd; border-radius: 4px; background: white;\n                        cursor: pointer; transition: all 0.2s; font-size: 11px; color: #333;\n                    }\n                    .model-option-btn:hover { border-color: #ff4500; background: #fff8f5; }\n                    .model-option-btn.selected { border-color: #ff4500; background: #fff8f5; color: #ff4500; }\n                    .model-option-btn img { width: 22px; height: 22px; border-radius: 3px; object-fit: cover; }\n                    \n                    /* Action Buttons - Split */\n                    .product-actions { margin-top: 12px; padding-top: 10px; border-top: 1px solid #eee; flex-shrink: 0; display: flex; gap: 10px; }\n                    .btn-advanced {\n                        flex: 0 0 auto; padding: 12px 16px; background: #f0f0f0; color: #666;\n                        border: 1px solid #ddd; border-radius: 6px; font-size: 13px; font-weight: 600;\n                        cursor: pointer; transition: all 0.2s;\n                    }\n                    .btn-advanced:hover { background: #e0e0e0; border-color: #ccc; }\n                    .btn-start-autobuy {\n                        flex: 1; background: linear-gradient(135deg, #52c41a, #389e0d); color: white;\n                        border: none; padding: 12px 20px; border-radius: 6px; font-size: 14px; font-weight: 600;\n                        cursor: pointer; transition: all 0.2s;\n                    }\n                    .btn-start-autobuy:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(82, 196, 26, 0.4); }\n                    .btn-stop-autobuy {\n                        flex: 1; background: linear-gradient(135deg, #ff4d4f, #cf1322); color: white;\n                        border: none; padding: 12px 20px; border-radius: 6px; font-size: 14px; font-weight: 600;\n                        cursor: pointer; transition: all 0.2s;\n                    }\n                    .btn-stop-autobuy:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255, 77, 79, 0.4); }\n\n                    /* Advanced Settings Modal */\n                    .advanced-modal {\n                        position: fixed; top: 0; left: 0; width: 100%; height: 100%;\n                        background: rgba(15, 23, 42, 0.65);\n                        backdrop-filter: blur(4px);\n                        -webkit-backdrop-filter: blur(4px);\n                        z-index: 100000;\n                        display: flex; align-items: center; justify-content: center;\n                        padding: 12px; box-sizing: border-box;\n                        overflow: hidden;\n                    }\n                    .advanced-modal-content {\n                        background: #ffffff; border-radius: 16px; width: 92%; max-width: 620px;\n                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.06);\n                        animation: modalFadeInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);\n                        max-height: 88vh;\n                        height: auto;\n                        display: flex; flex-direction: column;\n                        overflow: hidden; /* body handles scrolling */\n                    }\n                    @keyframes modalFadeInUp {\n                        from { opacity: 0; transform: scale(0.97) translateY(8px); }\n                        to { opacity: 1; transform: scale(1) translateY(0); }\n                    }\n                    .advanced-modal-header {\n                        padding: 16px 20px; border-bottom: 1px solid #f1f5f9;\n                        display: flex; justify-content: space-between; align-items: center;\n                        flex-shrink: 0; background: #ffffff;\n                    }\n                    .advanced-modal-header h3 { margin: 0; font-size: 16px; font-weight: 700; color: #0f172a; }\n                    .advanced-close-btn {\n                        background: #f8fafc; border: 1px solid #e2e8f0; font-size: 18px; cursor: pointer; color: #64748b;\n                        width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;\n                        transition: all 0.2s ease; padding: 0; line-height: 1;\n                    }\n                    .advanced-close-btn:hover { background: #fee2e2; border-color: #fca5a5; color: #ef4444; }\n                    .advanced-help-icon-btn {\n                        border: none;\n                        background: linear-gradient(135deg, #ff6b35, #ee4d2d);\n                        color: #fff;\n                        width: 20px;\n                        height: 20px;\n                        border-radius: 999px;\n                        font-size: 11px;\n                        font-weight: 800;\n                        cursor: pointer;\n                        line-height: 1;\n                        padding: 0;\n                        display: inline-flex;\n                        align-items: center;\n                        justify-content: center;\n                        box-shadow: 0 2px 4px rgba(238, 77, 45, 0.3);\n                        transition: transform 0.15s, filter 0.15s;\n                    }\n                    .advanced-help-icon-btn:hover { transform: scale(1.08); filter: brightness(1.05); }\n                    .advanced-modal-body {\n                        padding: 18px 20px;\n                        flex: 1 1 auto;\n                        min-height: 0; /* required for overflow scrolling inside flex */\n                        overflow-y: auto;\n                        overscroll-behavior: contain;\n                        touch-action: pan-y;\n                        -webkit-overflow-scrolling: touch;\n                        background: #f8fafc;\n                    }\n                    .advanced-modal-body::-webkit-scrollbar {\n                        width: 5px;\n                    }\n                    .advanced-modal-body::-webkit-scrollbar-track {\n                        background: transparent;\n                    }\n                    .advanced-modal-body::-webkit-scrollbar-thumb {\n                        background: #cbd5e1;\n                        border-radius: 10px;\n                    }\n                    .advanced-modal-body::-webkit-scrollbar-thumb:hover {\n                        background: #94a3b8;\n                    }\n                    .advanced-modal-footer {\n                        padding: 14px 20px; border-top: 1px solid #f1f5f9; text-align: right; background: #ffffff; flex-shrink: 0;\n                    }\n.advanced-help-modal {\n                        position: fixed;\n                        inset: 0;\n                        background: rgba(0,0,0,0.6);\n                        z-index: 120001;\n                        display: flex;\n                        align-items: center;\n                        justify-content: center;\n                        padding: 12px;\n                        box-sizing: border-box;\n                    }\n                    .advanced-help-modal-content {\n                        background: #fff;\n                        border-radius: 12px;\n                        width: 90%;\n                        max-width: 760px;\n                        max-height: 90vh;\n                        overflow: hidden;\n                        display: flex;\n                        flex-direction: column;\n                        box-shadow: 0 20px 40px rgba(0,0,0,0.3);\n                    }\n                    .advanced-help-modal-header {\n                        padding: 14px 18px;\n                        border-bottom: 1px solid #eee;\n                        display: flex;\n                        align-items: center;\n                        justify-content: space-between;\n                    }\n                    .advanced-help-modal-header h3 { margin: 0; font-size: 16px; }\n                    .advanced-help-modal-body {\n                        padding: 14px 18px 18px;\n                        overflow-y: auto;\n                        font-size: 13px;\n                        color: #1f2937;\n                        line-height: 1.5;\n                    }\n                    .advanced-help-item {\n                        margin-bottom: 10px;\n                        background: #f8fafc;\n                        border: 1px solid #e5e7eb;\n                        border-radius: 8px;\n                        padding: 8px 10px;\n                    }\n                    \n                                        /* Advanced Settings Tabs */\n                    .advanced-tab-navigation {\n                        display: flex;\n                        align-items: center;\n                        gap: 8px;\n                        padding: 10px 20px 0;\n                        background: #ffffff;\n                        border-bottom: 1px solid #e2e8f0;\n                        flex-shrink: 0;\n                    }\n                    .advanced-tab-btn {\n                        flex: 1;\n                        padding: 10px 16px;\n                        background: transparent;\n                        border: none;\n                        border-bottom: 3px solid transparent;\n                        font-size: 13.5px;\n                        font-weight: 600;\n                        color: #64748b;\n                        cursor: pointer;\n                        transition: all 0.2s ease;\n                        display: flex;\n                        align-items: center;\n                        justify-content: center;\n                        gap: 6px;\n                        margin-bottom: -1px;\n                    }\n                    .advanced-tab-btn:hover {\n                        color: #0f172a;\n                        background: #f8fafc;\n                        border-top-left-radius: 8px;\n                        border-top-right-radius: 8px;\n                    }\n                    .advanced-tab-btn.active {\n                        color: #ee4d2d;\n                        border-bottom-color: #ee4d2d;\n                        font-weight: 700;\n                    }\n\n                    /* Section Headers & Visual Grouping */\n                    .setting-section-header {\n                        display: flex;\n                        align-items: center;\n                        gap: 6px;\n                        margin: 16px 0 8px;\n                    }\n                    .setting-section-header:first-child {\n                        margin-top: 0;\n                    }\n                    .setting-section-icon {\n                        font-size: 14px;\n                        line-height: 1;\n                    }\n                    .setting-section-title {\n                        font-size: 11px;\n                        font-weight: 700;\n                        text-transform: uppercase;\n                        letter-spacing: 0.6px;\n                        color: #64748b;\n                    }\n\n                    /* 3-Column Grid for Numerical Retries/Delays */\n                    .setting-grid-3 {\n                        display: grid;\n                        grid-template-columns: repeat(3, 1fr);\n                        gap: 10px;\n                        margin-bottom: 8px;\n                    }\n                    .setting-card-field {\n                        background: #ffffff;\n                        border: 1px solid #e2e8f0;\n                        border-radius: 10px;\n                        padding: 10px 12px;\n                        margin-bottom: 0;\n                        display: flex;\n                        flex-direction: column;\n                        justify-content: space-between;\n                        transition: border-color 0.2s, box-shadow 0.2s;\n                    }\n                    .setting-card-field:focus-within {\n                        border-color: #ee4d2d;\n                        box-shadow: 0 0 0 3px rgba(238, 77, 45, 0.1);\n                    }\n                    .setting-card-field .setting-label {\n                        display: flex;\n                        justify-content: space-between;\n                        align-items: center;\n                        margin-bottom: 6px;\n                    }\n                    .setting-card-field .setting-title {\n                        font-size: 12px;\n                        font-weight: 700;\n                        color: #334155;\n                        white-space: nowrap;\n                    }\n                    .setting-badge {\n                        font-size: 10px;\n                        font-weight: 700;\n                        color: #64748b;\n                        background: #f1f5f9;\n                        padding: 2px 6px;\n                        border-radius: 4px;\n                        line-height: 1.2;\n                    }\n                    .setting-card-field .setting-input {\n                        font-size: 15px;\n                        font-weight: 700;\n                        color: #0f172a;\n                        padding: 6px 8px;\n                        border: 1px solid #cbd5e1;\n                        border-radius: 6px;\n                        text-align: center;\n                    }\n                    .setting-card-field .setting-desc {\n                        font-size: 11px;\n                        color: #94a3b8;\n                        margin-top: 4px;\n                        line-height: 1.25;\n                    }\n\n                    /* Card Blocks */\n                    .setting-card-block {\n                        background: #ffffff;\n                        border: 1px solid #e2e8f0;\n                        border-radius: 10px;\n                        padding: 12px;\n                        margin-bottom: 10px;\n                        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);\n                        transition: border-color 0.2s, box-shadow 0.2s;\n                    }\n                    .setting-card-block:hover {\n                        border-color: #cbd5e1;\n                    }\n                    .setting-card-block:has(> .setting-checkbox input:checked) {\n                        border-color: #ffc4b3;\n                        background: #fffdfc;\n                    }\n\n                    .setting-group { margin-bottom: 14px; }\n                    .setting-label { display: block; margin-bottom: 8px; }\n                    .setting-title { font-weight: 600; font-size: 13.5px; color: #1e293b; display: block; line-height: 1.35; }\n                    .setting-desc { font-size: 12px; color: #64748b; display: block; margin-top: 3px; line-height: 1.4; }\n\n                    .setting-title-row { display: flex; align-items: center; gap: 8px; }\n                    .setting-title-row .setting-title { display: inline; }\n                    .info-icon {\n                        display: inline-flex; align-items: center; justify-content: center;\n                        width: 16px; height: 16px; border-radius: 50%;\n                        background: #ff4d4f; color: #fff; font-size: 11px; font-weight: 800;\n                        cursor: pointer; user-select: none; flex: 0 0 auto;\n                        transition: transform 0.15s;\n                    }\n                    .info-icon:hover { transform: scale(1.1); filter: brightness(0.95); }\n                    .setting-help {\n                        margin-top: 10px; margin-bottom: 10px; padding: 10px 12px; border-radius: 8px;\n                        background: #fff5f5; border: 1px solid #ffccc7; color: #333;\n                        font-size: 12px; line-height: 1.4;\n                    }\n                    .setting-help a { color: #ff4500; font-weight: 700; text-decoration: none; }\n                    .setting-help a:hover { text-decoration: underline; }\n                    .setting-input {\n                        width: 100%; padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 6px;\n                        font-size: 13.5px; background: #ffffff; color: #1e293b;\n                        transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box;\n                    }\n                    .setting-input:focus { border-color: #ee4d2d; box-shadow: 0 0 0 2px rgba(238, 77, 45, 0.15); outline: none; }\n                    .setting-input:disabled { background: #f1f5f9; color: #94a3b8; cursor: not-allowed; }\n                    \n                    .setting-checkbox {\n                        display: flex; align-items: flex-start; gap: 12px; cursor: pointer; user-select: none;\n                        padding: 2px 0; background: transparent; border-radius: 0; transition: none;\n                    }\n                    .setting-checkbox:hover { background: transparent; }\n                    .setting-checkbox input { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }\n                    .setting-checkbox .checkmark {\n                        width: 20px; height: 20px; min-width: 20px; border: 2px solid #cbd5e1; border-radius: 5px;\n                        display: flex; align-items: center; justify-content: center; flex-shrink: 0;\n                        transition: all 0.2s ease; margin-top: 2px; background: #ffffff;\n                    }\n                    .setting-checkbox:hover .checkmark { border-color: #ee4d2d; }\n                    .setting-checkbox input:checked + .checkmark {\n                        background: #10b981; border-color: #10b981; box-shadow: 0 2px 5px rgba(16, 185, 129, 0.3);\n                    }\n                    .setting-checkbox input:checked + .checkmark::after {\n                        content: '✓'; color: white; font-size: 13px; font-weight: 800;\n                    }\n                    .setting-checkbox-content { flex: 1; min-width: 0; }\n                    .price-check-option {\n                        border: 1px solid #e2e8f0;\n                        border-radius: 8px;\n                        background: #ffffff;\n                        margin-bottom: 6px;\n                        padding: 9px 11px !important;\n                        cursor: pointer;\n                        transition: border-color 0.15s, background-color 0.15s;\n                    }\n                    .price-check-option:last-child { margin-bottom: 0; }\n                    .price-check-option:hover { border-color: #cbd5e1; background: #fbfcfd; }\n                    .price-check-option:has(input[type=\"radio\"]:checked) {\n                        border-color: #ff9e88;\n                        background: #fff8f6;\n                    }\n                    .price-check-option input[type=\"radio\"] {\n                        display: inline-block !important;\n                        width: 16px;\n                        height: 16px;\n                        margin-top: 2px;\n                        accent-color: #ee4d2d;\n                        flex-shrink: 0;\n                        cursor: pointer;\n                    }\n                    \n                    .schedule-inputs {\n                        margin-top: 10px;\n                        padding: 12px;\n                        background: #f8fafc;\n                        border: 1px solid #e2e8f0;\n                        border-radius: 8px;\n                    }\n                    .voucher-shop-input-row { display: flex; align-items: center; gap: 8px; }\n                    .voucher-shop-input-row .setting-input { flex: 1 1 auto; }\n                    .voucher-shop-paste-btn {\n                        flex: 0 0 auto;\n                        width: 40px;\n                        height: 40px;\n                        border: 1px solid #d1d5db;\n                        background: #fff;\n                        color: #374151;\n                        border-radius: 6px;\n                        font-size: 18px;\n                        cursor: pointer;\n                        display: inline-flex;\n                        align-items: center;\n                        justify-content: center;\n                        transition: all 0.2s;\n                    }\n                    .voucher-shop-paste-btn:hover {\n                        border-color: #ff4500;\n                        color: #ff4500;\n                        background: #fff8f5;\n                    }\n                    .voucher-shop-validate-btn {\n                        flex: 0 0 auto;\n                        border: 1px solid #ff4500;\n                        background: linear-gradient(135deg, #ff6b35 0%, #ee4d2d 100%);\n                        color: #fff;\n                        border-radius: 6px;\n                        padding: 10px 12px;\n                        font-size: 13px;\n                        font-weight: 700;\n                        cursor: pointer;\n                        white-space: nowrap;\n                        transition: filter 0.2s;\n                    }\n                    .voucher-shop-validate-btn:hover:not(:disabled) {\n                        filter: brightness(1.05);\n                    }\n                    .voucher-shop-validate-btn:disabled {\n                        background: #9ca3af;\n                        border-color: #9ca3af;\n                        cursor: not-allowed;\n                    }\n                    \n.voucher-shop-picker-row {\n                        margin-top: 0;\n                        display: flex;\n                        flex-direction: column;\n                        gap: 6px;\n                    }\n                    #shop-voucher-inputs {\n                        display: flex;\n                        flex-direction: column;\n                        gap: 10px;\n                    }\n                    #shop-voucher-inputs > div {\n                        padding-bottom: 7px;\n                    }\n                    .voucher-shop-select {\n                        width: 100%;\n                        background: #fff;\n                    }\n                    .voucher-shop-select.state-loading {\n                        color: #64748b;\n                    }\n                    .voucher-shop-select.state-success {\n                        color: #15803d;\n                        border-color: #16a34a;\n                    }\n                    .voucher-shop-select.state-empty,\n                    .voucher-shop-select.state-error {\n                        color: #dc2626;\n                        border-color: #ef4444;\n                    }\n                    .voucher-shop-select:disabled {\n                        background: #f8fafc;\n                        cursor: not-allowed;\n                    }\n                    .voucher-shop-picker-status {\n                        font-size: 12px;\n                        line-height: 1.35;\n                        color: #64748b;\n                        display: none;\n                    }\n                    .voucher-shop-picker-status.error {\n                        color: #b91c1c;\n                        font-weight: 600;\n                    }\n                    .voucher-shop-result {\n                        margin-top: 10px;\n                        padding: 0;\n                        border-radius: 10px;\n                        border: 1px solid #d1d5db;\n                        background: #fff;\n                        color: #1f2937;\n                        overflow: hidden;\n                    }\n                    .voucher-shop-result.error {\n                        border-color: #fecaca;\n                        background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);\n                        color: #b91c1c;\n                        padding: 10px 12px;\n                        font-size: 13px;\n                        font-weight: 700;\n                        line-height: 1.4;\n                    }\n                    .platform-voucher-status {\n                        border-radius: 8px;\n                        border: 1px solid #e5e7eb;\n                        background: #fff;\n                        color: #374151;\n                        padding: 9px 10px;\n                        font-size: 12px;\n                        line-height: 1.4;\n                    }\n                    .platform-voucher-status.success {\n                        border-color: #bbf7d0;\n                        background: #f0fdf4;\n                        color: #166534;\n                        font-weight: 700;\n                    }\n                    .platform-voucher-status.warning {\n                        border-color: #fed7aa;\n                        background: #fff7ed;\n                        color: #9a3412;\n                        font-weight: 700;\n                    }\n                    .platform-voucher-status.error {\n                        border-color: #fecaca;\n                        background: #fef2f2;\n                        color: #b91c1c;\n                        font-weight: 700;\n                    }\n                    .platform-voucher-status.loading {\n                        border-color: #bfdbfe;\n                        background: #eff6ff;\n                        color: #1d4ed8;\n                        font-weight: 700;\n                    }\n                    .platform-voucher-input-row {\n                        display: flex;\n                        align-items: center;\n                        gap: 8px;\n                        margin-bottom: 8px;\n                    }\n                    .platform-voucher-input-row .setting-input { flex: 1 1 auto; min-width: 0; }\n                    .platform-voucher-paste-btn {\n                        flex: 0 0 auto;\n                        width: 40px;\n                        height: 40px;\n                        border: 1px solid #d1d5db;\n                        background: #fff;\n                        color: #374151;\n                        border-radius: 6px;\n                        font-size: 18px;\n                        cursor: pointer;\n                        display: inline-flex;\n                        align-items: center;\n                        justify-content: center;\n                    }\n                    .platform-voucher-paste-btn:hover { border-color: #ff4500; background: #fff7ed; }\n                    .platform-voucher-paste-btn:disabled { opacity: .55; cursor: not-allowed; }\n                    .platform-voucher-autocomplete {\n                        position: fixed;\n                        z-index: 120010;\n                        overflow-y: auto;\n                        overscroll-behavior: contain;\n                        -webkit-overflow-scrolling: touch;\n                        padding: 5px;\n                        border: 1px solid #d1d5db;\n                        border-radius: 8px;\n                        background: #fff;\n                        box-shadow: 0 12px 30px rgba(15, 23, 42, .24);\n                        box-sizing: border-box;\n                    }\n                    .platform-voucher-suggestion {\n                        width: 100%;\n                        display: flex;\n                        flex-direction: column;\n                        align-items: flex-start;\n                        gap: 2px;\n                        padding: 9px 10px;\n                        border: 0;\n                        border-radius: 6px;\n                        background: #fff;\n                        color: #1f2937;\n                        text-align: left;\n                        cursor: pointer;\n                        touch-action: manipulation;\n                    }\n                    .platform-voucher-suggestion:hover,\n                    .platform-voucher-suggestion.active { background: #fff1eb; color: #c2410c; }\n                    .platform-voucher-suggestion-code { font-size: 14px; line-height: 1.3; font-weight: 800; letter-spacing: .3px; word-break: break-all; }\n                    .platform-voucher-suggestion-name { font-size: 12px; line-height: 1.3; color: #4b5563; }\n                    .platform-voucher-suggestion-id { font-size: 11px; line-height: 1.25; color: #6b7280; }\n                    .platform-voucher-retry-btn {\n                        border: 1px solid #f97316;\n                        background: #fff;\n                        color: #ea580c;\n                        border-radius: 6px;\n                        padding: 4px 8px;\n                        font-size: 12px;\n                        font-weight: 800;\n                        cursor: pointer;\n                        margin-left: 6px;\n                    }\n                    .platform-voucher-retry-btn:hover {\n                        background: #ffedd5;\n                    }\n                    .btn-save-settings:disabled {\n                        background: #9ca3af;\n                        cursor: not-allowed;\n                        transform: none;\n                        box-shadow: none;\n                    }\n                    .voucher-shop-card {\n                        display: flex;\n                        align-items: stretch;\n                        gap: 10px;\n                        padding: 10px;\n                        background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);\n                        border-left: 3px solid #ef4444;\n                    }\n                    .voucher-shop-left {\n                        width: 70px;\n                        flex: 0 0 70px;\n                        display: flex;\n                        flex-direction: column;\n                        align-items: center;\n                        justify-content: flex-start;\n                        gap: 6px;\n                    }\n                    .voucher-shop-left-link {\n                        text-decoration: none;\n                        color: inherit;\n                        display: flex;\n                        flex-direction: column;\n                        align-items: center;\n                        gap: 6px;\n                    }\n                    .voucher-shop-icon {\n                        width: 56px;\n                        height: 56px;\n                        object-fit: cover;\n                        border-radius: 8px;\n                        border: 1px solid #e5e7eb;\n                    }\n                    .voucher-shop-left-link:hover .voucher-shop-icon {\n                        border-color: #ef4444;\n                    }\n                    .voucher-shop-icon-text {\n                        font-size: 10px;\n                        line-height: 1.2;\n                        color: #6b7280;\n                        text-align: center;\n                        word-break: break-word;\n                    }\n                    .voucher-shop-right {\n                        flex: 1;\n                        min-width: 0;\n                    }\n                    .voucher-shop-code {\n                        font-size: 16px;\n                        line-height: 1.2;\n                        letter-spacing: 2px;\n                        color: #ef4444;\n                        font-weight: 800;\n                        font-family: \"Courier New\", monospace;\n                        margin-bottom: 6px;\n                    }\n                    .voucher-shop-code-link {\n                        text-decoration: none;\n                    }\n                    .voucher-shop-code-link:hover .voucher-shop-code {\n                        text-decoration: underline;\n                    }\n                    .voucher-shop-terms {\n                        font-size: 12px;\n                        color: #374151;\n                        margin-bottom: 10px;\n                    }\n                    .voucher-shop-meta-row {\n                        font-size: 12px;\n                        color: #4b5563;\n                        margin-bottom: 10px;\n                        line-height: 1.2;\n                    }\n                    .voucher-shop-meta-value {\n                        color: #16a34a;\n                    }\n                    .voucher-shop-meta-time {\n                        color: #059669;\n                        font-weight: 600;\n                        margin-bottom: 0;\n                        line-height: 1.2;\n                    }\n                    .time-picker { display: flex; align-items: center; justify-content: center; gap: 8px; }\n                    .time-field { text-align: center; }\n                    .time-field label { display: block; font-size: 11px; color: #888; margin-bottom: 4px; }\n                    .time-field input {\n                        width: 60px; padding: 8px; text-align: center; border: 1px solid #ddd;\n                        border-radius: 4px; font-size: 16px; font-weight: 600;\n                    }\n                    .time-sep { font-size: 20px; font-weight: bold; color: #666; padding-top: 18px; }\n                    \n                    .quantity-input-container { \n                        margin-top: 12px; padding: 12px; background: #f5f5f5; border-radius: 6px;\n                        display: flex; align-items: center; gap: 12px;\n                    }\n                    .quantity-label { font-size: 14px; font-weight: 600; color: #333; }\n                    .quantity-input { width: 80px !important; text-align: center; }\n                    \n                    .btn-save-settings {\n                        background: linear-gradient(135deg, #ff4500, #ff7337); color: white;\n                        border: none; padding: 12px 24px; border-radius: 6px; font-size: 14px;\n                        font-weight: 600; cursor: pointer; transition: all 0.2s;\n                    }\n                    .btn-save-settings:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255, 69, 0, 0.3); }\n\n                    .order-items-panel {\n                        margin-top: 12px;\n                        border: 1px solid #e5e7eb;\n                        border-radius: 10px;\n                        background: #fff;\n                        padding: 10px;\n                        flex: 1;\n                        min-height: 0;\n                        display: flex;\n                        flex-direction: column;\n                    }\n                    #order-items-list {\n                        flex: 1;\n                        min-height: 0;\n                        overflow-y: auto;\n                        overflow-x: hidden;\n                        padding-right: 2px;\n                    }\n                    .order-items-header {\n                        display: flex;\n                        align-items: center;\n                        justify-content: space-between;\n                        margin-bottom: 8px;\n                        gap: 8px;\n                    }\n                    .order-items-title {\n                        font-size: 13px;\n                        font-weight: 700;\n                        color: #1f2937;\n                    }\n                    .order-items-count {\n                        font-size: 12px;\n                        color: #6b7280;\n                    }\n                    .order-item-empty {\n                        font-size: 12px;\n                        color: #6b7280;\n                        padding: 8px 6px;\n                    }\n                    .order-item-row {\n                        display: grid;\n                        grid-template-columns: 98px 1fr auto auto;\n                        gap: 10px;\n                        align-items: center;\n                        border: 1px solid #f1f5f9;\n                        border-radius: 8px;\n                        padding: 10px;\n                        margin-top: 6px;\n                        background: #f8fafc;\n                    }\n                    .order-item-row.order-item-row-oos {\n                        border-color: #fecaca;\n                        background: #fff1f2;\n                    }\n                    .order-item-row.order-item-row-gift {\n                        margin-left: 36px;\n                        border-style: dashed;\n                        border-color: #fecaca;\n                        background: #fff7ed;\n                    }\n                    .order-item-image {\n                        width: 98px;\n                        height: 98px;\n                        border-radius: 8px;\n                        object-fit: cover;\n                        background: #e5e7eb;\n                    }\n                    .order-item-main {\n                        flex: 1;\n                        min-width: 0;\n                        margin-left: 20px;\n                    }\n                    .order-item-title {\n                        font-size: 13px;\n                        font-weight: 600;\n                        color: #111827;\n                        line-height: 1.7;\n                        max-height: calc(1.7em * 2);\n                        overflow: hidden;\n                    }\n                    .order-item-variant {\n                        font-size: 12px;\n                        color: #374151;\n                        margin-top: 4px;\n                        line-height: 1.7;\n                    }\n                    .order-item-price {\n                        font-size: 12px;\n                        color: #ea580c;\n                        font-weight: 700;\n                        margin-top: 4px;\n                        line-height: 1.7;\n                    }\n                    .order-item-price-old {\n                        text-decoration: line-through;\n                        color: #9ca3af;\n                        font-weight: 500;\n                        padding-left: 3px;\n                    }\n                    .order-item-stock {\n                        font-size: 11px;\n                        color: #059669;\n                        margin-top: 2px;\n                    }\n                    .order-item-qty {\n                        width: 58px;\n                        min-width: 58px;\n                        max-width: 58px;\n                        flex: 0 0 58px;\n                        text-align: center;\n                        border: 1px solid #cbd5e1;\n                        border-radius: 6px;\n                        height: 30px;\n                        font-size: 12px;\n                    }\n                    .order-item-remove {\n                        border: 1px solid #ef4444;\n                        background: #fff;\n                        color: #ef4444;\n                        border-radius: 6px;\n                        height: 30px;\n                        padding: 0 10px;\n                        font-size: 12px;\n                        cursor: pointer;\n                    }\n                    .order-item-add-btn {\n                        border: 1px solid #2563eb;\n                        color: #2563eb;\n                        background: #eff6ff;\n                        border-radius: 6px;\n                        font-size: 12px;\n                        font-weight: 600;\n                        padding: 8px 10px;\n                        cursor: pointer;\n                    }\n\n                    /* Shop group accordion */\n                    .order-shop-group { border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 8px; overflow: hidden; background: #fff; }\n                    .order-shop-header {\n                        display: flex; align-items: center; gap: 8px;\n                        padding: 9px 12px; cursor: pointer; user-select: none;\n                        background: #f8fafc; border-bottom: 1px solid #e5e7eb;\n                        transition: background 0.15s;\n                    }\n                    .order-shop-header:hover { background: #f1f5f9; }\n                    .order-shop-arrow { font-size: 11px; color: #6b7280; transition: transform 0.2s; flex-shrink: 0; }\n                    .order-shop-arrow.open { transform: rotate(90deg); }\n                    .order-shop-name { font-size: 13px; font-weight: 700; color: #1f2937; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n                    .order-shop-badge { background: #ff4d4f; color: #fff; border-radius: 999px; font-size: 10px; font-weight: 700; padding: 1px 6px; flex-shrink: 0; }\n                    .order-shop-body { display: none; padding: 8px 10px 0; }\n                    .order-shop-body.open { display: block; }\n                    .order-checkout-summary {\n                        border-top: 1px solid #f1f5f9; margin-top: 6px; padding: 8px 2px 6px;\n                        display: flex; flex-direction: column; gap: 3px;\n                    }\n                    .order-checkout-row { display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: #4b5563; line-height: 1.55; }\n                    .order-checkout-row.voucher { color: #059669; }\n                    .order-checkout-row.total { font-weight: 700; color: #1f2937; font-size: 12.5px; padding-top: 3px; border-top: 1px dashed #e5e7eb; margin-top: 2px; }\n                    .order-voucher-applied-icon { width: 14px; height: 14px; margin-left: 4px; vertical-align: text-bottom; }\n                    .order-checkout-loading { font-size: 11px; color: #9ca3af; padding: 6px 2px; }\n                    .order-grand-total-container {\n                        border-top: 2px solid #fee2e2; margin-top: 4px; padding-top: 6px;\n                    }\n                    .order-coin-discount-row {\n                        display: flex; justify-content: space-between; align-items: center;\n                        padding: 2px 4px 4px; font-size: 12px; color: #d97706; font-weight: 600;\n                    }\n                    .order-coin-discount-value { color: #d97706; font-weight: 700; font-size: 13px; }\n                    .order-grand-total-row {\n                        display: flex; justify-content: flex-end; align-items: center;\n                        padding: 2px 4px 4px;\n                        gap: 8px;\n                    }\n                    .order-grand-total-label { font-size: 13px; color: #374151; font-weight: 600; }\n                    .order-grand-total-value { font-size: 15px; font-weight: 800; color: #dc2626; }\n                    .order-checkout-error { font-size: 11px; color: #ef4444; padding: 4px 2px; }\n\n                    /* Logs */\n                    .autobuy-log-section { \n                        background: #1e1e1e; border-radius: 10px; overflow: hidden; \n                        display: flex; flex-direction: column; height: 230px; flex: 0 0 230px;\n                    }\n                    .autobuy-log-header {\n                        background: #2d2d2d; color: #fff; padding: 8px 12px; font-size: 12px;\n                        font-weight: 600; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;\n                    }\n                    .autobuy-log-actions { display: inline-flex; align-items: center; gap: 8px; }\n                    .autobuy-log-icon-btn {\n                        border: 1px solid #4b5563; background: #1f2937; color: #d1d5db;\n                        border-radius: 6px; width: 26px; height: 24px; cursor: pointer; line-height: 1;\n                        display: inline-flex; align-items: center; justify-content: center; font-size: 13px;\n                    }\n                    .autobuy-log-icon-btn:hover { color: #fff; border-color: #9ca3af; }\n                    .autobuy-log-container {\n                        padding: 8px;\n                        overflow-y: auto;\n                        overflow-x: hidden;\n                        flex: 1;\n                        scroll-behavior: smooth;\n                        word-break: break-word;\n                        overflow-wrap: anywhere;\n                    }\n                    .autobuy-log-container::-webkit-scrollbar { width: 6px; }\n                    .autobuy-log-container::-webkit-scrollbar-track { background: #1e1e1e; }\n                    .autobuy-log-container::-webkit-scrollbar-thumb { background: #444; border-radius: 3px; }\n\n                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }\n                    @keyframes slideIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }\n                    \n                    /* ===== DESKTOP/MOBILE VIEW TOGGLE ===== */\n                    .desktop-view { display: block; }\n                    .mobile-view { display: none; }\n                    \n                    /* ===== MOBILE VIEW STYLES ===== */\n                    .mobile-product-header { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; }\n                    .mobile-product-img { width: 80px; height: 80px; border-radius: 6px; object-fit: cover; border: 1px solid #eee; flex-shrink: 0; }\n                    .mobile-product-info { flex: 1; min-width: 0; }\n                    .mobile-product-title { font-size: 13px; font-weight: 600; color: #333; line-height: 1.4; margin: 0 0 8px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }\n                    .mobile-price-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }\n                    .mobile-price { font-size: 16px; font-weight: 700; color: #ee4d2d; }\n                    .mobile-price-original { font-size: 11px; color: #999; text-decoration: line-through; }\n                    .mobile-discount { background: #ee4d2d; color: white; font-size: 9px; padding: 2px 4px; border-radius: 3px; font-weight: 600; }\n                    .mobile-stock-row { display: flex; align-items: center; gap: 6px; }\n                    .mobile-stock-label { font-size: 12px; color: #666; }\n                    .mobile-stock { font-size: 13px; font-weight: 600; color: #52c41a; }\n                    .mobile-stock.out-of-stock { color: #ff4d4f; }\n                    \n                    .mobile-model-section { margin-bottom: 12px; }\n                    .mobile-model-title { font-size: 12px; color: #666; margin-bottom: 8px; font-weight: 600; }\n                    .mobile-model-options { display: flex; flex-wrap: wrap; gap: 6px; max-height: 100px; overflow-y: auto; }\n                    .mobile-model-btn {\n                        display: flex; align-items: center; gap: 5px; padding: 6px 10px;\n                        border: 1px solid #ddd; border-radius: 4px; background: white;\n                        cursor: pointer; transition: all 0.2s; font-size: 11px; color: #333;\n                    }\n                    .mobile-model-btn:hover { border-color: #ff4500; background: #fff8f5; }\n                    .mobile-model-btn.selected { border-color: #ff4500; background: #fff8f5; color: #ff4500; }\n                    .mobile-model-btn img { width: 24px; height: 24px; border-radius: 3px; object-fit: cover; }\n                    \n                    .mobile-actions { display: flex; gap: 8px; }\n                    .mobile-btn-advanced { flex: 0 0 auto; padding: 10px 14px; background: #f0f0f0; color: #666; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; }\n                    .mobile-btn-start { flex: 1; background: linear-gradient(135deg, #52c41a, #389e0d); color: white; border: none; padding: 12px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }\n                    .mobile-btn-stop { flex: 1; background: linear-gradient(135deg, #ff4d4f, #cf1322); color: white; border: none; padding: 12px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }\n                    \n                    /* ===== RESPONSIVE SWITCH ===== */\n                    @media screen and (max-width: 600px) {\n                        .desktop-view { display: none !important; }\n                        .mobile-view { display: block !important; }\n                        \n                        .autobuy-modal-container {\n                            width: 100%;\n                            min-width: 0;\n                            max-width: 100%;\n                            border-radius: 0;\n                            max-height: 90%;\n                            box-sizing: border-box;\n                        }\n                        .autobuy-modal-header { padding: 10px 12px; }\n                        .autobuy-modal-header h2 { font-size: 1rem; line-height: 1.2; }\n                        .autobuy-modal-body { padding: 8px; gap: 8px; }\n                        .autobuy-input-section { padding: 8px; border-radius: 8px; }\n                        .autobuy-source-tabs { margin-bottom: 8px; }\n                        .autobuy-source-tab { font-size: 12px; padding: 8px 6px; white-space: nowrap; }\n                        .autobuy-cart-list {\n                            max-height: none;\n                            height: auto;\n                            flex: 1 1 auto;\n                            min-height: 0;\n                            padding: 8px;\n                        }\n                        .autobuy-cart-shop-head { padding: 10px; }\n                        .autobuy-cart-shop-avatar { width: 32px; height: 32px; }\n                        .autobuy-cart-shop-name { font-size: 14px; }\n                        .autobuy-cart-item { grid-template-columns: 56px 1fr auto; align-items: flex-start; gap: 10px; }\n                        .autobuy-cart-item-img { width: 56px; height: 56px; }\n                        .autobuy-cart-item-title { font-size: 14px; }\n                        .autobuy-cart-item-meta { font-size: 11px; }\n                        .autobuy-cart-item-label { width: 60px; min-width: 60px; }\n                        .autobuy-cart-item-add { padding: 7px 8px; font-size: 11px; }\n                        .autobuy-cart-item-gift { margin-left: 16px; }\n                        .autobuy-content-area { padding: 10px; border-radius: 8px; }\n                        .autobuy-input-group input { font-size: 14px; }\n                        .autobuy-clear-btn { font-size: 16px; }\n                        .autobuy-action-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }\n                        .autobuy-btn { padding: 11px 8px; font-size: 13px; white-space: nowrap; }\n\n                        .mobile-product-header { gap: 10px; margin-bottom: 10px; }\n                        .mobile-product-img { width: 72px; height: 72px; }\n                        .mobile-product-title { font-size: 12px; margin-bottom: 6px; -webkit-line-clamp: 3; }\n                        .mobile-price { font-size: 15px; }\n                        .mobile-stock-label { font-size: 11px; }\n                        .mobile-stock { font-size: 12px; }\n                        .mobile-model-section { margin-bottom: 10px; }\n                        .mobile-model-title { font-size: 11px; margin-bottom: 6px; }\n                        .mobile-model-options { max-height: 92px; gap: 5px; }\n                        .mobile-model-btn { font-size: 10px; padding: 5px 8px; }\n                        .mobile-model-btn img { width: 20px; height: 20px; }\n\n                        .mobile-actions {\n                            display: grid;\n                            grid-template-columns: auto auto 1fr;\n                            gap: 6px;\n                            align-items: stretch;\n                        }\n                        .order-item-add-btn,\n                        .mobile-btn-advanced { padding: 10px 10px; font-size: 12px; }\n                        .mobile-btn-start,\n                        .mobile-btn-stop {\n                            grid-column: 3;\n                            width: 100%;\n                            padding: 10px 12px;\n                            font-size: 13px;\n                        }\n\n                        .order-items-panel { margin-top: 10px; padding: 8px; border-radius: 8px; }\n                        .order-items-title { font-size: 12px; }\n                        .order-items-count { font-size: 11px; }\n                        .order-item-row {\n                            display: grid;\n                            grid-template-columns: 44px 1fr auto auto;\n                            align-items: center;\n                            gap: 6px;\n                            padding: 7px;\n                        }\n                        .order-item-row.order-item-row-gift { margin-left: 10px; }\n                        .order-item-image { width: 44px; height: 44px; }\n                        .order-item-title {\n                            font-size: 11px;\n                            white-space: nowrap;\n                            overflow: hidden;\n                            text-overflow: ellipsis;\n                        }\n                        .order-item-main { margin-left: 0; }\n                        .order-item-variant { font-size: 10px; }\n                        .order-item-qty { width: 52px; height: 28px; font-size: 11px; }\n                        .order-item-remove { height: 28px; padding: 0 8px; font-size: 11px; }\n\n                        .autobuy-log-section { height: 230px; flex: 0 0 230px; border-radius: 8px; }\n                        .autobuy-log-header { padding: 7px 10px; font-size: 11px; }\n                        .autobuy-log-container { padding: 6px; }\n                        \n                        /* Mobile Advanced Modal */\n                        .advanced-modal {\n                            padding: 8px;\n                            align-items: flex-end;\n                        }\n                        .advanced-modal-content {\n                            width: 100%;\n                            max-width: 100%;\n                            max-height: 94vh;\n                            border-radius: 16px 16px 10px 10px;\n                        }\n                        .advanced-modal-header { padding: 12px 16px; }\n                        .advanced-modal-body { padding: 12px 14px 18px; }\n                        .advanced-tab-navigation {\n                            padding: 8px 14px 0;\n                        }\n                        .advanced-tab-btn {\n                            padding: 8px 10px;\n                            font-size: 13px;\n                        }\n                        .setting-grid-3 {\n                            grid-template-columns: repeat(2, 1fr) !important;\n                            gap: 8px !important;\n                        }\n                        .setting-card-field {\n                            padding: 9px 12px;\n                        }\n                        .setting-card-field .setting-input,\n                        .setting-input {\n                            font-size: 16px; /* Prevent iOS auto zoom */\n                        }\n                        .setting-card-block {\n                            padding: 10px;\n                            margin-bottom: 8px;\n                        }\n                        .setting-group { margin-bottom: 10px; }\n                        .voucher-shop-input-row {\n                            display: grid;\n                            grid-template-columns: auto minmax(0, 1fr) auto;\n                            align-items: center;\n                            gap: 6px;\n                        }\n                        .voucher-shop-paste-btn,\n                        .voucher-shop-validate-btn {\n                            width: auto;\n                            white-space: nowrap;\n                            height: 38px;\n                        }\n                        .voucher-shop-result { border-radius: 10px; }\n                        .voucher-shop-card { padding: 12px; }\n                        .voucher-shop-left { display: none; }\n                        .voucher-shop-code { font-size: 16px; letter-spacing: 2px; margin-bottom: 8px; }\n                        .voucher-shop-terms { font-size: 14px; margin-bottom: 8px; }\n                        .voucher-shop-meta-row { font-size: 13px; margin-bottom: 6px; }\n                        .time-picker { gap: 8px; }\n                        .time-field input { width: 55px; padding: 6px 2px; font-size: 16px; }\n                        .time-sep { font-size: 18px; padding-top: 14px; }\n                        .advanced-modal-footer {\n                            padding: 10px 14px;\n                        }\n                        .btn-save-settings {\n                            width: 100%;\n                            padding: 12px;\n                            font-size: 15px;\n                            border-radius: 8px;\n                        }\n                    }\n                </style>\n            ",
        _0x516b2a = document.getElementById("shopee-autobuy-styles");
      if (_0x516b2a) _0x516b2a.remove();
      document.head.insertAdjacentHTML("beforeend", _0x1fd17c);
      document.body.appendChild(_0x40c0e1);
      _0x1f5362();
      _0x4071cb();
      _0x1ecce3 && _0x129165();
      let _0x23631f = null;
      window._autoBuyLogVisible = true;
      window.closeAutoBuyModal = () => {
        _0x5acbd4.isRunning = false;
        _0x54a97b.nSmfV(_0x38e7d6);
        _0x54a97b.ZYNgs(_0x2cff8b);
        _0x2987c4.closed = true;
        _0x54a97b.nOfax(clearTimeout, _0x2987c4.timeoutId);
        _0x2987c4.controller?.["abort"]("session_closed");
        _0x2987c4.records = [];
        _0x2987c4.byCode.clear();
        _0x2987c4.byPromotionId.clear();
        _0x2987c4.promise = null;
        _0x54a97b.BXeZu(clearTimeout, _0x2afda3);
        _0x4d2c49.stopped = true;
        _0x4d2c49.controller?.["abort"]("session_closed");
        _0x4d2c49.loaded = null;
        _0x4d2c49.uiState = "stopped";
        _0x54a97b.mSAbj(_0x2892c9);
        _0x54a97b.FZpHu(_0xeba1ed);
        _0x5acbd4.shopVoucherEnabled = false;
        _0x5acbd4.shopVoucherCode = '';
        _0x5acbd4.shopVoucherData = null;
        _0x5acbd4.shopVoucherAutoBestOutsideList = false;
        _0x5acbd4.orderItems = [];
        _0x5acbd4.shopVoucherByShop = {};
        _0x5acbd4.shopInfoById = {};
        _0x5acbd4.selectedVoucherShopId = 0;
        _0x54a97b.FZpHu(_0x50f245);
        const _0x1247e7 = document.getElementById(_0x1e1a52);
        if (_0x1247e7) _0x1247e7.remove();
        _0x54a97b.mAcMm(_0x23631f, null) && (document.body.style.overflow = _0x23631f, _0x23631f = null);
      };
      window.clearAutoBuyInput = () => document.getElementById("autobuy-url-input").value = '';
      window.toggleAutoBuyLogSection = () => {
        window._autoBuyLogVisible = !window._autoBuyLogVisible;
        const _0x22c354 = document.getElementById("autobuy-log-section"),
          _0x2dec69 = document.getElementById("autobuy-toggle-log-btn");
        _0x22c354 && (_0x22c354.style.display = window._autoBuyLogVisible ? "flex" : "none");
        _0x2dec69 && (_0x2dec69.title = window._autoBuyLogVisible ? "Ẩn log" : "Hiện log", _0x2dec69.innerHTML = "<i class=\"fas " + (window._autoBuyLogVisible ? "fa-eye" : "fa-eye-slash") + "\"></i>");
      };
      window.openAutoBuyImagePreview = _0x3d140c => {
        const _0x502706 = document.getElementById("autobuy-image-preview-modal"),
          _0x104126 = document.getElementById("autobuy-image-preview-img");
        if (!_0x502706 || !_0x104126 || !_0x3d140c) return;
        _0x104126.src = _0x59e2f9.uGUKb(String, _0x3d140c);
        _0x502706.style.display = "flex";
      };
      window.closeAutoBuyImagePreview = _0x1e98c9 => {
        const _0x26fadf = document.getElementById("autobuy-image-preview-modal"),
          _0x15a9f4 = document.getElementById("autobuy-image-preview-img");
        if (!_0x26fadf || !_0x15a9f4) return;
        const _0x49a481 = _0x1e98c9?.["target"];
        if (_0x49a481 && _0x54a97b.BsHxw(_0x49a481, _0x26fadf) && !_0x54a97b.euAbj(String, _0x49a481.className || '').includes("autobuy-image-preview-close")) return;
        _0x26fadf.style.display = "none";
        _0x15a9f4.src = '';
      };
      window.clearLogs = () => document.getElementById("autobuy-log-container").innerHTML = '';
      window.copyLogs = async () => {
        const _0x415f06 = document.getElementById("autobuy-log-container");
        if (!_0x415f06) return;
        const _0x6fc6f = (_0x415f06.innerText || '').trim();
        if (!_0x6fc6f) {
          _0x1d9aeb.info("Chưa có log để copy.");
          return;
        }
        try {
          await navigator.clipboard.writeText(_0x6fc6f);
          _0x1d9aeb.success("Đã copy log.");
        } catch (_0x2c97b8) {
          _0x1d9aeb.error("Không thể copy log. Trình duyệt chặn clipboard.");
        }
      };
      const _0xf5a07f = {
          'loading': false,
          'loadingMore': false,
          'loadedAt': 0x0,
          'error': '',
          'shopsOrder': [],
          'shops': {},
          'pendingShops': [],
          'loadedShops': new Set(),
          'allKeys': new Set(),
          'removedGiftKeys': new Set(),
          'openShopId': 0x0
        },
        _0x35f560 = (_0x39fbc7, _0x54e81f) => "addon_" + (Number(_0x39fbc7) || 0) + '_' + (Number(_0x54e81f) || 0),
        _0x33fcc2 = _0xd2f97e => '₫' + Math.max(0, Number(_0xd2f97e || 0)).toLocaleString("vi-VN"),
        _0x18ae59 = () => {
          const _0x89aaab = [];
          return _0xf5a07f.shopsOrder.forEach(_0x1564e1 => {
            const _0x1c9bb0 = _0xf5a07f.shops[_0x1564e1];
            if (!_0x1c9bb0 || !Array.isArray(_0x1c9bb0.products)) return;
            _0x1c9bb0.products.forEach(_0x4b5d2e => {
              if (_0x4b5d2e.is_add_on_sub_item && _0x4b5d2e.cart_entry_key && _0xf5a07f.removedGiftKeys.has(_0x4b5d2e.cart_entry_key)) return;
              _0x89aaab.push({
                ..._0x4b5d2e,
                'shopName': _0x1c9bb0.shopname || ''
              });
            });
          }), _0x89aaab;
        },
        _0x476a29 = _0x2510da => {
          const _0x59cfca = {
              'gKJjP': function (_0x1faed2, _0x202c41) {
                return _0x54a97b.apGjV(_0x1faed2, _0x202c41);
              },
              'AcAIS': function (_0x5bf322, _0x40afa5) {
                return _0x54a97b.GuauG(_0x5bf322, _0x40afa5);
              },
              'BemAr': function (_0x3c7c0c, _0x4773e7) {
                return _0x54a97b.GKnll(_0x3c7c0c, _0x4773e7);
              },
              'WujRJ': function (_0x5489aa, _0xe919b7) {
                return _0x54a97b.JVuvz(_0x5489aa, _0xe919b7);
              },
              'jAlqu': function (_0x328135, _0x156ec2) {
                return _0x54a97b.jBfvM(_0x328135, _0x156ec2);
              },
              'XfrAm': function (_0x5e9d21, _0x23501d) {
                return _0x54a97b.blCAx(_0x5e9d21, _0x23501d);
              },
              'RtYZc': function (_0xe22136, _0x18f3c5) {
                return _0x54a97b.aaBgG(_0xe22136, _0x18f3c5);
              },
              'eyGJb': function (_0x4d6cc5, _0x4a744e) {
                return _0x54a97b.blCAx(_0x4d6cc5, _0x4a744e);
              },
              'gmjcH': function (_0x5f1ce2, _0x202553) {
                return _0x54a97b.oqZdY(_0x5f1ce2, _0x202553);
              },
              'inDKm': function (_0x31a780, _0x59422c) {
                return _0x54a97b.mGChy(_0x31a780, _0x59422c);
              },
              'GrzqS': function (_0x129d07, _0x267cad) {
                return _0x54a97b.apGjV(_0x129d07, _0x267cad);
              },
              'LJohw': function (_0x44ea4e, _0x296035) {
                return _0x54a97b.QofYs(_0x44ea4e, _0x296035);
              },
              'evCPb': function (_0x387225, _0x55d221) {
                return _0x54a97b.apJaD(_0x387225, _0x55d221);
              },
              'vFURE': function (_0x49db6d, _0x383ab4, _0x31af4d, _0x444e60, _0x304df8, _0x30c2e9) {
                return _0x54a97b.GuuPa(_0x49db6d, _0x383ab4, _0x31af4d, _0x444e60, _0x304df8, _0x30c2e9);
              }
            },
            _0x3c0ea0 = _0x2510da?.["data"] || {};
          Array.isArray(_0x3c0ea0.cart_block_id_list) && _0x3c0ea0.cart_block_id_list.forEach(_0x2f59f6 => {
            if (!Array.isArray(_0x2f59f6?.["item_briefs"]) || !_0x2f59f6.item_briefs.length) return;
            const _0x5a4b14 = _0x54a97b.bDmWL(Number, _0x2f59f6?.["shopids"]?.[0] || 0);
            if (!_0x5a4b14) return;
            !_0xf5a07f.shopsOrder.includes(_0x5a4b14) && _0xf5a07f.shopsOrder.push(_0x5a4b14);
            if (!_0xf5a07f.loadedShops.has(_0x5a4b14)) {
              const _0x312355 = _0xf5a07f.pendingShops.some(_0x31ada2 => Number(_0x31ada2?.["shopid"]) === _0x5a4b14);
              !_0x312355 && _0xf5a07f.pendingShops.push({
                'shopid': _0x5a4b14,
                'items': _0x2f59f6.item_briefs
              });
            }
          });
          if (!Array.isArray(_0x3c0ea0.cart_blocks)) return;
          _0x3c0ea0.cart_blocks.forEach(_0x5c7ca7 => {
            if (!Array.isArray(_0x5c7ca7?.["shops"]) || !_0x5c7ca7.shops.length) return;
            const _0x4c49dd = _0x5c7ca7.shops[0],
              _0xbfc40f = _0x54a97b.nFdLe(Number, _0x4c49dd?.["shopid"] || 0);
            if (!_0xbfc40f) return;
            if (!_0xf5a07f.shops[_0xbfc40f]) _0xf5a07f.shops[_0xbfc40f] = {
              'shopname': _0x54a97b.RRQNB(String, _0x4c49dd?.["shopname"] || '').trim(),
              'portrait': _0x54a97b.oqknm(String, _0x4c49dd?.["portrait"] || '').trim(),
              'products': []
            };else !_0xf5a07f.shops[_0xbfc40f].shopname && _0x4c49dd?.["shopname"] && (_0xf5a07f.shops[_0xbfc40f].shopname = _0x54a97b.QYPJb(String, _0x4c49dd.shopname).trim());
            Array.isArray(_0x5c7ca7.items) && _0x5c7ca7.items.forEach(_0x32bd44 => {
              if (!_0x32bd44) return;
              const _0x59f751 = {
                'shopid': _0xbfc40f,
                'itemid': _0x59cfca.gKJjP(Number, _0x32bd44.itemid || 0),
                'modelid': _0x59cfca.AcAIS(Number, _0x32bd44.modelid || 0),
                'quantity': _0x59cfca.BemAr(_0x59cfca.WujRJ(Number, _0x32bd44.stock || _0x32bd44.normal_stock || 0), 0) ? 0 : _0x59cfca.AcAIS(Number, _0x32bd44.quantity || 1),
                'name': _0x59cfca.WujRJ(String, _0x32bd44.name || '').trim(),
                'model_name': _0x59cfca.jAlqu(String, _0x32bd44.model_name || '').trim(),
                'price': _0x59cfca.XfrAm(_0x59cfca.RtYZc(Number, _0x32bd44.price || 0), 100000),
                'price_before_discount': _0x59cfca.eyGJb(_0x59cfca.RtYZc(Number, _0x32bd44.price_before_discount || 0), 100000),
                'origin_cart_item_price': _0x59cfca.XfrAm(_0x59cfca.RtYZc(Number, _0x32bd44.origin_cart_item_price || 0), 100000),
                'image': _0x59cfca.gmjcH(String, _0x32bd44.image || '').trim(),
                'stock': _0x59cfca.inDKm(Number, _0x32bd44.stock || _0x32bd44.normal_stock || 0),
                'normal_stock': _0x59cfca.AcAIS(Number, _0x32bd44.normal_stock || 0),
                'addin_time': _0x59cfca.GrzqS(Number, _0x32bd44.addin_time || 0),
                'is_add_on_sub_item': _0x59cfca.LJohw(_0x32bd44.is_add_on_sub_item, true),
                'add_on_deal_id': _0x59cfca.evCPb(Number, _0x32bd44.add_on_deal_id || 0),
                'add_on_deal_info': _0x32bd44.add_on_deal_info || null
              };
              if (!_0x59f751.itemid || !_0x59f751.modelid) return;
              const _0x52bb0a = _0x59cfca.vFURE(_0x1ad3eb, _0x59f751.shopid, _0x59f751.itemid, _0x59f751.modelid, _0x59f751.add_on_deal_id, _0x59f751.is_add_on_sub_item);
              if (_0xf5a07f.allKeys.has(_0x52bb0a)) return;
              _0xf5a07f.allKeys.add(_0x52bb0a);
              _0x59f751.cart_entry_key = _0x52bb0a;
              _0xf5a07f.shops[_0xbfc40f].products.push(_0x59f751);
            });
            _0xf5a07f.loadedShops.add(_0xbfc40f);
            _0xf5a07f.pendingShops = _0xf5a07f.pendingShops.filter(_0x5850ce => Number(_0x5850ce?.["shopid"]) !== _0xbfc40f);
          });
        };
      window.renderAutoBuyCartItems = () => {
        const _0x5baec9 = {
            'WUUDr': function (_0x198f22, _0x166d2b) {
              return _0x54a97b.QCHRo(_0x198f22, _0x166d2b);
            },
            'FxEAK': function (_0x35fc24, _0x46cfb4) {
              return _0x54a97b.AjSxg(_0x35fc24, _0x46cfb4);
            },
            'JKxNn': function (_0x4901dd, _0x141edd) {
              return _0x54a97b.ZeybO(_0x4901dd, _0x141edd);
            },
            'LoZLl': function (_0x14c23b, _0xff90e7) {
              return _0x54a97b.EUXaR(_0x14c23b, _0xff90e7);
            },
            'eVWwP': function (_0x233144, _0x13846f) {
              return _0x54a97b.KnzUB(_0x233144, _0x13846f);
            },
            'bgclS': function (_0x2dd67e, _0x2b94d6) {
              return _0x54a97b.hhNuF(_0x2dd67e, _0x2b94d6);
            },
            'OfVvb': function (_0x5c124e, _0x370741) {
              return _0x5c124e || _0x370741;
            },
            'SgHIV': function (_0x3da65b, _0x383c07) {
              return _0x54a97b.blCAx(_0x3da65b, _0x383c07);
            },
            'twTTQ': function (_0x406354, _0x282d68) {
              return _0x54a97b.nFdLe(_0x406354, _0x282d68);
            },
            'ZAIRf': function (_0x4b6016, _0x24e140) {
              return _0x54a97b.QyqyY(_0x4b6016, _0x24e140);
            },
            'rCyzr': function (_0xe40aa1, _0x19597b) {
              return _0x54a97b.xcLPo(_0xe40aa1, _0x19597b);
            },
            'oKkWK': "autobuy-cart-item-oos",
            'vWhZb': "autobuy-cart-item-gift",
            'hpMXC': function (_0x3482cd, _0x228c78) {
              return _0x54a97b.orsAq(_0x3482cd, _0x228c78);
            },
            'oeioy': function (_0x4c201d, _0x35278e) {
              return _0x54a97b.HZwsC(_0x4c201d, _0x35278e);
            },
            'VbbaN': function (_0x1b8a2d, _0x2a8722) {
              return _0x54a97b.GHYLh(_0x1b8a2d, _0x2a8722);
            },
            'BxzYf': function (_0xafcb53, _0x232baa) {
              return _0x54a97b.pGnNz(_0xafcb53, _0x232baa);
            },
            'lUyym': "--:-- | --/--",
            'IjwDm': "gift-remove-btn",
            'WUdVx': function (_0x3b20fc, _0x15a12a, _0x473ca1, _0x42ed78, _0x33cb31, _0x55b1c3) {
              return _0x54a97b.GuuPa(_0x3b20fc, _0x15a12a, _0x473ca1, _0x42ed78, _0x33cb31, _0x55b1c3);
            },
            'IyubE': "fa-trash",
            'VObMy': "fa-shopping-cart",
            'zgmzo': "Xóa",
            'xheXm': "Thêm",
            'nHWCs': function (_0x59d6df, _0x534b7d) {
              return _0x54a97b.WbWcA(_0x59d6df, _0x534b7d);
            },
            'iNWbG': function (_0x4784f0, _0x4c1170) {
              return _0x54a97b.OqCbt(_0x4784f0, _0x4c1170);
            },
            'nHdct': function (_0x3cbb5e, _0x25f164) {
              return _0x54a97b.aVGGz(_0x3cbb5e, _0x25f164);
            },
            'ocvDc': function (_0x4b4a17, _0x367373) {
              return _0x54a97b.HAVKy(_0x4b4a17, _0x367373);
            },
            'GvCHJ': function (_0x44b4db, _0x14c26a) {
              return _0x54a97b.vSQxt(_0x44b4db, _0x14c26a);
            },
            'DWBdy': function (_0x4a0a08, _0x46c8bc) {
              return _0x54a97b.drOsH(_0x4a0a08, _0x46c8bc);
            },
            'nIhQf': function (_0x4e5001, _0x4c8bce) {
              return _0x54a97b.cNFCd(_0x4e5001, _0x4c8bce);
            },
            'ATurw': " style=\"display:none;\"",
            'AxDdY': "fas fa-chevron-up",
            'FzTjx': "fas fa-chevron-down",
            'aIGMj': function (_0xd78df0, _0x2b26da) {
              return _0x54a97b.QCHRo(_0xd78df0, _0x2b26da);
            }
          },
          _0x37f962 = document.getElementById("autobuy-cart-list"),
          _0x47212a = document.getElementById("autobuy-cart-load-more-btn");
        if (!_0x37f962) return;
        if (_0xf5a07f.loading && !_0xf5a07f.loadedAt) {
          _0x37f962.innerHTML = "<div class=\"autobuy-cart-empty\">Đang tải giỏ hàng...</div>";
          if (_0x47212a) _0x47212a.style.display = "none";
          return;
        }
        if (_0xf5a07f.error) {
          _0x37f962.innerHTML = "<div class=\"autobuy-cart-empty\">" + _0x54a97b.HZwsC(_0x47f96e, _0xf5a07f.error) + "</div>";
          if (_0x47212a) _0x47212a.style.display = "none";
          return;
        }
        const _0x13df04 = _0xf5a07f.shopsOrder.some(_0x1bdcbf => {
          const _0x169497 = _0xf5a07f.shops[_0x1bdcbf];
          return _0x169497 && Array.isArray(_0x169497.products) && _0x54a97b.ZGUVV(_0x169497.products.length, 0);
        });
        if (!_0x13df04) {
          _0x37f962.innerHTML = "<div class=\"autobuy-cart-empty\">Giỏ hàng trống hoặc chưa có sản phẩm đủ điều kiện.</div>";
          if (_0x47212a) _0x47212a.style.display = "none";
          return;
        }
        !_0xf5a07f.openShopId && Array.isArray(_0xf5a07f.shopsOrder) && _0xf5a07f.shopsOrder.length && (_0xf5a07f.openShopId = _0x54a97b.OJzdE(Number, _0xf5a07f.shopsOrder[0] || 0));
        _0x37f962.innerHTML = _0xf5a07f.shopsOrder.map((_0x36f8b5, _0x207dc8) => {
          const _0x519538 = {
              'Eswwa': function (_0x5c457e, _0x1f1580) {
                return _0x5baec9.bgclS(_0x5c457e, _0x1f1580);
              },
              'zcqyA': function (_0x4a332a, _0x4aabaa) {
                return _0x5baec9.nHWCs(_0x4a332a, _0x4aabaa);
              },
              'VJXKD': function (_0x26d34c, _0x3544bc) {
                return _0x5baec9.FxEAK(_0x26d34c, _0x3544bc);
              },
              'kJEEo': function (_0x3c58bc, _0x56a4bf) {
                return _0x5baec9.iNWbG(_0x3c58bc, _0x56a4bf);
              },
              'smoUz': function (_0x5818fa, _0x1fb83f) {
                return _0x5baec9.nHdct(_0x5818fa, _0x1fb83f);
              },
              'SGgVQ': function (_0x4ef7e8, _0x13db86) {
                return _0x5baec9.ocvDc(_0x4ef7e8, _0x13db86);
              }
            },
            _0x246230 = _0xf5a07f.shops[_0x36f8b5];
          if (!_0x246230 || !Array.isArray(_0x246230.products) || !_0x246230.products.length) return '';
          const _0x29dcd7 = _0x246230.products.map(_0x5c2deb => {
              const _0x461a5b = _0x5baec9.WUUDr(_0x47f96e, _0x5c2deb.name || "SP " + _0x5c2deb.itemid),
                _0x6cdc5d = _0x5baec9.WUUDr(Number, _0x5c2deb.price || 0),
                _0x17f8c1 = _0x5baec9.FxEAK(_0x33fcc2, _0x6cdc5d),
                _0x2b0a8f = _0x5baec9.JKxNn(_0x5baec9.LoZLl(Number, _0x5c2deb.price_before_discount || 0), 0) ? _0x5baec9.FxEAK(_0x33fcc2, _0x5c2deb.price_before_discount) : '',
                _0x1294d6 = _0x5c2deb.is_add_on_sub_item ? 0 : _0x5baec9.eVWwP(Number, _0x5c2deb.origin_cart_item_price || 0),
                _0xf5e4f3 = _0x5c2deb.is_add_on_sub_item ? 0 : _0x5baec9.bgclS(_0x5baec9.FxEAK(Number, _0x6cdc5d || 0), Math.max(0, _0x5baec9.WUUDr(Number, _0x5c2deb.quantity || 0))),
                _0xc382d7 = _0x5baec9.SgHIV(_0x5baec9.WUUDr(Number, _0x5c2deb.add_on_deal_info?.["purchase_min_spend"] || 0), 100000),
                _0x3d8c0c = _0x5c2deb.image ? "https://down-vn.img.susercontent.com/file/" + _0x5c2deb.image : '',
                _0x17dda2 = "https://shopee.vn/product/" + _0x5baec9.twTTQ(Number, _0x5c2deb.shopid || 0) + '/' + _0x5baec9.WUUDr(Number, _0x5c2deb.itemid || 0),
                _0x31a3f5 = _0x5baec9.ZAIRf(_0x2af69d, _0x17dda2),
                _0x168460 = _0x5c2deb.addin_time ? (() => {
                  const _0x1690e6 = new Date(_0x519538.Eswwa(_0x5c2deb.addin_time, 1000)),
                    _0x20818c = _0x519538.zcqyA(String, _0x1690e6.getHours()).padStart(2, '0'),
                    _0x3895b3 = _0x519538.VJXKD(String, _0x1690e6.getMinutes()).padStart(2, '0'),
                    _0x489ee1 = _0x519538.kJEEo(String, _0x1690e6.getDate()).padStart(2, '0'),
                    _0x1a39e7 = _0x519538.smoUz(String, _0x519538.SGgVQ(_0x1690e6.getMonth(), 1)).padStart(2, '0');
                  return _0x20818c + ':' + _0x3895b3 + " | " + _0x489ee1 + '/' + _0x1a39e7;
                })() : '';
              return "\n                <div class=\"autobuy-cart-item " + (_0x5baec9.rCyzr(_0x5c2deb.stock, 0) ? "autobuy-cart-item-oos" : '') + '\x20' + (_0x5c2deb.is_add_on_sub_item ? "autobuy-cart-item-gift" : '') + "\">\n                  <img class=\"autobuy-cart-item-img\" src=\"" + _0x3d8c0c + "\" alt=\"\" onerror=\"this.style.display='none'\" onclick=\"openAutoBuyImagePreview('" + _0x5baec9.LoZLl(_0x47f96e, _0x3d8c0c) + "')\">\n                  <div class=\"autobuy-cart-item-main\">\n                    <div class=\"autobuy-cart-item-title\">" + (_0x5c2deb.is_add_on_sub_item ? "<span class=\"autobuy-gift-tag\">Quà tặng</span> " : '') + "<a class=\"autobuy-cart-item-title-link\" href=\"" + _0x5baec9.hpMXC(_0x47f96e, _0x31a3f5) + "\" target=\"_blank\" rel=\"noopener\">" + _0x461a5b + "</a></div>\n                    <div class=\"autobuy-cart-item-meta\"><span class=\"autobuy-cart-item-label\">Phân loại:</span>" + (_0x5c2deb.model_name ? "<span class=\"autobuy-cart-item-variant\">" + _0x5baec9.oeioy(_0x47f96e, _0x5c2deb.model_name) + "</span>" : "<span class=\"autobuy-cart-item-value\">--</span>") + "</div>\n                    <div class=\"autobuy-cart-item-meta\"><span class=\"autobuy-cart-item-label\">Giá:</span><span class=\"autobuy-cart-item-value\">" + _0x17f8c1 + "</span>" + (_0x2b0a8f ? "<span class=\"autobuy-cart-item-old\">" + _0x2b0a8f + "</span>" : '') + "</div>\n                    <div class=\"autobuy-cart-item-meta\"><span class=\"autobuy-cart-item-label\">Giá bỏ giỏ:</span><span class=\"autobuy-cart-item-value\">" + _0x5baec9.WUUDr(_0x33fcc2, _0x1294d6) + "</span></div>\n                    <div class=\"autobuy-cart-item-meta\"><span class=\"autobuy-cart-item-label\">SL giỏ:</span><span class=\"autobuy-cart-item-value\">x" + Math.max(0, _0x5baec9.ZAIRf(Number, _0x5c2deb.quantity || 0)) + " = <strong>" + _0x5baec9.VbbaN(_0x33fcc2, _0xf5e4f3) + "</strong></span></div>\n                    " + (_0x5c2deb.is_add_on_sub_item ? "<div class=\"autobuy-cart-item-meta\"><span class=\"autobuy-cart-item-label\">Mua tối thiểu:</span><span class=\"autobuy-cart-item-value\">" + (_0x5baec9.JKxNn(_0xc382d7, 0) ? _0x5baec9.BxzYf(_0x33fcc2, _0xc382d7) : '--') + "</span></div>" : '') + "\n                    <div class=\"autobuy-cart-item-meta\"><span class=\"autobuy-cart-item-label\">Thêm giỏ lúc:</span><span class=\"autobuy-cart-item-value\">" + (_0x168460 || "--:-- | --/--") + "</span></div>\n                  </div>\n                  <button class=\"autobuy-cart-item-add " + (_0x5c2deb.is_add_on_sub_item ? "gift-remove-btn" : '') + "\" onclick=\"addCartItemToOrderList('" + (_0x5c2deb.cart_entry_key || _0x5baec9.WUdVx(_0x1ad3eb, _0x5c2deb.shopid, _0x5c2deb.itemid, _0x5c2deb.modelid, _0x5c2deb.add_on_deal_id, _0x5c2deb.is_add_on_sub_item)) + "')\"><i class=\"fas " + (_0x5c2deb.is_add_on_sub_item ? "fa-trash" : "fa-shopping-cart") + "\"></i> " + (_0x5c2deb.is_add_on_sub_item ? "Xóa" : "Thêm") + "</button>\n                </div>\n              ";
            }).join(''),
            _0x3726a3 = _0x5baec9.GvCHJ(_0x5baec9.DWBdy(Number, _0xf5a07f.openShopId || 0), _0x5baec9.nIhQf(Number, _0x36f8b5)),
            _0x44ca5d = _0x3726a3 ? '' : " style=\"display:none;\"",
            _0x5377ab = _0x3726a3 ? "fas fa-chevron-up" : "fas fa-chevron-down",
            _0x2d2895 = _0x246230.portrait ? "https://down-vn.img.susercontent.com/file/" + _0x246230.portrait : '';
          return "\n              <div class=\"autobuy-cart-shop\">\n                <div class=\"autobuy-cart-shop-head\" onclick=\"toggleAutoBuyCartShop('" + _0x36f8b5 + "')\">\n                  <div style=\"display:flex;align-items:center;gap:10px;\">\n                    <img src=\"" + _0x2d2895 + "\" class=\"autobuy-cart-shop-avatar\" alt=\"\" onerror=\"this.style.display='none'\">\n                    <div>\n                    <div class=\"autobuy-cart-shop-name\">" + _0x5baec9.aIGMj(_0x47f96e, _0x246230.shopname || "Shop " + _0x36f8b5) + "</div>\n                    <div class=\"autobuy-cart-shop-count\">" + _0x246230.products.length + " sản phẩm</div>\n                    </div>\n                  </div>\n                  <i class=\"" + _0x5377ab + "\" id=\"autobuy-cart-shop-icon-" + _0x36f8b5 + "\"></i>\n                </div>\n                <div class=\"autobuy-cart-shop-items\" id=\"autobuy-cart-shop-items-" + _0x36f8b5 + '\x22' + _0x44ca5d + ">\n                  " + _0x29dcd7 + "\n                </div>\n              </div>\n            ";
        }).join('');
        _0x47212a && (_0x47212a.style.display = _0x54a97b.VoSsd(_0xf5a07f.pendingShops.length, 0) ? "block" : "none");
      };
      const _0x2bad59 = async _0x341e13 => {
        document.getElementById("autobuy-source-tab-cart")?.["classList"]["toggle"]("active", _0x59e2f9.gHgeE(_0x341e13, "cart"));
        document.getElementById("autobuy-source-tab-url")?.["classList"]["toggle"]("active", _0x59e2f9.nsfZS(_0x341e13, "url"));
        document.getElementById("autobuy-source-tab-order")?.["classList"]["toggle"]("active", _0x59e2f9.CXfxx(_0x341e13, "order"));
        document.getElementById("autobuy-cart-pane")?.["classList"]["toggle"]("active", _0x59e2f9.TECcG(_0x341e13, "cart"));
        document.getElementById("autobuy-url-pane")?.["classList"]["toggle"]("active", _0x59e2f9.EOziP(_0x341e13, "url"));
        document.getElementById("autobuy-order-pane")?.["classList"]["toggle"]("active", _0x59e2f9.TQNYj(_0x341e13, "order"));
        document.getElementById("autobuy-voucher-pane")?.["classList"]["toggle"]("active", _0x59e2f9.lmwkl(_0x341e13, "voucher"));
        _0x59e2f9.inFvB(_0x341e13, "cart") && !_0xf5a07f.loadedAt && !_0xf5a07f.loading && (await window.loadAutoBuyCartData());
      };
      window.switchAutoBuyInputTab = async _0x30fdc6 => {
        const _0x418531 = _0x54a97b.jbmvm(_0x30fdc6, "url") || _0x54a97b.TBqYi(_0x30fdc6, "order") ? _0x30fdc6 : "cart";
        if (_0x54a97b.XRqRg(_0xc66413, "voucher")) {
          _0xc66413 = "order";
          _0x54a97b.ZYNgs(_0x2789fb);
          return;
        }
        await _0x54a97b.oSDOy(_0x2bad59, _0x418531);
      };
      window.toggleAutoBuyMode = () => {
        _0xc66413 = _0x54a97b.ZFmIc(_0xc66413, "voucher") ? "order" : "voucher";
        _0x54a97b.djeDO(_0x2789fb);
      };
      const _0x2789fb = () => {
          const _0x5c10e8 = document.querySelector(".autobuy-modal-container"),
            _0x527dfa = document.getElementById("autobuy-mode-title");
          _0x5c10e8 && _0x5c10e8.classList.toggle("voucher-auto-only", _0x59e2f9.TQNYj(_0xc66413, "voucher"));
          _0x527dfa && (_0x527dfa.innerHTML = _0x59e2f9.KwqkR(_0xc66413, "voucher") ? "<i class=\"fas fa-ticket-alt\"></i> Voucher tự động" : "<i class=\"fas fa-shopping-cart\"></i> Đặt đơn tự động");
          _0x59e2f9.QdSGm(_0x2bad59, _0x59e2f9.kTKcG(_0xc66413, "voucher") ? "voucher" : "order");
        },
        _0x12084a = () => {
          const _0x2feec5 = {
              'JRKuN': " disabled",
              'vXmXq': function (_0x3a679c, _0x556e77) {
                return _0x54a97b.PySVN(_0x3a679c, _0x556e77);
              }
            },
            _0x27234e = document.getElementById("voucher-setting-payment-method"),
            _0x124ea0 = document.getElementById("voucher-payment-method-info"),
            _0x36e8e9 = document.getElementById("voucher-payment-options-dropdown"),
            _0x48b023 = document.querySelector(".voucher-payment-select-trigger-text");
          if (!_0x27234e) return;
          const _0x559c8e = new Set(["cash", "card", "gpay"]),
            _0x477ba5 = (Array.isArray(_0x5acbd4.paymentOptions) && _0x5acbd4.paymentOptions.length ? _0x5acbd4.paymentOptions : _0x54a97b.UXjnG(_0x5161ca)).filter(_0x5219ea => _0x559c8e.has(_0x98562e(_0x5219ea.method))),
            _0x2cd18b = _0x477ba5.find(_0x41f114 => _0x41f114.id === _0x5acbd4.selectedPaymentOption?.['id']) || _0x477ba5.find(_0x4b5879 => _0x4b5879.enabled && _0x98562e(_0x4b5879.method) === _0x98562e(_0x5acbd4.paymentMethod)) || _0x477ba5.find(_0x1e55b3 => _0x1e55b3.enabled) || _0x477ba5[0];
          _0x27234e.innerHTML = _0x477ba5.map(_0x2af880 => "<option value=\"" + _0x47f96e(_0x2af880.id) + '\x22' + (_0x2af880.enabled ? '' : " disabled") + '>' + _0x47f96e((_0x2af880.icon || '💰') + '\x20' + _0x2af880.name + (_0x2af880.detail ? " - " + _0x2af880.detail : '')) + "</option>").join('');
          if (_0x2cd18b) _0x27234e.value = _0x2cd18b.id;
          _0x36e8e9 && (_0x36e8e9.innerHTML = _0x477ba5.map(_0xa00481 => {
            const _0x21a9ec = _0xa00481.detail || (!_0xa00481.enabled ? _0xa00481.disabledReason : ''),
              _0x15703d = _0xa00481.enabled ? '' : " disabled",
              _0x84ee39 = _0xa00481.enabled ? " onclick=\"selectVoucherPaymentOption('" + _0x2feec5.vXmXq(_0x47f96e, _0xa00481.id) + "')\"" : '';
            return "\n                <div class=\"payment-option-item" + _0x15703d + '\x22' + _0x84ee39 + ">\n                  <div class=\"payment-option-row1\">\n                    <span class=\"payment-option-icon\">" + (_0xa00481.icon || '💰') + "</span>\n                    <span class=\"payment-option-name\">" + _0x2feec5.vXmXq(_0x47f96e, _0xa00481.name) + "</span>\n                  </div>\n                  " + (_0x21a9ec ? "<div class=\"payment-option-row2\">" + _0x2feec5.vXmXq(_0x47f96e, _0x21a9ec) + "</div>" : '') + "\n                </div>\n              ";
          }).join(''));
          _0x48b023 && _0x2cd18b && (_0x48b023.innerHTML = "<span class=\"payment-option-icon\">" + (_0x2cd18b.icon || '💰') + "</span> <span style=\"font-weight:500;\">" + _0x54a97b.BPWsP(_0x47f96e, _0x2cd18b.name) + "</span>");
          if (_0x124ea0 && _0x2cd18b) {
            const _0x43d228 = _0x2cd18b.enabled ? _0x2cd18b.detail : _0x2cd18b.disabledReason || "Phương thức này đang bị tắt.";
            _0x124ea0.textContent = _0x43d228 || '';
            _0x124ea0.className = ("payment-method-info " + (_0x2cd18b.enabled ? '' : "error")).trim();
            _0x124ea0.style.display = _0x43d228 ? "block" : "none";
          }
        };
      window.toggleVoucherPaymentDropdown = _0x49173e => {
        _0x49173e.stopPropagation();
        const _0x581c2f = document.querySelector(".voucher-payment-select-container"),
          _0x5a9641 = document.getElementById("voucher-payment-options-dropdown");
        if (!_0x5a9641) return;
        const _0x55f06b = _0x59e2f9.VMHqv(_0x5a9641.style.display, "none");
        _0x5a9641.style.display = _0x55f06b ? "block" : "none";
        if (_0x581c2f) _0x581c2f.classList.toggle("active", _0x55f06b);
      };
      window.selectVoucherPaymentOption = _0x128bac => {
        const _0x207039 = document.getElementById("voucher-setting-payment-method");
        _0x207039 && (_0x207039.value = _0x128bac, _0x207039.dispatchEvent(new Event("change")));
        const _0x27b7a9 = document.getElementById("voucher-payment-options-dropdown"),
          _0x522612 = document.querySelector(".voucher-payment-select-container");
        if (_0x27b7a9) _0x27b7a9.style.display = "none";
        if (_0x522612) _0x522612.classList.remove("active");
      };
      window.handleVoucherPaymentMethodChange = _0x46ee32 => {
        const _0x3b9e1 = Array.isArray(_0x5acbd4.paymentOptions) ? _0x5acbd4.paymentOptions : _0x59e2f9.EusPG(_0x5161ca),
          _0x3aece9 = _0x3b9e1.find(_0x11da9d => _0x11da9d.id === _0x46ee32?.["value"]);
        if (!_0x3aece9 || !_0x3aece9.enabled) {
          _0x59e2f9.kxHCI(_0x12084a);
          return;
        }
        _0x5acbd4.selectedPaymentOption = _0x3aece9;
        _0x5acbd4.paymentMethod = _0x3aece9.method;
        _0x59e2f9.LxCDg(_0x12084a);
      };
      window.toggleVoucherAutoScheduleInputs = () => {
        const _0x5018c1 = !!document.getElementById("voucher-setting-use-schedule")?.["checked"],
          _0x53a897 = document.getElementById("voucher-schedule-inputs");
        if (_0x53a897) _0x53a897.style.display = _0x5018c1 ? "block" : "none";
      };
      window.toggleVoucherAutoTelegramInputs = () => {
        const _0x105754 = !!document.getElementById("voucher-setting-enable-telegram")?.["checked"],
          _0x23b369 = document.getElementById("voucher-telegram-inputs");
        if (_0x23b369) _0x23b369.style.display = _0x105754 ? "block" : "none";
      };
      window.openVoucherAutoSettings = () => {
        const _0x599e16 = document.getElementById("voucher-auto-settings-modal");
        if (!_0x599e16) return;
        _0x599e16.style.display = "flex";
        if (_0x54a97b.ZMNAt(_0x23631f, null)) _0x23631f = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.getElementById("voucher-setting-scan-limit").value = _0x5acbd4.voucher_auto_scan_limit || _0x5acbd4.max_retries || 100;
        document.getElementById("voucher-setting-post-cart-retries").value = _0x5acbd4.post_cart_retry_limit;
        document.getElementById("voucher-setting-delay").value = _0x5acbd4.retry_delay;
        document.getElementById("voucher-setting-use-schedule").checked = _0x5acbd4.useSchedule;
        const _0x4f947a = document.getElementById("voucher-schedule-hour"),
          _0x39a7a7 = document.getElementById("voucher-schedule-minute"),
          _0x124eb2 = document.getElementById("voucher-schedule-second");
        if (_0x4f947a) _0x4f947a.value = _0x54a97b.BzsKh(String, new Date().getHours());
        if (_0x39a7a7) _0x39a7a7.value = '59';
        if (_0x124eb2) _0x124eb2.value = '58';
        document.getElementById("voucher-setting-enable-telegram").checked = _0x5acbd4.telegramEnabled || false;
        document.getElementById("voucher-setting-telegram-token").value = _0x5acbd4.telegramToken || '';
        document.getElementById("voucher-setting-telegram-chatid").value = _0x5acbd4.telegramChatId || '';
        (!Array.isArray(_0x5acbd4.paymentOptions) || !_0x5acbd4.paymentOptions.length) && _0x54a97b.djeDO(_0x5d1fee);
        _0x54a97b.ZySrU(_0x12084a);
        _0x54a97b.Aqmnp(toggleVoucherAutoScheduleInputs);
        _0x54a97b.ZySrU(toggleVoucherAutoTelegramInputs);
      };
      window.closeVoucherAutoSettings = () => {
        const _0x243925 = document.getElementById("voucher-auto-settings-modal");
        if (_0x243925) _0x243925.style.display = "none";
        _0x54a97b.QVhaC(_0x23631f, null) && (document.body.style.overflow = _0x23631f, _0x23631f = null);
      };
      window.saveVoucherAutoSettings = () => {
        const _0x68ea95 = document.getElementById("voucher-setting-scan-limit");
        _0x5acbd4.voucher_auto_scan_limit = _0x54a97b.BlLip(_0x4a062c, _0x68ea95?.["value"], 1, 999999, _0x5acbd4.voucher_auto_scan_limit || 100);
        if (_0x68ea95) _0x68ea95.value = _0x5acbd4.voucher_auto_scan_limit;
        _0x5acbd4.retry_delay = _0x54a97b.yMTiD(_0x4a062c, document.getElementById("voucher-setting-delay")?.["value"], 50, 3600000, _0x5acbd4.retry_delay || 200);
        const _0x139ab1 = document.getElementById("voucher-setting-post-cart-retries");
        _0x5acbd4.post_cart_retry_limit = _0x54a97b.gsEdb(_0x4a062c, _0x139ab1?.["value"], 3, 333, _0x5acbd4.post_cart_retry_limit || 80);
        if (_0x139ab1) _0x139ab1.value = _0x5acbd4.post_cart_retry_limit;
        _0x5acbd4.useSchedule = !!document.getElementById("voucher-setting-use-schedule")?.["checked"];
        if (_0x5acbd4.useSchedule) {
          const _0x255c7f = _0x54a97b.gsEdb(_0x4a062c, document.getElementById("voucher-schedule-hour")?.["value"], 0, 23, 0),
            _0x1282b5 = _0x54a97b.tropB(_0x4a062c, document.getElementById("voucher-schedule-minute")?.["value"], 0, 59, 59),
            _0x21b7c3 = _0x54a97b.AZcPQ(_0x4a062c, document.getElementById("voucher-schedule-second")?.["value"], 0, 59, 58),
            _0x3392cc = new Date(),
            _0x20fee6 = new Date(_0x3392cc.getFullYear(), _0x3392cc.getMonth(), _0x3392cc.getDate(), _0x255c7f, _0x1282b5, _0x21b7c3);
          if (_0x54a97b.xmNzA(_0x20fee6, _0x3392cc)) _0x20fee6.setDate(_0x54a97b.HAVKy(_0x20fee6.getDate(), 1));
          _0x5acbd4.scheduledTime = _0x20fee6;
        } else _0x5acbd4.scheduledTime = null;
        _0x5acbd4.telegramEnabled = !!document.getElementById("voucher-setting-enable-telegram")?.["checked"];
        _0x5acbd4.telegramToken = _0x54a97b.aaBgG(String, document.getElementById("voucher-setting-telegram-token")?.["value"] || '').trim();
        _0x5acbd4.telegramChatId = _0x54a97b.pasHu(String, document.getElementById("voucher-setting-telegram-chatid")?.["value"] || '').trim();
        const _0xc077e1 = document.getElementById("voucher-setting-payment-method"),
          _0x34f69d = Array.isArray(_0x5acbd4.paymentOptions) ? _0x5acbd4.paymentOptions.find(_0x550aa5 => _0x550aa5.id === _0xc077e1?.["value"]) : null;
        _0x34f69d?.["enabled"] ? (_0x5acbd4.selectedPaymentOption = _0x34f69d, _0x5acbd4.paymentMethod = _0x34f69d.method) : _0x54a97b.fuOjZ(_0x5d1fee);
        _0x5acbd4.waitForPriceChange = false;
        _0x5acbd4.onlyAddToCart = false;
        _0x5acbd4.shopVoucherAutoBestOutsideList = false;
        _0x54a97b.SSWVp(_0x171089);
        _0x54a97b.TsGpf(_0x3eda96, "Cài đặt: scans=" + _0x5acbd4.voucher_auto_scan_limit + ", retry=" + _0x5acbd4.post_cart_retry_limit + ", delay=" + _0x5acbd4.retry_delay + "ms, payment=" + (_0x5acbd4.selectedPaymentOption?.["name"] || _0x5acbd4.paymentMethod) + ", Telegram=" + (_0x5acbd4.telegramEnabled ? "Bật" : "Tắt"));
        _0x54a97b.riBeP(closeVoucherAutoSettings);
      };
      window.removeVoucherAutoRule = _0x1af362 => {
        const _0x4d2cee = {
            'JLJuq': ".voucher-auto-rule-title",
            'PmMCW': function (_0x13655b, _0x597d61) {
              return _0x54a97b.nfVuf(_0x13655b, _0x597d61);
            }
          },
          _0xbbe144 = _0x1af362?.["closest"]?.(".voucher-auto-rule-row"),
          _0x521b01 = document.getElementById("voucher-auto-rules");
        if (!_0xbbe144 || !_0x521b01) return;
        if (_0x54a97b.HmfGw(_0x521b01.querySelectorAll(".voucher-auto-rule-row").length, 1)) return;
        _0xbbe144.remove();
        Array.from(_0x521b01.querySelectorAll(".voucher-auto-rule-row")).forEach((_0x461772, _0x131ebd) => {
          const _0x5098d9 = _0x461772.querySelector(".voucher-auto-rule-title");
          if (_0x5098d9) _0x5098d9.textContent = "Rule #" + _0x4d2cee.PmMCW(_0x131ebd, 1);
        });
      };
      window.addVoucherAutoRule = () => {
        const _0x1e56c7 = document.getElementById("voucher-auto-rules");
        if (!_0x1e56c7) return;
        const _0x281f57 = _0x1e56c7.querySelectorAll(".voucher-auto-rule-row").length,
          _0x40cc03 = _0x59e2f9.fKqah(_0x281f57, 1),
          _0x44379f = document.createElement("div");
        _0x44379f.className = "voucher-auto-rule-row";
        _0x44379f.dataset.ruleId = "rule-" + _0x40cc03;
        _0x44379f.innerHTML = "\n          <div class=\"voucher-auto-rule-title\">\n            Rule #" + _0x40cc03 + "\n            <button class=\"order-item-remove\" type=\"button\" onclick=\"removeVoucherAutoRule(this)\">Xóa</button>\n          </div>\n          <div class=\"voucher-auto-rule-grid\">\n            <label>Giá giảm tối thiểu (đ)<input type=\"number\" class=\"voucher-auto-rule-discount\" value=\"0\" min=\"0\" step=\"1000\"></label>\n            <label>% giảm tối thiểu<input type=\"number\" class=\"voucher-auto-rule-percent\" value=\"0\" min=\"0\" max=\"100\" step=\"1\"></label>\n            <label>Đơn tối thiểu từ (đ)<input type=\"number\" class=\"voucher-auto-rule-minspend\" value=\"0\" min=\"0\" step=\"1000\"></label>\n          </div>\n        ";
        _0x1e56c7.appendChild(_0x44379f);
      };
      window.pasteVoucherAutoShopFromClipboard = async () => {
        try {
          const _0x22bd18 = await navigator.clipboard.readText(),
            _0x2b6a0d = document.getElementById("voucher-auto-shop-input");
          if (_0x2b6a0d) _0x2b6a0d.value = _0x22bd18;
        } catch (_0x37ca74) {
          _0x1d9aeb.error(_0x54a97b.WBUmf("Không thể đọc clipboard: ", _0x37ca74.message));
        }
      };
      window.resolveVoucherAutoShopFromUi = async () => {
        try {
          const _0x14483d = document.getElementById("voucher-auto-shop-input")?.["value"] || '';
          _0x59e2f9.WAxhV(_0x3eda96, "Kiểm tra thông tin shop...");
          _0x120c37 = await _0x59e2f9.ZXeyu(_0x1f1228, _0x14483d);
          if (!_0x120c37.shopid) throw new Error("Shop API không trả shopid hợp lệ.");
          _0x59e2f9.XPHJH(_0x3eda96, "Shop id=" + _0x120c37.shopid);
          const _0x361656 = document.getElementById("voucher-auto-shop-card");
          _0x361656 && (_0x361656.style.display = "block", _0x361656.innerHTML = "\n              <div class=\"voucher-auto-shop-main\">\n                " + (_0x120c37.avatarUrl ? "<img class=\"voucher-auto-shop-avatar\" src=\"" + _0x59e2f9.HevBn(_0x47f96e, _0x120c37.avatarUrl) + "\" alt=\"\">" : "<div class=\"voucher-auto-shop-avatar\"></div>") + "\n                <div>\n                  <div class=\"voucher-auto-shop-name\">" + _0x59e2f9.QdSGm(_0x47f96e, _0x120c37.name || "Shop") + "</div>\n                  <div class=\"voucher-auto-shop-meta\">@" + _0x59e2f9.lunBT(_0x47f96e, _0x120c37.username || '--') + "</div>\n                  <div class=\"voucher-auto-shop-meta\">Shop ID: " + _0x59e2f9.RoWqc(_0x47f96e, _0x120c37.shopid) + " | User ID: " + _0x59e2f9.nSUAD(_0x47f96e, _0x120c37.userid) + "</div>\n                </div>\n              </div>");
          _0x4f6351 = [];
          await _0x59e2f9.SVrME(_0x19deb0, _0x120c37.shopid);
          _0x59e2f9.MtuYf(_0x3eda96, "READY", "success");
        } catch (_0x46845f) {
          _0x120c37 = null;
          _0x5b0961 = false;
          _0x59e2f9.pRrYY(_0x3eda96, _0x46845f.message, "error");
        }
      };
      window.loadAutoBuyCartData = async (_0x3316db = false) => {
        if (_0xf5a07f.loading) return;
        if (!_0x3316db && _0x54a97b.xQbyu(_0xf5a07f.loadedAt, 0)) {
          window.renderAutoBuyCartItems();
          return;
        }
        _0xf5a07f.loading = true;
        _0xf5a07f.error = '';
        _0xf5a07f.loadedAt = 0;
        _0xf5a07f.shopsOrder = [];
        _0xf5a07f.shops = {};
        _0xf5a07f.pendingShops = [];
        _0xf5a07f.loadedShops = new Set();
        _0xf5a07f.allKeys = new Set();
        _0xf5a07f.removedGiftKeys = new Set();
        _0xf5a07f.loadingMore = false;
        _0xf5a07f.openShopId = 0;
        window.renderAutoBuyCartItems();
        try {
          const _0x55cb4f = {
              'accept': "application/json",
              'content-type': "application/json"
            },
            _0x38c7e3 = await _0x54a97b.chaAL(fetch, "https://shopee.vn/api/v4/cart/get", {
              'method': "POST",
              'headers': _0x55cb4f,
              'body': "{\"pre_selected_item_list\":[],\"updated_time_filter\":{\"start_time\":0},\"cart_state\":{},\"version_list\":[10040779]}",
              'mode': "cors",
              'credentials': "include"
            });
          if (!_0x38c7e3.ok) throw new Error("Không thể tải giỏ hàng.");
          const _0x55ff83 = await _0x38c7e3.json();
          _0x54a97b.ablSJ(_0x2d1992, _0x55ff83, "cart/get:first");
          _0x54a97b.VZfqy(_0x476a29, _0x55ff83);
          _0xf5a07f.loadedAt = Date.now();
          _0x1d9aeb.success("Đã tải " + _0x54a97b.xufJm(_0x18ae59).length + " sản phẩm từ giỏ hàng.");
        } catch (_0x471202) {
          _0xf5a07f.error = _0x471202?.["message"] || "Lỗi tải giỏ hàng.";
          _0x1d9aeb.error(_0xf5a07f.error);
        } finally {
          _0xf5a07f.loading = false;
          window.renderAutoBuyCartItems();
        }
      };
      window.loadMoreAutoBuyCartShops = async () => {
        if (_0xf5a07f.loading || _0xf5a07f.loadingMore || _0x59e2f9.ombXs(_0xf5a07f.pendingShops.length, 0)) return;
        _0xf5a07f.loadingMore = true;
        const _0x395f1f = document.getElementById("autobuy-cart-load-more-btn");
        _0x395f1f && (_0x395f1f.disabled = true, _0x395f1f.textContent = "⟳ Đang tải...");
        try {
          const _0x52c439 = {
              'accept': "application/json",
              'content-type': "application/json"
            },
            _0x21e976 = _0xf5a07f.pendingShops.slice(0, 10).map(_0x1f33d2 => ({
              'shopid': Number(_0x1f33d2.shopid || 0),
              'item_briefs': Array.isArray(_0x1f33d2.items) ? _0x1f33d2.items : []
            })),
            _0x52fb46 = await _0x59e2f9.rbcHk(fetch, "https://shopee.vn/api/v4/cart/get", {
              'method': "POST",
              'headers': _0x52c439,
              'body': JSON.stringify({
                'shop_order_id_list': _0x21e976,
                'version_list': [10040779]
              }),
              'mode': "cors",
              'credentials': "include"
            });
          if (!_0x52fb46.ok) throw new Error("Không thể tải thêm sản phẩm.");
          const _0x312ab1 = await _0x52fb46.json();
          _0x59e2f9.ewrfH(_0x2d1992, _0x312ab1, "cart/get:more");
          _0x59e2f9.SIOyu(_0x476a29, _0x312ab1);
        } catch (_0x124e03) {
          _0x1d9aeb.error(_0x124e03?.["message"] || "Lỗi tải thêm sản phẩm giỏ.");
        } finally {
          _0xf5a07f.loadingMore = false;
          _0x395f1f && (_0x395f1f.disabled = false, _0x395f1f.textContent = "⟳ Tải thêm sản phẩm");
          window.renderAutoBuyCartItems();
        }
      };
      window.toggleAutoBuyCartShop = _0x25fa57 => {
        const _0xf48ba0 = _0x54a97b.qoiAE(Number, _0x25fa57 || 0);
        if (!_0xf48ba0) return;
        _0xf5a07f.openShopId = _0x54a97b.tJlgP(_0x54a97b.lhcsV(Number, _0xf5a07f.openShopId || 0), _0xf48ba0) ? 0 : _0xf48ba0;
        window.renderAutoBuyCartItems();
      };
      const _0x51ebc0 = (_0x215912 = "unknown") => {
        try {
          const _0xa7a9da = Array.isArray(_0x5acbd4.orderItems) ? _0x5acbd4.orderItems.map(_0x4deeff => _0x5902a5(_0x4deeff)).filter(Boolean) : [],
            _0xbf4971 = _0xa7a9da.reduce((_0x47ffc4, _0x4ea6a1) => _0x47ffc4 + (_0x4ea6a1.isAddOnSubItem ? 0 : Number(_0x4ea6a1.price || 0) * Math.max(0, Number(_0x4ea6a1.quantity || 0))), 0),
            _0xfa79dc = {
              'action': _0x215912,
              'at': new Date().toISOString(),
              'itemCount': _0xa7a9da.length,
              'shopCount': _0x59e2f9.szPlK(_0x112c7e, _0xa7a9da),
              'totalVnd': _0xbf4971,
              'items': _0xa7a9da.map(_0x2b9c07 => ({
                'key': _0x2b9c07.key,
                'shopid': Number(_0x2b9c07.shopid || 0),
                'itemid': Number(_0x2b9c07.itemid || 0),
                'modelid': Number(_0x2b9c07.modelid || 0),
                'qty': Number(_0x2b9c07.quantity || 0),
                'price': Number(_0x2b9c07.price || 0),
                'lineTotal': _0x2b9c07.isAddOnSubItem ? 0 : Number(_0x2b9c07.price || 0) * Math.max(0, Number(_0x2b9c07.quantity || 0)),
                'isGift': _0x2b9c07.isAddOnSubItem === true,
                'title': _0x2b9c07.itemTitle || ''
              }))
            };
          console.log("[AUTO_ORDER][ORDER_SUMMARY]", _0xfa79dc);
        } catch (_0x10e795) {
          console.log("[AUTO_ORDER][ORDER_SUMMARY][ERROR]", _0x10e795?.["message"] || _0x10e795);
        }
      };
      window.addCartItemToOrderList = _0x14d960 => {
        const _0x3a8768 = _0x59e2f9.oqwdD(_0x18ae59),
          _0x2678c3 = _0x3a8768.find(_0x331262 => String(_0x331262.cart_entry_key || '') === String(_0x14d960 || '') || _0x116d1e(_0x331262.shopid, _0x331262.itemid, _0x331262.modelid) === String(_0x14d960 || ''));
        if (!_0x2678c3) {
          _0x1d9aeb.error("Không tìm thấy sản phẩm trong giỏ.");
          return;
        }
        if (_0x2678c3.is_add_on_sub_item) {
          _0x2678c3.cart_entry_key && _0xf5a07f.removedGiftKeys.add(_0x59e2f9.HGeNi(String, _0x2678c3.cart_entry_key));
          const _0x1788b7 = _0xf5a07f.shops[_0x59e2f9.UWoZq(Number, _0x2678c3.shopid || 0)];
          _0x1788b7 && Array.isArray(_0x1788b7.products) && (_0x1788b7.products = _0x1788b7.products.filter(_0x55343a => String(_0x55343a.cart_entry_key || '') !== String(_0x2678c3.cart_entry_key || '')));
          window.renderAutoBuyCartItems();
          const _0x31d8e3 = Array.isArray(_0x5acbd4.orderItems) ? _0x5acbd4.orderItems.map(_0x4c822e => _0x5902a5(_0x4c822e)).filter(Boolean) : [];
          _0x5acbd4.orderItems = _0x31d8e3.filter(_0x34a50e => !(_0x34a50e.key === _0x4f80b4(_0x2678c3.shopid, _0x2678c3.itemid, _0x2678c3.modelid, _0x2678c3.add_on_deal_id, true) && Number(_0x34a50e.addOnDealId || 0) === Number(_0x2678c3.add_on_deal_id || 0) && _0x34a50e.isAddOnSubItem === true));
          window.renderOrderItemList();
          _0x59e2f9.AdZyq(_0x51ebc0, "remove_gift_from_order");
          _0x1d9aeb.info("Đã xóa quà tặng khỏi danh sách đơn.");
          _0x59e2f9.ftUmi(_0x20b379);
          return;
        }
        const _0x2536d5 = Array.isArray(_0x5acbd4.orderItems) ? _0x5acbd4.orderItems.map(_0x570e5e => _0x5902a5(_0x570e5e)).filter(Boolean) : [],
          _0x38eba3 = _0x59e2f9.nNpwd(Number, _0x2678c3.add_on_deal_id || 0),
          _0x1d52b0 = [_0x2678c3];
        let _0x773816 = [];
        if (_0x59e2f9.RmlKz(_0x38eba3, 0)) {
          const _0x4a00bd = _0x59e2f9.Gobkv(_0x59e2f9.UWoZq(Number, _0x2678c3.add_on_deal_info?.["purchase_min_spend"] || 0), 100000),
            _0x7fc55d = _0x59e2f9.hKqiC(_0x59e2f9.Wigbk(Number, _0x2678c3.price || 0), Math.max(0, _0x59e2f9.rHOzx(Number, _0x2678c3.quantity || 0)));
          (_0x59e2f9.mtVKg(_0x4a00bd, 0) || _0x59e2f9.hgTGz(_0x7fc55d, _0x4a00bd)) && (_0x773816 = _0x3a8768.filter(_0x4fbd08 => Number(_0x4fbd08.shopid || 0) === Number(_0x2678c3.shopid || 0) && Number(_0x4fbd08.add_on_deal_id || 0) === _0x38eba3 && _0x4fbd08.is_add_on_sub_item === true));
        }
        const _0x54743c = [..._0x1d52b0, ..._0x773816],
          _0x5b8655 = _0x54743c.map(_0x4b4f29 => _0x5902a5({
            'shopid': _0x4b4f29.shopid,
            'itemid': _0x4b4f29.itemid,
            'modelid': _0x4b4f29.modelid,
            'quantity': Math.max(0, Number(_0x4b4f29.quantity || 0)),
            'itemTitle': _0x4b4f29.name || '',
            'variantName': _0x4b4f29.model_name || '',
            'shopName': _0x4b4f29.shopName || '',
            'image': _0x4b4f29.image ? "https://down-vn.img.susercontent.com/file/" + _0x4b4f29.image : '',
            'price': _0x4b4f29.is_add_on_sub_item ? 0 : Number(_0x4b4f29.price || 0),
            'priceBeforeDiscount': Number(_0x4b4f29.price_before_discount || 0),
            'stock': Number(_0x4b4f29.stock || 0),
            'isAddOnSubItem': _0x4b4f29.is_add_on_sub_item === true,
            'addOnDealId': Number(_0x4b4f29.add_on_deal_id || 0),
            'addOnDealInfo': _0x4b4f29.add_on_deal_info || null,
            'addOnDealGroupKey': Number(_0x4b4f29.add_on_deal_id || 0) > 0 ? _0x35f560(_0x4b4f29.shopid, _0x4b4f29.add_on_deal_id) : ''
          })).filter(Boolean);
        if (!_0x5b8655.length) {
          _0x1d9aeb.error("Dữ liệu nhóm add_on_deal không hợp lệ.");
          return;
        }
        const _0xc271b4 = new Set(_0x5b8655.map(_0x22837a => _0x22837a.key)),
          _0x4e77fa = [..._0x2536d5.filter(_0x4dbc6d => !_0xc271b4.has(_0x4dbc6d.key)), ..._0x5b8655],
          _0x2cf748 = _0x59e2f9.wfGkL(_0x112c7e, _0x4e77fa);
        if (_0x59e2f9.vowPj(_0x2cf748, _0x4f90cc)) {
          _0x1d9aeb.error("Chỉ hỗ trợ tối đa " + _0x4f90cc + " shop mỗi lần checkout.");
          return;
        }
        _0x5acbd4.orderItems = _0x4e77fa;
        window.renderOrderItemList();
        _0x59e2f9.xzIcc(_0x51ebc0, "add_cart_item_to_order");
        _0x1d9aeb.success("Đã thêm nhóm sản phẩm từ giỏ vào danh sách đơn (" + _0x2cf748 + '/' + _0x4f90cc + " shop).");
        const _0xb69902 = _0x5b8655[0];
        _0xb69902.shopid && _0xb69902.shopName && (_0x5acbd4.shopInfoById[_0x59e2f9.KkGoE(Number, _0xb69902.shopid)] = {
          'shopName': _0xb69902.shopName
        });
        _0x4e4248 = _0x59e2f9.HevBn(Number, _0xb69902.shopid || 0);
        _0x5acbd4.selectedVoucherShopId = _0x4e4248;
        _0x59e2f9.ftUmi(_0xf84cf4);
        _0x59e2f9.ZSRvu(_0x20b379, {
          'refreshPaymentOptions': true
        });
      };
      window.switchAutoBuyInputTab("cart");
      window.loadAutoBuyCartData();
      window.renderOrderItemList = () => {
        const _0x3b607c = {
            'MOyuB': function (_0x132636, _0x3f160d) {
              return _0x59e2f9.OjAZi(_0x132636, _0x3f160d);
            },
            'OjmvA': function (_0x30d665, _0x2fd325) {
              return _0x59e2f9.szPlK(_0x30d665, _0x2fd325);
            },
            'QxbMF': function (_0x30497d, _0x30bbd4) {
              return _0x59e2f9.vWwOG(_0x30497d, _0x30bbd4);
            },
            'pmMiA': function (_0x1ac65b, _0xea6dc5) {
              return _0x59e2f9.nPAdl(_0x1ac65b, _0xea6dc5);
            },
            'rgaZK': function (_0x433616, _0x1b4106) {
              return _0x59e2f9.xLHxa(_0x433616, _0x1b4106);
            },
            'KmSCP': function (_0x5f3524, _0x5bd4c4) {
              return _0x59e2f9.PrhqX(_0x5f3524, _0x5bd4c4);
            },
            'AyFys': function (_0x59203a, _0x35908b) {
              return _0x59e2f9.cBLJa(_0x59203a, _0x35908b);
            },
            'FAAiC': "vi-VN",
            'nAcfj': function (_0x415313, _0x2fd54e) {
              return _0x59e2f9.HCiWM(_0x415313, _0x2fd54e);
            },
            'DWoNP': function (_0x13396b, _0x42ad6f) {
              return _0x59e2f9.fuxdn(_0x13396b, _0x42ad6f);
            },
            'DOKyc': function (_0x31445c, _0x314ad4) {
              return _0x59e2f9.ALAgi(_0x31445c, _0x314ad4);
            },
            'tJsod': function (_0x299417, _0x550dc9) {
              return _0x59e2f9.nIZbX(_0x299417, _0x550dc9);
            },
            'iahNe': " order-item-row-gift",
            'qcsyN': " order-item-row-oos",
            'Ydtyx': "<div class=\"order-item-stock\" style=\"color:#dc2626;font-weight:700;\">⚠️ Hết hàng</div>",
            'lkAOB': "disabled",
            'bYQTL': function (_0x2bd8ba, _0x116ecf) {
              return _0x59e2f9.EfVtp(_0x2bd8ba, _0x116ecf);
            },
            'LtHGR': function (_0x567f0e, _0x411672) {
              return _0x59e2f9.YnWuD(_0x567f0e, _0x411672);
            },
            'UFOcf': function (_0x3cb8dc, _0x36c30c) {
              return _0x59e2f9.ALKVx(_0x3cb8dc, _0x36c30c);
            },
            'zSmLJ': function (_0x5538da, _0x38d206) {
              return _0x59e2f9.UsCzy(_0x5538da, _0x38d206);
            },
            'uveUO': function (_0x1e66e3, _0xf7b0c0) {
              return _0x59e2f9.AABwv(_0x1e66e3, _0xf7b0c0);
            },
            'uzJCx': function (_0x112d94, _0x45399a) {
              return _0x59e2f9.cDWad(_0x112d94, _0x45399a);
            },
            'mKkFZ': "Không đủ điều kiện áp dụng",
            'KUJor': function (_0x66c29b, _0x13dcf2) {
              return _0x59e2f9.dlHUg(_0x66c29b, _0x13dcf2);
            },
            'fOeam': "Đã áp dụng",
            'kYofo': function (_0x31659b, _0x1bb770) {
              return _0x59e2f9.TppuM(_0x31659b, _0x1bb770);
            },
            'ecLUz': function (_0x4ff4e8, _0x4fb429) {
              return _0x59e2f9.wLyid(_0x4ff4e8, _0x4fb429);
            }
          },
          _0x45b650 = document.getElementById("order-items-list"),
          _0x9c37b7 = document.getElementById("order-items-count"),
          _0x26f4f6 = document.getElementById("autobuy-order-badge");
        if (!_0x45b650 || !_0x9c37b7) return;
        const _0x569896 = Array.isArray(_0x5acbd4.orderItems) ? _0x5acbd4.orderItems.map(_0x550442 => _0x5902a5(_0x550442)).filter(Boolean) : [],
          _0x492273 = _0x59e2f9.BFFre(_0x112c7e, _0x569896);
        _0x9c37b7.textContent = _0x492273 + '/' + _0x4f90cc;
        if (_0x26f4f6) _0x26f4f6.textContent = _0x59e2f9.hkhfA(String, _0x492273);
        if (!_0x569896.length) {
          _0x45b650.innerHTML = "<div class=\"order-item-empty\">Chưa có sản phẩm trong danh sách đơn.</div>";
          return;
        }
        const _0x54ac03 = new Map();
        _0x569896.forEach(_0x88916f => {
          const _0x727cf3 = _0x3b607c.MOyuB(Number, _0x88916f.shopid || 0);
          if (!_0x54ac03.has(_0x727cf3)) _0x54ac03.set(_0x727cf3, []);
          _0x54ac03.get(_0x727cf3).push(_0x88916f);
        });
        const _0x1920da = window._orderCheckoutState || {},
          _0x67312c = Array.isArray(_0x1920da.shoporders) ? _0x1920da.shoporders : [],
          _0x4d7e3c = Array.isArray(_0x1920da.promotion_data?.["shop_vouchers"]) ? _0x1920da.promotion_data.shop_vouchers : [],
          _0x184722 = !!_0x1920da.loading,
          _0x323532 = _0x1920da.error || '',
          _0x40b4fa = 100000,
          _0x5e361b = _0x19c575 => '₫' + Math.round(Number(_0x19c575 || 0) / _0x40b4fa).toLocaleString("vi-VN");
        let _0x2c9cae = '',
          _0x574944 = 0;
        _0x54ac03.forEach((_0x18625a, _0x26b983) => {
          const _0x281e54 = {
              'VOTuw': function (_0x5c322d, _0x2531ea) {
                return _0x3b607c.OjmvA(_0x5c322d, _0x2531ea);
              },
              'vLcJZ': function (_0x213bbb, _0x523469) {
                return _0x3b607c.QxbMF(_0x213bbb, _0x523469);
              },
              'fcccQ': function (_0x6083e, _0xbea76f) {
                return _0x3b607c.pmMiA(_0x6083e, _0xbea76f);
              },
              'zQFzk': function (_0x145777, _0x587718) {
                return _0x3b607c.rgaZK(_0x145777, _0x587718);
              },
              'yWixz': function (_0x2e4ebc, _0x20ccee) {
                return _0x3b607c.KmSCP(_0x2e4ebc, _0x20ccee);
              },
              'aunRI': function (_0x536a73, _0x1ce71a) {
                return _0x536a73 || _0x1ce71a;
              },
              'urnUS': function (_0x28ba4c, _0x51757c) {
                return _0x3b607c.AyFys(_0x28ba4c, _0x51757c);
              },
              'TtsfY': "vi-VN",
              'pyTaG': function (_0x359f71, _0x255b6a) {
                return _0x3b607c.nAcfj(_0x359f71, _0x255b6a);
              },
              'tthPZ': function (_0x41122d, _0x2bc6c6) {
                return _0x3b607c.DWoNP(_0x41122d, _0x2bc6c6);
              },
              'jQCwu': function (_0x315097, _0x591a0a) {
                return _0x3b607c.DOKyc(_0x315097, _0x591a0a);
              },
              'POurr': function (_0x460da1, _0xd3475a) {
                return _0x3b607c.DOKyc(_0x460da1, _0xd3475a);
              },
              'NOwgo': function (_0x2e2e4f, _0x1242b9) {
                return _0x3b607c.tJsod(_0x2e2e4f, _0x1242b9);
              },
              'AWUmj': " order-item-row-gift",
              'goqTr': " order-item-row-oos",
              'Sxzty': "<div class=\"order-item-stock\" style=\"color:#dc2626;font-weight:700;\">⚠️ Hết hàng</div>",
              'TOdTY': "disabled"
            },
            _0x2de56c = _0x3b607c.AyFys(String, _0x5acbd4.shopInfoById?.[_0x26b983]?.["shopName"] || _0x18625a[0]?.["shopName"] || "Shop " + _0x26b983).trim(),
            _0x61999e = "osg-" + _0x26b983,
            _0x1bb8a1 = _0x18625a.map(_0x2dbfb4 => {
              const _0x1ee7bf = _0x281e54.VOTuw(_0x47f96e, _0x2dbfb4.itemTitle || _0x2dbfb4.itemid),
                _0x102f95 = _0x2dbfb4.variantName ? "<div class=\"order-item-variant\">🔰 Phân loại: " + _0x281e54.vLcJZ(_0x47f96e, _0x2dbfb4.variantName) + "</div>" : '',
                _0x5701a8 = !_0x2dbfb4.isAddOnSubItem && _0x281e54.fcccQ(_0x281e54.vLcJZ(Number, _0x2dbfb4.stock || 0), 0),
                _0x1f232d = _0x2dbfb4.isAddOnSubItem ? 0 : _0x281e54.VOTuw(Number, _0x2dbfb4.price || 0),
                _0x472c5b = _0x281e54.zQFzk(_0x281e54.yWixz(Number, _0x1f232d || 0), 0) || _0x2dbfb4.isAddOnSubItem ? "<div class=\"order-item-price\">₫" + _0x281e54.urnUS(Number, _0x1f232d).toLocaleString("vi-VN") + (_0x281e54.zQFzk(_0x281e54.pyTaG(Number, _0x2dbfb4.priceBeforeDiscount || 0), 0) && !_0x2dbfb4.isAddOnSubItem ? " <span class=\"order-item-price-old\">₫" + _0x281e54.pyTaG(Number, _0x2dbfb4.priceBeforeDiscount).toLocaleString("vi-VN") + "</span>" : '') + "</div>" : '',
                _0x1d1a08 = "https://shopee.vn/product/" + _0x281e54.tthPZ(Number, _0x2dbfb4.shopid || 0) + '/' + _0x281e54.pyTaG(Number, _0x2dbfb4.itemid || 0),
                _0x393c47 = _0x281e54.jQCwu(_0x2af69d, _0x1d1a08),
                _0x554be9 = _0x2dbfb4.isAddOnSubItem ? _0x1ee7bf : "<a class=\"autobuy-cart-item-title-link\" href=\"" + _0x281e54.POurr(_0x47f96e, _0x393c47) + "\" target=\"_blank\" rel=\"noopener\">" + _0x1ee7bf + "</a>",
                _0x5b9289 = _0x2dbfb4.image ? "<img class=\"order-item-image\" src=\"" + _0x281e54.NOwgo(_0x47f96e, _0x2dbfb4.image) + "\" alt=\"\" onerror=\"this.style.display='none'\" onclick=\"openAutoBuyImagePreview('" + _0x281e54.yWixz(_0x47f96e, _0x2dbfb4.image) + "')\" style=\"cursor: zoom-in;\">" : "<div class=\"order-item-image\"></div>",
                _0x1617ed = _0x2dbfb4.isAddOnSubItem ? " order-item-row-gift" : '',
                _0x5dbf8c = _0x5701a8 ? " order-item-row-oos" : '',
                _0x214c4b = _0x5701a8 ? "<div class=\"order-item-stock\" style=\"color:#dc2626;font-weight:700;\">⚠️ Hết hàng</div>" : '';
              return "\n              <div class=\"order-item-row" + _0x1617ed + _0x5dbf8c + "\">\n                " + _0x5b9289 + "\n                <div class=\"order-item-main\">\n                  <div class=\"order-item-title\">" + (_0x2dbfb4.isAddOnSubItem ? "<span class=\"autobuy-gift-tag\">Quà tặng</span> " : '') + _0x554be9 + "</div>\n                  " + _0x102f95 + "\n                  " + _0x472c5b + "\n                  " + _0x214c4b + "\n                </div>\n                <input class=\"order-item-qty\" type=\"number\" min=\"1\" max=\"20\" value=\"" + _0x2dbfb4.quantity + '\x22\x20' + (_0x2dbfb4.isAddOnSubItem ? "disabled" : '') + " onchange=\"updateOrderItemQuantity('" + _0x2dbfb4.key + "', this.value)\">\n                <button class=\"order-item-remove\" onclick=\"removeOrderItem('" + _0x2dbfb4.key + "')\">Xóa</button>\n              </div>";
            }).join('');
          let _0x2cd139 = '';
          if (_0x184722) _0x2cd139 = "<div class=\"order-checkout-loading\">⏳ Đang tải thông tin ưu đãi...</div>";else {
            if (_0x323532) _0x2cd139 = "<div class=\"order-checkout-error\">⚠ " + _0x3b607c.bYQTL(_0x47f96e, _0x323532) + "</div>";else {
              if (_0x3b607c.LtHGR(_0x67312c.length, 0)) {
                const _0x4db507 = _0x67312c.find(_0x3eb1f2 => Number(_0x3eb1f2?.["shop"]?.["shopid"]) === _0x26b983),
                  _0x581a73 = _0x4d7e3c.find(_0x27459f => Number(_0x27459f?.["shopid"]) === _0x26b983);
                if (_0x4db507) {
                  const _0x20849d = _0x3b607c.DWoNP(Number, _0x4db507.shipping_fee || 0);
                  let _0x2cd04b = _0x3b607c.UFOcf(Number, _0x4db507.order_total || 0),
                    _0x272f79 = _0x3b607c.KmSCP(Number, _0x4db507.order_total_without_shipping || 0);
                  const _0x2930ba = _0x18625a.reduce((_0x3a8d21, _0x2c6f0c) => _0x3a8d21 + (_0x2c6f0c.isAddOnSubItem ? 0 : Number(_0x2c6f0c.price || 0) * Math.max(0, Number(_0x2c6f0c.quantity || 0))), 0);
                  _0x3b607c.pmMiA(_0x272f79, 0) && _0x3b607c.rgaZK(_0x2930ba, 0) && (_0x272f79 = Math.round(_0x3b607c.zSmLJ(_0x2930ba, _0x40b4fa)), _0x2cd04b = Math.max(_0x2cd04b, _0x3b607c.uveUO(_0x272f79, _0x20849d)));
                  _0x574944 += _0x2cd04b;
                  let _0x4e8431 = '',
                    _0xc9c5f6 = '';
                  if (_0x581a73) {
                    const _0x46a2a0 = _0x3b607c.UFOcf(Number, _0x581a73.invalid_message_code || 0);
                    if (_0x3b607c.uzJCx(_0x46a2a0, 0)) {
                      const _0x1256bc = _0x581a73.invalid_message || "Không đủ điều kiện áp dụng";
                      _0xc9c5f6 = "<div class=\"order-checkout-row voucher-error\" style=\"color:#ef4444; margin-top:2px;\"><span>⚠ Voucher (" + _0x3b607c.KUJor(_0x47f96e, _0x581a73.voucher_code || '') + ")</span><span style=\"font-size:10.5px; text-align:right; max-width:65%; line-height:1.2;\">" + _0x3b607c.UFOcf(_0x47f96e, _0x1256bc) + "</span></div>";
                    } else {
                      _0x4e8431 = " <img class=\"order-voucher-applied-icon\" src=\"https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/a67394e0bf3ee5f4d181.svg\" alt=\"voucher applied\">";
                      _0xc9c5f6 = "<div class=\"order-checkout-row voucher\"><span>🎟 Voucher (" + _0x3b607c.KmSCP(_0x47f96e, _0x581a73.voucher_code || '') + ")</span><span>" + _0x3b607c.MOyuB(_0x47f96e, _0x581a73.display_info?.["header"] || "Đã áp dụng") + "</span></div>";
                    }
                  }
                  _0x2cd139 = "\n                <div class=\"order-checkout-summary\">\n                  <div class=\"order-checkout-row\"><span>Tiền hàng</span><span>" + _0x3b607c.kYofo(_0x5e361b, _0x272f79) + _0x4e8431 + "</span></div>\n                  <div class=\"order-checkout-row\"><span>Phí vận chuyển</span><span>" + _0x3b607c.ecLUz(_0x5e361b, _0x20849d) + "</span></div>\n                  " + _0xc9c5f6 + "\n                  <div class=\"order-checkout-row total\"><span>Tổng shop</span><span>" + _0x3b607c.ecLUz(_0x5e361b, _0x2cd04b) + "</span></div>\n                </div>";
                }
              }
            }
          }
          _0x2c9cae += "\n            <div class=\"order-shop-group\">\n              <div class=\"order-shop-header\" onclick=\"toggleShopGroup('" + _0x61999e + "')\">\n                <span class=\"order-shop-arrow open\" id=\"" + _0x61999e + "-arrow\">▶</span>\n                <span class=\"order-shop-name\">🏪 " + _0x3b607c.DWoNP(_0x47f96e, _0x2de56c) + "</span>\n                <span class=\"order-shop-badge\">" + _0x18625a.length + "</span>\n              </div>\n              <div class=\"order-shop-body open\" id=\"" + _0x61999e + "-body\">\n                " + _0x1bb8a1 + "\n                " + _0x2cd139 + "\n              </div>\n            </div>";
        });
        let _0x2ad6f3 = '';
        if (_0x59e2f9.PmMTz(_0x67312c.length, 0) && !_0x184722 && !_0x323532) {
          const _0x2d056e = _0x1920da.checkout_price_data || null,
            _0xf7f11b = _0x59e2f9.EfGvP(Boolean, _0x1920da.promotion_data?.["use_coins"]) && _0x59e2f9.eLLZN(_0x59e2f9.lunBT(Number, _0x2d056e?.["shopee_coins_redeemed"] || 0), 0),
            _0x1b2f60 = _0xf7f11b ? _0x59e2f9.gXmGj(Number, _0x2d056e?.["shopee_coins_redeemed"] || 0) : 0,
            _0x3288a8 = _0xf7f11b ? Math.round(_0x59e2f9.louGu(_0x1b2f60, _0x40b4fa)) : 0,
            _0x1b87b1 = _0x59e2f9.Dzybl(Number, _0x2d056e?.["total_payable"] || 0),
            _0x77327d = _0x59e2f9.FoOqM(_0x1b87b1, 0) ? _0x1b87b1 : Math.max(0, _0x59e2f9.rgQVf(_0x574944, _0x1b2f60));
          let _0x9f3e57 = '';
          _0xf7f11b && _0x59e2f9.hjref(_0x1b2f60, 0) && (_0x9f3e57 = "\n              <div class=\"order-coin-discount-row\">\n                <span class=\"order-coin-discount-label\">💰 Đã dùng Shopee Xu (" + _0x3288a8.toLocaleString("vi-VN") + " xu)</span>\n                <span class=\"order-coin-discount-value\">-" + _0x59e2f9.tdcrz(_0x5e361b, _0x1b2f60) + "</span>\n              </div>");
          _0x2ad6f3 = "\n            <div class=\"order-grand-total-container\">\n              " + _0x9f3e57 + "\n              <div class=\"order-grand-total-row\">\n                <span class=\"order-grand-total-label\">Tổng thanh toán</span>\n                <span class=\"order-grand-total-value\">" + _0x59e2f9.eMezw(_0x5e361b, _0x77327d) + "</span>\n              </div>\n            </div>";
        }
        _0x45b650.innerHTML = _0x59e2f9.ZiuCn(_0x2c9cae, _0x2ad6f3);
        _0x59e2f9.HsSPZ(typeof window.renderShopVoucherShopSelector, "function") && window.renderShopVoucherShopSelector();
      };
      window.toggleShopGroup = _0x2d025c => {
        const _0x38ef1c = document.getElementById(_0x2d025c + "-body"),
          _0x2301b8 = document.getElementById(_0x2d025c + "-arrow");
        if (!_0x38ef1c) return;
        const _0x1d6919 = _0x38ef1c.classList.contains("open");
        _0x38ef1c.classList.toggle("open", !_0x1d6919);
        if (_0x2301b8) _0x2301b8.classList.toggle("open", !_0x1d6919);
      };
      window._orderCheckoutState = {
        'loading': false,
        'error': '',
        'shoporders': null,
        'promotion_data': null,
        'checkout_price_data': null
      };
      let _0xbbf4d5 = null,
        _0x3624e9 = false;
      window.fetchOrderCheckoutPreview = async () => {
        const _0x459c46 = _0x3624e9;
        _0x3624e9 = false;
        const _0x2fc49d = Array.isArray(_0x5acbd4.orderItems) ? _0x5acbd4.orderItems.map(_0x43991e => _0x5902a5(_0x43991e)).filter(Boolean) : [];
        if (!_0x2fc49d.length) {
          window._orderCheckoutState = {
            'loading': false,
            'error': '',
            'shoporders': [],
            'promotion_data': null,
            'checkout_price_data': null
          };
          if (_0x459c46) _0x59e2f9.KoCCz(_0x5d1fee);
          window.renderOrderItemList();
          return;
        }
        window._orderCheckoutState = {
          'loading': true,
          'error': '',
          'shoporders': null,
          'promotion_data': null,
          'checkout_price_data': null
        };
        window.renderOrderItemList();
        try {
          const _0x3f45d9 = _0x59e2f9.UvXfb(_0x4d4c36),
            _0x53c52d = _0x59e2f9.bkrJX(_0x42fe82),
            _0x4cfe7c = _0x59e2f9.YzKxP(_0x59a8ac, _0x2fc49d),
            _0x4e51ea = _0x59e2f9.PsSUa(_0x3b5c82, _0x2fc49d, 0),
            _0x2c75d8 = _0x59e2f9.EIlCI(_0x3c84d4),
            _0x21a58b = {
              'shoporders': _0x4cfe7c,
              'cart_type': 0x1,
              'client_id': 0x5,
              '_cft': [1811668587, 2923429887, 1162652],
              'selected_payment_channel_data': _0x53c52d.selected_payment_channel_data,
              'promotion_data': {
                'use_coins': !!_0x5acbd4.use_coins,
                'free_shipping_voucher_info': {
                  'free_shipping_voucher_id': 0x0
                },
                'platform_vouchers': _0x2c75d8,
                'shop_vouchers': _0x4e51ea.shopVouchers,
                'check_shop_voucher_entrances': true,
                'auto_apply_platform_voucher': _0x59e2f9.MpGkc(_0x2c75d8.length, 0),
                'auto_apply_shop_voucher': _0x4e51ea.autoApplyShopVoucher
              },
              'device_info': {
                'device_id': '',
                'device_fingerprint': '',
                'tongdun_blackbox': '',
                'buyer_payment_info': {},
                'timezone_offset_in_minutes': 0x1a4,
                'device_sz_fingerprint': _0x3f45d9.fingerprint
              },
              'tax_info': {
                'tax_id': ''
              },
              'checkout_session_id': _0x53c52d.checkout_session_id,
              'timestamp': _0x53c52d.timestamp
            },
            _0x43af34 = await _0x59e2f9.agYGD(fetch, "https://shopee.vn/api/v4/checkout/get", {
              'headers': {
                'content-type': "application/json",
                'x-api-source': _0x59e2f9.ERvYK(_0x4cbd05),
                'x-csrftoken': _0x3f45d9.csrf,
                'x-shopee-language': 'vi'
              },
              'body': JSON.stringify(_0x21a58b),
              'method': "POST",
              'mode': "cors",
              'credentials': "include"
            }),
            _0x1e8398 = await _0x43af34.json();
          _0x59e2f9.eOwLW(_0x2d1992, _0x1e8398, "checkout/get:preview");
          _0x59e2f9.BMWUa(_0x5301d9, _0x1e8398, "checkout/get:preview");
          if (_0x1e8398 && !_0x1e8398.error) {
            window._orderCheckoutState = {
              'loading': false,
              'error': '',
              'shoporders': _0x1e8398.shoporders || [],
              'promotion_data': _0x1e8398.promotion_data || null,
              'checkout_price_data': _0x1e8398.checkout_price_data || null
            };
            _0x459c46 && window.refreshPaymentOptionsFromCheckout(_0x1e8398);
          } else {
            window._orderCheckoutState = {
              'loading': false,
              'error': _0x1e8398?.["error_msg"] || "Không tải được thông tin đơn hàng.",
              'shoporders': [],
              'promotion_data': null,
              'checkout_price_data': null
            };
            if (_0x459c46) _0x59e2f9.igmjB(_0x5d1fee);
          }
        } catch (_0x1aacca) {
          window._orderCheckoutState = {
            'loading': false,
            'error': _0x1aacca.message || "Lỗi kết nối.",
            'shoporders': [],
            'promotion_data': null,
            'checkout_price_data': null
          };
          if (_0x459c46) _0x59e2f9.HsPTl(_0x5d1fee);
        }
        window.renderOrderItemList();
      };
      const _0x20b379 = (_0x233c11 = {}) => {
          _0x233c11.refreshPaymentOptions && (_0x3624e9 = true);
          _0x59e2f9.sNDql(clearTimeout, _0xbbf4d5);
          _0xbbf4d5 = _0x59e2f9.Xbgoe(setTimeout, () => window.fetchOrderCheckoutPreview(), 600);
        },
        _0xf84cf4 = (_0x2bea79 = {}) => {
          if (!_0xd28b33) return;
          const _0x4cfefb = _0x59e2f9.pHulF(Number, _0x2bea79.preferredShopId || 0),
            _0x1b7b67 = _0x59e2f9.HJJNd(Number, _0x2bea79.removedShopId || 0),
            _0x137380 = Array.isArray(_0x5acbd4.orderItems) ? _0x5acbd4.orderItems.map(_0x14ce88 => _0x5902a5(_0x14ce88)).filter(Boolean) : [],
            _0x2a2e4b = Array.from(new Set(_0x137380.map(_0x311ec5 => Number(_0x311ec5.shopid || 0)).filter(_0x38571b => _0x38571b > 0))),
            _0x49d7d0 = new Set(_0x2a2e4b);
          _0x5acbd4.shopVoucherByShop && _0x59e2f9.nsfZS(typeof _0x5acbd4.shopVoucherByShop, "object") && Object.keys(_0x5acbd4.shopVoucherByShop).forEach(_0x3ce28c => {
            const _0x51373c = _0x54a97b.WbWcA(Number, _0x3ce28c || 0);
            _0x54a97b.ltBOe(_0x51373c, 0) && !_0x49d7d0.has(_0x51373c) && delete _0x5acbd4.shopVoucherByShop[_0x51373c];
          });
          _0x59e2f9.RmlKz(_0x1b7b67, 0) && !_0x49d7d0.has(_0x1b7b67) && _0x5acbd4.shopVoucherByShop && _0x59e2f9.eWMhK(typeof _0x5acbd4.shopVoucherByShop, "object") && delete _0x5acbd4.shopVoucherByShop[_0x1b7b67];
          if (!_0x2a2e4b.length) {
            _0x5acbd4.selectedVoucherShopId = 0;
            _0x59e2f9.CZvrQ(_0xb63af1);
            _0x59e2f9.CZvrQ(_0x6ceae1);
            return;
          }
          const _0x33ee74 = _0x59e2f9.fTiZO(Number, _0x5acbd4.selectedVoucherShopId || 0);
          let _0x1d030a = _0x33ee74;
          if (_0x59e2f9.IYncv(_0x4cfefb, 0) && _0x49d7d0.has(_0x4cfefb)) _0x1d030a = _0x4cfefb;else !_0x49d7d0.has(_0x33ee74) && (_0x49d7d0.has(_0x4e4248) ? _0x1d030a = _0x4e4248 : _0x1d030a = _0x2a2e4b[_0x59e2f9.rgQVf(_0x2a2e4b.length, 1)]);
          _0x59e2f9.ZwCLF(_0x1d030a, _0x33ee74) && (_0x5acbd4.selectedVoucherShopId = _0x1d030a, _0x59e2f9.CZvrQ(_0xb63af1));
          _0x59e2f9.xmIOb(_0x6ceae1);
        };
      window.addCurrentProductToOrderList = () => {
        const _0x2aa1ab = _0x54a97b.qgxLC(_0xac78c7);
        if (!_0x2aa1ab) {
          _0x1d9aeb.error("Vui lòng kiểm tra sản phẩm và chọn phân loại trước.");
          _0x54a97b.JmiOo(_0xf84cf4);
          return;
        }
        const _0x1c13c5 = Array.isArray(_0x5acbd4.orderItems) ? _0x5acbd4.orderItems.map(_0x24a438 => _0x5902a5(_0x24a438)).filter(Boolean) : [],
          _0x10f758 = _0x1c13c5.findIndex(_0x583f1f => _0x583f1f.key === _0x2aa1ab.key);
        if (_0x54a97b.WFayr(_0x10f758, 0)) {
          _0x1c13c5[_0x10f758] = {
            ..._0x1c13c5[_0x10f758],
            'quantity': _0x2aa1ab.quantity,
            'itemTitle': _0x2aa1ab.itemTitle,
            'variantName': _0x2aa1ab.variantName
          };
          _0x5acbd4.orderItems = _0x1c13c5;
          window.renderOrderItemList();
          _0x54a97b.bDmWL(_0x51ebc0, "update_current_item_in_order");
          _0x1d9aeb.info("Đã cập nhật sản phẩm hiện tại trong danh sách đơn.");
          _0x54a97b.mNHmY(_0xf84cf4, {
            'preferredShopId': _0x54a97b.KEQfm(Number, _0x2aa1ab.shopid || 0)
          });
          _0x54a97b.mFXEa(_0x20b379, {
            'refreshPaymentOptions': true
          });
          return;
        }
        const _0x4287be = _0x54a97b.xaarv(_0x112c7e, [..._0x1c13c5, _0x2aa1ab]);
        if (_0x54a97b.zSJfF(_0x4287be, _0x4f90cc)) {
          _0x1d9aeb.error("Chỉ hỗ trợ tối đa " + _0x4f90cc + " shop mỗi lần checkout.");
          return;
        }
        _0x5acbd4.orderItems = [..._0x1c13c5, _0x2aa1ab];
        window.renderOrderItemList();
        _0x54a97b.kMXZH(_0x51ebc0, "add_current_item_to_order");
        _0x1d9aeb.success("Đã thêm vào danh sách đơn (" + _0x4287be + '/' + _0x4f90cc + " shop).");
        const _0x1af302 = _0x54a97b.gdNPL(Number, _0x2aa1ab.shopid || 0);
        _0x1af302 && _0x2aa1ab.shopName && (_0x5acbd4.shopInfoById[_0x1af302] = {
          'shopName': _0x2aa1ab.shopName
        });
        _0x54a97b.gdNPL(_0xf84cf4, {
          'preferredShopId': _0x54a97b.CuUQA(Number, _0x2aa1ab.shopid || 0)
        });
        _0x54a97b.tjJrI(_0x20b379, {
          'refreshPaymentOptions': true
        });
      };
      window.removeOrderItem = _0x47d372 => {
        const _0x25285d = {
            'GyFNJ': function (_0x4117f4, _0x4bb2c3) {
              return _0x54a97b.mFXEa(_0x4117f4, _0x4bb2c3);
            },
            'KsgAB': function (_0x4fb6, _0x27bef4) {
              return _0x54a97b.sEFxL(_0x4fb6, _0x27bef4);
            },
            'mCmQH': function (_0x596612, _0x2ad4f3) {
              return _0x54a97b.YTyAs(_0x596612, _0x2ad4f3);
            },
            'HaZsh': function (_0x4c5d9f, _0x552d6c) {
              return _0x54a97b.PkwWs(_0x4c5d9f, _0x552d6c);
            },
            'GfoRy': function (_0x41bbd7, _0x58ba02) {
              return _0x54a97b.CKlwv(_0x41bbd7, _0x58ba02);
            },
            'KFcLk': function (_0x424618, _0x5c1ae4) {
              return _0x54a97b.NbCiy(_0x424618, _0x5c1ae4);
            },
            'HMTCi': function (_0x4a829c, _0x12aa60, _0x17348f) {
              return _0x54a97b.xtjzz(_0x4a829c, _0x12aa60, _0x17348f);
            },
            'TfkQz': function (_0x28760e) {
              return _0x54a97b.nePny(_0x28760e);
            }
          },
          _0x12942e = _0x190d6e => {
            const _0x58355b = {
              'OhPCf': function (_0x4894d8, _0x538612) {
                return _0x25285d.KFcLk(_0x4894d8, _0x538612);
              },
              'WJSso': function (_0x44b90e, _0x1692c1) {
                return _0x25285d.mCmQH(_0x44b90e, _0x1692c1);
              },
              'GguPV': function (_0x54618c, _0x3831b8, _0x46c597) {
                return _0x25285d.HMTCi(_0x54618c, _0x3831b8, _0x46c597);
              }
            };
            let _0x263175 = Array.isArray(_0x190d6e) ? _0x190d6e.map(_0x15f43d => _0x5902a5(_0x15f43d)).filter(Boolean) : [];
            const _0x3e955e = _0x25285d.TfkQz(_0x18ae59),
              _0x5a49ac = _0x263175.map(_0x1341a4 => {
                if (_0x1341a4.addOnDealGroupKey || _0x58355b.OhPCf(_0x58355b.WJSso(Number, _0x1341a4.addOnDealId || 0), 0)) return _0x1341a4;
                return {
                  ..._0x1341a4,
                  'addOnDealGroupKey': _0x58355b.GguPV(_0x35f560, _0x1341a4.shopid, _0x1341a4.addOnDealId)
                };
              });
            _0x263175 = _0x5a49ac;
            const _0x24dc3f = Array.from(new Set(_0x263175.map(_0x41c602 => String(_0x41c602.addOnDealGroupKey || '')).filter(_0x5ddcf4 => _0x5ddcf4)));
            return _0x24dc3f.forEach(_0x59e195 => {
              const _0x349569 = _0x263175.filter(_0x41f4ac => _0x41f4ac.addOnDealGroupKey === _0x59e195),
                _0xa4d875 = _0x349569.filter(_0x34808d => !_0x34808d.isAddOnSubItem);
              if (!_0xa4d875.length) {
                _0x263175 = _0x263175.filter(_0x567489 => _0x567489.addOnDealGroupKey !== _0x59e195);
                return;
              }
              const _0x265e9f = _0xa4d875[0],
                _0xc17e94 = _0x25285d.GyFNJ(Number, _0x265e9f.addOnDealId || 0),
                _0x5cc2ee = _0x3e955e.find(_0x1f1129 => Number(_0x1f1129.shopid || 0) === Number(_0x265e9f.shopid || 0) && Number(_0x1f1129.add_on_deal_id || 0) === _0xc17e94 && (_0x1f1129.is_add_on_sub_item === false || _0x1f1129.is_add_on_sub_item === true))?.["add_on_deal_info"],
                _0x4e0b66 = _0x25285d.KsgAB(_0x25285d.mCmQH(Number, _0x265e9f?.["addOnDealInfo"]?.["purchase_min_spend"] || _0x5cc2ee?.["purchase_min_spend"] || 0), 100000),
                _0x7020c6 = _0xa4d875.reduce((_0x1aacdf, _0x573596) => _0x1aacdf + Number(_0x573596.price || 0) * Number(_0x573596.quantity || 0), 0);
              _0x263175 = _0x263175.filter(_0x3463f3 => !(_0x3463f3.addOnDealGroupKey === _0x59e195 && _0x3463f3.isAddOnSubItem));
              if (!_0xc17e94 || _0x25285d.HaZsh(_0x4e0b66, 0) && _0x25285d.GfoRy(_0x7020c6, _0x4e0b66)) return;
              const _0x1f888c = _0x3e955e.filter(_0x4eaafc => Number(_0x4eaafc.shopid || 0) === Number(_0x265e9f.shopid || 0) && Number(_0x4eaafc.add_on_deal_id || 0) === _0xc17e94 && _0x4eaafc.is_add_on_sub_item === true).map(_0x53a60f => _0x5902a5({
                  'shopid': _0x53a60f.shopid,
                  'itemid': _0x53a60f.itemid,
                  'modelid': _0x53a60f.modelid,
                  'quantity': Math.max(0, Number(_0x53a60f.quantity || 0)),
                  'itemTitle': _0x53a60f.name || '',
                  'variantName': _0x53a60f.model_name || '',
                  'shopName': _0x53a60f.shopName || '',
                  'image': _0x53a60f.image ? "https://down-vn.img.susercontent.com/file/" + _0x53a60f.image : '',
                  'price': 0x0,
                  'priceBeforeDiscount': Number(_0x53a60f.price_before_discount || 0),
                  'stock': Number(_0x53a60f.stock || 0),
                  'isAddOnSubItem': true,
                  'addOnDealId': _0xc17e94,
                  'addOnDealInfo': _0x53a60f.add_on_deal_info || _0x265e9f.addOnDealInfo || _0x5cc2ee || null,
                  'addOnDealGroupKey': _0x59e195
                })).filter(Boolean),
                _0x3f9a40 = new Set(_0x263175.map(_0x3454bd => _0x3454bd.key));
              _0x1f888c.forEach(_0x3f2eb6 => {
                !_0x3f9a40.has(_0x3f2eb6.key) && (_0x263175.push(_0x3f2eb6), _0x3f9a40.add(_0x3f2eb6.key));
              });
            }), _0x263175;
          },
          _0x5687e9 = Array.isArray(_0x5acbd4.orderItems) ? _0x5acbd4.orderItems.map(_0x254ec0 => _0x5902a5(_0x254ec0)).filter(Boolean) : [],
          _0x5969ab = _0x5687e9.find(_0x56097f => _0x56097f.key === String(_0x47d372)) || null;
        let _0x247bcf = _0x5687e9.filter(_0x4f271d => _0x4f271d.key !== String(_0x47d372));
        _0x247bcf = _0x54a97b.IfUKL(_0x12942e, _0x247bcf);
        _0x5acbd4.orderItems = _0x247bcf;
        window.renderOrderItemList();
        _0x54a97b.HtSDi(_0x51ebc0, "remove_item_from_order");
        const _0x4de460 = _0x54a97b.ZvbKY(Number, _0x5969ab?.["shopid"] || 0);
        let _0x5b4f9c = 0;
        if (_0x54a97b.UUowi(_0x4de460, 0) && _0x247bcf.some(_0x15279b => Number(_0x15279b.shopid || 0) === _0x4de460)) _0x5b4f9c = _0x4de460;else _0x54a97b.AXnsF(_0x247bcf.length, 0) && (_0x5b4f9c = _0x54a97b.Zeowf(Number, _0x247bcf[_0x54a97b.HNwZR(_0x247bcf.length, 1)].shopid || 0));
        _0x54a97b.DfEAf(_0xf84cf4, {
          'preferredShopId': _0x5b4f9c,
          'removedShopId': _0x4de460
        });
        _0x54a97b.iqBiI(_0x20b379);
      };
      window.updateOrderItemQuantity = (_0x4268a1, _0x293123) => {
        const _0x10935b = {
            'StyZW': function (_0x56725e, _0x5bdcee) {
              return _0x54a97b.ZUrCq(_0x56725e, _0x5bdcee);
            },
            'ukWNm': function (_0x59d18e, _0x4b6434) {
              return _0x54a97b.saeih(_0x59d18e, _0x4b6434);
            },
            'LYJEX': function (_0x11e08e, _0x49074e) {
              return _0x54a97b.QCHRo(_0x11e08e, _0x49074e);
            },
            'bepOx': function (_0xf2565a, _0x25e0d5) {
              return _0x54a97b.zedUy(_0xf2565a, _0x25e0d5);
            },
            'yHTpL': function (_0x8ee17, _0x43329c) {
              return _0x54a97b.UebaD(_0x8ee17, _0x43329c);
            },
            'OspWc': function (_0x524ca3, _0x59bca5, _0x3c3e90) {
              return _0x54a97b.xtjzz(_0x524ca3, _0x59bca5, _0x3c3e90);
            },
            'UQXjy': function (_0x61abd6, _0x3860b4) {
              return _0x54a97b.blCAx(_0x61abd6, _0x3860b4);
            },
            'mEuWa': function (_0x17dbf8, _0x5b50c3) {
              return _0x54a97b.QocFI(_0x17dbf8, _0x5b50c3);
            },
            'RkFeD': function (_0x4ef108, _0x4d939a) {
              return _0x54a97b.oDvTE(_0x4ef108, _0x4d939a);
            },
            'wPqpq': function (_0xe07708) {
              return _0x54a97b.JeHjz(_0xe07708);
            }
          },
          _0x282087 = Math.min(20, Math.max(1, _0x54a97b.GEGqP(Number, _0x293123) || 1)),
          _0xffc5a6 = Array.isArray(_0x5acbd4.orderItems) ? _0x5acbd4.orderItems.map(_0x3e5a83 => _0x5902a5(_0x3e5a83)).filter(Boolean) : [];
        let _0x5ba3f0 = 0;
        _0x5acbd4.orderItems = _0xffc5a6.map(_0x493639 => {
          if (_0x10935b.StyZW(_0x493639.key, _0x10935b.ukWNm(String, _0x4268a1))) return _0x493639;
          return _0x5ba3f0 = _0x10935b.LYJEX(Number, _0x493639.shopid || 0), {
            ..._0x493639,
            'quantity': _0x282087
          };
        });
        const _0x4d7113 = _0x49bf63 => {
          const _0x1c33f9 = {
            'OBhGi': function (_0x1bb9c2, _0x58d332) {
              return _0x10935b.ukWNm(_0x1bb9c2, _0x58d332);
            },
            'pudQI': function (_0x1b42cc, _0x42a141) {
              return _0x10935b.UQXjy(_0x1b42cc, _0x42a141);
            },
            'YKhUF': function (_0x571267, _0x1445db) {
              return _0x10935b.mEuWa(_0x571267, _0x1445db);
            },
            'hZQtJ': function (_0x394555, _0x557d08) {
              return _0x10935b.RkFeD(_0x394555, _0x557d08);
            }
          };
          let _0x340128 = Array.isArray(_0x49bf63) ? _0x49bf63.map(_0x520806 => _0x5902a5(_0x520806)).filter(Boolean) : [];
          const _0x27b883 = _0x10935b.wPqpq(_0x18ae59),
            _0x4d64df = _0x340128.map(_0x55c3f8 => {
              if (_0x55c3f8.addOnDealGroupKey || _0x10935b.bepOx(_0x10935b.yHTpL(Number, _0x55c3f8.addOnDealId || 0), 0)) return _0x55c3f8;
              return {
                ..._0x55c3f8,
                'addOnDealGroupKey': _0x10935b.OspWc(_0x35f560, _0x55c3f8.shopid, _0x55c3f8.addOnDealId)
              };
            });
          _0x340128 = _0x4d64df;
          const _0xbe74db = Array.from(new Set(_0x340128.map(_0x21ed14 => String(_0x21ed14.addOnDealGroupKey || '')).filter(_0x6b793b => _0x6b793b)));
          return _0xbe74db.forEach(_0x39c1ae => {
            const _0x44d23b = _0x340128.filter(_0x5aec4a => _0x5aec4a.addOnDealGroupKey === _0x39c1ae),
              _0x354b7b = _0x44d23b.filter(_0x39cdd3 => !_0x39cdd3.isAddOnSubItem);
            if (!_0x354b7b.length) {
              _0x340128 = _0x340128.filter(_0x41c6d5 => _0x41c6d5.addOnDealGroupKey !== _0x39c1ae);
              return;
            }
            const _0x3a8969 = _0x354b7b[0],
              _0x1ab1ba = _0x1c33f9.OBhGi(Number, _0x3a8969.addOnDealId || 0),
              _0x3a55f2 = _0x27b883.find(_0x3ab07a => Number(_0x3ab07a.shopid || 0) === Number(_0x3a8969.shopid || 0) && Number(_0x3ab07a.add_on_deal_id || 0) === _0x1ab1ba && (_0x3ab07a.is_add_on_sub_item === false || _0x3ab07a.is_add_on_sub_item === true))?.["add_on_deal_info"],
              _0x46765b = _0x1c33f9.pudQI(_0x1c33f9.OBhGi(Number, _0x3a8969?.["addOnDealInfo"]?.["purchase_min_spend"] || _0x3a55f2?.["purchase_min_spend"] || 0), 100000),
              _0x38cb52 = _0x354b7b.reduce((_0x2e19b9, _0x5e473b) => _0x2e19b9 + Number(_0x5e473b.price || 0) * Number(_0x5e473b.quantity || 0), 0);
            _0x340128 = _0x340128.filter(_0x3eda31 => !(_0x3eda31.addOnDealGroupKey === _0x39c1ae && _0x3eda31.isAddOnSubItem));
            if (!_0x1ab1ba || _0x1c33f9.YKhUF(_0x46765b, 0) && _0x1c33f9.hZQtJ(_0x38cb52, _0x46765b)) return;
            const _0x8b468f = _0x27b883.filter(_0x1f9377 => Number(_0x1f9377.shopid || 0) === Number(_0x3a8969.shopid || 0) && Number(_0x1f9377.add_on_deal_id || 0) === _0x1ab1ba && _0x1f9377.is_add_on_sub_item === true).map(_0x57df44 => _0x5902a5({
                'shopid': _0x57df44.shopid,
                'itemid': _0x57df44.itemid,
                'modelid': _0x57df44.modelid,
                'quantity': Math.max(0, Number(_0x57df44.quantity || 0)),
                'itemTitle': _0x57df44.name || '',
                'variantName': _0x57df44.model_name || '',
                'shopName': _0x57df44.shopName || '',
                'image': _0x57df44.image ? "https://down-vn.img.susercontent.com/file/" + _0x57df44.image : '',
                'price': 0x0,
                'priceBeforeDiscount': Number(_0x57df44.price_before_discount || 0),
                'stock': Number(_0x57df44.stock || 0),
                'isAddOnSubItem': true,
                'addOnDealId': _0x1ab1ba,
                'addOnDealInfo': _0x57df44.add_on_deal_info || _0x3a8969.addOnDealInfo || _0x3a55f2 || null,
                'addOnDealGroupKey': _0x39c1ae
              })).filter(Boolean),
              _0x585410 = new Set(_0x340128.map(_0x354e4e => _0x354e4e.key));
            _0x8b468f.forEach(_0x5a5b16 => {
              !_0x585410.has(_0x5a5b16.key) && (_0x340128.push(_0x5a5b16), _0x585410.add(_0x5a5b16.key));
            });
          }), _0x340128;
        };
        _0x5acbd4.orderItems = _0x54a97b.AjSxg(_0x4d7113, Array.isArray(_0x5acbd4.orderItems) ? _0x5acbd4.orderItems.map(_0x40b48f => _0x5902a5(_0x40b48f)).filter(Boolean) : []);
        window.renderOrderItemList();
        _0x54a97b.qnnYV(_0x51ebc0, "update_order_item_quantity");
        _0x54a97b.WbWcA(_0xf84cf4, {
          'preferredShopId': _0x5ba3f0
        });
        _0x54a97b.qIpTj(_0x20b379, {
          'refreshPaymentOptions': true
        });
      };
      window.pasteFromClipboardAutoBuy = async () => {
        try {
          const _0x30a8b3 = await navigator.clipboard.readText();
          document.getElementById("autobuy-url-input").value = _0x30a8b3;
        } catch (_0x3bf694) {
          _0x1d9aeb.error(_0x59e2f9.rzQUz("Lỗi đọc clipboard: ", _0x3bf694.message));
        }
      };
      let _0x375358 = null;
      window.toggleMaxRetriesHelp = () => {
        const _0x23b2b2 = document.getElementById("max-retries-help");
        if (!_0x23b2b2) return;
        const _0x158b52 = _0x54a97b.uoWBn(_0x23b2b2.style.display, "none") || !_0x23b2b2.style.display;
        _0x23b2b2.style.display = _0x158b52 ? "block" : "none";
      };
      window.switchAdvancedTab = _0x133c56 => {
        const _0x57385f = document.getElementById("adv-tab-pane-order"),
          _0x3d852d = document.getElementById("adv-tab-pane-config"),
          _0x2e96ba = document.getElementById("adv-tab-btn-order"),
          _0x55fc3f = document.getElementById("adv-tab-btn-config");
        if (_0x54a97b.QSrzd(_0x133c56, "config")) {
          if (_0x57385f) _0x57385f.style.display = "none";
          if (_0x3d852d) _0x3d852d.style.display = "block";
          _0x2e96ba?.["classList"]["remove"]("active");
          _0x55fc3f?.["classList"]["add"]("active");
        } else {
          if (_0x57385f) _0x57385f.style.display = "block";
          if (_0x3d852d) _0x3d852d.style.display = "none";
          _0x2e96ba?.["classList"]["add"]("active");
          _0x55fc3f?.["classList"]["remove"]("active");
        }
      };
      window.toggleBrowserNotification = async _0x16cb2c => {
        if (!_0x16cb2c.checked) {
          _0x5acbd4.browserNotificationEnabled = false;
          return;
        }
        if (_0x59e2f9.ktGpb(typeof Notification, "undefined")) {
          _0x59e2f9.ZKYzg(alert, "Trình duyệt của bạn không hỗ trợ tính năng Web Notifications!");
          _0x16cb2c.checked = false;
          _0x5acbd4.browserNotificationEnabled = false;
          return;
        }
        if (_0x59e2f9.ecxMV(Notification.permission, "denied")) {
          _0x59e2f9.ZKYzg(alert, "Quyền thông báo đang bị chặn. Vui lòng vào Cài đặt trang web trên trình duyệt để Cho phép thông báo!");
          _0x16cb2c.checked = false;
          _0x5acbd4.browserNotificationEnabled = false;
          return;
        }
        if (_0x59e2f9.GxPAo(Notification.permission, "granted")) {
          const _0x3e4cca = await Notification.requestPermission();
          if (_0x59e2f9.iQdGo(_0x3e4cca, "granted")) {
            _0x16cb2c.checked = false;
            _0x5acbd4.browserNotificationEnabled = false;
            return;
          }
        }
        _0x5acbd4.browserNotificationEnabled = true;
        try {
          new Notification("Shopee Tool", {
            'body': "Đã bật thông báo đặt hàng thành công!",
            'icon': "https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/icon_favicon_1_32.png"
          });
        } catch (_0x427ea2) {}
      };
      window.openAdvancedSettings = () => {
        document.getElementById("advanced-settings-modal").style.display = "flex";
        if (_0x59e2f9.tHzXt(_0x23631f, null)) _0x23631f = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const _0x12db5b = document.getElementById("advanced-settings-modal"),
          _0xd72d7f = _0x12db5b?.["querySelector"](".advanced-modal-body");
        if (_0x12db5b && _0xd72d7f) {
          if (_0x375358) _0x12db5b.removeEventListener("wheel", _0x375358);
          _0x375358 = _0x5e8616 => {
            let _0x55c463 = _0x5e8616.target;
            while (_0x55c463 && _0x54a97b.XsLls(_0x55c463, _0xd72d7f) && _0x54a97b.xFkGk(_0x55c463, _0x12db5b)) {
              if (_0x55c463.classList.contains("payment-options-dropdown") || _0x54a97b.xQbyu(_0x55c463.scrollHeight, _0x55c463.clientHeight) && (_0x54a97b.wTEWM(window.getComputedStyle(_0x55c463).overflowY, "auto") || _0x54a97b.jbmvm(window.getComputedStyle(_0x55c463).overflowY, "scroll"))) return;
              _0x55c463 = _0x55c463.parentElement;
            }
            _0xd72d7f.scrollTop += _0x5e8616.deltaY;
            _0x5e8616.preventDefault();
          };
          _0x12db5b.addEventListener("wheel", _0x375358, {
            'passive': false
          });
        }
        document.getElementById("setting-delay").value = _0x5acbd4.retry_delay;
        document.getElementById("setting-max-retries").value = _0x5acbd4.max_retries;
        document.getElementById("setting-post-cart-retries").value = _0x5acbd4.post_cart_retry_limit;
        const _0x268234 = document.getElementById("max-retries-help");
        if (_0x268234) _0x268234.style.display = "none";
        const _0x1279f9 = document.getElementById("setting-enable-shop-voucher"),
          _0x3e2e06 = document.getElementById("setting-shop-voucher-code");
        if (_0xd28b33) {
          _0x4fba00 = true;
          _0x1279f9 && (_0x1279f9.checked = !!_0x5acbd4.shopVoucherEnabled);
          _0x59e2f9.lBgkB(_0xb63af1);
          const _0x346746 = _0x5acbd4.shopVoucherByShop && _0x5acbd4.shopVoucherByShop[_0x59e2f9.FiAOV(Number, _0x5acbd4.selectedVoucherShopId || 0)] || null;
          _0x3e2e06 && (_0x3e2e06.value = _0x5acbd4.shopVoucherAutoBestOutsideList ? '' : _0x59e2f9.hrlvy(_0x33c49a, _0x346746?.["voucherCode"] || _0x5acbd4.shopVoucherCode || ''));
          _0x59e2f9.sVSWy(_0x6ceae1);
          window.preloadShopVoucherRecommendations?.();
          _0x59e2f9.nvTbM(_0x86e9cc, _0x346746, false);
          _0x59e2f9.UvXfb(toggleShopVoucherInput);
          _0x4fba00 = false;
        } else {
          _0x5acbd4.shopVoucherEnabled = false;
          _0x5acbd4.shopVoucherCode = '';
          _0x5acbd4.shopVoucherData = null;
          _0x5acbd4.shopVoucherAutoBestOutsideList = false;
          if (_0x1279f9) _0x1279f9.checked = false;
          if (_0x3e2e06) _0x3e2e06.value = '';
          _0x59e2f9.XxGRG(_0x86e9cc, null);
        }
        const _0x47fe3f = _0x5acbd4.always_show_voucher_shopee || _0x1ecce3 && window.shopeeVoucherUnlocked,
          _0x543652 = document.getElementById("shopee-voucher-setting-group");
        _0x543652 && (_0x543652.style.display = _0x47fe3f ? '' : "none");
        const _0x5ad871 = document.getElementById("setting-enable-platform-voucher"),
          _0x569852 = document.getElementById("setting-platform-voucher-input"),
          _0x20b18e = document.getElementById("setting-platform-voucher-source");
        if (_0x47fe3f) {
          if (!_0xae0156) _0x5acbd4.platformVoucherBannerMode = "smart";
          _0x5ad871 && (_0x5ad871.checked = !!_0x5acbd4.platformVoucherEnabled);
          _0x569852 && (_0x569852.value = _0x59e2f9.OqdKK(String, _0x5acbd4.platformVoucherInput || _0x5acbd4.platformVoucherCode || '').trim());
          if (_0x20b18e) _0x20b18e.value = _0x5acbd4.platformVoucherSource;
          const _0x5f13cb = document.getElementById("setting-platform-banner-slug");
          if (_0x5f13cb) _0x5f13cb.value = _0x5acbd4.platformVoucherBannerSlug;
          const _0x4da481 = document.querySelector("input[name=\"platform-banner-mode\"][value=\"" + (_0xae0156 ? _0x5acbd4.platformVoucherBannerMode : "smart") + '\x22]');
          if (_0x4da481) _0x4da481.checked = true;
          _0x59e2f9.PlNkI(togglePlatformVoucherInput);
          _0x59e2f9.kQzpw(_0x458f3f);
          _0x59e2f9.PlNkI(_0x3ff617);
        } else {
          _0x5acbd4.platformVoucherEnabled = false;
          _0x5acbd4.platformVoucherCode = '';
          _0x5acbd4.platformVoucherPromotionId = '';
          _0x5acbd4.platformVoucherInput = '';
          _0x5acbd4.platformVoucherResolved = null;
          _0x5acbd4.platformVoucherSavedInWallet = false;
          _0x5acbd4.platformVoucherWalletChecked = false;
          _0x5acbd4.platformVoucherMetadataChecked = false;
          _0x5acbd4.platformVoucherForceLinkOnly = false;
          if (_0x5ad871) _0x5ad871.checked = false;
          if (_0x569852) _0x569852.value = '';
          _0x59e2f9.EIlCI(togglePlatformVoucherInput);
        }
        document.getElementById("setting-wait-price").checked = _0x5acbd4.waitForPriceChange;
        document.getElementById("setting-only-add-to-cart").checked = _0x5acbd4.onlyAddToCart;
        const _0x3a3c3e = document.getElementById("setting-use-coins");
        _0x3a3c3e && (_0x3a3c3e.checked = !!_0x5acbd4.use_coins);
        if (_0x59e2f9.FSiTb(_0x5acbd4.priceCheckMode, "cart")) document.getElementById("price-check-cart").checked = true;else _0x59e2f9.wZIOU(_0x5acbd4.priceCheckMode, "product") ? document.getElementById("price-check-product").checked = true : document.getElementById("price-check-checkout").checked = true;
        document.getElementById("setting-skip-cart").checked = true;
        document.getElementById("setting-use-schedule").checked = _0x5acbd4.useSchedule;
        _0x59e2f9.wicsw(togglePriceCheckModeOptions);
        (!Array.isArray(_0x5acbd4.paymentOptions) || !_0x5acbd4.paymentOptions.length) && _0x59e2f9.kxHCI(_0x5d1fee);
        _0x59e2f9.IEzOc(_0x200646);
        const _0x4332b8 = document.getElementById("schedule-hour"),
          _0x46a07d = document.getElementById("schedule-minute"),
          _0x536648 = document.getElementById("schedule-second"),
          _0x2b214e = _0x5acbd4.scheduledTime ? new Date(_0x5acbd4.scheduledTime) : null,
          _0x47f49f = _0x2b214e && Number.isFinite(_0x2b214e.getTime());
        if (_0x4332b8) _0x4332b8.value = _0x59e2f9.ZwvxU(String, _0x47f49f ? _0x2b214e.getHours() : new Date().getHours());
        if (_0x46a07d) _0x46a07d.value = _0x59e2f9.pacCI(String, _0x47f49f ? _0x2b214e.getMinutes() : 59);
        _0x536648 && (_0x536648.value = _0x59e2f9.pbaBC(String, _0x47f49f ? _0x2b214e.getSeconds() : _0x59e2f9.CElDD(_0x4eb09d, 58)));
        document.getElementById("setting-enable-telegram").checked = _0x5acbd4.telegramEnabled || false;
        document.getElementById("setting-telegram-token").value = _0x5acbd4.telegramToken || '';
        document.getElementById("setting-telegram-chatid").value = _0x5acbd4.telegramChatId || '';
        const _0x3bc719 = document.getElementById("setting-enable-browser-notification");
        _0x3bc719 && (_0x3bc719.checked = !!_0x5acbd4.browserNotificationEnabled && _0x59e2f9.tnhNX(typeof Notification, "undefined") && _0x59e2f9.RppXh(Notification.permission, "granted"));
        window.switchAdvancedTab("order");
        _0x59e2f9.cIYYj(toggleScheduleInputs);
        _0x59e2f9.EusPG(toggleTelegramInputs);
        _0xd28b33 && window.tryRestoreShopVoucherValidationFromSession();
      };
      window.closeAdvancedSettings = () => {
        _0x59e2f9.wicsw(_0x56ecab);
        document.getElementById("advanced-settings-modal").style.display = "none";
        const _0x2e0565 = document.getElementById("advanced-settings-help-modal");
        if (_0x2e0565) _0x2e0565.style.display = "none";
        const _0x283268 = document.getElementById("advanced-settings-modal");
        _0x283268 && _0x375358 && (_0x283268.removeEventListener("wheel", _0x375358), _0x375358 = null);
        _0x59e2f9.NQRCi(_0x23631f, null) && (document.body.style.overflow = _0x23631f, _0x23631f = null);
      };
      window.openAdvancedSettingsHelpModal = () => {
        const _0xe2eb69 = document.getElementById("advanced-settings-help-modal");
        if (_0xe2eb69) _0xe2eb69.style.display = "flex";
        const _0x5a0c58 = document.querySelector("#delay-help-item .checkmark-icon-svg");
        _0x5a0c58 && (_0x5a0c58.style.display = _0x5acbd4.always_show_voucher_shopee || window.shopeeVoucherUnlocked ? "block" : "none");
      };
      window.handleDelayHelpClick = _0x232cf1 => {
        if (_0x5acbd4.always_show_voucher_shopee || window.shopeeVoucherUnlocked) return;
        window.delayHelpClicks = _0x54a97b.nfVuf(window.delayHelpClicks || 0, 1);
        if (_0x54a97b.lRGLw(window.delayHelpClicks, 5)) {
          window.shopeeVoucherUnlocked = true;
          const _0x22524e = document.querySelector("#delay-help-item .checkmark-icon-svg");
          _0x22524e && (_0x22524e.style.display = "block");
          const _0x4ea5d3 = document.getElementById("shopee-voucher-setting-group");
          _0x4ea5d3 && _0x1ecce3 && (_0x4ea5d3.style.display = '');
        }
      };
      window.closeAdvancedSettingsHelpModal = _0x209faa => {
        _0x209faa && _0x54a97b.lylRz(typeof _0x209faa.stopPropagation, "function") && _0x209faa.stopPropagation();
        const _0x18b6a5 = document.getElementById("advanced-settings-help-modal");
        if (_0x18b6a5) _0x18b6a5.style.display = "none";
      };
      window.toggleScheduleInputs = () => {
        const _0x4ffa1d = document.getElementById("setting-use-schedule").checked;
        document.getElementById("schedule-inputs").style.display = _0x4ffa1d ? "block" : "none";
      };
      window.togglePriceCheckModeOptions = () => {
        const _0x1e623b = !!document.getElementById("setting-wait-price")?.["checked"];
        if (_0x1e623b) {
          const _0x332b08 = document.getElementById("setting-only-add-to-cart");
          _0x332b08 && _0x332b08.checked && (_0x332b08.checked = false);
        }
        const _0x5682d1 = document.getElementById("price-check-mode-options");
        if (_0x5682d1) _0x5682d1.style.display = _0x1e623b ? "block" : "none";
        if (_0x1e623b) {
          const _0x307ae0 = document.querySelector("input[name=\"price-check-mode\"]:checked");
          !_0x307ae0 && (document.getElementById("price-check-checkout").checked = true, _0x5acbd4.priceCheckMode = "checkout");
        }
      };
      window.toggleOnlyAddToCartOption = () => {
        const _0x44e16d = !!document.getElementById("setting-only-add-to-cart")?.["checked"];
        if (!_0x44e16d) return;
        const _0x25a260 = document.getElementById("setting-wait-price");
        _0x25a260 && _0x25a260.checked && (_0x25a260.checked = false, window.togglePriceCheckModeOptions());
      };
      window.toggleTelegramInputs = () => {
        const _0x439e11 = document.getElementById("setting-enable-telegram").checked;
        document.getElementById("telegram-inputs").style.display = _0x439e11 ? "block" : "none";
      };
      window.saveAdvancedSettings = async () => {
        _0x5acbd4.retry_delay = _0x59e2f9.xAjqs(parseInt, document.getElementById("setting-delay").value) || 200;
        {
          const _0x382996 = document.getElementById("setting-max-retries");
          _0x5acbd4.max_retries = _0x59e2f9.JVpYT(_0x4a062c, _0x382996.value, 1, 999999, _0x5acbd4.max_retries || 100);
          _0x382996.value = _0x5acbd4.max_retries;
        }
        {
          const _0x9a4ede = document.getElementById("setting-post-cart-retries");
          _0x5acbd4.post_cart_retry_limit = _0x59e2f9.OswhO(_0x4a062c, _0x9a4ede.value, 3, 333, _0x5acbd4.post_cart_retry_limit || 20);
          _0x9a4ede.value = _0x5acbd4.post_cart_retry_limit;
        }
        _0x5acbd4.waitForPriceChange = document.getElementById("setting-wait-price").checked;
        _0x5acbd4.onlyAddToCart = !!document.getElementById("setting-only-add-to-cart")?.["checked"];
        _0x5acbd4.use_coins = !!document.getElementById("setting-use-coins")?.["checked"];
        if (_0x5acbd4.onlyAddToCart) {
          _0x5acbd4.waitForPriceChange = false;
          const _0x5f0630 = document.getElementById("setting-wait-price");
          if (_0x5f0630) _0x5f0630.checked = false;
          _0x59e2f9.BPnnm(togglePriceCheckModeOptions);
        }
        if (document.getElementById("price-check-cart").checked) _0x5acbd4.priceCheckMode = "cart";else document.getElementById("price-check-product").checked ? _0x5acbd4.priceCheckMode = "product" : _0x5acbd4.priceCheckMode = "checkout";
        _0x5acbd4.skipAddToCart = true;
        const _0x2aebc2 = _0x59e2f9.qjUdA(document.getElementById("setting-platform-voucher-source")?.["value"], "banner") ? "banner" : "wallet",
          _0x3959d1 = _0xae0156 && _0x59e2f9.lftft(document.querySelector("input[name=\"platform-banner-mode\"]:checked")?.["value"], "test") ? "test" : "smart",
          _0x496a53 = _0x1ecce3 && !!document.getElementById("setting-enable-platform-voucher")?.["checked"] && _0x59e2f9.fOvPg(_0x2aebc2, "banner") && _0x59e2f9.nZsRw(_0x3959d1, "smart");
        !_0x496a53 && (_0x5acbd4.useSchedule = document.getElementById("setting-use-schedule").checked);
        _0xd28b33 ? (_0x5acbd4.shopVoucherEnabled = document.getElementById("setting-enable-shop-voucher").checked, _0x5acbd4.shopVoucherAutoBestOutsideList ? (_0x5acbd4.shopVoucherCode = '', document.getElementById("setting-shop-voucher-code").value = '') : (_0x5acbd4.shopVoucherCode = _0x59e2f9.zthHl(_0x33c49a, document.getElementById("setting-shop-voucher-code").value), document.getElementById("setting-shop-voucher-code").value = _0x5acbd4.shopVoucherCode)) : (_0x5acbd4.shopVoucherEnabled = false, _0x5acbd4.shopVoucherCode = '', _0x5acbd4.shopVoucherData = null, _0x5acbd4.shopVoucherAutoBestOutsideList = false);
        if (!_0x5acbd4.shopVoucherEnabled) {
          _0x5acbd4.shopVoucherCode = '';
          _0x5acbd4.shopVoucherData = null;
          _0x5acbd4.shopVoucherAutoBestOutsideList = false;
          _0x5acbd4.shopVoucherByShop = {};
          _0x59e2f9.xaZPC(_0x86e9cc, null);
        } else !_0x5acbd4.shopVoucherAutoBestOutsideList && _0x5acbd4.shopVoucherData && _0x59e2f9.GxPAo(_0x59e2f9.vGJNT(String, _0x5acbd4.shopVoucherData.voucherCode || '').toUpperCase(), _0x5acbd4.shopVoucherCode) && (_0x5acbd4.shopVoucherData = null, _0x59e2f9.oVIid(_0x86e9cc, null));
        if (_0x1ecce3) {
          _0x5acbd4.platformVoucherEnabled = !!document.getElementById("setting-enable-platform-voucher")?.["checked"];
          _0x5acbd4.platformVoucherSource = _0x2aebc2;
          _0x5acbd4.platformVoucherBannerMode = _0x3959d1;
          _0x5acbd4.platformVoucherBannerSlug = _0x59e2f9.WzvWZ(String, document.getElementById("setting-platform-banner-slug")?.["value"] || _0x5acbd4.platformVoucherBannerSlug);
          _0x5acbd4.platformVoucherInput = _0x59e2f9.DogHc(String, document.getElementById("setting-platform-voucher-input")?.["value"] || '').trim();
          const _0x16269f = _0x59e2f9.zjvuU(_0x45e09d, _0x5acbd4.platformVoucherInput),
            _0x49eda1 = document.getElementById("setting-platform-voucher-input");
          if (_0x49eda1) _0x49eda1.value = _0x5acbd4.platformVoucherInput;
          if (_0x16269f.isLink) {
            _0x5acbd4.platformVoucherCode = _0x16269f.voucherCode;
            _0x5acbd4.platformVoucherPromotionId = _0x59e2f9.PXQwr(String, _0x16269f.promotionid || '');
          } else !_0x5acbd4.platformVoucherResolved && (_0x5acbd4.platformVoucherCode = _0x16269f.voucherCode, _0x5acbd4.platformVoucherPromotionId = '');
          if (_0x5acbd4.platformVoucherEnabled && _0x59e2f9.nQaLB(_0x5acbd4.platformVoucherSource, "wallet") && !_0x5acbd4.platformVoucherInput) {
            _0x1d9aeb.error("Voucher Shopee đã bật nên bắt buộc nhập link hoặc tên voucher.");
            _0x59e2f9.BoyMb(_0x2184a0);
            return;
          }
          if (_0x5acbd4.platformVoucherEnabled && _0x59e2f9.ZJwAa(_0x5acbd4.platformVoucherSource, "wallet") && _0x59e2f9.CXfxx(_0x2987c4.status, "LOADING")) {
            _0x1d9aeb.error("Kho voucher Shopee đang tải. Vui lòng chờ hoàn tất.");
            return;
          }
          if (_0x5acbd4.platformVoucherEnabled && _0x59e2f9.lftft(_0x5acbd4.platformVoucherSource, "wallet") && _0x5acbd4.platformVoucherForceLinkOnly && !_0x16269f.isLink) {
            _0x1d9aeb.error("Không phát hiện ra link mã, bạn cần kiểm tra lại trước khi bấm bắt đầu!!!");
            _0x59e2f9.OFnHn(_0x2184a0);
            return;
          }
          if (_0x5acbd4.platformVoucherEnabled && _0x59e2f9.pibVW(_0x5acbd4.platformVoucherSource, "wallet")) {
            const _0x4b1e11 = _0x59e2f9.BVJwJ(_0x39429a, _0x16269f.voucherCode);
            if (_0x59e2f9.iYgSY(_0x2987c4.status, "FAILED") && !_0x5acbd4.platformVoucherWalletChecked && !_0x5acbd4.platformVoucherMetadataChecked) {
              _0x1d9aeb.error("Voucher Shopee đang kiểm tra. Vui lòng chờ quét xong rồi bấm lưu lại.");
              _0x59e2f9.EusPG(_0x2184a0);
              return;
            }
            if (_0x5acbd4.platformVoucherSavedInWallet) _0x1d9aeb.info("Voucher Shopee: User đã lưu mã " + _0x4b1e11 + ". Hệ thống sẽ bỏ qua việc lưu mã trước khi đặt đơn.");else _0x5acbd4.platformVoucherResolved?.["promotionid"] ? _0x1d9aeb.info("Voucher Shopee. User chưa lưu mã " + _0x4b1e11 + ". Hệ thông sẽ lưu mã với id " + _0x5acbd4.platformVoucherResolved.promotionid + " trước khi đặt đơn.") : _0x1d9aeb.info("Voucher Shopee. User chưa lưu mã " + _0x4b1e11 + ". Hệ thống sẽ lưu mã thủ công trước khi đặt đơn.");
          } else {
            if (_0x5acbd4.platformVoucherEnabled && _0x59e2f9.DRnpY(_0x5acbd4.platformVoucherSource, "banner")) {
              if (!_0x5acbd4.platformVoucherBannerData || _0x59e2f9.tnhNX(_0x5acbd4.platformVoucherBannerData.slug, _0x5acbd4.platformVoucherBannerSlug)) {
                _0x1d9aeb.error("Banner chưa tải xong. Vui lòng chọn lại banner và chờ thông tin hiển thị.");
                return;
              }
              _0x1d9aeb.info("Voucher Shopee: nguồn banner " + _0x5acbd4.platformVoucherBannerSlug + ", chế độ " + (_0x59e2f9.sPZtK(_0x5acbd4.platformVoucherBannerMode, "test") ? "Test Mode" : "Lưu mới — Tự động thông minh") + '.');
            }
          }
        } else {
          _0x5acbd4.platformVoucherEnabled = false;
          _0x5acbd4.platformVoucherCode = '';
          _0x5acbd4.platformVoucherPromotionId = '';
          _0x5acbd4.platformVoucherInput = '';
          _0x5acbd4.platformVoucherResolved = null;
          _0x5acbd4.platformVoucherSavedInWallet = false;
          _0x5acbd4.platformVoucherWalletChecked = false;
          _0x5acbd4.platformVoucherMetadataChecked = false;
          _0x5acbd4.platformVoucherForceLinkOnly = false;
        }
        _0x5acbd4.quantity = 1;
        const _0x20673c = document.getElementById("setting-payment-method"),
          _0x236d56 = Array.isArray(_0x5acbd4.paymentOptions) ? _0x5acbd4.paymentOptions.find(_0x5e87cb => _0x5e87cb.id === _0x20673c?.["value"]) : null;
        _0x236d56?.["enabled"] ? (_0x5acbd4.selectedPaymentOption = _0x236d56, _0x5acbd4.paymentMethod = _0x236d56.method) : _0x59e2f9.KFzHd(_0x5d1fee);
        if (_0x5acbd4.useSchedule && !_0x496a53) {
          const _0x2c55ed = _0x59e2f9.tWqGW(_0x4a062c, document.getElementById("schedule-hour").value, 0, 23, 0),
            _0x52ad49 = _0x59e2f9.apdsy(_0x4a062c, document.getElementById("schedule-minute").value, 0, 59, 59),
            _0x174eac = _0x59e2f9.sVLer(_0x4eb09d, _0x59e2f9.hiUoH(_0x4a062c, document.getElementById("schedule-second").value, 0, 59, 58));
          document.getElementById("schedule-second").value = _0x59e2f9.wLyid(String, _0x174eac);
          const _0x1dda1f = new Date(),
            _0x34a30e = new Date(_0x1dda1f.getFullYear(), _0x1dda1f.getMonth(), _0x1dda1f.getDate(), _0x2c55ed, _0x52ad49, _0x174eac);
          _0x59e2f9.mtVKg(_0x34a30e, _0x1dda1f) && _0x34a30e.setDate(_0x59e2f9.rzQUz(_0x34a30e.getDate(), 1));
          _0x5acbd4.scheduledTime = _0x34a30e;
          _0x1d9aeb.info("Đã hẹn giờ: " + _0x59e2f9.UcMdk(_0x3606fc, _0x34a30e));
        } else !_0x496a53 && (_0x5acbd4.scheduledTime = null);
        _0x5acbd4.telegramEnabled = document.getElementById("setting-enable-telegram").checked;
        _0x5acbd4.telegramToken = (document.getElementById("setting-telegram-token").value || '').trim();
        _0x5acbd4.telegramChatId = (document.getElementById("setting-telegram-chatid").value || '').trim();
        _0x5acbd4.browserNotificationEnabled = !!document.getElementById("setting-enable-browser-notification")?.["checked"];
        (!_0x5acbd4.shopVoucherByShop || _0x59e2f9.iYgSY(typeof _0x5acbd4.shopVoucherByShop, "object")) && (_0x5acbd4.shopVoucherByShop = {});
        if (_0x5acbd4.shopVoucherEnabled && !_0x5acbd4.shopVoucherAutoBestOutsideList) {
          const _0x40f580 = _0x59e2f9.PpLRJ(Number, _0x5acbd4.selectedVoucherShopId || 0);
          _0x59e2f9.BLOyp(_0x40f580, 0) && _0x5acbd4.shopVoucherData && (_0x5acbd4.shopVoucherByShop[_0x40f580] = _0x5acbd4.shopVoucherData);
        }
        _0x59e2f9.eeVkR(_0x171089);
        const _0x5c77d1 = _0xd28b33 ? ", Voucher shop=" + (_0x5acbd4.shopVoucherEnabled ? _0x5acbd4.shopVoucherAutoBestOutsideList ? "Auto ngoài list" : _0x5acbd4.shopVoucherCode || "Bật" : "Tắt") : '',
          _0x2800ce = _0x1ecce3 ? ", Voucher Shopee=" + (_0x5acbd4.platformVoucherEnabled ? _0x59e2f9.qhVuW(_0x5acbd4.platformVoucherSource, "banner") ? "Banner " + _0x5acbd4.platformVoucherBannerSlug + '\x20(' + _0x5acbd4.platformVoucherBannerMode + ')' : _0x5acbd4.platformVoucherResolved?.["promotionid"] ? _0x5acbd4.platformVoucherResolved.voucherCode + '/' + _0x5acbd4.platformVoucherResolved.promotionid : _0x5acbd4.platformVoucherInput || "Bật" : "Tắt") : '',
          _0x190785 = _0x5acbd4.selectedPaymentOption ? '' + _0x5acbd4.selectedPaymentOption.name + (_0x5acbd4.selectedPaymentOption.detail ? '\x20(' + _0x5acbd4.selectedPaymentOption.detail + ')' : '') : _0x59e2f9.oDble(_0x5acbd4.paymentMethod, "card") ? "Napas" : _0x59e2f9.DRnpY(_0x5acbd4.paymentMethod, "gpay") ? "Google Pay" : "Tiền mặt";
        _0x1d9aeb.info("Cài đặt: Delay = " + _0x5acbd4.retry_delay + "ms, Số lần thử thêm giỏ = " + _0x5acbd4.max_retries + ", Số lần thử đặt lại = " + _0x5acbd4.post_cart_retry_limit + _0x5c77d1 + _0x2800ce + ", Chờ đổi giá = " + _0x5acbd4.waitForPriceChange + '\x20(' + _0x5acbd4.priceCheckMode + "), Chỉ thêm giỏ = " + _0x5acbd4.onlyAddToCart + ", Thanh toán = " + _0x190785 + ", Telegram = " + (_0x5acbd4.telegramEnabled ? "Bật" : "Tắt"));
        _0x59e2f9.eHIcu(_0x20b379);
        _0x59e2f9.wuqKV(closeAdvancedSettings);
      };
      window.currentProductData = null;
      window.selectedModelId = null;
      window.tierVariationImages = null;
      window.modelStocks = {};
      function _0x2cf1c8(_0x3b3599) {
        return _0x59e2f9.fKqah(_0x59e2f9.lROWd('₫', _0x59e2f9.UUQNt(_0x3b3599, 1000).toLocaleString("vi-VN")), 'k');
      }
      function _0x1a62e4(_0x1ec0fa) {
        if (_0x54a97b.tOYIF(_0x1ec0fa, 0) || _0x54a97b.IRtnt(_0x1ec0fa, null) || _0x54a97b.mYEyZ(_0x1ec0fa, undefined)) return {
          'text': "Hết kho",
          'isOutOfStock': true
        };
        if (_0x54a97b.KEOHP(_0x1ec0fa, 5000)) return {
          'text': "5.000+",
          'isOutOfStock': false
        };
        return {
          'text': _0x1ec0fa.toLocaleString("vi-VN"),
          'isOutOfStock': false
        };
      }
      function _0xcef61e(_0x1c26a4, _0x36619e, _0x1e4d61) {
        if (window.tierVariationImages && _0x1c26a4.extinfo?.["tier_index"]) {
          const _0x347fea = _0x1c26a4.extinfo.tier_index[0];
          if (window.tierVariationImages[_0x347fea]) return _0x59e2f9.bdtKJ(_0x36619e, window.tierVariationImages[_0x347fea]);
        }
        if (_0x1c26a4.image_id) return _0x59e2f9.abPTi(_0x36619e, _0x1c26a4.image_id);
        return _0x1e4d61;
      }
      window.startCheckProduct = async () => {
        const _0x3622ab = {
            'lOkSm': function (_0x1e891c, _0x20d0d1) {
              return _0x59e2f9.eLLZN(_0x1e891c, _0x20d0d1);
            },
            'UHvEe': function (_0x36ece8, _0x5cbed3, _0xa5e364, _0x4d8d6a) {
              return _0x59e2f9.Ymwbj(_0x36ece8, _0x5cbed3, _0xa5e364, _0x4d8d6a);
            },
            'MBvbl': "&quot;",
            'YAllN': function (_0x34f4a3, _0xd4643) {
              return _0x59e2f9.pgMAO(_0x34f4a3, _0xd4643);
            },
            'pdkHV': "selected"
          },
          _0x3b3d32 = document.getElementById("autobuy-url-input").value.trim(),
          _0x1f10f0 = document.getElementById("autobuy-content");
        if (!_0x3b3d32) {
          _0x1d9aeb.error("Vui lòng nhập URL sản phẩm!");
          return;
        }
        _0x1f10f0.innerHTML = "<div style=\"text-align:center; padding:30px;\"><p>Đang tải dữ liệu...</p></div>";
        try {
          let _0x504f81 = await _0x59e2f9.nprvN(_0x1cd22c, _0x3b3d32);
          if (!_0x504f81) throw new Error("URL không hợp lệ hoặc không phải Shopee.");
          const _0x19c8fc = _0x59e2f9.EBQtB(_0x530361, _0x504f81);
          if (!_0x19c8fc) throw new Error("Không tìm thấy thông tin sản phẩm.");
          const {
              shopId: _0x12cf6a,
              itemId: _0x3970ca
            } = _0x19c8fc,
            _0x4cb47a = "https://shopee.vn/product/" + _0x12cf6a + '/' + _0x3970ca;
          _0x1d9aeb.info("Đang xử lý URL: " + _0x4cb47a);
          _0x1d9aeb.info("Shop ID: " + _0x12cf6a + ", Item ID: " + _0x3970ca);
          const _0x132292 = await _0x59e2f9.KJaSD(fetch, "https://shopee.vn/api/v4/pdp/" + (/Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(navigator.userAgent) ? "get_rw" : "get_pc") + "?item_id=" + _0x3970ca + "&shop_id=" + _0x12cf6a + "&tz_offset_minutes=420&detail_level=0"),
            _0x47910 = await _0x132292.json();
          _0x59e2f9.Xbgoe(_0x2d1992, _0x47910, "pdp/get");
          if (_0x47910.error || !_0x47910.data) throw new Error("Không thể lấy dữ liệu từ link.");
          const _0x34e17f = _0x47910.data.item,
            _0x3de851 = _0x34e17f.models,
            _0x4440fb = _0x34e17f.tier_variations;
          if (!_0x3de851) throw new Error("Sản phẩm không có phân loại hàng.");
          window.tierVariationImages = _0x4440fb && _0x4440fb[0] && _0x4440fb[0].images ? _0x4440fb[0].images : null;
          _0x1d9aeb.info("Đang lấy thông tin kho hàng...");
          const _0x4c3466 = _0x59e2f9.AEqjH(_0x4d4c36),
            _0x597168 = _0x3de851[0].model_id;
          window.modelStocks = await _0x59e2f9.INAvI(_0x47972e, _0x12cf6a, _0x3970ca, _0x597168, _0x4c3466.csrf);
          if (window.modelStocks && _0x59e2f9.wZIOU(window.modelStocks.error, 90309999)) {
            _0x1f10f0.innerHTML = "<div class=\"autobuy-empty-state\"><h3>Lỗi Captcha</h3><p>Vui lòng xác minh captcha và thử lại.</p></div>";
            return;
          }
          _0x1d9aeb.success("Đã lấy xong thông tin kho hàng");
          window.currentProductData = {
            'shopId': _0x12cf6a,
            'itemId': _0x3970ca,
            'item': _0x34e17f,
            'models': _0x3de851,
            'tierVariations': _0x4440fb
          };
          const _0x5bfee8 = _0x59e2f9.VnsfA(String, _0x34e17f?.["shop_name"] || _0x34e17f?.["shop_info"]?.["shop_name"] || '').trim();
          _0x59e2f9.OsJJg(_0x59e2f9.ZLeKv(Number, _0x12cf6a), 0) && _0x5bfee8 && (_0x5acbd4.shopInfoById[_0x59e2f9.bbpbX(Number, _0x12cf6a)] = {
            'shopName': _0x5bfee8
          });
          _0x59e2f9.muEMs(_0x59e2f9.VXJJn(Number, _0x12cf6a), 0) && (_0x5acbd4.selectedVoucherShopId = _0x59e2f9.zjvuU(Number, _0x12cf6a));
          const _0x42a69a = "https://down-vn.img.susercontent.com/file/",
            _0x36ea81 = _0x59e2f9.AABwv(_0x42a69a, _0x34e17f.image),
            _0x11b084 = _0x3de851.find(_0x4b13a5 => {
              const _0x212bac = window.modelStocks[_0x4b13a5.model_id];
              return _0x212bac && _0x3622ab.lOkSm(_0x212bac.stock, 0);
            }) || _0x3de851[0];
          window.selectedModelId = _0x11b084.model_id;
          const _0x5792ae = _0x59e2f9.Ymwbj(_0xcef61e, _0x11b084, _0x42a69a, _0x36ea81),
            _0x467aa8 = _0x59e2f9.cxarK(_0x11b084.price, 100000),
            _0x22ad2a = _0x59e2f9.HVOsu(_0x11b084.price_before_discount, 0) ? _0x59e2f9.eFPVL(_0x11b084.price_before_discount, 100000) : null,
            _0x7b6182 = _0x22ad2a ? Math.round(_0x59e2f9.dvvfI(_0x59e2f9.CVvac(1, _0x59e2f9.LeANL(_0x467aa8, _0x22ad2a)), 100)) : null,
            _0x408b8d = window.modelStocks[_0x11b084.model_id]?.["stock"] || 0,
            _0x4f22b1 = _0x59e2f9.bCphr(_0x1a62e4, _0x408b8d);
          _0x5acbd4.currentModelPrice = _0x11b084.price;
          let _0xf199aa = "\n                        <!-- ===== DESKTOP VIEW ===== -->\n                        <div class=\"desktop-view\">\n                            <div class=\"product-card-container\">\n                                <div class=\"product-card-left\">\n                                    <img src=\"" + _0x5792ae + "\" class=\"product-main-img\" alt=\"Product Image\" id=\"product-main-image\">\n                                </div>\n                                <div class=\"product-card-right\">\n                                    <h3 class=\"product-card-title\">" + _0x34e17f.title + "</h3>\n                                    \n                                    <div class=\"product-info-row\">\n                                        <div class=\"info-block\">\n                                            <span class=\"info-label\">Giá:</span>\n                                            <span class=\"price-value\" id=\"display-price\">" + _0x59e2f9.KUvHx(_0x2cf1c8, _0x467aa8) + "</span>\n                                            " + (_0x22ad2a ? "<span class=\"price-original\">" + _0x59e2f9.pnnZe(_0x2cf1c8, _0x22ad2a) + "</span>" : '') + "\n                                            " + (_0x7b6182 ? "<span class=\"price-discount\">-" + _0x7b6182 + "%</span>" : '') + "\n                                        </div>\n                                        <div class=\"info-block\">\n                                            <span class=\"info-label\">Kho:</span>\n                                            <span class=\"stock-value " + (_0x4f22b1.isOutOfStock ? "out-of-stock" : '') + "\" id=\"display-stock\">" + _0x4f22b1.text + "</span>\n                                        </div>\n                                    </div>\n                                    \n                                    <div class=\"model-section\">\n                                        <div class=\"model-section-title\">Phân loại</div>\n                                        <div class=\"model-options\" id=\"model-options-container\">\n                    ";
          _0x3de851.forEach((_0x3103ea, _0x29269f) => {
            const _0x63d68d = _0x3622ab.UHvEe(_0xcef61e, _0x3103ea, _0x42a69a, _0x36ea81),
              _0x6c0369 = _0x3103ea.name.replace(/"/g, "&quot;"),
              _0x54d91f = _0x3622ab.YAllN(_0x3103ea.model_id, window.selectedModelId),
              _0x33b336 = _0x3103ea.price,
              _0xc1b0 = _0x3103ea.price_before_discount,
              _0xcfee0b = window.modelStocks[_0x3103ea.model_id]?.["stock"] || 0;
            _0xf199aa += "\n                            <button class=\"model-option-btn " + (_0x54d91f ? "selected" : '') + "\" \n                                    data-model-id=\"" + _0x3103ea.model_id + "\" \n                                    data-model-name=\"" + _0x6c0369 + "\"\n                                    data-model-price=\"" + _0x33b336 + "\"\n                                    data-model-original-price=\"" + _0xc1b0 + "\"\n                                    data-model-stock=\"" + _0xcfee0b + "\"\n                                    data-model-img=\"" + _0x63d68d + "\"\n                                    data-tier-index=\"" + (_0x3103ea.extinfo?.["tier_index"]?.[0] ?? _0x29269f) + "\"\n                                    onclick=\"selectModel(this)\">\n                                <img src=\"" + _0x63d68d + "\" alt=\"\">\n                                " + _0x6c0369 + "\n                            </button>\n                        ";
          });
          _0xf199aa += "\n                                        </div>\n                                    </div>\n                                    \n                                    <div class=\"product-actions\">\n                                        <button class=\"order-item-add-btn\" type=\"button\" onclick=\"addCurrentProductToOrderList()\">\n                                            ➕ Thêm vào đơn\n                                        </button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        \n                        <!-- ===== MOBILE VIEW ===== -->\n                        <div class=\"mobile-view\">\n                            <div class=\"mobile-product-header\">\n                                <img src=\"" + _0x5792ae + "\" class=\"mobile-product-img\" alt=\"Product Image\" id=\"mobile-product-image\">\n                                <div class=\"mobile-product-info\">\n                                    <h3 class=\"mobile-product-title\">" + _0x34e17f.title + "</h3>\n                                    <div class=\"mobile-price-row\">\n                                        <span class=\"mobile-price\" id=\"mobile-display-price\">" + _0x59e2f9.sZpxX(_0x2cf1c8, _0x467aa8) + "</span>\n                                        " + (_0x22ad2a ? "<span class=\"mobile-price-original\">" + _0x59e2f9.YKOAI(_0x2cf1c8, _0x22ad2a) + "</span>" : '') + "\n                                        " + (_0x7b6182 ? "<span class=\"mobile-discount\">-" + _0x7b6182 + "%</span>" : '') + "\n                                    </div>\n                                    <div class=\"mobile-stock-row\">\n                                        <span class=\"mobile-stock-label\">Kho:</span>\n                                        <span class=\"mobile-stock " + (_0x4f22b1.isOutOfStock ? "out-of-stock" : '') + "\" id=\"mobile-display-stock\">" + _0x4f22b1.text + "</span>\n                                    </div>\n                                </div>\n                            </div>\n                            \n                            <div class=\"mobile-model-section\">\n                                <div class=\"mobile-model-title\">Phân loại</div>\n                                <div class=\"mobile-model-options\" id=\"mobile-model-options\">\n                    ";
          _0x3de851.forEach((_0x58994e, _0x150649) => {
            const _0x34981f = _0x54a97b.cgOFa(_0xcef61e, _0x58994e, _0x42a69a, _0x36ea81),
              _0x15e5a4 = _0x58994e.name.replace(/"/g, "&quot;"),
              _0x2b7fdf = _0x54a97b.jbmvm(_0x58994e.model_id, window.selectedModelId),
              _0x25d059 = _0x58994e.price,
              _0x3a4d67 = _0x58994e.price_before_discount,
              _0x567d31 = window.modelStocks[_0x58994e.model_id]?.["stock"] || 0;
            _0xf199aa += "\n                            <button class=\"mobile-model-btn " + (_0x2b7fdf ? "selected" : '') + "\" \n                                    data-model-id=\"" + _0x58994e.model_id + "\" \n                                    data-model-name=\"" + _0x15e5a4 + "\"\n                                    data-model-price=\"" + _0x25d059 + "\"\n                                    data-model-original-price=\"" + _0x3a4d67 + "\"\n                                    data-model-stock=\"" + _0x567d31 + "\"\n                                    data-model-img=\"" + _0x34981f + "\"\n                                    data-tier-index=\"" + (_0x58994e.extinfo?.["tier_index"]?.[0] ?? _0x150649) + "\"\n                                    onclick=\"selectModel(this)\">\n                                <img src=\"" + _0x34981f + "\" alt=\"\">\n                                " + _0x15e5a4 + "\n                            </button>\n                        ";
          });
          _0xf199aa += "\n                                </div>\n                            </div>\n                            \n                            <div class=\"mobile-actions\">\n                                <button class=\"order-item-add-btn\" type=\"button\" onclick=\"addCurrentProductToOrderList()\">\n                                    ➕ Thêm\n                                </button>\n                            </div>\n\n                        </div>\n                    ";
          _0x1f10f0.innerHTML = _0xf199aa;
          _0x1d9aeb.success("Đã tải xong thông tin sản phẩm: " + _0x34e17f.title);
          window.renderOrderItemList?.();
        } catch (_0x46dd93) {
          _0x1f10f0.innerHTML = "<div class=\"autobuy-empty-state\"><h3>Lỗi</h3><p>" + _0x46dd93.message + "</p></div>";
          _0x1d9aeb.error(_0x46dd93.message);
        }
      };
      window.selectModel = _0x478282 => {
        document.querySelectorAll(".model-option-btn, .mobile-model-btn").forEach(_0x3ebd7c => _0x3ebd7c.classList.remove("selected"));
        const _0x407343 = _0x478282.dataset.modelId;
        document.querySelectorAll("[data-model-id=\"" + _0x407343 + '\x22]').forEach(_0x3165cc => _0x3165cc.classList.add("selected"));
        window.selectedModelId = _0x54a97b.ngrYR(parseInt, _0x407343);
        const _0x4d6efd = document.getElementById("product-main-image");
        if (_0x4d6efd) _0x4d6efd.src = _0x478282.dataset.modelImg;
        const _0x4f41c8 = document.getElementById("mobile-product-image");
        if (_0x4f41c8) _0x4f41c8.src = _0x478282.dataset.modelImg;
        const _0x5cbac1 = _0x54a97b.hvDCq(_0x54a97b.fWeFG(parseInt, _0x478282.dataset.modelPrice), 100000),
          _0x1292a9 = _0x54a97b.mWwLl(parseInt, _0x478282.dataset.modelOriginalPrice),
          _0x439d5e = _0x54a97b.TRaeN(_0x1292a9, 0),
          _0x22da36 = _0x54a97b.sEFxL(_0x1292a9, 100000),
          _0x50d3c3 = _0x439d5e ? Math.round(_0x54a97b.egrTV(_0x54a97b.pKheV(1, _0x54a97b.wKCaP(_0x5cbac1, _0x22da36)), 100)) : null,
          _0xef60f3 = _0x54a97b.euAbj(parseInt, _0x478282.dataset.modelStock) || 0,
          _0x169e53 = _0x54a97b.RRQNB(_0x1a62e4, _0xef60f3);
        _0x5acbd4.currentModelPrice = _0x54a97b.fWeFG(parseInt, _0x478282.dataset.modelPrice);
        const _0x450475 = document.getElementById("display-price");
        if (_0x450475) {
          const _0x185cd0 = _0x450475.parentElement;
          let _0x2b2a14 = "\n                        <span class=\"info-label\">Giá:</span>\n                        <span class=\"price-value\" id=\"display-price\">" + _0x54a97b.dZjba(_0x2cf1c8, _0x5cbac1) + "</span>\n                        " + (_0x439d5e ? "<span class=\"price-original\">" + _0x54a97b.OqCbt(_0x2cf1c8, _0x22da36) + "</span>" : '') + "\n                        " + (_0x50d3c3 ? "<span class=\"price-discount\">-" + _0x50d3c3 + "%</span>" : '') + "\n                    ";
          _0x185cd0.innerHTML = _0x2b2a14;
        }
        const _0x2edd59 = document.getElementById("mobile-display-price");
        if (_0x2edd59) {
          const _0x20634d = _0x2edd59.parentElement;
          let _0x4635e1 = "\n                        <span class=\"mobile-price\" id=\"mobile-display-price\">" + _0x54a97b.WKABT(_0x2cf1c8, _0x5cbac1) + "</span>\n                        " + (_0x439d5e ? "<span class=\"mobile-price-original\">" + _0x54a97b.QeJpM(_0x2cf1c8, _0x22da36) + "</span>" : '') + "\n                        " + (_0x50d3c3 ? "<span class=\"mobile-discount\">-" + _0x50d3c3 + "%</span>" : '') + "\n                    ";
          _0x20634d.innerHTML = _0x4635e1;
        }
        const _0x49f615 = document.getElementById("display-stock");
        _0x49f615 && (_0x49f615.textContent = _0x169e53.text, _0x49f615.className = _0x54a97b.pfSiv("stock-value", _0x169e53.isOutOfStock ? " out-of-stock" : ''));
        const _0x290406 = document.getElementById("mobile-display-stock");
        _0x290406 && (_0x290406.textContent = _0x169e53.text, _0x290406.className = _0x54a97b.gYxmz("mobile-stock", _0x169e53.isOutOfStock ? " out-of-stock" : ''));
      };
      window.startAutoBuyProcess = async () => {
        const _0x403ccf = _0x59e2f9.xnxLQ(_0x1c3fbd);
        if (!_0x403ccf.length) {
          _0x1d9aeb.error("Vui lòng kiểm tra sản phẩm và thêm vào danh sách đơn.");
          return;
        }
        const _0x3b5a80 = _0x59e2f9.KYPgd(_0x112c7e, _0x403ccf);
        if (_0x59e2f9.xTLcO(_0x3b5a80, _0x4f90cc)) {
          _0x1d9aeb.error("Chỉ hỗ trợ tối đa " + _0x4f90cc + " shop mỗi lần checkout.");
          return;
        }
        _0x5acbd4.orderItems = _0x403ccf;
        if (_0x5acbd4.shopVoucherEnabled && !_0x5acbd4.shopVoucherAutoBestOutsideList && _0x59e2f9.JAxbl(_0x5acbd4.orderItems.length, 1)) {
          const _0x45ff88 = _0x5acbd4.orderItems[0],
            _0x536114 = _0x59e2f9.YnvWH(_0x33c49a, _0x5acbd4.shopVoucherCode),
            _0x4c8a99 = _0x5acbd4.shopVoucherData,
            _0x5c17a8 = _0x59e2f9.wNHeX(Number, _0x4c8a99?.["shopId"] || 0),
            _0x1faf50 = _0x59e2f9.HKwfZ(Number, _0x4c8a99?.["itemId"] || 0),
            _0x54f5be = _0x59e2f9.GwEhN(Number, _0x4c8a99?.["modelId"] || 0);
          if (!_0x536114 || !_0x4c8a99) {
            _0x1d9aeb.error("Voucher shop chưa xác minh. Vào Nâng cao để xác minh mã.");
            _0x59e2f9.wBAif(_0xb3b2de, "warning", "Thiếu voucher shop", "Bạn đã bật Voucher shop nhưng chưa xác minh. Vui lòng mở Nâng cao và bấm Xác minh trước khi đặt đơn.");
            return;
          }
          if (_0x59e2f9.hPAGq(_0x59e2f9.qhxYs(String, _0x4c8a99.voucherCode || '').toUpperCase(), _0x536114)) {
            _0x1d9aeb.error("Mã voucher đã thay đổi, cần xác minh lại.");
            _0x59e2f9.LHDUO(_0xb3b2de, "warning", "Voucher không khớp", "Mã voucher hiện tại khác với mã đã xác minh. Vui lòng xác minh lại trong Nâng cao.");
            return;
          }
          if (!_0x5c17a8 || _0x59e2f9.Ndfbs(_0x5c17a8, _0x59e2f9.BVJwJ(Number, _0x45ff88.shopid))) {
            _0x1d9aeb.error("Voucher shop không thuộc shop của sản phẩm đang chọn.");
            _0x59e2f9.LHDUO(_0xb3b2de, "warning", "Sai shop voucher", "Voucher đã xác minh không thuộc shop của sản phẩm hiện tại. Vui lòng xác minh lại voucher đúng shop.");
            return;
          }
          if (_0x59e2f9.ApDKA(_0x1faf50, _0x59e2f9.xAjqs(Number, _0x45ff88.itemid)) || _0x59e2f9.XWWAu(_0x54f5be, _0x59e2f9.hkhfA(Number, _0x45ff88.modelid))) {
            _0x1d9aeb.error("Voucher chưa xác minh cho đúng sản phẩm/phân loại hiện tại.");
            _0x59e2f9.LHDUO(_0xb3b2de, "warning", "Cần xác minh lại voucher", "Bạn đã đổi sản phẩm hoặc phân loại. Vui lòng xác minh lại voucher shop trước khi đặt đơn.");
            return;
          }
          _0x4c8a99.validationSkipForCheckout && _0x1d9aeb.info("Voucher shop sẽ bị bỏ qua khi checkout: " + (_0x4c8a99.validationMessage || "không áp dụng cho sản phẩm hiện tại") + '.');
        } else {
          if (_0x5acbd4.shopVoucherEnabled && _0x5acbd4.shopVoucherAutoBestOutsideList && _0x59e2f9.qjUdA(_0x5acbd4.orderItems.length, 1)) _0x1d9aeb.info("Voucher shop: bật chế độ tự động áp dụng mã tốt nhất ngoài list preload.");else {
            if (_0x59e2f9.WmfXo(_0x5acbd4.orderItems.length, 1) && _0x5acbd4.shopVoucherEnabled) {
              _0x5acbd4.shopVoucherAutoBestOutsideList && (_0x5acbd4.shopVoucherAutoBestOutsideList = false);
              const _0x5f4f6b = _0x5acbd4.shopVoucherByShop || {},
                _0x262127 = _0x5acbd4.orderItems.map(_0x4ab472 => {
                  const _0x20d191 = _0x54a97b.HZwsC(Number, _0x4ab472.shopid || 0),
                    _0x32d106 = _0x5f4f6b[_0x20d191];
                  return _0x32d106?.["voucherCode"] ? "Shop " + _0x20d191 + ':\x20' + _0x32d106.voucherCode : "Shop " + _0x20d191 + ": [chưa có voucher]";
                }).join(',\x20');
              _0x1d9aeb.info("Đơn nhiều sản phẩm: ưu tiên voucher theo từng shop. Trạng thái: " + _0x262127);
            }
          }
        }
        if (_0x5acbd4.platformVoucherEnabled) {
          const _0x1d50db = _0x59e2f9.ujOmT(_0x45e09d, _0x5acbd4.platformVoucherInput);
          if (_0x59e2f9.eYrac(_0x5acbd4.platformVoucherSource, "wallet") && _0x59e2f9.eBhij(_0x2987c4.status, "LOADING")) {
            _0x1d9aeb.error("Kho voucher Shopee vẫn đang tải.");
            _0x59e2f9.Ymwbj(_0xb3b2de, "warning", "Đang tải kho voucher", "Vui lòng chờ kho voucher tải xong rồi bắt đầu.");
            return;
          }
          if (_0x59e2f9.brSMY(_0x5acbd4.platformVoucherSource, "wallet") && !_0x59e2f9.ZSRvu(String, _0x5acbd4.platformVoucherInput || '').trim()) {
            _0x1d9aeb.error("Voucher Shopee đã bật nhưng chưa nhập link hoặc tên mã.");
            _0x59e2f9.jIIGB(_0xb3b2de, "warning", "Thiếu voucher Shopee", "Bạn đã bật Voucher Shopee nên cần nhập link hoặc tên voucher trong Nâng cao.");
            return;
          }
          if (_0x59e2f9.guqMx(_0x5acbd4.platformVoucherSource, "wallet") && _0x5acbd4.platformVoucherForceLinkOnly && !_0x1d50db.isLink) {
            _0x1d9aeb.error("Voucher Shopee hiện chỉ nhận link vì không tìm thấy mã đã lưu trong ví.");
            _0x59e2f9.PcaoX(_0xb3b2de, "warning", "Cần link voucher Shopee", "Hệ thống không tìm thấy mã đã lưu trong ví. Vui lòng nhập link voucher Shopee.");
            return;
          }
          if (_0x59e2f9.kTKcG(_0x5acbd4.platformVoucherSource, "banner") && !_0x5acbd4.platformVoucherBannerData) {
            _0x1d9aeb.error("Chưa tải được dữ liệu banner SS6.");
            _0x59e2f9.ZnmPo(_0xb3b2de, "warning", "Thiếu dữ liệu banner", "Vui lòng mở Nâng cao, chọn banner và chờ tải xong.");
            return;
          }
        }
        const _0x55dc20 = _0x5acbd4.orderItems[0];
        _0x5acbd4.shopid = _0x59e2f9.GkrAt(Number, _0x55dc20.shopid);
        _0x5acbd4.itemid = _0x59e2f9.bjCdi(Number, _0x55dc20.itemid);
        _0x5acbd4.modelid = _0x59e2f9.NghrK(Number, _0x55dc20.modelid);
        document.getElementById("btn-start-autobuy").style.display = "none";
        document.getElementById("btn-stop-autobuy").style.display = "block";
        document.getElementById("btn-advanced").style.display = "none";
        const _0x979c1c = document.getElementById("mobile-btn-start"),
          _0x180ebb = document.getElementById("mobile-btn-stop"),
          _0x505f5e = document.getElementById("mobile-btn-advanced");
        if (_0x979c1c) _0x979c1c.style.display = "none";
        if (_0x180ebb) _0x180ebb.style.display = "block";
        if (_0x505f5e) _0x505f5e.style.display = "none";
        _0x5acbd4.isRunning = true;
        const {
          itemTitle: _0x3b6c44,
          variantName: _0x408a0c
        } = _0x59e2f9.rjrEe(_0x352574);
        _0x1d9aeb.info("--- BẮT ĐẦU QUY TRÌNH AUTO BUY ---");
        _0x1d9aeb.info("Sản phẩm: " + _0x3b6c44);
        _0x408a0c && _0x1d9aeb.info("Phân loại: " + _0x408a0c);
        _0x1d9aeb.info("Tổng shop trong đơn: " + _0x59e2f9.zBhAD(_0x112c7e, _0x5acbd4.orderItems) + '/' + _0x4f90cc);
        let _0x1434fa = null;
        !_0xae0156 && _0x5acbd4.platformVoucherEnabled && _0x59e2f9.HsSPZ(_0x5acbd4.platformVoucherSource, "banner") && (_0x5acbd4.platformVoucherBannerMode = "smart");
        const _0x10dfab = _0x5acbd4.platformVoucherEnabled && _0x59e2f9.XYrgs(_0x5acbd4.platformVoucherSource, "banner") && _0x59e2f9.eBhij(_0x5acbd4.platformVoucherBannerMode, "smart"),
          _0x54e6b5 = !_0x10dfab && _0x5acbd4.useSchedule;
        if (_0x54e6b5 && _0x5acbd4.scheduledTime) {
          _0x1434fa = new Date(_0x5acbd4.scheduledTime);
          if (_0x5acbd4.shopVoucherAutoBestOutsideList) {
            const _0x3653f4 = Math.min(_0x1434fa.getSeconds(), 56);
            _0x1434fa.setSeconds(_0x3653f4, 0);
          }
        }
        const _0x4f34ee = _0x59e2f9.CHmFf(_0x5acbd4.orderItems.length, 1) && _0x5acbd4.shopVoucherEnabled && _0x5acbd4.shopVoucherAutoBestOutsideList ? (() => {
            const _0x42aefe = Array.isArray(_0xbb2033.vouchers) ? _0xbb2033.vouchers : [],
              _0x4c29d4 = Date.now(),
              _0x5d707d = _0x42aefe.filter(_0x39d3ec => Number(_0x39d3ec.startTime || 0) * 1000 > _0x4c29d4).sort((_0x32b706, _0x51556b) => Number(_0x32b706.startTime || 0) - Number(_0x51556b.startTime || 0))[0];
            return _0x5d707d || null;
          })() : _0x59e2f9.JMwkv(_0x5acbd4.orderItems.length, 1) && _0x5acbd4.shopVoucherEnabled && _0x5acbd4.shopVoucherData ? _0x5acbd4.shopVoucherData : null,
          _0x3d691f = _0x59e2f9.zcZqP(Number, _0x4f34ee?.["startTime"] || 0);
        if (!_0x10dfab && _0x4f34ee && !_0x54e6b5 && Number.isFinite(_0x3d691f) && _0x59e2f9.WKagw(_0x3d691f, 0) && _0x59e2f9.mLCBL(_0x59e2f9.VjNdI(_0x3d691f, 1000), Date.now())) {
          if (_0x59e2f9.ziSsH(_0x5acbd4.post_cart_retry_limit, 20)) {
            const _0xce025 = _0x5acbd4.post_cart_retry_limit;
            _0x5acbd4.post_cart_retry_limit = 50;
            const _0xa150f9 = document.getElementById("setting-post-cart-retries");
            if (_0xa150f9) _0xa150f9.value = '50';
            _0x1d9aeb.info("Voucher chưa tới giờ dùng nên tự nâng Số lần thử đặt lại từ " + _0xce025 + " lên 50.");
          }
          const _0x91a9da = new Date(_0x59e2f9.mrYPX(_0x3d691f, 1000)),
            _0xd313e0 = new Date(_0x59e2f9.xmoJC(_0x91a9da.getTime(), 4000));
          _0x59e2f9.WmfXo(_0xd313e0.getTime(), Date.now()) && (_0x1434fa = _0xd313e0, _0x1d9aeb.info("Voucher " + (_0x4f34ee.voucherCode || '') + " bắt đầu lúc " + _0x59e2f9.XPJJV(_0x6173b0, _0x91a9da) + ". Hệ thống sẽ tự chạy lúc " + _0x59e2f9.pEfuU(_0x6173b0, _0xd313e0) + " (sớm 4 giây)."));
        }
        if (!_0x10dfab && _0x4f34ee && _0x54e6b5 && Number.isFinite(_0x3d691f) && _0x59e2f9.IYncv(_0x3d691f, 0)) {
          const _0x1b3e5d = new Date(_0x59e2f9.mrYPX(_0x3d691f, 1000)),
            _0x160b9f = new Date(_0x59e2f9.chinz(_0x1b3e5d.getTime(), 4000));
          if (_0x1434fa && _0x59e2f9.weKaQ(_0x1434fa.getTime(), _0x160b9f.getTime()) && _0x59e2f9.TlzDW(_0x160b9f.getTime(), Date.now())) {
            const _0x16bd55 = new Date(_0x1434fa);
            _0x1434fa = _0x160b9f;
            _0x1d9aeb.info("Hẹn giờ đang quá gần giờ mở mã, tự điều chỉnh từ " + _0x59e2f9.JYuuS(_0x6173b0, _0x16bd55) + " xuống " + _0x59e2f9.PfSff(_0x6173b0, _0x160b9f) + " để chạy sớm ít nhất 4 giây.");
          }
        }
        _0x59e2f9.nbLNv(typeof window.affiliate_popup, "function") && (await window.affiliate_popup(_0x54e6b5 && _0x1434fa ? {
          'mode': "scheduled",
          'secondsToRun': Math.ceil(_0x59e2f9.QxZgr(_0x59e2f9.CVvac(_0x1434fa.getTime(), Date.now()), 1000))
        } : {
          'mode': "instant"
        }));
        if (_0x1434fa) {
          const _0x89b50 = _0x59e2f9.YfxKr(_0x1434fa.getTime(), Date.now());
          if (_0x59e2f9.weKaQ(_0x89b50, 0)) {
            _0x1d9aeb.info("Đang chờ đến " + _0x59e2f9.JwSLt(_0x6173b0, _0x1434fa) + "...");
            while (_0x5acbd4.isRunning && _0x59e2f9.kYvEe(Date.now(), _0x1434fa.getTime())) {
              const _0x2826b7 = Math.ceil(_0x59e2f9.ZiHmW(_0x59e2f9.UsVmY(_0x1434fa.getTime(), Date.now()), 1000));
              (_0x59e2f9.RHZSK(_0x59e2f9.izmNJ(_0x2826b7, 10), 0) || _0x59e2f9.UsfuG(_0x2826b7, 5)) && _0x1d9aeb.info("Còn " + _0x2826b7 + " giây...");
              await _0x59e2f9.HsIUk(_0x1f795e, 1000);
            }
            if (!_0x5acbd4.isRunning) {
              _0x59e2f9.rBlzq(_0x4cfa5b);
              return;
            }
          }
        }
        if (_0x5acbd4.platformVoucherEnabled && _0x59e2f9.nbLNv(_0x5acbd4.platformVoucherSource, "banner")) {
          try {
            await _0x59e2f9.BdDfx(_0x14cc55);
          } catch (_0x40fd28) {
            _0x59e2f9.YSKxs(_0x40fd28?.["name"], "AbortError") && (_0x4d2c49.uiState = "error", _0x59e2f9.BdDfx(_0x43ae40));
            _0x59e2f9.BPOXq(_0xeba1ed);
            _0x59e2f9.YzbrU(_0x40fd28?.["name"], "AbortError") && _0x5acbd4.isRunning && (_0x1d9aeb.error("SS6 dừng: " + _0x40fd28.message), _0x59e2f9.PcaoX(_0xb3b2de, "error", "Không lấy được voucher banner", _0x40fd28.message));
            _0x59e2f9.YzBpK(_0x4cfa5b);
            return;
          }
          if (!_0x5acbd4.isRunning) return;
        }
        _0x59e2f9.UxPUH(_0x4990a9);
      };
      window.stopAutoBuyProcess = () => {
        _0x5acbd4.isRunning = false;
        _0x4d2c49.stopped = true;
        _0x4d2c49.controller?.["abort"]("user_stopped");
        _0x4d2c49.uiState = "stopped";
        _0x54a97b.VkvLG(_0x43ae40);
        _0x54a97b.ihmgg(_0xeba1ed);
        document.getElementById("btn-start-autobuy").style.display = "block";
        document.getElementById("btn-stop-autobuy").style.display = "none";
        document.getElementById("btn-advanced").style.display = "block";
        const _0x4afd52 = document.getElementById("mobile-btn-start"),
          _0x246a52 = document.getElementById("mobile-btn-stop"),
          _0xc691b3 = document.getElementById("mobile-btn-advanced");
        if (_0x4afd52) _0x4afd52.style.display = "block";
        if (_0x246a52) _0x246a52.style.display = "none";
        if (_0xc691b3) _0xc691b3.style.display = "block";
        const _0x1332d3 = document.getElementById("voucher-btn-start"),
          _0x3ed798 = document.getElementById("voucher-btn-stop"),
          _0x3ef683 = document.getElementById("voucher-btn-advanced");
        if (_0x1332d3) _0x1332d3.style.display = "block";
        if (_0x3ed798) _0x3ed798.style.display = "none";
        if (_0x3ef683) _0x3ef683.style.display = "block";
        _0x1d9aeb.info("--- ĐÃ DỪNG QUY TRÌNH ---");
      };
      window.startVoucherAutoProcess = async () => {
        !_0x120c37?.["shopid"] && (await window.resolveVoucherAutoShopFromUi());
        if (!_0x120c37?.["shopid"] || !_0x5b0961) {
          _0x54a97b.chaAL(_0x3eda96, "Chưa resolve shop/baseline thành công.", "error");
          return;
        }
        const _0x41f753 = document.getElementById("voucher-btn-start"),
          _0xb32bbf = document.getElementById("voucher-btn-stop"),
          _0x58c9e5 = document.getElementById("voucher-btn-advanced");
        if (_0x41f753) _0x41f753.style.display = "none";
        if (_0xb32bbf) _0xb32bbf.style.display = "block";
        if (_0x58c9e5) _0x58c9e5.style.display = "none";
        _0x5acbd4.isRunning = true;
        _0x4f6351 = _0x4f6351.filter(_0x30bb6c => ["READY", "WAITING_START", "PREPARING"].includes(_0x30bb6c.status));
        try {
          let _0x1a8265 = null;
          _0x5acbd4.useSchedule && _0x5acbd4.scheduledTime && (_0x1a8265 = new Date(_0x5acbd4.scheduledTime));
          _0x54a97b.EwmFE(typeof window.affiliate_popup, "function") && (await window.affiliate_popup(_0x1a8265 ? {
            'mode': "scheduled",
            'secondsToRun': Math.ceil(_0x54a97b.vZMWf(_0x54a97b.pKheV(_0x1a8265.getTime(), Date.now()), 1000))
          } : {
            'mode': "instant"
          }));
          if (_0x1a8265 && _0x54a97b.zSJfF(_0x1a8265.getTime(), Date.now())) {
            _0x54a97b.nFdLe(_0x3eda96, "Waiting schedule " + _0x54a97b.apGjV(_0x6173b0, _0x1a8265) + "...");
            while (_0x5acbd4.isRunning && _0x54a97b.CKlwv(Date.now(), _0x1a8265.getTime())) {
              await _0x54a97b.CzkXw(_0x1f795e, 500);
            }
          }
          let _0x446671 = 0;
          const _0x6b19c2 = Math.max(1, _0x54a97b.nQVgj(Number, _0x5acbd4.voucher_auto_scan_limit || 1));
          while (_0x5acbd4.isRunning && _0x54a97b.ovBFT(_0x446671, _0x6b19c2)) {
            _0x446671 += 1;
            const _0xb0f5d1 = await _0x54a97b.MPNsf(_0xd783c3, _0x446671);
            if (_0xb0f5d1) break;
            await _0x54a97b.oqZdY(_0x1f795e, _0x5acbd4.retry_delay);
          }
          _0x54a97b.chaAL(_0x3eda96, "Hoàn tất quy trình Voucher Auto.", "success");
        } catch (_0x4f4e8c) {
          _0x54a97b.QSrzd(_0x4f4e8c.message, "CAPTCHA_REQUIRED") ? _0x54a97b.ablSJ(_0x3eda96, "Captcha terminal error. Dừng toàn bộ.", "error") : _0x54a97b.iYWfW(_0x3eda96, "Dừng: " + _0x4f4e8c.message, "error");
        } finally {
          _0x5acbd4.isRunning = false;
          if (_0x41f753) _0x41f753.style.display = "block";
          if (_0xb32bbf) _0xb32bbf.style.display = "none";
          if (_0x58c9e5) _0x58c9e5.style.display = "block";
          _0x54a97b.QpDBI(_0x4cfa5b);
        }
      };
    };
    const _0x457d15 = (_0x41b7b2, _0x4530f3) => Number(_0x41b7b2 || 0) + ':' + Number(_0x4530f3 || 0),
      _0x253239 = async () => {
        const _0x4cddd7 = await fetch("https://shopee.vn/api/v4/cart/get", {
          'method': "POST",
          'headers': {
            'accept': "application/json",
            'content-type': "application/json"
          },
          'body': "{\"pre_selected_item_list\":[],\"updated_time_filter\":{\"start_time\":0},\"cart_state\":{},\"version_list\":[10040779]}",
          'mode': "cors",
          'credentials': "include"
        });
        if (!_0x4cddd7.ok) throw new Error("Không thể gọi cart/get để kiểm tra giá.");
        const _0x17ad72 = await _0x4cddd7.json();
        return _0x2d1992(_0x17ad72, "cart/get:wait_price"), _0x17ad72;
      },
      _0x5c81e5 = _0x5551a8 => {
        const _0x5752fb = {
            'TBGcm': function (_0x5c8d1f, _0x1493a1) {
              return _0x5c8d1f(_0x1493a1);
            },
            'pJBNp': function (_0x224e6d, _0x3ab487) {
              return _0x224e6d(_0x3ab487);
            },
            'MnOwQ': function (_0x3f6133, _0x2bce8c) {
              return _0x3f6133 > _0x2bce8c;
            },
            'awBsB': function (_0x58f7bb, _0x528213) {
              return _0x58f7bb > _0x528213;
            },
            'UeFdE': function (_0x4b2e01, _0x2e9184, _0x3a787f) {
              return _0x4b2e01(_0x2e9184, _0x3a787f);
            },
            'JXQdz': function (_0x51479d, _0x1fd0fb) {
              return _0x51479d(_0x1fd0fb);
            },
            'YRWKa': function (_0x242416, _0x4a6da0) {
              return _0x242416(_0x4a6da0);
            }
          },
          _0x1872bd = new Map(),
          _0x3eac95 = new Map(),
          _0x29c07c = Array.isArray(_0x5551a8?.["data"]?.["cart_blocks"]) ? _0x5551a8.data.cart_blocks : [];
        return _0x29c07c.forEach(_0x4f6e89 => {
          const _0x3fe274 = {
              'EpPeB': function (_0x1b8f65, _0x20bd1f) {
                return _0x5752fb.TBGcm(_0x1b8f65, _0x20bd1f);
              },
              'IVIWM': function (_0x510bd5, _0x97300d) {
                return _0x5752fb.pJBNp(_0x510bd5, _0x97300d);
              },
              'ENjan': function (_0x4b55c3, _0x382a15) {
                return _0x5752fb.MnOwQ(_0x4b55c3, _0x382a15);
              },
              'YohMd': function (_0x154479, _0x36946c) {
                return _0x5752fb.MnOwQ(_0x154479, _0x36946c);
              },
              'RylVN': function (_0x4672eb, _0x2b6540) {
                return _0x5752fb.awBsB(_0x4672eb, _0x2b6540);
              },
              'XgHqF': function (_0xe3e501, _0x27facd, _0x2224dd) {
                return _0x5752fb.UeFdE(_0xe3e501, _0x27facd, _0x2224dd);
              },
              'gQPns': function (_0xed81cb, _0x9c9a00) {
                return _0x5752fb.JXQdz(_0xed81cb, _0x9c9a00);
              },
              'NZIcY': function (_0x467fa7, _0x54f3d1) {
                return _0x5752fb.YRWKa(_0x467fa7, _0x54f3d1);
              },
              'NeUGZ': function (_0x544ba8, _0x259df7) {
                return _0x5752fb.awBsB(_0x544ba8, _0x259df7);
              }
            },
            _0x426288 = Array.isArray(_0x4f6e89?.["items"]) ? _0x4f6e89.items : [];
          _0x426288.forEach(_0x2f1656 => {
            const _0x9b532e = _0x3fe274.gQPns(Number, _0x2f1656?.["itemid"] || 0),
              _0x3e4c29 = _0x3fe274.NZIcY(Number, _0x2f1656?.["modelid"] || 0);
            if (_0x3fe274.NeUGZ(_0x9b532e, 0) && _0x3fe274.NeUGZ(_0x3e4c29, 0)) {
              const _0x6726f9 = _0x3fe274.XgHqF(_0x457d15, _0x9b532e, _0x3e4c29),
                _0x265d64 = _0x3fe274.IVIWM(Number, _0x2f1656?.["price"] || 0);
              if (_0x3fe274.YohMd(_0x265d64, 0)) _0x1872bd.set(_0x6726f9, _0x265d64);
            }
            const _0x2e1482 = Array.isArray(_0x2f1656?.["item_price"]?.["price_list"]) ? _0x2f1656.item_price.price_list : [];
            _0x2e1482.forEach(_0x18e92e => {
              const _0x1b0569 = _0x3fe274.EpPeB(Number, _0x18e92e?.["itemid"] || _0x9b532e || 0),
                _0x321a23 = _0x3fe274.IVIWM(Number, _0x18e92e?.["modelid"] || 0),
                _0x2ec687 = _0x3fe274.EpPeB(Number, _0x18e92e?.["price"] || 0);
              _0x3fe274.ENjan(_0x1b0569, 0) && _0x3fe274.YohMd(_0x321a23, 0) && _0x3fe274.RylVN(_0x2ec687, 0) && _0x3eac95.set(_0x3fe274.XgHqF(_0x457d15, _0x1b0569, _0x321a23), _0x2ec687);
            });
          });
        }), {
          'cartPriceByKey': _0x1872bd,
          'modelPriceByKey': _0x3eac95
        };
      },
      _0xcf0aa2 = async _0x369d95 => {
        const _0x420a8f = _0x42fe82(),
          _0x45c667 = _0x1c3fbd(),
          _0x38c60c = _0x59a8ac(_0x45c667),
          _0x593c49 = _0x3b5c82(_0x45c667, 0),
          _0x5a2a47 = _0x3c84d4(),
          _0x1b9129 = {
            'shoporders': _0x38c60c,
            'cart_type': 0x1,
            'client_id': 0x5,
            '_cft': [1811668587, 2923429887, 1162652],
            'selected_payment_channel_data': _0x420a8f.selected_payment_channel_data,
            'promotion_data': {
              'use_coins': !!_0x5acbd4.use_coins,
              'free_shipping_voucher_info': {
                'free_shipping_voucher_id': 0x0
              },
              'platform_vouchers': _0x5a2a47,
              'shop_vouchers': _0x593c49.shopVouchers,
              'check_shop_voucher_entrances': true,
              'auto_apply_platform_voucher': _0x5a2a47.length === 0,
              'auto_apply_shop_voucher': _0x593c49.autoApplyShopVoucher
            },
            'device_info': {
              'device_id': '',
              'device_fingerprint': '',
              'tongdun_blackbox': '',
              'buyer_payment_info': {},
              'timezone_offset_in_minutes': 0x1a4,
              'device_sz_fingerprint': _0x369d95.fingerprint
            },
            'tax_info': {
              'tax_id': ''
            },
            'checkout_session_id': _0x420a8f.checkout_session_id,
            'timestamp': _0x420a8f.timestamp
          },
          _0xbefc91 = await fetch("https://shopee.vn/api/v4/checkout/get", {
            'headers': {
              'content-type': "application/json",
              'x-api-source': _0x4cbd05(),
              'x-csrftoken': _0x369d95.csrf,
              'x-shopee-language': 'vi'
            },
            'body': JSON.stringify(_0x1b9129),
            'method': "POST",
            'mode': "cors",
            'credentials': "include"
          });
        if (!_0xbefc91.ok) throw new Error("Không thể gọi checkout/get để kiểm tra giá.");
        const _0x5943d3 = await _0xbefc91.json();
        return _0x2d1992(_0x5943d3, "checkout/get:wait_price"), _0x5301d9(_0x5943d3, "checkout/get:wait_price"), _0x5943d3;
      },
      _0x407e56 = _0x414103 => {
        const _0x5d5ab6 = {
            'OIHaF': function (_0xc6d170, _0x99a780) {
              return _0xc6d170(_0x99a780);
            },
            'DBquq': function (_0x51a241, _0x3052ac) {
              return _0x51a241(_0x3052ac);
            },
            'Vdfdu': function (_0x1787a7, _0x16ee02) {
              return _0x1787a7(_0x16ee02);
            },
            'Dhkom': function (_0x5a4d6e, _0x4281d6) {
              return _0x5a4d6e > _0x4281d6;
            },
            'wNIHo': function (_0x4e7243, _0x3e776d, _0x110611) {
              return _0x4e7243(_0x3e776d, _0x110611);
            }
          },
          _0x21fbb1 = new Map(),
          _0x1bdee8 = Array.isArray(_0x414103?.["shoporders"]) ? _0x414103.shoporders : [];
        return _0x1bdee8.forEach(_0xa01e29 => {
          const _0xb64523 = Array.isArray(_0xa01e29?.["items"]) ? _0xa01e29.items : [];
          _0xb64523.forEach(_0x1c639b => {
            const _0xfc1e32 = _0x5d5ab6.OIHaF(Number, _0x1c639b?.["itemid"] || 0),
              _0x4ac542 = _0x5d5ab6.DBquq(Number, _0x1c639b?.["modelid"] || 0),
              _0x4b0f2c = _0x5d5ab6.Vdfdu(Number, _0x1c639b?.["price"] || 0);
            _0x5d5ab6.Dhkom(_0xfc1e32, 0) && _0x5d5ab6.Dhkom(_0x4ac542, 0) && _0x5d5ab6.Dhkom(_0x4b0f2c, 0) && _0x21fbb1.set(_0x5d5ab6.wNIHo(_0x457d15, _0xfc1e32, _0x4ac542), _0x4b0f2c);
          });
        }), _0x21fbb1;
      },
      _0x5eed04 = _0x166499 => {
        const _0x462ad6 = new Map();
        return (Array.isArray(_0x166499) ? _0x166499 : []).forEach(_0x1e76e7 => {
          const _0x55a596 = _0x59e2f9.gYxIq(_0x457d15, _0x1e76e7?.["itemid"], _0x1e76e7?.["modelid"]),
            _0x31bce9 = _0x59e2f9.BFFre(Number, _0x1e76e7?.["price"] || 0);
          if (!_0x55a596 || _0x59e2f9.RJCSy(_0x31bce9, 0)) return;
          _0x462ad6.set(_0x55a596, Math.round(_0x59e2f9.alWHs(_0x31bce9, 100000)));
        }), _0x462ad6;
      },
      _0x27ee32 = async _0x10460b => {
        const _0x29ff45 = _0x5acbd4.priceCheckMode || "checkout";
        _0x1d9aeb.info("Đang chờ giá thay đổi (" + _0x29ff45 + ")...");
        if (_0x29ff45 === "product") {
          const _0x5893df = _0x5acbd4.currentModelPrice;
          while (_0x5acbd4.isRunning) {
            const _0x3a75d1 = await _0x47972e(_0x5acbd4.shopid, _0x5acbd4.itemid, _0x5acbd4.modelid, _0x10460b.csrf);
            if (_0x3a75d1.error === 90309999) {
              _0x1d9aeb.error("Cần xác minh captcha!");
              throw new Error("Vui lòng xác minh captcha và thử lại!");
            }
            const _0x1e43fa = _0x3a75d1[_0x5acbd4.modelid];
            if (_0x1e43fa && _0x1e43fa.price < _0x5893df) {
              const _0x336d69 = _0x1e43fa.price / 100000;
              return _0x1d9aeb.success("Giá đã giảm! " + _0x5893df / 100000 + "k → " + _0x336d69 + 'k'), true;
            }
            await _0x1f795e(_0x5acbd4.retry_delay);
          }
          return false;
        }
        const _0x44a929 = _0x1c3fbd().filter(_0xd152fc => _0xd152fc && Number(_0xd152fc.itemid || 0) > 0 && Number(_0xd152fc.modelid || 0) > 0),
          _0x5c403c = _0x44a929.map(_0x5f57b2 => _0x457d15(_0x5f57b2.itemid, _0x5f57b2.modelid));
        if (!_0x5c403c.length) return _0x1d9aeb.error("Không có sản phẩm theo dõi để chờ giá thay đổi."), false;
        const _0x44ef65 = _0x53fb5e => _0x5c403c.map(_0x4bdcbd => _0x4bdcbd + ':' + Number(_0x53fb5e.get(_0x4bdcbd) || 0)).join('|'),
          _0x25a16d = _0x457d15(_0x5acbd4.itemid, _0x5acbd4.modelid),
          _0x330c63 = _0x5969c2 => Number(_0x5969c2.modelPriceByKey.get(_0x25a16d) || _0x5969c2.cartPriceByKey.get(_0x25a16d) || 0);
        let _0x476ed5 = '',
          _0xe0c471 = 0;
        if (_0x29ff45 === "checkout") {
          const _0x1fe0df = _0x5eed04(_0x44a929);
          _0x476ed5 = _0x44ef65(_0x1fe0df);
          if (!_0x476ed5) return _0x1d9aeb.error("Không tạo được baseline giá ẩn từ Đơn hàng."), false;
        } else {
          const _0xae5a8 = await _0x253239(),
            _0x541a00 = _0x5c81e5(_0xae5a8);
          _0xe0c471 = _0x330c63(_0x541a00);
        }
        while (_0x5acbd4.isRunning) {
          if (_0x29ff45 === "checkout") try {
            const _0x327c8f = await _0xcf0aa2(_0x10460b);
            if (String(_0x327c8f?.["error"] || '') === "error_stock") {
              await _0x1f795e(_0x5acbd4.retry_delay);
              continue;
            }
            const _0x1c8e71 = _0x407e56(_0x327c8f),
              _0x136e40 = _0x44ef65(_0x1c8e71);
            if (_0x136e40 && _0x136e40 !== _0x476ed5) return _0x1d9aeb.success("Giá checkout đã thay đổi so với giá Đơn hàng ban đầu."), true;
          } catch (_0xe59fa3) {
            const _0x2835ff = String(_0xe59fa3?.["message"] || '');
            !_0x2835ff.includes("error_stock") && _0x1d9aeb.info("Checkout chưa sẵn sàng: " + _0x2835ff);
          } else {
            if (_0x29ff45 === "cart") {
              const _0x5af052 = await _0x253239(),
                _0x3a1fd3 = _0x5c81e5(_0x5af052),
                _0x121737 = _0x330c63(_0x3a1fd3);
              if (_0x121737 > 0 && _0x121737 !== _0xe0c471) return _0x1d9aeb.success("Giá sản phẩm giỏ đã đổi: " + _0xe0c471 / 100000 + " → " + _0x121737 / 100000), true;
            }
          }
          await _0x1f795e(_0x5acbd4.retry_delay);
        }
        return false;
      },
      _0x3972ea = async _0x26e72c => {
        let _0x5e4043 = 0;
        _0x1d9aeb.info("[1/2] Đang thêm vào giỏ hàng...");
        while (_0x5e4043 < _0x5acbd4.max_retries && _0x5acbd4.isRunning) {
          _0x5e4043++;
          const _0x13ee46 = {
            'quantity': _0x5acbd4.quantity,
            'checkout': true,
            'update_checkout_only': false,
            'donot_add_quantity': false,
            'source': "{\"refer_urls\":[]}",
            'client_source': 0x1,
            'shopid': _0x5acbd4.shopid,
            'itemid': _0x5acbd4.itemid,
            'modelid': _0x5acbd4.modelid
          };
          try {
            const _0xd5afb8 = await fetch("https://shopee.vn/api/v4/cart/add_to_cart", {
                'headers': {
                  'content-type': "application/json",
                  'x-api-source': _0x4cbd05(),
                  'x-csrftoken': _0x26e72c.csrf,
                  'x-shopee-language': 'vi'
                },
                'body': JSON.stringify(_0x13ee46),
                'method': "POST",
                'mode': "cors",
                'credentials': "include"
              }),
              _0x33ec83 = await _0xd5afb8.json();
            _0x2d1992(_0x33ec83, "add_to_cart:core");
            if (_0x33ec83.error === 0) return _0x1d9aeb.success("[Add Cart] Thành công lần " + _0x5e4043 + '!'), _0x33ec83;else {
              if (_0x33ec83.error === 15020014) {
                _0x1d9aeb.error("[Add Cart] Sản phẩm đã bị xóa hoặc khóa.");
                throw new Error("PRODUCT_LOCKED_OR_DELETED");
              } else {
                if (_0x33ec83.error === 90309999) {
                  _0x1d9aeb.error("Cần xác minh captcha! Vui lòng refresh trang và thử lại.");
                  if (typeof window.showCaptchaErrorModal === "function") window.showCaptchaErrorModal();
                  throw new Error("Vui lòng xác minh captcha và thử lại!");
                } else _0x1d9aeb.info("[Add Cart] " + _0x33ec83.error_msg + " (Thử lại...)");
              }
            }
          } catch (_0x6aafcc) {
            if (_0x6aafcc.message === "PRODUCT_LOCKED_OR_DELETED") throw _0x6aafcc;
            _0x1d9aeb.error("[Add Cart] Lỗi: " + _0x6aafcc.message);
          }
          await _0x1f795e(_0x5acbd4.retry_delay);
        }
        if (!_0x5acbd4.isRunning) throw new Error("Đã dừng bởi người dùng");
        throw new Error("Quá số lần thử thêm vào giỏ hàng!");
      },
      _0x2b233c = async (_0x3a67a0, _0xbc9cbb, _0x16987e = 0) => {
        if (!_0x5acbd4.isRunning) throw new Error("Đã dừng bởi người dùng");
        _0x1d9aeb.info("[1/2] Lấy thông tin thanh toán...");
        const _0x19f954 = _0x42fe82(),
          _0x40f2ff = _0x1c3fbd(),
          _0x24145c = _0x59a8ac(_0x40f2ff),
          _0x1220ac = _0x3b5c82(_0x40f2ff, _0x16987e),
          _0x42ecf3 = _0x3c84d4(),
          _0x2f4332 = _0x5acbd4.paymentMethod === "gpay",
          _0x555bff = {
            'shoporders': _0x24145c,
            'cart_type': 0x1,
            'client_id': 0x5,
            '_cft': [1811668587, 2923429887, 1162652],
            'selected_payment_channel_data': _0x19f954.selected_payment_channel_data,
            'promotion_data': {
              'use_coins': !!_0x5acbd4.use_coins,
              'free_shipping_voucher_info': {
                'free_shipping_voucher_id': 0x0
              },
              'platform_vouchers': _0x42ecf3,
              'shop_vouchers': _0x1220ac.shopVouchers,
              'check_shop_voucher_entrances': true,
              'auto_apply_platform_voucher': _0x42ecf3.length === 0,
              'auto_apply_shop_voucher': _0x1220ac.autoApplyShopVoucher
            },
            'device_info': {
              'device_id': '',
              'device_fingerprint': '',
              'tongdun_blackbox': '',
              'buyer_payment_info': {},
              'timezone_offset_in_minutes': 0x1a4,
              'device_sz_fingerprint': _0x3a67a0.fingerprint
            },
            'tax_info': {
              'tax_id': ''
            },
            'checkout_session_id': _0x19f954.checkout_session_id,
            'timestamp': _0x19f954.timestamp
          },
          _0x3ffcba = await fetch("https://shopee.vn/api/v4/checkout/get", {
            'headers': {
              'content-type': "application/json",
              'priority': "u=1, i",
              'x-api-source': _0x4cbd05(),
              'x-csrftoken': _0x3a67a0.csrf,
              'x-shopee-language': 'vi'
            },
            'body': JSON.stringify(_0x555bff),
            'method': "POST",
            'mode': "cors",
            'credentials': "include"
          }),
          _0x2a050d = await _0x3ffcba.json();
        _0x2d1992(_0x2a050d, "checkout/get");
        _0x5301d9(_0x2a050d, "checkout/get");
        if (_0x2a050d && !_0x2a050d.error) {
          _0x1d9aeb.success("[Get Checkout] Thành công!");
          _0x2a050d.generated_timestamp = _0x19f954.timestamp;
          _0x2a050d.generated_checkout_session_id = _0x19f954.checkout_session_id;
          _0x2a050d.generated_payment_data = _0x19f954.selected_payment_channel_data;
          _0x2a050d.generated_cart_type = _0x555bff.cart_type;
          _0x2a050d.generated_client_id = _0x555bff.client_id;
          _0x2a050d.generated_cft = _0x555bff._cft;
          _0x2a050d.generated_selected_platform_vouchers = _0x42ecf3;
          _0x2a050d.generated_selected_shop_vouchers = _0x1220ac.shopVouchers;
          _0x2a050d.generated_voucher_selection_source = _0x1220ac.source;
        }
        return _0x2a050d;
      },
      _0x3c1771 = _0x5858e0 => {
        const _0x53dbf3 = [_0x5858e0?.["promotion_data"]?.["voucher_code"], _0x5858e0?.["promotion_data"]?.["applied_voucher_code"], _0x5858e0?.["promotion_data"]?.["voucher_info"]?.["voucher_code"]],
          _0x30140c = _0x53dbf3.map(_0xb7825a => _0x33c49a(_0xb7825a)).find(Boolean);
        if (_0x30140c) return _0x30140c;
        const _0x22550f = Array.isArray(_0x5858e0?.["promotion_data"]?.["shop_vouchers"]) ? _0x5858e0.promotion_data.shop_vouchers : [],
          _0x3e64c4 = _0x22550f.map(_0x54de06 => _0x33c49a(_0x54de06?.["voucher_code"] || _0x54de06?.["applied_voucher_code"] || '')).find(Boolean);
        return _0x3e64c4 || '';
      },
      _0x289410 = async (_0x4549a6, _0x2d9ca4) => {
        const _0x45de6b = _0x24acbd();
        let _0x55022f = 0;
        const _0x1228f5 = Math.max(1, Number(_0x5acbd4.post_cart_retry_limit || 1));
        let _0x3b6f77 = '';
        while (_0x5acbd4.isRunning && _0x55022f < _0x1228f5) {
          _0x55022f += 1;
          const _0x3b543e = await _0x2b233c(_0x4549a6, _0x2d9ca4);
          if (!_0x3b543e || _0x3b543e.error) {
            const _0x36bc4f = _0x3dac5a(_0x3b543e, "Không thể lấy thông tin thanh toán để auto chọn voucher.");
            _0x36bc4f !== _0x3b6f77 && (_0x1d9aeb.error("[Auto] " + _0x36bc4f), _0x3b6f77 = _0x36bc4f);
          } else {
            const _0x23ac74 = _0x3c1771(_0x3b543e);
            if (!_0x23ac74) _0x1d9aeb.info("[Auto] Lần " + _0x55022f + '/' + _0x1228f5 + ": chưa có mã mới, thử lại...");else {
              if (!_0x45de6b.has(_0x23ac74)) return _0x1d9aeb.success("[Auto] ĐÃ TÌM THẤY MÃ MỚI: " + _0x23ac74), _0x3b543e;else _0x1d9aeb.info("[Auto] Lần " + _0x55022f + '/' + _0x1228f5 + ": mã " + _0x23ac74 + " trong list ban đầu, thử lại...");
            }
          }
          if (_0x55022f >= _0x1228f5) break;
          await _0x1f795e(_0x5acbd4.retry_delay);
        }
        return null;
      },
      _0x5d7ac0 = async (_0x385814, _0x502a28) => {
        if (!_0x5acbd4.isRunning) throw new Error("Đã dừng bởi người dùng");
        _0x1d9aeb.info("[2/2] Đặt hàng...");
        if (!_0x502a28 || _0x502a28.error) return _0x1d9aeb.error("Dữ liệu checkout lỗi, hủy đặt hàng."), {
          'error': "Invalid checkout info"
        };
        const _0x5021e3 = _0x502a28.generated_timestamp || Math.floor(_0x59e2f9.ZiHmW(Date.now(), 1000)),
          _0x13a64d = window.current_user_id || _0x5acbd4.userid || 1572156785,
          _0x9efbb3 = _0x502a28.generated_checkout_session_id || _0x13a64d + '-' + Date.now(),
          _0x165b2d = _0x502a28.selected_payment_channel_data || _0x502a28.generated_payment_data || _0x59e2f9.xnxLQ(_0x43cf18) || _0x59e2f9.UekGt(_0xdb46af, _0x5acbd4.paymentMethod),
          _0x10ff5f = Number.isFinite(_0x59e2f9.VnsfA(Number, _0x502a28.client_id)) ? _0x59e2f9.YRYWR(Number, _0x502a28.client_id) : Number.isFinite(_0x59e2f9.SBjcj(Number, _0x502a28.generated_client_id)) ? _0x59e2f9.UKqNS(Number, _0x502a28.generated_client_id) : _0x59e2f9.PKpJX(_0x5acbd4.paymentMethod, "gpay") ? 0 : 5,
          _0x5ea4d3 = Number.isFinite(_0x59e2f9.ZLeKv(Number, _0x502a28.cart_type)) ? _0x59e2f9.AeIjk(Number, _0x502a28.cart_type) : Number.isFinite(_0x59e2f9.wVdrH(Number, _0x502a28.generated_cart_type)) ? _0x59e2f9.OlNnE(Number, _0x502a28.generated_cart_type) : _0x59e2f9.baUwz(_0x5acbd4.paymentMethod, "gpay") ? 0 : 1,
          _0x13ccd6 = Array.isArray(_0x502a28._cft) ? _0x502a28._cft : Array.isArray(_0x502a28.generated_cft) ? _0x502a28.generated_cft : [1811668587, 2923429887, 1162652],
          _0x33fb4d = Array.isArray(_0x502a28.generated_selected_shop_vouchers) ? _0x502a28.generated_selected_shop_vouchers : [],
          _0x442833 = Array.isArray(_0x502a28.generated_selected_platform_vouchers) ? _0x502a28.generated_selected_platform_vouchers : _0x59e2f9.Gltpr(_0x3c84d4),
          _0x323e56 = (() => {
            const _0x14cad4 = _0x502a28.promotion_data && _0x59e2f9.oaZKk(typeof _0x502a28.promotion_data, "object") ? {
                ..._0x502a28.promotion_data,
                'use_coins': !!_0x5acbd4.use_coins
              } : {
                'use_coins': !!_0x5acbd4.use_coins,
                'free_shipping_voucher_info': {
                  'free_shipping_voucher_id': 0x0
                },
                'platform_vouchers': [],
                'shop_vouchers': [],
                'check_shop_voucher_entrances': true,
                'auto_apply_platform_voucher': true,
                'auto_apply_shop_voucher': true
              },
              _0x5271a2 = Array.isArray(_0x14cad4.shop_vouchers) ? _0x14cad4.shop_vouchers : [];
            if (_0x59e2f9.jhinb(_0x442833.length, 0)) {
              _0x14cad4.platform_vouchers = _0x442833;
              _0x14cad4.auto_apply_platform_voucher = false;
            } else !Array.isArray(_0x14cad4.platform_vouchers) && (_0x14cad4.platform_vouchers = []);
            if (_0x59e2f9.zvgnS(_0x33fb4d.length, 0)) {
              _0x14cad4.shop_vouchers = _0x33fb4d;
              _0x14cad4.auto_apply_shop_voucher = false;
            } else {
              if (!_0x5271a2.length) {
                const _0x1c2e03 = _0x59e2f9.XsGqg(_0x39e53d);
                if (_0x1c2e03) return _0x14cad4.shop_vouchers = [_0x1c2e03], _0x14cad4.auto_apply_shop_voucher = false, _0x14cad4;
                _0x14cad4.shop_vouchers = [];
                _0x59e2f9.gkJdr(typeof _0x14cad4.auto_apply_shop_voucher, "boolean") && (_0x14cad4.auto_apply_shop_voucher = true);
              }
            }
            return _0x14cad4;
          })(),
          _0x491fb5 = {
            'client_id': _0x10ff5f,
            'checkout_page_id': _0x502a28.checkout_page_id || '',
            'checkout_session_id': _0x9efbb3,
            'cart_type': _0x5ea4d3,
            'checkout_scope': 0x0,
            'timestamp': _0x5021e3,
            'loan_summary': _0x502a28.loan_summary,
            'checkout_price_data': _0x502a28.checkout_price_data,
            'terms_and_conditions': _0x502a28.terms_and_conditions,
            'order_update_info': _0x502a28.order_update_info,
            'dropshipping_info': _0x502a28.dropshipping_info,
            'promotion_data': _0x323e56,
            'selected_payment_channel_data': _0x165b2d,
            'shoporders': _0x502a28.shoporders,
            'shipping_orders': _0x502a28.shipping_orders,
            'shipping_order_groups': _0x502a28.shipping_order_groups || [],
            'display_meta_data': _0x502a28.display_meta_data,
            'fsv_selection_infos': _0x502a28.fsv_selection_infos || [],
            'buyer_info': _0x502a28.buyer_info,
            'client_event_info': _0x502a28.client_event_info,
            'captcha_id': _0x502a28.captcha_id || '',
            'buyer_txn_fee_info': _0x502a28.buyer_txn_fee_info,
            'disabled_checkout_info': _0x502a28.disabled_checkout_info,
            'can_checkout': true,
            'buyer_service_fee_info': _0x502a28.buyer_service_fee_info,
            'iof_info': _0x502a28.iof_info,
            'add_to_cart_info': _0x502a28.add_to_cart_info,
            'extra_data': _0x502a28.extra_data,
            'banners': _0x502a28.banners,
            'buy_one_more': _0x502a28.buy_one_more,
            'notifications': _0x502a28.notifications || {},
            'first_load_info': _0x502a28.first_load_info,
            'tms_trackers': _0x502a28.tms_trackers,
            '__raw': _0x502a28.__raw || {
              '_MDAP_DATA_ID_': Date.now().toString()
            },
            '_cft': _0x13ccd6,
            'captcha_version': 0x1,
            'device_info': {
              'device_sz_fingerprint': _0x385814.fingerprint
            }
          };
        try {
          const _0x413c6f = await _0x59e2f9.mOfQq(fetch, "https://shopee.vn/api/v4/checkout/place_order", {
              'headers': {
                'content-type': "application/json",
                'x-api-source': _0x59e2f9.CdqQb(_0x4cbd05),
                'x-csrftoken': _0x385814.csrf,
                'x-shopee-language': 'vi'
              },
              'body': JSON.stringify(_0x491fb5),
              'method': "POST",
              'mode': "cors",
              'credentials': "include"
            }),
            _0x3ffd42 = await _0x413c6f.json();
          if (!_0x3ffd42 || _0x59e2f9.ZwCLF(typeof _0x3ffd42, "object")) return {
            'error': null,
            '__placeOrderResponseReceived': true,
            '__placeOrderMalformedResponse': true
          };
          _0x3ffd42.__placeOrderResponseReceived = true;
          _0x59e2f9.ptRaS(_0x2d1992, _0x3ffd42, "checkout/place_order");
          if (_0x59e2f9.fOvPg(_0x3ffd42.error, 0) || _0x3ffd42.checkoutid && _0x3ffd42.orderids) {
            _0x1d9aeb.success("🎉 ĐẶT HÀNG THÀNH CÔNG! ORDER ID: " + (_0x3ffd42.orderids ? _0x3ffd42.orderids.join(',\x20') : "Unknown"));
            if (_0x3ffd42.checkoutid) _0x1d9aeb.info("Checkout ID: " + _0x3ffd42.checkoutid);
            await _0x59e2f9.XejXP(_0x989e7d, _0x3ffd42);
            _0x59e2f9.vxghW(_0x94481e, _0x3ffd42);
            _0x59e2f9.VLZLe(_0xb3b2de, "success", "Đặt hàng thành công!", "Order ID: " + (_0x3ffd42.orderids ? _0x3ffd42.orderids.join(',\x20') : "Unknown"), _0x3ffd42.checkoutid);
          }
          return _0x3ffd42;
        } catch (_0x3e3ded) {
          return _0x1d9aeb.error("[Place Order] Exception: " + _0x3e3ded.message), {
            'error': _0x3e3ded.message,
            '__placeOrderTransportError': true,
            '__placeOrderResponseReceived': false,
            '__placeOrderExceptionCode': _0x3e3ded.code || '',
            '__placeOrderCaptcha': _0x59e2f9.CHmFf(_0x3e3ded.message, "CAPTCHA_REQUIRED")
          };
        }
      },
      _0x4990a9 = async () => {
        try {
          const _0xe2bb0 = _0x59e2f9.TRQzx(_0x4d4c36);
          if (_0x5acbd4.onlyAddToCart) {
            await _0x59e2f9.clRzQ(_0x3972ea, _0xe2bb0);
            if (!_0x5acbd4.isRunning) return;
            _0x1d9aeb.success("Đã thêm giỏ thành công. Dừng theo chế độ hiện tại.");
            await _0x59e2f9.lBgkB(_0x3df333);
            _0x59e2f9.vAcTS(_0xb3b2de, "success", "Thêm giỏ thành công", "Đã thêm sản phẩm vào giỏ. Không thực hiện đặt hàng.");
            return;
          }
          if (_0x5acbd4.platformVoucherEnabled) {
            if (_0x59e2f9.Ndfbs(typeof window.preparePlatformVoucherForCheckout, "function")) throw new Error("Chưa khởi tạo xử lý Voucher Shopee. Vui lòng mở lại công cụ.");
            await window.preparePlatformVoucherForCheckout();
            if (!_0x5acbd4.isRunning) return;
          }
          if (_0x5acbd4.waitForPriceChange) {
            const _0x3df0d2 = await _0x59e2f9.QsCLv(_0x27ee32, _0xe2bb0);
            if (!_0x3df0d2 || !_0x5acbd4.isRunning) {
              _0x1d9aeb.info("Đã dừng chờ giá.");
              _0x59e2f9.ZqkAL(_0x4cfa5b);
              return;
            }
          }
          let _0x175a77 = null;
          if (_0x5acbd4.skipAddToCart) {} else _0x175a77 = await _0x59e2f9.KeAyZ(_0x3972ea, _0xe2bb0);
          if (!_0x5acbd4.isRunning) {
            _0x1d9aeb.info("Đã dừng trước khi checkout.");
            _0x59e2f9.cIYYj(_0x4cfa5b);
            return;
          }
          const _0x476165 = _0x5acbd4.platformVoucherFromSS6 && Array.isArray(_0x5acbd4.platformVoucherQueue) ? _0x5acbd4.platformVoucherQueue.filter(_0x302e42 => (_0x302e42?.["voucherCode"] || _0x302e42?.["voucher_code"]) && Number(_0x302e42?.["promotionid"] || _0x302e42?.["promotion_id"]) > 0) : [];
          if (_0x59e2f9.cgeOp(_0x476165.length, 0)) {
            const _0x2268ae = Math.max(1, _0x59e2f9.YKOAI(Number, _0x5acbd4.post_cart_retry_limit || 1));
            let _0xff2a4e = '';
            for (let _0x444511 = 1; _0x59e2f9.otlDx(_0x444511, _0x2268ae) && _0x5acbd4.isRunning; _0x444511++) {
              for (const _0x18ab2d of _0x476165) {
                if (!_0x5acbd4.isRunning) return;
                const _0x226ebe = window.applyResolvedPlatformVoucherForAutoOrder;
                if (_0x59e2f9.uZATL(typeof _0x226ebe, "function")) throw new Error("AutoOrder chưa khởi tạo hàm áp dụng voucher.");
                _0x59e2f9.enHkO(_0x226ebe, _0x18ab2d, {
                  'savedInWallet': true,
                  'log': false
                });
                const _0x33502a = _0x18ab2d.voucherCode || _0x18ab2d.voucher_code || '';
                _0x1d9aeb.info("Vòng " + _0x444511 + '/' + _0x2268ae + " - Voucher " + _0x33502a);
                let _0x2ee433 = null;
                try {
                  _0x2ee433 = await _0x59e2f9.zOOCU(_0x2b233c, _0xe2bb0, _0x175a77, _0x59e2f9.exyGf(_0x444511, 1));
                } catch (_0x77317a) {
                  const _0x3710c1 = _0x59e2f9.DogHc(_0x34e592, {
                    'stage': "checkout",
                    'error': _0x77317a
                  });
                  if (_0x59e2f9.gHgeE(_0x3710c1.action, "next_voucher")) {
                    _0xff2a4e = _0x3710c1.message;
                    _0x1d9aeb.error('[' + _0x33502a + ']\x20' + _0x3710c1.message);
                    if (_0x5acbd4.isRunning) await _0x59e2f9.tdcrz(_0x1f795e, _0x5acbd4.retry_delay);
                    continue;
                  }
                  if (!_0x3710c1.captcha && _0x5acbd4.isRunning) _0x1d9aeb.error('[' + _0x33502a + ']\x20' + _0x3710c1.message);
                  return;
                }
                if (!_0x2ee433 || _0x2ee433.error) {
                  const _0x3f57e4 = _0x59e2f9.apgaq(_0x34e592, {
                    'stage': "checkout",
                    'result': _0x2ee433
                  });
                  if (_0x59e2f9.ibPWZ(_0x3f57e4.action, "next_voucher")) {
                    _0xff2a4e = _0x3f57e4.message;
                    _0x1d9aeb.error('[' + _0x33502a + ']\x20' + _0x3f57e4.message);
                    if (_0x5acbd4.isRunning) await _0x59e2f9.AkOyh(_0x1f795e, _0x5acbd4.retry_delay);
                    continue;
                  }
                  if (!_0x3f57e4.captcha && _0x5acbd4.isRunning) _0x1d9aeb.error('[' + _0x33502a + ']\x20' + _0x3f57e4.message);
                  return;
                }
                const _0x5d2ecc = await _0x59e2f9.KqfEi(_0x5d7ac0, _0xe2bb0, _0x2ee433);
                if (_0x5d2ecc && (_0x59e2f9.XNyKD(_0x5d2ecc.error, 0) || _0x5d2ecc.checkoutid && _0x5d2ecc.orderids)) return;
                const _0x45dcc1 = _0x59e2f9.NghrK(_0x34e592, {
                  'stage': "place_order",
                  'result': _0x5d2ecc
                });
                if (_0x59e2f9.fcfON(_0x45dcc1.action, "next_voucher")) {
                  _0xff2a4e = _0x45dcc1.message;
                  _0x1d9aeb.error('[' + _0x33502a + ']\x20' + _0x45dcc1.message);
                  if (_0x5acbd4.isRunning) await _0x59e2f9.lNXov(_0x1f795e, _0x5acbd4.retry_delay);
                  continue;
                }
                if (_0x59e2f9.oaZKk(_0x45dcc1.action, "unknown")) {
                  _0x1d9aeb.error('[' + _0x33502a + ']\x20' + _0x45dcc1.message + " Dừng để tránh tạo đơn trùng.");
                  _0x59e2f9.zOOCU(_0xb3b2de, "warning", "Kết quả giao dịch chưa rõ", _0x45dcc1.message + " Hệ thống đã dừng để tránh tạo đơn trùng.");
                  return;
                }
                !_0x45dcc1.captcha && _0x5acbd4.isRunning && (_0x1d9aeb.error('[' + _0x33502a + ']\x20' + _0x45dcc1.message), _0x59e2f9.PcaoX(_0xb3b2de, "error", "Quy trình bị dừng", _0x45dcc1.message));
                return;
              }
            }
            _0x5acbd4.isRunning && (_0x1d9aeb.error("Đã hết " + _0x2268ae + " vòng thử cho " + _0x476165.length + " voucher."), _0x59e2f9.HYLGb(_0xb3b2de, "error", "Đặt hàng thất bại", _0xff2a4e || "Đã hết số vòng thử với toàn bộ voucher banner."));
            return;
          }
          let _0x1d1dec = 0,
            _0x33099c = "checkout",
            _0x17aa2e = null,
            _0xdc6598 = '',
            _0x4958a3 = _0x5acbd4.post_cart_retry_limit;
          if (_0x5acbd4.shopVoucherEnabled && _0x5acbd4.shopVoucherAutoBestOutsideList) {
            if (_0x59e2f9.FbmuM(_0x5acbd4.post_cart_retry_limit, 20)) {
              const _0x503d76 = _0x5acbd4.post_cart_retry_limit;
              _0x5acbd4.post_cart_retry_limit = 50;
              _0x4958a3 = 50;
              const _0x583e98 = document.getElementById("setting-post-cart-retries");
              if (_0x583e98) _0x583e98.value = '50';
              _0x1d9aeb.info("Auto: tự nâng Số lần thử đặt lại từ " + _0x503d76 + " lên 50 để tìm mã phù hợp.");
            }
            _0x17aa2e = await _0x59e2f9.fKCzP(_0x289410, _0xe2bb0, _0x175a77);
            if (!_0x17aa2e) {
              const _0x47d9b0 = "Không tìm thấy voucher mới ngoài list preload ban đầu.";
              _0x1d9aeb.error(_0x47d9b0);
              _0x59e2f9.wBAif(_0xb3b2de, "error", "Auto voucher thất bại", _0x47d9b0);
              return;
            }
            _0x33099c = "place_order";
            _0x1d1dec = 0;
            _0x4958a3 = 12;
            _0x1d9aeb.info("Đã tìm thấy mã mới ngoài list. Chuyển sang đặt hàng với tối đa 12 lần thử.");
          }
          while (_0x5acbd4.isRunning && _0x59e2f9.heKhD(_0x1d1dec, _0x4958a3)) {
            let _0x199eeb = '';
            if (_0x59e2f9.ZJwAa(_0x33099c, "checkout")) {
              _0x17aa2e = await _0x59e2f9.zOOCU(_0x2b233c, _0xe2bb0, _0x175a77, _0x1d1dec);
              if (_0x17aa2e && !_0x17aa2e.error) {
                _0x33099c = "place_order";
                continue;
              }
              _0x199eeb = _0x59e2f9.nXoWF(_0x3dac5a, _0x17aa2e, "Không thể lấy thông tin thanh toán. Vui lòng thử lại.");
            } else {
              const _0x441243 = await _0x59e2f9.Dlemf(_0x5d7ac0, _0xe2bb0, _0x17aa2e);
              if (_0x441243 && (_0x59e2f9.yltgY(_0x441243.error, 0) || _0x441243.checkoutid && _0x441243.orderids)) return;
              _0x199eeb = _0x59e2f9.VpWAz(_0x3dac5a, _0x441243, "Có lỗi xảy ra khi đặt hàng.");
              _0x33099c = "checkout";
              _0x17aa2e = null;
            }
            if (_0x59e2f9.VgqRx(_0x199eeb, _0xdc6598)) {
              const _0x2cd953 = _0x59e2f9.yanNx(_0x33099c, "checkout") ? "[Get Checkout] Thất bại" : "❌ Đặt hàng thất bại";
              _0x1d9aeb.error(_0x2cd953 + ':\x20' + _0x199eeb);
              _0xdc6598 = _0x199eeb;
            }
            _0x1d1dec++;
            if (_0x59e2f9.hgTGz(_0x1d1dec, _0x4958a3)) {
              _0x59e2f9.HMsVB(_0x33099c, "checkout") ? (_0x1d9aeb.error("Dừng quy trình do lỗi lấy thông tin thanh toán."), _0x59e2f9.WWDig(_0xb3b2de, "error", "Lỗi thanh toán", _0x199eeb)) : _0x59e2f9.BecAl(_0xb3b2de, "error", "Đặt hàng thất bại!", _0x199eeb || "Có lỗi xảy ra khi đặt hàng.");
              return;
            }
            _0x1d9aeb.info("Retry " + _0x1d1dec + '/' + _0x4958a3 + " tại bước " + (_0x59e2f9.Heqjk(_0x33099c, "checkout") ? "lấy checkout" : "đặt hàng") + "...");
            await _0x59e2f9.FVyJx(_0x1f795e, _0x5acbd4.retry_delay);
          }
          if (!_0x5acbd4.isRunning) {
            _0x1d9aeb.info("Đã dừng trước khi hoàn tất checkout/đặt hàng.");
            return;
          }
        } catch (_0xdce502) {
          _0x1d9aeb.error("QUY TRÌNH DỪNG LẠI: " + _0xdce502.message);
          _0x59e2f9.jCopk(_0xdce502.message, "Đã dừng bởi người dùng") && !_0xdce502.message.includes("Vui lòng xác minh captcha") && _0x59e2f9.GQfUt(_0xb3b2de, "error", "Quy trình bị dừng", _0xdce502.message);
        } finally {
          _0x59e2f9.ouIyU(_0x4cfa5b);
        }
      },
      _0x4cfa5b = () => {
        _0x5acbd4.isRunning = false;
        if (!_0x563a6d()) return;
        const _0x126d1b = document.getElementById("btn-start-autobuy"),
          _0xe6ad5c = document.getElementById("btn-stop-autobuy"),
          _0x1de89a = document.getElementById("btn-advanced");
        if (_0x126d1b) _0x126d1b.style.display = "block";
        if (_0xe6ad5c) _0xe6ad5c.style.display = "none";
        if (_0x1de89a) _0x1de89a.style.display = "block";
        const _0x714ffd = document.getElementById("mobile-btn-start"),
          _0x211320 = document.getElementById("mobile-btn-stop"),
          _0x5f4119 = document.getElementById("mobile-btn-advanced");
        if (_0x714ffd) _0x714ffd.style.display = "block";
        if (_0x211320) _0x211320.style.display = "none";
        if (_0x5f4119) _0x5f4119.style.display = "block";
      };
    window.openShopeeOrderUI = window.shopeeAutoBuyUI;
    console.log("[Đặt đơn tự động] Script đã được tải.");
    document.readyState === "complete" || _0x24378a === "full" && document.body ? window.shopeeAutoBuyUI() : window.addEventListener("load", window.shopeeAutoBuyUI, {
      'once': true
    });
  };
  window.initShopeeAutoOrderFull = async function () {
    _0x1ab171();
    _injectAutoOrderToastStyles();
    window.shopeeVoucherUnlocked = true;
    try {
      const _loginRes = await _0x3632a5();
      if (_loginRes.isLoggedIn) {
        _0x1fb475();
        await window.shopeeAutoOrder("full");
      } else {
        _0x3f3ca5();
      }
    } catch (_err) {
      console.error("[Shopee Auto-Order Full] Lỗi khởi tạo:", _err);
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.initShopeeAutoOrderFull);
  } else {
    window.initShopeeAutoOrderFull();
  }
})();
