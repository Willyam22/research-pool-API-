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

router.post('/register', (req, res) => { 
    const {email, username, password, type} = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ error: "all fields are required" });
    }

    if (type == "research") {
        const sqls = 'SELECT * FROM researcher WHERE email = ?';
        db.query(sqls, [email], (err, results) => {
            if (err) {
                return res.status(500).send('error fetching');
            }
            if (results.length === 0) {
                
                const sql = 'INSERT INTO researcher (email, username, password) VALUES (?, ?, ?)';
                db.query(sql, [email, username, password], (err, results) => {
                    if (err) {
                        console.error("error inserting data: ", err);
                        return res.status(500).json({ error: 'Database error' });
                    }
                    return res.status(201).json({ msg: 'user added successfully', userId: results });
                });
            } else {
                return res.status(404).send({ msg: 'User already exists' });
            }
        });
    } else if (type == "user") {
        const sql1 = 'SELECT * FROM user WHERE email = ?';
        db.query(sql1, [email], (err, results)=>{
            if(err){
                return res.status(500).send('error fetching')
            }
            if(results.length === 0){
                const sql = 'INSERT INTO user (email, username, password) VALUES (?, ?, ?)';
                db.query(sql, [email, username, password], (err, results) => {
                    if (err) {
                        console.error("error inserting data: ", err);
                        return res.status(500).json({ error: 'Database error' });
                    }
                    return res.status(201).json({ msg: 'user added successfully', userId: results.insertId });
                });
            }else{
                return res.status(404).send({msg: 'User already exists'})
            }
        });
        
    } else {
        return res.status(404).send({ msg: 'table doesnt exist' });
    }
});

export default router;
