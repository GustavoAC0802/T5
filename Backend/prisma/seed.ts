import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // --- Criação de Clientes ---
  const nomes = [
    "Lucas Silva", "Maria Oliveira", "Carlos Santos", "Ana Souza", "Pedro Lima",
    "Juliana Castro", "Fernando Alves", "Patrícia Martins", "Rafael Dias", "Beatriz Gomes",
    "Rodrigo Melo", "Camila Rocha", "Vinícius Costa", "Larissa Fernandes", "Gustavo Almeida",
    "Isabela Cardoso", "Bruno Pires", "Tatiane Freitas", "Eduardo Ramos", "Aline Teixeira",
    "Marcelo Nogueira", "Vanessa Ribeiro", "André Carvalho", "Natália Monteiro", "Tiago Barros",
    "Débora Antunes", "João Henrique", "Bruna Lima", "Felipe Azevedo", "Renata Duarte"
  ];

  for (let i = 0; i < nomes.length; i++) {
    const nome = nomes[i];
    const cpf = (10000000000 + i).toString();
    const telefone = `(11) 9${Math.floor(100000000 + Math.random() * 899999999)}`;
    const genero = i % 2 === 0 ? 'M' : 'F'; // Alternando entre M e F
    await prisma.cliente.create({
      data: { nome, cpf, telefone, genero }
    });
  }

  // --- Criação de Produtos ---
  const produtos = [
    { nome: "Pomada Modeladora", preco: 29.9 },
    { nome: "Shampoo Antiqueda", preco: 34.9 },
    { nome: "Condicionador Hidratante", preco: 32.5 },
    { nome: "Óleo para Barba", preco: 24.0 },
    { nome: "Cera Capilar", preco: 19.9 },
    { nome: "Minoxidil", preco: 20.0 },
    { nome: "Creme de Pentear", preco: 15.5 },
    { nome: "Óleo Reparador de Pontas", preco: 35.0 },
    { nome: "Máscara de Reparação Profunda", preco: 12.5 },
    { nome: "Ativador de Cachos", preco: 17.9 }
  ];

  for (const produto of produtos) {
    await prisma.produto.create({ data: produto });
  }

  // --- Criação de Serviços ---
  const servicos = [
    { nome: "Corte de Cabelo", preco: 25.0 },
    { nome: "Modelagem e Corte de Barba", preco: 30.0 },
    { nome: "Tratamento para Queda de Cabelo", preco: 45.0 },
    { nome: "Limpeza de Pele", preco: 50.0 },
    { nome: "Hidratação Capilar", preco: 40.0 },
    { nome: "Escova Progressiva", preco: 67.5 },
    { nome: "Coloração", preco: 32.7 },
    { nome: "Dia de Noiva", preco: 98.5 }
  ];

  for (const servico of servicos) {
    await prisma.servico.create({ data: servico });
  }

  // --- Relacionar Produtos e Serviços aos Clientes ---
  const clientes = await prisma.cliente.findMany();
  const todosProdutos = await prisma.produto.findMany();
  const todosServicos = await prisma.servico.findMany();

  for (const cliente of clientes) {
    const produtosAleatorios = todosProdutos
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 5 + 1)); // 1 a 5 produtos

    const servicosAleatorios = todosServicos
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3 + 1)); // 1 a 3 serviços

    for (const produto of produtosAleatorios) {
      await prisma.clienteProduto.create({
        data: {
          clienteId: cliente.id,
          produtoId: produto.id
        }
      });
    }

    for (const servico of servicosAleatorios) {
      await prisma.clienteServico.create({
        data: {
          clienteId: cliente.id,
          servicoId: servico.id
        }
      });
    }
  }

  console.log("✅ Seed finalizado com clientes, produtos, serviços e suas relações.");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
