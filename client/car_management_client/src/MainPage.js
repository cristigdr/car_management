import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Card,
    FormGroup, Input, Label,
    ListGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGear,
    faCircleInfo,
    faToolbox,
    faTrash,
    faPen
} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import httpClient from "./httpClient";


export default function MainPage(){

    const[vehicles, setVehicles] = useState([]);
    const [modalTechData, setModalTechData] = useState(false);
    const [modalGenData, setModalGenData] = useState(false);
    const[selectedVehicleId, setSelectedVehicleId] = useState('');
    const[techData, setTechData] = useState([]);
    const[genData, setGenData] = useState([]);

    const toggleTechData = (vehicleId) => {
        const id = vehicleId && typeof vehicleId === "object" ? vehicleId.id : vehicleId; //daca vehicleId e object returneaza proprietatea de id din vehicleId
        setSelectedVehicleId(id)
        setModalTechData(!modalTechData)
    };
    const toggleGenData = (vehicleId) => {
        const id = vehicleId && typeof vehicleId === "object" ? vehicleId.id : vehicleId; //daca vehicleId e object returneaza proprietatea de id din vehicleId
        setSelectedVehicleId(id)
        setModalGenData(!modalGenData);
    }


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


    useEffect(() => {
        async function fetchTechData(){
            try {
                const response = await httpClient.get(`http://localhost:8080/getTechData/${selectedVehicleId}`);
                setTechData(response.data);


            } catch (error) {
                console.error(error);

            }
        }fetchTechData();
    }, [selectedVehicleId]);

    useEffect(() => {
        async function fetchGenData(){
            try {
                const response = await httpClient.get(`http://localhost:8080/getGeneralData/${selectedVehicleId}`);
                setGenData(response.data);


            } catch (error) {
                console.error(error);

            }
        }fetchGenData();
    }, [selectedVehicleId]);

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
                                    <FontAwesomeIcon icon={faGear} size="lg" title="Technical Data" style={{cursor: "pointer"}}   onClick={() => toggleTechData(vehicle.id)}/>
                                    <FontAwesomeIcon icon={faCircleInfo} size="lg" title="General Data" style={{cursor: "pointer"}} onClick={() => toggleGenData(vehicle.id)}/>
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

            <div id="techData">
                <Modal
                    isOpen={modalTechData}
                    toggle={toggleTechData}
                    style={{width: "fit-content"}}
                >
                    <ModalHeader toggle={toggleTechData}>Technical Data for vehicle id {selectedVehicleId}</ModalHeader>
                    <ModalBody style={{display: "flex", justifyContent: "center"}}>

                        <Card
                            style={{
                                width: '18rem'
                            }}
                        >

                            <ListGroup flush>

                                <FormGroup floating>
                                    <Input
                                        id="fuelType"
                                        name="fuelType"
                                        type="text"
                                        defaultValue={techData.fuelType}
                                    />
                                    <Label for="fuelType">
                                        Fuel Type
                                    </Label>
                                </FormGroup>

                                <FormGroup floating>
                                    <Input
                                        id="consumption"
                                        name="consumption"
                                        placeholder="consumption"
                                        type="text"
                                        defaultValue={techData.consumption}
                                    />
                                    <Label for="consumption">
                                        Consumption
                                    </Label>
                                </FormGroup>

                                <FormGroup floating>
                                    <Input
                                        id="power"
                                        name="power"
                                        placeholder="power"
                                        type="text"
                                        defaultValue={techData.power}
                                    />
                                    <Label for="power">
                                        Power
                                    </Label>
                                </FormGroup>

                                <FormGroup floating>
                                    <Input
                                        id="engineDisp"
                                        name="engineDisp"
                                        placeholder="engineDisp"
                                        type="text"
                                        defaultValue={techData.engineDisplacement}
                                    />
                                    <Label for="engineDisp">
                                        Engine Displacement
                                    </Label>
                                </FormGroup>

                                <FormGroup floating>
                                    <Input
                                        id="nrCyl"
                                        name="nrCyl"
                                        placeholder="nrCyl"
                                        type="text"
                                        defaultValue={techData.nrCylinders}
                                    />
                                    <Label for="nrCyl">
                                        Number of Cylinders
                                    </Label>
                                </FormGroup>

                            </ListGroup>

                        </Card>

                    </ModalBody>

                    <ModalFooter style={{display: "flex", justifyContent: "center"}}>
                        <Button color="primary" onClick={toggleTechData}>
                            Update
                        </Button>
                    </ModalFooter>

                </Modal>
            </div>

            <div id="genData">
                <Modal
                    isOpen={modalGenData}
                    toggle={toggleGenData}
                    style={{width: "fit-content"}}
                >
                    <ModalHeader toggle={toggleGenData}>General Data for vehicle id {selectedVehicleId}</ModalHeader>
                    <ModalBody style={{display: "flex", justifyContent: "center"}}>
                        <Card
                            style={{
                                width: '18rem'
                            }}
                        >

                            <ListGroup flush>

                                <FormGroup floating>
                                    <Input
                                        id="manufYear"
                                        name="manufYear"
                                        type="text"
                                        defaultValue={genData.yearManuf}
                                    />
                                    <Label for="manufYear">
                                        Manufacturing Year
                                    </Label>
                                </FormGroup>

                                <FormGroup floating>
                                    <Input
                                        id="vehColor"
                                        name="vehColor"
                                        placeholder="vehColor"
                                        type="text"
                                        defaultValue={genData.color}
                                    />
                                    <Label for="vehColor">
                                        Color
                                    </Label>
                                </FormGroup>

                                <FormGroup floating>
                                    <Input
                                        id="nrSeats"
                                        name="nrSeats"
                                        placeholder="nrSeats"
                                        type="text"
                                        defaultValue={genData.nrSeats}
                                    />
                                    <Label for="nrSeats">
                                        Number of Seats
                                    </Label>
                                </FormGroup>

                                <FormGroup floating>
                                    <Input
                                        id="nrDoors"
                                        name="nrDoors"
                                        placeholder="nrDoors"
                                        type="text"
                                        defaultValue={genData.nrDoors}
                                    />
                                    <Label for="nrDoors">
                                        Number of Doors
                                    </Label>
                                </FormGroup>


                            </ListGroup>

                        </Card>

                    </ModalBody>

                    <ModalFooter style={{display: "flex", justifyContent: "center"}}>

                        <Button color="primary" onClick={toggleGenData}>
                            Update
                        </Button>{' '}

                    </ModalFooter>
                </Modal>
            </div>

        </div>
    )
}