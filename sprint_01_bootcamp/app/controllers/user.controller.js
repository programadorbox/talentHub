const {users} = require('../models')
const db = require('../models')
const User = db.users
const Bootcamp = db.bootcamps
const bcrypt = require('bcrypt');

// Crear y Guardar Usuarios
exports.createUser = async (user) => {
  const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/; // Validar al menos 8 caracteres, incluyendo al menos un dígito

  if (!passwordRegex.test(user.password)) {
    return Promise.reject(new Error('La contraseña debe tener al menos 8 caracteres'));
  }

  const saltRounds = 10; // Número de rondas de hash
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  return User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: hashedPassword
  })
  .then(user => {
    console.log(`>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`);
    return user;
  })
  .catch(err => {
    console.log(`>>   
 Error al crear el usuario: ${err}`);
  });
};

// obtener los bootcamp de un usuario
exports.findUserById = (userId) => {
  return User.findByPk(userId, {
      include: [{
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        }
      }, ],
    })
    .then(users => {
      return users
    })
    .catch(err => {
      console.log(`>> Error mientras se encontraba los usuarios: ${err}`)
    })
}

// obtener todos los Usuarios incluyendo los bootcamp
exports.findAll = () => {
  return User.findAll({
    include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    }, ],
  }).then(users => {
    return users
  })
}

// Actualizar usuarios
exports.updateUserById = (userId, fName, lName) => {
  return User.update({
      firstName: fName,
      lastName: lName
    }, {
      where: {
        id: userId
      }
    })
    .then(user => {
      console.log(`>> Se ha actualizado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error mientras se actualizaba el usuario: ${err}`)
    })
}

// Actualizar usuarios
exports.deleteUserById = (userId) => {
  return User.destroy({
      where: {
        id: userId
      }
    })
    .then(user => {
      console.log(`>> Se ha eliminado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error mientras se eliminaba el usuario: ${err}`)
    })
}