import Link from 'next/link'
import React from "react"

export default function Header() {
  return (
    <div className="bg-transparent absolute top-0 inset-x-0 z-100 h-20 items-center">
      <div className="max-w-7xl bg-transparent mx-auto px-6 md:px-20">
        <div className="flex py-8">
          <div className="w-0 flex-1">
            <Logo />
          </div>
          <div className="hidden sm:flex items-center justify-end space-x-8 ">
            <HeaderLink to="#pricing" title="Pricing" />
            <HeaderLink to="//docs.kubernetic.com" title="Docs" />
            <HeaderLink to="//docs.kubernetic.com/tutorials/" title="Tutorials" />
            <HeaderButton to="/enterprise/trial" title="Try Enterprise" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeaderSolid() {
  return (
    <div className="bg-blue-600 absolute top-0 inset-x-0 z-100 h-30 items-center hideout background">
      <div className="max-w-7xl mx-auto px-6 sm:px-20">
        <div className="flex py-8">
          <div className="w-0 flex-1">
            <Logo />
          </div>
          <div className="hidden sm:flex items-center justify-end space-x-8 ">
            <HeaderLink to="#pricing" title="Pricing" />
            <HeaderLink to="//docs.kubernetic.com" title="Docs" />
            <HeaderLink to="//docs.kubernetic.com/tutorials/" title="Tutorials" />
            <HeaderButton to="/enterprise/trial" title="Try Enterprise" />
          </div>
        </div>
      </div>
    </div>
  )
}

type HeaderLinkProps = { to: string, title: string }
function HeaderButton({ to, title }: HeaderLinkProps) {
  return (
    <span className="inline-flex rounded-md shadow">
      <Link href={to}>
        <a className="btn btn-indigo btn-popup inline-flex items-center justify-center px-4 py-2 rounded-md">
          {title}
        </a>
      </Link>
    </span>
  )
}

function HeaderLink({ to, title }: HeaderLinkProps) {
  return (
    <span className="inline-flex">
      <Link href={to}>
        <a className="whitespace-no-wrap text-base leading-6 font-medium text-white hover:underline hover:text-white focus:outline-none focus:text-white">
          {title}
        </a>
      </Link>
    </span>
  )
}

function Logo() {
  return (
    <Link href="/">
      <a className="flex">
        <img className="h-8 w-auto" src="/images/kubernetic.webp" alt="Kubernetic" />
      </a>
    </Link>
  )
}