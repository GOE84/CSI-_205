# CSI205 Front-End Software Development

โปรเจกต์รวบรวมแบบฝึกหัดและปฏิบัติการรายวิชา **CSI205 Front-End Software Development** พัฒนาด้วย **Next.js (App Router)**, **React**, **TypeScript**, และ **Tailwind CSS (Tailgrids UI)**

## ข้อมูลผู้จัดทำ
- **รหัสนักศึกษา:** 68051254
- **ชื่อ-นามสกุล:** นาย ภูมิ เดชอวยพรวงศ์ (Phoom Dechaouypornwong)
- **สาขาวิชา:** วิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ (CSI)
- **คณะ:** เทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม (Sripatum University)

---

## ฟีเจอร์และส่วนประกอบของระบบ

### 1. Home (`/`)
- แสดงข้อมูลส่วนตัวของผู้จัดทำ รูปโปรไฟล์ และรายละเอียดแนะนำตัว (**About me**)
- สรุปรายการแบบฝึกหัดทั้งหมดในรายวิชา CSI205

### 2. Animation (`/animation`)
- จำลองการเคลื่อนที่ของวัตถุในแนวทแยง 45 องศา พร้อมการคำนวณการสะท้อนขอบสนามและหมุนภาพอย่างต่อเนื่องด้วย `useState` และ `useEffect`
- รองรับการสลับรูปลูกบอล (`None`, `Basketball`, `Football`, `Volleyball`, `Human`) และการควบคุมการเล่น/หยุดชั่วคราว (`RUN` / `PAUSE`) ทั้งจากการคลิกปุ่มและปุ่มลัดคีย์บอร์ด (`Spacebar`, ปุ่มตัวเลข `1`–`5`)

### 3. Calculator (`/calculator`)
- เครื่องคิดเลขที่ออกแบบตามแนวคิด **Finite State Machine (FSM)** (`first`, `operator`, `second`)
- รองรับการบวก (`+`), ลบ (`-`), คำนวณผลลัพธ์ (`=`), ล้างค่า (`CE`) และการพิมพ์ผ่านคีย์บอร์ด (`0`–`9`, `+`, `-`, `Enter`, `Escape`)

### 4. Todos (`/todos`)
- ระบบจัดการรายการงาน (Todo List) รองรับการเพิ่ม (`Add`), แก้ไขชื่อรายการ (`Edit`), เปลี่ยนสถานะงาน (`waiting` -> `done ✓`), และลบรายการ (`Delete`)
- รองรับการกรองเฉพาะรายการที่ยังไม่เสร็จ (`Show only waiting`)
- รองรับการแบ่งหน้า (**Pagination**) และเลือกจำนวนรายการต่อหน้า (`5`, `10`, `50` items per page)
- บันทึกและซิงค์ข้อมูลอัตโนมัติลง **Local Storage** (`todosRaw`)

### 5. Products & Carts (`/products`, `/carts`)
- จัดการสถานะส่วนกลางด้วย **React Context API** (`AppContext`) ร่วมกับ `localStorage`
- **หน้า Products (`/products`):**
  - แสดงรายการสินค้าในรูปแบบ Grid 5 คอลัมน์ พร้อมรูปภาพ ป้ายราคา (`$XX.XX`) และชื่อสินค้า
  - เมื่อกดปุ่ม `Add to Carts` สินค้าจะถูกย้ายไปยังตะกร้าสินค้า และอัปเดตตัวเลขจำนวนสินค้าบนแถบเมนู `Products (X)` และ Badge สีแดงบนปุ่ม `Carts` ทันที
- **หน้า Carts (`/carts`):**
  - แสดงรายการสินค้าที่อยู่ในตะกร้า พร้อมปุ่ม `Remove` เพื่อนำสินค้าออกจากตะกร้ากลับไปยังหน้ารายการสินค้า
  - คำนวณและสรุปจำนวนสินค้าทั้งหมด (`Count: X items`) และราคารวมทั้งหมด (`Price: $XX.XX`)

