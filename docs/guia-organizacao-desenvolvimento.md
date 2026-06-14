# Guia de Organizacao do Desenvolvimento

## Visao Geral

Foi criada uma organizacao de desenvolvimento para o projeto Marketplace Comunitario Raizes do Araguaia. Essa organizacao funciona como um painel de planejamento para orientar a equipe durante a construcao do restante da plataforma.

O objetivo principal e evitar que cada membro trabalhe de forma isolada ou sem saber o que depende do trabalho dos outros. A estrutura mostra as fases do projeto, a responsabilidade de cada pessoa, as branches sugeridas, os criterios de entrega e os pontos tecnicos que precisam ser respeitados.

Esse material deve ser usado como referencia antes de iniciar qualquer nova tarefa, criar branch, desenvolver uma funcionalidade ou abrir Pull Request.

## O Que Foi Criado

Foi criado um dashboard de acompanhamento com as seguintes partes:

- Visao geral do projeto.
- Sequencia das fases de desenvolvimento.
- Distribuicao das abas entre os membros.
- Detalhamento individual de cada membro.
- Planejamento de cronograma.
- Indicacao das branches GitHub.
- Checklist de revisao tecnica.
- Criterios de saida para saber quando cada fase pode ser considerada concluida.

A ideia e que esse painel seja o mapa de trabalho do projeto. Ele mostra o que deve ser feito, quem faz, quando faz e como uma entrega se conecta com a entrega dos outros membros.

## Como a Equipe Deve Utilizar

Cada membro deve seguir este fluxo:

1. Consultar a fase atual do projeto.
2. Abrir a propria aba no painel.
3. Conferir as tarefas da fase atual.
4. Criar ou atualizar a branch indicada para sua area.
5. Desenvolver apenas o que pertence ao seu modulo.
6. Testar a entrega localmente.
7. Fazer commit com mensagem clara.
8. Enviar a branch para o GitHub.
9. Abrir Pull Request para revisao.
10. Aguardar revisao e ajustes antes do merge.

Sempre que uma nova fase comecar, cada membro deve revisar sua aba e confirmar se existe dependencia de outro integrante antes de iniciar o trabalho.

## Fases de Desenvolvimento

### Fase 1 - Fundacao

Essa fase estabelece a base tecnica do projeto.

Inclui:

- Estrutura inicial do frontend.
- Configuracao base do ambiente.
- Organizacao de pastas.
- Primeiros componentes visuais.
- Definicao das rotas principais.
- Configuracao inicial de banco e dados mockados.
- Preparacao de estilos, tema e componentes compartilhados.

O objetivo dessa fase e garantir que todos tenham uma base comum para trabalhar, evitando retrabalho e conflitos desnecessarios.

### Fase 2 - Expansao

Essa fase expande as funcionalidades principais.

Inclui:

- Integracao entre modulos.
- Navegacao mais completa.
- Dados reais ou mais proximos do real.
- Funcoes de cadastro.
- Fluxos de WhatsApp.
- Mapa com marcadores.
- Catalogo com produtos.
- Escolinha com progresso.
- Recursos offline iniciais.

Nessa etapa, cada modulo deixa de ser apenas uma estrutura inicial e passa a funcionar como parte real da experiencia do usuario.

### Fase 3 - Validacao

Essa fase serve para testar se o projeto esta utilizavel.

Inclui:

- Testes em dispositivos reais.
- Ajustes de responsividade.
- Validacao de fluxos principais.
- Correcao de bugs.
- Testes de acessibilidade.
- Revisao de desempenho.
- Verificacao de funcionamento offline.

O foco aqui nao e criar muitas funcionalidades novas, mas garantir que o que ja foi criado funcione bem para usuarios reais.

### Fase 4 - Consolidacao

Essa fase prepara o projeto para entrega.

Inclui:

- Documentacao final.
- Revisao dos modulos.
- Organizacao do codigo.
- Ajustes finais de interface.
- Revisao dos Pull Requests.
- Fechamento das pendencias.
- Preparacao para apresentacao ou deploy final.

Ao final dessa fase, o projeto deve estar organizado, testado e compreensivel para qualquer membro da equipe ou avaliador.

## Divisao dos Membros

### Guilherme - Home e Calendario

Responsavel pela aba Home e pela parte de calendario.

Pastas principais que deve utilizar:

