import express from 'express';
import cors from 'cors';

import clienteRoutes from './routes/cliente';
import produtoRoutes from './routes/produto';
import servicoRoutes from './routes/servico';
import listagensRouter from './routes/listagens'; // ✅ IMPORTAÇÃO CORRETA

const app = express();

app.use(cors());
app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/servicos', servicoRoutes);
app.use('/', listagensRouter); // ✅ ROTA FUNCIONANDO

export default app;
