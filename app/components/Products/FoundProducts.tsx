import { Link } from "@remix-run/react";

export type ProductCard = {
  slug?: string;
  imageUrl: string;
  plantName: string;
  category?: string;
  botanicalName?: string;
  description?: string;
  sizesAvailable: string[];
};

const ProductsFound = ({
  products,
}: {
  products: ProductCard[];
}) => {
  return (
    <div className="catalogue-grid">
      {products.map((item, index) => (
        <Link
          key={index}
          to={`/products/${item.slug ?? item.plantName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
          className="catalogue-card"
        >
          <div className="catalogue-card-image relative aspect-[4/5]">
            <img
              src={item.imageUrl}
              alt={item.plantName}
              className="catalogue-card-img w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="catalogue-card-details">
            <p className="plant-category">{item.category}</p>
            <h2 className="font-semibold text-sm sm:text-base lg:text-lg leading-tight">
              {item.plantName}
            </h2>
            {item.botanicalName && (
              <p className="catalogue-botanical">{item.botanicalName}</p>
            )}
            {item.description && (
              <p className="catalogue-description">{item.description}</p>
            )}
            {item.sizesAvailable?.length !== 0 && (
              <p className="catalogue-size-note">
                Sizes Available:{" "}
                {item.sizesAvailable.map((each, index) => (
                  <span key={index} className="mr-2">
                    {each}
                  </span>
                ))}
              </p>
            )}
            <span className="catalogue-source">View details ↗</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsFound;
