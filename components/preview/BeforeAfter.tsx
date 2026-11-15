/**
 * Before and after Kubernetic: the same tools on the same clusters, reached
 * one by one (a line, a login and a URL each) or through one portal.
 */

type Kind = "gitops" | "metrics" | "console" | "policy"

const COLORS: Record<Kind, string> = {
  gitops: "#fb923c",
  metrics: "#facc15",
  console: "#38bdf8",
  policy: "#c084fc",
}

const LEGEND: { kind: Kind, label: string }[] = [
  { kind: "gitops", label: "GitOps" },
  { kind: "metrics", label: "Metrics" },
  { kind: "console", label: "Consoles and CLI" },
  { kind: "policy", label: "Policy and mesh" },
]

type Tool = [string, Kind]

const CLUSTERS: { name: string, tools: Tool[] }[] = [
  {
    name: "prod-eu-west-1",
    tools: [["Argo CD", "gitops"], ["Grafana", "metrics"], ["Prometheus", "metrics"], ["OpenShift console", "console"], ["Kyverno", "policy"], ["Istio / Kiali", "policy"]],
  },
  {
    name: "prod-us-east-1",
    tools: [["Argo CD", "gitops"], ["Grafana", "metrics"], ["Prometheus", "metrics"], ["K8s Dashboard", "console"], ["Flux", "gitops"], ["kubectl", "console"]],
  },
  {
    name: "staging-eu-west-1",
    tools: [["Flux", "gitops"], ["Grafana", "metrics"], ["Prometheus", "metrics"], ["K8s Dashboard", "console"], ["Kyverno", "policy"], ["kubectl", "console"]],
  },
]

// Geometry, in the viewBox's units: three cluster boxes stacked on the right, two columns of tools in each.
const W = 560
const H = 450
const BOX_X = 250
const BOX_W = 300
const BOX_H = 132
const BOX_GAP = 14
const CHIP_W = 132
const CHIP_H = 26
const YOU = { x: 46, y: H / 2 }

const boxY = (i: number) => 10 + i * (BOX_H + BOX_GAP)
const chip = (ci: number, ti: number) => ({
  x: BOX_X + 12 + (ti % 2) * (CHIP_W + 12),
  y: boxY(ci) + 30 + Math.floor(ti / 2) * (CHIP_H + 8),
})

function You() {
  return (
    <g>
      <circle cx={YOU.x} cy={YOU.y} r={26} fill="#1e293b" stroke="#94a3b8" strokeWidth={1.5} />
      <circle cx={YOU.x} cy={YOU.y - 6} r={7} fill="#cbd5e1" />
      <path d={`M ${YOU.x - 12} ${YOU.y + 15} a 12 10 0 0 1 24 0`} fill="#cbd5e1" />
      <text x={YOU.x} y={YOU.y + 46} textAnchor="middle" fill="#cbd5e1" fontSize={13} fontWeight={600}>You</text>
    </g>
  )
}

function Clusters({ dim }: { dim?: boolean }) {
  return (
    <g>
      {CLUSTERS.map((c, ci) => (
        <g key={c.name}>
          <rect x={BOX_X} y={boxY(ci)} width={BOX_W} height={BOX_H} rx={12} fill="#0b1222" stroke="#334155" />
          <text x={BOX_X + 12} y={boxY(ci) + 19} fill="#94a3b8" fontSize={11} fontFamily="ui-monospace, monospace">{c.name}</text>
          {c.tools.map(([name, kind], ti) => {
            const p = chip(ci, ti)
            return (
              <g key={ti} opacity={dim ? 0.75 : 1}>
                <rect x={p.x} y={p.y} width={CHIP_W} height={CHIP_H} rx={6} fill="#111a2e" stroke={COLORS[kind]} strokeOpacity={0.6} />
                <circle cx={p.x + 11} cy={p.y + CHIP_H / 2} r={3.5} fill={COLORS[kind]} />
                <text x={p.x + 21} y={p.y + 17} fill="#e2e8f0" fontSize={11.5}>{name}</text>
              </g>
            )
          })}
        </g>
      ))}
    </g>
  )
}

function Before() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img"
      aria-label="Without Kubernetic: you connect separately to 18 tools across 3 clusters.">
      {CLUSTERS.flatMap((c, ci) => c.tools.map(([, kind], ti) => {
        const p = chip(ci, ti)
        const ex = p.x
        const ey = p.y + CHIP_H / 2
        const mx = (YOU.x + ex) / 2 + ((ti * 37 + ci * 23) % 60) - 30
        return (
          <path key={`${ci}-${ti}`} d={`M ${YOU.x + 26} ${YOU.y} C ${mx} ${YOU.y}, ${mx} ${ey}, ${ex} ${ey}`}
            fill="none" stroke={COLORS[kind]} strokeOpacity={0.55} strokeWidth={1.4} />
        )
      }))}
      <Clusters />
      <You />
    </svg>
  )
}

function After() {
  const k = { x: 132, y: YOU.y, w: 84, h: 84 }
  const kRight = k.x + k.w / 2
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img"
      aria-label="With Kubernetic: you sign in once and reach every tool on every cluster through it.">
      <line x1={YOU.x + 26} y1={YOU.y} x2={k.x - k.w / 2} y2={k.y} stroke="#22c55e" strokeWidth={2.5} />
      {CLUSTERS.map((c, ci) => {
        const ey = boxY(ci) + BOX_H / 2
        return (
          <path key={c.name} d={`M ${kRight} ${k.y} C ${kRight + 30} ${k.y}, ${BOX_X - 30} ${ey}, ${BOX_X} ${ey}`}
            fill="none" stroke="#22c55e" strokeWidth={2.5} />
        )
      })}
      <Clusters dim />
      <rect x={k.x - k.w / 2} y={k.y - k.h / 2} width={k.w} height={k.h} rx={18} fill="#1e293b" stroke="#22c55e" strokeWidth={1.5} />
      <image href="/images/kubernetic-app.png" x={k.x - 26} y={k.y - 34} width={52} height={52} />
      <text x={k.x} y={k.y + 33} textAnchor="middle" fill="#f8fafc" fontSize={11.5} fontWeight={600}>Kubernetic</text>
      <You />
    </svg>
  )
}

export default function BeforeAfter() {
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-6">
        <figure className="rounded-xl border border-white/10 bg-white/5 p-5">
          <figcaption className="mb-4">
            <div className="text-sm font-semibold uppercase tracking-wider text-rose-400">Before</div>
            <div className="mt-1 text-white font-semibold">18 tools, 18 places to look.</div>
            <div className="text-sm text-slate-400">Each cluster brings its own Argo CD, Grafana, console and policy engine. Every team has to know which one, where.</div>
          </figcaption>
          <Before />
        </figure>
        <figure className="rounded-xl border border-white/10 bg-white/5 p-5">
          <figcaption className="mb-4">
            <div className="text-sm font-semibold uppercase tracking-wider text-green-400">With Kubernetic</div>
            <div className="mt-1 text-white font-semibold">One sign-in, one place, every cluster.</div>
            <div className="text-sm text-slate-400">The same tools keep running. Their objects show up in one portal, on Pages made for each team, under the RBAC you already have.</div>
          </figcaption>
          <After />
        </figure>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
        {LEGEND.map((l) => (
          <span key={l.kind} className="inline-flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLORS[l.kind] }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  )
}
