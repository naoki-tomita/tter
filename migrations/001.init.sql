CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  bio TEXT
);

CREATE TABLE tweets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users (id),
  content TEXT NOT NULL,
  created_at NUMERIC DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
  user_id INTEGER NOT NULL REFERENCES users (id),
  tweet_id INTEGER NOT NULL REFERENCES tweets (id),
  PRIMARY KEY (user_id, tweet_id)
);

CREATE TABLE followings (
  follower_id INTEGER UNIQUE NOT NULL REFERENCES users (id),
  followee_id INTEGER UNIQUE NOT NULL REFERENCES users (id),
  PRIMARY KEY (follower_id, followee_id)
);
