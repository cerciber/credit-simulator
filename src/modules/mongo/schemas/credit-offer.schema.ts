import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { statics } from '@src/common/statics/statics';

@Schema({
  timestamps: true,
  collection: statics.constants.mongoose.schemas.CreditOffer,
})
export class CreditOffer extends Document<Types.ObjectId> {
  @Prop({
    type: Types.ObjectId,
    ref: statics.constants.mongoose.schemas.Account,
    required: true,
  })
  account: Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  amount: number;

  @Prop({
    type: Number,
    required: true,
    min: 0,
    max: 100,
  })
  interestRate: number;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(statics.constants.creditOffer.statuses),
  })
  status: string;

  @Prop({
    type: Number,
    required: true,
    enum: Object.values(statics.constants.creditOffer.periods),
  })
  period: number;

  @Prop({
    type: Number,
    required: true,
    min: 0,
    max: 100,
  })
  insurancePercentage: number;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const CreditOfferSchema = SchemaFactory.createForClass(CreditOffer);
