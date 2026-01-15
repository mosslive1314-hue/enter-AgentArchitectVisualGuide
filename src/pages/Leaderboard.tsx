import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Trophy, TrendingUp, Flame, Star, Crown, Medal, Award } from 'lucide-react';

export default function Leaderboard() {
  const { data: topByXP } = useQuery({
    queryKey: ['leaderboard-xp'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*, user_id')
        .order('total_xp', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    }
  });

  const { data: topByProjects } = useQuery({
    queryKey: ['leaderboard-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_progress')
        .select('user_id')
        .eq('status', 'completed');
      
      if (error) throw error;
      
      // 统计每个用户完成的项目数
      const userCounts = data.reduce((acc, item) => {
        acc[item.user_id] = (acc[item.user_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      // 转换为数组并排序
      return Object.entries(userCounts)
        .map(([user_id, count]) => ({ user_id, completed_projects: count }))
        .sort((a, b) => b.completed_projects - a.completed_projects)
        .slice(0, 50);
    }
  });

  const { data: topByStreak } = useQuery({
    queryKey: ['leaderboard-streak'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*, user_id')
        .order('current_streak', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    }
  });

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-muted-foreground">#{rank}</span>;
  };

  const getUserName = (userId: string) => {
    // 简化版：使用 user_id 的一部分作为显示名
    return `学习者${userId.slice(-6)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* 标题区域 */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50 mb-4">
              <Trophy className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-2">排行榜</h1>
            <p className="text-muted-foreground text-lg">
              看看谁在学习之路上领先
            </p>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="xp" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="xp" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              经验排行
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              项目排行
            </TabsTrigger>
            <TabsTrigger value="streak" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              坚持排行
            </TabsTrigger>
          </TabsList>

          {/* 经验排行 */}
          <TabsContent value="xp" className="space-y-4">
            {/* 前三名 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {topByXP?.slice(0, 3).map((user, index) => (
                <Card 
                  key={user.user_id}
                  className={`p-6 text-center ${
                    index === 0 
                      ? 'bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/20' 
                      : index === 1 
                      ? 'bg-gradient-to-br from-gray-400/10 to-gray-500/10 border-gray-400/20'
                      : 'bg-gradient-to-br from-amber-600/10 to-orange-500/10 border-amber-600/20'
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    {getRankBadge(index + 1)}
                  </div>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {getUserName(user.user_id).charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{getUserName(user.user_id)}</h3>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-primary">{user.total_xp || 0}</p>
                    <p className="text-sm text-muted-foreground">经验值</p>
                    <Badge variant="secondary">等级 {user.level || 1}</Badge>
                  </div>
                </Card>
              ))}
            </div>

            {/* 其他排名 */}
            <Card>
              <div className="divide-y">
                {topByXP?.slice(3).map((user, index) => (
                  <div key={user.user_id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                    <div className="w-12 text-center font-semibold">
                      {getRankBadge(index + 4)}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">
                        {getUserName(user.user_id).charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{getUserName(user.user_id)}</p>
                      <p className="text-sm text-muted-foreground">等级 {user.level || 1}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{user.total_xp || 0}</p>
                      <p className="text-xs text-muted-foreground">XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* 项目排行 */}
          <TabsContent value="projects" className="space-y-4">
            <Card>
              <div className="divide-y">
                {topByProjects?.map((user, index) => (
                  <div key={user.user_id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                    <div className="w-12 text-center font-semibold">
                      {getRankBadge(index + 1)}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">
                        {getUserName(user.user_id).charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{getUserName(user.user_id)}</p>
                      <p className="text-sm text-muted-foreground">项目完成数</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{user.completed_projects}</p>
                      <p className="text-xs text-muted-foreground">项目</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* 坚持排行 */}
          <TabsContent value="streak" className="space-y-4">
            <Card>
              <div className="divide-y">
                {topByStreak?.map((user, index) => (
                  <div key={user.user_id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                    <div className="w-12 text-center font-semibold">
                      {getRankBadge(index + 1)}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">
                        {getUserName(user.user_id).charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{getUserName(user.user_id)}</p>
                      <p className="text-sm text-muted-foreground">连续学习天数</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <p className="font-bold text-primary">{user.current_streak || 0}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">天</p>
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
