import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateTransactionDto,
  ResponseTransactionDto,
} from './dtos/transactions.dto';
import { TransactionsService } from './transactions.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { CheckTransactionIdPipe } from 'src/pipes/checkid.pipe';

@Controller('api')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly accountService: AccountsService,
  ) {}
  @Get('transactions')
  getTransactions(): Promise<ResponseTransactionDto[]> {
    return this.transactionService.getTransactions();
  }
  @Get('transactions/:id')
  getTransactionById(
    @Param('id', CheckTransactionIdPipe) id: string,
  ): Promise<ResponseTransactionDto> {
    return this.transactionService.getTransactionById(id);
  }
  @Post('transactions')
  @UsePipes(ValidationPipe)
  async createTransaction(
    @Body() body: CreateTransactionDto,
  ): Promise<ResponseTransactionDto> {
    const accountFrom = await this.accountService.checkAccount(
      body.account_from,
    );
    const accountTo = await this.accountService.checkAccount(body.account_to);
    if (!accountFrom || !accountTo)
      throw new NotFoundException('Not found! Check accounts from/to.');
    return this.transactionService.createTransaction(body);
  }
}
