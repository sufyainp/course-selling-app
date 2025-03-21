const {Router } = require("express");
const {adminModel, courseModel} = require("../db");
const AdminRouter = Router();
const {z} = require("zod");
const bcrypt = require("bcrypt");
const dotenv =require ("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");


AdminRouter.post("/signup", async (req,res)=>{
    const {email,password,firstName, lastName} = req.body;
    
    const signupSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6, "Password must be at least 6 characters"),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
    });
    try {
        const validatedData = signupSchema.parse(req.body);
        
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        const admin=await adminModel.create({
            email: validatedData.email,
            password: hashedPassword,
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
        });

        res.status(201).json({ message: "User created successfully", admin });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }

});

AdminRouter.post("/signin", async (req,res)=>{
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(403).json({ error: "Invalid email or password" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(403).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_PASSWORD, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



AdminRouter.post("/course",adminMiddleware,async (req,res)=>{

        const adminId = req.userId;

        const { title,description, imageURL, price } = req.body;

        const course =await courseModel.create({
            title,description, imageURL, price, creatorID: adminId
        });

        res.json({
            message:"course created", courseID : course._id
        });

});

AdminRouter.put("/course",adminMiddleware,async (req,res)=>{
        const adminId = req.userId;

        const { title,description, imageURL, price,courseID } = req.body;

        const course =await courseModel.updateOne({_id :courseID,creatorID:adminId},{
            title,description, imageURL, price
        });

        res.json({
            message:"course updated", courseID : course._id
        });


});

AdminRouter.get("/course/bulk",adminMiddleware,async (req,res)=>{
    const adminId = req.userId;
    const courses =await courseModel.find({creatorID:adminId});

    res.json({
        message:"Heres your courses", courses
    });
});

module.exports = {
    AdminRouter:AdminRouter
};