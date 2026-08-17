"use client";

import { useMemo, useState } from "react";

const docs = [
  { type: "PDF", name: "2026 生成式搜索行业趋势报告", meta: "86 页 · 已解析 248 个片段", tag: "行业研究" },
  { type: "PPTX", name: "语见产品能力与客户案例 V3", meta: "42 张幻灯片 · 含演讲者备注 · OCR 已开启", tag: "产品资料" },
  { type: "DOCX", name: "品牌语言规范与敏感词清单", meta: "18 页 · 已设为写作必读", tag: "品牌规范" },
  { type: "PDF", name: "B2B SaaS 客户访谈纪要合集", meta: "31 页 · 已解析 96 个片段", tag: "用户洞察" },
];

const articles = [
  { title: "GEO 不是新 SEO：品牌需要重做的三件事", score: 91, docs: 6, diff: 86 },
  { title: "如何让 AI 在回答行业问题时优先提到你的品牌？", score: 88, docs: 4, diff: 79 },
  { title: "2026 年内容团队的 AI 搜索增长清单", score: 86, docs: 5, diff: 84 },
];

const templates = [
  { icon: "✦", name: "深度行业解读", desc: "结论前置、数据密集，适合报告型长文与趋势分析。", chips: ["专业", "克制"], score: "匹配 92%" },
  { icon: "☷", name: "实操指南型", desc: "步骤清晰，穿插案例与清单，强调可执行建议。", chips: ["清晰", "实用"], score: "8 篇样稿" },
  { icon: "◌", name: "创始人观点", desc: "短句、有立场，以真实经历建立可信度与节奏感。", chips: ["真诚", "洞察"], score: "5 篇样稿" },
];

