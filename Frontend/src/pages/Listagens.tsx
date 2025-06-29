import { useState } from 'react';
import '../index.css';

export default function Listagens() {
  const [dados, setDados] = useState<Record<string, string | number>[]>([]);
  const [titulo, setTitulo] = useState('');

  function buscar(endpoint: string, titulo: string) {
    fetch(`http://localhost:3001/listagem/${endpoint}`)
      .then(res => res.json())
      .then(data => {
        setDados(data);
        setTitulo(titulo);
      })
      .catch(err => console.error('Erro ao buscar listagem:', err));
  }

  const botaoEstilo = {
    backgroundColor: '#6200ea',
    color: 'white',
    border: 'none',
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 500,
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '20px' }}>Relatórios</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <button style={botaoEstilo} onClick={() => buscar('top10clientes', 'Top 10 Clientes que Mais Consumiram')}>Top 10 Clientes</button>
        <button style={botaoEstilo} onClick={() => buscar('por-genero', 'Clientes por Gênero')}>Por Gênero</button>
        <button style={botaoEstilo} onClick={() => buscar('mais-consumidos', 'Produtos/Serviços Mais Consumidos')}>Mais Consumidos</button>
        <button style={botaoEstilo} onClick={() => buscar('top10menos', 'Top 10 Clientes que Menos Consumiram')}>Top 10 Menos</button>
        <button style={botaoEstilo} onClick={() => buscar('top5gastos', 'Top 5 Clientes que Mais Gastaram')}>Top 5 Gastaram Mais</button>
      </div>

      {titulo && <h3 style={{ color: 'white', marginBottom: '1rem' }}>{titulo}</h3>}

      <div className="clientes-grid">
        {dados.map((item, index) => (
          <div key={index} className="cliente-card">
            {Object.entries(item).map(([chave, valor]) => (
              <p key={chave}>
                <strong>{chave}:</strong> {String(valor)}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
