import { MDBCardImage, MDBCol, MDBRow } from "mdb-react-ui-kit";
import React from "react";

export default function OrderProduct({ product }) {
  console.log("OrderProduct received product:", product);

  if (!product) {
    return (
      <MDBRow className="justify-content-between">
        <MDBCol md="12" className="text-center">
          <p className="text-muted mb-0">Product information not available</p>
        </MDBCol>
      </MDBRow>
    );
  }

  const getProductData = (product) => {
    if (product.product) {
      return {
        id: product.product._id || product.product.id,
        name: product.product.title || product.product.name,
        images: product.product.images || [],
        price: product.product.price,
        quantity: product.count || product.quantity || 1,
        color: product.color || 'default'
      };
    }
    
    return {
      id: product._id || product.id,
      name: product.title || product.name,
      images: product.images || [],
      price: product.price,
      quantity: product.count || product.quantity || 1,
      color: product.color || 'default'
    };
  };

  const productData = getProductData(product);
  
  const productImage = productData.images && productData.images.length > 0 
    ? productData.images[0] 
    : 'https://via.placeholder.com/150x150?text=No+Image';

  return (
    <>
      <MDBRow key={productData.id} className="justify-content-between">
        <MDBCol md="2">
          <MDBCardImage
            src={productImage}
            fluid
            alt={productData.name || 'Product'}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150x150?text=No+Image';
            }}
          />
        </MDBCol>
        <MDBCol
          md="2"
          className="text-center d-flex justify-content-center align-items-center"
        >
          <p className="text-muted mb-0">{productData.name || 'Unknown Product'}</p>
        </MDBCol>

        <MDBCol
          md="2"
          className="text-center d-flex justify-content-center align-items-center"
        >
          <p className="text-muted mb-0 small">Qty: {productData.quantity}</p>
        </MDBCol>
        <MDBCol
          md="2"
          className="text-center d-flex justify-content-center align-items-center"
        >
          <p className="text-muted mb-0 small">
            {productData.quantity} X ${productData.price || 0}
          </p>
        </MDBCol>
        {productData.color !== 'default' && (
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0 small">Color: {productData.color}</p>
          </MDBCol>
        )}
      </MDBRow>
      <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: 1 }} />
    </>
  );
}