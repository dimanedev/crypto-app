import React, { useState } from "react";
import { Select, Row, Col } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsAPI";
import { useGetCryptosQuery } from "../services/cryptoAPI";

import Loader from "./Loader";
import NewsCard from "./NewsCard";

const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const count = simplified ? 6 : 12;
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader />;

  return (
    <>
      {!simplified && (
        <Select
          size="large"
          style={{ marginTop: 20, marginBottom: 40 }}
          showSearch
          className="select-news"
          placeholder="Select a crypto"
          optionFilterProp="children"
          onChange={(value) => setNewsCategory(value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)
          }
          id="select-crypto"
        >
          <Option value="Cryptocurrency">Cryptocurrency</Option>
          {data?.data?.coins.map((coin) => (
            <Option key={coin.uuid} value={coin.name}>
              {coin.name}
            </Option>
          ))}
        </Select>
      )}
      <Row gutter={[32, 32]} type="flex">
        {cryptoNews?.value?.map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={`${news.url}${index}`}>
            <NewsCard
              url={news.url}
              name={news.name}
              imgSrc={news?.image?.thumbnail?.contentUrl}
              description={news.description}
              providerImgSrc={news.provider[0]?.image?.thumbnail?.contentUrl}
              providerName={news.provider[0]?.name}
              datePublished={news.datePublished}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
