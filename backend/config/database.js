const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://azwan:iCwNopZdieDZLZjR@cluster0.d7xja.mongodb.net/shopit?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then((con) => {
     console.log(
       `MongoDB Database connected with HOST: ${con.connection.host}`
     );
    });
};

module.exports = connectDatabase;
