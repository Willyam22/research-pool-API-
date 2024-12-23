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

router.post('/postforum', (req,res)=>{
    const{title, description, link, email} = req.body

    if(!title || !description || !link){
        return res.status(500).json({error: "all fields required"})
    }

    const sqls = 'INSERT INTO research_pool (Title, description, link, researcher, status) VALUES (?,?,?,?,?)'
    db.query(sqls, [title, description, link,email, 'OPEN'], (err, results)=>{
        if(err){
            console.error("error: ", err)
            return res.status(500).json({ error: 'Database error' });
        }
        return res.status(201).json({ msg: 'post insert succesfully'});
    })

})


export default router;