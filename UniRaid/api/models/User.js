/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');
module.exports = {

  attributes: {

  	email:{
  		type:'email',
  		required:true,
  		unique:true
  	},
  	password:{
  		type:'string',
  		required:true
  	},
    password_confirmation:{
      type:'string',
      required:true
    },
    password_hash:{
      type:'string'
    },
    post:{
      type:'collection',
      via:'owner'
    }

  },

  //Crear el password_hash
  beforeCreate:function (values, next) {
    var password = values.password;
    var password_confirmation = values.password_confirmation;
    if (!password || !password_confirmation || password != password_confirmation){
      var passDontMatch = [{message:'Las contraseñas no coinciden'}];
      return next({err:passDontMatch});
    }
    bcrypt.hash(values.password,10, function (err, password_hash){
      values.password_hash = password_hash;
      values.password = null;
      values.password_confirmation = null;
      next();
    })
  }
};

