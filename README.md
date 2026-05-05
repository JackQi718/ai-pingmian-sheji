# Nebula Forge AI SaaS

AI 设计图片平台（官网 + 控制台）

## 已完成
- 官网营销页（SaaS 定位）
- JWT 注册登录（Postgres 持久化）
- 项目管理（创建 / 切换）
- 团队协作（项目成员 API）
- 图片生成与历史记录（`gpt-image-2`）

## 环境变量
见 `.env.example`。

## 启动
```bash
npm install
cp .env.example .env.local
npm run dev
```

首次调用接口会自动初始化数据库表。
