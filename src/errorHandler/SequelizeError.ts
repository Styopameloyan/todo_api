import { ValidationError, UniqueConstraintError, ForeignKeyConstraintError, DatabaseError } from "sequelize";

export class SequelizeError {
    public static validationError(error: ValidationError): string {
        return error.errors.map((err) => `"${err.path}" ${err.message}. --> ${err.value}`).join();
    }

    public static uniqueConstraintError(error: UniqueConstraintError): string {
        return `{ ${Object.values(error.fields).join()} } darf nicht Doppelt vorkommen!`;
    }

    public static foreignKeyConstraintError(error: ForeignKeyConstraintError): string {
        const tableName = error.table;
        const constraintName = error.index;
        const foreignKeyName = constraintName.split("_")[2];
        const referencedTable = constraintName.split("_")[3];
        return `Die Referenztabelle ${referencedTable} enthält keinen Datensatz mit dem Wert von ${foreignKeyName} in Tabelle ${tableName}.`;
    }

    public static databaseError(error: DatabaseError): string {
        const originalError: any = error.original;
        const errors = originalError.errors;
        let errorMessage = "Datenbankfehler: ";
        if (errors && errors.length > 0) {
            errorMessage += errors[0].message;
        } else {
            errorMessage += `${originalError.code} - ${originalError.sqlMessage || originalError.message || JSON.stringify(originalError)}`;
        }
        return errorMessage;
    }
} 