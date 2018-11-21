const app = require('./app');
const port = process.env.PORT || 5000;

//
// app.get('/', (req, res)=>{
//     res.status(200).json({
//         message: 'Working'
//     })
// })

app.listen(port, () => {
    console.log(`Server working on port ${port}`);
})
