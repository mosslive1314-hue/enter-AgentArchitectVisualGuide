// Google Analytics 4 追踪工具

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

// 页面浏览追踪
export const trackPageView = (url: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-ZH7EGPZM0L', {
      page_path: url,
      page_title: title,
    });
  }
};

// 自定义事件追踪
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
};

// === 学习平台特定事件 ===

// 项目相关事件
export const analytics = {
  // 项目开始
  projectStarted: (projectId: string, projectName: string) => {
    trackEvent('project_started', {
      project_id: projectId,
      project_name: projectName,
      event_category: 'Learning',
    });
  },

  // 项目完成
  projectCompleted: (projectId: string, projectName: string, score: number, duration: number) => {
    trackEvent('project_completed', {
      project_id: projectId,
      project_name: projectName,
      score,
      duration_minutes: duration,
      event_category: 'Learning',
    });
  },

  // 任务完成
  taskCompleted: (projectId: string, taskId: string, taskName: string) => {
    trackEvent('task_completed', {
      project_id: projectId,
      task_id: taskId,
      task_name: taskName,
      event_category: 'Learning',
    });
  },

  // 使用提示
  hintUsed: (projectId: string, taskId: string, hintLevel: number) => {
    trackEvent('hint_used', {
      project_id: projectId,
      task_id: taskId,
      hint_level: hintLevel,
      event_category: 'Assistance',
    });
  },

  // 测试提交
  testSubmitted: (projectId: string, version: number, score: number, passed: boolean) => {
    trackEvent('test_submitted', {
      project_id: projectId,
      version,
      score,
      passed,
      event_category: 'Assessment',
    });
  },

  // 挑战开始
  challengeStarted: (projectId: string, challengeId: string, difficulty: number) => {
    trackEvent('challenge_started', {
      project_id: projectId,
      challenge_id: challengeId,
      difficulty,
      event_category: 'Challenge',
    });
  },

  // 挑战完成
  challengeCompleted: (projectId: string, challengeId: string, score: number) => {
    trackEvent('challenge_completed', {
      project_id: projectId,
      challenge_id: challengeId,
      score,
      event_category: 'Challenge',
    });
  },

  // 成就解锁
  achievementUnlocked: (achievementId: string, achievementName: string) => {
    trackEvent('achievement_unlocked', {
      achievement_id: achievementId,
      achievement_name: achievementName,
      event_category: 'Gamification',
    });
  },

  // 用户升级
  levelUp: (newLevel: number, totalXP: number) => {
    trackEvent('level_up', {
      new_level: newLevel,
      total_xp: totalXP,
      event_category: 'Gamification',
    });
  },

  // 作品分享
  agentShared: (projectId: string, submissionId: string) => {
    trackEvent('agent_shared', {
      project_id: projectId,
      submission_id: submissionId,
      event_category: 'Social',
    });
  },

  // 卡壳检测触发
  stuckDetected: (projectId: string, taskId: string, reason: string) => {
    trackEvent('stuck_detected', {
      project_id: projectId,
      task_id: taskId,
      stuck_reason: reason,
      event_category: 'Assistance',
    });
  },

  // 帮助按钮点击
  helpClicked: (projectId: string, taskId: string) => {
    trackEvent('help_clicked', {
      project_id: projectId,
      task_id: taskId,
      event_category: 'Assistance',
    });
  },

  // 学习资源查看
  resourceViewed: (projectId: string, resourceType: string) => {
    trackEvent('resource_viewed', {
      project_id: projectId,
      resource_type: resourceType,
      event_category: 'Learning',
    });
  },

  // 连续学习天数
  streakMilestone: (streakDays: number) => {
    trackEvent('streak_milestone', {
      streak_days: streakDays,
      event_category: 'Engagement',
    });
  },
};
