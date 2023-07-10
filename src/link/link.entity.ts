import { CategoryEntity } from '../category/entities/category.entity';
import { UserEntity } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tb_link')
export class LinkEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    comment: '用户id',
  })
  userId: string;

  @Column({
    comment: '链接名称',
  })
  name: string;

  @Column({
    comment: '链接地址',
  })
  url: string;

  @Column({
    name: 'tag_ids',
    nullable: true,
    comment: '标签ids，多个用逗号分割',
  })
  tagIds: string;

  // 定义外键id属性
  @Column({
    name: 'category_id',
    comment: '分类id',
  })
  categoryId: string;

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

  // 定义和分类的关联关系->多对一的关系
  @ManyToOne(() => CategoryEntity, (category) => category.links, {
    createForeignKeyConstraints: false, // 需要实体关系，但不需要外键约束  设置createForeignKeyConstraints为false，默认true
  })
  @JoinColumn({ name: 'category_id' }) // JoinColumn，定义了关系的哪一侧包含带有外键的连接列，name指定关系字段
  category: CategoryEntity;

  // 定义和用户的关联关系->多对一的关系
  @ManyToOne(() => UserEntity, (user) => user.links, {
    createForeignKeyConstraints: false, // 需要实体关系，但不需要外键约束  设置createForeignKeyConstraints为false，默认true
  })
  @JoinColumn({ name: 'user_id' }) // JoinColumn，定义了关系的哪一侧包含带有外键的连接列，name指定关系字段
  user: UserEntity;
}
