SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FILE]
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

ALTER TABLE [FILE] ADD [name][nvarchar](400) NOT NULL
GO
ALTER TABLE [FILE] ADD [reference] [uniqueidentifier] NOT NULL
GO
ALTER TABLE [FILE] ADD [type][nvarchar](400)  NULL
GO
ALTER TABLE [FILE] ADD [path][nvarchar](400) NOT NULL
GO
ALTER TABLE [FILE] ADD [size][decimal](15, 3)NULL
GO
ALTER TABLE [FILE] ADD [className][nvarchar](100) NULL
GO
ALTER TABLE [FILE] ADD [public][decimal](2, 0) NULL
GO
ALTER TABLE [FILE] ADD [department][nvarchar](100) NULL
GO
ALTER TABLE [FILE] ADD [company][nvarchar](50) NULL
GO
ALTER TABLE [FILE] ADD [share][nvarchar](max) NULL
GO
ALTER TABLE [FILE] ADD [title][nvarchar](200) NULL
GO
ALTER TABLE [FILE] ADD [description][nvarchar](4000) NULL
GO



