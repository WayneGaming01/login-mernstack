import Logout from "../../utils/Logout";

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("data"));
  
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-neutral-900">
        <div className="p-5 text-white bg-neutral-800 shadow-md m-4">
          <span className="text-2xl">User information</span>
          <div className="content mt-3">
            <p>Unique ID: {user?.uniqueId ? user?.uniqueId : "null"}</p>
            <p>Username: {user?.username ? user?.username : "null"}</p>
          </div>
          <button
            onClick={Logout}
            className="justify-center items-center mt-5 w-full p-2 bg-neutral-700 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-700 transition ease-in"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
