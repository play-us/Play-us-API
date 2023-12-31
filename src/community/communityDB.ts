// 커뮤니티 리스트 조회
const getCommunityList = (fieldTp:string, area:string, searchTxt:string, pageStart:number, pageEnd: number, email:string)=>{
    let sql = `SELECT commu_id
    , commu_title 
    , commu_txt 
    , email 
    , area 
    , dead_line 
    , member_cnt 
    , field_tp 
    , (select count(1) from community_wish x where x.commu_id = a.commu_id) as wish_cnt
    , (case when (select distinct email from community_wish x where x.commu_id = a.commu_id and x.email = '${email}' ) is not null then '1' else '0' end ) as wish_yn
    , (select count(1) from community_comment x where x.commu_id = a.commu_id) as comment_cnt
    , insert_datetime 
    , update_datetime 
    FROM community a 
     WHERE 1=1`; 
    if(fieldTp) sql = sql + ` and field_tp = '${fieldTp}'`;
    if(area) sql = sql + ` and area = '${area}'`;
    if(searchTxt) sql = sql + ` and commu_title like '%${searchTxt}%'`;
    sql =  sql + ' order by insert_datetime desc'
    if(pageStart && pageEnd){
        sql = sql + ` limit ${pageStart}, ${pageEnd}`;
    }
    return sql;
};

//커뮤니티상세 조회
const getCommunityDetail = (commuId:string, email:string)=>{
    let sql = `SELECT a.commu_id 
        , a.commu_title  
        , a.commu_txt  
        , a.email 
        , (select x.name from member x where x.email = a.email) as name
        , (select syscd_nm from sys_code x where x.class_cd = 'SYS002' and x.syscd_cd = a.field_tp) as field_tp  
        , (select syscd_nm from sys_code x where x.class_cd = 'SYS006' and x.syscd_cd = a.area) as area  
        , a.dead_line  
        , a.member_cnt  
        , a.remark_txt  
        , a.insert_datetime  
        , a.update_datetime  
        , (select count(1) from community_wish x where x.commu_id = a.commu_id) as wish_cnt  
        , (case when b.wish_id is not null then '1' else '0' end) as wish_yn  
        from community a  
        left outer join community_wish b on b.commu_id = a.commu_id and b.email = '${email}'  
        where 1=1 `;
    if(commuId) sql = sql + ` and a.commu_id = '${commuId}'`;
    return sql;
};

//커뮤니티 등록
const insertCommunity = (commuTitle:string, commuTxt:string, email:string, area:string, deadLine:Date, memberCnt:number, fieldTp:string) =>{
    const sql = `INSERT INTO community (  
    commu_id,  
    commu_title,  
    commu_Txt,  
    email,  
    area,  
    dead_line,  
    member_cnt,  
    field_tp,  
    insert_datetime,  
    update_datetime  )  
    VALUES (  
    (select ifnull(max(CAST(b.commu_id AS unsigned)) + 1, 1) from community b),  
    '${commuTitle}', 
    '${commuTxt}', 
    '${email}', 
    '${area}', 
    '${deadLine}', 
    '${memberCnt}', 
    '${fieldTp}',  
    NOW(),
    NOW() 
    )`;
    return sql;
}

//커뮤니티 수정
const updateCommunity = (commuId:string, commuTitle:string, commuTxt:string, email:string, area:string, deadLine:Date, memberCnt:number, fieldTp:string) =>{
    const sql = `UPDATE community set 
    commu_title = '${commuTitle}',  
    commu_txt = '${commuTitle}',  
    email = '${email}',  
    area = '${area}',  
    dead_line = '${deadLine}',  
    member_cnt = ${memberCnt},  
    field_tp = '${fieldTp}',  
    update_datetime = NOW()  
    WHERE commu_id = '${commuId}'`;
    return sql;
}

//커뮤니티 삭제
const deleteCommunity = (commuId:string)=> {
    const sql = `DELETE FROM community where commu_id = '${commuId}'`;
    return sql;
}

//커뮤니티 댓글리스트 조회
const getCommunityCommentList = (commuId:string, email:string, pageStart:number, pageEnd: number)=>{
    let sql = `SELECT a.comment_id 
        , a.commu_id  
        , a.comment_seq  
        , a.email  
        , (select x.name from member x where x.email = a.email) as name 
        , a.comment_txt  
        , a.insert_datetime  
        , a.update_datetime  
        from community_comment a 
        where 1=1 `;
    if(commuId) sql = sql +  ` and a.commu_id = '${commuId}'`;
    if(email) sql = sql + ` and a.email = '${email}'`;
    sql = sql + ` order by a.insert_datetime desc, comment_id desc `;
    if(pageStart && pageEnd){
        sql = sql + ` limit ${pageStart}, ${pageEnd}`;
    }
    return sql;
};

//커뮤니티댓글 등록
const insertCommunityComment = (commuId:string, commentTxt:string, email:string) =>{
    const sql = `INSERT INTO community_comment (  
    comment_id,  
    commu_id,  
    comment_seq,  
    email,  
    comment_txt,  
    insert_datetime,  
    update_datetime )  
    VALUES (  
    (select ifnull(max(CAST(b.comment_id AS unsigned)) + 1, 1) from community_comment b),  
    '${commuId}',   
    (select ifnull(max(CAST(c.comment_seq AS unsigned)) + 1, 1) from community_comment c where c.commu_id = '${commuId}'),  
    '${email}', 
    '${commentTxt}',  
    NOW(),
    NOW()) `;
    return sql;
}

//커뮤니티댓글 수정
const updateCommunityComment = (commentId:string, commentTxt:string) =>{
    const sql = `UPDATE community_comment set 
    comment_txt = '${commentTxt}',
    update_datetime = NOW()  
    WHERE comment_id = '${commentId}'`;
    return sql;
}

//커뮤니티댓글 삭제
const deleteCommunityComment = (commentId:string)=> {
    const sql = `DELETE FROM community_comment where comment_id = '${commentId}'`;
    return sql;
}
//커뮤니티댓글 삭제ALL
const deleteCommunityCommentAll = (commuId:string)=> {
    const sql = `DELETE FROM community_comment where commu_id = '${commuId}'`;
    return sql;
}

//커뮤니티좋아요 insert
const insertCommunityWish = (commuId:string, email:string)=> {
    const sql = `insert into community_wish ( wish_id, commu_id, email, insert_datetime, update_datetime  ) 
    SELECT (select ifnull(max(CAST(b.wish_id AS unsigned)) + 1, 1) from community_wish b) ,'${commuId}', '${email}',
     NOW(), NOW() 
     FROM DUAL WHERE NOT EXISTS (SELECT email FROM community_wish where commu_id = '${commuId}' and email = '${email}')`;
    return sql;
}

//커뮤니티좋아요 delete
const deleteCommunityWish = (commuId:string, email:string)=>{
    const sql = `delete from community_wish 
        where commu_id = '${commuId}'   
         and email = '${email}'`;
    return sql;
}

//커뮤니티좋아요 삭제ALL
const deleteCommunityWishAll = (commuId:string)=> {
    const sql = `DELETE FROM community_wish where commu_id = '${commuId}'`;
    return sql;
}
module.exports = {getCommunityList, getCommunityDetail, insertCommunity, updateCommunity, deleteCommunity, getCommunityCommentList, insertCommunityComment, updateCommunityComment, deleteCommunityComment, deleteCommunityCommentAll, insertCommunityWish, deleteCommunityWish, deleteCommunityWishAll};