function Console() {
    function submit() {
        console.log("submitted!");
    }


    return <div>
        <input type='text' onKeyDown={(e) => {
            if (e.key === 'Enter') {
                submit();
            }
        }}/>
        <button onClick={submit}>Send</button>
    </div>
}

export default Console;