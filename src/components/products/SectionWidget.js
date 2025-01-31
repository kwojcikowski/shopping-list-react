import React from "react";
import PropTypes from "prop-types";
import ProductWidget from "./ProductWidget";

const SectionWidget = ({ section, productsItems }) => {
  if (productsItems.length === 0) return <></>;
  return (
    <>
      <tr key={section._links.self.href}>
        <td key={section._links.self.href}>
          <h3 key={section._links.self.href}>{section.name}</h3>
        </td>
        <td>Jednostka</td>
        <td>Ilość</td>
        <td>Do koszyka</td>
      </tr>
      {productsItems.map((product, index) => {
        return (
          <ProductWidget
            key={product._links.self.href}
            product={product}
            index={index}
          />
        );
      })}
    </>
  );
};

SectionWidget.propTypes = {
  section: PropTypes.object.isRequired,
  productsItems: PropTypes.array.isRequired,
};

export default SectionWidget;
