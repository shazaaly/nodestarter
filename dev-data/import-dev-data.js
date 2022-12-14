const { Mongoose } = require("mongoose");
const dotenv = require('dotenv');
dotenv.config('../config.env')
const fs = require('fs');
const Tour = reqiore('../models/tourModel.js')

Mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,

}).then(() => console.log(`DB connection succes!`))
    .catch((Error) => console.log(Error.message));

/*read json file */
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))
// send json data to DB //
const importData = async () => {
    try {
        await Tour.create(tours)
        console.log(`data successfully sent to DB`);
    } catch (Error) {
        console.log(Error.message);

    }
}
// delete DB from collection
const deleteData = async () => {
    try {
        await Tour.deleteMany()
        console.log(`data deleted from  DB`);

    } catch (error) {

    }

}