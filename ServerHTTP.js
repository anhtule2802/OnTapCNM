const express = require('express');
var app = express();
const function_form = require('./function_form');
const function_aws = require('./function_aws');
app.get('/',function(req,res){
    function_form.displaySearchForm(res);
    function_aws.getAllItem(res);
})
app.get('/search',function(req,res){
    if(!req.query.GameTitle && !req.query.GameType)
    {
        res.writeHead(302,{'Location':'/'});
        res.end();
    }
    else{
        function_form.displaySearchForm(res);
        function_aws.searchItem(req.query.GameTitle,req.query.GameType,res);
    }
})
app.get('/save',function(req,res){
    function_aws.updateItems(req.query.GameTitle,req.query.GameType,req.query.Price,req.query.AuthorName,res);
})
app.get('/edit',function(req,res){
    function_form.displayEdit(req.query.gametitle,req.query.gametype,req.query.price,req.query.authorname,res);
    res.end();
})
app.get('/delete',function(req,res){
    function_aws.deleteItems(req.query.gametitle,req.query.gametype,res);
})
app.get('/new',function(req,res)
{
    function_form.displayCreate(res);
    res.end();
})
app.get('/create',function(req,res){
    function_aws.createItem(req.query.GameTitle,req.query.GameType,req.query.Price,req.query.AuthorName,res);
})
app.listen(8001);