/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	email:{
  		type:'email',
  		required:true
  	},
  	route:{
  		type:'text',
  		required:true
  	},
  	cost:{
  		type:'integer',
  		required:true
  	},
  	// Son los dtos de contacto, numero de celular etc
  	num_contact:{
  		type:'string'
  	},
  	// types es el tipo de raid, llegada a la uni o saliendo de la uni
  	types:{
  		type:'integer',
  		required:true
  	},
    hour:{
      type:'string',
      required:true
    },
  	sits:{
  		type:'integer',
  		required:true
  	},
  	notes:{
  		type:'text'
  	},
    owner:{
      model:'User'
    }
  }
};

