import { Container } from 'react-bootstrap';
import '../index.css'
function Preview(props){
    console.log(props)
    return(
        <div>
            <Container style={{marginTop: "30px"}}>
                <h6 className='green'>preview of {props.name}</h6>
                {props.files.map((file) => <img width='100px' height='100px' src={file.filename} alt={file.originalname}></img>)}
            </Container>
        </div>
    )
}


export default Preview;