interface IUseAuthenticate {
    User: any;
    bcrypt: any;
}

interface IAuthenticate {
    email: string;
    password: string;
}

export function useAuthenticate({ User, bcrypt }: IUseAuthenticate) {
    return async function authenticate({ email, password }: IAuthenticate) {
        try {
            const response = await User.findAll({
                where: {
                    email: email,
                },
                limit: 1,
            });

            if (response.length === 0) {
                throw Error();
            }

            const validPassword = await bcrypt.compare(
                password,
                response[0].dataValues?.password
            );

            return {
                authenticated: validPassword,
                user: validPassword ? response[0].dataValues : {},
            };
        } catch (error) {
            return {
                authenticated: false,
                user: null,
            };
        }
    };
}
