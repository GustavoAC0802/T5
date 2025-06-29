import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AtualizarServico() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [servico, setServico] = useState({
    nome: '',
    preco: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:3001/servicos/${id}`)
      .then(res => res.json())
      .then(data => setServico(data))
      .catch(err => console.error('Erro ao buscar serviço:', err));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setServico(prev => ({
      ...prev,
      [name]: name === 'preco' ? parseFloat(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch(`http://localhost:3001/servicos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(servico),
    })
      .then(() => {
        alert('Serviço atualizado com sucesso!');
        navigate('/servicos');
      });
  }

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1>Editar Serviço</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, gap: '1rem' }}>
        <input
          name="nome"
          value={servico.nome}
          onChange={handleChange}
          placeholder="Nome"
          style={{ padding: '0.5rem', borderRadius: '8px' }}
        />
        <input
          name="preco"
          type="number"
          value={servico.preco}
          onChange={handleChange}
          placeholder="Preço"
          step="0.01"
          style={{ padding: '0.5rem', borderRadius: '8px' }}
        />
        <button type="submit" style={{ backgroundColor: '#6200ea', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '8px' }}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
