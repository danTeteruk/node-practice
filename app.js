var organisation = require("./Organisation/index");
var user = require("./User/index");
var fs = require("fs");
var parse = require('xml-parser');
var xml = fs.readFileSync('users.xml', 'utf8');
var inspect = require('util').inspect;


var obj = parse(xml);



var orgs = [];

for(var i = 0; i < obj.root.children.length; i++) {

  var currentUser = ( new user(
    obj.root.children[i].children[0].content,
    obj.root.children[i].children[1].content,
    obj.root.children[i].children[2].content,
    obj.root.children[i].children[3].content,
    obj.root.children[i].children[4].content
  )
);

  function check(search) {
    for(var j = 0; j < orgs.length; j++) {
      if (orgs[j]["name"] === search.company) return orgs[j].usr.push(search);
    }
    orgs.push(new organisation(search.company));
    return orgs[j].usr.push(search);
  }
  check(currentUser);
}



 function write() {

  var writer = fs.createWriteStream("organisation.txt");


 for (var i=0; i<orgs.length; i++) {
     writer.write(orgs[i].name + " [");
     for (var j=0; j<orgs[i].usr.length; j++) {
       writer.write(orgs[i].usr[j].name + " ,");
     }
     writer.write("]" + '\n')
   }
   writer.end(function() {
     console.log("write end");
   });
}


write();
