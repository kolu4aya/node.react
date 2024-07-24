import jwt from 'jsonwebtoken';

const options = { expiresIn: '2s'}

let password = 'Pa$$w0rd';
// let token = jwt.sign({id: 1}, password, options);

// setTimeout( () => {
//     try {
//         let data = jwt.verify(token, password);
//         console.log(data)
//     } catch ({message}) {
//         console.log(message);
//     }
// }, 1000)

// setTimeout( () => {
//     try {
//          jwt.verify(token, password);
//     } catch (error) {
//         console.log(error.name, error.message);
//     }
// }, 3000)

//Ассинхронная работа

jwt.sign({id: 1}, password, (error, token) => {
    // const decoded = jwt.decode(token);
    // console.log(decoded);

    jwt.verify(token, password, (error, data) => {
        console.log(data)
    })
});