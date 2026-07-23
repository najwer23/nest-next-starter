import { Controller, Get, Logger } from '@nestjs/common';

interface HealthOutput {
  status: 'ok' | 'error';
  timestamp: string;
  service: string
}

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor() {}

  @Get()
  async check(): Promise<HealthOutput> {
    this.logger.log({ message: 'GET /health' });

    return {
      service: "api-nestjs",
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
