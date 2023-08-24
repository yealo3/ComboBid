import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ArticleAssign from "./pages/ArticleAssign";
import BidAssign from "./pages/BidAssign";
import AuctionAssign from "./pages/AuctionAssign";
import Registration from "./pages/Registration";
import MyArticles from "./pages/MyArticles";
import MyAuctions from "./pages/MyAuctions";
import MyBids from "./pages/MyBids";
import AuctionDetails from "./pages/AuctionDetails";
import Market from "./pages/Market";
import { useEffect } from "react";
import AuthProvider from "./components/AuthContext";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/profile":
        title = "";
        metaDescription = "";
        break;
      case "/article-assign":
        title = "";
        metaDescription = "";
        break;
      case "/bid-assign":
        title = "";
        metaDescription = "";
        break;
      case "/auction-assign":
        title = "";
        metaDescription = "";
        break;
      case "/registration":
        title = "";
        metaDescription = "";
        break;
      case "/my-articles":
        title = "";
        metaDescription = "";
        break;
      case "/my-auctions":
        title = "";
        metaDescription = "";
        break;
      case "/my-bids":
        title = "";
        metaDescription = "";
        break;
      case "/desktop-3":
        title = "";
        metaDescription = "";
        break;
      case "/auction-details/${auctionId}":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/article-assign" element={<ArticleAssign />} />
        <Route path="/bid-assign" element={<BidAssign />} />
        <Route path="/auction-assign" element={<AuctionAssign />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/my-articles" element={<MyArticles />} />
        <Route path="/my-auctions" element={<MyAuctions />} />
        <Route path="/my-bids" element={<MyBids />} />
        {/* <Route path="/auction-details" element={<AuctionDetails />} /> */}
        <Route
          path="/auction-details/:auctionId"
          element={<AuctionDetails />}
        />

        <Route path="/Market" element={<Market />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
