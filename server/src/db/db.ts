import { connect } from "mongoose";
import config from "../config/config.js";

const mongoDBConnect = () => {
  connect(config.DB_URL).then((data) => {
    console.log(`CONNECTION SUCCESSFULLY ${data.connection.host}`);
  });
};

export default mongoDBConnect;
