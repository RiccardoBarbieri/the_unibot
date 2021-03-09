CREATE TABLE [data] (
	[user_id] INT(15) NOT NULL,
	[chat_id] INT(15) NOT NULL,
	[detail] INT(1),
	[year] INT(1),
	[course] VARCHAR(25),
	PRIMARY KEY (user_id, chat_id)
);