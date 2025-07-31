import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import ProductCard from '../layout/ProductCard/ProductCard';
import ProductCardSkeleton from '../layout/ProductCard/ProductCardSkeleton';
import HowToUse from "../components/HowToUse";
import ImageSection from "../components/ImageSection"
import { fetchProducts } from '../ProductDetails/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import './shops.module.css';

const Shops = () => {
  const dispatch = useDispatch();
  const { products, status, error, totalProductsCount } = useSelector((state) => state.product);

  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts({ pageSize, page }));
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    const totalPages = Math.ceil(totalProductsCount / pageSize);
    setPagesQuantity(totalPages);
  }, [pageSize, totalProductsCount]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  console.log('Products:', products);
  console.log('Status:', status);
  console.log('Error:', error);

  return (
    <MDBContainer fluid className="shop-container" style={{padding: "6rem 4rem"}}>
      <MDBRow>
        {status === 'loading' ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : status === 'succeeded' && Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <MDBCol key={product.id} md="6" lg="3" className="mb-4">
              <ProductCard product={product} />
            </MDBCol>
          ))
        ) : status === 'succeeded' && (!Array.isArray(products) || products.length === 0) ? (
          <div className="text-center">
            <h3>No products found.</h3>
          </div>
        ) : (
          <div className="text-center">
            <h3>There was an error loading the products: {error}</h3>
          </div>
        )}
      </MDBRow>
      {
      }
      <HowToUse />
      <ImageSection />
      
    </MDBContainer>
  );
};

export default Shops;
















