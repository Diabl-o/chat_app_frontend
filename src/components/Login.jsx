const Login = () => {
  return (
    <div className="login">
      <div className=" bg-slate-800 border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <form action="/login" method="post">
          <div className="relative my-4">
            <input
              type="email"
              className=" block w-72 py-2.5 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
            ></input>
            <label
              htmlFor="email"
              className="absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="password"
              className=" block w-72 py-2.5 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
            ></input>
            <label
              htmlFor=""
              className="absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
