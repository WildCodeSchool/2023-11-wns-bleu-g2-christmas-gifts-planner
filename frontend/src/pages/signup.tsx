import { useSignupMutation } from "@/graphql/generated/schema";
import { FormEvent, useState } from "react";

function validatePassword(p: string) {
  let errors = [];
  if (p.length < 8)
    errors.push("Le mot de passe doit faire minimum 8 caractères");
  if (p.search(/[a-z]/) < 0)
    errors.push("Le mot de passe doit contenir une minuscule");
  if (p.search(/[A-Z]/) < 0)
    errors.push("Le mot de passe doit contenir une majuscule");
  if (p.search(/[0-9]/) < 0)
    errors.push("Le mot de passe doit contenir un chiffre");
  return errors;
}

export default function Signup() {
  const [error, setError] = useState("");
  const [createUser] = useSignupMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    const errors = validatePassword(formJSON.password);
    if (errors.length > 0) return setError(errors.join("\n"));
    if (formJSON.password !== formJSON.passwordConfirmation)
      return setError("les mots de passe ne coresspondent pas");

    // do not send confirmation since it's checked on the frontend
    delete formJSON.passwordConfirmation;

    try {
      const res = await createUser({ variables: { data: formJSON } });
      console.log({ res });
      alert("Vous etes bien enregistré.e. Merci !");
    } catch (e: any) {
      if (e.message === "EMAIL_ALREADY_TAKEN")
        setError("Cet e-mail est déjà pris");
      else setError("une erreur est survenue");
    }
  };

  return (
    <>
      <h1>Creer un compte</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <span>Email</span>
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            autoComplete=""
          />
        </div>
        <div>
          <label htmlFor="firstName">
            <span>Nom</span>
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            minLength={2}
            maxLength={30}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">
            <span>Prénom</span>
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            minLength={2}
            maxLength={30}
            required
          />
        </div>
        <div>
          <label htmlFor="password">
            <span>Mot de passe</span>
          </label>

          <input type="password" name="password" id="password" required />
        </div>
        <div>
          <label htmlFor="passwordConfirmation">
            <span>Confirmation</span>
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            required
          />
        </div>
        {error !== "" && <pre>{error}</pre>}
        <button>Envoyer</button>
      </form>
    </>
  );
}
