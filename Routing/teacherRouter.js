import express from 'express';

import teacherModel from '../db-utils/model.js';

const teacherRouter=express.Router();

teacherRouter.get("/",async(req,res)=>{
    try{
        const teachers=await teacherModel.find();
        res.send(teachers);
    }catch(err){
        console.log("Error:",err)
        res.status(500).send({msg:'something went wrong'})
    }
})
teacherRouter.post("/",async(req,res)=>{
    const {body}=req;
    try{
        //validates a payload for the teacher modal
        const teachers=await new teacherModel({
            ...body,
            id:Date.now().toString(),
        })
        await teachers.save()//validates and insert the records
        res.send({msg:'taecher saved successfully'});
    }catch(err){
        console.log("Error:",err)
        res.status(500).send({msg:'something went wrong'})
    }
})

teacherRouter.put("/:teacherId",async(req,res)=>{
    const {body}=req;
    const {teacherId}=req.params;
    try{
        
        const teacherObj={
            ...body,
            id:teacherId,
        }
        await new teacherModel((teacherObj)).validate();//validate manually
        await  teacherModel.updateOne({id:teacherId},{$set:teacherObj})//validates and insert the records
        res.send({msg:'taecher updated successfully'});
    }catch(err){
        console.log("Error:",err)
        res.status(500).send({msg:'something went wrong'})
    }
})
teacherRouter.delete("/:teacherId",async(req,res)=>{
    const{teacherId}=req.params;
    try{
        await teacherModel.deleteOne({id:teacherId});
        res.send({msg:"Teacher deleted successfully"})
    }catch(err){
        console.log(err)
        res.status(500).send({msg:'something went wrong'})
    }
})

export default teacherRouter