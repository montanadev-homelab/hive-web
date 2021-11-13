import {toastError, toastSuccess} from "./utils";

const apiUrl = 'https://hive.montanadev.com'

export class Api {
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
            headers: {
                'Content-Type': 'application/json'
            },
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({upc: upc, description: description})
        }).then(d => d.json()).then(result => {
            toastSuccess("Successfully requested a printed label");
        }).catch(e => {
            toastError(`Failed to print label: ${e.toString()}`);
        });
    }

    moveItem = (upc, location) => {
        return fetch(`${apiUrl}/api/items/${upc}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({location: location})
        }).then(d => d.json()).then(result => {
            toastSuccess("Successfully moved item");
        }).catch(e => {
            toastError(`Failed to move item: ${e.toString()}`);
        });
    }

}
