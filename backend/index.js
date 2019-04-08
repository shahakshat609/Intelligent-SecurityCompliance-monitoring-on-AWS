var express=require('express');
var AWS=require('aws-sdk');
var path=require('path');


var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:5001',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var ec2=require('./APIs/ec2')


var app=express();

//app.use('/', index);


AWS.config.update({region:'us-west-2'});
app.get('/',(req,res)=>{
    res.send("Welcome to Intelligent Systems Dasshboard");
})

app.use('/ec2',ec2);

//app.use('/ec2', ec2);
// var paarms={};
// var ec2=new AWS.EC2();
// var list_security_groups=[];
// let get_security_groups=function(callback){
//     ec2.describeInstances(paarms,function(err,data){
//     console.log("In get_security_groups func")
//     if(err) 
//     console.log(err);
//     else
//     reservations=data.Reservations
//     //console.log(reservations);
//     reservations.forEach(function(reservation){
//         //console.log(instance.Instances);
//         reservation.Instances.forEach(function(instance){
//         //console.log(instance.SecurityGroups);  
//         instance.SecurityGroups.forEach(function(security_group){
            
//                 list_security_groups.push(security_group.GroupId);
                
//         })
//         callback(list_security_groups)
//     });
//     });

    
// });
// }

// let get_unrestricted_security_groups=function()
// {
//     get_security_groups(function(list){
//         console.log(list);

//     })


// }

// // var promise=new Promise(function(resolve,reject){
// //     if(list_security_groups.length>0)
// //     resolve(list_security_groups);
// //     else
// //     reject("Did not get security groups")
// //     return promise
// // })

// function temp(){
//     console.log("Starting the method get_sec-groups")
//     get_security_groups(function(list){
//         console.log(list);

//     })
// }
// temp()
const PORT=process.env.PORT || 5000;

app.listen(PORT);

module.exports=app;