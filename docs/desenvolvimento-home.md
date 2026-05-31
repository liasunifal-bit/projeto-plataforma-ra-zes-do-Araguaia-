# Documento de Desenvolvimento da Pagina Home

## Objetivo

Este documento descreve o funcionamento da Home do projeto Raizes do Araguaia, quais arquivos participam da tela inicial, como os dados chegam aos componentes e quais funcionalidades foram validadas.

## Branch de Trabalho

- Branch criada: `documento-de-desenvolvimento-da-pagina-home`
- Objetivo da branch: documentar a Home e garantir que a tela inicial compile, seja navegavel e tenha suas dependencias diretas conectadas.

## Localizacao da Home

A Home principal fica em:

- `frontend/src/pages/HomePage.tsx`

Ela nao esta isolada em uma pasta propria chamada `home`; a pagina e composta por modulos compartilhados de layout, catalogo, categorias e roteamento.

## Arquivos Relacionados

### Entrada da aplicacao

- `frontend/src/main.tsx`: monta o React no elemento `#root`.
- `frontend/src/routes/router.tsx`: registra o roteamento principal usado pela aplicacao.
- `frontend/src/routes/error/ErrorBoundary.tsx`: exibe tela de erro para falhas nas rotas.
- `frontend/src/pages/Home.tsx`: ponto de entrada lazy-loaded da rota `/`, renderizando `HomePage`.
- `frontend/src/app/providers.tsx`: ponto reservado para providers globais. No momento apenas renderiza os filhos.
- `frontend/src/app/router.tsx`: roteador alternativo preservado para as rotas completas da aplicacao.
- `frontend/src/app/routes.ts`: centraliza os caminhos usados pela aplicacao.

### Layout da Home

- `frontend/src/app/layout/AppShell.tsx`: cria a moldura mobile-first da aplicacao, limitando o conteudo a `max-w-md`, aplicando fundo, bordas e espaco para a navegacao inferior.
- `frontend/src/app/layout/Headers.tsx`: renderiza o cabecalho com logo, nome do projeto e slogan.
- `frontend/src/app/layout/BottomNav.tsx`: renderiza a navegacao inferior com links para Inicio, Mapa e Escolinha.

### Catalogo e categorias

- `frontend/src/features/catalog/components/CategoryGrid.tsx`: renderiza a grade de categorias e os atalhos para calendario e mapa.
- `frontend/src/features/catalog/components/CategoryCard.tsx`: renderiza cada card de categoria com cor, icone e link.
- `frontend/src/features/catalog/components/ProductGrid.tsx`: renderiza a grade de produtos ou o estado vazio.
- `frontend/src/features/catalog/components/ProductCard.tsx`: renderiza cada produto, imagem, selo de audio, preco, vendedor, local e botao de WhatsApp.
- `frontend/src/features/catalog/hooks/useProducts.ts`: carrega produtos na Home.
- `frontend/src/features/catalog/services/productService.ts`: fornece os produtos mockados atuais.
- `frontend/src/features/categories/index.ts`: registra as categorias disponiveis.

## Fluxo de Funcionamento

1. `main.tsx` inicializa a aplicacao React.
2. `main.tsx` entrega o controle ao `RouterProvider` usando `routes/router.tsx`.
3. `routes/router.tsx` carrega `pages/Home.tsx` de forma lazy na rota `/`.
4. `pages/Home.tsx` renderiza `HomePage`.
5. `HomePage` chama `useProducts()` para carregar os produtos.
6. `useProducts()` executa `listProducts()` ao montar a tela.
7. `listProducts()` retorna a lista mockada de produtos.
8. A Home renderiza:
   - cabecalho;
   - bloco de categorias;
   - atalhos para calendario e mapa;
   - produtos em destaque;
   - chamada para cadastrar produto;
   - navegacao inferior.

## Estrutura Visual da Home

### Cabecalho

O cabecalho mostra:

- logo local via componente `LogoRaizes`;
- titulo padrao `Raizes do Araguaia`;
- slogan `Encontre produtos frescos e artesanato da nossa gente`.

O logo foi ajustado para usar o componente `frontend/src/assets/LogoRaizes.tsx`, evitando dependencia de um arquivo publico ausente.

### Categorias

As categorias renderizadas sao:

