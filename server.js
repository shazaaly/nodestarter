const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
dotenv.config({
  path: './config.env',
});
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`DB connection successful!`);
  })
  .catch((Error) => console.log(Error.message));

/* create mongoose schema: */


const port = 3000;
app.listen(port, () => {
  console.log(`app is running at port : ${port}`);
});

