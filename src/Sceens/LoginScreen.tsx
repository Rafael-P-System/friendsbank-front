import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (numero: string, senha: string) => void;
  onMudarTela: () => void;
}

export default function LoginScreen({ onLogin, onMudarTela }: LoginScreenProps) {
  const [numero, setNumero] = useState('');
  const [senha, setSenha] = useState('');
  const [verSenha, setVerSenha] = useState(false); // Estado para controlar visibilidade

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(numero, senha);
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
          className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-2">
          Senha de Acesso
        </label>
        {/* Container relativo para posicionar o botão dentro do input */}
        <div className="relative">
          <input 
            type={verSenha ? "text" : "password"} // Muda dinamicamente aqui!
            value={senha} 
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••" 
            className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-xl pl-4 pr-12 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
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

      <button type="submit" className="w-full bg-linear-to-r from-[#AA771C] via-[#D4AF37] to-[#B38728] text-black font-bold py-3.5 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:opacity-90 active:scale-[0.99] transition-all">
        Acessar Conta Gold
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Não possui convite?{' '}
        <button type="button" onClick={onMudarTela} className="text-[#D4AF37] hover:underline font-medium">
          Criar Conta
        </button>
      </p>
    </form>
  );
}