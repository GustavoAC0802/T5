import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AtualizarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    genero: ''
  });

  useEffect(() => {
    fetch(`http://localhost:3001/clientes/${id}`)
      .then(res => res.json())
      .then(data => setCliente(data))
      .catch(err => console.error('Erro ao buscar cliente:', err));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch(`http://localhost:3001/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    })
      .then(() => {
        alert('Cliente atualizado com sucesso!');
        navigate('/clientes');
      });
  }

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1>Editar Cliente</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '1rem' }}>
        <input name="nome" value={cliente.nome} onChange={handleChange} placeholder="Nome" style={{ padding: '0.5rem', borderRadius: '8px' }} />
        <input name="cpf" value={cliente.cpf} onChange={handleChange} placeholder="CPF" style={{ padding: '0.5rem', borderRadius: '8px' }} />
        <input name="telefone" value={cliente.telefone} onChange={handleChange} placeholder="Telefone" style={{ padding: '0.5rem', borderRadius: '8px' }} />
        <select name="genero" value={cliente.genero} onChange={handleChange} style={{ padding: '0.5rem', borderRadius: '8px' }}>
          <option value="">Selecione o Gênero</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
        <button type="submit" style={{ backgroundColor: '#6200ea', color: 'white', padding: '0.6rem', border: 'none', borderRadius: '8px' }}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
