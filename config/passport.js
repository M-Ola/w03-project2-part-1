const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");

// Configure GitHub OAuth strategy
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

        // Try to find existing user
        let user = await usersCollection.findOne({ githubId: profile.id });

        // If not found, insert new user
        if (!user) {
          const newUser = {
            githubId: profile.id,
            username: profile.username || profile.displayName,
            email: profile.emails?.[0]?.value || null,
            avatar: profile.photos?.[0]?.value || null,
          };

          const result = await usersCollection.insertOne(newUser);
          newUser._id = result.insertedId;
          user = newUser;
        }

        // Pass user object to Passport
        return done(null, user);
      } catch (err) {
        console.error("Error in GitHubStrategy:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user._id?.toString());
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const usersCollection = mongodb.getDatabase().collection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    console.error("Error in deserializeUser:", err);
    done(err, null);
  }
});

module.exports = passport;
