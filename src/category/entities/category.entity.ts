import { LinkEntity } from 'src/link/link.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('tb_category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    comment: '创建人id',
  })
  userId: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '分类名称',
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

  // 定义和link的关联关系->一对多关系
  @OneToMany(() => LinkEntity, (link) => link.category)
  links: LinkEntity[];
}
