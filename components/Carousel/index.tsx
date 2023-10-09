"use client";

import Slider from "react-slick";
import moment from "moment";
import { Container, AddRemoveList } from "../";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import { articlesTypes } from "../../helpers/types";

interface propTypes {
  articles: articlesTypes[];
  articlesInStorage: any;
  setArticlesInStorage: (item: any) => void;
  handleSelectedArticle: (item: articlesTypes) => void;
}

const Carousel = ({
  articles,
  articlesInStorage,
  setArticlesInStorage,
  handleSelectedArticle,
}: propTypes) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Number(articles.length) > 2 ? 3 : Number(articles.length),
    slidesToScroll: Number(articles.length) > 2 ? 3 : Number(articles.length),
    initialSlide: 0,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            Number(articles.length) > 1 ? 2 : Number(articles.length),
          slidesToScroll:
            Number(articles.length) > 1 ? 2 : Number(articles.length),

          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slide-container">
      <Container>
        <Slider autoplay className="slide" {...settings}>
          {articles.map((article: any, index) => (
            <div key={index} className="slide-item-container">
              <div onClick={() => handleSelectedArticle(article)}>
                <img src={article.urlToImage} alt="" className="slide-img" />
                <p className="title">
                  {article?.title?.length > 20
                    ? article?.title?.slice(0, 20) + "..."
                    : article?.title}
                </p>
                <p className="description">
                  {article?.description?.length > 60
                    ? article?.description?.slice(0, 60) + "..."
                    : article?.description}
                </p>
              </div>
              <AddRemoveList
                hour={moment(article.publishedAt).format("hh:mm")}
                articleSourceId={article.source.id + "-" + article.id}
                articlesInStorage={articlesInStorage}
                setArticlesInStorage={setArticlesInStorage}
              />
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default Carousel;
