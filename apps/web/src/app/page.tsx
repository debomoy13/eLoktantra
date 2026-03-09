import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-black text-white p-4">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
          eLoktantra
        </h1>
        <p className="text-xl mb-12 text-gray-300">
          Empowering Indian democracy through transparency, accountability, and active civic participation.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/dashboard" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-bold text-lg transition shadow-lg shadow-indigo-500/20">
            Get Started
          </Link>
          <a href="#features" className="px-8 py-4 border border-gray-700 hover:border-gray-500 rounded-full font-bold text-lg transition">
            Learn More
          </a>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4">Transparent Candidates</h3>
          <p className="text-gray-400">Deep dive into candidate backgrounds, criminal records, and financial disclosures.</p>
        </div>
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4">Direct Reporting</h3>
          <p className="text-gray-400">Report civic issues directly to local representatives and track resolution progress.</p>
        </div>
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4">Promise Tracking</h3>
          <p className="text-gray-400">Hold leaders accountable by tracking manifestos against real-world progress.</p>
        </div>
      </div>
    </main>
  );
}
