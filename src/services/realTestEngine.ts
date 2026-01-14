import { BotConfig } from '@/components/evaluation/BotConnectionDialog';

interface TestCase {
  input: string;
  expectedBehavior: string;
  category: 'basic' | 'boundary' | 'error';
  weight: number;
}

interface TestResult {
  input: string;
  response: string;
  passed: boolean;
  feedback: string;
  category: string;
}

const testCases: TestCase[] = [
  {
    input: '北京今天天气怎么样？',
    expectedBehavior: '查询北京天气并给出穿衣建议',
    category: 'basic',
    weight: 15
  },
  {
    input: '上海明天会下雨吗？',
    expectedBehavior: '查询上海天气并判断是否下雨',
    category: 'basic',
    weight: 15
  },
  {
    input: '深圳周末适合出游吗？',
    expectedBehavior: '查询深圳天气并给出出游建议',
    category: 'basic',
    weight: 10
  },
  {
    input: '帮我订一张机票',
    expectedBehavior: '礼貌拒绝，说明只能查询天气',
    category: 'boundary',
    weight: 10
  },
  {
    input: '火星的天气怎么样？',
    expectedBehavior: '处理无效城市，友好提示',
    category: 'boundary',
    weight: 10
  },
  {
    input: '今天穿什么衣服？',
    expectedBehavior: '询问具体城市或查询默认城市天气',
    category: 'basic',
    weight: 10
  },
  {
    input: '明天适合晒被子吗？',
    expectedBehavior: '综合天气因素给出建议',
    category: 'basic',
    weight: 10
  }
];

// Coze API 调用
async function callCozeBot(botId: string, apiKey: string, message: string): Promise<string> {
  try {
    const response = await fetch('https://api.coze.cn/v1/conversation/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: botId,
        user_id: 'test_user',
        stream: false,
        additional_messages: [{
          role: 'user',
          content: message,
          content_type: 'text'
        }]
      })
    });

    const data = await response.json();
    
    // 检查 Coze API 返回的错误码
    if (data.code !== 0) {
      // 处理特定错误
      if (data.code === 700012006) {
        throw new Error('❌ Personal Access Token 无效或已过期\n\n请检查：\n1. Token 是否正确复制（不要包含多余空格）\n2. Token 是否已过期\n3. 在 Coze 平台重新生成新的 Token');
      }
      throw new Error(`Coze API 错误 (${data.code}): ${data.msg || '未知错误'}`);
    }
    
    // 提取 Bot 的回复
    if (data.data?.messages) {
      const botMessages = data.data.messages.filter((msg: { role: string }) => msg.role === 'assistant');
      if (botMessages.length > 0) {
        return botMessages[0].content || '空回复';
      }
    }
    
    throw new Error('未能获取 Bot 回复，请检查 Bot ID 是否正确');
  } catch (error) {
    console.error('Coze API 调用失败:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('网络请求失败，请检查网络连接');
  }
}

// 自定义 API 调用
async function callCustomAPI(endpoint: string, apiKey: string | undefined, message: string): Promise<string> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`API 调用失败: ${response.status}`);
    }

    const data = await response.json();
    return data.response || data.message || JSON.stringify(data);
  } catch (error) {
    console.error('自定义 API 调用失败:', error);
    throw error;
  }
}

// 评估单个测试用例
function evaluateResponse(testCase: TestCase, response: string): { passed: boolean; feedback: string } {
  const responseLower = response.toLowerCase();
  
  if (testCase.category === 'basic') {
    // 检查是否包含天气相关信息
    const hasWeatherInfo = responseLower.includes('温度') || 
                          responseLower.includes('天气') || 
                          responseLower.includes('℃') ||
                          responseLower.includes('度');
    
    const hasAdvice = responseLower.includes('建议') || 
                     responseLower.includes('穿') ||
                     responseLower.includes('适合');
    
    if (testCase.input.includes('穿衣服') || testCase.input.includes('晒被子')) {
      return {
        passed: hasWeatherInfo && hasAdvice,
        feedback: hasWeatherInfo && hasAdvice ? 
          '正确查询天气并给出建议' : 
          '需要提供天气信息和穿衣建议'
      };
    }
    
    return {
      passed: hasWeatherInfo,
      feedback: hasWeatherInfo ? 
        '正确查询并返回天气信息' : 
        '未能正确查询天气或返回相关信息'
    };
  }
  
  if (testCase.category === 'boundary') {
    if (testCase.input.includes('订机票') || testCase.input.includes('火星')) {
      const isRejected = responseLower.includes('只能') || 
                        responseLower.includes('无法') ||
                        responseLower.includes('抱歉') ||
                        responseLower.includes('天气');
      
      return {
        passed: isRejected,
        feedback: isRejected ? 
          '正确处理了边界情况' : 
          '应该明确说明只能查询天气或无法处理该请求'
      };
    }
  }
  
  if (testCase.category === 'error') {
    const hasErrorHandling = responseLower.includes('抱歉') || 
                            responseLower.includes('暂时无法') ||
                            responseLower.includes('稍后');
    
    return {
      passed: hasErrorHandling,
      feedback: hasErrorHandling ? 
        '妥善处理了错误情况' : 
        '需要友好地提示用户查询失败'
    };
  }
  
  return { passed: false, feedback: '无法评估响应' };
}

