import { Copy, Share2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ShareDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 sm:rounded-full rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                    <Share2Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm font-medium hidden sm:inline">Share</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md font-[family-name:var(--font-geist-sans)]">
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
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy />
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
