import { Controller, Get, Param, Req, Query, Logger, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, ApiParam, ApiOperation, ApiBody, ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { Request, json } from 'express';

import { Response, ResponseMessage } from '../util/response.util';
import { TestService } from './test.service';
import { Test } from '../entities/test.entity';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly testServie: TestService){}

  @ApiParam({ name: 'id' })
  @ApiOperation({ description: 'Test Get Path Param'})
  @ApiResponse({status:  HttpStatus.OK, description: 'Ok', schema: {example: { code: 1, data: {id: 'aa'} }}})
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

  @ApiQuery({ name: 'id'})
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

  //@ApiBody({type: json, schema:{example: {id:'aad'}}, description:'aaa'})
  //@ApiBody({ type: Test })
  @ApiResponse({schema: {example: {id:'aa'}}})
  @Post('ptest1')
  public async ptest1(@Body() param: Test/*Map<string,object>*//*: object*/): Promise<Response> {
    console.log(param);
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
