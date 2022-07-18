const nodemailer = require("nodemailer");


exports.getIndexPage= (req, res)=>{
    
    res.status(200).render('index',{
        page_name:"index"
    }); 
}



exports.getAboutPage= (req, res)=>{
    res.status(200).render('about', {
        page_name:"about"
    }); 
}

exports.getRegisterPage= (req, res)=>{
    res.status(200).render('register', {
        page_name:"register"
    }); 
}


exports.getLoginPage= (req, res)=>{
    res.status(200).render('login', {
        page_name:"login"
    }); 
}

exports.getContactPage= (req, res)=>{
    res.status(200).render('contact', {
        page_name:"contact"
    }); 
}



exports.sendEmail =async (req, res) =>{
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const outputMessage= `
    <h1>Message Details</h1>
    <ul>
    <li> Name:${req.body.name}</li>
    <li> Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    
    `
    let transporter = nodemailer.createTransport({
        
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'yavuzkarakoctest@hotmail.com',
            pass: 'zkzxcubonmszztto'
        },
      });
    
     try{
         // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Smart EDU Contact From" <yavuzkarakoctest@hotmail.com>', // sender address
        to: "yavuzkarakocsosyal@gmail.com", // list of receivers
        subject: "Smart Edu Contact Form New Message", // Subject line
        text: "Hello world?", // plain text body
        html: outputMessage, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      
      res.status(200).redirect('contact')
     }
     catch(err){
        console.log("hata oldu"),
        res.status(200).redirect('contact')
     }

}



