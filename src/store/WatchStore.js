import React, { useEffect, useState } from "react";
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    minHeight: "100vh",
    background: "#f4f7fb",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "30px",
  },
  card: {
    width: "280px",
    padding: "20px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  title: {
    marginTop: "15px",
    fontSize: "20px",
  },
  description: {
    color: "#666",
    fontSize: "14px",
  },
  price: {
    color: "#2196f3",
    fontWeight: "bold",
    fontSize: "18px",
  },
  loading: {
    textAlign: "center",
    marginTop: "100px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "100px",
  },
};

/* ---------------- WATCH CARD ---------------- */
const WatchCard = ({ title, description, images }) => {
  console.log("Rendering WatchCard:", title);
  return (
    <div style={styles.card}>
      <img
        src={`http://localhost:5000/uploads/${images}`}
        alt={title}
        style={styles.image}
        onError={(e) => (e.target.src = "/placeholder.jpg")}
      />
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.description}>{description}</p>
      <p style={styles.price}>Price: $299</p>
    </div>
  );
};

/* ---------------- WATCH PROVIDER ---------------- */
const WatchProvider = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/card/all")
      .then((res) => res.json())
      .then((data) => {
        setCards(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load watches");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={styles.loading}>Loading watches...</h2>;
  if (error) return <h2 style={styles.error}>{error}</h2>;

  return (
    <div style={styles.container}>
      <h1>Watch Collection ({cards.length})</h1>

      <div style={styles.cardContainer}>
        {cards.map((card) => (
          <WatchCard
            key={card.id}
            title={card.title}
            description={card.description}
            images={card.images}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchProvider;
