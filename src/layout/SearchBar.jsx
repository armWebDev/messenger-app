import { FaSearch } from "react-icons/fa";
import "./../styles/searchbar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search message or friend"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
      <FaSearch className="search-icon" />
    </div>
  );
}
