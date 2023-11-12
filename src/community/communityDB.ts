// 커뮤니티 리스트 조회
const getCommunityList = (fieldTp:string, area:string, searchTxt:string, pageStart:number, pageEnd: number, email:string)=>{
    let sql = 'SELECT commu_id' +
        ', commu_title ' +
        ', commu_txt ' +
        ', email ' +
        ', area ' +
        ', dead_line ' +
        ', member_cnt ' +
        ', field_tp ' +
        ', insert_datetime ' +
        ', update_datetime ' +
        'FROM community ' + 
        ' WHERE 1=1'; 
    if(fieldTp) sql = sql + " and field_tp = '" + fieldTp + "'";
    if(area) sql = sql + " and area = '" + area + "'";
    if(searchTxt) sql = sql + " and commu_title like '%" + searchTxt + "%'";
    if(email) sql = sql + " and email '" + email + "'";
    sql =  sql + ' order by insert_datetime desc'
    if(pageStart && pageEnd){
        sql = sql + 'limit ' + pageStart + ', ' + pageEnd;
    }
    return sql;
};

//커뮤니티상세 조회
const getCommunityDetail = (commuId:string, email:string)=>{
    let sql = 'SELECT a.commu_id' +
        ', a.commu_title ' +
        ', a.commu_txt ' +
        ', a.email ' +
        ", (select syscd_nm from sys_code x where x.class_cd = 'SYS002' and x.syscd_cd = a.field_tp) as field_tp " +
        ", (select syscd_nm from sys_code x where x.class_cd = 'SYS006' and x.syscd_cd = a.area) as area " +
        ', a.dead_line ' +
        ', a.member_cnt ' +
        ', a.remark_txt ' +
        ', a.insert_datetime ' +
        ', a.update_datetime ' +
        ", (select count(1) from community_wish x where x.commu_id = a.commu_id) as wish_cnt " +
        ", (case when b.wish_id is not null then '1' else '0' end) as wish_yn " +
        "from community a " +
        "left outer join community_wish b on b.commu_id = a.commu_id and b.email = '" + email + "' " +
        "where 1=1 ";
    if(commuId) sql = sql + " and a.commu_id = '" + commuId  + "'";
    return sql;
};

//커뮤니티 등록
const insertCommunity = (commuTitle:string, commuTxt:string, email:string, area:string, deadLine:Date, memberCnt:number, fieldTp:string) =>{
    const sql = "INSERT INTO community (" + 
    "commu_id" + ", " +
    "commu_title" + ", " +
    "commu_Txt" + ", " +
    "email" + ", " +
    "area" + ", " +
    "dead_line" + ", " +
    "member_cnt" + ", " +
    "field_tp" + ", " +
    "insert_datetime" + ", " +
    "update_datetime" + ") " +
    "VALUES ( " +
    "(select ifnull(max(commu_id) + 1, 1) from community b), " + 
    commuTitle + "', '" +
    commuTxt + "', '" +
    email + "', '" +
    area + "', '" +
    deadLine + "', '" +
    memberCnt + "', '" +
    fieldTp + "', '" +
    "NOW(), NOW() )";
    return sql;
}

//커뮤니티 수정
const updateCommunity = (commuId:string, commuTitle:string, commuTxt:string, email:string, area:string, deadLine:Date, memberCnt:number, fieldTp:string) =>{
    const sql = "UPDATE community set " + 
    "commu_title = '" + commuTitle + "', " +
    "commu_txt = '" + commuTitle + "', " +
    "email = '" + email + "', " +
    "area = '" + area + "', " +
    "dead_line = '" + deadLine + "', " +
    "member_cnt = " + memberCnt + ", " +
    "field_tp = '" + fieldTp + "', " +
    "update_datetime = now() " +
    "WHERE commu_id = '" + commuId + "'";
    return sql;
}

//커뮤니티 삭제
const deleteCommunity = (commuId:string)=> {
    const sql = "DELETE FROM community where commu_id = '" + commuId + "'";
    return sql;
}

//커뮤니티 댓글리스트 조회
const getCommunityCommentList = (commuId:string, email:string, pageStart:number, pageEnd: number)=>{
    let sql = 'SELECT a.comment_id' +
        ', a.commu_id ' +
        ', a.comment_seq ' +
        ', a.email ' +
        ', a.comment_txt ' +
        ', a.insert_datetime ' +
        ', a.update_datetime ' +
        "from community_comment a " +
        "where 1=1 ";
    if(commuId) sql = sql + " and a.commu_id = '" + commuId  + "'";
    if(email) sql = sql + " and a.email = '" + commuId  + "'";
    sql = sql + "order by a.insert_datetime desc, comment_id desc ";
    if(pageStart && pageEnd){
        sql = sql + 'limit ' + pageStart + ', ' + pageEnd;
    }
    return sql;
};

//커뮤니티댓글 등록
const insertCommunityComment = (commuId:string, commentTxt:string, email:string) =>{
    const sql = "INSERT INTO community_comment ( " +
    "comment_id, " +
    "commu_id, " +
    "comment_seq, " +
    "email, " +
    "comment_txt, " +
    "insert_datetime, " +
    "update_datetime " +
    "VALUES (" + 
    "(select ifnull(max(comment_id) + 1, 1) from community_comment b), '" + 
    commuId + "', " + 
    "(select ifnull(max(comment_seq) + 1, 1) from community_comment b where b.commu_id = '" + commuId + "), '" + 
    email + "', '" +
    commentTxt + "', " +
    "now(), now()) ";
    return sql;
}

//커뮤니티댓글 수정
const updateCommunityCommnet = (commentId:string, commentTxt:string) =>{
    const sql = "UPDATE community_comment set " +
    "comment_txt = '" + commentTxt + "'," +
    "update_datetime = now() "  +
    "WHERE comment_id = '" + commentId + "'";
    return sql;
}

//커뮤니티댓글 삭제
const deleteCommunitycomment = (commentId:string)=> {
    const sql = "DELETE FROM community_comment where comment_id = '" + commentId + "'";
    return sql;
}

module.exports = {getCommunityList, getCommunityDetail, insertCommunity, getCommunityCommentList, insertCommunityComment, updateCommunityCommnet, deleteCommunitycomment};