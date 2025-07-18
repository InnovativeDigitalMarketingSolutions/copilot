import "../styles/globals.css";
import { Inter } from "next/font/google"
import { TaskProvider } from "components/providers/task_provider"
import { MainLayout } from "components/Layout/MainLayout"
import React from "react";


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CoPilot AI OS",
  description: "Jouw AI-gedreven business dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TaskProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </TaskProvider>
      </body>
    </html>
  )
}