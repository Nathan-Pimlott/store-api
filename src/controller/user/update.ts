import * as bcrypt from 'bcrypt';

import {User} from '../../models/user';

interface IUpdateUserBody {
    email: string;
    currentPassword: string;
    newPassword: string;
};

export const updatePassword = async (body: IUpdateUserBody) => {
    try {
        // Find a user with a matching email address
        const response = await User.findAll({
            where: {
                email: body.email
            },
            limit: 1
        });

        // Check if a user is found
        if (!response[0].dataValues) {
            throw Error();
        }

        // Check the "current password" matches
        const correctPassword = await bcrypt.compare(
            body.currentPassword, 
            response[0].dataValues.password
        );
        if (correctPassword) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(
                body.newPassword, 
                12
            );

            // Update the user with the new hashed password
            await User.update(
                { 
                    password: hashedPassword 
                },
                {
                    where: {
                        email: body.email
                    }
                }
            );

            // Return true if the update was a success
            return true;
        }
        throw Error();
    } catch (error) {
        // Return false if the update failed
        return false
    }
}

