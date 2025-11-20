# 3D Model Editor – Next.js + Firebase

Ova aplikacija implementira zadane funkcionalnosti iz projekta te omogućava učitavanje, prikaz, manipulaciju i sinhronizaciju dva GLB 3D modela koristeći Next.js, Firestore, Three.js i React-Three-Fiber.

Aplikacija je izrađena u potpunosti u skladu sa zadatkom.

---

## 🚀 Pokretanje projekta

### 1. Instalacija zavisnosti

```bash
npm install
```

---

## 🔧 Konfiguracija Firebase Admin SDK

Aplikacija koristi Firebase Admin SDK za pristup Firestore bazi.

### 1. Kreirajte `.env.local` datoteku u root folderu:

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-admin-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

> **Napomena:**
> `FIREBASE_PRIVATE_KEY` mora koristiti `\n` umjesto stvarnih preloma linija.

---

## ▶ Pokretanje aplikacije

### Development server:

```bash
npm run dev
```

Aplikacija će biti dostupna na:

```
http://localhost:3000
```

### Production build:

```bash
npm run build
npm start
```

---

## 🗂 Firestore struktura

Firestore koristi kolekciju:

```
models/
   <modelId> {
      position: { x, y, z },
      rotation: { x, y, z },
      file: "/models/example.glb"
   }
```

Aplikacija prilikom pokretanja učitava sve modele i prikazuje ih prema spremljenim vrijednostima.

---

## 🎮 Funkcionalnosti

### ✔ 1. Učitavanje GLB modela

Modeli se učitavaju iz Firestore baze i prikazuju u sceni.

### ✔ 2. Dva prikaza scene

* **3D view** (orbit kamera)
* **2D top-down view**

Uključeno jednostavno prebacivanje prikaza.

### ✔ 3. Manipulacija modelima

* modeli se mogu slobodno pomicati (drag & drop)
* fluidno pomjeranje bez skakanja
* pozicija se ažurira u realnom vremenu
* rotacija modela se podešava preko UI kontrola

### ✔ 4. Sinhronizacija s Firestore-om

* svaka promjena se odmah sprema
* modeli nakon reload-a zadržavaju posljednje vrijednosti

### ✔ 5. Bez autentikacije

Aplikacija ne koristi login/autentikaciju — koriste se samo Admin server-side pozivi.

---

## 🛠 Tech Stack

* **Next.js 14**
* **Firebase Firestore + Admin SDK**
* **Three.js**
* **React-Three-Fiber**
* **@react-three/drei**
* **TypeScript**

---

