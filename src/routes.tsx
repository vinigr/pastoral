import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import ComprovanteMatricula from "./components/ComprovanteMatricula/ComprovanteMatricula";
import Dashboard from "./components/Dashboard/Dashboard";
import Alunos from "./pages/Alunos/Alunos";
import AlunosOficina from "./pages/AlunosOficina/AlunosOficina";
import FormAluno from "./pages/FormAluno/FormAluno";
import FormularioMatricula from "./pages/FormularioMatricula/FormularioMatricula";
import Instituicao from "./pages/Instituicao/Instituicao";
import Login from "./pages/Login/Login";
import Matriculas from "./pages/Matriculas/Matriculas";
import Oficina from "./pages/Oficina/Oficina";
import Oficinas from "./pages/Oficinas/Oficinas";
import Usuario from "./pages/Usuario/Usuario";

const PrivateRoute = (props: any) => {
  return localStorage.getItem("logado") ? <Outlet /> : <Navigate to="/login" />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="/alunos" element={<Alunos />} />
            <Route path="/aluno" element={<FormAluno />} />
            <Route path="/aluno/:id" element={<FormAluno />} />

            <Route path="/matriculas" element={<Matriculas />} />
            <Route path="/matricula" element={<FormularioMatricula />} />
            <Route path="/matricula/:id" element={<FormularioMatricula />} />

            <Route path="/oficinas" element={<Oficinas />} />
            <Route path="/oficina" element={<Oficina />} />
            <Route path="/oficina/:id" element={<Oficina />} />

            <Route path="/oficina/:id/alunos" element={<AlunosOficina />} />

            <Route path="/instituicao" element={<Instituicao />} />
            <Route path="/relatorio" element={<ComprovanteMatricula />} />

            <Route path="/usuario" element={<Usuario />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
