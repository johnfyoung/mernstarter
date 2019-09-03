import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { dbg } from "../util/tools";
import { User } from "../models";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETKEY;

export const passport = passport => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then(user => {
          if (user) {
            dbg("Passport: found user", user);
            return done(null, user);
          }

          dbg("Passport: found no user");
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
