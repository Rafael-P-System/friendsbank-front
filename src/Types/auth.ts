// Define as telas disponíveis no fluxo de navegação do app
export type TelaAtual = 'LOGIN' | 'CADASTRO' | 'DASHBOARD';

// Modelo de dados do usuário autenticado vindo do banco
export interface UsuarioLogado {
  titular: string;
  numero: string;
  saldo: number;
}