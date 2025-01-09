import UserSchema from "../DB/USERS";
import ToDoSchema from "../DB/TODO";


export const associationToDo = (): void => {
    ToDoSchema.hasOne(
        UserSchema,
        {
            sourceKey: "createUser",
            foreignKey: "mail",
            as: "creator",
        },
    );

    ToDoSchema.hasOne(
        UserSchema,
        {
            sourceKey: "updateUser",
            foreignKey: "mail",
            as: "updater"
        }
    );
    ToDoSchema.hasOne(
        UserSchema,
        {
            sourceKey: "assignee",
            foreignKey: "mail",
            as: "assigneed"
        }
    );

}; 