import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ComprovanteMatricula from "./components/ComprovanteMatricula/ComprovanteMatricula";
import Dashboard from "./components/Dashboard/Dashboard";
import Alunos from "./pages/Alunos/Alunos";
import FormAluno from "./pages/FormAluno/FormAluno";
import FormularioMatricula from "./pages/FormularioMatricula/FormularioMatricula";
import Instituicao from "./pages/Instituicao/Instituicao";
import Login from "./pages/Login/Login";
import Matriculas from "./pages/Matriculas/Matriculas";
import Oficina from "./pages/Oficina/Oficina";
import Oficinas from "./pages/Oficinas/Oficinas";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="/aluno" element={<FormAluno />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/aluno/:id" element={<FormAluno />} />

          <Route path="/matriculas" element={<Matriculas />} />
          <Route path="/matricula" element={<FormularioMatricula />} />
          <Route path="/matricula/:id" element={<FormularioMatricula />} />

          <Route path="/oficinas" element={<Oficinas />} />
          <Route path="/oficina" element={<Oficina />} />
          <Route path="/oficina/:id" element={<Oficina />} />

          <Route path="/instituicao" element={<Instituicao />} />
          <Route path="/relatorio" element={<ComprovanteMatricula />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
