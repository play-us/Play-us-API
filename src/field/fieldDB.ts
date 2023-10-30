const getFieldList = (fieldId:string, fieldTp:string, area:string, searchTxt:string)=>{
    let sql = 'SELECT *' +
    'FROM field A ' + 
    ' WHERE 1=1'; 
    if(fieldId) sql + ' and field_id = ' + fieldId;
    if(fieldTp) sql + ' and field_tp = ' + fieldTp;
    if(area) sql + ' and area = ' + area;
    if(searchTxt) sql + " and field_nm like '%" + searchTxt + "%'";
    sql + ' order by insert_datetime, field_nm'
    return sql;
};

const getFieldDetail = (fieldId:string)=>{
    let sql = 'SELECT *' +
    'FROM field ' + 
    ' WHERE 1=1'; 
    if(fieldId) sql + ' and field_id = ' + fieldId;
    return sql;
};

module.exports = {getFieldList, getFieldDetail};