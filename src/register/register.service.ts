import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistorEntity } from './entities/register.entity';
import { Repository } from 'typeorm';
import { catchError, successRes } from 'src/utils/succesRes';
import { hrtime } from 'process';
import { NotFoundError } from 'rxjs';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(RegistorEntity)
    private readonly registerRepo: Repository<RegistorEntity>
  ) {}

  async create(createRegisterDto: CreateRegisterDto) {
    try {
      const {full_name, username, email, phone_number, password, gender} = createRegisterDto
      
      const existsUsername = await this.registerRepo.findOne({where:{username}})
      if(existsUsername){
        throw new ConflictException('username already exist')
      }

      const existsEmail = await this.registerRepo.findOne({where:{email}})
      if(existsEmail){
        throw new ConflictException('email already exist')
      }

      const existsPhoneNumber = await this.registerRepo.findOne({where:{phone_number}})
      if(existsPhoneNumber){
        throw new ConflictException('phone number already exist')
      }

      const user = this.registerRepo.create({
        full_name,
        username,
        email, phone_number,
        password,
        gender
      })
      await this.registerRepo.save(user)
      return successRes(user, 201, "new user creater")
    } catch (error) {
      return catchError(error)
    }
  }

  async findAll() {
    try {
      const user = await this.registerRepo.find()
      return successRes(user)
    } catch (error) {
      return catchError(error)
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.registerRepo.findOne({where:{id}})
      if(!user){
        throw new NotFoundException("user not found")
      }
      return successRes(user)
    } catch (error) {
      return catchError(error)
    }
  }

  async update(id: number, updateRegisterDto: UpdateRegisterDto) {
    try {
      const user = await this.registerRepo.findOne({where:{id}})
      if(!user){
        throw new NotFoundException("user not found")
      }
      if(updateRegisterDto.username){
        const {username} = updateRegisterDto
        const existsUsername = await this.registerRepo.findOne({where:{username}})
        if(existsUsername){
          throw new ConflictException('username already exist')
        }
      }

      if(updateRegisterDto.email){
        const {email} = updateRegisterDto
        const existsEmail = await this.registerRepo.findOne({where:{email}})
        if(existsEmail){
          throw new ConflictException('email already exist')
        }
      }

      if(updateRegisterDto.phone_number){
        const {phone_number} = updateRegisterDto
        const existsPhoneNumber = await this.registerRepo.findOne({where:{phone_number}})
        if(existsPhoneNumber){
          throw new ConflictException('phone number already exist')
        }
      }

      await this.registerRepo.update({id}, updateRegisterDto)
      const updateUser = await this.registerRepo.findOne({where: {id}})
      return successRes(updateUser)
    } catch (error) {
      return catchError(error)
    }
  }

  async remove(id: number) {
    try {
      const user = await this.registerRepo.findOne({where:{id}})
      if(!user){
        throw new NotFoundException("user not found")
      }
      await this.registerRepo.delete({id})
      return successRes({})
    } catch (error) {
      return catchError(error)
    }
  }
}
