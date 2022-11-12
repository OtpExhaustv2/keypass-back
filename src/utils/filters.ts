import { ExceptionFilter, ArgumentsHost, Catch } from '@nestjs/common';
import { NotFoundError } from '@prisma/client/runtime';
import { Response } from 'express';

@Catch(NotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response
      .status(404)
      .json({ statusCode: 404, error: exception.message });
  }
}
