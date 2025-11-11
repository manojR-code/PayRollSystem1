const Mongoose = require('mongoose');
Mongoose.connect(process.env.DBLINK).then(() => {
    console.log('connection made')
}).catch((err) => console.log(err));
