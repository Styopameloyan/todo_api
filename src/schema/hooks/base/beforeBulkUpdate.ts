import moment from "moment";
moment.locale("de");

/**
 * Eine Funktion, die vor der Aktualisierung eines Eintrags aufgerufen wird.
 * Aktualisiert das updateDate-Feld um 2 Stunden für IBM DB2.
 * Muss angepasst werden, wenn auf eine andere Datenbank umgestellt wird.
 *
 * @param {Object} instance - Das Modellinstanzobjekt.
 */
const _beforeBulkUpdate = (instance) => {
    // Aktuelles Datum mit 2 Stunden Verschiebung
    const currentDate = moment().add(2, 'hours').toDate();
    instance.updateDate = currentDate;
};

const beforeBulkUpdate = (instance) => {
    instance.updateDate = new Date();
};

export { beforeBulkUpdate };
