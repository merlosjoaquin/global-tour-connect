'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send, ArrowLeft, Phone, MoreVertical } from 'lucide-react'
import { MOCK_PROFILES } from '@/lib/mock-data'

interface ChatMessage {
  id: string
  senderId: string
  content: string
  timestamp: string
  isMe: boolean
}

const MOCK_CONVERSATIONS = [
  {
    id: 'conv-1',
    hostId: 'host-1',
    bookingId: 'bk-demo-1',
    lastMessage: 'Perfecto, nos vemos manana en el Zocalo!',
    lastMessageTime: '10:30',
    unread: 1,
  },
  {
    id: 'conv-2',
    hostId: 'host-5',
    bookingId: 'bk-demo-2',
    lastMessage: 'Gracias por la resena! Fue un placer.',
    lastMessageTime: 'Ayer',
    unread: 0,
  },
]

const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-1': [
    { id: 'm1', senderId: 'host-1', content: 'Hola! Gracias por reservar el tour por el Centro Historico.', timestamp: '10:00', isMe: false },
    { id: 'm2', senderId: 'current-user', content: 'Hola Carlos! Estoy muy emocionado. A que hora exacta nos encontramos?', timestamp: '10:15', isMe: true },
    { id: 'm3', senderId: 'host-1', content: 'Te espero a las 10am frente a la Catedral Metropolitana. Voy a llevar una gorra roja para que me identifiques.', timestamp: '10:20', isMe: false },
    { id: 'm4', senderId: 'current-user', content: 'Genial, ahi estare!', timestamp: '10:25', isMe: true },
    { id: 'm5', senderId: 'host-1', content: 'Perfecto, nos vemos manana en el Zocalo!', timestamp: '10:30', isMe: false },
  ],
  'conv-2': [
    { id: 'm6', senderId: 'host-5', content: 'Espero que hayas disfrutado la cena con vista a la Torre Eiffel!', timestamp: '20:00', isMe: false },
    { id: 'm7', senderId: 'current-user', content: 'Fue increible Pierre! La mejor mesa de toda Paris.', timestamp: '20:10', isMe: true },
    { id: 'm8', senderId: 'host-5', content: 'Gracias por la resena! Fue un placer.', timestamp: '20:15', isMe: false },
  ],
}

export default function ChatPage() {
  const [activeConv, setActiveConv] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(MOCK_MESSAGES)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConv, messages])

  function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim() || !activeConv) return

    const msg: ChatMessage = {
      id: `m-${Date.now()}`,
      senderId: 'current-user',
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    }

    setMessages(prev => ({
      ...prev,
      [activeConv]: [...(prev[activeConv] || []), msg],
    }))
    setNewMessage('')

    // Simulate reply
    setTimeout(() => {
      const conv = MOCK_CONVERSATIONS.find(c => c.id === activeConv)
      const host = MOCK_PROFILES.find(p => p.id === conv?.hostId)
      const reply: ChatMessage = {
        id: `m-reply-${Date.now()}`,
        senderId: conv?.hostId || '',
        content: `${host?.full_name || 'Anfitrion'}: Recibido! Te respondere pronto.`,
        timestamp: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
      }
      setMessages(prev => ({
        ...prev,
        [activeConv]: [...(prev[activeConv] || []), reply],
      }))
    }, 1500)
  }

  // Chat detail view
  if (activeConv) {
    const conv = MOCK_CONVERSATIONS.find(c => c.id === activeConv)!
    const host = MOCK_PROFILES.find(p => p.id === conv.hostId)!
    const convMessages = messages[activeConv] || []

    return (
      <div className="flex flex-col h-[calc(100dvh-8rem)] max-w-lg mx-auto">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b bg-background">
          <button onClick={() => setActiveConv(null)}>
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Avatar className="h-9 w-9">
            <AvatarImage src={host.avatar_url || ''} />
            <AvatarFallback>{host.full_name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{host.full_name}</p>
            <p className="text-xs text-green-600">En linea</p>
          </div>
          <button className="p-2"><Phone className="h-4 w-4 text-muted-foreground" /></button>
          <button className="p-2"><MoreVertical className="h-4 w-4 text-muted-foreground" /></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-muted/30">
          {convMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-3xl px-4 py-2.5 text-sm ${
                  msg.isMe
                    ? 'bg-teal-700 text-white rounded-br-lg'
                    : 'bg-background border rounded-bl-lg'
                }`}
              >
                <p>{msg.content}</p>
                <p className={`text-[10px] mt-1 ${msg.isMe ? 'text-white/60' : 'text-muted-foreground'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="flex items-center gap-2 px-4 py-3 border-t bg-background">
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 rounded-full"
            autoFocus
          />
          <Button type="submit" size="icon" className="bg-teal-700 hover:bg-teal-600 rounded-full" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    )
  }

  // Conversation list view
  return (
    <div className="max-w-lg mx-auto">
      {MOCK_CONVERSATIONS.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Send className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="font-medium">Sin mensajes</p>
          <p className="text-sm text-muted-foreground mt-1">
            Tus conversaciones con anfitriones apareceran aqui
          </p>
        </div>
      ) : (
        <div className="divide-y">
          {MOCK_CONVERSATIONS.map(conv => {
            const host = MOCK_PROFILES.find(p => p.id === conv.hostId)!

            return (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={host.avatar_url || ''} />
                    <AvatarFallback>{host.full_name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm truncate">{host.full_name}</p>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-700 text-white text-xs flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
