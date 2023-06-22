import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseAccountDto } from './dtos/accounts.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AccountsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAccountById(account_id: string): Promise<ResponseAccountDto> {
    const account = await this.prismaService.account.findUnique({
      where: { account_id },
    });
    if (!account) throw new NotFoundException('Account not found.');
    return new ResponseAccountDto(account);
  }

  async getAccountsInfo(): Promise<ResponseAccountDto[]> {
    const accounts = await this.prismaService.account.findMany();
    if (!accounts?.length) throw new NotFoundException('Accounts not found.');
    return accounts.map((ac) => {
      return new ResponseAccountDto(ac);
    });
  }

  async checkAccount(account_id: string): Promise<ResponseAccountDto> {
    const validUser = await this.prismaService.account.findUnique({
      where: { account_id },
    });

    if (!validUser) throw new NotFoundException('Account not found.');

    // if (!validUser) {
    //   const newAccount = {
    //     account_id,
    //     balance: 0,
    //   };
    //   await this.prismaService.account.create({
    //     data: newAccount,
    //   });
    //   return new ResponseAccountDto(newAccount);
    // }
    return new ResponseAccountDto(validUser);
  }

  async createAccount(balance = 0): Promise<ResponseAccountDto> {
    const newAccount = await this.prismaService.account.create({
      data: {
        balance,
      },
    });
    return new ResponseAccountDto(newAccount);
  }
}
