import React from "react";
import WarrantyList from "../../features/warranty/components/list/WarrantyList";
import WarrantyHeader from "../../features/warranty/components/header/WarrantyHeader";
import WarrantyModal from "../../features/warranty/components/modal/WarrantyModal";
const WarrantyPage: React.FC = () => {
  return (
    <div>
      <WarrantyHeader />
      <WarrantyList />
      <WarrantyModal />
    </div>
  );
};

export default WarrantyPage;
