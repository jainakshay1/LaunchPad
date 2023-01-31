import React, {useState} from 'react';

function Form() {
  const [resourceDetails, setResourceDetails] = useState({name: '', region: ''});
  const [showButton, setShowButton] = useState(false);

  const handleChange = (event) => {
    setResourceDetails({
      ...resourceDetails,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setShowButton(true);
    // Send a request to your server with the resource details
    console.log(resourceDetails);
    const responce = await fetch("http://localhost:4000/submit",{
     method:'POST',
     headers:{
     'Content-Type':'application/json'
    },body:JSON.stringify({
      resourceDetails

     })
  }
   )
    const data=await responce.json()
    console.log(data)
    setShowButton(true);
  }

  return (
    <form>
      <label>
        RG Name:
        <input type="text" name="name" value={resourceDetails.name} onChange={handleChange} />
      </label>
      <br />
      {/* <label>
        Region:
        <input type="text" name="region" value={resourceDetails.region} onChange={handleChange} />
      </label> */}
      <br />
      <button type="submit"  onClick={handleSubmit}>Submit</button>
      {showButton && <h1 ><a href="http://20.96.169.153:8080/job/Terraform/build?token=1234" target="_blank">Click Here</a> to Provison the resource kindly check the jenkins build to track the process</h1>}
    </form>
  );
}

export default Form;
