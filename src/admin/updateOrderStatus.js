import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { getOrder,updateStatus } from './helper/adminapicall';


const UpdateOrderStatus = ({match}) => {

    const [status, setStatus] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const allStatus=["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"];
    const {user,token} = isAutheticated();

    const preload = (orderId) => {
        getOrder(orderId).then(data=>{
            
            if(data.error)
            {
                setError(data.error);
            }
            else
            {
                setStatus(data.status);
            }
        })
    }
    const preloadStatus = ()=>{
        
    }

    useEffect(() => {
        preload(match.params.orderId);
      }, []);

    const goBack= () => (
        <div >
            <Link className='btn btn-light my-3' to="/admin/dashboard">
            go back
            </Link>

        </div>
    )
    
    const handleChage = (event) => {
        setError("");
        setStatus(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)
        //backend request
        updateStatus(match.params.orderId,user._id,token,{status})
        .then(data => {
            if(data.error)
            {
                    setError(error);
            }
            else{
                setError("");
                setSuccess(true);
                setStatus("");
            }
        })
    }

    const successMessage = () => {
        if(success){
            return <h5 className="alert alert-success mt-3">Order status updated successfully</h5>
        }
    };
    
    const warningMessage = () => {
        if(error){
            return <h5 className="alert alert-danger mt-3">Failed to update order status</h5>
        }
    };

    const updateOrderStatusForm = () => (
        <form>
            <div className="form-group">
                <p className="lead"> Enter the orderStatus</p>

                <select
                onChange={handleChage}
                className="form-control"
                value={status}
                autoFocus
                required
                >
                <option>Select</option>
                {allStatus &&
                    allStatus.map((stat, index) => (
                    <option key={index} >
                        {stat}
                    </option>
                    ))}
                </select>

                <button onClick={onSubmit} className="btn btn-outline-info">
                    Update status
                </button>

            </div>
        </form>
    )

    return (
        <>

            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {updateOrderStatusForm()}
                    {goBack()}
                    {successMessage()}
                    {warningMessage()}
                </div>
            </div>

        </>
    )
}


export default UpdateOrderStatus;