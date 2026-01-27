import bcrypt from 'bcryptjs';

const saltRounds = 10;

export const hashPassword= async (password) => {
    // const salt = await bcrypt.genSalt(saltRounds);  it will generate random salt every time for same password 
    return await bcrypt.hash(password,salt)
}

export const comparePassword = async (password , hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}