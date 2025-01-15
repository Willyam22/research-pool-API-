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

router.get('/getdetailpart/:id', (req,res)=>{
    const id = req.params.id
    const sqls = `SELECT 
                    participant.*, 
                    research_pool.title 
                FROM 
                    participant 
                JOIN 
                    research_pool 
                ON 
                    participant.id_pool = research_pool.id 
                WHERE 
                    participant.id = ?`
    
    db.query(sqls,[id],(err,result)=>{
        if(err){
            return res.status(500).send('error fetching')
        }else{
            return res.status(200).json({msg:"Fetching Successfully", result})
        }
    })
})

export default router