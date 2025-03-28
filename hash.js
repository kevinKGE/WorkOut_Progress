// hash.js
const bcrypt = require('bcrypt')

const plainPassword = 'keving'
const saltRounds = 10

bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
    if (err) {
        console.error('Erreur:', err)
    } else {
        console.log('Mot de passe hashé :', hash)
    }
})
