import { StringMappingType } from "typescript";

// 카카오 로그인 insert
const insertKakaoUserInfo = (emailDataLength:string,email:string,nickname:string) => {
    if(emailDataLength === "0"){
        const sql = 
        `INSERT INTO member (
            email, 
            password, 
            name, 
            area, 
            phone, 
            img_url, 
            signin_tp, 
            roll, 
            remark_txt, 
            insert_datetime, 
            update_datetime
        ) VALUES (
            '${email}', 
            'hashed_password_here', 
            '${nickname}', 
            'test', 
            'test', 
            'null', 
            '2', 
            '1', 
            NULL, 
            now(), 
            now()
        )`
        return sql;
    }
}

//유저정보 조회
const getMember = (email: string, password: string) => {
    let sql = `select a.email
        , a.name
        , a.area
        , (select syscd_nm from sys_code x where x.class_cd = 'SYS006' and x.syscd_cd = a.area) as area_nm
        , a.phone
        , a.img_url
        , a.signin_tp
        , a.roll
        , a.remark_txt
        , a.insert_datetime
     from member a
    where a.email = '${email}'
      and a.password = '${password}'`;
    return sql;
};

// 카카오유저정보 조회
const getKakaoMember = (email: string) => {
    let sql = `select a.email
        , a.name
        , a.area
        , (select syscd_nm from sys_code x where x.class_cd = 'SYS006' and x.syscd_cd = a.area) as area_nm
        , a.phone
        , a.img_url
        , a.signin_tp
        , a.roll
        , a.remark_txt
        , a.insert_datetime
     from member a
    where a.email = '${email}'`;
    return sql;
};

//유저 등록
const insertMember = (email: string, password: string, name: string, area: string, phone: string, imgUrl: string) => {
    let sql = `INSERT INTO member
    (email,
    password,
    name,
    area,
    phone,
    img_url,
    signin_tp,
    roll,
    remark_txt,
    insert_datetime,
    update_datetime)
    VALUES
    ('${email}',
    '${password}',
    '${name}',
    '${area}',
    '${phone}',
    '${imgUrl}',
    '1',
    '1',
    NULL,
    now(),
    now())
    `;
    return sql;
};
//유저 등록
const insertKakaoMember = (email: string, name: string) => {
    let sql = `INSERT INTO member
    (email,
    name,
    signin_tp,
    roll,
    remark_txt,
    insert_datetime,
    update_datetime)
    SELECT '${email}',
    '${name}',
    '2',
    '1',
    NULL,
    now(),
    now()
    FROM DUAL WHERE NOT EXISTS(SELECT * FROM member WHERE email = '${email}')
    `;
    return sql;
};

module.exports ={insertKakaoUserInfo, getMember, getKakaoMember, insertMember, insertKakaoMember}