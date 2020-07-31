import { Injectable } from '@nestjs/common';
import { TestRepository/*, TestUserRepository*/ } from './test.repository';
import { Test } from '../entities/test.entity';
import { getRepository, getConnection } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class TestService {
  constructor(
    private readonly testRepository: TestRepository//,
    //private readonly testUserRepository: TestUserRepository,
  ){}

  public async getTestUsers(id: number): Promise<Test> {

    // 실제 쿼리문으로... 예제..스키마 변경이 자유롭다.
    //const testtest = await this.testRepository
    const testtest = await getRepository(Test)
      .query('SELECT * FROM `dh.kim`.`sample`');
    console.log(testtest);

    // left join 예제 .. option 의 relations 을 추가한다. (leftJoinAndSelect 역할)
    const tu = await this.testRepository.findOne({
      relations: ['user'],
      where: {
        testId : id
      }
    });
    console.log('-----------------');
    console.log(tu);
    console.log('-----------------');
    //return tu;
    
    // querybuilder join 예제.. join 된 내용이 나오지 않는다.
    // excuete로 실행하면.. select 되는 항목명이 user_*, test_* 형태로 나타난다.
    //const testUser = await getRepository(Test)
    const testUser = await this.testRepository
      .createQueryBuilder('test')
      .leftJoinAndSelect(User,'user','user.user_id = test.user_id')
      .where('test.test_id = :id ', { id: id })
      .getOne();//.execute();
    console.log(testUser);
    return testUser;
    
  }
}
