import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinTable, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'test', schema: 'dhkim' })
export class Test {

  @PrimaryGeneratedColumn({ name: 'test_id' })
  testId: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column('datetime', { name: 'start_time' })
  startTime: Date;

  @Column('datetime', { name: 'end_time' })
  endTime: Date;

  @CreateDateColumn({ name: 'created_at' })
  createDate: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateDate: Date;

  @OneToOne(type => User)
  @JoinColumn({name: 'user_id'})
  user: User;
}
