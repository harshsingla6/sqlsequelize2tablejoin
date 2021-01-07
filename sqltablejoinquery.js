const express = require("express");
const mysql = require("mysql")
const app = express();

const Port = 5000

var connection = mysql.createConnection({
    host: "localhost",
    user : "root",
    password : "", 
    database : "harsh",
    port : "3306"
   });

   connection.connect((error)=>{
    if(error){
        console.log("error")
    }
    else {
        console.log("connected")
    }
})

// table 1
app.get("/student", (req,res)=>{
        connection.query("Select * from student", function(error,rows,fields){
            if(error){
                console.log(error);
                console.log("Error in the query")
            }
            else{
                console.log("Sucessful query..!")
                res.send(rows)
            }
        })
    })

//table 2
    app.get("/studentcourse", (req,res)=>{
        connection.query("Select * from studentcourse", function(error,rows,fields){
            if(error){
                console.log(error);
                console.log("Error in the query")
            }
            else{
                console.log("Sucessful query..!")
                res.send(rows)
            }
        })
    })

// type 1
    app.get("/innerJoin", (req,res)=>{
        connection.query("Select Name,Address,cousre_id from students join studentcourses on students.Roll_no = studentcourses.Roll_no", function(error,rows,fields){
            if(error){
                console.log(error);
                console.log("Error in the query")
            }
            else{
                console.log("Sucessful query..!")
                res.send(rows)
            }
        })
    })

    app.get("/leftJoin", (req,res)=>{
        connection.query("Select * from student left join studentcourse on student.Roll_no = studentcourse.Roll_no", function(error,rows,fields){
            if(error){
                console.log(error);
                console.log("Error in the query")
            }
            else{
                console.log("Sucessful query..!")
                res.send(rows)
            }
        })
    })

    app.get("/rightJoin", (req,res)=>{
        connection.query("Select * from student right join studentcourse on student.Roll_no = studentcourse.Roll_no", function(error,rows,fields){
            if(error){
                console.log(error);
                console.log("Error in the query")
            }
            else{
                console.log("Sucessful query..!")
                res.send(rows)
            }
        })
    })

    // app.get("/fullJoin", (req,res)=>{
    //     connection.query("Select * from student full join studentcourse on student.Roll_no = studentcourse.Roll_no", function(error,rows,fields){
    //         if(error){
    //             console.log(error);
    //             console.log("Error in the query")
    //         }
    //         else{
    //             console.log("Sucessful query..!")
    //             res.send(rows)
    //         }
    //     })
    // })

app.listen(Port,()=>{
    console.log("server is running..!")
}) 