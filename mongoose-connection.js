import mongoose from "mongoose";



//mongodb+srv://sivabharath:rjMOiulRXTPawoOb@cluster0.m9a8kj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0:rjMOiulRXTPawoOb@cluster0.m9a8kj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const cloudCluster=process.env.DB_CLUSTER ||"cluster0.m9a8kj2.mongodb.net";
const dbName =process.env.DB_NAME||"tamil-combined";
const dbuserName=process.env.DB_USER || ""
const dbPassword=process.env.DB_PASSWORD || "";

// const localUri=`mongodb://${dbCluster}/${dbName}`;---for db
const cloudUri=`mongodb+srv://${dbuserName}:${dbPassword}@${cloudCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`

const mongooseConnect =async()=>{
try{
    await mongoose.connect(cloudUri);
    console.log("Mongoose Connection established")

}catch(e){
    console.log("Mongoose Connection error"+e.message);
    process.exit(1)
}
}
export default mongooseConnect;