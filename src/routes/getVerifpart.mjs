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

router.get('/veripart/:id/:email', (req,res)=>{
    const email = req.params.email
    const id = req.params.id
    const idint = parseInt(id)

    const sqls = `SELECT *
                FROM participant
                WHERE id_pool = ?
                AND email_user = ?;`

    db.query(sqls, [idint, email], (err, results)=>{
        if(err){
            console.error('Error connecting to the database: ', err.stack);
            return res.status(500).send('error fetching')
        }
        if(results.length === 0 ){
            return res.status(401).send("not participate")
        }else{
            const photo = results[0]?.id
            const status = results[0]?.status
            return res.status(201).json({msg:"participated", id, status})
        }
    })
})

export default router;