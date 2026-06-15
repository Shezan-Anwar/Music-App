const jwt = require("jsonwebtoken");

async function authArtist( req , res , next) {
    const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message : " Unauthorized "})
        }
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            if (decoded.role !== "artist"){
                return res.status(403).json({
                    message : "Your profile is not registered as an artist"
                })        
            }
            req.user = decoded;
            next()
            }catch{
         return res.status(401).json({message : " Unauthorized "})
    }
}

module.exports = {authArtist};