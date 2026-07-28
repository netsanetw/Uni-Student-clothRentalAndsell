# Software Requirements Specification (SRS)

## Graduation & Ceremony Attire Rental System

**Version: 1.0**

# 1. INTRODUCTION

## 1.1 Purpose

The purpose of the **University Ceremony Attire Rental & Marketplace System** is to provide a centralized web-based platform that enables university students to browse, reserve, rent, and purchase clothing and accessories for graduation ceremonies, university programs, cultural events, presentations, and other official campus occasions.
The system connects students with registered clothing designers, boutiques, and rental vendors who offer formal wear, traditional attire, ceremonial clothing, jewelry, shoes, bags, and other fashion accessories suitable for university events.
Currently, students often face difficulties finding appropriate attire, comparing available options, accessing student discounts, reserving outfits in advance, and communicating with multiple vendors. Likewise, designers and rental businesses lack a centralized platform to showcase their products, manage inventory, process rental and purchase requests, and interact efficiently with customers.
The system replaces manual rental and sales processes with a structured digital platform that improves product discovery, reservation management, inventory tracking, order processing, payment handling, and communication between students and vendors.
To ensure that discounts and student-exclusive services are available only to eligible users, students register and verify their accounts using their university identification credentials.
The system aims to provide:
- A convenient platform for university students to discover clothing and accessories for graduation ceremonies, university programs, and other formal campus events.
- A centralized marketplace where registered designers and vendors can rent and sell clothing and accessories.
- Student verification using university identification to provide access to student-exclusive discounts and offers.
- A secure reservation, rental, and purchase workflow.
- Efficient inventory, order, and rental management for vendors.
- Improved visibility and business opportunities for designers, boutiques, and rental providers.
- A seamless communication channel between students and vendors throughout the reservation and purchasing process.

## 1.2 Scope

The University Ceremony Attire Rental & Marketplace System is a web-based marketplace platform designed for university students, clothing designers, rental vendors, boutiques, and system administrators.
The system supports the complete lifecycle of clothing rental and sales services, including user registration, student verification, product browsing, reservation, rental, purchasing, payment processing, inventory management, order tracking, notifications, customer feedback, and reporting.
The system allows authorized users to:
Register and authenticate accounts.
Verify student identity using a university ID.
Manage student, vendor, and administrator profiles.
Browse clothing and accessories for university events.
Search, filter, and sort products.
View product availability and pricing.
Reserve clothing before an event.
Rent clothing and accessories.
Purchase products.
Access verified student discounts.
Manage rental periods and returns.
Manage products and inventory.
Process payments and generate receipts.
Receive notifications regarding reservations, rentals, and purchases.
Submit product ratings and reviesws.
Generate reports and business analytics.

## Supported Products

The platform supports:

### Traditional & Cultural Wear

- Habesha clothing
- Traditional dresses
- Traditional suits
- Cultural outfits

### Formal Wear

- Men's suits
- Women's dresses
- Blazers
- Shirts
- Trousers
- Skirts

### University Event Wear

- Graduation attire
- Department event clothing
- Presentation attire
- Official ceremony outfits

### Accessories

- Jewelry
- Shoes
- Bags
- Watches
- Belts
- Scarves
- Ties
- Bouquets

### Package Offers

- Complete ceremony outfit packages
- Clothing and accessory bundles
- Designer collections

## Out of Scope

The following are outside the scope of this project:
- University admission and registration systems.
- Student academic records.
- University event organization.
- Clothing manufacturing and tailoring operations.
- Delivery fleet management.
- External social media marketing.
- Financial accounting systems beyond payment processing.

---

## 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
| --- | --- |
| SRS | Software Requirements Specification |
| UI | User Interface |
| UX | User Experience |
| API | Application Programming Interface |
| DB | Database |
| CRUD | Create, Read, Update, Delete |
| Student | Verified university user who rents or purchases products |
| Vendor | Registered designer, boutique, or rental business |
| Administrator | User responsible for managing the platform |
| Product | Clothing or accessory available for rental or purchase |
| Rental | Temporary use of a product for a specified period |
| Reservation | Booking a product before the rental or purchase date |
| Inventory | Available stock managed by vendors |
| Order | Rental or purchase transaction |
| Payment | Financial transaction between customer and vendor |
| Student Verification | Validation of a student's university identity |
| Package | Collection of clothing and accessories offered together |

