import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitContact = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/form/contact",
        { email: email, subject: subject, message: message },
        { headers: { "Content-Type": "application/json" } }
      );

      setEmail("");
      setSubject("");
      setMessage("");

      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setLoading(false);

      return toast.success(response?.data?.data);
    } catch (err) {
      if (!err?.response) {
        return toast.error("No server response.");
      }

      if (err.response?.status === 400) {
        return toast.error(err.response?.data?.errors);
      }

      err.response?.status === 401
        ? toast.error("Unathorized.")
        : toast.error(err.response?.data?.errors);
    }
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex items-center justify-center h-screen bg-neutral-900">
        <div className="m-4 w-full max-w-sm bg-neutral-800 rounded-sm shadow-lg">
          <div className="px-6 py-8">
            <h1 className="select-none text-3xl font-bold text-neutral-200 mb-6">
              Contact Support
            </h1>
            <form onSubmit={submitContact}>
              <div className="mb-6">
                <input
                  type="text"
                  autoComplete="off"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full transition ease-in px-4 py-2 rounded-sm outline-none bg-neutral-700 text-neutral-400 text-white placeholder:text-neutral-400"
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="subject"
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                  className="w-full transition ease-in px-4 py-2 rounded-sm outline-none bg-neutral-700 text-neutral-400 text-white placeholder:text-neutral-400"
                  placeholder="Subject"
                />
              </div>
              <div>
                <textarea
                  type="text"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full transition ease-in px-4 py-2 rounded-sm outline-none bg-neutral-700 text-neutral-400 text-white placeholder:text-neutral-400"
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="flex justify-between space-x-4">
                <Link
                  to="/login"
                  className="text-center disabled:bg-neutral-900 disabled:hover:bg-neutral-900 select-none w-full bg-neutral-700 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-600 py-2 px-4 mt-6 transition-colors duration-300"
                >
                  Back
                </Link>
                <button
                  disabled={loading}
                  className="disabled:bg-neutral-900 disabled:hover:bg-neutral-900 select-none w-full bg-neutral-700 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-600 py-2 px-4 mt-6 transition-colors duration-300"
                >
                  {loading ? (
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
