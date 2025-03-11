"use client"

import { MoreHorizontal, type LucideIcon } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    const { isMobile } = useSidebar()

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <DropdownMenu key={item.title}>
                        <SidebarMenuItem>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    {item.title}
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                        </SidebarMenuItem>
                    </DropdownMenu>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