---

# 2. OVERALL DESCRIPTION

## 2.1 Product Perspective

The University Ceremony Attire Rental & Marketplace System is a centralized web application that serves as an online marketplace connecting university students with clothing designers, boutiques, and rental vendors.
The platform enables students to browse products suitable for graduation ceremonies, cultural celebrations, presentations, departmental programs, and other official university events. Students can compare available products, reserve items, rent or purchase clothing, complete online payments, and receive student-exclusive discounts after successful verification.
For vendors, the platform provides tools to manage product listings, update inventory, process reservations and orders, monitor business performance, and interact with customers through a single management portal.
The administrator oversees the platform by approving vendors, managing users, monitoring transactions, generating reports, and ensuring the system operates securely and efficiently.
The platform follows a client-server architecture where a React-based frontend communicates with a Django REST API backend, while PostgreSQL manages persistent data storage.
The system consists of:
- Student Web Application
- Vendor Management Portal
- Administrator Dashboard
- Student Verification Module
- Payment Integration Module
- Notification Module
- Reporting & Analytics Module
Future versions of the system may integrate with university information systems, external payment providers, and delivery service providers.

---

## 2.2 User Classes

### Student

Students are the primary users of the system. They register using their university credentials, verify their identity, browse available clothing, reserve products, rent or purchase items, complete payments, and submit ratings and reviews.

### Designer / Vendor

Vendors include clothing designers, boutiques, and rental businesses. They manage their profiles, upload products, maintain inventory, process reservations and purchases, offer promotional discounts, and monitor sales and rental activities.

### Administrator

Administrators manage the overall platform by approving vendors, verifying users when necessary, monitoring transactions, maintaining product categories, resolving disputes, generating reports, and enforcing platform policies.

### Payment Gateway (External System)

The payment gateway securely processes online transactions and returns payment confirmation to the system.

---

## 2.3 Operating Environment

### Backend

- Django 5.x
- Django REST Framework (DRF)
- Python 3.12+

### Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Axios

### Database

- PostgreSQL

### Supporting Technologies

- JSON Web Token (JWT) Authentication
- Django CORS Headers
- Pillow
- Chart.js
- Redis (Optional)
- Celery (Optional)
Browser Support
- The application **shall support** the latest versions of:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

---

## 2.4 Major System Modules

**The system is composed of the following major functional modules:**
- Authentication & User Management
- Student Verification Management
- Product Catalog Management
- Reservation Management
- Rental Management
- Purchase & Order Management
- Inventory Management
- Vendor Management
- Discount & Promotion Management
- Payment Management
- Notification Management
- Review & Rating Management
- Reporting & Analytics

---

## 2.5 System Context Overview

- The system acts as an intermediary platform between university students and registered vendors.
- Students interact with the platform to discover, reserve, rent, and purchase clothing and accessories. Vendors use the platform to advertise products, manage inventory, and fulfill customer requests. Administrators oversee system operations and ensure smooth platform management. External payment services process online transactions, while notification services keep users informed about reservations, payments, and order status.
- This architecture provides a secure, scalable, and centralized marketplace that simplifies clothing rental and purchasing for university-related events while supporting business growth for designers and rental vendors.

# 3. FUNCTIONAL REQUIREMENTS

## FR1 User Management

Description
The system shall manage user registration, authentication, and profile management for students, vendors, and administrators.
Requirements

## FR1 User Authentication & Management

### FR1.1 Users shall register accounts.

### FR1.2 Students shall verify their identity using a valid university ID.

### FR1.3 Users shall securely log in and log out.

### FR1.4 Passwords shall be securely encrypted.

### FR1.5 Administrators shall create, update, suspend, or deactivate user accounts.

