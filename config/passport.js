const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");

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

        let user = await usersCollection.findOne({ githubId: profile.id });
        if (!user) {
          user = {
            githubId: profile.id,
            username: profile.username || profile.displayName,
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



module.exports = passport;



