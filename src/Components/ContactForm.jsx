import { useState } from "react";
import "../Styles/ContactForm.css";
import { Link } from "react-router";

//Skapa ett tomt formulär som ett objekt
const emptyForm = {
  name: "",
  email: "",
  message: "",
  agree: false,
  newsletter: false,
};

function ContactForm() {
  const [form, setForm] = useState(emptyForm); //alla input sparas i en state
  const [error, setError] = useState({}); //vid error kan vi tömma alla input

  const validate = () => {
    const newError = {};

    if (!form.name.trim()) {
      newError.name = "Name is required.";
    }

    if (!form.email.trim()) {
      newError.email = "Email is required.";
    } else if (!form.email.includes("@")) {
      newError.email = "Email must include @";
    }

    if (!form.message.trim()) {
      newError.message = "Message is required.";
    }
    if (!form.agree) {
      newError.agree = "You must accept the terms.";
    }

    return newError;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  //Förhindra att sidan laddas om, vid felaktig input
  const handleSubmit = (event) => {
    event.preventDefault();

    //Hanterar valideringen
    const newError = validate();

    //Räknar antalet fel
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    //Om allt är okej kan formuläret uppdateras med hjälp av state
    setForm(emptyForm);
    setError({});

    alert("Your message have been sent!");
  };

  return (
    <>
      <h1 className="contact-title">Contact</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            className={error.name ? "error" : ""} //om input saknas visas felmeddelande
            value={form.name} //controlled component, denna kontrollerar state
            onChange={handleChange} //uppdaterar inputfältet när det ändras
          />
          {error.name && <p className="error-message">{error.name}</p>}
        </div>

        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            className={error.email ? "error" : ""}
            value={form.email}
            onChange={handleChange}
          />
          {error.email && <p className="error-message">{error.email}</p>}
        </div>
        <div className="form-input">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message..."
            className={error.message ? "error" : ""}
            value={form.message}
            onChange={handleChange}
          />
          {error.message && <p className="error-message">{error.message}</p>}
        </div>
        <div className="checkbox-wrapper">
          <div className="checkbox">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              checked={form.agree} //checked istället för value för att det är en checkbox
              onChange={handleChange}
            />
            <label htmlFor="agree">I accept the terms</label>
          </div>
          {error.agree && <p className="error-message">{error.agree}</p>}
        </div>
        <div className="checkbox-wrapper">
          <div className="checkbox">
            <input
              id="newsletter"
              name="newsletter"
              type="checkbox"
              checked={form.newsletter}
              onChange={handleChange}
            />
            <label htmlFor="newsletter">Subscribe to our newsletter</label>
          </div>
          {/*Valfritt att fylla i checkbox, inget felmeddelande behövs*/}
        </div>
        <button type="submit" className="submit-btn">
          Send
        </button>

        <Link to="/" className="cancel-link">
          Cancel
        </Link>
      </form>
    </>
  );
}

export default ContactForm;
