export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      {/* <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]"> */}
        {/* <section className="flex flex-col justify-between rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-8">
         

        </section> */}

        <section className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{title}</p>
            <p className="mt-3 font-display text-3xl font-semibold text-slate-900">{subtitle}</p>
            <div className="mt-8">{children}</div>
            {footer ? <div className="mt-6 border-t border-slate-200 pt-5 text-sm text-slate-500">{footer}</div> : null}
          </div>
        </section>
      {/* </div> */}
    </div>
  )
}
