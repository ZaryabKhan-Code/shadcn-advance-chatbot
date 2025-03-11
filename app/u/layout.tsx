import { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarProvider,
} from "@/components/ui/sidebar"


interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <SidebarProvider className="font-[family-name:var(--font-geist-sans)]">
            <AppSidebar />
            {children}
        </SidebarProvider>
    )
}
