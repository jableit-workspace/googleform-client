'use client';
import { DeleteFormModal } from "@/_components/common/modal";
import { Spacing } from "@repo/ui"
import { Button } from "@repo/ui/button"
import { ChevronRight, Link } from "lucide-react"
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
    alert('삭제되었습니다');
  }

  return (
    <>
      {data?.map((item: any) => (
        <div key={item.id} className="w-full px-6 py-6 rounded-md border shadow-md">
          <p className="mb-6">{item.title}</p>
          <p>{item.description}</p>
          <Spacing size={10} />
          <div className="flex items-center justify-end gap-2">
            <Button size={"icon"} variant={"ghost"} onClick={onCopy(item.id)} title="복사하기" >
              <Link />
            </Button>
            <DeleteFormModal onClick={onDelete(item.id)} />
            <Button size={"icon"} variant={"ghost"} onClick={onMove(item.id)} title="이동하기">
              <ChevronRight />
            </Button>
          </div>
        </div>
      ))}
    </>

  )
}