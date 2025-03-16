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

// src/utils/useCurrency.ts
var useCurrency_exports = {};
__export(useCurrency_exports, {
  default: () => useCurrency_default
});
module.exports = __toCommonJS(useCurrency_exports);
function toBR(amount, options = { cifrao: true }) {
  if (options.cifrao) {
    return amount.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  } else {
    return amount.toLocaleString("pt-br", { minimumFractionDigits: 2 });
  }
}
function toISO(valor) {
  try {
    return Number(valor).toFixed(2);
  } catch (error) {
    console.log(error);
    return 0;
  }
}
var useCurrency = {
  toBR,
  toISO
};
var useCurrency_default = useCurrency;
