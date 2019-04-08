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

//function to get all EC2 instances with Info
var ec2_description = function (callback) {
    list_instances_not_in_list_amis = []
    get_all_amis(function (list_amis) {

        console.log(list_amis)
        ec2_client.describeInstances(params, function (err, data) {
            if (err) {


                console.log(err, err.stack)
                res.send("ERROR")
                return
            }


            reservations = data.Reservations
            //console.log(reservations);
            for (var k = 0; k < reservations.length; k++) {
                instances = reservations[k].Instances
                for (var j = 0; j < instances.length; j++) {
                    instance = instances[j]
                    for (i = 0; i < list_amis.length; i++) {
                        if (instance.ImageId != list_amis[i])
                            list_instances_not_in_list_amis.push(instance.InstanceId)
                    }

                }

            }
            //callback has to be passed from here to ec2_secription in /unused_amis API call
            console.log("########################")
            console.log(list_instances_not_in_list_amis)

            })

            callback(list_instances_not_in_list_amis)



        })
    }



router.get('/unused_amis', (req, res) => {
    console.log("Calling unused amis")
    ec2_description(function (list_instances_not_in_list_amis) {
        res.send(list_instances_not_in_list_amis)
    })


})
list_amis = []
var account_id = '207089718578'
get_all_amis = function (callback) {
    ec2_client.describeImages(function (err, response) {
        if (err)
            console.log(err, err.stack);
        else
            images = response.Images;

        // for(var i=0;i<images.length;i++){

        //         if(images[i].OwnerId=='207089718578')
        //             console.log(images[i])
        //             list_amis.push(images[i].ImageId)


        // }
        images.forEach(function (image_id) {
            if (image_id.OwnerId == '207089718578')
                //console.log(image_id.ImageId)
                list_amis.push(image_id.ImageId)
        })
        callback(list_amis)


    })

}

ec2_description()


module.exports = router;

