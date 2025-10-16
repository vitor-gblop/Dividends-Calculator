# Dividends Calculator

Uma pequena aplicação web para gerenciamento simples de fundos imobiliários (FIIs) e cálculo/visualização de dividendos. O projeto foi pensado para funcionar bem em telas pequenas, com navegação e estilos voltados a uso em celulares, e também pode ser empacotado como um aplicativo Android com ferramentas como WebView ou wrappers (ex: Cordova / Capacitor).

## Visão geral

O aplicativo permite que o usuário adicione, edite e remova investimentos em FIIs, consulte valores e calcular métricas básicas relacionadas a dividendos. A interface é leve, com foco na experiência mobile e suporte a modais para operações rápidas.

Principais pontos:

- Interface destinada para uso em dispositivos móveis (layout responsivo e controles simples).
- Simplicidade: armazenamento local (localStorage) para dados do usuário e lista de FIIs.
- Uso de chamadas à BRAPI para consultar dados de mercado (cotações, rendimento, etc.) quando necessário.

## Funcionalidades

- Listar seus FIIs e ver informações básicas.
- Adicionar / atualizar / remover investimentos por sigla, preço e quantidade.
- Calcular métricas simples de dividendos (ex.: rendimento estimado) a partir dos dados armazenados.
- Modais para inserção e remoção de ativos.
- Sistema de login simples utilizando localStorage (controle local, sem backend).

## BRAPI (destaque)

O app foi pensado para integrar com a BRAPI (Brazilian Market API) para buscar cotações e dados de FIIs em tempo real. A BRAPI fornece endpoints públicos para preços e outros metadados de ativos brasileiros, permitindo enriquecer os cálculos locais com informações mais atualizadas.

Observações sobre BRAPI:

- O uso da BRAPI aqui é planejado para melhorar a precisão das métricas (preços, dividendos, etc.).
- Verifique limites de uso e key (se necessário) antes de integrar em produção.
- Chamadas à API devem ser implementadas de forma assíncrona e com tratamento de erros (falhas de rede, dados ausentes).

## Estrutura do projeto

Pontos principais:

- `index.html` — página principal com lista e navegação.
- `src/views/` — views separadas (calculadora, logon, relatórios, etc.).
- `src/js/features/` — scripts com a lógica (lista de FIIs, calculadora, modais, login).
- `src/styles/` — estilos, focados em layout responsivo e experiência móvel.
- `src/js/env` — localização do arquivo env.js que contem a chave de api **(o arquivo env.js e a pasta env, não estão presentes neste projeto e devem ser criados para funcionamento correto da aplicação)**

## Como usar / executar (local)

1. Abra `index.html` no navegador (idealmente via um servidor local simples para evitar restrições de CORS ao consumir APIs).
2. Navegue até "Calculadora" ou "Relatórios" conforme necessário.
3. Use os botões para adicionar/atualizar/remover FIIs. Os dados são salvos no `localStorage` do navegador.

Dica: para testar chamadas à BRAPI localmente, execute um servidor simples no diretório do projeto (ex.: `npx http-server` ou similar) e abra a aplicação via http://localhost:PORT.

## Mobile / Android

O layout e a navegação foram pensados para uso em celulares. Para transformar a aplicação em um APK:

1. Use um wrapper como Capacitor ou Cordova para empacotar o conteúdo web.
2. Aponte o wrapper para o `index.html` do projeto.
3. Teste permissões de rede e CORS (alguns wrappers exigem configuração extra para chamadas externas).

Ou use o android studio (observe os recursos minimos necessarios para a execução da IDE).

Vantagens dessa abordagem:

- Implantação rápida como app sem backend.
- Permite distribuição interna ou publicação em lojas com ajuste mínimo.

## Contribuições e próximos passos

- Implementar persistência com backend (opcional) para múltiplos dispositivos e contas.
- Melhorar a autenticação (ex.: OAuth, JWT) ao invés de localStorage.
- Tratar a integração com BRAPI: cache de resultados, rate-limiting, e fallback offline.
- Ajustes de UI/UX para maior acessibilidade e performance.

## Licença

Projeto aberto — sinta-se à vontade para adaptar.
