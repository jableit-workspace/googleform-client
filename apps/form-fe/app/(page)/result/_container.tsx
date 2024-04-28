'use client';
import { Spacing } from "@repo/ui";
import { Button } from "@repo/ui/button"
import { MoveLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export const ResultScreen = ({ data }: any) => {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center h-full">
      <div className="sticky top-0 px-8 py-3 w-full flex gap-6 bg-opacity-95 backdrop-blur-sm shadow-md">
        <Button size={"icon"} variant={"ghost"} onClick={() => router.back()} >
          <MoveLeft />
        </Button>
      </div>
      <div className="w-full md:w-[750px] flex flex-col items-center gap-8 px-2 py-10">
        <div className="w-full px-6 py-6 rounded-md border shadow-md">
          <p>응답 {data.write_cnt}</p>
        </div>
        <Spacing size={10} />
        {data?.list?.map((item: any) => (
          <div key={item.id} className="w-full px-6 py-6 rounded-md border shadow-md">
            <p>{item.title}</p>
            <Spacing size={10} />
            <div className="flex flex-col gap-2">
              {item.options?.map((option: any) => (
                <p>{option.name + ' ' + option.choice}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}