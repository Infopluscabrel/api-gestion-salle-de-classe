const express = require("express");
const router = express.Router();
const salles = require("../services/salles");
const passport = require('passport');
const multer = require('multer')
const auth = require('../middleware/auth') ;
const authRefresh = require('../middleware/authRefresh') ;

/* GET salles . */
router.get("/all", async function (req, res, next) {
  try {
    
    res.json(await salles.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting salles s `, err.message);
    next(err);
  }
});

/* POST salle */
router.post("/new/salle", async function (req, res, next) {
  try {
    res.json(await salles.create(req.body));
  } catch (err) {
    console.error(`Error while creating salles `, err.message);
    next(err);
  }
});


// Authentificated correctly with google 



// when Authentification fail 
router.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});




//get profile of a salle 

router.get("/profile/:id", async function (req, res, next) {
  try {
    
    res.json(await salles.getOne(req.query.page , req.params.id));
  } catch (err) {
    console.error(`Error while getting salles  `, err.message);
    next(err);
  }
});

//get profile of a salle 

router.get("/profile",auth ,  async function (req, res, next) {
  try {
    
  console.log(req.salle)
    res.status(200).send(req.salle)
  } catch (err) {
    console.error(`Error while getting salles  `, err.message);
    next(err);
  }
});

// ouvrir salle 

router.post("/ouvrir", async function (req, res, next) {
  try {
    
    res.json(await salles.login( req.body.email , req.body.motDePasse ));
  } catch (err) {
    console.error(`Error while getting salles  `, err.message);
    next(err);
  }
});


//salle fermer sallle 
router.get('/fermer', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

// refresh-token

router.post("/refreshtoken", authRefresh , async function (req, res, next) {
  try {
    
    res.json(await salles.refreshToken( req.body.refresh_token  ));
  } catch (err) {
    console.error(`Error while getting salles  `, err.message);
    next(err);
  }
});

/* PUT salle */
router.put("/update",   async function (req, res, next) {
  try {
    
    res.json(await salles.update(req.body.id  , req.body) );
  } catch (err) {
    console.error(`Error while updating salle `, err.message);
    next(err);
  }
});



/* DELETE salle */
router.delete("/delete", auth , async function (req, res, next) {
  try {
    res.json(await salles.remove(req.salle.id));
  } catch (err) {
    console.error(`Error while deleting salle `, err.message);
    next(err);
  }
});


// a
// upload image profile 
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,  `profile-${Date.now()}.${file.originalname}`)
    }
})
let upload = multer({ storage: storage , 
                     })

router.post('/profile-upload/:id', upload.single('profile-file'), async function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
 
   try {
    
    res.json(await salles.updateProfile(req.params.id  , req.file.filename ) );
  } catch (err) {
    console.error(`Error while updating salle `, err.message);
    next(err);
  }


})




module.exports = router;
