export const passwordChecker = (password: string) => {
  const isValidLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const error: Record<string, boolean> = {};

  if (!isValidLength) {
    error.length = true;
  }
  if (!hasNumber) {
    error.number = true;
  }
  if (!hasSpecialChar) {
    error.specialChar = true;
  }
  return error;
};

export const encodeInput = (input: string) => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
