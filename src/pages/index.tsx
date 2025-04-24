import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      <h1 className="text-4xl font-semibold mb-6 tracking-tight">
        POINT BANK LTD
      </h1>
      <p className="text-lg mb-12 text-center max-w-xl">
        Please select the application form you wish to fill in and submit.
      </p>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link
          href="/form-lc"
          className="bg-black text-white text-center py-3 rounded-lg transition hover:bg-gray-800"
        >
          Apply for L/C or Standby L/C
        </Link>
        <Link
          href="/form-bg"
          className="bg-black text-white text-center py-3 rounded-lg transition hover:bg-gray-800"
        >
          Apply for Letter of Guarantee
        </Link>
      </div>
    </main>
  );
}
