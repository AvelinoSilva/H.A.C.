/**
 * Base de usuários para simulação de autenticação (Mock)
 */
export const USUARIOS_MOCK = [
  {
    id: 'user_admin_01',
    nome: 'Administrador H.A.C.',
    email: 'admin@hacarena.com',
    senha: '123456', // Em um sistema real, senhas nunca seriam armazenadas em texto puro
    perfil: 'admin',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=admin'
  },
  {
    id: 'user_cliente_01',
    nome: 'Cliente Demo',
    email: 'cliente@hacarena.com',
    senha: '123456',
    perfil: 'cliente',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cliente'
  }
];

export default USUARIOS_MOCK;
