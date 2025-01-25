"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeError = void 0;
class SequelizeError {
    static validationError(error) {
        return error.errors.map((err) => `"${err.path}" ${err.message}. --> ${err.value}`).join();
    }
    static uniqueConstraintError(error) {
        return `{ ${Object.values(error.fields).join()} } darf nicht Doppelt vorkommen!`;
    }
    static foreignKeyConstraintError(error) {
        const tableName = error.table;
        const constraintName = error.index;
        const foreignKeyName = constraintName.split("_")[2];
        const referencedTable = constraintName.split("_")[3];
        return `Die Referenztabelle ${referencedTable} enthält keinen Datensatz mit dem Wert von ${foreignKeyName} in Tabelle ${tableName}.`;
    }
    static databaseError(error) {
        const originalError = error.original;
        const errors = originalError.errors;
        let errorMessage = "Datenbankfehler: ";
        if (errors && errors.length > 0) {
            errorMessage += errors[0].message;
        }
        else {
            errorMessage += `${originalError.code} - ${originalError.sqlMessage || originalError.message || JSON.stringify(originalError)}`;
        }
        return errorMessage;
    }
}
exports.SequelizeError = SequelizeError;
//# sourceMappingURL=SequelizeError.js.map