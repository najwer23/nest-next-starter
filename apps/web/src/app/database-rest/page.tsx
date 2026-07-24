// apps/web/app/database-rest/page.tsx
import { Grid } from './grid';

interface Row {
  id: string;
  name: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
}

const getRows = async (): Promise<Row[]> => {
  const res = await fetch('http://localhost:3001/database-rest', {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch rows: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export default async function Page() {
  const data = await getRows();

  return (
    <div className="flex gap-4 mt-6 ml-6">
      <Grid initialRows={data} />
    </div>
  );
}
