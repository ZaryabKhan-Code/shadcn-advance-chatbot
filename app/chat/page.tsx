
import ChatInterface from "@/components/chat"
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
    return (
        <SidebarProvider className="font-[family-name:var(--font-geist-sans)]">
            <AppSidebar />
            <ChatInterface />
        </SidebarProvider>
    )
}
