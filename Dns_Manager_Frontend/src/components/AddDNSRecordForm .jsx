import { useRef, useState } from "react";
import Select from "./Select"; // Assuming you have the Select component
import Input from "./Input"; // Assuming you have the Input component
import Button from "./Button"; // Assuming you have the Button component

const AddDNSRecordForm = () => {
  const [recordType, setRecordType] = useState("");
  const nameRef = useRef(null);
  const valueRef = useRef(null);

  const handleAddRecord = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const value = valueRef.current.value;

    // Here you can handle adding the DNS record
    console.log("Record Type:", recordType);
    console.log("Name:", name);
    console.log("Value:", value);

    // Clear form fields after submission
    nameRef.current.value = "";
    valueRef.current.value = "";
  };

  const handleCancel = () => {
    // Here you can handle canceling the operation
    console.log("Operation canceled");
    // Optionally, you can navigate away or perform other actions here
  };

  return (
    <div className="flex items-center justify-center w-full p-10">
      <div className="mx-auto w-full max-w-lg p-10">
        <h2 className="text-start text-2xl font-bold leading-tight">
          Add DNS Record
        </h2>
        <form onSubmit={handleAddRecord} className="mt-8 space-y-5">
          <Select
            label="Record Type:"
            options={[
              "A ",
              "AAAA ",
              "CNAME ",
              "MX ",
              "NS ",
              "PTR",
              "SOA ",
              "SRV ",
              "TXT ",
              "DNSSEC",
            ]}
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            className="bg-gray-100 shadow-md rounded-lg "
            required
          />
          <Input
            placeholder="Enter name"
            type="text"
            ref={nameRef}
            className="bg-gray-100 shadow-md rounded-lg w-full"
            required
          />
          <Input
            placeholder="Enter value"
            type="text"
            ref={valueRef}
            className="bg-gray-100 shadow-md rounded-lg w-full"
            required
          />
          <div className="flex justify-between">
            <Button
              type="submit"
              className="w-1/2 bg-blue-500 shadow-md rounded-lg m-1"
            >
              Add Record
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              className="w-1/2 bg-red-500 shadow-md rounded-lg m-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDNSRecordForm;
