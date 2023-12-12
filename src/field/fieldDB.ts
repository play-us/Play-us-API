import { StringMappingType } from "typescript";

//구장리스트 조회
const getFieldList = (fieldId:string, fieldTp:string, area:string, searchTxt:string, sort: string, pageStart:number, pageEnd: number)=>{
    let sql = `select a.field_id 
	    , a.field_nm  
        , (select syscd_nm from sys_code x where x.class_cd = 'SYS002' and x.syscd_cd = a.field_tp) as field_tp  
        , (select syscd_nm from sys_code x where x.class_cd = 'SYS006' and x.syscd_cd = a.area) as area  
        , a.addr  
        , a.lat  
        , a.lng  
        , a.opening_hours  
        , a.closing_hours  
        , a.price  
        , a.hours  
        , a.note  
        , a.size  
        , a.swrm_yn  
        , a.parking_tp  
        , a.rental_sup  
        , a.use_yn  
        , a.remark_txt  
        , a.insert_datetime  
        , a.insert_datetime  
        , b.img_id  
        , b.img_seq  
        , b.img_name  
        , b.img_url  
        , b.img_sort  
        , (select count(1) from field_like x where x.field_id = a.field_id) as like_cnt  
        , (select count(1) from field_review x where x.field_id = a.field_id) as review_cnt  
        , (select count(1) from reservation x where x.field_id = a.field_id) as resv_cnt  
        from field a  
        left outer join field_image b on b.field_id = a.field_id and b.img_sort = 1  
        where 1=1 `;
    if(fieldId) sql = sql + ` and field_id = '${fieldId}'`;
    if(fieldTp) sql = sql + ` and field_tp = '${fieldTp}'`;
    if(area) sql = sql + ` and fielaread_tp = '${area}'`;
    if(searchTxt) sql = sql + ` and field_nm like '%${searchTxt}%' `;
    if(sort && sort === '1') {
        sql = sql + ' order by resv_cnt desc, insert_datetime desc, field_nm';
    } else {
        sql = sql + ' order by insert_datetime desc, field_nm ';
    }
    if(pageStart && pageEnd){
        sql = sql + ` limit ${pageStart}, ${pageEnd}`;
    }
    
    return sql;
};

//구장상세 조회
const getFieldDetail = (fieldId:string, email:string)=>{
    let sql = `select distinct a.field_id 
        , a.field_nm 
        , (select syscd_nm from sys_code x where x.class_cd = 'SYS002' and x.syscd_cd = a.field_tp) as field_tp  
        , (select syscd_nm from sys_code x where x.class_cd = 'SYS006' and x.syscd_cd = a.area) as area  
        , a.addr  
        , a.lat  
        , a.lng  
        , a.opening_hours  
        , a.closing_hours  
        , a.price  
        , a.hours  
        , a.note  
        , a.size  
        , a.swrm_yn  
        , a.parking_tp  
        , a.rental_sup  
        , a.use_yn  
        , a.remark_txt  
        , a.insert_datetime  
        , a.insert_datetime  
        , (select count(1) from field_like x where x.field_id = a.field_id) as like_cnt  
        , (select count(1) from field_review x where x.field_id = a.field_id) as review_cnt  
        , (case when b.like_id is not null then '1' else '0' end) as like_yn  
        from field a  
        left outer join field_like b on b.field_id = a.field_id and b.email = '${email}'
        where 1=1 
        and a.field_id = '${fieldId}'`;
    return sql;
};

//구장 등록
const insertField = (fieldNm:string, fieldTp:string, area:string, addr:string, lat:number, lng:number, openingHours:string, closingHours:string, price:string, hours:string, note:string, size:string, swrmYn:string, parkingTp:string, rentalSup:string)=> {
    const sql = `INSERT INTO field
        field_id,
        field_nm,
        field_tp,
        area,
        addr,
        lat,
        lng,
        opening_hours,
        closing_hours,
        price,
        hours,
        note,
        size,
        swrm_yn,
        parking_tp,
        rental_sup,
        use_yn,
        remark_txt,
        insert_datetime,
        update_datetime)
         VALUES (
        (SELECT IFNULL(MAX(CAST(b.field_id AS unsigned)) + 1, 1) FROM field b), 
        '${fieldNm}', 
        '${fieldTp}', 
        '${area}', 
        '${addr}', 
        '${lat}', 
        '${lng}', 
        '${openingHours}', 
        '${closingHours}', 
        '${price}', 
        '${hours}', 
        '${note}', 
        '${size}', 
        '${swrmYn}', 
        '${parkingTp}', 
        '${rentalSup}',
        '1',
        NULL, NOW(), NOW())`;
    return sql;
}

