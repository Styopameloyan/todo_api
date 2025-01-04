import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../connections/connectDatabase';

// Hooks
import { beforeCreate } from '../hooks/base/beforeCreate';
import { beforeUpdate } from '../hooks/base/beforeUpdate';
import { beforeBulkUpdate } from '../hooks/base/beforeBulkUpdate';
import { afterDestroy } from '../hooks/base/afterDestroy';
import { afterBulkDestroy } from '../hooks/base/afterBulkDestroy';

export interface DynamicData {
    className?: string;
    reference1?: string;
    reference2?: string;
    string1_50?: string;
    string2_50?: string;
    string3_50?: string;
    string4_50?: string;
    string5_50?: string;
    string6_50?: string;
    string7_50?: string;
    string8_50?: string;
    string9_50?: string;
    string10_50?: string;
    string11_50?: string;
    string12_50?: string;
    string13_50?: string;
    string14_50?: string;
    string15_50?: string;
    string1_200?: string;
    string2_200?: string;
    string3_200?: string;
    string4_200?: string;
    string1_400?: string;
    string2_400?: string;
    string1_max?: string;
    string2_max?: string;
    number1?: number;
    number2?: number;
    number3?: number;
    number4?: number;
    date1?: Date;
    date2?: Date;
    date3?: Date;
    date4?: Date;
    boolean1?: boolean;
    boolean2?: boolean;
    boolean3?: boolean;
    boolean4?: boolean;
    boolean5?: boolean;
    price1?: number;
    price2?: number;
    price3?: number;

    // Standard Felder
    rowid?: string;
    createUser?: string;
    updateUser?: string;
    updateDate?: Date;
    createDate?: Date;
}
export class DynamicDataSchema extends Model<DynamicData> { }
export const initModel = () => {
    DynamicDataSchema.init({

        className: { type: DataTypes.STRING(50), allowNull: false },

        reference1: { type: DataTypes.UUID },
        reference2: { type: DataTypes.UUID },

        string1_50: { type: DataTypes.STRING(50) },
        string2_50: { type: DataTypes.STRING(50) },
        string3_50: { type: DataTypes.STRING(50) },
        string4_50: { type: DataTypes.STRING(50) },
        string5_50: { type: DataTypes.STRING(50) },
        string6_50: { type: DataTypes.STRING(50) },
        string7_50: { type: DataTypes.STRING(50) },
        string8_50: { type: DataTypes.STRING(50) },
        string9_50: { type: DataTypes.STRING(50) },
        string10_50: { type: DataTypes.STRING(50) },
        string11_50: { type: DataTypes.STRING(50) },
        string12_50: { type: DataTypes.STRING(50) },
        string13_50: { type: DataTypes.STRING(50) },
        string14_50: { type: DataTypes.STRING(50) },
        string15_50: { type: DataTypes.STRING(50) },

        string1_200: { type: DataTypes.STRING(200) },
        string2_200: { type: DataTypes.STRING(200) },
        string3_200: { type: DataTypes.STRING(200) },
        string4_200: { type: DataTypes.STRING(200) },

        string1_400: { type: DataTypes.STRING(400) },
        string2_400: { type: DataTypes.STRING(400) },

        string1_max: { type: DataTypes.TEXT },
        string2_max: { type: DataTypes.TEXT },

        number1: { type: DataTypes.DECIMAL(10, 2) },
        number2: { type: DataTypes.DECIMAL(10, 2) },
        number3: { type: DataTypes.DECIMAL(10, 2) },
        number4: { type: DataTypes.DECIMAL(10, 2) },

        date1: { type: DataTypes.DATE },
        date2: { type: DataTypes.DATE },
        date3: { type: DataTypes.DATE },
        date4: { type: DataTypes.DATE },

        boolean1: {
            type: DataTypes.DECIMAL(2, 0),
            get() { return Boolean(Number(this.getDataValue("boolean1"))) },
            set(value: boolean) { this.setDataValue('boolean1', Number(value)) }
        },
        boolean2: {
            type: DataTypes.DECIMAL(2, 0),
            get() { return Boolean(Number(this.getDataValue("boolean2"))) },
            set(value: boolean) { this.setDataValue('boolean2', Number(value)) }
        },

        boolean3: {
            type: DataTypes.DECIMAL(2, 0),
            get() { return Boolean(Number(this.getDataValue("boolean3"))) },
            set(value: boolean) { this.setDataValue('boolean3', Number(value)) }
        },

        boolean4: {
            type: DataTypes.DECIMAL(2, 0),
            get() { return Boolean(Number(this.getDataValue("boolean4"))) },
            set(value: boolean) { this.setDataValue('boolean4', Number(value)) }
        },

        boolean5: {
            type: DataTypes.DECIMAL(2, 0),
            get() { return Boolean(Number(this.getDataValue("boolean5"))) },
            set(value: boolean) { this.setDataValue('boolean5', Number(value)) }
        },


        price1: { type: DataTypes.DECIMAL(12, 3) },
        price2: { type: DataTypes.DECIMAL(12, 3) },
        price3: { type: DataTypes.DECIMAL(12, 3) },


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
            tableName: "DYNAMICDATA",
            sequelize,
            hooks: {
                beforeBulkUpdate: beforeBulkUpdate,
                beforeUpdate: beforeUpdate,
                beforeCreate: beforeCreate,

                afterDestroy: afterDestroy,
                afterBulkDestroy: afterBulkDestroy
            }
        });
}

export default DynamicDataSchema;