import query from "../database/postgresql"
import { Category, Transaction, Account } from "./type"
import useDate from '../utils/useDate'
import { QueryResult } from "pg"

export type IdDTO = { id: number}

const criarTabelas = async () => {
    try {
        await query(`
            CREATE TABLE if not EXISTS categories(
            id SERIAL,
            description varchar(50) not null,
            type varchar(1) not null,
            PRIMARY KEY (id)
            );`)
        .then(() => {
            query(`
            CREATE TABLE if NOT EXISTS accounts(
            id SERIAL,
            description varchar(50) not null,
            PRIMARY KEY (id)
            );`)})            
        .then(() => {
            query(`
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
            );`)})

        return { sucess: true, error: null }
        
    } catch (error) {
        throw { sucess: false, error: error }        
    }
}

const obterTransacoes = async( id?: number ) => {
    try {
        const whereClause = id? `where id =  ${ id.toString()}` : `` 
        const result = await query(`SELECT * FROM transactions ${ whereClause}`)
        return result
    } catch (error) {
        throw [
            error
        ]        
    }
}

const obterCategorias = async( id?: number ) => {
    try {
        const whereClause = id? `where id =  ${ id.toString()}` : `` 
        const result = await query(`SELECT * FROM categories ${ whereClause }`)
        return result
    } catch (error) {
        throw [
            error
        ]        
    }
}

const obterContas = async( id?: number) => {
    try {
        const whereClause = id? `where id =  ${ id.toString()}` : `` 
        const result = await query(`SELECT * FROM accounts ${ whereClause }`)
        return result
    } catch (error) {
        throw [
            error
        ]        
    }
}

const inserirTransacao = async( mov: Transaction ) => {
    try {
        await query(`INSERT INTO transactions(
            data, amount, description, idcategory, idaccount)
            values(
                "${ useDate.parse(mov.data) }", 
                "${ mov.amount.toString() }",
                "${ mov.description }",
                ${ mov.idcategory.toString() },
                ${ mov.idaccount.toString() } 
            )`)
            
        return { sucess: true, reg: mov }                
    } catch (error: any) {
        throw { sucess: false, reg: mov, error: error.message }
    }
}

const inserirCategoria = async( cat: Category ) => {
    try {
        await query(`INSERT INTO categories(type, description)
            values("${ cat.type }", "${ cat.description }")`)
        return { sucess: true, reg: cat }        
    } catch (error) {
        throw { sucess: false, reg: cat, error: error }                
    }
}

const inserirConta = async( con: Account ) => {
    try {
        await query(`INSERT INTO accounts(description)
            values("${ con.description }")`)            
            return { sucess: true, reg: con }        
    } catch (error) {
        throw { sucess: false, reg: con, error: error }                            
    }
}

const deletarTransacao = async( id: number ) => {
    try {
        await query(`DELETE FROM transactions where id = ${ id.toString() }`)            
            return { sucess: true, id: id  }        
    } catch (error) {
        throw { sucess: false, id: id, error: error }                            
    }    
} 

const deletarCategoria = async( id: number ) => {
    try {
        await query(`DELETE FROM categories where id = ${ id.toString() }`)            
            return { sucess: true, id: id  }        
    } catch (error) {
        throw { sucess: false, id: id, error: error }                            
    }    
} 

const deletarConta = async( id: number ) => {
    try {
        await query(`DELETE FROM accounts where id = ${ id.toString() }`)
            return { sucess: true, id: id  }        
    } catch (error) {
        throw { sucess: false, id: id, error: error }                            
    }    
} 

const editarTransacao = async( fields:Transaction ) => {
    const pairs = []
    for( const field in fields ){
        const key = field as keyof Transaction
        const value = fields[key]

        const quot = typeof value == 'string'? `"` : ``
        key != 'id' && pairs.push(
            `${ field } = ${ quot + value + quot }`    
        )
    }

    const sql = `UPDATE transactions set ${ pairs.join(', ') } WHERE id = ${ fields.id }`
        
    try {
        await query( sql )
        return { sucess: true, fields: fields }        
    } catch (error) {
        throw { sucess: false, fields: fields, sql: sql, error: error }
    }
}

const editarCategoria = async( fields:Category ) => {
    const pairs = []
    for( const field in fields ){
        const key = field as keyof Category
        const value = fields[key]

        const quot = typeof value == 'string'? `"` : ``
        key != 'id' && pairs.push(
            `${ field } = ${ quot + value + quot }`    
        )
    }

    const sql = `UPDATE categories set ${ pairs.join(', ') } WHERE id = ${ fields.id }`
        
    try {
        await query( sql )
        return { sucess: true, fields: fields }        
    } catch (error) {
        throw { sucess: false, fields: fields, sql: sql, error: error }
    }
}

const editarConta = async( fields:Account ) => {
    const pairs = []
    for( const field in fields ){
        const key = field as keyof Account
        const value = fields[key]

        const quot = typeof value == 'string'? `"` : ``
        key != 'id' && pairs.push(
            `${ field } = ${ quot + value + quot }`    
        )
    }

    const sql = `UPDATE accounts set ${ pairs.join(', ') } WHERE id = ${ fields.id }`
        
    try {
        await query( sql )
        return { sucess: true, fields: fields }        
    } catch (error) {
        throw { sucess: false, fields: fields, sql: sql, error: error }
    }
}

export default {
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
    editarConta,
}
    