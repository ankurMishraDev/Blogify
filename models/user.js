const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/auth");

const userSchema = new Schema(
  {
    fullName: {
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
    salt: {
      type: String,
      // required:true,
    },
    profileImage: {
      type: String,
      default: "/defaultProfile.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);



userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return ;
  };
  const salt = randomBytes(32).toString("hex");
  const hashedPassword = await createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static("matchPasswordAndCreateToken", async function (email,password) {
  const user = await this.findOne({ email }).catch((e) => {
    throw new Error("User Email not found");
  });
  const salt = user.salt;
  const hashedPassword = user.password;
  const inputPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
    if(inputPassword!==hashedPassword){
        throw new Error("Password does not match");
    }
    const token = createTokenForUser(user);
    return token;
});

const User = model("User", userSchema);
module.exports = User;
