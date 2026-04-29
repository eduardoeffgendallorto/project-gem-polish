import { Layout } from "@/components/Layout";
import { ProductsGrid } from "@/components/ProductsGrid";
import { getByCategory } from "@/data/products";

const IPads = () => (
  <Layout>
    <ProductsGrid
      title="Linha iPad"
      subtitle="Potência e versatilidade para você trabalhar, estudar e criar."
      products={getByCategory("ipad")}
    />
  </Layout>
);

export default IPads;
