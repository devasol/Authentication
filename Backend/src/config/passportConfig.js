import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user.js";

console.log("User model:", User);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Attempting to log in with username:", username);
      const user = await User.findOne({ username });
      console.log("User found:", user);
      if (!user) return done(null, false, { message: "User Not Found" });

      console.log("Comparing passwords...");
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch);

      if (isMatch) return done(null, user);
      else return done(null, false, { message: "Incorrect password" });
    } catch (error) {
      console.error("Error in LocalStrategy:", error);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  try {
    console.log("We are inside serialized user");
    done(null, user._id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (_id, done) => {
  try {
    console.log("We are inside deserialized user user");
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
