import { useState } from 'react';
import type { UsuarioLogado } from '../Types/auth';

interface DashboardScreenProps {
  usuario: UsuarioLogado;
  onLogout: () => void;
}

type AbaAtual = 'INICIO' | 'EXTRATO' | 'CARTAO' | 'EMPRESTIMO';
type SubTelaInicio = 'MENU' | 'PIX' | 'BOLETO';

// Interface para as transações simuladas
interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  data: string;
}

export default function DashboardScreen({ usuario, onLogout }: DashboardScreenProps) {
  const [aba, setAba] = useState<AbaAtual>('INICIO');
  const [subTela, setSubTela] = useState<SubTelaInicio>('MENU');

  // Estados dos formulários
  const [chavePix, setChavePix] = useState('');
  const [valorPix, setValorPix] = useState('');
  const [codigoBoleto, setCodigoBoleto] = useState('');
  const [valorBoleto, setValorBoleto] = useState('');

  // ESTADOS FICTÍCIOS EM MEMÓRIA (Substitui as chamadas de API para rodar na Vercel)
  const [saldoAtual, setSaldoAtual] = useState<number>(usuario.saldo);
  const [historicoExtrato, setHistoricoExtrato] = useState<Transacao[]>([
    {
      id: 1,
      descricao: 'Depósito Inicial Pró-Gold',
      valor: usuario.saldo,
      data: new Date().toLocaleDateString('pt-BR'),
    }
  ]);

  // Função fictícia que simula o débito direto nos estados do React
  const processarDebitoFicticio = (tipo: 'PIX' | 'BOLETO', descricao: string, valorTexto: string) => {
    const valor = parseFloat(valorTexto);
    
    if (isNaN(valor) || valor <= 0) {
      alert('Por favor, insira um valor válido maior que zero.');
      return;
    }
    if (valor > saldoAtual) {
      alert('Saldo Insuficiente para completar esta transação Premium.');
      return;
    }

    // 1. Atualiza o saldo localmente
    const novoSaldo = saldoAtual - valor;
    setSaldoAtual(novoSaldo);

    // 2. Cria a nova transação e joga no topo do extrato
    const novaTransacao: Transacao = {
      id: Date.now(),
      descricao: tipo === 'PIX' ? `Pix enviado para ${descricao}` : `Boleto: ${descricao}`,
      valor: valor,
      data: new Date().toLocaleDateString('pt-BR')
    };

    setHistoricoExtrato([novaTransacao, ...historicoExtrato]);

    alert(`Transação de R$ ${valor.toFixed(2)} realizada com sucesso de forma simulada!`);
    
    // Reseta os inputs e volta ao menu principal
    setChavePix('');
    setValorPix('');
    setCodigoBoleto('');
    setValorBoleto('');
    setSubTela('MENU');
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Cliente VIP */}
      <div className="border-b border-[#D4AF37]/20 pb-4 flex justify-between items-end">
        <div className="text-left">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Área Exclusiva</p>
          <h2 className="text-xl font-bold text-white tracking-tight">{usuario.titular}</h2>
          <p className="text-xs text-[#C5A059] font-medium">Conta: {usuario.numero}</p>
        </div>
        <button 
          onClick={onLogout} 
          className="text-xs bg-red-950/40 hover:bg-red-900/40 text-red-400 px-3 py-1.5 rounded-lg border border-red-900/30 transition-all font-medium"
        >
          Sair
        </button>
      </div>

      {/* Menu de Navegação por Abas */}
      <div className="flex bg-black/40 p-1 rounded-xl border border-gray-800 text-xs justify-between">
        {(['INICIO', 'EXTRATO', 'CARTAO', 'EMPRESTIMO'] as AbaAtual[]).map((item) => (
          <button
            key={item}
            onClick={() => {
              setAba(item);
              setSubTela('MENU');
            }}
            className={`flex-1 py-2 rounded-lg font-medium tracking-wider transition-all uppercase ${
              aba === item 
                ? 'bg-linear-to-r from-[#AA771C] to-[#D4AF37] text-black font-bold shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {item === 'INICIO' ? 'Início' : item === 'CARTAO' ? 'Cartão' : item === 'EMPRESTIMO' ? 'Crédito' : 'Extrato'}
          </button>
        ))}
      </div>

      {/* Conteúdo Dinâmico */}
      <div className="min-h-55 flex flex-col justify-center relative">
        
        {/* ABA 1: INÍCIO */}
        {aba === 'INICIO' && (
          <div className="animate-fadeIn space-y-4">
            
            <div className="bg-black/50 p-5 rounded-xl border border-[#D4AF37]/10 shadow-inner text-center">
              <p className="text-xs text-[#C5A059] uppercase tracking-wider font-semibold mb-1">
                Saldo Disponível Gold (Simulado)
              </p>
              <p className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-gray-200 to-[#D4AF37] tracking-wide">
                R$ {saldoAtual.toFixed(2)}
              </p>
            </div>

            {subTela === 'MENU' && (
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setSubTela('PIX')} 
                  className="bg-[#222] border border-[#D4AF37]/40 text-[#D4AF37] py-3 rounded-xl text-sm font-semibold hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  💸 Enviar Pix / QR Code
                </button>
                <button 
                  onClick={() => setSubTela('BOLETO')} 
                  className="bg-[#222] border border-[#D4AF37]/40 text-[#D4AF37] py-3 rounded-xl text-sm font-semibold hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  📄 Pagar Boleto
                </button>
              </div>
            )}

            {subTela === 'PIX' && (
              <div className="bg-[#151515] p-4 rounded-xl border border-gray-800 space-y-3 text-left">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Transferência Pix ou Copia e Cola QR Code</h3>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase mb-1">Chave Pix ou Código do QR Code</label>
                  <input 
                    type="text" 
                    value={chavePix}
                    onChange={(e) => setChavePix(e.target.value)}
                    placeholder="E-mail, CPF, Telefone ou Linha do QR Code"
                    className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase mb-1">Valor do envio (R$)</label>
                  <input 
                    type="number" 
                    value={valorPix}
                    onChange={(e) => setValorPix(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button 
                    onClick={() => setSubTela('MENU')} 
                    className="flex-1 bg-transparent border border-gray-700 text-gray-400 py-2 rounded-lg text-xs hover:bg-white/5 transition-all"
                  >
                    Voltar
                  </button>
                  <button 
                    onClick={() => processarDebitoFicticio('PIX', chavePix, valorPix)}
                    className="flex-1 bg-linear-to-r from-[#AA771C] to-[#D4AF37] text-black font-bold py-2 rounded-lg text-xs hover:opacity-90 transition-all"
                  >
                    Confirmar Pix
                  </button>
                </div>
              </div>
            )}

            {subTela === 'BOLETO' && (
              <div className="bg-[#151515] p-4 rounded-xl border border-gray-800 space-y-3 text-left">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Pagamento de Faturas e Boletos</h3>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase mb-1">Código de Barras Digitável</label>
                  <input 
                    type="text" 
                    value={codigoBoleto}
                    onChange={(e) => setCodigoBoleto(e.target.value)}
                    placeholder="00190.00009 02343.450007 90000.000005..."
                    className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase mb-1">Valor do Boleto (R$)</label>
                  <input 
                    type="number" 
                    value={valorBoleto}
                    onChange={(e) => setValorBoleto(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button 
                    onClick={() => setSubTela('MENU')} 
                    className="flex-1 bg-transparent border border-gray-700 text-gray-400 py-2 rounded-lg text-xs hover:bg-white/5 transition-all"
                  >
                    Voltar
                  </button>
                  <button 
                    onClick={() => processarDebitoFicticio('BOLETO', 'Fatura de Consumo', valorBoleto)}
                    className="flex-1 bg-linear-to-r from-[#AA771C] to-[#D4AF37] text-black font-bold py-2 rounded-lg text-xs hover:opacity-90 transition-all"
                  >
                    Pagar Código
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ABA 2: EXTRATO SIMULADO */}
        {aba === 'EXTRATO' && (
          <div className="animate-fadeIn space-y-3 text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#C5A059] mb-2">Histórico de Retiradas</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {historicoExtrato.map((item) => (
                <div key={item.id} className="bg-[#1C1C1C] border border-gray-800 p-3 rounded-xl flex justify-between items-center text-sm">
                  <div>
                    <p className="text-white font-medium">{item.descricao}</p>
                    <p className="text-xs text-gray-500">{item.data}</p>
                  </div>
                  <span className="text-red-400 font-semibold">
                    {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-black/30 p-2 text-center rounded-lg border border-gray-900 mt-2">
              <p className="text-xs text-gray-500">Saldo atual consolidado: <span className="text-[#D4AF37] font-medium">R$ {saldoAtual.toFixed(2)}</span></p>
            </div>
          </div>
        )}

        {/* ABA 3: CARTÃO */}
        {aba === 'CARTAO' && (
          <div className="animate-fadeIn flex flex-col items-center py-2 space-y-4">
            <div className="w-full max-w-85 h-48 bg-linear-to-br from-[#1F1F1F] via-[#0D0D0D] to-[#2A2315] rounded-2xl p-5 border border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative flex flex-col justify-between overflow-hidden select-none group">
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent to-[#D4AF37]/5 opacity-40 group-hover:animate-shine" />
              
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">Friends Bank</p>
                  <p className="text-[8px] text-gray-500 uppercase tracking-wider">Premium Card</p>
                </div>
                <div className="w-9 h-7 bg-linear-to-br from-[#E5C060] to-[#997526] rounded-md relative border border-black/20 shadow-inner">
                  <div className="absolute top-1/2 left-0 w-full h-px bg-black/20"></div>
                  <div className="absolute left-1/2 top-0 w-px h-full bg-black/20"></div>
                </div>
              </div>

              <div className="my-2">
                <p className="text-base font-mono tracking-widest text-transparent bg-clip-text bg-linear-to-r from-white via-gray-300 to-white drop-shadow-sm">
                  5412 •••• •••• {usuario.numero === '123-x' ? '9876' : '4321'}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <div className="text-left">
                  <p className="text-[8px] text-gray-500 uppercase tracking-tight">Titular</p>
                  <p className="text-xs font-semibold tracking-wide text-gray-200">{usuario.titular}</p>
                </div>
                <div className="flex items-center text-right flex-col">
                  <div className="flex -space-x-3.5">
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#AA771C] to-[#D4AF37] opacity-90"></div>
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#FBF5B7] to-[#B38728] opacity-80 mix-blend-screen"></div>
                  </div>
                  <span className="text-[7px] font-bold text-[#D4AF37] tracking-widest mt-0.5 uppercase">mastercard gold</span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-85 bg-black/30 border border-gray-900 rounded-xl p-3 text-center backdrop-blur-xs">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Saldo da Conta Vinculada</p>
              <p className="text-lg font-bold text-[#D4AF37] mt-0.5">
                R$ {saldoAtual.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* ABA 4: EMPRÉSTIMO */}
        {aba === 'EMPRESTIMO' && (
          <div className="animate-fadeIn space-y-4 text-left">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#C5A059]">Crédito Pessoal Pré-Aprovado</h3>
              <p className="text-xs text-gray-500 mt-0.5">Análise especial baseada no seu perfil Gold</p>
            </div>
            
            <div className="bg-[#151515] p-4 rounded-xl border border-[#D4AF37]/20 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Limite Disponível</p>
                <p className="text-xl font-bold text-white">R$ 25.000,00</p>
              </div>
              <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] font-bold px-2 py-1 rounded-full border border-[#D4AF37]/30">
                Taxa de 1.99% a.m.
              </span>
            </div>

            <button 
              onClick={() => alert('Simulação enviada para análise do Bank Friends!')} 
              className="w-full bg-linear-to-r from-[#AA771C] via-[#D4AF37] to-[#B38728] text-black font-bold py-2.5 rounded-xl text-sm shadow-md hover:opacity-90 transition-all"
            >
              Simular parcelas do Empréstimo
            </button>
          </div>
        )}

      </div>
    </div>
  );
}