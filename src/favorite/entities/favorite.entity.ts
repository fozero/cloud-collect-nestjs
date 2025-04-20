import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_favorite')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    comment: '用户id',
  })
  userId: string;

  @Column({
    name: 'favorite_folder_id',
    comment: '收藏夹id',
  })
  favoriteFolderId: string;

  @Column({
    comment: '名称',
  })
  name: string;

  @Column({
    nullable: true,
    comment: '描述',
  })
  description: string;

  @Column({
    comment: 'url地址',
  })
  url: string;

  @Column({
    nullable: true,
    name: 'platform_name',
    comment: '平台来源',
  })
  platformName: string;

  @Column({
    type: 'datetime',
    name: 'created_at',
    default: () => 'NOW()',
    comment: '创建时间',
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    name: 'updated_at',
    default: () => 'NOW()',
    comment: '更新时间',
  })
  updatedAt: Date;
}
