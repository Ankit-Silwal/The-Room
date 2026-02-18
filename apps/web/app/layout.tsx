export const metadata = {
  title: "The Room",
  description: "WebSocket Chat Practice"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
})
{
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
