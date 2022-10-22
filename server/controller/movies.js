const { uuid } = require('uuidv4');
const db = require('../models/index');

exports.addMovies = async function (req, res) {
    movie = req.body;
    const movies = await db.query(
        'SELECT * FROM movies WHERE Lower(name)=$1', 
        [movie.name.toLowerCase()]
      );
    
    if(movies.length){
        res.status(400).json({ message: "Movie already exist" });
    } else {
        await db.query(
            'INSERT INTO movies(name, id, rating, "cast", genre, release_date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7);', 
            [movie.name, uuid(),movie.rating, movie.cast, movie.genre, movie.release_date, req.user.userId]
          );
          res.status(200).json({ message: "Movie created successfully!!!" });
    }
    

}

exports.getMovies = async function (req, res) {
    const movies = await db.query(
        'SELECT * FROM movies WHERE user_id=$1', 
        [req.user.userId]
      );
    
    if(movies.length == 0){
        res.status(400).json({ message: "Movie not found" });
    } else {
          res.status(200).json({ data: movies });
    }
    

}

exports.editMovies = async function (req, res) {
    
    
    movie = req.body;
    const movies = await db.query(
        'SELECT * FROM movies WHERE id=$1',
        [req.params.id]
      );
    
    if(movies.length == 0){
        res.status(400).json({ message: "Movie not exist" });
    } else {
        await db.query(
            `UPDATE movies
            SET name=$1, rating=$3, "cast"=$4, genre=$5, release_date=$6, user_id=$7
            WHERE id=$2`, 
            [movie.name, req.params.id,movie.rating, movie.cast, movie.genre, movie.release_date, req.user.userId]
          );
          res.status(200).json({ message: "Movie updated successfully!!!" });
    }
    

}

exports.deleteMovies = async function (req, res) {
    
    
    const movies = await db.query(
        'SELECT * FROM movies WHERE id=$1',
        [req.params.id]
      );
    
    if(movies.length == 0){
        res.status(400).json({ message: "Movie not exist" });
    } else {
        await db.query(
            `DELETE FROM public.movies
            WHERE  id=$1;`, 
            [req.params.id]
          );
          res.status(200).json({ message: "Movie delete successfully!!!" });
    }
    

}