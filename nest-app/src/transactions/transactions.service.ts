import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
  NotImplementedException,
} from '@nestjs/common';
import { ResponseTransactionDto } from './dtos/transactions.dto';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

interface TransactionParam {
  amount: number;
  description: string;
  account_from: string;
  account_to: string;
}

export const trSelect = {};

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getTransactions(): Promise<ResponseTransactionDto[]> {
    const transactions = await this.prismaService.transaction.findMany();
    if (transactions?.length === 0) return [];
    if (!transactions) throw new NotFoundException();
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
    account_from,
    account_to,
    amount,
    description,
  }: TransactionParam): Promise<ResponseTransactionDto> {
    if (amount === 0)
      throw new NotAcceptableException('Amount should not be equel 0');
    const newTransaction = {
      transaction_id: uuid(),
      amount,
      description,
      created_at: new Date(),
      account_from,
      account_to,
    };
    try {
      const accountFrom = await this.prismaService.account.findUnique({
        where: { account_id: account_from },
      });
      const accountTo = await this.prismaService.account.findUnique({
        where: { account_id: account_to },
      });

      const balance_from = accountFrom.balance - amount;
      const balance_to = accountTo.balance + amount;
      if (balance_from < 0)
        throw new NotImplementedException(
          `Insufficient funds on account ${accountFrom.account_id}!`,
        );
      const createdTransaction = await this.prismaService.transaction.create({
        data: newTransaction,
      });

      await this.prismaService.account.update({
        where: { account_id: account_from },
        data: { balance: balance_from },
      });
      await this.prismaService.account.update({
        where: { account_id: account_to },
        data: { balance: balance_to },
      });
      return new ResponseTransactionDto(createdTransaction);
    } catch (error) {
      throw new NotImplementedException(
        `Transaction was not created. ${error.message}`,
      );
    }
  }
}
