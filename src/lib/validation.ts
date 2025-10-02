  export const validateEmail = (email:string) => {
    // simple email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  export const validatePassword = (pwd:string) => {
    if (pwd.length < 8) return {message:"Password must be at least 8 characters long",status:false};
    if (!/[A-Z]/.test(pwd)) return {message:"Password must include at least one uppercase letter",status:false};
    if (!/\d/.test(pwd)) return {message:"Password must include at least one number",status:false};
    if (!/[!@#$%^&*]/.test(pwd)) return {message:"Password must include at least one symbol (!@#$%^&*)",status:false};
    return "";
  };