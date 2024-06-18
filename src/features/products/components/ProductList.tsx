import { Col, Divider, Empty, Row } from "antd";
import ProductItem from "./ProductItem";
import { IProduct } from "../admin/type";
import NotFound from "@/features/shared/components/not-found";

interface IProps {
  products: IProduct[];
}

const ProductList = ({ products }: IProps) => {
  return (
    <section id="product-list" className="product-list">
      <h4>อุปกรณ์ที่สามารถยืมได้</h4>

      <Divider className="my-4" />

      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col xs={24} md={8} xl={6} key={product.id}>
            <ProductItem key={product.id} product={product} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default ProductList;
