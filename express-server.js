import express from 'express';
//import teacherRouter from './Routing/teachers.js';
import teacherRouter from './Routing/teacherRouter.js';
//import studentRouter from './Routing/students/students.js';
import studentDBRouter from './Routing/studentsRouter.js';
 import todosRouter from './Routing/students/todo.js'
import connectToDb from './db-utils/mongo.connection.js';
import mongooseConnect from './db-utils/mongoose-connection.js';

const server=express();
await connectToDb()
await mongooseConnect()
server.use(express.json());  
server.get("/",(req,res)=>{
    res.send("<h1>Welcome</h1>");
})
server.post("/",(req,res)=>{
    const {body}=req
    console.log("Request Body",body)
    res.send({message:"post method is called"})
});
server.put("/",(req,res)=>{
    const {body}=req
    console.log("Request Body",body)
    res.send({message:"put method is called"})
});
server.delete("/",(req,res)=>{
    const {body}=req
    console.log("Request Body",body)
    res.send({message:"delete  method is called"})
});


server.use('/teachers',teacherRouter);
server.use('/students',studentDBRouter); 
server.use('/todos',todosRouter);

const port=8000
server.listen(port,()=>{
    console.log("server listening on port"+port);

})