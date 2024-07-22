import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";

const Strategy = GoogleStrategy.Strategy;

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: "/__/auth/handler",
      scope: ["profile", "email"],
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: GoogleStrategy.Profile,
      done: GoogleStrategy.VerifyCallback
    ) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user ?? null);
});

export default passport;
