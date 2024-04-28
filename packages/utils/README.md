

**NextJS**를 사용한 프로젝트의 기본적인 폴더 구조 
`기본적으로 routing 되는 부분은 app, img 등 기존 asset은 public으로 보면된다 (public은 경로 '/' 로 시작)`
### Utils
```
.
├── .dist                   # build folder
├── node_modules            # modules folder
├── src                     # static asset (img, robots, webGL source)
├── tsconfig.json           # typescript setting file
└── ...
```
### src

src를 제거하고 app 으로 대체 언더스코어 (_)를 붙이지 않으면 라우팅에 읽히므로 붙여서 작성

```
├── _components             # ui
├── _constants              # constants vailable
├── _hooks                  # custom hooks
├── _lib                    # 도메인과 상관없는 로직
├── _server                 # server action (ex prisma)
├── _types                  # 프로젝트 type 묶음
├── api                     # nextjs api routes
├── manifest                # pwa 등에 필요한 manigest file
├── (page)                  # project routes 
│   ├── [path name]                   # 라우팅
│   ├── layout.tsx                    # 라우팅
│   ├── page.tsx                      # 라우팅
│   ├── loading.tsx                   # 로딩 화면
│   └── error.tsx                     # 에러 화면
└── ...
```

기본적으로 다 ui, style, utils, http 관련 파일은 packages 에서 통합 관리 
