const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./Model/users'); 

passport.use(
  new GoogleStrategy(
    {
      clientID: '207027428382-kp9rtopnlij5cm8s43bg4e4msdd1ertb.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback', 
      passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log('Google OAuth Strategy - Start');
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = new User({ googleId: profile.id });
            await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error('Error during Google authentication:', error);
        return done(error, false, { message: 'Error during authentication' });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
    try {
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  

module.export =  passport