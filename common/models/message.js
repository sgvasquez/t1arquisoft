'use strict';

module.exports = function(Message) {

  Message.observe('before save', async function(ctx){
    var time = new Date();
    time.setHours(time.getHours()-3)
    if (ctx.instance) {
      ctx.instance.createdat = time;
    } else {
      ctx.data.createdat = time;
    }
  
  });

};
