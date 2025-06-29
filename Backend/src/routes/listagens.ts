import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router(); // ✅ isso estava faltando
const prisma = new PrismaClient(); // ✅ também estava faltando

// 1. Top 10 clientes que mais consumiram
router.get('/listagem/top10clientes', async (req: Request, res: Response) => {
  const clientes = await prisma.cliente.findMany({
    include: {
      produtos: true,
      servicos: true,
    },
  });

  const ranking = clientes.map((c) => ({
    nome: c.nome,
    total: c.produtos.length + c.servicos.length,
  }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  res.json(ranking);
});

// 2. Clientes por gênero
router.get('/listagem/por-genero', async (req: Request, res: Response) => {
  const resultado = await prisma.cliente.groupBy({
    by: ['genero'],
    _count: true,
  });

  const formatado = resultado.map((g) => ({
    genero: g.genero,
    total: g._count,
  }));

  res.json(formatado);
});

// 3. Produtos/serviços mais consumidos
router.get('/listagem/mais-consumidos', async (req: Request, res: Response) => {
  const produtos = await prisma.clienteProduto.groupBy({
    by: ['produtoId'],
    _count: true,
  });

  const servicos = await prisma.clienteServico.groupBy({
    by: ['servicoId'],
    _count: true,
  });

  const listaProdutos = await Promise.all(produtos.map(async (p) => {
    const prod = await prisma.produto.findUnique({ where: { id: p.produtoId } });
    return { nome: prod?.nome, tipo: 'Produto', total: p._count };
  }));

  const listaServicos = await Promise.all(servicos.map(async (s) => {
    const serv = await prisma.servico.findUnique({ where: { id: s.servicoId } });
    return { nome: serv?.nome, tipo: 'Serviço', total: s._count };
  }));

  res.json([...listaProdutos, ...listaServicos].sort((a, b) => b.total - a.total));
});

// 4. Mais consumidos por gênero
router.get('/listagem/consumo-por-genero', async (req: Request, res: Response) => {
  const clientes = await prisma.cliente.findMany({
    include: {
      produtos: true,
      servicos: true,
    },
  });

  const agrupado: Record<string, Record<string, number>> = {};

  for (const cliente of clientes) {
    if (!agrupado[cliente.genero]) agrupado[cliente.genero] = {};

    cliente.produtos.forEach((p) => {
      const chave = `Produto ${p.produtoId}`;
      agrupado[cliente.genero][chave] = (agrupado[cliente.genero][chave] || 0) + 1;
    });

    cliente.servicos.forEach((s) => {
      const chave = `Serviço ${s.servicoId}`;
      agrupado[cliente.genero][chave] = (agrupado[cliente.genero][chave] || 0) + 1;
    });
  }

  res.json(agrupado);
});

// 5. Top 10 clientes que menos consumiram
router.get('/listagem/top10menos', async (req: Request, res: Response) => {
  const clientes = await prisma.cliente.findMany({
    include: {
      produtos: true,
      servicos: true,
    },
  });

  const ranking = clientes.map((c) => ({
    nome: c.nome,
    total: c.produtos.length + c.servicos.length,
  }))
    .sort((a, b) => a.total - b.total)
    .slice(0, 10);

  res.json(ranking);
});

// 6. Top 5 clientes que mais gastaram
router.get('/listagem/top5gastos', async (req: Request, res: Response) => {
  const clientes = await prisma.cliente.findMany({
    include: {
      produtos: { include: { produto: true } },
      servicos: { include: { servico: true } },
    },
  });

  const ranking = clientes.map((c) => {
    const total = c.produtos.reduce((sum, cp) => sum + cp.produto.preco, 0) +
                  c.servicos.reduce((sum, cs) => sum + cs.servico.preco, 0);
    return { nome: c.nome, totalGasto: total };
  })
    .sort((a, b) => b.totalGasto - a.totalGasto)
    .slice(0, 5);

  res.json(ranking);
});

export default router; // ✅ exporta para usar no app.ts
