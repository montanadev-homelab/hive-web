import './App.css';
import {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {Button} from "@material-ui/core";
import DeleteItemModal from "./DeleteItemModal";
import NewItemModal from "./NewItemModal";
import {ToastContainer} from 'react-toastify';
import PrintLabelModal from "./PrintLabelModal";
import ScannerModal from "./ScannerModal";
import {Api} from "./Api";

function App() {
    const [items, setItems] = useState([]);
    const [pendingDeleteUPC, setPendingDeleteUPC] = useState(null);
    const [pendingCreate, setPendingCreate] = useState(false);
    const [printLabelOpen, setPrintLabelOpen] = useState(false);
    const [scannerOpen, setScannerOpen] = useState(false);

    const api = new Api();

    useEffect(() => {
        api.loadItems().then(items => setItems(items));
    }, [])

    return (
        <div>
            <ToastContainer />

            <DeleteItemModal
                open={pendingDeleteUPC !== null}
                onDelete={() => api.delete(pendingDeleteUPC)}
                onClose={() => setPendingDeleteUPC(null)}/>

            <NewItemModal
                open={pendingCreate}
                onClose={() => setPendingCreate(false)}
                onCreate={(name, print) =>
                    api.new(name, print)
                }/>

            <PrintLabelModal
                open={printLabelOpen}
                onPrint={(upc, description) => api.print(upc, description)}
                onClose={() => setPrintLabelOpen(false)} />

            <ScannerModal
                open={scannerOpen}
                onClose={() => setScannerOpen(false)} />

            <div style={{display: 'flex'}}>
                <h1>Hive</h1>

                <div style={{width: '50px'}} />
                <Button variant="contained" onClick={() => setPendingCreate(true)}>
                    New item
                </Button>
                <Button variant="contained" onClick={() => setPrintLabelOpen(true)}>
                    Print label
                </Button>
                <Button variant="contained" onClick={() => setScannerOpen(true)}>
                    Scanner
                </Button>
            </div>

            <MaterialTable
                columns={[
                    {title: 'UPC', field: 'upc'},
                    {title: 'Name', field: 'name'},
                    {title: 'Location', field: 'location.name'},
                ]}
                data={items}
                options={{pageSize: 100, pageSizeOptions: [100, 200, 1000], showTitle: false}}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete Item',
                        onClick: (event, rowData) => {
                            setPendingDeleteUPC(rowData.upc);
                        }
                    },
                    {
                        icon: 'print',
                        tooltip: 'Print Item',
                        onClick: (event, rowData) => {
                            console.log(rowData)
                            //setPendingDeleteUPC(rowData.upc);
                        }
                    }
                ]}/>
        </div>
    );
}

export default App;
