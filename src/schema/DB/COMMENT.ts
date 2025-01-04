
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../connections/connectDatabase';

// Hooks
import { beforeCreate } from '../hooks/base/beforeCreate';
import { beforeUpdate } from '../hooks/base/beforeUpdate';
import { beforeBulkUpdate } from '../hooks/base/beforeBulkUpdate';

export interface Comment {
    reference?: string;
    className?: string;
    value?: string;
    referenceCreateUser?: string;

    // Standard Felder
    rowid?: string;
    createUser?: string;
    updateUser?: string;
    updateDate?: Date;
    createDate?: Date;
}
export class CommentSchema extends Model<Comment> { }
export const initModel = () => {
    CommentSchema.init({
        reference: {
            type: DataTypes.STRING,
            allowNull: false
        },
        referenceCreateUser: {
            type: DataTypes.STRING
        },
        className: {
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.STRING
        },



        // Standard Felder
        rowid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        createUser: {
            type: DataTypes.STRING
        },
        updateUser: {
            type: DataTypes.STRING
        },
        updateDate: {
            type: DataTypes.DATE
        },
        createDate: {
            type: DataTypes.DATE
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: "COMMENT",
            sequelize,
            hooks: {
                beforeBulkUpdate: beforeBulkUpdate,
                beforeUpdate: beforeUpdate,
                beforeCreate: beforeCreate,

            }
        });
}

export default CommentSchema;


























