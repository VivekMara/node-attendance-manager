import jwt from "jsonwebtoken"

export const authorise = (req,res,next) => {
    try {
        const token = req.cookies;
        const verifyToken = jwt.verify(token.jwt,process.env.JWT_SECRET, function(err, decoded){
            if (err) {
                res.send("User is not registered, login or signup!!")
                res.json(
                    {
                        message: err.message,
                        name: err.name
                    }
                )
            }
            else{
                next()
            }
        });

    } catch (error) {
        res.json(
            {
                message:"error authorising user!!"
            }
        )
    }
}