# Skill: Criar Mensagem de Commit

## Objetivo

Esta skill é responsável por analisar alterações do projeto e gerar mensagens de commit padronizadas, claras e escritas em português.

Ela deve ser utilizada sempre que for solicitado gerar uma mensagem de commit.

## Responsabilidades

1. Analisar os arquivos alterados.
2. Identificar o objetivo principal da alteração.
3. Determinar automaticamente o tipo correto do commit.
4. Identificar o escopo mais adequado.
5. Gerar uma mensagem clara e rastreável.
6. Explicar brevemente por que o tipo foi escolhido.

## Tipos Permitidos

- `feat`
- `fix`
- `docs`
- `chore`
- `refactor`
- `test`
- `style`
- `ci`

## Definições dos Tipos

### feat

Nova funcionalidade para o usuário.

### fix

Correção de bug.

### docs

Alterações em documentação.

### chore

- Configurações do projeto
- Dependências
- Ferramentas
- Build
- Setup
- Infraestrutura

### refactor

Reorganização de código sem alterar comportamento.

### test

Criação ou manutenção de testes.

### style

- Formatação
- Prettier
- Ajustes visuais sem alteração de lógica

### ci

- GitHub Actions
- Pipelines
- Integração contínua

## Formato Obrigatório

```text
tipo(escopo): descrição clara da alteração
```

## Regras Obrigatórias

- Sempre gerar mensagens em português.
- Sempre utilizar escopo quando possível.
- Sempre descrever claramente o que foi alterado.
- Evitar descrições genéricas.
- Evitar mensagens vagas como:
  - ajuste
  - atualização
  - mudanças
  - correção
  - teste
  - final
  - commit final
  - ajustes gerais
- A mensagem deve permitir entender a alteração sem abrir o commit.

## Corpo Opcional

Quando houver muitas alterações relacionadas, sugerir também um corpo opcional:

```text
tipo(escopo): descrição principal

- alteração relevante 1
- alteração relevante 2
- alteração relevante 3
```

## Fluxo Obrigatório

Antes de sugerir o commit:

1. Analisar alterações.
2. Identificar o tipo correto.
3. Identificar o escopo correto.
4. Gerar a mensagem.
5. Explicar brevemente por que o tipo foi escolhido.

## Restrições

- Não executar commits.
- Não executar `git push`.
- Não executar `git add`.
- Não modificar arquivos do projeto.
- Apenas gerar sugestões de commit.

## Exemplos

### frontend-setup

```text
chore(frontend-setup): configura ambiente base do frontend

- cria projeto Vite com React e TypeScript
- configura Tailwind CSS e shadcn/ui
- adiciona ESLint, Prettier, React Router e Leaflet
```

### home-page

```text
feat(home-page): adiciona tela inicial de boas-vindas
```

### auth

```text
feat(auth): adiciona estrutura inicial de autenticação
```

### mapa

```text
fix(mapa): corrige carregamento das dependências de mapa
```

### documentação de specs

```text
docs(specs): documenta tarefas e critérios da feature frontend-setup
```
