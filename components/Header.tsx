import Link from 'next/link'
import React from "react"

export default function Header() {
  return (
    <header className="welcome">
      <nav className="topbar">
        <Link href="/" >
          <a className="topbar-logo">Kubernetic</a>
        </Link>

        <div className="topbar-menu">
          <div className="topbar-menu-additional">
            <HeaderLink to="/#pricing" title="Pricing" />
            <HeaderLink to="//docs.kubernetic.com/" title="Documentation" />
            <HeaderLink to="/enterprise/trial" title="Try Enterprise" />
          </div>
        </div>
      </nav>
    </header>
  )
}

type HeaderLinkProps = { to: string, title: string }
function HeaderLink({ to, title }: HeaderLinkProps) {
  return (<Link href={to}>
    <a>{title}</a>
  </Link>
  )
}