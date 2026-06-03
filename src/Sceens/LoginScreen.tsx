import React, { useState } from 'react';
import api from '../API/api';

interface LoginScreenProps {
  // Alterado para receber o objeto do usuário vindo do backend Java após sucesso
  onLoginSucesso: (usuarioLogado: any) => void;
  onMudarTela: () => void;
}

export default function LoginScreen({ onLoginSucesso, onMudarTela }: LoginScreenProps) {
  const [numero, setNumero] = useState('');
  const [senha, setSenha] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const [carregando, setCarregando] = useState(false); // Evita múltiplos cliques concorrentes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!numero || !senha) {
      alert('Por favor, digite o número da conta e a senha.');
      return;
    }

    setCarregando(true);

    try {
      // Dispara a requisição para http://localhost:8080/api/friendsbank/login
      const response = await api.post('/login', {
        numero: numero,
        senha: senha
      });

      // Se o Java responder com 200 OK, recebemos o objeto da Conta com o saldo real
      alert(`Bem-vindo de volta, ${response.data.titular}!`);
      onLoginSucesso(response.data);

    } catch (error: any) {
      // Trata erros de "Senha incorreta" ou "Conta não encontrada" vindo do Java
      if (error.response && error.response.data) {
        alert(`Erro ao acessar: ${error.response.data}`);
      } else {
        alert('Não foi possível conectar ao servidor do FriendsBank.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-2">
          Número da Conta
        </label>
        <input 
          type="text" 
          value={numero} 
          onChange={(e) => setNumero(e.target.value)}
          placeholder="Ex: 123-x" 
          disabled={carregando}
          className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-2">
          Senha de Acesso
        </label>
        <div className="relative">
          <input 
            type={verSenha ? "text" : "password"} 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••" 
            disabled={carregando}
            className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-xl pl-4 pr-12 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setVerSenha(!verSenha)}
            disabled={carregando}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-lg opacity-60 hover:opacity-100 transition-opacity select-none disabled:opacity-30"
          >
            {verSenha ? '🙈' : '👁️'}
          </button>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={carregando}
        className="w-full bg-linear-to-r from-[#AA771C] via-[#D4AF37] to-[#B38728] text-black font-bold py-3.5 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50"
      >
        {carregando ? 'Autenticando na Rede VIP...' : 'Acessar Conta Gold'}
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Não possui convite?{' '}
        <button type="button" onClick={onMudarTela} disabled={carregando} className="text-[#D4AF37] hover:underline font-medium disabled:opacity-50">
          Criar Conta
        </button>
      </p>
    </form>
  );
}