import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as LucideIcons from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'badge' | 'xp' | 'unlock';
}

interface AchievementUnlockProps {
  achievements: Achievement[];
  onComplete?: () => void;
}

export function AchievementUnlock({ achievements, onComplete }: AchievementUnlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (currentIndex >= achievements.length) {
      // 所有成就展示完毕
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2000);
      return;
    }

    // 每个成就展示3秒
    const timer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, achievements.length, onComplete]);

  const currentAchievement = achievements[currentIndex];

  if (!isVisible || !currentAchievement) {
    return null;
  }

  // 动态获取图标
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[currentAchievement.icon] || LucideIcons.Award;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      >
        {/* 烟花效果 */}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />

        {/* 成就卡片 */}
        <motion.div
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.2
          }}
        >
          <Card className="p-8 max-w-md mx-4 relative overflow-hidden">
            {/* 光晕效果 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative z-10 text-center">
              {/* 标题 */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Badge className="mb-4 text-sm">成就解锁</Badge>
              </motion.div>

              {/* 图标 */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.6,
                  type: "spring",
                  stiffness: 200
                }}
                className="mb-6"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/50 relative">
                  {/* 脉冲效果 */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                  <IconComponent className="h-12 w-12 text-primary-foreground relative z-10" />
                </div>
              </motion.div>

              {/* 成就名称 */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-2xl md:text-3xl font-bold mb-2"
              >
                {currentAchievement.name}
              </motion.h2>

              {/* 成就描述 */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-muted-foreground"
              >
                {currentAchievement.description}
              </motion.p>

              {/* 进度指示 */}
              {achievements.length > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 flex gap-2 justify-center"
                >
                  {achievements.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
