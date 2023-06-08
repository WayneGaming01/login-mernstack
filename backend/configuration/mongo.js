const mongoose = require("mongoose");
const config = require("./config.json");

module.exports = async () => {
  await mongoose.connect(config.MONGODB_CLUSTER);
  return mongoose;
};

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to mongo!");
});
