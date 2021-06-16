import { User } from "../../models/user";

interface ICreateUserBody {
    email: string;
    password: string;
    forename: string;
    surname: string;
}

export const createUser = async (body: ICreateUserBody) => {
    try {
        // Try to create the new user
        const response = await User.create(body);

        // Return true if user is created successfully
        return !!response.dataValues?.id;
    } catch (error) {
        console.error(error);

        // Return false if the user isn't successfully created
        return false;
    }
};
