// src/validation/authValidation.js

export function validateLogin(data) {
  const errors = [];

  if (!data.email.trim()) {
    errors.push("Email is required.");
  }

  if (!data.password.trim()) {
    errors.push("Password is required.");
  }

  return errors;
}
