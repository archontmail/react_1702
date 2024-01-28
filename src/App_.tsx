import * as React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Option } from '@mui/base/Option';
import Collapse from '@mui/material/Collapse';

export default function App() {
    const eleRef = React.useRef();
    const [{ dx, dy }, setOffset] = React.useState({
        dx: 0,
        dy: 0,
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        const startPos = {
            x: e.clientX - dx,
            y: e.clientY - dy,
        };

        const handleMouseMove = (e: React.MouseEvent) => {
            const ele = eleRef.current;
            if (!ele) {
                return;
            }

            // How far the mouse has been moved
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;

            // Set the position of element
            ele.style.transform = `translate(${dx}px, ${dy}px)`;

            // Reassign the position of mouse
            setOffset({ dx, dy });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];

        const startPos = {
            x: touch.clientX - dx,
            y: touch.clientY - dy,
        };

        const handleTouchMove = (e: React.TouchEvent) => {
            const ele = eleRef.current;
            if (!ele) {
                return;
            }
            const touch = e.touches[0];
            const dx = touch.clientX - startPos.x;
            const dy = touch.clientY - startPos.y;

            ele.style.transform = `translate(${dx}px, ${dy}px)`;
            setOffset({ dx, dy });
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    return (
        <div className="container">
            <div
                className="draggable"
                ref={eleRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                <svg width="162px" height="94px" version="1.1" xmlns="http://www.w3.org/2000/svg" opacity='1'>
                    <g>    
                        <path style={{fill: 'rgb(216, 216, 216)', stroke: 'rgb(0, 0, 0)'}} d="M 10.644 2 L 140.644 2 L 140.644 92 L 10.644 92 L 10.644 56.901 C 5.176 56.901 0.743 52.468 0.743 47 C 0.743 41.532 5.176 37.099 10.644 37.099 L 10.644 2 Z"></path>
                    </g>
                </svg>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={this.state.age as string}
                    label="Age"
                    //onChange={this.handleChange}
                    style={{left: "-140px", top: "-30px"}}
                >
                    <MenuItem disabled value="">
                      <em>Placeholder</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>

            </div>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={this.state.age as string}
                label="Age"
                //onChange={this.handleChange}
            >
                <MenuItem disabled value="">
                  <em>Placeholder</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </div>
    );
};
