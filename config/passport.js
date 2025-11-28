//const passport = require("passport");
//const GitHubStrategy = require("passport-github2").Strategy;
//const { ObjectId } = require("mongodb");
//const mongodb = require("../data/database");

/* passport.use(
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
 */


const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

passport.serializeUser((user, done) => {
  // Store only the GitHub ID in the session
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Look up user in your DB or cache
  // For simplicity, you can store the whole profile in memory or DB
  const user = users.find((u) => u.id === id); // replace with DB lookup
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Instead of calling GitHub API again, store profile in DB/session
      const user = {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        emails: profile.emails,
      };

      // Save user in DB or memory
      users.push(user); // replace with DB insert
      return done(null, user);
    }
  )
);
module.exports = passport;