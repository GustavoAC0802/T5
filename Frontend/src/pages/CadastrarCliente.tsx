import { useState } from 'react';

export default function CadastrarCliente() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    genero: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch('http://localhost:3001/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(() => {
        alert('Cliente cadastrado com sucesso!');
        setForm({ nome: '', cpf: '', telefone: '', genero: '' });
      });
  }

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1>Cadastrar Cliente</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" style={{ padding: '0.5rem', borderRadius: '8px' }} />
        <input name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF" style={{ padding: '0.5rem', borderRadius: '8px' }} />
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" style={{ padding: '0.5rem', borderRadius: '8px' }} />
        <select name="genero" value={form.genero} onChange={handleChange} style={{ padding: '0.5rem', borderRadius: '8px' }}>
          <option value="">Gênero</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
        <button type="submit" style={{ backgroundColor: '#6200ea', color: 'white', padding: '0.6rem', border: 'none', borderRadius: '8px' }}>
          Cadastrar Cliente
        </button>
      </form>
    </div>
  );
}
