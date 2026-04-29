import { Layout } from "@/components/Layout";
import { ProductsGrid } from "@/components/ProductsGrid";
import { getByCategory } from "@/data/products";

const IPhones = () => (
  <Layout>
    <ProductsGrid
      title="Novos & Lacrados"
      subtitle="A tecnologia mais avançada da Apple, com garantia oficial de 1 ano."
      products={getByCategory("iphone")}
      filters={["iPhone 17", "iPhone 16", "iPhone 15", "iPhone 14", "iPhone 13"]}
    />
  </Layout>
);

export default IPhones;
