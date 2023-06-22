import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class ResponseAccountDto {
  @IsNotEmpty()
  @IsUUID()
  account_id: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;

  constructor(partial: Partial<ResponseAccountDto>) {
    Object.assign(this, partial);
  }
}

export class CreateAccountDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  constructor(partial: Partial<ResponseAccountDto>) {
    Object.assign(this, partial);
  }
}
