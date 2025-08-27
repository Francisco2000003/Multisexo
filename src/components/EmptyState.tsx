export default function EmptyState({text}:{text:string}) {
  return (
    <div className="text-center text-gray-500 py-16">
      <p>{text}</p>
    </div>
  );
}
