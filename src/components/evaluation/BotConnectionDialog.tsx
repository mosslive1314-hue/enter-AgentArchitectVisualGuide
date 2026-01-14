import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BotConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (config: BotConfig) => void;
  isLoading?: boolean;
}

export interface BotConfig {
  type: 'coze' | 'api';
  botId?: string;
  apiKey?: string;
  apiEndpoint?: string;
}

export function BotConnectionDialog({ open, onOpenChange, onConnect, isLoading }: BotConnectionDialogProps) {
  const [config, setConfig] = useState<BotConfig>({ type: 'coze' });
  const [activeTab, setActiveTab] = useState<'coze' | 'api'>('coze');

  const handleConnect = () => {
    onConnect({ ...config, type: activeTab });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>连接你的智能体</DialogTitle>
          <DialogDescription>
            提供你的智能体信息，我们将进行真实测试
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'coze' | 'api')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="coze">Coze 平台</TabsTrigger>
            <TabsTrigger value="api">自定义 API</TabsTrigger>
          </TabsList>

          <TabsContent value="coze" className="space-y-4 mt-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                推荐方式！直接连接你在 Coze 创建的智能体
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="botId">Bot ID *</Label>
                <Input
                  id="botId"
                  placeholder="输入你的 Bot ID，例如：7441025870136344608"
                  value={config.botId || ''}
                  onChange={(e) => setConfig({ ...config, botId: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  在 Coze 平台的 Bot 设置页面可以找到 Bot ID
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">Personal Access Token *</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="输入你的 Personal Access Token"
                  value={config.apiKey || ''}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  需要创建 Personal Access Token 来访问 API
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4 space-y-2">
                <p className="text-sm font-medium">📖 如何获取 Bot ID 和 Token？</p>
                
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">1. 获取 Bot ID：</p>
                  <ol className="text-xs text-muted-foreground space-y-1 list-disc list-inside ml-2">
                    <li>登录 <a href="https://www.coze.cn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Coze 平台</a></li>
                    <li>进入你创建的 Bot 详情页</li>
                    <li>在设置或信息栏找到"Bot ID"并复制（通常是一串数字）</li>
                    <li>⚠️ 确保你的 Bot 已经<span className="font-semibold text-green-600 dark:text-green-400">发布</span>（未发布的 Bot 无法通过 API 调用）</li>
                  </ol>
                </div>

                <div className="space-y-2 mt-3">
                  <p className="text-xs font-medium text-foreground">2. 创建 Personal Access Token：</p>
                  <ol className="text-xs text-muted-foreground space-y-1 list-disc list-inside ml-2">
                    <li>访问 <a href="https://www.coze.cn/open/oauth/pats" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Token 管理页面</a></li>
                    <li>点击"新增令牌"，输入名称（如：学习平台测试）</li>
                    <li>设置过期时间（建议选择"永不过期"）</li>
                    <li>选择你的 Bot 所在的工作空间</li>
                    <li>权限至少勾选：<span className="font-mono bg-yellow-100 dark:bg-yellow-900 px-1">Bot - Conversation</span></li>
                    <li>点击"确定"后复制生成的 Token（⚠️ 只显示一次！）</li>
                  </ol>
                </div>
                
                <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded">
                  <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">
                    💡 测试前请确认：在 Coze 平台的对话窗口中手动测试你的 Bot 是否能正常查询天气
                  </p>
                </div>

                <a
                  href="https://www.coze.cn/docs/developer_guides/authentication"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-2"
                >
                  查看官方认证文档 <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4 mt-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                适用于使用其他平台或自建 API 的用户
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiEndpoint">API 端点 *</Label>
                <Input
                  id="apiEndpoint"
                  placeholder="https://your-api.com/chat"
                  value={config.apiEndpoint || ''}
                  onChange={(e) => setConfig({ ...config, apiEndpoint: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customApiKey">API Key（可选）</Label>
                <Input
                  id="customApiKey"
                  type="password"
                  placeholder="输入 API Key（如果需要）"
                  value={config.apiKey || ''}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                />
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium mb-2">API 要求：</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>POST 请求，接受 JSON 格式</li>
                  <li>请求体格式：{`{ "message": "用户消息" }`}</li>
                  <li>返回格式：{`{ "response": "智能体回复" }`}</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            取消
          </Button>
          <Button 
            onClick={handleConnect} 
            disabled={isLoading || (activeTab === 'coze' && (!config.botId || !config.apiKey))}
          >
            {isLoading ? '连接中...' : '开始测试'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
