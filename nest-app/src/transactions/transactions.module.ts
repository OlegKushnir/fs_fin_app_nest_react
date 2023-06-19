import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { AccountsModule } from 'src/accounts/accounts.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AccountsModule, PrismaModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
