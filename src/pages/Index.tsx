import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Code, Users, Trophy, Zap, Cloud, BookOpen, Target, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { analytics } from '@/lib/analytics';

export default function Index() {
  const handleStartProject = () => {
    analytics.trackEvent('cta_clicked', {
      cta_location: 'hero',
      cta_text: '开始第一个项目',
      event_category: 'Engagement',
    });
  };

  const handleViewRoadmap = () => {
    analytics.trackEvent('cta_clicked', {
      cta_location: 'hero',
      cta_text: '查看学习路径',
      event_category: 'Engagement',
    });
  };

  const handleProjectCardClick = (projectId: number, projectName: string, isLocked: boolean) => {
    if (isLocked) {
      analytics.trackEvent('locked_project_clicked', {
        project_id: projectId,
        project_name: projectName,
        event_category: 'Engagement',
      });
    }
  };
  const features = [
    {
      icon: Target,
      title: '项目驱动学习',
      description: '8个递进式实战项目，从Hello World到生产部署'
    },
    {
      icon: Zap,
      title: '评估驱动开发',
      description: '先定义成功，边做边测，实时反馈'
    },
    {
      icon: Users,
      title: '智能助教系统',
      description: '卡壳时自动检测，分级提示帮助'
    },
    {
      icon: Trophy,
      title: '成就激励机制',
      description: '徽章、等级、挑战让学习充满乐趣'
    }
  ];

  const projects = [
    { id: 1, name: '天气助手', difficulty: 1, icon: Cloud, status: 'available' },
    { id: 2, name: '研究助手', difficulty: 2, icon: BookOpen, status: 'locked' },
    { id: 3, name: '客服机器人', difficulty: 2, icon: Users, status: 'locked' },
    { id: 4, name: '代码审查', difficulty: 3, icon: Code, status: 'locked' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <Badge variant="outline" className="gap-2">
            <Sparkles className="h-3 w-3" />
            AI 智能体实战训练营
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            在做中学，用输出倒逼输入
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            通过 8 个实战项目，从零开始系统掌握智能体构建。每个项目都有智能助教、自动评估、AI 点评，让你真正学会而不是"学过"。
          </p>
          
          <div className="flex gap-4 justify-center pt-4">
            <Link to="/projects/project-1" onClick={handleStartProject}>
              <Button size="lg" className="gap-2">
                开始第一个项目
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={handleViewRoadmap}>
              查看学习路径
            </Button>
          </div>
          
          <div className="flex gap-6 justify-center text-sm text-muted-foreground pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              完全免费
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              平台内完成
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              即时反馈
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">为什么选择我们？</h2>
          <p className="text-muted-foreground">不是传统的视频教程，而是真正的实战训练营</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 border-2">
                <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Projects Preview */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">学习路径</h2>
          <p className="text-muted-foreground">8 个递进式项目，从简单到复杂</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {projects.map((project) => {
            const Icon = project.icon;
            const isLocked = project.status === 'locked';
            
            return (
              <Card 
                key={project.id}
                className={`p-6 text-center relative overflow-hidden transition-all ${
                  isLocked 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
                }`}
                onClick={() => handleProjectCardClick(project.id, project.name, isLocked)}
              >
                <div className="absolute top-2 right-2">
                  <Badge variant={isLocked ? 'secondary' : 'default'}>
                    {isLocked ? '🔒 锁定' : '✨ 可用'}
                  </Badge>
                </div>
                
                <div className="rounded-full w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4 mt-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="font-semibold mb-2">项目 {project.id}</h3>
                <p className="text-sm mb-3">{project.name}</p>
                
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-8 rounded-full ${
                        i < project.difficulty ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <Card className="p-12 text-center bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-2">
          <h2 className="text-3xl font-bold mb-4">准备好开始了吗？</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            不需要任何前置知识，从零开始。第一个项目只需 45 分钟，你就能拥有自己的智能体作品！
          </p>
          <Link to="/projects/project-1" onClick={handleStartProject}>
            <Button size="lg" className="gap-2">
              开始构建你的第一个智能体
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
