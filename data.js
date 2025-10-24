// 默认陪玩师数据
// 这些数据会在首次访问时加载，适用于部署到 Vercel 后的初始展示

const DEFAULT_PLAYERS = [
    {
        id: '001',
        name: '芙芙',
        image: 'https://i.imgur.com/9aA6gL9.jpeg',
        photos: [
            'https://i.imgur.com/22Pmb2g.jpeg',
            'https://i.imgur.com/eAzlDHh.jpeg',
        ],
        price: '¥399/3小时',
        rating: 4.8,
        orders: 23,
        specialty: ['情绪价值', '温柔体贴', '一惊一乍'],
        games: ['PUBG', '三角洲', '其他游戏可学'],
        time: '全天可接～找我找我！',
        intro: '板板您好呀～虽然我有点菜，但是我很会提供情绪价值！！就是打游戏时会有点一惊一乍呜呜X﹏X不要骂我……',
        services: ['网吧陪玩', '漫展陪逛', '看电影', '吃饭', '逛街', '庆祝生日'],
        isHot: false
    },
    {
        id: '002',
        name: '豆豆',
        image: 'https://i.imgur.com/GoiE0Im.jpeg',
        photos: [
            'https://i.imgur.com/ZfByyVP.jpeg',
            'https://i.imgur.com/px7mxoV.jpeg',
        ],
        price: '¥399/3小时',
        rating: 4.9,
        orders: 29,
        specialty: ['情绪价值MAX', '永远爱你', '气氛组'],
        games: ['永劫无间', 'PUBG', '三角洲（新手）', '气氛组'],
        time: '全天（除特殊情况）',
        intro: '老板可以叫我豆豆～我可以给你提供最好的情绪价值，只要你下单我，我就会永远爱你，么么哒❤',
        services: ['网吧陪玩', '漫展陪逛', '看电影', '吃饭', '逛街', '庆祝生日'],
        isHot: true
    },
    {
        id: '003',
        name: '毛线',
        image: 'https://i.imgur.com/LZE9mJT.jpeg',
        photos: [
            'https://i.imgur.com/i9b9N54.jpeg',
            'https://i.imgur.com/df5bqtr.jpeg',
        ],
        price: '¥399/3小时',
        rating: 4.7,
        orders: 19,
        specialty: ['枪游精通', '趣味互动', 'VALO'],
        games: ['三角洲', 'VALO', 'REPO'],
        time: '1/3/5: 晚上6点后 | 2/4: 10am-3pm | 周末全天（无漫展/外拍）',
        intro: '可以叫我毛毛！枪游会玩VALO和三角洲，想要玩REPO之类趣味互动游戏也可以❤',
        services: ['网吧陪玩', '逛街', '吃饭', '看电影', '庆祝生日']
    },
    {
        id: '004',
        name: '月月',
        image: 'https://i.imgur.com/FNTgSyO.jpeg',
        photos: [
            'https://i.imgur.com/tZTBcD7.jpeg',
            'https://i.imgur.com/jFvVjKX.jpeg',
        ],
        price: '¥399/3小时',
        rating: 4.8,
        orders: 17,
        specialty: ['VALO热爱', '枪游精通', '可爱声音'],
        games: ['VALO', '三角洲', 'PUBG'],
        time: '3pm-10pm',
        intro: '宝宝好～这里是月月，我本身是超级爱玩瓦罗兰特，也可以打pubg和三角洲～',
        services: ['网吧陪玩', '游戏陪伴']
    },
    {
        id: '005',
        name: 'Elaine莉莉',
        image: 'https://i.imgur.com/RbQFCMn.jpeg',
        photos: [
            'https://i.imgur.com/Fr8aC2A.jpeg',
            'https://i.imgur.com/EGgpDQ6.jpeg',
        ],
        price: '¥399/3小时',
        rating: 4.9,
        orders: 16,
        specialty: ['VALO专精', '有点害羞', '爱交朋友'],
        games: ['Valorant'],
        time: '周一至周四晚上 | 周末12pm-11pm（视情况而定）',
        intro: 'hello！可以叫我莉莉！我是个爱玩valo的小孩，会有点害羞但其实爱认识新朋友！',
        services: ['网吧陪玩', '漫展陪逛', '吃饭', '逛街'],
        isHot: true
    },
    {
        id: '006',
        name: 'eli',
        image: 'https://i.imgur.com/IraUzzm.jpeg',
        photos: [
            'https://i.imgur.com/xlMSLad.jpeg',
            'https://i.imgur.com/VBd6KKG.jpeg',
        ],
        price: '¥399/3小时',
        rating: 4.7,
        orders: 13,
        specialty: ['VALO', '乐于学习', '交朋友'],
        games: ['VALO', '其他游戏可以现学~'],
        time: '不确定～可以问问我哦',
        intro: '嗨嗨是eli哟★ 想玩游戏？别犹豫找我就对啦~ 别害羞 来交个朋友丫❤',
        services: ['网吧陪玩', '游戏学习']
    },
    {
        id: '007',
        name: '露西',
        image: 'https://i.imgur.com/a4NQZUq.jpeg',
        photos: [
            'https://i.imgur.com/Vmxd1es.jpeg',
            'https://i.imgur.com/xQb99Qu.jpeg',
        ],
        price: '¥399/3小时',
        rating: 5.0,
        orders: 26,
        specialty: ['情绪价值', '很会聊天', '多种风格'],
        games: ['无畏契约', 'CS', '英雄联盟', '三角洲', 'PUBG'],
        time: '5pm-11pm',
        intro: '会给情绪价值也很会聊天哦～ 老板喜欢什么类型我都有～ 欢迎来找我下单呀宝宝💕',
        services: ['网吧陪玩', '漫展陪逛', '看电影', '吃饭', '逛街', '庆祝生日'],
        isHot: true
    },
    {
        id: '008',
        name: '阿九',
        image: 'https://i.imgur.com/BSKSmq4.jpeg',
        photos: [
            'https://i.imgur.com/IIrPhi9.jpeg',
            'https://i.imgur.com/JMnS3me.jpeg',
        ],
        price: '¥399/3小时',
        rating: 4.5,
        orders: 12,
        specialty: ['可甜可盐', '夸人高手', '跟你一起冲'],
        games: ['PUBG', 'Naraka'],
        time: '每晚9:30后 & 周末',
        intro: '老板好！我叫阿九，我主玩PUBG和NARAKA～可甜可盐，可以把你夸上天！你被队友骂，我帮你骂队友，你说冲我就冲！🤓',
        services: ['网吧陪玩', '漫展陪逛', '看电影', '吃饭', '逛街', '庆祝生日']
    }
];

const DEFAULT_SETTINGS = {
    qrCodeUrl: 'qrcode-sekai.png'
};

