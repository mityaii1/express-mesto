const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUsers, getUserId, createUser, login, getUserInfo,
} = require('../controllers/users');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getUserInfo);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required().length(24),
  }).unknown(true),
}), auth, getUserId);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = router;
