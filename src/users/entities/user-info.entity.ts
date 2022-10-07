import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  name?: string;

  @Column({ nullable: true, default: null })
  phoneNumber?: string;

  @Column({ nullable: true, default: null })
  info?: string;

  @Column({ nullable: true, default: null })
  address?: string;
}
