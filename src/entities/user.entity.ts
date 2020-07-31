import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, JoinTable } from 'typeorm';
import { Test } from '../entities/test.entity';

@Entity({ name: 'user', schema: 'dhkim' })
export class User {

  @PrimaryGeneratedColumn({ name: 'user_id', type: 'bigint' })
  id: number;

  @Column({ length: 40 })
  uuid: string;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column('datetime', { name: 'last_login_date', nullable: true })
  lastLoginDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createDate: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateDate: Date;

  //@OneToOne(type => Test, test => test.userId)
  //test: Test;
}

