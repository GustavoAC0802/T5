// src/pages/Cadastrar.tsx
import { useNavigate } from 'react-router-dom';

export default function Cadastrar() {
  const navigate = useNavigate();

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1>Escolha o que deseja cadastrar</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', maxWidth: '300px' }}>
        <button
          onClick={() => navigate('/cadastrar/cliente')}
          style={{
            backgroundColor: '#6200ea',
            color: 'white',
            border: 'none',
            padding: '1rem',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Cadastrar Cliente
        </button>
        <button
          onClick={() => navigate('/cadastrar/produto')}
          style={{
            backgroundColor: '#6200ea',
            color: 'white',
            border: 'none',
            padding: '1rem',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Cadastrar Produto
        </button>
        <button
          onClick={() => navigate('/cadastrar/servico')}
          style={{
            backgroundColor: '#6200ea',
            color: 'white',
            border: 'none',
            padding: '1rem',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Cadastrar Serviço
        </button>
      </div>
    </div>
  );
}
