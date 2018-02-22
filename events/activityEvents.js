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
    let resetDate = new Date("2018-02-19T00:00:00.000Z");
    let currentDate = new Date()

    if(resetDate > currentDate) {
      return;
    }

    resetDate.setDate(resetDate.getDate() + 30);

    db.collection('setting').findAndModify(
      { key: "DataCleanDateTime" },
      [],
      { $set: { value: resetDate.toString() } }, 
      { new: true, upsert: true }, 
      function(err, doc){
        if(err){
          console.log(err);
        }
        console.log("Something wrong")
    });
  });
}

module.exports = {
  updateMember: updateMember,
  checkReset: checkReset
}