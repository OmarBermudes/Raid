/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	new:function (req, res) {
		res.view();
	},
	
	create:function (req, res) {
		var userObj={
			email : req.param('email'),
			password : req.param('password'),
			password_confirmation: req.param('password_confirmation')
		};
		User.create(userObj,function(err, user){
			if(err){
				console.log(err);
				req.session.flash={
					err:err
				}
				return res.redirect('user/new');
			}
			console.log("se supone que lo creo");
			res.redirect('/user/show/'+user.id);
		});
	},
	// show:function(req ,res, next){
	// 	User.findOne(req.param('id'),function userFounded(err, user){
	// 		if(err){
	// 			console.log(err);
	// 			req.session.flash={
	// 				err:err
	// 			};
	// 			return next(err);
	// 		}
	// 		res.view({
	// 			user:user
	// 		});
	// 	});
	// },
	index:function (req, res,next){
		res.view();
	}
};

