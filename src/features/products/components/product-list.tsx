"use client";

import { Col, Divider, Row } from "antd";
import ProductItem from "./product-item";
import { IProduct } from "../admin/type";
import Search, { SearchProps } from "antd/es/input/Search";
import { useState, useMemo } from "react";

interface IProps {
  data: IProduct[];
}

const ProductList = ({ data }: IProps) => {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!query.trim()) {
      return data;
    }
    const lowercasedQuery = query.toLowerCase();
    return data.filter((product) =>
      product.name.toLowerCase().includes(lowercasedQuery)
    );
  }, [query, data]);

  const onSearch: SearchProps["onSearch"] = (value) => {
    setQuery(value.trim());
  };

  return (
    <section id="product-list" className="product-list">
      <h4>อุปกรณ์ที่สามารถยืมได้</h4>

      <div className="-search">
        <Search placeholder="ค้นหาสินค้าที่ต้องการยืม" onSearch={onSearch} />
      </div>

      {query && (
        <div className="-result">{filteredProducts.length} Products found.</div>
      )}

      <Divider className="my-4" />

      <Row gutter={[16, 16]}>
        {filteredProducts.map((product) => (
          <Col xs={24} md={8} xl={6} key={product.id}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default ProductList;
