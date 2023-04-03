const express = require('express');
const cors = require('cors');
const bodyParser=require('body-parser')
const { default: axios } = require('axios');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



app.get("/status", function (req, res) {
    axios.get('http://localhost:7860/sdapi/v1/progress').then(r=>{
        res.json({
            progressPct:r.data.progress*100,
            base64:r.data.current_image,
            currentStep:r.data.state.sampling_step
        });
    })
    
});

app.post("/textToImage", function (req, res) {
    console.log(req.body.prompt)
    axios.post('http://localhost:7860/sdapi/v1/txt2img',
        {
            "prompt": req.body.prompt,
            "steps": req.body.nSteps
        }
    ).then(r=>{
        res.json({
            base64:r.data.images[0]
        })
    })
});

const port = process.env.PORT || 4000;
app.listen(port);


module.exports = app;