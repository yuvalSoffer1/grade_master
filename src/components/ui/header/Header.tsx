import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import OfflineHeader from "./features/OfflineHeader";
import OnlineHeader from "./features/OnlineHeader";

const Header = () => {
  const token = Cookies.get("jwt_token");
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <Link to="/" className="text-2xl font-bold">
          Grades Management
        </Link>

        <nav className=" space-x-4">
          {token ? <OnlineHeader /> : <OfflineHeader />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
