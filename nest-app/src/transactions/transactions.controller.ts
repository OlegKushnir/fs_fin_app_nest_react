import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
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
    const account = await this.accountService.checkAccount(body.account_id);
    const newTransaction = {
      account_id: account.account_id,
      amount: body.amount,
    };
    return this.transactionService.createTransaction(newTransaction);
  }
}
