/** OLD CODE
function counter_fn() {
var counter = document.getElementById("VisitCounter");
var count = 69;
count = count + 1;
counter.innerHTML = count;
}
window.onload = counter_fn;
**/

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({region:'us-east-1'});

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
// Doc client for manipulating HTML
var docClient = new AWS.DynamoDB.DocumentClient();

function getCount() {
// Query parameters to be passed into request
    var params = {
        TableName: 'ViewCount',
        Key: {
            'id': {
                'S': 'Counter'
            }
        },
        ProjectionExpression: 'TotalCount'
    };

    // Call DynamoDB to read the item from table
    ddb.getItem(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Item);
            document.getElementById('VisitCounter').innerHTML = JSON.stringify(data, undefined, 2);
        }
    });
}