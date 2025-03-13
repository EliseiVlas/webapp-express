// Importiamo express e utilizziamo la parte di routing

    // importa il framework Express.js
    const express = require('express')
    // Crea un'istanza di router
    const router = express.Router();

// importiamo il roputer dei piatti
const movieController = require('../controllers/movieController');

// rotte di CRUD dei piatti
// index
router.get('/', movieController.index);

// show
router.get('/:id', movieController.show);

// store review
router.post('/:id/review', movieController.storeReview);

// // update
// router.put('/:id', movieController.update);

// // modify
// router.patch('/:id', movieController.modify);

// // destroy
// router.delete('/:id', movieController.destroy);
// esportiamo il modulo del router
module.exports = router;