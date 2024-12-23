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

router.post('/login', (req, res) => {
    const {email, password} = req.body
    const sqls = 'SELECT * FROM researcher WHERE email = ?'
    db.query(sqls, [email], (err, result)=>{
        if(err){
            return res.status(500).send('error fetching')
        }
        if(result.length>0){
            const qpassword = result[0].password
            if(qpassword === password){
                return res.status(200).send({msg: "login as a researcher success", type: "researcher", userId:result[0]})
            }else{
                return res.status(401).send({msg:"wrong password"})
            }
        }else{
            const sqls1 = 'SELECT * FROM user WHERE email = ?'
            db.query(sqls1, [email], (err,result)=>{
                if(err){
                    return res.status(500).send('error fetching')
                }
                if(result.length>0){
                    const qpassword = result[0].password
                    if(qpassword === password){
                        return res.status(200).send({msg:"login as a user success", type: "user",userId:result[0]})
                    }
                    else{
                        return res.status(401).send({msg:"wrong password"})
                    }
                }else{
                    return res.status(404).send("no any user found")
                }
            })
        }
    })
})

export default router;