### FR1.6 The system shall assign one role to each user.

Each user profile shall contain:
- Full Name
- Email Address
- Phone Number
- Profile Picture (Optional)
- User Role
- University (Students)
- Student ID (Students)
- Business Name (Vendors)

## FR2 Vendor Management

Description
The system shall allow designers, boutiques, and rental businesses to register and manage their businesses.
Requirements

### FR2.1 Vendors shall register business accounts.

### FR2.2 Administrators shall approve vendor registrations.

### FR2.3 Vendors shall update business information.

### FR2.4 Vendors shall manage product inventory.

### FR2.5 Vendors shall monitor rental and purchase history.

## FR3 Product Management

Description
The system shall manage clothing and accessory products available for rental and purchase.
Requirements
Authorized vendors shall create products containing:
- Product Name
- Description
- Category
- Images
- Rental Price
- Purchase Price
- Available Quantity
- Product Status
Example categories include:
- Traditional Wear
- Formal Wear
- University Event Wear
- Accessories
- Package Offers
Vendors shall be able to:
- Create products.
- Update products.
- Delete products.
- Change availability status.

## FR4 Reservation & Rental Management

Description
The system shall allow students to reserve and rent available products.
Requirements
Students shall be able to:
- Reserve available products.
- Select rental dates.
- Cancel reservations before approval.
- View reservation history.
- Return rented products.
The system shall:
- Prevent double-booking.
- Track rental duration.
- Update inventory automatically.

## FR5 Purchase & Payment Management

Description
The system shall support online purchasing and payment processing.
Requirements
Students shall be able to:
- Purchase products.
- Apply available student discounts.
- Complete secure online payments.
- Download payment receipts.
- Track order status.
The system shall:
- Verify payment status.
- Record transaction history.
- Generate invoices.

## FR6 Product Search

Students shall search and filter products using:
- Category
- Price
- Size
- Vendor

## Availability

- Rental or Purchase Option

## FR7 Reviews & Ratings

Students shall be able to:
- Rate purchased or rented products.
- Review vendors.
- Edit sub**mitted reviews.**
Vendors shall view customer feedback.

## FR8 Notification Management

The system shall notify users about:
- Reservation confirmations.
- Rental approvals.
- Payment confirmations.
- Return reminders.
- Promotional offers.
- Order status updates.
Notifications may be delivered through:
- In-system notifications
- Email notifications

## FR9 Dashboard & Reporting

### Student Dashboard

Students shall view:
- Active rentals.
- Reservations.
- Purchase history.
- Favorite products.

### Vendor Dashboard

Vendors shall view:
- Total products.
- Active rentals.
- Sales statistics.
- Revenue summary.
- Customer reviews.

### Administrator Dashboard

Administrators shall view:
- Total users.
- Registered vendors.
- Products.
- Rentals.
- Orders.
- Revenue statistics.
- Platform activity.
Use Case Diagram

## Actors

- Student
- Vendor
- Administrator
- Payment Gateway

## Use Cases

- Register
- Login
- Verify Student ID
- Manage Profile
- Browse Products
- Search Products
- Reserve Products
- Rent Products
- Purchase Products
- Process Payments
- Manage Inventory
- Manage Products
- View Dashboard
- Submit Reviews
- Generate Reports
- Manage Users

# 4. SYSTEM BEHAVIOR (PROCESS FLOW)

## 4.1 User Registration Process

- User registers an account.
- Student uploads university identification (if applicable).
- System validates user information.
- Administrator approves vendor registrations.
- User account becomes active.

## 4.2 Reservation Workflow

- Student selects a product.
- Student chooses rental dates.
- System checks product availability.
- Reservation is created.
- Vendor receives notification.
- Vendor approves or rejects the reservation.
- Student receives confirmation.

## 4.3 Purchase Workflow

- Student selects a product.
- System calculates total price.
- Student discount is applied (if eligible).
- Student completes payment.
- Payment gateway confirms transaction.
- Order is recorded.
- Vendor prepares the order.
- Student receives order confirmation.

