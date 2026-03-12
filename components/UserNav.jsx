'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Avatar from '@radix-ui/react-avatar'
import { LogOut, BookOpen } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function UserNav({ user }) {
  if (!user) {
    return (
      <Link
        href="/sign-in"
        className="text-xs font-medium text-zinc-500 hover:text-zinc-900 border border-zinc-200 rounded-lg px-3 py-1.5 hover:bg-zinc-50 transition-colors"
      >
        Sign in to save
      </Link>
    )
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-100 transition-colors outline-none">
          <Avatar.Root className="w-6 h-6 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
            {user.image ? (
              <Avatar.Image src={user.image} alt={user.name ?? ''} className="w-full h-full object-cover" />
            ) : null}
            <Avatar.Fallback className="text-[10px] font-bold text-indigo-700">
              {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? '?'}
            </Avatar.Fallback>
          </Avatar.Root>
          <span className="text-xs font-medium text-zinc-700 max-w-24 truncate">
            {user.name ?? user.email}
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="bg-white rounded-lg border border-zinc-200 shadow-md p-1 min-w-44 z-50 text-sm"
        >
          <div className="px-2 py-1.5 border-b border-zinc-100 mb-1">
            <p className="text-xs font-semibold text-zinc-900 truncate">{user.name}</p>
            <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
          </div>

          <DropdownMenu.Item asChild>
            <Link
              href="/history"
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-zinc-600 hover:bg-zinc-50 cursor-pointer outline-none text-xs"
            >
              <BookOpen size={13} />
              Meal history
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 border-t border-zinc-100" />

          <DropdownMenu.Item asChild>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-red-500 hover:bg-red-50 cursor-pointer outline-none text-xs"
            >
              <LogOut size={13} />
              Sign out
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
