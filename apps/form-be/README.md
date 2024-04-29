<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) 구글 설문지 RestAPI 서버

## 실행방법

npm install
npm run start:dev

## API

```bash
# PUT /question : 설문지 등록
예시 : https://google.vote24.co.kr/question
input params
  title: string / 설문지 제목
  description string / 설문지 설명
  email: string / 작성자 이메일
  questions: array // 설문지 종류 ( 배열 )
    type: number // 설문지 타입
    name: string // 설문지 문의 사항
    option: string // 선택 사항
    optionyn: boolean // 필수유무

output params
  code: number / 상태코드
  message: string / 상태메시지
  time: string / API 호출 시간
  id: string / 생성된 설문지의 ID
```

```bash
  # DELETE /question : 설문지 삭제
  예시 : https://google.vote24.co.kr/question
input params
  id: number / 생성한 설문지의 id
output params
  code: number / 상태코드
  message: string / 상태메시지
  time: string / API 호출 시간
```

```bash
#GET / /question/mypaper/ + email : 내가 작성한 설문지 가져오기
예시 : https://google.vote24.co.kr/question/mypaper/signkj8841@naver.com

output params
  code: number / 상태코드
  message: string / 상태메시지
  time: string / API 호출 시간
  list: array / 설문내용
      id: number,
      title: string,
      description: string,
      email: string
```

```bash
   # GET /question + id: 설문지 정보가져오기
  예시 : https://google.vote24.co.kr/question/11
output params
  code: number / 상태코드
  message: string / 상태메시지
  time: string / API 호출 시간
  result: list: array / 설문내용
          id: number / 설문 아이디
          type: number / 설문 유형
          title: string / 설문 제목
          optionyn: boolean / 설문 옵션
          option : array
                id: number / 옵션 아이디
                name: string / 옵션 이름
```

```bash
# PUT /question/my/ + id : 설문지 작성하기
예시 : https://google.vote24.co.kr/question/my/12
  input params
    email: string / 설문한 사람의 email
    questions: array / 설문 답변
       id: number 옵션의 id
       answer: string 답변

```

```bash
# GET /question/statistics + id : 설문 통계 가져오기
예시 : https://google.vote24.co.kr/question/statistics/11

output params
  code: number / 상태코드
  message: string / 상태메시지
  time: string / API 호출 시간
  result:
        title: string 제목,
        description: string 설문지 설명,
        write_cnt: number 설문지 답변 총 수량,
          list: array / 설문내용
              id: number / 설문 아이디
              type: number / 설문 유형
              title: string / 설문 제목
              optionyn: boolean / 설문 옵션
              option : array
                  id: number / 옵션 아이디
                  name: string / 옵션 이름
```

```bash
# GET /question/statistics_list/ + id : 설문통계 리스트 가져오기
예시 https://google.vote24.co.kr/question/statistics_list/11
output params
  code: number / 상태코드
  message: string / 상태메시지
  time: string / API 호출 시간
  result:
          list: array / 설문내용
              ques_sub_id: number / 설문 옵션 아이디
              type: number / 설문 유형
              email: string / 이메일
              answer: string / 설문 내용

```

```bash
# GET /question: 설문 전체 가져오기
예시 https://google.vote24.co.kr/question
output params
  code: number / 상태코드
  message: string / 상태메시지
  time: string / API 호출 시간
  result:
          list: array / 설문내용
              id: number / 설문 아이디
              title: string / 설문 제목
              email: string / 이메일
              description: string / 설문 내용

```
