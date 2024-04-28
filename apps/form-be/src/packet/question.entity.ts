import { Column, Entity } from 'typeorm';
import { BaseAutoEntity } from './entity/baseAuto.entity';

@Entity('question_main')
export class QuestionMain extends BaseAutoEntity {
  @Column({ default: '', length: 50, comment: '설문지제목' })
  title: string;
  @Column({ default: '', length: 100, comment: '설명' })
  description: string;
  @Column({ default: 0, comment: '질문수량' })
  ques_cnt: number;
  @Column({ default: 0, comment: '응답수량' })
  recv_cnt: number;
  @Column({ default: '', comment: '생성자' })
  email: string;
  @Column({ default: 0, comment: '설문참여인원' })
  write_cnt: number;
  @Column({ default: '', comment: 'url' })
  url: string;
  @Column({ default: '', comment: '비밀번호' })
  password: string;
}

@Entity('question')
export class Question extends BaseAutoEntity {
  @Column({ default: 0, comment: '설문 메인의 id' })
  qmain_id: number;
  @Column({ default: 1, comment: '1.단답형, 2.객관식, 3.체크박스' })
  type: number;
  @Column({ default: '', comment: '설문지제목' })
  title: string;
  @Column({ default: false, comment: '필수선택유무' })
  optionyn: boolean;
  // @Column({ default: 0, comment: '설문참여인원' })
  // write_cnt: number;
}

@Entity('question_option')
export class QuestionOption extends BaseAutoEntity {
  @Column({ default: 0, comment: 'id' })
  ques_id: number;
  @Column({ default: '', comment: '옵션이름' })
  name: string;
  @Column({ default: 0, comment: '결과' })
  choice: number;
}

@Entity('question_recv')
export class QuestionRecv extends BaseAutoEntity {
  @Column({ default: 0, comment: '질문id' })
  ques_id: number;
  @Column({ default: 0, comment: '하위질문id' })
  ques_sub_id: number;
  @Column({ default: '', comment: '생성자' })
  email: string;
  @Column({ default: '', comment: '응답' })
  answer: string;
}

@Entity('taesung_data')
export class TaesungData extends BaseAutoEntity {
  @Column({ default: '', comment: '제목' })
  title: string;
  @Column({ default: '', comment: '이름' })
  name: string;
  @Column({ default: '', comment: '이름' })
  itycl: string;
  @Column({ default: '', comment: '' })
  p1: string;
  @Column({ default: '', comment: '' })
  p2: string;
  @Column({ default: '', comment: '' })
  p3: string;
  @Column({ default: '', comment: '' })
  p4: string;
  @Column({ default: '', comment: '' })
  p5: string;
  @Column({ default: '', comment: '' })
  p6: string;
  @Column({ default: '', comment: '' })
  p7: string;
  @Column({ default: '', comment: '' })
  p8: string;
  @Column({ default: '', comment: '' })
  p9: string;
  @Column({ default: '', comment: '' })
  p10: string;
}