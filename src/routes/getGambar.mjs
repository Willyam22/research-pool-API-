import express from "express";
import mysql from "mysql2";
import multer from "multer";  
import path from "path";  
import { v4 as uuidv4 } from "uuid";  

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

router.get('/gambar/:id', (req,res)=>{
    try {
        const id = req.params.id
        if (id) {
          const sql = "SELECT photo FROM participant WHERE id = ?"
          db.query(sql,[id],(err,result)=>{
            console.log(result[0].photo)
            const photo = result[0].photo
            return res.sendFile(photo)
          })
        } else {
          res.status(400).send("Missing infoID");
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
})

export default router;