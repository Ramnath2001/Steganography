import {Alert} from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {
    return (
        <Alert variant={variant} style={{ fontSize:15, padding: '2% 2%', margin: '2% 20%' }}>
            <strong>{children}</strong>
        </Alert>
    );
};

export default ErrorMessage;