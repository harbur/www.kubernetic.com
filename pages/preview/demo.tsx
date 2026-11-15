import Layout from "@components/layouts/Layout"
import BeforeAfter from "@components/preview/BeforeAfter"
import PortalDemo, { type Stop } from "@components/preview/PortalDemo"
import { PREVIEW_EVENT, trackEvent } from "@utils/analytics/plausible"
import { useEffect, useState } from "react"

/**
 * The hidden preview sent to prospects before a pitch call. One static page
 * answers every /preview/<slug> (a 200 rewrite in public/_redirects), so any
 * slug works and the slug in the URL is what tells analytics who opened it.
 * Kept out of search: noindex, excluded from the sitemap, and never named in
 * robots.txt, which would advertise it.
 */

// The booking page: opened in a new tab, so the click is reported and the demo stays open.
const BOOK_CALL_URL = "https://cal.com/dimitris-kapanidis-exiddk/kubernetic-5-demo"

const STOPS: Stop[] = [
  { label: "A Page", hint: "Argo CD, as your team sees it", path: "/p/argocd" },
  { label: "A Form", hint: "Deploy a web service", path: "/create/web-service" },
  { label: "Topology", hint: "Everything in a namespace", path: "/r/prod-eu-west-1/core/v1/namespaces/_/payments?tab=topology" },
  { label: "Studio", hint: "Build a page without code", path: "/studio/home" },
]

const FEATURES = [
  { title: "Pages", text: "Dashboards for each team, built from tables, charts and stats over live cluster objects." },
  { title: "Forms", text: "Self-service actions, such as a new service or a database, that create the right resources with the right defaults." },
  { title: "Topology", text: "What manages an object, one level up, and everything it manages in turn, on one screen." },
  { title: "Studio", text: "Pages, Views and Forms are edited in the app and saved as Kubernetes resources, so they live in git like everything else." },
  { title: "Your RBAC, unchanged", text: "Every request runs as the person who makes it. Kubernetes RBAC decides what they can see and do." },
  { title: "Many clusters", text: "One portal on a hub cluster serves every cluster you connect to it." },
]

const FAQ = [
  {
    q: "Is the demo running against a real cluster?",
    a: "No. It runs on an in-memory fake backend, entirely in your browser. Click anything, create anything: nothing leaves the page.",
  },
  {
    q: "Where does Kubernetic run?",
    a: "In your own cluster. The Portal edition is installed on one cluster (the hub) and connects to the others. Your data stays with you.",
  },
  {
    q: "How do people sign in?",
    a: "With Google sign-in today; tell us your identity provider on the call. Each person then acts as themselves, so their access is the access Kubernetes RBAC already gives them.",
  },
  {
    q: "What does it cost?",
    a: "The Portal edition is free for up to 2 clusters. Beyond that, the Premium tier comes with a license key. We'll go through it on the call.",
  },
  {
    q: "Can I start on my own?",
    a: "Yes. The Desktop edition is the same app on your laptop, using your own kubeconfig, and it is free.",
  },
]

export default function Preview() {
  const [client, setClient] = useState("")
  useEffect(() => setClient(window.location.pathname.split("/")[2] || ""), [])
  const track = (action: string) => trackEvent(PREVIEW_EVENT, { client, action })

  return (
    <Layout title="Kubernetic Portal preview" description="A preview of the Kubernetic Portal edition." noindex>
      <div className="min-h-screen bg-slate-950 text-slate-300">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-white font-semibold">
            <img src="/images/kubernetic-app.png" alt="" className="h-8 w-8 rounded-lg" />
            Kubernetic
          </a>
          <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("book-call")}
            className="rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold px-4 py-2">
            Book a call
          </a>
        </header>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            A Developer Portal for your Kubernetes fleet
          </h1>
          <p className="mt-5 text-lg text-slate-400">
            Ready-made pages for each use case, fully customizable to your company's needs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("book-call")}
              className="rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold px-5 py-3">
              Book a call
            </a>
            <a href="#video" onClick={() => track("video")}
              className="rounded-lg border border-white/20 hover:border-white/40 text-white font-semibold px-5 py-3">
              Watch the 1-minute video
            </a>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <PortalDemo stops={STOPS} onStop={(stop) => track(stop.label)} />
          <p className="mt-3 text-sm text-slate-500 text-center">Click inside the demo to use it. Click outside to scroll the page again.</p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-400 text-center">Why</p>
          <h2 className="mt-2 text-3xl font-bold text-white text-center">Every tool, every cluster, one place.</h2>
          <p className="mt-3 max-w-2xl mx-auto text-center text-slate-400">
            Argo CD, Flux, Prometheus, Grafana, Istio, Kyverno and the cluster consoles stay where they are. Kubernetic reads what they create, on every cluster, so your teams don't have to find each one.
          </p>
          <div className="mt-10">
            <BeforeAfter />
          </div>
        </section>

        <section id="video" className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 scroll-mt-8">
          <h2 className="text-3xl font-bold text-white text-center">The tour, in a minute.</h2>
          <video className="mt-8 w-full rounded-xl border border-white/10 shadow-2xl" controls preload="none"
            poster="/videos/kubernetic-v5-demo.jpg" onPlay={() => track("video-play")}>
            <source src="/videos/kubernetic-v5-demo.mp4" type="video/mp4" />
          </video>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-400 text-center">Features</p>
          <h2 className="mt-2 text-3xl font-bold text-white text-center">Screens your teams can use. Rules you already have.</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-slate-400">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-400 text-center">Questions</p>
          <h2 className="mt-2 text-3xl font-bold text-white text-center">Frequently asked.</h2>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-white">
                  {item.q}
                  <span className="text-slate-500 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 text-center">
          <h2 className="text-3xl font-bold text-white">See it on your clusters.</h2>
          <p className="mt-4 text-slate-400">Thirty minutes: your setup, your teams, and what a first Page would look like for them.</p>
          <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("book-call")}
            className="mt-8 inline-block rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold px-6 py-3">
            Book a call
          </a>
          <p className="mt-10 text-sm text-slate-500">
            Prefer to start on your own? The Desktop edition is free and runs the same app on your laptop.
          </p>
        </section>
      </div>
    </Layout>
  )
}
