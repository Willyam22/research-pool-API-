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

router.get('/mydetail/:id',(req,res)=>{
    const id  = req.params.id
    const sqls = 'SELECT * FROM research_pool WHERE id = ?'
    db.query(sqls, [id],(err,result)=>{
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