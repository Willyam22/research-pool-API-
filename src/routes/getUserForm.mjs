import express from "express";
import mysql from 'mysql2';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbresearch'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err.stack);
        return;
    }
    console.log('Connected to the MySQL database');
});

router.get("/userform", (req,res)=>{
    const sqls = `SELECT 
    research_pool.*, 
    researcher.username, 
    COUNT(participant.id) AS participant_count
FROM research_pool
INNER JOIN researcher 
    ON research_pool.researcher = researcher.email
LEFT JOIN participant 
    ON research_pool.id = participant.id_pool
WHERE research_pool.status = ?
GROUP BY research_pool.id, researcher.username;`

    const status = "OPEN"
    db.query(sqls, [status], (err, result)=>{
        if(err){
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