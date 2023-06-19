import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { ResponseTransactionDto } from './dtos/transactions.dto';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

interface TransactionParam {
  account_id: string;
  amount: number;
}

export const trSelect = {};

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getTransactions(): Promise<ResponseTransactionDto[]> {
    const transactions = await this.prismaService.transaction.findMany();
    if (!transactions?.length) throw new NotFoundException();
    return transactions.map((tr) => {
      return new ResponseTransactionDto(tr);
    });
  }
  async getTransactionById(
    transaction_id: string,
  ): Promise<ResponseTransactionDto> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        transaction_id,
      },
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return new ResponseTransactionDto(transaction);
  }
  async createTransaction({
    account_id,
    amount,
  }: TransactionParam): Promise<ResponseTransactionDto> {
    const newTransaction = {
      transaction_id: uuid(),
      account_id,
      amount,
      created_at: new Date(),
    };
    await this.prismaService.transaction.create({ data: newTransaction });
    const account = await this.prismaService.account.findUnique({
      where: { account_id },
    });
    const balance = account.balance + amount;
    await this.prismaService.account.update({
      where: { account_id },
      data: { balance },
    });
    return new ResponseTransactionDto(newTransaction);
  }
}
