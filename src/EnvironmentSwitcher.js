import {MenuItem, Select} from "@material-ui/core";

function EnvironmentSwitcher({onSwitchEnvironment, env}) {
    return <div style={{position: "absolute", right: 0}}>
        <Select value={env} onChange={(option) => onSwitchEnvironment(option.target.value)}>
            <MenuItem value="remote">remote</MenuItem>
            <MenuItem value="local">local</MenuItem>
        </Select>
    </div>
}

export default EnvironmentSwitcher;