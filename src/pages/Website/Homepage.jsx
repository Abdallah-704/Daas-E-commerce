import Landing from "./landing/Landing";
import Latest from "./product/Latest/Latest";
import LatestSale from "./product/LatestSale/ProductLasrSale";
import TodayDeals from "./product/TopRated/TodayDeals";
import ShopByCategory from "../../components/website/ShopByCategory/ShopByCategory";

const Homepage = () => {
  return (
    <>
      <Landing />
      <LatestSale />
      <ShopByCategory />
      <Latest />
      <TodayDeals />
    </>
  );
}

export default Homepage;
