import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Newspaper } from "lucide-react"
import DirectionalReveal from "@/components/DirectionalReveal"
import Image from "next/image"

export default function HomePage() {
  return (
    <main className="container px-6 py-10 space-y-10">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">

        <DirectionalReveal direction="left-to-right">


          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Understanding LLMs &amp; Multimodal AI</h1>
            <p className="text-muted-foreground">Generating Accurate Responses to Prompts</p>
            <p className="text-xs text-muted-foreground">Author: Ariel Wadyese x OpenAi Deep Research Mode</p>
            <Image src="/deep-research-cover.webp" alt="Hero Image" width={200} height={100} />
          </div>
        </DirectionalReveal>
        <div className="flex gap-3 w-full sm:w-auto">

          <DirectionalReveal direction="right-to-left" className="w-full sm:w-auto">

            <Button
              asChild
              className="bg-blue-500 text-white w-full sm:w-auto inline-flex items-center gap-2 justify-center whitespace-nowrap px-4 py-2 sm:px-6 sm:py-3"
            >
              <Link href="/"> <Newspaper className="w-4 h-4 fill-green-500" /> Go to main article</Link>
            </Button>

          </DirectionalReveal>
        </div>
      </header>

      <Separator />

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Large Language Models (LLMs) and newer multimodal AI systems have revolutionized how we interact with machines, producing remarkably accurate and context‑aware responses from prompts. This report gives a developer‑focused overview of: prompt processing (tokenization, embeddings, attention, transformer architecture), training and fine‑tuning (including RLHF and evaluation), mechanisms driving accuracy and relevance, the evolution from text‑only to multimodal models, and examples across text, images, audio/music, video, and code. Clear explanations and diagrams are included.
          </p>
        </CardContent>
      </Card>

      

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>Processing Text Prompts with Transformers</CardTitle>
          <CardDescription>Tokenization, Embeddings &amp; Attention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            When a user inputs a prompt, the model first performs <strong>tokenization</strong>, breaking text into tokens (words or subword units). Each token is mapped to a numeric <strong>embedding</strong> vector from an embedding table; positional information is added to preserve order. These vectors form the input to stacked Transformer layers where self‑attention contextualizes each token using information from the entire sequence.
          </p>
        </CardContent>
      </Card>



      <Image src="/processing_tokens.png" className="rounded-lg" alt="Transformer Architecture" width={1000} height={1000} />
     


     

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>Multi‑Head Self‑Attention</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Self‑attention computes relevance between all token pairs using queries, keys, and values, aggregating context with learned weights. Multiple heads in parallel capture varied relations (syntax, semantics), enabling robust long‑range reasoning and disambiguation.
          </p>
        </CardContent>
      </Card>

    
      <Image src="/multi-head.png" className="rounded-lg" alt="Transformer Architecture" width={1000} height={1000} />
   

      

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>Transformer Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The Transformer stacks blocks composed of multi‑head self‑attention and position‑wise feed‑forward networks, wrapped with residual connections and normalization for stability. Decoder‑only models (e.g., GPT) apply masked attention to generate tokens autoregressively.
          </p>
        </CardContent>
      </Card>

      
      <Image src="/decoder_transformer.png" className="rounded-lg" alt="Transformer Architecture" width={1000} height={1000} />
     

     

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>Example — Attention in Action</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Given “The programmer put the book on the table because it was old,” attention for “it” peaks at “the book,” resolving the pronoun, while later evidence (“old”) contributes context. These learned patterns enable accurate disambiguation.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>Training LLMs: From Massive Datasets to Fine‑Tuning &amp; RLHF</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p><strong>Pre‑training.</strong> Models are trained with next‑token prediction over vast corpora (e.g., web, books, Wikipedia), learning grammar, facts, and reasoning patterns without explicit labels.</p>
          <p><strong>Supervised Fine‑Tuning (SFT).</strong> Curated prompt→response pairs (often human‑written) teach instruction following, tone, and dialogue patterns.</p>
          <p><strong>RLHF.</strong> Human preference rankings train a reward model; policy optimization (e.g., PPO) steers responses toward helpfulness, harmlessness, and honesty.</p>
        </CardContent>
      </Card>


      <Image src="/rlhf.png" className="rounded-lg" alt="Transformer Architecture" width={1000} height={1000} />
 

     

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>Model Evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Automated metrics (e.g., perplexity) assess language modeling quality, while human evaluation, red‑teaming, and domain benchmarks probe helpfulness, correctness, coherence, and safety. Feedback‑driven iteration targets failure modes (e.g., hallucinations) with additional tuning or data.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>How LLMs Achieve Accuracy &amp; Relevance</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Attention &amp; Long Context:</strong> Integrates distant details across long prompts and multi‑turn chats.</li>
            <li><strong>Scale:</strong> Larger parameter counts and data improve generalization and factual coverage.</li>
            <li><strong>Data Quality &amp; Diversity:</strong> Curated corpora reduce gaps, bias, and drift.</li>
            <li><strong>SFT &amp; RLHF:</strong> Optimize for human‑preferred answers and on‑topic behavior.</li>
            <li><strong>Continuous Evaluation:</strong> Iterative updates close capability gaps.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>From Unimodal to Multimodal</CardTitle>
          <CardDescription>Integrating Text, Images, Audio, and More</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Transformers generalize beyond text by tokenizing non‑text modalities: image patches (ViT), audio frames/spectrograms, and video spatio‑temporal tokens. The same attention machinery models relationships across these token sequences.
          </p>
        </CardContent>
      </Card>

      <Image src="/fusion_patterns.png" className="rounded-lg" alt="Transformer Architecture" width={1000} height={1000} />


      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>Multimodal Fusion Architectures</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Separate Encoders &amp; Late Fusion (e.g., CLIP):</strong> Modality‑specific encoders produce embeddings that are aligned/combined.</li>
            <li><strong>Unified Multimodal Transformer:</strong> Serialized mixed tokens (image patches + text) enable early fusion and cross‑modal attention.</li>
            <li><strong>Cross‑Attention (Encoder→Decoder):</strong> One modality conditions generation in another (e.g., image captioning, text‑to‑image).</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>Capabilities of Multimodal Systems</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Capabilities include image description, VQA, text→image generation, ASR and TTS, grounding for robots, and cross‑modal transfer (e.g., describe a diagram, answer a spoken question, and return a textual rationale).
          </p>
        </CardContent>
      </Card>

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>Generative AI Across Modalities: Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Text→Image:</strong> DALL·E, Stable Diffusion, Imagen — diffusion models refine noise toward images consistent with text prompts.</li>
            <li><strong>Text→Music/Audio:</strong> Jukebox, MusicLM — hierarchical generation of musical/audio tokens aligned to descriptions; TTS for speech.</li>
            <li><strong>Text→Video:</strong> Make‑A‑Video, Imagen Video, Phenaki‑style approaches — short clips with learned motion dynamics.</li>
            <li><strong>Code Generation:</strong> Codex, StarCoder — NL specs to compilable/runnable code; translation across languages; IDE assistance.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>Conclusion</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            LLMs convert tokenized text into contextual representations via attention and generate answers token‑by‑token. Scale, high‑quality data, and alignment (SFT+RLHF) drive accuracy and relevance. Extending Transformers across modalities enables unified systems that read, see, listen, and generate across text, images, audio, video, and code.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-red-500">
        <CardHeader>
          <CardTitle>Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vaswani et al. (2017) — Attention Is All You Need.</li>
            <li>OpenAI model cards &amp; technical blogs — GPT‑3, Codex, DALL·E, CLIP.</li>
            <li>Google research — ViT, ViLT, MusicLM, Imagen/Video.</li>
            <li>Industry write‑ups on RLHF, evaluation, and safety.</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}


