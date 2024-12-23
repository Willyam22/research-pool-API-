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
})

router.get('/getmypart/:email', (req,res)=>{
    const email = req.params.email
    const sqls = `SELECT 
                research_pool.id,
                research_pool.title,
                research_pool.description,
                research_pool.link,
                research_pool.created_at,
                research_pool.researcher,
                participant.status AS participant_status,
                researcher.username
            FROM research_pool
            INNER JOIN participant 
                ON research_pool.id = participant.id_pool
            INNER JOIN researcher 
                ON research_pool.researcher = researcher.email
            WHERE participant.email_user = ?;`
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