import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle2, Circle, ArrowLeft, ArrowRight, 
  Lightbulb, PlayCircle, Trophy, Clock, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserProgress, useUpdateProgress, useCompleteTask } from '@/hooks/useUserProgress';
import { allProjects } from '@/data/projects';

export default function ProjectWorkspace() {
  const { projectId } = useParams();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  
  const project = allProjects.find(p => p.id === projectId);
  const { data: progress } = useUserProgress(projectId || '');
  const updateProgress = useUpdateProgress();
  const completeTask = useCompleteTask();
  
  // Idle detection for smart hints
  useEffect(() => {
    const interval = setInterval(() => {
      setIdleTime(prev => prev + 1);
    }, 1000);
    
    const resetIdle = () => setIdleTime(0);
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keypress', resetIdle);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keypress', resetIdle);
    };
  }, []);
  
  // Auto-show hints based on idle time
  useEffect(() => {
    if (idleTime === 30 && hintLevel === 0) {
      setHintLevel(1);
      setShowHint(true);
    } else if (idleTime === 60 && hintLevel === 1) {
      setHintLevel(2);
      setShowHint(true);
    }
  }, [idleTime, hintLevel]);
  
  if (!project) {
    return <div>项目未找到</div>;
  }
  
  const completedTasks = 0; // TODO: Get from database
  const totalTasks = 5; // project.tasks.length
  const progressPercent = (completedTasks / totalTasks) * 100;
  
  const handleCompleteTask = async () => {
    if (!projectId) return;
    
    try {
      await completeTask.mutateAsync({
        projectId,
        taskId: `task-${currentTaskIndex + 1}`
      });
      
      if (currentTaskIndex < totalTasks - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
      }
      
      setHintLevel(0);
      setShowHint(false);
      setIdleTime(0);
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={`/projects/${projectId}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  返回
                </Button>
              </Link>
              <div>
                <h1 className="font-semibold">{project.title}</h1>
                <p className="text-sm text-muted-foreground">
                  任务 {currentTaskIndex + 1} / {totalTasks}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{project.estimatedTime}</span>
              </div>
              <div className="w-48">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">进度</span>
                  <span className="font-medium">{Math.round(progressPercent)}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Task Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Task */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    任务 {currentTaskIndex + 1}.{currentTaskIndex + 1}
                  </Badge>
                  <h2 className="text-2xl font-bold">创建智能体</h2>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                  className="gap-2"
                >
                  <Lightbulb className={`h-4 w-4 ${showHint ? 'text-yellow-500' : ''}`} />
                  提示
                </Button>
              </div>
              
              <p className="text-muted-foreground mb-6">
                在平台中创建你的第一个智能体，给它起个名字
              </p>
              
              {/* Hint Alert */}
              {showHint && (
                <Alert className="mb-6 border-yellow-500/50 bg-yellow-500/10">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <AlertDescription>
                    {hintLevel === 0 && "💡 点击平台上的'创建智能体'按钮开始吧！"}
                    {hintLevel === 1 && "💡 想想：智能体需要知道什么？它的'职责'是什么？"}
                    {hintLevel === 2 && "💡 给你的智能体起个有意思的名字，比如'天气小助手'或'穿衣顾问'"}
                  </AlertDescription>
                </Alert>
              )}
              
              {/* Interactive Area - Placeholder for now */}
              <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/20 mb-6">
                <PlayCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  这里将是互动工作区
                </p>
                <p className="text-sm text-muted-foreground">
                  实际项目中，这里会是代码编辑器、配置面板或其他交互界面
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  disabled={currentTaskIndex === 0}
                  onClick={() => setCurrentTaskIndex(currentTaskIndex - 1)}
                >
                  上一步
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowHint(true)}
                  >
                    需要帮助
                  </Button>
                  <Button 
                    onClick={handleCompleteTask}
                    disabled={completeTask.isPending}
                  >
                    完成任务
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Learning Resources Tabs */}
            <Card className="p-6">
              <Tabs defaultValue="guide">
                <TabsList>
                  <TabsTrigger value="guide">操作指南</TabsTrigger>
                  <TabsTrigger value="concepts">相关概念</TabsTrigger>
                  <TabsTrigger value="examples">示例代码</TabsTrigger>
                </TabsList>
                
                <TabsContent value="guide" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-primary">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">登录 Coze 平台</h4>
                        <p className="text-sm text-muted-foreground">
                          访问 coze.cn 并使用你的账号登录
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-primary">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">创建新智能体</h4>
                        <p className="text-sm text-muted-foreground">
                          点击"创建智能体"按钮，选择"从空白开始"
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-primary">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">命名你的智能体</h4>
                        <p className="text-sm text-muted-foreground">
                          给它起个有意义的名字，比如"天气小助手"
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="concepts" className="mt-4">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-2">什么是智能体？</h4>
                      <p className="text-sm text-muted-foreground">
                        智能体（Agent）是一个能够理解用户意图、使用工具完成任务、
                        并给出智能回复的 AI 系统。
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-2">核心组件</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• LLM（大语言模型）- 理解和生成语言</li>
                        <li>• Tools（工具）- 执行具体操作</li>
                        <li>• Prompt（提示词）- 定义行为规则</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="examples" className="mt-4">
                  <div className="p-4 rounded-lg bg-muted font-mono text-sm">
                    <p className="text-muted-foreground mb-2"># 智能体配置示例</p>
                    <p>名称: 天气小助手</p>
                    <p>描述: 帮助用户查询天气并给出穿衣建议</p>
                    <p>模型: Claude 3.5 Sonnet</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          {/* Right: Progress & Tasks */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">项目统计</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">完成任务</span>
                  <span className="font-medium">{completedTasks}/{totalTasks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">当前得分</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">尝试次数</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </Card>
            
            {/* Task List */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">任务列表</h3>
              <div className="space-y-3">
                {['创建智能体', '添加工具', '编写提示词', '添加错误处理', '测试智能体'].map((task, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      index === currentTaskIndex 
                        ? 'border-primary bg-primary/5' 
                        : index < currentTaskIndex
                        ? 'bg-muted/50'
                        : 'bg-muted/20'
                    }`}
                  >
                    {index < currentTaskIndex ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task}</p>
                      <p className="text-xs text-muted-foreground">
                        任务 1.{index + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Achievements Preview */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold">即将解锁</h3>
              </div>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-muted/50 border border-dashed">
                  <p className="text-sm font-medium">🌱 智能体萌新</p>
                  <p className="text-xs text-muted-foreground">完成第一个智能体项目</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20 border border-dashed opacity-60">
                  <p className="text-sm font-medium">🔧 工具使用新手</p>
                  <p className="text-xs text-muted-foreground">学会了基础的工具调用</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
