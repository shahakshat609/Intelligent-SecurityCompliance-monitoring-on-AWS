var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var app = express();

AWS.config.update({ region: 'us-west-1' });
router.get('/', (req, res) => {
    console.log("Hey, you have come to EC2 instances")
    res.send({ hi: "there" });
})
var params = {};
var ec2_client = new AWS.EC2();


//Please use this piece of code for getting ec2_info.The list has directly the info required for ec2 instances.
list_ec2_description=[]
var ec2_description=function(callback){
    ec2_client.describeInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack)
            res.send("Error in Fetching response for EC2_description function")
            return
        }
        reservations = data.Reservations
        for (var i = 0; i< reservations.length; i++) {
             instances=(reservations[i].Instances)
        for(var j=0;j<instances.length;j++)
        {
            list_ec2_description.push(instances[j])
        }

}
callback(list_ec2_description)
    })
}

//This will get all the AMI info . Right now particularly I am getting IamgeId but will change if something more is required.
list_amis = []
var account_id = '207089718578'
get_all_amis = function (callback) {
    ec2_client.describeImages(function (err, response) {
        if (err)
            console.log(err, err.stack);
        else
            images = response.Images;

        images.forEach(function (image_id) {
            if (image_id.OwnerId == '207089718578')
                //console.log(image_id.ImageId)
                list_amis.push(image_id.ImageId)
        })
        callback(list_amis)


    })

}
//Testing Function for callbacks.
function temp(){
    console.log("Calling unused amis")
    list_amis_used_in_ec2_instances=[]
    ec2_description(function (list_ec2_description) {
        for(var i=0;i<list_ec2_description.length;i++)
        {
            list_amis_used_in_ec2_instances.push(list_ec2_description.ImageId)
        }
    })
    get_all_amis(function(list_amis){
        output=[]
       for(var i=0;i<list_amis_used_in_ec2_instances.length;i++)
       {
           for(var j=0;j<list_amis.length;j++)
           {
               if(list_amis[j]!=list_amis_used_in_ec2_instances[i])
               {
                    output.push(list_amis[j]);
               }
           }
       }
       console.log(output)
        
    })
}



//Routers begin from here
//Unused AMIS(EC2 First Rule from  Excel Sheet)
router.get('/unused_amis', (req, res) => {
    console.log("Calling unused amis")
    list_amis_used_in_ec2_instances=[]
    ec2_description(function (list_ec2_description) {
        for(var i=0;i<list_ec2_description.length;i++)
        {
            list_amis_used_in_ec2_instances.push(list_ec2_description.ImageId)
        }
    })
    get_all_amis(function(list_amis){
        output=[]
       for(var i=0;i<list_amis_used_in_ec2_instances.length;i++)
       {
           for(var j=0;j<list_amis.length;j++)
           {
               if(list_amis[j]!=list_amis_used_in_ec2_instances[i])
               {
                    output.push(list_amis[j]);
               }
           }
       }
        
    })
    


})
//Unused AMIS(EC2 Second Rule from  Excel Sheet)
router.get('/underutilized_ec2_instance',(req,res)=>{
    console.log("Calling underutilized ec2 instance API")
})

temp()


module.exports = router;

