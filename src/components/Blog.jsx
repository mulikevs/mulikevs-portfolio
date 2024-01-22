import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import Ratings from "./Ratings";

export default function Blog({ data }) {
  const [allService, setAllService] = useState([]);
  const { sectionHeading } = data;

  useEffect(() => {
    fetch("https://sitemapdev.co.ke/blog_sitemapdev/public/blogs/latest-four")
      .then((response) => response.json())
      .then((constdata) => {
        setAllService(
          constdata.map((item) => ({
            imgUrl: `https://sitemapdev.co.ke/blog_sitemapdev/public/${item.image}`,
            icon: "bi:code-square",
            title: item.title,
            subTitle: item.category,
            ratings: Math.random() * (5 - 4) + 4,
            slug: item.slug, // Added slug property
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  }, []);

  const redirectToBlog = (slug) => {
    window.location.href = `http://sitemapdev.co.ke/blog_sitemapdev/public/blogs/${slug}`;
  };

  return (
    <section className="section" id="blog">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="row gy-5">
          {allService.map((item, index) => (
            <div className="col-sm-6 col-lg-3" key={index}>
              <div
                className="services-box"
                style={{ backgroundImage: `url(${item.imgUrl})` }}
                data-aos="fade-left"
                data-aos-duration="1200"
                data-aos-delay={index * 100}
                onClick={() => redirectToBlog(item.slug)} // Added onClick event
              >
                <div className="services-body">
                  <div className="icon">
                    <Icon icon={item.icon} />
                  </div>
                  <h5>{item.title}</h5>
                  <p>{item.subTitle}</p>
                  <div className="rating-wrap">
                    <Ratings ratings={item.ratings} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
