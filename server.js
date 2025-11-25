const express = require("express");
const mongodb = require("./data/database");
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;

app
  .use(express.json())

  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  )

  //This is the basic express sessionf({..}) initialization.
  .use(passport.initialize())
  // init passport on every route call.
  .use(passport.session())
  //allow passport to use "express-session". 
   .use((req, res, next) => {
  
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
})

 .use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
 .use(cors({ origin: '*'}))
  .use("/", require("./routes"))


  /*passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },

      function (accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(null, profile);
        //}) 3
      }
    )
  ); */

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL, 
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const usersCollection = mongodb.getDatabase().collection("users");

          // Find or create user
          let user = await usersCollection.findOne({ githubId: profile.id });
          if (!user) {
            user = {
              githubId: profile.id,
              username: profile.username,
              email: profile.emails?.[0]?.value || null,
              avatar: profile.photos?.[0]?.value || null,
            };
            await usersCollection.insertOne(user);
          }

          
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});






app.get("/", (req, res) => {
  if (req.session.user) {
    const name =
      req.session.user.displayName ||
      req.session.user.username ||
      "Unknown User";
    res.send(`Logged in as ${name}`);
  } else {
    res.send("Logged Out");
  }
});




app.get('/github/callback', passport.authenticate('github', {
failureRedirect: '/api-docs', session: false}),
(req, res) => {
req.session.user = req.user;
res.redirect('/');
})





//app.use("/", require("./routes"));



mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(` Database is listening and node  Running on port ${port}`);
    });
  }
});
