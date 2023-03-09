import React from "react";
import demoImage from "../images/demo-image.webp";
import moment from "moment";

const NewsCard = ({
  url,
  name,
  imgSrc,
  description,
  providerImgSrc,
  providerName,
  datePublished,
}) => {
  return (
    <a className="news-card" href={url} target="_blank" rel="noreferrer">
      <div className="news-card__img-container">
        <img
          src={imgSrc || demoImage}
          alt="news image"
          style={{ height: imgSrc || "100%", minWidth: imgSrc || "auto" }}
        />
      </div>
      <h3 className="news-card__title">{name}</h3>
      <p className="news-card__desc">
        {description > 100 ? `${description.substring(100)}` : description}
      </p>
      <div className="news-card__bottom">
        <div className="news-card__provider">
          <span className="news-card__provider-name">{providerName}</span>
          <div className="news-card__provider-image-container">
            <img
              src={providerImgSrc || demoImage}
              alt="news provider logo"
              className="news-card__provider-image"
            />
          </div>
        </div>
        <span className="news-card__date">
          {moment(datePublished).startOf("ss").fromNow()}
        </span>
      </div>
    </a>
  );
};

export default NewsCard;
