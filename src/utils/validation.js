// Small form validators. Each returns an error message, or "" when valid.
export const validators = {
  name: (v) => (v.trim().length < 2 ? "Enter your full name." : ""),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Enter a valid email address, like name@example.com."),
  phone: (v) => (/^\+?[0-9][0-9\s-]{6,14}$/.test(v.trim()) ? "" : "Enter a valid phone number, like +880 1700-000000."),
  password: (v) => (v.length < 8 ? "Use at least 8 characters." : ""),
  required: (label) => (v) => (String(v).trim() ? "" : `${label} is required.`),
};

// Only allow redirects to pages inside this site ("/checkout" yes, "//evil.com" no).
export function safeRedirect(path, fallback = "/account") {
  return typeof path === "string" && path.startsWith("/") && !path.startsWith("//") ? path : fallback;
}
