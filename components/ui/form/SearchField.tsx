import React, { useEffect, useState } from "react";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";


export default function SearchField() {
  const [value, setValue] = useState("")
  const [, dispatch] = useStateValue() as any
  useEffect(() => {
    dispatch({
      type: actionTypes.SET_FILTER,
      filter: value,
    })
  }, [value, dispatch])

  return (
    <input
      value={value}
      placeholder="Search ..."
      className="w-80 mt-1 bg-gray-100 rounded-md px-2 py-1 text-sm"
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
