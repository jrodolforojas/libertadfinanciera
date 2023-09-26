import Sidebar from "@/components/sidebar"
import adminRoutes from "./routes"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Sidebar routes={adminRoutes} />
      <section>{children}</section>
    </main>
  )
}