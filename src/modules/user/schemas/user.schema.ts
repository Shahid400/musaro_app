import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { AbstractSchema } from '@shared/abstracts';
import mongoose, { SchemaTypes, Types } from 'mongoose';

@Schema({
  collection: 'users',
  versionKey: false,
  timestamps: true,
})
export class User extends AbstractSchema<string> {
  // @Prop({ type: String, required: true })
  // _id: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: false })
  lastName: string;

  // @Prop({ type: Date, required: false })
  // dob: Date;

  // @Prop({ type: String, required: false })
  // contactNumber: string;

  // @Prop({ type: String, required: false })
  // gender: string;

  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: false,
  //   // ref: CompanyLocation.name,
  // })
  // location: string;

  // @Prop({ type: String, required: true })
  // defaultRole: string;

  // @Prop({
  //   type: String,
  //   required: false,
  //   // ref: Role.name
  // })
  // role: string;

  // @Prop({ type: Boolean, default: true })
  // isActive?: boolean;

  // @Prop({ type: String, required: false })
  // profileImage: string;

  // @Prop({ type: [Object], required: false })
  // userPermissions?: object[];

  // @Prop({
  //   type: String,
  //   // enum: VerificationStatusEnum,
  //   // default: VerificationStatusEnum.NOT_STARTED,
  //   required: false,
  // })
  // verificationStatus: string;

  // @Prop({ type: String, required: false })
  // createdBy?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
