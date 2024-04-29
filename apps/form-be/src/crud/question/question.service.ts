import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Question,
  QuestionMain,
  QuestionOption,
  QuestionRecv,
} from 'src/packet/question.entity';
import { Not, Repository } from 'typeorm';
import { WriteMyDto, WriteQuestionDto } from './dto/insert-question.dto';
import { questionType } from 'src/type';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionMain)
    private readonly repoQuestionMain: Repository<QuestionMain>,
    @InjectRepository(Question)
    private readonly repoQuestion: Repository<Question>,
    @InjectRepository(QuestionOption)
    private readonly repoQuestionOption: Repository<QuestionOption>,
    @InjectRepository(QuestionRecv)
    private readonly repoQuestionRecv: Repository<QuestionRecv>,
  ) {}

  async create(dto: CreateQuestionDto) {
    const newQuestion = this.repoQuestionMain.create({
      title: dto.title,
      description: dto.description,
      ques_cnt: dto.questions.length,
      email: dto.email,
      password: dto.password,
    });
    const result = await this.repoQuestionMain.save(newQuestion);

    dto.questions.forEach(async (q) => {
      const newQ = this.repoQuestion.create({
        qmain_id: result.id,
        type: q.type,
        title: q.name,
        optionyn: q.optionyn,
      });

      const subQuestion = await this.repoQuestion.save(newQ);

      q.option.split(',').forEach(async (item) => {
        const newO = this.repoQuestionOption.create({
          ques_id: subQuestion.id,
          type: q.type,
          name: item,
        });
        await this.repoQuestionOption.save(newO);
      });
    });

    return {
      code: 200,
      message: 'success',
      time: Date(),
      id: result.id,
    };
  }

  async deleteQuestion(id: number) {
    await this.repoQuestionMain.update(id, {
      useyn: () => 'useyn = false',
    });

    return {
      code: 200,
      message: 'success',
      time: Date(),
    };
  }

  async findAll() {
    const list = await this.repoQuestionMain.find({
      select: ['id', 'email', 'title', 'description'],
      order: { createdAt: 'ASC' },
    });

    if (!list) {
      return {
        code: 404,
        message: 'not found',
        time: Date(),
        result: null,
      };
    }
    return {
      code: 200,
      message: 'success',
      time: Date(),
      result: {
        list,
      },
    };
  }

  async findOne(id: number) {
    const main = await this.repoQuestionMain.findOneBy({ id });

    if (!main) {
      return {
        code: 404,
        message: 'not found',
        time: Date(),
        result: null,
      };
    }

    const list = await this.repoQuestion
      .createQueryBuilder('p')
      .select([
        'p.id as id',
        'p.type as type',
        'p.title as title',
        'p.optionyn as optionyn',
      ])
      .where('p.qmain_id = :id', { id })
      .orderBy('p.id', 'ASC')
      .getRawMany()
      .then(async (result) => {
        return Promise.all(
          result.map(async (item) => {
            const options = await this.repoQuestionOption.find({
              select: ['id', 'name'],
              where: { ques_id: item.id },
              order: { id: 'ASC' },
            });

            return {
              ...item,
              option: options,
            };
          }),
        );
      });

    return {
      code: 200,
      message: 'success',
      time: Date(),
      result: {
        title: main.title,
        description: main.description,
        password: main.password,
        list,
      },
    };
  }

  //체크박스 형식 설문 처리
  async processCheckBox(mydto: WriteMyDto) {
    await this.repoQuestionOption
      .find({
        where: { ques_id: mydto.id },
      })
      .then((result) => {
        const checkList = mydto.answer.split(',');
        checkList.map((check) => {
          const findObject = result.find((e) => e.name.trim() === check.trim());

          if (!findObject) return;

          return this.repoQuestionOption.save({
            ...findObject,
            choice: findObject.choice + 1,
          });
        });
      });
  }

  // 객관식 형식 설문 처리
  async processRadio(mydto: WriteMyDto) {
    await this.repoQuestionOption
      .find({
        where: { ques_id: mydto.id },
      })
      .then((result) => {
        const findObject = result.find(
          (e) => e.name.trim() === mydto.answer.trim(),
        );

        if (!findObject) return;

        return this.repoQuestionOption.save({
          ...findObject,
          choice: findObject.choice + 1,
        });
      });
  }
  async writeQuestion(id: number, dto: WriteQuestionDto) {
    if (dto.questions.length <= 0) {
      return {
        code: 400,
        message: 'bad request',
        time: Date(),
        result: null,
      };
    }

    const isCheked = await this.repoQuestionRecv.findOneBy({
      ques_id: id,
      email: dto.email,
    });

    if (isCheked !== null) {
      return {
        code: 400,
        message: 'already exist',
        time: Date(),
      };
    }

    await this.repoQuestionMain.findOneBy({ id }).then((result) => {
      result.write_cnt += 1;
      this.repoQuestionMain.save(result);
    });

    dto.questions.map(async (q) => {
      const qOption = await this.repoQuestionOption.findOneBy({
        ques_id: q.id,
      });
      switch (qOption.type) {
        case questionType.단답형:
          await this.repoQuestionOption
            .findOneBy({ ques_id: q.id })
            .then(async (result) => {
              result.choice += 1;
              await this.repoQuestionOption.save(result);
            });
          break;
        case questionType.객관식:
          this.processRadio(q);
          break;
        case questionType.체크박스:
          this.processCheckBox(q);
          break;
      }

      const newQ = this.repoQuestionRecv.create({
        ques_id: id,
        ques_sub_id: q.id,
        email: dto.email,
        answer: q.answer,
        type: qOption.type,
      });
      await this.repoQuestionRecv.save(newQ);
    });

    return {
      code: 200,
      message: 'success',
      time: Date(),
    };
  }
  async getMyPaper(email: string) {
    const list = await this.repoQuestionMain.find({
      select: ['id', 'email', 'title', 'description'],
      where: { email, useyn: true },
      order: { createdAt: 'DESC' },
    });

    if (!list) {
      return {
        code: 404,
        message: 'not found',
        time: Date(),
        result: null,
      };
    }
    return {
      code: 200,
      message: 'success',
      time: Date(),
      result: {
        list,
      },
    };
  }
  // 통계
  async getStatistic(id: number) {
    const main = await this.repoQuestionMain.findOneBy({ id });

    if (!main) {
      return {
        code: 404,
        message: 'not found',
        time: Date(),
        result: null,
      };
    }

    const list = await this.repoQuestion
      .find({
        select: ['id', 'type', 'title', 'optionyn'],
        where: { qmain_id: id },
        order: { id: 'ASC' },
      })
      .then(async (result) => {
        return Promise.all(
          result.map(async (item) => {
            const options = await this.repoQuestionOption.find({
              select: ['id', 'name', 'choice'],
              where: { ques_id: item.id },
              order: { id: 'ASC' },
            });

            return {
              ...item,
              options,
            };
          }),
        );
      });

    return {
      code: 200,
      message: 'success',
      time: Date(),
      result: {
        title: main.title,
        description: main.description,
        write_cnt: main.write_cnt,
        list,
      },
    };
  }

  // 통계
  async getStatisticDiffer(id: number) {
    const main = await this.repoQuestionMain.findOneBy({ id });

    if (!main) {
      return {
        code: 404,
        message: 'not found',
        time: Date(),
        result: null,
      };
    }

    const list = await this.repoQuestion
      .find({
        select: ['id', 'type', 'title', 'optionyn'],
        where: { qmain_id: id, type: Not(1) },
        order: { id: 'ASC' },
      })
      .then(async (result) => {
        return Promise.all(
          result.map(async (item) => {
            const options = await this.repoQuestionOption.find({
              select: ['id', 'name', 'choice'],
              where: { ques_id: item.id },
              order: { id: 'ASC' },
            });

            return {
              ...item,
              options,
            };
          }),
        );
      });

    const danlist = await this.repoQuestion
      .find({
        select: ['id', 'type', 'title', 'optionyn'],
        where: { qmain_id: id, type: 1 },
        order: { id: 'ASC' },
      })
      .then(async (result) => {
        return Promise.all(
          result.map(async (item) => {
            const options = await this.repoQuestionRecv.find({
              select: ['id', 'answer'],
              where: { ques_sub_id: item.id },
              order: { id: 'ASC' },
            });

            return {
              ...item,
              options,
            };
          }),
        );
      });

    return {
      code: 200,
      message: 'success',
      time: Date(),
      result: {
        title: main.title,
        description: main.description,
        write_cnt: main.write_cnt,
        list,
        danlist,
      },
    };
  }

  // 통계리스트
  async getStatisticList(id: number) {
    const main = await this.repoQuestionRecv.find({
      select: ['type', 'ques_sub_id', 'email', 'answer'],
      where: { ques_id: id },
      order: { ques_sub_id: 'ASC' },
    });

    if (!main) {
      return {
        code: 404,
        message: 'not found',
        time: Date(),
        result: null,
      };
    }

    return {
      code: 200,
      message: 'success',
      time: Date(),
      result: {
        list: main,
      },
    };
  }
}
