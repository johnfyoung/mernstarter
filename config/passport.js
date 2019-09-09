import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { dbg } from "../util/tools";
import { User } from "../models";
import { jwtCookies } from "../config/constants";

const opts = {};

/**
 * Piece together the JWT from the 2 auth cookies
 * @param {*} req
 */
var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    token = `${req.cookies[jwtCookies.HEADERPAYLOAD]}.${
      req.cookies[jwtCookies.SIGNATURE]
    }`;
  }
  return token;
};

opts.jwtFromRequest = ExtractJwt.fromExtractors([cookieExtractor]);
opts.secretOrKey = process.env.SECRETKEY;

export const passport = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id).exec();

        if (user) {
          return done(null, user);
        }

        return done(null, false);
      } catch (err) {
        console.log(err);
        done(err, false);
      }
    })
  );
};
