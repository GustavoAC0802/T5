import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Buscar todos os clientes
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
});

// Buscar cliente por ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const cliente = await prisma.cliente.findUnique({
    where: { id: Number(id) },
  });

  if (!cliente) {
    res.status(404).json({ error: 'Cliente não encontrado' });
    return;
  }

  res.json(cliente);
});

// Criar novo cliente
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { nome, cpf, telefone, genero } = req.body;

  const cliente = await prisma.cliente.create({
    data: { nome, cpf, telefone, genero },
  });

  res.status(201).json(cliente);
});

// Atualizar cliente
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nome, cpf, telefone, genero } = req.body;

  try {
    const cliente = await prisma.cliente.update({
      where: { id: Number(id) },
      data: { nome, cpf, telefone, genero },
    });
    res.json(cliente);
  } catch (error) {
    res.status(404).json({ error: 'Cliente não encontrado para atualizar' });
  }
});

// Deletar cliente
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.cliente.delete({
      where: { id: Number(id) },
    });

    res.status(204).send(); // No Content
  } catch (error) {
    res.status(404).json({ error: 'Cliente não encontrado para exclusão' });
  }
});

export default router;
