"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/server.ts
var import_express2 = __toESM(require("express"), 1);

// src/routes.ts
var import_express = require("express");

// src/database/postgresql.ts
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
    throw { erro: error, sql: str };
  }
};
var postgresql_default = query;

// src/utils/useDate.ts
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

// src/transactions/transactions.ts
var criarTabelas = async () => {
  try {
    await postgresql_default(`
            CREATE TABLE if not EXISTS categories(
            id SERIAL,
            description varchar(50) not null,
            type varchar(1) not null,
            PRIMARY KEY (id)
            );`).then(() => {
      postgresql_default(`
            CREATE TABLE if NOT EXISTS accounts(
            id SERIAL,
            description varchar(50) not null,
            PRIMARY KEY (id)
            );`);
    }).then(() => {
      postgresql_default(`
            CREATE TABLE if NOT EXISTS transactions(
            id BIGSERIAL,
            data DATE,
            amount NUMERIC(12,2) default 0,
            description varchar(50) not null,
            idcategory INT DEFAULT 0,
            idaccount INT DEFAULT 0,
            PRIMARY KEY (id),
            FOREIGN KEY(idcategory) REFERENCES categories(id) ON DELETE CASCADE,
            FOREIGN KEY(idaccount) REFERENCES accounts(id) ON DELETE CASCADE
            );`);
    });
    return { sucess: true, error: null };
  } catch (error) {
    throw { sucess: false, error };
  }
};
var obterTransacoes = async (id) => {
  try {
    const whereClause = id ? `where id =  ${id.toString()}` : ``;
    const result = await postgresql_default(`SELECT * FROM transactions ${whereClause}`);
    return result;
  } catch (error) {
    throw [
      error
    ];
  }
};
var obterCategorias = async (id) => {
  try {
    const whereClause = id ? `where id =  ${id.toString()}` : ``;
    const result = await postgresql_default(`SELECT * FROM categories ${whereClause}`);
    return result;
  } catch (error) {
    throw [
      error
    ];
  }
};
var obterContas = async (id) => {
  try {
    const whereClause = id ? `where id =  ${id.toString()}` : ``;
    const result = await postgresql_default(`SELECT * FROM accounts ${whereClause}`);
    return result;
  } catch (error) {
    throw [
      error
    ];
  }
};
var inserirTransacao = async (mov) => {
  try {
    await postgresql_default(`INSERT INTO transactions(
            data, amount, description, idcategory, idaccount)
            values(
                "${useDate_default.parse(mov.data)}", 
                "${mov.amount.toString()}",
                "${mov.description}",
                ${mov.idcategory.toString()},
                ${mov.idaccount.toString()} 
            )`);
    return { sucess: true, reg: mov };
  } catch (error) {
    throw { sucess: false, reg: mov, error: error.message };
  }
};
var inserirCategoria = async (cat) => {
  try {
    await postgresql_default(`INSERT INTO categories(type, description)
            values("${cat.type}", "${cat.description}")`);
    return { sucess: true, reg: cat };
  } catch (error) {
    throw { sucess: false, reg: cat, error };
  }
};
var inserirConta = async (con) => {
  try {
    await postgresql_default(`INSERT INTO accounts(description)
            values("${con.description}")`);
    return { sucess: true, reg: con };
  } catch (error) {
    throw { sucess: false, reg: con, error };
  }
};
var deletarTransacao = async (id) => {
  try {
    await postgresql_default(`DELETE FROM transactions where id = ${id.toString()}`);
    return { sucess: true, id };
  } catch (error) {
    throw { sucess: false, id, error };
  }
};
var deletarCategoria = async (id) => {
  try {
    await postgresql_default(`DELETE FROM categories where id = ${id.toString()}`);
    return { sucess: true, id };
  } catch (error) {
    throw { sucess: false, id, error };
  }
};
var deletarConta = async (id) => {
  try {
    await postgresql_default(`DELETE FROM accounts where id = ${id.toString()}`);
    return { sucess: true, id };
  } catch (error) {
    throw { sucess: false, id, error };
  }
};
var editarTransacao = async (fields) => {
  const pairs = [];
  for (const field in fields) {
    const key = field;
    const value = fields[key];
    const quot = typeof value == "string" ? `"` : ``;
    key != "id" && pairs.push(
      `${field} = ${quot + value + quot}`
    );
  }
  const sql = `UPDATE transactions set ${pairs.join(", ")} WHERE id = ${fields.id}`;
  try {
    await postgresql_default(sql);
    return { sucess: true, fields };
  } catch (error) {
    throw { sucess: false, fields, sql, error };
  }
};
var editarCategoria = async (fields) => {
  const pairs = [];
  for (const field in fields) {
    const key = field;
    const value = fields[key];
    const quot = typeof value == "string" ? `"` : ``;
    key != "id" && pairs.push(
      `${field} = ${quot + value + quot}`
    );
  }
  const sql = `UPDATE categories set ${pairs.join(", ")} WHERE id = ${fields.id}`;
  try {
    await postgresql_default(sql);
    return { sucess: true, fields };
  } catch (error) {
    throw { sucess: false, fields, sql, error };
  }
};
var editarConta = async (fields) => {
  const pairs = [];
  for (const field in fields) {
    const key = field;
    const value = fields[key];
    const quot = typeof value == "string" ? `"` : ``;
    key != "id" && pairs.push(
      `${field} = ${quot + value + quot}`
    );
  }
  const sql = `UPDATE accounts set ${pairs.join(", ")} WHERE id = ${fields.id}`;
  try {
    await postgresql_default(sql);
    return { sucess: true, fields };
  } catch (error) {
    throw { sucess: false, fields, sql, error };
  }
};
var transactions_default = {
  criarTabelas,
  inserirTransacao,
  inserirCategoria,
  inserirConta,
  obterTransacoes,
  obterCategorias,
  obterContas,
  deletarTransacao,
  deletarCategoria,
  deletarConta,
  editarTransacao,
  editarCategoria,
  editarConta
};

