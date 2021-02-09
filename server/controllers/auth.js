const { validationResult } = require('express-validator');
const {OAuth2Client} = require('google-auth-library');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

exports.gLogin = (req, res,next) => {
    const {tokenId}=req.body;
    client.verifyIdToken({idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID})
    .then(response => {
        const {email_verified, name, email} = response.getPayload;
        console.log(response.payload);
    })
    // const email = req.body.email;
    // const password = req.body.password;
    // let loadedUser;
    // User.findOne({ email: email })
    // .then(user => {
    //     if(!user) {
    //         const error = new Error('User already exist');
    //         error.statusCode(401);
    //         throw error;
    //     }

    //     if(!user.isVerified) {
    //         console.log('1233445566677787');
    //         const otp = Math.floor(1000 + Math.random() * 9000).toString();
    //         console.log(otp);

    //         Otp.findOneAndRemove({ userId: user.id }, err => next(err));
    //         console.log(user);
    //         const userOtp = new Otp({
    //             otp: otp,
    //             userId: user._id
    //         })
    //         userOtp.save();

    //         transporter.sendMail ({
    //             to: email,
    //             from: 'eventsity@india.com',
    //             subject: 'Welcometo eventsity! Confirm your email',
    //             html: `<h1>Thanks for signing up with Eventsity</h1>
    //                     <h4>Here is your otp - ${otp}</h4>`
    //         });

    //         setTimeout(() => {
    //             Otp.findByIdAndRemove(userOtp._id, err => next(err))
    //         }, 200000);

    //         console.log(user.id);
    //         const error = new Error("User is not verified")
    //         error.userId = user.id;
    //         error.statusCode = 401;
    //         throw error; 
    //     }

    //     loadedUser = user;
    //     return bcrypt.compare(password, user.password);
    // })
    // .then(isEqual => {
    //     if(!isEqual) {
    //         const error = new Error('Wrong Password!');
    //         error.statusCode = 401;
    //         throw error;
    //     }
    //     const token = jwt.sign(
    //         {
    //             email: loadedUser.email,
    //             userId: loadedUser._id.toString()
    //         },
    //         'privatekey',
    //         { expiresIn:'12h' }
    //     );
    //     res.status(200).json({token: token,name: loadedUser.name , userId: loadedUser._id.toString()});
    // })
    // .catch(err => {
    //     if(!err.statusCode) {
    //         err.statusCode = 500;
    //     }
    //     next(err);
    // })
}