
const middleware = (req, res, next) => {
    console.log('This is middleware')
    res.on('finish',()=>{
        console.log('End')
    })
    next()
}

export default middleware
