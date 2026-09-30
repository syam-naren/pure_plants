import type { LinksFunction, MetaFunction } from "@remix-run/node";
import NurseryHome from "~/components/NurseryHome";
import { NavBar } from "~/components/Navbar";
import { nursery } from "~/data/nursery";

export const meta: MetaFunction = () => [
  {
    title: nursery.name,
  },
];

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.png", type: "image/png" },
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <NavBar isHome={true} />
      <NurseryHome />
    </div>
  );
};

export default Index;
