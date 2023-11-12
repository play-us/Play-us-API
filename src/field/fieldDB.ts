const getFieldList = (fieldId:string, fieldTp:string, area:string, searchTxt:string)=>{
    let sql = "select a.field_id "+
	    ", a.field_nm "+
        ", (select syscd_nm from sys_code x where x.class_cd = 'SYS002' and x.syscd_cd = a.field_tp) as field_tp " +
        ", (select syscd_nm from sys_code x where x.class_cd = 'SYS006' and x.syscd_cd = a.field_tp) as area " +
        ", a.addr " +
        ", a.lat " +
        ", a.lng " +
        ", a.opening_hours " +
        ", a.closing_hours " +
        ", a.price " +
        ", a.hours " +
        ", a.note " +
        ", a.size " +
        ", a.swrm_yn " +
        ", a.parking_tp " +
        ", a.rental_sup " +
        ", a.use_yn " +
        ", a.remark_txt " +
        ", a.insert_datetime " +
        ", a.insert_datetime " +
        ", b.img_id " +
        ", b.img_seq " +
        ", b.img_name " +
        ", b.img_url " +
        ", b.img_sort " +
        ", (select count(1) from field_like x where x.field_id = a.field_id) as like_cnt " +
        "from field a " +
        "left outer join field_image b on b.field_id = a.field_id and b.img_sort = 1 " +
        "where 1=1 ";
    if(fieldId) sql + ' and field_id = ' + fieldId;
    if(fieldTp) sql + ' and field_tp = ' + fieldTp;
    if(area) sql + ' and area = ' + area;
    if(searchTxt) sql + " and field_nm like '%" + searchTxt + "%'";
    sql + ' order by insert_datetime, field_nm'
    return sql;
};

const getFieldDetail = (fieldId:string)=>{
    let sql = "select a.field_id "+
    ", a.field_nm "+
    ", (select syscd_nm from sys_code x where x.class_cd = 'SYS002' and x.syscd_cd = a.field_tp) as field_tp " +
    ", (select syscd_nm from sys_code x where x.class_cd = 'SYS006' and x.syscd_cd = a.field_tp) as area " +
    ", a.addr " +
    ", a.lat " +
    ", a.lng " +
    ", a.opening_hours " +
    ", a.closing_hours " +
    ", a.price " +
    ", a.hours " +
    ", a.note " +
    ", a.size " +
    ", a.swrm_yn " +
    ", a.parking_tp " +
    ", a.rental_sup " +
    ", a.use_yn " +
    ", a.remark_txt " +
    ", a.insert_datetime " +
    ", a.insert_datetime " +
    ", (select count(1) from field_like x where x.field_id = a.field_id) as like_cnt " +
    "from field a " +
    "where 1=1 ";
    if(fieldId) sql + ' and field_id = ' + fieldId;
    return sql;
};

const getFieldLike = (fieldId:string)=>{
    let sql = "select a.like_id "+
    ", a.field_id "+
    ", a.email " +
    "from field_like a " +
    "where 1=1 ";
    if(fieldId) sql + ' and field_id = ' + fieldId;
    return sql;
};

module.exports = {getFieldList, getFieldDetail, getFieldLike};