const nodemailer = require("nodemailer");
const Course = require('../models/Course')
const User = require('../models/User')


exports.getIndexPage= async (req, res)=>{
    
    const courses= await Course.find().sort('-createdAT').limit(2)      // sort komutu ile en son eklenenden başlıyoruz  limit komutu ilede 2 adet kurs cagırıyoruz
    const totalCourses= await Course.find().countDocuments();
    const totalStudents= await User.countDocuments({role:'student'});
    const totalTeachers= await User.countDocuments({role:'teacher'});


    res.status(200).render('index',{
        page_name:"index",
        courses,
        totalCourses,
        totalStudents,
        totalTeachers
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
    try{
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

      req.flash("succes", "We Received your message succesfully")
      
      res.status(200).redirect('contact')
     }
     catch(err){
    //   req.flash("error", `Something happened! ${err}`);
         req.flash("error", `Something went wrong!`);

        console.log("hata oldu");
        res.status(200).redirect('contact');
     }

}



