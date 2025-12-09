// src/validation/profileValidation.js

export function validateProfileUpdate(data) {
  const errors = [];

  if (!/^[A-Za-z\s]+$/.test(data.fullName)) {
    errors.push("Full Name must contain letters only.");
  }

  if (!/^[0-9]{11}$/.test(data.contactNumber)) {
    errors.push("Contact number must be exactly 11 digits.");
  }

  if (!data.address.trim()) {
    errors.push("Address cannot be empty.");
  }

  return errors;
}
