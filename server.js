/*
METODOS HTTP              HTTP STATUS CODE         

get-> Listar                2xx -> Sucesso        
Post-> Criar                4xx -> erro Cliente
Put-> Editas Varios         5xx -> erro Servidor
Patch-> Atualizar         
Delete-> Deletar

CRIANDO BANCO DE DADOS mongodb
adm = cristianolisboa80_db_user
senha= RnWk1Ph7zzvc2KAO

Adicionando oplicacao prisma.io v6

npm install prisma@6.19 --save-dev
npm install @prisma/client@6.19  dotenv
npx prisma init --datasource-provider mongodb --output ../generated/prisma


--------------------------------

import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.get('/usuarios/',async (req, res) => {

    const users = await prisma.user.findMany()
    res.status(200).json(users)

})

app.post('/usuarios',async (req, res) => {

   const user = await prisma.user.create({
   data: {
    email: req.body.email,
    name: req.body.name,
    age: req.body.age
   }
})

console.log(user)

res.status(201).json({ message: "Usuário criado com sucesso" })
})

app.listen(3000)


*/

// ANTIGO - const express = require('express')
// NOVO   - import express from 'express'

// req - requisição
// res - resposta


import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())

app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)

})

app.post('/usuarios', async (req, res) => {

    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })


    res.status(201).json({
        message: "Usuário criado com sucesso"
    })
})


app.put('/usuarios/:id', async (req, res) => {
    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(200).json(user)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }

    })

    res.status(200).json({ message: "Usuário deletado com sucesso" })
})

app.listen(3000)
