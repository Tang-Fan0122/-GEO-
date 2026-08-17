# 语见 GEO Agent UI

这是 GEO 写作 Agent 的第一版可交互中文 UI，采用“专业编辑工作台”设计。

## 当前已完成

- 中文响应式管理后台
- 知识库文档列表（PDF / DOCX / PPTX）
- 文件上传弹窗
- 风格模板选择
- 批量任务创建弹窗
- 待审核文章与 GEO 分数
- 搜索、导航、任务暂停等界面交互
- Kimi API 状态展示

> 当前压缩包是 UI 原型。真实文件上传、知识库解析、Kimi API、数据库和后台批量任务将在下一阶段接入。

## 本地运行

1. 安装 Node.js 20 或以上版本。
2. 在项目目录运行 `npm install`。
3. 运行 `npm run dev`。
4. 浏览器打开 `http://localhost:3000`。

## 上传 GitHub

在 GitHub 新建仓库，然后把解压后的所有文件上传到仓库根目录。

## 部署 Railway

1. Railway 新建 Project。
2. 选择 `Deploy from GitHub repo`。
3. 选择刚才上传的仓库。
4. Railway 会自动执行构建与启动命令。

后续接入 Kimi 时，在 Railway Variables 中添加：

```env
MOONSHOT_API_KEY=你的密钥
MOONSHOT_BASE_URL=https://api.moonshot.cn/v1
KIMI_MODEL=kimi-k2.6
```

不要把真实 API Key 上传到 GitHub。
