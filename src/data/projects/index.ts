import { Project } from '@/types/project.types';

const simpleHintMessage = (level: number, text: string) => ({ level, trigger: 'time_elapsed_30s' as const, message: text });

export const allProjects: Project[] = [
  // 项目 1: 天气助手
  {
    id: 'project-1',
    title: '天气助手',
    subtitle: 'Hello Agent - 你的第一个智能体',
    description: '构建一个能查询天气并给出穿衣建议的智能体',
    icon: 'Cloud',
    difficulty: 1,
    estimatedTime: '45-60 分钟',
    status: 'available',
    prerequisites: [],
    learningGoals: [
      '理解 Agent 的核心组件',
      '掌握 Tool Use 基础',
      '学习 Prompt Engineering',
      '掌握错误处理'
    ],
    techStack: [
      { name: 'Coze', type: 'platform', description: '零代码平台' },
      { name: '天气 API', type: 'tool', description: '查询天气' }
    ],
    tasks: [
      {
        id: '1.1',
        title: '创建智能体',
        instruction: '在 Coze 平台中创建你的第一个智能体',
        completed: false,
        hints: [
          simpleHintMessage(1, '提示：访问 coze.cn 并登录账号'),
          simpleHintMessage(2, '找到"创建Bot"按钮'),
        ]
      },
      {
        id: '1.2',
        title: '添加天气查询工具',
        instruction: '从插件商店添加天气查询工具',
        completed: false,
        hints: [
          simpleHintMessage(1, '在左侧找到"插件"选项卡'),
        ]
      },
      {
        id: '1.3',
        title: '编写系统提示词',
        instruction: '编写提示词让智能体知道何时查天气',
        completed: false,
        hints: [
          simpleHintMessage(1, '提示词应包含：角色定义、工具使用规则、回复格式'),
        ]
      },
      {
        id: '1.4',
        title: '测试智能体',
        instruction: '在预览窗口测试各种场景',
        completed: false,
        hints: [
          simpleHintMessage(1, '测试多个城市的天气查询'),
          simpleHintMessage(2, '测试穿衣建议功能'),
        ]
      },
      {
        id: '1.5',
        title: '发布到 API',
        instruction: '将智能体发布到 API 渠道',
        completed: false,
        hints: [
          simpleHintMessage(1, '点击右上角"发布"按钮'),
          simpleHintMessage(2, '选择"API"渠道'),
        ]
      }
    ],
    challenges: [
      {
        id: 'challenge-1.1',
        title: '晒被子建议',
        description: '让助手能回答是否适合晒被子',
        difficulty: 1,
        requirements: ['判断降雨', '判断温度', '给出建议'],
        hintMode: 'guided',
        estimatedTime: '15-20 分钟',
        evaluationCriteria: { functionality: 50, quality: 30, creativity: 20 }
      },
      {
        id: 'challenge-1.2',
        title: '多日预报',
        description: '支持查询未来3天的天气预报',
        difficulty: 2,
        requirements: ['查询多日数据', '格式化展示', '趋势分析'],
        hintMode: 'minimal',
        estimatedTime: '20-30 分钟',
        evaluationCriteria: { functionality: 60, quality: 25, creativity: 15 }
      },
      {
        id: 'challenge-1.3',
        title: '智能推荐',
        description: '根据天气推荐活动',
        difficulty: 2,
        requirements: ['天气分析', '活动推荐', '个性化建议'],
        hintMode: 'none',
        estimatedTime: '30-40 分钟',
        evaluationCriteria: { functionality: 50, quality: 30, creativity: 20 }
      }
    ],
    evaluationCriteria: {
      functionality: { weight: 50, criteria: ['正确查询天气', '给出穿衣建议', '错误处理'] },
      quality: { weight: 30, criteria: ['提示词清晰', '回复自然', '用户体验好'] },
      passingScore: 70
    },
    meaningExplanation: '恭喜！你已经掌握了智能体的基础概念和工具调用机制。',
    rewards: [
      { type: 'badge', name: '智能体萌新', description: '完成第一个项目', icon: 'Sparkles' },
      { type: 'xp', name: '+500 XP', description: '经验值奖励', icon: 'Zap' }
    ]
  },

  // 项目 2: 研究助手
  {
    id: 'project-2',
    title: '研究助手',
    subtitle: '知识检索与整合',
    description: '构建一个能搜索和总结学术信息的研究助手',
    icon: 'BookOpen',
    difficulty: 2,
    estimatedTime: '90-120 分钟',
    status: 'locked',
    prerequisites: ['project-1'],
    learningGoals: [
      '掌握多工具协作',
      '学习信息检索技巧',
      '理解 RAG 基础概念',
      '掌握内容总结能力'
    ],
    techStack: [
      { name: 'Coze', type: 'platform', description: '开发平台' },
      { name: 'Search API', type: 'tool', description: '搜索引擎' },
      { name: 'Knowledge Base', type: 'tool', description: '知识库' }
    ],
    tasks: [
      {
        id: '2.1',
        title: '添加搜索工具',
        instruction: '集成网络搜索 API',
        completed: false,
        hints: [
          simpleHintMessage(1, '使用 Coze 内置的搜索插件'),
          simpleHintMessage(2, '配置搜索范围和结果数量'),
        ]
      },
      {
        id: '2.2',
        title: '创建知识库',
        instruction: '上传和索引参考文档',
        completed: false,
        hints: [
          simpleHintMessage(1, '在左侧找到"知识库"功能'),
          simpleHintMessage(2, '支持 PDF、TXT、Markdown 等格式'),
        ]
      },
      {
        id: '2.3',
        title: '设计检索策略',
        instruction: '编写提示词定义何时使用哪个工具',
        completed: false,
        hints: [
          simpleHintMessage(1, '明确搜索 vs 知识库的使用场景'),
          simpleHintMessage(2, '定义信息综合的方式'),
        ]
      },
      {
        id: '2.4',
        title: '实现内容总结',
        instruction: '让智能体能总结和提炼关键信息',
        completed: false,
        hints: [
          simpleHintMessage(1, '使用结构化的总结格式'),
          simpleHintMessage(2, '包含来源引用'),
        ]
      },
      {
        id: '2.5',
        title: '测试与优化',
        instruction: '测试不同类型的研究问题',
        completed: false,
        hints: [
          simpleHintMessage(1, '测试事实查询、概念解释、趋势分析'),
        ]
      }
    ],
    challenges: [
      {
        id: 'challenge-2.1',
        title: '多来源对比',
        description: '对比多个来源的观点',
        difficulty: 2,
        requirements: ['搜索多个来源', '提取关键观点', '对比分析'],
        hintMode: 'guided',
        estimatedTime: '30 分钟',
        evaluationCriteria: { functionality: 50, quality: 30, creativity: 20 }
      },
      {
        id: 'challenge-2.2',
        title: '学术引用',
        description: '生成符合规范的引用格式',
        difficulty: 3,
        requirements: ['提取引用信息', '格式化输出', '准确性验证'],
        hintMode: 'minimal',
        estimatedTime: '40 分钟',
        evaluationCriteria: { functionality: 60, quality: 25, creativity: 15 }
      }
    ],
    evaluationCriteria: {
      functionality: { weight: 50, criteria: ['准确检索', '有效总结', '多工具协作'] },
      quality: { weight: 30, criteria: ['信息完整', '逻辑清晰', '引用准确'] },
      passingScore: 75
    },
    meaningExplanation: '你现在能够构建复杂的信息检索系统，这是许多实用智能体的核心能力。',
    rewards: [
      { type: 'badge', name: '知识探索者', description: '掌握信息检索', icon: 'Search' },
      { type: 'xp', name: '+800 XP', description: '经验值奖励', icon: 'Zap' }
    ]
  },

  // 项目 3: 客服机器人
  {
    id: 'project-3',
    title: '客服机器人',
    subtitle: '对话管理与多轮交互',
    description: '构建一个能处理客户咨询的智能客服系统',
    icon: 'MessageSquare',
    difficulty: 2,
    estimatedTime: '90-120 分钟',
    status: 'locked',
    prerequisites: ['project-1'],
    learningGoals: [
      '掌握对话流程设计',
      '学习状态管理',
      '理解意图识别',
      '掌握情感处理'
    ],
    techStack: [
      { name: 'Coze', type: 'platform', description: '开发平台' },
      { name: 'Workflow', type: 'tool', description: '流程编排' },
      { name: 'Database', type: 'tool', description: '数据存储' }
    ],
    tasks: [
      {
        id: '3.1',
        title: '设计对话流程',
        instruction: '使用 Workflow 设计客服对话树',
        completed: false,
        hints: [
          simpleHintMessage(1, '从欢迎语开始，设计分支逻辑'),
          simpleHintMessage(2, '考虑常见问题分类'),
        ]
      },
      {
        id: '3.2',
        title: '实现意图识别',
        instruction: '让智能体理解用户的咨询意图',
        completed: false,
        hints: [
          simpleHintMessage(1, '定义常见意图类别'),
          simpleHintMessage(2, '使用示例训练意图识别'),
        ]
      },
      {
        id: '3.3',
        title: '添加知识库',
        instruction: '上传常见问题和解答',
        completed: false,
        hints: [
          simpleHintMessage(1, '整理 FAQ 文档'),
          simpleHintMessage(2, '结构化知识内容'),
        ]
      },
      {
        id: '3.4',
        title: '处理多轮对话',
        instruction: '实现上下文记忆和引用',
        completed: false,
        hints: [
          simpleHintMessage(1, '使用变量存储对话状态'),
          simpleHintMessage(2, '在提示词中引用历史信息'),
        ]
      },
      {
        id: '3.5',
        title: '转人工处理',
        instruction: '设计无法处理时的兜底策略',
        completed: false,
        hints: [
          simpleHintMessage(1, '识别超出能力范围的问题'),
          simpleHintMessage(2, '礼貌地引导到人工客服'),
        ]
      }
    ],
    challenges: [
      {
        id: 'challenge-3.1',
        title: '情绪安抚',
        description: '识别和处理客户不满情绪',
        difficulty: 3,
        requirements: ['情绪识别', '安抚话术', '问题解决'],
        hintMode: 'guided',
        estimatedTime: '40 分钟',
        evaluationCriteria: { functionality: 50, quality: 30, creativity: 20 }
      },
      {
        id: 'challenge-3.2',
        title: '工单创建',
        description: '自动提取信息并创建工单',
        difficulty: 3,
        requirements: ['信息提取', '结构化输出', 'API 调用'],
        hintMode: 'minimal',
        estimatedTime: '50 分钟',
        evaluationCriteria: { functionality: 60, quality: 25, creativity: 15 }
      }
    ],
    evaluationCriteria: {
      functionality: { weight: 50, criteria: ['意图识别准确', '多轮对话流畅', '兜底处理恰当'] },
      quality: { weight: 30, criteria: ['回复自然', '响应及时', '用户满意度高'] },
      passingScore: 75
    },
    meaningExplanation: '客服机器人是最常见的商业应用之一，你已经掌握了构建生产级对话系统的能力。',
    rewards: [
      { type: 'badge', name: '对话大师', description: '精通多轮对话', icon: 'MessagesSquare' },
      { type: 'xp', name: '+1000 XP', description: '经验值奖励', icon: 'Zap' }
    ]
  },

  // 项目 4: 代码审查助手
  {
    id: 'project-4',
    title: '代码审查助手',
    subtitle: 'Code Review Agent',
    description: '构建一个能审查代码并给出改进建议的智能助手',
    icon: 'Code',
    difficulty: 3,
    estimatedTime: '120-150 分钟',
    status: 'locked',
    prerequisites: ['project-2', 'project-3'],
    learningGoals: [
      '理解代码分析',
      '学习最佳实践检查',
      '掌握 Claude Code Analysis',
      '学习结构化反馈'
    ],
    techStack: [
      { name: 'Claude', type: 'platform', description: 'AI 模型' },
      { name: 'Code Parser', type: 'tool', description: '代码解析' },
      { name: 'GitHub API', type: 'tool', description: '代码托管' }
    ],
    tasks: [
      {
        id: '4.1',
        title: '设计审查标准',
        instruction: '定义代码审查的检查项目',
        completed: false,
        hints: [
          simpleHintMessage(1, '包含：可读性、性能、安全性、最佳实践'),
        ]
      },
      {
        id: '4.2',
        title: '实现代码解析',
        instruction: '让智能体能理解代码结构',
        completed: false,
        hints: [
          simpleHintMessage(1, '识别函数、类、变量'),
          simpleHintMessage(2, '理解代码逻辑'),
        ]
      },
      {
        id: '4.3',
        title: '生成改进建议',
        instruction: '输出结构化的审查报告',
        completed: false,
        hints: [
          simpleHintMessage(1, '按严重程度分类问题'),
          simpleHintMessage(2, '提供具体的代码示例'),
        ]
      },
      {
        id: '4.4',
        title: '集成工作流',
        instruction: '与 Git 流程集成',
        completed: false,
        hints: [
          simpleHintMessage(1, '支持 Pull Request 自动审查'),
        ]
      }
    ],
    challenges: [
      {
        id: 'challenge-4.1',
        title: '安全漏洞检测',
        description: '识别常见的安全问题',
        difficulty: 4,
        requirements: ['漏洞库匹配', '风险评估', '修复建议'],
        hintMode: 'minimal',
        estimatedTime: '60 分钟',
        evaluationCriteria: { functionality: 60, quality: 25, creativity: 15 }
      }
    ],
    evaluationCriteria: {
      functionality: { weight: 50, criteria: ['准确识别问题', '建议可行', '覆盖全面'] },
      quality: { weight: 30, criteria: ['报告清晰', '优先级合理', '示例具体'] },
      passingScore: 80
    },
    meaningExplanation: '代码审查是软件开发的关键环节，你现在能够构建专业的代码质量工具。',
    rewards: [
      { type: 'badge', name: '代码卫士', description: '精通代码审查', icon: 'Shield' },
      { type: 'xp', name: '+1200 XP', description: '经验值奖励', icon: 'Zap' }
    ]
  },

  // 项目 5: 内容创作助手
  {
    id: 'project-5',
    title: '内容创作助手',
    subtitle: 'AI Writing Assistant',
    description: '构建一个帮助创作高质量内容的智能助手',
    icon: 'PenTool',
    difficulty: 3,
    estimatedTime: '120-150 分钟',
    status: 'locked',
    prerequisites: ['project-2'],
    learningGoals: [
      '学习创意生成',
      '掌握风格迁移',
      '理解SEO优化',
      '学习多格式输出'
    ],
    techStack: [
      { name: 'GPT-4', type: 'platform', description: 'AI 模型' },
      { name: 'Web Search', type: 'tool', description: '资料搜集' },
      { name: 'Style Guide', type: 'tool', description: '风格指南' }
    ],
    tasks: [
      {
        id: '5.1',
        title: '定义创作流程',
        instruction: '设计从大纲到成文的流程',
        completed: false,
        hints: [
          simpleHintMessage(1, '包含：主题研究、大纲生成、内容撰写、优化润色'),
        ]
      },
      {
        id: '5.2',
        title: '实现多风格输出',
        instruction: '支持不同的写作风格',
        completed: false,
        hints: [
          simpleHintMessage(1, '专业、轻松、学术、营销等风格'),
        ]
      },
      {
        id: '5.3',
        title: 'SEO 优化',
        instruction: '添加关键词优化功能',
        completed: false,
        hints: [
          simpleHintMessage(1, '自然融入关键词'),
          simpleHintMessage(2, '优化标题和描述'),
        ]
      },
      {
        id: '5.4',
        title: '内容检查',
        instruction: '实现语法和原创性检查',
        completed: false,
        hints: [
          simpleHintMessage(1, '检查拼写、语法、可读性'),
        ]
      }
    ],
    challenges: [
      {
        id: 'challenge-5.1',
        title: '多语言内容',
        description: '支持多语言内容创作',
        difficulty: 3,
        requirements: ['语言检测', '翻译', '本地化'],
        hintMode: 'minimal',
        estimatedTime: '50 分钟',
        evaluationCriteria: { functionality: 55, quality: 30, creativity: 15 }
      }
    ],
    evaluationCriteria: {
      functionality: { weight: 50, criteria: ['内容相关', '结构清晰', 'SEO友好'] },
      quality: { weight: 30, criteria: ['语言流畅', '逻辑连贯', '吸引力强'] },
      passingScore: 80
    },
    meaningExplanation: '内容创作是 AI 最强大的应用之一，你已经能够构建专业的写作工具。',
    rewards: [
      { type: 'badge', name: '文字魔法师', description: '精通内容创作', icon: 'Wand2' },
      { type: 'xp', name: '+1200 XP', description: '经验值奖励', icon: 'Zap' }
    ]
  },

  // 项目 6: 数据分析师
  {
    id: 'project-6',
    title: '数据分析师',
    subtitle: 'Data Analysis Agent',
    description: '构建一个能分析数据并生成洞察的智能分析师',
    icon: 'BarChart',
    difficulty: 4,
    estimatedTime: '150-180 分钟',
    status: 'locked',
    prerequisites: ['project-4'],
    learningGoals: [
      '学习数据处理',
      '掌握统计分析',
      '理解可视化生成',
      '学习洞察提取'
    ],
    techStack: [
      { name: 'Python Code Interpreter', type: 'tool', description: '代码执行' },
      { name: 'Chart Generator', type: 'tool', description: '图表生成' },
      { name: 'Statistics Library', type: 'tool', description: '统计分析' }
    ],
    tasks: [
      {
        id: '6.1',
        title: '数据导入',
        instruction: '支持多种数据格式的导入',
        completed: false,
        hints: [
          simpleHintMessage(1, 'CSV、Excel、JSON 等格式'),
        ]
      },
      {
        id: '6.2',
        title: '探索性分析',
        instruction: '实现基础统计分析',
        completed: false,
        hints: [
          simpleHintMessage(1, '计算均值、中位数、标准差'),
          simpleHintMessage(2, '识别异常值'),
        ]
      },
      {
        id: '6.3',
        title: '可视化生成',
        instruction: '自动生成合适的图表',
        completed: false,
        hints: [
          simpleHintMessage(1, '根据数据类型选择图表'),
        ]
      },
      {
        id: '6.4',
        title: '洞察提取',
        instruction: '从数据中发现有价值的模式',
        completed: false,
        hints: [
          simpleHintMessage(1, '识别趋势、相关性、异常'),
        ]
      }
    ],
    challenges: [
      {
        id: 'challenge-6.1',
        title: '预测模型',
        description: '构建简单的预测模型',
        difficulty: 5,
        requirements: ['特征选择', '模型训练', '结果解释'],
        hintMode: 'none',
        estimatedTime: '90 分钟',
        evaluationCriteria: { functionality: 60, quality: 25, creativity: 15 }
      }
    ],
    evaluationCriteria: {
      functionality: { weight: 50, criteria: ['分析准确', '可视化清晰', '洞察有价值'] },
      quality: { weight: 30, criteria: ['报告专业', '解释清楚', '可操作性强'] },
      passingScore: 85
    },
    meaningExplanation: '数据分析是商业决策的基础，你现在能够构建智能的分析系统。',
    rewards: [
      { type: 'badge', name: '数据洞察家', description: '精通数据分析', icon: 'TrendingUp' },
      { type: 'xp', name: '+1500 XP', description: '经验值奖励', icon: 'Zap' }
    ]
  },

  // 项目 7: 个人助理
  {
    id: 'project-7',
    title: '个人助理',
    subtitle: 'Personal AI Assistant',
    description: '构建一个全能的个人AI助理',
    icon: 'Bot',
    difficulty: 4,
    estimatedTime: '180-210 分钟',
    status: 'locked',
    prerequisites: ['project-3', 'project-5'],
    learningGoals: [
      '学习多技能集成',
      '掌握个性化定制',
      '理解主动服务',
      '学习隐私保护'
    ],
    techStack: [
      { name: 'Multi-Agent System', type: 'platform', description: '多智能体' },
      { name: 'Calendar API', type: 'tool', description: '日历管理' },
      { name: 'Email API', type: 'tool', description: '邮件处理' },
      { name: 'Task Manager', type: 'tool', description: '任务管理' }
    ],
    tasks: [
      {
        id: '7.1',
        title: '技能规划',
        instruction: '设计助理的核心能力',
        completed: false,
        hints: [
          simpleHintMessage(1, '日程管理、邮件处理、任务提醒、信息查询'),
        ]
      },
      {
        id: '7.2',
        title: '多工具集成',
        instruction: '集成各种第三方服务',
        completed: false,
        hints: [
          simpleHintMessage(1, '使用 OAuth 认证'),
          simpleHintMessage(2, '测试 API 调用'),
        ]
      },
      {
        id: '7.3',
        title: '个性化学习',
        instruction: '让助理学习用户习惯',
        completed: false,
        hints: [
          simpleHintMessage(1, '记录用户偏好'),
          simpleHintMessage(2, '调整服务方式'),
        ]
      },
      {
        id: '7.4',
        title: '主动服务',
        instruction: '实现定时提醒和主动推送',
        completed: false,
        hints: [
          simpleHintMessage(1, '设置触发条件'),
          simpleHintMessage(2, '选择合适的时机'),
        ]
      }
    ],
    challenges: [
      {
        id: 'challenge-7.1',
        title: '智能会议调度',
        description: '自动协调多方会议时间',
        difficulty: 5,
        requirements: ['日历分析', '冲突检测', '最优时间推荐'],
        hintMode: 'none',
        estimatedTime: '90 分钟',
        evaluationCriteria: { functionality: 60, quality: 25, creativity: 15 }
      }
    ],
    evaluationCriteria: {
      functionality: { weight: 50, criteria: ['功能完整', '集成稳定', '响应准确'] },
      quality: { weight: 30, criteria: ['用户体验好', '个性化强', '可靠性高'] },
      passingScore: 85
    },
    meaningExplanation: '个人助理代表了 AI 应用的未来方向，你已经能够构建真正实用的 AI 系统。',
    rewards: [
      { type: 'badge', name: '全能助理', description: '构建完整AI助理', icon: 'Briefcase' },
      { type: 'xp', name: '+1800 XP', description: '经验值奖励', icon: 'Zap' }
    ]
  },

  // 项目 8: 生产部署
  {
    id: 'project-8',
    title: '生产部署',
    subtitle: 'Production Deployment',
    description: '学习如何将智能体部署到生产环境',
    icon: 'Rocket',
    difficulty: 5,
    estimatedTime: '240-300 分钟',
    status: 'locked',
    prerequisites: ['project-6', 'project-7'],
    learningGoals: [
      '学习容器化部署',
      '掌握监控告警',
      '理解性能优化',
      '学习成本控制'
    ],
    techStack: [
      { name: 'Docker', type: 'platform', description: '容器化' },
      { name: 'Kubernetes', type: 'platform', description: '编排' },
      { name: 'Prometheus', type: 'tool', description: '监控' },
      { name: 'API Gateway', type: 'tool', description: '网关' }
    ],
    tasks: [
      {
        id: '8.1',
        title: '容器化',
        instruction: '将智能体打包成 Docker 镜像',
        completed: false,
        hints: [
          simpleHintMessage(1, '编写 Dockerfile'),
          simpleHintMessage(2, '优化镜像大小'),
        ]
      },
      {
        id: '8.2',
        title: '配置管理',
        instruction: '实现环境配置分离',
        completed: false,
        hints: [
          simpleHintMessage(1, '使用环境变量'),
          simpleHintMessage(2, '管理敏感信息'),
        ]
      },
      {
        id: '8.3',
        title: '监控告警',
        instruction: '设置性能和错误监控',
        completed: false,
        hints: [
          simpleHintMessage(1, '监控 QPS、延迟、错误率'),
          simpleHintMessage(2, '设置告警阈值'),
        ]
      },
      {
        id: '8.4',
        title: '负载均衡',
        instruction: '实现高可用部署',
        completed: false,
        hints: [
          simpleHintMessage(1, '多实例部署'),
          simpleHintMessage(2, '健康检查配置'),
        ]
      },
      {
        id: '8.5',
        title: '成本优化',
        instruction: '优化 API 调用和资源使用',
        completed: false,
        hints: [
          simpleHintMessage(1, '实现缓存策略'),
          simpleHintMessage(2, '优化 Prompt 长度'),
        ]
      }
    ],
    challenges: [
      {
        id: 'challenge-8.1',
        title: '灰度发布',
        description: '实现智能体的灰度发布',
        difficulty: 5,
        requirements: ['流量控制', '版本管理', '回滚机制'],
        hintMode: 'none',
        estimatedTime: '120 分钟',
        evaluationCriteria: { functionality: 60, quality: 25, creativity: 15 }
      }
    ],
    evaluationCriteria: {
      functionality: { weight: 50, criteria: ['部署成功', '监控完善', '性能优秀'] },
      quality: { weight: 30, criteria: ['架构合理', '文档完整', '可维护性强'] },
      passingScore: 90
    },
    meaningExplanation: '恭喜！你已经完成了从入门到生产的全部学习，现在你是一名真正的智能体工程师！',
    rewards: [
      { type: 'badge', name: '项目大师', description: '完成所有项目', icon: 'Crown' },
      { type: 'badge', name: '生产专家', description: '精通生产部署', icon: 'Rocket' },
      { type: 'xp', name: '+2500 XP', description: '经验值奖励', icon: 'Zap' }
    ]
  }
];
