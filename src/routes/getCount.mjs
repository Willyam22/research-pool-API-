import express from "express";
import mysql from "mysql2";

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbresearch'
});

router.get('/getcount/:email', (req,res)=>{
    const email = req.params.email
    const sqls = `SELECT 
                SUM(CASE WHEN status = 'APPROVED' THEN 1 ELSE 0 END) AS Approved,
                SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS Pending,
                SUM(CASE WHEN status = 'DECLINE' THEN 1 ELSE 0 END) AS Decline
             FROM participant
             WHERE email_user = ?`
    db.query(sqls, [email], (err,result)=>{
        if(err){
            console.error('Error connecting to the database: ', err.stack)
            return res.status(500).send('error fetching')
        }else{
            if(result.length > 0){
                return res.status(200).send({msg:"fetching successfully", result})
            }else{
                return res.status(200).send({msg:"response null", result})
            }
            
        }
    })
})



export default router;