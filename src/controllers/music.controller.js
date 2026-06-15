const jwt = require("jsonwebtoken");
const musicModel = require("../model/music.model");
const {uploadMusic} = require("../services/storage.service")

async function createMusic(req , res) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message : " Unauthorized "})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if (decoded.role !== "artist"){
            return res.status(403).json({
                message : "Your profile is not registered as an artist"
            })        }
    }catch{
         return res.status(401).json({message : " Unauthorized "})
    }

    const {title} = req.body;
    const file = req.file;
    const result = uploadMusic(file.buffer.toString('base64'))
    const music = await musicModel.create({
        uri : result.uri,
        title,
        artist : decoder.id,
    })

    res.status(201).json({
        message : "music uploade successfully",
        music :{
            id : music._id,
            uri : music.uri,
            title : music.title,
            artist : music.artist,
        }
    })
}


module.exports = {createMusic};