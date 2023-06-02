'use client'

import Link from "next/link";

export default function Settings() {
  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch('/api/setup', {
        method: "POST"
      })
      const json = await result.json()
      console.log('result: ', json)
    } catch (err) {
      console.log('err:', err)
    }
  }
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Link href={'/'}>Back to chat</Link>
      <button onClick={createIndexAndEmbeddings}>Create index and embeddings</button>
    </main>
  )
}
