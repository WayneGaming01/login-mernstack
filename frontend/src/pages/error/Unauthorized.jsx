import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-neutral-200 text-center flex-col">
        <span className="text-5xl text-neutral-700">
          <Link to="/login">Something's wrong here...</Link>
          <p
            style={{ textAlign: "justify", textJustify: "interword" }}
            className="justified-p-text text-lg mt-2"
          >
            The page you just requested cannot be accessed by you.
          </p>
        </span>
        <div className="flex space-x-4">
          <Link
            to="/contact-support"
            className="text-center bg-neutral-700 select-none w-full hover:bg-transparent hover:text-neutral-700 text-white border-4 border-neutral-700 hover:border-neutral-700 py-2 px-4 mt-6 transition-colors duration-300"
          >
            Help
          </Link>
          <Link
            to="/login"
            className="text-center bg-transparent select-none w-full hover:bg-neutral-700 text-neutral-700 border-4 border-neutral-700 hover:text-white py-2 px-4 mt-6 transition-colors duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
