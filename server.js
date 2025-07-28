import express from 'express';
import cors from 'cors';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();


const app = express();
app.use(express.json());
app.use(cors());



app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });

    res.status(201).json(req.body);

});



app.get('/usuarios', async (req, res) => {

    let users = [];

    if(req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
       })
    }else{
        users = await prisma.user.findMany();
    }
    

    res.status(200).json(users);
});

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });

    res.status(201).json(req.body);

});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id, // já é String, tudo certo
      },
    });

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao deletar o usuário.' });
  }
});




app.listen(3000);
