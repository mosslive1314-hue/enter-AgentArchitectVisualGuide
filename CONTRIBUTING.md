# 贡献指南

感谢你考虑为 AI 智能体学习平台做出贡献！

## 🤝 如何贡献

### 报告 Bug

如果你发现了 Bug，请：

1. 检查 [Issues](https://github.com/your-username/ai-agent-learning-platform/issues) 确认是否已被报告
2. 如果没有，创建新 Issue 并包含：
   - 清晰的标题和描述
   - 重现步骤
   - 期望行为 vs 实际行为
   - 截图（如果适用）
   - 环境信息（浏览器、操作系统等）

### 提出功能建议

我们欢迎新功能建议！请：

1. 在 [Discussions](https://github.com/your-username/ai-agent-learning-platform/discussions) 中描述你的想法
2. 说明这个功能的使用场景
3. 如果可能，提供一些实现思路

### 提交代码

1. **Fork 仓库**
   ```bash
   # 在 GitHub 页面点击 Fork 按钮
   ```

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/your-username/ai-agent-learning-platform.git
   cd ai-agent-learning-platform
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **开发**
   ```bash
   pnpm install
   pnpm dev
   ```

5. **提交更改**
   ```bash
   git add .
   git commit -m 'feat: add amazing feature'
   ```
   
   遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：
   - `feat:` 新功能
   - `fix:` Bug 修复
   - `docs:` 文档更新
   - `style:` 代码格式
   - `refactor:` 重构
   - `test:` 测试
   - `chore:` 构建工具

6. **推送到 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建 Pull Request**
   - 在 GitHub 页面创建 PR
   - 填写 PR 模板
   - 等待 Review

## 📝 代码规范

### TypeScript

- 使用 TypeScript 类型
- 避免 `any` 类型
- 导出必要的接口和类型

### React

- 使用函数组件 + Hooks
- Props 使用 TypeScript 接口定义
- 避免过度拆分组件

### 样式

- 优先使用 Tailwind CSS
- 遵循设计系统的颜色和间距
- 确保响应式设计

### 命名

- 组件：PascalCase (`MyComponent.tsx`)
- 函数/变量：camelCase (`myFunction`)
- 常量：UPPER_SNAKE_CASE (`API_KEY`)
- 文件夹：kebab-case (`my-feature`)

## 🧪 测试

```bash
# 运行 lint 检查
pnpm lint

# 构建检查
pnpm build
```

## 📖 文档

- 为复杂功能添加注释
- 更新 README.md（如果需要）
- 为新 API 编写文档

## ✅ Pull Request 检查清单

在提交 PR 前，确保：

- [ ] 代码遵循项目规范
- [ ] 通过 ESLint 检查
- [ ] 构建成功
- [ ] 功能在主流浏览器测试通过
- [ ] 更新了相关文档
- [ ] Commit 消息清晰明了

## 🤔 有问题？

- 查看 [README.md](README.md)
- 浏览 [已有 Issues](https://github.com/your-username/ai-agent-learning-platform/issues)
- 在 [Discussions](https://github.com/your-username/ai-agent-learning-platform/discussions) 提问

## 💚 行为准则

- 尊重所有贡献者
- 提供建设性反馈
- 专注于最佳技术方案
- 保持友好和专业

## 📜 许可证

通过贡献代码，你同意你的贡献将使用 MIT 许可证。

---

再次感谢你的贡献！🎉
