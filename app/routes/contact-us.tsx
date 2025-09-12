import { MetaFunction } from "@remix-run/node";
import ContactCard from "~/components/ContactCard";
import Footer from "~/components/Footer";
import { NavBar } from "~/components/Navbar";
export const meta: MetaFunction = () => [{ title: "Contact Us" }];

export default function Index() {
  return (
    <div className=" bg-black py-12 px-4 min-h-screen">
      <NavBar isHome={false}/>
      <div className="max-w-4xl mx-auto h-fit mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Get in touch with our team</h1>
        </div>
        <ContactCard />
      </div>
      <Footer />
    </div>
  );
}
