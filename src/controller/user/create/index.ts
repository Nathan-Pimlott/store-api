interface IUseCreateUser {
    User: any;
}

interface ICreateUser {
    email: string;
    password: string;
    forename: string;
    surname: string;
}

export function useCreateUser({ User }: IUseCreateUser) {
    return async function createUser(body: ICreateUser) {
        try {
            const response = await User.create(body);
            return !!response.dataValues?.id;
        } catch (error) {
            throw Error("Unable to create user.");
        }
    };
}
