import jwt from 'jsonwebtoken';

const usersData = [
    {id: 1, name: 'Иван', email: 'ivanov@mail.ru', password: '12345678'}
]

export const authenticate = (req, res, next) => {
    const { authorization } = req.headers;

    console.log(authorization);

    if (!authorization) {
        return res.status(401).json({message: 'credentials are not valid'});
    }
  const [type, credentials] = authorization.split(' ');
  const [email, password] = Buffer.from(credentials, 'base64')
    .toString()
    .split(':')

    const user = usersData.find(({email: userEmail}) => email === userEmail);

    if (!user) {
        return res.status(401).json({message: 'credentials are not valid'});
    }

    if (password === user.password) {
      const token = jwt.sign(req.body, password)
      res.setHeader('X-Token', token);
        return next()
    }

    return res.status(401).json({message: 'credentials are not valid'});
}