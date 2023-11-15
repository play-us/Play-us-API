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

module.exports ={insertKakaoUserInfo}