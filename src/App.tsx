import { useState } from 'react';
import Logo from './components/Logo';
import LoginScreen from './Sceens/LoginScreen';
import CadastroScreen from './Sceens/CadastroScreen';
import DashboardScreen from './Sceens/DashboardScreen';
// Usando 'import type' para o Vite não reclamar da regra verbatimModuleSyntax
import type { TelaAtual, UsuarioLogado } from './Types/auth';

export default function App() {
  const [tela, setTela] = useState<TelaAtual>('LOGIN');
  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogado | null>(null);
  const [erro, setErro] = useState('');

  // Orquestra o Login combinando com as senhas fortes do Spring Boot
  const handleLogin = (numero: string, senha: string) => {
    setErro('');
    
    if (numero === '123-x' && senha === 'Raf@Pim2026#') {
      setUsuarioLogado({ titular: 'Rafael Pimentel', numero: '123-x', saldo: 500.00 });
      setTela('DASHBOARD');
    } else if (numero === '456-y' && senha === 'Jaq@Premium$88') {
      setUsuarioLogado({ titular: 'Jaqueline', numero: '456-y', saldo: 200.00 });
      setTela('DASHBOARD');
    } else {
      setErro('Número de conta ou senha incorretos (Use os dados do CommandLineRunner).');
    }
  };

  const handleCadastro = (numero: string, titular: string) => {
    setErro('');
    alert(`Conta ${numero} pré-cadastrada com sucesso para ${titular}!`);
    setTela('LOGIN');
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    setTela('LOGIN');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#121212] to-[#1A1A1A] text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-[#D4AF37] selection:text-black">
      
      <div className="w-full max-w-md bg-[#161616]/80 backdrop-blur-md p-8 rounded-2xl border border-[#D4AF37]/20 shadow-[0_0_50px_rgba(212,175,55,0.05)] transition-all duration-300">
        
        {/* Renderiza o Logo gerado por IA */}
        <Logo />

        {/* Mensagem de Erro Geral da API */}
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
            onCadastro={(num, tit) => handleCadastro(num, tit)} 
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