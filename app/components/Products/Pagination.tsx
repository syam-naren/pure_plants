import { Link, useSearchParams } from "@remix-run/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo } from "react";

export type PaginationData = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

/** Maximum number of numbered page buttons before collapsing into ellipses. */
const MAX_NUMBERED_BUTTONS = 7;

/**
 * Builds a compact page list around the current page, e.g.
 * [1, "…", 4, 5, 6, "…", 20]. Edges always stay pinned so users can jump
 * to the very first / last page.
 */
function buildPageList(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= MAX_NUMBERED_BUTTONS) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, totalPages, page]);
  for (const offset of [-1, 1]) {
    const neighbour = page + offset;
    if (neighbour > 1 && neighbour < totalPages) pages.add(neighbour);
  }
  if (page <= 3) {
    pages.add(2).add(3);
  }
  if (page >= totalPages - 2) {
    pages.add(totalPages - 1).add(totalPages - 2);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const list: (number | "…")[] = [];
  for (const value of sorted) {
    const previous = list[list.length - 1];
    if (typeof previous === "number" && value - previous > 1) {
      list.push("…");
    }
    list.push(value);
  }
  return list;
}

export default function Pagination({ pagination }: { pagination: PaginationData }) {
  const { page, totalPages } = pagination;
  const [searchParams] = useSearchParams();

  // Preserve filters / search / sorting; only ever swap the page param.
  const buildHref = useCallback(
    (targetPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (targetPage <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(targetPage));
      }
      const queryString = params.toString();
      return queryString ? `/products?${queryString}` : "/products";
    },
    [searchParams],
  );

  const pageList = useMemo(
    () => buildPageList(page, totalPages),
    [page, totalPages],
  );

  if (totalPages <= 1) return null;

  const firstPage = pageList.find((p): p is number => typeof p === "number");
  const lastPage = [...pageList]
    .reverse()
    .find((p): p is number => typeof p === "number");

  return (
    <nav className="catalogue-pagination" aria-label="Catalogue pages">
      {page > 1 ? (
        <Link
          className="catalogue-pagination-arrow"
          to={buildHref(page - 1)}
          rel="prev"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </Link>
      ) : (
        <span className="catalogue-pagination-arrow is-disabled" aria-hidden="true">
          <ChevronLeft size={16} />
        </span>
      )}

      <ul className="catalogue-pagination-list">
        {pageList.map((entry, index) =>
          entry === "…" ? (
            <li key={`ellipsis-${index}`} className="catalogue-pagination-ellipsis">
              …
            </li>
          ) : entry === page ? (
            <li key={entry}>
              <span className="catalogue-pagination-page is-active" aria-current="page">
                {entry}
              </span>
            </li>
          ) : (
            <li key={entry}>
              <Link
                className="catalogue-pagination-page"
                to={buildHref(entry)}
                aria-label={`Page ${entry}`}
              >
                {entry}
              </Link>
            </li>
          ),
        )}
      </ul>

      {page < totalPages ? (
        <Link
          className="catalogue-pagination-arrow"
          to={buildHref(page + 1)}
          rel="next"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="catalogue-pagination-arrow is-disabled" aria-hidden="true">
          <ChevronRight size={16} />
        </span>
      )}

      <span className="catalogue-pagination-sr-only">
        Page {page} of {totalPages}
        {firstPage !== undefined && lastPage !== undefined
          ? `, showing pages ${firstPage} to ${lastPage} in the list`
          : ""}
      </span>
    </nav>
  );
}
