const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {}


User.findById = async (id, result) => {
    const sql = `
      SELECT 
         id,
         email,
         name,
         lastname,
         image,
         password,
         document
      FROM 
         users
      WHERE
        id = ?
    `;

    db.query
    {
        sql,
        [id],
        (err, user) => {
            if (err) {
                console.log('Error', err)
                result(err, null)
            } else {
                console.log('Usuario obtenido', user)
                result(null, user)
            }
        }
    }
}


User.findByEmail = async (email, result) => {
    const sql = `
      SELECT 
         id,
         email,
         name,
         lastname,
         image,
         password,
         document
      FROM 
         users
      WHERE
        email = ?
    `;

    db.query
    {
        sql,
        [email],
        (err, user) => {
            if (err) {
                console.log('Error', err)
                results(err, null)
            } else {
                console.log('Usuario obtenido', user)
                results(null, user)
            }
        }
    }
}

User.create = async (user, results) => {

    const hash = await bcrypt.hash(user.password, 10)

    const sql = `
        INSERT INTO
            users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                document,
                create_at,
                update_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
    ( 
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
            user.document,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error', err)
                results(err, null)
            } else {
                console.log('Id del nuevo usuario', res.insertId)
                results(null, res.insertId)
            }
        }
    );
};

module.exports = User;