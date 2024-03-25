import  { useRef } from "react";
import Input from "./Input";
import Button from "./Button";

const DomainForm = () => {
  const domainNameRef = useRef(null);
  const domainTypeRef = useRef(null);
  const registrationPeriodRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const domainName = domainNameRef.current.value;
    const domainType = domainTypeRef.current.value;
    const registrationPeriod = registrationPeriodRef.current.value;

    // Here you can handle the submission logic
    console.log("Domain Name:", domainName);
    console.log("Domain Type:", domainType);
    console.log("Registration Period:", registrationPeriod);

    // Clear form fields after submission
    domainNameRef.current.value = "";
    domainTypeRef.current.value = "";
    registrationPeriodRef.current.value = "";
  };

  return (
    <div className="flex items-center justify-center w-full p-10">
      <div className="mx-auto w-full max-w-lg p-10">
        <h2 className="text-start text-2xl font-bold leading-tight">
          Add Domain
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input
            placeholder="Enter domain name"
            type="text"
            ref={domainNameRef}
            className="bg-gray-100 shadow-md rounded-lg"
            required
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 shadow-md rounded-lg"
          >
            Add Domain
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DomainForm;
