import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      background: '#6200ea',
      padding: '1rem',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <ul className="nav-list" style={{
        display: 'flex',
        flexWrap: 'wrap', // permite quebrar linha
        gap: '1rem',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        justifyContent: 'center', // centraliza os itens
      }}>
        <li><Link to="/clientes" className="nav-link">Clientes</Link></li>
        <li><Link to="/produtos" className="nav-link">Produtos</Link></li>
        <li><Link to="/servicos" className="nav-link">Serviços</Link></li>
        <li><Link to="/listagens" className="nav-link">Listagens</Link></li>
        <li><Link to="/cadastrar" className="nav-link">Cadastrar</Link></li>
      </ul>

      {/* Estilos responsivos */}
      <style>{`
        .nav-link {
          color: white;
          text-decoration: none;
          font-size: 1rem;
        }

        @media (max-width: 600px) {
          .nav-link {
            font-size: 0.8rem;
          }
          .nav-list {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </nav>
  );
}
