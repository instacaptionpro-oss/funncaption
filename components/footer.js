import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">FunCaption</h3>
            <p className="text-gray-600 text-sm">
              AI-powered Instagram captions with regional vibes. Made with ❤️ for creators.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="mailto:support@funcaption.space" className="hover:text-primary">support@funcaption.space</a></li>
              <li><Link href="/contact" className="hover:text-primary">Help Center</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t text-center text-gray-600 text-sm">
          <p>&copy; 2024 FunCaption. All rights reserved.</p>
          <p className="mt-2">Built for creators who set trends, not follow them. 🚀</p>
        </div>
      </div>
    </footer>
  )
}
