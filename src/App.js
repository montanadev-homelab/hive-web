import './App.css';
import {useEffect, useMemo, useState} from "react";
import MaterialTable from "material-table";
import Console from "./Console";
import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Modal,
    Typography
} from "@material-ui/core";
import Notifications from "./Notifications";
import DeleteItemModal from "./DeleteItemModal";
import NewItemModal from "./NewItemModal";
import { ToastContainer, toast } from 'react-toastify';
import {toastError, toastInfo, toastSuccess} from "./utils";

const apiUrl = 'https://hive.montanadev.com'

class Api {
    constructor(notify) {
        this.notify = notify
    }

    delete = (upc) => {
        return fetch(`${apiUrl}/api/items/${upc}`, {
            method: "DELETE",
            headers: this.headers,
        }).then(d => d.json()).then(result => {
            toastSuccess("Successfully deleted item")
        }).catch(e => {
            toastError(`Failed to delete item: ${e.toString()}`)
            this.notify(e, true)
        });
    }

    new = (name, print = false) => {
        return fetch(`${apiUrl}/api/items/`, {
            method: "POST",
            body: JSON.stringify({name: name, description: '', print: print})
        }).then(d => d.json()).then(result => {
            toastSuccess("Successfully created item")
        }).catch(e => {
            toastError(`Failed to create item: ${e.toString()}`)
            this.notify(e, true)
        });
    }

    loadItems = () => {
        return fetch(`${apiUrl}/api/items/`).then(d => d.json()).then(d => {
            toastSuccess('Loaded items');
            return d;
        }).catch(e => {
            toastError(`Failed to load items: ${e.toString()}`)
            this.notify(e, true)
        });
    }

}

function App() {
    const [notifications, setNotifications] = useState([]);
    const [items, setItems] = useState([]);
    const [pendingDeleteUPC, setPendingDeleteUPC] = useState(null);
    const [pendingCreate, setPendingCreate] = useState(false);

    const notify = (message, error = false) => {
        setNotifications(oldNotifications => [...oldNotifications, {
            message: message,
            error: error,
        }]);
    }

    const api = new Api(notify);

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

            <div style={{display: 'flex'}}>
                <h1>Hive</h1>

                <div style={{width: '50px'}} />
                <Button variant="contained" onClick={() => setPendingCreate(true)}>
                    Add new item
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
