import query from "./src/database/postgresql.ts"

async () =>{
    const res = await query('select now()')
    console.log(res)
}