const {Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel } = require("../db");

const CourseRouter = Router();

CourseRouter.get("/preview", async(req,res)=>{
    const courses = await courseModel.find({});
    res.json({courses});

});

//When user wants to purchase
CourseRouter.post("/purchase",userMiddleware, async(req,res)=>{
    try{
    const userId = req.userId;
    const courseID = req.body.courseID;
    if (!courseID) {
        return res.status(400).json({ error: "Course ID is required" });
    }


    await purchaseModel.create({ userId, courseId: courseID });

        res.json({
            message: "You have successfully bought the course"
        });

    } catch (error) {
        console.error("Error purchasing course:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = {
    CourseRouter: CourseRouter
};