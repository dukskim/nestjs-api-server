import { Repository, EntityRepository } from "typeorm";
import { Test } from "../entities/test.entity";

@EntityRepository(Test)
export class TestRepository extends Repository<Test> {}