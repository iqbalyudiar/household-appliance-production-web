import React from "react";
import ProductList from "../../features/products/components/list/ProductList";
import ProductAddEditModal from "../../features/products/components/modal/ProductAddEditModal";
import ProductHeader from "../../features/products/components/header/ProductHeader";
const ProductPage: React.FC = () => {
  return (
    <div>
      <ProductHeader />
      <ProductList />
      <ProductAddEditModal />
    </div>
  );
};

export default ProductPage;
