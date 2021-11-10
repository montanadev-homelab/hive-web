import './App.css';
import {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {Button} from "@material-ui/core";
import DeleteItemModal from "./DeleteItemModal";
import NewItemModal from "./NewItemModal";
import {ToastContainer} from 'react-toastify';
import {toastError, toastSuccess} from "./utils";
import PrintLabelModal from "./PrintLabelModal";
import ScannerModal from "./ScannerModal";

const apiUrl = 'https://hive.montanadev.com'

class Api {
    delete = (upc) => {
        return fetch(`${apiUrl}/api/items/${upc}`, {
            method: "DELETE",
        }).then(d => d.json()).then(result => {
            toastSuccess("Successfully deleted item");
        }).catch(e => {
            toastError(`Failed to delete item: ${e.toString()}`);
        });
    }

    new = (name, print = false) => {
        return fetch(`${apiUrl}/api/items/`, {
            method: "POST",
            body: JSON.stringify({name: name, description: '', print: print})
        }).then(d => d.json()).then(result => {
            toastSuccess("Successfully created item");
        }).catch(e => {
            toastError(`Failed to create item: ${e.toString()}`);
        });
    }

    loadItems = () => {
        return fetch(`${apiUrl}/api/items/`).then(d => d.json()).then(d => {
            toastSuccess('Loaded items');
            return d;
        }).catch(e => {
            toastError(`Failed to load items: ${e.toString()}`);
        });
    }

    print = (upc, description) => {
        return fetch(`${apiUrl}/api/print`, {
            method: "POST",
            body: JSON.stringify({upc: upc, description: description})
        }).then(d => d.json()).then(result => {
            toastSuccess("Successfully requested a printed label");
        }).catch(e => {
            toastError(`Failed to print label: ${e.toString()}`);
        });
    }

}

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
