const nusachSfiraByDaysWithNikud = {
    1: 'הַיּוֹם יוֹם אֶחָד לָעֽוֹמֶר',
    2: 'הַיוֹם שְׁנֵי יָמִים לָעֽוֹמֶר',
    3: 'הַיוֹם שְׁלֹשָׁה יָמִים לָעֽוֹמֶר',
    4: 'הַיוֹם אַרְבָּעָה יָמִים לָעֽוֹמֶר',
    5: 'הַיוֹם חֲמִשָּׁה יָמִים לָעֽוֹמֶר',
    6: 'הַיוֹם שִׁשָּׁה יָמִים לָעֽוֹמֶר',
    7: 'הַיוֹם שִׁבְעָה יָמִים שֶׁהֵם שָׁבֽוּעַ אֶחָד לָעֽוֹמֶר',
    8: 'הַיוֹם שְׁמוֹנָה יָמִים שֶׁהֵם שָׁבֽוּעַ אֶחָד וְיוֹם אֶחָד לָעֽוֹמֶר',
    9: 'הַיוֹם תִּשְׁעָה יָמִים שֶׁהֵם שָׁבֽוּעַ אֶחָד וּשְׁנֵי יָמִים לָעֽוֹמֶר',
    10: 'הַיוֹם עֲשָׂרָה יָמִים שֶׁהֵם שָׁבֽוּעַ אֶחָד וְשְׁלֹשָׁה יָמִים לָעֽוֹמֶר',
    11: 'הַיוֹם אַחַד עָשָׂר יוֹם שֶׁהֵם שָׁבֽוּעַ אֶחָד וְאַרְבָּעָה יָמִים לָעֽוֹמֶר',
    12: 'הַיוֹם שְׁנֵים עָשָׂר יוֹם שֶׁהֵם שָׁבֽוּעַ אֶחָד וַחֲמִשָׁה יָמִים לָעֽוֹמֶר',
    13: 'הַיוֹם שְׁלֹשָׁה עָשָׂר יוֹם שֶׁהֵם שָׁבֽוּעַ אֶחָד וְשִׁשָׁה יָמִים לָעֽוֹמֶר',
    14: 'הַיוֹם אַרְבָּעָה עָשָׂר יוֹם שֶׁהֵם שְׁנֵי שָׁבוּעוֹת לָעֽוֹמֶר',
    15: 'הַיוֹם חֲמִשָׁה עָשָׂר יוֹם שֶׁהֵם שְׁנֵי שָׁבוּעוֹת וְיוֹם אֶחָד לָעֽוֹמֶר',
    16: 'הַיוֹם שִׁשָׁה עָשָׂר יוֹם שֶׁהֵם שְׁנֵי שָׁבוּעוֹת וּשְׁנֵי יָמִים לָעֽוֹמֶר',
    17: 'הַיוֹם שִׁבְעָה עָשָׂר יוֹם שֶׁהֵם שְׁנֵי שָׁבוּעוֹת וּשְׁלֹשָׁה יָמִים לָעֽוֹמֶר',
    18: 'הַיוֹם שְׁמוֹנָה עָשָׂר יוֹם שֶׁהֵם שְׁנֵי שָׁבוּעוֹת וְאַרְבָּעָה יָמִים לָעֽוֹמֶר',
    19: 'הַיוֹם תִּשְׁעָה עָשָׂר יוֹם שֶׁהֵם שְׁנֵי שָׁבוּעוֹת וְחֲמִשָׁה יָמִים לָעֽוֹמֶר',
    20: 'הַיוֹם עֲשָׂרִים יוֹם שֶׁהֵם שְׁנֵי שָׁבוּעוֹת וְשִׁשָׁה יָמִים לָעֽוֹמֶר',
    21: 'הַיוֹם אֶחָד וְעֶשְׂרִים יוֹם שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת לָעֽוֹמֶר',
    22: 'הַיוֹם שְׁנַֽיִם וְעֶשְׂרִים יוֹם שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת וְיוֹם אֶחָד לָעֽוֹמֶר',
    23: 'הַיוֹם שִׁלְשָׁה וְעֶשְׂרִים יוֹם שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת וּשְׁנֵי יָמִים לָעֽוֹמֶר',
    24: 'הַיוֹם אַרְבָּעָה וְעֶשְׂרִים יוֹם שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת וּשְׁלֹשָׁה יָמִים לָעֽוֹמֶר',
    25: 'הַיוֹם חֲמִשָׁה וְעֶשְׂרִים יוֹם שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת וְאַרְבָּעָה יָמִים לָעֽוֹמֶר',
    26: 'הַיוֹם שִׁשָׁה וְעֶשְׂרִים יוֹם שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת וְחֲמִשָׁה יָמִים לָעֽוֹמֶר',
    27: 'הַיוֹם שִׁבְעָה וְעֶשְׂרִים יוֹם שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת וְשִׁשָׁה יָמִים לָעֽוֹמֶר',
    28: 'הַיוֹם שְׁמוֹנָה וְעֶשְׂרִים יוֹם שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת לָעֽוֹמֶר',
    29: 'הַיוֹם תִּשְׁעָה וְעֶשְׂרִים יוֹם שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת וְיוֹם אֶחָד לָעֽוֹמֶר',
    30: 'הַיוֹם שְׁלֹשִׁים יוֹם שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת וּשְׁנֵי יָמִים לָעֽוֹמֶר',
    31: 'הַיוֹם אֶחָד וּשְׁלֹשִׁים יוֹם שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת וּשְׁלֹשָׁה יָמִים לָעֽוֹמֶר',
    32: 'הַיוֹם שְׁנַֽיִם וּשְׁלֹשִׁים יוֹם שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת וְאַרְבָּעָה יָמִים לָעֽוֹמֶר',
    33: 'הַיוֹם שִׁלְשָׁה וּשְׁלֹשִׁים יוֹם שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת וְחֲמִשָׁה יָמִים לָעֽוֹמֶר',
    34: 'הַיוֹם אַרְבָּעָה וּשְׁלֹשִׁים יוֹם שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת וְשִׁשָׁה יָמִים לָעֽוֹמֶר',
    35: 'הַיוֹם חֲמִשָׁה וּשְׁלֹשִׁים יוֹם שֶׁהֵם חֲמִשָׁה שָׁבוּעוֹת לָעֽוֹמֶר',
    36: 'הַיוֹם שִׁשָׁה וּשְׁלֹשִׁים יוֹם שֶׁהֵם חֲמִשָׁה שָׁבוּעוֹת וְיוֹם אֶחָד לָעֽוֹמֶר',
    37: 'הַיוֹם שִׁבְעָה וּשְׁלֹשִׁים יוֹם שֶׁהֵם חֲמִשָׁה שָׁבוּעוֹת וּשְׁנֵי יָמִים לָעֽוֹמֶר',
    38: 'הַיוֹם שְׁמוֹנָה וּשְׁלֹשִׁים יוֹם שֶׁהֵם חֲמִשָׁה שָׁבוּעוֹת וְשִׁלְשָׁה יָמִים לָעֽוֹמֶר',
    39: 'הַיוֹם תִּשְׁעָה וּשְׁלֹשִׁים יוֹם שֶׁהֵם חֲמִשָׁה שָׁבוּעוֹת וְאַרְבָּעָה יָמִים לָעֽוֹמֶר',
    40: 'הַיוֹם אַרְבָּעִים יוֹם שֶׁהֵם חֲמִשָׁה שָׁבוּעוֹת וְחֲמִשָׁה יָמִים לָעֽוֹמֶר',
    41: 'הַיוֹם אֶחָד וְאַרְבָּעִים יוֹם שֶׁהֵם חֲמִשָׁה שָׁבוּעוֹת וְשִׁשָׁה יָמִים לָעֽוֹמֶר',
    42: 'הַיוֹם שְׁנַֽיִם וְאַרְבָּעִים יוֹם שֶׁהֵם שְׁשָׁה שָׁבוּעוֹת לָעֽוֹמֶר',
    43: 'הַיוֹם שִׁלְשָׁה וְאַרְבָּעִים יוֹם שֶׁהֵם שְׁשָׁה שָׁבוּעוֹת וְיוֹם אֶחָד לָעֽוֹמֶר',
    44: 'הַיוֹם אַרְבָּעָה וְאַרְבָּעִים יוֹם שֶׁהֵם שְׁשָׁה שָׁבוּעוֹת וּשְׁנֵי יָמִים לָעֽוֹמֶר',
    45: 'הַיוֹם חֲמִשָׁה וְאַרְבָּעִים יוֹם שֶׁהֵם שְׁשָׁה שָׁבוּעוֹת וְשִׁלְשָׁה יָמִים לָעֽוֹמֶר',
    46: 'הַיוֹם שִׁשָׁה וְאַרְבָּעִים יוֹם שֶׁהֵם שְׁשָׁה שָׁבוּעוֹת וְאַרְבָּעָה יָמִים לָעֽוֹמֶר',
    47: 'הַיוֹם שִׁבְעָה וְאַרְבָּעִים יוֹם שֶׁהֵם שְׁשָׁה שָׁבוּעוֹת וְחֲמִשָׁה יָמִים לָעֽוֹמֶר',
    48: 'הַיוֹם שְׁמוֹנָה וְאַרְבָּעִים יוֹם שֶׁהֵם שְׁשָׁה שָׁבוּעוֹת וְשִׁשָׁה יָמִים לָעֽוֹמֶר',
    49: 'הַיוֹם תִּשְׁעָה וְאַרְבָּעִים יוֹם שֶׁהֵם שִׁבְעָה שָׁבוּעוֹת לָעֽוֹמֶר'
}
