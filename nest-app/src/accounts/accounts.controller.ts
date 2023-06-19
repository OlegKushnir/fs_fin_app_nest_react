import {
  Controller,
  Get,
  Param,
  // ParseUUIDPipe,
  // HttpStatus,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CheckAccountIdPipe } from 'src/pipes/checkid.pipe';

@Controller('api')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('accounts/:id')
  getAccountById(
    @Param('id', CheckAccountIdPipe)
    id: string,
  ): object {
    return this.accountsService.getAccountById(id);
  }
}
