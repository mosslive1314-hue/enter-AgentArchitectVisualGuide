import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlayCircle, Loader2 } from 'lucide-react';
import { EvaluationPanel } from './EvaluationPanel';
import { AchievementUnlock } from '@/components/gamification/AchievementUnlock';
import { runFullEvaluation, generateAIFeedback, type OverallEvaluation, type AIFeedback } from '@/services/evaluationEngine';
import { useSubmitTest } from '@/hooks/useTestResults';
import { useUnlockAchievement } from '@/hooks/useAchievements';
import { analytics } from '@/lib/analytics';
import { allProjects } from '@/data/projects';

interface TestButtonProps {
  projectId: string;
  disabled?: boolean;
}

export function TestButton({ projectId, disabled }: TestButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [evaluation, setEvaluation] = useState<OverallEvaluation | null>(null);
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null);
  const [version, setVersion] = useState(1);
  const [showAchievements, setShowAchievements] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<typeof allProjects[0]['rewards']>([]);
  
  const submitTest = useSubmitTest();
  const unlockAchievement = useUnlockAchievement();

  const handleRunTest = async () => {
    setIsRunning(true);
    setIsOpen(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponses = {
        'basic-1': 'mock response',
        'basic-2': 'mock response',
      };
      
      const evalResult = runFullEvaluation(mockResponses);
      const feedback = generateAIFeedback(evalResult, version);
      
      setEvaluation(evalResult);
      setAiFeedback(feedback);
      
      await submitTest.mutateAsync({
        projectId,
        version,
        score: evalResult.totalScore,
        passed: evalResult.passed,
        functionalityScore: evalResult.functionalityScore,
        qualityScore: evalResult.qualityScore,
        creativityScore: evalResult.creativityScore,
        aiFeedback: feedback,
      });
      
      analytics.testSubmitted(projectId, version, evalResult.totalScore, evalResult.passed);
      
      // 如果通过，解锁成就
      if (evalResult.passed) {
        const project = allProjects.find(p => p.id === projectId);
        if (project?.rewards) {
          setUnlockedAchievements(project.rewards);
          
          // 保存成就到数据库
          for (const reward of project.rewards) {
            if (reward.type === 'badge') {
              await unlockAchievement.mutateAsync({
                achievementId: `${projectId}-${reward.name}`,
              });
              
              analytics.achievementUnlocked(
                `${projectId}-${reward.name}`,
                reward.name
              );
            }
          }
          
          // 显示成就动画
          setIsOpen(false);
          setShowAchievements(true);
        }
      }
      
      setVersion(v => v + 1);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRetry = () => {
    setIsOpen(false);
    setEvaluation(null);
    setAiFeedback(null);
  };

  const handleContinue = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        onClick={handleRunTest}
        disabled={disabled || isRunning}
        className="gap-2 w-full sm:w-auto"
        size="lg"
      >
        {isRunning ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            测试中...
          </>
        ) : (
          <>
            <PlayCircle className="h-4 w-4" />
            测试我的智能体
          </>
        )}
      </Button>

      {/* 成就解锁动画 */}
      {showAchievements && (
        <AchievementUnlock
          achievements={unlockedAchievements}
          onComplete={() => {
            setShowAchievements(false);
            setIsOpen(true);
          }}
        />
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>测试结果</DialogTitle>
          </DialogHeader>
          
          {isRunning ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg font-medium">正在测试你的智能体...</p>
              <p className="text-sm text-muted-foreground mt-2">这可能需要几秒钟</p>
            </div>
          ) : evaluation && aiFeedback ? (
            <EvaluationPanel
              evaluation={evaluation}
              aiFeedback={aiFeedback}
              version={version - 1}
              onRetry={handleRetry}
              onContinue={handleContinue}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
