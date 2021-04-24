import * as bcrypt from 'bcrypt';

import { User } from '../../models/user';

interface IAuthenticateBody {
    email: string;
    password: string;
};

export const authenticate = async (body: IAuthenticateBody) => {
    try {
        // Hash the entered password
        let i = await bcrypt.hash(body.password, 12);
        
        // Find a user with the email provided
        const response = await User.findAll({
            where: {
                email: body.email
            },
            limit: 1
        });
        
        // Check if the passwords match
        const validPassword = await bcrypt.compare(
            body.password, 
            response[0].dataValues?.password
        );
        
        // Return the user object and authenticated
        return {
            authenticated: validPassword,
            user: validPassword ? 
                response[0].dataValues : 
                {}
        }
    } catch (error) {
        console.error(error);
        // Return false if there is an error;
        return {
            authenticated: false,
            user: null
        };
    }
}