import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface UserProgressData {
  id: string;
  user_id: string;
  project_id: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  current_task: string | null;
  score: number | null;
  attempts: number;
  started_at: string;
  completed_at: string | null;
}

export function useUserProgress(projectId: string) {
  return useQuery({
    queryKey: ['user-progress', projectId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('project_id', projectId)
        .maybeSingle();

      if (error) throw error;
      return data as UserProgressData | null;
    }
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (update: {
      projectId: string;
      status?: UserProgressData['status'];
      currentTask?: string;
      score?: number;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          project_id: update.projectId,
          status: update.status,
          current_task: update.currentTask,
          score: update.score,
          attempts: 1,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-progress', variables.projectId] });
    }
  });
}

export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      projectId: string;
      taskId: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('task_completions')
        .upsert({
          user_id: user.id,
          project_id: params.projectId,
          task_id: params.taskId,
          completed: true,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['task-completions', variables.projectId] });
    }
  });
}
