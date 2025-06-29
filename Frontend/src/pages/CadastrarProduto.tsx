import { useState } from 'react';

export default function CadastrarProduto() {
  const [form, setForm] = useState({ nome: '', preco: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch('http://localhost:3001/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: form.nome, preco: parseFloat(form.preco) }),
    })
      .then(() => {
        alert('Produto cadastrado com sucesso!');
        setForm({ nome: '', preco: '' });
      });
  }

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1>Cadastrar Produto</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" style={{ padding: '0.5rem', borderRadius: '8px' }} />
        <input name="preco" type="number" value={form.preco} onChange={handleChange} placeholder="Preço" step="0.01" style={{ padding: '0.5rem', borderRadius: '8px' }} />
        <button type="submit" style={{ backgroundColor: '#6200ea', color: 'white', padding: '0.6rem', border: 'none', borderRadius: '8px' }}>
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}