- `frontend/src/pages/HomePage.tsx`
- `frontend/src/pages/CalendarPage.tsx`
- `frontend/src/features/catalog/`
- `frontend/src/features/categories/`
- `frontend/src/features/events/`
- `frontend/src/app/layout/`
- `frontend/src/shared/components/`
- `frontend/src/shared/constants/`

Principais responsabilidades:

- Criar e manter a tela inicial.
- Organizar as categorias principais.
- Criar cards de produtos ou destaques.
- Implementar atalhos para mapa, calendario e catalogo.
- Trabalhar com os dados iniciais de eventos, categorias e produtos.
- Garantir que a Home seja simples, visual e acessivel.

Branch sugerida:

```bash
feat/guilherme-home
```

Processo de desenvolvimento:

1. Atualizar a branch principal antes de iniciar.
2. Criar a branch `feat/guilherme-home`.
3. Trabalhar primeiro na estrutura visual da Home.
4. Integrar categorias e produtos mockados.
5. Criar ou ajustar a pagina de calendario quando necessario.
6. Testar a navegacao da Home para catalogo, mapa, calendario e cadastro.
7. Rodar build e lint antes de abrir Pull Request.

### Flavio - Mapa e Geolocalizacao

Responsavel pelo modulo de mapa.

Pastas principais que deve utilizar:

- `frontend/src/pages/MapPage.tsx`
- `frontend/src/features/map/`
- `frontend/src/features/map/components/`
- `frontend/src/features/map/hooks/`
- `frontend/src/features/map/services/`
- `frontend/src/features/sellers/`
- `frontend/src/shared/constants/`

Principais responsabilidades:

- Configurar o mapa com Leaflet.
- Centralizar o mapa em Brejo Grande do Araguaia.
- Criar marcadores por categoria.
- Exibir vendedores ou produtos no mapa.
- Implementar filtros por categoria.
- Testar permissao de localizacao.
- Garantir que o mapa funcione em celular.

Branch sugerida:

```bash
feat/flavio-mapa
```

Processo de desenvolvimento:

1. Atualizar a branch principal antes de iniciar.
2. Criar a branch `feat/flavio-mapa`.
3. Configurar o mapa base em `MapPage.tsx`.
4. Criar componentes de marcador, popup e filtros.
5. Integrar os dados de vendedores/produtos quando estiverem disponiveis.
6. Testar permissao de localizacao e visualizacao mobile.
7. Rodar build e lint antes de abrir Pull Request.

### Julia - Escolinha e Licoes

Responsavel pela parte educativa da plataforma.

Pastas principais que deve utilizar:

- `frontend/src/pages/SchoolPage.tsx`
- `frontend/src/features/school/`
- `frontend/src/features/school/components/`
- `frontend/src/features/school/hooks/`
- `frontend/src/features/school/services/`
- `frontend/src/features/offline/`
- `frontend/src/shared/components/`

Principais responsabilidades:

- Criar a tela da Escolinha.
- Organizar licoes e modulos.
- Criar cards de aulas.
- Implementar progresso do usuario.
- Salvar progresso localmente quando necessario.
- Usar linguagem simples e acessivel.
- Pensar em baixa alfabetizacao e uso comunitario.

Branch sugerida:

```bash
feat/julia-escolinha
```

Processo de desenvolvimento:

1. Atualizar a branch principal antes de iniciar.
2. Criar a branch `feat/julia-escolinha`.
3. Criar a estrutura visual da Escolinha.
4. Montar cards de licoes e modulos.
5. Implementar progresso do usuario.
6. Validar se os textos estao simples e acessiveis.
7. Rodar build e lint antes de abrir Pull Request.

### Cecilia - Catalogo, Pix e Upload

Responsavel pelo catalogo de produtos e fluxos de cadastro.

Pastas principais que deve utilizar:

- `frontend/src/pages/CatalogPage.tsx`
- `frontend/src/pages/CategoryPage.tsx`
- `frontend/src/pages/ProductDetailPage.tsx`
- `frontend/src/pages/AddProductPage.tsx`
- `frontend/src/features/catalog/`
- `frontend/src/features/product-form/`
- `frontend/src/features/payments/`
- `frontend/src/lib/storage/`
- `frontend/src/shared/components/`

Principais responsabilidades:

- Criar ou evoluir a lista de produtos.
- Criar tela de detalhe do produto.
- Implementar cadastro de produto.
- Trabalhar com upload de foto e audio.
- Implementar Pix ou QR Code quando necessario.
- Garantir que o contato com vendedor funcione.
- Priorizar ProductCard, ProductGrid e ProductDetail.

