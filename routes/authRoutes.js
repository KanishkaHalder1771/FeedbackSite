const passport = require('passport');
module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate(
            'google',
            {
                scope: ['profile', 'email']
            }
        )
    );

    // app.get(
    //     '/auth/facebook',
    //     passport.authenticate("facebook")
    // );
    //
    // app.get(
    //     '/auth/facebook/callback',
    //     passport.authenticate('facebook')
    // );

    app.get("/fail", (req, res) => {
        res.send("Failed attempt");
    });

    app.get("/", (req, res) => {
        res.send("Success");
    });

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        function(req,res){
            res.send('You logged in as' + req.user);
        }
    );

    app.get('/api/logout', (req,res) =>{
       req.logout();
       res.send(req.user);
    });


    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
        }
    );
};