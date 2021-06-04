import {Column, Entity, Index} from "typeorm";
import {IdGenerator} from "../util/IdGenerator";
import {BaseEntity} from "./BaseEntity";

@Entity("shopifyClients")
export class ShopifyClient extends BaseEntity {
  @Column()
  @Index()
  shopName: string;

  @Column()
  @Index()
  shopUrl: string;

  @Column({
    type: "bigint"
  })
  @Index()
  shopifyId: number;

  @Column({default: ''})
  shopifyPlan: string;

  @Column({nullable: false})
  @Index()
  uniqueId: string;

  @Column()
  accessToken: string;

  @Column()
  isSetupCompleted: boolean;

  @Column()
  email: string;

  constructor() {
    super();
    this.uniqueId = IdGenerator.getUniqueId();
  }

  toJson() {
    let data = super.toJson();
    delete data.accessToken;
    return data;
  }
}
