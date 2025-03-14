// importiamo il roputer dei film
const connection = require('../data/db');

// gruppo delle funzione della logica relativa alle rotte dei film
// index
function index(req, res) {

    // prepariamo la query
    const sql = 'SELECT * FROM movies';

    // eseguiamo la query!
    connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });

              // versione mappata del risultato
              const movies = results.map(movie => {
                return {
                    ...movie,
                    image: req.imagePath + movie.image
                }
            })
    

    res.json(movies);
    console.log(movies);
    
});
};
// show
function show(req, res) {
 
    // recuperiamo l'id dai params
    const { id } = req.params;

    // prepariamo la query di richiesta
    const detailMovie = "SELECT * FROM movies WHERE id = ?";


    // prepariamo la query di richiesta
    const reviewSql = "SELECT * FROM reviews WHERE movie_id = ?";

    // richiediamo i dati del singolo libro
    connection.query(detailMovie, [id], (err, movieResult) => {
        // se la query non va a buon fine
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResult.length === 0) return res.status(404).json({ error: 'Movie not found' });
        
           // versione mappata del risultato
           const movies = movieResult.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })
        
        // se tutto funziona
        const movie = movies[0];

        connection.query(reviewSql, [id], (err, reviewResult) => {
            // se la query non va a buon fine
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // aggiorniamo l'oggetto movie con le review ritornate
            movie.reviews = reviewResult;


            // ritorniamo l'oggetto completo
            res.json(movie);
        });
    
    });
};
// store
function store(req, res, next) {
    const {title,director,abstract} = req.body

    // gestiamo il valore del nome file creato dal middleware
    const imageName = `${req.file.filename}`

    // creiamo la query di insert
    const query = 'INSERT INTO movies (title, director, image, abstract) VALUES (?, ?, ?, ?)';

    connection.query(query,
        [title, director, imageName, abstract],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("Errore interno del server"))
            }
                res.status(201).json({
                    status: "success",
                    message: "Libro creato con successo!",
                });
                
            }
        
    )
};
// inserimento nuova review
function storeReview(req, res){

    // id preso dai parametri
    const {id} = req.params;

    // le altre info dal body
    const {text, name, vote} = req.body;

    const inserimentoReviewSql = "INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)"

    // Eseguiamo la query
    connection.query(inserimentoReviewSql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId });
    });
}
// // update
// function update(req, res) {

  
// };
// // modify
// function modify (req, res){
   
// };
// destroy
// function destroy(req, res) {
//     // recuperiamo l'id dall' URL e trasformiamolo in numero
//     const id = parseInt(req.params.id)
//     //Eliminiamo la pizza dal menu

//     connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
//     if (err) return res.status(500).json({ error: 'Failed to delete pizza' });
//     res.sendStatus(204)
//     console.log();
    
//     });
// };
module.exports = { index, show, store, storeReview}