import { Schema, model, connect } from "mongoose";
import bcrypt from "bcrypt";

// this IUSER must be imported from a Shared Domain of the APPLICATION (not the infrastructure)
export interface IUser {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true },
  password: String,
});

UserSchema.pre<IUser>("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<boolean> {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

export const UserModel = model<IUser>("User", UserSchema);
