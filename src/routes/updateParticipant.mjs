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


router.post('/verifypart', (req,res)=>{
    const {id, stat} = req.body;
    const sqls = "UPDATE participant SET status = ? WHERE id = ?"
    db.query(sqls, [stat, id], (err, result)=>{
        if(err){
            res.status(500).json({error: 'Internal server error'})
            console.error(err)
        }else{
            res.status(200).json({msg: 'verify succeed'})
        }
    })
})

export default router;