import Landing from "./landing/Landing";
import Latest from "./product/Latest/Latest";
import LatestSale from "./product/LatestSale/ProductLasrSale";
import TodayDeals from "./product/TopRated/TodayDeals";


const Homepage = () => {
  return (
    <>
      <Landing />
      <LatestSale />
      <Latest />
      <TodayDeals />
    </>
  );
}

export default Homepage;
