"use client"

interface ChatAreaProps {
  className?: string
}

export default async function ChatArea({ className }: ChatAreaProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages will go here */}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask anything..."
            className="flex-1 rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
