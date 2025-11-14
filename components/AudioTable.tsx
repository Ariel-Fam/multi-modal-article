"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DownloadButton } from "@/components/DownloadButton"

const audioData = [
    {name: "1. Understanding LLMs and Multimodal AI", src: "/understanding_llms.mp3"},
    {name: "2. Processing Text Prompts with Transformers (Tokenization, Embeddings & Attention)", src: "/processing_text.mp3"},
    {name: "3. Training LLMs: From Massive Datasets to Fine-Tuning and RLHF", src: "/trainingLLms.mp3"},
    {name: "4. How LLMs Achieve Accuracy and Relevance in Responses", src: "/accuracy.mp3"},
    {name: "5. From Unimodal to Multimodal: Integrating Text, Images, Audio, and More", src: "/unimodalMultimodal.mp3"},
    {name: "6. Generative AI Across Modalities: Examples", src: "/generativeAi.mp3"},
    {name: "7. Conclusion", src: "/conclusion.mp3"},

]

export default function AudioTable() {
    return (
        <div className="w-full overflow-x-auto">
            <Table className="w-full min-w-[640px]">
                <TableCaption className="sm:hidden">Scroll horizontally to see all columns.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/2">Name</TableHead>
                        <TableHead className="w-1/4">Audio</TableHead>
                        <TableHead className="w-1/4 text-right sm:text-left">Download</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {audioData.map((audio) => (
                        <TableRow key={audio.name}>
                            <TableCell className="max-w-[260px] truncate">{audio.name}</TableCell>
                            <TableCell className="text-muted-foreground"><audio src={audio.src} controls /></TableCell>
                            <TableCell className="text-right sm:text-left">
                                <DownloadButton src={audio.src} filename={audio.name} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}