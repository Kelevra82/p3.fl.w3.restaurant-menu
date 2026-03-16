import React from "react";

export const Card = ({ name, price, image }) => {
  return (
    <>
      <div className="card bg-dark border-0 mb-5">
        <img
          src={image}
          alt={name}
          className="card-img-top img-fluid"
        />
        <div className="card-body text-center">
          <h5 className="card-title text-warning">
            <span className="border-bottom border-warning">{name}</span>
          </h5>
          <p className="text-light fw-bold fs-6">${price}.00</p>
        </div>
      </div>
    </>
  );
};
