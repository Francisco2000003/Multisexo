export function SkeletonCard() {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 animate-pulse">
      <div className="w-full h-40 bg-gray-200 rounded-md" />
      <div className="h-4 bg-gray-200 rounded mt-4 w-3/4" />
      <div className="h-3 bg-gray-200 rounded mt-2 w-5/6" />
      <div className="h-3 bg-gray-200 rounded mt-2 w-2/3" />
    </div>
  );
}
