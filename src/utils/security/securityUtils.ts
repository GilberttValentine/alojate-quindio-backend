

import bcrypt from 'bcrypt'

export const hashSomePassowrd = async (password: string) => {
    const saltRounds = 12
    const passwordCrypted = await bcrypt.hash(password, saltRounds)
    return passwordCrypted
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    const passwordCrypted = await bcrypt.compare(password, hashedPassword)
    return passwordCrypted
}