
export default {
    cardTemplateAdmin: [
        {
            title: 'Windows',
            info: 'Управление Windows серверами',
            bgColor: 'var(--wiki--card--admin)',
            textColor: '',
            tags: ['WINDOWS'],
            counter: null,
            link: null
        },
        {
            title: 'Linux',
            info: 'Управление Linux серверами',
            bgColor: 'var(--wiki--card--admin)',
            textColor: '',
            tags: ['LINUX'],
            counter: null,
            link: null
        },
        {
            title: 'Тонкие клиенты',
            info: 'Настройка тонких клиентов всех моделей',
            bgColor: 'var(--wiki--card--admin)',
            textColor: '',
            tags: ['TinClient'],
            counter: null,
            link: null
        },
        {
            title: 'Назад',
            info: 'К выбору более общих тем',
            bgColor: 'var(--wiki--card--admin)',
            textColor: '',
            tags: '',
            counter: null,
            link: 'default'
        }
    ],
    cardTemplateInternet: [
        {
            title: 'Почта',
            info: 'Настройка и решенире проблем почтового сервера',
            bgColor: 'var(--wiki--card--internet)',
            textColor: '',
            tags: ['MAIL'],
            counter: null,
            link: null
        },
        {
            title: 'Мониторинг',
            info: 'Контроль активности пользователей и мониторинг оборудования',
            bgColor: 'var(--wiki--card--internet)',
            textColor: '',
            tags: ['Monitoring'],
            counter: null,
            link: null
        },
        {
            title: 'WhatchGuard',
            info: 'Настройка аппаратного фаервола',
            bgColor: 'var(--wiki--card--internet)',
            textColor: '',
            tags: ['XTM'],
            counter: null,
            link: null
        },
        {
            title: 'Гайды',
            info: 'Гайды по настройке отдельных служб',
            bgColor: 'var(--wiki--card--internet)',
            textColor: '',
            tags: ['InternetManul'],
            counter: null,
            link: null
        },
        {
            title: 'Назад',
            info: 'К выбору более общих тем',
            bgColor: 'var(--wiki--card--internet)',
            textColor: '',
            tags: '',
            counter: null,
            link: 'default'
        }
    ],
    default: [
        {
            title: 'Администрирование',
            info: 'Управление Linux и Windows серверами',
            bgColor: 'var(--wiki--card--admin)',
            textColor: '',
            tags: ['WINDOWS', 'LINUX', 'SSH', 'RSNET'],
            counter: null,
            link: 'cardTemplateAdmin'
        },
        {
            title: 'Интернет',
            info: 'Сетевое оборудование, XTM, безопасность и настройка служб',
            bgColor: 'var(--wiki--card--internet)',
            textColor: '',
            tags: ['WATCHGUARD', 'CISCO', 'SSH', 'RSNET', "XTM"],
            counter: null,
            link: 'cardTemplateInternet'
        },
        {
            title: 'Остальное IT',
            info: 'Программирование, базы данных и гайды',
            bgColor: 'var(--wiki--card--resti)',
            textColor: '',
            tags: '',
            counter: null,
            link: 'cardTemplateRestIT'
        },
        {
            title: 'Документы',
            info: 'Копии документов и статей',
            bgColor: 'var(--wiki--card--documents)',
            textColor: '',
            tags: '',
            counter: null,
            link: 'cardTemplateDocuments'
        },
        {
            title: 'Аналитика',
            info: 'Доклады, отчеты и методички',
            bgColor: 'var(--wiki--card--riac)',
            textColor: '',
            tags: '',
            counter: null,
            link: 'cardTemplateRIAC'
        },
        {
            title: 'Новая статья',
            info: 'Перейти к странице добавления новой статьи',
            bgColor: 'var(--wiki--card--newArticle)',
            textColor: '',
            tags: '',
            counter: null,
            link: 'createNewArticle'
        }
    ]
};