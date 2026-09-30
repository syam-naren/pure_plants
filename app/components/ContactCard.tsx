import { nursery } from "~/data/nursery";
import { Mail, MapPin, Phone } from "lucide-react";

// const LeafSVG = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     xmlnsXlink="http://www.w3.org/1999/xlink"
//     version="1.1"
//     width="80"
//     height="80"
//     viewBox="0 0 256 256"
//     xmlSpace="preserve"
//   >
//     <g
//       style={{
//         stroke: "none",
//         strokeWidth: 0,
//         strokeDasharray: "none",
//         strokeLinecap: "butt",
//         strokeLinejoin: "miter",
//         strokeMiterlimit: 10,
//         fill: "none",
//         fillRule: "nonzero",
//         opacity: 1,
//       }}
//       transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
//     >
//       <path
//         d="M 48.583 71.346 C 53.476 58.49 66.358 52.164 76.846 50.5 c -15.364 7.937 -23.033 16.378 -28.463 33.555 l 3.13 0.775 c 0.874 -3.34 2.088 -6.358 3.555 -9.139 c 10.716 3.562 20.485 2.482 28.441 -6.008 c 9.884 -12.272 6.598 -25.591 2.447 -38.979 c -3.952 12.89 -25.983 10.943 -34.248 26.041 c -1.745 3.187 -3.208 6.323 -4.38 9.508"
//         style={{
//           stroke: "none",
//           strokeWidth: 1,
//           fill: "rgb(127,178,65)",
//           fillRule: "nonzero",
//           opacity: 1,
//         }}
//         transform="matrix(1 0 0 1 0 0)"
//         strokeLinecap="round"
//       />
//       <path
//         d="M 52.462 57.154 c 10.618 -13.39 30.514 -12.855 33.494 -26.45 c -4.597 9.985 -19.856 6.21 -30.311 14.746 c -6.059 5.184 -9.777 11.615 -8.318 20.804 C 48.499 63.069 50.27 60.052 52.462 57.154 z"
//         style={{
//           stroke: "none",
//           strokeWidth: 1,
//           fill: "rgb(113,156,64)",
//           fillRule: "nonzero",
//           opacity: 1,
//         }}
//         transform="matrix(1 0 0 1 0 0)"
//         strokeLinecap="round"
//       />
//       <path
//         d="M 41.417 71.346 C 36.524 58.49 23.642 52.164 13.154 50.5 c 15.364 7.937 23.033 16.378 28.463 33.555 l -3.13 0.775 c -0.874 -3.34 -2.088 -6.358 -3.555 -9.139 c -10.716 3.562 -20.485 2.482 -28.441 -6.008 C -3.393 57.41 -0.107 44.092 4.044 30.704 c 3.952 12.89 25.983 10.943 34.248 26.041 c 1.745 3.187 3.208 6.323 4.38 9.508"
//         style={{
//           stroke: "none",
//           strokeWidth: 1,
//           fill: "rgb(127,178,65)",
//           fillRule: "nonzero",
//           opacity: 1,
//         }}
//         transform="matrix(1 0 0 1 0 0)"
//         strokeLinecap="round"
//       />
//       <path
//         d="M 37.538 57.154 C 26.921 43.764 7.025 44.3 4.044 30.704 c 4.597 9.985 19.856 6.21 30.311 14.746 c 6.059 5.184 9.777 11.615 8.318 20.804 C 41.501 63.069 39.73 60.052 37.538 57.154 z"
//         style={{
//           stroke: "none",
//           strokeWidth: 1,
//           fill: "rgb(113,156,64)",
//           fillRule: "nonzero",
//           opacity: 1,
//         }}
//         transform="matrix(1 0 0 1 0 0)"
//         strokeLinecap="round"
//       />
//       <path
//         d="M 28.681 37.716 c 2.056 0.785 4.1 1.765 6.064 3.064 c 1.667 -13.907 11.671 -25.423 5.273 -35.609 c 3.72 10.344 -9.811 18.346 -11.284 31.762 C 28.71 37.195 28.698 37.455 28.681 37.716 z"
//         style={{
//           stroke: "none",
//           strokeWidth: 1,
//           fill: "rgb(113,156,64)",
//           fillRule: "nonzero",
//           opacity: 1,
//         }}
//         transform="matrix(1 0 0 1 0 0)"
//         strokeLinecap="round"
//       />
//       <path
//         d="M 40.017 5.171 c 5.193 9.996 -5.867 21.451 -6.915 34.609 c 1.292 0.731 2.559 1.573 3.782 2.572 c 0.986 0.843 1.896 1.703 2.736 2.58 c 0.825 -7.353 4.024 -14.186 7.773 -19.256 c -3.172 9.659 -4.308 17.581 -3.058 25.732 c 0.237 0.455 0.458 0.914 0.664 1.378 c 1.647 -3.733 4.31 -7.18 8.046 -10.375 c 3.957 -3.232 8.321 -4.905 12.528 -6.077 c 0.017 -0.542 0.031 -1.085 0.018 -1.645 C 64.04 19.007 52.361 11.81 40.017 5.171 z"
//         style={{
//           stroke: "none",
//           strokeWidth: 1,
//           fill: "rgb(127,178,65)",
//           fillRule: "nonzero",
//           opacity: 1,
//         }}
//         transform="matrix(1 0 0 1 0 0)"
//         strokeLinecap="round"
//       />
//     </g>
//   </svg>
// );

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
            <img src="https://i.ibb.co/TMbfVwx6/fine.png" alt="logo" height={250} width={250}/>
          </div>
          <h1 className="text-2xl font-light tracking-wide">
            {nursery.name}
          </h1>
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
