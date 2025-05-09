from datetime import datetime
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class UserPerformance:
    user_id: str
    xp_points: int = 0
    current_streak: int = 0
    longest_streak: int = 0
    last_activity_date: datetime = datetime.now()
    level: int = 1
    achievements: List[str] = None
    quiz_scores: dict = None
    coding_challenge_attempts: dict = None
    visualization_interactions: dict = None
    topic_completion: dict = None

    def __post_init__(self):
        if self.achievements is None:
            self.achievements = []
        if self.quiz_scores is None:
            self.quiz_scores = {}
        if self.coding_challenge_attempts is None:
            self.coding_challenge_attempts = {}
        if self.visualization_interactions is None:
            self.visualization_interactions = {}
        if self.topic_completion is None:
            self.topic_completion = {}

    def update_streak(self):
        today = datetime.now().date()
        last_activity = self.last_activity_date.date()
        
        if (today - last_activity).days == 1:
            self.current_streak += 1
            if self.current_streak > self.longest_streak:
                self.longest_streak = self.current_streak
        elif (today - last_activity).days > 1:
            self.current_streak = 1
        
        self.last_activity_date = datetime.now()

    def add_xp(self, points: int):
        self.xp_points += points
        self.level = (self.xp_points // 1000) + 1

    def add_achievement(self, achievement: str):
        if achievement not in self.achievements:
            self.achievements.append(achievement)

    def update_topic_completion(self, topic: str, completion_percentage: float):
        self.topic_completion[topic] = completion_percentage

@dataclass
class LeaderboardEntry:
    user_id: str
    username: str
    xp_points: int
    level: int
    rank: Optional[int] = None

@dataclass
class TimeBoundChallenge:
    challenge_id: str
    title: str
    description: str
    start_time: datetime
    end_time: datetime
    difficulty: str
    xp_reward: int
    participants: List[str] = None

    def __post_init__(self):
        if self.participants is None:
            self.participants = []

@dataclass
class ForumPost:
    post_id: str
    user_id: str
    username: str
    title: str
    content: str
    created_at: datetime = datetime.now()
    upvotes: int = 0
    downvotes: int = 0
    comments: List['ForumComment'] = None
    tags: List[str] = None

    def __post_init__(self):
        if self.comments is None:
            self.comments = []
        if self.tags is None:
            self.tags = []

@dataclass
class ForumComment:
    comment_id: str
    user_id: str
    username: str
    content: str
    created_at: datetime = datetime.now()
    upvotes: int = 0
    downvotes: int = 0 