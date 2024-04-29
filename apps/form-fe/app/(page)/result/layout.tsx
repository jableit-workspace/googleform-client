import { BackHeader } from "@/_components/common/back-header";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <main className="flex flex-col items-center justify-center h-full">
      <BackHeader />
      <div className="w-full md:w-[750px] flex flex-col items-center gap-8 px-2 py-10">
        {children}
      </div>
    </main>
  )
}