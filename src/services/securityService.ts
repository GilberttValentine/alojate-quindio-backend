/* eslint-disable @typescript-eslint/no-var-requires */
import { UnauthorizedError } from "../utils/ErrorHandlerMiddleware";
import { comparePassword } from '../utils/security/securityUtils';
import * as UserRepository from '../repositories/userRepository';

const jwt = require('jsonwebtoken');

const {
    JWT_SECRET,
    TOKEN_EXPIRATION = '1d',
} = process.env;

export const login = async (email: string, password: string): Promise<string> => {
    const userToFind = await UserRepository.findByMail(email)

    if (!userToFind) throw new UnauthorizedError('Invalid credentials')

    if (!await comparePassword(password, userToFind.password)) {
        throw new UnauthorizedError('Invalid credentials');
    }

    const payload = {
        email: userToFind.email,
        role: userToFind.role_id
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

    return token
}

export const validateToken = async (token: string): Promise<object> => {
    try {
        const payload = jwt.verify(token, JWT_SECRET);

        return await payload

    } catch (error) {
        throw new UnauthorizedError('Invalid token');
    }
};