export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
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
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
      />
    </div>
  );
}
