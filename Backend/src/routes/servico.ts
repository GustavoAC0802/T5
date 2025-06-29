import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Buscar todos os serviços
router.get('/', async (req: Request, res: Response) => {
  const servicos = await prisma.servico.findMany();
  res.json(servicos);
});

// Buscar serviço por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const servico = await prisma.servico.findUnique({
    where: { id: Number(id) },
  });

  if (!servico) {
    res.status(404).json({ error: 'Serviço não encontrado' });
    return;
  }

  res.json(servico);
});

// Criar novo serviço
router.post('/', async (req: Request, res: Response) => {
  const { nome, preco } = req.body;
  const servico = await prisma.servico.create({
    data: { nome, preco: Number(preco) },
  });

  res.status(201).json(servico);
});

// Atualizar serviço
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  try {
    const servico = await prisma.servico.update({
      where: { id: Number(id) },
      data: { nome, preco: Number(preco) },
    });
    res.json(servico);
  } catch (error) {
    res.status(404).json({ error: 'Serviço não encontrado para atualizar' });
  }
});

// Deletar serviço
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.servico.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Serviço não encontrado para exclusão' });
  }
});

export default router;
