import {useEffect, useState} from "react";
import httpClient from "./httpClient";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleInfo,
    faGear,
    faMagnifyingGlass,
    faPen,
    faPlus,
    faToolbox,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from "bootstrap";
import moment from 'moment';

export default function MainPage(){

    const [vehicles, setVehicles] = useState([]);
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
    const[county, setCounty] = useState([]);
    const[plateNr, setPlateNr] = useState({
        generatedCode: "",
    });
    const[latestReviews, setLatestReviews] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get('http://localhost:8080/getVehicles');
                setVehicles(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get('http://localhost:8080/latestReviews');
                setLatestReviews(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get(`http://localhost:8080/getTechData/${selectedVehicleId}`);
                setTechData(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
        }, [selectedVehicleId]);


    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get(`http://localhost:8080/getReviews/${selectedVehicleId}`);
                setInspections(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
        }, [selectedVehicleId]);



    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get(`http://localhost:8080/getGeneralData/${selectedVehicleId}`);
                setGenData(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
        }, [selectedVehicleId]);


    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get(`http://localhost:8080/getVehicle/${selectedVehicleId}`);
                setVehicleData(response.data);
            } catch (error) {
                console.error(error);
            }
        })();

    }, [selectedVehicleId]);


    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get(`http://localhost:8080/generatePlateNr/${county}`);
                setPlateNr(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [county]);

    const handleCountyChange = (event) => {
        const selectedCounty = event.target.value;
        setCounty(selectedCounty);
    };

    const registerVehicle = async () =>{
        const formData = {
            vehicle: vehicleData,
            techData: techData,
            review: addInspectionData,
            generalData: genData,
        };
        try{
            const response = await httpClient.post(`http://localhost:8080/insert`, formData);
            const newlyAddedVehicle = response.data;
            setVehicles((prevVehicles) => [...prevVehicles, newlyAddedVehicle]);
        }catch (error){
            console.error(error);
        }
    };

    const addInspection = async () => {
        try {
            const response = await httpClient.post(`http://localhost:8080/addReview/${selectedVehicleId}`, addInspectionData);
            const newReview = response.data;
            setInspections(prevInspections => [...prevInspections, newReview]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateVehicle = async () => {
        try {
            const response = await httpClient.put(`http://localhost:8080/updateVehicle`, vehicleData);
            console.log(response.data);
            setVehicles((prevVehicles) => {
                return prevVehicles.map((vehicle) => {
                    if (vehicle.id === vehicleData.id) {
                        return response.data;
                    }
                    return vehicle;
                });
            });
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

    const toggleRegister = () => {
        setVehicleData({id: "",
            owner: "",
            vehicleType: "",
            brand: "",
            plateNumber: "",
            registrationDate: "",});
        setTechData({
            fuelType: "",
            consumption: "",
            power: "",
            engineDisplacement: "",
            nrCylinders: "",
        });
        setGenData({
            yearManuf:"",
            color:"",
            nrSeats:"",
            nrDoors:"",
        });
        setAddInspectionData({
            reviewDate: "",
        });
        const modalElement = document.getElementById("modalRegister");
        const modal = new Modal(modalElement);
        modal.show();
    };

    useEffect(() => {
        setVehicleData((prevData) => ({
            ...prevData,
            plateNumber: plateNr.generatedCode,
        }));
    }, [plateNr.generatedCode]);

    const deleteVehicle = async (id) => {
        try {
            await httpClient.delete(`http://localhost:8080/deleteVehicle/${id}`);
            setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const [plateNrInput, setPlateNrInput] = useState('');
    async function searchByPlate(plateNr) {
        try {
            const response = await httpClient.get(`http://localhost:8080/findPlateNr/${plateNr}`);
            const searchedVehicle = response.data;
            setVehicles([searchedVehicle]);
        } catch (error) {
            console.error(error);
        }
    }

    async function searchByPlateOnClick() {
        try {
            await searchByPlate(plateNrInput);
        } catch (error) {
            console.error(error);
        }
    }


    const [ownerInput, setOwnerInput] = useState('');

    async function searchByOwner(owner) {
        try {
            const response = await httpClient.get(`http://localhost:8080/findOwner/${owner}`);
            const searchedVehicles = response.data;
            setVehicles(searchedVehicles);
        } catch (error) {
            console.error(error);
        }
    }


    async function searchByOwnerOnClick() {
        try {
            await searchByOwner(ownerInput);
        } catch (error) {
            console.error(error);
        }
    }

    const[dateInput, setDateInput] = useState('');

    async function showRegDateAfter(dateInput){
        try {
            const response = await httpClient.get(`http://localhost:8080/showAfterRegDate/${dateInput}`);
            const searchedVehicles = response.data;
            setVehicles(searchedVehicles);
        } catch (error) {
            console.error(error);
        }
    }

    async function showRegDateAfterOnClick() {
        try {
            await showRegDateAfter(dateInput);
        } catch (error) {
            console.error(error);
        }
    }

    async function showBeforeLastInspection(dateInput){
        try {
            const response = await httpClient.get(`http://localhost:8080/showBeforeLastReview/${dateInput}`);
            const searchedVehicles = response.data;
            setVehicles(searchedVehicles);
        } catch (error) {
            console.error(error);
        }
    }

    async function showBeforeLastInspectionOnClick() {
        try {
            await showBeforeLastInspection(dateInput);
        } catch (error) {
            console.error(error);
        }
    }

    async function sortByType(){
        try {
            const response = await httpClient.get(`http://localhost:8080/sortByType`);
            const searchedVehicles = response.data;
            setVehicles(searchedVehicles);
        } catch (error) {
            console.error(error);
        }
    }

    async function sortByTypeOnClick() {
        try {
            await sortByType();
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div>

            <div id="searchForm">
                <h1>Search Form</h1>

                <div className='textSearch'>
                    <div className="form-floating mb-3 grid-item">

                        <input
                            type="text"
                            className="form-control"
                            id="plateNrSeacrh"
                            placeholder="name@example.com"
                            value={plateNrInput}
                            onChange={(event) => setPlateNrInput(event.target.value)}
                            required={true}
                        />

                        <label htmlFor="floatingInput"><strong>Plate Number</strong></label>

                    </div>

                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        size="2xl"
                        style={{ color: "black",  cursor: 'pointer' }}
                        onClick={searchByPlateOnClick}/>

                </div>

                <div className='textSearch'>
                    <div className="form-floating mb-3 grid-item">

                        <input
                            type="text"
                            className="form-control"
                            id="owner"
                            placeholder="name@example.com"
                            value={ownerInput}
                            onChange={(event) => setOwnerInput(event.target.value)}
                            required={true}
                        />

                        <label htmlFor="floatingInput"><strong>Owner</strong></label>

                    </div>

                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        size="2xl"
                        style={{ color: "black",  cursor: 'pointer' }}
                        onClick={searchByOwnerOnClick}/>

                </div>

                <div className="dateForm">

                    <p><strong>Show vehicles with registration date after: </strong></p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <input id="registrationDate"
                           type="date"
                           value={dateInput}
                           onChange={(event) => setDateInput(event.target.value)}
                    />

                    &nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        size="2xl"
                        style={{color: "black", cursor: 'pointer'}}
                        onClick={showRegDateAfterOnClick}
                    />

                </div>

                    <br/>

                <div className="dateForm">

                    <p ><strong>Show vehicles with last inspection date before: </strong></p>

                    <input id="lastInspDate"
                           type="date"
                           value={dateInput}
                           onChange={(event) => setDateInput(event.target.value)}
                    />

                    &nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" style={{color: "black",  cursor: 'pointer'}} onClick={showBeforeLastInspectionOnClick}/>
                </div>

                <br/>
            </div>

            <div id="tableVeh">

                <table className="table table-hover">

                    <thead>

                        <div style={{ display: "flex", alignItems: "center"}}>
                            <FontAwesomeIcon icon={faPlus} size="2xl" style={{ cursor: "pointer" }} onClick={toggleRegister}/>
                            <span>Register</span>

                        </div>

                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Owner</th>
                            <th scope="col" onClick={sortByTypeOnClick} style={{cursor:'pointer'}} title="Sort by Vehicle Type">Vehicle Type</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Plate Number</th>
                            <th scope="col">Registration Date</th>
                            <th scope="col">Latest Inspection Date</th>
                            <th scope="col">Details</th>
                            <th scope="col">Operations</th>
                        </tr>

                    </thead>

                    <tbody>
                    {vehicles.map(vehicle => {
                        const latestReview = latestReviews.find(review => review[0] === vehicle.id);
                        const formattedLatestReview = latestReview ? moment(latestReview[1]).format('DD-MM-YYYY') : "";
                        const formattedRegistrationDate = moment(vehicle.registrationDate).add(1, 'day').format('DD-MM-YYYY');

                        return(
                            <tr key={vehicle.id}>
                                <th scope="row">{vehicle.id}</th>
                                <td>{vehicle.owner}</td>
                                <td>{vehicle.vehicleType}</td>
                                <td>{vehicle.brand}</td>
                                <td>{vehicle.plateNumber}</td>
                                <td>{formattedRegistrationDate}</td>

                                <td>{formattedLatestReview}</td>
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
                                        <FontAwesomeIcon icon={faTrash} size="lg" title="Delete" style={{cursor: "pointer"}} onClick={() => deleteVehicle(vehicle.id)}/>
                                    </div>
                                </td>

                            </tr>
                        )
                    })}
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
                                                <input type="number"
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
                                                <input type="number"
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
                                                <input type="number"
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
                                                <input type="number"
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
                                <h1 className="modal-title fs-5" id="exampleModalLabel">General Data for Vehicle Id {selectedVehicleId}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">


                                <ul className="list-group list-group-flush">

                                    <li className="list-group-item">
                                        <div className="form-floating mb-3">
                                            <input type="number"
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
                                            <input type="number"
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
                                            <input type="number"
                                                   className="form-control"
                                                   id="nrDoors"
                                                   placeholder="name@example.com"
                                                   value={genData.nrDoors}
                                                   onChange={(e) => setGenData({ ...genData, nrDoors: e.target.value })}
                                                   required={true}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>Number of Doors</strong></label>
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
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Inspection History for Vehicle Id {selectedVehicleId}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">


                                <ul className="list-group list-group-numbered">

                                    {inspections.map(inspection => (
                                      <li className=" list-group-item">
                                          {moment(inspection.reviewDate).add(1, 'day').format('DD-MM-YYYY')}
                                      </li>
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
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Vehicle Data for Vehicle Id {selectedVehicleId}</h1>
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
                                                   value={plateNr.generatedCode}
                                                   onChange={(event) => {
                                                       const generatedCode = event.target.value;
                                                       setVehicleData((prevData) => ({
                                                           ...prevData,
                                                           plateNumber: generatedCode,
                                                       }));
                                                   }}
                                                   required={true}
                                                   disabled={true}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>Plate Number</strong></label>

                                        </div>
                                        <select name="counties" id="counties" onChange={handleCountyChange}>
                                            <option value="AB">Alba</option>
                                            <option value="AR">Arad</option>
                                            <option value="AG">Argeș</option>
                                            <option value="BC">Bacău</option>
                                            <option value="BH">Bihor</option>
                                            <option value="BN">Bistrița-Năsăud</option>
                                            <option value="BT">Botoșani</option>
                                            <option value="BV">Brașov</option>
                                            <option value="BR">Brăila</option>
                                            <option value="B">București</option>
                                            <option value="BZ">Buzău</option>
                                            <option value="CS">Caraș-Severin</option>
                                            <option value="CL">Călărași</option>
                                            <option value="CJ">Cluj</option>
                                            <option value="CT">Constanța</option>
                                            <option value="CV">Covasna</option>
                                            <option value="DB">Dâmbovița</option>
                                            <option value="DJ">Dolj</option>
                                            <option value="GL">Galați</option>
                                            <option value="GR">Giurgiu</option>
                                            <option value="GJ">Gorj</option>
                                            <option value="HR">Harghita</option>
                                            <option value="HD">Hunedoara</option>
                                            <option value="IL">Ialomița</option>
                                            <option value="IS">Iași</option>
                                            <option value="IF">Ilfov</option>
                                            <option value="MM">Maramureș</option>
                                            <option value="MH">Mehedinți</option>
                                            <option value="MS">Mureș</option>
                                            <option value="NT">Neamț</option>
                                            <option value="OT">Olt</option>
                                            <option value="PH">Prahova</option>
                                            <option value="SM">Satu Mare</option>
                                            <option value="SJ">Sălaj</option>
                                            <option value="SB">Sibiu</option>
                                            <option value="SV">Suceava</option>
                                            <option value="TR">Teleorman</option>
                                            <option value="TM">Timiș</option>
                                            <option value="TL">Tulcea</option>
                                            <option value="VS">Vaslui</option>
                                            <option value="VL">Vâlcea</option>
                                            <option value="VN">Vrancea</option>
                                        </select>
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

            <div id="registerVehicle">

                <div className="modal fade" id="modalRegister" tabIndex="-1" aria-labelledby="modalRegister"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Register Vehicle</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="accordion accordion-flush" id="accordionExample">

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapseOne" aria-expanded="true"
                                                    aria-controls="collapseOne">
                                                Vehicle Data
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show"
                                             aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">

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
                                                                   value={plateNr.generatedCode}
                                                                   onChange={(event) => {
                                                                       const generatedCode = event.target.value;
                                                                       setVehicleData((prevData) => ({
                                                                           ...prevData,
                                                                           plateNumber: generatedCode,
                                                                       }));
                                                                   }}
                                                                   required={true}
                                                                   disabled={true}
                                                            ></input>
                                                            <label htmlFor="floatingInput"><strong>Plate Number</strong></label>
                                                        </div>

                                                        <select name="counties" id="counties" onChange={handleCountyChange}>
                                                            <option value="AB">Alba</option>
                                                            <option value="AR">Arad</option>
                                                            <option value="AG">Argeș</option>
                                                            <option value="BC">Bacău</option>
                                                            <option value="BH">Bihor</option>
                                                            <option value="BN">Bistrița-Năsăud</option>
                                                            <option value="BT">Botoșani</option>
                                                            <option value="BV">Brașov</option>
                                                            <option value="BR">Brăila</option>
                                                            <option value="B">București</option>
                                                            <option value="BZ">Buzău</option>
                                                            <option value="CS">Caraș-Severin</option>
                                                            <option value="CL">Călărași</option>
                                                            <option value="CJ">Cluj</option>
                                                            <option value="CT">Constanța</option>
                                                            <option value="CV">Covasna</option>
                                                            <option value="DB">Dâmbovița</option>
                                                            <option value="DJ">Dolj</option>
                                                            <option value="GL">Galați</option>
                                                            <option value="GR">Giurgiu</option>
                                                            <option value="GJ">Gorj</option>
                                                            <option value="HR">Harghita</option>
                                                            <option value="HD">Hunedoara</option>
                                                            <option value="IL">Ialomița</option>
                                                            <option value="IS">Iași</option>
                                                            <option value="IF">Ilfov</option>
                                                            <option value="MM">Maramureș</option>
                                                            <option value="MH">Mehedinți</option>
                                                            <option value="MS">Mureș</option>
                                                            <option value="NT">Neamț</option>
                                                            <option value="OT">Olt</option>
                                                            <option value="PH">Prahova</option>
                                                            <option value="SM">Satu Mare</option>
                                                            <option value="SJ">Sălaj</option>
                                                            <option value="SB">Sibiu</option>
                                                            <option value="SV">Suceava</option>
                                                            <option value="TR">Teleorman</option>
                                                            <option value="TM">Timiș</option>
                                                            <option value="TL">Tulcea</option>
                                                            <option value="VS">Vaslui</option>
                                                            <option value="VL">Vâlcea</option>
                                                            <option value="VN">Vrancea</option>
                                                        </select>


                                                    </li>

                                                    <li className="list-group-item">

                                                        <label htmlFor="floatingInput"><strong>Registration Date</strong></label> <br/>
                                                        <input id="registrationDate" type="date" value={vehicleData.registrationDate} onChange={(e) => setVehicleData({ ...vehicleData, registrationDate: e.target.value })}
                                                        />

                                                    </li>

                                                </ul>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button className="accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                                    aria-expanded="false" aria-controls="collapseTwo">
                                                Technical Data
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse"
                                             aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">

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
                                                            <input type="number"
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
                                                            <input type="number"
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
                                                            <input type="number"
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
                                                            <input type="number"
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
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button className="accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                    aria-expanded="false" aria-controls="collapseThree">
                                                General Data
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse"
                                             aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">

                                                <ul className="list-group list-group-flush">

                                                    <li className="list-group-item">
                                                        <div className="form-floating mb-3">
                                                            <input type="number"
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
                                                            <input type="number"
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
                                                            <input type="number"
                                                                   className="form-control"
                                                                   id="nrDoors"
                                                                   placeholder="name@example.com"
                                                                   value={genData.nrDoors}
                                                                   onChange={(e) => setGenData({ ...genData, nrDoors: e.target.value })}
                                                                   required={true}
                                                            ></input>
                                                            <label htmlFor="floatingInput"><strong>Number of Doors</strong></label>
                                                        </div>
                                                    </li>

                                                </ul>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFour">
                                            <button className="accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#collapseFour"
                                                    aria-expanded="false" aria-controls="collapseFour">
                                                Last Inspection
                                            </button>
                                        </h2>
                                        <div id="collapseFour" className="accordion-collapse collapse"
                                             aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">

                                                <input id="reviewDate" type="date"  onChange={(e) => setAddInspectionData({ ...addInspectionData, reviewDate: e.target.value })}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={registerVehicle}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}