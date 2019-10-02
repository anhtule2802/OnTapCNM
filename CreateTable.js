const AWS = require('aws-sdk');

AWS.config.update({
    region:'local',
    endpoint:'http://localhost:8000',
})

let params = {
    TableName:"Game",
    KeySchema:[
        {AttributeName:"GameTitle",KeyType:"HASH"},
        {AttributeName:"GameType",KeyType:"RANGE"},       
    ],
    AttributeDefinitions:[
        {AttributeName:"GameTitle",AttributeType:'S'},
        {AttributeName:"GameType",AttributeType:'S'}
    ],
    ProvisionedThroughput:{
        ReadCapacityUnits:10,
        WriteCapacityUnits:10
    }
}

let dynamodb = new AWS.DynamoDB();

dynamodb.createTable(params,(err,data)=>{
    if(err)
    {
        console.log(`${JSON.stringify(err,null,2)}`);
    }
    else{
        console.log("Create table success")
    }
})