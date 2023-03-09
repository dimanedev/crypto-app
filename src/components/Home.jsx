import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Typography, Row, Col } from "antd";

import { Cryptocurrencies, News } from ".";
import { useGetCryptosQuery } from "../services/cryptoAPI";

import Loader from "./Loader";
import {
  GlobalOutlined,
  HistoryOutlined,
  LineChartOutlined,
  SyncOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useState } from "react";

const { Title } = Typography;

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    if (globalStats) {
      let data = [
        {
          title: "Total Cryptocurrescies",
          value: millify(globalStats.total),
          icon: <GlobalOutlined />,
          color: "#9852C3",
        },
        {
          title: "Total Exchanges",
          value: millify(globalStats.totalExchanges),
          icon: <SyncOutlined />,
          color: "#76C2B4",
        },
        {
          title: "Total Market Cap",
          value: millify(globalStats.totalMarketCap),
          icon: <LineChartOutlined />,
          color: "#6996EB",
        },
        {
          title: "Total 24h Volume",
          value: millify(globalStats.total24hVolume),
          icon: <HistoryOutlined />,
          color: "#CD7BFB",
        },
        {
          title: "Total Markets",
          value: millify(globalStats.totalMarkets),
          icon: <ShopOutlined />,
          color: "#EAB62C",
        },
      ];

      setStatsData(data);
    }
  }, [globalStats]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      <section className="section">
        <h2 className="title">Global ctypto statistics</h2>
        <Row>
          {statsData.map((item) => (
            <Col
              xs={24}
              sm={12}
              lg={12}
              span={12}
              key={item.title}
              style={{ marginBottom: 12 }}
            >
              <div className="stats">
                <div className="stats__left">
                  <span className="stats__icon" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <span className="stats__title">{item.title}: </span>
                </div>
                <span className="stats__value">{item.value}</span>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <section className="section">
        <div className="heading">
          <h2 className="title">Top 10 cryptocurrencies</h2>
          <button className="btn">
            <Link to="/cryptocurrencies">Show more...</Link>
          </button>
        </div>
        <Cryptocurrencies simplified />
      </section>

      <section className="section">
        <div className="heading">
          <h2 className="title">Related news</h2>
          <button className="btn">
            <Link to="/news">Show more...</Link>
          </button>
        </div>
        <News simplified />
      </section>
    </>
  );
};

export default Home;
