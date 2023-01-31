const express = require('express');
const cors =require('cors')

const app = express();
app.use(express.json());
app.use(cors())

app.use(express.urlencoded({extended: true}));
app.post('/submit', (req, res) => {
    console.log(req.body);
    // use req.body to access the resource details submitted in the form
    // Perform your further operation on server
    const fs = require("fs");
const namesval =req.body.resourceDetails.name;
console.log(namesval)


    // Read the terraform.tfvars file
    
    fs.readFile("terraform.tfvars", "utf8", (err, content) => {
        if (err) {
            console.log(err);
            return;
        }
        const new_resource_name = "hello"
        // Search for the current value of "rgname"
        let rgname_value = content.match(/resource_name = "(.*?)"/);
        if (rgname_value) {
            console.log("Current value of resource_name:", rgname_value[1]);
            // Update the value of "rgname" to a new value
            //let new_rgname_value = "new-rg-name";
            //content = content.replace(/resource_name = "(.*?)"/, `resource_name = "${namesval}"`);
            content = content.replace(/resource_name = "(.*?)"/, `resource_name = "${namesval}"`);
            console.log(content+"check")
            // Write the updated content back to the file
            fs.writeFile("terraform.tfvars", content, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("File updated successfully.");
                }
            });
        } else {
            console.log("rgname not found in the file.");
        }
    });
    var axios = require('axios');
//var fs = require('fs');
var base64 = require('base-64');

let token = "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"
let file = fs.readFileSync("terraform.tfvars").toString();
console.log(file);
var content = base64.encode(file);
console.log(content);
uploadFileApi(token, content)

async function uploadFileApi(token, content) {

  var config = {
    method: 'get',
    url: 'https://api.github.com/repos/jainakshay1/terraform1/contents/terraform.tfvars',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await axios(config);
    var sha = response.data.sha;
  } catch (error) {
    console.log(error);
    return;
  }

  var data = JSON.stringify({
    "message": "txt file",
    "content": `${content}`,
    "sha": sha
  });

  config = {
    method: 'put',
    url: 'https://api.github.com/repos/jainakshay1/terraform1/contents/terraform.tfvars',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: data
  };


  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}


                          
});
//const https = require('https');

// Download the file
// const fileUrl = 'https://raw.githubusercontent.com/jainakshay1/terraform/Master/Main.tf';
// const localFile = 'main.tf';

// https.get(fileUrl, (response) => {
//   response.pipe(fs.createWriteStream(localFile));
// });
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// const { Octokit } = require('@octokit/rest');
// const octokit = new Octokit({
//     auth: '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'
//   })
//   const owner = "jainakshay1";
//   const repo = "terraform";
//   const path = "main.tf";
//   const message = "Updating resource name and region";
  
//   // Fetch the SHA of the file you want to update
//   const { data } = await octokit.repos.getContents({
//       owner,
//       repo,
//       path
//   });
//   const sha = data.sha;
  
//   // Update the file content
//   const newContent = oldContent.replace("old_resource_name", new_resource_name)
//                                .replace("old_region", new_region);
//   const content = Buffer.from(newContent).toString("base64");
  
//   // Update the file on GitHub
//   try {
//       const { data } = await octokit.repos.createOrUpdateFileContents({
//           owner,
//           repo,
//           path,
//           message,
//           content,
//           sha
//       });
//       console.log("File updated successfully:", data);
//   } catch (err) {
//       console.error("Error updating file:", err);
//   }
  
  
   // octokit.repos.createForAuthenticatedUser({name:"testing"})
    //octokit.repos.delete({owner:"jainakshay1",repo:"testing"})
   // async function createAndPushFile(fileName, fileContent) {
        // 1. Create a new file
        // const { data: { sha } } = await octokit.repos.createFile({
        //   owner: 'OWNER_USERNAME',
        //   repo: 'REPO_NAME',
        //   path: fileName,
        //   message: 'Add new file',
        //   content: Buffer.from(fileContent).toString('base64')
        // })
      
        // 2. Update the file
    //     const { data } = await octokit.repos.createOrUpdateFileContents({

    //     })
      
    //     console.log(data)
    //   }
      
      //createAndPushFile('fileName.txt', 'This is my file content')
    //   octokit.repos.createOrUpdateFileContents({
    //     owner: 'jainakshay1',
    //   repo: 'terraform',
    //   path: 'new.txt',
    //   message: 'Update file',
    //   content: 'Show to know',
    //   branch: 'Master'}).then(({ data }) => {
    //     // handle successful response
    //   })
    //   .catch(err => {
    //     // handle error
    //     console.log(err)
    //   });
//     const owner = "jainakshay1";
// const repo = "terraform";
// const path = "main.tf";
// const message = "Updating resource name and region";
// const content = Buffer.from("new content of the file").toString("base64");



// try {
//   const { data } = await octokit.repos.createOrUpdateFileContents({
//     owner,
//     repo,
//     path,
//     message,
//     content,
//     sha
//   });
//   console.log("File updated successfully:", data);
// } catch (err) {
//   console.error("Error updating file:", err);

// }

    //   const { data } = await octokit.repos.getContents({
    //     owner,
    //     repo,
    //     path
    //   });
    //   const sha = data.sha;
    //   const newContent = oldContent.replace("old_resource_name", new_resource_name)
    //                          .replace("old_region", new_region)
    // async function updateFile() {
    //     try {
    //         const { data } = await octokit.repos.createOrUpdateFileContents({
    //         owner,
    //         repo,
    //         path,
    //         message,
    //         content,
    //         //sha
    //         });
    //         console.log("File updated successfully:", data);
    //     } catch (err) {
    //         console.error("Error updating file:", err);
    //     }
    // }
    
    // updateFile();
//   app.post('/submit', (req, res) => {
//     console.log(req.body);
//     // use req.body to access the resource details submitted in the form

//     // code for updating the file in GitHub repository goes here

//     res.send('Form submitted successfully!');

// });
//const new_resource_name= req.body.new_resource_name;
//const new_resource_name= req.body.new_resource_name;
    
    //res.send('Form submitted successfully!');
   // const fs = require("fs");


// Read the main.tf file

// fs.readFile("terraform.tfvars", "utf8", (err, content) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     const new_resource_name = "skdhsy"
//     // Search for the current value of "rgname"
//     let rgname_value = content.match(/rgname = "(.*?)"/);
//     if (rgname_value) {
//         console.log("Current value of rgname:", rgname_value[1]);
//         // Update the value of "rgname" to a new value
//         let new_rgname_value = "new-rg-name";
//         content = content.replace(/rgname = "(.*?)"/, `rgname = "${new_resource_name}"`);
//         // Write the updated content back to the file
//         fs.writeFile("main.tf", content, (err) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("File updated successfully.");
//             }
//         });
//     } else {
//         console.log("rgname not found in the file.");
//     }
// });


