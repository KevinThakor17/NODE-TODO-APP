const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require('./config/db');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    db.query('select * from tasks order by id desc',(err,result)=>{
        if (err) {
            throw err;
        }else{
            res.render('index.ejs',{result});
        }
    })
})

app.post('/add-task',(req,res)=>{    
    db.query("insert into tasks (title) values(?)",[req.body.title],(err,result)=>{
        if (err) {
            throw err;
        }else{
            res.redirect('/');
        }
    })
})

app.get('/delete/:id',(req,res)=>{
    db.query("delete from tasks where id=?",[req.params.id],(err,result)=>{
        if (err) {
            throw err;
        }else{
            res.redirect('/');
        }
    })
})

app.get('/done/:id',(req,res)=>{
    db.query("update tasks set done=1 where id=?",[req.params.id],(err,result)=>{
        if (err) {
            throw err;
        }else{
            res.redirect('/');
        }
    })
})

app.get('/not-done/:id',(req,res)=>{
    db.query("update tasks set done=0 where id=?",[req.params.id],(err,result)=>{
        if (err) {
            throw err;
        }else{
            res.redirect('/');
        }
    })
})

app.listen(5000,(err)=>{
    if (err) {
        throw err;
    }
    console.log("App is Running");
    
})