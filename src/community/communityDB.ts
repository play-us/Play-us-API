// 커뮤니티 리스트 조회
const getCommunityList = (fieldTp:string, area:string, searchTxt:string, pageStart:number, pageEnd: number)=>{
    let sql = 'SELECT commu_id' +
        ', commu_title ' +
        ', commu_txt ' +
        ', email ' +
        ', area ' +
        ', dead_line ' +
        ', member_cnt ' +
        ', field_tp ' +
        ', remart_txt ' +
        ', insert_datetime ' +
        ', update_datetime ' +
        'FROM community ' + 
        ' WHERE 1=1'; 
    if(fieldTp) sql = sql + " and field_tp = '" + fieldTp + "'";
    if(area) sql = sql + " and area = '" + area + "'";
    if(searchTxt) sql = sql + " and commu_title like '%" + searchTxt + "%'";
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
        ', a.remart_txt ' +
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

//커뮤니티 댓글리스트 조회
const getCommunityCommentList = (commuId:string, email:string, pageStart:number, pageEnd: number)=>{
    let sql = 'SELECT a.comment_id' +
        ', a.commu_id ' +
        ', a.comment_seq ' +
        ', a.email ' +
        ', a.comment_txt ' +
        ', a.remart_txt ' +
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

module.exports = {getCommunityList, getCommunityDetail, getCommunityCommentList};