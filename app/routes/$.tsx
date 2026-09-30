import type { MetaFunction } from "@remix-run/node";
import { NavBar } from "~/components/Navbar";
import NotFoundBg from "~/components/NotFound/NotfoundBg";

export const meta: MetaFunction = () => [{ title: "Not Found" }];

const NotFound = () => (
  <div className="relative w-screen h-screen overflow-x-hidden not-found-page font-sans">
    <NavBar isHome={false} />
    <NotFoundBg />
  </div>
);

export default NotFound;
