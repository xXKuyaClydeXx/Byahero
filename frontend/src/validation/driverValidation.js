// src/validation/driverValidation.js

export function validateDriverRegistration(data) {
  const errors = [];

  // FULL NAME — letters and spaces only
  if (!/^[A-Za-z\s]+$/.test(data.fullName)) {
    errors.push("Full Name must contain letters only.");
  }

  // EMAIL — must be valid
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Please enter a valid email address.");
  }

  // PASSWORD — 8 chars with uppercase
  if (!/^(?=.*[A-Z]).{8,}$/.test(data.password)) {
    errors.push("Password must be at least 8 characters long and contain 1 uppercase letter.");
  }

  // CONTACT NUMBER — numeric, exactly 11 digits
  if (!/^[0-9]{11}$/.test(data.contactNumber)) {
    errors.push("Contact number must be exactly 11 digits.");
  }

  // ADDRESS — required
  if (!data.address.trim()) {
    errors.push("Address is required.");
  }

  // BIRTHDAY — must be 18 years old and above
  const birthYear = new Date(data.birthday).getFullYear();
  const currentYear = new Date().getFullYear();
  if (currentYear - birthYear < 18) {
    errors.push("You must be at least 18 years old to register.");
  }

  // VEHICLE TYPE — required
  if (!data.vehicleType) {
    errors.push("Vehicle type is required.");
  }

  // ROUTES — cannot be empty or equal
  if (!data.routeFrom || !data.routeTo) {
    errors.push("Both route fields are required.");
  } else if (data.routeFrom === data.routeTo) {
    errors.push("Route From and Route To cannot be the same.");
  }

  return errors;
}
