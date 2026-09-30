import { MetaFunction } from "@remix-run/node";
import ContactCard from "~/components/ContactCard";
import Footer from "~/components/Footer";
import { NavBar } from "~/components/Navbar";
export const meta: MetaFunction = () => [{ title: "Contact Us" }];

export default function Index() {
  return (
    <div className="contact-page py-12 px-4 min-h-screen">
      <NavBar isHome={false}/>
      <div className="contact-inner max-w-5xl mx-auto h-fit mt-20">
        <div className="contact-heading mb-12">
          <p className="eyebrow">Visit / enquire</p>
          <h1>Let’s grow<br /><em>something good.</em></h1>
          <p>Questions about availability, bulk supply, or the right plant for your space? Our growers are here to help.</p>
        </div>
        <ContactCard />
      </div>
      <Footer />
    </div>
  );
}
