import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground  pt-12 pb-6 px-8 lg:px-12 ">
      <div className=" mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">CMART</h2>
          <p className="mt-3 text-sm">
            Your trusted online store. Shop quality products with fast delivery
            and secure checkout.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-teal-300 transition-all transform delay-120 cursor-pointer"> <Link to={"/"} >Home</Link> </li>
            <li className="hover:text-teal-300 transition-all transform delay-120 cursor-pointer"> <Link to={"/products"} >Products</Link> </li>
            <li className="hover:text-teal-300 transition-all transform delay-120 cursor-pointer"> <Link to={"/categories"} >Categories</Link> </li>
            <li className="hover:text-teal-300 transition-all transform delay-120 cursor-pointer"> <Link to={"/orderHistory"} >Order History</Link> </li>
            <li className="hover:text-teal-300 transition-all transform delay-120 cursor-pointer"> <Link to={"/wishlist"} >Wishlist</Link> </li>
            <li className="hover:text-teal-300 transition-all transform delay-120 cursor-pointer"> <Link to={"/contact"} >Contact Us</Link> </li>
          </ul>
        </div>

       

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-emerald-500" /> support@cmart.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-emerald-500" /> +880 1234-567890
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-emerald-500" /> Dhaka, Bangladesh
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 text-xl">
            <FaFacebookF className="cursor-pointer hover:text-teal-300 transition-all transform delay-120" />
            <FaInstagram className="cursor-pointer hover:text-teal-300 transition-all transform delay-120" />
            <FaTwitter className="cursor-pointer hover:text-teal-300 transition-all transform delay-120" />
            <FaYoutube className="cursor-pointer hover:text-teal-300 transition-all transform delay-120" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t pt-4">
        © {new Date().getFullYear()} CMART — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
