import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutPrincipal from '../layout/LayoutPrincipal';

// Importação das Páginas
import Home from '../paginas/Home';
import Catalogo from '../paginas/Catalogo';
import ProdutoDetalhe from '../paginas/ProdutoDetalhe';
import Carrinho from '../paginas/Carrinho';
import Checkout from '../paginas/Checkout';
import Pedidos from '../paginas/Pedidos';
import PedidoDetalhes from '../paginas/PedidoDetalhes';
import CompraSucesso from '../paginas/CompraSucesso';
import RastreamentoPedido from '../paginas/RastreamentoPedido';
import Admin from '../paginas/Admin';
import Sobre from '../paginas/Sobre';
import Login from '../paginas/Login';
import Cadastro from '../paginas/Cadastro';
import NaoEncontrada from '../paginas/NaoEncontrada';

import ProtectedRoute from '../componentes/rotas/ProtectedRoute';
import AdminRoute from '../componentes/rotas/AdminRoute';

/**
 * Definição centralizada das rotas da aplicação
 * Usa o LayoutPrincipal como container para todas as rotas
 */
const AppRotas = () => {
  return (
    <Routes>
      <Route element={<LayoutPrincipal />}>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/produto/:id" element={<ProdutoDetalhe />} />
        <Route path="/sobre" element={<Sobre />} />
        
        {/* Autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Carrinho e Checkout */}
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/compra-sucesso/:id" element={<ProtectedRoute><CompraSucesso /></ProtectedRoute>} />
        
        {/* Área do Usuário */}
        <Route path="/pedidos" element={<ProtectedRoute><Pedidos /></ProtectedRoute>} />
        <Route path="/pedidos/:id" element={<ProtectedRoute><PedidoDetalhes /></ProtectedRoute>} />
        <Route path="/pedidos/:id/rastreamento" element={<ProtectedRoute><PedidoDetalhes /></ProtectedRoute>} />
        
        {/* Fallback de Rastreamento (caso acesse sem ID) */}
        <Route path="/rastreamento" element={<ProtectedRoute><Pedidos /></ProtectedRoute>} />
        
        {/* Área Administrativa */}
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        
        {/* 404 - Not Found */}
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
};

export default AppRotas;
