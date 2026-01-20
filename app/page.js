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
      <div className="flex flex-col items-center justify-center px-4 py-30">
        {/* Form */}
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

          {error && <p className="mt-4 text-center text-red-600">{error}</p>}

          <p className="mt-6 text-center text-sm text-gray-500">Supports GitHub Repositories</p>
        </div>

        {/* Generated README */}
        {readme && (
          <div className="w-full max-w-2xl mt-12 mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* Header */}
              <div className="bg-black px-8 py-6">
                <h2 className="text-2xl font-bold text-white">Generated README.md</h2>
                <p className="text-gray-300 text-sm mt-1">Your repository documentation is ready</p>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6 overflow-auto max-h-96">
                  <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap break-words">
                    {readme}
                  </pre>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(readme)
                      alert("README copied to clipboard!")
                    }}
                    className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                  </button>

                  <button
                    onClick={() => {
                      const blob = new Blob([readme], { type: "text/markdown" })
                      const link = document.createElement("a")
                      link.href = URL.createObjectURL(blob)
                      link.download = "README.md"
                      link.click()
                    }}
                    className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download README.md
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
