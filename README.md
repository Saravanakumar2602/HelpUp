# HelpUp — Hyper-Local Services Marketplace

🚀 **Live Preview:** [https://help-up-lzmk.vercel.app/](https://help-up-lzmk.vercel.app/)

**HelpUp** is an interactive, reliable marketplace platform designed to effortlessly connect local skilled trade workers (plumbers, electricians, cleaners, tutors, carpenters, and more) with clients who need everyday services. Built as a high-performance, single-page application with modern React and persistent browser storage.

---

## 🚀 Key Features

### For Customers:
- **Browse & Filter Pros**: Search certified workers across 10 essential home service categories (Plumbing, Electrical, Cleaning, Tutoring, Carpentry, IT Support, Gardening, Delivery, Painting, Pet Care).
- **Search & Sort**: Filter by trade category, name, or city, and sort by Customer Ratings or Hourly Rate.
- **Direct Appointment Scheduling**: Select date, time, task description, and location directly via modal or standalone booking view (`/book/:id`).
- **My Bookings Dashboard**: Manage active bookings, track status (*Pending*, *Confirmed*, *Completed*, *Cancelled*), cancel appointments, or submit verified reviews with star ratings after service completion.
- **Customer Profile**: Manage account details, city, profile photo, and review booking history.

### For Skilled Workers:
- **Interactive Worker Dashboard**: Manage your public profile, professional title, hourly rate, and service specialization.
- **Custom Service Packages**: Create, update, or remove specialized service offerings with specific rates and dates (`+ Add Job`).
- **Real-Time Client Inquiries**: Review incoming booking requests. Accept (*Confirm*), *Complete*, or *Decline* customer appointments.
- **Verified Reviews & Reputation**: Earn real star ratings and client reviews on completed jobs.

---

## 🛠️ Technology Stack

- **React 19** - Component-driven architecture.
- **React Router v7** - Client-side single page navigation with `ProtectedRoute` auth guards.
- **Centralized AuthContext & ToastContext** - Reactive authentication session and non-intrusive notification toasts.
- **Persistent Data Store** - Production-ready client-side data engine (`helpup_users`, `helpup_jobs`, `helpup_bookings`, `helpup_reviews`).
- **Modern Responsive CSS3** - Modern aesthetic optimized for desktop, tablet, and mobile displays.

---

## 🏃 Getting Started (Local Development)

### Prerequisites:
- [Node.js](https://nodejs.org/) `>= 16.0.0`
- [npm](https://www.npmjs.com/) `>= 8.0.0`

### Installation:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/helpup.git
   cd helpup
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

4. Run test suite:
   ```bash
   npm test
   ```

5. Generate production build:
   ```bash
   npm run build
   ```
