import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  genero: string;
}

export default function Cliente() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error('Erro ao buscar clientes:', err));
  }, []);

  function deletarCliente(id: number) {
    if (confirm('Deseja realmente excluir este cliente?')) {
      fetch(`http://localhost:3001/clientes/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          alert('Cliente excluído!');
          setClientes(prev => prev.filter(c => c.id !== id));
        });
    }
  }

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Clientes</h1>
      <div className="clientes-grid">
        {clientes.map(cliente => (
          <div key={cliente.id} className="cliente-card">
            <p><strong>Nome:</strong> {cliente.nome}</p>
            <p><strong>CPF:</strong> {cliente.cpf}</p>
            <p><strong>Telefone:</strong> {cliente.telefone}</p>
            <p><strong>Gênero:</strong> {cliente.genero}</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                onClick={() => navigate(`/atualizar/cliente/${cliente.id}`)}
                style={{ backgroundColor: '#6200ea', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px' }}
              >
                Editar
              </button>

              <button
                onClick={() => deletarCliente(cliente.id)}
                style={{ backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px' }}
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
