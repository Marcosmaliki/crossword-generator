import { Static, Type } from "@sinclair/typebox";

enum userRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER"
}

const userRole = Type.Enum(userRoleEnum);


const userInput = Type.Object({
  email: Type.String(),
  password: Type.String(),
  role: userRole,
});


const userInputLogin = Type.Object({
  email: Type.String(),
  password: Type.String(),
});


type userInputType = Static<typeof userInput>;
type userInputLoginType = Static<typeof userInputLogin>;

export { userInput, userInputType, userRole, userRoleEnum, userInputLogin, userInputLoginType };
