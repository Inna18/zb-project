import React, { useContext } from 'react'
import { useMode } from '../hooks/useMode'
import ChangeModeBtn from './ChangeModeBtn'

const ModeSelector = () => {

const { mode, changeMode } = useMode();

const toggleMode = () => {
    changeMode(mode === "light" ? "dark" : "light");
}

return (
<div>
    <ChangeModeBtn toggleMode={toggleMode}/>
</div>
)

}

export default ModeSelector
