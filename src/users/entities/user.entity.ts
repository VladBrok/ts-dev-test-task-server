import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserInfoEntity } from './user-info.entity';
import { User } from '../interfaces/user.interface';

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
