import { toast } from "react-hot-toast";

const Logout = async () => {
  localStorage.removeItem("data");
  location.assign("/login");
};

export default Logout;
