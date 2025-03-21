const express = require("express");
const jwt = require("jsonwebtoken");
const  mongoose = require("mongoose");
const dotenv =require ("dotenv");
dotenv.config();

const { UserRouter } = require(__dirname+"/routes/user");
const { AdminRouter } = require(__dirname+"/routes/admin");
const {CourseRouter} = require(__dirname+"/routes/course");
const app = express();
app.use(express.json());

app.use("/admin",AdminRouter)
app.use("/user", UserRouter);
app.use("/course",CourseRouter);

async function main()
{
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT);
    console.log("Listening on port 3000");
}
main().catch(err => console.log(err));