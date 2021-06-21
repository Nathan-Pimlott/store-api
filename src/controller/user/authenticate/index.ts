interface IUseAuthenticate {
    User: any;
    bcrypt: any;
    jwt: any;
    signature: string;
}

interface IAuthenticate {
    email: string;
    password: string;
}

export function useAuthenticate({
    User,
    bcrypt,
    jwt,
    signature,
}: IUseAuthenticate) {
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

            const decodedPassword = jwt.verify(password, signature);

            const validPassword = await bcrypt.compare(
                decodedPassword.password,
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
