import { Controller, Get, Param, Req, Query, Logger, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, ApiParam, ApiOperation } from '@nestjs/swagger';
import * as Joi from 'joi';
import { Request } from 'express';

import { Response, ResponseMessage } from '../util/response.util';
import { TestService } from './test.service';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly testServie: TestService){}

  @ApiParam({ name: 'id' })
  @ApiOperation({ description: 'Test Get Path Param'})
  @ApiResponse({status:  HttpStatus.OK, description: 'Ok', type: Response})
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
  @ApiQuery({ name: 'id'})
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
