export const validate = (email, password) => {
    const errors = {};
  
    if (!email) {
      errors.email = "Veuillez entrer votre adresse e-mail";
    } else if (!isValidEmail(email)) {
      errors.email = "Veuillez entrer une adresse e-mail valide";
    }
  
    if (!password) {
      errors.password = "Veuillez entrer votre mot de passe";
    } else if (password.length < 5) {
      errors.password = "Le mot de passe doit avoir au moins 5 caractères";
    }
  
    return errors;
  };
  

const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  