// Libs
import bcrypt from "bcrypt";

// Configs
import { BCRYPT_CONFIG } from "@constants/config.constant"

export const hashPassword = async (password : string) => {  
    return await bcrypt.hash(password, BCRYPT_CONFIG.SALT_ROUNDS);
};