const {Router } = require("express");
const {userModel, purchaseModel} = require("../db");
const dotenv =require ("dotenv");
dotenv.config();
const UserRouter = Router();
const {z} = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 

UserRouter.post("/signup", async (req,res)=>{
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

        const user = await userModel.create({
            email: validatedData.email,
            password: hashedPassword,
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }

})

UserRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ error: "Invalid email or password" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_USER_PASSWORD, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//Already purchased
UserRouter.get("/purchases", async(req,res)=>{
    const userId = req.userId;
    const purchases= await purchaseModel.find({
        userId,
    });
    res.json({purchases});
})

module.exports = {
    UserRouter: UserRouter
}