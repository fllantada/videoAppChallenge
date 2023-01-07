import type { NextPage } from "next";
import { Title } from "../PopularVideoApp/components/Title";
import { PopularVideos } from "../PopularVideoApp/components/PopularVideos";

const Home: NextPage = () => {
  return (
    <>
      <Title text='Popular Video App' />
      <PopularVideos />
    </>
  );
};

export default Home;
