import { Link } from "react-router-dom";

function Card({ type, from, to, name, price, days, car }) {
  return (
    <div style={{ border: "1px solid gray", padding: "15px", margin: "10px", borderRadius: "5px" }}>
      
      {type === "flight" && <p>{from} → {to} | ₹{price}</p>}
      {type === "bus" && <p>{from} → {to} | ₹{price}</p>}
      {type === "train" && <p>{from} → {to} | ₹{price}</p>}
      {type === "cab" && <p>{car} |{from} → {to} | ₹{price}</p>}
      {type === "boat" && <p>{from} → {to} | ₹{price}</p>}
      {type === "hotel" && <p>{name} | ₹{price} per night</p>}
      {type === "package" && <p>{name} | {days} days | ₹{price}</p>}

    </div>
  );
}

export default Card;