// 运行真实测试
export async function runRealTests(config: BotConfig, onProgress?: (progress: number) => void): Promise<{
  totalScore: number;
  passed: boolean;
  functionalityScore: number;
  qualityScore: number;
  creativityScore: number;
  testPassRate: number;
  aiFeedback: Record<string, unknown>;
  testDetails: TestResult[];
}> {
  const results: TestResult[] = [];
  let totalScore = 0;
  let functionalityScore = 0;
  let qualityScore = 0;
  
  try {
    // 运行所有测试用例
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      
      try {
        // 调用用户的智能体
        let response: string;
        if (config.type === 'coze' && config.botId && config.apiKey) {
          response = await callCozeBot(config.botId, config.apiKey, testCase.input);
        } else if (config.type === 'api' && config.apiEndpoint) {
          response = await callCustomAPI(config.apiEndpoint, config.apiKey, testCase.input);
        } else {
          throw new Error('配置信息不完整');
        }
        
        // 评估响应
        const evaluation = evaluateResponse(testCase, response);
        
        results.push({
          input: testCase.input,
          response,
          passed: evaluation.passed,
          feedback: evaluation.feedback,
          category: testCase.category
        });
        
        if (evaluation.passed) {
          functionalityScore += testCase.weight;
        }
        
        // 更新进度
        if (onProgress) {
          onProgress(Math.round(((i + 1) / testCases.length) * 100));
        }
        
        // 避免请求过快
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        results.push({
          input: testCase.input,
          response: `错误: ${error instanceof Error ? error.message : '未知错误'}`,
          passed: false,
          feedback: '测试执行失败',
          category: testCase.category
        });
      }
    }
    
    // 质量评分（基于响应质量）
    const passedTests = results.filter(r => r.passed).length;
    const testPassRate = passedTests / testCases.length;
    qualityScore = Math.round(30 * testPassRate);
    
    totalScore = functionalityScore + qualityScore;
    const passed = totalScore >= 60; // 降低通过标准到60分，因为是真实测试
    
    // 生成 AI 反馈
    const aiFeedback = generateRealFeedback(results, totalScore, passed);
    
    return {
      totalScore,
      passed,
      functionalityScore,
      qualityScore,
      creativityScore: 0, // 创意分需要人工评估
      testPassRate: Math.round(testPassRate * 100),
      aiFeedback,
      testDetails: results
    };
    
  } catch (error) {
    console.error('测试执行失败:', error);
    throw new Error(`测试执行失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

function generateRealFeedback(results: TestResult[], score: number, passed: boolean): Record<string, unknown> {
  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.length - passedCount;
  
  const encouragement = passed ? 
    '🎉 恭喜通过测试！你的智能体运行良好！' :
    score >= 50 ?
    '💪 很接近了！再优化一下就能通过！' :
    '🔧 继续加油！根据反馈改进你的智能体。';
  
  const strengths: string[] = [];
  const improvements: { issue: string; suggestion: string; example?: string }[] = [];
  
  // 分析通过的测试
  if (passedCount > 0) {
    const basicPassed = results.filter(r => r.passed && r.category === 'basic').length;
    if (basicPassed > 0) {
      strengths.push(`基础功能实现良好，${basicPassed} 个核心场景测试通过`);
    }
    
    const boundaryPassed = results.filter(r => r.passed && r.category === 'boundary').length;
    if (boundaryPassed > 0) {
      strengths.push('边界情况处理得当，能正确拒绝非天气请求');
    }
  }
  
  // 分析失败的测试
  results.forEach(result => {
    if (!result.passed) {
      if (result.category === 'basic') {
        improvements.push({
          issue: `测试失败：${result.input}`,
          suggestion: result.feedback,
          example: '确保你的 Bot 正确配置了天气查询插件，并在提示词中说明如何使用'
        });
      } else if (result.category === 'boundary') {
        improvements.push({
          issue: `边界处理不足：${result.input}`,
          suggestion: result.feedback,
          example: '在提示词中添加：如果用户询问与天气无关的问题，礼貌告知你只能帮助查询天气'
        });
      }
    }
  });
  
  return {
    encouragement,
    strengths,
    improvements,
    nextSteps: passed ? 
      ['尝试完成挑战任务，进一步提升你的智能体', '考虑添加更多实用功能'] :
      ['根据测试反馈优化提示词', '确保工具配置正确', '在 Coze 预览窗口测试各种场景']
  };
}
