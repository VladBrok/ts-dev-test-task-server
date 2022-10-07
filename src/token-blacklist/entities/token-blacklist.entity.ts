import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TokenBlacklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  token: string;

  @Index()
  @Column({ type: 'bigint' })
  expirationInSeconds: number;
}
