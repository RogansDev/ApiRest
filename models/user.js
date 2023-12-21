const db = require('../config/config');

const User = {}


User.create = (user, results) => {

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
            user.password,
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