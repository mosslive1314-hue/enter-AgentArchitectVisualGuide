import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Flask, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { runRealTests } from '@/services/realTestEngine';
import { EvaluationPanel } from './EvaluationPanel';
import { BotConnectionDialog, BotConfig } from './BotConnectionDialog';
import { AchievementUnlock } from '@/components/gamification/AchievementUnlock';
import { useTestResults } from '@/hooks/useTestResults';
import { useAchievements } from '@/hooks/useAchievements';
import { analytics } from '@/lib/analytics';
import { Progress } from '@/components/ui/progress';

interface TestButtonProps {
  projectId: string;
}

export function TestButton({ projectId }: TestButtonProps) {
  const [showConnectionDialog, setShowConnectionDialog] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [evalResult, setEvalResult] = useState<Record<string, unknown> | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Array<{ id: string; name: string; description: string; icon: string }>>([]);

  const { saveTestResult } = useTestResults();
  const { unlockAchievement } = useAchievements();

  const handleTestClick = () => {
    setShowConnectionDialog(true);
  };

  const handleConnect = async (config: BotConfig) => {
    setIsConnecting(true);
    
    try {
      // 验证连接
      toast.info('正在连接你的智能体...');
      
      // 关闭连接对话框
      setShowConnectionDialog(false);
      setIsTesting(true);
      setTestProgress(0);
      
      toast.info('开始测试你的智能体...', {
        description: '这可能需要几分钟，请耐心等待'
      });

      // 运行真实测试
      const result = await runRealTests(config, (progress) => {
        setTestProgress(progress);
      });

      setEvalResult(result);
      
      // 保存测试结果
      const version = 1; // TODO: 从数据库获取版本号
      await saveTestResult({
        projectId,
        version,
        score: result.totalScore,
        passed: result.passed,
        functionalityScore: result.functionalityScore,
        qualityScore: result.qualityScore,
        creativityScore: result.creativityScore,
        aiFeedback: result.aiFeedback,
        testDetails: result.testDetails
      });

      // GA4 追踪
      analytics.testSubmitted(projectId, version, result.totalScore, result.passed);

      // 如果通过，解锁成就
      if (result.passed) {
        const achievements = [
          {
            id: 'first-agent',
            name: '智能体萌新',
            description: '完成第一个智能体项目',
            icon: 'Sparkles'
          },
          {
            id: 'tool-user',
            name: '工具使用新手',
            description: '学会了基础的工具调用',
            icon: 'Wrench'
          }
        ];

        // 保存成就到数据库
        for (const achievement of achievements) {
          await unlockAchievement(achievement.id);
        }

        setUnlockedAchievements(achievements);
        setShowAchievements(true);

        // GA4 追踪成就
        achievements.forEach(achievement => {
          analytics.achievementUnlocked(achievement.id, achievement.name);
        });
      } else {
        // 直接显示结果
        setShowResults(true);
        toast.warning('测试未通过', {
          description: '查看详细反馈并改进你的智能体'
        });
      }

    } catch (error) {
      console.error('测试失败:', error);
      toast.error('测试失败', {
        description: error instanceof Error ? error.message : '请检查你的配置信息'
      });
    } finally {
      setIsConnecting(false);
      setIsTesting(false);
      setTestProgress(0);
    }
  };

  const handleAchievementsComplete = () => {
    setShowAchievements(false);
    setShowResults(true);
  };

  return (
    <>
      <Button 
        onClick={handleTestClick}
        size="lg"
        className="gap-2"
        disabled={isTesting}
      >
        {isTesting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            测试中...
          </>
        ) : (
          <>
            <Flask className="h-4 w-4" />
            测试我的智能体
          </>
        )}
      </Button>

      {/* 连接对话框 */}
      <BotConnectionDialog
        open={showConnectionDialog}
        onOpenChange={setShowConnectionDialog}
        onConnect={handleConnect}
        isLoading={isConnecting}
      />

      {/* 测试进度对话框 */}
      <Dialog open={isTesting} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4 py-4">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">正在测试你的智能体</h3>
              <p className="text-sm text-muted-foreground mb-4">
                运行 {Math.ceil((testProgress / 100) * 7)} / 7 个测试用例
              </p>
              <Progress value={testProgress} className="w-full" />
              <p className="text-xs text-muted-foreground mt-2">
                {testProgress}% 完成
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 成就解锁动画 */}
      {showAchievements && (
        <AchievementUnlock
          achievements={unlockedAchievements}
          onComplete={handleAchievementsComplete}
        />
      )}

      {/* 评估结果 */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {evalResult && (
            <EvaluationPanel
              result={evalResult}
              onRetry={() => {
                setShowResults(false);
                setShowConnectionDialog(true);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
