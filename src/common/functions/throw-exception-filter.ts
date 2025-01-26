import {
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
  
@Catch(HttpException)
export class ThrowExceptionFilter implements GqlExceptionFilter  {
  catch(exception: any, host: ArgumentsHost) {
    return new GraphQLError(exception.message, {
      extensions: {
        code: exception.name,
        status: exception.status
      }
    });
  }
}