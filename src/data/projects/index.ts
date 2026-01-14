import { Project } from '@/types/project.types';

const simpleHintMessage = (level: number, text: string) => ({ level, trigger: 'time_elapsed_30s' as const, message: text });

export const allProjects: Project[] = [
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
      }
    ],
    challenges: [
      {
        id: 'challenge-1',
        title: '晒被子建议',
        description: '让助手能回答是否适合晒被子',
        difficulty: 1,
        requirements: ['判断降雨', '判断温度', '给出建议'],
        hintMode: 'guided',
        estimatedTime: '15-20 分钟',
        evaluationCriteria: { functionality: 50, quality: 30, creativity: 20 }
      }
    ],
    evaluationCriteria: {
      functionality: { weight: 50, criteria: ['正确查询天气', '给出穿衣建议'] },
      quality: { weight: 30, criteria: ['提示词清晰', '错误处理完善'] },
      passingScore: 80
    },
    meaningExplanation: '你已经完成第一个智能体！',
    rewards: [
      { type: 'badge', name: '智能体萌新', description: '完成第一个项目', icon: 'Sparkles' },
      { type: 'xp', name: '+500 XP', description: '经验值奖励', icon: 'Zap' }
    ]
  }
];
