'use client'

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { Button } from "@repo/ui/button"

export const BackHeader = () => {
  const router = useRouter()

  return (
    <div className="sticky top-0 px-8 py-3 w-full flex gap-6 bg-opacity-95 backdrop-blur-sm shadow-md">
      <Button size={"icon"} variant={"ghost"} onClick={() => router.back()} title="뒤로가기" >
        <ChevronLeft />
      </Button>
    </div>
  )
}