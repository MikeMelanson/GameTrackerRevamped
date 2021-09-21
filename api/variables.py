games_table_query = """CREATE TABLE Games (
    Id                 INTEGER        PRIMARY KEY AUTOINCREMENT,
    Title              VARCHAR (100)  NOT NULL,
    System             VARCHAR (100)  REFERENCES Systems (Name) 
                                      NOT NULL,
    DateAcquired       DATE,
    PricePaid          DOUBLE (100),
    Rating             INTEGER (10),
    Publisher          VARCHAR (100),
    Developer          VARCHAR (100),
    Status             VARCHAR (20)   NOT NULL
                                      DEFAULT Unplayed,
    Condition          VARCHAR (50),
    Completeness       VARCHAR (50),
    TimePlayed         BIGINT (10000),
    Region             VARCHAR (20),
    Ownership          VARCHAR (20),
    Notes              VARCHAR (1000),
    NowPlaying         INTEGER        DEFAULT (0),
    EarnedAchievements INTEGER (2000),
    TotalAchievements  INTEGER (2000),
    Compilation        INTEGER,
    DateAdded          DATETIME       DEFAULT (CURRENT_TIMESTAMP) 
                                      NOT NULL,
    NumberOwned        INTEGER        DEFAULT (1),
    Genre1             VARCHAR (50),
    Genre2             VARCHAR (50),
    AcquiredFrom       VARCHAR (100),
    Image1             BLOB,
    Image2             BLOB,
    Image3             BLOB,
    Image4             BLOB,
    Image5             BLOB,
    BackgroundImage    BLOB,
    Wishlist           INTEGER        DEFAULT (0) 
);"""

systems_table_query = '''CREATE TABLE Systems (
    Name              VARCHAR (100)  PRIMARY KEY
                                     UNIQUE,
    Format            VARCHAR (100),
    Publisher         VARCHAR (100),
    DateAcquired      DATE           DEFAULT (CURRENT_TIMESTAMP),
    PricePaid         DOUBLE,
    DateAdded         DATETIME       DEFAULT (CURRENT_TIMESTAMP) 
                                     NOT NULL,
    Owned             INTEGER        DEFAULT (1),
    NumberControllers INTEGER (100),
    Ownership         VARCHAR (20),
    Region            VARCHAR (20),
    Notes             VARCHAR (1000),
    Image1            BLOB,
    Image2            BLOB,
    BackgroundImage   BLOB,
    Wishlist          INTEGER        DEFAULT (0) 
);
'''

gvalues_table_query = '''CREATE TABLE GValues (
    ID           REFERENCES Games (Id) 
                 PRIMARY KEY,
    Value VARCHAR (100),
    ValueNum DOUBLE
);'''

options_table_query = '''CREATE TABLE Options (
    Currency VARCHAR (10) DEFAULT USD,
    Exchange DOUBLE DEFAULT 0.00
);'''

changes_table_query = '''CREATE TABLE Changes (
    ID          INTEGER      REFERENCES Games (Id),
    Change      VARCHAR (20),
    DateChanged DATETIME     DEFAULT (CURRENT_TIMESTAMP) 
);'''

metacritic_table_query = '''CREATE TABLE MetacriticScores (
    ID          INTEGER PRIMARY KEY
                        REFERENCES Games (Id) 
                        NOT NULL,
    CriticScore DOUBLE,
    UserScore   DOUBLE
);'''