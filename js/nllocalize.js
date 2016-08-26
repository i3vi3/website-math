var monthName = {
    January:    {ja_JP: "1月", zh_TW: "一月" },
    February:   {ja_JP: "2月", zh_TW: "二月" },
    March:      {ja_JP: "3月", zh_TW: "三月" },
    April:      {ja_JP: "4月", zh_TW: "四月" },
    May:        {ja_JP: "5月", zh_TW: "五月" },
    June:       {ja_JP: "6月", zh_TW: "六月" },
    July:       {ja_JP: "7月", zh_TW: "七月" },
    August:     {ja_JP: "8月", zh_TW: "八月" },
    September:  {ja_JP: "9月", zh_TW: "九月" },
    October:    {ja_JP: "10月", zh_TW: "十月" },
    November:   {ja_JP: "11月", zh_TW: "十一月" },
    December:   {ja_JP: "12月", zh_TW: "十二月" },
};

function createLanguageSelector () {
    // $("ul#language-selector").hide();
    var selectorString = "";
    selectorString += '<li id="language-selector-en" onclick="ga(\'send\', \'event\', \'Language Selector\', \'click\', \'English\', 1);"><a>English</a></li>';
    selectorString += '<li id="language-selector-jp" onclick="ga(\'send\', \'event\', \'Language Selector\', \'click\', \'日本語\', 1);"><a>日本語</a></li>';
    // selectorString += '<li id="language-selector-zh"><a>中</a></li>';
    $("ul#language-selector").html(selectorString);
}

function initiateTranslationData () {
    // 翻訳語リストにある語
    $.each(translationList, function(i, item) {
        var slct = item.selector;
        if( slct.substring(0,1) == "/") {
            slct = "span:contains(" + slct.substring(1) + ")";
        }
        $(slct).each(function() {
            $(this).attr("data-en-GB", $(this).text());
        });
    });

    // 日付
    $('.date').each(function() {
        $(this).attr("data-en-GB", $(this).text());
    });
}

$(function(){
    initiateTranslationData();
    createLanguageSelector();
    // 英語選択時の処理
    $("#language-selector-en").click(function () {
        // lang 属性をもつ span 要素，の処理
        $('span[lang="en_GB"]').show();
        $('span[lang="ja_JP"]').hide();
        $('span[lang="zh-TW"]').hide();
        // メニューの処理
        $("#nav-Home").text("Home");
        $("#nav-Papers").text("Papers");
        $("#nav-Talks").text("Talks");
        // 翻訳リストに載っている要素の処理
        $("[data-en-GB]").each(function() {
            $(this).html($(this).attr('data-en-GB'));
        });
        //$("#language-selector-en").addClass("active");
        //$("#language-selector-jp").removeClass("active");
        //$("#language-selector-zh").removeClass("active");
        Cookies.set('userLanguage', "en_GB", { expires: 365 } );
    });

    // 日本語選択時の処理
    $("#language-selector-jp").click(function () {
        // lang 属性をもつ span 要素の処理
        $('span[lang="en_GB"]').hide();
        $('span[lang="ja_JP"]').show();
        $('span[lang="zh_TW"]').hide();
        // メニューの処理
        $("#nav-Home").text("ホーム");
        $("#nav-Papers").text("論文");
        $("#nav-Talks").text("講演");
        // 翻訳リストに載っている要素の処理
        $.each(translationList, function(i, item) {
            var slct = item.selector;
            if( slct.substring(0,1) == "/") {
                slct = "span:contains(" + slct.substring(1) + ")";
            }
            $(slct).html(item.ja_JP);
        });
        // 日付の処理
        $('span.date').each(function() {
            var array = $(this).attr('data-en-GB').split(" ");
            for(var month in monthName) {
                if( month.startsWith(array[0].substr(0,3)) ) {
                    $(this).text(array[1] + "年" + monthName[month].ja_JP);
                    break;
                }
            }
        });
        //$("#language-selector-en").removeClass("active");
        //$("#language-selector-jp").addClass("active");
        //$("#language-selector-zh").removeClass("active");
        Cookies.set('userLanguage', "ja_JP", { expires: 365 });
    });

    // 繁体中国語選択時の処理
    $("#language-selector-zh").click(function () {
        // lang 属性をもつ span 要素の処理
        $('span[lang="en_GB"]').hide();
        $('span[lang="ja_JP"]').hide();
        $('span[lang="zh_TW"]').show();
        // メニューの処理
        $("#nav-Home").text("ホーム");
        $("#nav-Papers").text("論文");
        $("#nav-Talks").text("演講");
        // 翻訳リストに載っている要素の処理
        $.each(translationList, function(i, item) {
            var slct = item.selector;
            if( slct.substring(0,1) == "/") {
                slct = "span:contains(" + slct.substring(1) + ")";
            }
            $(slct).html(item.zh_TW);
        });
        // 日付の処理
        $('span.date').each(function() {
            var array = $(this).attr('data-en-GB').split(" ");
            $(this).text(array[1] + "年" + monthName[array[0]].ja_JP);
        });
        //$("#language-selector-en").removeClass("active");
        //$("#language-selector-jp").removeClass("active");
        //$("#language-selector-zh").addClass("active");
        Cookies.set('userLanguage', "zh_TW", { expires: 365 });
    });

    var userLanguage = Cookies.get('userLanguage');
    if ( typeof userLanguage == undefined)
        userLanguage = "en_GB";
    if ( userLanguage == "ja_JP" ) {
        $("#language-selector-jp").trigger('click');
    } else if ( userLanguage == "zh_TW" ) {
        $("#language-selector-zh").trigger('click');
    } else {
        $("#language-selector-en").trigger('click');
    }
    // $(window).trigger('resize');
});