export default function Home() {
  const [section, setSection] = useState("工作台");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [modal, setModal] = useState<"upload" | "batch" | null>(null);
  const [batchRunning, setBatchRunning] = useState(true);

  const filteredDocs = useMemo(() => docs.filter((d) => `${d.name}${d.tag}`.includes(query)), [query]);
  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const nav = [
    ["⌂", "工作台"], ["▤", "批量生成", "3"], ["✦", "文章审核", "12"],
    ["▣", "知识库", "48"], ["◫", "风格模板", "6"], ["◎", "选题中心"],
    ["⌁", "GEO 表现"], ["⚙", "系统设置"],
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">语</span><div><b>语见 GEO</b><small>CONTENT STUDIO</small></div></div>
        <p className="nav-label">工作空间</p>
        {nav.map(([icon, label, count], index) => (
          <button key={label} className={`nav-item ${section === label ? "active" : ""} ${index === 3 || index === 6 ? "nav-break" : ""}`} onClick={() => { setSection(label); notify(`已切换到「${label}」`); }}>
            <span>{icon}</span>{label}{count && <i>{count}</i>}
          </button>
        ))}
        <div className="sidebar-bottom">
          <div className="usage"><div><span>Kimi 本月用量</span><b>64%</b></div><div className="usage-bar"><i /></div><small>已用 1,284 万 / 2,000 万 tokens</small></div>
          <button className="nav-item"><span>?</span>帮助与反馈</button>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="crumb">首页 / {section}<b>{section === "工作台" ? "内容生产总览" : section}</b></div>
          <label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索文章、文档或模板…" /></label>
          <button className="status" onClick={() => notify("Kimi K2.6 API 响应正常，平均延迟 1.8 秒")}><i />Kimi K2.6 · 服务正常</button>
          <button className="avatar" onClick={() => notify("个人设置将在正式版开放")}>TY</button>
        </header>

        <div className="content">
          <section className="hero">
            <div className="welcome panel">
              <div><h1>上午好，今天从哪里开始？</h1><p>知识库已同步，6 个风格模板可用。你有 12 篇文章等待审核。</p></div>
              <div className="actions"><button className="button" onClick={() => setModal("upload")}>＋ 上传资料</button><button className="button primary" onClick={() => setModal("batch")}>✦ 创建批量任务</button></div>
            </div>
            <button className="batch-card panel" onClick={() => setBatchRunning(!batchRunning)}>
              <span>正在生成 · 任务 #B-240817</span><h3>AI 搜索优化系列</h3><p>20 篇文章 · 科技决策者 · 专业分析风格</p>
              <div className="progress"><div><i style={{ width: batchRunning ? "72%" : "70%" }} /></div><b>14 / 20</b><em>{batchRunning ? "预计 8 分钟" : "已暂停"}</em></div>
            </button>
          </section>

          <section className="dashboard-grid">
            <div className="left-column">
              <div className="panel docs-card">
                <CardHead title="知识库文档" subtitle="写作时自动检索并保留页码引用" action="管理知识库 →" onClick={() => setSection("知识库")} />
                <div className="tabs"><button className="selected">最近使用</button><button>产品资料</button><button>行业研究</button><button>案例数据</button></div>
                <div className="doc-list">
                  {filteredDocs.map((doc) => <button className="doc-row" key={doc.name} onClick={() => notify(`打开文档：${doc.name}`)}><span className={`file-icon ${doc.type.toLowerCase()}`}>{doc.type}</span><span><b>{doc.name}</b><small>{doc.meta}</small></span><em>{doc.tag}</em><i>● 可检索</i></button>)}
                  {!filteredDocs.length && <div className="empty">没有找到匹配的文档</div>}
                </div>
              </div>

              <div className="panel templates-card">
                <CardHead title="常用风格模板" subtitle="从样稿提取结构、语气与表达节奏" action="新建模仿模板 ＋" onClick={() => notify("请上传 3–10 篇代表性样稿")} />
                <div className="template-grid">{templates.map((template, index) => <button key={template.name} className={`template ${activeTemplate === index ? "selected" : ""}`} onClick={() => { setActiveTemplate(index); notify(`已选择模板：${template.name}`); }}><span className="template-icon">{template.icon}</span><b>{template.name}</b><p>{template.desc}</p><div>{template.chips.map(c => <small key={c}>{c}</small>)}<em>{template.score}</em></div></button>)}</div>
              </div>
            </div>

            <div className="right-column">
              <div className="panel review-card">
                <CardHead title="待审核文章" subtitle="已完成事实、引用与相似度检查" action="查看全部 12 篇" onClick={() => setSection("文章审核")} />
                <div className="article-list">{articles.map(article => <button className="article" key={article.title} onClick={() => notify(`进入审核：${article.title}`)}><div><b>{article.title}</b><em>GEO {article.score}</em></div><p>生成于 10:24 · 引用 {article.docs} 份知识文档</p><small>✓ 事实通过　 ✓ 结构差异 {article.diff}%　 ✓ 引用完整</small></button>)}</div>
              </div>
              <div className="panel stats-card"><CardHead title="本月生产数据" subtitle="相比上月同期" action="8 月" onClick={() => setSection("GEO 表现")} /><div className="stats"><div><span>已生成文章</span><b>126</b><small>↑ 24.8%</small></div><div><span>平均 GEO 得分</span><b>87.4</b><small>↑ 3.2 分</small></div></div><div className="trend"><span>近 7 日生成趋势</span><div>{[24,48,38,62,54,81,100].map((h,i) => <i key={i} style={{ height: `${h}%` }} />)}</div><button onClick={() => setSection("GEO 表现")}>去分析 →</button></div></div>
            </div>
          </section>
        </div>
      </main>

      {modal && <div className="modal-backdrop" onMouseDown={() => setModal(null)}><div className="modal" onMouseDown={(e) => e.stopPropagation()}><button className="close" onClick={() => setModal(null)}>×</button>{modal === "upload" ? <><span className="modal-icon">⇧</span><h2>上传知识库文档</h2><p>支持 PDF、DOCX、PPTX、Markdown、TXT 和 CSV</p><label className="dropzone"><input type="file" multiple accept=".pdf,.docx,.pptx,.md,.txt,.csv" onChange={() => { setModal(null); notify("文档已加入解析队列"); }} /><b>拖放文件到这里，或点击选择</b><small>单个文件最大 100 MB</small></label></> : <><span className="modal-icon">✦</span><h2>创建批量生成任务</h2><p>配置选题和模板后，由 Kimi 在后台持续生成。</p><label className="form-field">任务名称<input defaultValue="8 月 GEO 选题计划" /></label><label className="form-field">文章数量<select defaultValue="20"><option>10</option><option>20</option><option>50</option></select></label><button className="button primary wide" onClick={() => { setModal(null); notify("批量任务已创建，共 20 篇文章"); }}>创建并开始生成</button></>}</div></div>}
      {toast && <div className="toast">✓ {toast}</div>}
    </div>
  );
}

function CardHead({ title, subtitle, action, onClick }: { title: string; subtitle: string; action: string; onClick: () => void }) {
  return <div className="card-head"><div><h2>{title}</h2><p>{subtitle}</p></div><button onClick={onClick}>{action}</button></div>;
}
