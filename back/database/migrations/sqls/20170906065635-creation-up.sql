CREATE TABLE Game (
  id           BIGINT(20)   NOT NULL AUTO_INCREMENT,
  player       VARCHAR(255) NOT NULL,
  detail       TEXT         NOT NULL,
  created_at   DATETIME     DEFAULT CURRENT_TIMESTAMP,
  score        BIGINT(20)   NOT NULL,
  elapsed_time BIGINT(20)   NOT NULL,
  PRIMARY KEY (id)
);
