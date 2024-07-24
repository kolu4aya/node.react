import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import MailService from './mail-service.js'
import UserDto from '../dtos/user-dto.js'
import TokenService from './token-service.js'
import ApiError from '../exceptions/api-error.js'
import tokenService from './token-service.js'

class UserService {
    async registration (email, password ) {
        console.log(email)
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw  ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует!`)
        }
        console.log(password)
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid()
        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await MailService.sendActivationLink(email, activationLink)

        const userDto = new UserDto(user)
        const tokens = TokenService.generateToken({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден!')
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            throw ApiError.BadRequest('Пароль неверный')
        }
        const userDto = new UserDto(user)
        const tokens = TokenService.generateToken({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout (refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh (refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateToken({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return{...tokens, user:userDto}
    }

    async getAllUsers() {
        const users = await UserModel.find();
        return users
    }
}



export default new UserService;