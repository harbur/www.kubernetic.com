import { ChevronLeft } from "@material-ui/icons";
import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import Stats from "../../models/Stats";
import TooltipWithShortcut from "../tooltips/TooltipWithShortcut";

export interface HeaderProps {
  text: string;
  description?: string;
  back?: string;
  children?: any;
  to?: string;
  collection?: string;
}

function Header({ text, description, back, to, children, collection }: HeaderProps) {
  return (
    <div>
      <div className="flex items-center h-8 gap-2">
        {back !== undefined && (
          <NavLink to={back}>
            <ChevronLeft className="text-gray-400 hover:text-black" />
          </NavLink>
        )}
        <TooltipWithShortcut description={description} placement="bottom-start">
          {(to && (
            <NavLink to={to || ""}>
              <h1 data-tip data-for="header" className="text-lg font-bold">
                {text}
              </h1>
            </NavLink>
          )) || (
            <h1 data-tip data-for="header" className="text-lg font-bold">
                {text}
              </h1>
            )}
        </TooltipWithShortcut>
        {collection && <Suspense fallback={<></>}><StatsBadge collection={collection} /></Suspense>}
        <span className="flex-grow"></span>
        <div className="flex space-x-1">{children}</div>
      </div>
    </div>
  );
}

type StatsBadgeProps = { collection: string }
function StatsBadge({ collection }: StatsBadgeProps) {
  var ref = useFirestore().collection(collection).doc("--stats--")
  const { data } = useFirestoreDocData<Stats>(ref);

  return <span className="ml-2 bg-blue-100 text-sm text-blue-900 rounded-md px-2">{data.count}</span>
}
export default Header;
