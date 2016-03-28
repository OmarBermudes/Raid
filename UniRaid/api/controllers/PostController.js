/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	new:function (req, res) {
		res.view();
	},
	
	create:function (req, res) {
		var postObj={
			email:req.param('email'),
			route:req.param('route'),
			cost:req.param('cost'),
			num_contact:req.param('num_contact'),
			types:req.param('types')
		}
		User.create(postObj,function(err, post){
			if(err){
				console.log(err);
				return res.redirect('post/new');
			}
			res.redirect('post')
		})
	}	
	
};

