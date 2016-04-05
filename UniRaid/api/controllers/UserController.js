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
			res.redirect('/user/show/'+user.id);
		});
	},
	show:function(req ,res, next){
		res.view();
	},
	index:function (req, res,next){
		var email = req.session.User.email;
		Post.find().where({'email':email}).sort('createdAt DESC').exec(function (err, posts) {
			if(err){
				req.session.flash={
					err:err
				}
				return next(err);
			}
			res.view({
				posts:posts
			})
		})
	}
};

