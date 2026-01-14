// 自动评估引擎

export interface TestCase {
  id: string;
  input: string;
  expectedBehavior: string;
  category: 'basic' | 'edge' | 'error' | 'boundary';
  weight: number;
}

export interface EvaluationResult {
  testCase: TestCase;
  passed: boolean;
  score: number;
  feedback: string;
  details?: string;
}

export interface OverallEvaluation {
  totalScore: number;
  passed: boolean;
  functionalityScore: number;
  qualityScore: number;
  creativityScore: number;
  results: EvaluationResult[];
  summary: {
    totalTests: number;
    passedTests: number;
    failedTests: number;
  };
}

// 项目1的测试用例
export const project1TestCases: TestCase[] = [
  // 基础功能测试
  {
    id: 'basic-1',
    input: '北京今天天气怎么样？',
    expectedBehavior: '应该调用天气查询工具，返回北京的天气信息，并包含穿衣建议',
    category: 'basic',
    weight: 15
  },
  {
    id: 'basic-2',
    input: '上海明天会下雨吗？',
    expectedBehavior: '应该查询上海天气，明确回答是否下雨',
    category: 'basic',
    weight: 15
  },
  {
    id: 'basic-3',
    input: '深圳现在的温度是多少？',
    expectedBehavior: '应该查询深圳当前温度，给出具体数值',
    category: 'basic',
    weight: 10
  },
  
  // 穿衣建议测试
  {
    id: 'advice-1',
    input: '广州今天穿什么？',
    expectedBehavior: '应该查询天气并根据温度给出具体的穿衣建议',
    category: 'basic',
    weight: 15
  },
  
  // 边界情况测试
  {
    id: 'boundary-1',
    input: '火星的天气怎么样？',
    expectedBehavior: '应该识别出无效的城市名称，给出友好提示',
    category: 'boundary',
    weight: 10
  },
  {
    id: 'boundary-2',
    input: '天气',
    expectedBehavior: '应该识别出信息不完整，询问用户想查询哪个城市的天气',
    category: 'boundary',
    weight: 10
  },
  
  // 错误处理测试
  {
    id: 'error-1',
    input: '帮我订机票',
    expectedBehavior: '应该识别出非天气相关请求，礼貌地告知只能查询天气',
    category: 'error',
    weight: 15
  },
  {
    id: 'error-2',
    input: '你是谁？',
    expectedBehavior: '应该介绍自己是天气助手，引导用户询问天气',
    category: 'error',
    weight: 10
  }
];

// 模拟评估单个测试用例（实际应用中会调用真实的智能体）
export function evaluateTestCase(
  testCase: TestCase,
  agentResponse: string
): EvaluationResult {
  // 这里是模拟逻辑，实际应用中会：
  // 1. 调用用户创建的智能体
  // 2. 获取响应
  // 3. 使用规则或 LLM 判断是否符合预期
  
  const mockPassed = Math.random() > 0.3; // 模拟70%通过率
  
  return {
    testCase,
    passed: mockPassed,
    score: mockPassed ? testCase.weight : 0,
    feedback: mockPassed 
      ? '✅ 测试通过：智能体正确处理了这个请求'
      : '❌ 测试失败：智能体的回复不符合预期',
    details: mockPassed
      ? `智能体成功${testCase.expectedBehavior}`
      : `期望：${testCase.expectedBehavior}\n实际：响应不完整或不正确`
  };
}

// 运行完整评估
export function runFullEvaluation(
  agentResponses: Record<string, string>
): OverallEvaluation {
  const results: EvaluationResult[] = project1TestCases.map(testCase => {
    const response = agentResponses[testCase.id] || '';
    return evaluateTestCase(testCase, response);
  });
  
  const passedTests = results.filter(r => r.passed).length;
  const totalTests = results.length;
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  
  // 计算各维度分数
  const functionalityScore = Math.round(
    results
      .filter(r => r.testCase.category === 'basic')
      .reduce((sum, r) => sum + r.score, 0)
  );
  
  const qualityScore = Math.round(
    results
      .filter(r => ['boundary', 'error'].includes(r.testCase.category))
      .reduce((sum, r) => sum + r.score, 0)
  );
  
  const creativityScore = 0; // 需要人工或高级AI评估
  
  return {
    totalScore: Math.round(totalScore),
    passed: totalScore >= 80,
    functionalityScore,
    qualityScore,
    creativityScore,
    results,
    summary: {
      totalTests,
      passedTests,
      failedTests: totalTests - passedTests
    }
  };
}

