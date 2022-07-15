const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin:'http://localhost:3000', credentials: true }))

let animas = {
    list: [
        { id: 1, image:'/a1.jpg', price:'100',favorite:false },
        { id: 2, image:'/a2.jpg', price:'100',favorite:false},
        { id: 3, image:'/a3.jpg', price:'100',favorite:false },
    ]
}

app.get('/', (req, res) => {
    // res.send('Hello World!');
    return res.json(animas.list)
});


app.post('/', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    res.send([
        'Signup completed',
        `Name: ${name}`,
        `Email: ${email}`,
        `Password: ${'*'.repeat(password.length)}`
    ].join('<br>'));
});


app.put('/:id', (req, res) => {
    const updateIndex = animas.list.findIndex(item => +item.id === +req.params.id)
    // console.log(req.params.id);
    // console.log(req.body);
    // console.log(updateIndex);
    // res.json(Object.assign(animas.list[updateIndex], req.body))
    
    if(animas.list[updateIndex].favorite === true ){
        animas.list[updateIndex].favorite = false;
    }
    else{
        animas.list[updateIndex].favorite = true;
    }
    res.json(animas.list)
    })

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});