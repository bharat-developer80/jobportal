import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Navsari", "Surat"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "10-13lakh", "1lakh to 5lakh", "24lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-md md:max-h-[80vh] overflow-y-auto">
      <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
      <hr className="mt-3 mb-4 border-gray-300" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-4">
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-semibold text-lg text-gray-700">{data.filterType}</h2>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className="text-gray-600">{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
