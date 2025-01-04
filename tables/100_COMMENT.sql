SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMMENT]
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

ALTER TABLE [COMMENT] ADD [reference] [uniqueidentifier] NOT NULL
GO
ALTER TABLE [COMMENT] ADD [referenceCreateUser] [nvarchar](50) NULL
GO
ALTER TABLE [COMMENT] ADD [className] [nvarchar](100) NOT NULL
GO 
ALTER TABLE [COMMENT] ADD [value] [nvarchar](max) NOT NULL
GO 