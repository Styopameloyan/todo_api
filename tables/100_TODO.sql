SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TODO]
(
    -------------------------- Standard Felder
    [rowid] [uniqueidentifier] ROWGUIDCOL NOT NULL DEFAULT (newsequentialid()),
    [createUser] [nvarchar](50) NULL,
    [updateUser] [nvarchar](50) NULL,
    [updateDate] [datetimeoffset] NULL,
    [createDate] [datetimeoffset] NULL
    -------------------------- Standard Felder
 
    PRIMARY KEY CLUSTERED 
(
	[rowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON ) ON [PRIMARY]
) ON [PRIMARY] 
GO

ALTER TABLE [TODO] ADD [title] [nvarchar](400) NOT NULL
GO 
ALTER TABLE [TODO] ADD [description] [nvarchar](max) NULL
GO 
ALTER TABLE [TODO] ADD [status] [nvarchar](50) NOT NULL;
GO


-- UNIQUE key
-- ALTER TABLE [TODO] ADD CONSTRAINT [TODO_title] UNIQUE([title])
