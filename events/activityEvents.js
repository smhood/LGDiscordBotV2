const { getDatabase } = require('../database/mongoDb');


function updateMember(message){
  const db = getDatabase();

  db.collection('members').findAndModify(
    { userName: message.author.username.toLowerCase() },
    [],
    { $inc: { postCount: 1 }, $set: { groups: message.member.roles.map(role => role.name.toLowerCase())} },
    {new: true, upsert: true}, 
    function(err, doc){
      if(err){
        console.log(err);
      }
    }
  );
}

function checkReset(client){
  const db = getDatabase();

  db.collection('settings').findOne({ key: "DataCleanDateTime" }, { _id: 0 }, function(err, result){
      db.collection('setting').findAndModify(
        { key: "DataCleanDateTime" },
         [],
        { value: new Date().toISOString() }, 
        { new: true, upsert: true }, 
        function(err, doc){
          if(err){
            console.log(err);
          }
          console.log(doc);
      });
  });
}

module.exports = {
  updateMember: updateMember,
  checkReset: checkReset
}