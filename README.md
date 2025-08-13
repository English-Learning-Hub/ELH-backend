# ELH-backend
English-Learning-Hub - Backend
Đây là kho mã nguồn chứa toàn bộ phần backend cho ứng dụng English-Learning-Hub. Hệ thống được xây dựng trên nền tảng NestJS, cung cấp một bộ API mạnh mẽ, có khả năng mở rộng để quản lý người dùng, bài học, và tích hợp các tính năng AI thông minh để nâng cao trải nghiệm học tập.

✨ Tính năng nổi bật
Quản lý Bài học Toàn diện: Cung cấp các API để thực hiện đầy đủ các thao tác CRUD (Tạo, Đọc, Cập nhật, Xóa) cho các bài học, bao gồm các loại như ngữ pháp, từ vựng, đọc, viết, v.v.

Xác thực và Phân quyền: Hệ thống xác thực an toàn sử dụng JSON Web Tokens (JWT), đảm bảo chỉ những người dùng hợp lệ mới có thể truy cập và thao tác với dữ liệu.

Tải lên và Quản lý Media: Tích hợp với dịch vụ Cloudinary để xử lý việc tải lên, lưu trữ và phân phối các tài nguyên media (hình ảnh, âm thanh) một cách hiệu quả.

Trợ lý AI Thông minh (Powered by Google Gemini):

Kiểm tra Ngữ pháp: Phân tích và sửa lỗi ngữ pháp trong văn bản do người dùng cung cấp.

Tạo Bài tập Tự động: Dựa trên nội dung bài học, AI có thể tự động tạo ra các bài tập như quiz, flashcard để củng cố kiến thức.

Trích xuất Từ vựng: Tự động nhận diện và trích xuất các từ vựng quan trọng từ văn bản, kèm theo định nghĩa và ví dụ.

Tóm tắt Nội dung: Giúp người dùng nhanh chóng nắm bắt các ý chính của một bài học dài bằng cách tạo ra các bản tóm tắt ngắn gọn.

🚀 Công nghệ sử dụng
Framework: NestJS - Một framework Node.js tiến bộ để xây dựng các ứng dụng phía máy chủ hiệu quả, đáng tin cậy và có khả năng mở rộng.

Ngôn ngữ: TypeScript - Giúp xây dựng mã nguồn một cách chặt chẽ và giảm thiểu lỗi.

ORM: TypeORM - Một ORM (Object-Relational Mapper) mạnh mẽ để tương tác với cơ sở dữ liệu, hỗ trợ cả Active Record và Data Mapper patterns.

Cơ sở dữ liệu: PostgreSQL - Hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở mạnh mẽ và đáng tin cậy.

Xác thực: Passport.js với chiến lược passport-jwt.

Lưu trữ Media: Cloudinary - Nền tảng quản lý media trên đám mây.

Trí tuệ nhân tạo: Google Gemini AI - Tích hợp thông qua API để cung cấp các tính năng ngôn ngữ thông minh.

# Env
PORT=3003
NODE_ENV=development
MODE=DEV

DB_TYPE=postgres
DATABASE_DEBUG_MODE=false
DATABASE_NAME=English-Learning-Hub
DATABASE_HOST=pg-25db113a-thinhvinhp-0276.i.aivencloud.com
DATABASE_USERNAME=avnadmin
DATABASE_PASSWORD=AVNS_n2AMmGTGpk2IfKU57Ga
DATABASE_PORT=20186

JWT_SECRET_KEY=super-secret-jwt-key-for-development-only
JWT_EXPIRES_IN=7d
JWT_ISSUER=tvp

GEMINI_API_KEY=AIzaSyBCtlrf8uzTdshWOAnhKaKlz1rNkn6ioPc
OPENAI_API_KEY=sk-test-key

CLOUDINARY_CLOUD_NAME=test-cloud
CLOUDINARY_API_KEY=test-key
CLOUDINARY_API_SECRET=test-secret

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
