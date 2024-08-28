export function useFormValidation() {
  const validateLastName = (lastName: string): string[] => {
    let errors = [];
    if (lastName.length < 2)
      errors.push("Le nom doit contenir au moins 2 caractères.");
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(lastName)) {
      errors.push("Le nom ne doit contenir que des lettres.");
    }
    return errors.length > 0 ? errors : [];
  };
  const validateFirstName = (firstName: string): string[] => {
    let errors: string[] = [];
    if (firstName.length < 2)
      errors.push("Le prénom doit contenir au moins 2 caractères.");
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(firstName)) {
      errors.push("Le prénom ne doit contenir que des lettres.");
    }
    return errors.length > 0 ? errors : [];
  };
  const validateEmail = (
    email: string,
    existingEmails: string[] = []
  ): string[] => {
    let errors = [];
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      errors.push("L'adresse e-mail doit être au format 'nom@domaine.com'.");
    }
    if (existingEmails.includes(email)) {
      errors.push("Cet e-mail est déjà ajouté.");
    }
    return errors.length > 0 ? errors : [];
  };
  const validatePassword = (password: string): string[] => {
    let errors = [];
    if (password.length < 8)
      errors.push("Le mot de passe doit faire minimum 8 caractères");
    if (password.search(/[a-z]/) < 0)
      errors.push("Le mot de passe doit contenir une minuscule");
    if (password.search(/[A-Z]/) < 0)
      errors.push("Le mot de passe doit contenir une majuscule");
    if (password.search(/[0-9]/) < 0)
      errors.push("Le mot de passe doit contenir un chiffre");
    if (password.search(/[!@#$%^&*(),.?\":{}|<>+=-]/) < 0)
      errors.push("Le mot de passe doit contenir un caractère spécial");
    return errors.length > 0 ? errors : [];
  };

  const validateConfirmPassword = (
    password: string,
    passwordConfirmation: string
  ): string[] => {
    let errors = [];
    if (password !== passwordConfirmation)
      errors.push("Les mots de passe ne correspondent pas");
    return errors.length > 0 ? errors : [];
  };

  const validateGroupName = (groupName: string): string[] => {
    let errors = [];
    if (groupName.length < 2)
      errors.push("Le nom du groupe doit contenir au moins 2 caractères.");
    return errors.length > 0 ? errors : [];
  };
  return {
    validateLastName,
    validateFirstName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateGroupName,
  };
}
