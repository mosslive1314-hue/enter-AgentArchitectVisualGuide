import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AchievementData {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

export function useUserAchievements() {
  return useQuery({
    queryKey: ['user-achievements'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('unlocked_at', { ascending: false });

      if (error) throw error;
      return data as AchievementData[];
    }
  });
}

export function useUnlockAchievement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (achievementId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: user.id,
          achievement_id: achievementId,
        })
        .select()
        .single();

      if (error) {
        // Ignore unique constraint violations (already unlocked)
        if (error.code === '23505') return null;
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-achievements'] });
      toast.success('成就已解锁！');
    }
  });
}

// Combined hook for convenience
export function useAchievements() {
  const { data: achievements, isLoading } = useUserAchievements();
  const unlockMutation = useUnlockAchievement();

  return {
    achievements: achievements || [],
    isLoading,
    unlockAchievement: unlockMutation.mutateAsync
  };
}
