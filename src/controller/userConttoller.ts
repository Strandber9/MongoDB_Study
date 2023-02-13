import express from "express"
import mongoose from "mongoose";
import * as core from 'express-serve-static-core';

import {User} from "../model/user"

class UserController {

    static async all(request: core.Request, response: core.Response){
        console.log('-----------');
        const users = await User.find({});
        response.send({users});
    }

    /**
     * /user/:userId 유저아이디를 받아 해당 유저를 조회
     * @param request 
     * @param response 
     * @returns 
     */
    static async findByUserId(request: core.Request, response: core.Response){
        const {userId} = request.params;
        if(!mongoose.isValidObjectId(userId)){
            return response.status(500).send({error: "정확안 userId를 입력해 주세요."});
        }
        const users = await User.findOne({_id:userId});
        response.send({users});
    }


    static async delete(request: core.Request, response: core.Response) {
        const {userId} = request.params;
        if(!mongoose.isValidObjectId(userId)){
            return response.status(500).send({error: "정확안 userId를 입력해 주세요."});
        }
        const users = await User.findOneAndDelete({_id:userId});
        response.send({users});
    }


    static async update(request: core.Request, response: core.Response) {
        const {userId} = request.params;
        if(!mongoose.isValidObjectId(userId)){
            return response.status(500).send({error: "정확안 userId를 입력해 주세요."});
        }
    
        const user = await User.findById(userId);
        const {email, name} = request.body;
        const updateData = {} as any;
        if(email){
            user!.email = email;
        }
        if(name){
            user!.name = name;
        }

        await user!.save();
    
        return response.send({user});
    }


    static async create(request: core.Request, response: core.Response) {
        console.log(`-------POST`);
        try{
            const {username, name} = request.body;
            console.log(`-------${username} : ${name}`);
            
            if(!username || !name){
                return response.status(400).send({error: "username, name을 입력해주세요."});
            }
            const user = new User(request.body);
            await user.save();
            response.send({user});
        }
        catch(err){
            return response.status(500).send({err});
        }
    }
}

export default UserController