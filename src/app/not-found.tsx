import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-grove-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-grove-900 mb-4">Page Not Found</h2>
        <p className="text-grove-600 mb-6">Could not find the requested resource.</p>
        <Link 
          href="/dashboard" 
          className="inline-block bg-grove-600 text-white px-6 py-2 rounded-lg hover:bg-grove-700 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}