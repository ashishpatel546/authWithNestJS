import {Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/userEntity';
import { Repository } from 'typeorm';

export interface userData{
    email: string,
    name: string,
    password: string
}

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private repo: Repository<User>
    ){}

    find(){
        return this.repo.find()
    }

    async findByEmail(email:string){ 
             
        return this.repo.findOne({where: {email: email}})
    }

    async create(userData: userData){
        const user =  await this.repo.create(userData)
        const savedUser = await this.repo.save(user)
        const {password, ...otherInfo} = savedUser
        return otherInfo
    }


}
