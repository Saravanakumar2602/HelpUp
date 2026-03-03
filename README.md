# HelpUp

🚀 **Live Preview:** [https://help-up-lzmk.vercel.app/](https://help-up-lzmk.vercel.app/)

**HelpUp** is an interactive and reliable marketplace platform designed to effortlessly connect local skilled workers with customers who need everyday services. Whether you’re looking to hire for home cleaning, electrical repairs, or plumbing, or you're a skilled worker wanting to showcase your services locally, HelpUp is the bridge that brings your community together!

<br />

## 🚀 Features

### For Customers:
- **Browse Workers**: Easily search and filter workers based on your specific required services (e.g., Plumbing, IT Support, Cleaning).
- **Service Bookings**: Find a worker profile and immediately book a date and time securely.
- **My Bookings Dashboard**: Track all your past and pending bookings from an elegant layout.

### For Workers:
- **Interactive Profiles**: Build your reputation. Personalize your profile picture, title, available location, and skills.
- **Job Postings Tracker**: Keep a fast record of all the customized jobs/services you want to provide and your designated hourly rates. 
- **Booking Management**: Check the customers queuing up to use your services right from your personalized dashboard.

---

## 🛠️ Technology Stack

- **React 18** - Frontend JavaScript library for building interactive user interfaces.
- **React Router v7** - Seamless, page-refresh-free single-page-app navigation mapping and state preserving conditional routing.
- **LocalStorage Data Persistence** - HelpUp operates purely on the frontend by simulating advanced API mechanics and database mutations via structured browser-based non-volatile memory caching!
- **CSS3** - Built with distinct, beautifully categorized cascading style sheets (`globals.css`, `workerprofile.css`, etc.)

---

## 🏃 Getting Started (Local Development)

Because HelpUp's data persistence is fully reliant on LocalStorage architecture, there is no required database initialization or backend configuration required to start tracking mock users. Just spin it up and go!

### Prerequisites
- [Node.js](https://nodejs.org/) `>= 16.0.0`
- [npm](https://www.npmjs.com/) `>= 8.0.0`

### Installation

1. Clone this repository to your local machine:
```bash
git clone https://github.com/your-username/helpup.git
```

2. Navigate into the application folder:
```bash
cd helpup
```

3. Install the required Node dependencies:
```bash
npm install
```

4. Fire up the development server:
```bash
npm start
```
The application will automatically pop open in your browser at `http://localhost:3000`.

---

## 📦 Deployment

This project has been thoroughly scrubbed of all dead-end frontend mock data rendering. It relies entirely on valid authenticated states, making it absolutely perfectly ready to be instantly hosted on any standard static provider such as **Vercel**, **Netlify**, or **GitHub Pages**.

To generate a fully minified, optimized production deployment build folder:

```bash
npm run build
```

The resulting `build/` directory can then be directly uploaded to your chosen hosting provider. 

---

_Powered by community, built locally with React._
