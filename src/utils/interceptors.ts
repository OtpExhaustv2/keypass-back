import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class NumberParamsCastingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const { params } = request;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (`${value}`.match(/^[0-9]+$/)) {
          params[key] = Number(value);
        }
      });
    }
    return next.handle();
  }
}