## 4.4 Rental Return Workflow

- Student returns rented products.
- Vendor inspects returned items.
- Rental status is updated.
- Inventory is updated.
- Transaction is completed.

## Diagrams

- System Context Diagram
- Use Case Diagram
- Activity Diagram – User Registration
- Activity Diagram – Reservation Workflow
- Activity Diagram – Purchase Workflow
- Sequence Diagram – Login
- Sequence Diagram – Reservation
- Sequence Diagram – Purchase

# 5. System Architecture

## 5.1 Architecture Overview

The Graduation & Ceremony Attire Rental System follows a three-tier client-server architecture consisting of the Presentation Layer, Application Layer, and Database Layer. This architecture provides scalability, security, and easy maintenance.

## 5.2 Architecture Layers

Presentation Layer
- React.js
- Tailwind CSS
- Responsive Web Interface
Application Layer
- Django
- Django REST Framework (DRF)
- JWT Authentication
- Business Logic
Database Layer
- PostgreSQL
- Product, User, Order, Rental, and Payment Data
Infrastructure Layer
- Docker
- Docker Compose
- Containerized deployment and service management

## 5.3 Major Components

- Authentication & User Management
- Student Verification
- Vendor Management
- Product Management
- Reservation & Rental Management
- Order & Payment Management
- Notification Management
- Review & Rating Management
- Reporting Dashboard

## 5.4 External Services

- Payment Gateway
- Email Notification Service

# 6. Data Requirements

## 6.1 Database Overview

The system stores user, product, rental, reservation, purchase, and payment information in a relational PostgreSQL database.

## 6.2 Main Entities

- User
- Student
- Vendor
- Product
- Category
- Reservation
- Rental
- Order
- Payment
- Review
- Notification

## 6.3 Entity Relationships

- One Vendor → Many Products
- One Student → Many Reservations
- One Student → Many Rentals
- One Student → Many Orders
- One Product → Many Reservations
- One Product → Many Reviews
- One Order → One Payment

## 6.4 Data Integrity

The system shall:
- Use primary and foreign keys.
- Prevent duplicate reservations.
- Maintain inventory consistency.
- Validate required fields before saving.

# 7. API Requirements

The system uses RESTful APIs for communication between the frontend and backend.

## Main APIs

### Authentication

- Register
- Login
- Logout

### Users

- View Profile
- Update Profile

### Products

- Create Product
- Update Product
- Delete Product
- View Products

### Reservations

- Reserve Product
- Cancel Reservation
- View Reservations

### Orders

- Create Order
- View Order History

### Payments

- Process Payment
- Verify Payment

### Reviews

- Add Review
- Update Review

# 8. User Interface (UI/UX)

## User Interfaces

- Login Page
- Registration Page

### Student Dashboard

### Vendor Dashboard

### Administrator Dashboard

- Product Catalog
- Product Details
- Reservation Page
- Checkout & Payment Page
- Profile Page

## UI Design Principles

- Responsive Design
- Easy Navigation
- Consistent Layout
- Simple Forms
- Fast Search & Filtering
- Accessible User Experience

# 9. Non-Functional Requirements

## Performance

- Pages should load within 3 seconds.
- Support multiple concurrent users.

## Security

- JWT Authentication
- Password Encryption
- Role-Based Access Control
- HTTPS Communication

## Reliability

- Daily database backup.
- Error handling and logging.

## Availability

- System availability of 99%.

## Usability

- Simple and intuitive interface.
- Mobile-friendly design.

## Maintainability

- Modular architecture.
- Well-documented source code.

## Scalability

- Support increasing numbers of users, products, and vendors without major system changes.

# 10. Assumptions & Constraints

## Assumptions

- Users have internet access.
- Students possess valid university IDs.
- Vendors provide accurate product information.
- External payment services are available.

## Constraints

- Internet connection is required.
- Payments depend on third-party gateways.
- Student discounts are available only after verification.
- The system supports modern web browsers only.
- Delivery management is outside the project scope.
.