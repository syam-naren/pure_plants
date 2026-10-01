import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useSearchParams,
  useNavigation,
} from "@remix-run/react";
import ProductsFound from "~/components/Products/FoundProducts";
import ProductsNotFound from "~/components/Products/ProductNotFound";
import Pagination, { type PaginationData } from "~/components/Products/Pagination";
import { catalogue as localCatalogue, type CatalogueProduct } from "~/data/nursery";

export type { CatalogueProduct } from "~/data/nursery";

export function getKadiyamCatalogue(): CatalogueProduct[] {
  return localCatalogue as CatalogueProduct[];
}

const PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 48;

function filterCatalogue(
  catalogue: CatalogueProduct[],
  sizes: string[],
  categories: string[],
  query?: string | null,
): CatalogueProduct[] {
  if (sizes.length === 0 && categories.length === 0 && !query) {
    return catalogue;
  }

  const normalizedQuery = query?.trim().toLowerCase();

  return catalogue.filter((product) => {
    const categoryMatched =
      categories.length === 0 ||
      categories.some((category) =>
        product.category
          .toLowerCase()
          .includes(category.toLowerCase().replace(" plants", "")),
      );

    const sizeMatched =
      sizes.length === 0 ||
      sizes.some((size) => product.sizesAvailable.includes(size));

    const queryMatched =
      !normalizedQuery ||
      product.plantName.toLocaleLowerCase().includes(normalizedQuery);

    return categoryMatched && sizeMatched && queryMatched;
  });
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
  const pageParam = Number.parseInt(url.searchParams.get("page") ?? "1", 10);
  const perPageParam = Number.parseInt(
    url.searchParams.get("perPage") ?? "",
    10,
  );

  const catalogue: CatalogueProduct[] = localCatalogue as CatalogueProduct[];
  const filtered = filterCatalogue(catalogue, sizeParams, catParams, queryParams);

  const perPage = Number.isFinite(perPageParam)
    ? Math.min(Math.max(perPageParam, 1), MAX_PAGE_SIZE)
    : PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const requestedPage = Number.isFinite(pageParam) ? Math.max(1, pageParam) : 1;
  const page = Math.min(requestedPage, totalPages);

  const start = (page - 1) * perPage;
  const products = filtered.slice(start, start + perPage);

  const pagination: PaginationData = {
    page,
    perPage,
    total: filtered.length,
    totalPages,
  };

  return { products, pagination };
};

const Product = () => {
  const { products, pagination } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isNavigating =
    navigation.state === "loading" &&
    new URLSearchParams(navigation.location?.search).get("page") !==
      searchParams.get("page");

  if (products.length === 0) return <ProductsNotFound />;

  const hasActiveFilters =
    searchParams.get("cat") ||
    searchParams.get("sizes") ||
    searchParams.get("query");

  return (
    <div>
      <div className="catalogue-results-meta">
        <p className="catalogue-results-count">
          Showing{" "}
          <strong>
            {(pagination.page - 1) * pagination.perPage + 1}–
            {Math.min(pagination.page * pagination.perPage, pagination.total)}
          </strong>{" "}
          of <strong>{pagination.total}</strong> plants
        </p>
        {hasActiveFilters && (
          <Link className="catalogue-results-clear" to="/products">
            Clear filters
          </Link>
        )}
      </div>
      <div
        className={`catalogue-grid-wrapper${isNavigating ? " is-navigating" : ""}`}
        aria-busy={isNavigating || undefined}
      >
        <ProductsFound products={products} />
      </div>
      <Pagination pagination={pagination} />
    </div>
  );
};

export default Product;
