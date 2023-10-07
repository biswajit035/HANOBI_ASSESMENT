/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})
export class User {
  @Prop()
  userName: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  mobile: number;
  @Prop()
  dob: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
