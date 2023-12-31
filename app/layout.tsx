import '../styles/globals.css'
import { Inter } from 'next/font/google'
import {draftMode} from "next/headers";
import {AppStoryblokInit} from "@/utils/storyblok-init.util";

const inter = Inter({ subsets: ['latin'] })
AppStoryblokInit();
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { isEnabled } = draftMode();
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
