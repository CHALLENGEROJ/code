var express = require('express');

//require module to deal with body of post REQUEST
var bodyParser = require('body-parser');

//creat express app
const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');

//database
const mysql = require('mysql');

// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'translation'
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});


app.use(bodyParser.json());

//GET
  app.get(['/','/index.html'], function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/home.html', function(req, res){
  res.sendFile(__dirname + '/public/home.html');
});
app.get('/js/index.js', function(req, res){
res.sendFile(__dirname + '/public/js/index.js');
});
app.get('/js/main.js', function(req, res){
res.sendFile(__dirname + '/public/js/main.js');
});
app.get('/css/main.css', function(req, res){
res.sendFile(__dirname + '/public/css/main.css');
});
app.get('/images/logo_white.png', function(req, res){
  res.sendFile(__dirname + '/public/images/logo_white.png');
});

app.get('/images/m.png', function(req, res){
  res.sendFile(__dirname + '/public/images/m.png');
});

app.get('/images/leng/england.png', function(req, res){
  res.sendFile(__dirname + '/public/images/leng/england.png');
});

app.get('/images/leng/france.png', function(req, res){
  res.sendFile(__dirname + '/public/images/leng/france.png');
});

app.get('/images/leng/germany.png', function(req, res){
  res.sendFile(__dirname + '/public/images/leng/germany.png');
});

app.get('/images/leng/italy.png', function(req, res){
  res.sendFile(__dirname + '/public/images/leng/italy.png');
});

//POST index.html
app.post(['/','/index.html'], function(req, res){

//Mimick DB REQUEST
let resData;
con.query('SELECT * FROM translator WHERE userName = ?', [req.body.Uname], (err,rows) => {
  if(err) throw err;

rows.forEach( (rows) => {
let pwd=rows.password;
let X=rows.userName;
let Y=rows.fName;
let Z=rows.lName;
global.X=X;
global.Y=Y;
global.Z=Z;
let key=0;
if(pwd==req.body.pwd)
{


resData={
  key:1,
  userName:X,
  fName:Y,
  lName:Z
};

res.send(JSON.stringify(resData));

}else{console.log('WRONG Password !');}
});

});
});


//POST home.html
app.post('/home.html', function(req, res){
//req.body SHOW ALL AJAX QUERY


con.query('SELECT * FROM item',(err,rows) => {
  if(err) throw err;

global.ITEM = [];
 rows.forEach( (rows) => {
   global.ITEM.push(rows.ID);
   global.ITEM[rows.ID]=rows.itemName;

});
global.data1=JSON.stringify(global.ITEM);


});
//Mimick DB REQUEST
let resData;
resData={
  data1:global.data1,
  ItemN:global.COUNT,
  userName:global.X,
  fName:global.Y,
  lName:global.Z
};

 res.send(JSON.stringify(resData));

});

//------------------------------------
//itemUpdate
app.post('/itemUpdate', function(req, res){
//SELECT translation from db
for (var key in req.body) {
  if (req.body.hasOwnProperty(key)){
    let item=req.body[key];
    if(item!=""&&key!='leng0'){
    TestIfAvailable(item,key);
  }
  }

}

function TestIfAvailable(item,key)
{

            //SELECT
            let x=key[4];
            let key1=key;
            let y=req.body['leng0'];

            select(x,y,key1);

}

function select(x,y,key1){
  //SELECT
  con.query('SELECT * FROM translation WHERE productID = ? AND language = ?',
  [x,y], (err,rows) => {
    update(rows);
    if (!rows.length){
      insert(rows,x,key1);
    }else{
      update(rows,key1);
    }
      });
    }

function update(rows,key1){

  rows.forEach( (rows) => {

  global.row=rows.translationID ;
  global.KEY=rows.productID ;
  global.itemToAdd = req.body[key1];

if(global.itemToAdd !=null&&rows.productID!=null)
  con.query('UPDATE translation SET producttitle = ? Where productID = ? AND language = ?'
  ,[global.itemToAdd, rows.productID,req.body['leng0']],(err, result) => {
      if (err) throw err;
      con.query('SELECT * FROM translation WHERE productID = ? AND language = ?',
      [global.KEY,req.body['leng0']], (err,rows) => {
          if (err) throw err;
          rows.forEach( (rows) => {console.log('Last update ID:', rows.translationID);
          });
      });

    });

   });
}
function insert(rows,key,key1){
//  console.log(key+" "+req.body['leng0']+" "+req.body[key1]);
  const Newtranslation = { productID: key,language: req.body['leng0'],producttitle: req.body[key1]};
  con.query('INSERT INTO translation SET ?', Newtranslation, (err, res) => {
    if(err) throw err;

    console.log('Last insert ID:', res.insertId);
  });
}


});

app.listen(8080, '127.0.0.1', function(){
  console.log('app listening on port 8080');
})
//------------------------------------
