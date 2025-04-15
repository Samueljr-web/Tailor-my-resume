export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-10 w-full bg-gray-300 rounded animate-pulse"
              />
            ))}
        </div>

        {/* Experience Section */}
        <div className="space-y-2">
          <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse" />
          <div className="h-10 w-full bg-gray-300 rounded animate-pulse" />
        </div>

        {/* Skills Section */}
        <div className="space-y-2">
          <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse" />
          <div className="h-10 w-full bg-gray-300 rounded animate-pulse" />
        </div>

        {/* Submit Button */}
        <div className="h-10 w-[170px] bg-gray-300 rounded animate-pulse" />
      </div>
    </div>
  );
}
