import jwt from 'jsonwebtoken';

const usersData = [
    {id: 1, name: 'Иван', email: 'ivanov@mail.ru', password: '12345678'}
]

export const authorize = async (req, res, next) => {
    const token = req.headers['x-token']

    if (!token) {
        return res.status(403).json({message: 'token not found'})
    }

    try {
        const verify = await jwt.verify(token, usersData[0]['password'])
        next()
    } catch ({message}) {
        return res.status(403).json({message})
    }
}