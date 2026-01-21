# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## Arquitetura de produtos / admin (nova)

✅ **Objetivo:** facilitar a manutenção e a edição dos produtos sem tocar diretamente nos componentes da página principal.

- `src/data/products.ts`
  - Contém `Product` tipado e `DEFAULT_PRODUCTS` com ids iniciais.
- `src/hooks/useProducts.ts`
  - Hook central que carrega e persiste produtos em `localStorage` (`products_v1`).
  - Métodos: `addProduct`, `updateProduct`, `removeProduct`, `resetProducts`.
- `src/components/ProductCard.tsx`
  - Recebe um `product: Product` e renderiza de forma reutilizável.
- `src/components/ProductForm.tsx`
  - Formulário simples usado no admin para adicionar/editar produtos (validação básica).
- `src/pages/Admin.tsx`
  - Página oculta em `/admin` (não há link visível).
  - Login simples (usuário/senha fixos).
  - Permite adicionar, editar, remover e resetar para os produtos padrões.
- `src/lib/auth.ts`
  - Lógica mínima de autenticação (usa `localStorage`).

Admin — credenciais iniciais (mude em `src/lib/auth.ts` para mais segurança):

- usuário: `admin`
- senha: `changeme`

Como usar:

1. Rode a aplicação (`npm run dev`).
2. Acesse `http://localhost:5173/admin` e faça login.
3. Adicione, edite ou remova produtos — alterações são salvas no `localStorage` e refletidas automaticamente na página principal.

Dica: para preparar integração futura com backend, centralize chamadas de rede em um serviço no lugar de `useProducts` e substitua a persistência local pelas chamadas da API.

Melhorias recentes:

- Admin: confirmações antes de remover/resetar e toasts de sucesso/erro para feedback imediato.
- Service: `src/lib/products.ts` foi adicionado para encapsular a persistência (localStorage por enquanto) e facilitar a migração para um backend real.
