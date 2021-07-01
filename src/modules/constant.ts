import { environment } from './../environments/environment';

export const constant = {
    localstorage_login: 'isLoggedin',
    localstorage_login_time: 'loginTime',
    localstorage_login_url: 'loginUrl',
    localstorage_employee : 'loginEmployee',
    localstorage_language : 'zh-tw',
    ServerPath: environment.apiUrl,
    super_admin: '999999',
    dialog_width: '450px'
};

export const SERVER_URL = {
    Basic: '/basic',
    Contact: '/contact',
    Education: '/education',
    Experience: '/experience',
    Position: '/position',
    Picture: '/picture',
    COMPANY: '/company',
    USER: '/users',
    AUTH: '/auths',
    ROLE: '/role',
    COMPETITION: '/competition',
    COMPETITION_USERS: '/competition/users',
    PIGEON_RING: '/pigeon_ring',
    PIGEON_RING_OWNER: '/pigeon_ring/user',
    PIGEON: '/pigeon',
    PIGEON_USERS: '/pigeon/users',
    MATCH: '/match',
    MATCH_USERS: '/match/users',
    NO_BINDING: '/nobinding',
    TRACE: '/track/gettrace',
    LAST_TRACE: '/track/getlasttrace',
    ALL_TRACE: '/track/getalltrace',
    TRACE_BY_TIME: '/track/gettracebyTime',
    TRACE_BY_TIME_2: '/track/gettracebyTime2',
  };
