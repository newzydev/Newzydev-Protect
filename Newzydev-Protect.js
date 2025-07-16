// ==============================
// English Version
// Copyright © Sakdar Sukkwan. All rights reserved.
// Developer : Sakdar Sukkwan
// Source Code : https://github.com/newzydev/Newzydev-Protect
// License : Licensed under Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0).
// Permission to modify the source code is granted by Sakdar Sukkwan

// ==============================
// Thai Version
// ลิขสิทธิ์ © ศักดา สุขขวัญ. สงวนสิทธิ์ทุกประการ.
// ผู้พัฒนา : ศักดา สุขขวัญ
// แหล่งที่มา : https://github.com/newzydev/Newzydev-Protect
// ใบอนุญาต : ได้รับอนุญาตภายใต้สัญญาอนุญาต Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)

// ==============================
// ตรวจสอบสถานะการแสดงผล
// ==============================
const isMobileSize = window.innerWidth < 1024;
const isPWA = window.matchMedia('(display-mode: standalone)').matches;
const isWebsite = !isPWA && !isMobileSize;

// ==============================
// ป้องกันเนื้อหาบนเว็บแบบปรับตามอุปกรณ์และโหมดการใช้งาน
// เก็บแท็ก <style> ที่ถูกเพิ่มเข้าไปใน document ไว้เพื่อจะได้ลบตอนเปลี่ยนขนาดหน้าจอ
let dynamicStyleTag = null;
// ==============================

// ==============================
// ฟังก์ชันรวมเพื่อเรียกใช้การป้องกันตาม platform
// ==============================
function applyProtectionByMode() {
    if (isPWA) {
        // โหมด PWA
        enableAllProtections();
    }
    else if (isMobileSize) {
        // โหมดมือถือ/แท็บเล็ต
        enableAllProtections();
    }
    else if (isWebsite) {
        // โหมดเว็บไซต์ปกติ Desktop
        applyResponsiveCss();
        showConsoleWarning();
        enableImageClickBlock();
        enableKeyboardShortcutBlock();
        enableBasicSQLInjectionBlock();
    }
}

// ==============================
// เรียกใช้เมื่อ DOM โหลดแล้ว
// ==============================
window.onload = () => {
    applyProtectionByMode();

    window.addEventListener("resize", () => {
        applyProtectionByMode();
    });
};

// ==============================
// ฟังก์ชันสำหรับเรียกใช้ทุกตัวป้องกัน
// ==============================
function enableAllProtections() {
    applyResponsiveCss();
    enableTextSelectionProtection();
    enableRightClickBlock();
    enableImageClickBlock();
    enableKeyboardShortcutBlock();
    enableBasicSQLInjectionBlock();
    enableCopyPasteBlock();
    showConsoleWarning();
}

// ==============================
// ฟังก์ชันสำหรับสร้างและใส่ CSS ตามเงื่อนไขของหน้าจอ และ PWA
// ==============================
function applyResponsiveCss() {
    // ตรวจสอบว่าหน้าจอขนาดเล็กกว่าความกว้าง 1024px (mobile/tablet)
    const isMobileSize = window.innerWidth < 1024;

    // ตรวจสอบว่าเปิดใช้งานในโหมด PWA หรือไม่
    const isPWA = window.matchMedia('(display-mode: standalone)').matches;

    // ตัวแปรเก็บ CSS ที่จะ inject
    let css = "";

    // ถ้าเปิดในโหมด PWA
    if (isPWA) {
        css = `
            * {
                -webkit-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-user-drag: none !important;
                -moz-user-drag: none !important;
            }
            img {
                -webkit-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-user-drag: none !important;
                -moz-user-drag: none !important;
                pointer-events: none !important;
            }
        `;
    }
    // ถ้าเปิดในหน้าจอเล็ก (มือถือ/แท็บเล็ต)
    else if (isMobileSize) {
        css = `
            * {
                -webkit-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-user-drag: none !important;
                -moz-user-drag: none !important;
            }
            img {
                -webkit-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-user-drag: none !important;
                -moz-user-drag: none !important;
                pointer-events: none !important;
            }
        `;
    }
    // ถ้าเปิดใน desktop (หน้าจอใหญ่)
    else {
        css = `
            img {
                -webkit-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-user-drag: none !important;
                -moz-user-drag: none !important;
                pointer-events: none !important;
            }
        `;
    }

    // ลบ <style> เดิมออก ถ้ามีอยู่แล้ว เพื่อป้องกันซ้อนซ้ำ
    if (dynamicStyleTag) dynamicStyleTag.remove();

    // สร้างแท็ก <style> ใหม่
    dynamicStyleTag = document.createElement("style");
    dynamicStyleTag.type = "text/css";
    dynamicStyleTag.appendChild(document.createTextNode(css));
    document.head.appendChild(dynamicStyleTag);
}

