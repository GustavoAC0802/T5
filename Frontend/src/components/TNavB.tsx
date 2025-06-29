import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      background: '#6200ea',
      padding: '1rem',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <ul style={{
        display: 'flex',
        gap: '1rem',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}>
        <li>
          <Link to="/clientes" style={{ color: 'white', textDecoration: 'none' }}>Clientes</Link>
        </li>
        <li>
          <Link to="/produtos" style={{ color: 'white', textDecoration: 'none' }}>Produtos</Link>
        </li>
        <li>
          <Link to="/servicos" style={{ color: 'white', textDecoration: 'none' }}>
            Serviços
          </Link>
        </li>
          <li>
          <Link to="/listagens" style={{ color: 'white', textDecoration: 'none' }}>
            Listagens
          </Link>
        </li>
        <li>
          <Link to="/cadastrar" style={{ color: 'white', textDecoration: 'none' }}>Cadastrar</Link>
        </li>
      </ul>
    </nav>
  );
}
