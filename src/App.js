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
            this.notify(result)
        }).catch(e => {
            this.notify(e, true)
        });
    }

    new = (name, print = false) => {
        return fetch(`${apiUrl}/api/items/`, {
            method: "POST",
            body: JSON.stringify({name: name, description: '', print: print})
        })
    }

    loadItems = () => {
        return fetch(`${apiUrl}/api/items/`).then(d => d.json()).then(d => {
            this.notify("Loaded items");
            return d;
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

            <h1>Hive</h1>
            <Notifications notifications={notifications}/>

            <Button onClick={() => setPendingCreate(true)}>
                Add new item
            </Button>

            <Console/>
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
                            console.log(rowData)
                            setPendingDeleteUPC(rowData.upc);
                        }
                    }
                ]}/>
        </div>
    );
}

export default App;
