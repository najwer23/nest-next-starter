import { Grid } from './grid';

const getRows = async () => {
  const res = await fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {
    databaseGQL {
      id
      name
      reviewedAt
      reviewedBy
    }
  }`,
    }),
    cache: 'no-store',
  });
  const { data } = await res.json();

  return data.databaseGQL;
};

export default async function Page() {
  const data = await getRows();

  return (
    <div className="flex gap-4 mt-6 ml-6">
      <Grid initialRows={data} />
    </div>
  );
}
