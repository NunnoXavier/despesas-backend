"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/database/postgresql.ts
var postgresql_exports = {};
__export(postgresql_exports, {
  default: () => postgresql_default
});
module.exports = __toCommonJS(postgresql_exports);
var import_pg = __toESM(require("pg"), 1);
var { Pool } = import_pg.default;
import_pg.default.types.setTypeParser(1700, (val) => parseFloat(val));
import_pg.default.types.setTypeParser(20, (val) => parseInt(val, 10));
import_pg.default.types.setTypeParser(21, (val) => parseInt(val, 10));
import_pg.default.types.setTypeParser(23, (val) => parseInt(val, 10));
var config = {
  database: "despesas",
  host: "postgres_db",
  user: "nuno",
  password: "hpc00",
  port: 5432
};
var pool = new Pool(config);
var query = async (command) => {
  const str = command.replaceAll(`"`, `'`);
  try {
    const result = await pool.query(str);
    console.log(result);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw [
      {
        erro: error,
        sql: str
      }
    ];
  }
};
var postgresql_default = query;
