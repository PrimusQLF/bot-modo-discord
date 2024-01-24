const db = require('quick.db')


  exports.CheckUserInDB = function(userId){

      let user = db.fetch(`coins_${userId}`)
      if(!user) db.set(`coins_${userId}`, 0)
      else {
        
      }
  }