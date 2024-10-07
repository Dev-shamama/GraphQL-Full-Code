import { connect } from "mongoose";

const mongoDBConnect = () => {
  connect('mongodb+srv://devshamama:ZPtCZBju0eXmhSD5@cluster0.byghp5c.mongodb.net/gamming').then((data) => {
    console.log(`CONNECTION SUCCESSFULLY ${data.connection.host}`);
  });
};

export default mongoDBConnect;
