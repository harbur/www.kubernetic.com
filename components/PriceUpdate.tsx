import Link from "next/link";
import { useState } from "react";
import { CheckboxIcon, GroupIcon, UserIcon } from "./Icons";

/**
 * Price update popup.
 *
 */
export default function PriceUpdate() {
  const [open, setOpen] = useState(true);
  const close = () => setOpen(false);
  return (
    <>
      {open && (
        <div className="px-5 py-3 bg-black flex">
          <span className="text-white flex-grow">
            We're updating our pricing, with limited time 50% discount until 8
            of May
          </span>
          <span onClick={close} className="cursor-pointer text-white">
            x
          </span>
        </div>
      )}
    </>
  );
}
