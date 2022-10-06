import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../interfaces/user.interface';
import { UserInfoEntity } from './user-info.entity';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @OneToOne(() => UserInfoEntity, { cascade: true })
  @JoinColumn()
  userInfo?: UserInfoEntity;
}
