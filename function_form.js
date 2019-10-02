var fs = require('fs');
function displaySearchForm(res){
    data = fs.readFileSync('./SearchForm.html','utf-8');
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(data);
}
function listTable(obj,res){
    let table = '<table border="1px solid black"><tr><th>Game Title</th><th>Game Type</th><th>Price</th><th>Author Name</th><th>...</th></tr>'
    res.write(table);
    if(obj.err)
    {
        res.write("<h5>Error</h5>");
    }
    else{
        if(obj.data.Items.length == 0)
        {
            res.write("<h2>Nothing to show</h2>");
        }
        obj.data.Items.forEach((game)=>{
            res.write(`<tr><td>${game.GameTitle}</td><td>${game.GameType}</td><td>${game.Price}</td><td>${game.Author.AuthorName}</td><td><a href="/delete?gametitle=${game.GameTitle}&gametype=${game.GameType}">Delete</a>
            <a href="/edit?gametitle=${game.GameTitle}&gametype=${game.GameType}&price=${game.Price}&authorname=${game.Author.AuthorName}">Edit</a></td></tr>`);
        });
    }
    res.write("</table>")
    res.end();
}
function displayCreate(res){
    let data = fs.readFileSync('./CreateItems.html','utf-8');
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(data);
}
function displayEdit(GameTitle,GameType,Price,AuthorName,res)
{
    let data = fs.readFileSync('./EditForm.html','utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    data = replaceGameTitleValue(data,GameTitle);
    data = replaceGameTypeValue(data,GameType);
    data = replacePriceValue(data,Price);
    data = replaceAuthorNameValue(data,AuthorName);
    res.write(data);
}
function replaceGameTitleValue(data,GameTitle){
    let str = '<input name="GameTitle" type="text" readonly="readonly"/>';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0,index) + `value="${GameTitle}"`+ data.substr(index);
}
function replaceGameTypeValue(data,GameTitle){
    let str = '<input name="GameType" type="text" readonly="readonly"/>';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0,index) + `value="${GameTitle}"`+ data.substr(index);
}
function replacePriceValue(data,GameTitle){
    let str = '<input name="Price" type="text"/>';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0,index) + `value="${GameTitle}"`+ data.substr(index);
}
function replaceAuthorNameValue(data,GameTitle){
    let str = '<input name="AuthorName" type="text"/>';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0,index) + `value="${GameTitle}"`+ data.substr(index);
}
module.exports = {
    displaySearchForm:displaySearchForm,
    listTable:listTable,
    displayCreate:displayCreate,
    displayEdit:displayEdit
}
