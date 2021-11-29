import {toastError, toastSuccess} from "./utils";

const apiUrl = 'http://localhost:8000'

export class Api {
    deleteItem = (upc) => {
        return fetch(`${apiUrl}/api/items/${upc}`, {
            method: "DELETE",
        }).then(result => {
            toastSuccess("Successfully deleted item");
        }).catch(e => {
            toastError(`Failed to delete item: ${e.toString()}`);
        });
    }

    newItem = (name, print = false, image = null) => {
        return fetch(`${apiUrl}/api/items/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, description: '', print: print, image: image})
        }).then(d => d.json()).then(result => {
            toastSuccess("Successfully created item");
        }).catch(e => {
            toastError(`Failed to create item: ${e.toString()}`);
        });
    }

    newLocation = (name) => {
        return fetch(`${apiUrl}/api/locations/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        }).then(d => d.json()).then(result => {
            toastSuccess("Successfully created location");
        }).catch(e => {
            toastError(`Failed to create location: ${e.toString()}`);
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

    loadLocations = () => {
        return fetch(`${apiUrl}/api/locations/`).then(d => d.json()).then(d => {
            toastSuccess('Loaded locations');
            return d;
        }).catch(e => {
            toastError(`Failed to load locations: ${e.toString()}`);
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
