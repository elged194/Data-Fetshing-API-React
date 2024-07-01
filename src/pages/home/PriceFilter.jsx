import React from 'react';

const PriceFilter = ({priceFilter , setPriceFilter}) => {
    return (
        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginBottom: "10px",
        }}
      >
        <label htmlFor="range4">
          All Items{" "}
          <input
            type="radio"
            id="range4"
            name="priceRange"
            checked={priceFilter === "all"}
            onChange={() => setPriceFilter("all")}
          />
        </label>

        <label htmlFor="range1">
          $0 - $30{" "}
          <input
            type="radio"
            id="range1"
            name="priceRange"
            checked={priceFilter === "range1"}
            onChange={() => setPriceFilter("range1")}
          />
        </label>

        <label htmlFor="range2">
          $15 - $50{" "}
          <input
            type="radio"
            id="range2"
            name="priceRange"
            checked={priceFilter === "range2"}
            onChange={() => setPriceFilter("range2")}
          />
        </label>

        <label htmlFor="range3">
          $50 - $200{" "}
          <input
            type="radio"
            id="range3"
            name="priceRange"
            checked={priceFilter === "range3"}
            onChange={() => setPriceFilter("range3")}
          />
        </label>
      </div>
    );
}

export default PriceFilter;
