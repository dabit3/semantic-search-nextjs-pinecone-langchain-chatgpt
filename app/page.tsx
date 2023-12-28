'use client'
import {
  useState
} from 'react'
import { Button } from '@/components/ui/button'
import { PieChartIcon } from '@radix-ui/react-icons'

export default function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
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
  async function sendQuery() {
    if (!query) return
    setResult('')
    setLoading(true)
    try {
      const result = await fetch('/api/read', {
        method: "POST",
        body: JSON.stringify(query)
      })
      const json = await result.json()
      setResult(json.data)
      setLoading(false)
    } catch (err) {
      console.log('err:', err)
      setLoading(false)
    }
  }
  return (
    <main className="flex flex-1 flex-col justify-center items-center p-24">
      <p
        className='text-xl font-medium'
      >
      Langchain, Pinecone, and GPT with Next.js
      </p>
      <input
      className='
      mt-3
      rounded border w-[400px]
      text-black px-2 py-1' onChange={e => setQuery(e.target.value)} />
      <Button
      className='w-[400px] mt-3'
      onClick={sendQuery}>Ask AI</Button>
      {
        loading && <PieChartIcon className='my-5 w-8 h-8 animate-spin' />
      }
      {
        result && (
          <p className='my-8 border p-4 rounded'>{result}</p>
        )
      }
      { /* consider removing this button from the UI once the embeddings are created ... */}
      <Button
      className='w-[400px] mt-2'
      variant='outline'
      onClick={createIndexAndEmbeddings}>Create index and embeddings</Button>
    </main>
  )
}
