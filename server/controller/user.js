const { uuid } = require('uuidv4');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require('../models/index');

exports.registration = async function (req, res) {
    const users = await db.query(
        'SELECT * FROM users WHERE email=$1', 
        [req.body.username]
      );
    if(users.length){
        res.status(400).json({ message: "Email already exist" });
    } else {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        await db.query(
            'INSERT INTO public.users(email, id, password, name) VALUES ($1, $2, $3, $4);', 
            [req.body.username, uuid(),req.body.password, req.body.name]
          );
          res.status(200).json({ message: "User registered successfully!!!" });
    }
}

exports.login = async function (req, res) {
    const body = req.body;
    const user = await db.query(
        'SELECT * FROM users WHERE email=$1', 
        [body.username]
      );
    if (user.length) {
      const validPassword = await bcrypt.compare(body.password, user[0].password);
      if (validPassword) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: user[0].id,
        }
    
        const token = jwt.sign(data, jwtSecretKey, { expiresIn: '12h' });
        res.status(200).json({ message: "Login Successfully", token: token });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
}
