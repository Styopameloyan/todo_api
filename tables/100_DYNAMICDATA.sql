SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DYNAMICDATA]
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

ALTER TABLE [DYNAMICDATA] ADD [className][nvarchar](50) NOT NULL
GO

ALTER TABLE [DYNAMICDATA] ADD [reference1] [uniqueidentifier] NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [reference2] [uniqueidentifier] NULL
GO

-- Strings
ALTER TABLE [DYNAMICDATA] ADD [string1_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string2_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string3_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string4_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string5_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string6_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string7_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string8_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string9_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string10_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string11_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string12_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string13_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string14_50][nvarchar](50) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string15_50][nvarchar](50) NULL
GO

ALTER TABLE [DYNAMICDATA] ADD [string1_200][nvarchar](200) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string2_200][nvarchar](200) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string3_200][nvarchar](200) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string4_200][nvarchar](200) NULL
GO


ALTER TABLE [DYNAMICDATA] ADD [string1_400][nvarchar](400) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string2_400][nvarchar](400) NULL
GO
 
ALTER TABLE [DYNAMICDATA] ADD [string1_max][nvarchar](max) NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [string2_max][nvarchar](max) NULL
GO

-- Number
ALTER TABLE [DYNAMICDATA] ADD [number1][decimal](10, 2) NULL
GO 
ALTER TABLE [DYNAMICDATA] ADD [number2][decimal](10, 2) NULL
GO 
ALTER TABLE [DYNAMICDATA] ADD [number3][decimal](10, 2) NULL
GO 
ALTER TABLE [DYNAMICDATA] ADD [number4][decimal](10, 2) NULL
GO 


-- Date 
ALTER TABLE [DYNAMICDATA] ADD [date1] [datetimeoffset] NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [date2] [datetimeoffset] NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [date3] [datetimeoffset] NULL
GO
ALTER TABLE [DYNAMICDATA] ADD [date4] [datetimeoffset] NULL
GO
 
-- Boolean
ALTER TABLE [DYNAMICDATA] ADD [boolean1][decimal](2, 0) NULL
GO 
ALTER TABLE [DYNAMICDATA] ADD [boolean2][decimal](2, 0) NULL
GO 
ALTER TABLE [DYNAMICDATA] ADD [boolean3][decimal](2, 0) NULL
GO 
ALTER TABLE [DYNAMICDATA] ADD [boolean4][decimal](2, 0) NULL
GO 
ALTER TABLE [DYNAMICDATA] ADD [boolean5][decimal](2, 0) NULL
GO 

-- Price
ALTER TABLE [DYNAMICDATA] ADD [price1][decimal](12, 3) NULL
GO 
ALTER TABLE [DYNAMICDATA] ADD [price2][decimal](12, 3) NULL
GO 
ALTER TABLE [DYNAMICDATA] ADD [price3][decimal](12, 3) NULL
GO 