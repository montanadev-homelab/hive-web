function Notifications({notifications}) {
    return (
        <ul>
            {notifications.map((e, i) =>
                <li key={i}>{JSON.stringify(e)}</li>
            )}
        </ul>
    )
}

export default Notifications;