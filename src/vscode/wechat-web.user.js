// ==UserScript==
// @name         WeChat Web App with VS Code Style
// @namespace    https://github.com/bensgith/tampermonkey-scripts
// @version      0.8.0
// @description  Change style to VS Code-alike
// @author       Benjamin L
// @match        https://wx2.qq.com/*
// @icon         https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico
// @grant        GM_addStyle
// @grant        GM_addElement
// ==/UserScript==

(function() {
    'use strict';

    let vscode_favico = 'https://code.visualstudio.com/favicon.ico';
    let vscode_name = 'VS Code';


    // change tab tittle and icon
    var shortcut_icon = document.getElementsByTagName('link')[0];
    shortcut_icon.href = vscode_favico;
    // set title every 0.5 second, never end
    setInterval(function() {
        var titleNode = document.getElementsByTagName('title')[0];
        titleNode.innerHTML = vscode_name;
    }, 500);


    // login page
    if (document.getElementsByClassName('login').length > 0) {
        var loginAvatarInterval = setInterval(function() {
            var association_img = document.getElementsByClassName('association')[0].firstElementChild;
            association_img.src = vscode_favico;
        }, 500);
    }


   var headerAvatarInterval = setInterval(function() {
        var nickname = document.getElementsByClassName('nickname')[0].firstElementChild;
        var avatarImg = document.querySelector(".header .avatar .img");
        if (avatarImg.src != vscode_favico && nickname.innerHTML === vscode_name) {
            // if successfully changed, show avatar and name
            GM_addStyle('.header .avatar .img{display:block;width:27px;height:27px}');
            GM_addStyle('.header .info .nickname .display_name{display:inline-block;width:auto}');
        }
        avatarImg.src = vscode_favico;
        nickname.innerHTML = vscode_name;
    }, 500);


    var css = `
        /* Common elements */
        .main {
            min-height:100%;
            padding-top:0px;
        }
        .main .copyright {
            display:none;
        }
        .main_inner {
            max-width:100%;
        }
        .button_primary {
            background-color:#0E639C !important;
            border-color:#0E639C !important;
        }
        .button_default,
        .waiting_confirm  {
            background-color:#333333 !important;
            color:white !important;
        }


        /* Login Page */
        .lang,
        .copyright,
        .sub_title,
        .sub_desc,
        .web_wechat_login_logo {
            display:none;
        }
        .login {
            background-color:#333333;
        }
        .login_box {
            background-color:#1E1E1E;
        }
        .login_box .avatar .action {
            background-color:#333333 !important;
            color:white !important;
        }


        /* Chatting Page */
        /* left panel */
        #search_bar,
        .tab,
        .download_entry,
        .header .avatar .img,
        .header .info .nickname .display_name,
        .chat_item .avatar .img,
        .chat_item .info .msg,
        .chat_item .ext,
        .chat_item .nickname .emoji {
            display: none;
        }
        .panel{
            background-color:#252526;
            width:220px;
        }
        .dropdown_menu {
            background-color:#333333;
            border-color:#414141;
        }
        .dropdown_menu li a {
            border-bottom-color:#414141;
            color:white;
        }
        .dropdown_menu li a:hover {
            background-color:#37373D;
        }
        .chat_item {
            padding:6px 20px 6px;
            border-bottom: none;
        }
        .chat_item .avatar {
            height: 15px;
            width: 15px;
            float: left;
            margin-right: 5px;
            position: relative;
            background: url(https://img2.imgtp.com/2024/04/18/vNEgsIni.png) no-repeat;
            background-position: -224px -170px;
            background-size: 478px 462px;
        }
        .chat_item.active {
            background:#37373D;
        }
        .nav_view {
            top:64px !important;
        }
        .web_wechat_reddot {
            background:url(https://img2.imgtp.com/2024/04/18/vNEgsIni.png) no-repeat;
            background-position:-473px -380px;
        }
        .web_wechat_reddot_middle {
            background:url(https://img2.imgtp.com/2024/04/18/vNEgsIni.png) no-repeat;
            background-position: -451px -380px;
        }


        /* message panel */
        .web_wechat_nomes_icon,
        .bubble_cont .app .cover,
        .box_hd .title .title_name .emoji,
        .message .avatar,
        .message .nickname .emoji,
        .message .message_system .content .emoji {
            display:none;
        }
        #chatArea {
            background-color:#1E1E1E;
            color:white;
        }
        .box_hd {
            text-align: left;
        }
        .box_hd .title_wrap {
            border-bottom-color: #414141;
            background-color: #1E1E1E;
        }
        .box_hd .title .title_name {
            color: white;
        }
        .members_wrp {
            box-shadow: none;
            -moz-box-shadow: none;
            -webkit-box-shadow: none;
        }
        .members {
            background-color: #252526;
            border-bottom-color: #414141;
        }
        .bubble {
            background-color:#1E1E1E !important;
            margin:3px 10px;
            max-width: none;
        }
        .bubble.bubble_primary.right.arrow_primary:before,
        .bubble.bubble_primary.right:after {
            border-left-color:#0E639C;
        }
        .bubble_cont .app {
            background-color:#2D2D2D;
            padding: 2px 6px;
            margin:0 4px;
            max-width: none;
        }
        .bubble_cont .app .title {
            color:white;
            margin-bottom: 2px;
        }
        .bubble_cont .plain {
            padding: 2px 6px;
        }
        .bubble_cont .picture {
            padding:0 8px;
        }
        .bubble:after,
        .bubble:before {
            top: 7px;
        }
        .message {
            margin-bottom:0;
        }
        .message_system {
            margin:0 auto;
            text-align: left;
            max-width: none;
        }
        .message_system .content {
            padding: 1px 16px;
        }
        .content .masked {
            color: #6A9955;
        }


        /* reply panel */
        .btn_send,
        .chat .box_ft .desc {
            display:none;
        }
        .chat .box_ft {
            border-top-color:#414141;
        }
        .chat .box_ft .action {
            background-color:#1E1E1E !important;
        }
        .exp_hd,
        .exp_hd_item {
            background-color:#333333;
        }
        .exp_bd,
        .exp_hd_item.active {
            background-color:#252526;
        }
        .exp_hd_item a {
            color:white;
        }
        .expression {
            border-color:#414141;
        }
        .expression:after {
            border-top-color:#252526;
        }
        .qq_face a,
        .emoji_face a {
            border-bottom-color:#414141;
            border-right-color:#414141;
        }


        /* dialog */
        .ngdialog.default .ngdialog-content {
            background-color:#252526;
            color:white;
        }
        .add_chatroom .dialog_hd .title,
        .create_chatroom_dlg .dialog_hd .title,
        .transpond-dialog .dialog_hd .title,
        .selector,
        .chooser .contact_title {
            background-color:#252526;
        }
        .transpond-dialog .dialog_ft .button_primary {
            background-color:#0E639C;
        }
        .nav_tab,
        .selector .input_box .input {
            background-color:#252526;
            color:white;
        }
        .chooser .contact_item {
            background-color:#252526;
            border-bottom-color:#414141;
        }
        .chooser .active .contact_item {
            background-color:#2D2D2D;
            border-bottom-color:#414141;
        }
        .nav_tabs {
            background-color:#252526;
            border-bottom-color:#414141;
            color:white;
        }
        .dialog_ft {
            border-top-color:#414141;
        }
        .rooms .contact_list .contact_item {
            border-bottom-color:#414141;
        }
        .rooms .contact_list .info .nickname {
            color:white;
        }
    `;
    GM_addStyle(css);

    // clear intervals after 10 mins
    setTimeout(function() {
        clearInterval(loginAvatarInterval);
        console.log('cleared interval: loginAvatarInterval');
        clearInterval(headerAvatarInterval);
        console.log('cleared interval: headerAvatarInterval');
    }, 600000);

    // mask chat item name on the side panel
    maskChatItemNames();
    // mask media content like pictures, videos
    maskMessageMediaContent();
    // mask emojis, qq emojis, custom emojis
    maskMessageEmojis();
    maskMessageEmojis2();

    maskSystemMessages();


    //////////////////////////////
    // functions
    //////////////////////////////
    function maskChatItemNames() {
        const maskedNames = ['Algorithm', 'Database', 'Binary', 'Compiler', 'Encryption', 'Firewall', 'Cloud Computing', 'Kernel', 'Network', 'Protocol',
        'Cache', 'Artificial Intelligence', 'Machine Learning', 'Cybersecurity', 'Big Data', 'Virtualization', 'Debugging', 'API', 'Recursion', 'Syntax'];
        setInterval(function() {
            var names = document.querySelectorAll(".chat_item .info .nickname_text");
            for (let i = 0; i < names.length; i++) {
                names[i].innerHTML = maskedNames[i];
            }
        }, 1000);
    }

    function maskMessageEmojis() {
        setInterval(function() {
            var customEmojis = document.querySelectorAll(".content .emoticon .custom_emoji");
            for (let i = 0; i < customEmojis.length; i++) {
                GM_addElement(customEmojis[i].parentElement, 'span', {
                    class: 'masked',
                    textContent: '(custom_emoji)'
                });
                customEmojis[i].remove();
            }
        }, 1000);
    }

    function maskMessageEmojis2() {
        setInterval(function() {
            var plainMsgs = document.querySelectorAll(".message .content .bubble .bubble_cont .plain");
            for (let i = 0; plainMsgs.length; i++) {
                // TODO: TypeError: Cannot read properties of undefined (reading 'querySelectorAll')
                var emojiImgs = plainMsgs[i].querySelectorAll("pre img");
                for (let j = 0; emojiImgs.length; j++) {
                    // get the 2nd class name as emoji ID
                    var classStr = emojiImgs[j].getAttribute("class").split(" ")[1];
                    emojiImgs[j].remove();
                    GM_addElement(plainMsgs[i].getElementsByTagName("pre")[0], 'span', {
                        class: 'masked',
                        textContent: '(' + getEmojiTextByClass(classStr) + ')'
                    });
                }
            }

            // TODO: not working
            /*
            var customEmojis = document.querySelectorAll(".content .emoticon .custom_emoji");
            for (let i = 0; i < customEmojis.length; i++) {
                GM_addElement(customEmojis[i].parentElement, 'span', {
                    class: 'masked',
                    textContent: '(custom_emoji)'
                });
                customEmojis[i].remove();
            }*/
        }, 1000);
    }

    function maskMessageMediaContent() {
        setInterval(function() {
            // mask images
            var pictures = document.querySelectorAll(".content .bubble .bubble_cont .picture");
            for (let i = 0; i < pictures.length; i++) {
                pictures[i].parentElement.innerHTML = getMaskHtml('IMAGE');
            }
            // mask videos
            var videos = document.querySelectorAll(".content .bubble .bubble_cont .video");
            for (let i = 0; i < videos.length; i++) {
                videos[i].parentElement.innerHTML = getMaskHtml('VIDEO');
            }
            // mask location
            var locations = document.querySelectorAll(".content .bubble .bubble_cont .location");
            for (let i = 0; i < locations.length; i++) {
                locations[i].parentElement.innerHTML = getMaskHtml('LOCATION');
            }
            // mask plain message hints
            var plainMsgs = document.querySelectorAll(".content .bubble .bubble_cont .plain pre");
            for (let i = 0; i < plainMsgs.length; i++) {
                if (plainMsgs[i].innerHTML.includes("收到一条网页版微信暂不支持的消息类型")) {
                    plainMsgs[i].innerHTML = '<p class="masked">(UNSUPPORTED MESSAGE)</p>';
                } else if (plainMsgs[i].innerHTML.includes("Send an emoji, view it on mobile")) {
                    plainMsgs[i].innerHTML = '<p class="masked">(UNSUPPORTED EMOJI)</p>';
                }
            }
            // mask name cards
            var cards = document.querySelectorAll(".content .bubble .bubble_cont .card");
            for (let i = 0; i < cards.length; i++) {
                var name = cards[i].querySelectorAll(".card_bd .info h3")[0];
                cards[i].parentElement.innerHTML = getMaskHtml('CARD: ' + name.innerText);
            }
        }, 1000);
    }

    function maskSystemMessages() {
        setInterval(function() {
            var sysMsgs = document.querySelectorAll(".message_system .content");
            var sysMsgsStr;
            for (let i = 0; i < sysMsgs.length; i++) {
                sysMsgsStr = sysMsgs[i].innerHTML;
                if (!sysMsgsStr.includes("//")) {
                    sysMsgs[i].innerHTML = "";
                    GM_addElement(sysMsgs[i], 'p', {
                        class: 'masked',
                        textContent: '// ' + sysMsgsStr
                    });
                }

            }
        }, 1000);
    }

    function getMaskHtml(maskText) {
        return `<div class="plain">
                    <pre class="js_message_plain masked">(${maskText})</pre>
                    <img ng-show="message.MMStatus == 1" class="ico_loading ng-hide" src="//res.wx.qq.com/t/wx_fed/webwx/res/static/img/xasUyAI.gif" alt="">
                    <i class="ico_fail web_wechat_message_fail ng-hide" ng-click="resendMsg(message)" ng-show="message.MMStatus == 5" title="Resend"></i>
                </div>`;
    }

    function getEmojiTextByClass(emojiClass) {
        const qqface_names_map = new Map(
            [['qqemoji0', 'Smile'],
             ['qqemoji1', 'Grimace'],
             ['qqemoji2', 'Drool'],
             ['qqemoji3', 'Scowl'],
             ['qqemoji4', 'CoolGuy'],
             ['qqemoji5', 'Sob'],
             ['qqemoji6', 'Shy'],
             ['qqemoji7', 'Silent'],
             ['qqemoji8', 'Sleep'],
             ['qqemoji9', 'Cry'],
             ['qqemoji10', 'Awkward'],
             ['qqemoji11', 'Angry'],
             ['qqemoji12', 'Tongue'],
             ['qqemoji13', 'Grin'],
             ['qqemoji14', 'Surprise'],
             ['qqemoji15', 'Frown'],
             ['qqemoji16', 'Ruthless'],
             ['qqemoji17', 'Blush'],
             ['qqemoji18', 'Scream'],
             ['qqemoji19', 'Puke'],
             ['qqemoji20', 'Chuckle'],
             ['qqemoji21', 'Joyful'],
             ['qqemoji22', 'Slight'],
             ['qqemoji23', 'Smug'],
             ['qqemoji24', 'Hungry'],
             ['qqemoji25', 'Drowsy'],
             ['qqemoji26', 'Panic'],
             ['qqemoji27', 'Sweat'],
             ['qqemoji28', 'Laugh'],
             ['qqemoji29', 'Commando'],
             ['qqemoji30', 'Determined'],
             ['qqemoji31', 'Scold'],
             ['qqemoji32', 'Shocked'],
             ['qqemoji33', 'Shhh'],
             ['qqemoji34', 'Dizzy'],
             ['qqemoji35', 'Tormented'],
             ['qqemoji36', 'Toasted'],
             ['qqemoji37', 'Skull'],
             ['qqemoji38', 'Hammer'],
             ['qqemoji39', 'Wave'],
             ['qqemoji40', 'Speechless'],
             ['qqemoji41', 'NosePick'],
             ['qqemoji42', 'Clap'],
             ['qqemoji43', 'Shame'],
             ['qqemoji44', 'Trick'],
             ['qqemoji45', 'Bah！L'],
             ['qqemoji46', 'Bah！R'],
             ['qqemoji47', 'Yawn'],
             ['qqemoji48', 'Pooh-pooh'],
             ['qqemoji49', 'Shrunken'],
             ['qqemoji50', 'TearingUp'],
             ['qqemoji51', 'Sly'],
             ['qqemoji52', 'Kiss'],
             ['qqemoji53', 'Wrath'],
             ['qqemoji54', 'Whimper'],
             ['qqemoji55', 'Cleaver'],
             ['qqemoji56', 'Watermelon'],
             ['qqemoji57', 'Beer'],
             ['qqemoji58', 'Basketball'],
             ['qqemoji59', 'PingPong'],
             ['qqemoji60', 'Coffee'],
             ['qqemoji61', 'Rice'],
             ['qqemoji62', 'Pig'],
             ['qqemoji63', 'Rose'],
             ['qqemoji64', 'Wilt'],
             ['qqemoji65', 'Lips'],
             ['qqemoji66', 'Heart'],
             ['qqemoji67', 'BrokenHeart'],
             ['qqemoji68', 'Cake'],
             ['qqemoji69', 'Lightning'],
             ['qqemoji70', 'Bomb'],
             ['qqemoji71', 'Dagger'],
             ['qqemoji72', 'Soccer'],
             ['qqemoji73', 'Ladybug'],
             ['qqemoji74', 'Poop'],
             ['qqemoji75', 'Moon'],
             ['qqemoji76', 'Sun'],
             ['qqemoji77', 'Gift'],
             ['qqemoji78', 'Hug'],
             ['qqemoji79', 'ThumbsUp'],
             ['qqemoji80', 'ThumbsDown'],
             ['qqemoji81', 'Shake'],
             ['qqemoji82', 'Peace'],
             ['qqemoji83', 'Fight'],
             ['qqemoji84', 'Beckon'],
             ['qqemoji85', 'Fist'],
             ['qqemoji86', 'Pinky'],
             ['qqemoji87', 'RockOn'],
             ['qqemoji88', 'Nuh-uh'],
             ['qqemoji89', 'OK'],
             ['qqemoji90', 'InLove'],
             ['qqemoji91', 'Blowkiss'],
             ['qqemoji92', 'Waddle'],
             ['qqemoji93', 'Tremble'],
             ['qqemoji94', 'Aaagh!'],
             ['qqemoji95', 'Twirl'],
             ['qqemoji96', 'Kotow'],
             ['qqemoji97', 'Dramatic'],
             ['qqemoji98', 'JumpRope'],
             ['qqemoji99', 'Surrender'],
             ['qqemoji100', 'Hooray'],
             ['qqemoji101', 'Meditate'],
             ['qqemoji102', 'Smooch'],
             ['qqemoji103', 'TaiChi L'],
             ['qqemoji104', 'TaiChi R'],
             // from emoji panel
             ['qqemoji105', 'Hey'],
             ['qqemoji106', 'Facepalm'],
             ['qqemoji107', 'Smirk'],
             ['qqemoji108', 'Smart'],
             ['qqemoji109', 'Concerned'],
             ['qqemoji110', 'Yeah!'],
             ['qqemoji112', 'Packet'],
             ['qqemoji111', 'Chicken']]
        );
        const emoji_names_map = new Map(
            [['emoji1f637', 'Laugh'],
             ['emoji1f604', 'Sick'],
             ['emoji1f639', 'Lol'],
             ['emoji1f61d', 'Tongue'],
             ['emoji1f633', 'Blush'],
             ['emoji1f631', 'Terror'],
             ['emoji1f64d', 'Let Down'],
             ['emoji1f612', 'Speechless'],
             ['emoji1f47b', 'Ghost'],
             ['emoji1f4aa', 'Strong'],
             ['emoji1f389', 'Party'],
             ['emoji1f4e6', 'Gift'],
             ['emoji1f60a', 'Happy'],
             ['emoji1f63a', 'Big Smile'],
             ['emoji263a', 'Glowing'],
             ['emoji1f609', 'Wink'],
             ['emoji1f63b', 'Drool'],
             ['emoji1f63d', 'Smooch'],
             ['emoji1f61a', 'Kiss'],
             ['emoji1f63c', 'Grin'],
             ['emoji1f60c', 'Satisfied'],
             ['emoji1f61c', 'Tease'],
             ['emoji1f60f', 'CoolGuy'],
             ['emoji1f613', 'Sweat'],
             ['emoji1f61e', 'Low'],
             ['emoji1f4ab', 'Ugh'],
             ['emoji1f625', 'Anxious'],
             ['emoji1f630', 'Worried'],
             ['emoji1f628', 'Shocked'],
             ['emoji1f62b', 'D’oh!'],
             ['emoji1f63f', 'Tear'],
             ['emoji1f62d', 'Cry'],
             ['emoji1f632', 'Dizzy'],
             ['emoji1f620', 'Upset'],
             ['emoji1f64e', 'Angry'],
             ['emoji1f62a', 'Zzz'],
             ['emoji1f47f', 'Demon'],
             ['emoji1f47d', 'Alien'],
             ['emoji2764', 'Heart'],
             ['emoji1f494', 'BrokenHeart'],
             ['emoji1f498', 'Cupid'],
             ['emoji2747', 'Twinkle'],
             ['emoji1f31f', 'Star'],
             ['emoji2755', '!'],
             ['emoji2754', '?'],
             ['emoji1f4a4', 'Asleep'],
             ['emoji1f4a7', 'Drops'],
             ['emoji1f3b5', 'Music'],
             ['emoji1f525', 'Fire'],
             ['emoji1f4a9', 'Poop'],
             ['emoji1f44d', 'ThumbsUp'],
             ['emoji1f44e', 'ThumbsDown'],
             ['emoji1f44a', 'Fist'],
             ['emoji270c', 'Peace'],
             ['emoji1f446', 'Up'],
             ['emoji1f447', 'Down'],
             ['emoji1f449', 'Right'],
             ['emoji1f448', 'Left'],
             ['emoji261d', '#1'],
             ['emoji1f48f', 'Kissing'],
             ['emoji1f491', 'Couple'],
             ['emoji1f466', 'Boy'],
             ['emoji1f467', 'Girl'],
             ['emoji1f469', 'Lady'],
             ['emoji1f468', 'Man'],
             ['emoji1f47c', 'Angel'],
             ['emoji1f480', 'Skull'],
             ['emoji1f48b', 'Lips'],
             ['emoji2600', 'Sun'],
             ['emoji2614', 'Rain'],
             ['emoji2601', 'Cloud'],
             ['emoji26c4', 'Snowman'],
             ['emoji1f31b', 'Moon'],
             ['emoji26a1', 'Lightning'],
             ['emoji1f30a', 'Waves'],
             ['emoji1f431', 'Cat'],
             ['emoji1f436', 'Doggy'],
             ['emoji1f42d', 'Mouse'],
             ['emoji1f439', 'Hamster'],
             ['emoji1f430', 'Rabbit'],
             ['emoji1f43a', 'Dog'],
             ['emoji1f438', 'Frog'],
             ['emoji1f42f', 'Tiger'],
             ['emoji1f428', 'Koala'],
             ['emoji1f43b', 'Bear'],
             ['emoji1f43d', 'Pig'],
             ['emoji1f42e', 'Cow'],
             ['emoji1f417', 'Boar'],
             ['emoji1f435', 'Monkey'],
             ['emoji1f434', 'Horse'],
             ['emoji1f40d', 'Snake'],
             ['emoji1f426', 'Pigeon'],
             ['emoji1f414', 'Chicken'],
             ['emoji1f427', 'Penguin'],
             ['emoji1f41b', 'Caterpillar'],
             ['emoji1f419', 'Octopus'],
             ['emoji1f420', 'Fish'],
             ['emoji1f433', 'Whale'],
             ['emoji1f42c', 'Dolphin'],
             ['emoji1f339', 'Rose'],
             ['emoji1f33a', 'Flower'],
             ['emoji1f334', 'Palm'],
             ['emoji1f335', 'Cactus'],
             ['emoji1f49d', 'Candy Box'],
             ['emoji1f383', 'Jack-o-lantern'],
             ['emoji1f385', 'Santa'],
             ['emoji1f384', 'Xmas Tree'],
             ['emoji1f514', 'Bell'],
             ['emoji1f388', 'Balloon'],
             ['emoji1f4bf', 'CD'],
             ['emoji1f4f7', 'Camera'],
             ['emoji1f4f9', 'Film Camera'],
             ['emoji1f4bb', 'Computer'],
             ['emoji1f4fa', 'TV'],
             ['emoji1f4de', 'Phone'],
             ['emoji1f513', 'Unlocked'],
             ['emoji1f510', 'Locked'],
             ['emoji1f511', 'Key'],
             ['emoji1f528', 'Judgement'],
             ['emoji1f4a1', 'Light bulb'],
             ['emoji1f4eb', 'Mail'],
             ['emoji1f6c0', 'Wash'],
             ['emoji1f4b5', 'Money'],
             ['emoji1f4a3', 'Bomb'],
             ['emoji1f52b', 'Pistol'],
             ['emoji1f48a', 'Pill'],
             ['emoji1f3c8', 'Football'],
             ['emoji1f3c0', 'Basketball'],
             ['emoji26bd', 'Soccer'],
             ['emoji26be', 'Baseball'],
             ['emoji26f3', 'Golf'],
             ['emoji1f3c6', 'Trophy'],
             ['emoji1f47e', 'Invader'],
             ['emoji1f3a4', 'Singing'],
             ['emoji1f3b8', 'Guitar'],
             ['emoji1f459', 'Bikini'],
             ['emoji1f451', 'Crown'],
             ['emoji1f302', 'Umbrella'],
             ['emoji1f45c', 'Purse'],
             ['emoji1f484', 'Lipstick'],
             ['emoji1f48d', 'Ring'],
             ['emoji1f48e', 'Gem'],
             ['emoji2615', 'Coffee'],
             ['emoji1f37a', 'Beer'],
             ['emoji1f37b', 'Toast'],
             ['emoji1f379', 'Martini'],
             ['emoji1f354', 'Burger'],
             ['emoji1f35f', 'Fries'],
             ['emoji1f35d', 'Sphaghetti'],
             ['emoji1f363', 'Sushi'],
             ['emoji1f35c', 'Noodles'],
             ['emoji1f373', 'Eggs'],
             ['emoji1f366', 'Ice Cream'],
             ['emoji1f382', 'Cake'],
             ['emoji1f34f', 'Apple'],
             ['emoji2708', 'Plane'],
             ['emoji1f680', 'Rocket ship'],
             ['emoji1f6b2', 'Bike'],
             ['emoji1f684', 'Bullet Train'],
             ['emoji26a0', 'Warning'],
             ['emoji1f3c1', 'Flag'],
             ['emoji1f6b9', 'Men'],
             ['emoji1f6ba', 'Women'],
             ['emoji2b55', 'O'],
             ['emoji2716', 'X'],
             ['emojia9', 'Copyright'],
             ['emojiae', 'Registered TM'],
             ['emoji2122', 'Trademark'],
             // extra (not in qq face or emoji panel)
             ['emoji1f1fa1f1f8', 'America Flag'],
             ['emoji1f1ec1f1e7', 'Canada Flag']]
        );
        if (emojiClass.startsWith("qq")) {
            return qqface_names_map.get(emojiClass);
        }
        return emoji_names_map.get(emojiClass);
    }

})();