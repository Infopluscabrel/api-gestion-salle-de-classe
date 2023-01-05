const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const validator = require('validator');



async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM salle  LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getOne(page = 1, id) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT  * from
    salle`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,

  };
}

async function getOneIdToken(id, token) {
  let page = 1;
  let quer = `SELECT  
    salle.id,  nom, prenom, telephone, email, IdOauth, modeLogin, 
   image, salle.createdAt, salle.updatedAt , role.libelle 
    FROM salle , role
    where salle.id="${id}" and token="${token}" `


  const rows = await db.query(
    quer
  );


  const data = helper.emptyOrRows(rows);

  if (data.length != 0) {
    console.log("service data " + data);
  } else {
    console.log("user don t exist")
  }
  //const meta = { page };


  return {
    data,

  };
}


async function getOneIdRefreshToken(id, token) {
  let page = 1;
  let quer = `SELECT  
    salle.id,  nom, prenom, telephone, email, IdOauth, modeLogin, 
   image, salle.createdAt, salle.updatedAt , role.libelle 
    FROM salle , role
    where salle.id="${id}" and refresh_token="${token}" `
  console.log("token ref" + token)

  const rows = await db.query(
    quer
  );


  const data = helper.emptyOrRows(rows);

  if (data.length != 0) {
    console.log("service data " + data);
  } else {
    console.log("user don t exist")
  }
  //const meta = { page };
  

  return {
    data,

  };
}

async function login(email, password) {
  let UserToken;
  let userRefresh;

  await validateEmail(email);


  const rows = await db.query(
    `SELECT * 
    FROM salle 
    where email="${email}"  `
  );
  const data = helper.emptyOrRows(rows);




  //const meta = { page };
  if (data.length != 0) {

    if(data[0].password == null ){
      return "User must login with Web SSO "
    }

  const isMatch = await bcrypt.compare(password, data[0].password)

   

    if (!isMatch) {
      throw new Error('Unable to login')
    }


    generateAuthToken(data[0]).then(async (token) => {

      const saveTOken = await db.query(
        `UPDATE salle
set token = "${token}"
where id= "${data[0].id}" `
      );

      UserToken = token;
    }

    );

    generateRefreshToken(data[0]).then(async (rtoken) => {

      const saveTOken = await db.query(
        `UPDATE salle
              set refresh_token = "${rtoken}"
              where id= "${data[0].id}" `
      );
      userRefresh = rtoken;
    });



  } else {
    return "User don't exist ";
  }



  return {
    data,
    UserToken,
    userRefresh

  };
}

async function refreshToken(refresh) {

  const rows = await db.query(
    `SELECT * 
    FROM salle 
    where refresh_token="${refresh}"  `
  );
  const data = helper.emptyOrRows(rows);
  console.log(refresh);




  //const meta = { page };
  if (data.length != 0) {





    generateAuthToken(data[0]).then(async (token) => {

      const saveTOken = await db.query(
        `UPDATE salle
set token = "${token}"
where id= "${data[0].id}" `
      );

      return { token };

    }

    );



  } else {
    return "User don't exist ";
  }



  return {
    data,

  };
}

async function generateAuthToken(user) {


  tokensecret = process.env.secretToken || "12345"
  const token = jwt.sign({ id: user.id }, tokensecret, { expiresIn: 60 * 60 })

  user.token = token


  // update user table 
  const saveTOken = await db.query(
    `UPDATE salle
set token = "${token}"
where id= "${user.id}" `
  );




  return token
}

async function generateRefreshToken(user) {


  tokensecret = process.env.RefreshsecretToken || "12345"
  const rtoken = jwt.sign({ id: user.id }, tokensecret, { expiresIn: 60 * 60 * 20 })

  user.refresh_token = rtoken


  // update user table 
  const saveTOken = await db.query(
    `UPDATE salle
set refresh_token = "${rtoken}"
where id= "${user.id}" `
  );




  return rtoken
}

async function create(salle) {
/*
  let role = salle.idRole || 2;

  let password = await bcrypt.hash(salle.password, 8);
  await validateEmail(salle.email);
*/
  const result = await db.query(
    `INSERT INTO salle (id, user_id, numero, nbre_place_max,  disponibilite,description, nbre_connectes) 
    VALUES (NULL, '1', "${salle.numero}", "${salle.nbre_place}" , "1", "${salle.description}" , "0");`
  );

  let message = "Error in creating user";

  if (result.affectedRows) {
    message = "user  created successfully";
  }

  return { message };
}

async function findOrcreateById(id, picture = "", mode, nom = "", prenom = "", email = "") {

  const rows = await db.query(
    `SELECT * 
    FROM salle 
    where IdOauth="${id}"  `
  );
  const data = helper.emptyOrRows(rows);
  //const meta = { page };\


  if (data.length == 0) {
    const result = await db.query(
      `INSERT INTO salle 
    ( IdOauth , image , modeLogin , idRole , nom ,prenom , email )   
    VALUES 
    ("${id}" , "${picture}" , "${mode}" , 2 , "${nom}" , "${prenom}", "${email}"   )`
    );

    let message = "Error in creating user";

    if (result.affectedRows) {
      message = "user  created successfully";
    }

    return { message };

  } else {

    let message = "user exist in database";
    return { message };
  }



}

async function update(id, user) {
  let role = user.idRole || 2 ;
  const result = await db.query(
    `UPDATE salle
    SET nom="${user.nom}", prenom="${user.prenom}", idRole=${role} , 
    telephone = "${user.telephone}" 
    WHERE id="${id}"`
  );

  let message = "Error in updating programming language";

  if (result.affectedRows) {
    message = "user updated successfully";
  }

  return { message };
}

async function updatepassword(id, user) {

  let password = await bcrypt.hash(user.motDePasse, 8);
  const result = await db.query(
    `UPDATE salle
    SET password="${password}"
    WHERE id="${id}"`
  );

  let message = "Error in updating programming language";

  if (result.affectedRows) {
    message = "user password updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM salle  WHERE id=${id}`
  );

  let message = "Error in deleting  user ";

  if (result.affectedRows) {
    message = "user  deleted successfully";
  }

  return { message };
}

// update umage profile 
async function updateProfile(id, name) {
let url = process.env.url || "http://localhost:5000"  ;
let link = url+ "/uploads/"+name; 
  const result = await db.query(
    `UPDATE salle
    SET image="${link}"
    WHERE id="${id}"`
  );

  let message = "Error in updating image profile ";

  if (result.affectedRows) {
    message = "user profile image updated successfully";
  }

  return { message , link };
}
// validation d'email
function validateEmail(value) {
  if (!validator.isEmail(value)) {
    throw new Error('Email is invalid')
  }
}
module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getOne,
  login,
  findOrcreateById,
  generateAuthToken,
  getOneIdToken,
  refreshToken,
  getOneIdRefreshToken,
  updatepassword,
  updateProfile,

};
