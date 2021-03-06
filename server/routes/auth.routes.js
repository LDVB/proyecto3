const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const jwt = require('jsonwebtoken')

const { isAuthenticated } = require('./../middlewares/jwt.middleware')
const saltRounds = 10


//registro

router.post('/registro', (req, res) => {

  const { email, password, username, age, linkedin, description, level, image } = req.body

  if (email === '' || password === '' || username === '') {
    res.status(400).json({ message: "Introduce una contraseña y un nombre de usuario" })
    return
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Introduce una dirección de email correcta.' })
    return
  }

  if (password.length < 2) {
    res.status(400).json({ message: 'La contraseña ha de tener como mínimo 6 carácteres.' })
    return
  }

  User
    .findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "El usuario ya existe" })
        return
      }

      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)

      return User.create({ email, password: hashedPassword, username, level, image, age, linkedin, description })
    })

    .then((createdUser) => {
      const { email, username, _id } = createdUser

      const user = { email, username, _id }

      res.status(201).json({ user })
    })

    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Error interno de servidor" })
    })
})


// inicio sesión

router.post("/inicio-sesion", (req, res, next) => {

  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(400).json({ message: "Introduce un email y una contraseña" });
    return;
  }

  User
    .findOne({ email })
    .then((foundUser) => {

      if (!foundUser) {
        res.status(401).json({ message: "Usuario no encontrado" })
        return;
      }

      if (bcrypt.compareSync(password, foundUser.password)) {

        const { _id, email, username } = foundUser;

        const payload = { _id, email, username };

        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        );

        res.status(200).json({ authToken });

      } else {
        res.status(401).json({ message: "No ha sido posible autentificar al usuario" });
      }
    })

    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Error interno de servidor " })
    })
});

// verificar si está logueado

router.get('/verify', isAuthenticated, (req, res, next) => {

  res.status(200).json(req.payload)

})

// cerrar sesión

router.get("/cerrar-sesion", (req, res, next) => {

  res.json("esto es el cierre de sesión ");

});


module.exports = router;
