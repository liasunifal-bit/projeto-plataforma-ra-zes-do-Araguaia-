# Configuracao do Supabase

## Infraestrutura

A migration inicial esta em:

`supabase/migrations/202606140001_initial_backend.sql`

Ela cria as tabelas, indices, triggers, politicas RLS, dados iniciais de categorias,
buckets privados e publicacao Realtime.

## Aplicacao da migration

Aplicar a migration pelo Supabase MCP ou pela CLI vinculada ao projeto:

```bash
supabase link --project-ref SEU_PROJECT_REF
supabase db push
```

## Variaveis do frontend

Copiar os nomes de `frontend/.env.example` para `frontend/.env.local`:

```env
VITE_SUPABASE_URL=https://SEU_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
```

Nunca adicionar a `service_role` ao frontend.

O projeto local esta configurado para usar:

`https://ngxclqhopsrzvyasbtcj.supabase.co`

O cliente principal fica em `frontend/src/lib/supabase/client.ts`. O arquivo
`frontend/src/lib/supabase/supabaseClient.js` existe como ponto de entrada
compativel para modulos JavaScript e reutiliza a mesma instancia.

## Autenticacao

Em Authentication > Providers:

1. Manter Email habilitado.
2. Definir se confirmacao de e-mail sera obrigatoria.
3. Para Google, informar Client ID e Client Secret do Google Cloud.
4. Adicionar as URLs locais e de producao em Authentication > URL Configuration.

URLs locais sugeridas:

- Site URL: `http://localhost:5173`
- Redirect URL: `http://localhost:5173/boas-vindas`

## Seguranca

- Todas as tabelas publicas possuem RLS.
- Conteudo em rascunho e dados privados ficam restritos ao proprietario.
- Produtos, vendedores, eventos e licoes publicados possuem leitura publica.
- Buckets sao privados.
- Imagens de produtos publicados sao entregues por URL assinada.
- Upload, alteracao e exclusao ficam restritos a pasta iniciada pelo UID.

## Primeiro administrador

Novas contas recebem o papel `seller`. Depois de criar a conta administrativa,
promova-a manualmente no SQL Editor usando o UUID correto:

```sql
update public.profiles
set role = 'admin'
where id = 'UUID_DO_USUARIO';
```
