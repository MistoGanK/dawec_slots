import "../assets/style/slot-tape.css";

export default function SlotTapes({ items, spinning }) {
  // Triplicamos para la cinta
  const displayItems = [...items, ...items, ...items];

  return (
    <div className="slot-tape">
      <div className={`tape-container ${spinning ? "spinning" : ""}`}>
        {displayItems.map((item, index) => (
          <div className="slot-item" key={index}>
            <img src={item.item_img} alt={item.item_name} />
          </div>
        ))}
      </div>
    </div>
  );
}
