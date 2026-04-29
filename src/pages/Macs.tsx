import { Layout } from "@/components/Layout";
import { ProductsGrid } from "@/components/ProductsGrid";
import { getByCategory } from "@/data/products";

const Macs = () => (
  <Layout>
    <ProductsGrid
      title="MacBook Novos"
      subtitle="Potência e eficiência para você trabalhar, estudar e criar."
      products={getByCategory("mac")}
      filters={["Air", "Pro"]}
    />
  </Layout>
);

export default Macs;
