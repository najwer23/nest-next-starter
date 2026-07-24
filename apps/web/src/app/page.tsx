import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex gap-4 mt-6 ml-6">
      <Link href="/database-gql" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        /database-gql
      </Link>

      <Link href="/database-rest" className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
        /database-rest
      </Link>
    </div>
  );
}
