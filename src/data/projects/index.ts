import { Project } from '@/types/project.types';

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
      '学习 Prompt Engineering'
    ],
    techStack: [
      { name: 'Coze', type: 'platform', description: '零代码平台' },
      { name: '天气 API', type: 'tool', description: '查询天气' }
    ],
    tasks: [],
    challenges: [],
    evaluationCriteria: {
      functionality: { weight: 50, criteria: [] },
      quality: { weight: 30, criteria: [] },
      passingScore: 80
    },
    meaningExplanation: '你已经完成第一个智能体！',
    rewards: []
  }
];
