# Rizvi Bites — Rizvi College Canteen Ordering Prototype

## Run locally
Requirements: Java 21 and Maven 3.9+.

```bash
mvn spring-boot:run
```
Open http://localhost:8080

## Included in this prototype
- Responsive canteen menu, search and Veg/Non-veg/category filters
- Cart, pickup slot selection, token number and live status polling without refresh
- Demo order placement with stock checks and stock decrement
- Kitchen/staff board and order status controls (Placed → Preparing → Ready)
- Spring Boot REST endpoints for menu and orders

## Important limitations
This is a starter prototype, not a production-ready canteen system. Orders/menu are kept in memory and reset when the app restarts. MySQL properties are provided as comments but JPA entities/repositories and migrations still need to be implemented. Authentication is intentionally open for demo UI testing; before deployment, implement Spring Security with Student/Faculty/Staff/Admin roles. Wallet top-ups, real payments, discount inheritance, PDF/QR bills, email/SMS, ratings, persistent reporting and admin CRUD need implementation before live use. Do not take real payments or store real student data in this prototype.

## Suggested next milestones
1. Persist users, menu, stock, orders and wallet ledger in MySQL using JPA.
2. Add secure registration/login and role-specific authorization.
3. Add transactional checkout, wallet ledger, inventory locking and idempotency.
4. Implement `Discount` interface with `PercentDiscount`, `FlatDiscount`, `ComboDiscount`.
5. Add PDF bill + QR verification, email notifications, ratings and Chart.js reports.

## Connecting the Netlify frontend to this backend
Netlify only hosts static files, so the Java API must run somewhere else.

1. **Deploy the backend** (e.g. Render / Railway / Fly.io) using the included `Dockerfile`.
   Set env var `CORS_ORIGINS=https://earnest-cassata-d20ce0.netlify.app` (comma-separate more origins if needed).
2. **Point the frontend at it**: in the Netlify site add
   `<script>window.API_BASE = "https://YOUR-BACKEND-URL";</script>` and `frontend-connector/api.js`,
   then replace demo data/localStorage calls with `CanteenAPI.getMenu()`, `placeOrder()`, `getOrder()`, `setStatus()` etc.
3. **Local test**: `mvn spring-boot:run`, serve the frontend on http://localhost:5500 (already allowed by CORS).

Netlify is HTTPS, so the backend URL must be HTTPS too (browsers block http API calls from https pages).

Still not in the backend: login/roles, wallet, combos/discounts, ratings, sales reports, persistence.