- Comida: rota `/catalogo/comida`
- Artesanato: rota `/catalogo/artesanato`
- Servicos: rota `/catalogo/servicos`
- Peixe: rota `/catalogo/peixe`

Cada categoria define:

- `slug`;
- `label`;
- `description`;
- `iconName`;
- cores de fundo e texto.

### Atalhos

A Home tambem mostra dois cards horizontais:

- Calendario de Feiras: rota `/calendario`
- Produtores no Mapa: rota `/mapa`

### Produtos em Destaque

Os produtos sao renderizados em grade de duas colunas. Cada card exibe:

- imagem, quando houver;
- icone de fallback, quando nao houver imagem;
- selo de audio, quando `hasAudio` e `audioDuration` existirem;
- nome do vendedor;
- local;
- nome do produto;
- preco;
- unidade;
- botao de contato via WhatsApp.

Os dados atuais sao mockados em `productService.ts`.

### Acao "Ver todos"

O link `Ver todos` leva para:

- `/catalogo`

### Acao "Quero vender meus produtos"

O botao principal de chamada leva para:

- `/cadastrar-produto`

### WhatsApp

O botao de WhatsApp em cada produto:

- impede a navegacao padrao do card;
- monta uma mensagem com o nome do produto;
- abre `https://wa.me/{numero}?text={mensagem}`;
- usa o numero do produto ou o fallback `5599999999999`.

## Rotas Usadas Pela Home

As rotas documentadas em `frontend/src/app/routes.ts` sao:

- `/`
- `/catalogo`
- `/catalogo/:categorySlug`
- `/produto/:productId`
- `/mapa`
- `/calendario`
- `/escolinha`
- `/cadastrar-produto`
- `/boas-vindas`

## Testes Executados

### Build de producao

Comando:

```bash
npm.cmd run build
```

Resultado:

- Aprovado.
- TypeScript compilou.
- Vite gerou o build em `frontend/dist`.

### Lint

Comando:

```bash
npm.cmd run lint
```

Resultado:

- Aprovado.
- ESLint nao reportou erros.

### Teste funcional por HTTP

Foi iniciado o servidor Vite local temporariamente e acessadas as rotas ligadas a Home.

Rotas testadas:

- `/`: 200
- `/catalogo`: 200
- `/catalogo/comida`: 200
- `/catalogo/artesanato`: 200
- `/catalogo/servicos`: 200
- `/catalogo/peixe`: 200
- `/mapa`: 200
- `/calendario`: 200
- `/escolinha`: 200
- `/cadastrar-produto`: 200

Resultado:

- Aprovado.
- As rotas principais acessadas pela Home respondem corretamente no servidor de desenvolvimento.

## Correcoes Feitas Durante a Validacao

Foram identificadas duas quebras que impediam validar a Home por completo:

1. O roteamento da branch da Home precisava ser conciliado com a organizacao mais recente da `main`, que usa `frontend/src/routes/router.tsx` e `frontend/src/pages/Home.tsx`.
2. `frontend/src/lib/router/navigation.ts` e `frontend/src/types/navigation.ts` dependiam de `@/app/routes`, tambem ausente.

Arquivos adicionados:

- `frontend/src/app/routes.ts`
- `frontend/src/app/router.tsx`
- `frontend/src/app/providers.tsx`
- `frontend/src/pages/Home.tsx`

Tambem foi ajustado:

- `frontend/src/app/layout/Headers.tsx`, para usar `LogoRaizes` em vez de `/logo-raizes-symbol.svg`.

## Limitacoes Atuais

- Nao existe script de testes unitarios ou end-to-end no `package.json`.
- As validacoes foram feitas por build, lint, leitura de fluxo e teste HTTP das rotas.
- Algumas paginas acessadas pela Home ainda sao placeholders, como catalogo, mapa, calendario, escolinha e cadastro de produto.
- Os produtos da Home ainda usam dados mockados.
- A acao do WhatsApp foi validada por inspecao do codigo; nao foi aberto navegador externo durante o teste automatizado.

## Proximos Passos Recomendados

- Criar testes automatizados com React Testing Library para componentes da Home.
- Criar testes end-to-end com Playwright para cliques em categorias, atalhos, navegacao inferior e CTA de venda.
- Substituir os dados mockados por consulta real ao backend/Supabase quando a API estiver pronta.
- Implementar as paginas de destino que ainda estao como placeholder.
