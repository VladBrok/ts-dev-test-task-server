import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  info: string;

  @Column()
  address: string;
}
