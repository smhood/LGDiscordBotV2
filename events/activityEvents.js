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
    let resetDate = new Date(result.value);
    let currentDate = new Date()

    if(resetDate > currentDate) {
      return;
    }

    resetActivity(client, db);

    resetDate.setDate(resetDate.getDate() + 30);

    db.collection('settings').findAndModify(
      { key: "DataCleanDateTime" },
      [],
      { $set: { value: resetDate } }, 
      { new: true, upsert: true }, 
      function(err, doc){
        if(err){
          console.log(err);
          return;
        }
    });
  });
}

function resetActivity(client, db){
  db.collection('members').find({}, { _id: 0 }).toArray(function(err, docs){
    if(err){
      console.log(err);
      return;
    }

    let channel = client.channels.find('name', "activitylog");

    var post = "User  |  Post Count  - Last Months Activty\n";

    for(i = 0; i < docs.length; i++ ){
      post += `${docs[0].userName}  | ${docs[0].postCount}\n`;

      if(post.length > 1500){
        channel.send(post);
        post = "";
      }

      if(post.length > 0 && ((i + 1) > docs.length)){
        channel.send(post);
      }
    }
  });
}

module.exports = {
  updateMember: updateMember,
  checkReset: checkReset
}