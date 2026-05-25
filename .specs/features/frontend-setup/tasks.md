# Projeto Base

- [x] Criar projeto Vite com React e TypeScript

## Critérios de Aceitação

- Projeto Vite criado com o template React + TypeScript
- Estrutura inicial do frontend criada no diretório definido para a aplicação
- React disponível e carregando corretamente no projeto
- TypeScript configurado e reconhecido pelo build
- Aplicação base executando sem erros

- [x] Configurar aliases de importação

## Descrição

Configurar aliases para permitir imports absolutos a partir da pasta de código-fonte do frontend, reduzindo o uso de caminhos relativos longos.

## Alias Esperado

- `@`

## Critérios de Aceitação

- Alias `@` configurado para apontar para a pasta de código-fonte do frontend
- Imports absolutos utilizando `@` funcionando corretamente
- TypeScript reconhecendo o alias sem erros de resolução
- Vite reconhecendo o alias sem erros de compilação

# Interface

- [x] Instalar Tailwind CSS

## Critérios de Aceitação

- Tailwind CSS instalado como dependência do frontend
- Arquivos de configuração do Tailwind criados e conectados ao projeto
- Arquivo CSS principal preparado para carregar as diretivas do Tailwind
- Classes utilitárias do Tailwind funcionando na aplicação

- [x] Instalar e configurar shadcn/ui

## Configurações Esperadas

- TypeScript habilitado
- Tailwind habilitado
- CSS Variables habilitado
- Default Theme habilitado

## Critérios de Aceitação

- shadcn/ui inicializado corretamente no frontend
- Configuração do shadcn/ui compatível com TypeScript
- Integração com Tailwind CSS funcionando
- Estrutura base para componentes preparada sem criação de componentes de aplicação

# Navegação

- [x] Instalar React Router

## Dependências Esperadas

- react-router-dom

## Critérios de Aceitação

- Dependência `react-router-dom` instalada no frontend
- Pacote disponível para configuração futura de rotas
- Projeto compilando sem erros após a instalação

# Mapas

- [x] Instalar Leaflet

## Dependências Esperadas

- leaflet
- react-leaflet
- @types/leaflet

## Critérios de Aceitação

- Dependências `leaflet`, `react-leaflet` e `@types/leaflet` instaladas no frontend
- Tipagens do Leaflet disponíveis para uso com TypeScript
- Pacotes disponíveis para configuração futura de mapas
- Projeto sem erros de tipagem TypeScript relacionados às dependências de mapas

# Qualidade de Código

- [x] Instalar ESLint

## Critérios de Aceitação

- ESLint instalado e configurado no frontend
- Configuração compatível com React e TypeScript
- Script ou comando de verificação de código disponível
- Verificação de código executando sem erros de configuração

- [x] Instalar Prettier

## Dependências Esperadas

- prettier
- eslint-config-prettier

## Critérios de Aceitação

- Dependências `prettier` e `eslint-config-prettier` instaladas no frontend
- Prettier configurado para padronizar a formatação do código
- Integração com ESLint ajustada para evitar conflitos de regras de formatação
- Formatação disponível por script, comando ou configuração documentada

# Validação Final

- [x] Executar build do projeto

## Critérios de Aceitação

- Build do frontend executado com sucesso
- TypeScript compilando sem erros
- Vite gerando os arquivos finais sem falhas
- Nenhum erro bloqueante reportado durante o build

- [x] Validar ambiente configurado

## Critérios de Aceitação

- React funcionando no projeto frontend
- TypeScript configurado e validado
- Alias `@` funcionando para imports absolutos
- Tailwind CSS configurado e funcional
- shadcn/ui configurado e integrado ao Tailwind CSS
- React Router instalado por meio de `react-router-dom`
- Leaflet instalado com `leaflet`, `react-leaflet` e `@types/leaflet`
- ESLint configurado e funcionando
- Prettier configurado e funcionando sem conflitos com ESLint