Branch sugerida:

```bash
feat/cecilia-catalogo
```

Processo de desenvolvimento:

1. Atualizar a branch principal antes de iniciar.
2. Criar a branch `feat/cecilia-catalogo`.
3. Trabalhar nos componentes de catalogo e detalhe do produto.
4. Implementar o formulario de cadastro em etapas.
5. Integrar upload de imagem/audio quando a infraestrutura estiver pronta.
6. Implementar ou preparar o fluxo de Pix.
7. Rodar build e lint antes de abrir Pull Request.

### Marianne - Banco, Firebase e Seed

Responsavel pela estrutura de dados do projeto.

Pastas principais que deve utilizar:

- `frontend/src/lib/supabase/`
- `frontend/src/features/catalog/services/`
- `frontend/src/features/events/services/`
- `frontend/src/features/school/services/`
- `frontend/src/features/sellers/services/`
- `frontend/src/types/`
- `frontend/src/features/*/types.ts`
- Documentacoes em `docs/`

Principais responsabilidades:

- Configurar banco ou Firebase.
- Criar colecoes/tabelas principais.
- Criar dados iniciais de seed.
- Definir regras de seguranca.
- Criar hooks de consulta.
- Garantir que os dados possam ser usados pelos outros modulos.
- Documentar schema e variaveis de ambiente.

Branch sugerida:

```bash
feat/marianne-banco
```

Processo de desenvolvimento:

1. Atualizar a branch principal antes de iniciar.
2. Criar a branch `feat/marianne-banco`.
3. Definir o schema de dados principal.
4. Criar os tipos compartilhados.
5. Preparar dados de seed para produtos, vendedores, eventos e licoes.
6. Conectar os services dos modulos ao banco quando possivel.
7. Documentar variaveis de ambiente, regras e colecoes/tabelas.

### Henrique - Tech Lead, Infra e PWA

Responsavel por infraestrutura, padroes e revisao tecnica.

Pastas principais que deve utilizar:

- `frontend/src/routes/`
- `frontend/src/app/`
- `frontend/src/lib/pwa/`
- `frontend/src/features/offline/`
- `frontend/src/shared/`
- `frontend/vite.config.ts`
- `frontend/package.json`
- `docs/`

Principais responsabilidades:

- Coordenar estrutura tecnica.
- Revisar Pull Requests.
- Garantir padroes de codigo.
- Configurar PWA e funcionamento offline.
- Ajudar na integracao entre modulos.
- Verificar build, lint e performance.
- Manter documentacao tecnica e instrucoes de entrega.

Branch sugerida:

```bash
feat/henrique-infra
```

Processo de desenvolvimento:

1. Atualizar a branch principal antes de iniciar.
2. Criar a branch `feat/henrique-infra`.
3. Revisar arquitetura de rotas, pastas e componentes compartilhados.
4. Configurar PWA, cache e suporte offline.
5. Validar padroes de codigo e integracao entre modulos.
6. Rodar build, lint e revisar PRs da equipe.
7. Documentar decisoes tecnicas importantes.

## Mapa Rapido de Pastas Por Area

Esta e a referencia rapida para saber onde cada pessoa deve trabalhar:

- Home e calendario: `frontend/src/pages/HomePage.tsx`, `frontend/src/pages/CalendarPage.tsx`, `frontend/src/features/events/`, `frontend/src/features/catalog/`
- Mapa: `frontend/src/pages/MapPage.tsx`, `frontend/src/features/map/`, `frontend/src/features/sellers/`
- Escolinha: `frontend/src/pages/SchoolPage.tsx`, `frontend/src/features/school/`
- Catalogo, cadastro e pagamento: `frontend/src/pages/CatalogPage.tsx`, `frontend/src/pages/ProductDetailPage.tsx`, `frontend/src/pages/AddProductPage.tsx`, `frontend/src/features/catalog/`, `frontend/src/features/product-form/`, `frontend/src/features/payments/`
- Banco e dados: `frontend/src/lib/supabase/`, `frontend/src/types/`, `frontend/src/features/*/services/`
- Infra, rotas e offline: `frontend/src/routes/`, `frontend/src/app/`, `frontend/src/lib/pwa/`, `frontend/src/features/offline/`, `frontend/src/shared/`

## Processo Padrao de Desenvolvimento Para Todos

