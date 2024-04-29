'use client'
import { Button } from "@repo/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui"
import { Input, Label } from "@repo/ui/input"
import { CopyIcon, Trash2 } from "lucide-react"
import { useState } from "react"

export const DialogCloseButton = ({ open, setOpen, url }: { open: boolean, setOpen: (open: boolean) => void, url: string }) => {
  const onCopyClcik = () => {
    window.navigator.clipboard.writeText(url).then(() => {
      alert('복사되었습니다.')
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>설문지 보내기</DialogTitle>
          <DialogDescription>
            링크를 복사하여 설문지를 보내세요
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={url}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" title="복사" onClick={onCopyClcik}>
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const DeleteFormModal = ({ onClick }: { onClick: () => Promise<void> }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size={"icon"} variant="ghost" title="삭제하기">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>설문지 삭제하기</DialogTitle>
          <DialogDescription>
            설문지를 삭제하시겠어요?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              취소
            </Button>
          </DialogClose>
          <Button type="button" onClick={async () => {
            await onClick();
            setOpen(false)
          }}>삭제</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const TestModal = () => {

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button type="button" title="삭제하기">
          테스트
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>설문지 삭제하기</DialogTitle>
          <DialogDescription>
            설문지를 삭제하시겠어요?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
