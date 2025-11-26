const express = require("express");
const mongodb = require("./data/database");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


//This is the basic express sessionf({..}) initialization.
app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());


app.use(
  cors({ origin: "*", methods: ["GET", "POST", "DELETE", "PUT", "PATCH"] })
);

// GitHub OAuth strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL, // must match GitHub app
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const usersCollection = mongodb.getDatabase().collection("users");

        let user = await usersCollection.findOne({ githubId: profile.id });
        if (!user) {
          user = {
            githubId: profile.id,
            username: profile.username,
            email: profile.emails?.[0]?.value || null,
            avatar: profile.photos?.[0]?.value || null,
          };
          const result = await usersCollection.insertOne(user);
          user._id = result.insertedId;
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize/deserialize using MongoDB _id
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const usersCollection = mongodb.getDatabase().collection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Routes
app.get("/", (req, res) => {
  if (req.user) {
    const name = req.user.username || "Unknown User";
    res.send(`Logged in as ${name}`);
  } else {
    res.send("Logged Out");
  }
});

app.get(
  "/auth/github",
  passport.authenticate("github")
);

app.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/api-docs" }),
  (req, res) => {
    // Build payload from GitHub profile
    const payload = {
      id: req.user.id, // GitHub user ID
      username: req.user.username, // GitHub username
    };

    // Sign JWT
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // Return token as JSON
    res.json({ token });

    //res.redirect("/");
  }
);

app.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected. Node running on port ${port}`);
    });
  }
});
