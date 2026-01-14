import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectDetail() {
  const { projectId } = useParams();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">返回首页</span>
              <span className="sm:hidden">返回</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Project Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8">
            <Badge className="mb-3 md:mb-4">项目 1</Badge>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">天气助手</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Hello Agent - 你的第一个智能体
            </p>
          </div>

          <Card className="p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">项目概览</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">预计时间</div>
                  <div className="font-medium">45-60 分钟</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">难度</div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-6 rounded-full ${
                          i < 1 ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Play className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">进度</div>
                  <div className="font-medium">0%</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">项目目标</h3>
                <p className="text-muted-foreground">
                  构建一个能查询天气并给出穿衣建议的智能体，理解智能体的核心工作原理
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">你将学会</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>理解 Agent 的核心组件：LLM + Tool + Prompt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>掌握 Tool Use（工具使用）基础</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>学习 Prompt Engineering 入门</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Link to={`/workspace/${projectId}`} className="block">
                <Button size="lg" className="w-full gap-2">
                  <Play className="h-4 w-4" />
                  开始项目
                </Button>
              </Link>
            </div>
          </Card>

          {/* Progress Tracker */}
          <Card className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">学习进度</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>总体进度</span>
                  <span className="text-muted-foreground">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <div className="grid gap-3 mt-6">
                {['创建智能体', '添加工具', '编写提示词', '测试评估'].map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">{index + 1}</span>
                    </div>
                    <span className="text-muted-foreground">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
