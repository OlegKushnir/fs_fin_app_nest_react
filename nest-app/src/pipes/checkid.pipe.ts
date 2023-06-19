import {
  ArgumentMetadata,
  PipeTransform,
  BadRequestException,
  ParseUUIDPipe,
} from '@nestjs/common';

export class CheckAccountIdPipe extends ParseUUIDPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new BadRequestException(
          'account_id missing or has incorrect type.',
        );
      }
    }
    return value;
  }
}

export class CheckTransactionIdPipe
  extends ParseUUIDPipe
  implements PipeTransform
{
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new BadRequestException(
          'transaction_id missing or has incorrect type.',
        );
      }
    }
    return value;
  }
}