// src/routes.ts
var router = (0, import_express.Router)();
router.get("/criar-tabelas", async (req, res) => {
  try {
    const data = await transactions_default.criarTabelas();
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
router.get("/movimentacoes", async (req, res) => {
  try {
    const result = req.query?.id ? req.query.id : void 0;
    const id = typeof result == "string" ? Number.parseInt(result) : void 0;
    const data = await transactions_default.obterTransacoes(id);
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
router.get("/categorias", async (req, res) => {
  try {
    const result = req.query?.id ? req.query.id : void 0;
    const id = typeof result == "string" ? Number.parseInt(result) : void 0;
    const data = await transactions_default.obterCategorias(id);
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
router.get("/contas", async (req, res) => {
  try {
    const result = req.query?.id ? req.query.id : void 0;
    const id = typeof result == "string" ? Number.parseInt(result) : void 0;
    const data = await transactions_default.obterContas(id);
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
router.put("/movimentacoes", async (req, res) => {
  try {
    const body = await req.body;
    const data = await transactions_default.inserirTransacao(body);
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
router.put("/categorias", async (req, res) => {
  try {
    const body = await req.body;
    const data = await transactions_default.inserirCategoria(body);
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
router.put("/contas", async (req, res) => {
  try {
    const body = await req.body;
    const data = await transactions_default.inserirConta(body);
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
router.delete("/movimentacoes", async (req, res) => {
  try {
    const body = await req.body;
    const data = await transactions_default.deletarTransacao(body.id);
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
router.delete("/categorias", async (req, res) => {
  try {
    const body = await req.body;
    const data = await transactions_default.deletarCategoria(body.id);
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
router.delete("/contas", async (req, res) => {
  try {
    const body = await req.body;
    const data = await transactions_default.deletarConta(body.id);
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
router.patch("/movimentacoes", async (req, res) => {
  try {
    const body = await req.body;
    const data = await transactions_default.editarTransacao(body);
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
router.patch("/categorias", async (req, res) => {
  try {
    const body = await req.body;
    const data = await transactions_default.editarCategoria(body);
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
router.patch("/contas", async (req, res) => {
  try {
    const body = await req.body;
    const data = await transactions_default.editarConta(body);
    res.status(200).send({ resposta: data });
  } catch (error) {
    res.status(500).send({ resposta: error });
  }
});
var routes_default = router;

// src/loggerMiddleware.ts
var allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
var loggerMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};
var loggerMiddleware_default = loggerMiddleware;

// src/server.ts
var app = (0, import_express2.default)();
var port = process.env.PORT || 3001;
app.use(loggerMiddleware_default);
app.use(import_express2.default.json());
app.use(import_express2.default.urlencoded({ extended: false }));
app.use(import_express2.default.static("public"));
app.use(routes_default);
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`listen to port ${port}`);
});
