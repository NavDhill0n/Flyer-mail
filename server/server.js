require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const authModel = require("./Models/Model");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const bodyParser = require('body-parser');


 // Import


 // Import the sendEmails route

const PORT = 5000;
const app = express();

// Middleware setup
app.use([
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  }),
  express.json(),
  express.urlencoded({ extended: true }),
]);

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/new', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Session store
const sessionStore = new MongoStore({
  mongoUrl: 'mongodb://localhost:27017/new',
  collectionName: "session",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newAuth = new authModel({
    userName,
    email,
    password: hashedPassword,
  });

  try {
    const user = await authModel.findOne({ email });
    if (user) res.json("Already Registered");
    else {
      const savedUser = await newAuth.save();
      res.send(savedUser);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// Local Login
// app.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: 'http://localhost:3000',
//   }),
//   (req, res) => {
//     try {
//       if (req.user) {
//         console.log("User authenticated:", req.user);
//         return res.json({ success: true, message: "Successfully logged in", user: req.user });
//       }
//       res.status(400).json({ error: "Authentication failed" });
//     } catch (error) {
//       console.error("Login Error:", error);
//       res.status(500).json({ error: "Internal Server Error", details: error.message });
//     }
//   }

// );
// Login route

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    let user = await authModel.findOne({ email });
    
    // If user not found
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token (without the role)
    const jwtSecret = process.env.JWT_SECRET_KEY;
    console.log("JWT Secret:", jwtSecret); 

    const token = jwt.sign(
      { id: user._id, email: user.email }, // Removed role from here
      jwtSecret, 
      { expiresIn: '1h' }
    );
    
    // Send response with token
    res.status(200).json({ token });
  } catch (err) {
    console.error(`Error during login: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});


// Logout
// app.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) res.send(err);
//     else res.json({ success: "Logged out" });
//   });
// });
// Logout route
app.post('/api/logout', (req, res) => {
  try {
    // If you are using cookies for JWT
    res.clearCookie('token'); // Clear JWT cookie on the server-side (if applicable)

    // Optionally clear session data if using express-session
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error clearing session:", err);
          return res.status(500).json({ message: "Failed to log out" });
        }
        return res.status(200).json({ message: "Logged out successfully" });
      });
    } else {
      // For stateless JWT tokens stored on the client
      return res.status(200).json({ message: "Logged out successfully" });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get("/getUser", (req, res) => {
  if (req.user) {
    res.json(req.user);
  }
});

// Forgot and Reset Password
app.post("/resetPassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err) => {
    if (err) return res.send({ Status: "Try again after a few minutes" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    authModel
      .findByIdAndUpdate({ _id: id }, { password: hashedPassword })
      .then(() => res.send({ Status: "Success" }))
      .catch((error) => res.send({ Status: error }));
  });
});

app.post("/forgotpass", async (req, res) => {
  const { email } = req.body;
  await authModel.findOne({ email }).then((user) => {
    if (!user) return res.send({ Status: "Enter a valid email" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Forgot password for flyer",
      text: `${process.env.FRONTEND_DOMAIN}/ResetPass/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ Status: "Success" });
      }
    });
  });
});

// Authentication Middleware
const authenticator = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Login Required" });
  }
  next();
};

app.post('/uploadContacts', require('./Routes/uploadContacts'));
app.post('/saveTemplate', require('./Routes/saveTemplate'));

const uploadContactsRoute = require('./Routes/uploadContacts');
const saveTemplateRoute = require('./Routes/saveTemplate');

app.use('/uploadContacts', uploadContactsRoute);
app.use('/saveTemplate', saveTemplateRoute);
const sendEmailsRoute = require('./Routes/sendEmails');
app.use('/sendEmails', sendEmailsRoute); // Correct usage

const contactUsRoute = require('./Routes/contactUs');
app.use('/contact', contactUsRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

module.exports = app;
