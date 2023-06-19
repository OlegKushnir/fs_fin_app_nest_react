import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseAccountDto } from './dtos/accounts.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAccountById(account_id: string) {
    const account = await this.prismaService.account.findUnique({
      where: { account_id },
    });
    if (!account) throw new NotFoundException('Account not found.');
    return new ResponseAccountDto(account);
  }

  async checkAccount(account_id: string): Promise<ResponseAccountDto> {
    const validUser = await this.prismaService.account.findUnique({
      where: { account_id },
    });

    if (!validUser) {
      const newAccount = {
        account_id,
        balance: 0,
      };
      await this.prismaService.account.create({
        data: newAccount,
      });
      return new ResponseAccountDto(newAccount);
    }
    return new ResponseAccountDto(validUser);
  }
}
