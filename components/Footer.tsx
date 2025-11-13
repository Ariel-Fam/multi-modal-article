import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-screen border-t bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="container px-6 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/softwareLogo.png"
            alt="App logo"
            width={47}
            height={47}
            className="rounded-md"
            priority
          />
          <div>
            <div className="font-semibold">Understanding LLMs &amp; Multimodal AI</div>
            <div className="text-sm text-muted-foreground">Developer-focused insights and visuals</div>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/">Home</Link>
          <span className="text-muted-foreground/40">•</span>
          <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/article">Article</Link>
        </nav>
      </div>
      <div className="border-t">
        <div className="container px-6 py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Launch Narrative Sofware. All rights reserved.
        </div>
      </div>
    </footer>
  )
}


