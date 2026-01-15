import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Lock, Sparkles, Award, Star, Zap, Target, Crown } from 'lucide-react';

interface Achievement {
  id: string;
  achievement_id: string;
  unlocked_at: string;
}

interface AchievementWallProps {
  achievements: Achievement[];
}

const ACHIEVEMENT_DEFINITIONS = [
  { 
    id: 'first-agent', 
    name: '智能体萌新', 
    description: '完成第一个智能体项目',
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'tool-user', 
    name: '工具使用新手', 
    description: '学会了基础的工具调用',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    id: 'perfect-score', 
    name: '完美主义者', 
    description: '获得满分评价',
    icon: Star,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    id: 'fast-learner', 
    name: '速学达人', 
    description: '30分钟内完成项目',
    icon: Zap,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'persistent', 
    name: '百折不挠', 
    description: '失败后重试并成功',
    icon: Target,
    color: 'from-red-500 to-rose-500'
  },
  { 
    id: 'week-streak', 
    name: '坚持一周', 
    description: '连续学习7天',
    icon: Award,
    color: 'from-indigo-500 to-blue-500'
  },
  { 
    id: 'project-master', 
    name: '项目大师', 
    description: '完成所有项目',
    icon: Crown,
    color: 'from-amber-500 to-yellow-500'
  },
  { 
    id: 'helpful', 
    name: '乐于助人', 
    description: '帮助他人解决问题',
    icon: Trophy,
    color: 'from-teal-500 to-cyan-500'
  },
];

export function AchievementWall({ achievements }: AchievementWallProps) {
  const unlockedIds = new Set(achievements.map(a => a.achievement_id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">成就展示墙</h2>
          <p className="text-muted-foreground mt-1">
            已解锁 {achievements.length} / {ACHIEVEMENT_DEFINITIONS.length} 个成就
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          <Trophy className="h-5 w-5 mr-2" />
          {Math.round((achievements.length / ACHIEVEMENT_DEFINITIONS.length) * 100)}%
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ACHIEVEMENT_DEFINITIONS.map((achievement) => {
          const isUnlocked = unlockedIds.has(achievement.id);
          const unlockedData = achievements.find(a => a.achievement_id === achievement.id);
          const Icon = achievement.icon;

          return (
            <Card 
              key={achievement.id}
              className={`p-6 transition-all duration-300 ${
                isUnlocked 
                  ? 'bg-gradient-to-br from-background to-primary/5 border-primary/20 shadow-lg hover:shadow-xl' 
                  : 'bg-muted/30 opacity-60'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                {/* 图标 */}
                <div 
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    isUnlocked 
                      ? `bg-gradient-to-br ${achievement.color}` 
                      : 'bg-muted'
                  }`}
                >
                  {isUnlocked ? (
                    <Icon className="h-10 w-10 text-white" />
                  ) : (
                    <Lock className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>

                {/* 名称 */}
                <div className="space-y-1">
                  <h3 className={`font-bold ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>

                {/* 解锁日期 */}
                {isUnlocked && unlockedData && (
                  <div className="pt-2 border-t w-full">
                    <p className="text-xs text-muted-foreground">
                      解锁于 {new Date(unlockedData.unlocked_at).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}

                {/* 未解锁提示 */}
                {!isUnlocked && (
                  <div className="pt-2">
                    <Badge variant="secondary" className="text-xs">
                      未解锁
                    </Badge>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
