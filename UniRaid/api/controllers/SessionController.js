/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
module.exports = {
	new:function (req, res) {
		res.view();
	},

	create:function (req, res, next){
		var email = req.param('email');
		var password = req.param('password');
		if(!email || !password){
			var noEmailorPass=[{
				message:'La combinación de usuario y contraseña no coincide.'
			}];
			req.session.flash={err:noEmailorPass};
			return res.redirect('/session/new');
		}
		User.findOneByEmail(email,function emailFounded(err, user) {
			if(err){
				console.log(err);
				req.session.flash={
					err:err
				};
				return res.redirect('/session/new');
			}
			if (!user) {
				var emailDontMatch=[{message:'No se encuentra el email'}]
				req.session.flash={
					err:emailDontMatch
				}
				return res.redirect('/session/new');
			}
			bcrypt.compare(password, user.password_hash, function passwordMatch(err, valid){
				console.log('entre a la comparacion de pass');
				if(err){
					req.session.flash={
						err:err
					}
					return res.redirect('/session/new');
				}
				if(!valid){
					var passwordDontMatch=[{
						message:'La combinación de usuario y contraseña es incorrecta'
					}];
					req.session.flash={
						err:passwordDontMatch
					}
					return res.redirect('/session/new');
				}
				req.session.authenticated=true;
				req.session.User=user;
				return res.redirect('/');
			});
		});
	}
};

