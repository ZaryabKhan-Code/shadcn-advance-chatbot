'use client'
import { SidebarTrigger } from './ui/sidebar'
import { PlusIcon } from 'lucide-react'
import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

const Header = () => {
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    return (
        <>
            <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
                <div className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-sm">
                    <SidebarTrigger className="ml-[1.1]" />
                </div>
                <div className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-sm">
                    <PlusIcon />
                </div>
                <div className="font-[family-name:var(--font-geist-sans)]">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-[140px] flex items-center justify-between px-3 font-[family-name:var(--font-geist-sans)]">
                                Appearance
                                <ChevronDownIcon className="w-4 h-4 ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            className="font-[family-name:var(--font-geist-sans)]"
                        >
                            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={showStatusBar}
                                onCheckedChange={setShowStatusBar}
                            >
                                Status Bar
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showActivityBar}
                                onCheckedChange={setShowActivityBar}
                                disabled
                            >
                                Activity Bar
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showPanel}
                                onCheckedChange={setShowPanel}
                            >
                                Panel
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </header>
        </>
    )
}

export default Header
