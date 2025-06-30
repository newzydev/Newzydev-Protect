# Newzydev-Protect.js

🛡️ JavaScript script to protect images and disable right-click functionality on websites.  
Developed with love by **Sakdar Sukkwan** 💻

---

## 🌐 Features

- 🚫 ป้องกันการคลิกขวาบนภาพ (`<img>`) และทั่วทั้งหน้าเว็บ
- 🖱️ บล็อกเมนู context menu (คลิกขวา) แบบสมบูรณ์
- 💬 แสดงข้อความแจ้งเตือนเมื่อพยายามคลิกขวาหรือบันทึกรูปภาพ
- ⛔ ป้องกันปุ่มลัดสำคัญ เช่น
  - `Ctrl + U` – ห้ามดู source
  - `F12` – ห้ามเปิด DevTools
  - `Ctrl + S` – ห้ามบันทึกหน้าเว็บ
  - `F5` – ห้าม refresh
- ✋ ป้องกันการเลือกข้อความ (Text Selection):
  - กันไม่ให้ลากเมาส์เลือกข้อความ
  - ปิด user-select ด้วย CSS
- 🛡️ ป้องกัน SQL Injection เบื้องต้น:
  - กรองตัวอักษรพิเศษ `'`, `"`, `\\`, `;` ใน `<input>` และ `<textarea>`
- 📋 ป้องกัน Clipboard Action ในช่องกรอกข้อมูล:
  - `Ctrl + C` – ห้ามคัดลอกข้อมูลจาก `<input>` และ `<textarea>`
  - `Ctrl + V` – ห้ามวางข้อมูลใน `<input>` และ `<textarea>`
- 🖤 ป้องกันการแคปหน้าจอเบื้องต้น:
  - เมื่อผู้ใช้เปลี่ยนแท็บ / ไปหน้าอื่น จะมี Overlay สีดำแสดงบนหน้าจอ
  - ปิด Overlay ทันทีเมื่อผู้ใช้กลับมาหน้าเว็บ
- 🔒 ป้องกันการแอบใช้ console ด้วยการแสดงคำเตือนใน Developer Console
- 🌐 รองรับทั้งเบราว์เซอร์ IE, Netscape (โบราณ) และเบราว์เซอร์สมัยใหม่ อย่าง Google Chrome, Firefox
- 📦 สามารถแทรกใน HTML หรือ Blazor Razor page ได้ทันที

---

## 📦 Installation

Copy the `Newzydev-Protect.js` file into your project and include it in your HTML or Razor page:

```html
<script src="https://cdn.jsdelivr.net/gh/newzydev/Newzydev-Protect@main/Newzydev-Protect.js"></script>
```

---

## 📜 License

This project is licensed under the  
**Creative Commons Attribution–NoDerivatives 4.0 International (CC BY-ND 4.0)**  
© 2025 Sakdar Sukkwan

👉 [Read the full license in English](https://creativecommons.org/licenses/by-nd/4.0/legalcode)  
👉 [อ่านฉบับภาษาไทย](https://creativecommons.org/licenses/by-nd/4.0/deed.th)

You may copy and use this script **with attribution**.  
**You may not modify or redistribute modified versions.**

---

## ✨ Credit

Developed by: [Sakdar Sukkwan](https://github.com/newzydev)  
Email: sakdar.newzydev@gmail.com

If you use this in your project, don’t forget to ⭐ star the repo and give credit nakub 🩷
