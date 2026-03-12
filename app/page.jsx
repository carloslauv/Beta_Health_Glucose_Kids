import Link from 'next/link'
import { auth } from '../lib/auth.js'
import { ArrowRight, Activity, BarChart2, Clock, Zap } from 'lucide-react'

const features = [
  {
    icon: Activity,
    title: 'Live glucose curves',
    desc: 'See exactly how your food choices move your blood sugar over a full 24-hour day. Changes update the chart instantly.',
  },
  {
    icon: Zap,
    title: 'Insulin impact',
    desc: 'Understand the insulin response to every meal combination and see when your body enters fat-burning mode.',
  },
  {
    icon: Clock,
    title: 'Long-term projection',
    desc: 'Project what daily eating patterns accumulate over 1 week to 1 year — visualized on a body silhouette.',
  },
  {
    icon: BarChart2,
    title: 'Side-by-side compare',
    desc: 'Compare two different meal strategies in parallel. See the winner at a glance with the difference badge.',
  },
]

export default async function LandingPage() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Nav ──────────────────────────────────────────────────────────────── */}
      <nav className="border-b border-zinc-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <Activity size={13} className="text-white" strokeWidth={2.5} />
            </span>
            <span className="font-semibold text-zinc-900 text-sm tracking-tight">Glucose Explorer</span>
          </div>
          <div className="flex items-center gap-3">
            {session ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
              >
                Open app <ArrowRight size={13} />
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-in"
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                >
                  Get started <ArrowRight size={13} />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 max-w-3xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 border border-indigo-100">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Interactive · Real-time · Educational
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-6">
          See how food affects<br />
          <span className="text-indigo-600">your body in real-time</span>
        </h1>

        <p className="text-lg text-zinc-500 leading-relaxed max-w-xl mb-10">
          An interactive science tool that shows the glucose and insulin response to different foods, meal frequencies, and eating patterns — built for curious kids and parents.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/sign-in"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Start for free <ArrowRight size={15} />
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium flex items-center gap-1.5"
          >
            Try without signing in →
          </Link>
        </div>
      </section>

      {/* ── Preview strip ────────────────────────────────────────────────────── */}
      <section className="bg-zinc-50 border-y border-zinc-200 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Fake chart preview */}
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="border-b border-zinc-100 px-5 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-zinc-200" />
                <span className="w-3 h-3 rounded-full bg-zinc-200" />
                <span className="w-3 h-3 rounded-full bg-zinc-200" />
              </div>
              <span className="text-xs text-zinc-400 font-mono">glucose-explorer.vercel.app/dashboard</span>
            </div>
            <div className="p-5 flex gap-4 h-40">
              {/* Sidebar sketch */}
              <div className="w-44 flex-shrink-0 flex flex-col gap-2">
                <div className="h-2 w-12 bg-zinc-100 rounded" />
                <div className="flex gap-1">
                  {['Carbs','Protein','Fat'].map(t => (
                    <div key={t} className={`h-5 px-2 rounded text-[9px] flex items-center font-medium ${t === 'Carbs' ? 'bg-indigo-100 text-indigo-600' : 'bg-zinc-100 text-zinc-400'}`}>{t}</div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-1 mt-1">
                  {['🍞','🍬','🍚','🥣','🍠','🍎'].map(e => (
                    <div key={e} className="h-8 rounded border border-zinc-200 flex items-center justify-center text-base">{e}</div>
                  ))}
                </div>
              </div>
              {/* Chart sketch */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex gap-2">
                  {['182 mg/dL','48 μIU/mL','67%'].map((v, i) => (
                    <div key={i} className={`flex-1 rounded border border-zinc-200 p-2 ${i === 2 ? 'hidden sm:flex flex-col' : 'flex flex-col'}`}>
                      <p className={`text-xs font-bold ${i === 0 ? 'text-red-500' : i === 1 ? 'text-amber-500' : 'text-amber-500'}`}>{v}</p>
                      <p className="text-[9px] text-zinc-400 mt-0.5">{i === 0 ? 'Peak glucose' : i === 1 ? 'Peak insulin' : 'Load'}</p>
                    </div>
                  ))}
                </div>
                {/* Fake glucose chart curve */}
                <div className="flex-1 rounded border border-zinc-100 bg-zinc-50 flex items-end px-2 pb-2 gap-0.5 overflow-hidden relative">
                  {/* Light red zone */}
                  <div className="absolute top-0 inset-x-0 h-1/3 bg-red-50" />
                  {[18,18,19,19,20,22,28,40,55,66,72,60,42,30,22,19,18,18,22,32,46,58,55,42,30,22,19,18].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-indigo-200 transition-all" style={{ height: `${h * 1.1}%`, opacity: 0.7 + (i / 50) }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-5xl mx-auto w-full">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest text-center mb-10">What you&apos;ll learn</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 p-5 rounded-xl border border-zinc-200 bg-white hover:border-indigo-200 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 text-sm mb-1">{title}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center bg-indigo-600 rounded-2xl p-12">
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Ready to explore?</h2>
          <p className="text-indigo-200 text-sm mb-8 leading-relaxed">
            Free to use. No credit card required. Learn how nutrition science actually works.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors text-sm"
          >
            Get started free <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center">
              <Activity size={11} className="text-white" strokeWidth={2.5} />
            </span>
            <span className="text-xs font-semibold text-zinc-500">Glucose Explorer</span>
          </div>
          <p className="text-xs text-zinc-400">For educational purposes only. Not medical advice.</p>
        </div>
      </footer>
    </div>
  )
}
