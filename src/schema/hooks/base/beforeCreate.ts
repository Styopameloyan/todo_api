import moment from "moment";
moment.locale("de");

/**
 * Eine Funktion, die vor der Erstellung eines Eintrags aufgerufen wird.
 * Aktualisiert das createDate- und updateDate-Feld um 2 Stunden für IBM DB2.
 * Muss angepasst werden, wenn auf eine andere Datenbank umgestellt wird.
 *
 * @param {Object} instance - Das Modellinstanzobjekt.
 * @param {Object} options - Optionsobjekt für die Operation.
 */
const _beforeCreate = (instance, options) => {
    // Aktuelles Datum mit 2 Stunden Verschiebung
    const currentDate = moment().add(2, 'hours').toDate();

    instance.createDate = currentDate;
    instance.updateDate = currentDate;
};

const beforeCreate = (instance, options) => {
    instance.createDate = new Date();
    instance.updateDate = new Date();
};

export { beforeCreate };
