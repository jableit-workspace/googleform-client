'use client';
import { Spacing } from "@repo/ui"
import { Button } from "@repo/ui/button"
import { Link, MoveLeft, MoveRight, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";

export const ResultListScreen = ({ data }: any) => {
  const router = useRouter()

  const onCopy = (id: number) => () => {
    window.navigator.clipboard.writeText(`${window.location.origin}/survey?id=${id}`).then(() => {
      alert('복사 되었습니다.')
    })
  }
  const onMove = (id: number) => () => {
    router.push(`/result?id=${id}`)
  }

  const onDelete = (id: number) => async () => {
    await fetch('https://google.vote24.co.kr/question', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
    router.refresh();
    alert('삭제되었습니다.')
  }

  return (
    <main className="flex flex-col items-center justify-center h-full">
      <div className="sticky top-0 px-8 py-3 w-full flex gap-6 bg-opacity-95 backdrop-blur-sm shadow-md">
        <Button size={"icon"} variant={"ghost"} onClick={() => router.back()} >
          <MoveLeft />
        </Button>
      </div>
      <div className="w-full md:w-[750px] flex flex-col items-center gap-8 px-2 py-10">
        {data?.map((item: any) => (
          <div key={item.id} className="w-full px-6 py-6 rounded-md border shadow-md">
            <p className="mb-6">{item.title}</p>
            <p>{item.description}</p>
            <Spacing size={10} />
            <div className="flex items-center justify-end gap-2">
              <Button size={"icon"} variant={"ghost"} onClick={onCopy(item.id)} >
                <Link />
              </Button>
              <Button size={"icon"} variant={"ghost"} onClick={onDelete(item.id)} >
                <Trash2 />
              </Button>
              <Button size={"icon"} variant={"ghost"} onClick={onMove(item.id)}>
                <MoveRight />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}