//구장 수정
const updateField = (fieldId:string, fieldNm:string, fieldTp:string, area:string, addr:string, lat:number, lng:number, openingHours:string, closingHours:string, price:number, hours:string, note:string, size:string, swrmYn:string, parkingTp:string, rentalSup:string)=> {
    const sql = `UPDATE field set 
    field_nm = '${fieldNm}', 
    field_tp = '${fieldTp}', 
    area = '${area}', 
    addr = '${addr}', 
    lat =  ${lat}, 
    lng =  ${lng}, 
    opening_hours = '${openingHours}', 
    closing_hours = '${closingHours}', 
    price =  ${price}, 
    hours = '${hours}', 
    note = '${note}', 
    size = '${size}', 
    swrm_yn = '${swrmYn}', 
    parking_tp = '${parkingTp}', 
    rental_sup = '${rentalSup}', 
    update_datetime = NOW()  
    WHERE field_id = '${fieldId}'`;
    return sql;
}

//구장 삭제
const deleteField = (fieldId:string)=> {
    const sql = `DELETE FROM field where field_id = '${fieldId}'`;
    return sql;
}


//구장좋아요 조회
const getFieldLike = (fieldId:string, email:string)=>{
    let sql = `select a.like_id
        , a.field_id
        , a.email 
        from field_like a 
        where 1=1 `;
    if(fieldId) sql = sql + " and field_id = '" + fieldId + "' ";
    if(email) sql = sql + " and email = '" + email + "' ";
    return sql;
};

//구장좋아요 insert
const insertFieldLike = (fieldId:string, email:string)=> {
    const sql = "insert into community_wish ( like_id, field_id, email, insert_datetime, update_datetime  )" + 
    "SELECT (select ifnull(max(CAST(b.like_id AS unsigned)) + 1, 1) from field_like b) ,'" + fieldId + "', '" + email + "', " +
    " NOW(), NOW() " +
    " FROM DUAL WHERE NOT EXISTS (SELECT email FROM field_like where field_id = '" + fieldId + "' and email = '" + email + "')"
    return sql;
}

//구장좋아요 delete
const deleteFieldLike = (fieldId:string, email:string)=>{
    const sql = "delete from field_like" +
        " where field_id = '" + fieldId + "' " + 
        " and email = '" + email + "'";
    return sql;
}

//구장 예약 정보 조회
const getReservation = (resvId: string, fieldId: string, email: string, resvDate: Date, resvStartTime:string, resvEndTime:string, resvState:string, pageStart:number, pageEnd: number) => {
    let sql = "SELECT resv_id " + 
        ", a.field_id " + 
        ", b.field_nm " + 
        ", (select syscd_nm from sys_code x where x.class_cd = 'SYS006' and x.syscd_cd = b.area) as area " +
        ", a.email " +
        ", a.resv_date " +
        ", a.resv_start_time " +
        ", a.resv_end_time " +
        ", a.resv_state " +
        ", (select syscd_nm from sys_code x where x.class_cd = 'SYS007' and x.syscd_cd = a.resv_state) as resv_state_nm " +
        ", a.resv_price " +
        ", a.remark_txt " +
        ", a.insert_datetime " +
        ", a.update_datetime " +
        " from reservation a" +
        " inner join field b on b.field_id = a.field_id "
        " where 1=1 ";
    if(resvId) sql = sql + " and a.resv_id = '" + resvId + "' ";
    if(fieldId) sql = sql + " and a.field_id = '" + fieldId + "' ";
    if(email) sql = sql + " and a.email = '" + email + "' ";
    if(resvDate) sql = sql + " and a.resv_date = '" + resvDate + "' ";
    if(resvStartTime) sql = sql + " and a.resv_start_time = '" + resvStartTime + "' ";
    if(resvEndTime) sql = sql + " and a.resv_end_time = '" + resvEndTime + "' ";
    if(resvState) sql = sql + " and a.resv_state = '" + resvState + "' ";
    sql = sql + " order by resv_date desc, a.insert_datetime desc ";
    if(pageStart && pageEnd){
        sql = sql + ' limit ' + pageStart + ', ' + pageEnd;
    }
    return sql;
}

//구장 예약 등록
const insertReservation  = (fieldId:string, email:string, resvDate: Date, resvStartTime: string, resvEndTime: string, resvPrice: number, remarkTxt: string)=>{
    const sql = "INSERT INTO reservation " + 
        "(resv_id, field_id, email, resv_date, resv_start_time, resv_end_time, resv_state, resv_price, insert_datetime, update_datetime) " +
        " VALUES " +
        "((SELECT IFNULL(MAX(CAST(b.resv_id AS unsigned)) + 1, 1) FROM reservation b), '" +
        fieldId + "', '" +  
        email + "', '" + 
        resvDate + "', '" + 
        resvStartTime + "', '" +
        resvEndTime + "', '" +
        "1', " +
        resvPrice + ", " +
        "NOW(), NOW())";
    return sql;
}

