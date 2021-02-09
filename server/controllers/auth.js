const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

exports.gLogin = (req, res, next) => {
    const {tokenId} = req.body;
    console.log(req.body);
    client.verifyIdToken({
        idToken:tokenId,
        audience:process.env.GOOGLE_CLIENT_ID
    })
    .then(response => {
        // console.log(response);
        const {email_verified, name, email} = response.payload;
        // console.log(email_verified);
        if(email_verified) {
            // console.log("Email is verified!!!!!!!!!!!!!!!");
            User.findOne({email}).exec((err, user) => {
                if(err) {
                    // console.log("Heloooooooooooooooooooooooo");
                    console.log(err);
                    return res.status(400).json({
                        error: "Something went wrong!",
                    })
                } else {
                    // console.log('HIiiiiiiiiiiiiiiiiiii');
                    if(user) {
                        // console.log(user);
                        const token = jwt.sign(
                            {
                                email: user.email,
                                _Id: user._id.toString()
                            },
                            'privatekey',
                            { expiresIn:'12h' }
                        );
                        const{_id, name, email} = user;
                        res.json({
                            token: token,
                            user: {_id, name, email}
                        })
                    } else {
                        // console.log('whdcgaabkhnlanjf;ajf;afakpf');
                        let password = email+'mypasswordsecretkey';
                        let newUser = new User({name, email, password, email_verified});
                        newUser.save((err, data) => {
                            if(err) {
                                console.log(err);
                                return res.status(400).json({
                                    error: "Saving doesn't work!",
                                })
                            }
                            const token = jwt.sign(
                                {
                                    email: data.email,
                                    _Id: data._id.toString()
                                },
                                'privatekey',
                                { expiresIn:'12h' }
                            );
                            const{_id, name, email} = newUser;
                            res.json({
                                token: token,
                                user: {_id, name, email}
                            })
                        })
                    }
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
    })
}