Antes de iniciar qualquer tarefa:

```bash
git checkout main
git pull origin main
```

Criar a branch da sua tarefa:

```bash
git checkout -b feat/nome-da-sua-area
```

Entrar no frontend:

```bash
cd frontend
```

Rodar o projeto:

```bash
npm run dev
```

Durante o desenvolvimento:

- Alterar apenas os arquivos da sua area principal.
- Conferir se sua mudanca nao quebra a rota `/`.
- Usar componentes compartilhados de `frontend/src/shared/` quando possivel.
- Avisar a equipe antes de alterar rotas, tipos globais, schema de banco ou componentes usados por outros membros.

Antes de enviar para o GitHub:

```bash
npm run build
npm run lint
```

Se estiver tudo certo:

```bash
git status
git add .
git commit -m "feat: descreve o que foi feito"
git push origin feat/nome-da-sua-area
```

Depois, abrir Pull Request no GitHub.

## Cuidados Para Evitar Conflitos

- Nao editar arquivos de outro membro sem combinar.
- Nao alterar `main` diretamente.
- Nao misturar muitas areas no mesmo Pull Request.
- Atualizar sua branch com a `main` antes de abrir PR.
- Se o GitHub mostrar conflito, resolver localmente e enviar novo commit.
- Arquivos de alto risco de conflito:
  - `frontend/src/main.tsx`
  - `frontend/src/routes/router.tsx`
  - `frontend/src/index.css`
  - `frontend/package.json`
  - arquivos globais dentro de `frontend/src/shared/`

## Como Trabalhar com Branches

Cada membro deve trabalhar em sua propria branch. Isso evita que uma pessoa sobrescreva o trabalho da outra.

Exemplo:

```bash
git checkout main
git pull origin main
git checkout -b feat/nome-da-funcionalidade
```

Depois de desenvolver:

```bash
git status
git add .
git commit -m "feat: descreve a funcionalidade"
git push origin feat/nome-da-funcionalidade
```

Depois disso, o membro deve abrir um Pull Request no GitHub.

## Padrao de Pull Request

Todo Pull Request deve explicar:

- O que foi feito.
- Qual modulo foi alterado.
- Quais telas foram impactadas.
- Como testar.
- Se existe alguma dependencia de outro membro.
- Se ainda ficou alguma pendencia.

Exemplo de descricao:

```md
## O que foi feito

Implementei os cards de produtos na Home.

## Como testar

1. Entrar na pasta frontend.
2. Rodar npm run dev.
3. Abrir a Home.
4. Conferir se os produtos aparecem corretamente.

## Observacoes

Ainda usa dados mockados.
```

## Criterios Para Considerar Uma Tarefa Pronta

Uma tarefa so deve ser considerada pronta quando:

- O codigo compila sem erro.
- O lint nao aponta problemas graves.
- A tela foi testada no navegador.
- A navegacao principal funciona.
- O membro documentou o que foi feito.
- O Pull Request foi aberto.
- Outro membro revisou ou validou.

## Como Um Membro Depende do Outro

Algumas partes do projeto dependem diretamente de outras:

- A Home depende das categorias e dos produtos.
- O Catalogo depende dos dados do banco.
- O Mapa depende dos dados dos vendedores e localizacao.
- A Escolinha depende dos dados das licoes.
- O PWA depende das rotas e das telas estarem organizadas.
- O cadastro de produto depende de banco, upload e catalogo.

Por isso, sempre que uma pessoa alterar estrutura de dados, rotas ou componentes compartilhados, deve avisar a equipe.

## Boas Praticas Para o Restante do Desenvolvimento

- Nao fazer tudo direto na `main`.
- Criar uma branch para cada tarefa.
- Fazer commits pequenos e claros.
- Testar antes de enviar.
- Evitar alterar arquivos de outro membro sem combinar.
- Atualizar a branch com a `main` antes de abrir Pull Request.
- Resolver conflitos localmente quando aparecerem no GitHub.
- Registrar no documento qualquer decisao importante.

## Resumo Para a Equipe

O projeto agora possui uma organizacao clara de fases, membros, branches e responsabilidades. Cada pessoa deve usar sua aba como guia principal de desenvolvimento e seguir a sequencia das fases.

Essa estrutura foi criada para facilitar a colaboracao, reduzir conflitos no GitHub e garantir que o Marketplace Comunitario seja desenvolvido de forma organizada, testavel e compreensivel para todos.
