const express = require('express');
let jwtToken = require('../security/jwtConfig')



function jwtAuthMiddleware(req, res, next) {
    console.log(req.header)
    console.log(req.header.message)
    console.log(req.header.authorization)

    const token = req.headers.authorization;
    console.log(token);
    if(!token){
        return res.status(401).json({message: 'No token provide'})
    }
    try{
        req.user = jwtToken.verifyToken(token.replace('Bearer ', ''));
        next();
    }catch (e) {
        console.log(e);
        return res.status(401).json({ message: 'Invalid token' });
    }
}





module.exports = jwtAuthMiddleware;
