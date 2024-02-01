import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  function handelSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handelSubmit}>
      <input
        placeholder="inter id #"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-24 rounded-full bg-yellow-50 px-4 py-1 text-sm
         focus:outline-none focus:ring focus:ring-yellow-500 
         focus:ring-opacity-50 sm:w-64 sm:focus:w-72 "
      />
    </form>
  );
}

export default SearchOrder;
