import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

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
