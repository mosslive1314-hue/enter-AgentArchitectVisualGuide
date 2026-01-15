import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Flame, Clock, TrendingUp, Award } from 'lucide-react';

interface StatsOverviewProps {
  stats: {
    total_xp?: number;
    level?: number;
    current_streak?: number;
    longest_streak?: number;
    total_learning_time?: number;
  } | null;
  progress: Array<{
    id: string;
    status: string;
  }> | undefined;
  achievements: Array<unknown> | undefined;
}

export function StatsOverview({ stats, progress, achievements }: StatsOverviewProps) {
  const completedProjects = progress?.filter(p => p.status === 'completed').length || 0;
  const totalProjects = progress?.length || 0;
  const completionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

  const statCards = [
    {
      icon: Trophy,
      label: '总经验',
      value: stats?.total_xp || 0,
      subtitle: `等级 ${stats?.level || 1}`,
      progress: ((stats?.total_xp || 0) % 1000) / 10,
      color: 'text-yellow-500'
    },
    {
      icon: Target,
      label: '完成率',
      value: `${Math.round(completionRate)}%`,
      subtitle: `${completedProjects}/${totalProjects} 项目`,
      progress: completionRate,
      color: 'text-blue-500'
    },
    {
      icon: Flame,
      label: '连续学习',
      value: `${stats?.current_streak || 0} 天`,
      subtitle: `最长 ${stats?.longest_streak || 0} 天`,
      progress: ((stats?.current_streak || 0) / 30) * 100,
      color: 'text-orange-500'
    },
    {
      icon: Award,
      label: '成就',
      value: achievements?.length || 0,
      subtitle: '已解锁',
      progress: ((achievements?.length || 0) / 8) * 100,
      color: 'text-purple-500'
    },
    {
      icon: Clock,
      label: '学习时长',
      value: `${stats?.total_learning_time || 0}h`,
      subtitle: '累计时间',
      progress: ((stats?.total_learning_time || 0) / 100) * 100,
      color: 'text-green-500'
    },
    {
      icon: TrendingUp,
      label: '成长速度',
      value: '+15%',
      subtitle: '相比上周',
      progress: 75,
      color: 'text-indigo-500'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
              </div>
              <div className={`p-3 rounded-lg bg-primary/10 ${card.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
            <Progress value={Math.min(card.progress, 100)} className="h-2" />
          </Card>
        );
      })}
    </div>
  );
}
