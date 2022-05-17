//backend server for handling read/write of answerfile.yaml file
//and interact with vShpere api

//contributor: Anson (ansonfeng2409@gmail.com)


const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || 8080; //run nodejs server on localhost:8080

const app = express();

const yaml = require('js-yaml');
const fs = require('fs');
const path = require("path");
const { stringify } = require("querystring");
// const json = require("js-yaml/lib/schema/json");

app.use(cors())
// app.use(express.static(path.resolve(__dirname, '../k8s_build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var sessionID = null;  //string, e.g.f5d5dcff98224ea66cb550039ca68544
const https = require('https');
const { HelperRuntimeModule } = require("webpack");
const { get } = require("http");
var my_vcsa_host = '';
var httpPort = 443;

//for storing vCenter username and password
var my_sso_username = '';
var my_sso_password = '';

// runOnBuildFunc(); // uncomment this line to run runOnBuidFunc()

//tmp https options for testing
const tmp_options = {
  hostname: my_vcsa_host,
  path: '/rest/com/vmware/cis/session?~action=get',
  // auth: my_sso_username + ":" + my_sso_password,
  rejectUnauthorized: false,
  method: 'POST',
  // requestCert: true,
  // agent: false,
  headers: {
    Accept: 'application/json',
    // 'vmware-api-session-id':sessionID,
    'vmware-api-session-id': 'f5d5dcff98224ea66cb550039ca68544',
  },
};

//run on buid, for request test
function runOnBuildFunc(){
https.request(tmp_options, (res) => {
  console.log(tmp_options)
  console.log("check session id STATUS: " + res.statusCode);
  res.on('error', function (err) { console.log("ERROR in SSO authentication: ", err); reject(err) });
  res.on('data', function (chunk) {
    console.log(res.headers);
    res.on('end', function () {
      if (res.statusCode == 200) {
        console.log('session id is valid');
      } else console.log('session id expired');

    })
    // console.log(res.headers['vmware-api-session-id']);
    // sessionID= res.headers['vmware-api-session-id'];

  });
}).end()
}


app.post("/testconnection", (req, res) => {
  // console.log(req.body)
  (async function (){
    console.log(`host:${req.body.vcenter_host} username:${req.body.username} password:${req.body.password}`);
    my_sso_username=req.body.username;
    my_sso_password=req.body.password;
    // my_vcsa_host = req.body.vcenter_host;
    // sessionID = await getSessionID();
    var statusCode= 1;
    var flag = await check_sessionid_valid();
    console.log(flag);
    if ( flag ==false){
      statusCode = await getSessionID();
      console.log(statusCode);
    }
    else {
      statusCode =201;
      // console.log(statusCode);
    }
    
    res.json({ 'statusCode': statusCode,'sessionID': sessionID });
    // res.json(result);
  })();
});

//testing
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


// getSessionID() //uncomment to test getSessionID() on build

//return status code, 201=success, 401= fail
function getSessionID() {
  return new Promise((resolve, reject) => {
    // Prepare the HTTP request.
    my_http_options = {
      host: my_vcsa_host,
      path: '/api/session',
      method: 'POST',
      rejectUnauthorized: false,
      requestCert: true,
      agent: false,
      auth: my_sso_username + ":" + my_sso_password
    };

    https.request(my_http_options, (res) => {
      console.log("get session id STATUS: " + res.statusCode);
      res.on('error', function (err) { console.log("ERROR in SSO authentication: ", err); reject(err) });

      res.on('data', function (chunk) { });
      res.on('end', function () {
        var result ={statuscode:'', sessionID:''};
        if (res.statusCode == 201) {
          // Save session ID authentication.
          sessionID = res.headers['vmware-api-session-id'];
          console.log(sessionID);
        }
        resolve(res.statusCode);
      }
      )
    }).end()
  })
}

//get list of host
app.get("/host", (req, res) => {
  
  (async function () {
    //checki if existed sessionID
    if (sessionID == null) {
      console.log("session id is null, getting a new one");
      sessionID = await getSessionID();
      // options.headers["vmware-api-session-id"] = sessionID;
    }
    else {
      console.log("session id presents: " + sessionID);
      //check if session expired
      check_sessionid_valid();
      // if (check_sessionid_valid() == false){
      //   sessionID = await getSessionID();
      // }
    }
    // console.log(options.headers["vmware-api-session-id"])
    result = await getHostList();
    return res.json(result);
  })();

});

