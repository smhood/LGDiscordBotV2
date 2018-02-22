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
    var futureDate = new Date(result.value);
    futureDate.setDate(futureDate.getDate() + 30);
    console.log(futureDate);
    console.log(result.value);

    if(futureDate > result.value) return;

    db.collection('setting').findAndModify(
      { key: "DataCleanDateTime" },
      [],
      { $set: { value: new Date().toISOString() } }, 
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