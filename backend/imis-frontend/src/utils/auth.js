export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Redirect to login
  window.location.href = "/";
};

// OPTIONAL (for later use)
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};