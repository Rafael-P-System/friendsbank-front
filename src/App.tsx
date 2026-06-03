import { useState } from 'react';
import axios from 'axios'; // Importa o Axios para conectar com o Spring Boot
import Logo from './components/Logo';
import LoginScreen from './Sceens/LoginScreen';
import CadastroScreen from './Sceens/CadastroScreen';
import DashboardScreen from './Sceens/DashboardScreen';
// Usando 'import type' para o Vite não reclamar da regra verbatimModuleSyntax
import type { TelaAtual, UsuarioLogado } from './Types/auth';

// 🔹 CORREÇÃO: Alinhado com @RequestMapping("/api/friendsbank") do Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8080/api/friendsbank',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default function App() {
  const [tela, setTela] = useState<TelaAtual>('LOGIN');
  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogado | null>(null);
  const [erro, setErro] = useState('');

  // 🔐 Orquestra o Login Real integrado com o Spring Boot via Axios
  const handleLogin = async (numero: string, senha: string) => {
    setErro('');
    
    try {
      // 🔹 CORREÇÃO: Ataca direto o @PostMapping("/login") relativo
      const resposta = await api.post('/login', { numero, senha });
      
      // No Axios, o retorno do Spring Boot vem injetado direto em .data
      const contaAutenticada = resposta.data;

      // Alimenta o estado global do Front-end com os dados vindos da memória do servidor
      setUsuarioLogado({
        titular: contaAutenticada.titular,
        numero: contaAutenticada.numero,
        saldo: contaAutenticada.saldo
      });
      
      setTela('DASHBOARD');

    } catch (err: any) {
      // Captura a resposta de erro enviada pelo bloco catch do Java (ResponseEntity)
      const mensagemErro = err.response?.data || 'Número de conta ou senha incorretos.';
      setErro(typeof mensagemErro === 'string' ? mensagemErro : 'Erro ao autenticar.');
    }
  };

  // 📝 Cadastro Real integrado ao Back-end (Adicionado suporte a senha e tipo de conta)
  const handleCadastro = async (numero: string, titular: string, senha: string, tipoConta: string) => {
    setErro('');
    
    try {
      // 🔹 CORREÇÃO: Ataca direto o @PostMapping("/contas") relativo
      await api.post('/contas', { numero, titular, senha, tipoConta });

      alert(`Conta ${numero} cadastrada com sucesso no banco de dados do FriendsBank!`);
      setTela('LOGIN');

    } catch (err: any) {
      const mensagemErro = err.response?.data || 'Falha ao realizar o cadastro no servidor.';
      setErro(typeof mensagemErro === 'string' ? mensagemErro : 'Erro no servidor.');
    }
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    setTela('LOGIN');
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0A0A0A] via-[#121212] to-[#1A1A1A] text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-[#D4AF37] selection:text-black">
      
      <div className="w-full max-w-md bg-[#161616]/80 backdrop-blur-md p-8 rounded-2xl border border-[#D4AF37]/20 shadow-[0_0_50px_rgba(212,175,55,0.05)] transition-all duration-300">
        
        {/* Renderiza o Logo gerado por IA */}
        <Logo />

        {/* Mensagem de Erro Geral vinda da API Java */}
        {erro && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
            {erro}
          </div>
        )}

        {/* Controle de Rotas / Telas */}
        {tela === 'LOGIN' && (
          <LoginScreen onLogin={handleLogin} onMudarTela={() => setTela('CADASTRO')} />
        )}

        {tela === 'CADASTRO' && (
          <CadastroScreen 
            // Garante o repasse de todos os dados capturados pelos inputs do formulário
            onCadastro={(num, tit, sen, tipo) => handleCadastro(num, tit, sen, tipo)} 
            onVoltar={() => setTela('LOGIN')} 
          />
        )}

        {tela === 'DASHBOARD' && usuarioLogado && (
          <DashboardScreen usuario={usuarioLogado} onLogout={handleLogout} />
        )}

      </div>
    </div>
  );
}