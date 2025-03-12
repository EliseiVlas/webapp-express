// importiamo express una volta che lo instaliamo
  // Importa il framework Express.js
  const express = require('express')
  // Importa il middlewares cors
  
  // Crea un'istanza dell'applicazione Express
  const app = express();

  // Definisce la porta su cui il server ascolterà le richieste
  const port = process.env.PORT

   //   aggiungi cors
   const cors = require('cors');

// importiamo il roputer dei piatti
const piattiRouter = require('./routers/movies');

// importiamo il middleware di gestione errore server
const errorsHandler = require("./middlewares/errorsHandler");

// importiamo il middleware di gestione errore 404
const notFound = require("./middlewares/notFound");         

// importiamo il middleware di gestione path imgs
const imagePathMiddleware = require('./middlewares/imagePath');

// definiamo la cartella per i file statici (le immagini)
app.use(express.static("public"));

// registro il body-parser per "application/json"
app.use(express.json());

// registro il middleware di path imgs
app.use(imagePathMiddleware);

// progetto base con rotta "/"
app.get('/', (req, res) => {
   res.send("Ciao sono la rotta Home, dell miei film!!!");
});

// utilizzo il midllewares cors
app.use(cors({origin: process.env.FE_APP}));

// utilizziamo la rotta dei piatti andando a definire la parte iniziale delle rotte
app.use("/movie", piattiRouter)

// utilizzo middleware di gestione errore server
app.use(errorsHandler);

// utilizzo middleware di gestione not found 404
app.use(notFound);

  // avvio del server sulla porta specificata
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})