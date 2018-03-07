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
    var localTime = new Date(); //get your local time
    var utcTime = localTime.getUTCHours(); // find UTC hours
    var estTime = new Date(); // create a new date object for the EST time
    estTime.setHours(utcTime-5); // adjust it for EST hours. 

    if(resetDate.getMonth() !== estTime.getMonth()) {
      return;
    }

    resetActivity(client, db);

    if(estTime.getMonth() !== 12){
      resetDate = new Date(estTime.getFullYear(), estTime.getMonth() + 1, 1)
    }
    else{
      resetDate = new Date(estTime.getFullYear() + 1, 1, 1)
    }

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
  db.collection('members').find({}, { _id: 0 }).sort({ userName: 1 }).toArray(function(err, docs){
    if(err){
      console.log(err);
      return;
    }

    let channel = client.channels.find('name', "activitylog");

    var post = "User  |  Post Count  - Last Months Activty\n";

    for(i = 0; i < docs.length; i++ ){
      post += `${docs[i].userName}   |   ${docs[i].postCount}\n`;

      if(post.length > 1500){
        channel.send(post);
        post = "";
      }
      
      if(((docs.length - 1) == i) && post.length > 0){
        channel.send(post);
        db.collection('members').deleteMany({});
      }
    }
  });

}

module.exports = {
  updateMember: updateMember,
  checkReset: checkReset
}