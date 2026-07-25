import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE = 'https://adorn.ae';
const BRAND = 'ADORN';
const DEFAULT_DESC = 'Premium structured cabling, security surveillance, networking infrastructure, and access control solutions in Dubai, UAE. ADORN — your trusted supplier for commercial, industrial, and residential projects.';

export function SEO({ title, description, url, image, type = 'website', jsonLd }) {
  const fullTitle = title ? `${title} | ${BRAND}` : `${BRAND} — Structured Cabling & Security Solutions`;
  const desc = description || DEFAULT_DESC;
  const fullUrl = url ? `${SITE}${url}` : SITE;
  const ogImage = image || `${SITE}/og-default.jpg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={BRAND} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

export function HomeSEO() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND,
    url: SITE,
    logo: 'https://adorn.ae/wp-content/uploads/2026/04/Adorn_Logo_Print_RGB-01.jpg',
    description: DEFAULT_DESC,
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    contactPoint: { '@type': 'ContactPoint', telephone: '+971-4-338-1499', contactType: 'sales' },
    sameAs: ['https://wa.me/971526387275'],
  };

  return (
    <SEO
      title="Structured Cabling & Security Solutions in Dubai"
      description="ADORN — Premium structured cabling, network cables, CCTV cameras, access control, and security surveillance systems supplier in Dubai, UAE. Shop Cat6, Cat6A, fiber optic, IP cameras & more."
      url="/"
      jsonLd={jsonLd}
    />
  );
}

export function ProductsSEO({ category }) {
  const catName = category || '';
  const title = catName ? `${catName} Products` : 'All Products';
  const desc = catName
    ? `Browse ADORN ${catName} products — high-quality cables, networking and security solutions available in Dubai, UAE.`
    : 'Browse all ADORN structured cabling, security, networking, and access control products. Shop Cat6, Cat6A, fiber optic cables, CCTV cameras, NVRs, and more in Dubai, UAE.';

  return (
    <SEO
      title={title}
      description={desc}
      url={`/products${catName ? '?cat=' + encodeURIComponent(category) : ''}`}
    />
  );
}

export function ProductSEO({ product, catName }) {
  if (!product) return null;

  const desc = product.desc || `Buy ${product.name} (${product.sku}) from ADORN. Premium quality structured cabling and security product available in Dubai, UAE.`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: desc,
    sku: product.sku,
    brand: { '@type': 'Brand', name: BRAND },
    category: catName || '',
    offers: product.price ? {
      '@type': 'Offer',
      priceCurrency: 'AED',
      price: product.price.replace(/[^0-9.]/g, ''),
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: BRAND },
    } : undefined,
    image: product.img ? `https://adorn.ae/${product.img.replace(/^\//, '')}` : undefined,
  };

  return (
    <SEO
      title={`${product.name} — ${catName || product.sku}`}
      description={desc}
      url={`/product?sku=${encodeURIComponent(product.sku)}`}
      type="product"
      image={product.img ? `https://adorn.ae/${product.img.replace(/^\//, '')}` : undefined}
      jsonLd={jsonLd}
    />
  );
}
