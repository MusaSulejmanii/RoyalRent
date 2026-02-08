import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Breadcrumb, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/News.css";

const News = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageSize = 6; // change if you want more articles
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/news?page=${page}&pageSize=${pageSize}`);
      const data = await res.json();
      if (page === 1) {
        setPosts(data.articles || []);
      } else {
        setPosts((prev) => [...prev, ...(data.articles || [])]);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <Header />

      <Row justify="center" gutter={[0, 30]} style={{ paddingTop: 30 }}>
        <Col xs={22} sm={20} md={18} lg={16} xl={14}>
          <Breadcrumb
            items={[
              { title: <a onClick={() => navigate("/")}>Home</a> },
              { title: "Car News" },
            ]}
          />

          <div className="cars-header" style={{ marginTop: 20 }}>
            <h2 className="section-title">Latest Car News</h2>
          </div>
        </Col>
      </Row>

      <section className="blog-news-section">
        <div className="container">
          <div className="blog-grid">
            {loading
              ? Array.from({ length: pageSize }).map((_, i) => (
                  <div key={i} className="blog-card skeleton">
                    <div className="blog-image skeleton-image"></div>
                    <div className="blog-content">
                      <div className="skeleton-text"></div>
                      <div className="skeleton-text short"></div>
                    </div>
                  </div>
                ))
              : posts.map((post, index) => (
                  <div key={index} className="blog-card">
                    {post.urlToImage && (
                      <div className="blog-image">
                        <img src={post.urlToImage} alt={post.title} />
                      </div>
                    )}
                    <div className="blog-content">
                      <h3 className="blog-title">{post.title}</h3>
                      <p className="blog-date">
                        {formatDate(post.publishedAt)}
                      </p>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                ))}
          </div>

          {!loading && posts.length > 0 && (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="load-more-btn"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default News;
