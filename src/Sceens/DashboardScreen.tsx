import { useState } from 'react';
import type { UsuarioLogado } from '../Types/auth';

interface DashboardScreenProps {
  usuario: UsuarioLogado;
  onLogout: () => void;
}

type AbaAtual = 'INICIO' | 'EXTRATO' | 'CARTAO' | 'EMPRESTIMO';
type SubTelaInicio = 'MENU' | 'PIX' | 'BOLETO';

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  data: string;
}

export default function DashboardScreen({ usuario, onLogout }: DashboardScreenProps) {
  const [aba, setAba] = useState<AbaAtual>('INICIO');
  const [subTela, setSubTela] = useState<SubTelaInicio>('MENU');

  // Helper para alternar abas e resetar sub-telas
  const trocarAba = (novaAba: AbaAtual) => {
    setAba(novaAba);
    setSubTela('MENU');
  };

  const [saldoAtual] = useState<number>(usuario.saldo);
  const [saldoInvestimento] = useState<number>(500.00);
  const [historicoExtrato] = useState<Transacao[]>([
    { id: 1, descricao: 'Depósito Inicial Pró-Gold', valor: usuario.saldo, data: new Date().toLocaleDateString('pt-BR') }
  ]);

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="border-b border-[#D4AF37]/20 pb-4 flex justify-between items-end">
        <div className="text-left">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Área Exclusiva</p>
          <h2 className="text-xl font-bold text-white">{usuario.titular}</h2>
          <p className="text-xs text-[#C5A059]">Conta: {usuario.numero}</p>
        </div>
        <button onClick={onLogout} className="text-xs bg-red-950/40 text-red-400 px-3 py-1.5 rounded-lg border border-red-900/30">Sair</button>
      </div>

      {/* Menu Principal */}
      <div className="flex bg-black/40 p-1 rounded-xl border border-gray-800 text-xs justify-between">
        {(['INICIO', 'EXTRATO', 'CARTAO', 'EMPRESTIMO'] as AbaAtual[]).map((item) => (
          <button key={item} onClick={() => trocarAba(item)}
            className={`flex-1 py-2 rounded-lg font-medium uppercase ${aba === item ? 'bg-[#D4AF37] text-black font-bold' : 'text-gray-400'}`}>
            {item}
          </button>
        ))}
      </div>

      {/* Conteúdo Dinâmico */}
      <div className="min-h-55 flex flex-col justify-center relative">
        
        {aba === 'INICIO' && (
          <div className="animate-fadeIn space-y-4">
            <div className="bg-black/50 p-5 rounded-xl border border-[#D4AF37]/10 shadow-inner">
              <div className="text-center mb-4">
                <p className="text-xs text-[#C5A059] uppercase font-semibold">Saldo Disponível Gold</p>
                <p className="text-3xl font-black text-[#D4AF37]">R$ {saldoAtual.toFixed(2)}</p>
              </div>
              <div className="w-full h-px bg-[#D4AF37]/10 mb-4"></div>
              <div className="text-center">
                <p className="text-[9px] text-gray-500 uppercase font-semibold">Saldo Investimento</p>
                <p className="text-xl font-bold text-[#D4AF37]">R$ {saldoInvestimento.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {aba === 'EXTRATO' && (
          <div className="animate-fadeIn space-y-4">
            {subTela === 'MENU' ? (
              <>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button onClick={() => setSubTela('PIX')} className="bg-[#222] border border-[#D4AF37]/40 text-[#D4AF37] py-3 rounded-xl text-sm font-semibold hover:bg-[#D4AF37] hover:text-black transition-all">
                    💸 Enviar Pix
                  </button>
                  <button onClick={() => setSubTela('BOLETO')} className="bg-[#222] border border-[#D4AF37]/40 text-[#D4AF37] py-3 rounded-xl text-sm font-semibold hover:bg-[#D4AF37] hover:text-black transition-all">
                    📄 Pagar Boleto
                  </button>
                </div>
                <h3 className="text-sm font-bold text-[#C5A059] uppercase">Histórico Recente</h3>
                {historicoExtrato.map((item) => (
                  <div key={item.id} className="bg-[#1C1C1C] p-3 rounded-xl flex justify-between border border-gray-800">
                    <p className="text-white text-sm">{item.descricao}</p>
                    <span className="text-green-400 font-mono">R$ {item.valor.toFixed(2)}</span>
                  </div>
                ))}
              </>
            ) : (
              <div className="bg-[#111] p-6 rounded-xl border border-[#D4AF37]/20 animate-fadeIn">
                <button onClick={() => setSubTela('MENU')} className="text-[#D4AF37] text-xs mb-4 underline">← Voltar para o Extrato</button>
                <h3 className="text-white font-bold mb-4">{subTela === 'PIX' ? 'Nova Transferência Pix' : 'Pagamento de Boleto'}</h3>
                <input type="text" placeholder={subTela === 'PIX' ? "Chave Pix" : "Código de Barras"} className="w-full bg-black border border-gray-700 p-3 rounded-lg text-white mb-3" />
                <input type="number" placeholder="Valor (R$)" className="w-full bg-black border border-gray-700 p-3 rounded-lg text-white mb-4" />
                <button className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-lg">Confirmar {subTela}</button>
              </div>
            )}
          </div>
        )}

        {aba === 'CARTAO' && (
          <div className="animate-fadeIn flex flex-col items-center py-2 space-y-6">
            <div className="w-full max-w-85 h-48 bg-linear-to-br from-[#1F1F1F] via-[#0D0D0D] to-[#2A2315] rounded-2xl p-6 border border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">Banco dos Amigos</p>
                  <p className="text-[8px] text-gray-500 uppercase tracking-wider">Premium Card</p>
                </div>
                <div className="w-9 h-7 bg-[#E5C060] rounded-md border border-black/20"></div>
              </div>
              <div>
                <p className="text-lg font-mono text-white tracking-widest mb-2">5412 •••• •••• 9876</p>
                <div className="flex justify-between items-end">
                  <p className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider">{usuario.titular}</p>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-red-600 border border-black/20 opacity-90"></div>
                    <div className="w-6 h-6 rounded-full bg-yellow-500 border border-black/20 opacity-90"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-black/50 p-5 rounded-xl border border-[#D4AF37]/10 text-center shadow-inner">
              <p className="text-[10px] text-[#C5A059] uppercase tracking-wider font-semibold mb-1">Saldo Disponível</p>
              <p className="text-2xl font-black text-[#D4AF37]">R$ {saldoAtual.toFixed(2)}</p>
            </div>
          </div>
        )}

        {aba === 'EMPRESTIMO' && (
          <div className="animate-fadeIn p-6 border border-[#D4AF37]/30 rounded-2xl bg-linear-to-b from-black/60 to-[#151208] text-center shadow-lg">
            <h3 className="text-[#D4AF37] font-bold text-lg mb-1">Crédito Pré-Aprovado</h3>
            <p className="text-gray-400 text-xs mb-6 uppercase tracking-widest">Exclusivo para membros Gold</p>
            <div className="bg-black/40 py-6 rounded-xl border border-[#D4AF37]/20 mb-6">
              <p className="text-[#C5A059] text-[10px] uppercase font-bold tracking-wider">Limite Disponível</p>
              <p className="text-4xl font-black text-white mt-1">R$ 25.000,00</p>
            </div>
            <button className="w-full bg-linear-to-r from-[#AA771C] to-[#D4AF37] text-black font-bold py-3 rounded-xl hover:opacity-90 transition-all"
              onClick={() => alert('Solicitação de crédito enviada para análise VIP!')}>
              Contratar Agora
            </button>
          </div>
        )}
      </div>
    </div>
  );
}