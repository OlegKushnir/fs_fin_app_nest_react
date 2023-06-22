import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  description: string;

  @IsNotEmpty()
  @IsUUID()
  account_from: string;

  @IsNotEmpty()
  @IsUUID()
  account_to: string;
}

export class ResponseTransactionDto {
  @IsNotEmpty()
  @IsUUID()
  transaction_id: string;

  @IsNotEmpty()
  @IsUUID()
  account_from: string;

  @IsNotEmpty()
  @IsUUID()
  account_to: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  created_at: Date;

  constructor(partial: Partial<ResponseTransactionDto>) {
    Object.assign(this, partial);
  }
}
