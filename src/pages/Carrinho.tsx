import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/hooks/useCart";
import { formatBRL } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { toast } from "@/hooks/use-toast";

const Carrinho = () => {
  const { items, remove, total, count } = useCart();

  const handleFinalizar = () => {
    if (items.length === 0) return;
    let msg = "Olá Victor! ⚡ Quero fechar meu pedido:\n\n";
    items.forEach((i) => {
      msg += `✅ *${i.nome}*\n   ↳ ${i.opcao} | Cor: ${i.cor}\n   ↳ Valor: ${formatBRL(i.preco)}\n\n`;
    });
    msg += `*Total do Pedido: ${formatBRL(total)}*\n-----------------------------\nAguardo as instruções para o pagamento!`;
    window.open(buildWhatsAppLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      <div className="container py-10 md:py-14">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Continuar comprando
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
          Revise seu pedido.
        </h1>

        {count === 0 ? (
          <div className="bg-surface rounded-3xl p-12 md:p-20 text-center shadow-card">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl font-medium mb-2">Seu carrinho está vazio.</p>
            <p className="text-muted-foreground mb-6">Que tal começar pelos lançamentos?</p>
            <Link
              to="/iphones"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition"
            >
              Ver iPhones
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-surface rounded-3xl shadow-card p-2 md:p-4">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 border-b border-border last:border-0"
                >
                  <div className="h-20 w-20 rounded-2xl bg-surface-muted flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={item.imagem} alt={item.nome} className="h-16 w-auto object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{item.nome}</h3>
                    <p className="text-xs text-muted-foreground">
                      {item.opcao} • {item.cor}
                    </p>
                    <p className="font-bold mt-1">{formatBRL(item.preco)}</p>
                  </div>
                  <button
                    onClick={() => {
                      remove(idx);
                      toast({ title: "Item removido", description: item.nome });
                    }}
                    aria-label="Remover item"
                    className="h-10 w-10 inline-flex items-center justify-center rounded-full text-destructive hover:bg-destructive/10 transition"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <aside className="bg-surface rounded-3xl shadow-card p-6 h-fit lg:sticky lg:top-24">
              <h2 className="font-bold text-lg mb-4">Resumo</h2>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Itens</span>
                <span>{count}</span>
              </div>
              <hr className="my-4 border-border" />
              <div className="flex justify-between items-baseline mb-6">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold">{formatBRL(total)}</span>
              </div>
              <button
                onClick={handleFinalizar}
                className="w-full h-12 rounded-2xl bg-success text-success-foreground font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition shadow-card"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                Fechar pedido no WhatsApp
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Você será redirecionado para o WhatsApp de Victor Andrade.
              </p>
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Carrinho;
