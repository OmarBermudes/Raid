/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	new:function (req, res) {
		res.view('user/signin');
	},
	
	create:function (req, res) {
		var userObj={
			email : req.param('email'),
			password : req.param('password')
		}

		User.create(userObj,function(err, user){
			if(err){
				console.log(err);
				return res.redirect('user/new');
			}
			res.redirect('user')
		})
	}
	
};

