import React, { useState } from "react";

import styles from "./styleSearch.module.css";
import { Link } from "react-router-dom";
import api from "../../../api/api";

export const Search = ({ categories }) => {
  const [selectedValue, setSelectedValue] = useState(false);
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // &category__name=sport
  const [searchTerm, setSearchTerm] = useState("");
  const [tableVisible, setTableVisible] = useState(false);
  const [resError, setResError] = useState();
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);

  // Live search with debounce
  useEffect(() => {
    if (!searchTerm.trim()) {
      setTableVisible(false);
      setDataSearch([]);
      setResError("");
      return;
    }
    setLoading(true);
    const handler = setTimeout(() => {
      api.get(`/search?q=${searchTerm.trim()}`)
        .then((res) => {
          setResError("");
          setTableVisible(true);
          setDataSearch(res.data);
        })
        .catch(() => {
          setResError("Not Found");
          setDataSearch([]);
        })
        .finally(() => setLoading(false));
    }, 400); // 400ms debounce
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Helper to get image URL (from ProductDetails.js logic)
  const CLOUDINARY_CLOUD_NAME = 'ddlhwv65t';
  const getCloudinaryUrl = (imageUrl) => {
    if (!imageUrl) return '';
    const urlParts = imageUrl.split('/');
    const imageId = urlParts[urlParts.length - 1];
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`;
  };
  const getImageUrl = (imageData) => {
    if (!imageData) return 'https://via.placeholder.com/60x60/f5f3f0/999999?text=Product';
    return imageData.url || getCloudinaryUrl(imageData.image) || 'https://via.placeholder.com/60x60/f5f3f0/999999?text=Product';
  };

  return (
    <div className="position-relative m-auto w-75 my-2">
      <form className={`${styles.search} d-flex `} role="search">
        <select
          className={`form-select form-select-sm w-25 border-end-0 rounded-0 `}
          aria-label=".form-select-lg example"
          defaultValue={selectedValue}
          onChange={handleSelectChange}
        >
          <option value="default" disabled>
            Category
          </option>
          {categories &&
            categories.map((el, i) => (
              <option key={i} value={el.name}>
                {el.name}
              </option>
            ))}
        </select>

        <input
          className={`form-control w-100 rounded-0 border-start-0`}
          type="search"
          placeholder="Search products..."
          aria-label="Search"
          value={searchTerm}
          onChange={onInputChange}
          onBlur={() => setTimeout(() => setTableVisible(false), 100)}
          onFocus={() => searchTerm && setTableVisible(true)}
        />
      </form>
      {tableVisible && (
        <div className={styles.divTable}>
          <table className={styles.table}>
            <tbody>
              {loading && (
                <tr><td>Loading...</td></tr>
              )}
              {!loading && dataSearch.length > 0 && dataSearch.map((el) => (
                <tr key={el._id}>
                  <td>
                    <Link to={`/product/${el._id}`} className={styles.a}>
                      <div className="d-flex align-items-center gap-3 p-0">
                        <img
                          className={styles.img}
                          src={el.images && el.images.length ? getImageUrl(el.images[0]) : 'https://via.placeholder.com/60x60/f5f3f0/999999?text=Product'}
                          alt={el.title || el.name || 'Product'}
                          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, background: '#f5f3f0' }}
                        />
                        <span>{el.name || el.title}</span>
                      </div>
                    </Link>
                  </td>
                </tr>
              ))}
              {!loading && resError && (
                <tr>
                  <td>
                    <div className="text-center font-weight-bold">{resError}</div>
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className={styles.tfoot}>
              <tr>
                <td className="text-center" colSpan="2">
                  See More
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
