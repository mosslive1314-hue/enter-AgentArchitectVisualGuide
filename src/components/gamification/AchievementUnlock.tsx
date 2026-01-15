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
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (currentIndex >= achievements.length) {
      // 所有成就展示完毕
      setTimeout(() => {
        setShowConfetti(false);
      }, 1000);
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2000);
      return;
    }

    // 每个成就展示4秒
    const timer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 4000);

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
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
        onClick={(e) => {
          // 点击背景跳过当前成就
          if (e.target === e.currentTarget) {
            setCurrentIndex(prev => prev + 1);
          }
        }}
      >
        {/* 五彩纸屑效果 */}
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={currentIndex < achievements.length - 1}
            numberOfPieces={currentIndex === 0 ? 600 : 300}
            gravity={0.25}
            colors={['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DFE6E9']}
            tweenDuration={5000}
          />
        )}

        {/* 背景光晕动画 */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* 成就卡片 */}
        <motion.div
          key={currentAchievement.id}
          initial={{ scale: 0, rotateY: 180, y: 50 }}
          animate={{ scale: 1, rotateY: 0, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -50 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.1
          }}
          className="relative"
        >
          <Card className="p-8 md:p-12 max-w-md mx-4 relative overflow-hidden border-2 border-primary/30 shadow-2xl">
            {/* 流光效果 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1
              }}
            />

            {/* 星星粒子效果 */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}

            <div className="relative z-10 text-center">
              {/* 标题徽章 */}
              <motion.div
                initial={{ y: -30, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              >
                <Badge className="mb-6 text-base px-4 py-1.5 bg-gradient-to-r from-primary to-primary/80 shadow-lg">
                  🎉 成就解锁 🎉
                </Badge>
              </motion.div>

              {/* 图标容器 */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.5,
                  type: "spring",
                  stiffness: 150,
                  damping: 10
                }}
                className="mb-8 relative"
              >
                {/* 外层光环 */}
                <motion.div
                  className="absolute inset-0 -m-6"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-primary/40 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 45}deg) translateY(-60px)`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>

                {/* 主图标 */}
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 relative shadow-2xl">
                  {/* 内层脉冲 */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/50"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                  
                  {/* 外层脉冲 */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.5
                    }}
                  />

                  {/* 图标本体 */}
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <IconComponent className="h-16 w-16 text-primary-foreground relative z-10 drop-shadow-lg" />
                  </motion.div>
                </div>
              </motion.div>

              {/* 成就名称 */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, type: "spring" }}
                className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
              >
                {currentAchievement.name}
              </motion.h2>

              {/* 成就描述 */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1, type: "spring" }}
                className="text-muted-foreground text-lg mb-6"
              >
                {currentAchievement.description}
              </motion.p>

              {/* 装饰线 */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-6"
              />

              {/* 进度指示器 */}
              {achievements.length > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="flex gap-2 justify-center items-center"
                >
                  <span className="text-xs text-muted-foreground mr-2">
                    {currentIndex + 1} / {achievements.length}
                  </span>
                  {achievements.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'w-8 bg-primary' 
                          : index < currentIndex 
                          ? 'w-2 bg-primary/50' 
                          : 'w-2 bg-muted'
                      }`}
                      animate={index === currentIndex ? {
                        scale: [1, 1.2, 1],
                      } : {}}
                      transition={{
                        duration: 0.5,
                        repeat: index === currentIndex ? Infinity : 0,
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {/* 提示文本 */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.6] }}
                transition={{ delay: 2, duration: 1 }}
                className="text-xs text-muted-foreground mt-6"
              >
                点击任意处继续
              </motion.p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
