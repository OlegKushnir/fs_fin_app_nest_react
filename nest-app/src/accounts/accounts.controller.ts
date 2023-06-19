import { Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CheckAccountIdPipe } from 'src/pipes/checkid.pipe';
import { ResponseAccountDto } from './dtos/accounts.dto';

@Controller('api')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('accounts/:id')
  getAccountById(
    @Param('id', CheckAccountIdPipe)
    id: string,
  ): Promise<ResponseAccountDto> {
    return this.accountsService.getAccountById(id);
  }
  @Get('accounts')
  getAccountsInfo(): Promise<ResponseAccountDto[]> {
    return this.accountsService.getAccountsInfo();
  }
}