### 6. Login & Logout (`Authentication`)
- ระบบตรวจสอบสิทธิ์ผู้ใช้งานผ่านหน้าต่าง Modal (**Who are you?**) เมื่อยังไม่ได้เข้าสู่ระบบ
- รองรับการแสดง/ซ่อนรหัสผ่าน และตรวจสอบข้อมูลผู้ใช้งานจาก `data/users.ts`
- เมื่อเข้าสู่ระบบสำเร็จ จะแสดงข้อมูล `ROLE`, `NAME`, และ `EMAIL` ที่ส่วนหัวของเว็บไซต์ พร้อมปุ่ม `Logout` บนแถบเมนูนำทาง
- จดจำสถานะการเข้าสู่ระบบไว้ใน `localStorage` ทำให้ไม่หลุดเมื่อเปลี่ยนหน้าหรือรีเฟรชเบราว์เซอร์

#### บัญชีสำหรับทดสอบระบบ Login
| Username (พิมพ์เฉพาะชื่อหน้า `@` ได้) | Password | Role | ชื่อที่แสดง |
| :--- | :--- | :--- | :--- |
| `user` (`user@company.com`) | `pass` | `USER` | น.ส. ใช้งาน ธรรมดา |
| `admin` (`admin@company.com`) | `pass` | `ADMIN` | นาย ภูมิ เดชอวยพรวงศ์ |
| `manager` (`manager@company.com`) | `pass` | `MANAGER` | นาย ภูมิ เดชอวยพรวงศ์ |
| `phoom` (`phoom@company.com`) | `pass` | `ADMIN` | นาย ภูมิ เดชอวยพรวงศ์ |

---

## โครงสร้างโปรเจกต์

```text
my-app/
├── app/
│   ├── animation/page.tsx    # หน้า Animation
│   ├── calculator/page.tsx   # หน้า Calculator (FSM)
│   ├── carts/page.tsx        # หน้าตะกร้าสินค้า (Carts)
│   ├── products/page.tsx     # หน้ารายการสินค้า (Products)
│   ├── todos/page.tsx        # หน้าจัดการรายการงาน (Todos)
│   ├── globals.css           # ตั้งค่า Tailwind CSS และ Theme
│   ├── layout.tsx            # โครงสร้างหลัก แถบเมนูนำทาง และ Provider
│   └── page.tsx              # หน้าแรก (Home & About me)
├── components/
│   ├── Header.tsx            # ส่วนหัวของเว็บและแสดงข้อมูลผู้ใช้ที่ล็อกอิน
│   ├── Footer.tsx            # ส่วนท้ายของเว็บและช่องทางติดต่อ
│   ├── LoginModal.tsx        # หน้าต่าง Modal สำหรับเข้าสู่ระบบ
│   └── tailgrids/core/       # UI Components (Badge, Button, Pagination, Table, Toggle ฯลฯ)
├── context/
│   └── AppContext.tsx        # React Context สำหรับจัดการ Products, Carts และ Authentication
├── data/
│   ├── products.ts           # ข้อมูลสินค้าเริ่มต้น
│   ├── todos.ts              # ข้อมูลรายการ Todo เริ่มต้น
│   └── users.ts              # ข้อมูลบัญชีผู้ใช้งานและฟังก์ชันตรวจสอบสิทธิ์
└── public/
    └── images/               # รูปโปรไฟล์และรูปประกอบสำหรับหน้า Animation
```

---

## วิธีการติดตั้งและรันโปรเจกต์

1. เข้าไปยังโฟลเดอร์ของโปรเจกต์:
   ```bash
   cd csi205_68051254/my-app
   ```

2. ติดตั้ง Dependencies:
   ```bash
   npm install
   ```

3. รันเซิร์ฟเวอร์สำหรับพัฒนา (Development Server):
   ```bash
   npm run dev
   ```

4. เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

---

## การนำไปใช้งานจริง (Deployment บน Vercel)
1. อัปโหลดโค้ดขึ้น **GitHub Repository**
2. เข้าสู่ระบบที่ [Vercel](https://vercel.com) แล้วเลือก **Add New Project**
3. นำเข้า (Import) GitHub Repository ของโปรเจกต์นี้
4. กด **Deploy** เพื่อเผยแพร่เว็บไซต์ออนไลน์
