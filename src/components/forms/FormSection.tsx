export default function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-gray-300 rounded-xl px-8 py-10 mb-16 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
