export default function FormTextarea({
  label,
  name,
  value,
  onChange,
}: {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
      />
    </div>
  );
}
