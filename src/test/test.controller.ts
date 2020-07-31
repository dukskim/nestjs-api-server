import { Controller, Get, Param, Req, Query, Logger } from '@nestjs/common';
import * as Joi from 'joi';

import { Response, ResponseMessage } from '../util/response.util';
import { TestService } from './test.service';
import { Request } from 'express';

@Controller('test')
export class TestController {
  constructor(private readonly testServie: TestService){}

  @Get('test/:id')
  public async test(@Param() params): Promise<Response> {
    console.log(params.id);
    return null;
  }

  @Get('test2/:id')
  public async test2(@Param('id') id: string): Promise<Response> {
    console.log(id);
    return null;
  }

  @Get('test3')
  public async test3(@Req() request: Request): Promise<Response> {
    console.log(request.query.id);
    return null;
  }

  @Get('test4')
  public async test4(@Query('id') id: string): Promise<Response> {
    console.log(id);
    return null;
  }

  @Get('testUsers/:id')
  public async testUsers(@Param('id') id): Promise<Response> {
    console.log(id);
    const schema = Joi.object({
      id: Joi.string().required()
    });
    const { value, error } = schema.validate({ id: id });
    if (error) {
      Logger.error(error);
      return new ResponseMessage().error(999).body('Parameter Error').build();
    }

    const testUers = await this.testServie.getTestUsers(id);
    if (!testUers) {
      return new ResponseMessage().error(999, 'get testUsers Error').build();
    }

    return new ResponseMessage().success().body(testUers).build();
  }

}
