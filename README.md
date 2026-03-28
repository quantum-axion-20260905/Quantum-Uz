# Quantum Uz Monorepo

Bu loyiha bir nechta front-end ilovalari va bitta markaziy back-end xizmatini o'z ichiga olgan monorepo tuzilmasiga ega.

## Loyiha Tuzilmasi

-   **`backend/`**: Django (DRF) da yozilgan asosiy API xizmati. Ma'lumotlar bazasi va dasturiy ta'minot versiyalari nazoratini boshqaradi.
-   **`frontends/quantum-uz/`**: Asosiy Next.js veb-sayti.
-   **`frontends/ket-website/`**: Ket loyihasining front-end qismi.
-   **`frontends/dirac/`**: Dirac loyihasining front-end (Flutter/Web) qismi.

## Dasturiy ta'minot boshqaruvi (Software Version Control)

Backendda quyidagi yangi imkoniyatlar qo'shildi:
1.  **Project**: Har bir loyiha (Quantum Uz, Ket, Dirac) uchun alohida profil.
2.  **App**: Loyiha ichidagi har xil dasturlar (masalan, Windows MSIX, Android APK).
3.  **AppVersion**: Dasturlarning versiyalari, fayllari va o'zgarishlar tarixi (Release Notes).

### API Endpoints:
-   `GET /api/projects/`: Hamma loyihalar ro'yxati.
-   `GET /api/software-apps/`: Hamma dasturlar ro'yxati.
-   `GET /api/software-apps/{slug}/latest_file/`: Dasturning eng oxirgi aktiv versiyasini yuklab olish.

## Ishga tushirish (Docker)

Loyihani ishga tushirish uchun:

```bash
docker-compose up -d --build
```

Bu buyruq ma'lumotlar bazasini, backend API-ni va asosiy frontendni ishga tushiradi.
