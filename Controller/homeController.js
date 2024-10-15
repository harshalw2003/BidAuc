const path = require('path');

const homePage = (req,res)=>{

  
        try{

                res.sendFile(path.join(__dirname, '../public/Templates', 'home.html'));
                // res.json({
                //         success : true,
                //         message : "Home Page Rendered Successfully"
                // })
        }catch(e) {
                res.json({
                        success : false,
                        message : "Failed to Render Home Page",
                        error : e.message
                })
        }
        
        
        
}


module.exports= { homePage,

}