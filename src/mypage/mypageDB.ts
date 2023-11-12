const getWishList = (fieldId:string, fieldTp:string, email:string) =>{
 let sql = 'SELECT *' + 
 'FROM field_like A ' +
 'WHERE 1=1';
 if(fieldId) sql + ' and field_id = ' + fieldId;
 if(fieldTp) sql + ' and field_tp = ' + fieldTp;
 if(email) sql + ' and email = ' + email;
 sql + ' order by DESC'
 return sql;
};

module.exports = {getWishList};