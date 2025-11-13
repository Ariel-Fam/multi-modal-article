import { promises as fs } from "fs"
import path from "path"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { NotepadText } from "lucide-react"
import DirectionalRevealImage from "@/components/DirectionalRevealImage"
import DirectionalReveal from "@/components/DirectionalReveal"
import Image from "next/image"


export const metadata = {
  title: "Multimodal AI Article",
}

type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }

type ArticleSection = {
  title: string
  blocks: ArticleBlock[]
}

const KNOWN_HEADINGS = [
  "Understanding LLMs and Multimodal AI: Generating Accurate Responses to Prompts",
  "Processing Text Prompts with Transformers (Tokenization, Embeddings & Attention)",
  "Training LLMs: From Massive Datasets to Fine-Tuning and RLHF",
  "How LLMs Achieve Accuracy and Relevance in Responses",
  "From Unimodal to Multimodal: Integrating Text, Images, Audio, and More",
  "Generative AI Across Modalities: Examples",
  "Conclusion",
  "Sources:",
]

function stripDashPrefix(line: string): string {
  if (line.startsWith("- ")) return line.slice(2)
  if (line.startsWith("    - ")) return line.slice(6)
  return line
}

function parseArticle(raw: string): { title: string; sections: ArticleSection[] } {
  const lines = raw.split("\n")
  const cleaned = lines.map((l) => stripDashPrefix(l).trimEnd())

  // Title = first non-empty line
  let title = "Article"
  const firstNonEmpty = cleaned.find((l) => l.trim().length > 0)
  if (firstNonEmpty) title = firstNonEmpty.trim()

  const sections: ArticleSection[] = []
  let current: ArticleSection | null = null
  let paragraphBuffer: string[] = []
  let listBuffer: string[] | null = null

  const flushParagraph = () => {
    const text = paragraphBuffer.map((s) => s.trim()).join(" ").trim()
    if (text) current?.blocks.push({ type: "paragraph", text })
    paragraphBuffer = []
  }
  const flushList = () => {
    if (listBuffer && listBuffer.length > 0) {
      current?.blocks.push({ type: "list", items: listBuffer.slice() })
    }
    listBuffer = null
  }

  const ensureSection = (heading: string) => {
    flushParagraph()
    flushList()
    current = { title: heading, blocks: [] }
    sections.push(current)
  }

  for (let i = 0; i < cleaned.length; i++) {
    const line = cleaned[i]
    const t = line.trim()

    // Blank line -> paragraph/list boundary
    if (t.length === 0) {
      flushParagraph()
      flushList()
      continue
    }

    // Known heading
    if (KNOWN_HEADINGS.includes(t)) {
      ensureSection(t)
      continue
    }

    // Indented list item in source (original had "    - ")
    // We can recover this by checking the raw line's indent.
    const rawLine = lines[i]
    if (rawLine.startsWith("    - ")) {
      const item = stripDashPrefix(rawLine).trim()
      // Start a list if not in one
      if (!listBuffer) {
        flushParagraph()
        listBuffer = []
      }
      listBuffer.push(item)
      continue
    }

    // If line looks like a figure label, keep it as a paragraph
    if (/^Figure:/i.test(t)) {
      paragraphBuffer.push(t)
      continue
    }

    // Default: accumulate paragraph text
    paragraphBuffer.push(t)
  }

  // Flush any remaining buffers
  if (paragraphBuffer.length > 0) flushParagraph()
  if (listBuffer) flushList()

  // If no explicit sections found, create a single section with all paragraphs
  if (sections.length === 0) {
    sections.push({
      title,
      blocks: paragraphBuffer.length
        ? [{ type: "paragraph", text: paragraphBuffer.join(" ") }]
        : [],
    })
  }

  // The very first known heading duplicates the title; if so, treat first as page title.
  if (sections.length > 0 && sections[0].title === title) {
    // Keep as a section, but it's okay; the header will show the same title.
  }

  return { title, sections }
}

export default async function ArticlePage() {
  const inputPath = path.join(process.cwd(), "input.txt")
  let content = ""
  try {
    content = await fs.readFile(inputPath, "utf8")
  } catch {
    content = ""
  }

  const { title, sections } = parseArticle(content || "")
  const isEmpty = !content || content.trim().length === 0

  return (
    <main className="container px-6 py-10 space-y-10">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">{title || "Multimodal AI Article"}</h1>
          <p className="text-muted-foreground text-sm">Rendered from an input.txt file.</p>
          <p className="text-xs text-muted-foreground">Author: Ariel Wadyese x OpenAi Deep Research Mode</p>
          <Image src="/deep-research-cover.webp" alt="Hero Image" width={200} height={100} />
        </div>

        <DirectionalReveal direction="right-to-left" className="w-full sm:w-auto">


          <Button
            asChild
            variant="outline"
            className="bg-red-500 text-white w-full sm:w-auto inline-flex items-center gap-2 justify-center whitespace-nowrap px-4 py-2 sm:px-6 sm:py-3"
          >
            <Link href="/article"> <NotepadText className="w-4 h-4 fill-white stroke-purple-500" /> Go to Summary</Link>
          </Button>
        </DirectionalReveal>


      </header>

      <Separator />

      <DirectionalRevealImage src="/hero.png"  />

 


      <Card className="bg-green-500">
        <CardHeader className="text-black text-2xl">Prompt used to generate the hero image above (image was then edited in Procreate)</CardHeader>
        <CardContent>
          <p className="text-black">Generate me a Hero Image i can use for my website that explains how multimodal ai works, make it an abstract painting inspired by Jean-Michel Basquiat, coloured red green and blue, inspired by technology</p>
        </CardContent>
      </Card>


      
      {isEmpty ? (
        <Card >
          <CardHeader>
            <CardTitle>Missing content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The file is empty. Add your article text to <code>next/input.txt</code> and reload this page.
            </p>
          </CardContent>
        </Card>
      ) : (
        sections.map((section, idx) => (
          <Card className="bg-blue-500" key={idx}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.blocks.map((block, i) => {
                if (block.type === "paragraph") {
                  return <p key={i} className="leading-7">{block.text}</p>
                }
                if (block.type === "heading") {
                  return <h3 key={i} className="text-xl font-semibold">{(block as any).text}</h3>
                }
                if (block.type === "list") {
                  return (
                    <ul key={i} className="list-disc pl-6 space-y-2">
                      {block.items.map((it, k) => (
                        <li key={k}>{it}</li>
                      ))}
                    </ul>
                  )
                }
                return null
              })}
            </CardContent>
          </Card>
        ))
      )}
    </main>
  )
}
