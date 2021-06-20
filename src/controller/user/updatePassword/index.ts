interface IUseUpdateUserPassword {
    User: any;
    bcrypt: any;
}

interface IUpdateUserPassword {
    email: string;
    currentPassword: string;
    newPassword: string;
}

export function useUpdateUserPassword({
    User,
    bcrypt,
}: IUseUpdateUserPassword) {
    return async function updateUserPassword({
        email,
        currentPassword,
        newPassword,
    }: IUpdateUserPassword) {
        try {
            const response = await User.findAll({
                where: {
                    email,
                },
                limit: 1,
            });

            if (response.length === 0 || !response[0].dataValues) {
                throw Error();
            }

            const correctPassword = await bcrypt.compare(
                currentPassword,
                response[0].dataValues.password
            );
            if (correctPassword) {
                const hashedPassword = await bcrypt.hash(newPassword, 12);
                await User.update(
                    {
                        password: hashedPassword,
                    },
                    {
                        where: {
                            email,
                        },
                    }
                );
                return true;
            }
            throw Error();
        } catch (error) {
            throw Error("Unable to update user's password.");
        }
    };
}
