// apps/web/app/database-rest/actions.ts
'use server';
import { revalidatePath } from 'next/cache';

export async function markReviewed(rowId: string) {
  const res = await fetch(`http://localhost:3001/database-rest/${rowId}/review`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error(`Failed to mark reviewed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  revalidatePath('/database-rest');
  return data;
}
