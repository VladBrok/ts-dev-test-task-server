import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Index,
} from 'typeorm';
import { UserInfoEntity } from './user-info.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @OneToOne(() => UserInfoEntity, { cascade: true })
  @JoinColumn()
  userInfo?: UserInfoEntity;
}
