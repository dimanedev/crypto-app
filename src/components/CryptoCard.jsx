import React from "react";
import millify from "millify";

const CryptoCard = ({ rank, name, iconUrl, marketCap, price, change }) => {
  return (
    <div className="crypto-card">
      <div className="crypto-card__heading">
        <h3 className="crypto-card__title">
          <span>{rank}.</span>
          {name}
        </h3>
        <div className="crypto-card__icon-container">
          <img
            src={iconUrl}
            alt={`${name} icon`}
            className="crypto-card__icon"
          />
        </div>
      </div>
      <div className="crypto-card__stats">
        <span className="crypto-card__key">Market cap:</span>
        <span className="crypto-card__value">{millify(marketCap)}</span>
      </div>
      <div className="crypto-card__stats">
        <span className="crypto-card__key">Price:</span>
        <span className="crypto-card__value">{millify(price)}</span>
      </div>
      <div className="crypto-card__stats">
        <span className="crypto-card__key">Change: </span>
        <span className="crypto-card__value">{change}</span>
      </div>
    </div>
  );
};

export default CryptoCard;
