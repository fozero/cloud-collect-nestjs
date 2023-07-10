import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_tag')
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    comment: '外键，用户id',
  })
  userId: string;

  // 标签名称不允许重复，如存在了则不需要再创建
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '标签名称',
  })
  name: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '更新时间',
  })
  updatedAt: Date;
}
