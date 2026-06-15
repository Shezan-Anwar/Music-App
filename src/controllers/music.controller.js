const jwt = require("jsonwebtoken");
const albumModel = require("../model/album.model");
const musicModel = require("../model/music.model");
const {uploadMusic} = require("../services/storage.service")

async function createMusic(req , res) {
    
   
    const {title} = req.body;
    const file = req.file;
    const result = uploadMusic(file.buffer.toString('base64'))
    const music = await musicModel.create({
        uri : result.uri,
        title,
        artist : req.user.id,
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

async function createAlbum(req , res) {
   
    const {title, musicIds} = req.body;

    const album = await albumModel.create({
        title , 
        artist : req.user.artist,
        musics : musicIds,
    })
    res.status(201).json({
        message:"Album created successfully",
        album : {
            id : album._id,
            title : album.title,
            artist: album.artist,
            musics : album.musics,
        }
    })
    
}

module.exports = {createMusic , createAlbum};