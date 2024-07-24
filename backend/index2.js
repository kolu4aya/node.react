import express from "express";
import upload from "express-fileupload";
import cors from "cors";
var app = express();
//MIDDLEWARES
app.use(upload());
app.use(cors());
//ROUTE DEFINE
app.post("/", async function (req, res) {
 try {
  // IN REQ.FILES."YOUR_FILE_NAME" WILL BE PRESENT
  const file = req.files.File;
  const bodyData = req.body;
  console.log(file.name)
  file.mv('./uploads/' + file.name);
//   console.log(req.body.carDetail)
  // console.log(file);
  // console.log(bodyData);
  res.status(200).send({
  message: "FILE RECEIVED!",
 });
 } catch (error) {
 res.send("ERROR");
 }
});
var PORT = 5000;
app.listen(PORT, function () {
 console.log("Server is running on PORT:", PORT);
});