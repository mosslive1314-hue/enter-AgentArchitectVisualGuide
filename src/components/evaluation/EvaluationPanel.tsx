import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  CheckCircle2, XCircle, AlertCircle, TrendingUp, 
  Lightbulb, Target, Award, RefreshCw
} from 'lucide-react';
import { OverallEvaluation, AIFeedback } from '@/services/evaluationEngine';

interface EvaluationPanelProps {
  evaluation: OverallEvaluation;
  aiFeedback: AIFeedback;
  version: number;
  onRetry: () => void;
  onContinue: () => void;
}

export function EvaluationPanel({ 
  evaluation, 
  aiFeedback, 
  version,
  onRetry, 
  onContinue 
}: EvaluationPanelProps) {
  const { totalScore, functionalityScore, qualityScore, passed, summary, results } = evaluation;
  const passRate = Math.round((summary.passedTests / summary.totalTests) * 100);
  
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Overall Score Card */}
      <Card className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-1">评估结果</h3>
            <p className="text-xs md:text-sm text-muted-foreground">版本 {version}</p>
          </div>
          <Badge 
            variant={passed ? 'default' : 'secondary'}
            className="text-xs md:text-sm"
          >
            {passed ? '✅ 通过' : '❌ 未通过'}
          </Badge>
        </div>
        
        {/* Score Display */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl md:text-5xl font-bold">{totalScore}</span>
            <span className="text-lg md:text-xl text-muted-foreground">/ 100</span>
          </div>
          <Progress value={totalScore} className="h-3" />
          <p className="text-xs md:text-sm text-muted-foreground mt-2">
            需要 80 分通过，你距离目标还差 {Math.max(0, 80 - totalScore)} 分
          </p>
        </div>
        
        {/* Score Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="text-xs text-muted-foreground mb-1">功能性</div>
            <div className="text-xl md:text-2xl font-bold">{functionalityScore}<span className="text-sm text-muted-foreground">/50</span></div>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="text-xs text-muted-foreground mb-1">质量</div>
            <div className="text-xl md:text-2xl font-bold">{qualityScore}<span className="text-sm text-muted-foreground">/30</span></div>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="text-xs text-muted-foreground mb-1">测试通过率</div>
            <div className="text-xl md:text-2xl font-bold">{passRate}<span className="text-sm text-muted-foreground">%</span></div>
          </div>
        </div>
      </Card>
      
      {/* AI Feedback */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="text-base md:text-lg font-bold">AI 导师点评</h3>
        </div>
        
        {/* Encouragement */}
        <Alert className="mb-4 border-primary/50 bg-primary/5">
          <AlertDescription className="text-sm md:text-base">
            {aiFeedback.encouragement}
          </AlertDescription>
        </Alert>
        
        {/* Strengths */}
        {aiFeedback.strengths.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm md:text-base font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              做得好的地方
            </h4>
            <div className="space-y-2">
              {aiFeedback.strengths.map((strength, index) => (
                <div key={index} className="text-xs md:text-sm text-muted-foreground pl-6">
                  {strength}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Improvements */}
        {aiFeedback.improvements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm md:text-base font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-yellow-500" />
              可以改进的地方
            </h4>
            <div className="space-y-3">
              {aiFeedback.improvements.map((improvement, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <div className="font-medium text-sm mb-1">{improvement.issue}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mb-2">
                    💡 {improvement.suggestion}
                  </div>
                  {improvement.example && (
                    <div className="text-xs bg-background p-2 rounded border font-mono whitespace-pre-wrap">
                      {improvement.example}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Next Steps */}
        <div>
          <h4 className="text-sm md:text-base font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-blue-500" />
            下一步建议
          </h4>
          <div className="space-y-2">
            {aiFeedback.nextSteps.map((step, index) => (
              <div key={index} className="text-xs md:text-sm text-muted-foreground pl-6">
                {step}
              </div>
            ))}
          </div>
        </div>
      </Card>
      
      {/* Test Results Details */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="text-base md:text-lg font-bold">测试详情</h3>
          <Badge variant="outline" className="ml-auto text-xs">
            {summary.passedTests}/{summary.totalTests} 通过
          </Badge>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {results.map((result, index) => (
            <AccordionItem key={result.testCase.id} value={`item-${index}`}>
              <AccordionTrigger className="text-sm hover:no-underline">
                <div className="flex items-center gap-2 flex-1 text-left">
                  {result.passed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  )}
                  <span className="flex-1 min-w-0 truncate">{result.testCase.input}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {result.score}/{result.testCase.weight}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-6 space-y-2 text-xs md:text-sm">
                  <div>
                    <span className="font-medium">期望行为：</span>
                    <span className="text-muted-foreground"> {result.testCase.expectedBehavior}</span>
                  </div>
                  <div>
                    <span className="font-medium">反馈：</span>
                    <span className="text-muted-foreground"> {result.feedback}</span>
                  </div>
                  {result.details && (
                    <div className="p-2 bg-muted/50 rounded text-xs">
                      {result.details}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {!passed && (
          <Button 
            onClick={onRetry} 
            variant="outline" 
            className="gap-2 w-full sm:w-auto"
          >
            <RefreshCw className="h-4 w-4" />
            改进并重新测试
          </Button>
        )}
        {passed && (
          <Button 
            onClick={onContinue}
            className="gap-2 w-full sm:w-auto"
          >
            继续下一步
          </Button>
        )}
      </div>
    </div>
  );
}
