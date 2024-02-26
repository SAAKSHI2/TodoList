const express = require("express");
const pg = require("pg");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS,');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"Projects",
    password:"Admin123",
    port:5432
})

db.connect();


app.get('/',async(req,res)=>{
    try{
        const response = await db.query("Select * from todoList");
        const todos = [];

        response.rows.forEach((todo)=>todos.push({
            id:todo.id,
            todo : todo.todo,
            done : todo.done
        }));

        res.json(todos);

    } catch(erorr){
        res.status(404).json(res.status(404));

    }

    // db.end();
})

app.post('/add',async(req,res)=>{
    try{
        const todo = req.body.todo;
        const response = await db.query("insert into todoList (todo) values($1)",[todo]);
        res.status(200).json(todo);
    } catch(error){
        res.send(error);
    }
    // db.end();

})

app.delete('/delete/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const response = await db.query("delete from todoList where id = $1",[id]);
        res.status(200).json(id);
    } catch(error){
        res.send(error);
    }
    // db.end();

})

app.post('/update/:id',async(req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const todo = req.body.todo;
        const done = Boolean(req.body.done);

        const response = await db.query("update todoList set (todo,done) = ($1,$2) where id = $3",[todo,done,id]);
        res.status(200).json(id);
    } catch(error){
        res.send(error);
    }
    // db.end();

})

app.listen(port,()=>{
    console.log("connected to port : ", port);
})
