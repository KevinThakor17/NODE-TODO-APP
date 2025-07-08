const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require('./config/db');
const ejs = require('ejs');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    db.query('select * from tasks order by id desc',(err,result)=>{
        if (err) {
            throw err;
        }else{
            res.render('index.ejs',{result,userData:null});
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
            const previousURL = req.get('Referer') || '/';
            res.redirect(previousURL);
        }
    })
})

app.get('/edit/:id',(req,res)=>{
    db.query("select * from tasks order by id desc",(err,result)=>{
        if (err) {
            throw err;
        }else{
            db.query("select * from tasks where id=?",[req.params.id],(err,userData)=>{
                if (err) {
                    throw err;
                }else{
                    res.render('index',{result,userData});
                }
            })
        }
    })
})

app.post('/update/:id',(req,res)=>{
    db.query('update tasks set title=? where id=?',[req.body.title,req.params.id],(err,result)=>{
        if (err) {
            throw err;
        }else{
            db.query('update tasks set done=0 where id=?',[req.params.id],(err,result)=>{
                if (err) {
                    throw err;
                }else{
                    res.redirect('/');
                }
            })
        }
    })
})

app.get('/not-done/:id',(req,res)=>{
    db.query("update tasks set done=0 where id=?",[req.params.id],(err,result)=>{
        if (err) {
            throw err;
        }else{
            const previousURL = req.get('Referer') || '/';
            res.redirect(previousURL);
        }
    })
})

app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`APP IS RUNNING ON PORT: ${process.env.PORT}`);
  });