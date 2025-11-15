import CommonWrapper from "../common/CommonWrapper";

const Home = () => {
  return (
    <CommonWrapper>
      <div className="h-screen bg-[#2C3E50]">
        <div className="flex flex-col items-center justify-center min-h-screen ">
          <h1 className="text-2xl font-bold mb-4">Home Page</h1>
          <h2 className="text-xl font-bold">Welcome to the Home Page </h2>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Home;
