'use client'

import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import addData from "@lib/firebase/firestore/addData";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;
  const [c_name, setC_Name] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  function getUserTimeZone() {
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return userTimeZone;
    } catch (error) {
      console.error('Error getting user time zone:', error);
      return 'N/A';
    }
  }

  // Example usage:
  const timeZone = getUserTimeZone();
  // console.log(timeZone); // Output: User's time zone (e.g., 'America/New_York', 'Europe/London', etc.)

  const handleForm = async () => {
    setApiCallInProgress(true)

    const data = {
      name: c_name,
      email,
      subject,
      message,
      timeZone
    }

    function generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;

      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
    }

    // Example usage to generate a random string of length 10
    const randomString = generateRandomString(10);

    const { error } = await addData('landing-site-messages', randomString, data)
    setApiCallInProgress(false)
    setC_Name('')
    setMessage('')
    setSubject('')
    setEmail('')

    if (error) {
      toast.error('An error occurred while sending your message');
      return console.log(error)
    }

    else {
      toast.success("Your message has been received");
    }
  }

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section row pb-0">
          <div className="col-12 md:col-6 lg:col-7">
            <div
              className="contact-form"
            >
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="name"
                  type="text"
                  value={c_name}
                  placeholder="Name"
                  onChange={(e) => setC_Name(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="subject"
                  type="text"
                  value={subject}
                  placeholder="Subject"
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-textarea w-full rounded-md"
                  rows="7"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message"
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={() => handleForm()}
                disabled={apiCallInProgress}
                style={{
                  opacity: apiCallInProgress ? '0.4' : '1'
                }}
              >
                Send Now
              </button>
            </div>
          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            {/* {markdownify(info.title, "h4")} */}
            <h4>We want to hear from you.</h4>
            {/* {markdownify(info.description, "p", "mt-4")} */}
            <p className="mt-4">We are constantly receiving feedback on how to make the platform better</p>
            <ul className="contact-list mt-5">
              <li>Mail: info@kylantis.com</li>
              {/* {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))*/}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
