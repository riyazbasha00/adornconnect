import React from 'react';
import { Link } from 'react-router-dom';
import { imgUrl } from '../api';
import './ProductCard.css';

export default function ProductCard({ product, icon }) {
  const tags = product.tags || [];

  return (
    <Link to={`/product?sku=${encodeURIComponent(product.sku)}`} className="prod-card">
      <div className="prod-card-img">
        {product.img ? (
          <img src={imgUrl(product.img)} alt={product.name} />
        ) : (
          <i className={icon || 'fas fa-box'}></i>
        )}
        {tags.length > 0 && (
          <div className="prod-card-tags">
            {tags.includes('featured') && <span className="tag tag-featured">Featured</span>}
            {tags.includes('bestseller') && <span className="tag tag-bestseller">Best Seller</span>}
          </div>
        )}
      </div>
      <div className="prod-card-body">
        <div className="prod-card-sku">{product.sku}</div>
        <h4 className="prod-card-name">{product.name}</h4>
        {product.price && (
          <div className="prod-card-price">{product.price} {product.unit || ''}</div>
        )}
      </div>
    </Link>
  );
}
