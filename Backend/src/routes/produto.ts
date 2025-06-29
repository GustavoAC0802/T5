import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Buscar todos os produtos
router.get('/', async (req: Request, res: Response) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

// Buscar produto por ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const produto = await prisma.produto.findUnique({
    where: { id: Number(id) },
  });

  if (!produto) {
    res.status(404).json({ error: 'Produto não encontrado' });
    return;
  }

  res.json(produto);
});

// Criar novo produto
router.post('/', async (req: Request, res: Response) => {
  const { nome, preco } = req.body;
  const produto = await prisma.produto.create({
    data: { nome, preco: Number(preco) },
  });

  res.status(201).json(produto);
});

// Atualizar produto
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  try {
    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: { nome, preco: Number(preco) },
    });
    res.json(produto);
  } catch (error) {
    res.status(404).json({ error: 'Produto não encontrado para atualizar' });
  }
});

// Deletar produto
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.produto.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Produto não encontrado para exclusão' });
  }
});

export default router;
