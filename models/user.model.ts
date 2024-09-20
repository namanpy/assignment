import { Types, Schema, model } from "mongoose";
import { User } from "@interfaces/user.interface";
import { hashPassword } from "@utils/common.utils";

export type UserDocument = User & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const schema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

schema.pre("save", async function () {
  this.password = await hashPassword(this.password);
});

export const UserModel = model("User", schema, "User");
