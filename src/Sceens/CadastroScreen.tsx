import React, { useState } from 'react';

interface CadastroScreenProps {
  onCadastro: (numero: string, titular: string, tipoConta: string, senha: string) => void;
  onVoltar: () => void;
}

export default function CadastroScreen({ onCadastro, onVoltar }: CadastroScreenProps) {
  const [numero, setNumero] = useState('');
  const [titular, setTitular] = useState('');
  const [tipoConta, setTipoConta] = useState('CORRENTE');
  const [senha, setSenha] = useState('');
  const [verSenha, setVerSenha] = useState(false); // Estado para controlar visibilidade

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCadastro(numero, titular, tipoConta, senha);
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
          className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
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
          className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-1">
          Modalidade Exclusiva
        </label>
        <select 
          value={tipoConta} 
          onChange={(e) => setTipoConta(e.target.value)}
          className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
        >
          <option value="CORRENTE">CORRENTE PREMIUM</option>
          <option value="POUPANCA">POUPANÇA INVEST GOLD</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-1">
          Defina sua Senha Forte
        </label>
        {/* Container relativo para posicionar o botão dentro do input */}
        <div className="relative">
          <input 
            type={verSenha ? "text" : "password"} // Muda dinamicamente aqui também!
            value={senha} 
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Mínimo 8 caracteres" 
            className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-xl pl-4 pr-12 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
          />
          <button
            type="button"
            onClick={() => setVerSenha(!verSenha)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-lg opacity-60 hover:opacity-100 transition-opacity select-none"
          >
            {verSenha ? '🙈' : '👁️'}
          </button>
        </div>
      </div>

      <button type="submit" className="w-full bg-linear-to-r from-[#AA771C] via-[#D4AF37] to-[#B38728] text-black font-bold py-3 rounded-xl shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:opacity-90 transition-all mt-2">
        Finalizar Associação
      </button>

      <button type="button" onClick={onVoltar} className="w-full bg-transparent border border-gray-700 text-gray-400 py-2.5 rounded-xl text-sm hover:bg-white/5 transition-all">
        Voltar ao Login
      </button>
    </form>
  );
}