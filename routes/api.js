
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  
//this is for viewall
exports.viewall = (req,res,next) => {

    
       
        pool.query('select * from Bank', function (err, results) {
            
            if (err) console.log(err)

           
            res.render('viewall',
            {
                title:'viewall',
                data:results.rows
            });
            
            
        })
 
 }


//this is for Transactions
 exports.Transactions= (req,res,next)=>{
   
        
        pool.query('select * from Bank', function (err, results) {
            
           
            if (err) console.log(err)
            res.render('transactions',
            {
                title:'Transactions',
                data:results.rows
            });
            

        })
 
 }

 //this is for details

 exports.Details = (req,res,next)=>
 {
     var ID =req.params.Id;
    
 
         var SQL = "select Id,First_name,Email_id,Account_number,Amount from Bank where Id ="+ID;

         pool.query(SQL,function(err,results){
            
        //   console.log(results)
            res.render('detail',
             {
                 title:'detail',
                 data:results.rows
                 
             });
            

         })
        
   


 }


exports.Amount = (req,res,next)=>

{
    var id = req.body.payeeid
   

        var SQL = "select Id,First_name,Account_number from Bank where Id="+id;

        var sQL = "select Id,First_name,Account_number from Bank where not Id="+id;

        pool.query(SQL,function(err,results){
           
         pool.query(sQL,function(err,result){  
           res.render('transfer',
            {
                title:'monytransfer',
                data1:results.rows,
                data2:result.rows
                
            })
        
            })
        })
 

  
}


//this is for money transfer


exports.Moneytransfer = (req,res,next)=>
{
    var sender = req.body.from
    var reciever= req.body.to
    var transferamt = req.body.amount;
    
  
        var SQLSelect = "select amount from Bank WHERE account_number="+sender ;
      
        pool.query(SQLSelect,function(err,ans){
            var amtfrom=ans.rows[0].amount;
           
           if(amtfrom >= transferamt)
           { 
            
          
           
            var selectamt2 ="SELECT Amount from Bank WHERE account_number="+reciever;
            pool.query(selectamt2,function(err,ans){
                var amtto=ans.rows[0].amount;
               
            var amt1 = amtfrom - transferamt;
           
            
            var SQL = "UPDATE Bank SET Amount="+amt1+ "WHERE  account_number="+sender;
            
            var sQL = "UPDATE Bank SET Amount="+amtto+"+"+transferamt+ "WHERE account_number="+reciever;
            
           var sql1 = "INSERT INTO Trans_History(first_name,last_name,amount) VALUES (" + sender + "," + reciever + "," + transferamt +")"; 
            
           
                pool.query(SQL,function(err,results){
                  
                    pool.query(sQL,function(err,res1){

                       

                        pool.query(sql1, function (err, res2) {
                                });
                          res.redirect('/success')
                        
                       })
                   })   
                })

           }
           else{
               res.redirect('/negative')
           }

        })
    
 

  
}


//this is for history

exports.history=(req,res,next)=>
{  
    
   
     
        var SQL = "select * from Trans_History";

        pool.query(SQL,function(err,results){
           
            res.render('History',
            {
                title:'History',
                data:results.rows
                
            })
       
           
        })
          
           
  
}
