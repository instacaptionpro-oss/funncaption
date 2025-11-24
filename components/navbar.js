import Link from 'next/link'

export default function Navbar({ user }) {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80">
            FunCaption
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/pricing" className="text-gray-600 hover:text-primary transition">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary transition">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-primary">
                  Dashboard
                </Link>
                <div className="text-sm">
                  <span className="font-medium text-primary">{user.plan || 'Free'}</span>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-primary">
                  Login
                </Link>
                <Link 
                  href="/login" 
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
