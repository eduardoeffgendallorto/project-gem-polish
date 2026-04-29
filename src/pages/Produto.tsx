import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Wallet,
  Cpu,
  Camera,
  Monitor,
  BatteryCharging,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { productsById, formatBRL } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Produto = () => {
  const { id = "" } = useParams();
  const product = productsById[id];
  const { add } = useCart();

  const [cor, setCor] = useState<string>(product?.cores[0] ?? "");
  const [opcao, setOpcao] = useState<string>(product?.opcoes[0] ?? "");

  useEffect(() => {
    if (product) {
      setCor(product.cores[0]);
      setOpcao(product.opcoes[0]);
      document.title = `${product.nome} | Victor Andrade`;
    }
  }, [product]);

  const precoAtual = useMemo(() => {
    if (!product) return 0;
    return product.precosOpcoes?.[opcao] ?? product.preco;
  }, [product, opcao]);

  if (!product) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Produto não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            Não conseguimos localizar este produto em nosso catálogo.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground font-semibold"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar para a loja
          </Link>
        </div>
      </Layout>
    );
  }

  const tituloOpcoes = id.includes("watch") ? "Modelo da Pulseira" : "Armazenamento";

  const handleWhatsApp = () => {
    const msg = `Olá Victor! Tenho interesse no *${product.nome}* (${opcao} - Cor: ${cor}) que está por *${formatBRL(precoAtual)}*. Pode me tirar umas dúvidas?`;
    window.open(buildWhatsAppLink(msg), "_blank", "noopener,noreferrer");
  };

  const handleAdd = () => {
    add({
      id: product.id,
      nome: product.nome,
      cor,
      opcao,
      preco: precoAtual,
      imagem: product.img,
    });
    toast({
      title: "Adicionado ao carrinho",
      description: `${product.nome} • ${opcao} • ${cor}`,
    });
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div data-reveal className="bg-surface rounded-3xl p-8 md:p-12 shadow-card flex items-center justify-center min-h-[360px] md:min-h-[460px]">
            <img
              src={product.img}
              alt={product.imgAlt}
              className="max-h-[400px] w-auto object-contain"
            />
          </div>

          <div data-reveal data-reveal-delay="0.15">
            <span
              className={cn(
                "inline-block text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1 mb-4",
                product.seminovo
                  ? "bg-primary/10 text-primary"
                  : "bg-foreground text-background"
              )}
            >
              {product.seminovo ? "Seminovo verificado" : "Lacrado / 1 ano de garantia"}
            </span>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">{product.nome}</h1>
            <p
              className="text-muted-foreground text-base md:text-lg mb-6"
              dangerouslySetInnerHTML={{ __html: product.desc }}
            />

            {product.precoAntigo && (
              <p className="text-sm text-muted-foreground line-through">
                {formatBRL(product.precoAntigo)}
              </p>
            )}
            <p className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {formatBRL(precoAtual)}
            </p>
            <p className="flex items-center gap-2 text-sm text-success font-medium mb-6">
              <Wallet className="h-4 w-4" />
              Pagamento no PIX ou Cartão em até 10x (com acréscimo)
            </p>

            {product.seminovo && (
              <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl mb-6">
                <BatteryCharging className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Variação de Preço</p>
                  <p className="text-muted-foreground">
                    O valor exato pode variar conforme a porcentagem da Saúde da Bateria do estoque atual.
                  </p>
                </div>
              </div>
            )}

            <div className="mb-5">
              <p className="font-semibold mb-2">Cor:</p>
              <div className="flex flex-wrap gap-2">
                {product.cores.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCor(c)}
                    className={cn(
                      "px-4 py-2 rounded-xl border-2 text-sm font-medium transition",
                      cor === c
                        ? "border-primary text-primary bg-primary/5"
                        : "border-border text-foreground hover:border-foreground/40"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-7">
              <p className="font-semibold mb-2">{tituloOpcoes}:</p>
              <div className="flex flex-wrap gap-2">
                {product.opcoes.map((o) => (
                  <button
                    key={o}
                    onClick={() => setOpcao(o)}
                    className={cn(
                      "px-4 py-2 rounded-xl border-2 text-sm font-medium transition",
                      opcao === o
                        ? "border-primary text-primary bg-primary/5"
                        : "border-border text-foreground hover:border-foreground/40"
                    )}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleWhatsApp}
                className="h-13 py-4 rounded-2xl bg-success text-success-foreground font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition shadow-card"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                Falar com o Vendedor
              </button>
              <button
                onClick={handleAdd}
                className="h-12 rounded-2xl border-2 border-foreground text-foreground font-semibold inline-flex items-center justify-center gap-2 hover:bg-foreground hover:text-background transition"
              >
                <ShoppingCart className="h-5 w-5" /> Adicionar ao Carrinho
              </button>
            </div>

            <h2 className="font-bold text-lg mb-3">O que você precisa saber</h2>
            <ul className="divide-y divide-border border-y border-border">
              {[
                { icon: Monitor, t: product.tela },
                { icon: Cpu, t: product.chip },
                { icon: Camera, t: product.camera },
                { icon: ShieldCheck, t: product.seminovo ? "Aparelho seminovo verificado" : "Garantia de 1 ano" },
              ].map(({ icon: Icon, t }) => (
                <li key={t} className="flex items-center gap-4 py-4">
                  <Icon className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-sm md:text-base">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Produto;
