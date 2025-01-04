import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../connections/connectDatabase';

// Hooks
import { beforeCreate } from '../hooks/base/beforeCreate';
import { beforeUpdate } from '../hooks/base/beforeUpdate';
import { beforeBulkUpdate } from '../hooks/base/beforeBulkUpdate';

export interface File {
    name?: string;
    type?: string;
    size?: number;

    path?: string;
    reference?: string;
    className?: string;
    department?: string;
    company?: string;
    public?: number;
    share?: string;
    title?: string;
    description?: string;

    // Standard Felder
    rowid?: string;
    createUser?: string;
    updateUser?: string;
    updateDate?: Date;
    createDate?: Date;
}
export class FileSchema extends Model<File> { }
export const initModel = () => {
    FileSchema.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reference: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        size: {
            type: DataTypes.DECIMAL(15, 3)
        },
        className: {
            type: DataTypes.STRING
        },
        department: {
            type: DataTypes.STRING
        },
        company: {
            type: DataTypes.STRING
        },
        public: {
            type: DataTypes.DECIMAL(2, 0),
            get() { return Boolean(Number(this.getDataValue("public"))); },
            set(value: boolean) { this.setDataValue('public', Number(value)); }
        },
        share: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
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
            tableName: "FILE",
            sequelize,
            hooks: {
                beforeBulkUpdate: beforeBulkUpdate,
                beforeUpdate: beforeUpdate,
                beforeCreate: beforeCreate,

            }
        });
}

export default FileSchema;