// ==============================
// English Version
// Copyright © Sakdar Sukkwan. All rights reserved.
// Developer : Sakdar Sukkwan
// Source Code : https://github.com/newzydev/Newzydev-Protect
// License : Licensed under Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0).

// ==============================
// Thai Version
// ลิขสิทธิ์ © ศักดา สุขขวัญ. สงวนสิทธิ์ทุกประการ.
// ผู้พัฒนา : ศักดา สุขขวัญ
// แหล่งที่มา : https://github.com/newzydev/Newzydev-Protect
// ใบอนุญาต : ได้รับอนุญาตภายใต้สัญญาอนุญาต Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)

// ==============================
// ป้องกันการเลือกข้อความ (Text Selection)
document.addEventListener('selectstart', function (e) {
    e.preventDefault();
}, false);

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

// CSS แบบเสริมเผื่อกันไว้ให้แน่น ๆ
document.addEventListener("DOMContentLoaded", function () {
    const css = `
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
    const style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
});

// ==============================
// แสดงข้อความเตือนเมื่อพยายามเซฟรูป
var clickmessage = "ระบบไม่อนุญาตให้บันทึกภาพค่ะ :)";

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
// แสดงข้อความเมื่อห้ามคลิกขวาทั่วไป
var message = "ระบบไม่อนุญาตให้คลิกขวาค่ะ :)";

// ฟังก์ชันป้องกันคลิกขวา
function disableRightClick(e) {
    if (e.button == 2 || e.which == 3) {
        // alert(message);
        console.warn(message);
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
    var message1 = "ระบบไม่อนุญาตให้กดปุ่ม Ctrl + U ค่ะ :)";
    if (event.ctrlKey && window.event.keyCode == 85) {
        // alert(message1);
        console.warn(message1);
        return false;
    }

    // ห้าม F12 (เปิด Developer Tools)
    var message2 = "ระบบไม่อนุญาตให้กดปุ่ม F12 ค่ะ :)";
    if (window.event && window.event.keyCode == 123) {
        event.keyCode = 0;
        event.returnValue = false;
        // alert(message2);
        console.warn(message2);
    }

    // ห้าม Ctrl + S (Save Page)
    var message3 = "ระบบไม่อนุญาตให้กดปุ่ม Ctrl + S ค่ะ :)";
    if (event.ctrlKey && window.event.keyCode == 83) {
        // alert(message3);
        console.warn(message3);
        return false;
    }

    // ห้าม F5 (Refresh)
    var message4 = "ระบบไม่อนุญาตให้กดปุ่ม F5 ค่ะ :)";
    if (window.event && window.event.keyCode == 116) {
        event.keyCode = 0;
        event.returnValue = false;
        // alert(message4);
        console.warn(message4);
    }
};

// ==============================
// ฟังก์ชันตรวจสอบ input เพื่อป้องกัน SQL Injection
document.addEventListener('input', function (e) {
    var message5 = "ระบบปฏิเสธเครื่องหมายพิเศษที่อาจจะใช้ในการทำ SQL Injection ค่ะ :)";
    const tagName = e.target.tagName.toLowerCase();

    // ตรวจเฉพาะ input type="text", "search", หรือ textarea
    if ((tagName === 'input' || tagName === 'textarea') && !e.target.disabled && !e.target.readOnly) {
        const inputType = e.target.getAttribute("type") || "text";
        if (["text", "search", "email", "tel", "url"].includes(inputType)) {
            const regex = /['"\\;]/g;
            if (regex.test(e.target.value)) {
                // alert(message5);
                console.warn(message5);
                e.target.value = e.target.value.replace(regex, '');
            }
        }
    }
});

// ==============================
// ป้องกัน Ctrl+C และ Ctrl+V ใน input และ textarea
document.addEventListener('keydown', function (e) {
    var message6 = "ระบบไม่อนุญาตให้คัดลอกข้อมูลค่ะ :)";
    var message7 = "ระบบไม่อนุญาตให้วางข้อมูลค่ะ :)";
    const tagName = e.target.tagName.toLowerCase();
    const inputType = e.target.getAttribute("type") || "text";

    // ตรวจเฉพาะช่องกรอกข้อมูล
    if ((tagName === 'input' || tagName === 'textarea') && !e.target.disabled && !e.target.readOnly) {
        // ห้าม Ctrl+C (Copy)
        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
            // alert(message6);
            console.warn(message6);
            e.preventDefault();
        }

        // ห้าม Ctrl+V (Paste)
        if (e.ctrlKey && e.key.toLowerCase() === 'v') {
            // alert(message7);
            console.warn(message7);
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
