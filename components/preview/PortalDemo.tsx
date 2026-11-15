import { useEffect, useRef, useState } from "react"
import type { Demo } from "@harbur/kubernetic-portal-demo"

/** A tour stop: a button above the demo that opens one screen in it. */
export type Stop = { label: string, hint: string, path: string, user?: string, press?: string }

type PortalDemoProps = { stops: Stop[], onStop?: (stop: Stop) => void }

/**
 * The Portal edition's demo, on its in-memory fake backend, with buttons that
 * take a cold visitor to the screens worth seeing. The package touches the DOM
 * when mounted, so it is imported on the client only.
 */
export default function PortalDemo({ stops, onStop }: PortalDemoProps) {
  const box = useRef<HTMLDivElement>(null)
  const demo = useRef<Demo>(undefined)
  const [current, setCurrent] = useState<string>()

  useEffect(() => {
    let cancelled = false
    import("@harbur/kubernetic-portal-demo").then(({ mount }) => {
      if (!cancelled && box.current) demo.current = mount(box.current, { path: "/p/home" })
    })
    return () => {
      cancelled = true
      demo.current?.unmount()
      demo.current = undefined
    }
  }, [])

  const open = (stop: Stop) => {
    setCurrent(stop.path)
    demo.current?.navigate(stop.path, { user: stop.user, press: stop.press })
    onStop?.(stop)
  }

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {stops.map((stop) => (
          <button key={stop.path} onClick={() => open(stop)}
            className={`text-left rounded-lg border px-4 py-3 transition-colors cursor-pointer ${current === stop.path
              ? "border-sky-400 bg-sky-400/10"
              : "border-white/10 bg-white/5 hover:border-white/30"}`}>
            <div className="font-semibold text-white">{stop.label}</div>
            <div className="text-sm text-slate-400">{stop.hint}</div>
          </button>
        ))}
      </div>
      <div ref={box} className="h-[80vh] min-h-[560px] rounded-xl overflow-hidden border border-white/10 shadow-2xl" />
    </div>
  )
}
