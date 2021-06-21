import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { User } from "../../models/user";
import { useAuthenticate } from "./authenticate";
import { useCreateUser } from "./create";
import { useUpdateUserPassword } from "./updatePassword";

export const authenticate = useAuthenticate({
    User,
    bcrypt,
    jwt,
    signature: process.env.JWT_SIGNATURE,
});
export const createUser = useCreateUser({ User });
export const updateUserPassword = useUpdateUserPassword({ User, bcrypt });
