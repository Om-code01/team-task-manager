import './globals.css'

export const metadata = {
  title: 'Team Task Manager',
  description: 'Manage your team tasks efficiently',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
