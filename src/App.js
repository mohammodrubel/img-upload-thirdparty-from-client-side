import { useForm } from "react-hook-form";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import {Container,Row,Col} from 'react-bootstrap'


function App() {
  const { register, handleSubmit } = useForm();
  const imgStorageKey ='d6052ba76c54cc752ff1e45107ca11ea' 

  const onSubmit = data => {
    const image = data.image[0]
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`
    fetch(url,{
        method:'POST',
        body:formData
    })
    .then(res => res.json())
    .then(result => {
        if(result.success){
            const img = result.data.url;
            const information ={
                name:data.name,
                email:data.email,
                img:img
            }
            fetch('http://localhost:5000/fileandinfo',{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(information)
            })
            .then(res => res.json())
            .then(inserted => console.log('extra info',inserted))
        }
    })
  };
  return (
    <Container>
      <h1 style={{color:'tomato',textAlign:'center',marginTop:'30px'}}>Image upload</h1><hr/>



      <Row>
        <Col md={6} className="mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className='p-4 border border-1'>
            <input className="form-control mt-4 p-3" {...register("name", { required: true})} placeholder='Full Name' />
            <input className="form-control mt-4 p-3" {...register("email",{ required: true})} placeholder='Email' />
            <input type='file' className="form-control mt-4 p-3" {...register("image",{ required: true})} />
            <Button type="submit" className="mt-3 w-100" variant="primary">Submit</Button>
          </form>
        </Col>
      </Row>



    </Container>
  );
}

export default App;
