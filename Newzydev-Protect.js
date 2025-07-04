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
// การแก้ไขซอร์สโค้ดได้รับอนุญาตโดย ศักดา สุขขวัญ

// ==============================
// ป้องกันการเลือกข้อความ (Text Selection)
//document.addEventListener('selectstart', function (e) {
//    e.preventDefault();
//}, false);

// ป้องกันการลากเพื่อเลือกข้อความ (Mouse Drag)
document.addEventListener('mousedown', function (e) {
    if (e.detail > 1) {
        e.preventDefault();
    }
}, false);

// ป้องกันการใช้คีย์บอร์ดในการเลือก (Shift + ลูกศร)
document.addEventListener('keydown', function (e) {
    if (e.shiftKey && (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown")) {
        e.preventDefault();
    }
}, false);

// ==============================
// ป้องกันเนื้อหาบนเว็บแบบปรับตามอุปกรณ์และโหมดการใช้งาน
// เก็บแท็ก <style> ที่ถูกเพิ่มเข้าไปใน document ไว้เพื่อจะได้ลบตอนเปลี่ยนขนาดหน้าจอ
let dynamicStyleTag;

// ฟังก์ชันสำหรับสร้างและใส่ CSS ตามเงื่อนไขของหน้าจอ และ PWA
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

// เมื่อ DOM โหลดเสร็จ
document.addEventListener("DOMContentLoaded", () => {
    // เรียกใช้ครั้งแรกตอนเปิดหน้า
    applyResponsiveCss();

    // ฟัง event resize จอ → เรียกใหม่ทุกครั้งที่ปรับขนาด
    window.addEventListener("resize", applyResponsiveCss);
});


// ==============================
// ฟังก์ชันป้องกันการคลิกขวา หรือคลิกเมาส์บนรูปภาพ
function disableclick(e) {
    if (document.all) {
        // สำหรับ IE
        if (event.button == 2 || event.button == 3) {
            if (event.srcElement.tagName == "IMG") {
                return false;
            }
        }
    } else if (document.layers) {
        // สำหรับ Netscape
        if (e.which == 3) {
            return false;
        }
    } else if (document.getElementById) {
        // สำหรับเบราว์เซอร์อื่น ๆ
        if (e.which == 3 && e.target.tagName == "IMG") {
            return false;
        }
    }
}

// ฟังก์ชันผูก event disableclick กับรูปภาพทั้งหมด
function associateimages() {
    for (i = 0; i < document.images.length; i++)
        document.images[i].onmousedown = disableclick;
}

// ผูก event กับการคลิกเมาส์ทั้งหน้าเว็บ
if (document.all) document.onmousedown = disableclick;
else if (document.getElementById) document.onmouseup = disableclick;
else if (document.layers) associateimages();

// ==============================
// ฟังก์ชันป้องกันคลิกขวา
function disableRightClick(e) {
    if (e.button == 2 || e.which == 3) {
        return false;
    }
}

// ปิดการแสดงเมนูคลิกขวา
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);

// ป้องกันเบราว์เซอร์ที่ไม่รองรับ contextmenu
document.addEventListener('mousedown', function (e) {
    disableRightClick(e);
}, false);

// ==============================
// ฟังก์ชันตรวจจับปุ่มลัดคีย์บอร์ดที่มักใช้แอบดู source
document.onkeydown = function () {

    // ห้าม Ctrl + U (View Source)
    if (event.ctrlKey && window.event.keyCode == 85) {
        return false;
    }

    // ห้าม F12 (เปิด Developer Tools)
    if (window.event && window.event.keyCode == 123) {
        event.keyCode = 0;
        event.returnValue = false;
    }

    // ห้าม Ctrl + S (Save Page)
    if (event.ctrlKey && window.event.keyCode == 83) {
        return false;
    }

    // ห้าม F5 (Refresh)
    if (window.event && window.event.keyCode == 116) {
        event.keyCode = 0;
        event.returnValue = false;
    }
};

// ==============================
// ฟังก์ชันตรวจสอบ input เพื่อป้องกัน SQL Injection
document.addEventListener('input', function (e) {
    const tagName = e.target.tagName.toLowerCase();

    // ตรวจเฉพาะ input type="text", "search", หรือ textarea
    if ((tagName === 'input' || tagName === 'textarea') && !e.target.disabled && !e.target.readOnly) {
        const inputType = e.target.getAttribute("type") || "text";
        if (["text", "search", "email", "tel", "url"].includes(inputType)) {
            const regex = /['"\\;]/g;
            if (regex.test(e.target.value)) {
                e.target.value = e.target.value.replace(regex, '');
            }
        }
    }
});

// ป้องกัน Ctrl+C และ Ctrl+V ใน input และ textarea
document.addEventListener('keydown', function (e) {
    const tagName = e.target.tagName.toLowerCase();
    const inputType = e.target.getAttribute("type") || "text";

    // ตรวจเฉพาะช่องกรอกข้อมูล
    if ((tagName === 'input' || tagName === 'textarea') && !e.target.disabled && !e.target.readOnly) {
        // ห้าม Ctrl+C (Copy)
        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
            e.preventDefault();
        }

        // ห้าม Ctrl+V (Paste)
        if (e.ctrlKey && e.key.toLowerCase() === 'v') {
            e.preventDefault();
        }
    }
});

// ==============================
// แสดงข้อความใน Developer Console เพื่อเตือนคนแอบส่อง
console.log('%cหยุด!!!', 'color: red; font-size: 40px; font-weight: bold;');
console.log('%cประกาศจากผู้พัฒนาระบบ', 'color: white; font-size: 16px;');
console.log('%cฟีเจอร์นี้เป็นฟีเจอร์ของเบราว์เซอร์ที่มีจุดมุ่งหมายให้ใช้สำหรับผู้พัฒนา หากมีคนบอกให้คุณคัดลอกแล้ววางข้อความบางอย่างที่นี่เพื่อเปิดใช้งานฟีเจอร์ของระบบ หรือเพื่อเข้าถึงบัญชีของบุคคลใดบุคคลหนึ่ง โดยเจตนา คำบอกกล่าวเช่นนี้เป็นการหลอกลวงและอาจจะมอบสิทธิการเข้าถึงบัญชี ของคุณให้กับบุคคลดังกล่าว', 'color: white; font-size: 16px;');
console.log('%cโปรดอ่านนโยบายความเป็นส่วนตัว นโยบายคุกกี้ ข้อกำหนด และเงื่อนไขการใช้งาน Newzydev-Protect ได้ที่ %chttps://github.com/newzydev/Newzydev-Protect%c สำหรับข้อมูลเพิ่มเติม',
    'color: white; font-size: 16px;',
    'color: #00f; text-decoration: underline; font-size: 16px;',
    'color: white; font-size: 16px;');
