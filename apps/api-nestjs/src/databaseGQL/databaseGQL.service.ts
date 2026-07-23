import { Injectable } from '@nestjs/common';
import { DatabaseGQL } from './databaseGQL.model';

@Injectable()
export class DatabaseGQLService {
  private rows: DatabaseGQL[] = [
    { id: '1', name: 'Acme Corp', reviewedAt: null, reviewedBy: null },
    { id: '2', name: 'Globex Inc', reviewedAt: null, reviewedBy: null },
    { id: '3', name: 'Initech', reviewedAt: null, reviewedBy: null },
  ];

  findAll() {
    return this.rows;
  }

  markReviewed(rowId: string) {
    const row = this.rows.find((r) => r.id === rowId);

    if (!row) throw new Error('Row not found');

    row.reviewedAt = new Date().toISOString();
    row.reviewedBy = 'demo@user.com';

    return row;
  }
}
