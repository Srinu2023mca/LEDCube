const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/UserSchema');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set the JWT token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,      // Prevents JavaScript access to the token
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      // secure:false,
      sameSite: "None",  // Strict same-site policy, needed for cross-origin requests
      maxAge: 60 * 60 * 1000, // 1 hour
      path: "/", 
    });

    // Send a success response
    res.json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  // Clear the cookie by setting it to expire immediately
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.json({ message: "Logout successful" });
};

exports.protect = async(req,res,next)=>{
  const {token}= req.cookies

  if(!token){
    res.status(400).json({
      status: "fail",
      message: "token verification failed"
    })
  } else{

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id)

  if(!user){
    res.status(400).json({
      status: "fail",
      message: "user was not found"
    })
  }
  req.user = user
  next() 
  }
}

exports.getme = async(req,res,next)=>{
  const user = req.user
  res.status(200).json({
    status: "success",
    user
  })
}
