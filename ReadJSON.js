const AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.update({
    region:'local',
    endpoint:'http://localhost:8000'
})

const docClient = new AWS.DynamoDB.DocumentClient();

const allItem = JSON.parse(fs.readFileSync('./Game.json','utf-8'));
