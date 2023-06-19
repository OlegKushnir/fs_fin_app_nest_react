import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsUUID()
  account_id: string;
}

export class ResponseTransactionDto {
  @IsNotEmpty()
  @IsUUID()
  transaction_id: string;

  @IsNotEmpty()
  @IsUUID()
  account_id: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  created_at: Date;

  constructor(partial: Partial<ResponseTransactionDto>) {
    Object.assign(this, partial);
  }
}
