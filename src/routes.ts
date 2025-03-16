import { Router } from "express"
import { Category, Transaction, Account } from "./transactions/type"
import transactions, { IdDTO } from "./transactions/transactions"
import { ParsedQs } from 'qs'

type ResultQuery = | string | ParsedQs | ( | string | ParsedQs)[] | undefined


const router = Router()

router.get('/criar-tabelas', async (req, res)=>{
    try {
        const data = await transactions.criarTabelas()        
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })        
    }
})

router.get('/movimentacoes', async(req, res)=>{
    try {
        const result:ResultQuery  = req.query?.id? req.query.id : undefined
        const id = typeof result == 'string'? Number.parseInt(result) : undefined        
        const data = await transactions.obterTransacoes(id)
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })
    }
})

router.get('/categorias', async(req, res)=>{
    try {
        const result:ResultQuery  = req.query?.id? req.query.id : undefined
        const id = typeof result == 'string'? Number.parseInt(result) : undefined

        const data = await transactions.obterCategorias(id)
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })
    }
})

router.get('/contas', async(req, res)=>{
    try {
        const result:ResultQuery  = req.query?.id? req.query.id : undefined
        const id = typeof result == 'string'? Number.parseInt(result) : undefined        
        const data = await transactions.obterContas(id)
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })
    }
})


router.put('/movimentacoes', async(req, res)=>{
    try {
        const body:Transaction = await req.body
        const data = await transactions.inserirTransacao(body)
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })
    }
})

router.put('/categorias', async(req, res)=>{
    try {
        const body:Category = await req.body
        const data = await transactions.inserirCategoria(body)
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })
    }
})

router.put('/contas', async(req, res)=>{
    try {
        const body:Account = await req.body
        const data = await transactions.inserirConta(body)
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })
    }
})

router.delete('/movimentacoes', async(req, res)=>{
    try {
        const body: IdDTO = await req.body
        const data = await transactions.deletarTransacao(body.id)
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })
    }
})

router.delete('/categorias', async(req, res)=>{
    try {
        const body: IdDTO = await req.body
        const data = await transactions.deletarCategoria(body.id)
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })
    }
})
router.delete('/contas', async(req, res)=>{
    try {
        const body: IdDTO = await req.body
        const data = await transactions.deletarConta(body.id)
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })
    }
})

router.patch('/movimentacoes', async(req, res)=>{
    try {
        const body: Transaction = await req.body
        const data = await transactions.editarTransacao(body)
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })
    }
})
 
router.patch('/categorias', async(req, res)=>{
    try {
        const body: Category = await req.body
        const data = await transactions.editarCategoria(body)
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })
    }
})

router.patch('/contas', async(req, res)=>{
    try {
        const body: Account = await req.body
        const data = await transactions.editarConta(body)
        res.status(200).send({ resposta: data })        
    } catch (error) {
        res.status(500).send({ resposta: error })
    }
})

export default router