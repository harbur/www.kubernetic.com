import { useState } from "react"
import { DOWNLOAD_EVENT, trackEvent } from "@utils/analytics/plausible"
import { AppleIcon, DropdownIcon, LinuxIcon, WinIcon } from "./Icons"

/** The release the buttons offer: names the installers and tags the Download event. */
const VERSION = "4.4.0"
const INSTALLERS_URL = "https://kubernetic.s3.amazonaws.com"

export default function CTAButton() {
  const [isOpen, updateIsOpen] = useState(false)
  return (
    <>
      <div className="inline-flex">
        <div className="relative">
          <div className="btn-popup inline-flex w-56 divide-x divide-green-600 hover:shadow-lg">
            <a href={`${INSTALLERS_URL}/Kubernetic-${VERSION}.dmg`} onClick={() => trackEvent(DOWNLOAD_EVENT, { os: "mac", version: VERSION })}>
              <button className="btn btn-green inline-flex w-48 rounded-l  px-3 py-3 pl-4">
                <AppleIcon />
                <span>Download for Mac</span>
              </button>
            </a>
            <button aria-label="choose-os" className="btn btn-green inline-flex transition rounded-r ease-in-out duration-150 px-3 py-3"
              onClick={() => updateIsOpen(!isOpen)}>
              <DropdownIcon />
            </button>
          </div>
          {isOpen && <DropdownMenu />}
        </div>
      </div>
    </>
  )
}


const DropdownMenu = () => (
  <div className="absolute">
    <ul className="w-56 ml-1 p-2 mt-2 text-gray-600 bg-white border border-gray-100 rounded-lg shadow-md min-w-max-content right-0" aria-label="submenu">
      <DropdownMenuItem icon={<WinIcon />} text="Download for Windows" os="windows" to={`${INSTALLERS_URL}/Kubernetic+Setup+${VERSION}.exe`} />
      <DropdownMenuItem icon={<LinuxIcon />} text="Download for Linux" os="linux" to={`${INSTALLERS_URL}/Kubernetic-${VERSION}.AppImage`} />
    </ul>
  </div>
)

type DropdownMenuProps = { icon: any, text: string, os: string, to: string }
function DropdownMenuItem({ icon, text, os, to }: DropdownMenuProps) {
  return (
    <li>
      <a href={to} onClick={() => trackEvent(DOWNLOAD_EVENT, { os, version: VERSION })} className="inline-flex items-center cursor-pointer w-full px-2 py-2 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-200 hover:text-gray-800">
        {icon}
        <span>{text}</span>
      </a>
    </li>
  )
}
