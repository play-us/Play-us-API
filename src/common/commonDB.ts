const getSysCode = (syscdCd:string, classCd:string, rel01Data:string, rel02Data:string, useYn:string)=>{
    let sql = 'SELECT syscd_cd' +
    ',syscd_nm ' +
    ',class_cd ' +
    ',sort ' +
    ',rel01_data ' +
    ',rel02_data ' +
    ',use_yn ' +
    ',remark_txt ' +
    ',insert_datetime ' +
    ',update_datetime ' +
    'FROM sys_code ' + 
    ' WHERE 1=1'; 
    if(syscdCd) sql + ' and syscd_cd = ' + syscdCd;
    if(classCd) sql + ' and class_cd = ' + classCd;
    if(rel01Data) sql + ' and rel01_data = ' + rel01Data;
    if(rel02Data) sql + ' and rel02_data = ' + rel02Data;
    if(useYn) sql + ' and use_yn = ' + useYn;
    sql + ' order by sort'
    return sql;
};


module.exports = {getSysCode};