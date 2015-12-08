var server = require('net').createServer();
server.listen('2520');
var list_of_users = new Map();
var client = new Array();
var total_users = -1;
server.on('connection',function(socket)
  {
  total_users++;
  var user = "false";
  var clientname;
  var client_slice;
  socket.write("Welcome! :D Bla Bla Chat room!\n"+"Please enter nickname starting with /nick <nickname>");
  socket.setEncoding('utf8');
  socket.on('data',function(chunk)
  {
   //Logic for nickname validation
   var pattern = new RegExp(/^[\/]{1}nick [a-zA-Z]+/);
   var result = pattern.test(chunk);
   if ( user == "false" )
   {
    clientname = chunk.substring(6);
    client_slice = clientname.slice(0,clientname.length-1)
     if ( result == true)
     {
      //If the clientname is not present in the array (i.e unique) will be pushed in.
      if (client.indexOf(clientname)==-1)
      {
       client.push(clientname);
       console.log(client_slice+"\tclient connected on->"+server.address().port+"\n");
       socket.write("Hello!! :)\t"+clientname);    
       this.nickname = clientname;
       list_of_users.set(clientname,socket);
       user= list_of_users.has(clientname);
       socket.write(total_users+"\t"+"Users available in chat room:D\n"+"You can start chatting now\n");
      }
      else 
      {
       socket.write("Nickname has been already taken!:P:P Please try giving a new nickname\n");
      }
     }
     else 
     {
      socket.write("Invalid! User name must start with /nick "+"Try giving new nickname:(\n");
         }
   }
   else
   {
    //For broadcasting the messages sent by client
    list_of_users.forEach(validation);
    function validation(value,key)
    {
      if(value.nickname !== clientname)
       {
        value.write(client_slice+"\t"+"Says"+":"+chunk);
       }
    }
   } 
  });
  //Notify when client disconnects 
  socket.on('close',function(){
   list_of_users.delete(clientname);
   console.log(client_slice+"\t"+"Disconnected");
   list_of_users.forEach(disconnect);
   function disconnect(value,key){
    value.write(client_slice+"left the chat room:(\n");
   }
  });
});
server.on('listening',function()
{
console.log("server listening 2520");
});