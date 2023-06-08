import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast, Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth/login",
        { username, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      setUsername("");
      setPassword("");

      setLoading(true);

      toast.success("Logging in...");

      localStorage.setItem("data", JSON.stringify(response?.data));

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);

      navigate("/");
    } catch (err) {
      if (!err?.response) {
        return toast.error("No server response.");
      }

      if (err.response?.data?.errors) {
        return toast.error(err.response?.data?.errors);
      }

      err.response?.status === 401
        ? toast.error("Unathorized.")
        : toast.error(err.response?.data?.errors);
      return;
    }
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex items-center justify-center h-screen bg-neutral-900">
        <div className="m-4 w-full max-w-sm bg-neutral-800 rounded-sm shadow-lg">
          <div className="px-6 py-8">
            <h1 className="select-none text-3xl font-bold text-neutral-200 mb-6">
              Welcome back!
            </h1>
            <form onSubmit={submitLogin}>
              <div className="mb-6">
                <input
                  type="text"
                  autoComplete="off"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="w-full transition ease-in px-4 py-2 rounded-sm outline-none bg-neutral-700 text-neutral-400 text-white placeholder:text-neutral-400"
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full transition ease-in px-4 py-2 rounded-sm outline-none bg-neutral-700 text-white text-neutral-400 placeholder:text-neutral-400"
                  placeholder="Password"
                />
              </div>
              <Link to="/contact-support" className="text-sm text-neutral-500">
                Contact support
              </Link>
              <button
                disabled={loading}
                className="disabled:bg-neutral-900 disabled:hover:bg-neutral-900 select-none w-full bg-neutral-700 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-600 py-2 px-4 mt-4 transition-colors duration-300"
              >
                {loading ? (
                  <FontAwesomeIcon icon={faCircleNotch} spin />
                ) : (
                  "Login"
                )}
              </button>
              <div className="mt-5 text-center w-full">
                <span className="text-sm text-neutral-200">
                  Don't have an account?&nbsp;
                  <Link
                    to="/signup"
                    className="text-neutral-400 hover:text-neutral-500 transition ease-in"
                  >
                    Signup
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
