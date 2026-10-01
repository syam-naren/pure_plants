import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProductsFound from "~/components/Products/FoundProducts";
import ProductsNotFound from "~/components/Products/ProductNotFound";
import { catalogue as localCatalogue, type CatalogueProduct } from "~/data/nursery";

export type { CatalogueProduct } from "~/data/nursery";

export function getKadiyamCatalogue(): CatalogueProduct[] {
  return localCatalogue as CatalogueProduct[];
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const sizeParams =
    url.searchParams.get("sizes")?.split(",").filter(Boolean) ?? [];
  const catParams =
    url.searchParams.get("cat")?.split(",").filter(Boolean) ?? [];
  const queryParams = url.searchParams.get("query");

  const catalogue: CatalogueProduct[] = localCatalogue as CatalogueProduct[];

  if (sizeParams.length === 0 && catParams.length === 0 && !queryParams) {
    return catalogue;
  }

  const filteredProducts = catalogue.filter((product) => {
    const categoryMatched =
      catParams.length === 0 ||
      catParams.some((category) =>
        product.category
          .toLowerCase()
          .includes(category.toLowerCase().replace(" plants", "")),
      );

    const sizeMatched =
      sizeParams.length === 0 ||
      sizeParams.some((size) => product.sizesAvailable.includes(size));
    const queryMatched =
      !queryParams ||
      product.plantName.toLocaleLowerCase().includes(queryParams as string);

    return categoryMatched && sizeMatched && queryMatched;
  });

  return filteredProducts;
};

const Product = () => {
  const filteredProducts = useLoaderData<typeof loader>() as CatalogueProduct[];
  if (filteredProducts.length === 0) return <ProductsNotFound />;

  return <ProductsFound products={filteredProducts} />;
};

export default Product;
