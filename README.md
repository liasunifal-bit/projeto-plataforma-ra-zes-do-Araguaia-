# Projeto Plataforma Raízes Do Araguaia

Plataforma Raizes do Araguaia, um sistema digital voltado ao fortalecimento do comercio local no municipio de Brejo Grande do Araguaia

# 🚀 Guia do Projeto

# 📦 Instalação do Projeto (Windows)

## 1. Clonar o projeto

```bash id="jlwm4g"
git clone URL_DO_PROJETO
```

---

## 2. Entrar na pasta do projeto

```bash id="0f0b6w"
cd nome-do-projeto
```

---

## 3. Entrar na pasta do frontend

```bash id="c2l87o"
cd frontend
```

---

## 4. Instalar dependências

```bash id="7bo0q6"
npm install
```

---

## 5. Rodar o projeto

```bash id="2dqqf7"
npm run dev
```

---

# 🌳 Estrutura das Branches

O projeto utiliza:

* `main` → versão estável
* `develop` → desenvolvimento principal

---

# 🔄 Fluxo Completo de Trabalho

# ✅ 1. Ir para a branch develop

Antes de começar qualquer tarefa:

```bash id="z9bqpx"
git checkout develop
```

---

# ✅ 2. Atualizar a develop

```bash id="b3q5ib"
git pull origin develop
```

Isso baixa as alterações mais recentes do projeto.

---

# ✅ 3. Criar uma nova branch

Sempre criar sua branch baseada na `develop`.

```bash id="yqthsp"
git checkout -b feature/login-usuario
```

Exemplo:

* `feature/tela-home`
* `feature/cadastro-produto`
* `feature/navbar`

---

# ✅ 4. Fazer as alterações no projeto

Agora você pode:

* criar componentes
* alterar páginas
* corrigir bugs
* estilizar telas

---

# ✅ 5. Verificar arquivos alterados

```bash id="jlwm6x"
git status
```

Arquivos vermelhos = modificados
Arquivos verdes = preparados para commit

---

# ✅ 6. Adicionar alterações

Adicionar tudo:

```bash id="c5ojbj"
git add .
```

Ou adicionar arquivo específico:

```bash id="m6fjlwm"
git add src/components/Navbar.jsx
```

---

# ✅ 7. Criar commit

```bash id="l14t1r"
git commit -m "feat: adiciona tela de login"
```

---

# ✅ 8. Enviar branch para o GitHub

```bash id="dhqg4u"
git push origin feature/login-usuario
```

---

# ✅ 9. Atualizar sua branch futuramente

Caso outras pessoas alterem a `develop`, faça:

## Voltar para develop

```bash id="o5j6wh"
git checkout develop
```

---

## Atualizar develop

```bash id="cw1f6n"
git pull origin develop
```

---

## Voltar para sua branch

```bash id="q8l4qs"
git checkout feature/login-usuario
```

---

## Atualizar sua branch com develop

```bash id="gqvcga"
git merge develop
```

---

# 📌 Comandos Git Básicos

## Ver status

```bash id="tthm6n"
git status
```

---

## Ver branches

```bash id="8p60dq"
git branch
```

---

## Trocar de branch

```bash id="d4a2db"
git checkout develop
```

---

## Buscar alterações do GitHub

```bash id="o6cddg"
git pull origin develop
```

---

## Buscar alterações sem atualizar arquivos

```bash id="jlwm85"
git fetch
```

---

# 🏷️ Padrão de Commits

# ✨ feat

Nova funcionalidade.

```bash id="yyg22n"
git commit -m "feat: adiciona página de perfil"
```

---

# 🐛 fix

Correção de bug.

```bash id="97rt1c"
git commit -m "fix: corrige erro no formulário"
```

---

# 📚 docs

Documentação.

```bash id="abjlwm"
git commit -m "docs: atualiza README"
```

---

# 🔧 chore

Configurações internas.

```bash id="jlwmx1"
git commit -m "chore: atualiza dependências"
```

---

# ♻️ refactor

Melhoria no código sem mudar funcionalidade.

```bash id="jlwmx2"
git commit -m "refactor: reorganiza componentes"
```

---

# 🧪 test

Testes.

```bash id="jlwmx3"
git commit -m "test: adiciona testes da navbar"
```

---

# 🎨 style

Mudanças visuais/formatação.

```bash id="jlwmx4"
git commit -m "style: ajusta responsividade"
```

---

# ⚙️ ci

Configuração de CI/CD.

```bash id="jlwmx5"
git commit -m "ci: adiciona workflow do github actions"
```

---

# ✅ Exemplo Completo

```bash id="jlwmx6"
git checkout develop

git pull origin develop

git checkout -b feature/navbar

git status

git add .

git commit -m "feat: adiciona navbar responsiva"

git push origin feature/navbar
```

---

# 📌 Regras do Projeto

* Nunca enviar alterações direto para `main`
* Sempre atualizar a `develop` antes de iniciar
* Sempre criar uma branch para cada tarefa
* Utilizar commits organizados
* Testar antes de enviar alterações
