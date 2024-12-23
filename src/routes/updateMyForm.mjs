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

router.post('/updateform/:id', (req,res)=>{
    const {title, description, link, status} = req.body;
    const id = req.params.id   

    const sqls = "UPDATE research_pool SET Title = ?, description = ?, link = ?, status = ? WHERE id = ?"
    db.query(sqls, [title, description, link, status, id],(err, result)=>{
        if(err){
            res.status(500).json({error: 'Internal server error'})
            console.error(err)
        }else{
            res.status(200).json({msg: 'update successfully'})
        }
    })
})

export default router;