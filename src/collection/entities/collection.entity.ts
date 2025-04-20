import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_collection')
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    name: 'user_id',
    comment: '用户id',
  })
  userId: string;

  @Column({
    comment: '收藏夹名称',
  })
  name: string;

  @Column({
    nullable: true,
    comment: '收藏夹描述',
  })
  description: string;

  @Column({
    name: 'is_public',
    default: 1,
    comment: '是否公开，1公开 2私密',
  })
  isPublic: number;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'NOW()',
    comment: '创建时间',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'NOW()',
    comment: '更新时间',
  })
  updatedAt: Date;
}
