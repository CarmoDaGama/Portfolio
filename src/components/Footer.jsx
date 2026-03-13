export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              CG
            </span>
            <span className="text-white font-semibold">Carmo Da Gama</span>
          </div>

          <p className="text-gray-500 text-sm">
            Built with{' '}
            <span className="text-blue-400">React</span> &amp;{' '}
            <span className="text-blue-400">Vite</span>
          </p>

          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Carmo Da Gama. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
