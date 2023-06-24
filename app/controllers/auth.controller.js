const { config, connection } = require('../config/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BadRequestError } = require("../helpers/errors");

exports.login = (req, res, next) => {
    const { Username, Password } = req.body;

    connection.query(
        'SELECT * FROM nguoidung WHERE Username = ?', [Username],
        (error, results) => {
            if (error) {
                console.log(error);
                return next(new BadRequestError(500));
            }

            if (results.length > 0) {
                const user = results[0];

                if (user.Password === Password) {
                    const token = jwt.sign({ id: user.MaNguoiDung }, config.jwt.secret, {
                        expiresIn: 86400, // 24 hours
                    });
                    res.header("Access-Control-Allow-Origin", "*");
                    res.status(200).send({
                        id: user.MaNguoiDung,
                        Username: user.Username,
                        accessToken: token,
                    });
                } else {
                    return next(new BadRequestError(401, 'Incorrect password'));
                }
            } else {
                return next(new BadRequestError(401, 'Incorrect username'));
            }
        }
    );
};


// exports.signin = (req, res, next) => {
//     const { username, password } = req.body;

//     connection.query(
//         'SELECT * FROM nguoidung WHERE Username = ?', [username],
//         (error, results) => {
//             if (error) {
//                 console.log(error);
//                 return next(new BadRequestError(500));
//             }

//             if (results.length > 0) {
//                 const user = results[0];
//                 const passwordIsValid = bcrypt.compareSync(password, user.Password);

//                 if (passwordIsValid) {
//                     const token = jwt.sign({ id: user.MaNguoiDung }, config.jwt.secret, {
//                         expiresIn: 86400, // 24 hours
//                     });

//                     res.status(200).send({
//                         id: user.MaNguoiDung,
//                         username: user.Username,
//                         accessToken: token,
//                     });
//                 } else {
//                     return next(new BadRequestError(401, 'Incorrect password'));
//                 }
//             } else {
//                 return next(new BadRequestError(401, 'Incorrect usernam'));
//             }
//         }
//     );
// };

// exports.login = function(req, res) {
//     let username = req.body.username;
//     let password = req.body.password;

//     if (username && password) {
//         connection.query(
//             'SELECT * FROM nguoidung WHERE username = ?', [username],
//             function(error, results, fields) {
//                 if (error) throw error;

//                 if (results.length > 0) {
//                     const user = results[0];
//                     // Kiểm tra mật khẩu
//                     bcrypt.compare(password, user.password, function(err, isMatch) {
//                         if (err) throw err;

//                         if (isMatch) {
//                             // Mật khẩu khớp, tạo JWT token
//                             const token = jwt.sign({ username: user.username }, 'your_secret_key');
//                             // Gửi token về client
//                             res.json({ token });
//                         } else {
//                             res.status(401).json({ message: 'Incorrect Username and/or Password!' });
//                         }
//                     });
//                 } else {
//                     res.status(401).json({ message: 'Incorrect Username and/or Password!' });
//                 }
//             }
//         );
//     } else {
//         res.status(400).json({ message: 'Please enter Username and Password!' });
//     }
// }; };
