import type { NextPage } from "next";
import { Title } from "../PopularVideoApp/components/Title";
import { PopularVideos } from "../PopularVideoApp/components/PopularVideos";
import { Nav } from "../PopularVideoApp/components/Nav";

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <Title text='Popular Video App' />
      <PopularVideos />
    </>
  );
};

export default Home;
