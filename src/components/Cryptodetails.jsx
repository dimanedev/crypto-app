import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  CheckOutlined,
} from "@ant-design/icons/lib/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoAPI";
import LineChart from "./LineChart";
import Loader from "./Loader";

const { Option } = Select;

const Cryptodetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  let { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  let { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  const coin = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$${coin?.price && millify(coin?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coin?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$${coin["24hVolume"] && millify(coin["24hVolume"])}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$${coin?.marketCap && millify(coin?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$${
        coin?.allTimeHigh?.price && millify(coin?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: coin?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coin?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: coin?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$${coin?.supply?.total && millify(coin?.supply?.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$${
        coin?.supply?.circulating && millify(coin?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <>
      <section className="section" style={{ marginBottom: 30 }}>
        <h2 className="title">
          {coin.name} <span>{coin.symbol}</span> Price
        </h2>
        <p className="desc">
          {coin.name} live price in US dollars View value statistics, market cap
          and supply.
        </p>
      </section>

      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select time period"
        onChange={(value) => setTimePeriod(value)}
        style={{ marginBottom: 20 }}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>

      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(coin.price)}
        coinName={coin.name}
      />

      <div className="coin-stats">
        <div className="coin-stats__col">
          <h3 className="coin-stats__title">{coin.name} statistics</h3>
          {stats.map(({ icon, title, value }, index) => (
            <div className="coin-stats__item" key={index}>
              <span className="coin-stats__item-title">
                {icon} {title}:
              </span>
              <span className="coin-stats__item-value">{value}</span>
            </div>
          ))}
        </div>

        <div className="coin-stats__col">
          <h3 className="coin-stats__title">Other statistics</h3>
          {genericStats.map(({ icon, title, value }, index) => (
            <div className="coin-stats__item" key={index}>
              <span className="coin-stats__item-title">
                <span>{icon}</span>
                {title}:
              </span>
              <span className="coin-stats__item-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <Row gutter={[48, 32]} style={{ marginTop: 40 }}>
        <Col xs={24} sm={24} lg={14} xl={12}>
          <div className="coin-article">
            <h2 className="coin-article__title">What is {coin.name}</h2>
            {HTMLReactParser(coin.description)}
          </div>
        </Col>

        <Col xs={24} sm={24} lg={10} xl={12}>
          <div className="coin-links">
            <h3 className="coin-links__title">{coin.name} related links</h3>
            {coin.links.map((link) => (
              <a
                className="coin-link"
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                <h5 className="coin-link__title">{link.type}</h5>
                <span className="coin-link__link">{link.name}</span>
              </a>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Cryptodetails;
