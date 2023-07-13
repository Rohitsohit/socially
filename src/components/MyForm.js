import React, { useState } from 'react'
import { API,Storage } from 'aws-amplify';
import { Button, View,Flex, TextField,FileUploader } from '@aws-amplify/ui-react';
import { createFromData } from '../graphql/mutations';

export default function MyForm(username) {
    const [formData, setFormData] = useState({title:"",description:"",tags:"",likes:[],comments:[]});
    const handleSubmit=async(e)=>{
      e.preventDefault();
       await API.graphql({query:createFromData,variables:{input:formData}});
         
      }     
      const imageHandle = async (e)=>{
         const file = e.target.files[0];
         try {
          await Storage.put(file.name,file)
         } catch (error) {
          console.log(error)
         }
         
         const url = await Storage.get(file.name);
         setFormData({
          ...formData,
          imageurl: url,
          createby:username.username
        }) 
      } 

  return (
    <Flex as="form" direction="column" width="20rem">
      <TextField label="Title" onChange={(e) => {
                    setFormData({
                      ...formData,
                      title: e.target.value
                    })}} type="text"  />
      <TextField label="Message" onChange={(e) => {
                    setFormData({
                      ...formData,
                      description: e.target.value
                    })}} type="email" />
      <TextField label="tags"onChange={(e) => {
                    setFormData({
                      ...formData,
                      tags: e.target.value
                    })}} type="email"  />
      {/* <TextField label="Email" type="email" isRequired={true} /> */}
      <input type="file" onChange={imageHandle} />
      <Button type="submit" onClick={handleSubmit}>Submit</Button>
    </Flex>
  )
}
