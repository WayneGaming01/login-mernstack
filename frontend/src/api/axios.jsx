import axios from "axios";
import config from "../configuration/config.json";

export default axios.create({
  baseURL: `${config.SERVER_URL}:${config.PORT}`,
});

// export default axios.create({
//   baseURL: `${config.SITE_URL}`,
// });
