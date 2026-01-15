import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Trophy, 
  Target, 
  TrendingUp, 
  Award,
  Share2,
  Download,
  Calendar,
  Flame,
  Star
} from 'lucide-react';
import { AchievementWall } from '@/components/profile/AchievementWall';
import { StatsOverview } from '@/components/profile/StatsOverview';
import { LearningChart } from '@/components/profile/LearningChart';
import { ShareDialog } from '@/components/profile/ShareDialog';
import { Navigate } from 'react-router-dom';

export default function Profile() {
  const { user, loading } = useAuth();

  const { data: userStats } = useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const { data: achievements } = useQuery({
    queryKey: ['user-achievements', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('unlocked_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const { data: progress } = useQuery({
    queryKey: ['user-progress', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const completedProjects = progress?.filter(p => p.status === 'completed').length || 0;
  const totalXP = userStats?.total_xp || 0;
  const level = userStats?.level || 1;
  const currentStreak = userStats?.current_streak || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* 头部横幅 */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* 头像 */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                <User className="h-16 w-16 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-2 border-2 border-primary">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
            </div>

            {/* 用户信息 */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user?.email?.split('@')[0] || '学习者'}</h1>
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mb-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  等级 {level}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {totalXP} XP
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Flame className="h-3 w-3" />
                  {currentStreak} 天连续学习
                </Badge>
              </div>
              <p className="text-muted-foreground">
                已完成 {completedProjects} 个项目 · 解锁 {achievements?.length || 0} 个成就
              </p>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-2">
              <ShareDialog 
                userName={user?.email?.split('@')[0] || '学习者'}
                stats={{
                  level,
                  totalXP,
                  completedProjects,
                  achievements: achievements?.length || 0
                }}
              />
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                导出证书
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="overview">总览</TabsTrigger>
            <TabsTrigger value="achievements">成就</TabsTrigger>
            <TabsTrigger value="stats">统计</TabsTrigger>
            <TabsTrigger value="activity">活动</TabsTrigger>
          </TabsList>

          {/* 总览标签 */}
          <TabsContent value="overview" className="space-y-6">
            <StatsOverview 
              stats={userStats}
              progress={progress}
              achievements={achievements}
            />
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                学习进度
              </h3>
              <LearningChart userId={user?.id} />
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                最近成就
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements?.slice(0, 4).map((achievement) => (
                  <div 
                    key={achievement.id}
                    className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{achievement.achievement_id}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(achievement.unlocked_at).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* 成就墙标签 */}
          <TabsContent value="achievements">
            <AchievementWall achievements={achievements || []} />
          </TabsContent>

          {/* 统计标签 */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">学习时长</h3>
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold mb-2">{userStats?.total_learning_time || 0} 小时</p>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">本月目标：50小时</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">通过率</h3>
                  <Target className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold mb-2">
                  {progress && progress.length > 0 
                    ? Math.round((completedProjects / progress.length) * 100) 
                    : 0}%
                </p>
                <Progress 
                  value={progress && progress.length > 0 ? (completedProjects / progress.length) * 100 : 0} 
                  className="h-2" 
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {completedProjects} / {progress?.length || 0} 项目完成
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">连续天数</h3>
                  <Flame className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold mb-2">{currentStreak} 天</p>
                <Progress value={(currentStreak / 30) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">最长记录：{userStats?.longest_streak || 0} 天</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">详细统计</h3>
              <LearningChart userId={user?.id} />
            </Card>
          </TabsContent>

          {/* 活动标签 */}
          <TabsContent value="activity">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">最近活动</h3>
              <div className="space-y-4">
                {progress?.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.project_id}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.status === 'completed' ? '已完成' : '进行中'}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(item.updated_at).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
