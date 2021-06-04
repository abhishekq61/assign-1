import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Moment} from "moment";
import {MomentTransformer} from "./MomentTransformer";

interface IEntity {
  id: number
}

interface ITrackable {
  createdAt: Moment;
  updatedAt: Moment;
  deletedAt?: Moment;
}


export class BaseEntity implements IEntity, ITrackable {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({transformer: new MomentTransformer()})
  createdAt: Moment;

  @UpdateDateColumn({transformer: new MomentTransformer()})
  updatedAt: Moment;

  @Column({
    type: Date,
    transformer: new MomentTransformer(),
    nullable: true
  })
  deletedAt?: Moment;

  toJson() {
    let jsonData = Object.assign({}, this);
    delete jsonData.id;
    delete jsonData.deletedAt;
    return jsonData;
  }
}
