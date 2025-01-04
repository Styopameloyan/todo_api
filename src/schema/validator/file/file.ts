import * as Joi from 'joi';
import { File } from 'schema/DB/FILE';

/* const MAX_FILES = 10;



const ACCEPTED_FILE_TYPES = [
  "image/*",
  "audio/*",
  "video/*",
  "application/pdf",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/x-vcard",
  "text/csv",
  "application/json",
  "application/xml",
  "application/x-xliff+xml",
  "text/plain",
  "application/zip",
  "application/x-zip-compressed",
  "multipart/x-zip",
  "text/html",
  "text/css",
  "application/javascript",
  "application/rss+xml",
  "application/xhtml+xml",
  "application/rdf+xml",
  "application/mathml+xml",
  "application/font-woff",
  "application/font-woff2",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.graphics",
  "application/x-yaml",
  "text/yaml"
]; */


const CreateSchema = Joi.object<File>({
  public: Joi.string().valid('1', '0').default("0"),
  className: Joi.string(),
  reference: Joi.string(),
  department: Joi.string()

});

const DeleteSchema = Joi.object({
  rowid: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string()).max(10).message("Es dürfen maximal 10 Dateien gelöscht werden!")
  )
});




// name: Joi.string().required(),
// type: Joi.string().regex(new RegExp(ACCEPTED_FILE_TYPES.join('|').replace('*', '.*'))).required().error(new Error("Datentyp nicht erlaubt!")),
// size: Joi.number().required(),

export { CreateSchema, DeleteSchema };
