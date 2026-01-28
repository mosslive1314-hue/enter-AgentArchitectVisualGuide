# 🤖 AI 智能体学习平台

<div align="center">

一个交互式的 AI 智能体实战训练平台，通过项目驱动的方式，从零开始系统掌握智能体构建技能。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E)](https://supabase.com/)

[在线体验](https://your-demo-url.vercel.app) • [功能特性](#-核心特性) • [快速开始](#-快速开始) • [技术栈](#-技术栈)

</div>

---

## 📖 项目简介

**AI 智能体学习平台**是一个创新的在线学习系统，旨在通过**实战项目**和**即时反馈**的方式，帮助学习者从零开始掌握 AI 智能体的构建技能。

### 💡 核心理念

- **🎯 在做中学**：通过 8 个递进式实战项目，边做边学
- **⚡ 评估驱动**：先定义成功标准，实时测试反馈
- **🤝 智能助教**：AI 助手检测卡点，提供分级提示
- **🎮 游戏化学习**：成就系统、排行榜、经验值激励学习

---

## ✨ 核心特性

### 🎓 完整学习路径

8 个精心设计的项目，难度递进，覆盖从入门到生产的完整知识体系：

| 项目 | 名称 | 难度 | 技能点 |
|------|------|------|--------|
| 1️⃣ | 天气助手 | ⭐ | Tool Use、Prompt Engineering |
| 2️⃣ | 研究助手 | ⭐⭐ | 信息检索、RAG 基础 |
| 3️⃣ | 客服机器人 | ⭐⭐ | 对话管理、意图识别 |
| 4️⃣ | 代码审查 | ⭐⭐⭐ | Code Analysis、最佳实践 |
| 5️⃣ | 内容创作 | ⭐⭐⭐ | 创意生成、SEO 优化 |
| 6️⃣ | 数据分析师 | ⭐⭐⭐⭐ | 统计分析、数据洞察 |
| 7️⃣ | 个人助理 | ⭐⭐⭐⭐ | 多技能集成、主动服务 |
| 8️⃣ | 生产部署 | ⭐⭐⭐⭐⭐ | 容器化、监控告警 |

### 🚀 智能评估系统

- **真实测试**：连接你在 Coze 平台创建的智能体，进行实际测试
- **7 大测试场景**：基础功能、边界情况、错误处理全面覆盖
- **即时反馈**：AI 分析测试结果，给出改进建议
- **详细报告**：可视化展示测试结果和改进方向

### 🎮 游戏化体验

#### 成就系统
- 🏆 **8+ 精美徽章**：完成项目解锁成就
- ✨ **炫酷动画**：五彩纸屑、3D 翻转、光晕效果
- 📊 **进度追踪**：实时查看学习进度和统计

#### 社交功能
- 🏅 **三大排行榜**：经验榜、项目榜、坚持榜
- 👤 **个人主页**：展示成就和学习数据
- 📈 **学习分析**：可视化你的学习曲线
- 🔗 **一键分享**：分享你的成就到社交平台

### 🤖 智能助教

- **⏱️ 卡点检测**：30/60 秒无操作自动提示
- **💡 分级提示**：3 级提示系统，循序渐进
- **📚 知识库**：术语解释、概念说明、实例展示
- **🎯 任务指引**：清晰的步骤说明和检查清单

---

## 🛠️ 技术栈

### 前端框架
- **React 19** - 现代化 UI 库
- **TypeScript** - 类型安全
- **Vite** - 极速构建工具
- **React Router** - 路由管理

### UI 组件
- **Tailwind CSS** - 原子化 CSS 框架
- **shadcn/ui** - 高质量组件库
- **Framer Motion** - 流畅动画
- **Lucide Icons** - 精美图标库

### 后端服务
- **Supabase** - BaaS 平台
  - Authentication - 用户认证
  - PostgreSQL - 关系数据库
  - Row Level Security - 数据安全
  - Real-time - 实时更新

### 数据可视化
- **React Confetti** - 庆祝动效
- **Custom Charts** - 学习数据可视化

### 集成服务
- **Google Analytics** - 用户行为分析
- **Coze API** - 智能体测试接口

---

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/your-username/ai-agent-learning-platform.git
cd ai-agent-learning-platform

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 打开浏览器访问
# http://localhost:5173
```

### 环境配置

项目使用 Supabase 作为后端，无需额外配置环境变量。Supabase 配置已内置在代码中（使用公开的 anon key，RLS 保护数据安全）。

---

## 📁 项目结构

```
ai-agent-learning-platform/
├── src/
│   ├── components/          # React 组件
│   │   ├── evaluation/      # 评估系统组件
│   │   ├── gamification/    # 游戏化组件
│   │   ├── layout/          # 布局组件
│   │   ├── profile/         # 个人资料组件
│   │   └── ui/              # UI 基础组件 (shadcn)
│   ├── contexts/            # React Context
│   ├── data/                # 项目数据
│   │   └── projects/        # 8 个项目的完整数据
│   ├── hooks/               # 自定义 Hooks
│   ├── integrations/        # 第三方集成
│   │   └── supabase/        # Supabase 配置
│   ├── lib/                 # 工具函数
│   ├── pages/               # 页面组件
│   ├── services/            # 业务逻辑
│   │   ├── evaluationEngine.ts  # 评估引擎
│   │   └── realTestEngine.ts    # 真实测试引擎
│   └── types/               # TypeScript 类型定义
├── supabase/
│   └── migrations/          # 数据库迁移文件
├── public/                  # 静态资源
└── docs/                    # 项目文档
```

---

## 🎯 核心功能详解

### 1. 项目学习系统

每个项目包含：
- **学习目标**：明确要掌握的技能
- **技术栈**：使用的工具和平台
- **任务列表**：4-5 个核心任务
- **挑战列表**：1-2 个高级挑战
- **评估标准**：功能性、质量、创意三维度

### 2. 真实测试引擎

```typescript
// 连接用户在 Coze 创建的智能体
const testResult = await testAgentWithCoze({
  botId: 'your-bot-id',
  apiKey: 'your-api-key'
});

// 7 个测试用例
// - 3 个基础功能测试
// - 2 个边界情况测试
// - 2 个错误处理测试

// 智能评分
// 50% 功能性 + 30% 质量 + 20% 创意
```

### 3. 成就解锁动画

- **五彩纸屑**：600+ 片彩色纸屑庆祝
- **3D 效果**：卡片翻转、弹簧动画
- **光晕系统**：多层脉冲、流光扫过
- **星星粒子**：随机闪烁的装饰效果

### 4. 用户系统

- **注册/登录**：邮箱密码认证
- **个人资料**：经验值、等级、连续学习
- **成就墙**：展示所有解锁的徽章
- **学习统计**：数据可视化分析

### 5. 社交排行榜

三种排行榜维度：
- **经验排行**：总经验值排名
- **项目排行**：完成项目数量
- **坚持排行**：连续学习天数

---

## 📊 数据库设计

### 核心表结构

```sql
-- 用户进度
user_progress (
  user_id, project_id, status, score, started_at, completed_at
)

-- 任务完成
task_completions (
  user_id, project_id, task_id, completed_at
)

-- 测试结果
test_results (
  user_id, project_id, version, score, passed, feedback
)

-- 用户成就
user_achievements (
  user_id, achievement_id, unlocked_at
)

-- 用户统计
user_stats (
  user_id, total_xp, level, current_streak, longest_streak
)
```

---

## 🎨 UI 设计

### 设计系统

- **颜色方案**：HSL 色彩空间，支持深色/浅色模式
- **排版**：System fonts + 中文优化
- **间距系统**：Tailwind 标准间距
- **响应式**：完美适配手机、平板、桌面

### 动画原则

- 使用 GPU 加速属性（transform, opacity）
- 遵循缓动曲线（ease-in-out）
- 适度的动画时长（200-500ms）
- 减少不必要的重绘

---

## 🚢 部署指南

### Vercel 部署（推荐）

```bash
# 1. 安装 Vercel CLI
pnpm add -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署
vercel

# 4. 生产部署
vercel --prod
```

### Netlify 部署

```bash
# 1. 构建项目
pnpm build

# 2. 部署 dist 目录
# 在 Netlify 后台配置：
# Build command: pnpm build
# Publish directory: dist
```

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 5173
CMD ["pnpm", "preview"]
```

---

## 📝 开发指南

### 添加新项目

1. 在 `src/data/projects/index.ts` 添加项目数据
2. 定义任务、挑战、评估标准
3. 创建对应的测试用例
4. 设计成就奖励

### 创建新组件

```bash
# 使用 shadcn CLI 添加新组件
pnpm dlx shadcn-ui@latest add [component-name]
```

### 代码规范

- 使用 ESLint 进行代码检查
- 遵循 TypeScript 类型安全
- 组件采用函数式 + Hooks
- CSS 使用 Tailwind 原子类

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 贡献方式

1. **报告 Bug**：提交 Issue 描述问题
2. **功能建议**：提出新功能想法
3. **代码贡献**：Fork → 修改 → Pull Request
4. **文档改进**：完善 README 和注释

### 开发流程

```bash
# 1. Fork 并克隆仓库
git clone https://github.com/your-username/ai-agent-learning-platform.git

# 2. 创建特性分支
git checkout -b feature/amazing-feature

# 3. 提交更改
git commit -m 'feat: add amazing feature'

# 4. 推送到分支
git push origin feature/amazing-feature

# 5. 创建 Pull Request
```

### Commit 规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建/工具

---

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

---

## 🙏 致谢

### 技术栈

- [React](https://reactjs.org/) - UI 框架
- [Supabase](https://supabase.com/) - 后端服务
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - 组件库

### 灵感来源

- Anthropic 的评估驱动开发理念
- Coze 平台的智能体构建工具
- 现代在线教育平台的交互设计

---

## 📞 联系方式

- **项目主页**：[GitHub Repository](https://github.com/your-username/ai-agent-learning-platform)
- **问题反馈**：[Issues](https://github.com/your-username/ai-agent-learning-platform/issues)
- **功能建议**：[Discussions](https://github.com/your-username/ai-agent-learning-platform/discussions)

---

## 🗺️ 开发路线图

### ✅ 已完成

- [x] 8 个完整项目内容
- [x] 真实测试引擎
- [x] 成就动画系统
- [x] 用户认证
- [x] 个人资料页面
- [x] 排行榜系统
- [x] 移动端适配

### 🚧 进行中

- [ ] AI 智能助教对话
- [ ] 项目模板市场
- [ ] 学习小组功能

### 📋 计划中

- [ ] 支持更多平台（LangChain、OpenAI）
- [ ] 视频教程集成
- [ ] 证书系统
- [ ] API 开放平台

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给它一个 Star！**

Made with ❤️ by AI Agent Learning Community

[🏠 首页](https://your-demo-url.vercel.app) • [📚 文档](./docs) • [🐛 报告问题](https://github.com/your-username/ai-agent-learning-platform/issues)

</div>
