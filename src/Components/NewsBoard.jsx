import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({category}) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        console.log("Fetching URL:", url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log("API Response Data:", data); // Log the full response data
    
        // Ensure that data.articles is defined and is an array
        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          console.error("No articles found or invalid structure:", data);
          setArticles([]); // Set an empty array if articles are not found
        }
      } catch (error) {
        console.error("Error fetching news articles:", error);
        setArticles([]); // Set an empty array in case of an error
      }
    };
    
    fetchData();
  }, [category]);

  return (
    <div>
      <h2 className="text-center">Latest <span className="badge text-bg-danger">News</span></h2>
      
      {articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
        ))
      ) : (
        <p>No news articles available.</p>
      )}
    </div>
  );
}

export default NewsBoard;
