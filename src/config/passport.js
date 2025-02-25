// const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
// const passport = require('passport')
// const OutlookStrategy = require('passport-outlook')
// const AppleStrategy = require('passport-apple')
// const config = require('./config')
// const { tokenTypes } = require('./tokens')
// const { User } = require('../models')
// var MicrosoftStrategy = require('passport-microsoft').Strategy
// const path = require('path')
// const jwt = require('jsonwebtoken')
// var ZoomStrategy = require('@giorgosavgeris/passport-zoom-oauth2')
// const { debugLog1, debugLog2 } = require('../utils/commonFunctions')

// const jwtOptions = {
//   secretOrKey: config.jwt.secret,
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// }

// const jwtVerify = async (payload, done) => {
//   try {
//     if (payload.type !== tokenTypes.ACCESS) {
//       throw new Error('Invalid token type')
//     }
//     const user = await User.findById(payload.id)
//     if (!user) {
//       return done(null, false)
//     }
//     done(null, user)
//   } catch (error) {
//     done(error, false)
//   }
// }

// passport.serializeUser(function (user, done) {
//   /*
//   From the user take just the id (to minimize the cookie size) and just pass the id of the user
//   to the done callback
//   PS: You dont have to do it like this its just usually done like this
//   */
//   done(null, user)
// })

// passport.deserializeUser(function (user, done) {
//   /*
//   Instead of user this function usually recives the id 
//   then you use the id to select the user from the db and pass the user obj to the done callback
//   PS: You can later access this data in any routes in: req.user
//   */
//   done(null, user)
// })

// const Google = new GoogleStrategy(
//   {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK,
//     passReqToCallback: true,
//   },
//   function (req, accessToken, refreshToken, profile, done) {
//     debugLog2('process.env.GOOGLE_CALLBACK ===> ', process.env.GOOGLE_CALLBACK)

//     const googleUserData = { accessToken, refreshToken, profile }
//     process.nextTick(async function () {
//       done(null, googleUserData)
//     })
//   }
// )

// const GoogleIntegration = new GoogleStrategy(
//   {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_INTEGRATION_CALLBACK,
//     passReqToCallback: true,
//   },
//   function (req, accessToken, refreshToken, profile, done) {
//     const googleUserData = { accessToken, refreshToken, profile }

//     process.nextTick(async function () {
//       done(null, googleUserData)
//     })
//   }
// )

// const Outlook = new MicrosoftStrategy(
//   {
//     clientID: config.TEAMS_CLIENT_ID,
//     clientSecret: config.TEAMS_CLIENT_SECRET,
//     callbackURL: config.TEAMS_CALLBACK,
//     scope: ['openid', 'profile'],
//   },
//   function (accessToken, refreshToken, profile, done) {
//     const result = { accessToken, refreshToken, profile }

//     process.nextTick(async function () {
//       done(null, result)
//     })
//   }
// )
// const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

// module.exports = {
//   jwtStrategy,
//   Google,
//   GoogleIntegration,
//   Outlook,
// }