function getHostList() {
  return new Promise((resolve, reject) => {
    // Prepare the HTTP request.
    const options = {
      hostname: my_vcsa_host,
      path: '/rest/vcenter/host',
      headers: {
        Accept: 'application/json',
        'vmware-api-session-id': sessionID,
      },
      rejectUnauthorized: false,
      method: 'GET',
    };

    https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      // console.log(options)
      res.on('data', data => {
        // process.stdout.write(data)
        // console.log(res.headers)
        var resultj = JSON.parse(data)
        console.log(resultj)
        resolve(resultj);
      })

      res.on('error', error => {
        console.error(error)
      })

      res.on('end', () => {
        if (res.statusCode == 200) {
          // resolve();
        }
      })

    }).end()
  })
}


app.get("/datacenter", (req, res) => {
  
  (async function () {
    //checki if existed sessionID
    if (sessionID == null) {
      console.log("session id is null, getting a new one");
      sessionID = await getSessionID();
      // options.headers["vmware-api-session-id"] = sessionID;
    }
    else {
      console.log("session id presents: " + sessionID);
      //check if session expired
      check_sessionid_valid();
      // if (check_sessionid_valid() == false){
      //   sessionID = await getSessionID();
      // }
    }
    // console.log(options.headers["vmware-api-session-id"])
    result = await getDCList();
    return res.json(result);
  })();

});


function getDCList() {
  return new Promise((resolve, reject) => {
    // Prepare the HTTP request.
    const options = {
      hostname: my_vcsa_host,
      path: '/rest/vcenter/datacenter',
      headers: {
        Accept: 'application/json',
        'vmware-api-session-id': sessionID,
      },
      rejectUnauthorized: false,
      method: 'GET',
    };

    https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      // console.log(options)
      res.on('data', data => {
        var resultj = JSON.parse(data)
        console.log(resultj)
        resolve(resultj);
      })

      res.on('error', error => {
        console.error(error)
      })

      res.on('end', () => {
        if (res.statusCode == 200) {
          // resolve();
        }
      })

    }).end()
  })
}


app.get("/cluster", (req, res) => {
  
  (async function () {
    //checki if existed sessionID
    if (sessionID == null) {
      console.log("session id is null, getting a new one");
      sessionID = await getSessionID();
      // options.headers["vmware-api-session-id"] = sessionID;
    }
    else {
      console.log("session id presents: " + sessionID);
      //check if session expired
      check_sessionid_valid();
    }
    // console.log(options.headers["vmware-api-session-id"])
    result = await getCluster();
    return res.json(result);
  })();

});


function getCluster() {
  return new Promise((resolve, reject) => {
    // Prepare the HTTP request.
    const options = {
      hostname: my_vcsa_host,
      path: '/rest/vcenter/cluster',
      headers: {
        Accept: 'application/json',
        'vmware-api-session-id': sessionID,
      },
      rejectUnauthorized: false,
      method: 'GET',
    };

    https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      // console.log(options)
      res.on('data', data => {
        var resultj = JSON.parse(data)
        console.log(resultj)
        resolve(resultj);
      })

      res.on('error', error => {
        console.error(error)
      })

      res.on('end', () => {
        if (res.statusCode == 200) {
          // resolve();
        }
      })

    }).end()
  })
}

//return true or false, check if session expired
function check_sessionid_valid(){
  return new Promise((resolve, reject) => {
  const tmp_options = {
    hostname: my_vcsa_host,
    path: '/rest/com/vmware/cis/session?~action=get',
    rejectUnauthorized: false,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'vmware-api-session-id': sessionID,
    },
  };
  
  //run on buid, for request test
  https.request(tmp_options, (res) => {
    // console.log(tmp_options)
    console.log("check session id STATUS: " + res.statusCode);
    res.on('error', function (err) { console.log("ERROR in SSO authentication: ", err); reject(err) });
    res.on('data', function (chunk) {
      // console.log(res.headers);
      res.on('end', function () {
        if (res.statusCode == 200) {
          console.log('session id is valid');
          // return true;
          resolve(true);
        }
        else {
        console.log('session id expired');
        // return false
        (async function(){await getSessionID()});
        resolve(false)
        }
  
      })
    });
  }).end()
})
}

//return json etracted from answerfile.yaml
app.get("/answeryaml", (req, res) => {
  let doc
  try {
    // fs.readFileSync(path.resolve(__dirname, "../file.xml"));
    doc = yaml.load(fs.readFileSync(path.resolve(__dirname, "./answerfile.yaml"), 'utf8'));
    console.log(doc);
  } catch (e) {
    console.log(e);
  }
  res.json(doc);
});


//write json from post to answerfile.yaml
app.post('/updatefile', function (req, res) {
  // console.log("got something posted");
  console.log(req.body)

  fs.writeFile((__dirname + "/answerfile.yaml"), yaml.dump(req.body), (err) => {
    if (err) {
      console.log(err);
    }
  })
  console.log("updated answerfile.yaml")

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});