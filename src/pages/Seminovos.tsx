import { Layout } from "@/components/Layout";
import { ProductsGrid } from "@/components/ProductsGrid";
import { getByCategory } from "@/data/products";

const Seminovos = () => (
  <Layout>
    <ProductsGrid
      title="iPhones Seminovos"
      subtitle="Aparelhos verificados, com excelente custo-benefício e procedência."
      products={getByCategory("seminovo")}
      filters={["iPhone 17", "iPhone 16", "iPhone 15"]}
    />
  </Layout>
);

export default Seminovos;
