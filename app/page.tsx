'use client'
import { useState,  useRef } from 'react';
import Link from 'next/link';

type Message = {
  isMe: boolean;
  message: string;
}
export default function Chat() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, updateMessages] = useState<Message[]>([{
      message: "Hello, I'm your AI assistant. How can I help you?",
      isMe: false
  }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendMessage = async (e) => {
      e.preventDefault();
      const message = inputRef.current?.value || '';
      if (!message) {
        return;
      }

      updateMessages((prevState) => [...prevState, { message, isMe: true }]);

      setLoading(true);
      setError('');

      try {
          const result = await fetch('/api/read', {
              method: "POST",
              body: JSON.stringify(message)
          });
          const json = await result.json();
          if (json.error) {
              throw new Error(json.error);
          }
          updateMessages((prevState) => [...prevState, { message: json.data, isMe: false }]);
          setLoading(false);
      } catch (err: any) {
          console.log('err:', err);
          setError(err?.message || 'Something went wrong');
      } finally {
        inputRef.current!.value = '';
        setLoading(false);
      }
  };
  const renderMessage = (message: Message, index: number) => {
      if (message.isMe) {
          return (
              <div key={index.toString()} className="chat-message">
                  <div className="flex items-end justify-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                              {message.message}
                            </span>
                          </div>
                      </div>
                  </div>
              </div>
          )
      }
      return (
          <div key={index.toString()} className="chat-message">
              <div className="flex items-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                          {message.message}
                      </span>
                      </div>
                  </div>
              </div>
          </div>
      )
  }

  return (
    <main className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="flex items-end space-x-2">
                <Link href="/setup">
                    <button type="button">
                        Setup
                    </button>
                </Link>
            </div>
        </div>
        <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {messages.map(renderMessage)}
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <input
                disabled={loading}
                ref={inputRef}
                type="text"
                placeholder="Ask me anything"
                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            />
              <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                <button
                    disabled={loading}
                    onClick={handleSendMessage}
                    type="button"
                        className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                  <span className="font-bold">Send</span>
                </button>
              </div>
          </div>
            <div className="relative flex">
                {error && <span className="text-red-500">{error}</span>}
            </div>
        </div>
    </main>
  )
}
