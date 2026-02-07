export default function ContentLoading() {
  return (
    <main className="bg-[#0d0d0d] text-white px-4 sm:px-6 md:px-12 lg:px-20 py-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading content...</p>
      </div>
    </main>
  );
}
