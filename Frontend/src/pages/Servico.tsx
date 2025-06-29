import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

interface Servico {
  id: number;
  nome: string;
  preco: number;
}

export default function Servico() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/servicos')
      .then(res => res.json())
      .then(data => setServicos(data))
      .catch(err => console.error('Erro ao buscar serviços:', err));
  }, []);

  function deletarServico(id: number) {
    if (confirm('Deseja excluir este serviço?')) {
      fetch(`http://localhost:3001/servicos/${id}`, { method: 'DELETE' })
        .then(() => {
          alert('Serviço excluído com sucesso!');
          setServicos(prev => prev.filter(s => s.id !== id));
        });
    }
  }

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Serviços</h1>
      <div className="clientes-grid">
        {servicos.map(servico => (
          <div key={servico.id} className="cliente-card">
            <p><strong>Nome:</strong> {servico.nome}</p>
            <p><strong>Preço:</strong> R$ {servico.preco.toFixed(2)}</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                onClick={() => navigate(`/atualizar/servico/${servico.id}`)}
                style={{ backgroundColor: '#6200ea', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '6px' }}
              >
                Editar
              </button>

              <button
                onClick={() => deletarServico(servico.id)}
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
