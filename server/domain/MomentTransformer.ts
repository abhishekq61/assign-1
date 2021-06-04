import * as moment from "moment";
import {Moment} from "moment";
import {FindOperator} from "typeorm";
import {ValueTransformer} from "typeorm/decorator/options/ValueTransformer";

export class MomentTransformer implements ValueTransformer {

  to(value: Moment) {
    if (value instanceof FindOperator) {
      return value;
    } else
      return value ? moment(value).toDate() : undefined;
  }

  from(value: Date) {
    return value ? moment(value) : undefined;
  }
}
