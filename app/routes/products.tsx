import { MetaFunction } from "@remix-run/node";
import { Outlet, useLocation } from "@remix-run/react";
import Footer from "~/components/Footer";
import { NavBar } from "~/components/Navbar";
import SearchBox from "~/components/Products/SearchBox";

export const meta: MetaFunction = ({ location }) => {
  const catParams = new URLSearchParams(location.search).get("cat");
  if (!catParams) return [{ title: "Catalogue" }];
  const noOfParams = catParams.split(",").length;

  if (noOfParams > 1) {
    return [{ title: `${noOfParams} Categories` }];
  }
  return [{ title: catParams }];
};

const ProductsPage = () => {
  const { pathname } = useLocation();
  const isDetail = pathname.startsWith("/products/") && pathname !== "/products";

  return (
    <div className="catalogue-shell min-h-screen">
      <NavBar isHome={false} />
      {isDetail ? (
        <Outlet />
      ) : (
        <div className="catalogue-page min-h-screen">
          <div className="catalogue-inner">
            <div className="catalogue-header">
              <div>
                <p className="eyebrow">Catalogue / Grown in Madiki</p>
                <h1>
                  Find your next
                  <br />
                  <em>living companion.</em>
                </h1>
              </div>
              <p>
                Palms, tropicals, flowering plants,
                <br />
                and landscape-ready greens.
              </p>
            </div>
            <div className="catalogue-tools">
              <SearchBox />
              <Outlet />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductsPage;
