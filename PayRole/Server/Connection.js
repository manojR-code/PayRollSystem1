const Mongoose = require('mongoose');
const mong=Mongoose.connect('mongodb+srv://manoj170520055_db_user:ptlFLH6BkeyXtGJ3@cluster0.fwzdarv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('connection made')
}).catch((err) => console.log(err));
