// App.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import BNav from "./components/TNavB";
import Cliente from './pages/Cliente';
import Produto from './pages/Produto';
import Servico from './pages/Servico';
import Listagens from './pages/Listagens';
import AtualizarCliente from './pages/AtualizarCliente';
import AtualizarProduto from './pages/AtualizarProduto';
import AtualizarServico from './pages/AtualizarServico';
import CadastrarCliente from './pages/CadastrarCliente';
import CadastrarProduto from './pages/CadastrarProduto';
import CadastrarServico from './pages/CadastrarServico';
import Cadastrar from './pages/Cadastrar';

function App() {
return (
<>
<BNav />
<div style={{ color: 'white', padding: '2rem' }}>
<Routes>
<Route path="/" element={<Navigate to="/clientes" replace />} />
<Route path="/clientes" element={<Cliente />} />
<Route path="/produtos" element={<Produto />} />
<Route path="/servicos" element={<Servico />} />
<Route path="/listagens" element={<Listagens />} />
<Route path="/atualizar/cliente/:id" element={<AtualizarCliente />} />
<Route path="/atualizar/produto/:id" element={<AtualizarProduto />} />
<Route path="/atualizar/servico/:id" element={<AtualizarServico />} />
<Route path="/cadastrar" element={<Cadastrar />} />
<Route path="/cadastrar/cliente" element={<CadastrarCliente />} />
<Route path="/cadastrar/produto" element={<CadastrarProduto />} />
<Route path="/cadastrar/servico" element={<CadastrarServico />} />
</Routes>
</div>
</>
);
}

export default App;