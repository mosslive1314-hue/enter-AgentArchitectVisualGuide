import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';

interface LearningChartProps {
  userId?: string;
}

export function LearningChart({ userId }: LearningChartProps) {
  const { data: activities } = useQuery({
    queryKey: ['learning-activities', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('task_completions')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false })
        .limit(30);
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId
  });

  // 按日期分组统计
  const dailyStats = activities?.reduce((acc, activity) => {
    const date = new Date(activity.completed_at).toLocaleDateString('zh-CN');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('zh-CN');
  });

  const maxCount = Math.max(...last7Days.map(date => dailyStats?.[date] || 0), 1);

  return (
    <div className="space-y-4">
      {/* 活动热力图 */}
      <div className="flex items-end justify-between gap-2 h-32">
        {last7Days.map((date, index) => {
          const count = dailyStats?.[date] || 0;
          const height = (count / maxCount) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="flex-1 w-full flex items-end">
                <div 
                  className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t transition-all hover:opacity-80"
                  style={{ height: `${height}%`, minHeight: count > 0 ? '8px' : '0' }}
                  title={`${date}: ${count} 个任务`}
                />
              </div>
              <div className="text-xs text-muted-foreground text-center">
                {new Date(date).getDate()}日
              </div>
            </div>
          );
        })}
      </div>

      {/* 统计摘要 */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{activities?.length || 0}</p>
          <p className="text-xs text-muted-foreground mt-1">完成任务</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {Object.keys(dailyStats || {}).length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">活跃天数</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {activities?.length ? Math.round(activities.length / 7) : 0}
          </p>
          <p className="text-xs text-muted-foreground mt-1">日均任务</p>
        </div>
      </div>
    </div>
  );
}
