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
import { Input } from "@repo/ui/input"
import { Label } from "@repo/ui/input"
import { CopyIcon } from "lucide-react"
import { useLayoutEffect, useState } from "react"

export function DialogCloseButton({ open, setOpen, id }: { open: boolean, setOpen: (open: boolean) => void, id: number }) {
  const [url, setUrl] = useState('')
  const onCopyClcik = () => {
    window.navigator.clipboard.writeText(`${window.location.origin}/survey?id=${id}`).then(() => {
      alert('복사되었습니다.')
    });
  }

  useLayoutEffect(() => {
    setUrl(`${window.location.origin}/survey?id=${id}`)
  }, [])


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">보내기</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
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
          <Button type="submit" size="sm" className="px-3" onClick={onCopyClcik}>
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
