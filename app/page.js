"use client"

import { useState } from "react"

export default function Home() {

  const [repoUrl, setRepoUrl] = useState("")
  const [readme, setReadme] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError("")
      setReadme("")

      try {
        const res = await fetch("http://localhost:8000/generate-readme", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ repo_url: repoUrl }),
        })

        if (!res.ok) {
          throw new Error("Failed to generate README")
        }

        const data = await res.json()
        setReadme(data.readme)
      } catch (err) {
        setError("Something went wrong. Please try again.")
      } finally {
        setLoading(false)
      }
    } 

  return (
    <main className="min-h-screen bg-[#005B96] relative overflow-hidden">
    <div className="flex items-center justify-center px-4 py-30">
        <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-lg p-8 border-4 mt-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Generate README</h1>
            <p className="mt-2 text-gray-600">Enter your repository URL to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">  
            <div>
              <label htmlFor="repo-url" className="block text-sm font-medium text-gray-700 mb-2">
                Repository URL
              </label>
              <input
                id="repo-url"
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repo"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">Supports GitHub Repositories</p>
        </div>

        {readme && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Generated README.md</h2>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
              {readme}
            </pre>
          </div>
        )}

        {readme && (
          <button
            onClick={() => {
              const blob = new Blob([readme], { type: "text/markdown" })
              const link = document.createElement("a")
              link.href = URL.createObjectURL(blob)
              link.download = "README.md"
              link.click()
            }}
            className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Download README.md
          </button>
        )}

        
      </div>
    </main>
  )
}
