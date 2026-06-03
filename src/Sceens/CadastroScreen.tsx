import React, { useState } from 'react';
import api from '../API/api';

interface CadastroScreenProps {
  // Alterado para notificar o sucesso do cadastro e retornar automaticamente para a tela de login
  onCadastroSucesso: () => void;
  onVoltar: () => void;
}

export default function CadastroScreen({ onCadastroSucesso, onVoltar }: CadastroScreenProps) {
  const [numero, setNumero] = useState('');
  const [titular, setTitular] = useState('');
  const [tipoConta, setTipoConta] = useState('CORRENTE');
  const [senha, setSenha] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const [carregando, setCarregando] = useState(false); // Bloqueia concorrência no clique

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titular || !numero || !senha) {
      alert('Por favor, preencha todos os campos para finalizar a associação.');
      return;
    }

    setCarregando(true);

    try {
      // Dispara a requisição para http://localhost:8080/api/friendsbank/contas
      await api.post('/contas', {
        numero: numero,
        titular: titular,
        tipoConta: tipoConta,
        senha: senha
      });

      alert('Associação concluída com sucesso! Você já pode acessar sua conta.');
      onCadastroSucesso(); // Retorna o usuário para o formulário de login

    } catch (error: any) {
      // Captura erros de validação do back-end, como "Uma conta com este número já existe!"
      if (error.response && error.response.data) {
        alert(`Erro no cadastro: ${error.response.data}`);
      } else {
        alert('Não foi possível conectar ao servidor do FriendsBank.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-1">
          Nome Completo do Titular
        </label>
        <input 
          type="text" 
          value={titular} 
          onChange={(e) => setTitular(e.target.value)}
          placeholder="Ex: Rafael Silva" 
          disabled={carregando}
          className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-all disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-1">
          Número da Conta
        </label>
        <input 
          type="text" 
          value={numero} 
          onChange={(e) => setNumero(e.target.value)}
          placeholder="Ex: 789-z" 
          disabled={carregando}
          className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-all disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-1">
          Modalidade Exclusiva
        </label>
        <select 
          value={tipoConta} 
          onChange={(e) => setTipoConta(e.target.value)}
          disabled={carregando}
          className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-all disabled:opacity-50"
        >
          <option value="CORRENTE">CORRENTE PREMIUM</option>
          <option value="POUPANCA">POUPANÇA INVEST GOLD</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-1">
          Defina sua Senha Forte
        </label>
        <div className="relative">
          <input 
            type={verSenha ? "text" : "password"} 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Mínimo 8 caracteres" 
            disabled={carregando}
            className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-xl pl-4 pr-12 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-all disabled:opacity-50"
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
        className="w-full bg-linear-to-r from-[#AA771C] via-[#D4AF37] to-[#B38728] text-black font-bold py-3 rounded-xl shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:opacity-90 transition-all mt-2 disabled:opacity-50"
      >
        {carregando ? 'Registrando Credenciais Gold...' : 'Finalizar Associação'}
      </button>

      <button 
        type="button" 
        onClick={onVoltar} 
        disabled={carregando}
        className="w-full bg-transparent border border-gray-700 text-gray-400 py-2.5 rounded-xl text-sm hover:bg-white/5 transition-all disabled:opacity-50"
      >
        Voltar ao Login
      </button>
    </form>
  );
}