// 마이페이지 구장좋아요리스트
const getMyFieldLikeList = (
  email: string,
  pageStart: number,
  pageEnd: number
) => {
  let sql =
    "SELECT DISTINCT a.field_id " +
    ", a.field_nm " +
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
    "inner join field_like b on b.field_id =  a.field_id and b.email = '" +
    email +
    "'";
  sql = sql + "order by a.insert_datetime desc, a.field_id desc ";
  if (pageStart && pageEnd) {
    sql = sql + " limit " + pageStart + ", " + pageEnd;
  }
  return sql;
};

//마이페이지 구장리뷰리스트
const getMyReviewList = (email: string, pageStart: number, pageEnd: number) => {
  let sql =
    `SELECT review_id,
                field_id,
                email,
                review_seq,
                star_cnt,
                review_con,
                remark_txt,
                insert_datetime,
                update_datetime
            FROM field_review
            where email = '` +
    email +
    `' order by a.insert_datetime desc `;
  if (pageStart && pageEnd) {
    sql = sql + " limit " + pageStart + ", " + pageEnd;
  }
  return sql;
};

//마이페이지 커뮤니티 리스트
const getMyCommunityList = (
  email: string,
  pageStart: number,
  pageEnd: number
) => {
  let sql =
    `SELECT commu_id,
                commu_title,
                commu_txt,
                email,
                area,
                dead_line,
                member_cnt,
                field_tp,
                remark_txt,
                insert_datetime,
                update_datetime,
                member_email
            FROM community
            where email = '` +
    email +
    `' order by insert_datetime desc `;
  if (pageStart && pageEnd) {
    sql = sql + " limit " + pageStart + ", " + pageEnd;
  }
  return sql;
};

// 마이페이지 커뮤니티관심리스트
const getMyCommunityWishList = (
  email: string,
  pageStart: number,
  pageEnd: number
) => {
  let sql =
    `SELECT distinct a.commu_id
    , commu_title 
    , commu_txt 
    , a.email 
    , area 
    , dead_line 
    , member_cnt 
    , field_tp 
    , (select count(1) from community_wish x where x.commu_id = a.commu_id) as wish_cnt 
    , (select count(1) from community_comment x where x.commu_id = a.commu_id) as comment_cnt 
    , a.insert_datetime , a.update_datetime 
    FROM community a 
    inner join community_wish b on b.commu_id = a.commu_id and b.email = '${email}' 
    order by a.insert_datetime desc `;
  if (pageStart && pageEnd) {
    sql = sql + " limit " + pageStart + ", " + pageEnd;
  }
  return sql;
};

module.exports = {
  getMyFieldLikeList,
  getMyReviewList,
  getMyCommunityList,
  getMyCommunityWishList,
};
