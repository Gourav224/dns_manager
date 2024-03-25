import Login from "../components/Login";

export default function LoginHome() {
  return (
    <div className="bg-loginbg min-h-screen flex flex-col lg:flex-row items-center justify-around relative">
      <div className="m-10 lg:w-1/2">
        <div className="mb-4">
          <h1 className="font-semibold text-5xl md:text-2xl font-sarabun text-black mb-5">
            Welcome to
          </h1>
          <h1 className="font-semibold text-5xl md:text-2xl font-sarabun text-black">
            DNS MANAGER
          </h1>
        </div>
        <p className="font-normal text-l md:text-sm leading-8 font-sarabun text-black">
          Here, we believe that building a strong professional network begins
          with your participation. We are delighted to offer a modern and
          user-friendly service to ensure you have the best experience.
        </p>

        <p className="mt-8 font-semibold text-lg md:text-l leading-6 font-sarabun text-blue-500">
          Join Now!
        </p>
        <img
          src="/frame.svg"
          className="lg:w-full w-400"
          style={{ height: "300px" }}
          alt="frame"
        />
      </div>

      <div className="w-full lg:w-1/2">
        <Login />
      </div>
    </div>
  );
}
