import { Button } from "@repo/ui/button";
import Link from "next/link";


export const MainScreen = () => {

  return (
    <main className="flex flex-col items-center justify-center h-dvh">
      <div className="w-screen md:w-[750px] h-[300px] rounded-md border p-4 shadow-md flex flex-col justify-center gap-3">
        <Link href="/forms" className="mb-4" passHref prefetch>
          <Button className="w-full text-lg h-[50px]" size={"lg"} variant={"default"} >설문지 작성하기</Button>
        </Link>
        <Link href="/result/list" passHref prefetch>
          <Button className="w-full text-lg h-[50px]" size={"lg"} variant={"outline"} >설문지 결과보기</Button>
        </Link>
      </div>
    </main>
  )
}

