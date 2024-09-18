import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "@models/user.model";
import { JWT_CONFIG } from "@constants/config.constant";
import ERROR from "@constants/error.constant"
import CustomError from "@classes/error.class";

export const getUserFromToken = async (bearerToken : string) => {
    try {
        // Malformed token
        const authValue = bearerToken.split(" ");
        if (authValue[0] !== "Bearer" || !authValue[1])
            throw new CustomError(ERROR.INVALID_TOKEN);

        // Validate session token
        const token = authValue[1];
        const {  userId } = jwt.verify(token, JWT_CONFIG.SECRET) as any;
        const user = await UserModel.findById(userId).lean().exec();

        if (!user) throw new CustomError(ERROR.UNAUTHORIZED);

        return user;
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            throw new CustomError(ERROR.TOKEN_EXPIRED);
        } else if (!(error instanceof CustomError)) {
            console.log(error.message);
            throw new CustomError(ERROR.INTERNAL_SERVER_ERROR);
        }
        // Customized error instance
        throw error;
    }
};

// Gets Authentication data and sets it inside the Request object
export const getAuth = async (req : Request, res: Response, next) => {
    const bearerToken = req.headers.authorization || "";
    if (!bearerToken) return next();
    try {
        req.user = await getUserFromToken(bearerToken);
        return next();
    } catch (error) {
        return next(error);
    }
};

// Checks if the user is authenticated or not
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(new CustomError(ERROR.UNAUTHORIZED));
    }
    return next();
};