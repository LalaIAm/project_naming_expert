import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "./Role";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  resetOTP: string;

  @Column({ type: "timestamp", nullable: true })
  @IsOptional()
  resetOTPExpiration: Date;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
