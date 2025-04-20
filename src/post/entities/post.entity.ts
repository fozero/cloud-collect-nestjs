import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_post')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'uuid',
    name: 'user_id',
    comment: '用户id',
  })
  userId: string;
  @Column({
    comment: '名称',
  })
  name: string;

  @Column({
    comment: '链接',
  })
  link: string;

  @Column({
    comment: '简介',
  })
  summary: string;

  @Column({
    comment: '来源',
  })
  from: string;

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
