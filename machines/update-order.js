module.exports = {


  friendlyName: 'Update Order',


  description: 'Update an order',


  cacheable: false,


  sync: false,


  inputs: {

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },


  fn: function(inputs, exits
    /**/
  ) {
    return exits.success();
  },



};