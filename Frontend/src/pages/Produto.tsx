import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

export default function Produto() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error('Erro ao buscar produtos:', err));
  }, []);

  function deletarProduto(id: number) {
    if (confirm('Deseja excluir este produto?')) {
      fetch(`http://localhost:3001/produtos/${id}`, { method: 'DELETE' })
        .then(() => {
          alert('Produto excluído com sucesso!');
          setProdutos(prev => prev.filter(p => p.id !== id));
        });
    }
  }

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Produtos</h1>
      <div className="clientes-grid">
        {produtos.map(produto => (
          <div key={produto.id} className="cliente-card">
            <p><strong>Nome:</strong> {produto.nome}</p>
            <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                onClick={() => navigate(`/atualizar/produto/${produto.id}`)}
                style={{ backgroundColor: '#6200ea', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '6px' }}
              >
                Editar
              </button>

              <button
                onClick={() => deletarProduto(produto.id)}
                style={{ backgroundColor: '#d32f2f', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '6px' }}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
