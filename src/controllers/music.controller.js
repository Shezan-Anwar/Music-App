const jwt = require("jsonwebtoken");
const albumModel = require("../model/album.model");
const musicModel = require("../model/music.model");
const {uploadMusic} = require("../services/storage.service")

async function createMusic(req , res) {
    
   
    const {title} = req.body;
    const file = req.file;
    const result = await uploadMusic(file.buffer.toString('base64'))
    const music = await musicModel.create({
        uri : result.url,
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

async function getAllMusic(req , res) {
    const musics = await musicModel.find().populate("artist ", "username")
    res.status(200).json({
        message : "musics fetched successfully",
        musics : musics ,
    })
}

async function getAllAlbums(req , res) {
    const albums = await albumModel.find().select("title artist").populate("artist"," username").limit(20).populate("musics")
     res.status(200).json({
        message : "albums fetched successfully",
        albums : albums ,
    })
}

async function getAlbumById(req, res) {

    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist", "username email").limit(20).populate("musics")

    return res.status(200).json({
        message: "Album fetched successfully",
        album: album,
    })

}
module.exports = {createMusic , createAlbum , getAllMusic , getAllAlbums , getAlbumById};