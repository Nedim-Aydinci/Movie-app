import { useState } from "react";

//Skapa ett tomt formulär som ett objekt
const form = {
  name: "",
  email: "",
  message: "",
  agree: false,
  newsletter: false,
};

function ContactForm() {
  const [form, setFor] = useState(form); //alla input sparas i en state
  const [error, setError] = useState({}); //vid error kan vi tömma alla input

  const handleChange;

  const handleSubmit;

  return (
    <>
      <h1 className="contact-title">Contact</h1>
      <form className="form-container">
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
            <label htmlFor="newsletter">
              I want to subscribe to the newsletter
            </label>
          </div>
          {/*Valfri checkbox, inget felmeddelande behövs*/}
        </div>
        <button type="submit" className="submit-btn">
          Send
        </button>
      </form>
    </>
  );
}

export default ContactForm;
