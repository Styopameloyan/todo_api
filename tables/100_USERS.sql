SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USERS]
(

    [updateDate] [datetimeoffset] NULL,
    [createDate] [datetimeoffset] NULL,
    [mail] [nvarchar](50) NOT NULL,
    [displayName] [nvarchar](100) NOT NULL,
    [password] [nvarchar](255) NOT NULL,
 
    PRIMARY KEY CLUSTERED 
(
	[mail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON ) ON [PRIMARY]
) ON [PRIMARY] 
GO
 

-- UNIQUE key
-- ALTER TABLE [USERS] ADD CONSTRAINT [USERS_userPrincipalName] UNIQUE([userPrincipalName])

