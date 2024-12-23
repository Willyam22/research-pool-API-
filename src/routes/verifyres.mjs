import express from "express";
import mysql from 'mysql2';

const router = express.Router();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbresearch'
});

router.use(express.urlencoded({ extended: true }));

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err.stack);
        return;
    }
    console.log('Connected to the MySQL database');
});

router.get('/verifres/:email', (req, res)=>{
    const email = req.params.email
    const sql1 = `SELECT user.email, user.username, user.password 
                    FROM user 
                    WHERE user.email = ?

                    UNION

                    SELECT researcher.email, researcher.username, researcher.password 
                    FROM researcher 
                    WHERE researcher.email = ?;`
    db.query(sql1, [email, email], (err, results)=>{
        if(err){
            console.error('Error connecting to the database: ', err.stack);
            return res.status(500).send('error fetching')
        }
        if(results.length === 0){
            console.log("user: ", results)
            return res.status(201).json({msg: "user permit"})
        }else{
            return res.status(404).send({msg: 'user already exist'})
        }
    })
})


export default router;