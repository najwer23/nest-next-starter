'use server';
import { revalidatePath } from 'next/cache';

export async function markReviewed(rowId: string) {
  const res = await fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation($input: MarkReviewedInput!) { markRowReviewed(input: $input) { id reviewedAt reviewedBy name} }`,
      variables: { input: { rowId } },
    }),
  });

  const { data, errors } = await res.json();

  if (errors) throw new Error(errors[0].message);

  revalidatePath('/database-gql');

  return data.markRowReviewed;
}
