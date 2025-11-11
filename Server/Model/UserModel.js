const mongoose = require('mongoose');
const User = mongoose.Schema({
   Name: {
      type: String
   },
   Email: {
      type: String
   },
   PassWord: {
      type: String
   },
   Pno: {
      type: String
   },
   Address: {
      type: String
   },
   BaseSalary: {
      type: Number
   },
   Role: {
      type: String
   },
   Status: {
      type: String
   }
});
module.exports = mongoose.model("User", User);