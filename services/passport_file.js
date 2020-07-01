const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user , done) => {
    done(null,user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user =>{
            done(null,user);
        });
});



passport.use(
    new googleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (acessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({googleID: profile.id});
            if(existingUser){
                //User with Profile ID exists
                done(null,existingUser);
            }
            else{
                //Create new User with the ID
                const user = await new User({googleID: profile.id}).save();
                done(null, user);
            }


        }
    )
);

// passport.use(
//     new facebookStrategy(
//         {
//             clientID: keys.facebookAppID,
//             clientSecret: keys.facebookAppSecret,
//             callbackURL: "/auth/facebook/callback",
//             profileFields: ["email", "name"]
//         },
//         (accessToken, refreshToken, profile, done) => {
//             console.log('facebook profile', profile);
//             User.findOne({facebookID: profile.id})
//                 .then((existingUser) =>{
//                     if(existingUser){
//                         //User with Profile ID exists
//                         done(null,existingUser);
//                     }
//                     else{
//                         //Create new User with the ID
//                         new User({facebookID: profile.id}).save()
//                             .then(user =>
//                                 done(null, user)
//                             );
//                     }
//                 });
//         }
//     )
// );