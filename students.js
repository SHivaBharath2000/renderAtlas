//simple api with local memeory
import express from 'express';
const studentRouter=express.Router();

import { students } from '../local-variable.js';
import { teachers } from '../local-variable.js';
studentRouter.get("/",(req,res)=>{
    const{teacherId}=req.query;
    if(teacherId){
    res.send({students:students.filter((stu)=>stu.teacherId===teacherId)})  
    }
    
})
studentRouter.post("/",(req,res)=>{
    const {body}=req;
    students.push({id:Date.now().toString(),...body})
    console.log(body)
    res.send({msg:"succes"})
})
studentRouter.put("/:studentId",(req,res)=>{
    const params=req.params;
    const {body}=req;
   if(Object.keys(body).length>0){
    const index=students.findIndex((stu)=>stu.id===params)
    students[index]={...body,id:params}
   }
   else{
    res.status(400).send({msg:"Please enter a student data"})
   }
    
    // res.send({msg:"data updated"})
})
studentRouter.patch("/assign-teacher/:studentId",(req,res)=>{
    const {body}=req;
    const{teacherId}=body;
    const {studentId}=req.params;
    const stuObj=students.find((student)=>student.id===studentId)
    const techObj=students.find((teacher)=>teacher.teacherId===teacherId)
    if(stuObj&techObj){
    const index=students.findIndex((student=>student.id===studentId))
    const teacherIndex=teachers.findIndex((teach=>teach.id===teacherId))

    students[index].teacherId=teacherId;
    teachers[teacherIndex].students=[...teachers[teacherIndex].students,studentId];
    res.send({msg:"teacher assigned successfully"})
    }else{
        res.status(400).send({msg:"ID not found"})
    }
})
studentRouter.delete("/:studentId",(req,res)=>{
    const{studentId}=req.params;
    if(students.filter((stu)=>stu.id==studentId).length>0){
        students=students.filter((stu)=>stu.id!==studentId);
    res.send({msg:"student deleted succcessfully"})
    }
    else{
        res.status(404).send({msg:"Student Not found"});
    }
    
})
export default studentRouter;

//adding the router