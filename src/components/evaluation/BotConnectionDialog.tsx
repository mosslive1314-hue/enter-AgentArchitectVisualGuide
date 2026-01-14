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
                <p className="text-sm font-medium">如何获取？</p>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>登录 Coze 平台（coze.cn 或 coze.com）</li>
                  <li>进入你创建的 Bot 详情页</li>
                  <li>在设置中找到"Bot ID"并复制</li>
                  <li>前往个人中心 → API Keys 创建 Personal Access Token</li>
                  <li>将信息粘贴到上方输入框</li>
                </ol>
                <a
                  href="https://www.coze.cn/docs/developer_guides/create_a_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-2"
                >
                  查看详细教程 <ExternalLink className="h-3 w-3" />
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
