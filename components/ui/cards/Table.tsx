import React from "react";
import { useNavigate } from "react-router-dom";
import { timestampToStr } from "../../utils/time";

export interface Props {
  columns: string[];
  items: any[];
  to: string;
}
function Table({ columns, items, to }: Props) {
  const navigate = useNavigate();
  const viewItem = (id: string) => {
    navigate(`${to}/${encodeURIComponent(id)}`,);
  };

  return (
    <table className="rounded-t-md bg-gray-200 table text-left w-full">
      <thead className="table-header-group col-span-full w-full">
        <tr className="text-left">
          {columns.map((col) => (
            <th className="px-2" key={col}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {items &&
          items.map((item: any) => (
            <tr
              className="cursor-pointer hover:bg-gray-100 text-gray-600 text-sm"
              key={item.id}
              onClick={() => viewItem(item.id)}
            >
              {columns.map((column: string) => {
                if (column === "timestamp" && item.timestamp) {
                  return (
                    <td key={column} className="px-2 py-0.5 font-mono text-xs tracking-tight">
                      {timestampToStr(item.timestamp)}
                    </td>
                  );
                  } else if (column === "expirationDate" && item.expirationDate) {
                    return (
                      <td key={column} className="px-2 py-0.5 font-mono text-xs tracking-tight">
                        {timestampToStr(item.expirationDate)}
                      </td>
                    );
                } else {
                  return (
                    <td key={column} className="px-2 py-0.5">
                      {item[column]}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
