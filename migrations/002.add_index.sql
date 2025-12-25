CREATE INDEX idx_tweets_user_id ON tweets(user_id);
CREATE INDEX idx_tweets_created_at ON tweets(created_at DESC);
CREATE INDEX idx_likes_tweet_id ON likes(tweet_id);
CREATE INDEX idx_followings_followee_id ON followings(followee_id);
