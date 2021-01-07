const express = require("express");
const mysql = require("mysql")
const sequelize = require("sequelize")

const app = express()
const port = 3000;

const connection = new sequelize('harsh','root','' , {
  dialect :'mysql',
  define : {
      timestamps : false
  }
})

connection
.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  const stud = connection.define('student' , { 
           Roll_no:{
           type: sequelize.INTEGER,
           primaryKey :true},
           Name : sequelize.STRING,
           Address : sequelize.STRING,
           Phone : sequelize.INTEGER,
           Age : sequelize.INTEGER
      });

const studcourse = connection.define('studentcourse' , { 
     course_name : sequelize.INTEGER,
     Roll_no : sequelize.INTEGER
});
    studcourse.belongsTo(stud,{foreignKey : "Roll_no"})
    stud.hasOne(studcourse,{foreignKey : 'Roll_no'});

    app.get("/", (req,res)=>{
        new Promise((resolve,reject)=>{
     // In joining of two tables , default joining is left outer join in sequelize,
     //  but if we want to inner joining instead of left outer join then use (required : true)
        studcourse.findAll({include:[{model:stud, required: true}]}).then(details => {
            // studcourse.findAll({include:[stud]}).then(details => {
              res.send(details);   
            })
            .catch(err => {
                console.log(err)
             res.send("err")
            })
        })
    })

    app.listen(port,()=>{
        console.log("server is running..!")
    }) 