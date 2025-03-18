import pg, { PoolConfig, QueryResult } from 'pg'

const { Pool } = pg

// Converte os tipos numéricos do Postgres para Number no Node.js
pg.types.setTypeParser(1700, (val:string) => parseFloat(val)); // 1700 é o OID para NUMERIC/DECIMAL
pg.types.setTypeParser(20, (val:string) => parseInt(val, 10)); // 20 é o OID para BIGINT
pg.types.setTypeParser(21, (val:string) => parseInt(val, 10)); // 21 é o OID para SMALLINT
pg.types.setTypeParser(23, (val:string) => parseInt(val, 10)); // 23 é o OID para INTEGER

const config: PoolConfig ={
    database: 'despesas',
    host: 'db',
    user: 'nuno',
    password: 'hpc00',
    port: 5432

}

const pool = new Pool(config)

const query = async( command: string ) => {
    const str = command.replaceAll(`"`,`'`)
    try {
        const result:QueryResult<any> = await pool.query(str)
        return result

    } catch (error) {
        console.log(error)
        throw { erro: error, sql: str }
        
    }
}


export default query
