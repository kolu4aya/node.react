import UserService from "../service/user-service.js";
import {validationResult} from 'express-validator'
import ApiError from '../exceptions/api-error.js'
import userService from "../service/user-service.js";
import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'node:fs';

class UserController  {
    async registration (req, res, next) {       
        try {
            const uploadDir = path.join('../frontend/public/uploads');
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, '0777', true);
            const filterFunction = ({ name, originalFilename, mimetype }) => {
            if (!(originalFilename && name)) return 0;
            return 1;  // return mimetype && mimetype.includes("image"); uncomment for uploading only image file
            };
            const customOptions = { uploadDir: uploadDir, keepExtensions: true, allowEmptyFiles: false, maxFileSize: 5 * 1024 * 1024 * 1024, multiples: true, filter: filterFunction };
            const form = new IncomingForm(customOptions);
            form.parse(req, async (err, field, file) => { 
            if (!file.File) return res.status(400).json({ message: 'No file Selected' });
            file.File.forEach((file) => {
                const newFilepath = `${uploadDir}/${file.originalFilename}`;
                fs.rename(file.filepath, newFilepath, err => err);
            });
            const email = field.email[0]
            const password = field.password[0] 
            const UserData = await UserService.registration(email, password)
            res.cookie('refreshToken', UserData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(UserData)
            });

        } catch (e) {
          next(e)
        }
    }

    async login (req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async logout(req,res,next){
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }catch(e){
            next(e)
        }
    }
    async activate(req,res,next){
        try{

        }catch(e){

        }
    }
    async refresh(req,res,next){
        try{
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken)
            return res.json(userData)
        }catch(e){
            next(e)
        }
    }
    async getUsers(req,res,next){
        try{
            const users = await userService.getAllUsers();
            return res.json(users)
        }catch(e){

        }
    }
}

export default new UserController;