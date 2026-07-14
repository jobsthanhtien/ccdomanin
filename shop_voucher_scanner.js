(function () {
  window.VOUCHER_SCRIPT_LOADED = true;


  "use strict";



  if (!location.hostname.includes("shopee.vn")) {
    alert("Vui lòng chạy script này trên trang web Shopee.vn!");
    return;
  }
  window.VOUCHER_SCRIPT_LOADED = true;



  const isMobileWebClient = () =>

    /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(navigator.userAgent);

  const getApiSourceHeaderValue = () => (isMobileWebClient() ? "rweb" : "pc");



  // Config mặc định ban đầu cho popup hỏi chế độ lưu (sẽ được ghi đè từ UI nâng cao)

  const DEFAULT_ENABLE_DUAL_SAVE_CONFIRM = 0;

  const SPAM_DELAY_MIN = 120;

  const SPAM_DELAY_MAX = 60000;



  // ===== Tìm voucher đa dạng với tính năng save ====

  window.executeMultiVoucherSearch = () => {

    let saveLogObserver = null;

    let observedSaveLogEl = null;



    const formatLineForPiP = (line) => {

      const raw = String(line || "");

      const trimmed = raw.trim();

      if (!trimmed) return "";



      const match = trimmed.match(

        /^(\d{1,2}:\d{2}:\d{2}):\s*(✅|❌)\s*([A-Z0-9_-]+)\s*-\s*(.*?)(?:\s*\[(\d+)\])?\s*$/,

      );

      if (!match) return trimmed;



      const [, time, icon, voucherCode, messageRaw, tryCountRaw] = match;

      const tryCount = tryCountRaw ? parseInt(tryCountRaw, 10) : 1;

      const percentMatch = messageRaw.match(/Còn lại:\s*(\d+)%/i);



      if (icon === "✅" && percentMatch) {

        return `✅ ${time}: ${voucherCode} - Còn lại: ${percentMatch[1]}%`;

      }

      return `${icon} ${time}: ${voucherCode} - lần ${Number.isFinite(tryCount) ? tryCount : 1}`;

    };



    // Helper để đồng bộ saveLog UI sang PIP

    const syncSaveLogToPiP = () => {

      const saveLog = document.getElementById("saveLog");

      if (saveLog && typeof window.setPiPLogs === "function") {

        // Lấy text thuần túy từ saveLog, tách theo dòng để truyền vào PIP

        const lines = saveLog.innerText

          .replace(/\r/g, "")

          .split("\n")

          .map(formatLineForPiP);

        window.pipDisableMask = true;

        window.setPiPLogs(lines);

      }

    };



    const observeSaveLogChanges = () => {

      const saveLog = document.getElementById("saveLog");

      if (!saveLog) {

        setTimeout(observeSaveLogChanges, 120);

        return;

      }

      if (observedSaveLogEl === saveLog && saveLogObserver) return;



      if (saveLogObserver) {

        saveLogObserver.disconnect();

      }



      observedSaveLogEl = saveLog;

      saveLogObserver = new MutationObserver(() => {

        syncSaveLogToPiP();

      });

      saveLogObserver.observe(saveLog, {

        childList: true,

        subtree: true,

        characterData: true,

      });



      syncSaveLogToPiP();

    };

    // Ẩn menu chính và xóa modal cũ

    const modal = document.getElementById("voucherToolModal");

    if (modal) modal.remove();



    document.querySelectorAll("style").forEach((styleTag) => {

      if (

        styleTag.innerText.includes("voucherToolModal") ||

        styleTag.innerText.includes("multiVoucherModal")

      )

        styleTag.remove();

    });



    function anm_multiVoucherChecker() {

      if (typeof window.clearPiPLogs === "function")

        window.clearPiPLogs("Lưu Voucher Multi");

      // Thêm Bootstrap CSS nếu chưa có

      if (!document.querySelector('link[href*="bootstrap"]')) {

        const bootstrapCSS = document.createElement("link");

        bootstrapCSS.rel = "stylesheet";

        bootstrapCSS.href =

          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";

        document.head.appendChild(bootstrapCSS);

      }



      // Thêm Bootstrap JS nếu chưa có

      if (!document.querySelector('script[src*="bootstrap"]')) {

        const bootstrapJS = document.createElement("script");

        bootstrapJS.src =

          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";

        document.head.appendChild(bootstrapJS);

      }



      // Thêm Font Awesome

      if (!document.querySelector('link[href*="font-awesome"]')) {

        const fontAwesome = document.createElement("link");

        fontAwesome.rel = "stylesheet";

        fontAwesome.href =

          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";

        document.head.appendChild(fontAwesome);

      }



      const customStyle = document.createElement("style");

      customStyle.id = "multi-voucher-style-shopee";

      customStyle.innerText = `

                                .multi-voucher-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(238, 77, 45, 0.1) 0%, rgba(255, 255, 255, 0.9) 100%); backdrop-filter: blur(10px); z-index: 9999; display: flex; justify-content: center; align-items: center; }

                                .multi-voucher-modal { position: relative; background: linear-gradient(135deg, #ffffff 0%, #fef7f5 100%); border-radius: 16px; width: 43%; max-width: 950px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(238, 77, 45, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1); border: 2px solid #fff; }

                                /* === HEADER SỬA ĐỔI === */

                                .multi-voucher-header {

                                    display: flex;

                                    justify-content: space-between;

                                    align-items: center;

                                    background: linear-gradient(135deg, #ee4d2d 0%, #ff6b35 100%);

                                    color: white;

                                    padding: 15px 55px 15px 20px; /* Padding: Top, Right (cho nút close), Bottom, Left */

                                    border-radius: 14px 14px 0 0;

                                    position: relative;

                                }

                                .multi-voucher-title-group { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }

                                .multi-voucher-header h3 {

                                    margin: 0;

                                    font-weight: 600;

                                    font-size: 20px;

                                    padding-left:3%;

                                    cursor: pointer;

                                    user-select: none;

                                    white-space: nowrap;

                                    line-height: 1.2;

                                }

                                .multi-voucher-desktop-title,

                                .multi-voucher-mobile-title { white-space: nowrap; }

                                .multi-voucher-header h3 .pip-text { color: #7c3aed; font-weight: 800; }

                                .multi-voucher-mobile-title { display: none; }

                                .voucher-type-toggle-container {

                                    display: flex;

                                    align-items: center;

                                    gap: 10px;

                                    padding-right: 2%;

                                    flex-shrink: 0;

                                }

                                .giftcode-header-checkbox {

                                    display: flex;

                                    align-items: center;

                                    gap: 6px;

                                    margin-left: 8px;

                                    padding: 4px 10px;

                                    border-left: 1px solid rgba(255,255,255,0.2);

                                    cursor: pointer;

                                    user-select: none;

                                    border-radius: 4px;

                                    transition: background 0.2s;

                                }

                                .giftcode-header-checkbox:hover {

                                    background: rgba(255, 255, 255, 0.1);

                                }

                                .giftcode-header-checkbox input {

                                    display: none;

                                }

                                .custom-checkbox-box {

                                    width: 18px;

                                    height: 18px;

                                    border: 2px solid white;

                                    border-radius: 4px;

                                    display: flex;

                                    align-items: center;

                                    justify-content: center;

                                    transition: all 0.2s;

                                    flex-shrink: 0;

                                }

                                .custom-checkbox-box i {

                                    font-size: 10px;

                                    color: white;

                                    display: none;

                                }

                                #giftcodeHeaderToggle:checked + .custom-checkbox-box {

                                    background: #4ade80;

                                    border-color: #4ade80;

                                }

                                #giftcodeHeaderToggle:checked + .custom-checkbox-box i {

                                    display: block;

                                }

                                .giftcode-header-checkbox .giftcode-text-wrapper {

                                    color: white;

                                    font-weight: 600;

                                    font-size: 14px;

                                    white-space: nowrap;

                                    transition: color 0.2s;

                                }

                                #giftcodeHeaderToggle:checked ~ .giftcode-text-wrapper {

                                    color: #4ade80 !important;

                                }

                                .multi-voucher-header .toggle-label {

                                    color: white;

                                    font-weight: 500;

                                }

                                .multi-voucher-close-btn {

                                    position: absolute;

                                    top: 50%;

                                    right: 15px;

                                    transform: translateY(-50%);

                                    background: none;

                                    border: none;

                                    font-size: 20px;

                                    color: rgba(255, 255, 255, 0.85);

                                    cursor: pointer;

                                    padding: 8px;

                                    border-radius: 50%;

                                    width: 36px;

                                    height: 36px;

                                    display: flex;

                                    align-items: center;

                                    justify-content: center;

                                    transition: all 0.3s ease;

                                }

                                .multi-voucher-close-btn:hover {

                                    background: rgba(255, 255, 255, 0.2);

                                    color: white;

                                    transform: translateY(-50%) scale(1.1);

                                }

                                /* === KẾT THÚC HEADER SỬA ĐỔI === */

                                .mode-settings-container { margin: 15px 20px; padding: 15px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 10px; border: 1px solid #cbd5e1; display: none; }

                                .mode-settings-row { display: flex; align-items: center; justify-content: space-between; gap: 15px; }

                                .mode-toggle-section { display: flex; align-items: center; gap: 10px; }

                                .normal-advanced-section,

                                .spam-advanced-section { display: none; align-items: center; gap: 8px; flex-shrink: 0; }

                                .normal-advanced-section.show,

                                .spam-advanced-section.show { display: flex; }

                                .mode-label-1,

                                .mode-label-2 { white-space: nowrap; line-height: 1; }

                                .normal-advanced-btn {

                                    border: 1px solid #ef4444;

                                    background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%);

                                    color: #b91c1c;

                                    border-radius: 8px;

                                    font-size: 13px;

                                    font-weight: 700;

                                    padding: 8px 12px;

                                    cursor: pointer;

                                    transition: all 0.2s ease;

                                    white-space: nowrap;

                                }

                                .normal-advanced-btn:hover {

                                    background: linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%);

                                    transform: translateY(-1px);

                                }

                                .spam-advanced-btn {

                                    border: 1px solid #ee4d2d;

                                    background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);

                                    color: #c2410c;

                                    border-radius: 8px;

                                    font-size: 13px;

                                    font-weight: 700;

                                    padding: 8px 12px;

                                    cursor: pointer;

                                    transition: all 0.2s ease;

                                    white-space: nowrap;

                                }

                                .spam-advanced-btn:hover {

                                    background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);

                                    transform: translateY(-1px);

                                }

                                .mode-toggle-switch { position: relative; display: inline-block; width: 60px; height: 34px; }

                                .mode-toggle-switch input { opacity: 0; width: 0; height: 0; }

                                .toggle-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 34px; }

                                .toggle-slider:before { position: absolute; content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }

                                input:checked + .toggle-slider { background-color: #ee4d2d; }

                                input:checked + .toggle-slider:before { transform: translateX(26px); }

                                .mode-label { font-weight: 600; color: #475569; font-size: 14px; }

                                .delay-label { font-weight: 600; color: #9a3412; font-size: 14px; white-space: nowrap; }

                                .delay-input { padding: 6px 10px; border: 1px solid #d97706; border-radius: 6px; font-size: 14px; width: 70px; text-align: center; }

                                .delay-input:focus { outline: none; border-color: #ea580c; box-shadow: 0 0 0 2px rgba(234, 88, 12, 0.1); }

                                .delay-hint { font-size: 12px; color: #b45309; white-space: nowrap; }

                                .spam-settings-overlay {

                                    position: fixed;

                                    inset: 0;

                                    background: rgba(15, 23, 42, 0.55);

                                    backdrop-filter: blur(3px);

                                    z-index: 10002;

                                    display: none;

                                    align-items: center;

                                    justify-content: center;

                                    padding: 16px;

                                }

                                .normal-settings-overlay {

                                    position: fixed;

                                    inset: 0;

                                    background: rgba(15, 23, 42, 0.55);

                                    backdrop-filter: blur(3px);

                                    z-index: 10002;

                                    display: none;

                                    align-items: center;

                                    justify-content: center;

                                    padding: 16px;

                                }

                                .normal-settings-modal {

                                    width: min(500px, 95vw);

                                    background: linear-gradient(135deg, #ffffff 0%, #fff1f2 100%);

                                    border: 1px solid #fecdd3;

                                    border-radius: 14px;

                                    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.2);

                                    overflow: hidden;

                                }

                                .normal-settings-head {

                                    background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);

                                    color: #fff;

                                    padding: 14px 16px;

                                    display: flex;

                                    align-items: center;

                                    justify-content: space-between;

                                }

                                .normal-settings-head h4 {

                                    margin: 0;

                                    font-size: 17px;

                                    font-weight: 700;

                                }

                                .normal-settings-close {

                                    border: none;

                                    background: rgba(255,255,255,0.2);

                                    color: #fff;

                                    width: 30px;

                                    height: 30px;

                                    border-radius: 8px;

                                    cursor: pointer;

                                }

                                .normal-settings-body { padding: 16px; }

                                .normal-settings-actions {

                                    display: flex;

                                    justify-content: flex-end;

                                    gap: 8px;

                                    margin-top: 6px;

                                }

                                .normal-settings-actions button {

                                    border: none;

                                    border-radius: 8px;

                                    padding: 9px 12px;

                                    font-weight: 700;

                                    font-size: 13px;

                                    cursor: pointer;

                                }

                                .normal-settings-cancel {

                                    background: #e5e7eb;

                                    color: #374151;

                                }

                                .normal-settings-save {

                                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);

                                    color: #fff;

                                }

                                .spam-settings-modal {

                                    width: min(560px, 95vw);

                                    background: linear-gradient(135deg, #ffffff 0%, #fff7f4 100%);

                                    border: 1px solid #fed7aa;

                                    border-radius: 14px;

                                    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.2);

                                    overflow: hidden;

                                }

                                .spam-settings-head {

                                    background: linear-gradient(135deg, #ee4d2d 0%, #ff6b35 100%);

                                    color: #fff;

                                    padding: 14px 16px;

                                    display: flex;

                                    align-items: center;

                                    justify-content: space-between;

                                }

                                .spam-settings-head h4 {

                                    margin: 0;

                                    font-size: 17px;

                                    font-weight: 700;

                                }

                                .spam-settings-close {

                                    border: none;

                                    background: rgba(255,255,255,0.2);

                                    color: #fff;

                                    width: 30px;

                                    height: 30px;

                                    border-radius: 8px;

                                    cursor: pointer;

                                }

                                .spam-settings-body { padding: 16px; }

                                .spam-setting-item {

                                    background: #fff;

                                    border: 1px solid #fed7aa;

                                    border-radius: 10px;

                                    padding: 12px;

                                    margin-bottom: 12px;

                                }

                                .spam-setting-label {

                                    display: block;

                                    font-size: 13px;

                                    color: #7c2d12;

                                    font-weight: 700;

                                    margin-bottom: 8px;

                                }

                                .spam-setting-row {

                                    display: flex;

                                    align-items: center;

                                    gap: 8px;

                                }

                                .spam-setting-input {

                                    width: 120px;

                                    border: 1px solid #fb923c;

                                    border-radius: 8px;

                                    padding: 8px 10px;

                                    font-size: 14px;

                                    color: #111827;

                                }

                                .spam-setting-check {

                                    display: inline-flex;

                                    align-items: center;

                                    gap: 8px;

                                    font-size: 14px;

                                    color: #374151;

                                    font-weight: 600;

                                }

                                .spam-schedule-row {

                                    display: none;

                                    margin-top: 10px;

                                    align-items: center;

                                    gap: 8px;

                                }

                                .spam-schedule-row.show { display: flex; }

                                .spam-attempt-row {

                                    display: none;

                                    margin-top: 10px;

                                    align-items: center;

                                    gap: 8px;

                                }

                                .spam-attempt-row.show { display: flex; }

                                .spam-settings-actions {

                                    display: flex;

                                    justify-content: flex-end;

                                    gap: 8px;

                                    margin-top: 6px;

                                }

                                .spam-settings-actions button {

                                    border: none;

                                    border-radius: 8px;

                                    padding: 9px 12px;

                                    font-weight: 700;

                                    font-size: 13px;

                                    cursor: pointer;

                                }

                                .spam-settings-cancel { background: #e5e7eb; color: #374151; }

                                .spam-settings-save { background: linear-gradient(135deg, #ee4d2d 0%, #ff6b35 100%); color: #fff; }

                                .save-all-btn.spam-mode { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }

                                .save-all-btn.spam-mode:hover { background: linear-gradient(135deg, #d97706 0%, #b45309 100%); }

                                .save-all-btn.individual-running { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; }

                                .save-all-btn.individual-running:hover { background: linear-gradient(135deg, #d97706 0%, #b45309 100%); }

                                .voucher-save-btn.spam-mode { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }

                                .voucher-save-btn.spam-mode:hover { background: linear-gradient(135deg, #d97706 0%, #b45309 100%); }

                                .voucher-save-btn.disabled-by-others { background: #9ca3af; cursor: not-allowed; color: white; }

                                .voucher-type-toggle-switch { position: relative; display: inline-block; width: 60px; height: 34px; }

                                .voucher-type-toggle-switch input { opacity: 0; width: 0; height: 0; }

                                .voucher-type-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 34px; }

                                .voucher-type-slider:before { position: absolute; content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }

                                input:checked + .voucher-type-slider { background-color: #ee4d2d; }

                                input:checked + .voucher-type-slider:before { transform: translateX(26px); }

                                .toggle-label { font-weight: 600; color: #475569; font-size: 14px; }

                                .shop-voucher-input { transition: all 0.3s ease; }

                                .shop-voucher-input:focus { outline: none; border-color: #ee4d2d; box-shadow: 0 0 0 3px rgba(238, 77, 45, 0.1); }

                                .shop-voucher-input.error { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1); }

                                .shop-voucher-process-btn:hover { background: linear-gradient(135deg, #d63916 0%, #e55a2b 100%); transform: translateY(-1px); }

                                .multi-voucher-input-container { position: relative; margin: 25px 20px 20px 20px; }

                                .multi-voucher-input-field { width: 100%; padding: 21px 55px 18px 50px; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.5; resize: vertical; transition: all 0.3s ease; background: #fafafa; min-height: 120px; }

                                .multi-voucher-input-field:focus { outline: none; border-color: #ee4d2d; box-shadow: 0 0 0 4px rgba(238, 77, 45, 0.1); background: white; }

                                .multi-voucher-search-icon { position: absolute; left: 18px; top: 22px; color: #ee4d2d; font-size: 18px; }

                                .multi-voucher-clear-btn { position: absolute; top: 18px; right: 18px; background: none; border: none; color: #dc2626; font-size: 16px; cursor: pointer; padding: 8px 10px; border-radius: 8px; transition: all 0.3s ease; }

                                .multi-voucher-clear-btn:hover { background: #fee2e2; color: #dc2626; }

                                .multi-voucher-paste-bar { display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #ee4d2d 0%, #ff6b35 100%); color: white; border-radius: 10px; padding: 12px 20px; margin-top: 10px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.3s ease; border: none; width: 100%; }

                                .multi-voucher-paste-bar:hover { background: linear-gradient(135deg, #d63916 0%, #e55a2b 100%); transform: translateY(-1px); box-shadow: 0 4px 15px rgba(238, 77, 45, 0.3); }

                                .multi-voucher-message { padding: 15px 18px; border-radius: 10px; margin: 0 20px 15px 20px; font-weight: 500; display: flex; align-items: center; gap: 10px; }

                                .multi-voucher-message.error { background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); color: #dc2626; border: 1px solid #fecaca; }

                                .multi-voucher-message.success { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); color: #16a34a; border: 1px solid #bbf7d0; }

                                .multi-voucher-message.warning { background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); color: #d97706; border: 1px solid #fed7aa; }

                                .multi-voucher-message.info { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); color: #2563eb; border: 1px solid #93c5fd; }

                                .multi-voucher-loading { text-align: center; padding: 40px 20px; }

                                .multi-voucher-spinner { border: 4px solid #fee2e2; border-top: 4px solid #ee4d2d; border-radius: 50%; width: 45px; height: 45px; animation: spin 1s linear infinite; margin: 0 auto 20px; }

                                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

                                .multi-voucher-item { border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px; margin: 0 20px 12px 20px; background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%); transition: all 0.3s ease; position: relative; overflow: hidden; display: flex; gap: 15px; align-items: flex-start; min-height: 120px; }

                                .multi-voucher-item:before { content: ""; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(135deg, #ee4d2d 0%, #ff6b35 100%); opacity: 0; transition: opacity 0.3s ease; }

                                .multi-voucher-item:hover { box-shadow: 0 8px 25px rgba(238, 77, 45, 0.1); transform: translateY(-2px); border-color: #ee4d2d; }

                                .multi-voucher-item:hover:before { opacity: 1; }

                                .voucher-icon-container { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 8px; margin-right: 10px; margin-left: 10px; width: 95px; min-height: 100px; justify-content: flex-start; }

                                .voucher-icon { width: 70px; height: 70px; border-radius: 8px; object-fit: cover; border: 2px solid #e5e7eb; flex-shrink: 0; }

                                .voucher-icon-text { font-size: 11px; color: #6b7280; text-align: center; max-width: 100px; word-wrap: break-word; font-weight: 600; }

                                .voucher-content { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: space-between; min-height: 100px; }

                                .voucher-code-terms { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; min-height: 40px; }

                                .multi-voucher-code { font-weight: 700; font-size: 16px; color: #ee4d2d; font-family: 'Courier New', monospace; letter-spacing: 1px; cursor: pointer; transition: all 0.3s ease; flex-shrink: 0; }

                                .multi-voucher-code:hover { text-decoration: underline; color: #1d4ed8 !important; }

                                .multi-voucher-terms { color: #374151; font-size: 14px; line-height: 1.4; flex: 1; }

                                .voucher-distributed-count { font-size: 11px; color: #6b7280; background: #f3f4f6; padding: 2px 6px; border-radius: 4px; margin-left: 8px; flex-shrink: 0; }

                                .voucher-addition-info { background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%); border: 1px solid #fdba74; border-radius: 6px; padding: 8px 10px; margin: 8px 0; font-size: 12px; color: #9a3412; white-space: pre-line; }

                                .voucher-usage-info { font-size: 12px; color: #6b7280; margin: 5px 0; }

                                .voucher-time-info { font-size: 12px; color: #059669; margin: 3px 0; font-weight: 500; }

                                .voucher-buttons-container { flex-shrink: 0; display: flex; flex-direction: column; gap: 8px; align-items: center; justify-content: flex-start; width: 120px; min-height: 100px; }

                                .voucher-buttons { display: flex; flex-direction: column; gap: 8px; min-width: 120px; }

                                .voucher-use-btn { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; transition: all 0.3s ease; font-weight: 500; text-align: center; white-space: nowrap; }

                                .voucher-use-btn:hover { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); transform: translateY(-1px); }

                                .voucher-save-btn { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; transition: all 0.3s ease; font-weight: 500; text-align: center; white-space: nowrap; }

                                .voucher-save-btn:hover { background: linear-gradient(135deg, #059669 0%, #047857 100%); transform: translateY(-1px); }

                                .voucher-save-btn:disabled { background: #9ca3af; cursor: not-allowed; transform: none; }

                                .voucher-link-btn-mobile { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; transition: all 0.3s ease; font-weight: 500; text-align: center; white-space: nowrap; display: none; }

                                .voucher-link-btn-mobile:hover { background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); transform: translateY(-1px); }

                                .save-log { max-height: 250px; overflow-y: auto; background: #fefefe; border: 1px solid #ddd; border-radius: 8px; padding: 12px; margin: 0 20px 15px 20px; font-size: 13px; font-family: 'Times New Roman', Times, serif; color: #333; white-space: pre-wrap; word-break: break-word; box-shadow: 0 2px 6px rgba(0,0,0,0.05); display: none; }

                                .save-log a { color: #1d4ed8; text-decoration: underline; }

                                .save-log span { display: block; margin-bottom: 6px; }

                                .save-log strong { color: #059669; }

                                .save-all-container { margin: 0 20px 20px 20px; text-align: center; }

                                .save-all-btn { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; width: 100%; margin-bottom: 10px; }

                                .save-all-btn:hover { background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%); transform: translateY(-1px); }

                                .save-all-btn:disabled { background: #9ca3af; cursor: not-allowed; transform: none; }

                                .stop-save-btn { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: none; width: 100%; }

                                .stop-save-btn:hover { background: linear-gradient(135deg, #d97706 0%, #b45309 100%); transform: translateY(-1px); }

                                .save-progress { margin: 10px 20px; padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; display: none; }

                                .save-progress-bar { width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin: 10px 0; }

                                .save-progress-fill { height: 100%; background: linear-gradient(135deg, #10b981 0%, #059669 100%); transition: width 0.3s ease; width: 0%; }

                                .copy-notification { position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 12px 20px; border-radius: 8px; font-weight: 500; z-index: 10000; animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); }

                                @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

                                @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }

                                .multi-voucher-footer { padding: 20px; text-align: center; color: #6b7280; font-size: 13px; border-top: 1px solid #e5e7eb; background: #fafafa; border-radius: 0 0 14px 14px; }

                                @media (max-width: 1299px) {

                                    .mode-settings-container { margin: 10px 15px; padding: 12px; border-radius: 8px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); }

                                .mode-settings-row { flex-direction: row !important; align-items: center !important; justify-content: space-between !important; gap: 10px !important; }

                                .mode-toggle-section { justify-content: flex-start !important; gap: 8px !important; flex: 0 0 auto; min-width: auto; }

                                    .mode-toggle-section .mode-label-1,

                                    .mode-toggle-section .mode-label-2 { display: inline !important; font-size: 14px !important; white-space: nowrap; }

                                    .mode-toggle-section .mode-label-1 { display: none !important; }

                                    .mode-toggle-section .mode-label-2 { font-size: 0 !important; }

                                    .mode-toggle-section .mode-label-2::after { content: "Spam"; font-size: 14px; }

                                    .mode-toggle-switch { width: 50px !important; height: 28px !important; }

                                    .toggle-slider:before { height: 22px !important; width: 22px !important; left: 3px !important; bottom: 3px !important; }

                                    input:checked + .toggle-slider:before { transform: translateX(22px) !important; }

                                .normal-advanced-section,

                                .spam-advanced-section { justify-content: flex-end !important; gap: 5px !important; flex-wrap: nowrap !important; flex: 0 0 auto; min-width: 80px; }

                                .normal-advanced-btn,

                                .spam-advanced-btn { font-size: 12px !important; padding: 6px 8px !important; }

                                    .multi-voucher-item { flex-direction: column !important; gap: 10px !important; padding: 12px !important; margin: 0 15px 10px 15px !important; align-items: flex-start !important; min-height: auto !important; }

                                    .multi-voucher-modal { margin-top: 10px; margin-bottom: 10px; top: 0%; width: 90%; }

                                    .voucher-icon-container { display: none !important; }

                                    .voucher-content { width: 100% !important; min-height: auto !important; }

                                    .voucher-code-terms { flex-direction: column !important; align-items: flex-start !important; gap: 3px !important; margin-bottom: 6px !important; min-height: auto !important; }

                                    .voucher-buttons-container { width: 100% !important; margin-top: 8px !important; flex-direction: row !important; justify-content: flex-start !important; min-height: auto !important; }

                                    .voucher-buttons { flex-direction: row !important; gap: 6px !important; width: 100% !important; }

                                    .voucher-use-btn, .voucher-save-btn { flex: 1 !important; font-size: 13px !important; padding: 8px !important; }

                                    .voucher-addition-info { margin: 4px 0 !important; font-size: 12px !important; padding: 6px 8px !important; }

                                    .voucher-usage-info, .voucher-time-info { font-size: 12px !important; margin: 3px 0 !important; }

                                    .multi-voucher-code { font-size: 20px !important; font-weight: 600 !important; }

                                    .multi-voucher-terms { font-size: 12px !important; line-height: 1.3 !important; }

                                    .multi-voucher-title-group { gap: 0 !important; }

                                    .multi-voucher-desktop-title { display: inline !important; }

                                    .multi-voucher-mobile-title { display: none !important; }

                                    .multi-voucher-header h3 { font-size: 20px !important; padding-left: 0 !important; }

                                    .multi-voucher-input-container { margin: 15px 15px 15px 15px !important; }

                                    .multi-voucher-input-field { padding: 15px 45px 15px 40px !important; font-size: 13px !important; min-height: 100px; }

                                    .multi-voucher-search-icon { left: 15px !important; top: 18px !important; font-size: 16px !important; }

                                    .multi-voucher-clear-btn { top: 15px !important; right: 15px !important; font-size: 14px !important; padding: 6px 8px !important; }

                                    .toggle-label.left { content: "Mã pi"; }

                                    .toggle-label.right { content: "Mã shop"; }

                                    .shop-voucher-inputs { display: flex; flex-direction: column; gap: 10px; }

                                    .voucher-link-btn-mobile { display: block !important; }

                                    .voucher-use-btn,

                                    .voucher-save-btn,

                                    .voucher-link-btn-mobile {

                                        flex: 1 1 0; /* Cho phép các nút co lại và giãn ra linh hoạt */

                                        font-size: 10px !important; /* Thu nhỏ kích thước chữ */

                                        padding: 8px 5px !important; /* Giảm padding ngang */

                                        white-space: nowrap; /* Ngăn chữ xuống dòng bên trong nút */

                                        min-width: 0; /* Cho phép nút co nhỏ hơn cả nội dung nếu cần */

                                    }

                                    

                                    .multi-voucher-modal .actions-container{

                                      display:flex !important;

                                      align-items:stretch !important;

                                      gap:6px !important;                 /* thu khoảng cách */

                                      margin:0 20px 10px 20px !important;

                                    }



                                    .multi-voucher-modal .actions-container > *{ 

                                      flex:1 1 0 !important; 

                                      min-width:0 !important;             /* tránh tràn gây xuống dòng */

                                    }



                                    /* ép kích cỡ các nút nhỏ lại, override inline bằng !important */

                                    #pasteDataBtn,

                                    #saveAllBtn,

                                    #copyDataBtn,

                                    #stopSaveBtn{

                                      padding:8px 0px !important;

                                      font-size:10px !important;

                                      border-radius:6px !important;

                                      line-height:1.2 !important;

                                      white-space:nowrap !important;

                                    }



                                    /* wrapper giữa có position:relative để chồng nút Stop, vẫn chia đều */

                                    .multi-voucher-modal .actions-container > div[style*="position: relative"]{

                                      flex:1 1 0 !important;

                                    }

                                }

                                @media (min-width: 1300px) {

                                    .multi-voucher-item { flex-direction: row !important; align-items: flex-start !important; gap: 15px !important; padding: 18px !important; min-height: 120px !important; min-height: 80px; }

                                    .voucher-icon-container { display: flex !important; flex-direction: column !important; align-items: center !important; gap: 7px !important; flex-shrink: 0 !important; width: 95px !important; min-height: 100px !important; justify-content: flex-start !important; }

                                    .voucher-icon { width: 70px !important; height: 70px !important; border-radius: 8px !important; object-fit: cover !important; border: 2px solid #e5e7eb !important; }

                                    .voucher-icon-text { display: block !important; font-size: 10px !important; color: #6b7280 !important; text-align: center !important; max-width: 70px !important; word-wrap: break-word !important; font-weight: 600 !important; }

                                    .voucher-content { flex: 1 !important; min-width: 0 !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; min-height: 100px !important; }

                                    .voucher-code-terms { display: flex !important; align-items: flex-start !important; gap: 8px !important; flex-wrap: wrap !important; min-height: 20px; margin-bottom: 0px !important; }

                                    .voucher-buttons-container { flex-shrink: 0 !important; display: flex !important; flex-direction: column !important; gap: 8px !important; align-items: center !important; justify-content: flex-start !important; width: 120px !important; min-height: 100px !important; }

                                    .voucher-buttons { display: flex !important; flex-direction: column !important; gap: 8px !important; min-width: 120px !important; }

                                    .voucher-use-btn, .voucher-save-btn { font-size: 10px !important; padding: 9px 1px !important; white-space: nowrap !important; }

                                    .voucher-link-btn-mobile { display: none !important; }

                                }

                                /* Dual Save Confirm Modal Styles */

                                .dual-save-confirm-overlay {

                                    position: fixed;

                                    top: 0;

                                    left: 0;

                                    width: 100%;

                                    height: 100%;

                                    background: rgba(0, 0, 0, 0.6);

                                    backdrop-filter: blur(4px);

                                    z-index: 10001;

                                    display: flex;

                                    justify-content: center;

                                    align-items: center;

                                    animation: fadeIn 0.2s ease;

                                }



                                .dual-save-confirm-modal {

                                    background: linear-gradient(135deg, #ffffff 0%, #fef7f5 100%);

                                    border-radius: 16px;

                                    width: 90%;

                                    max-width: 480px;

                                    box-shadow: 0 20px 60px rgba(238, 77, 45, 0.2), 0 8px 25px rgba(0, 0, 0, 0.15);

                                    border: 2px solid #fff;

                                    overflow: hidden;

                                    animation: slideUp 0.3s ease;

                                }



                                .dual-save-confirm-header {

                                    display: flex;

                                    align-items: center;

                                    background: linear-gradient(135deg, #ee4d2d 0%, #ff6b35 100%);

                                    color: white;

                                    padding: 18px 24px;

                                    font-weight: 600;

                                }



                                .dual-save-confirm-header i {

                                    font-size: 24px;

                                }



                                .dual-save-confirm-header h4 {

                                    margin: 0;

                                    font-size: 18px;

                                    font-weight: 600;

                                }



                                .dual-save-confirm-body {

                                    padding: 24px;

                                    background: white;

                                }



                                .confirm-message {

                                    font-size: 15px;

                                    color: #374151;

                                    margin: 0 0 12px 0;

                                    line-height: 1.6;

                                    display: flex;

                                    align-items: flex-start;

                                }



                                .confirm-message strong {

                                    color: #ee4d2d;

                                    font-weight: 700;

                                }



                                .confirm-note {

                                    font-size: 13px;

                                    color: #6b7280;

                                    margin: 0;

                                    padding: 10px 12px;

                                    background: #fffbeb;

                                    border-left: 3px solid #f59e0b;

                                    border-radius: 6px;

                                    display: flex;

                                    align-items: center;

                                }



                                .dual-save-confirm-footer {

                                    display: flex;

                                    gap: 12px;

                                    padding: 16px 24px;

                                    background: #f9fafb;

                                    border-top: 1px solid #e5e7eb;

                                }



                                .dual-save-btn-cancel,

                                .dual-save-btn-confirm {

                                    flex: 1;

                                    padding: 12px 20px;

                                    border: none;

                                    border-radius: 8px;

                                    font-size: 14px;

                                    font-weight: 600;

                                    cursor: pointer;

                                    transition: all 0.3s ease;

                                    display: flex;

                                    align-items: center;

                                    justify-content: center;

                                    white-space: nowrap;

                                }



                                .dual-save-btn-cancel {

                                    background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);

                                    color: white;

                                }



                                .dual-save-btn-cancel:hover {

                                    background: linear-gradient(135deg, #4b5563 0%, #374151 100%);

                                    transform: translateY(-1px);

                                    box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);

                                }



                                .dual-save-btn-confirm {

                                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);

                                    color: white;

                                }



                                .dual-save-btn-confirm:hover {

                                    background: linear-gradient(135deg, #059669 0%, #047857 100%);

                                    transform: translateY(-1px);

                                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);

                                }



                                @keyframes fadeIn {

                                    from { opacity: 0; }

                                    to { opacity: 1; }

                                }



                                @keyframes slideUp {

                                    from {

                                        opacity: 0;

                                        transform: translateY(20px);

                                    }

                                    to {

                                        opacity: 1;

                                        transform: translateY(0);

                                    }

                                }



                                /* Mobile responsive */

                                @media (max-width: 768px) {

                                    .multi-voucher-desktop-title { display: none !important; }

                                    .multi-voucher-mobile-title { display: inline !important; }

                                    .multi-voucher-header { padding: 12px 45px 12px 10px !important; }

                                    .multi-voucher-header h3 { font-size: 17px !important; padding-left: 5px !important; }

                                    .voucher-type-toggle-container { gap: 5px !important; padding-right: 0 !important; }

                                    .toggle-label.left { display: none !important; }

                                    .toggle-label.right { display: inline-block !important; font-size: 12px !important; color: white !important; }

                                    .giftcode-header-checkbox { margin-left: 5px !important; padding: 3px 6px !important; border-left: none !important; }

                                    .desktop-giftcode-text { display: none !important; }

                                    .mobile-giftcode-text { display: inline !important; }

                                    .voucher-type-toggle-switch { width: 44px !important; height: 24px !important; }

                                    .voucher-type-slider:before { height: 18px !important; width: 18px !important; left: 3px !important; bottom: 3px !important; }

                                    input:checked + .voucher-type-slider:before { transform: translateX(20px) !important; }

                                    .dual-save-confirm-modal {

                                        width: 95%;

                                        max-width: 95%;

                                    }

                                    

                                    .dual-save-confirm-header {

                                        padding: 16px 20px;

                                    }

                                    

                                    .dual-save-confirm-header h4 {

                                        font-size: 16px;

                                    }

                                    

                                    .dual-save-confirm-body {

                                        padding: 20px;

                                    }

                                    

                                    .confirm-message {

                                        font-size: 14px;

                                    }

                                    

                                    .dual-save-confirm-footer {

                                        flex-direction: column;

                                        gap: 10px;

                                    }

                                    

                                    .dual-save-btn-cancel,

                                    .dual-save-btn-confirm {

                                        width: 100%;

                                    }

                                }

                                /* === DUAL SAVE CONFIRM MODAL - HOÀN CHỈNH === */

                                .dual-save-confirm-overlay {

                                    position: fixed;

                                    top: 0;

                                    left: 0;

                                    width: 100%;

                                    height: 100%;

                                    background: rgba(0, 0, 0, 0.6);

                                    backdrop-filter: blur(4px);

                                    z-index: 10001;

                                    display: flex;

                                    justify-content: center;

                                    align-items: center;

                                    animation: fadeIn 0.2s ease;

                                }



                                .dual-save-confirm-modal {

                                    background: linear-gradient(135deg, #ffffff 0%, #fef7f5 100%);

                                    border-radius: 16px;

                                    width: 90%;

                                    max-width: 500px;

                                    box-shadow: 0 20px 60px rgba(238, 77, 45, 0.2), 0 8px 25px rgba(0, 0, 0, 0.15);

                                    border: 2px solid #fff;

                                    overflow: hidden;

                                    animation: slideUp 0.3s ease;

                                }



                                .dual-save-confirm-header {

                                    display: flex;

                                    align-items: center;

                                    gap: 10px;

                                    background: linear-gradient(135deg, #ee4d2d 0%, #ff6b35 100%);

                                    color: white;

                                    padding: 16px 24px;

                                }



                                .dual-save-confirm-header i {

                                    font-size: 22px;

                                    flex-shrink: 0;

                                }



                                .dual-save-confirm-header h4 {

                                    margin: 0;

                                    font-size: 17px;

                                    font-weight: 600;

                                }



                                .dual-save-confirm-body {

                                    padding: 24px;

                                    background: white;

                                }



                                .confirm-message {

                                    font-size: 15px;

                                    color: #374151;

                                    margin: 0 0 12px 0;

                                    line-height: 1.6;

                                    font-weight: normal;

                                }



                                .confirm-message i {

                                    margin-right: 8px;

                                    margin-top: 6px;

                                    flex-shrink: 0;

                                    font-size: 16px;

                                }



                                .confirm-note {

                                    font-size: 13px;

                                    color: #6b7280;

                                    margin: 0;

                                    padding: 10px 12px;

                                    background: #fffbeb;

                                    border-left: 3px solid #f59e0b;

                                    border-radius: 6px;

                                    display: flex;

                                    align-items: center;

                                    gap: 6px;

                                }



                                .confirm-note i {

                                    flex-shrink: 0;

                                }



                                .dual-save-confirm-footer {

                                    display: flex;

                                    gap: 12px;

                                    padding: 16px 24px;

                                    background: #f9fafb;

                                    border-top: 1px solid #e5e7eb;

                                    flex-direction: row !important;

                                }



                                .dual-save-btn-cancel,

                                .dual-save-btn-confirm {

                                    flex: 1;

                                    padding: 12px 20px;

                                    border: none;

                                    border-radius: 8px;

                                    font-size: 14px;

                                    font-weight: 600;

                                    cursor: pointer;

                                    transition: all 0.3s ease;

                                    display: flex;

                                    align-items: center;

                                    justify-content: center;

                                    gap: 6px;

                                    white-space: nowrap;

                                }



                                .dual-save-btn-cancel i,

                                .dual-save-btn-confirm i {

                                    font-size: 14px;

                                }



                                .dual-save-btn-cancel {

                                    background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);

                                    color: white;

                                }



                                .dual-save-btn-cancel:hover {

                                    background: linear-gradient(135deg, #4b5563 0%, #374151 100%);

                                    transform: translateY(-1px);

                                    box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);

                                }



                                .dual-save-btn-confirm {

                                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);

                                    color: white;

                                }



                                .dual-save-btn-confirm:hover {

                                    background: linear-gradient(135deg, #059669 0%, #047857 100%);

                                    transform: translateY(-1px);

                                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);

                                }



                                /* Mobile responsive - VẪN GIỮ NGANG */

                                @media (max-width: 768px) {

                                    .dual-save-confirm-modal {

                                        width: 95%;

                                        max-width: 95%;

                                        margin: 0 10px;

                                    }

                                    

                                    .dual-save-confirm-header {

                                        padding: 14px 18px;

                                    }

                                    

                                    .dual-save-confirm-header i {

                                        font-size: 20px;

                                    }

                                    

                                    .dual-save-confirm-header h4 {

                                        font-size: 15px;

                                    }

                                    

                                    .dual-save-confirm-body {

                                        padding: 18px;

                                    }

                                    

                                    .confirm-message {

                                        font-size: 13px;

                                        line-height: 1.5;

                                    }

                                    

                                    .confirm-note {

                                        font-size: 12px;

                                        padding: 8px 10px;

                                    }

                                    

                                    .dual-save-confirm-footer {

                                        flex-direction: row !important;

                                        gap: 8px;

                                        padding: 14px 18px;

                                    }

                                    

                                    .dual-save-btn-cancel,

                                    .dual-save-btn-confirm {

                                        padding: 10px 12px;

                                        font-size: 13px;

                                    }

                                }





      `;



      setTimeout(observeSaveLogChanges, 0);



      document.head.appendChild(customStyle);

      // Thêm vào cuối phần popupHTML, ngay trước </div> cuối cùng của multi-voucher-modal

      const confirmModalHTML = `

                <!-- Dual Save Confirm Modal -->

                <div class="dual-save-confirm-overlay" id="dualSaveConfirmOverlay" style="display: none;">

                    <div class="dual-save-confirm-modal">

                        <div class="dual-save-confirm-header">

                            <i class="fas fa-question-circle"></i>

                            <h4>Xác nhận chế độ lưu</h4>

                        </div>

                        <div class="dual-save-confirm-body">

                            <p class="confirm-message">

                                <i class="fas fa-info-circle" style="color: #3b82f6;"></i>

                                Bạn có muốn lưu song song cả nhập tay & bookmark cùng lúc không?

                            </p>

                            <p class="confirm-note">

                                <i class="fas fa-lightbulb" style="color: #f59e0b;"></i>

                                <small>Chỉ áp dụng các mã có thể nhập tay được</small>

                            </p>

                        </div>

                        <div class="dual-save-confirm-footer">

                            <button class="dual-save-btn-cancel" onclick="closeDualSaveConfirm(false)">

                                <i class="fas fa-times"></i>Không

                            </button>

                            <button class="dual-save-btn-confirm" onclick="closeDualSaveConfirm(true)">

                                <i class="fas fa-check"></i>Có, lưu song song

                            </button>

                        </div>

                    </div>

                </div>

            `;



      // Biến global để lưu trạng thái callback

      window.dualSaveConfirmCallback = null;



      // Hiển thị modal confirm với Promise

      function showDualSaveConfirm() {

        return new Promise((resolve) => {

          const overlay = document.getElementById("dualSaveConfirmOverlay");

          if (overlay) {

            overlay.style.display = "flex";



            // Lưu callback vào window

            window.dualSaveConfirmCallback = resolve;



            // Prevent body scroll

            document.body.style.overflow = "hidden";

          }

        });

      }



      // Đóng modal và trả về kết quả

      function closeDualSaveConfirm(result) {

        const overlay = document.getElementById("dualSaveConfirmOverlay");

        if (overlay) {

          overlay.style.display = "none";



          // Restore body scroll

          document.body.style.overflow = "";



          // Gọi callback với kết quả

          if (window.dualSaveConfirmCallback) {

            window.dualSaveConfirmCallback(result);

            window.dualSaveConfirmCallback = null;

          }

        }

      }



      // Gán vào window để gọi từ HTML

      window.showDualSaveConfirm = showDualSaveConfirm;

      window.closeDualSaveConfirm = closeDualSaveConfirm;

      const popupHTML = `

                                <div class="multi-voucher-overlay" id="multiVoucherOverlay">

                                    <div class="multi-voucher-modal">

                                        <div class="multi-voucher-header">

                                            <div class="multi-voucher-title-group">

                                                <h3 onclick="typeof showPiPModeMenu === 'function' ? showPiPModeMenu('Multi Voucher Search') : alert('Không tìm thấy PiP mode')">

                                                    <span class="multi-voucher-desktop-title">🔍 Kiểm tra voucher - <span class="pip-text">PIP</span></span>

                                                    <span class="multi-voucher-mobile-title">🔍 <span class="pip-text">PIP</span></span>

                                                </h3>

                                            </div>

                                            <div class="voucher-type-toggle-container">

                                                <span class="toggle-label left">Mã pi</span>

                                                <label class="voucher-type-toggle-switch">

                                                    <input type="checkbox" id="voucherTypeToggle" onchange="toggleVoucherType()">

                                                    <span class="voucher-type-slider"></span>

                                                </label>

                                                <span class="toggle-label right">Mã shop</span>

                                                <label class="giftcode-header-checkbox" for="giftcodeHeaderToggle">

                                                    <input type="checkbox" id="giftcodeHeaderToggle" onchange="toggleGiftcodeHeader()">

                                                    <div class="custom-checkbox-box">

                                                        <i class="fas fa-check"></i>

                                                    </div>

                                                    <span class="giftcode-text-wrapper">

                                                        <span class="desktop-giftcode-text">Giftcode</span>

                                                        <span class="mobile-giftcode-text" style="display: none;">GC</span>

                                                    </span>

                                                </label>

                                            </div>

                                            <button class="multi-voucher-close-btn" onclick="closeMultiVoucherChecker()"><i class="fas fa-times"></i></button>

                                        </div>

                                        <!-- Mode Settings Container - Compact Design -->

                                        <div class="mode-settings-container" id="modeSettingsContainer">

                                            <div class="mode-settings-row">

                                                <div class="mode-toggle-section">

                                                    <span class="mode-label-1">Chế độ thường</span>

                                                    <label class="mode-toggle-switch">

                                                        <input type="checkbox" id="spamModeToggle" onchange="toggleSpamMode()">

                                                        <span class="toggle-slider"></span>

                                                    </label>

                                                    <span class="mode-label-2">Chế độ Spam</span>

                                                </div>

                                                <div class="normal-advanced-section" id="normalAdvancedSection">

                                                    <button type="button" class="normal-advanced-btn" onclick="openNormalSettingsModal()">

                                                        <i class="fas fa-sliders-h me-1"></i>Cài đặt nâng cao

                                                    </button>

                                                </div>

                                                <div class="spam-advanced-section" id="spamAdvancedSection">

                                                    <button type="button" class="spam-advanced-btn" onclick="openSpamSettingsModal()">

                                                        <i class="fas fa-sliders-h me-1"></i>Cài đặt nâng cao

                                                    </button>

                                                    <input type="hidden" id="globalSpamDelay" value="500">

                                                </div>

                                            </div>

                                        </div>

                                        <!-- Shop Voucher Inputs -->

                                        <div class="shop-voucher-inputs" id="shopVoucherInputs" style="display: none; margin: 0 20px 20px 20px;">

                                            <div style="margin-bottom: 15px;">

                                                <label for="shopVoucherCode" style="display: block; font-weight: 600; color: #374151; margin-bottom: 5px;">Tên Mã</label>

                                                <input type="text" id="shopVoucherCode" class="shop-voucher-input" placeholder="Nhập tên mã voucher..." style="width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">

                                                <div id="shopVoucherCodeError" style="color: #dc2626; font-size: 12px; margin-top: 5px; display: none;">Tên mã chỉ chứa 1 từ, không có khoảng trắng và không chứa URL</div>

                                            </div>

                                            <div style="margin-bottom: 15px;">

                                                <label for="shopUrl" style="display: block; font-weight: 600; color: #374151; margin-bottom: 5px;">Url shop</label>

                                                <input type="text" id="shopUrl" class="shop-voucher-input" placeholder="Nhập link shop Shopee..." style="width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">

                                                <div id="shopUrlError" style="color: #dc2626; font-size: 12px; margin-top: 5px; display: none;">Vui lòng nhập một URL shop Shopee hợp lệ</div>

                                            </div>

                                            <button onclick="processShopVoucher()" class="shop-voucher-process-btn" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #ee4d2d 0%, #ff6b35 100%); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">

                                                <i class="fas fa-search me-2"></i>Kiểm tra mã shop

                                            </button>

                                        </div>

                                        <div class="multi-voucher-input-container">

                                            <i class="fas fa-search multi-voucher-search-icon"></i>

                                            <textarea class="multi-voucher-input-field" id="multiVoucherInput" placeholder="Nhập mã, ID mã, link mã cách nhau bằng 1 khoảng trắng hoặc xuống dòng...\nLưu ý: Chỉ lọc tên mã có ít nhất 1 từ in hoa!" autocomplete="off"></textarea>

                                            <button class="multi-voucher-clear-btn" onclick="clearMultiVoucherInput()" title="Xóa"><i class="fas fa-times"></i></button>

                                            <button class="multi-voucher-paste-bar" id="multiVoucherPasteBtn" onclick="pasteFromClipboardMulti()" title="Dán nội dung"><i class="fas fa-paste me-2"></i>Dán nội dung</button><button class="multi-voucher-paste-bar" id="autoScanPageBtn" onclick="autoScanPageVouchers()" title="Quét toàn bộ voucher từ trang hiện tại" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); margin-left: 8px;"><i class="fas fa-search-plus me-2"></i>Quét trang hiện tại</button>

                                        </div>

                                        <div id="multiVoucherMessages"></div>

                                        <div id="saveLog" class="save-log"></div>

                                        <div id="multiVoucherResults"></div>

                                        ${confirmModalHTML}

                                        <div class="normal-settings-overlay" id="normalSettingsOverlay">

                                            <div class="normal-settings-modal" onclick="event.stopPropagation()">

                                                <div class="normal-settings-head">

                                                    <h4><i class="fas fa-cog me-2"></i>Cài đặt nâng cao (Thường)</h4>

                                                    <button class="normal-settings-close" onclick="closeNormalSettingsModal()">✕</button>

                                                </div>

                                                <div class="normal-settings-body">

                                                    <div class="normal-settings-actions">

                                                        <button class="normal-settings-cancel" onclick="closeNormalSettingsModal()">Đóng</button>

                                                        <button class="normal-settings-save" onclick="applyNormalSettings()">Lưu cài đặt</button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div class="spam-settings-overlay" id="spamSettingsOverlay">

                                            <div class="spam-settings-modal" onclick="event.stopPropagation()">

                                                <div class="spam-settings-head">

                                                    <h4><i class="fas fa-cog me-2"></i>Cài đặt nâng cao</h4>

                                                    <button class="spam-settings-close" onclick="closeSpamSettingsModal()">✕</button>

                                                </div>

                                                <div class="spam-settings-body">

                                                    <div class="spam-setting-item">

                                                        <label class="spam-setting-label">Thời gian nghỉ</label>

                                                        <div class="spam-setting-row">

                                                            <input type="number" id="spamDelayInput" class="spam-setting-input" value="500" onchange="validateGlobalSpamDelay()">

                                                            <span class="delay-hint">ms</span>

                                                        </div>

                                                    </div>



                                                    <div class="spam-setting-item">

                                                        <label class="spam-setting-check">

                                                            <input type="checkbox" id="useScheduleTimeToggle" onchange="toggleScheduleTimeInputs()">

                                                            Chỉnh thời gian chạy

                                                        </label>

                                                        <div class="spam-schedule-row" id="scheduleTimeRow">

                                                            <input type="number" id="scheduleMinuteInput" class="spam-setting-input" value="59" placeholder="Phút">

                                                            <span>:</span>

                                                            <input type="number" id="scheduleSecondInput" class="spam-setting-input" value="58" placeholder="Giây">

                                                        </div>

                                                    </div>



                                                    <div class="spam-setting-item">

                                                        <label class="spam-setting-check">

                                                            <input type="checkbox" id="useMaxAttemptsToggle" onchange="toggleMaxAttemptsInputs()">

                                                            Chỉnh số lượt lưu

                                                        </label>

                                                        <div class="spam-attempt-row" id="maxAttemptsRow">

                                                            <input type="number" id="maxAttemptsInput" class="spam-setting-input" value="100" placeholder="Số lượt lưu">

                                                            <span class="delay-hint">lượt</span>

                                                        </div>

                                                    </div>



                                                    <div class="spam-setting-item">

                                                        <label class="spam-setting-check">

                                                            <input type="checkbox" id="enableDualSaveToggle">

                                                            Thêm spam nhập tay

                                                        </label>

                                                    </div>







                                                    <div class="spam-settings-actions">

                                                        <button class="spam-settings-cancel" onclick="closeSpamSettingsModal()">Đóng</button>

                                                        <button class="spam-settings-save" onclick="applySpamSettings()">Lưu cài đặt</button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            `;



      document.body.insertAdjacentHTML("beforeend", popupHTML);



      // Khi tạo các event listeners

      initMultiVoucherChecker();

    }



    // Toggle between voucher types

    function toggleVoucherType() {

      const toggle = document.getElementById("voucherTypeToggle");

      const shopInputs = document.getElementById("shopVoucherInputs");

      const normalInput = document.getElementById("multiVoucherInput");

      const normalContainer = normalInput?.parentElement;

      const saveAllContainer = document.querySelector(".save-all-container"); // Lấy container của nút "Lưu toàn bộ"

      const modeSettings = document.getElementById("modeSettingsContainer");



      if (toggle.checked) {

        // Chế độ "Mã shop" được chọn

        shopInputs.style.display = "block";

        if (normalContainer) normalContainer.style.display = "none";



        // Ẩn nút "Lưu toàn bộ"

        if (saveAllContainer) {

          saveAllContainer.style.display = "none";

        }



        // Bạn có thể quyết định có hiển thị cài đặt spam cho mã shop không

        if (modeSettings) {

          modeSettings.style.display = "block";

          updateAdvancedButtonsVisibility();

        }

        clearSaveLog();



        // Xóa kết quả và thông báo cũ

        clearMultiVoucherResults();

        clearMultiVoucherMessages();

      } else {

        // Chuyển về chế độ "Mã pi"

        shopInputs.style.display = "none";

        if (normalContainer) normalContainer.style.display = "block";



        // Hiện lại nút "Lưu toàn bộ"

        if (saveAllContainer) {

          saveAllContainer.style.display = "block";

        }



        if (modeSettings) {

          modeSettings.style.display = "none"; // Ẩn cài đặt spam nếu không cần

        }

        clearSaveLog();



        // Xóa input và kết quả cũ

        clearShopVoucherInputs();

        clearMultiVoucherResults();

        clearMultiVoucherMessages();

      }

    }



    // Clear shop voucher inputs

    function clearShopVoucherInputs() {

      document.getElementById("shopVoucherCode").value = "";

      document.getElementById("shopUrl").value = "";

      hideShopVoucherErrors();

    }



    // Hide error messages

    function hideShopVoucherErrors() {

      document.getElementById("shopVoucherCodeError").style.display = "none";

      document.getElementById("shopUrlError").style.display = "none";

      document.getElementById("shopVoucherCode").classList.remove("error");

      document.getElementById("shopUrl").classList.remove("error");

    }



    // Validate shop voucher code

    function validateShopVoucherCode(code) {

      const trimmedCode = code.trim();

      const urlPatterns = [

        /https?:\/\//i,

        /www\./i,

        /\.[a-z]{2,}/i,

        /shopee\.vn/i,

      ];

      const containsUrl = urlPatterns.some((pattern) =>

        pattern.test(trimmedCode),

      );

      const hasSpaces = /\s/.test(trimmedCode);

      return !containsUrl && !hasSpaces && trimmedCode.length > 0;

    }



    // Validate shop URL

    function validateShopUrl(url) {

      try {

        const urlObj = new URL(url.startsWith("http") ? url : "https://" + url);

        const hostname = urlObj.hostname.toLowerCase();

        return hostname.includes("shopee.vn") || hostname.includes("vn.shp.ee");

      } catch {

        return false;

      }

    }



    // Extract shop ID from URL

    async function extractShopIdFromUrl(url) {

      let processedUrl = url;

      if (

        !processedUrl.startsWith("http://") &&

        !processedUrl.startsWith("https://")

      ) {

        processedUrl = "https://" + processedUrl;

      }



      try {

        const response = await fetch("https://5anm.net/api/shopee", {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            type: "unshort",

            url: processedUrl,

          }),

        });

        if (response.ok) {

          const data = await response.json();

          if (

            data.success &&

            data.expanded_url &&

            data.expanded_url.includes("shopee.vn")

          ) {

            processedUrl = data.expanded_url;

          }

        }

      } catch (error) {

        console.error("Error expanding URL:", error);

      }



      if (!processedUrl.includes("shopee.vn")) {

        throw new Error("URL không phải của Shopee");

      }



      // Extract from various URL patterns

      const productMatch = processedUrl.match(

        /\/product\/(\d+)\/(\d+)|i\.(\d+)\.(\d+)/,

      );

      if (productMatch) {

        return productMatch[1] || productMatch[3];

      }



      const shopMatch = processedUrl.match(/\/shop\/(\d+)/);

      if (shopMatch) {

        return shopMatch[1];

      }



      const usernameMatch = processedUrl.match(/shopee\.vn\/([a-zA-Z0-9._-]+)/);

      if (usernameMatch) {

        const username = usernameMatch[1].split("?")[0];

        try {

          const shopResponse = await fetch(

            `https://shopee.vn/api/v4/shop/get_shop_detail?username=${username}`,

            {

              headers: {

                accept: "application/json",

                "accept-language": "en-US,en;q=0.9,vi;q=0.8",

                "content-type": "application/json",

                "x-api-source": getApiSourceHeaderValue(),

                "x-requested-with": "XMLHttpRequest",

                "x-shopee-language": "vi",

              },

              method: "GET",

              mode: "cors",

              credentials: "include",

            },

          );



          const shopData = await shopResponse.json();

          if (shopData.error === 0 && shopData.data) {

            return shopData.data.shopid.toString();

          }

        } catch (error) {

          console.error("Error fetching shop details:", error);

        }

      }



      throw new Error("Không thể xác định shop ID từ URL này");

    }



    // Format time from unix timestamp

    function formatTimeFromUnix(unixTimestamp) {

      const date = new Date(unixTimestamp * 1000);

      const hours = String(date.getHours()).padStart(2, "0");

      const minutes = String(date.getMinutes()).padStart(2, "0");

      const day = String(date.getDate()).padStart(2, "0");

      const month = String(date.getMonth() + 1).padStart(2, "0");

      return `${hours}:${minutes} | ${day}/${month}`;

    }



    // Format voucher terms

    function formatVoucherTerms(voucher) {

      let terms = "";

      if (voucher.discount_percentage) {

        const discount_percentage = voucher.discount_percentage;

        const min_spend = voucher.min_spend / 100000000;

        const discountCapSource = [

          voucher.discount_cap,

          voucher.max_value,

          voucher.reward_cap,

        ].find(

          (value) => value !== null && value !== undefined && value !== "",

        );

        const discount_cap = Number(discountCapSource);

        if (Number.isFinite(discount_cap) && discount_cap > 0) {

          terms = ` giảm ${discount_percentage}%, max ${discount_cap / 100000000}k từ ${min_spend}k`;

        } else {

          terms = ` giảm ${discount_percentage}%, k giới hạn từ ${min_spend}k`;

        }

      } else if (voucher.discount_value) {

        const discount_value = voucher.discount_value / 100000000;

        const min_spend = voucher.min_spend / 100000000;

        terms = ` giảm ${discount_value}k từ ${min_spend}k`;

      } else {

        if (voucher.coin_percentage) {

          const discount_percentage = voucher.coin_percentage;

          const min_spend = voucher.min_spend / 100000000;

          const discount_cap = Number(voucher.coin_cap);

          if (Number.isFinite(discount_cap) && discount_cap > 0) {

            terms = ` hoàn ${discount_percentage}%, max ${discount_cap}k từ ${min_spend}k`;

          } else {

            terms = ` hoàn ${discount_percentage}%, k giới hạn từ ${min_spend}k`;

          }

        } else if (voucher.coin_value) {

          const discount_value = voucher.coin_value;

          const min_spend = voucher.min_spend / 100000000;

          terms = ` hoàn ${discount_value}k từ ${min_spend}k`;

        } else if (

          voucher.fsv_voucher_card_ui_info &&

          voucher.fsv_voucher_card_ui_info.int_min_spend_fsv_ui_only != null

        ) {

          let composed_discount_value =

            voucher.fsv_voucher_card_ui_info.composed_discount_value;

          let int_min_spend_fsv_ui_only =

            voucher.fsv_voucher_card_ui_info.int_min_spend_fsv_ui_only;

          let customised_labels = voucher.customised_labels;



          if (

            composed_discount_value !== null &&

            composed_discount_value !== undefined

          ) {

            composed_discount_value = Math.round(

              composed_discount_value / 100000000,

            );

            int_min_spend_fsv_ui_only = Math.round(

              int_min_spend_fsv_ui_only / 100000000,

            );

            terms = `MPVC giảm tối đa ${composed_discount_value}k từ ${int_min_spend_fsv_ui_only}k.`;

          } else {

            int_min_spend_fsv_ui_only = Math.round(

              int_min_spend_fsv_ui_only / 100000000,

            );

            let label = "";

            if (

              Array.isArray(customised_labels) &&

              customised_labels.length > 0

            ) {

              for (const lbl of customised_labels) {

                const content = lbl.content;

                if (content && content.includes("tối đa")) {

                  const mpvc = content;

                  terms = `MPVC giảm ${mpvc} từ ${int_min_spend_fsv_ui_only}k`;

                } else {

                  label += ` [${content}] -`;

                }

              }

              if (label) {

                label = label.slice(0, -1); // bỏ dấu - cuối

                terms = `MPVC từ ${int_min_spend_fsv_ui_only}k.${label}`;

              } else if (!terms) {

                terms = `MPVC từ ${int_min_spend_fsv_ui_only}k`;

              }

            } else {

              terms = `MPVC từ ${int_min_spend_fsv_ui_only}k`;

            }

          }

        } else if (

          voucher.fsv_voucher_card_ui_info &&

          voucher.fsv_voucher_card_ui_info.customised_discount_text

        ) {

          terms = `MPVC ${voucher.fsv_voucher_card_ui_info.customised_discount_text.toLowerCase().replace(/mpvc/gi, "")}`;

        }

      }

      terms = terms.replace(/max\s*0k/gi, "k giới hạn");

      if (voucher.shop_id !== 0 && terms) {

        terms += voucher.product_limit ? " [Lọc sp]" : " [Toàn shop]";

      }

      return terms;

    }



    // Process shop voucher

    async function processShopVoucher() {

      const voucherCode = document

        .getElementById("shopVoucherCode")

        .value.trim();

      const shopUrl = document.getElementById("shopUrl").value.trim();



      hideShopVoucherErrors();

      if (window.isSpamMode) {

        const delay =

          parseInt(document.getElementById("globalSpamDelay").value) || 500;

        await sleepANM(delay); // Áp dụng thời gian nghỉ

      }



      let hasError = false;



      if (!validateShopVoucherCode(voucherCode)) {

        document.getElementById("shopVoucherCodeError").style.display = "block";

        document.getElementById("shopVoucherCode").classList.add("error");

        hasError = true;

      }



      if (!validateShopUrl(shopUrl)) {

        document.getElementById("shopUrlError").style.display = "block";

        document.getElementById("shopUrl").classList.add("error");

        hasError = true;

      }



      if (hasError) {

        return;

      }



      try {

        showMultiVoucherLoading();



        const shopId = await extractShopIdFromUrl(shopUrl);

        console.log("Shop ID extracted:", shopId);



        const saveResponse = await fetch(

          "https://shopee.vn/api/v2/voucher_wallet/save_shop_voucher_by_voucher_code",

          {

            headers: {

              accept: "application/json",

              "accept-language": "en-US,en;q=0.9,vi;q=0.8,ar;q=0.7,id;q=0.6",

              "content-type": "application/json",

            },

            referrer: "https://shopee.vn/cart/",

            body: JSON.stringify({

              voucher_code: voucherCode,

              shop_ids: [parseInt(shopId)],

            }),

            method: "POST",

            mode: "cors",

            credentials: "include",

          },

        );



        const saveResult = await saveResponse.json();



        if (

          saveResult.error !== 0 ||

          !saveResult.data ||

          !saveResult.data.voucher ||

          saveResult.data.voucher.promotionid == 0

        ) {

          throw new Error(

            saveResult.error_msg || "Không tìm thấy mã shop hiện tại",

          );

        }

        const usage_limit_per_user = saveResult.usage_limit_per_user ?? 1;



        const voucher = saveResult.data.voucher;

        const processedVoucher = {

          code: voucherCode,

          promotionid: voucher.promotionid,

          signature: voucher.signature,

          link_voucher: `https://shopee.vn/search?voucherCode=${voucherCode}&promotionId=${voucher.promotionid}&signature=${voucher.signature}`,

          terms: formatVoucherTerms(voucher),

          icon_text: voucher.icon_text || voucher.shop_name || "Shop voucher",

          sub_text: "",

          segment: "",

          stream_input_shop_id: "",

          fully_used: voucher.fully_used || false,

          fully_redeemed: voucher.fully_redeemed || false,

          fully_claimed: voucher.fully_claimed || false,

          voucher_market_type: voucher.voucher_market_type || 1,

          percentage_used: voucher.percentage_used || 0,

          percentage_claimed: voucher.percentage_claimed || 0,

          icon_hash:

            "https://down-vn.img.susercontent.com/file/" + voucher.icon_hash ||

            voucher.shop_logo,

          shop_id: voucher.shop_id,

          distributed_count: null,

          current_usage: null,

          total_usage: null,

          use_link: `https://s.shopee.vn/an_redir?origin_link=${encodeURIComponent(`https://shopee.vn/universal-link/search?promotionId=${voucher.promotionid}&mmp_pid=an_an_17365130000&affiliate_id=17365130000&utm_source=an_17365130000&utm_medium=affiliates&utm_campaign=autocheckvoucher&utm_content=anmshopeevoucher&af_siteid=an_17365130000&pid=affiliates&af_click_lookback=7d&af_viewthrough_lookback=1d&is_retargeting=true&af_reengagement_window=7d`)}`,

          input_type: "url",

          start_time_show: formatTimeFromUnix(voucher.start_time),

          end_time_show: formatTimeFromUnix(voucher.end_time),

          usage_limit_per_user: usage_limit_per_user,

        };

        console.log(processedVoucher);



        displayMultiVoucherResults({

          error: false,

          message: "Success",

          vouchers: [processedVoucher],

        });



        showMultiVoucherMessage(`✅ Đã tìm thấy ${voucherCode}`, "success");

      } catch (error) {

        console.error("Error processing shop voucher:", error);

        showMultiVoucherMessage(`❌ Lỗi: ${error.message}`, "error");

        clearMultiVoucherResults();

      }

    }



    window.isSpamMode = false;

    window.giftcodeHeaderMode = false;

    window._shopeeFingerprint = null;

    function generateShopeeFingerprint() {

      const randomBytes = (n) => {

        const arr = new Uint8Array(n);

        crypto.getRandomValues(arr);

        return arr;

      };

      const toBase64 = (arr) => btoa(String.fromCharCode(...arr));

      const toHex = (arr) =>

        Array.from(arr)

          .map((b) => b.toString(16).padStart(2, "0"))

          .join("");

      const p1 = toBase64(randomBytes(16));

      const p2 = toBase64(randomBytes(64));

      const p3 = toHex(randomBytes(8));

      return `${p1}|${p2}|${p3}|08|3`;

    }

    function getShopeeFingerprint() {

      if (!window._shopeeFingerprint) {

        window._shopeeFingerprint = generateShopeeFingerprint();

      }

      return window._shopeeFingerprint;

    }

    window.normalSettings = {};

    window.spamSettings = {

      delay: 500,

      maxAttempts: 100,

      useCustomMaxAttempts: false,

      useScheduleTime: false,

      scheduleMinute: 59,

      scheduleSecond: 59,

      enableDualSaveConfirm: DEFAULT_ENABLE_DUAL_SAVE_CONFIRM === 1,

    };

    window.currentVouchers = [];

    window.savedVouchers = new Set();

    window.saveProcessStopped = false;

    window.giftcodeMicrositeRequestCount = 0;

    window.giftcodeMicrositeRequestLimit = 1000;

    window.giftcodeMicrositeStoppedByLimit = false;

    window.giftcodeSaveStoppedBySpam90309999 = false;

    window.individualProcesses = new Map();

    window.isSpamAllRunning = false; // Trạng thái spam tổng

    window.hasIndividualRunning = false; // Có voucher đơn lẻ nào đang chạy

    function validateGlobalSpamDelay() {

      const delayInput = document.getElementById("spamDelayInput");

      const hiddenDelayInput = document.getElementById("globalSpamDelay");

      if (!delayInput && !hiddenDelayInput) return;

      let value = parseInt((delayInput || hiddenDelayInput).value);

      // Kiểm tra nếu không phải số hoặc NaN

      if (isNaN(value)) {

        value = 500; // Giá trị mặc định

      }

      // Kiểm tra và điều chỉnh giới hạn

      if (value < SPAM_DELAY_MIN) {

        value = SPAM_DELAY_MIN;

      } else if (value > SPAM_DELAY_MAX) {

        value = SPAM_DELAY_MAX;

      }

      if (delayInput) delayInput.value = value;

      if (hiddenDelayInput) hiddenDelayInput.value = value;

      window.spamSettings.delay = value;

      return value;

    }

    function sanitizeScheduleValue(value, min, max, fallback) {

      let parsed = parseInt(value);

      if (isNaN(parsed)) parsed = fallback;

      if (parsed < min) parsed = min;

      if (parsed > max) parsed = max;

      return parsed;

    }

    function getGiftCodesFromRawInput(input) {

      const rawInput =

        input || document.getElementById("multiVoucherInput")?.value || "";

      const items = rawInput.split(/[\s\n,;|]+/).filter((item) => item.trim()); // Hỗ trợ thêm các ký tự phân cách

      const codes = [];

      const seen = new Set();



      for (const item of items) {

        let trimmed = item.trim();

        if (!trimmed) continue;



        // Loại bỏ các ký tự đặc biệt ở đầu/cuối nếu có

        trimmed = trimmed.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");



        if (trimmed.length < 3) continue; // Mã quá ngắn thường không phải giftcode

        if (isUrlLike(trimmed)) continue;



        // Giftcode thường là chữ hoa, số, hoặc kết hợp.

        // Cho phép cả chữ thường nếu đang ở chế độ Giftcode,

        // nhưng ưu tiên các chuỗi có vẻ là mã (alphanumeric)

        if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) continue;



        const normalized = trimmed.toUpperCase();

        if (seen.has(normalized)) continue;

        seen.add(normalized);

        codes.push({ code: normalized });

      }



      return codes;

    }

    function toggleScheduleTimeInputs() {

      const toggle = document.getElementById("useScheduleTimeToggle");

      const row = document.getElementById("scheduleTimeRow");

      if (!toggle || !row) return;

      row.classList.toggle("show", toggle.checked);

    }

    function toggleMaxAttemptsInputs() {

      const toggle = document.getElementById("useMaxAttemptsToggle");

      const row = document.getElementById("maxAttemptsRow");

      if (!toggle || !row) return;

      row.classList.toggle("show", toggle.checked);

    }

    function openSpamSettingsModal() {

      const overlay = document.getElementById("spamSettingsOverlay");

      const hiddenDelayInput = document.getElementById("globalSpamDelay");

      const delayInput = document.getElementById("spamDelayInput");

      const useScheduleToggle = document.getElementById(

        "useScheduleTimeToggle",

      );

      const scheduleMinuteInput = document.getElementById(

        "scheduleMinuteInput",

      );

      const scheduleSecondInput = document.getElementById(

        "scheduleSecondInput",

      );

      const useMaxAttemptsToggle = document.getElementById(

        "useMaxAttemptsToggle",

      );

      const maxAttemptsInput = document.getElementById("maxAttemptsInput");

      const enableDualSaveToggle = document.getElementById(

        "enableDualSaveToggle",

      );



      if (!overlay) return;



      if (delayInput) {

        delayInput.value =

          parseInt(hiddenDelayInput?.value) || window.spamSettings.delay || 500;

      }

      if (useScheduleToggle) {

        useScheduleToggle.checked = !!window.spamSettings.useScheduleTime;

      }

      if (scheduleMinuteInput) {

        scheduleMinuteInput.value = window.spamSettings.scheduleMinute ?? 59;

      }

      if (scheduleSecondInput) {

        scheduleSecondInput.value = window.spamSettings.scheduleSecond ?? 58;

      }

      if (useMaxAttemptsToggle) {

        useMaxAttemptsToggle.checked =

          !!window.spamSettings.useCustomMaxAttempts;

      }

      if (maxAttemptsInput) {

        maxAttemptsInput.value = window.spamSettings.maxAttempts ?? 100;

      }

      if (enableDualSaveToggle) {

        enableDualSaveToggle.checked =

          !!window.spamSettings.enableDualSaveConfirm;

      }



      toggleScheduleTimeInputs();

      toggleMaxAttemptsInputs();

      overlay.style.display = "flex";

    }

    function openNormalSettingsModal() {

      const overlay = document.getElementById("normalSettingsOverlay");

      if (overlay) overlay.style.display = "flex";

    }

    function closeNormalSettingsModal() {

      const overlay = document.getElementById("normalSettingsOverlay");

      if (overlay) overlay.style.display = "none";

    }

    function applyNormalSettings() {

      closeNormalSettingsModal();

      showMultiVoucherMessage("✅ Đã lưu cài đặt thường", "success");

    }

    function closeSpamSettingsModal() {

      const overlay = document.getElementById("spamSettingsOverlay");

      if (overlay) overlay.style.display = "none";

    }

    function applySpamSettings() {

      const delayInput = document.getElementById("spamDelayInput");

      const hiddenDelayInput = document.getElementById("globalSpamDelay");

      const useScheduleToggle = document.getElementById(

        "useScheduleTimeToggle",

      );

      const scheduleMinuteInput = document.getElementById(

        "scheduleMinuteInput",

      );

      const scheduleSecondInput = document.getElementById(

        "scheduleSecondInput",

      );

      const useMaxAttemptsToggle = document.getElementById(

        "useMaxAttemptsToggle",

      );

      const maxAttemptsInput = document.getElementById("maxAttemptsInput");

      const enableDualSaveToggle = document.getElementById(

        "enableDualSaveToggle",

      );



      const delayValue = validateGlobalSpamDelay();

      const scheduleMinute = sanitizeScheduleValue(

        scheduleMinuteInput?.value,

        0,

        59,

        59,

      );

      const scheduleSecond = sanitizeScheduleValue(

        scheduleSecondInput?.value,

        0,

        59,

        58,

      );

      if (scheduleMinuteInput) scheduleMinuteInput.value = scheduleMinute;

      if (scheduleSecondInput) scheduleSecondInput.value = scheduleSecond;

      if (hiddenDelayInput) hiddenDelayInput.value = delayValue;

      const maxAttempts = sanitizeScheduleValue(

        maxAttemptsInput?.value,

        1,

        10000,

        100,

      );

      if (maxAttemptsInput) maxAttemptsInput.value = maxAttempts;



      window.spamSettings.delay = delayValue;

      window.spamSettings.useScheduleTime = !!useScheduleToggle?.checked;

      window.spamSettings.scheduleMinute = scheduleMinute;

      window.spamSettings.scheduleSecond = scheduleSecond;

      window.spamSettings.useCustomMaxAttempts =

        !!useMaxAttemptsToggle?.checked;

      window.spamSettings.maxAttempts = window.spamSettings.useCustomMaxAttempts

        ? maxAttempts

        : 100;

      window.spamSettings.enableDualSaveConfirm =

        !!enableDualSaveToggle?.checked;



      closeSpamSettingsModal();

      showMultiVoucherMessage("✅ Đã lưu cài đặt spam", "success");

    }

    function getAdaptiveSpamDelay(baseDelay, requestIndex) {

      const safeBase = sanitizeScheduleValue(

        baseDelay,

        SPAM_DELAY_MIN,

        SPAM_DELAY_MAX,

        500,

      );

      if (requestIndex <= 20) return safeBase;

      const extraStep = Math.ceil((requestIndex - 20) / 10);

      return safeBase + extraStep * 100;

    }

    function getNextScheduleTime(minute, second) {

      const now = new Date();

      const target = new Date(now);

      target.setMinutes(minute, second, 0);

      if (target <= now) {

        target.setHours(target.getHours() + 1);

      }

      return target;

    }

    async function waitForSpamScheduleIfNeeded() {

      if (!window.spamSettings.useScheduleTime) return true;

      const saveLog = document.getElementById("saveLog");

      const target = getNextScheduleTime(

        window.spamSettings.scheduleMinute,

        window.spamSettings.scheduleSecond,

      );

      const targetText = target.toLocaleTimeString("vi-VN", { hour12: false });

      if (saveLog) {

        saveLog.style.display = "block";

        saveLog.innerHTML += `\n⏱️ Chờ tới ${targetText} để bắt đầu spam...\n`;

        syncSaveLogToPiP();

      }

      while (!window.saveProcessStopped) {

        const now = new Date();

        if (now >= target) {

          if (saveLog) {

            saveLog.innerHTML += `✅ Đã tới thời gian chạy (${targetText}). Bắt đầu spam.\n`;

            saveLog.scrollTop = saveLog.scrollHeight;

          }

          return true;

        }

        await sleepANM(250);

      }

      return false;

    }

    function updateAdvancedButtonsVisibility() {

      const spamAdvancedSection = document.getElementById(

        "spamAdvancedSection",

      );

      const normalAdvancedSection = document.getElementById(

        "normalAdvancedSection",

      );

      if (window.isSpamMode) {

        spamAdvancedSection?.classList.add("show");

        normalAdvancedSection?.classList.remove("show");

      } else {

        spamAdvancedSection?.classList.remove("show");

        normalAdvancedSection?.classList.add("show");

      }

    }

    // Toggle spam mode function

    function toggleSpamMode() {

      const toggle = document.getElementById("spamModeToggle");

      // Dừng tất cả process đang chạy khi toggle

      if (

        window.saveProcessStopped === false ||

        window.individualProcesses.size > 0

      ) {

        stopAllProcesses();

      }

      window.isSpamMode = toggle.checked;

      closeSpamSettingsModal();

      closeNormalSettingsModal();

      updateAdvancedButtonsVisibility();

      updateButtonsForSpamMode(window.isSpamMode);

    }

    // Update buttons appearance based on mode và states

    function updateButtonsForSpamMode(isSpamMode) {

      updateSaveAllButton();

      updateIndividualButtons();

    }

    // Cập nhật nút Save All

    function updateSaveAllButton() {

      const saveAllBtn = document.getElementById("saveAllBtn");

      if (!saveAllBtn) return;

      // Reset classes

      saveAllBtn.className = "save-all-btn";

      if (window.isSpamAllRunning) {

        // Đang spam tổng - không thay đổi (đã được xử lý ở hàm spam)

        return;

      }

      if (window.hasIndividualRunning) {

        // Có individual đang chạy - chuyển thành nút stop

        saveAllBtn.innerHTML =

          '<i class="fas fa-stop me-2"></i>Dừng Lưu Voucher';

        saveAllBtn.classList.add("individual-running");

        saveAllBtn.onclick = () => stopAllIndividualProcesses();

      } else if (window.isSpamMode) {

        // Spam mode và không có gì đang chạy

        saveAllBtn.innerHTML =

          '<i class="fas fa-rocket me-2"></i>Spam Save All';

        saveAllBtn.classList.add("spam-mode");

        saveAllBtn.onclick = () => saveAllVouchers();

      } else {

        // Normal mode

        saveAllBtn.innerHTML = `<i class="fas fa-save me-2"></i>Save All (${window.currentVouchers?.length || 0})`;

        saveAllBtn.onclick = () => saveAllVouchers();

      }

      // Disabled state

      saveAllBtn.disabled = window.isSpamAllRunning;

    }

    /**

     * Chức năng: Cập nhật giao diện của tất cả các nút lưu voucher riêng lẻ.

     * SỬA LỖI: Thêm một bước kiểm tra ở đầu hàm. Nếu một voucher đã có trong danh sách

     * `window.savedVouchers`, hàm sẽ ngay lập tức cập nhật nút đó thành trạng thái "Đã lưu"

     * và bỏ qua tất cả logic còn lại cho nút đó, tránh việc bị reset trạng thái.

     */

    function updateIndividualButtons() {

      document.querySelectorAll(".voucher-save-btn").forEach((btn, index) => {

        // Cần đảm bảo window.currentVouchers[index] tồn tại để không bị lỗi

        const voucher = window.currentVouchers

          ? window.currentVouchers[index]

          : null;

        // --- PHẦN SỬA LỖI BẮT ĐẦU ---

        // Nếu voucher đã được lưu, cập nhật trạng thái "Đã lưu" và dừng lại ngay.

        // Đây là bước quan trọng nhất để tránh bị reset.

        if (

          voucher &&

          window.savedVouchers &&

          window.savedVouchers.has(voucher.code)

        ) {

          btn.className = "voucher-save-btn"; // Reset class để đảm bảo sạch sẽ

          btn.innerHTML = '<i class="fas fa-check me-1"></i>Đã lưu';

          btn.style.background = "#10b981"; // Màu xanh lá cây

          btn.disabled = true;

          return; // Thoát sớm, không xử lý gì thêm cho nút này

        }

        // --- PHẦN SỬA LỖI KẾT THÚC ---



        // Logic cũ để reset và cập nhật trạng thái các nút chưa được lưu

        btn.className = "voucher-save-btn";

        if (window.isSpamMode) {

          btn.classList.add("spam-mode");

        }

        // Reset lại màu nền có thể đã bị đổi thành màu đỏ do thất bại trước đó

        btn.style.background = "";



        if (window.isSpamAllRunning) {

          // Spam tổng đang chạy - vô hiệu hóa nút cá nhân

          btn.disabled = true;

          btn.innerHTML =

            '<i class="fas fa-spinner fa-spin me-1"></i>Spam tổng...';

          btn.classList.add("disabled-by-others");

        } else if (window.individualProcesses.has(index)) {

          // Chính voucher này đang trong quá trình spam

          btn.disabled = true;

          btn.innerHTML =

            '<i class="fas fa-spinner fa-spin me-1"></i>Spam đang chạy...';

        } else if (window.hasIndividualRunning) {

          // Một voucher cá nhân khác đang chạy

          btn.disabled = true;

          btn.innerHTML = '<i class="fas fa-pause me-1"></i>Đang chờ...';

          btn.classList.add("disabled-by-others");

        } else {

          // Không có tiến trình nào đang chạy, nút ở trạng thái sẵn sàng

          btn.disabled = false;

          if (window.isSpamMode) {

            btn.innerHTML = '<i class="fas fa-rocket me-1"></i>Spam lưu';

          } else {

            btn.innerHTML = '<i class="fas fa-save me-1"></i>Lưu voucher';

          }

        }

      });



      // Cập nhật các nút link trên mobile

      document.querySelectorAll(".voucher-link-btn-mobile").forEach((btn) => {

        if (window.isSpamAllRunning || window.hasIndividualRunning) {

          btn.disabled = true;

          btn.style.opacity = 0.5;

        } else {

          btn.disabled = false;

          btn.style.opacity = 1;

        }

      });

    }

    // Kiểm tra và cập nhật trạng thái individual running

    function updateIndividualRunningState() {

      window.hasIndividualRunning = window.individualProcesses.size > 0;

      updateSaveAllButton();

      updateIndividualButtons();

    }

    // Hàm dừng tất cả individual processes

    function stopAllIndividualProcesses() {

      for (let [index, _] of window.individualProcesses) {

        window.individualProcesses.set(index, true);

      }

      const saveLog = document.getElementById("saveLog");

      if (saveLog && saveLog.style.display !== "none") {

        saveLog.innerHTML += `\n🛑 Spam mã đã được dừng bởi người dùng.\n`;

        saveLog.scrollTop = saveLog.scrollHeight;

        syncSaveLogToPiP();

      }

    }

    // Hàm dừng tất cả processes

    function stopAllProcesses() {

      window.saveProcessStopped = true;

      window.isSpamAllRunning = false;

      // Dừng tất cả individual processes

      for (let [index, _] of window.individualProcesses) {

        window.individualProcesses.set(index, true);

      }

      const saveLog = document.getElementById("saveLog");

      if (saveLog && saveLog.style.display !== "none") {

        // saveLog.innerHTML += `\n🛑 Tất cả quá trình đã được dừng bởi người dùng.\n`;

        saveLog.scrollTop = saveLog.scrollHeight;

      }

      updateIndividualRunningState();

      console.log("🛑 All processes stopped");

    }

    // Khởi tạo event listeners

    function initMultiVoucherChecker() {

      const inputField = document.getElementById("multiVoucherInput");

      let inputTimeout;

      inputField.addEventListener("input", function () {

        clearTimeout(inputTimeout);

        inputTimeout = setTimeout(() => {

          processMultiVoucherInput(this.value.trim());

        }, 800);

      });

      inputField.addEventListener("keydown", function (e) {

        if (e.key === "Enter" && e.ctrlKey) {

          e.preventDefault();

          processMultiVoucherInput(this.value.trim());

        }

      });

      inputField.focus();

      // Mobile optimization: Set placeholder for delay input

      function updateDelayInputForMobile() {

        const delayInput = document.getElementById("spamDelayInput");

        if (window.innerWidth <= 768 && delayInput) {

          delayInput.setAttribute("placeholder", "500");

        }

      }

      updateDelayInputForMobile();

      window.addEventListener("resize", updateDelayInputForMobile);



      const spamOverlay = document.getElementById("spamSettingsOverlay");

      if (spamOverlay) {

        spamOverlay.addEventListener("click", (e) => {

          if (e.target === spamOverlay) closeSpamSettingsModal();

        });

      }

      const normalOverlay = document.getElementById("normalSettingsOverlay");

      if (normalOverlay) {

        normalOverlay.addEventListener("click", (e) => {

          if (e.target === normalOverlay) closeNormalSettingsModal();

        });

      }

    }



    function getFallbackCsrfToken() {

      const match = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);

      return match ? decodeURIComponent(match[1]) : "";

    }



    function buildVoucherSearchLink(voucher) {

      const voucherCode = voucher?.voucher_code;

      const promotionId = voucher?.promotionid;

      const signature = voucher?.signature;

      if (!voucherCode || !promotionId || !signature) return "";

      return `https://shopee.vn/search?voucherCode=${encodeURIComponent(voucherCode)}&promotionId=${encodeURIComponent(promotionId)}&signature=${encodeURIComponent(signature)}`;

    }



    async function fallbackVoucherCheckerWithShopee(texts) {

      const csrfToken = getFallbackCsrfToken();

      const uniqCodes = Array.from(

        new Set(

          (Array.isArray(texts) ? texts : [])

            .map((v) => String(v ?? "").trim())

            .filter(Boolean),

        ),

      );



      const fallbackResults = [];



      for (const voucherCode of uniqCodes) {

        const send = {

          voucher_code: voucherCode,

          shoporders: [

            {

              shopid: 531115369,

              iteminfos: [

                {

                  itemid: 13118881619,

                  modelid: 95095844190,

                  quantity: 1,

                  shopid: 531115369,

                },

              ],

            },

          ],

        };



        try {

          const response = await fetch(

            "https://shopee.vn/api/v4/voucher_wallet/validate_platform_voucher_by_voucher_code",

            {

              method: "POST",

              credentials: "include",

              headers: {

                Accept: "application/json",

                "Content-Type": "application/json",

                "x-csrftoken": csrfToken,

                "x-requested-with": "XMLHttpRequest",

                "x-shopee-language": "vi",

              },

              body: JSON.stringify(send),

            },

          );



          if (!response.ok) continue;

          const resultData = await response.json();

          if (resultData?.error !== 0 || !resultData?.data?.voucher) continue;



          const link = buildVoucherSearchLink(resultData.data.voucher);

          if (!link) continue;



          fallbackResults.push({

            input: voucherCode,

            type: "url",

            data: link,

          });

        } catch (error) {

          // Bỏ qua từng mã lỗi, tiếp tục mã khác

        }

      }



      return fallbackResults;

    }



    // Hàm phân loại và xử lý input

    async function processMultiVoucherInput(input) {

      clearMultiVoucherMessages();

      clearMultiVoucherResults();

      clearSaveLog();

      // Ẩn toggle khi bắt đầu xử lý mới

      const modeContainer = document.getElementById("modeSettingsContainer");

      if (modeContainer) {

        modeContainer.style.display = "none";

      }

      if (!input) {

        return;

      }



      // === GIFTCODE MODE: Lưu ngay lập tức không cần lấy thông tin ===

      const giftcodeToggle = document.getElementById("giftcodeHeaderToggle");

      if (giftcodeToggle && giftcodeToggle.checked) {

        const codes = getGiftCodesFromRawInput(input);



        if (codes.length === 0) {

          // Nếu không tìm thấy mã theo kiểu giftcode, thử parse kiểu text thông thường

          const items = input

            .split(/[\s\n,;|]+/)

            .filter((i) => i.trim() && i.length >= 4);

          items.forEach((item) => {

            const code = item.trim().toUpperCase();

            if (!codes.find((c) => c.code === code)) {

              codes.push({ code: code });

            }

          });

        }



        if (codes.length === 0) {

          showMultiVoucherMessage(

            "❌ Giftcode mode: không tìm thấy mã hợp lệ từ input.",

            "error",

          );

          return;

        }



        showMultiVoucherMessage(

          `🎁 Giftcode mode: Đang lưu ngay ${codes.length} mã...`,

          "info",

        );

        const saveLog = document.getElementById("saveLog");



        if (saveLog) {

          saveLog.style.display = "block";

          saveLog.innerHTML = `<b>🎁 Giftcode mode:</b>\n\n`;

          syncSaveLogToPiP();

        }



        // Ẩn mode settings container khi ở chế độ Giftcode

        if (modeContainer) {

          modeContainer.style.display = "none";

        }



        window.saveProcessStopped = false;

        window.giftcodeSaveStoppedBySpam90309999 = false;

        window.giftcodeMicrositeRequestCount = 0;

        window.giftcodeMicrositeStoppedByLimit = false;

        let savedCount = 0;

        let failedCount = 0;



        // Chuyển nút Dán thành nút Dừng

        window.pipLogs = [];

        togglePasteButtonToStop(true);



        for (let i = 0; i < codes.length; i++) {

          if (window.saveProcessStopped) {

            if (saveLog) {

              saveLog.innerHTML += `\n🛑 Đã dừng tại mã thứ ${i + 1}/${codes.length}.\n`;

              saveLog.scrollTop = saveLog.scrollHeight;

              syncSaveLogToPiP();

            }

            break;

          }



          const voucher = codes[i];

          const result = await saveByGiftcodeMicrosite(

            voucher.code,

            "giftcode_instant",

          );



          if (result.sout && saveLog) {

            saveLog.innerHTML += result.sout;

            if (

              result.attemptStatus?.stopSaveDueToSpam90309999 ||

              result.attemptStatus?.stopManualDueToSpam

            ) {

              saveLog.innerHTML += buildUncheckedVoucherCodesLine(

                codes.slice(i).map((item) => item.code),

              );

            }

            saveLog.scrollTop = saveLog.scrollHeight;

            syncSaveLogToPiP();

          }



          if (result.successfulCode) {

            window.savedVouchers.add(voucher.code);

            savedCount++;

          } else {

            failedCount++;

          }



          if (

            result.attemptStatus?.stopSaveDueToSpam90309999 ||

            result.attemptStatus?.stopManualDueToSpam

          ) {

            break;

          }



          // Delay nhỏ giữa các mã để tránh bị rate limit

          if (i < codes.length - 1 && !window.saveProcessStopped) {

            await sleepANM(120);

          }

        }



        // Khôi phục nút Dán

        togglePasteButtonToStop(false);



        // Tổng kết

        if (saveLog) {

          saveLog.innerHTML += `\n🏁 Tổng kết: Đã lưu <b>${savedCount}/${codes.length}</b> mã giftcode.${failedCount > 0 ? ` (${failedCount} thất bại)` : ""}`;

          saveLog.scrollTop = saveLog.scrollHeight;

          syncSaveLogToPiP();

        }



        if (window.giftcodeSaveStoppedBySpam90309999) {

          showMultiVoucherMessage(

            "Bạn dính lỗi spam, vui lòng thử lại sau ít nhất 15 phút",

            "error",

          );

        } else {

          clearMultiVoucherMessages();

        }

        if (

          window.saveProcessStopped &&

          !window.giftcodeSaveStoppedBySpam90309999

        ) {

          showMultiVoucherMessage(

            `⏹️ Đã dừng! Lưu được ${savedCount}/${codes.length} mã.`,

            "warning",

          );

        } else {

          showMultiVoucherMessage(

            `✅ Hoàn thành! Đã lưu ${savedCount}/${codes.length} mã giftcode.`,

            "success",

          );

        }

        return; // Không tiếp tục xử lý thông thường

      }



      showMultiVoucherMessage("🔄 Đang phân tích và xử lý dữ liệu...", "info");

      // Tách input theo dấu cách và xuống dòng

      const items = input.split(/[\s\n]+/).filter((item) => item.trim() !== "");

      const processedData = {

        numbers: [],

        urls: [],

        texts: [],

      };

      // Phân loại sơ bộ

      const textItems = [];

      for (const item of items) {

        const trimmedItem = item.trim();

        // Kiểm tra nếu là số

        if (/^\d+$/.test(trimmedItem)) {

          processedData.numbers.push(parseInt(trimmedItem));

          textItems.push(parseInt(trimmedItem));

        }

        // Kiểm tra nếu là URL hoặc domain

        else if (isUrlLike(trimmedItem)) {

          const processedUrl = await processUrl(trimmedItem);

          if (processedUrl) {

            processedData.urls.push(processedUrl);

          }

        }

        // Nếu là text - thêm vào danh sách cần xử lý

        else {

          // Kiểm tra xem có chứa 14 chữ số liên tục không

          const digitMatch = trimmedItem.match(/\d{14,}/);



          if (digitMatch) {

            // Nếu tìm thấy 14 số trở lên, lấy chuỗi số đó

            const extractedNumber = parseInt(digitMatch[0]);

            processedData.numbers.push(extractedNumber);

            textItems.push(extractedNumber);

          } else {

            // Nếu không có 14 số liên tục, xử lý như text bình thường ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞĐ

            const hasUppercaseWord = /\b\S*[A-Z]\S*\b/.test(trimmedItem);



            if (hasUppercaseWord) {

              textItems.push(trimmedItem.toUpperCase());

            }



            // textItems.push(trimmedItem.toUpperCase());

          }

        }

      }



      // Gọi API get_voucher_checker nếu có text items

      if (textItems.length > 0) {

        let checkerData = [];

        let shouldFallback = false;

        const normalizeTextInput = (value) =>

          String(value ?? "")

            .trim()

            .toUpperCase();



        try {

          const response = await fetch("https://5anm.net/api/shopee", {

            method: "POST",

            body: JSON.stringify({

              type: "voucher_checker",

              texts: textItems,

            }),

          });

          if (!response.ok) {

            shouldFallback = true;

          } else {

            const result = await response.json();

            if (!result?.error && Array.isArray(result?.data)) {

              checkerData = result.data;

            } else {

              // server trả failed/error -> fallback qua Shopee API trực tiếp

              shouldFallback = true;

            }

          }

        } catch (error) {

          console.warn("Lỗi khi gọi API get_voucher_checker:", error);

          shouldFallback = true;

        }



        if (shouldFallback) {

          console.warn(

            "Lỗi dữ liệu từ server, chuyển sang fallback Shopee API...",

          );

          checkerData = await fallbackVoucherCheckerWithShopee(textItems);

        } else {

          // API server thành công nhưng có thể từng mã trả về data=null -> fallback theo từng mã còn thiếu

          const resolvedInputs = new Set();

          for (const item of checkerData) {

            const normalizedInput = normalizeTextInput(item?.input);

            const hasResolvedData = Boolean(item?.data);

            if (normalizedInput && hasResolvedData) {

              resolvedInputs.add(normalizedInput);

            }

          }



          const unresolvedTextItems = Array.from(

            new Set(

              textItems.filter(

                (text) => !resolvedInputs.has(normalizeTextInput(text)),

              ),

            ),

          );



          if (unresolvedTextItems.length > 0) {

            console.warn(

              `Voucher checker thiếu dữ liệu cho ${unresolvedTextItems.length} mã, fallback Shopee API...`,

            );

            const fallbackData =

              await fallbackVoucherCheckerWithShopee(unresolvedTextItems);

            if (fallbackData.length > 0) {

              checkerData = [...checkerData, ...fallbackData];

            }

          }

        }



        if (checkerData.length > 0) {

          for (const item of checkerData) {

            if (item.type === "url" && item.data) {

              try {

                const url = new URL(item.data);

                const promotionId = url.searchParams.get("promotionId");



                // Nếu tìm thấy promotionId trong URL, loại nó khỏi mảng numbers

                if (promotionId) {

                  const promotionIdInt = parseInt(promotionId);

                  const index = processedData.numbers.indexOf(promotionIdInt);

                  if (index > -1) {

                    processedData.numbers.splice(index, 1);

                  }

                }

              } catch (e) {

                // URL không hợp lệ, bỏ qua

              }



              processedData.urls.push(item.data);

            } else if (item.type === "number" && item.data) {

              processedData.numbers.push(item.data);

            }

          }

        }

      }

      // Xóa thông báo loading trước khi hiển thị kết quả

      clearMultiVoucherMessages();

      // Kiểm tra tổng số lượng

      const totalItems =

        processedData.numbers.length +

        processedData.urls.length +

        processedData.texts.length;

      if (totalItems > 500) {

        showMultiVoucherMessage(

          "❌ Tổng số mục vượt quá 500. Vui lòng giảm số lượng input.",

          "error",

        );

        return;

      }

      if (totalItems === 0) {

        showMultiVoucherMessage(

          "❌ Không có dữ liệu hợp lệ để xử lý.",

          "error",

        );

        return;

      }

      // Gửi request tìm voucher

      await searchVouchersWithProcessedData(processedData);

    }

    // Kiểm tra xem có phải URL không

    function isUrlLike(text) {

      const urlPatterns = [

        /^https?:\/\//i,

        /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,

        /s\.shopee\.vn/i,

      ];

      return urlPatterns.some((pattern) => pattern.test(text));

    }

    // Xử lý URL

    async function processUrl(url) {

      let processedUrl = url;

      if (

        !processedUrl.startsWith("http://") &&

        !processedUrl.startsWith("https://")

      ) {

        processedUrl = "https://" + processedUrl;

      }

      if (processedUrl.includes("shopee.vn")) {

        return processedUrl;

      }

      try {

        const response = await fetch("https://5anm.net/api/shopee", {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            type: "unshort",

            url: processedUrl,

          }),

        });

        if (!response.ok) {

          return null;

        }

        const data = await response.json();

        if (

          data.success &&

          data.expanded_url &&

          data.expanded_url.includes("shopee.vn")

        ) {

          return data.expanded_url;

        }

        return null;

      } catch (error) {

        console.error("Error expanding URL:", error);

        return null;

      }

    }

    // Tìm kiếm voucher với dữ liệu đã xử lý

    /**

     * Hàm tìm kiếm voucher TÍCH HỢP, thay thế cho hàm gọi API 5anm.net.

     * Hàm này sẽ tự gọi API Shopee và trả về kết quả có cấu trúc giống hệt API cũ.

     *

     * @param {object} data - Đối tượng chứa các mảng đầu vào: { numbers: [], urls: [], texts: [] }.

     */

    async function searchVouchersWithProcessedData(data) {

      showMultiVoucherLoading();



      // =========================================================================

      //  ĐỊNH NGHĨA CÁC HÀM HELPER (đóng gói trong scope của hàm chính)

      // =========================================================================



      function getCsrfToken() {

        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {

          const parts = cookie.trim().split("=");

          if (parts[0] === "csrftoken") return parts[1];

        }

        return null;

      }



      function detectInputType(input) {

        input = input.trim();

        try {

          if (input.startsWith("http")) {

            const urlObj = new URL(input);

            const params = urlObj.searchParams;

            const promotionId =

              params.get("promotionId") || params.get("promotionid");

            let voucherCode =

              params.get("voucherCode") || params.get("vouchercode");

            const signature = params.get("signature");

            if (params.has("evcode")) voucherCode = atob(params.get("evcode"));

            if (promotionId)

              return {

                promotionId,

                voucherCode: voucherCode || "",

                signature: signature || "",

                inputType: "url",

              };

          }

        } catch {}

        if (/^\d+$/.test(input))

          return {

            promotionId: input,

            voucherCode: "",

            signature: "",

            inputType: "promotionId",

          };

        if (/^[A-Z0-9]+$/.test(input))

          return {

            promotionId: "",

            voucherCode: input,

            signature: "",

            inputType: "voucherCode",

          };

        return null;

      }



      async function validateVoucherCode(voucherCode) {

        const csrfToken = getCsrfToken();

        if (!csrfToken) return null;

        const url =

          "https://shopee.vn/api/v4/voucher_wallet/validate_platform_voucher_by_voucher_code";

        const payload = JSON.stringify({

          voucher_code: voucherCode,

          shoporders: [

            {

              shopid: 37251933,

              iteminfos: [

                {

                  itemid: 591989399,

                  modelid: 56206388283,

                  quantity: 2,

                  shopid: 37251933,

                },

              ],

            },

          ],

        });

        try {

          const response = await fetch(url, {

            method: "POST",

            headers: {

              "Content-Type": "application/json",

              "x-csrftoken": csrfToken,

              "x-requested-with": "XMLHttpRequest",

            },

            body: payload,

          });

          const data = await response.json();

          if (data.error || !data.data?.voucher) return null;

          const v = data.data.voucher;

          return {

            promotionId: v.promotion_id,

            voucherCode: v.voucher_code,

            signature: v.signature,

          };

        } catch {

          return null;

        }

      }



      async function getSignatureForPromotionID(promotionId) {

        const csrfToken = getCsrfToken();

        if (!csrfToken) return null;

        const url = "https://shopee.vn/api/v4/chat/get_voucher";

        const payload = JSON.stringify({

          shop_id: "545267053",

          id: promotionId,

          is_subaccount: true,

        });

        try {

          const response = await fetch(url, {

            method: "POST",

            headers: {

              "Content-Type": "application/json",

              "x-csrftoken": csrfToken,

            },

            body: payload,

          });

          const data = await response.json();

          return data.error === 0 && data.data?.signature

            ? data.data.signature

            : null;

        } catch {

          return null;

        }

      }



      // HÀM GIỮ NGUYÊN: getVoucherDetails (single API)

      async function getVoucherDetails(promotionId, voucherCode, signature) {

        const csrfToken = getCsrfToken();

        if (!csrfToken) return { error: true, message: "Không có CSRF token" };

        const url =

          "https://shopee.vn/api/v4/voucher_wallet/get_voucher_detail";

        const voucher_code = voucherCode || "TESTDATA";

        const payload = JSON.stringify({

          promotionid: Number(promotionId),

          voucher_code,

          signature,

          need_basic_info: true,

          need_user_voucher_status: true,

          source: "0",

          addition: ["voucher_microsite_link"],

        });

        try {

          const response = await fetch(url, {

            method: "POST",

            headers: {

              "Content-Type": "application/json",

              "x-csrftoken": csrfToken,

              "x-requested-with": "XMLHttpRequest",

              "x-api-source": getApiSourceHeaderValue(),

              accept: "application/json",

            },

            body: payload,

          });

          if (!response.ok)

            throw new Error(`Network response: ${response.status}`);

          const data = await response.json();

          if (data.error === 90309999) {

            // if (typeof window.showCaptchaErrorModal === "function")

            //   window.showCaptchaErrorModal();

            // throw new Error(data.error_msg || "Tắt view và xác minh captcha");

          }

          if (data.error)

            throw new Error(data.error_msg || `API error: ${data.error}`);

          return data.data;

        } catch (e) {

          console.error("Lỗi khi lấy chi tiết voucher:", e);

          return null;

        }

      }



      // HÀM MỚI: batchGetVoucherDetails (batch API)

      async function batchGetVoucherDetails(promotionInfos) {

        const csrfToken = getCsrfToken();

        if (!csrfToken) return null;

        const url =

          "https://shopee.vn/api/v2/voucher_wallet/batch_get_vouchers_by_promotion_ids";

        const body = {

          promotion_info: promotionInfos.map((info) => ({

            signature: info.signature,

            signature_source: "0",

            promotionid: Number(info.promotionid),

            item_info: [

              {

                itemid: 27750504134,

                shopid: 984689722,

              },

            ],

          })),

          need_user_voucher_status: false,

        };

        try {

          const response = await fetch(url, {

            method: "POST",

            headers: {

              "Content-Type": "application/json",

              "x-csrftoken": csrfToken,

              "x-requested-with": "XMLHttpRequest",

              "x-api-source": getApiSourceHeaderValue(),

              accept: "application/json",

            },

            body: JSON.stringify(body),

            mode: "cors",

            credentials: "include",

          });

          if (!response.ok) throw new Error(`HTTP ${response.status}`);

          const data = await response.json();

          if (data.error === 90309999) {

            // if (typeof window.showCaptchaErrorModal === "function")

            //   window.showCaptchaErrorModal();

            // return { error: 90309999, data: null }; // Trả về để fallback

          }

          if (data.error)

            throw new Error(data.error_msg || `Batch API error: ${data.error}`);

          return data.data; // { id_voucher_mappings: { ... } }

        } catch (e) {

          console.error("Batch API error:", e);

          return { error: "network_or_other", data: null }; // Fallback nếu lỗi khác

        }

      }



      /**

       * Hàm này parse dữ liệu thô từ API Shopee và trả về object có cấu trúc

       * GIỐNG HỆT cấu trúc mà API 5anm.net cũ trả về.

       */

      async function parseToOriginalStructure(

        voucherData,

        input,

        trustedVoucherCode = "",

      ) {

        if (!voucherData || !voucherData.voucher_basic_info) return null;



        const v = voucherData.voucher_basic_info;

        const stableVoucherCode = trustedVoucherCode || v.voucher_code;



        // Định dạng thời gian

        const formatTime = (unix) => {

          if (!unix) return unix;

          const d = new Date(unix * 1000);

          return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} | ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;

        };



        // Định dạng điều kiện voucher

        let terms = "";

        if (v.discount_percentage > 0) {

          const rewardCap = Number(v.reward_cap);

          const capText =

            Number.isFinite(rewardCap) && rewardCap > 0

              ? `max ${Math.round(rewardCap / 100000000)}k`

              : "k giới hạn";

          terms = `giảm ${v.discount_percentage}%, ${capText} từ ${Math.round(v.min_spend / 100000000)}k`;

        } else if (v.discount_value > 0) {

          terms = `giảm ${Math.round(v.discount_value / 100000000)}k từ ${Math.round(v.min_spend / 100000000)}k`;

        } else if (v.coin_percentage && v.coin_percentage > 0) {

          const rewardCap = Number(v.reward_cap);

          const capText =

            Number.isFinite(rewardCap) && rewardCap > 0

              ? `max ${Math.round(rewardCap / 1000)}k`

              : "k giới hạn";

          terms = `hoàn ${v.coin_percentage}%, ${capText} từ ${Math.round(v.min_spend / 100000000)}k`;

        } else if (v.coin_value && v.coin_value > 0) {

          terms = `hoàn ${Math.round(v.coin_value / 1000)}k từ ${Math.round(v.min_spend / 100000000)}k`;

        } else if (

          v.fsv_voucher_card_ui_info &&

          v.fsv_voucher_card_ui_info.int_min_spend_fsv_ui_only != null

        ) {

          let composed_discount_value =

            v.fsv_voucher_card_ui_info.composed_discount_value;

          let int_min_spend_fsv_ui_only =

            v.fsv_voucher_card_ui_info.int_min_spend_fsv_ui_only;

          let customised_labels = v.customised_labels;

          let customised_discount_text = v.customised_discount_text;

          terms = customised_discount_text;

          if (

            composed_discount_value !== null &&

            composed_discount_value !== undefined

          ) {

            composed_discount_value = Math.round(

              composed_discount_value / 100000000,

            );

            int_min_spend_fsv_ui_only = Math.round(

              int_min_spend_fsv_ui_only / 100000000,

            );

            terms = `MPVC giảm tối đa ${composed_discount_value}k từ ${int_min_spend_fsv_ui_only}k.`;

          } else {

            int_min_spend_fsv_ui_only = Math.round(

              int_min_spend_fsv_ui_only / 100000000,

            );

            let label = "";

            if (

              Array.isArray(customised_labels) &&

              customised_labels.length > 0

            ) {

              for (const lbl of customised_labels) {

                const content = lbl.content;

                if (content && content.includes("tối đa")) {

                  const mpvc = content;

                  terms = `MPVC giảm ${mpvc} từ ${int_min_spend_fsv_ui_only}k`;

                } else {

                  label += ` [${content}] -`;

                }

              }

              if (label) {

                label = label.slice(0, -1); // bỏ dấu - cuối

                terms = `MPVC từ ${int_min_spend_fsv_ui_only}k.${label}`;

              } else if (!terms) {

                terms = `MPVC từ ${int_min_spend_fsv_ui_only}k`;

              }

            } else {

              terms = `MPVC từ ${int_min_spend_fsv_ui_only}k`;

            }

          }

        } else if (

          v.fsv_voucher_card_ui_info &&

          v.fsv_voucher_card_ui_info.customised_discount_text

        ) {

          terms = `MPVC ${v.fsv_voucher_card_ui_info.customised_discount_text.toLowerCase().replace(/mpvc/gi, "")}`;

        }

        terms = terms.replace(/max\s*0k/gi, "k giới hạn");

        if (v.shop_id !== 0 && terms) {

          terms += v.product_limit ? " [Lọc sp]" : " [Toàn shop]";

        }



        let sub_text = v.sub_icon_text || "";

        if (sub_text === "Tất cả hình thức thanh toán") sub_text = "";

        (v.customised_labels || []).forEach((label) => {

          if (

            !sub_text.includes(label.content) &&

            label.content !== "Tất cả hình thức thanh toán"

          ) {

            sub_text += (sub_text ? " || " : "") + label.content;

          }

        });



        let segment = v.stream_rule?.streamer_user_segment || "";

        let stream_input_shop_id = "";

        let stream_shop_id = "";

        const usage_limit_per_user = v.usage_limit_per_user ?? 1;



        const streamRule = v.stream_rule || null;

        if (

          streamRule &&

          Array.isArray(streamRule.streamer_ids) &&

          streamRule.streamer_ids.length > 0

        ) {

          const streamerIds = streamRule.streamer_ids;



          for (const stid of streamerIds.slice(0, 5)) {

            const url = `https://banhang.shopee.vn/webchat/api/v1.2/mini/users/${stid}?need_cache=1&cache_expires=1800&_uid=0-1118491991&_v=8.0.4&x-shop-region=VN&_api_source=pcmall`;

            try {

              const res = await fetch(url, {

                method: "GET",

                headers: {

                  Accept: "*/*",

                  "Accept-Language": "en-US,en;q=0.9",

                  Authorization: `Bearer ${auth_login_token}`,

                },

              });



              if (!res.ok) continue;

              const decode = await res.json();



              if (decode && decode.shop_id) {

                const stream_shop_id = decode.shop_id;

                const useLink = `https://shopee.vn/shop/${stream_shop_id}`;

                const utmCampaign = new Date().toLocaleString("en-US", {

                  month: "short",

                });

                const utmContent = "telegramdeal";

                const preUrl = `?mmp_pid=an_an_17365130000&affiliate_id=17365130000&utm_source=an_17365130000&utm_medium=affiliates&utm_campaign=${utmCampaign}&utm_content=${utmContent}&af_siteid=an_17365130000&pid=affiliates&af_click_lookback=7d&af_viewthrough_lookback=1d&is_retargeting=true&af_reengagement_window=7d`;



                const dataPre = useLink.replace(

                  "https://shopee.vn/",

                  "https://shopee.vn/universal-link/",

                );

                const encodedUrl = encodeURIComponent(dataPre + preUrl);



                stream_input_shop_id += `<a href='https://s.shopee.vn/an_redir?origin_link=${encodedUrl}' target='_blank'>${stream_shop_id}</a> | `;

              }

            } catch (err) {

              console.error("Fetch exception:", err);

              continue;

            }

          }



          if (streamerIds.length > 5) {

            stream_input_shop_id += "Và nhiều shop khác nữa....";

          }



          stream_input_shop_id = stream_input_shop_id.replace(/ \|\s$/, "");

        }



        // Trả về object với cấu trúc chuẩn

        return {

          code: stableVoucherCode,

          promotion_id: v.promotionid,

          signature: v.signature,

          start_time: v.start_time,

          end_time: v.end_time,

          start_time_show: formatTime(v.start_time),

          end_time_show: formatTime(v.end_time),

          terms: terms,

          icon_hash: v.icon_hash || "",

          icon_text: v.icon_text || "",

          voucher_market_type: v.voucher_market_type || 1,

          sub_text: sub_text,

          fully_claimed: v.fully_claimed || false,

          percentage_claimed: v.percentage_claimed ?? 0,

          percentage_used: v.percentage_used ?? 0,

          use_link: `https://s.shopee.vn/an_redir?origin_link=${encodeURIComponent(`https://shopee.vn/universal-link/search?promotionId=${v.promotionid}&mmp_pid=an_an_17365130000&affiliate_id=17365130000&utm_source=an_17365130000&utm_medium=affiliates&utm_campaign=autocheckvoucher&utm_content=anmshopeevoucher&af_siteid=an_17365130000&pid=affiliates&af_click_lookback=7d&af_viewthrough_lookback=1d&is_retargeting=true&af_reengagement_window=7d`)}`,

          link_voucher: `https://shopee.vn/universal-link/search?voucherCode=${stableVoucherCode}&promotionId=${v.promotionid}&signature=${v.signature}`,

          segment: segment,

          stream_input_shop_id: stream_input_shop_id,

          shop_id: v.shop_id || 0,

          fully_used: v.fully_used || false,

          usage_limit_per_user: usage_limit_per_user,

        };

      }



      // =========================================================================

      //  LOGIC XỬ LÝ CHÍNH (ĐÃ SỬA ĐỔI)

      // =========================================================================



      const inputsToProcess = [

        ...data.numbers.map((n) => n.toString()),

        ...data.urls,

        ...data.texts,

      ];

      const voucherRequests = []; // Mảng mới để thu thập {promotionid, signature, voucherCode, input}



      if (inputsToProcess.length > 500) {

        showMultiVoucherMessage(

          `❌ Chỉ được phép xử lý tối đa 500 voucher mỗi lần.`,

          "error",

        );

        clearMultiVoucherResults();

        return;

      }



      // Bước 1: Thu thập thông tin cho tất cả inputs (giống cách cũ, nhưng không gọi getVoucherDetails)

      for (const input of inputsToProcess) {

        let info = detectInputType(input);

        if (!info) {

          // Không cần thêm vào kết quả vì API cũ cũng bỏ qua các input lỗi

          continue;

        }



        try {

          if (info.inputType === "voucherCode" && !info.promotionId) {

            const validated = await validateVoucherCode(info.voucherCode);

            if (validated) {

              info = { ...info, ...validated };

            } else {

              console.warn(

                `Không thể xác thực voucher code: ${info.voucherCode}`,

              );

              continue; // Bỏ qua nếu không xác thực được

            }

          }



          if (info.inputType === "promotionId" && !info.signature) {

            const signature = await getSignatureForPromotionID(

              info.promotionId,

            );

            if (signature) {

              info.signature = signature;

            } else {

              console.warn(

                `Không thể lấy signature cho promotionId: ${info.promotionId}`,

              );

              continue;

            }

          }



          // Chỉ thêm nếu có đủ promotionId và signature

          if (info.promotionId && info.signature) {

            voucherRequests.push({

              promotionid: info.promotionId,

              signature: info.signature,

              voucherCode: info.voucherCode || "",

              input: input,

            });

          }

        } catch (e) {

          console.error(`Lỗi khi xử lý input: ${input}`, e);

        }

      }



      const processedVouchers = [];



      if (voucherRequests.length === 0) {

        // Không có voucher hợp lệ

        const finalOutput = {

          error: true,

          message: "Không tìm thấy voucher hợp lệ",

          vouchers: [],

        };

        displayMultiVoucherResults(finalOutput);

        return;

      }



      // Bước 2: Xử lý theo batch hoặc single/fallback

      // let useBatch = voucherRequests.length > 1;

      let useBatch = true;

      let batchResult = null;



      if (useBatch) {

        // Thử batch

        const promotionInfos = voucherRequests.map((req) => ({

          promotionid: req.promotionid,

          signature: req.signature,

        }));

        batchResult = await batchGetVoucherDetails(promotionInfos);



        if (batchResult && batchResult.error === 90309999) {

          // Fallback về individual nếu error 90309999

          useBatch = false;

          console.log(

            "Batch failed with 90309999, falling back to individual calls",

          );

        } else if (batchResult && batchResult.error) {

          // Lỗi khác, fallback

          useBatch = false;

          console.log(

            "Batch failed with other error, falling back to individual calls",

          );

        }

      }



      if (useBatch && batchResult && batchResult.id_voucher_mappings) {

        // Batch thành công: Parse từ mappings

        const mappings = batchResult.id_voucher_mappings;

        for (const req of voucherRequests) {

          const mapping = mappings[req.promotionid];

          if (mapping) {

            // Chỉ lấy voucher hợp lệ (status: 1)

            const parsedVoucher = await parseToOriginalStructure(

              { voucher_basic_info: mapping },

              req.input,

              req.voucherCode || "",

            );

            if (parsedVoucher) {

              processedVouchers.push(parsedVoucher);

            }

          }

        }

        console.log(

          `Batch success: Processed ${processedVouchers.length}/${voucherRequests.length} vouchers`,

        );

      } else {

        // Single hoặc fallback: Gọi individual cho từng cái (giống cách cũ từ for loop)

        console.log("Using individual calls");

        for (const req of voucherRequests) {

          const details = await getVoucherDetails(

            req.promotionid,

            req.voucherCode,

            req.signature,

          );

          if (details) {

            const parsedVoucher = await parseToOriginalStructure(

              details,

              req.input,

              req.voucherCode || "",

            );

            if (parsedVoucher) {

              processedVouchers.push(parsedVoucher);

            }

          }

        }

      }



      // Tạo đối tượng output cuối cùng với cấu trúc chuẩn

      const finalOutput = {

        error: false,

        message: "Success",

        vouchers: processedVouchers,

      };



      // Gọi hàm hiển thị với dữ liệu đã được định dạng đúng

      displayMultiVoucherResults(finalOutput);

    }



    // Hàm rút gọn voucher code

    function shortenVoucherCode(code) {

      // Thêm kiểm tra để tránh lỗi nếu 'code' là undefined, null, hoặc không phải string

      if (typeof code !== "string" || !code) {

        return ""; // Trả về chuỗi rỗng hoặc giá trị mặc định khác

      }



      const match = code.match(/^([A-Z]+)-(\d+)$/);

      if (match && match[2] && match[2].length >= 3) {

        const prefix = match[1];

        const numbers = match[2];

        const lastThree = numbers.slice(-3);

        return `${prefix}..${lastThree}`;

      }

      return code;

    }



    // Hiển thị kết quả voucher

    function displayMultiVoucherResults(result) {

      const resultsContainer = document.getElementById("multiVoucherResults");

      const modeContainer = document.getElementById("modeSettingsContainer");

      const originalPasteButton = document.querySelector(

        ".multi-voucher-paste-bar",

      );



      if (result.error || !result.vouchers || result.vouchers.length === 0) {

        if (modeContainer) modeContainer.style.display = "none";

        resultsContainer.innerHTML = `

                                    <div class="multi-voucher-message warning">

                                        <i class="fas fa-exclamation-triangle"></i>

                                        <span>Không tìm thấy voucher nào cho dữ liệu đã nhập. Nếu là mã shop, bạn hãy gửi cả link mã nhé.</span>

                                    </div>

                                `;

        if (originalPasteButton) originalPasteButton.style.display = "flex";

        return;

      }



      if (originalPasteButton) originalPasteButton.style.display = "none";



      if (modeContainer) modeContainer.style.display = "block";

      updateAdvancedButtonsVisibility();

      let resultHTML = "";

      const isShopMode =

        window.voucherTypeToggle && window.voucherTypeToggle.checked;



      if (!isShopMode && result.vouchers.length > 0) {

        const buttonClass = window.isSpamMode

          ? "save-all-btn spam-mode"

          : "save-all-btn";

        const buttonText = window.isSpamMode

          ? '<i class="fas fa-rocket me-2"></i>Spam Lưu Voucher'

          : `<i class="fas fa-save me-2"></i>Lưu Tất Cả (${result.vouchers.length})`;



        resultHTML += `

                    <div class="actions-container" style="display: flex; justify-content: space-between; margin: 0 20px 15px 20px; gap: 8px;">

                        <button onclick="pasteFromClipboardMulti()" id="pasteDataBtn" style="flex: 1; padding: 8px 10px; font-size: 13px; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; text-align: center; white-space: nowrap;">

                            <i class="fas fa-paste me-1"></i>Paste Data

                        </button>

                        <div style="flex: 1; position: relative;">

                            <button class="${buttonClass}" onclick="saveAllVouchers()" id="saveAllBtn" style="width: 100%; padding: 8px 10px; font-size: 13px; margin: 0;">

                                ${buttonText}

                            </button>

                            <button class="stop-save-btn" onclick="stopSaveProcess()" id="stopSaveBtn" style="width: 100%; padding: 8px 10px; font-size: 13px; margin: 0; display: none; position: absolute; top: 0; left: 0;"><i class="fas fa-stop me-2"></i> Dừng Lưu</button>

                        </div>

                        <button  id="copyDataBtn" style="flex: 1; padding: 8px 10px; font-size: 13px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; text-align: center; white-space: nowrap;" onclick="copyAllVoucherCodes()">

                            <i class="fas fa-copy me-1"></i>Copy All (${result.vouchers.length})

                        </button>

                    </div>

                `;



        resultHTML += `

                                    <div class="save-all-container" style="margin: 0 20px 20px 20px; text-align: center;">

                                        <div class="save-progress" id="saveProgress">

                                            <div><strong>Đang lưu voucher...</strong></div>

                                            <div class="save-progress-bar"><div class="save-progress-fill" id="saveProgressFill"></div></div>

                                            <div id="saveProgressText">0/${result.vouchers.length}</div>

                                        </div>

                                    </div>`;

      }



      result.vouchers.forEach((voucher, index) => {

        const usagePercentage = voucher.percentage_used;

        const usageLimit = voucher.usage_limit_per_user;

        const claimedPercentage = voucher.percentage_claimed;

        let usageColor = "#16a34a";

        if (usagePercentage > 80) usageColor = "#dc2626";

        else if (usagePercentage > 50) usageColor = "#d97706";

        let claimedColor = "#16a34a";

        if (claimedPercentage > 80) claimedColor = "#dc2626";

        else if (claimedPercentage > 50) claimedColor = "#d97706";

        const backgroundVoucherInfoColor =

          voucher.voucher_market_type == 1

            ? voucher.code?.includes("FSV-")

              ? "#00bfa5"

              : "#F05132"

            : "#ffffff";



        let additionInfo = "";

        if (voucher.segment || voucher.stream_input_shop_id) {

          if (voucher.segment)

            additionInfo += `🔰 Phân khúc: ${voucher.segment}<br>`;

          if (voucher.stream_input_shop_id)

            additionInfo += `🔰 Shop áp dụng: ${voucher.stream_input_shop_id}<br>`;

        }

        console.log(voucher);



        const displayCode = shortenVoucherCode(voucher.code);

        const buttonClass = window.isSpamMode

          ? "voucher-save-btn spam-mode"

          : "voucher-save-btn";

        const buttonText = window.isSpamMode

          ? '<i class="fas fa-rocket me-1"></i>Spam lưu'

          : '<i class="fas fa-save me-1"></i>Lưu voucher';



        // --- SỬA LỖI HIỂN THỊ HSD ---

        let hsdHTML = "";

        if (voucher.start_time_show && voucher.end_time_show) {

          hsdHTML = `<div class="voucher-time-info">⏰ HSD: ${voucher.start_time_show} - ${voucher.end_time_show}</div>`;

        } else if (voucher.start_time_show) {

          hsdHTML = `<div class="voucher-time-info">⏰ HSD từ: ${voucher.start_time_show}</div>`;

        }



        resultHTML += `

                                    <div class="multi-voucher-item" data-voucher-index="${index}">

                                        ${

                                          voucher.icon_hash || voucher.icon_text

                                            ? `

                                            <a href='${voucher.link_voucher}' target='_blank' style='text-decoration:none;'>

                                                <div class="voucher-icon-container">

                                                    ${voucher.icon_hash ? `<img src="https://down-vn.img.susercontent.com/file/${voucher.icon_hash}" class="voucher-icon" alt="Voucher Icon" onerror="this.style.display='none'" style=" background-color: ${backgroundVoucherInfoColor};">` : ""}

                                                    ${voucher.icon_text ? `<div class="voucher-icon-text">${voucher.icon_text}</div>` : ""}

                                                </div>

                                            </a>`

                                            : ""

                                        }

                                        <div class="voucher-content">

                                            <div class="voucher-code-terms">

                                                <div class="multi-voucher-code" onclick="copyVoucherCodeMulti('${voucher.code}')" title="${voucher.code}">${displayCode}</div>

                                                <div class="multi-voucher-terms">${voucher.terms}</div>

                                            </div>

                                            ${additionInfo ? `<div class="voucher-addition-info">${additionInfo.trim()}</div>` : ""}

                                            <div class="voucher-usage-info">

                                                📊 Đã dùng: <span style="color: ${usageColor};">${voucher.percentage_used}% ${voucher.fully_used ? `<span style='color:red'>[Tối đa lượt dùng]</span>` : ""}</span> 

                                            </div>

                                            <div class="voucher-usage-info">

                                                🔖 Đã lưu: <span style="color: ${claimedColor};">${voucher.percentage_claimed}% ${voucher.fully_claimed ? `<span style='color:red'>[Tối đa lượt lưu]</span>` : ""}</span> 

                                            </div>

                                            ${usageLimit > 1 ? `<div class="voucher-usage-info">🔄 Dùng tối đa: <span style="color: #d06d32;">${usageLimit}</span></div>` : ""}

                                            ${hsdHTML} 

                                        </div>

                                        <div class="voucher-buttons-container">

                                            <div class="voucher-buttons">

                                                <button class="voucher-use-btn" onclick="openVoucherLinkMulti('${voucher.use_link}', event)">

                                                    <i class="fas fa-external-link-alt me-1"></i>Sử dụng

                                                </button>

                                                <button class="${buttonClass}" onclick="saveIndividualVoucher(${index})" id="saveBtn${index}">${buttonText}</button>

                                                <button class="voucher-link-btn-mobile" onclick="openVoucherLinkMulti('${voucher.link_voucher}', event)" id="linkBtn${index}">

                                                    <i class="fas fa-external-link-alt me-1"></i>Xem mã

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                `;

      });

      resultsContainer.innerHTML = resultHTML;

      window.currentVouchers = result.vouchers;

      window.savedVouchers = new Set();

      window.saveProcessStopped = false;

      window.giftcodeSaveStoppedBySpam90309999 = false;

      window.giftcodeMicrositeRequestCount = 0;

      window.giftcodeMicrositeStoppedByLimit = false;

      window.isSpamAllRunning = false;

      window.hasIndividualRunning = false;

      updateButtonsForSpamMode(window.isSpamMode);

    }



    // **HÀM MỚI: SAO CHÉP TẤT CẢ MÃ VOUCHER**

    function copyAllVoucherCodes() {

      if (!window.currentVouchers || window.currentVouchers.length === 0) {

        showCopyNotificationMulti("Không có voucher nào để copy.");

        return;

      }



      const voucherCodes = window.currentVouchers

        .map((v) => v.link_voucher)

        .join("\n");



      navigator.clipboard

        .writeText(voucherCodes)

        .then(() => {

          showCopyNotificationMulti(

            `Đã copy ${window.currentVouchers.length} link voucher!`,

          );

        })

        .catch((err) => {

          console.error("Lỗi khi sao chép mã voucher: ", err);

          // Fallback for older browsers

          const textArea = document.createElement("textarea");

          textArea.value = voucherCodes;

          textArea.style.position = "fixed";

          textArea.style.left = "-9999px";

          document.body.appendChild(textArea);

          textArea.focus();

          textArea.select();

          try {

            document.execCommand("copy");

            showCopyNotificationMulti(

              `Đã copy ${window.currentVouchers.length} mã voucher!`,

            );

          } catch (execErr) {

            console.error("Fallback copy failed: ", execErr);

            showCopyNotificationMulti("Lỗi: Không thể copy vào clipboard.");

          }

          document.body.removeChild(textArea);

        });

    }



    // Hàm ngủ

    function sleepANM(ms) {

      return new Promise((resolve) => setTimeout(resolve, ms));

    }



    // Hàm save voucher bằng code

    async function savebyANM_voucherCode(voucher_code_input, iteration) {

      let sout = "";

      let successfulVoucherCode = [];

      const send = `{"voucher_code":"${voucher_code_input}","need_user_voucher_status":true}`;

      try {

        const response = await fetch(

          "https://shopee.vn/api/v2/voucher_wallet/save_voucher",

          {

            method: "POST",

            headers: {

              authority: "shopee.vn",

              accept: "application/json",

              "accept-language": "en-US,en;q=0.9",

              "content-type": "application/json",

            },

            body: send,

          },

        );

        const resp = await response.json();

        const error = resp.error;

        if (error == 0 || error == 5) {

          const data = resp.data;

          const current = new Date();

          const time = current.toLocaleTimeString();

          const voucher = data.voucher;

          const voucher_code = voucher.voucher_code;

          const promotionid = voucher.promotionid;

          const signature = voucher.signature;

          const show_url =

            "https://shopee.vn/search?voucherCode=" +

            voucher_code +

            "&promotionId=" +

            promotionid +

            "&signature=" +

            signature;

          let terms = "";

          if (voucher.discount_percentage) {

            const discount_percentage = voucher.discount_percentage;

            const min_spend = voucher.min_spend / 100000000;

            const discountCapSource = [

              voucher.discount_cap,

              voucher.max_value,

              voucher.reward_cap,

            ].find(

              (value) => value !== null && value !== undefined && value !== "",

            );

            const discount_cap = Number(discountCapSource);

            if (Number.isFinite(discount_cap) && discount_cap > 0) {

              terms = ` giảm ${discount_percentage}%, max ${discount_cap / 100000000}k từ ${min_spend}k`;

            } else {

              terms = ` giảm ${discount_percentage}%, k giới hạn từ ${min_spend}k`;

            }

          } else if (voucher.discount_value) {

            const discount_value = voucher.discount_value / 100000000;

            const min_spend = voucher.min_spend / 100000000;

            terms = ` giảm ${discount_value}k từ ${min_spend}k`;

          }

          sout += `${time}: Lưu thành công <a href='${show_url}' target='_blank'>${voucher_code}</a> ${terms}.\n`;

          successfulVoucherCode.push(voucher_code);



          // Update PIP voucher status - success

          syncSaveLogToPiP();

        } else {

          if (resp.error === 19) {

            sout = "Kiểm tra lại login tài khoản và thử lại!";

          } else {

            const current = new Date();

            const time = current.toLocaleTimeString();

            const error_msg = resp.error_msg || "Lỗi không xác định";

            sout = `${time}: ${voucher_code_input} - ${error_msg}\n`;

            if (resp.data && resp.data.invalid_message_code) {

              const invalid_message_code = resp.data.invalid_message_code;

              if (

                invalid_message_code == 1 ||

                invalid_message_code == 2 ||

                invalid_message_code == 3

              ) {

                successfulVoucherCode.push(voucher_code_input);

              }

            }



            // Update PIP voucher status - failure

            const errorMsgStr = resp.error_msg || "Lỗi không xác định";

            syncSaveLogToPiP();

          }

        }

        let sleep_time = 270;

        if (iteration >= 20 && iteration < 40) sleep_time = 540;

        else if (iteration >= 40 && iteration < 60) sleep_time = 740;

        else if (iteration >= 60 && iteration < 100) sleep_time = 1000;

        await sleepANM(sleep_time);

        return {

          sout: sout

            .replaceAll(", max 0k", " không giới hạn")

            .replaceAll("..", "."),

          successfulVoucherCode,

        };

      } catch (error) {

        return {

          sout: `Lỗi khi save ${voucher_code_input}: ${error.message}\n`,

          successfulVoucherCode: [],

        };

      }

    }



    // Hàm save voucher bằng link (hàng loạt)

    async function savebyANM3(urls, iteration = 1) {

      let sout = "";

      const set_array = JSON.parse("[" + urls + "]");

      const details = new Map(

        set_array.map((item) => [

          item.promotion_id,

          {

            voucher_code: item.voucher_code,

            promotion_id: item.promotion_id,

            signature: item.signature,

          },

        ]),

      );

      let successfulItems = [];

      const attemptStatuses = [];

      try {

        const response = await fetch(

          "https://shopee.vn/api/v2/voucher_wallet/save_vouchers",

          {

            method: "POST",

            headers: {

              authority: "shopee.vn",

              accept: "application/json",

              "accept-language": "en-US,en;q=0.9",

              "content-type": "application/json",

            },

            body:

              '{"voucher_identifiers":[' +

              urls +

              '],"need_user_voucher_status":true}',

          },

        );

        const resp = await response.json();

        if (resp.error === 0) {

          for (const data of resp.responses) {

            const current = new Date();

            const time = current.toLocaleTimeString();

            if (data.error === 0 || data.error === 5) {

              if (data.data && data.data.voucher) {

                const voucher = data.data.voucher;

                const promotionid = voucher.promotionid;

                const set_details = details.get(promotionid);

                const show_url = `https://shopee.vn/search?voucherCode=${set_details.voucher_code}&promotionId=${promotionid}&signature=${set_details.signature}`;

                let terms = "";

                if (voucher.discount_percentage) {

                  const discount_percentage = voucher.discount_percentage;

                  const min_spend = voucher.min_spend / 100000000;

                  const discountCapSource = [

                    voucher.discount_cap,

                    voucher.max_value,

                    voucher.reward_cap,

                  ].find(

                    (value) =>

                      value !== null && value !== undefined && value !== "",

                  );

                  const discount_cap = Number(discountCapSource);

                  if (Number.isFinite(discount_cap) && discount_cap > 0) {

                    terms = ` giảm ${discount_percentage}%, max ${discount_cap / 100000000}k từ ${min_spend}k`;

                  } else {

                    terms = ` giảm ${discount_percentage}%, k giới hạn từ ${min_spend}k`;

                  }

                } else if (voucher.discount_value) {

                  const discount_value = voucher.discount_value / 100000000;

                  const min_spend = voucher.min_spend / 100000000;

                  terms = ` giảm ${discount_value}k từ ${min_spend}k`;

                }

                sout += `${time}: Lưu thành công <a href='${show_url}' target='_blank' style='text-decoration:none'>${voucher.voucher_code}</a> ${terms}.\n`;

                successfulItems.push(promotionid);

                attemptStatuses.push({

                  voucherCode: voucher.voucher_code,

                  message: "Lưu thành công.",

                  time,

                  promotionId: promotionid,

                  success: true,

                  source: "bookmark",

                });



                // Update PIP voucher status - success

                syncSaveLogToPiP();

              }

            } else {

              if (data.data && data.data.voucher) {

                const voucher = data.data.voucher;

                const promotionid = voucher.promotionid;

                const set_details = details.get(promotionid);

                const show_url = `https://shopee.vn/search?voucherCode=${set_details.voucher_code}&promotionId=${promotionid}&signature=${set_details.signature}`;

                sout += `${time}: <a href='${show_url}' target='_blank' style='text-decoration:none'>${voucher.voucher_code}</a> - ${data.error_msg}.\n`;

                attemptStatuses.push({

                  voucherCode: voucher.voucher_code,

                  message: data.error_msg || "Lỗi không xác định.",

                  time,

                  promotionId: promotionid,

                  success: false,

                  source: "bookmark",

                });

                if (data.data.invalid_message_code) {

                  const invalid_message_code = data.data.invalid_message_code;

                  if (

                    invalid_message_code == 1 ||

                    invalid_message_code == 2 ||

                    invalid_message_code == 3 ||

                    invalid_message_code == 10

                  ) {

                    // successfulItems.push(promotionid);

                  }

                }



                // Update PIP voucher status - failure

                const errorMsgStr = data.error_msg || "Lỗi không xác định";

                syncSaveLogToPiP();

              }

            }

          }

        } else if (resp.error === 19) {

          sout = "Kiểm tra lại login tài khoản và thử lại!";

        } else {

          sout = "Lỗi spam voucher. Hãy thử lại sau ít phút nhé!";

        }

        await sleepANM(220);

        return {

          sout: sout

            .replaceAll(", max 0k", " không giới hạn")

            .replaceAll("..", "."),

          successfulItems,

          attemptStatuses,

        };

      } catch (error) {

        return {

          sout: `Lỗi khi save hàng loạt: ${error.message}\n`,

          successfulItems: [],

          attemptStatuses: [],

        };

      }

    }

    // Spam save cho voucher đơn lẻ

    /**

     * Chức năng: Spam lưu cho một voucher đơn lẻ cho đến khi thành công hoặc bị dừng.

     * Cập nhật: Sửa đổi cách cập nhật text và trạng thái của nút bấm sau khi spam thành công.

     */

    async function spamSaveVoucher(voucher, index, delay) {

      window.pipLogs = [];

      // Đánh dấu process này đang chạy

      window.individualProcesses.set(index, false); // false = chưa bị yêu cầu dừng

      updateIndividualRunningState();



      const saveBtn = document.getElementById(`saveBtn${index}`);

      const saveLog = document.getElementById("saveLog");



      if (!saveBtn) {

        console.error(`Không tìm thấy nút lưu cho voucher tại index ${index}`);

        return;

      }



      if (saveLog.style.display === "none" || !saveLog.style.display) {

        saveLog.style.display = "block";

      }



      // Initialize PIP voucher tracking for single voucher

      // if (typeof initPiPVoucherTracking === "function") {

      //   initPiPVoucherTracking();

      // }



      let attemptCount = 0;

      const maxAttempts = window.spamSettings.maxAttempts;

      let isSuccess = false;

      let stopByManualSpam = false;

      const useGiftcodeMode = !!document.getElementById("giftcodeHeaderToggle")

        ?.checked;

      const compactMap = new Map();

      const startHeader = `<b>🚀 Bắt đầu spam lưu voucher ${voucher.code} (delay gốc: ${delay}ms)</b>\n`;

      const renderSingleSpamLog = (footer = "") => {

        const lines = [startHeader];

        const statuses = Array.from(compactMap.values()).map(

          (entry) =>

            `${entry.time}: ${entry.voucherCode} - ${entry.message} [${entry.tryCount}]`,

        );

        if (statuses.length) lines.push(...statuses);

        if (footer) lines.push("", footer);

        saveLog.innerHTML = lines.join("\n");

        saveLog.scrollTop = saveLog.scrollHeight;

      };

      renderSingleSpamLog();



      // Vòng lặp spam cho đến khi thành công, hết lần thử, hoặc bị dừng

      while (

        attemptCount < maxAttempts &&

        !isSuccess &&

        !window.individualProcesses.get(index)

      ) {

        attemptCount++;



        try {

          let result;

          if (useGiftcodeMode) {

            result = await saveByGiftcodeMicrosite(

              voucher.code,

              "giftcode_single",

            );

          } else if (

            voucher.code &&

            voucher.signature &&

            voucher.promotion_id

          ) {

            // Ưu tiên lưu theo URL nếu có đủ thông tin

            const voucherData = JSON.stringify({

              promotion_id: voucher.promotion_id,

              voucher_code: voucher.code,

              signature: voucher.signature,

              signature_source: 0,

            });

            result = await savebyANM3(voucherData, attemptCount);

          } else {

            result = await savebyANM_voucherCode(voucher.code, attemptCount);

          }



          const now = new Date().toLocaleTimeString();

          let message = "Lỗi không xác định.";

          if (result?.attemptStatus?.message) {

            message = result.attemptStatus.message;

            if (result.attemptStatus.stopManualDueToSpam) {

              stopByManualSpam = true;

            }

          } else if (Array.isArray(result.attemptStatuses)) {

            const matchedStatus = result.attemptStatuses.find(

              (s) =>

                String(s?.voucherCode || "").toUpperCase() ===

                String(voucher.code || "").toUpperCase(),

            );

            if (matchedStatus?.message) {

              message = matchedStatus.message;

            }

          } else if (

            result.successfulVoucherCode &&

            result.successfulVoucherCode.length > 0

          ) {

            message = "Lưu thành công.";

          } else if (typeof result.sout === "string" && result.sout.trim()) {

            const plain = result.sout

              .replace(/<[^>]*>/g, "")

              .split("\n")

              .map((s) => s.trim())

              .filter(Boolean);

            if (plain.length) {

              const latestLine = plain[plain.length - 1];

              const idx = latestLine.indexOf(" - ");

              message = idx >= 0 ? latestLine.slice(idx + 3) : latestLine;

            }

          }

          compactMap.set(voucher.code, {

            voucherCode: voucher.code,

            message,

            time: now,

            tryCount: attemptCount,

          });

          renderSingleSpamLog();



          // Kiểm tra kết quả thành công

          if (

            result.successfulCode ||

            (result.successfulItems && result.successfulItems.length > 0) ||

            (result.successfulVoucherCode &&

              result.successfulVoucherCode.length > 0)

          ) {

            isSuccess = true;

            window.savedVouchers.add(voucher.code);



            // CẬP NHẬT NÚT BẤM KHI THÀNH CÔNG

            saveBtn.innerHTML = '<i class="fas fa-check me-1"></i>Đã lưu';

            saveBtn.style.background = "#10b981"; // Màu xanh lá

            saveBtn.disabled = true;



            renderSingleSpamLog(

              `✅ Spam voucher ${voucher.code} thành công sau ${attemptCount} lần thử.`,

            );

            break; // Thoát vòng lặp khi đã thành công

          }

          if (stopByManualSpam) {

            break;

          }

        } catch (error) {

          console.error(`Lỗi khi spam voucher ${voucher.code}:`, error);

          compactMap.set(voucher.code, {

            voucherCode: voucher.code,

            message: `Lỗi khi spam: ${error.message}`,

            time: new Date().toLocaleTimeString(),

            tryCount: attemptCount,

          });

          renderSingleSpamLog();

        }



        // Nếu chưa thành công và chưa bị dừng, đợi delay

        if (

          !isSuccess &&

          !window.individualProcesses.get(index) &&

          attemptCount < maxAttempts

        ) {

          const dynamicDelay = getAdaptiveSpamDelay(delay, attemptCount + 1);

          await sleepANM(dynamicDelay);

        }

      }



      // --- Dọn dẹp sau khi vòng lặp kết thúc ---

      const wasStoppedByUser = window.individualProcesses.get(index);

      window.individualProcesses.delete(index);

      updateIndividualRunningState();



      if (wasStoppedByUser) {

        // Reset về trạng thái bình thường nếu bị người dùng dừng

        if (window.isSpamMode) {

          saveBtn.innerHTML = '<i class="fas fa-rocket me-1"></i>Spam lưu';

          saveBtn.classList.add("spam-mode");

        } else {

          saveBtn.innerHTML = '<i class="fas fa-save me-1"></i>Lưu voucher';

          saveBtn.classList.remove("spam-mode");

        }

        saveBtn.style.background = ""; // Reset màu nền

        saveBtn.disabled = false;

        renderSingleSpamLog(

          `🛑 Spam voucher ${voucher.code} đã bị dừng sau ${attemptCount} lần thử.`,

        );

      } else if (!isSuccess) {

        // Cập nhật nút bấm khi thất bại sau khi đã thử hết số lần

        saveBtn.innerHTML = '<i class="fas fa-times me-1"></i>Thất bại';

        saveBtn.style.background = "#dc2626"; // Màu đỏ

        saveBtn.disabled = false; // Cho phép thử lại

        if (!stopByManualSpam) {

          renderSingleSpamLog(

            `❌ Spam voucher ${voucher.code} thất bại sau ${attemptCount} lần thử.`,

          );

        }

      }



      saveLog.scrollTop = saveLog.scrollHeight;

    }



    // Normal save cho voucher đơn lẻ

    async function normalSaveVoucher(voucher, index) {

      const saveBtn = document.getElementById(`saveBtn${index}`);

      const saveLog = document.getElementById("saveLog");

      const useGiftcodeMode = !!document.getElementById("giftcodeHeaderToggle")

        ?.checked;

      saveBtn.disabled = true;

      saveBtn.innerHTML =

        '<i class="fas fa-spinner fa-spin me-1"></i>Đang lưu...';

      if (saveLog.style.display === "none" || !saveLog.style.display) {

        saveLog.style.display = "block";

      }

      try {

        let result;

        if (useGiftcodeMode) {

          result = await saveByGiftcodeMicrosite(

            voucher.code,

            "giftcode_single",

          );

        } else if (voucher.code && voucher.signature && voucher.promotionid) {

          const voucherData = `{"promotion_id":${voucher.promotionid},"voucher_code":"${voucher.code}","signature":"${voucher.signature}","signature_source":0}`;

          result = await savebyANM3(voucherData);

        } else {

          result = await savebyANM_voucherCode(voucher.code, 1);

        }

        if (result.sout) {

          saveLog.innerHTML += result.sout;

          // updatePiPLog(result.sout);

          saveLog.scrollTop = saveLog.scrollHeight;

          syncSaveLogToPiP();

        }

        if (

          result.successfulCode ||

          result.successfulItems?.length > 0 ||

          result.successfulVoucherCode?.length > 0

        ) {

          window.savedVouchers.add(voucher.code);

          saveBtn.innerHTML = '<i class="fas fa-check me-1"></i>Đã lưu';

          saveBtn.style.background = "#9ca3af";

          showMultiVoucherMessage(

            `✅ Đã lưu thành công voucher ${voucher.code}`,

            "success",

          );

        } else {

          saveBtn.disabled = false;

          saveBtn.innerHTML = '<i class="fas fa-save me-1"></i>Lưu voucher';

          showMultiVoucherMessage(

            `❌ Lỗi khi lưu voucher ${voucher.code}`,

            "error",

          );

        }

      } catch (error) {

        saveBtn.disabled = false;

        saveBtn.innerHTML = '<i class="fas fa-save me-1"></i>Lưu voucher';

        showMultiVoucherMessage(

          `❌ Lỗi khi lưu voucher ${voucher.code}: ${error.message}`,

          "error",

        );

        saveLog.innerHTML += `Lỗi khi lưu ${voucher.code}: ${error.message}\n`;

        saveLog.scrollTop = saveLog.scrollHeight;

        syncSaveLogToPiP();

      }

    }

    // Hàm save voucher đơn lẻ

    async function saveIndividualVoucher(index) {

      window.saveProcessStopped = false;

      window.giftcodeSaveStoppedBySpam90309999 = false;

      window.giftcodeMicrositeRequestCount = 0;

      window.giftcodeMicrositeStoppedByLimit = false;

      const voucher = window.currentVouchers[index];

      if (!voucher) return;



      if (

        window.isSpamAllRunning ||

        (window.hasIndividualRunning && !window.individualProcesses.has(index))

      ) {

        showMultiVoucherMessage(

          "❌ Một quá trình lưu khác đang chạy.",

          "error",

        );

        return;

      }



      if (window.isSpamMode) {

        const delay = validateGlobalSpamDelay();

        await spamSaveVoucher(voucher, index, delay);

      } else {

        const saveBtn = document.getElementById(`saveBtn${index}`);

        const saveLog = document.getElementById("saveLog");

        const useGiftcodeMode = !!document.getElementById(

          "giftcodeHeaderToggle",

        )?.checked;

        if (!saveBtn || saveBtn.disabled) return;



        if (

          saveLog &&

          (saveLog.style.display === "none" || !saveLog.style.display)

        ) {

          saveLog.style.display = "block";

        }

        if (saveLog) {

          saveLog.innerHTML = `<b>💾 Bắt đầu lưu voucher ${voucher.code}</b>\n\n`;

        }



        saveBtn.disabled = true;

        saveBtn.innerHTML =

          '<i class="fas fa-spinner fa-spin me-1"></i>Đang lưu...';



        let result;

        let isSuccess = false;

        let logMessage = "";



        try {

          if (useGiftcodeMode) {

            result = await saveByGiftcodeMicrosite(

              voucher.code,

              "giftcode_single",

            );

            if (result?.successfulCode) {

              isSuccess = true;

            }

            if (result?.attemptStatus?.message) {

              logMessage = result.attemptStatus.message;

            }

          } else if (

            voucher.code &&

            voucher.signature &&

            voucher.promotion_id

          ) {

            // Ưu tiên lưu theo URL nếu đủ thông tin

            const voucherObject = {

              promotion_id: voucher.promotion_id,

              voucher_code: voucher.code,

              signature: voucher.signature,

              signature_source: 0,

            };

            // Chuyển đối tượng thành chuỗi JSON, không có dấu ngoặc mảng

            const voucherDataString = JSON.stringify(voucherObject);



            result = await savebyANM3(voucherDataString);



            if (

              result &&

              Array.isArray(result.successfulItems) &&

              result.successfulItems.includes(voucher.promotion_id)

            ) {

              isSuccess = true;

            }

          } else {

            // Fallback về lưu theo code nếu thiếu thông tin

            result = await savebyANM_voucherCode(voucher.code, 1);

            if (

              result.successfulVoucherCode &&

              result.successfulVoucherCode.length > 0

            ) {

              isSuccess = true;

            }

          }



          if (isSuccess) {

            window.savedVouchers.add(voucher.code);

            saveBtn.innerHTML = '<i class="fas fa-check me-1"></i>Đã lưu';

            saveBtn.style.background = "#10b981"; // Màu xanh

            saveBtn.disabled = true;

            if (saveLog) {

              if (Array.isArray(result?.attemptStatuses)) {

                const status = result.attemptStatuses.find(

                  (s) =>

                    String(s?.voucherCode || "").toUpperCase() ===

                    String(voucher.code || "").toUpperCase(),

                );

                if (status?.message) logMessage = status.message;

              }

              if (!logMessage) logMessage = "Lưu thành công.";

              saveLog.innerHTML += `${new Date().toLocaleTimeString()}: ${voucher.code} - ${logMessage} [1]\n`;

              saveLog.scrollTop = saveLog.scrollHeight;

              syncSaveLogToPiP();

            }

          } else {

            saveBtn.innerHTML = '<i class="fas fa-times me-1"></i>Thất bại';

            saveBtn.style.background = "#dc2626"; // Màu đỏ

            saveBtn.disabled = false;

            if (saveLog) {

              if (Array.isArray(result?.attemptStatuses)) {

                const status = result.attemptStatuses.find(

                  (s) =>

                    String(s?.voucherCode || "").toUpperCase() ===

                    String(voucher.code || "").toUpperCase(),

                );

                if (status?.message) logMessage = status.message;

              }

              if (!logMessage && typeof result?.sout === "string") {

                const plain = result.sout

                  .replace(/<[^>]*>/g, "")

                  .split("\n")

                  .map((s) => s.trim())

                  .filter(Boolean);

                if (plain.length) {

                  const latestLine = plain[plain.length - 1];

                  const idx = latestLine.indexOf(" - ");

                  logMessage =

                    idx >= 0 ? latestLine.slice(idx + 3) : latestLine;

                }

              }

              if (!logMessage) logMessage = "Lưu thất bại.";

              saveLog.innerHTML += `${new Date().toLocaleTimeString()}: ${voucher.code} - ${logMessage} [1]\n`;

              saveLog.scrollTop = saveLog.scrollHeight;

              syncSaveLogToPiP();

            }

          }

        } catch (error) {

          console.error("Lỗi khi lưu voucher đơn lẻ:", error);

          saveBtn.innerHTML = '<i class="fas fa-times me-1"></i>Lỗi';

          saveBtn.style.background = "#dc2626";

          saveBtn.disabled = false;

          if (saveLog) {

            saveLog.innerHTML += `${new Date().toLocaleTimeString()}: ${voucher.code} - Lỗi khi lưu: ${error.message} [1]\n`;

            saveLog.scrollTop = saveLog.scrollHeight;

            syncSaveLogToPiP();

          }

        }

      }

    }

    // Hàm mới: Lưu voucher bằng API platform (nhập tay)

    async function saveByPlatform(code, source = "manual") {

      let sout = "";

      let successfulCode = null;

      let attemptStatus = null;



      try {

        const response = await fetch(

          "https://shopee.vn/api/v2/voucher_wallet/save_platform_voucher_by_voucher_code",

          {

            headers: {

              accept: "application/json",

              "accept-language": "en-US,en;q=0.9,vi;q=0.8,ar;q=0.7,id;q=0.6",

              "content-type": "application/json",

              "x-csrftoken": getCsrfTokenForSave(),

            },

            referrer: "https://shopee.vn/checkout",

            body: JSON.stringify({ voucher_code: code }),

            method: "POST",

            mode: "cors",

            credentials: "include",

          },

        );



        const resp = await response.json();

        const current = new Date();

        const time = current.toLocaleTimeString();



        // Kiểm tra error != 0 thì dừng

        if (resp.error !== 0) {

          const isManualBlockedBySpam = resp.error === 76100003;

          const manualStopMessage = "Dừng lưu tay do dính spam";

          sout = isManualBlockedBySpam

            ? `${time}: ${code} - ${manualStopMessage}\n`

            : `${time}: ❌ [API Error] Mã ${code} gặp lỗi (error=${resp.error}).\n`;

          attemptStatus = {

            voucherCode: code,

            message: isManualBlockedBySpam

              ? manualStopMessage

              : `[API Error] ${resp.error}`,

            time,

            success: false,

            source,

            stopManualDueToSpam: isManualBlockedBySpam,

          };

          return { sout, successfulCode: null, attemptStatus };

        }



        // error == 0, kiểm tra invalid_message_code

        const invalidCode = resp.data?.invalid_message_code;

        const messageMap = {

          0: "Lưu thành công",

          1: "Đã lưu voucher này.",

          2: "Voucher không hợp lệ hoặc không còn hiệu lực",

          3: "Voucher này đã hết hạn sử dụng",

          4: "Voucher này đã hết lượt sử dụng",

          5: "Bạn chưa đạt đủ điều kiện để sử dụng voucher này",

          6: "Thời gian sử dụng của voucher này chưa bắt đầu",

          7: "Giá trị tối thiểu của đơn chưa đạt đủ điều kiện.",

          8: "Không thể tìm thấy mã voucher này",

          10: "Voucher này hiện chưa thể lưu",

        };



        const message =

          messageMap[invalidCode] ||

          (Number.isFinite(invalidCode)

            ? `Trạng thái không xác định (invalid_message_code=${invalidCode})`

            : resp.error_msg || "Trạng thái không xác định");



        // Chỉ coi là thành công khi invalidCode = 0 hoặc 1

        if (invalidCode === 0 || invalidCode === 1) {

          successfulCode = code;

          sout = `${time}: <strong>${code}</strong> - ${message}\n`;

          attemptStatus = {

            voucherCode: code,

            message,

            time,

            success: true,

            source,

          };



          // Update PIP voucher status - success

          syncSaveLogToPiP();

        } else {

          sout = `${time}: <strong>${code}</strong> - ${message}\n`;

          attemptStatus = {

            voucherCode: code,

            message,

            time,

            success: false,

            source,

          };



          // Update PIP voucher status - failure

          syncSaveLogToPiP();

        }



        return { sout, successfulCode, attemptStatus };

      } catch (error) {

        const current = new Date();

        const time = current.toLocaleTimeString();

        sout = `${time}: ❌ Lỗi khi lưu ${code}: ${error.message}\n`;

        attemptStatus = {

          voucherCode: code,

          message: `Lỗi khi lưu: ${error.message}`,

          time,

          success: false,

          source,

        };

        return { sout, successfulCode: null, attemptStatus };

      }

    }



    function escapeHtmlMulti(value) {

      return String(value ?? "")

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

    }



    function buildUncheckedVoucherCodesLine(codes) {

      const uniqueCodes = Array.from(

        new Set(

          (codes || []).map((item) => item?.code || item).filter(Boolean),

        ),

      );

      window.uncheckedVoucherCodesMulti = uniqueCodes;

      if (uniqueCodes.length === 0) return "";



      const displayCodes = uniqueCodes.slice(0, 30).map(escapeHtmlMulti);

      const suffix = uniqueCodes.length > 30 ? ", ..." : "";

      return `\nCác mã chưa kiểm tra: ${displayCodes.join(", ")}${suffix} <button type="button" title="Copy toàn bộ mã chưa kiểm tra" onclick="copyUncheckedVoucherCodesMulti()" style="border:0;background:transparent;cursor:pointer;font-size:14px;padding:0 3px;vertical-align:baseline;">📋</button>\n`;

    }



    function copyUncheckedVoucherCodesMulti() {

      const codes = window.uncheckedVoucherCodesMulti || [];

      if (codes.length === 0) {

        showCopyNotificationMulti("Không có mã chưa kiểm tra để copy.");

        return;

      }

      const text = codes.join("\n");

      navigator.clipboard

        .writeText(text)

        .then(() => {

          showCopyNotificationMulti(

            `Đã copy ${codes.length} mã chưa kiểm tra!`,

          );

        })

        .catch(() => {

          const textArea = document.createElement("textarea");

          textArea.value = text;

          document.body.appendChild(textArea);

          textArea.select();

          document.execCommand("copy");

          document.body.removeChild(textArea);

          showCopyNotificationMulti(

            `Đã copy ${codes.length} mã chưa kiểm tra!`,

          );

        });

    }



    // Hàm save voucher bằng API v2/voucher_wallet/save_voucher (Giftcode mode)

    async function saveByGiftcodeMicrosite(code, source = "giftcode") {

      let sout = "";

      let successfulCode = null;

      let attemptStatus = null;



      try {

        if (

          window.giftcodeMicrositeStoppedByLimit &&

          window.saveProcessStopped === false

        ) {

          window.giftcodeMicrositeRequestCount = 0;

          window.giftcodeMicrositeStoppedByLimit = false;

        }



        const micrositeLimit =

          Number(window.giftcodeMicrositeRequestLimit) || 1000;

        const micrositeCount =

          Number(window.giftcodeMicrositeRequestCount) || 0;

        if (micrositeCount >= micrositeLimit) {

          const time = new Date().toLocaleTimeString();

          window.saveProcessStopped = true;

          window.giftcodeMicrositeStoppedByLimit = true;

          sout = `${time}: 🛑 Đã đạt giới hạn ${micrositeLimit} request. Tự động dừng.\n`;

          attemptStatus = {

            voucherCode: code,

            message: `Đã đạt giới hạn ${micrositeLimit} request, tự động dừng`,

            time,

            success: false,

            source,

          };

          return { sout, successfulCode, attemptStatus };

        }

        window.giftcodeMicrositeRequestCount = micrositeCount + 1;



        const sendBody = JSON.stringify({

          voucher_code: code,

          need_user_voucher_status: true,

        });



        const response = await fetch(

          "https://shopee.vn/api/v2/voucher_wallet/save_voucher",

          {

            headers: {

              accept: "application/json",

              "accept-language": "en-US,en;q=0.9,vi;q=0.8,ar;q=0.7,id;q=0.6",

              "content-type": "application/json",

              "x-csrftoken": getCsrfTokenForSave(),

            },

            referrer: "https://shopee.vn/",

            body: sendBody,

            method: "POST",

            mode: "cors",

            credentials: "include",

          },

        );



        const resp = await response.json();

        const current = new Date();

        const time = current.toLocaleTimeString();



        // error=0 hoặc error=5 đều tính là thành công (5 là đã lưu)

        if (resp.error === 0 || resp.error === 5) {

          successfulCode = code;

          let terms = "";

          if (resp.data && resp.data.voucher) {

            terms = formatVoucherTerms(resp.data.voucher);

          }

          const termsDisplay = terms ? ` ${terms}` : "";



          sout = `${time}: <i class="fas fa-check-circle" style="color:#10b981; margin-right: 4px;"></i><strong style="color:#10b981">${code}</strong>${termsDisplay}\n`;

          attemptStatus = {

            voucherCode: code,

            message: `Lưu thành công${termsDisplay}`,

            time,

            success: true,

            source,

          };



          // Update PIP voucher status - success

          syncSaveLogToPiP();



          return { sout, successfulCode, attemptStatus };

        }



        if (resp.error === 90309999) {

          const spamMessage =

            "Bạn dính lỗi spam, vui lòng thử lại sau ít nhất 15 phút";

          window.saveProcessStopped = true;

          window.giftcodeSaveStoppedBySpam90309999 = true;

          showMultiVoucherMessage(spamMessage, "error");

          sout = `${time}: 🛑 <strong style="color:#dc2626">${spamMessage}</strong>\n`;

          attemptStatus = {

            voucherCode: code,

            message: spamMessage,

            time,

            success: false,

            source,

            stopSaveDueToSpam90309999: true,

          };

          syncSaveLogToPiP();

          return { sout, successfulCode: null, attemptStatus };

        }



        // error != 0 và != 5 → thất bại

        const isManualBlockedBySpam = resp.error === 76100003;

        const manualStopMessage = "Dừng lưu tay do dính spam";

        let errorMsg = resp.error_msg || "Lỗi không xác định";

        if (isManualBlockedBySpam) {

          window.saveProcessStopped = true;

        }



        // Xử lý rút gọn lỗi 10000

        if (resp.error === 10000) {

          if (errorMsg.includes("invalid voucher_code")) {

            errorMsg = "Mã không hợp lệ hoặc không tồn tại";

          } else {

            errorMsg = `Lỗi hệ thống (${resp.error})`;

          }

        }



        sout = isManualBlockedBySpam

          ? `${time}: ${code} - ${manualStopMessage}\n`

          : `${time}: ❌<strong style="color:#dc2626">${code}</strong> - ${errorMsg}\n`;

        attemptStatus = {

          voucherCode: code,

          message: isManualBlockedBySpam ? manualStopMessage : errorMsg,

          time,

          success: false,

          source,

          stopManualDueToSpam: isManualBlockedBySpam,

        };



        // Update PIP voucher status - failure

        syncSaveLogToPiP();



        return { sout, successfulCode: null, attemptStatus };

      } catch (error) {

        const current = new Date();

        const time = current.toLocaleTimeString();

        sout = `${time}: ❌ <strong style="color:#dc2626">${code}</strong> - Lỗi khi lưu: ${error.message}\n`;

        attemptStatus = {

          voucherCode: code,

          message: `Lỗi khi lưu: ${error.message}`,

          time,

          success: false,

          source,

        };



        // Update PIP voucher status - exception

        syncSaveLogToPiP();



        return { sout, successfulCode: null, attemptStatus };

      }

    }



    // Helper function để lấy CSRF token

    function getCsrfTokenForSave() {

      const cookies = document.cookie.split(";");

      for (let cookie of cookies) {

        const parts = cookie.trim().split("=");

        if (parts[0] === "csrftoken") return parts[1];

      }

      return "tNYxDPWMcynJ4cDRQuvbNk1Cj9PzqrBr"; // fallback

    }



    // Spam save tất cả voucher

    async function spamSaveAllVouchers(delay) {

      if (typeof window.clearPiPLogs === "function") {

        window.clearPiPLogs("Multi Voucher Search");

      }

      const saveAllBtn = document.getElementById("saveAllBtn");

      const stopSaveBtn = document.getElementById("stopSaveBtn");

      const saveProgress = document.getElementById("saveProgress");

      const saveProgressFill = document.getElementById("saveProgressFill");

      const saveProgressText = document.getElementById("saveProgressText");

      const saveLog = document.getElementById("saveLog");



      // Kiểm tra element tồn tại

      if (!saveAllBtn || !stopSaveBtn || !saveProgress || !saveLog) {

        console.error("Không tìm thấy các element cần thiết");

        return;

      }



      if (saveLog.style.display === "none" || !saveLog.style.display) {

        saveLog.style.display = "block";

      }



      // --- Reset trạng thái trước khi bắt đầu ---

      window.saveProcessStopped = false;

      window.giftcodeSaveStoppedBySpam90309999 = false;

      window.giftcodeMicrositeRequestCount = 0;

      window.giftcodeMicrositeStoppedByLimit = false;

      window.isSpamAllRunning = false; // ĐẶT FALSE TRƯỚC



      const isGiftcodeMode = !!document.getElementById("giftcodeHeaderToggle")

        ?.checked;

      const baseVouchers = isGiftcodeMode

        ? getGiftCodesFromRawInput()

        : [...window.currentVouchers];

      const totalCount = baseVouchers.length;

      if (totalCount === 0) {

        showMultiVoucherMessage(

          isGiftcodeMode

            ? "❌ Giftcode mode: không tìm thấy mã hợp lệ từ input."

            : "❌ Không có voucher nào để spam lưu.",

          "error",

        );

        return;

      }

      const compactLogMap = new Map();

      const startHeader = `<b>🚀 Bắt đầu spam lưu tất cả ${totalCount} vouchers với delay gốc ${delay}ms${isGiftcodeMode ? " (Giftcode mode)" : ""}</b>`;

      let confirmHeader = "";

      let requestCount = 0;



      const renderCompactSpamLog = () => {

        const lines = [startHeader];

        if (confirmHeader) lines.push("", confirmHeader);

        const compactEntries = Array.from(compactLogMap.values());

        const voucherLines = compactEntries

          .filter((entry) => !entry.rawHtml)

          .map(

            (entry) =>

              `${entry.time}: ${entry.success ? "✅" : "❌"} ${entry.voucherCode} - ${entry.message} [${entry.tryCount}]`,

          )

          .sort((a, b) => a.localeCompare(b, "vi"));

        if (voucherLines.length) {

          lines.push(...voucherLines);

        }

        const rawLines = compactEntries

          .filter((entry) => entry.rawHtml)

          .map((entry) => entry.message);

        if (rawLines.length) {

          lines.push(...rawLines);

        }

        saveLog.innerHTML = lines.join("\n");

        saveLog.scrollTop = saveLog.scrollHeight;

        syncSaveLogToPiP();

      };



      // Khi bật "Thêm spam nhập tay", coi như user đã xác nhận sẵn

      const useDualSave =

        !isGiftcodeMode && !!window.spamSettings.enableDualSaveConfirm;

      if (isGiftcodeMode) {

        confirmHeader = "🎁 Giftcode: Chỉ lưu bằng nhập tay";

      } else if (useDualSave) {

        confirmHeader = "✅ User chọn: Lưu song song cả bookmark và nhập tay";

      } else {

        confirmHeader = "ℹ️ Chỉ lưu theo bookmark";

      }

      confirmHeader = "";

      renderCompactSpamLog();



      // ===== SAU KHI HỎI USER XONG, MỚI SETUP UI VÀ BẬT FLAG =====

      window.isSpamAllRunning = true; // BẬT FLAG Ở ĐÂY

      saveAllBtn.style.display = "none";

      stopSaveBtn.style.display = "block";

      saveProgress.style.display = "block";

      updateIndividualButtons();



      // Initialize PIP voucher tracking for batch save

      // if (typeof initPiPVoucherTracking === "function") {

      //   initPiPVoucherTracking();

      // }



      // Danh sách các voucher cần spam

      let vouchersToSpam = [...baseVouchers];

      let attemptCount = 0;

      let manualSaveBlocked = false;



      try {

        while (

          vouchersToSpam.length > 0 &&

          !window.saveProcessStopped &&

          attemptCount < window.spamSettings.maxAttempts

        ) {

          attemptCount++;



          let remainingVouchersAfterLoop = [];



          if (isGiftcodeMode) {

            for (let i = 0; i < vouchersToSpam.length; i++) {

              if (window.saveProcessStopped) break;

              const voucher = vouchersToSpam[i];

              requestCount++;

              const platformResult = await saveByGiftcodeMicrosite(

                voucher.code,

                "giftcode",

              );



              if (platformResult.attemptStatus?.voucherCode) {

                const status = platformResult.attemptStatus;

                const sourceKey = status.source || "giftcode";

                compactLogMap.set(`${status.voucherCode}::${sourceKey}`, {

                  voucherCode: status.voucherCode,

                  message: status.message || "Đang xử lý...",

                  time: status.time || new Date().toLocaleTimeString(),

                  tryCount: attemptCount,

                  success: status.success,

                });

                if (status.stopManualDueToSpam) {

                  manualSaveBlocked = true;

                  const uncheckedCodes = vouchersToSpam

                    .slice(i)

                    .map((item) => item.code);

                  compactLogMap.set("__unchecked_giftcode_spam__", {

                    message: buildUncheckedVoucherCodesLine(uncheckedCodes),

                    rawHtml: true,

                  });

                }

                if (status.stopSaveDueToSpam90309999) {

                  manualSaveBlocked = true;

                  const uncheckedCodes = vouchersToSpam

                    .slice(i)

                    .map((item) => item.code);

                  compactLogMap.set("__unchecked_giftcode_spam__", {

                    message: buildUncheckedVoucherCodesLine(uncheckedCodes),

                    rawHtml: true,

                  });

                }

              }



              if (manualSaveBlocked) {

                break;

              }



              if (platformResult.successfulCode) {

                window.savedVouchers.add(voucher.code);

                const voucherIndex = window.currentVouchers.findIndex(

                  (v) => v.code === voucher.code,

                );

                const saveBtn = document.getElementById(

                  `saveBtn${voucherIndex}`,

                );

                if (saveBtn && !saveBtn.disabled) {

                  saveBtn.innerHTML = '<i class="fas fa-check me-1"></i>Đã lưu';

                  saveBtn.style.background = "#10b981";

                  saveBtn.disabled = true;

                }

              } else {

                remainingVouchersAfterLoop.push(voucher);

              }



              if (!window.saveProcessStopped && i < vouchersToSpam.length - 1) {

                const nextDelay = getAdaptiveSpamDelay(delay, requestCount + 1);

                await sleepANM(nextDelay);

              }

            }



            vouchersToSpam = remainingVouchersAfterLoop;

            updateSaveProgress(

              window.savedVouchers.size,

              totalCount,

              saveProgressFill,

              saveProgressText,

            );

            renderCompactSpamLog();



            if (manualSaveBlocked) {

              break;

            }



            if (vouchersToSpam.length > 0 && !window.saveProcessStopped) {

              const nextDelay = getAdaptiveSpamDelay(delay, requestCount + 1);

              await sleepANM(nextDelay);

            }

            continue;

          }



          // 1. Xử lý các voucher có đủ thông tin (URL-like)

          const urlVouchersInLoop = vouchersToSpam.filter(

            (v) => v.code && v.signature && v.promotion_id,

          );

          if (urlVouchersInLoop.length > 0 && !window.saveProcessStopped) {

            const unique = Array.from(

              new Map(

                urlVouchersInLoop.map((v) => [v.promotion_id, v]),

              ).values(),

            );



            const urlsString = unique

              .map((v) =>

                JSON.stringify({

                  promotion_id: v.promotion_id,

                  voucher_code: v.code,

                  signature: v.signature,

                  signature_source: 0,

                }),

              )

              .join(",");



            requestCount++;

            const result = await savebyANM3(urlsString, attemptCount);

            if (Array.isArray(result.attemptStatuses)) {

              result.attemptStatuses.forEach((s) => {

                if (!s?.voucherCode) return;

                const sourceKey = s.source || "bookmark";

                compactLogMap.set(`${s.voucherCode}::${sourceKey}`, {

                  voucherCode: s.voucherCode,

                  message: s.message || "Đang xử lý...",

                  time: s.time || new Date().toLocaleTimeString(),

                  tryCount: attemptCount,

                  success: s.success,

                });

              });

            }



            const successfulPromotionIds = new Set(

              result.successfulItems || [],

            );



            urlVouchersInLoop.forEach((voucher) => {

              if (successfulPromotionIds.has(voucher.promotion_id)) {

                window.savedVouchers.add(voucher.code);

                const voucherIndex = window.currentVouchers.findIndex(

                  (v) => v.code === voucher.code,

                );

                const saveBtn = document.getElementById(

                  `saveBtn${voucherIndex}`,

                );

                if (saveBtn && !saveBtn.disabled) {

                  saveBtn.innerHTML = '<i class="fas fa-check me-1"></i>Đã lưu';

                  saveBtn.style.background = "#10b981";

                  saveBtn.disabled = true;

                }

              } else {

                remainingVouchersAfterLoop.push(voucher);

              }

            });



            if (

              !window.saveProcessStopped &&

              useDualSave &&

              remainingVouchersAfterLoop.length > 0

            ) {

              const nextDelay = getAdaptiveSpamDelay(delay, requestCount + 1);

              await sleepANM(nextDelay);

            }

          }



          // 2. XỬ LÝ SONG SONG VỚI saveByPlatform (NẾU USER CHỌN)

          if (

            useDualSave &&

            !manualSaveBlocked &&

            remainingVouchersAfterLoop.length > 0 &&

            !window.saveProcessStopped

          ) {

            const stillFailing = [];

            let platformSuccessCount = 0;



            for (let i = 0; i < remainingVouchersAfterLoop.length; i++) {

              if (window.saveProcessStopped) break;

              const voucher = remainingVouchersAfterLoop[i];



              requestCount++;

              const platformResult = await saveByPlatform(

                voucher.code,

                "manual",

              );



              if (platformResult.attemptStatus?.voucherCode) {

                const status = platformResult.attemptStatus;

                const sourceKey = status.source || "manual";

                compactLogMap.set(`${status.voucherCode}::${sourceKey}`, {

                  voucherCode: status.voucherCode,

                  message: status.message || "Đang xử lý...",

                  time: status.time || new Date().toLocaleTimeString(),

                  tryCount: attemptCount,

                });

                if (status.stopManualDueToSpam) {

                  manualSaveBlocked = true;

                }

              }



              if (manualSaveBlocked) {

                stillFailing.push(voucher);

                for (

                  let j = i + 1;

                  j < remainingVouchersAfterLoop.length;

                  j++

                ) {

                  stillFailing.push(remainingVouchersAfterLoop[j]);

                }

                break;

              }



              if (platformResult.successfulCode) {

                platformSuccessCount++;

                window.savedVouchers.add(voucher.code);

                const voucherIndex = window.currentVouchers.findIndex(

                  (v) => v.code === voucher.code,

                );

                const saveBtn = document.getElementById(

                  `saveBtn${voucherIndex}`,

                );

                if (saveBtn && !saveBtn.disabled) {

                  saveBtn.innerHTML = '<i class="fas fa-check me-1"></i>Đã lưu';

                  saveBtn.style.background = "#10b981";

                  saveBtn.disabled = true;

                }

              } else {

                stillFailing.push(voucher);

              }



              if (

                !window.saveProcessStopped &&

                i < remainingVouchersAfterLoop.length - 1

              ) {

                const nextDelay = getAdaptiveSpamDelay(delay, requestCount + 1);

                await sleepANM(nextDelay);

              }

            }



            remainingVouchersAfterLoop = stillFailing;

          }



          // 3. Cập nhật danh sách

          vouchersToSpam = remainingVouchersAfterLoop;



          updateSaveProgress(

            window.savedVouchers.size,

            totalCount,

            saveProgressFill,

            saveProgressText,

          );

          renderCompactSpamLog();



          if (vouchersToSpam.length > 0 && !window.saveProcessStopped) {

            const nextDelay = getAdaptiveSpamDelay(delay, requestCount + 1);

            await sleepANM(nextDelay);

          }

        }



        // Đánh dấu thất bại cho các voucher còn lại

        vouchersToSpam.forEach((voucher) => {

          const voucherIndex = window.currentVouchers.findIndex(

            (v) => v.code === voucher.code,

          );

          const saveBtn = document.getElementById(`saveBtn${voucherIndex}`);

          if (saveBtn && !saveBtn.disabled) {

            saveBtn.innerHTML = '<i class="fas fa-times me-1"></i>Thất bại';

            saveBtn.style.background = "#dc2626";

            saveBtn.disabled = false;

          }

        });

      } catch (error) {

        console.error("Error in spamSaveAllVouchers:", error);

        if (saveLog) {

          saveLog.innerHTML += `\n❌ Lỗi nghiêm trọng: ${error.message}\n`;

          syncSaveLogToPiP();

        }

      } finally {

        // --- QUAN TRỌNG: Reset state và UI ---

        const wasStopped = window.saveProcessStopped;

        const wasSpamStop = window.giftcodeSaveStoppedBySpam90309999;

        window.isSpamAllRunning = false;

        window.saveProcessStopped = false; // RESET FLAG DỪNG

        window.giftcodeSaveStoppedBySpam90309999 = false;

        window.giftcodeMicrositeRequestCount = 0;

        window.giftcodeMicrositeStoppedByLimit = false;



        if (saveAllBtn) saveAllBtn.style.display = "block";

        if (stopSaveBtn) {

          stopSaveBtn.style.display = "none";

          stopSaveBtn.disabled = false; // RESET DISABLED STATE

          stopSaveBtn.innerHTML = '<i class="fas fa-stop me-2"></i>Dừng Lưu'; // RESET TEXT

        }

        if (saveProgress) saveProgress.style.display = "none";



        updateButtonsForSpamMode(window.isSpamMode);



        const successCount = window.savedVouchers.size;

        let finalMessage = `\n✅ Đã lưu thành công <b>${successCount}/${totalCount}</b> voucher.\n\n<b>=== HOÀN THÀNH ===</b>`;



        if (wasSpamStop) {

          finalMessage = `\n🛑 Bạn dính lỗi spam, vui lòng thử lại sau ít nhất 15 phút\n\n<b>=== DỪNG ===</b>`;

          if (document.getElementById("multiVoucherMessages")) {

            showMultiVoucherMessage(

              "Bạn dính lỗi spam, vui lòng thử lại sau ít nhất 15 phút",

              "error",

            );

          }

        } else if (wasStopped) {

          finalMessage = `\n🛑 Quá trình bị dừng bởi người dùng. Đã lưu ${successCount}/${totalCount} voucher.\n\n<b>=== DỪNG ===</b>`;

          if (document.getElementById("multiVoucherMessages")) {

            showMultiVoucherMessage("Quá trình lưu bị dừng.", "warning");

          }

        } else {

          if (document.getElementById("multiVoucherMessages")) {

            showMultiVoucherMessage(

              `Hoàn thành! Đã lưu ${successCount}/${totalCount} voucher.`,

              "success",

            );

          }

        }



        if (saveLog) {

          saveLog.innerHTML += `\n${finalMessage.trim()}\n`;

          saveLog.scrollTop = saveLog.scrollHeight;

          syncSaveLogToPiP();

        }

      }

    }



    async function normalSaveAllVouchers() {

      window.pipLogs = [];

      const saveAllBtn = document.getElementById("saveAllBtn");

      const stopSaveBtn = document.getElementById("stopSaveBtn");

      const saveProgress = document.getElementById("saveProgress");

      const saveProgressFill = document.getElementById("saveProgressFill");

      const saveProgressText = document.getElementById("saveProgressText");

      const saveLog = document.getElementById("saveLog");



      if (saveLog.style.display === "none" || !saveLog.style.display) {

        saveLog.style.display = "block";

      }



      window.saveProcessStopped = false;

      window.giftcodeSaveStoppedBySpam90309999 = false;

      window.giftcodeMicrositeRequestCount = 0;

      window.giftcodeMicrositeStoppedByLimit = false;

      window.isSpamAllRunning = true;

      saveAllBtn.style.display = "none";

      stopSaveBtn.style.display = "block";

      saveProgress.style.display = "block";

      updateIndividualButtons();



      const isGiftcodeMode = !!document.getElementById("giftcodeHeaderToggle")

        ?.checked;

      if (isGiftcodeMode) {

        const giftcodeVouchers = getGiftCodesFromRawInput();

        const totalCount = giftcodeVouchers.length;

        if (totalCount === 0) {

          window.isSpamAllRunning = false;

          saveAllBtn.style.display = "block";

          stopSaveBtn.style.display = "none";

          saveProgress.style.display = "none";

          updateButtonsForSpamMode(window.isSpamMode);

          showMultiVoucherMessage(

            "❌ Giftcode mode: không tìm thấy mã hợp lệ từ input.",

            "error",

          );

          return;

        }



        let completedCount = 0;

        saveLog.innerHTML = `<b>🚀 Bắt đầu lưu tất cả giftcode (${totalCount} mã)</b>\n\n`;

        syncSaveLogToPiP();

        try {

          for (let i = 0; i < giftcodeVouchers.length; i++) {

            if (window.saveProcessStopped) break;

            const voucher = giftcodeVouchers[i];

            const result = await saveByGiftcodeMicrosite(

              voucher.code,

              "giftcode",

            );

            if (result.sout) {

              saveLog.innerHTML += `${result.sout}`;

              if (

                result.attemptStatus?.stopSaveDueToSpam90309999 ||

                result.attemptStatus?.stopManualDueToSpam

              ) {

                saveLog.innerHTML += buildUncheckedVoucherCodesLine(

                  giftcodeVouchers.slice(i).map((item) => item.code),

                );

              }

              saveLog.scrollTop = saveLog.scrollHeight;

              syncSaveLogToPiP();

            }

            if (result.successfulCode) {

              window.savedVouchers.add(voucher.code);

            }

            completedCount++;

            updateSaveProgress(

              completedCount,

              totalCount,

              saveProgressFill,

              saveProgressText,

            );

            if (

              result.attemptStatus?.stopSaveDueToSpam90309999 ||

              result.attemptStatus?.stopManualDueToSpam

            ) {

              break;

            }

          }

        } finally {

          window.isSpamAllRunning = false;

          saveAllBtn.style.display = "block";

          stopSaveBtn.style.display = "none";

          saveProgress.style.display = "none";

          updateButtonsForSpamMode(window.isSpamMode);

          const successCount = window.savedVouchers.size;

          if (window.giftcodeSaveStoppedBySpam90309999) {

            showMultiVoucherMessage(

              "Bạn dính lỗi spam, vui lòng thử lại sau ít nhất 15 phút",

              "error",

            );

          } else if (window.saveProcessStopped) {

            showMultiVoucherMessage("Quá trình lưu bị dừng.", "warning");

          } else {

            showMultiVoucherMessage(

              `Hoàn thành! Đã lưu ${successCount}/${totalCount} giftcode.`,

              "success",

            );

          }

          saveLog.innerHTML += `\n🏁 Tổng kết: Đã lưu <b>${successCount}/${totalCount}</b> giftcode.`;

          saveLog.scrollTop = saveLog.scrollHeight;

          syncSaveLogToPiP();

        }

        return;

      }



      const urlVouchers = [];

      const codeVouchers = [];



      for (const voucher of window.currentVouchers) {

        if (voucher.code && voucher.signature && voucher.promotion_id) {

          urlVouchers.push(voucher);

        } else {

          codeVouchers.push(voucher);

        }

      }



      const totalCount = window.currentVouchers.length;

      let completedCount = 0;

      saveLog.innerHTML = `<b>🚀 Bắt đầu lưu tất cả voucher</b>\n`;

      syncSaveLogToPiP();



      try {

        if (urlVouchers.length > 0 && !window.saveProcessStopped) {

          for (let i = 0; i < urlVouchers.length; i += 20) {

            if (window.saveProcessStopped) break;



            const batchUrls = urlVouchers.slice(i, i + 20);

            const urlsString = batchUrls

              .map((v) =>

                JSON.stringify({

                  promotion_id: v.promotion_id,

                  voucher_code: v.code,

                  signature: v.signature,

                  signature_source: 0,

                }),

              )

              .join(",");



            try {

              const result = await savebyANM3(urlsString, 1);

              if (result.sout) {

                saveLog.innerHTML += `\n${result.sout}`;

                // updatePiPLog(result.sout);

                saveLog.scrollTop = saveLog.scrollHeight;

                syncSaveLogToPiP();

              }



              const responsesMap = new Map();

              if (result.responses && Array.isArray(result.responses)) {

                result.responses.forEach((res) => {

                  if (res.data && res.data.voucher) {

                    responsesMap.set(res.data.voucher.promotionid, res.error);

                  }

                });

              }



              // **LOGIC QUAN TRỌNG: CẬP NHẬT UI CHO TỪNG VOUCHER**

              batchUrls.forEach((voucher) => {

                const errorStatus = responsesMap.get(voucher.promotion_id);

                const voucherIndex = window.currentVouchers.findIndex(

                  (v) => v.code === voucher.code,

                );

                const saveBtn = document.getElementById(

                  `saveBtn${voucherIndex}`,

                );



                if (saveBtn) {

                  if (errorStatus === 0 || errorStatus === 5) {

                    // Thành công hoặc đã lưu

                    window.savedVouchers.add(voucher.code);

                    saveBtn.innerHTML =

                      '<i class="fas fa-check me-1"></i>Đã lưu';

                    saveBtn.style.background = "#10b981"; // Màu xanh thành công

                    saveBtn.disabled = true;

                  } else {

                    // Thất bại

                    saveBtn.innerHTML =

                      '<i class="fas fa-times me-1"></i>Thất bại';

                    saveBtn.style.background = "#dc2626"; // Màu đỏ thất bại

                    saveBtn.disabled = false;

                  }

                }

              });

            } catch (error) {

              saveLog.innerHTML += `\nLỗi khi xử lý batch URL: ${error.message}`;

              saveLog.scrollTop = saveLog.scrollHeight;

              syncSaveLogToPiP();

            }



            completedCount += batchUrls.length;

            updateSaveProgress(

              completedCount,

              totalCount,

              saveProgressFill,

              saveProgressText,

            );

          }

        }



        if (codeVouchers.length > 0 && !window.saveProcessStopped) {

          for (const voucher of codeVouchers) {

            if (window.saveProcessStopped) break;



            if (window.savedVouchers.has(voucher.code)) {

              completedCount++;

              updateSaveProgress(

                completedCount,

                totalCount,

                saveProgressFill,

                saveProgressText,

              );

              continue;

            }



            const voucherIndex = window.currentVouchers.findIndex(

              (v) => v.code === voucher.code,

            );

            const saveBtn = document.getElementById(`saveBtn${voucherIndex}`);

            if (saveBtn) {

              saveBtn.disabled = true;

              saveBtn.innerHTML =

                '<i class="fas fa-spinner fa-spin me-1"></i>Đang lưu...';

            }



            const result = await savebyANM_voucherCode(voucher.code, 1);

            if (result.sout) {

              saveLog.innerHTML += `\n${result.sout}`;

              // updatePiPLog(result.sout);

              saveLog.scrollTop = saveLog.scrollHeight;

              syncSaveLogToPiP();

            }



            if (

              result.successfulVoucherCode &&

              result.successfulVoucherCode.length > 0

            ) {

              window.savedVouchers.add(voucher.code);

              if (saveBtn) {

                saveBtn.innerHTML = '<i class="fas fa-check me-1"></i>Đã lưu';

                saveBtn.style.background = "#10b981";

                saveBtn.disabled = true;

              }

            } else if (saveBtn) {

              saveBtn.innerHTML = '<i class="fas fa-times me-1"></i>Thất bại';

              saveBtn.style.background = "#dc2626";

              saveBtn.disabled = false;

            }

            completedCount++;

            updateSaveProgress(

              completedCount,

              totalCount,

              saveProgressFill,

              saveProgressText,

            );

          }

        }

      } finally {

        window.isSpamAllRunning = false;

        saveAllBtn.style.display = "block";

        stopSaveBtn.style.display = "none";

        saveProgress.style.display = "none";

        updateButtonsForSpamMode(window.isSpamMode);

        const successCount = window.savedVouchers.size;

        if (window.saveProcessStopped) {

          showMultiVoucherMessage("Quá trình lưu bị dừng.", "warning");

        } else {

          showMultiVoucherMessage(

            `Hoàn thành! Đã lưu ${successCount}/${totalCount} voucher.`,

            "success",

          );

        }

        saveLog.innerHTML += `\n🏁 Tổng kết: Đã lưu <b>${successCount}/${totalCount}</b> voucher.`;

        saveLog.scrollTop = saveLog.scrollHeight;

        syncSaveLogToPiP();

      }

    }



    // Hàm save tất cả voucher

    async function saveAllVouchers() {

      const useGiftcodeMode = !!document.getElementById("giftcodeHeaderToggle")

        ?.checked;

      if (

        !useGiftcodeMode &&

        (!window.currentVouchers || window.currentVouchers.length === 0)

      ) {

        showMultiVoucherMessage("❌ Không có voucher nào để lưu", "error");

        return;

      }

      if (useGiftcodeMode && getGiftCodesFromRawInput().length === 0) {

        showMultiVoucherMessage(

          "❌ Giftcode mode: không tìm thấy mã hợp lệ từ input.",

          "error",

        );

        return;

      }

      // Không cho phép chạy save all nếu có individual đang chạy

      if (window.hasIndividualRunning) {

        showMultiVoucherMessage(

          "❌ Không thể spam tổng khi có spam đơn lẻ đang chạy",

          "error",

        );

        return;

      }

      if (window.isSpamMode) {

        window.saveProcessStopped = false;

        window.giftcodeMicrositeRequestCount = 0;

        window.giftcodeMicrositeStoppedByLimit = false;

        const delay = validateGlobalSpamDelay();

        const canRun = await waitForSpamScheduleIfNeeded();

        if (!canRun) {

          showMultiVoucherMessage(

            "🛑 Đã dừng trước khi tới lịch chạy.",

            "warning",

          );

          return;

        }

        await spamSaveAllVouchers(delay);

      } else {

        await normalSaveAllVouchers();

      }

    }



    // Cập nhật progress bar

    function updateSaveProgress(current, total, progressFill, progressText) {

      const percentage = Math.round((current / total) * 100);

      progressFill.style.width = `${percentage}%`;

      progressText.textContent = `${current} / ${total}`;

    }

    // Copy voucher code

    function copyVoucherCodeMulti(code) {

      navigator.clipboard

        .writeText(code)

        .then(() => {

          showCopyNotificationMulti(`Đã copy: ${code}`);

        })

        .catch(() => {

          const textArea = document.createElement("textarea");

          textArea.value = code;

          document.body.appendChild(textArea);

          textArea.select();

          document.execCommand("copy");

          document.body.removeChild(textArea);

          showCopyNotificationMulti(`Đã copy: ${code}`);

        });

    }

    // Mở link voucher

    function openVoucherLinkMulti(link, event) {

      event.stopPropagation();

      window.open(link, "_blank");

    }

    // Hiển thị thông báo copy

    function showCopyNotificationMulti(message) {

      const notification = document.createElement("div");

      notification.className = "copy-notification";

      notification.innerHTML = `<i class="fas fa-check me-2"></i>${message}`;

      document.body.appendChild(notification);

      setTimeout(() => {

        if (notification.parentNode) {

          notification.parentNode.removeChild(notification);

        }

      }, 3000);

    }

    // Xóa input

    function clearMultiVoucherInput() {

      const inputField = document.getElementById("multiVoucherInput");

      inputField.value = "";

      inputField.focus();

      clearMultiVoucherMessages();

      clearMultiVoucherResults();

      clearSaveLog();

      // Ẩn toggle khi xóa input

      const modeContainer = document.getElementById("modeSettingsContainer");

      if (modeContainer) {

        modeContainer.style.display = "none";

      }

    }

    // Dán từ clipboard

    async function pasteFromClipboardMulti() {

      try {

        const text = await navigator.clipboard.readText();

        const inputField = document.getElementById("multiVoucherInput");

        inputField.value = text;

        inputField.focus();

        processMultiVoucherInput(text.trim());

      } catch (err) {

        showMultiVoucherMessage(

          "Không thể dán từ clipboard. Vui lòng dán thủ công.",

          "error",

        );

      }

    }

    // Đóng popup

    function closeMultiVoucherChecker() {

      console.log("Closing modal - stopping all processes...");

      window.pipDisableMask = false;



      // Dừng tất cả processes trước khi đóng

      stopAllProcesses();



      // Đợi một chút để đảm bảo các process được dừng

      setTimeout(() => {

        // Remove modal overlay

        const overlay = document.getElementById("multiVoucherOverlay");

        if (overlay) overlay.remove();



        // Remove custom style

        const style = document.getElementById("multi-voucher-style-shopee");

        if (style) style.remove();



        // Remove Bootstrap CSS (kiểm tra không trùng với CSS khác trên trang)

        const bootstrapCSS = document.querySelector('link[href*="bootstrap"]');

        if (bootstrapCSS && bootstrapCSS.href.includes("cdn.jsdelivr.net")) {

          bootstrapCSS.remove();

        }



        // Remove Bootstrap JS (kiểm tra không trùng với JS khác trên trang)

        const bootstrapJS = document.querySelector('script[src*="bootstrap"]');

        if (bootstrapJS && bootstrapJS.src.includes("cdn.jsdelivr.net")) {

          bootstrapJS.remove();

        }



        // Remove Font Awesome (kiểm tra không trùng với FA khác trên trang)

        const fontAwesome = document.querySelector(

          'link[href*="font-awesome"]',

        );

        if (fontAwesome && fontAwesome.href.includes("cdnjs.cloudflare.com")) {

          fontAwesome.remove();

        }



        // Reset các biến global

        window.currentVouchers = [];

        window.savedVouchers = new Set();

        window.saveProcessStopped = true;

        window.isSpamMode = false;

        window.individualProcesses = new Map();

        window.isSpamAllRunning = false;

        window.hasIndividualRunning = false;



        console.log("Modal closed, all processes stopped, resources cleaned");



        if (typeof showMainMenu === "function") {

          showMainMenu();

        }

      }, 100);

    }



    // Hiển thị thông báo

    function showMultiVoucherMessage(message, type = "info") {

      const messagesContainer = document.getElementById("multiVoucherMessages");



      // THÊM KIỂM TRA NÀY

      if (!messagesContainer) {

        console.warn("Messages container not found, modal may be closed");

        return;

      }



      const iconMap = {

        error: "exclamation-triangle",

        success: "check-circle",

        warning: "exclamation-triangle",

        info: "info-circle",

      };

      messagesContainer.innerHTML = `

                <div class="multi-voucher-message ${type}">

                    <i class="fas fa-${iconMap[type]}"></i>

                    <span>${message}</span>

                </div>

            `;

    }



    // Xóa thông báo

    function clearMultiVoucherMessages() {

      document.getElementById("multiVoucherMessages").innerHTML = "";

    }

    // Xóa kết quả

    function clearMultiVoucherResults() {

      document.getElementById("multiVoucherResults").innerHTML = "";

    }

    // Xóa saveLog

    function clearSaveLog() {

      const saveLog = document.getElementById("saveLog");

      if (saveLog) {

        saveLog.innerHTML = "";

        saveLog.style.display = "none";

      }

    }

    // Hiển thị loading

    function showMultiVoucherLoading() {

      document.getElementById("multiVoucherResults").innerHTML = `

                <div class="multi-voucher-loading">

                    <div class="multi-voucher-spinner"></div>

                    <p><strong>Đang tìm kiếm voucher...</strong></p>

                </div>

            `;

    }

    // Dừng quá trình save

    function stopSaveProcess() {

      window.saveProcessStopped = true;

      window.isSpamAllRunning = false;

      const stopSaveBtn = document.getElementById("stopSaveBtn");

      stopSaveBtn.innerHTML =

        '<i class="fas fa-spinner fa-spin me-2"></i>Đang dừng...';

      stopSaveBtn.disabled = true;

      // Update buttons khi dừng

      updateButtonsForSpamMode(window.isSpamMode);

    }

    // Event listener cho beforeunload - Dừng tất cả khi thoát trang

    const beforeUnloadHandler = function (e) {

      if (

        window.saveProcessStopped === false ||

        window.isSpamAllRunning ||

        (window.individualProcesses && window.individualProcesses.size > 0)

      ) {

        stopAllProcesses();

      }

    };

    window.addEventListener("beforeunload", beforeUnloadHandler);

    // Event listener cho khi DOM bị thay đổi (modal bị xóa)

    const observer = new MutationObserver(function (mutations) {

      mutations.forEach(function (mutation) {

        if (mutation.type === "childList") {

          mutation.removedNodes.forEach(function (node) {

            if (node.id === "multiVoucherOverlay") {

              console.log("🔴 Modal removed from DOM - stopping processes");

              stopAllProcesses();

              observer.disconnect();

              window.removeEventListener("beforeunload", beforeUnloadHandler);

            }

          });

        }

      });

    });

    observer.observe(document.body, {

      childList: true,

      subtree: true,

    });



    // Gán các hàm vào window để có thể gọi từ HTML

    window.closeMultiVoucherChecker = closeMultiVoucherChecker;

    window.clearMultiVoucherInput = clearMultiVoucherInput;

    window.pasteFromClipboardMulti = pasteFromClipboardMulti;

    window.copyVoucherCodeMulti = copyVoucherCodeMulti;

    window.copyAllVoucherCodes = copyAllVoucherCodes; // **THÊM HÀM MỚI VÀO WINDOW**

    window.copyUncheckedVoucherCodesMulti = copyUncheckedVoucherCodesMulti;

    window.openVoucherLinkMulti = openVoucherLinkMulti;

    window.saveIndividualVoucher = saveIndividualVoucher;

    window.saveAllVouchers = saveAllVouchers;

    window.stopSaveProcess = stopSaveProcess;

    window.toggleSpamMode = toggleSpamMode;

    window.updateButtonsForSpamMode = updateButtonsForSpamMode;

    window.spamSaveVoucher = spamSaveVoucher;

    window.normalSaveVoucher = normalSaveVoucher;

    window.spamSaveAllVouchers = spamSaveAllVouchers;

    window.normalSaveAllVouchers = normalSaveAllVouchers;

    window.stopAllProcesses = stopAllProcesses;

    window.stopAllIndividualProcesses = stopAllIndividualProcesses;

    window.updateSaveAllButton = updateSaveAllButton;

    window.updateIndividualButtons = updateIndividualButtons;

    window.updateIndividualRunningState = updateIndividualRunningState;

    window.validateGlobalSpamDelay = validateGlobalSpamDelay;

    window.openNormalSettingsModal = openNormalSettingsModal;

    window.closeNormalSettingsModal = closeNormalSettingsModal;

    window.applyNormalSettings = applyNormalSettings;

    window.openSpamSettingsModal = openSpamSettingsModal;

    window.closeSpamSettingsModal = closeSpamSettingsModal;

    window.applySpamSettings = applySpamSettings;

    window.toggleScheduleTimeInputs = toggleScheduleTimeInputs;

    window.toggleMaxAttemptsInputs = toggleMaxAttemptsInputs;

    window.toggleVoucherType = toggleVoucherType;

    window.processShopVoucher = processShopVoucher;

    window.clearShopVoucherInputs = clearShopVoucherInputs;

    window.hideShopVoucherErrors = hideShopVoucherErrors;

    window.validateShopVoucherCode = validateShopVoucherCode;

    window.validateShopUrl = validateShopUrl;

    window.extractShopIdFromUrl = extractShopIdFromUrl;

    window.formatTimeFromUnix = formatTimeFromUnix;

    window.formatVoucherTerms = formatVoucherTerms;

    function toggleGiftcodeHeader() {

      const giftcodeToggle = document.getElementById("giftcodeHeaderToggle");

      const modeContainer = document.getElementById("modeSettingsContainer");

      if (giftcodeToggle && modeContainer) {

        modeContainer.style.display = giftcodeToggle.checked ? "none" : "block";



        // Nếu vừa bật giftcode và có text trong input, tự động chạy luôn

        if (giftcodeToggle.checked) {

          const inputField = document.getElementById("multiVoucherInput");

          if (inputField && inputField.value.trim()) {

            console.log(

              "Giftcode mode enabled with existing input - triggering processing...",

            );

            processMultiVoucherInput(inputField.value.trim());

          }

        }

      }

    }

    window.toggleGiftcodeHeader = toggleGiftcodeHeader;



    function stopVoucherProcessing() {

      window.saveProcessStopped = true;

      togglePasteButtonToStop(false);

    }

    window.stopVoucherProcessing = stopVoucherProcessing;



    function togglePasteButtonToStop(active) {

      const btn = document.getElementById("multiVoucherPasteBtn");

      if (!btn) return;

      if (active) {

        btn.innerHTML = '<i class="fas fa-stop me-2"></i>Dừng';

        btn.classList.add("stop-active");

        btn.onclick = stopVoucherProcessing;

        btn.style.background = "#dc2626";

      } else {

        btn.innerHTML = '<i class="fas fa-paste me-2"></i>Dán nội dung';

        btn.classList.remove("stop-active");

        btn.onclick = pasteFromClipboardMulti;

        btn.style.background = "";

      }

    }

        // Auto-scan all voucher codes and URLs on the current Shopee page
    async function autoScanPageVouchers() {
      const btn = document.getElementById("autoScanPageBtn");
      if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang quét...';
        btn.disabled = true;
      }
      try {
        // 1. Extract all text content from the page
        const pageText = document.body.innerText || "";
        
        // 2. Extract all Shopee URLs on the page
        const links = [];
        document.querySelectorAll("a").forEach(a => {
          const href = a.href || "";
          if (href.includes("shopee.vn") || href.includes("s.shopee.vn") || href.includes("shp.ee")) {
            links.push(href);
          }
        });
        
        // Combine text and links
        const combinedContent = pageText + "\n" + links.join("\n");
        
        // Fill input and start processing
        const inputField = document.getElementById("multiVoucherInput");
        if (inputField) {
          inputField.value = combinedContent;
          await processMultiVoucherInput(combinedContent.trim());
        }
        
        if (btn) {
          btn.innerHTML = '<i class="fas fa-check me-2"></i>Quét trang xong!';
          setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-search-plus me-2"></i>Quét trang hiện tại';
            btn.disabled = false;
          }, 2000);
        }
      } catch (err) {
        console.error("Lỗi quét trang:", err);
        if (btn) {
          btn.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Lỗi quét trang';
          btn.disabled = false;
        }
      }
    }

    window.autoScanPageVouchers = autoScanPageVouchers;
    window.togglePasteButtonToStop = togglePasteButtonToStop;



    // Khởi chạy

    anm_multiVoucherChecker();

  };

  // executeMultiVoucherSearch();

})();


// Auto-execute scanner UI on script load
if (window.executeMultiVoucherSearch) {
  window.executeMultiVoucherSearch();
}
