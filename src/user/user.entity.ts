import { Entity, Column, PrimaryColumn, Generated, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { LinkEntity } from '../link/link.entity';

@Entity('tb_user')
export class UserEntity {
  // PrimaryGeneratedColumn('uuid')等同于@PrimaryColumn()+ @Generated('uuid')
  // @PrimaryGeneratedColumn('uuid')
  //   userId: string;

  @PrimaryColumn({
    name: 'user_id',
    comment: '用户id',
  })
  @Generated('uuid')
  userId: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '用户名',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '昵称',
  })
  nickname: string;

  @Exclude()
  @Column({
    type: 'datetime',
    nullable: true,
    comment: '生日',
  })
  birthday: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'avatar_url',
    comment: '头像',
  })
  avatarUrl: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 100,
    // select表示查询时隐藏该字段，但同时会有个问题，用户登录需要查询比较密码，导致查询不到
    // select: false,
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '邮箱',
  })
  email: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    // default: () => 'NOW()',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    // default: () => 'NOW()',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '更新时间',
  })
  updatedAt: Date;

  // 定义和link的关联关系->一对多关系
  @OneToMany(() => LinkEntity, (link) => link.user)
  links: LinkEntity[];
}
