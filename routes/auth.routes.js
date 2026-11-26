const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User.model");
const { verifyToken } = require("../middlewares/auth.middlewares")


router.post("/signup", async (req, res) => {

    if (!req.body){
        res.status(400).json({message: "body not received"})
        return
    }
  const { email, password, name } = req.body;


  if (!email || !password || !name) {
    res.status(400).json({ message: "Name, Email and Password are required" });
    return;
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
) {


   res.status(400).json({
        message: "Name, email and password must be strings"
    });
    return;
}

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email) === false) {
    res.status(400).json({ message: "Invalid Email format" });
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/;
  if (passwordRegex.test(password) === false) {
    res
      .status(400)
      .json({
        message:
          "Password not strong enough. Needs a min 6 characters, max 20 characters, at least one uppercase, one lowercase and one number",
      });
    return;
  }

  const existingUser = await User.findOne({ email });
  if(existingUser) {
                res.status(409).json({message: "User already registered with that email"})
        return
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
        email: email,
        password: hashedPassword,
        name: name
    }

   await User.create(newUser)
    res.status(201).json({message: "User created"})

});

router.post("/login", async (req, res) => {
    if (!req.body){
        res.status(400).json({message: "body not received"})
        return
    }

    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({message: "Email and Password are required"})
        return // stop the route
    }

        if (
    typeof email !== "string" ||
    typeof password !== "string"
) {


   res.status(400).json({
        message: "Email and password must be strings"
    });
    return;
}

const foundUser = await User.findOne({email: email})
    if(!foundUser) {
                res.status(401).json({message: "Invalid email or password"})
                return
    }

const passwordCorrect = await bcrypt.compare(password, foundUser.password)
    if(!passwordCorrect) {
                res.status(401).json({message: "Invalid email or password"})
                return
    }

    const payload = {
        _id: foundUser._id,
        email: foundUser.email, 
        name: foundUser.name,
        role: foundUser.role
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "30d"
});
    res.status(200).json({ authToken, payload });
});

router.get('/verify', verifyToken, (req, res) => {
  res.status(200).json(req.payload);
}); 

module.exports = router;