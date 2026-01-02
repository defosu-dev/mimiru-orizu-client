'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Users, Settings, Plus, Search, Hash, AtSign, Globe, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

export default function HomePage() {
  const currentUser = {
    id: '@alice:matrix.org',
    displayName: 'Alice Wonder',
    avatar: null,
  };

  const rooms = [
    { id: '1', name: '#general', type: 'channel', unread: 5 },
    { id: '2', name: '#random', type: 'channel', unread: 0 },
    { id: '3', name: '@bob:matrix.org', type: 'dm', unread: 12 },
    { id: '4', name: 'Design Team', type: 'space', unread: 0 },
    { id: '5', name: '#ui-ux', type: 'channel', unread: 2 },
  ];

  const selectedRoom = rooms[2];

  return (
    <div className="h-screen flex bg-linear-to-br from-indigo-50/30 via-white to-purple-50/30 dark:from-gray-950 dark:via-indigo-950/20 dark:to-purple-950/20">
      <TooltipProvider>
        {/* Sidebar - іконки */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-3 space-y-3 shadow-xl"
        >
          {/* Logo */}
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md mb-4">
            <span className="text-white text-xl font-bold">O</span>
          </div>

          {/* Navigation Icons */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg h-10 w-10 text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-600">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Rooms</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg h-10 w-10 text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-600">
                <Users className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">People</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg h-10 w-10 text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-600">
                <Globe className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Spaces</TooltipContent>
          </Tooltip>

          <Separator className="my-3 w-8" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg h-10 w-10 text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-600">
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>

          {/* User Avatar */}
          <div className="mt-auto mb-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-10 w-10 ring-4 ring-background shadow-md cursor-pointer">
                  <AvatarFallback className="bg-indigo-600 text-white text-sm font-medium">
                    {currentUser.displayName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex flex-col space-y-2">
                <div>
                  <p className="font-medium">{currentUser.displayName}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.id}</p>
                </div>
                <Button variant="ghost" size="sm" className="justify-start">
                  <LogOut className="h-4 w-4 mr-2" /> Log out
                </Button>
              </TooltipContent>
            </Tooltip>
          </div>
        </motion.aside>

        {/* Rooms List */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-72 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-r border-gray-200 dark:border-gray-800 flex flex-col"
        >
          {/* Search & New Chat */}
          <div className="p-3 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input placeholder="Search rooms..." className="pl-9 h-10 text-sm bg-gray-100/50 dark:bg-gray-800/50" />
            </div>
            <Button className="w-full h-10 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <Plus className="mr-2 h-4 w-4" /> New Chat
            </Button>
          </div>

          <Separator />

          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {rooms.map((room) => (
                <Button
                  key={room.id}
                  variant={room.id === selectedRoom.id ? "secondary" : "ghost"}
                  className={`w-full justify-start h-12 rounded-lg text-sm font-medium ${
                    room.id === selectedRoom.id
                      ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center w-full">
                    {room.type === 'channel' && <Hash className="h-4 w-4 mr-3 text-gray-500" />}
                    {room.type === 'dm' && <AtSign className="h-4 w-4 mr-3 text-gray-500" />}
                    {room.type === 'space' && <Globe className="h-4 w-4 mr-3 text-gray-500" />}
                    <span className="flex-1 text-left truncate">{room.name}</span>
                    {room.unread > 0 && (
                      <span className="bg-indigo-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-5">
                        {room.unread > 99 ? '99+' : room.unread}
                      </span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </motion.div>

        {/* Main Area - Welcome Screen */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 flex items-center justify-center px-8"
        >
          <div className="text-center max-w-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto bg-indigo-600 rounded-3xl flex items-center justify-center shadow-xl mb-8"
            >
              <MessageCircle className="h-14 w-14 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Welcome to Orizu
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Select a room from the sidebar or start a new conversation to begin chatting securely on Matrix.
            </p>
          </div>
        </motion.main>
      </TooltipProvider>
    </div>
  );
}