//구장 예약 삭제
const deleteReservation  = (resvId:string)=>{
    const sql = "delete from reservation where resv_id = '" + resvId + "'" ;
    return sql;
}

//구장 리뷰
const getFieldReview = (fieldId:string, email:string, reviewId:string)=> {
    let sql = `select a.review_id,  
        a.field_id,
        a.resv_id,
        b.resv_date,
        b.resv_start_time,
        b.resv_end_time,
        a.email,
        (select x.name from member x where x.email = a.email) as name,  
        a.review_seq, 
        a.star_cnt, 
        a.review_con, 
        a.remark_txt, 
        a.insert_datetime, 
        a.update_datetime 
        from field_review a
        left outer join reservation b on b.resv_id = a.resv_id
        where 1=1 `;
    if(fieldId) sql = sql + ` and a.field_id = '${fieldId}' `;
    if(email) sql = sql + ` and a.email = '${email}' `;
    if(reviewId) sql = sql + ` and a.review_id = '${reviewId}' `;
    return sql;
}

//구장 리뷰 등록
const insertFieldReview  = (fieldId:string, resvId:string, email: string, starCnt: string, reviewCon: string)=>{
    const sql = `INSERT INTO field_review  
        (review_id, field_id, resv_id, email, review_seq, star_cnt, review_con, insert_datetime, update_datetime) 
         VALUES 
        ((SELECT IFNULL(MAX(CAST(b.review_id AS unsigned)) + 1, 1) FROM field_review b), 
        '${fieldId}',  
        '${resvId}',  
        '${email}',   
        (select ifnull(max(CAST(c.review_seq AS unsigned)) + 1, 1) from field_review c where c.field_id = '${fieldId}'), 
        '${starCnt}', 
        '${reviewCon}', 
        NOW(), 
        NOW())`;
    return sql;
}

//구장 리뷰 수정
const updateFieldReview = (reviewId:string, starCnt:string, reviewCon:string) =>{
    const sql = "UPDATE field_review set " +
    "star_cnt = '" + starCnt + "'," +
    "review_con = '" + reviewCon + "', " +
    "update_datetime = NOW() "  +
    "WHERE review_id = '" + reviewId + "'";
    return sql;
}

//구장 리뷰 삭제
const deleteFieldReview = (reviewId:string)=> {
    const sql = "DELETE FROM field_review where review_id = '" + reviewId + "'";
    return sql;
}


//예약불가능일자
const getReservationImpossibleDate = (fieldId: string, resvYm: string)=> {
    const sql = `WITH RECURSIVE A AS ( 
            SELECT 0 AS LEVEL 
             UNION ALL SELECT 1+A.LEVEL 
              FROM A 
             WHERE A.LEVEL < (
                    SELECT DATEDIFF(LAST_DAY('` + resvYm +`-01'),  '` + resvYm +`-01') 
                    ) 
                ) 
            , dd as(
                SELECT ADDDATE('` + resvYm + `-01', INTERVAL LEVEL DAY) as dd FROM A
            )
            , all_dd as (
                select a.dd as resv_date
                     , (case when c.field_id is not null then 1 else 0 end) as resv_yn
                  from dd a 
                  left outer join field b on b.field_id = '` + fieldId + `' 
                  left outer join field_opening_days c on c.field_id = b.field_id and c.opening_day = DAYOFWEEK( a.dd )-1 
                where 1=1 
                group by dd
               ) 
               select resv_date
                 from all_dd
                where resv_yn = '0'`;
    return sql;
}

//예약가능시간
const getReservationPossibleTime = (fieldId: string, resvDate: string)=> {
    const sql = `WITH RECURSIVE A AS(
        SELECT left(opening_hours, 2) as LEVEL
           FROM field 
           WHERE FIELD_ID = '` + fieldId + `'
         UNION ALL
         SELECT 1+A.LEVEL
         FROM A
         WHERE A.LEVEL < (
           SELECT left(closing_hours, 2) -1
           FROM field 
           WHERE FIELD_ID = '` + fieldId + `'
         )
       )
       select concat(LEVEL, ':00:00') AS resv_time
            , (case when (select count(1) 
                from reservation x 
              where x.resv_date = '` + resvDate + `' and x.field_id = '` + fieldId + `' 
                and a.level >= left(x.resv_start_time, 2) 
                and a.level < left(x.resv_end_time, 2)
               ) > 0 then '0' else '1' end) as resv_yn
          from A a
           where 1=1
          group by level
         `;
    return sql;
}

module.exports = {getFieldList, getFieldDetail, insertField, updateField, deleteField, getFieldLike, insertFieldLike, deleteFieldLike, getReservation, insertReservation, deleteReservation, getFieldReview, insertFieldReview, updateFieldReview, deleteFieldReview, getReservationImpossibleDate, getReservationPossibleTime};