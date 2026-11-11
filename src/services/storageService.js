// src/services/storageService.js

const USERS_KEY = "helpup_users";
const JOBS_KEY = "helpup_jobs";
const BOOKINGS_KEY = "helpup_bookings";
const REVIEWS_KEY = "helpup_reviews";

/**
 * Initialize storage with completely clean, production-grade structures.
 * Automatically purges any legacy mock/seed/test records from previous prototypes.
 */
export function initStorage() {
  try {
    // Purge legacy alternate keys from early prototypes
    localStorage.removeItem("workers");
    localStorage.removeItem("helpup_workers");
    localStorage.removeItem("customers");
    localStorage.removeItem("helpup_mock_seeded");

    // Purge any mock user records if present in helpup_users
    const rawUsers = localStorage.getItem(USERS_KEY);
    if (rawUsers) {
      try {
        const users = JSON.parse(rawUsers);
        if (Array.isArray(users)) {
          const genuineUsers = users.filter(u => {
            const idStr = String(u.id || "");
            return !idStr.startsWith("w-10") &&
                   !idStr.startsWith("pro-") &&
                   idStr !== "c-201" &&
                   u.email !== "worker@helpup.com" &&
                   u.email !== "customer@helpup.com" &&
                   !u.email?.endsWith("@helpup.pro") &&
                   !u.email?.endsWith("@helpup.in") &&
                   u.name !== "Meenakshi Ram" &&
                   u.name !== "Priya Ramanathan";
          });
          localStorage.setItem(USERS_KEY, JSON.stringify(genuineUsers));
        }
      } catch {
        localStorage.setItem(USERS_KEY, JSON.stringify([]));
      }
    } else {
      localStorage.setItem(USERS_KEY, JSON.stringify([]));
    }

    if (!localStorage.getItem(JOBS_KEY)) {
      localStorage.setItem(JOBS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(BOOKINGS_KEY)) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(REVIEWS_KEY)) {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify([]));
    }
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
    localStorage.setItem(JOBS_KEY, JSON.stringify([]));
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify([]));
    localStorage.setItem(REVIEWS_KEY, JSON.stringify([]));
  }
}

// ----------------- USERS -----------------
export function getAllUsers() {
  try {
    const list = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveAllUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUserById(id) {
  const users = getAllUsers();
  return users.find(u => String(u.id) === String(id)) || null;
}

export function getAllWorkers() {
  const users = getAllUsers();
  return users.filter(u => u.role === "worker");
}

export function updateUserProfile(updatedUser) {
  const users = getAllUsers();
  const index = users.findIndex(u => String(u.id) === String(updatedUser.id));
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    saveAllUsers(users);
  }
  return updatedUser;
}

// ----------------- JOBS / SERVICE OFFERINGS -----------------
export function getAllJobs() {
  try {
    const list = JSON.parse(localStorage.getItem(JOBS_KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveAllJobs(jobs) {
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

export function createJob(jobData, worker) {
  const jobs = getAllJobs();
  const newJob = {
    id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    workerId: worker.id,
    workerName: worker.name,
    workerAvatar: worker.img || "",
    title: jobData.title,
    description: jobData.description,
    rate: Number(jobData.rate) || 0,
    service: jobData.service || worker.service || "General Service",
    location: jobData.location || worker.location || "Local Area",
    date: jobData.date || new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString()
  };
  const updated = [newJob, ...jobs];
  saveAllJobs(updated);
  return newJob;
}

export function deleteJobById(jobId) {
  const jobs = getAllJobs();
  const updated = jobs.filter(j => String(j.id) !== String(jobId));
  saveAllJobs(updated);
  return updated;
}

// ----------------- BOOKINGS -----------------
export function getAllBookings() {
  try {
    const list = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveAllBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function createBooking({ worker, customer, service, date, time, hours, totalCost, address, notes, rate }) {
  const bookings = getAllBookings();
  const newBooking = {
    id: `bkg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    workerId: worker.id,
    workerName: worker.name,
    workerAvatar: worker.img || "",
    workerPhone: worker.phone || "Direct phone access",
    customerId: customer ? customer.id : "guest-cust",
    customerName: customer ? customer.name : "Registered Customer",
    customerEmail: customer ? customer.email : "",
    customerPhone: customer?.phone || "",
    service: service || worker.service || "Service",
    date,
    time,
    hours: Number(hours) || 2,
    totalCost: Number(totalCost) || (Number(rate) * (Number(hours) || 2)),
    address: address || customer?.location || "Client Address",
    notes: notes || "",
    rate: Number(rate) || Number(worker.rate) || 350,
    status: "Pending",
    createdAt: new Date().toISOString()
  };
  const updated = [newBooking, ...bookings];
  saveAllBookings(updated);
  return newBooking;
}

export function updateBookingStatus(bookingId, newStatus) {
  const bookings = getAllBookings();
  const index = bookings.findIndex(b => String(b.id) === String(bookingId));
  if (index !== -1) {
    bookings[index].status = newStatus;
    saveAllBookings(bookings);
  }
  return bookings;
}

// ----------------- REVIEWS -----------------
export function getAllReviews() {
  try {
    const list = JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function addReview({ workerId, customerId, customerName, rating, comment }) {
  const reviews = getAllReviews();
  const newReview = {
    id: `rev-${Date.now()}`,
    workerId: String(workerId),
    customerId: String(customerId),
    customerName: customerName || "Verified Customer",
    rating: Number(rating),
    comment: comment || "",
    createdAt: new Date().toISOString()
  };
  const updatedReviews = [newReview, ...reviews];
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(updatedReviews));

  // Recalculate worker average rating
  const workerReviews = updatedReviews.filter(r => String(r.workerId) === String(workerId));
  const avg = workerReviews.reduce((sum, r) => sum + r.rating, 0) / workerReviews.length;

  const users = getAllUsers();
  const workerIndex = users.findIndex(u => String(u.id) === String(workerId));
  if (workerIndex !== -1) {
    users[workerIndex] = {
      ...users[workerIndex],
      rating: Number(avg.toFixed(1)),
      reviewCount: workerReviews.length
    };
    saveAllUsers(users);
  }

  return newReview;
}
