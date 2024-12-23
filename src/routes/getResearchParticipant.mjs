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

router.get('/getresearchpart/:email', (req,res)=>{
    const email = req.params.email
    const sqls = `SELECT 
                        participant.*,
                        research_pool.title,
                        user.username AS user_username,
                        researcher.username AS researcher_username
                    FROM 
                        participant
                    JOIN 
                        research_pool ON participant.id_pool = research_pool.id
                    JOIN 
                        researcher ON research_pool.researcher = researcher.email
                    JOIN 
                        user ON participant.email_user = user.email
                    WHERE 
                        research_pool.researcher = ?;`
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