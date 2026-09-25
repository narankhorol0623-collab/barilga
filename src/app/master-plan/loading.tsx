export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-[1600px] px-4 pb-12 pt-28 min-[761px]:px-10"
      aria-busy="true"
    >
      <p role="status" className="mb-7 text-sm text-slate-400">
        Luxury Residence · Байрны сонголтыг ачаалж байна…
      </p>
      <div className="grid gap-5 min-[1100px]:grid-cols-[1fr_380px]">
        <div className="aspect-square animate-pulse rounded-2xl bg-slate-400/10 motion-reduce:animate-none" />
        <div className="h-96 animate-pulse rounded-2xl bg-slate-400/10 motion-reduce:animate-none" />
      </div>
    </main>
  );
}
