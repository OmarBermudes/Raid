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
		// console.log(req);
		var postObj={
			email:req.param('email'),
			hour:req.param('hour'),
			route:req.param('route'),
			cost:req.param('cost'),
			num_contact:req.param('num_contact'),
			types:req.param('types'),
			sits:req.param('sits'),
			notes:req.param('notes'),
			active:1,
			owner: req.session.User.id
		}
		Post.create(postObj,function(err, post){
			if(err){
				console.log(err);
				return res.redirect('/post/new');
			}
			res.redirect('/post')
		})
	},
	index:function(req, res, next){
		var id = req.session.User.id;
		User.findOne({id:id}).populateAll().exec(function (err, owner) {
			if(err){
				req.session.flash={
					err:err
				}
				return next(err);
			}
			Post.find({owner:owner.id}).exec(function (err, posts) {
				if(err){
					req.session.flash={
						err:err
					}
					return next(err)
				}
				res.view({
					posts:posts
				})
			})
		})
	},
	arrive:function (req, res, next) {
		Post.find().where({'types':0 , 'sits':{">":0}}).sort('createdAt DESC').exec(function (err, posts) {
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
	},
	departed:function (req, res, next) {
		Post.find().where({'types':1 , 'sits':{">":0}}).sort('createdAt DESC').exec(function (err, posts) {
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
	},
	show:function(req ,res, next){
		Post.findOne(req.param('id'),function userFounded(err, post){
			if(err){
				console.log(err);
				req.session.flash={
					err:err
				}
				return next(err);
			}
			res.view({
				post:post
			})
		})
	},
	edit:function (req, res, next) {
		Post.findOne(req.param('id'), function postFounded(err, post){
			if (err){
				req.session.flash={
					err:err
				}
				return next(err);
			}
			if (!post){
				return next(err);
			}
			res.view({
				post:post
			})
		})
	},
	update:function (req, res, next) {
		var postObj={
			email:req.param('email'),
			hour:req.param('hour'),
			route:req.param('route'),
			cost:req.param('cost'),
			num_contact:req.param('num_contact'),
			types:req.param('types'),
			sits:req.param('sits'),
			notes:req.param('notes'),
			active:req.param('active'),
			owner: req.session.User.id
		}
		Post.update(req.param('id'), postObj, function postUpdated(err, post){
			if(err){
				req.session.flash = {
					err:err
				}
				return res.redirect('/post/edit/'+req.param('id'));
			}
			return res.redirect('/post/show/'+req.param('id'));
		})
	},
	destroy:function(req,res,next){
		Post.destroy(req.param('id'),function postDestroyed(err){
			if (err){
				req.session.flash={
					err:err
				}
				return next(err);
			}
			res.redirect('/post');
		})
	}
	
};