// AI 点评生成（实际应用中会调用 LLM）
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

export function generateAIFeedback(
  evaluation: OverallEvaluation,
  version: number
): AIFeedback {
  const { totalScore, functionalityScore, qualityScore, summary } = evaluation;
  const passRate = (summary.passedTests / summary.totalTests) * 100;
  
  // 根据得分生成反馈
  const strengths: string[] = [];
  const improvements: AIFeedback['improvements'] = [];
  
  // 分析优点
  if (functionalityScore >= 40) {
    strengths.push('✨ 基础功能实现完整，能正确查询天气并给出建议');
  }
  if (qualityScore >= 25) {
    strengths.push('✨ 错误处理考虑周到，用户体验良好');
  }
  if (passRate >= 70) {
    strengths.push('✨ 测试通过率高，智能体稳定可靠');
  }
  
  // 分析改进点
  if (functionalityScore < 40) {
    improvements.push({
      issue: '基础功能不够完善',
      suggestion: '检查天气查询工具是否正确配置，提示词是否明确指示了何时使用工具',
      example: '在提示词中加入：\n"当用户询问天气时，使用天气查询工具获取数据"'
    });
  }
  
  if (qualityScore < 20) {
    improvements.push({
      issue: '错误处理不够完善',
      suggestion: '需要处理更多边界情况，如无效城市名、查询失败、非天气请求等',
      example: '在提示词末尾添加错误处理规则：\n"如果查询失败，告知用户：抱歉，暂时无法获取天气信息"'
    });
  }
  
  const failedTests = evaluation.results.filter(r => !r.passed);
  if (failedTests.length > 0) {
    const failedCategories = [...new Set(failedTests.map(r => r.testCase.category))];
    if (failedCategories.includes('basic')) {
      improvements.push({
        issue: '部分基础查询未通过',
        suggestion: '确保智能体能正确理解和响应基本的天气查询请求',
      });
    }
    if (failedCategories.includes('boundary')) {
      improvements.push({
        issue: '边界情况处理不足',
        suggestion: '考虑用户可能输入的各种特殊情况，如不完整的查询、无效的城市名等',
      });
    }
  }
  
  // 下一步建议
  const nextSteps: string[] = [];
  if (totalScore < 60) {
    nextSteps.push('🔍 仔细检查提示词，确保逻辑清晰');
    nextSteps.push('🧪 在 Coze 预览窗口多测试几个场景');
    nextSteps.push('📚 参考"操作指南"中的完整示例');
  } else if (totalScore < 80) {
    nextSteps.push('✨ 继续优化错误处理');
    nextSteps.push('🎨 让回复更加友好和个性化');
    nextSteps.push('🚀 准备尝试挑战任务');
  } else {
    nextSteps.push('🎉 太棒了！可以尝试挑战任务了');
    nextSteps.push('🔥 挑战1：添加晒被子建议功能');
    nextSteps.push('📈 或者直接进入项目2');
  }
  
  // 鼓励语
  let encouragement = '';
  if (totalScore >= 90) {
    encouragement = '🎉 太棒了！你的智能体表现优秀，已经完全掌握了基础概念！';
  } else if (totalScore >= 80) {
    encouragement = '👏 很好！你的智能体已经达标，继续保持这个节奏！';
  } else if (totalScore >= 60) {
    encouragement = '💪 不错的开始！再优化一下就能达标了，加油！';
  } else if (version >= 3) {
    encouragement = '🤗 别灰心，学习需要过程。建议先回顾一下教程，或者点击"需要帮助"获取提示。';
  } else {
    encouragement = '🌱 这是一个好的开始！每次迭代都是进步，继续尝试！';
  }
  
  return {
    strengths,
    improvements,
    nextSteps,
    encouragement
  };
}
