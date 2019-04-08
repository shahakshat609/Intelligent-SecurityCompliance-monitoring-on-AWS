var express=require('express');
var AWS=require('aws-sdk');
var app=express();

AWS.config.update({region:'us-west-2'});
app.get('/',(req,res)=>{
    res.send({hi:"there"});
})
var paarms={};
var ec2=new AWS.EC2();
var list_security_groups=[];
let get_security_groups=function(callback){
    ec2.describeInstances(paarms,function(err,data){
    console.log("In get_security_groups func")
    if(err) 
    console.log(err);
    else
    reservations=data.Reservations
    //console.log(reservations);
    reservations.forEach(function(reservation){
        //console.log(instance.Instances);
        reservation.Instances.forEach(function(instance){
        //console.log(instance.SecurityGroups);  
        instance.SecurityGroups.forEach(function(security_group){
            
                list_security_groups.push(security_group.GroupId);
                
        })
        callback(list_security_groups)
    });
    });

    
});
}

let get_unrestricted_security_groups=function()
{
    get_security_groups(function(list){
        console.log(list);

    })

    
}

// var promise=new Promise(function(resolve,reject){
//     if(list_security_groups.length>0)
//     resolve(list_security_groups);
//     else
//     reject("Did not get security groups")
//     return promise
// })

function temp(){
    console.log("Starting the method get_sec-groups")
    get_security_groups(function(list){
        console.log(list);

    })
}
temp()