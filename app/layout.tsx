import "./globals.css"
import Footer from "@/components/Footer"
export const metadata = {
  title: "Understanding LLMs & Multimodal AI",
  description: "A Next.js version of the report with shadcn-ui styling",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}


