import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGear,
    faCircleInfo,
    faToolbox,
    faTrash,
    faPen
} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import httpClient from "./httpClient";


export default function MainPage(){

    const[vehicles, setVehicles] = useState([]);

    useEffect( () =>{
        async function fetchAllVehicles(){
            try{
                const response = await httpClient.get('http://localhost:8080/getVehicles');
                setVehicles(response.data);
            }catch (error){
                console.error(error);
            }
        }
        fetchAllVehicles();
    }, []);


    return(
        <div>

            <div id="table">
                <Table hover>
                    <thead>
                    <tr>
                        <th>
                            Id
                        </th>
                        <th>
                            Owner
                        </th>
                        <th>
                            Vehicle Type
                        </th>
                        <th>
                            Brand
                        </th>
                        <th>
                            Plate Number
                        </th>
                        <th>
                            Registration Date
                        </th>
                        <th>
                            Latest Inspection Date
                        </th>
                        <th>
                            More Data
                        </th>
                        <th>
                            Operations
                        </th>
                    </tr>

                    </thead>

                    <tbody>

                    {vehicles.map(vehicle => (
                        <tr key={vehicle.id}>
                        <th scope="row">
                            {vehicle.id}
                        </th>
                        <td>
                            {vehicle.owner}
                        </td>
                        <td>
                            {vehicle.vehicleType}
                        </td>
                            <td>
                                {vehicle.brand}
                            </td>
                        <td>
                            {vehicle.plateNumber}
                        </td>
                        <td>
                            {vehicle.registrationDate}
                        </td>
                        <td>
                            @mdo
                        </td>
                        <td>
                            <div className="icons">
                                <FontAwesomeIcon icon={faGear} size="lg" title="Technical Data" style={{cursor: "pointer"}}/>
                                <FontAwesomeIcon icon={faCircleInfo} size="lg" title="General Data" style={{cursor: "pointer"}}/>
                                <FontAwesomeIcon icon={faToolbox} size="lg" title="Inspection History" style={{cursor: "pointer"}}/>
                            </div>
                        </td>
                        <td>
                            <div className="icons">
                                <FontAwesomeIcon icon={faPen} size="lg" title="Update" style={{cursor: "pointer"}}/>
                                <FontAwesomeIcon icon={faTrash} size="lg" title="Delete" style={{cursor: "pointer"}}/>
                            </div>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}