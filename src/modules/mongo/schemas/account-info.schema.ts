import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { statics } from '@src/common/statics/statics';

@Schema({
  timestamps: true,
  collection: statics.constants.mongoose.schemas.AccountInfo,
})
export class AccountInfo extends Document<Types.ObjectId> {
  @Prop({
    type: Types.ObjectId,
    ref: statics.constants.mongoose.schemas.Account,
    unique: true,
    required: true,
  })
  account: string = '';

  @Prop({
    type: String,
    trim: true,
    minlength: 1,
  })
  name: string = '';

  @Prop({
    type: String,
    trim: true,
    minlength: 1,
  })
  email: string = '';

  @Prop({
    type: String,
    trim: true,
    minlength: 1,
  })
  phone: string = '';

  @Prop({
    type: String,
    trim: true,
    minlength: 1,
  })
  document: string = '';

  @Prop({
    type: String,
    enum: Object.values(statics.constants.profiles),
  })
  profile: string = '';

  @Prop({
    type: Number,
    min: 0,
    max: 100,
  })
  debtCapacityPercentage: number = 0;

  @Prop({
    type: Number,
    min: 0,
  })
  monthlyNetIncome: number = 0;

  @Prop({
    type: String,
  })
  dateOfBirth: string = '';
}

export const AccountInfoSchema = SchemaFactory.createForClass(AccountInfo);
