import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class MonitoringController {
  @Get('healthz')
  @HttpCode(HttpStatus.NO_CONTENT)
  getServerHealth() {}
}
