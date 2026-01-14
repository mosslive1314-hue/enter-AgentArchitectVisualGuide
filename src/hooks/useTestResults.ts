import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TestResultData {
  id: string;
  user_id: string;
  project_id: string;
  version: number;
  score: number;
  passed: boolean;
  functionality_score: number | null;
  quality_score: number | null;
  creativity_score: number | null;
  ai_feedback: {
    strengths: string[];
    improvements: Array<{
      issue: string;
      suggestion: string;
      example?: string;
    }>;
    nextSteps: string[];
    encouragement: string;
  } | null;
  test_details: unknown;
  created_at: string;
}

export function useTestResults(projectId: string) {
  return useQuery({
    queryKey: ['test-results', projectId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', user.id)
        .eq('project_id', projectId)
        .order('version', { ascending: true });

      if (error) throw error;
      return data as TestResultData[];
    }
  });
}

export function useSubmitTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      projectId: string;
      version: number;
      score: number;
      passed: boolean;
      functionalityScore?: number;
      qualityScore?: number;
      creativityScore?: number;
      aiFeedback?: TestResultData['ai_feedback'];
      testDetails?: unknown;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('test_results')
        .insert({
          user_id: user.id,
          project_id: params.projectId,
          version: params.version,
          score: params.score,
          passed: params.passed,
          functionality_score: params.functionalityScore,
          quality_score: params.qualityScore,
          creativity_score: params.creativityScore,
          ai_feedback: params.aiFeedback,
          test_details: params.testDetails,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['test-results', variables.projectId] });
    }
  });
}
