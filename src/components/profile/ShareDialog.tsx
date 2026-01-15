import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Link2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ShareDialogProps {
  userName: string;
  stats: {
    level: number;
    totalXP: number;
    completedProjects: number;
    achievements: number;
  };
}

export function ShareDialog({ userName, stats }: ShareDialogProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `我在智能体学习平台已经达到 ${stats.level} 级，完成了 ${stats.completedProjects} 个项目，解锁 ${stats.achievements} 个成就！快来一起学习吧！`;
  const shareUrl = window.location.origin;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      toast.success('已复制到剪贴板');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('复制失败');
    }
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleDownloadCard = () => {
    // 生成分享卡片（简化版）
    toast.info('分享卡片生成功能即将上线');
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Share2 className="h-4 w-4 mr-2" />
        分享成就
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>分享你的学习成就</DialogTitle>
            <DialogDescription>
              向朋友展示你的学习进度
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* 预览卡片 */}
            <div className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-lg">
              <div className="text-center space-y-3">
                <h3 className="text-xl font-bold">{userName} 的学习成就</h3>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">{stats.level}</p>
                    <p className="text-sm text-muted-foreground">等级</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">{stats.completedProjects}</p>
                    <p className="text-sm text-muted-foreground">项目</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  总经验 {stats.totalXP} · 成就 {stats.achievements}
                </p>
              </div>
            </div>

            {/* 分享选项 */}
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Link2 className="h-4 w-4 mr-2" />
                )}
                {copied ? '已复制链接' : '复制链接'}
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleShareTwitter}
              >
                <Twitter className="h-4 w-4 mr-2" />
                分享到 Twitter
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleDownloadCard}
              >
                <Share2 className="h-4 w-4 mr-2" />
                下载分享卡片
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