// ==============================
// ป้องกันการเลือกข้อความ
// ==============================
function enableTextSelectionProtection() {
    document.addEventListener('selectstart', e => e.preventDefault(), false);
    document.addEventListener('mousedown', e => { if (e.detail > 1) e.preventDefault(); }, false);
    document.addEventListener('keydown', e => {
        if (e.shiftKey && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
            e.preventDefault();
        }
    }, false);
}

// ==============================
// ป้องกันคลิกขวา
// ==============================
function enableRightClickBlock() {
    function disableRightClick(e) {
        if (e.button === 2 || e.which === 3) return false;
    }

    document.addEventListener('contextmenu', e => e.preventDefault(), false);
    document.addEventListener('mousedown', disableRightClick, false);
}

// ==============================
// ป้องกันคลิกขวาบนรูป
// ==============================
function enableImageClickBlock() {
    function disableclick(e) {
        if (document.all && (event.button === 2 || event.button === 3) && event.srcElement.tagName === "IMG") return false;
        else if (document.layers && e.which === 3) return false;
        else if (document.getElementById && e.which === 3 && e.target.tagName === "IMG") return false;
    }

    function associateimages() {
        for (let i = 0; i < document.images.length; i++) {
            document.images[i].onmousedown = disableclick;
        }
    }

    if (document.all) document.onmousedown = disableclick;
    else if (document.getElementById) document.onmouseup = disableclick;
    else if (document.layers) associateimages();
}

// ==============================
// ป้องกันปุ่มลัดคีย์บอร์ด (F12, Ctrl+U ฯลฯ)
// ==============================
function enableKeyboardShortcutBlock() {
    document.onkeydown = function (e) {
        if (!e) e = window.event;
        const key = e.keyCode;

        if (e.ctrlKey && key === 85) return false; // Ctrl + U
        if (key === 123) { e.keyCode = 0; e.returnValue = false; return false; } // F12
        if (e.ctrlKey && key === 83) return false; // Ctrl + S
        if (key === 116) { e.keyCode = 0; e.returnValue = false; return false; } // F5
    };
}

// ==============================
// ป้องกัน SQL Injection เบื้องต้น
// ==============================
function enableBasicSQLInjectionBlock() {
    document.addEventListener('input', e => {
        const tagName = e.target.tagName.toLowerCase();
        const inputType = e.target.getAttribute("type") || "text";
        if ((tagName === 'input' || tagName === 'textarea') && !e.target.disabled && !e.target.readOnly) {
            if (["text", "search", "email", "tel", "url"].includes(inputType)) {
                const regex = /['"\\;]/g;
                if (regex.test(e.target.value)) {
                    e.target.value = e.target.value.replace(regex, '');
                }
            }
        }
    });
}

// ==============================
// ป้องกัน Ctrl+C และ Ctrl+V
// ==============================
function enableCopyPasteBlock() {
    document.addEventListener('keydown', e => {
        const tagName = e.target.tagName.toLowerCase();
        const inputType = e.target.getAttribute("type") || "text";

        if ((tagName === 'input' || tagName === 'textarea') && !e.target.disabled && !e.target.readOnly) {
            if (e.ctrlKey && ['c', 'v'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        }
    });
}

// ==============================
// แสดงคำเตือน Developer Console
// ==============================
function showConsoleWarning() {
    console.log('%cหยุด!!!', 'color: red; font-size: 40px; font-weight: bold;');
    console.log('%cประกาศจากผู้พัฒนาระบบ', 'color: blue; font-size: 16px;');
    console.log('%cฟีเจอร์นี้เป็นฟีเจอร์ของเบราว์เซอร์ที่มีจุดมุ่งหมายให้ใช้สำหรับผู้พัฒนา หากมีคนบอกให้คุณคัดลอกแล้ววางข้อความบางอย่างที่นี่เพื่อเปิดใช้งานฟีเจอร์ของระบบ หรือเพื่อเข้าถึงบัญชีของบุคคลใดบุคคลหนึ่ง โดยเจตนา คำบอกกล่าวเช่นนี้เป็นการหลอกลวงและอาจจะมอบสิทธิการเข้าถึงบัญชี ของคุณให้กับบุคคลดังกล่าว', 'color: blue; font-size: 16px;');
    console.log('%cโปรดอ่านนโยบายความเป็นส่วนตัว นโยบายคุกกี้ ข้อกำหนด และเงื่อนไขการใช้งาน Newzydev-Protect ได้ที่ %chttps://github.com/newzydev/Newzydev-Protect%c สำหรับข้อมูลเพิ่มเติม',
        'color: blue; font-size: 16px;',
        'color: blue; text-decoration: underline; font-size: 16px;',
        'color: blue; font-size: 16px;');
}
