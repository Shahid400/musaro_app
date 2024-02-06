import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { AbstractSchema } from '@shared/abstracts';
import { UserRole } from '@shared/constants';
import { IOTP } from '@shared/interfaces';
import mongoose, { SchemaTypes, Types } from 'mongoose';

@Schema({
  collection: 'users',
  versionKey: false,
  timestamps: true,
})
export class User extends AbstractSchema<string> {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  mobile: string;

  @Prop({ type: String, required: true, enum: UserRole })
  role: string;

  @Prop({ type: String, required: true, unique: true })
  userName: string;

  @Prop({ type: String, required: true })
  hashedPassword: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: false })
  profilePicture?: string;

  @Prop({ type: Boolean, required: false, default: false })
  isVerified?: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  isActive?: boolean;

  @Prop({ type: String, required: false, default: 'Pending Approval' })
  reason?: string;

  // Below fields are specifically for service provider
  @Prop({ type: String, required: false })
  type?: string;

  @Prop({ type: String, required: false })
  idNumber?: string;

  @Prop({ type: String, required: false })
  idPicture?: string;

  @Prop({ type: String, required: false })
  whatsapp?: string;

  @Prop({ type: String, required: false })
  officeNumber?: string;

  @Prop({ type: String, required: false })
  yearsOfExperience?: string;

  @Prop({ type: String, required: false })
  serviceDescription?: string;

  @Prop({ type: String, required: false })
  paymentPlan?: string;

  @Prop({ type: Date, required: false })
  subscriptionStart?: Date;

  @Prop({ type: Date, required: false })
  subscriptionEnd?: Date;

  @Prop({ type: String, required: false })
  paymentOption?: string;

  @Prop({
    type: {
      code: { type: Number, required: true },
      expiresAt: { type: Date, required: true },
    },
  })
  otp: IOTP;
}

export const UserSchema = SchemaFactory.createForClass(User);
