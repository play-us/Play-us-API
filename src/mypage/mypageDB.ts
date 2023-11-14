const getLikeList = (email:string, pageStart:number, pageEnd: number) =>{
    let sql = "SELECT DISTINCT a.field_id " +
        ",a.field_nm " +
        ", (select syscd_nm from sys_code x where x.class_cd = 'SYS002' and x.syscd_cd = a.field_tp) as field_tp " +
        ", (select syscd_nm from sys_code x where x.class_cd = 'SYS006' and x.syscd_cd = a.area) as area " +
        ",a.addr " +
        ",a.lat " +
        ",a.lng " +
        ",a.opening_hours " +
        ",a.closing_hours " +
        ",a.price " +
        ",a.hours " +
        ",a.note " +
        ",a.size " +
        ",a.swrm_yn " +
        ",a.parking_tp " +
        ",a.rental_sup " +
        ",a.use_yn " +
        ",a.insert_datetime " +
        ",a.update_datetime" +
        " FROM field a " +
        "inner join field_like b on b.field_id =  a.field_id and b.email = '" + email + "'";
        sql = sql + "order by a.insert_datetime desc, a.field_id desc ";
        if(pageStart && pageEnd){
            sql = sql + ' limit ' + pageStart + ', ' + pageEnd;
        }
    return sql;
};

module.exports = {getLikeList};