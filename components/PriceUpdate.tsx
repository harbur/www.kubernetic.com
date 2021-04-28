import Link from "next/link";
import { useState } from "react";

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
          <Link href="/#pricing">
            <a className="text-white text-center flex-grow">
              We're updating our pricing, with limited time 50% discount until 8
              of May.
            </a>
          </Link>
          <span onClick={close} className="cursor-pointer text-white">
            x
          </span>
        </div>
      )}
    </>
  );
}
