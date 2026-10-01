import { nursery } from "~/data/nursery";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactCard() {
  return (
    <div className="contact-card max-w-5xl mx-auto overflow-hidden flex flex-col-reverse md:flex-row m-5">
      <div className="contact-image w-full md:w-1/2">
        <img
          src="/leaves.jpg"
          alt="leaves"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="contact-details w-full md:w-1/2 p-8 flex flex-col justify-center">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <img src="https://i.ibb.co/TMbfVwx6/fine.png" alt="logo" height={250} width={250} />
          </div>
          <h1 className="text-2xl font-light tracking-wide">{nursery.name}</h1>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-light mb-2">
            Contact <em className="font-serif">Us</em>
          </h2>
          <div className="contact-rule" />
        </div>

        <div className="space-y-5 text-sm text-gray-700">
          {[
            { icon: <Phone className="w-4 h-4" />, label: nursery.phone },
            { icon: <Mail className="w-4 h-4" />, label: nursery.email },
            { icon: <MapPin className="w-4 h-4" />, label: nursery.address },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-4">
              <div className="contact-icon flex items-center justify-center">
                {item.icon}
              </div>
              <span style={{ whiteSpace: "pre-line" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
