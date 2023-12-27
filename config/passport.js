const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../Model/users');
const { secret } = require('../utils');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      return done(err, false, { message: 'Error while authenticating user' });
    }
  })
);

module.exports = passport;
