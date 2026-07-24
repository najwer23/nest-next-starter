import { Injectable } from '@nestjs/common';

export interface DatabaseGQL {
  id: string;
  name: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
}

@Injectable()
export class DatabaseRestService {
  private rows: DatabaseGQL[] = [
    { id: '1', name: 'Acme Corp', reviewedAt: null, reviewedBy: null },
    { id: '2', name: 'Globex Inc', reviewedAt: null, reviewedBy: null },
    { id: '3', name: 'Initech', reviewedAt: null, reviewedBy: null },
  ];

  findAll(): DatabaseGQL[] {
    return this.rows;
  }

  findOne(id: string): DatabaseGQL | undefined {
    return this.rows.find((row) => row.id === id);
  }

  markReviewed(id: string, userEmail: string): DatabaseGQL {
    const row = this.rows.find((r) => r.id === id);
    if (!row) throw new Error(`Row ${id} not found`);
    row.reviewedAt = new Date().toISOString();
    row.reviewedBy = userEmail;
    return row;
  }
}
