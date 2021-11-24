const auth = require("../auth");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

getLoggedIn = async (req, res) => {
  try {
    let userId = auth.verifyUser(req);
    if (!userId) {
      return res.status(200).json({
        loggedIn: false,
        user: null,
        errorMessage: "?",
      });
    }

    const loggedInUser = await User.findOne({ _id: userId });
    console.log("loggedInUser: " + loggedInUser);

    return res.status(200).json({
      loggedIn: true,
      user: {
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
      },
    });
  } catch (err) {
    console.log("err: " + err);
    res.json(false);
  }
};

logoutUser = async (req, res) => {
  auth.verify(req, res, async function () {
    await res
      .clearCookie("token")
      .status(200)
      .json({
        success: true,
        loggedIn: false,
        user: null,
      })
      .send();
  });
};

loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        success: false,
        errorMessage: "Wrong password or email, son.",
      });
    }

    const token = auth.signToken(existingUser);

    await res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        user: {
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
        },
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordVerify, username } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordVerify ||
      !username
    ) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    if (password.length < 8) {
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 8 characters.",
      });
    }
    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errorMessage: "An account with this email address already exists.",
      });
    }

    const existingUserName = await User.findOne({ username: username });
    if (existingUserName) {
      return res.status(400).json({
        success: false,
        errorMessage: "An account with this username already exists.",
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash,
      username,
    });
    const savedUser = await newUser.save();

    // LOGIN THE USER
    const token = auth.signToken(savedUser);

    await res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        user: {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          passwordHash: savedUser.passwordHash,
          username: savedUser.username,
        },
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
};
