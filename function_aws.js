const AWS = require('aws-sdk');
var fs = require('fs');
const function_form = require('./function_form');
AWS.config.update({
    region:'local',
    endpoint:'http://localhost:8000'
})
const docClient = new AWS.DynamoDB.DocumentClient();
function getAllItem(res){
    let params = {
        TableName:"Game",
    }
    let object = {};
    docClient.scan(params,(err,data)=>{
        if(err)
        {
            object.err = err;
        }
        else{
            object.data = data;
        }
        function_form.listTable(object,res);
    })
}

function searchItem(GameTitle,GameType,res){
    let params = {
        TableName:"Game",
    }
    let queryObject = {};
    if(GameTitle){
        if(GameType)
        {
            params.KeyConditionExpression = '#g = :GameTitle and #t = :GameType';
            params.ExpressionAttributeNames ={
                '#g':'GameTitle',
                '#t':'GameType'
            };
            params.ExpressionAttributeValues ={
                ':GameTitle':String(GameTitle),
                ':GameType':String(GameType)
            };
            docClient.query(params,(err,data)=>{
                if(err)
                {
                    console.log(`${JSON.stringify(err,null,2)}`);
                    queryObject.err = err;
                }
                else{
                    queryObject.data = data;
                }
                function_form.listTable(queryObject,res);
            })
        }
    }
}
function createItem(GameTitle,GameType,Price,AuthorName,res)
{
    let params ={
        TableName:"Game",
        Item:{
            GameTitle:String(GameTitle),
            GameType:String(GameType),
            Price:Number(Price),
            Author:{
                AuthorName:String(AuthorName),
            }
        }
    }
    docClient.put(params,(err,data)=>{
        if(err){
            console.log("Can't create items");
        }
        else{
            console.log('success');
            res.writeHead(302,{'Location':'/'});
        }
        res.end();
    })
}
function deleteItems(GameTitle,GameType,res)
{
    let params = {
        TableName:'Game',
        Key:{
            'GameTitle':String(GameTitle),
            'GameType':String(GameType)
        }
    }
    docClient.delete(params,(err,data)=>{
        if(err)
        {
            console.log('Cant delete item');
        }
        else
        {
            console.log('success');
            res.writeHead(302,{'location':'/'});
        }
        res.end();
    })
}
function updateItems(GameTitle,GameType,Price,AuthorName,res)
{
    let params = {
        TableName:"Game",
        Key:{
            "GameTitle":String(GameTitle),
            "GameType":String(GameType),
        },
        UpdateExpression:"set Author.AuthorName=:a, price=:p",
        ExpressionAttributeValues:{
            ':p':Number(Price),
            ':a':String(AuthorName)
        },
        ReturnValues:"UPDATED_NEW"
    }
    docClient.update(params,(err,data)=>{
        if(err){
            console.log(`Cant update item ${JSON.stringify(err,null,2)}`);
        }
        else{
            res.writeHead(302,{'Location':'/'});

        }
        res.end();
    })
}
module.exports = {
    getAllItem:getAllItem,
    createItem:createItem,
    searchItem:searchItem,
    deleteItems:deleteItems,
    updateItems:updateItems
}