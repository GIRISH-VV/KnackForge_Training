export const loginService = (email, password) => {
  if (email === "admin@gmail.com" && password === "admin123") {
    return {
      name: "Admin User",
      email,
      role: "Admin",
    };
  }
  return null;
};
