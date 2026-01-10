import Banner from "./components/banner/banner";

function App() {
  return (
    <>
      <Banner
        title={"Northwind"}
        subtitle={"TRADERS"}
        imageUrl={"../../../public/images/north-wind.jpg"}
        buttonText={"North wind banner"}
      ></Banner>
    </>
  );
}

export default App;
