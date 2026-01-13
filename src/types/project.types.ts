// 项目相关类型定义

export type ProjectStatus = 'locked' | 'available' | 'in-progress' | 'completed';
export type ProjectDifficulty = 1 | 2 | 3 | 4 | 5;
export type HintLevel = 1 | 2 | 3 | 4 | 5;

// 项目配置
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  difficulty: ProjectDifficulty;
  estimatedTime: string;
  status: ProjectStatus;
  prerequisites: string[];
  learningGoals: string[];
  techStack: TechStackItem[];
  tasks: Task[];
  challenges: Challenge[];
  evaluationCriteria: EvaluationCriteria;
  meaningExplanation: string;
  rewards: Reward[];
}

// 技术栈项
export interface TechStackItem {
  name: string;
  type: 'platform' | 'framework' | 'tool' | 'pattern';
  description: string;
}

// 任务
export interface Task {
  id: string;
  title: string;
  instruction: string;
  hints: Hint[];
  autoCheck?: AutoCheckFunction;
  completed: boolean;
}

// 提示
export interface Hint {
  level: HintLevel;
  trigger: 'time_elapsed_30s' | 'time_elapsed_60s' | 'time_elapsed_120s' | 'click_help_button' | 'test_failed_3_times';
  message: string;
  example?: string;
}

// 自动检查函数类型
export type AutoCheckFunction = (userInput: unknown) => Promise<{
  passed: boolean;
  message: string;
}>;

// 挑战
export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  requirements: string[];
  hintMode: 'guided' | 'assisted' | 'autonomous';
  estimatedTime: string;
  evaluationCriteria: {
    functionality: number;
    quality: number;
    creativity: number;
  };
}

// 评估标准
export interface EvaluationCriteria {
  functionality: {
    weight: number;
    criteria: string[];
  };
  quality: {
    weight: number;
    criteria: string[];
  };
  creativity?: {
    weight: number;
    criteria: string[];
  };
  passingScore: number;
}

// 奖励
export interface Reward {
  type: 'badge' | 'xp' | 'unlock';
  name: string;
  description: string;
  icon: string;
}

// 用户进度
export interface UserProgress {
  userId: string;
  projectId: string;
  status: ProjectStatus;
  completedTasks: string[];
  currentTask?: string;
  attempts: number;
  score?: number;
  startedAt: Date;
  completedAt?: Date;
  hintsUsed: Array<{
    taskId: string;
    hintLevel: HintLevel;
    timestamp: Date;
  }>;
  testResults: TestResult[];
}

// 测试结果
export interface TestResult {
  version: number;
  timestamp: Date;
  score: number;
  passed: boolean;
  details: {
    functionality: number;
    quality: number;
    creativity?: number;
  };
  feedback: AIFeedback;
}

// AI 反馈
export interface AIFeedback {
  strengths: string[];
  improvements: Array<{
    issue: string;
    suggestion: string;
    example?: string;
  }>;
  nextSteps: string[];
  encouragement: string;
}

// 卡壳检测
export interface StuckDetection {
  isStuck: boolean;
  reason: 'idle' | 'repeated_failure' | 'scrolling_back' | 'no_progress';
  duration: number;
  suggestedHint: Hint;
}
