# Implementation Plan - Frontend UI Views & Interactive Prototypes

Build out and refine the full **Frontend UI Views** of the **University Ceremony Attire Rental & Marketplace System** using React 19, Vite, and Tailwind CSS. The interface will feature rich modern aesthetics (curated colors, smooth gradients, subtle micro-animations, responsive layouts, and interactive modals) powered by realistic mock data for all roles (Student, Vendor, Admin, and Guest).

---

## User Review Required

> [!IMPORTANT]
> - All UI pages will operate with dynamic mock state management so that full user flows (Reservation creation, Student ID Upload/Verification, Vendor Product creation, Admin approval, and Order checkout) can be tested interactively directly in the browser before backend API integration.
> - The mock state will sync with `localStorage` and `AuthContext` to persist user sessions and dynamic updates seamlessly during testing.

---

## Proposed Changes

### 1. Foundation & Design System Styling

#### [MODIFY] [index.css](file:///c:/Users/Hp/rental/frontend/src/index.css)
- Add custom scrollbars, glassmorphism utility classes, smooth hover transitions, and badge/status colors (e.g. `Approved`, `Pending Verification`, `Rented`, `Available`).

---

### 2. Layout & Navigation

#### [MODIFY] [MainLayout.jsx](file:///c:/Users/Hp/rental/frontend/src/components/layout/MainLayout.jsx)
- Update navigation header to reflect active user role dynamically with notification badge, active tab highlighting, role switcher bar for testing, and mobile responsive drawer.

#### [NEW] [RoleSwitcher.jsx](file:///c:/Users/Hp/rental/frontend/src/components/common/RoleSwitcher.jsx)
- Create a quick role switcher banner/floating bar allowing instant switching between Guest, Student (Verified & Unverified), Vendor, and Admin roles during demonstration.

---

### 3. Student Experience & Booking Workflows

#### [MODIFY] [CatalogPage.jsx](file:///c:/Users/Hp/rental/frontend/src/pages/student/CatalogPage.jsx)
- Add complete interactive **Reservation & Order Modal**:
  - Date picker for rental period selection (e.g. 3-day, 7-day rentals).
  - Price calculation with automatically applied verified student discount deduction.
  - Size & Color variant selector.
  - Direct checkout trigger with simulated Chapa/Telebirr payment handshake.
- Expand product catalog items to cover Habesha traditional dresses, formal suits, graduation gowns, presentation blazers, and jewelry accessories.

#### [MODIFY] [StudentDashboard.jsx](file:///c:/Users/Hp/rental/frontend/src/pages/student/StudentDashboard.jsx)
- Add full tabs for:
  - **Active Rentals & Return Tracking**: View countdown to return date, return instructions, and return status (`On Time`, `Due Soon`, `Returned`).
  - **Orders History & Invoices**: Download receipt simulator.
  - **Student ID Verification Status**: Upload ID card photo simulator with status indicator (`Pending Review`, `Verified`, `Rejected`).
  - **Favorites & Wishlist**.

---

### 4. Vendor Management Portal

#### [MODIFY] [VendorDashboard.jsx](file:///c:/Users/Hp/rental/frontend/src/pages/vendor/VendorDashboard.jsx)
- Build multi-tab vendor management portal:
  - **Analytics Overview**: Stat cards for total revenue, active rentals, total inventory, and customer rating averages with interactive Chart.js/SVG visual trends.
  - **Inventory & Product Management**: Add/Edit product modal with image upload simulator, rental vs sale pricing options, and stock toggles.
  - **Rental Approval & Return Queue**: Approve/Reject pending reservation requests, inspect returned attire condition, and mark items as returned to inventory.

---

### 5. Administrator Control Center

#### [MODIFY] [AdminDashboard.jsx](file:///c:/Users/Hp/rental/frontend/src/pages/admin/AdminDashboard.jsx)
- Build administrator control dashboard:
  - **Platform Statistics**: Total users, verified students count, active vendors, revenue overview.
  - **Student Verification Queue**: Review submitted university student IDs with approve/reject actions.
  - **Vendor Approval Management**: Review business license registrations for new boutiques and approve shop profiles.
  - **Product & System Audit Logs**.

---

### 6. Public Landing & Auth Flow

#### [MODIFY] [LandingPage.jsx](file:///c:/Users/Hp/rental/frontend/src/pages/public/LandingPage.jsx)
- Enhance hero section with vibrant graduation banner, category showcase cards (Habesha wear, formal suits, ceremony attire, accessories), how-it-works workflow steps, and student discount CTA.

#### [MODIFY] [Register.jsx](file:///c:/Users/Hp/rental/frontend/src/pages/auth/Register.jsx) & [Login.jsx](file:///c:/Users/Hp/rental/frontend/src/pages/auth/Login.jsx)
- Add role selection during registration (Student vs Vendor) with student university ID drag-and-drop file upload simulator.

---

## Verification Plan

### Automated Build Verification
- Run `npm run build` inside `frontend/` to confirm zero JSX / bundle errors.

### Manual Verification
- Test all user flows using the quick role-switcher:
  1. **Student Flow**: Browse catalog -> filter by rental/buy -> select rental dates -> observe automatic student discount -> submit reservation -> view in Student Dashboard.
  2. **Student Verification Flow**: Navigate to profile/verification -> upload student ID file -> observe status update to "Pending" -> switch to Admin role -> approve verification -> verify student badge and discount activation.
  3. **Vendor Flow**: Log in as Vendor -> view revenue analytics -> click "Add New Product" -> fill form -> see new item appear in inventory and public catalog.
  4. **Admin Flow**: View platform stats -> inspect vendor registrations -> approve vendor -> audit transactions.
