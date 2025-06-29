import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AtualizarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: '',
    preco: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:3001/produtos/${id}`)
      .then(res => res.json())
      .then(data => setProduto(data))
      .catch(err => console.error('Erro ao buscar produto:', err));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProduto(prev => ({
      ...prev,
      [name]: name === 'preco' ? parseFloat(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch(`http://localhost:3001/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto),
    })
      .then(() => {
        alert('Produto atualizado com sucesso!');
        navigate('/produtos');
      });
  }

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1>Editar Produto</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, gap: '1rem' }}>
        <input
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          placeholder="Nome"
          style={{ padding: '0.5rem', borderRadius: '8px' }}
        />
        <input
          name="preco"
          type="number"
          value={produto.preco}
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
