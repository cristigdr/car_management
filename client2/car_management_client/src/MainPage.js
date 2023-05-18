import {useEffect, useState} from "react";
import httpClient from "./httpClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGear,
    faCircleInfo,
    faToolbox,
    faTrash,
    faPen
} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from "bootstrap";

export default function MainPage(){

    const[vehicles, setVehicles] = useState([]);
    const[vehicleData, setVehicleData] = useState({
        id: "",
        owner: "",
        vehicleType: "",
        brand: "",
        plateNumber: "",
        registrationDate: "",
    });
    const[selectedVehicleId, setSelectedVehicleId] = useState('');
    const[techData, setTechData] = useState({
        fuelType: "",
        consumption: "",
        power: "",
        engineDisplacement: "",
        nrCylinders: "",
    });
    const[genData, setGenData] = useState({
        yearManuf:"",
        color:"",
        nrSeats:"",
        nrDoors:"",
    });
    const[inspections, setInspections] = useState([]);
    const[addInspectionData, setAddInspectionData] = useState({
        reviewDate: "",
    });


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
        async function fetchInspections(){
            try {
                const response = await httpClient.get(`http://localhost:8080/getReviews/${selectedVehicleId}`);
                setInspections(response.data);


            } catch (error) {
                console.error(error);

            }
        }fetchInspections();
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

    useEffect(() => {
        async function fetchVehicle(){
            try {
                const response = await httpClient.get(`http://localhost:8080/getVehicle/${selectedVehicleId}`);
                setVehicleData(response.data);


            } catch (error) {
                console.error(error);

            }
        }fetchVehicle();
    }, [selectedVehicleId]);

    const addInspection = async () => {
        try {
            const response = await httpClient.post(`http://localhost:8080/addReview/${selectedVehicleId}`, addInspectionData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateVehicle = async () => {
        try {
            const response = await httpClient.put(`http://localhost:8080/updateVehicle`, vehicleData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateTechData = async () => {
        try {
            const response = await httpClient.put(`http://localhost:8080/updateTechData/${selectedVehicleId}`, techData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateGenData = async () => {
        try {
            const response = await httpClient.put(`http://localhost:8080/updateGenData/${selectedVehicleId}`, genData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleTechData = (vehicleId) => {
        setSelectedVehicleId(vehicleId)
        const modalElement = document.getElementById("modalTechData");
        const modal = new Modal(modalElement);
        modal.show();
    };

    const toggleGenData = (vehicleId) => {
        setSelectedVehicleId(vehicleId)
        const modalElement = document.getElementById("modalGenData");
        const modal = new Modal(modalElement);
        modal.show();
    };

    const toggleInspections = (vehicleId) => {
        setSelectedVehicleId(vehicleId)
        const modalElement = document.getElementById("modalInspections");
        const modal = new Modal(modalElement);
        modal.show();
    };

    const toggleVehicle = (vehicleId) => {
        setSelectedVehicleId(vehicleId)
        const modalElement = document.getElementById("modalVehicleData");
        const modal = new Modal(modalElement);
        modal.show();
    };

    return(
        <div>
            <div id="tableVeh">

                <table className="table table-hover">
                <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Vehicle Type</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Plate Number</th>
                            <th scope="col">Registration Date</th>
                            <th scope="col">Latest Inspection Date</th>
                            <th scope="col">Details</th>
                            <th scope="col">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                    {vehicles.map(vehicle => (
                        <tr key={vehicle.id}>
                            <th scope="row">{vehicle.id}</th>
                            <td>{vehicle.owner}</td>
                            <td>{vehicle.vehicleType}</td>
                            <td>{vehicle.brand}</td>
                            <td>{vehicle.plateNumber}</td>
                            <td>{vehicle.registrationDate}</td>
                            <td>...</td>
                            <td>
                                <div className="icons">
                                    <FontAwesomeIcon icon={faGear} size="lg" title="Technical Data" style={{cursor: "pointer"}}   onClick={() => toggleTechData(vehicle.id)}/>
                                    <FontAwesomeIcon icon={faCircleInfo} size="lg" title="General Data" style={{cursor: "pointer"}} onClick={() => toggleGenData(vehicle.id)}/>
                                    <FontAwesomeIcon icon={faToolbox} size="lg" title="Inspection History" style={{cursor: "pointer"}} onClick={() => toggleInspections(vehicle.id)}/>
                                </div>
                            </td>
                            <td>
                                <div className="icons">
                                    <FontAwesomeIcon icon={faPen} size="lg" title="Update" style={{cursor: "pointer"}} onClick={() => toggleVehicle(vehicle.id)}/>
                                    <FontAwesomeIcon icon={faTrash} size="lg" title="Delete" style={{cursor: "pointer"}}/>
                                </div>
                            </td>

                        </tr>
                    ))}
                    </tbody>

                </table>

            </div>

            <div id="techData">
                <div className="modal fade" id="modalTechData" tabIndex="-1" aria-labelledby="modalTechData"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Technical Data for Vehicle Id {selectedVehicleId}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">


                                    <ul className="list-group list-group-flush">

                                        <li className="list-group-item">
                                            <div className="form-floating mb-3">
                                                <input type="text"
                                                       className="form-control"
                                                       id="fuelType"
                                                       placeholder="name@example.com"
                                                       value={techData.fuelType}
                                                       onChange={(e) => setTechData({ ...techData, fuelType: e.target.value })}
                                                       required={true}
                                                ></input>
                                                <label htmlFor="floatingInput"><strong>Fuel Type</strong></label>
                                            </div>
                                        </li>

                                        <li className="list-group-item">
                                            <div className="form-floating mb-3">
                                                <input type="text"
                                                       className="form-control"
                                                       id="consumption"
                                                       placeholder="name@example.com"
                                                       value={techData.consumption}
                                                       onChange={(e) => setTechData({ ...techData, consumption: e.target.value })}
                                                       required={true}
                                                ></input>
                                                <label htmlFor="floatingInput"><strong>Consumption</strong></label>
                                            </div>
                                        </li>

                                        <li className="list-group-item">
                                            <div className="form-floating mb-3">
                                                <input type="text"
                                                       className="form-control"
                                                       id="power"
                                                       placeholder="name@example.com"
                                                       value={techData.power}
                                                       onChange={(e) => setTechData({ ...techData, power: e.target.value })}
                                                       required={true}
                                                ></input>
                                                <label htmlFor="floatingInput"><strong>Power</strong></label>
                                            </div>
                                        </li>

                                        <li className="list-group-item">
                                            <div className="form-floating mb-3">
                                                <input type="text"
                                                       className="form-control"
                                                       id="engineDisplacement"
                                                       placeholder="name@example.com"
                                                       value={techData.engineDisplacement}
                                                       onChange={(e) => setTechData({ ...techData, engineDisplacement: e.target.value })}
                                                       required={true}
                                                ></input>
                                                <label htmlFor="floatingInput"><strong>Engine Displacement</strong></label>
                                            </div>
                                        </li>

                                        <li className="list-group-item">
                                            <div className="form-floating mb-3">
                                                <input type="text"
                                                       className="form-control"
                                                       id="nrCylinders"
                                                       placeholder="name@example.com"
                                                       value={techData.nrCylinders}
                                                       onChange={(e) => setTechData({ ...techData, nrCylinders: e.target.value })}
                                                       required={true}
                                                ></input>
                                                <label htmlFor="floatingInput"><strong>Number of Cylinders:</strong></label>
                                            </div>
                                        </li>

                                    </ul>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleUpdateTechData}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="genData">
                <div className="modal fade" id="modalGenData" tabIndex="-1" aria-labelledby="modalGenData"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Technical Data for Vehicle Id {selectedVehicleId}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">


                                <ul className="list-group list-group-flush">

                                    <li className="list-group-item">
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   className="form-control"
                                                   id="yearManuf"
                                                   placeholder="name@example.com"
                                                   value={genData.yearManuf}
                                                   onChange={(e) => setGenData({ ...genData, yearManuf: e.target.value })}
                                                   required={true}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>Manufacturing Year</strong></label>
                                        </div>
                                    </li>

                                    <li className="list-group-item">
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   className="form-control"
                                                   id="colorVeh"
                                                   placeholder="name@example.com"
                                                   value={genData.color}
                                                   onChange={(e) => setGenData({ ...genData, color: e.target.value })}
                                                   required={true}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>Color</strong></label>
                                        </div>
                                    </li>

                                    <li className="list-group-item">
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   className="form-control"
                                                   id="nrSeats"
                                                   placeholder="name@example.com"
                                                   value={genData.nrSeats}
                                                   onChange={(e) => setGenData({ ...genData, nrSeats: e.target.value })}
                                                   required={true}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>Number of Seats</strong></label>
                                        </div>
                                    </li>

                                    <li className="list-group-item">
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   className="form-control"
                                                   id="nrDoors"
                                                   placeholder="name@example.com"
                                                   value={genData.nrDoors}
                                                   onChange={(e) => setGenData({ ...genData, nrDoors: e.target.value })}
                                                   required={true}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>Number of Seats</strong></label>
                                        </div>
                                    </li>

                                </ul>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleUpdateGenData}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="inspections">
                <div className="modal fade" id="modalInspections" tabIndex="-1" aria-labelledby="modalInspections"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Technical Data for Vehicle Id {selectedVehicleId}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">


                                <ul className="list-group list-group-numbered">

                                    {inspections.map(inspection => (
                                      <li className=" list-group-item">{inspection.reviewDate}</li>
                                    ))}

                                </ul>

                            </div>
                            <div className="modal-footer">
                                <input id="reviewDate" type="date"  onChange={(e) => setAddInspectionData({ ...addInspectionData, reviewDate: e.target.value })}
                                />
                                <button type="button" className="btn btn-primary" onClick={addInspection}>Add Inspection</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="vehicleData">
                <div className="modal fade" id="modalVehicleData" tabIndex="-1" aria-labelledby="modalVehicleData"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Technical Data for Vehicle Id {selectedVehicleId}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">


                                <ul className="list-group list-group-flush">

                                    <li className="list-group-item">
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   className="form-control"
                                                   id="vehicleId"
                                                   placeholder="name@example.com"
                                                   value={vehicleData.id}
                                                   onChange={(e) => setVehicleData({ ...vehicleData, id: e.target.value })}
                                                   required={true}
                                                   disabled={true}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>Id</strong></label>
                                        </div>
                                    </li>

                                    <li className="list-group-item">
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   className="form-control"
                                                   id="owner"
                                                   placeholder="name@example.com"
                                                   value={vehicleData.owner}
                                                   onChange={(e) => setVehicleData({ ...vehicleData, owner: e.target.value })}
                                                   required={true}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>Owner</strong></label>
                                        </div>
                                    </li>

                                    <li className="list-group-item">
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   className="form-control"
                                                   id="vehicleType"
                                                   placeholder="name@example.com"
                                                   value={vehicleData.vehicleType}
                                                   onChange={(e) => setVehicleData({ ...vehicleData, vehicleType: e.target.value })}
                                                   required={true}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>Vehicle Type</strong></label>
                                        </div>
                                    </li>

                                    <li className="list-group-item">
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   className="form-control"
                                                   id="brand"
                                                   placeholder="name@example.com"
                                                   value={vehicleData.brand}
                                                   onChange={(e) => setVehicleData({ ...vehicleData, brand: e.target.value })}
                                                   required={true}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>Brand</strong></label>
                                        </div>
                                    </li>

                                    <li className="list-group-item">
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   className="form-control"
                                                   id="plateNumber"
                                                   placeholder="name@example.com"
                                                   value={vehicleData.plateNumber}
                                                   onChange={(e) => setVehicleData({ ...vehicleData, plateNumber: e.target.value })}
                                                   required={true}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>Plate Number</strong></label>
                                        </div>
                                    </li>

                                    <li className="list-group-item">

                                        <label htmlFor="floatingInput"><strong>Registration Date</strong></label> <br/>
                                        <input id="registrationDate" type="date" value={vehicleData.registrationDate} onChange={(e) => setVehicleData({ ...vehicleData, registrationDate: e.target.value })}
                                        />

                                    </li>

                                </ul>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={updateVehicle}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}