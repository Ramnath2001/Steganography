import { Container, Row } from "react-bootstrap";
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons'

function Footer(){
    return(
        <div className="main-footer">
            <Container>
                <Row>
                    <div>
                        <p style={{marginBottom: '0px'}}>Copyright <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()}</p>
                        <p>Developed by Ramnath K</p>
                    </div>
                </Row>
            </Container>
        </div>
    )

} 

export default Footer;