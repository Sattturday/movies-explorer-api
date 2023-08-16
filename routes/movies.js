const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { movieCelebrate, movieIdCelebrate } = require('../validation/movieValidation');

router.get('/', getMovies);
router.post('/', movieCelebrate, createMovie);
router.delete('/:movieId', movieIdCelebrate, deleteMovie);

module.exports = router;
