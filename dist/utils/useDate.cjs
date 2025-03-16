"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/useDate.ts
var useDate_exports = {};
__export(useDate_exports, {
  default: () => useDate_default
});
module.exports = __toCommonJS(useDate_exports);
function parse(dt) {
  if (!dt || dt === null) {
    return null;
  }
  const formatedDate = new Date(dt);
  const dateUTC = new Date(formatedDate.getTime() + formatedDate.getTimezoneOffset() * 6e4);
  if (!dateUTC || dateUTC <= /* @__PURE__ */ new Date("1970-01-02")) {
    return null;
  } else {
    return dateUTC.toISOString().slice(0, 10);
  }
}
function dateBr(dt) {
  if (!dt || dt === null) {
    return "";
  }
  try {
    const formattedDate = new Date(dt);
    const options = {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "numeric",
      day: "numeric"
    };
    const dateUTC = new Date(formattedDate.getTime() + formattedDate.getTimezoneOffset() * 6e4);
    return dateUTC.toLocaleString("pt-BR", options);
  } catch (error) {
    console.log(error);
    return "";
  }
}
var useDate = {
  parse,
  dateBr
};
var useDate_default = useDate;
