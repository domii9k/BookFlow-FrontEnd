import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageUsers from './Pages/Users';
import PageLogin from './Pages/Login';
import PageAluno from './Pages/Aluno';
import PageBooks from './Pages/Books';
import PageEmprestimos from './Pages/Emprestimos';
import PageEmprestimosFormulario from './Pages/FormEmprestimos';
import PageDevidos from './Pages/Devidos';
import PageRelatorios from './Pages/Relatorios';
import PageConfigs from './Pages/Configuracoes';
import PageNotFound from './Pages/NotFound';

function RoutersApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageLogin />} />
        <Route path='/Usuarios' element={<PageUsers />} />
        <Route path='/Alunos' element={<PageAluno />} />
        <Route path='/Livros' element={<PageBooks />} />
        <Route path='/Emprestimos' element={<PageEmprestimos />} />
        <Route path='/Emprestimos/Formulario' element={<PageEmprestimosFormulario />} />
        <Route path='/Devidos' element={<PageDevidos />} />
        <Route path='/Relatorios' element={<PageRelatorios />} />
        <Route path='/Configuracoes' element={<PageConfigs />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default RoutersApp;
