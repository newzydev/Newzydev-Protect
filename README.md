# Newzydev-Protect.js

🛡️ JavaScript script to protect images and disable right-click functionality on websites.  
Developed with love by **Sakdar Sukkwan** 💻

---

## 🌐 Features

### 🖱️ ป้องกันการคลิกขวา
- ปิดการคลิกขวาทั่วทั้งเว็บไซต์
- ป้องกันคลิกขวาเฉพาะ `<img>` แบบเบราว์เซอร์เก่าและใหม่
- รองรับทั้ง Desktop และ Mobile

### 🔐 ป้องกันคีย์ลัดเบราว์เซอร์ (DevTools และอื่น ๆ)
บล็อกคีย์ลัดยอดนิยมที่ใช้เปิด DevTools หรือเข้าถึง source เช่น:
- `F12`
- `Ctrl + U` / `⌘ + U`
- `Ctrl + Shift + I / J / C / K`
- `Ctrl + S`, `Ctrl + P`, `Ctrl + X`, `Ctrl + C`, `Ctrl + V`
- `F5`, `Ctrl + R`

### ✋ ป้องกันการเลือกข้อความ
- ปิด `user-select` ด้วย CSS
- ป้องกัน `selectstart`, `mousedown`, `keydown` ที่ใช้เลือกข้อความ

### 🛡️ ป้องกัน SQL Injection (Basic)
- ล้าง input ที่มี keyword และ symbol อันตรายอัตโนมัติ
- ลบ: `'`, `"`, `\\`, `;`, \`` และ keyword SQL เช่น:
  - `select`, `insert`, `drop`, `union`, `or 1=1`, `--`, `/*`, `*/`

### 🔒 ป้องกันการ Copy-Paste
- บล็อก `Ctrl + C`, `Ctrl + V`, `Ctrl + X` ใน `<input>` และ `<textarea>`

### 📢 Console Warning
- แสดงคำเตือนใน Developer Console ป้องกัน Social Engineering

### 📱 Responsive Content Protection
- ตรวจสอบโหมดแสดงผล: Website / Mobile / PWA
- Inject CSS ป้องกันการคัดลอกอัตโนมัติ
- อัปเดต CSS แบบเรียลไทม์เมื่อ resize

---

## 📦 Installation

Copy the `Newzydev-Protect.js` file into your project and include it in your HTML or Razor page:

```html
<script src="https://cdn.jsdelivr.net/gh/newzydev/Newzydev-Protect@main/Newzydev-Protect.js"></script>
```
Or
```html
<script src="js/Newzydev-Protect.js"></script>
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
