import { Header } from "./_components/Header/header";
import { HomeFeed } from "./_components/Home/home-feed";

export default async function Home() {
  return (
    <>
      <Header />
      <HomeFeed />
    </>
  );
}
