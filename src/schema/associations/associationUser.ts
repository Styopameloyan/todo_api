/* 

import UserSchema from "../DB/USERS";
import UserProfileSchema from "../DB/USERPROFILE";

export const associationUser = (): void => {
    UserSchema.hasOne(
        UserProfileSchema,
        {
            sourceKey: "userPrincipalName",
            foreignKey: "userPrincipalName",
            as: "userprofile"
        },
    );

}; */