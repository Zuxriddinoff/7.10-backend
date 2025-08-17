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
        type:'varchar'
    })
    username:string
    
    @Column({
        type:'varchar',
    })
    email:string
    
    @Column({
        type:'varchar',
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