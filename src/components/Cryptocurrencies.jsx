import React, { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import { Link } from "react-router-dom";
import { Row, Col, Input } from "antd";

import CryptoCard from "./CryptoCard";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-crypto-input"
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <CryptoCard
                name={currency.name}
                rank={currency.rank}
                iconUrl={currency.iconUrl}
                marketCap={currency.marketCap}
                price={currency.price}
                change={currency.change}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
