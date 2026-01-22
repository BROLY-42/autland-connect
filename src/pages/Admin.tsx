import React, { useState, type FormEvent } from "react";
import { Shield } from "lucide-react";
import ProfileHeader from "@/components/ProfileHeader";
import Footer from "@/components/Footer";
import "@/styles/admin.css";
import useProducts from "@/hooks/useProducts";
import ProductForm from "@/components/ProductForm";
import type { Product } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import productsService from "@/lib/products";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  login as doLogin,
  logout as doLogout,
  isAuthenticated,
  getCredentials,
  setCredentials,
  validateCredentials,
} from "@/lib/auth";
import { platformColors } from "@/lib/platformColors";

const Admin = () => {
  const {
    products,
    addProduct,
    updateProduct,
    removeProduct,
    resetProducts,
    refresh,
  } = useProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [auth, setAuth] = useState<boolean>(isAuthenticated());
  const initialCreds = getCredentials();
  const [user, setUser] = useState(initialCreds.user);
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMeta, setConfirmMeta] = useState<{
    type: "none" | "reset" | "remove";
    id?: string;
    name?: string;
  }>({ type: "none" });
  const [lastRemoved, setLastRemoved] = useState<Product | null>(null);

  // admin credentials management
  const [adminUserInput, setAdminUserInput] = useState(initialCreds.user);
  const [currentAdminPass, setCurrentAdminPass] = useState("");
  const [newAdminPass, setNewAdminPass] = useState("");
  const [confirmAdminPass, setConfirmAdminPass] = useState("");
  const [showAccountManagement, setShowAccountManagement] = useState(true);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const ok = await doLogin(user, pass);
    if (ok) {
      setAuth(true);
      setMsg("");
    } else {
      setMsg("Usuário ou senha incorretos");
    }
  };

  const handleLogout = () => {
    doLogout();
    setAuth(false);
  };

  const handleUpdateAdmin = async (e: FormEvent) => {
    e.preventDefault();
    const creds = getCredentials();

    if (!currentAdminPass)
      return toast({
        title: "Erro",
        description: "Informe sua senha atual para confirmar.",
      });

    // Use the new validateCredentials function
    const isValid = await validateCredentials(adminUserInput, currentAdminPass);
    if (!isValid)
      return toast({ title: "Erro", description: "Senha atual incorreta." });

    if (!adminUserInput.trim())
      return toast({
        title: "Erro",
        description: "O usuário não pode ficar vazio.",
      });

    try {
      if (newAdminPass || confirmAdminPass) {
        if (newAdminPass !== confirmAdminPass)
          return toast({
            title: "Erro",
            description: "As senhas não coincidem.",
          });
        await setCredentials(adminUserInput.trim(), newAdminPass);
        toast({
          title: "Sucesso",
          description: "Credenciais atualizadas (senha alterada).",
        });
      } else {
        await setCredentials(adminUserInput.trim(), creds.pass);
        toast({ title: "Sucesso", description: "Usuário atualizado." });
      }

      // clear sensitive fields
      setCurrentAdminPass("");
      setNewAdminPass("");
      setConfirmAdminPass("");

      // update local login input username to reflect changes
      setUser(adminUserInput.trim());

      // force logout to require re-authentication with new credentials
      doLogout();
      setAuth(false);
      setShowAccountManagement(false); // hide account management after update
      toast({
        title: "Logout",
        description:
          "Você foi desconectado. Faça login com as novas credenciais.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar credenciais.",
      });
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-background">
        {/* Background decoration like Index */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <main className="relative container max-w-lg mx-auto px-6 py-8 space-y-10">
          <ProfileHeader />

          <div className="py-2">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <section className="fade-in">
            <div className="admin-card fade-in">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-2xl font-semibold">
                  Admin (acesso restrito)
                </h1>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                {msg && <div className="text-sm text-red-600">{msg}</div>}

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Usuário
                  </label>
                  <input
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="input"
                  />
                </div>

                <div className="flex gap-2 justify-center">
                  <button className="btn btn-primary">Entrar</button>
                </div>
              </form>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle background decoration (same as Index) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <main className="relative container max-w-lg mx-auto px-6 py-8 space-y-10">
        <ProfileHeader />

        <div className="py-2">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <section className="fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title justify-center">
              <span>Area administrativa (oculta)</span>
            </h2>
            <div className="flex gap-2 items-center">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setAdding((s) => !s);
                  setEditingId(null);
                }}
              >
                {adding ? "Fechar" : "Adicionar produto"}
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setConfirmMeta({ type: "reset" });
                  setConfirmOpen(true);
                }}
              >
                Resetar padrões
              </button>
              <button className="btn btn-outline" onClick={handleLogout}>
                Sair
              </button>
            </div>
          </div>

          {/* Account management */}
          {showAccountManagement && (
            <div className="admin-account">
              <h3 className="font-medium mb-2">Conta de administrador</h3>
              <form onSubmit={handleUpdateAdmin} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Usuário
                  </label>
                  <input
                    value={adminUserInput}
                    onChange={(e) => setAdminUserInput(e.target.value)}
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Senha atual (para confirmar)
                  </label>
                  <input
                    type="password"
                    value={currentAdminPass}
                    onChange={(e) => setCurrentAdminPass(e.target.value)}
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nova senha (opcional)
                  </label>
                  <input
                    type="password"
                    value={newAdminPass}
                    onChange={(e) => setNewAdminPass(e.target.value)}
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirmar nova senha
                  </label>
                  <input
                    type="password"
                    value={confirmAdminPass}
                    onChange={(e) => setConfirmAdminPass(e.target.value)}
                    className="input"
                  />
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    Salvar credenciais
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {adding && (
              <div className="p-4 border rounded-lg bg-background/50">
                <ProductForm
                  onCancel={() => setAdding(false)}
                  onSubmit={(data) => {
                    const p = addProduct(data);
                    setAdding(false);
                    toast({ title: "Produto adicionado", description: p.name });
                  }}
                />
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-gold text-lg font-semibold tracking-wider">
                ─── LISTA DE PRODUTOS ───
              </h3>
            </div>

            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="admin-product-card">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        {p.platform && (
                          <span
                            className={`admin-badge ${
                              platformColors[p.platform] ||
                              "bg-muted text-muted-foreground"
                            }`}
                          >
                            {p.platform}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {p.url}
                      </div>
                    </div>

                    {editingId === p.id ? (
                      <div className="mt-3">
                        <ProductForm
                          initial={p}
                          onCancel={() => setEditingId(null)}
                          onSubmit={(data) => {
                            updateProduct(p.id, data);
                            setEditingId(null);
                            toast({
                              title: "Produto atualizado",
                              description: data.name,
                            });
                          }}
                        />
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {p.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="btn" onClick={() => setEditingId(p.id)}>
                      Editar
                    </button>
                    <button
                      className="btn btn-destructive"
                      onClick={() => {
                        setConfirmMeta({
                          type: "remove",
                          id: p.id,
                          name: p.name,
                        });
                        setConfirmOpen(true);
                      }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />

        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {confirmMeta.type === "remove"
                  ? "Remover Produto"
                  : "Resetar Produtos"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {confirmMeta.type === "remove"
                  ? `Tem certeza que deseja remover "${confirmMeta.name}"? Esta ação não pode ser desfeita.`
                  : "Tem certeza que deseja resetar todos os produtos para os padrões? Todos os produtos atuais serão perdidos."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (confirmMeta.type === "remove" && confirmMeta.id) {
                    removeProduct(confirmMeta.id);
                    toast({
                      title: "Produto removido",
                      description: confirmMeta.name,
                    });
                  } else if (confirmMeta.type === "reset") {
                    resetProducts();
                    toast({
                      title: "Produtos resetados",
                      description: "Produtos restaurados aos padrões.",
                    });
                  }
                  setConfirmOpen(false);
                  setConfirmMeta({ type: "none" });
                }}
              >
                {confirmMeta.type === "remove" ? "Remover" : "Resetar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default Admin;
