import { useTranslation } from "react-i18next";

export function useFormValidation() {
  const { t } = useTranslation();

  const validateLastName = (lastName: string): string[] => {
    let errors = [];
    if (lastName.length < 2) errors.push(t("validate-data.lastname-length"));
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(lastName)) {
      errors.push(t("validate-data.lastname-type"));
    }
    return errors.length > 0 ? errors : [];
  };
  const validateFirstName = (firstName: string): string[] => {
    let errors: string[] = [];
    if (firstName.length < 2) errors.push(t("validate-data.firstname-length"));
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(firstName)) {
      errors.push(t("validate-data.firstname-type"));
    }
    return errors.length > 0 ? errors : [];
  };
  const validateEmail = (
    email: string,
    existingEmails: string[] = []
  ): string[] => {
    let errors = [];
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      errors.push(t("validate-data.email-type"));
    }
    if (existingEmails.includes(email)) {
      errors.push(t("validate-data.email-already-used"));
    }
    return errors.length > 0 ? errors : [];
  };
  const validatePassword = (password: string): string[] => {
    let errors = [];
    if (password.length < 8) errors.push(t("validate-data.password-length"));
    if (password.search(/[a-z]/) < 0)
      errors.push(t("validate-data.password-lowercase"));
    if (password.search(/[A-Z]/) < 0)
      errors.push(t("validate-data.password-uppercase"));
    if (password.search(/[0-9]/) < 0)
      errors.push(t("validate-data.password-number"));
    if (password.search(/[!@#$%^&*(),.?\":{}|<>+=-]/) < 0)
      errors.push(t("validate-data.password-special"));
    return errors.length > 0 ? errors : [];
  };

  const validateConfirmPassword = (
    password: string,
    passwordConfirmation: string
  ): string[] => {
    let errors = [];
    if (password !== passwordConfirmation)
      errors.push(t("validate-data.password-equal"));
    return errors.length > 0 ? errors : [];
  };

  const validateGroupName = (groupName: string): string[] => {
    let errors = [];
    if (groupName.length < 2) errors.push(t("validate-data.group-name-length"));
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
