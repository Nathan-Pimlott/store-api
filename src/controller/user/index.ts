import * as bcrypt from "bcrypt";

import { User } from "../../models/user";
import { useAuthenticate } from "./authenticate";
import { useCreateUser } from "./create";
import { useUpdateUserPassword } from "./updatePassword";

export const authenticate = useAuthenticate({ User, bcrypt });
export const createUser = useCreateUser({ User });
export const updateUserPassword = useUpdateUserPassword({ User, bcrypt });
