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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "C:/expressjs-dbresearch/image");
    },
    filename: (req, file, cb) => {
        const uniqueName = "f" + uuidv4().replace(/-/g, '') + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

router.post('/postparticipant', upload.single('file'), (req, res) => {
    const { id_pool, email_user } = req.body;
    const file = req.file;
    if (!id_pool || !email_user || !file) {
        return res.status(400).json({ error: "Any fields cannot be null" });
    }
    const sqls = "INSERT INTO participant(id_pool, email_user, photo, status) VALUES (?,?,?,?)";
    
    const photoPath = file ? file.path : null;
    
    

    db.query(sqls, [id_pool, email_user, photoPath, 'PENDING'], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error inserting participant" });
        }
        res.status(200).json({ msg: "Participant added" });
    });
});

export default router;
