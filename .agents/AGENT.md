# Agente Principal

Este agente atua como ponto de entrada para as skills do projeto, centralizando as orientações de execução, validação e registro de mudanças.

## Skills Disponíveis

- `.agents/skills/create-feature.md`
- `.agents/skills/execute-task.md`
- `.agents/skills/audit-feature.md`
- `.agents/skills/create-commit.md`

## Responsabilidades

### Criação de Nova Funcionalidade

Ao criar uma nova funcionalidade, consultar:

- `.agents/skills/create-feature.md`

### Execução de Tarefa

Ao executar uma tarefa, consultar:

- `.agents/skills/execute-task.md`

### Validação de Feature

Ao validar uma feature, consultar:

- `.agents/skills/audit-feature.md`

### Mensagens de Commit

Ao gerar mensagens de commit, consultar:

- `.agents/skills/create-commit.md`

## Regras Gerais

- Sempre analisar o contexto antes de executar ações.
- Nunca executar múltiplas tarefas quando o pedido for executar apenas uma.
- Nunca marcar tarefas como concluídas sem validação.
- Sempre registrar alterações em `changes.md` quando aplicável.
- Sempre utilizar as skills apropriadas antes de responder.
