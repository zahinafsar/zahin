import React, { useState, useEffect } from 'react';
import '../css/App.css';
import SkillsDesktop from "./components/skillsDesktop"
import SkillsMobile from "./components/skillsMobile"
import Button from 'react-bootstrap/Button'

const Skills = () => {
    const [desktop, setDesktop] = useState(true)
    const handleDevice = () => {
        setDesktop(!desktop)
    }
    const style = {
        marginLeft: "50%",
        marginBottom: "30px",
        transform: "translateX(-50%)"
    }
    useEffect(() => {
        if (window.innerWidth < '630') {
            setDesktop(false)
        } else {
            setDesktop(true)
        }
    }, [])
    return (
        <div id="SkillBox">
            <div id="title"><img src="./img/title-image/skill.png" alt="skill-icon" /></div>
            <div className="card-body">
                <Button style={style} variant="outline-success" onClick={handleDevice} >{desktop ? "Graph" : "Linear"}</Button>
                {desktop ? <SkillsDesktop /> : <SkillsMobile />}
            </div>
        </div>
    )
}

export default Skills;
