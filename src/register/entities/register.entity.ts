import { Gender } from "src/enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('register')
export class RegistorEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:'varchar'
    })
    full_name:string


    @Column({
        type:'varchar',
        unique:true
    })
    username:string
    
    @Column({
        type:'varchar',
        unique:true
    })
    email:string
    
    @Column({
        type:'varchar',
        unique:true
    })
    phone_number:string
    
    @Column({
        type:'varchar'
    })
    password:string

    @Column({
        type:'enum',
        enum:Gender,
        default:Gender.Male
    })
    gender:Gender
    
    
}