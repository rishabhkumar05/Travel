function Filters({ setPriceFilter, setDaysFilter }) {
  return (
    <div className="filters">

      <select onChange={(e) => setPriceFilter(e.target.value)}>
        <option value="">Price</option>
        <option value="low">Under 15000</option>
        <option value="mid">15000 - 20000</option>
        <option value="high">20000+</option>
      </select>

      <select onChange={(e) => setDaysFilter(e.target.value)}>
        <option value="">Duration</option>
        <option value="short">1-3 days</option>
        <option value="medium">4-5 days</option>
      </select>

    </div>
  );
}

export default Filters;